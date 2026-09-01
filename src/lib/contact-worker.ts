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
      return { state: "missing" };
    }
    if (record.status === "accepted" || record.status === "delivered") {
      return {
        state: "accepted",
        emailId: record.providerEmailId,
        alreadyProcessed: true,
      };
    }
    if (isTerminalOutboxStatus(record.status)) {
      return {
        state:
          record.status === "manual_review"
            ? "manual_review"
            : "permanent_failure",
        errorCode: record.lastErrorCode ?? record.status,
      };
    }

    const startedAt = now();
    if (
      record.attempts >= MAX_OUTBOX_DELIVERY_ATTEMPTS ||
      retryCutoffReached(record.firstAttemptAt, startedAt)
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
        retryCutoffReached(attempt.firstAttemptAt, now())
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

export type { ContactOutboxRecord };
