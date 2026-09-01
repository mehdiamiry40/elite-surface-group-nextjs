import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { ResendEmail } from "./contact-provider.ts";
import {
  decryptOutboxPayload,
  encryptOutboxPayload,
  nextRetryAt,
  outboxPayloadDigest,
  providerStatusTransition,
  retryCutoffReached,
  UpstashContactOutbox,
} from "./contact-outbox.ts";

const key = Buffer.alloc(32, 19).toString("base64");
const submissionId = "48f7491e-39a9-40f8-a7af-fd5fc532890b";
const email: ResendEmail = {
  from: "sender@example.com",
  to: ["owner@example.com"],
  reply_to: "visitor@example.com",
  subject: "Enquiry",
  text: "Private project details",
  html: "<p>Private project details</p>",
};

describe("encrypted contact outbox", () => {
  it("round-trips AES-GCM data without exposing plaintext", () => {
    const envelope = encryptOutboxPayload(email, submissionId, key);
    assert.equal(envelope.includes("Private project details"), false);
    assert.deepEqual(decryptOutboxPayload(envelope, submissionId, key), email);
  });

  it("binds ciphertext to its submission and detects tampering", () => {
    const envelope = encryptOutboxPayload(email, submissionId, key);
    assert.throws(() =>
      decryptOutboxPayload(
        envelope,
        "5e315ca6-d2f8-45fa-90bc-8df4741a846d",
        key,
      ),
    );
    const parts = envelope.split(".");
    parts[2] = `${parts[2][0] === "A" ? "B" : "A"}${parts[2].slice(1)}`;
    assert.throws(() =>
      decryptOutboxPayload(parts.join("."), submissionId, key),
    );
  });

  it("uses a deterministic keyed digest and bounded retry policy", () => {
    assert.equal(outboxPayloadDigest(email, key), outboxPayloadDigest(email, key));
    assert.notEqual(
      outboxPayloadDigest(email, key),
      outboxPayloadDigest({ ...email, subject: "Changed" }, key),
    );
    assert.equal(nextRetryAt(1, 1_000), 61_000);
    assert.equal(nextRetryAt(99, 1_000), 3_601_000);
    assert.equal(retryCutoffReached(0, 22 * 60 * 60 * 1000), false);
    assert.equal(retryCutoffReached(0, 23 * 60 * 60 * 1000), true);
  });

  it("does not let late provider events regress terminal state", () => {
    assert.equal(providerStatusTransition("delivered", "delivery_delayed"), "delivered");
    assert.equal(providerStatusTransition("delivered", "complained"), "complained");
    assert.equal(providerStatusTransition("bounced", "delivered"), "bounced");
  });

  it("persists with one atomic script and keeps plaintext out of Redis commands", async () => {
    let requestBody = "";
    const fetcher = (async (_url: string | URL | Request, init?: RequestInit) => {
      requestBody = String(init?.body);
      return Response.json({ result: 1 });
    }) as typeof fetch;
    const outbox = new UpstashContactOutbox(
      {
        url: "https://example.upstash.io",
        token: "test-token",
        encryptionKey: key,
      },
      fetcher,
    );

    assert.equal(await outbox.persist(submissionId, email, 1_000), "created");
    const command = JSON.parse(requestBody);
    assert.equal(command[0], "EVAL");
    assert.equal(requestBody.includes("Private project details"), false);
  });

  it("does not consume a provider event before its email mapping exists", async () => {
    const fetcher = (async () => Response.json({ result: [1, ""] })) as typeof fetch;
    const outbox = new UpstashContactOutbox(
      {
        url: "https://example.upstash.io",
        token: "test-token",
        encryptionKey: key,
      },
      fetcher,
    );
    assert.deepEqual(
      await outbox.recordProviderStatus(
        "email_123",
        "delivered",
        "msg_123",
        1_000,
      ),
      { duplicate: false, submissionId: undefined },
    );
  });
});
