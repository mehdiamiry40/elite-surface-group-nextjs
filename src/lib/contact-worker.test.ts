import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ResendDeliveryError } from "./contact-security.ts";
import type { ResendEmail } from "./contact-provider.ts";
import {
  OUTBOX_RETRY_CUTOFF_MS,
  type ContactOutboxRecord,
} from "./contact-outbox.ts";
import {
  deliverOutboxSubmission,
  drainContactOutbox,
  MAX_OUTBOX_DELIVERY_ATTEMPTS,
  type ContactOutboxWorkerStore,
} from "./contact-worker.ts";

const submissionId = "48f7491e-39a9-40f8-a7af-fd5fc532890b";
const email: ResendEmail = {
  from: "sender@example.com",
  to: ["owner@example.com"],
  reply_to: "visitor@example.com",
  subject: "Enquiry",
  text: "Details",
  html: "<p>Details</p>",
};

function record(overrides: Partial<ContactOutboxRecord> = {}): ContactOutboxRecord {
  return {
    submissionId,
    status: "queued",
    email,
    payloadHash: "digest",
    createdAt: 1_000,
    updatedAt: 1_000,
    attempts: 0,
    ...overrides,
  };
}

function store(initial: ContactOutboxRecord) {
  const calls: string[] = [];
  const fake: ContactOutboxWorkerStore = {
    acquireLock: async () => {
      calls.push("lock");
      return "lock-token";
    },
    releaseLock: async () => {
      calls.push("unlock");
    },
    load: async () => initial,
    cleanupDueMember: async () => "removed",
    markAttempt: async () => {
      calls.push("attempt");
      return {
        attempts: initial.attempts + 1,
        firstAttemptAt: initial.firstAttemptAt ?? 1_000,
      };
    },
    recordAccepted: async () => {
      calls.push("accepted");
    },
    markTerminal: async (_id, status) => {
      calls.push(status);
    },
    queueRetry: async () => {
      calls.push("queued");
      return 61_000;
    },
  };
  return { fake, calls };
}

describe("contact outbox delivery worker", () => {
  it("records provider acceptance under the existing submission", async () => {
    const { fake, calls } = store(record());
    const result = await deliverOutboxSubmission(fake, submissionId, "re_test", {
      now: () => 1_000,
      send: async () => "email_123",
    });
    assert.deepEqual(result, { state: "accepted", emailId: "email_123" });
    assert.deepEqual(calls, ["lock", "attempt", "accepted", "unlock"]);
  });

  it("queues retryable failures and stops permanent failures", async () => {
    const retry = store(record());
    const retryResult = await deliverOutboxSubmission(
      retry.fake,
      submissionId,
      "re_test",
      { now: () => 1_000, send: async () => { throw new TypeError("network"); } },
    );
    assert.equal(retryResult.state, "queued");
    assert.equal(retry.calls.includes("queued"), true);

    const permanent = store(record());
    const permanentResult = await deliverOutboxSubmission(
      permanent.fake,
      submissionId,
      "re_test",
      {
        now: () => 1_000,
        send: async () => {
          throw new ResendDeliveryError(403, { providerCode: "validation_error" });
        },
      },
    );
    assert.equal(permanentResult.state, "permanent_failure");
    assert.equal(permanent.calls.includes("failed"), true);
  });

  it("moves exhausted and expired records to manual review without sending", async () => {
    for (const exhausted of [
      record({ attempts: MAX_OUTBOX_DELIVERY_ATTEMPTS }),
      record({ createdAt: 0 }),
      record({ createdAt: 0, firstAttemptAt: OUTBOX_RETRY_CUTOFF_MS - 1 }),
    ]) {
      const { fake, calls } = store(exhausted);
      let sent = false;
      const result = await deliverOutboxSubmission(
        fake,
        submissionId,
        "re_test",
        {
          now: () => OUTBOX_RETRY_CUTOFF_MS,
          send: async () => {
            sent = true;
            return "email_never";
          },
        },
      );
      assert.equal(result.state, "manual_review");
      assert.equal(sent, false);
      assert.equal(calls.includes("manual_review"), true);
    }
  });

  it("anchors an unattempted record to its durable creation time", async () => {
    const { fake, calls } = store(
      record({ createdAt: 0, firstAttemptAt: undefined }),
    );
    let sent = false;
    const result = await deliverOutboxSubmission(
      fake,
      submissionId,
      "re_test",
      {
        now: () => OUTBOX_RETRY_CUTOFF_MS,
        send: async () => {
          sent = true;
          return "email_never";
        },
      },
    );

    assert.deepEqual(result, {
      state: "manual_review",
      errorCode: "idempotency_window_expired",
    });
    assert.equal(sent, false);
    assert.deepEqual(calls, ["lock", "manual_review", "unlock"]);
  });

  it("does not queue a retry that crosses the idempotency cutoff", async () => {
    const { fake, calls } = store(record({ createdAt: 0 }));
    let clockReads = 0;
    const result = await deliverOutboxSubmission(
      fake,
      submissionId,
      "re_test",
      {
        now: () =>
          clockReads++ === 0
            ? OUTBOX_RETRY_CUTOFF_MS - 1
            : OUTBOX_RETRY_CUTOFF_MS,
        send: async () => {
          throw new TypeError("network");
        },
      },
    );

    assert.deepEqual(result, {
      state: "manual_review",
      errorCode: "TypeError",
    });
    assert.equal(calls.includes("queued"), false);
    assert.equal(calls.includes("manual_review"), true);
  });

  it("cleans missing due records under the acquired owner lock", async () => {
    const { fake } = store(record());
    fake.load = async () => null;
    let cleanupArgs: unknown[] = [];
    fake.cleanupDueMember = async (...args) => { cleanupArgs = args; return "removed"; };
    assert.deepEqual(await deliverOutboxSubmission(fake, submissionId, "re_test", { now: () => 123 }), { state: "missing" });
    assert.deepEqual(cleanupArgs, [submissionId, "lock-token", 123]);
    fake.cleanupDueMember = async () => "present";
    assert.deepEqual(await deliverOutboxSubmission(fake, submissionId, "re_test"), { state: "deferred" });
  });

  it("drains past locked and broken oldest records while isolating errors", async () => {
    const { fake } = store(record());
    fake.acquireLock = async (id) => id.startsWith("locked") ? null : "lock";
    fake.load = async (id) => { if (id === "broken") throw new Error("storage"); return record(); };
    const heartbeats: string[] = [];
    let sends = 0;
    const result = await drainContactOutbox({ ...fake,
      dueSubmissionIds: async () => ["locked1", "locked2", "broken", "valid4", "valid5"],
      recordWorkerHeartbeat: async (phase) => { heartbeats.push(phase); },
    }, "re_test", { now: () => 2_000, send: async () => `email_${++sends}` });
    assert.deepEqual(result, { processed: 5, summary: { locked: 2, error: 1, accepted: 2 } });
    assert.deepEqual(heartbeats, ["started", "completed", "error"]);
  });

  it("stops starting new batches when its time budget is reached", async () => {
    const { fake } = store(record());
    let now = 2_000;
    const result = await drainContactOutbox({ ...fake,
      dueSubmissionIds: async () => ["one", "two", "three", "four"],
      recordWorkerHeartbeat: async () => {},
    }, "re_test", { now: () => now, budgetMs: 1_000, send: async () => { now += 1_000; return "email"; } });
    assert.equal(result.processed, 3);
  });
});
