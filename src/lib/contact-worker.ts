import {
  classifyResendFailure,
  providerFailureCode,
  sendWithResend,
  type ResendEmail,
} from "./contact-provider.ts";
import {
  isTerminalOutboxStatus,
  retryCutoffReached,
  type ContactOutboxRecord,
  type UpstashContactOutbox,
} from "./contact-outbox.ts";

export type DeliveryAttemptResult =
  | { state: "accepted"; emailId?: string; alreadyProcessed?: boolean }
  | { state: "queued"; errorCode: string }
  | { state: "permanent_failure"; errorCode: string }
  | { state: "manual_review"; errorCode: string }
  | { state: "locked" }
  | { state: "deferred" }
  | { state: "missing" };

export const MAX_OUTBOX_DELIVERY_ATTEMPTS = 6;

type Send = (
  apiKey: string,
  email: ResendEmail,
  submissionId: string,
) => Promise<string>;

type WorkerOptions = {
  now?: () => number;
  send?: Send;
};

export type ContactOutboxWorkerStore = Pick<
  UpstashContactOutbox,
  | "acquireLock"
  | "releaseLock"
  | "load"
  | "markAttempt"
  | "recordAccepted"
  | "markTerminal"
  | "queueRetry"
  | "cleanupDueMember"
>;

export async function deliverOutboxSubmission(
  outbox: ContactOutboxWorkerStore,
  submissionId: string,
  apiKey: string,
  { now = Date.now, send = sendWithResend }: WorkerOptions = {},
): Promise<DeliveryAttemptResult> {
  const lock = await outbox.acquireLock(submissionId);
  if (!lock) {
    return { state: "locked" };
  }

  try {
    const record = await outbox.load(submissionId);
    if (!record) {
      const cleanup = await outbox.cleanupDueMember(submissionId, lock, now());
      return { state: cleanup === "removed" || cleanup === "absent" ? "missing" : "deferred" };
    }
    if (["accepted", "delivery_delayed", "delivered"].includes(record.status)) {
      await outbox.cleanupDueMember(submissionId, lock, now());
      return {
        state: "accepted",
        emailId: record.providerEmailId,
        alreadyProcessed: true,
      };
    }
    if (isTerminalOutboxStatus(record.status)) {
      await outbox.cleanupDueMember(submissionId, lock, now());
      return {
        state:
          record.status === "manual_review"
            ? "manual_review"
            : "permanent_failure",
        errorCode: record.lastErrorCode ?? record.status,
      };
    }

    const startedAt = now();
    // Creation is the earliest point at which an ambiguous persistence result
    // can fall back to a direct provider send. Anchor the safety window here,
    // not at the first recorded worker attempt, so a committed-but-timed-out
    // record can never be replayed after Resend's idempotency window expires.
    const idempotencyWindowStartedAt = record.createdAt;
    if (
      record.attempts >= MAX_OUTBOX_DELIVERY_ATTEMPTS ||
      retryCutoffReached(idempotencyWindowStartedAt, startedAt)
    ) {
      const errorCode =
        record.attempts >= MAX_OUTBOX_DELIVERY_ATTEMPTS
          ? "retry_attempts_exhausted"
          : "idempotency_window_expired";
      await outbox.markTerminal(
        submissionId,
        "manual_review",
        errorCode,
        startedAt,
      );
      return {
        state: "manual_review",
        errorCode,
      };
    }

    const attempt = await outbox.markAttempt(submissionId, record, startedAt);
    try {
      const emailId = await send(apiKey, record.email, submissionId);
      await outbox.recordAccepted(submissionId, emailId, now());
      return { state: "accepted", emailId };
    } catch (error) {
      const errorCode = providerFailureCode(error);
      if (classifyResendFailure(error) === "permanent") {
        await outbox.markTerminal(
          submissionId,
          "failed",
          errorCode,
          now(),
        );
        return { state: "permanent_failure", errorCode };
      }
      if (
        attempt.attempts >= MAX_OUTBOX_DELIVERY_ATTEMPTS ||
        retryCutoffReached(idempotencyWindowStartedAt, now())
      ) {
        await outbox.markTerminal(
          submissionId,
          "manual_review",
          errorCode,
          now(),
        );
        return { state: "manual_review", errorCode };
      }
      await outbox.queueRetry(submissionId, attempt.attempts, errorCode, now());
      return { state: "queued", errorCode };
    }
  } finally {
    await outbox.releaseLock(submissionId, lock).catch(() => undefined);
  }
}

export const OUTBOX_DRAIN_LIMIT = 30;
export const OUTBOX_DRAIN_BUDGET_MS = 18_000;

export async function drainContactOutbox(
  outbox: ContactOutboxWorkerStore & Pick<UpstashContactOutbox, "dueSubmissionIds" | "recordWorkerHeartbeat">,
  apiKey: string,
  options: WorkerOptions & { limit?: number; budgetMs?: number } = {},
) {
  const now = options.now ?? Date.now;
  const startedAt = now();
  const summary: Record<string, number> = {};
  let processed = 0;
  try {
    await outbox.recordWorkerHeartbeat("started", startedAt);
    // Snapshot enough IDs once so locked or broken oldest records cannot take
    // every slot. Never select the same record twice during this invocation.
    const ids = await outbox.dueSubmissionIds(startedAt, Math.min(options.limit ?? OUTBOX_DRAIN_LIMIT, OUTBOX_DRAIN_LIMIT));
    for (let offset = 0; offset < ids.length; offset += 3) {
      if (now() - startedAt >= (options.budgetMs ?? OUTBOX_DRAIN_BUDGET_MS)) break;
      const results = await Promise.allSettled(ids.slice(offset, offset + 3).map((id) =>
        deliverOutboxSubmission(outbox, id, apiKey, options),
      ));
      for (const result of results) {
        const state = result.status === "fulfilled" ? result.value.state : "error";
        summary[state] = (summary[state] ?? 0) + 1;
        processed++;
      }
    }
    // Persist completion even for record errors; error freshness remains a
    // separate health signal and cannot disappear behind a green heartbeat.
    await outbox.recordWorkerHeartbeat("completed", now(), processed);
    if (summary.error) await outbox.recordWorkerHeartbeat("error", now(), processed);
    return { processed, summary };
  } catch (error) {
    await outbox.recordWorkerHeartbeat("error", now(), processed).catch(() => undefined);
    throw error;
  }
}

export type { ContactOutboxRecord };
