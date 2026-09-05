import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { assessContactHealth, type ContactHealthSnapshot } from "./contact-health.ts";

const now = 2_000_000;
function healthy(): ContactHealthSnapshot {
  return {
    acknowledgementSequence: 0,
    worker: { lastStartedAt: now - 1_000, lastCompletedAt: now, lastErrorAt: null },
    queue: { depth: 0, dueDepth: 0, oldestAgeMs: null, oldestDueAgeMs: null },
    delivery: { failures: 0, manualReview: 0, missing: 0, awaiting: 0, oldestAwaitingAgeMs: null, overdue: 0 },
    synthetic: { lastStartedAt: now - 2_000, lastDeliveredAt: now - 1_000 },
  };
}
describe("aggregate contact health", () => {
  it("is healthy only with a fresh worker and a delivered durable synthetic", () => {
    assert.equal(assessContactHealth(healthy(), now).ok, true);
  });
  it("reports missing and stale heartbeats independently of queue size", () => {
    const snapshot = healthy();
    snapshot.worker.lastCompletedAt = null;
    assert.ok(assessContactHealth(snapshot, now).issues.includes("worker_heartbeat_missing"));
    snapshot.worker.lastCompletedAt = 0;
    assert.ok(assessContactHealth(snapshot, now).issues.includes("worker_heartbeat_stale"));
  });
  it("surfaces each actionable failure without exposing a customer payload", () => {
    const snapshot = healthy();
    snapshot.delivery = { ...snapshot.delivery, failures: 1, manualReview: 2, missing: 3, overdue: 4 };
    snapshot.queue = { depth: 2, dueDepth: 1, oldestAgeMs: now, oldestDueAgeMs: now };
    snapshot.worker.lastErrorAt = now;
    assert.deepEqual(assessContactHealth(snapshot, now).issues, ["worker_error", "queue_overdue", "delivery_confirmation_overdue", "delivery_failure", "manual_review_required", "outbox_record_missing"]);
  });
  it("detects absent synthetic runs and missed signed delivery", () => {
    const snapshot = healthy();
    snapshot.synthetic = { lastStartedAt: null, lastDeliveredAt: null };
    assert.ok(assessContactHealth(snapshot, now).issues.includes("synthetic_probe_missing"));
    snapshot.synthetic.lastStartedAt = 0;
    assert.ok(assessContactHealth(snapshot, now).issues.includes("synthetic_delivery_overdue"));
    snapshot.synthetic = { lastStartedAt: 0, lastDeliveredAt: 1 };
    assert.ok(assessContactHealth(snapshot, 16 * 60 * 60_000).issues.includes("synthetic_probe_stale"));
    assert.ok(assessContactHealth(snapshot, 16 * 60 * 60_000).issues.includes("synthetic_delivery_stale"));
  });
});
