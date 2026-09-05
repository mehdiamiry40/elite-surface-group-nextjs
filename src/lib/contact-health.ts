import type { UpstashContactOutbox } from "./contact-outbox.ts";

export type ContactHealthSnapshot = Awaited<ReturnType<UpstashContactOutbox["healthSnapshot"]>>;
export const WORKER_FRESHNESS_MS = 15 * 60_000;
export const DELIVERY_DEADLINE_MS = 30 * 60_000;
export const SYNTHETIC_FRESHNESS_MS = 14 * 60 * 60_000;

export function assessContactHealth(snapshot: ContactHealthSnapshot, now = Date.now()) {
  const issues: string[] = [];
  const { worker, queue, delivery, synthetic } = snapshot;
  if (worker.lastCompletedAt === null) issues.push("worker_heartbeat_missing");
  else if (now - worker.lastCompletedAt > WORKER_FRESHNESS_MS) issues.push("worker_heartbeat_stale");
  if (worker.lastErrorAt !== null && worker.lastErrorAt >= (worker.lastCompletedAt ?? 0)) {
    issues.push("worker_error");
  }
  if (queue.dueDepth > 0 && (queue.oldestDueAgeMs ?? 0) > WORKER_FRESHNESS_MS) issues.push("queue_overdue");
  if (delivery.overdue > 0) issues.push("delivery_confirmation_overdue");
  if (delivery.failures > 0) issues.push("delivery_failure");
  if (delivery.manualReview > 0) issues.push("manual_review_required");
  if (delivery.missing > 0) issues.push("outbox_record_missing");
  if (synthetic.lastStartedAt === null) issues.push("synthetic_probe_missing");
  else if (now - synthetic.lastStartedAt > SYNTHETIC_FRESHNESS_MS) issues.push("synthetic_probe_stale");
  if (synthetic.lastDeliveredAt === null) {
    if (synthetic.lastStartedAt !== null && now - synthetic.lastStartedAt > DELIVERY_DEADLINE_MS) {
      issues.push("synthetic_delivery_overdue");
    }
  } else if (now - synthetic.lastDeliveredAt > SYNTHETIC_FRESHNESS_MS + DELIVERY_DEADLINE_MS) {
    issues.push("synthetic_delivery_stale");
  }
  return { ok: issues.length === 0, checkedAt: now, issues, ...snapshot };
}
