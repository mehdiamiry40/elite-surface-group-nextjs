/**
 * Name of the hidden anti-spam field carried by every enquiry form.
 *
 * It is deliberately meaningless. Browsers and password managers fill hidden
 * fields they recognise and ignore `autocomplete="off"` when they do; the
 * previous name, `company`, was one of those, so a genuine visitor could trip
 * the trap without ever seeing it. A filled trap marks the enquiry as possible
 * spam — it never discards it.
 */
export const SPAM_TRAP_FIELD = "enquiryCheck";

const SUBMISSION_ID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Creates the identifier retained by a browser while it retries one payload. */
export function createSubmissionId() {
  return crypto.randomUUID();
}

export function isSubmissionId(value: unknown): value is string {
  return typeof value === "string" && SUBMISSION_ID.test(value.trim());
}

export function normaliseSubmissionId(value: unknown) {
  return isSubmissionId(value) ? value.trim().toLowerCase() : null;
}

export function resolveSubmissionId(value: unknown) {
  return normaliseSubmissionId(value) ?? createSubmissionId();
}

/** Resend retains this key for 24 hours; outbox retries stop before hour 23. */
export function resendIdempotencyKey(submissionId: string) {
  if (!isSubmissionId(submissionId)) {
    throw new TypeError("A valid contact submission ID is required");
  }
  return `contact-enquiry/${submissionId.trim().toLowerCase()}`;
}
