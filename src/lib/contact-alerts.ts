import { createHash } from "node:crypto";
import {
  defaultFromAddress,
  emailAddressFromHeader,
  isResendCompatibleFrom,
} from "./contact-delivery.ts";
import { sendWithResend, type ResendEmail } from "./contact-provider.ts";

export const ALERT_WINDOW_MS = 60 * 60_000;

const ISSUE_LABELS: Record<string, string> = {
  outbox_unavailable: "The encrypted enquiry store could not be checked.",
  worker_heartbeat_missing: "The enquiry retry worker has not reported a completed run.",
  worker_heartbeat_stale: "The enquiry retry worker has not completed within 15 minutes.",
  worker_error: "The enquiry retry worker reported an unresolved execution error.",
  queue_overdue: "An enquiry retry has been overdue for more than 15 minutes.",
  delivery_confirmation_overdue: "A sent message has no delivery confirmation after 30 minutes.",
  delivery_failure: "A message has an unacknowledged provider delivery failure.",
  manual_review_required: "An enquiry needs manual review before any further send.",
  outbox_record_missing: "A missing or expired enquiry record needs reconciliation.",
  synthetic_probe_missing: "The durable synthetic delivery probe has not started.",
  synthetic_probe_stale: "The scheduled synthetic probe has not started within 14 hours.",
  synthetic_delivery_overdue: "The synthetic probe has no delivery confirmation after 30 minutes.",
  synthetic_delivery_stale: "The synthetic probe has no recent confirmed delivery.",
  delivery_check_failed: "The delivery check reported an unrecognised failure state.",
};

type AlertEnvironment = {
  CONTACT_ALERT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  RESEND_API_KEY?: string;
  [name: string]: string | undefined;
};

export function contactAlertConfigurationProblem(env: AlertEnvironment) {
  const recipient = env.CONTACT_ALERT_TO_EMAIL?.trim();
  if (!recipient) return "CONTACT_ALERT_TO_EMAIL is not configured";
  // One plain, explicitly configured address. Never accept visitor input,
  // address lists, or an unverified default notification recipient.
  if (emailAddressFromHeader(recipient) !== recipient.toLowerCase()) {
    return "CONTACT_ALERT_TO_EMAIL must be one plain email address";
  }
  const from = env.CONTACT_FROM_EMAIL?.trim() || defaultFromAddress("Elite Surface Group");
  if (!isResendCompatibleFrom(from)) return "CONTACT_FROM_EMAIL is invalid";
  if (!env.RESEND_API_KEY?.trim()) return "RESEND_API_KEY is not configured";
  return null;
}

export function buildContactAlert(
  issues: readonly string[],
  env: AlertEnvironment,
  now = Date.now(),
) {
  if (!issues.length || contactAlertConfigurationProblem(env)) return null;
  const codes = [...new Set(issues.map((issue) =>
    Object.hasOwn(ISSUE_LABELS, issue) ? issue : "delivery_check_failed",
  ))].sort();
  const windowStart = new Date(Math.floor(now / ALERT_WINDOW_MS) * ALERT_WINDOW_MS).toISOString();
  const text = [
    "Elite Surface Group enquiry delivery needs attention.",
    "",
    ...codes.map((code) => `- ${ISSUE_LABELS[code]}`),
    "",
    `Notification window: ${windowStart} (UTC, one-hour window).`,
    "Review the protected delivery status and the OPS.md incident runbook.",
    "Do not resend an enquiry until its existing provider outcome is known.",
    "Production: https://elitesurfacegroup.com.au/",
    "Runbook: https://github.com/mehdiamiry40/elite-surface-group-nextjs/blob/main/OPS.md",
    "This alert contains no customer details. Unchanged issues are deduplicated within each hour.",
  ].join("\n");
  const email: ResendEmail = {
    from: env.CONTACT_FROM_EMAIL?.trim() || defaultFromAddress("Elite Surface Group"),
    to: [env.CONTACT_ALERT_TO_EMAIL!.trim().toLowerCase()],
    reply_to: env.CONTACT_ALERT_TO_EMAIL!.trim().toLowerCase(),
    subject: "Elite Surface Group: enquiry delivery needs attention",
    text,
    // Text is wholly constructed from an allowlist and fixed strings. Escape
    // anyway so later copy edits cannot change the HTML safety contract.
    html: `<pre>${text.replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[character]!)}</pre>`,
    tags: [{ name: "category", value: "operations-alert" }],
  };
  // Provider idempotency works even when Redis is unavailable. Hash the exact
  // immutable email, including issue set, recipient and hour, into the UUID
  // format accepted by the existing transport. Concurrent calls send once;
  // retries cannot conflict because the same key always has the same payload.
  const bytes = createHash("sha256").update(JSON.stringify(email)).digest().subarray(0, 16);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.toString("hex");
  const submissionId = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  return { email, submissionId };
}

export async function sendContactAlert(
  issues: readonly string[],
  env: AlertEnvironment = process.env,
  options: { now?: number; send?: typeof sendWithResend } = {},
) {
  if (!issues.length) return { state: "healthy" } as const;
  const alert = buildContactAlert(issues, env, options.now);
  if (!alert) return { state: "unconfigured" } as const;
  const emailId = await (options.send ?? sendWithResend)(
    env.RESEND_API_KEY!.trim(), alert.email, alert.submissionId,
  );
  return { state: "accepted", emailId, submissionId: alert.submissionId } as const;
}
