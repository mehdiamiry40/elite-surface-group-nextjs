#!/usr/bin/env node
// Runs the actual application Lua/transactions in an isolated, non-persistent
// Redis process. It never loads environment files or contacts external services.
import assert from "node:assert/strict";
import { after, before, beforeEach, describe, it } from "node:test";
import { spawn } from "node:child_process";
import { createConnection } from "node:net";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { Webhook } from "svix";
import { UpstashContactOutbox, OUTBOX_RETRY_CUTOFF_MS } from "../src/lib/contact-outbox.ts";
import { drainContactOutbox, deliverOutboxSubmission } from "../src/lib/contact-worker.ts";
import { assessContactHealth } from "../src/lib/contact-health.ts";
import { fixedMonitorEmail, contactEmailTags } from "../src/lib/contact-provider.ts";
import { verifyAndNormaliseResendWebhook, resendWebhookNeedsDurableCorrelation } from "../src/lib/resend-webhook.ts";

let server, directory, socketPath, serverError;
const key = Buffer.alloc(32, 19).toString("base64");
const email = { from: "sender@example.com", to: ["owner@example.com"], reply_to: "visitor@example.com", subject: "Fixture", text: "private fixture", html: "<p>private fixture</p>" };
const prefix = "contact:v2";
const meta = (id) => `${prefix}:meta:${id}`;
const data = (id) => `${prefix}:data:${id}`;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Minimal RESP2 transport lets the production Upstash HTTP adapter execute the
// real Redis commands, including MULTI/EXEC, with concurrent independent clients.
function parse(buffer, offset = 0) {
  const end = buffer.indexOf("\r\n", offset);
  if (end < 0) return null;
  const kind = String.fromCharCode(buffer[offset]);
  const line = buffer.toString("utf8", offset + 1, end);
  const next = end + 2;
  if (kind === "+" || kind === "-" || kind === ":") return { value: kind === ":" ? Number(line) : kind === "-" ? { error: line } : line, next };
  if (kind === "$") {
    const length = Number(line);
    if (length === -1) return { value: null, next };
    if (buffer.length < next + length + 2) return null;
    return { value: buffer.toString("utf8", next, next + length), next: next + length + 2 };
  }
  if (kind === "*") {
    if (Number(line) === -1) return { value: null, next };
    const values = [];
    let cursor = next;
    for (let i = 0; i < Number(line); i++) {
      const entry = parse(buffer, cursor);
      if (!entry) return null;
      values.push(entry.value); cursor = entry.next;
    }
    return { value: values, next: cursor };
  }
  throw new Error(`Unexpected RESP kind ${kind}`);
}
function commands(input) {
  return new Promise((resolve, reject) => {
    const socket = createConnection({ path: socketPath });
    let received = Buffer.alloc(0);
    const responses = [];
    socket.setTimeout(3_000, () => socket.destroy(new Error("Isolated Redis timeout")));
    socket.on("error", reject);
    socket.on("connect", () => {
      for (const parts of input) {
        const encoded = parts.map((part) => String(part));
        socket.write(`*${encoded.length}\r\n` + encoded.map((part) => `$${Buffer.byteLength(part)}\r\n${part}\r\n`).join(""));
      }
    });
    socket.on("data", (chunk) => {
      received = Buffer.concat([received, chunk]);
      let entry;
      while ((entry = parse(received))) {
        responses.push(entry.value); received = received.subarray(entry.next);
      }
      if (responses.length === input.length) { socket.end(); resolve(responses); }
    });
  });
}
async function command(...args) {
  const [result] = await commands([args]);
  if (result?.error) throw new Error(result.error);
  return result;
}
const fetcher = async (url, init) => {
  const body = JSON.parse(init.body);
  if (String(url).endsWith("/multi-exec")) {
    const results = await commands([["MULTI"], ...body, ["EXEC"]]);
    return Response.json(results.at(-1).map((result) => result?.error ? result : { result }));
  }
  const [result] = await commands([body]);
  return Response.json(result?.error ? result : { result });
};
const store = () => new UpstashContactOutbox({ url: "https://isolated.invalid", token: "fixture", encryptionKey: key }, fetcher);

before(async () => {
  directory = await mkdtemp(join(tmpdir(), "esg-redis-test-"));
  socketPath = join(directory, "redis.sock");
  server = spawn(process.env.REDIS_SERVER ?? "redis-server", ["--port", "0", "--unixsocket", socketPath, "--unixsocketperm", "700", "--save", "", "--appendonly", "no", "--dir", directory], { stdio: "ignore" });
  server.on("error", (error) => { serverError = error; });
  for (let i = 0; i < 100; i++) {
    if (serverError) throw serverError;
    try { if (await command("PING") === "PONG") return; } catch { /* Wait for the isolated socket only. */ }
    await delay(25);
  }
  throw new Error("Could not start isolated Redis; set REDIS_SERVER to a redis-server executable.");
});
after(async () => {
  if (server?.pid && server.exitCode === null) { server.kill("SIGTERM"); await new Promise((resolve) => server.once("exit", resolve)); }
  if (directory) await rm(directory, { recursive: true, force: true });
});
beforeEach(async () => { await command("FLUSHDB"); });

describe("real Redis contact outbox recovery", () => {
  it("expires three oldest records and delivers the fourth in one bounded drain", async () => {
    const outbox = store();
    for (let i = 0; i < 4; i++) await outbox.persist(`fixture_${i}`, email, 1_000 + i);
    for (let i = 0; i < 3; i++) { await command("PEXPIRE", meta(`fixture_${i}`), 1); await command("PEXPIRE", data(`fixture_${i}`), 1); }
    await delay(10);
    let sends = 0;
    const result = await drainContactOutbox(outbox, "never-external", { now: () => 2_000, send: async () => { sends++; return "email_4"; } });
    assert.deepEqual(result, { processed: 4, summary: { missing: 3, accepted: 1 } });
    assert.equal(sends, 1);
    assert.deepEqual(await outbox.dueSubmissionIds(3_000), []);
    const snapshot = await outbox.healthSnapshot(3_000);
    assert.equal(snapshot.delivery.missing, 3);
    assert.equal(snapshot.worker.lastCompletedAt, 2_000);
    assert.equal(snapshot.queue.depth, 0);
  });

  it("quarantines partial metadata and preserves its remaining encrypted data", async () => {
    const outbox = store();
    await outbox.persist("partial", email, 1_000);
    await command("HDEL", meta("partial"), "createdAt");
    assert.equal(await outbox.load("partial"), null);
    assert.equal((await deliverOutboxSubmission(outbox, "partial", "none", { now: () => 2_000, send: async () => { throw new Error("must not send"); } })).state, "missing");
    assert.equal(await command("HGET", meta("partial"), "status"), "manual_review");
    assert.equal(await command("EXISTS", data("partial")), 1);
    assert.equal(await command("ZSCORE", `${prefix}:due`, "partial"), null);
    assert.ok(await command("TTL", data("partial")) <= 7 * 24 * 60 * 60);
  });

  it("does not remove a valid record created after the missing-data read", async () => {
    const outbox = store();
    const lock = await outbox.acquireLock("raced");
    assert.equal(await outbox.load("raced"), null);
    await outbox.persist("raced", email, 2_000);
    assert.equal(await outbox.cleanupDueMember("raced", lock, 3_000), "present");
    assert.deepEqual(await outbox.dueSubmissionIds(3_000), ["raced"]);
    assert.equal((await outbox.load("raced")).status, "queued");
    await outbox.releaseLock("raced", lock);
  });

  it("fences cleanup and lock release when ownership expires", async () => {
    const outbox = store();
    await command("ZADD", `${prefix}:due`, "1000", "missing");
    const oldOwner = await outbox.acquireLock("missing");
    await command("PEXPIRE", `${prefix}:lock:missing`, 1);
    await delay(10);
    const newOwner = await outbox.acquireLock("missing");
    assert.equal(await outbox.cleanupDueMember("missing", oldOwner, 2_000), "locked");
    await outbox.releaseLock("missing", oldOwner);
    assert.equal(await command("GET", `${prefix}:lock:missing`), newOwner);
    assert.equal(await outbox.cleanupDueMember("missing", newOwner, 2_000), "removed");
  });

  it("concurrent drains select each valid enquiry once while locks overlap", async () => {
    const outbox = store();
    for (let i = 0; i < 8; i++) await outbox.persist(`concurrent_${i}`, email, 1_000 + i);
    const sent = [];
    const send = async (_key, _email, id) => { sent.push(id); await delay(5); return `email_${id}`; };
    await Promise.all([drainContactOutbox(outbox, "none", { now: () => 2_000, send }), drainContactOutbox(outbox, "none", { now: () => 2_000, send })]);
    assert.equal(sent.length, 8);
    assert.equal(new Set(sent).size, 8);
    assert.equal((await outbox.healthSnapshot(3_000)).queue.depth, 0);
  });

  it("preserves six-attempt and creation-anchored 23-hour cutoffs", async () => {
    const outbox = store();
    await outbox.persist("expired", email, 0);
    await outbox.persist("exhausted", email, OUTBOX_RETRY_CUTOFF_MS - 1);
    await command("HSET", meta("exhausted"), "attempts", "6");
    for (const id of ["expired", "exhausted"]) assert.equal((await deliverOutboxSubmission(outbox, id, "none", { now: () => OUTBOX_RETRY_CUTOFF_MS, send: async () => { throw new Error("must not send"); } })).state, "manual_review");
    const snapshot = await outbox.healthSnapshot(OUTBOX_RETRY_CUTOFF_MS);
    assert.equal(snapshot.delivery.manualReview, 2);
    assert.equal(snapshot.queue.depth, 0);
  });

  it("removes stale settled members without replaying accepted or terminal messages", async () => {
    const outbox = store();
    for (const status of ["accepted", "delivered", "manual_review"]) {
      await outbox.persist(status, email, 1_000);
      await command("HSET", meta(status), "status", status);
    }
    await outbox.persist("fresh", email, 1_001);
    const sent = [];
    await drainContactOutbox(outbox, "none", { now: () => 2_000, send: async (_key, _email, id) => { sent.push(id); return `email_${id}`; } });
    assert.deepEqual(sent, ["fresh"]);
    assert.deepEqual(await outbox.dueSubmissionIds(3_000), []);
    assert.equal((await outbox.load("manual_review")).status, "manual_review");
  });

  it("tracks signed durable synthetic delivery, duplicates, and missing mappings", async () => {
    const outbox = store();
    const id = randomUUID();
    const probe = fixedMonitorEmail("sender@example.com");
    probe.tags = contactEmailTags(id, "synthetic-monitor");
    await outbox.persist(id, probe, 1_000);
    assert.deepEqual(await outbox.recordProviderStatus("email_probe", "delivered", "pre-mapping", 2_000), { duplicate: false, submissionId: undefined });
    await deliverOutboxSubmission(outbox, id, "none", { now: () => 2_000, send: async () => "email_probe" });
    assert.equal((await outbox.healthSnapshot(2_000 + 31 * 60_000)).delivery.overdue, 1);
    const secret = `whsec_${Buffer.from("isolated-signing-secret").toString("base64")}`;
    const timestamp = new Date();
    const rawBody = JSON.stringify({ type: "email.delivered", data: { email_id: "email_probe", tags: { category: "synthetic-monitor" } } });
    const signature = new Webhook(secret).sign("pre-mapping", timestamp, rawBody);
    const event = verifyAndNormaliseResendWebhook({ rawBody, webhookSecret: secret, providerEventId: "pre-mapping", providerTimestamp: String(Math.floor(timestamp.valueOf() / 1_000)), providerSignature: signature });
    assert.equal(resendWebhookNeedsDurableCorrelation(event), true);
    assert.deepEqual(await outbox.recordProviderStatus(event.emailId, event.status, event.providerEventId, 3_000), { duplicate: false, submissionId: id });
    assert.equal((await outbox.recordProviderStatus(event.emailId, event.status, event.providerEventId, 4_000)).duplicate, true);
    const snapshot = await outbox.healthSnapshot(4_000);
    assert.equal(snapshot.delivery.awaiting, 0);
    assert.equal(snapshot.synthetic.lastDeliveredAt, 3_000);
    assert.equal((await outbox.syntheticStatus(id)).state, "delivered");
    await outbox.persist("customer", email, 4_000);
    assert.equal(await outbox.syntheticStatus("customer"), null);
    assert.equal(JSON.stringify(snapshot).includes("private fixture"), false);
  });

  it("retains terminal failures and acknowledgement preserves concurrent newer incidents", async () => {
    const outbox = store();
    for (const id of ["bounce", "review"]) {
      await outbox.persist(id, email, 1_000);
      await deliverOutboxSubmission(outbox, id, "none", { now: () => 2_000, send: async () => `email_${id}` });
    }
    await outbox.recordProviderStatus("email_bounce", "bounced", "event_bounce", 3_000);
    const observed = await outbox.healthSnapshot(3_000);
    await outbox.markTerminal("review", "manual_review", "retry_attempts_exhausted", 4_000);
    assert.ok(assessContactHealth(await outbox.healthSnapshot(4_000), 4_000).issues.includes("delivery_failure"));
    await outbox.acknowledgeIssues(observed.acknowledgementSequence);
    const snapshot = await outbox.healthSnapshot(5_000);
    assert.equal(snapshot.delivery.failures, 0);
    assert.equal(snapshot.delivery.manualReview, 1);
    assert.equal((await outbox.load("bounce")).status, "bounced");
    assert.equal((await outbox.load("review")).status, "manual_review");
  });

  it("preserves unseen incidents even when delayed writers carry older timestamps", async () => {
    const outbox = store();
    await outbox.persist("seen", email, 1_000);
    await outbox.persist("unseen", email, 1_000);
    await outbox.markTerminal("seen", "failed", "failed", 3_000);
    const observed = await outbox.healthSnapshot(4_000);
    assert.equal(observed.delivery.failures, 1);
    // The event timestamp predates the snapshot, but this write commits later.
    await outbox.markTerminal("unseen", "failed", "failed", 2_000);
    await outbox.acknowledgeIssues(observed.acknowledgementSequence);
    const after = await outbox.healthSnapshot(5_000);
    assert.equal(after.delivery.failures, 1);
    assert.ok(after.acknowledgementSequence > observed.acknowledgementSequence);
    assert.equal(await command("ZSCORE", `${prefix}:failures`, "unseen"), "2000");
  });

  it("preserves a newer recurrence of the same incident and rejects future sequence cutoffs", async () => {
    const outbox = store();
    await outbox.persist("recurrence", email, 1_000);
    await outbox.markTerminal("recurrence", "manual_review", "failed", 3_000);
    const observed = await outbox.healthSnapshot(4_000);
    await outbox.markTerminal("recurrence", "manual_review", "new_failure", 2_000);
    await outbox.acknowledgeIssues(observed.acknowledgementSequence);
    assert.equal((await outbox.healthSnapshot(5_000)).delivery.manualReview, 1);
    await assert.rejects(outbox.acknowledgeIssues(999), RangeError);
    assert.equal((await outbox.healthSnapshot(5_000)).delivery.manualReview, 1);
  });

  it("bounds acknowledgements to 300 signals and preserves the durable sequence through retention", async () => {
    const outbox = store();
    for (let i = 0; i < 301; i++) await outbox.markTerminal(`bulk_${i}`, "failed", "fixture", 1_000);
    const observed = await outbox.healthSnapshot(2_000);
    assert.equal(observed.delivery.failures, 301);
    assert.deepEqual(await outbox.acknowledgeIssues(observed.acknowledgementSequence), { acknowledged: 300, remainingThroughSequence: 1 });
    const expired = await outbox.healthSnapshot(31 * 24 * 60 * 60_000);
    assert.equal(expired.delivery.failures, 0);
    assert.equal(expired.acknowledgementSequence, observed.acknowledgementSequence);
    assert.equal(await command("ZCARD", `${prefix}:issue-index`), 0);
    assert.equal(await command("TTL", `${prefix}:issue-sequence`), -1);
  });
});
