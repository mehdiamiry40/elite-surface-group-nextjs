import {
  redactSensitiveText,
  ResendDeliveryError,
} from "./contact-security.ts";
import {
  resendIdempotencyKey,
} from "./contact-submission.ts";

export const RESEND_TIMEOUT_MS = 5_000;
export const CONTACT_MONITOR_RECIPIENT =
  "delivered+elite-surface-monitor@resend.dev";

export type ResendTag = { name: string; value: string };

export type ResendEmail = {
  from: string;
  to: string[];
  reply_to: string;
  subject: string;
  text: string;
  html: string;
  tags?: ResendTag[];
};

type SendOptions = {
  fetcher?: typeof fetch;
  timeoutMs?: number;
};

export type ResendFailureClass = "retryable" | "permanent";

export function contactEmailTags(
  submissionId: string,
  kind: "website-enquiry" | "synthetic-monitor" = "website-enquiry",
): ResendTag[] {
  return [
    { name: "submission_id", value: submissionId },
    { name: "category", value: kind },
  ];
}

export async function sendWithResend(
  apiKey: string,
  email: ResendEmail,
  submissionId: string,
  { fetcher = fetch, timeoutMs = RESEND_TIMEOUT_MS }: SendOptions = {},
) {
  const response = await fetcher("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": resendIdempotencyKey(submissionId),
    },
    body: JSON.stringify(email),
    signal: AbortSignal.timeout(timeoutMs),
  });

  const result: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const providerCode =
      result && typeof result === "object" && "name" in result
        ? String(result.name)
        : undefined;
    const providerMessage =
      result && typeof result === "object" && "message" in result
        ? String(result.message)
        : undefined;
    throw new ResendDeliveryError(response.status, {
      providerCode,
      message: providerMessage,
    });
  }

  if (!result || typeof result !== "object" || !("id" in result)) {
    throw new ResendDeliveryError(502, {
      providerCode: "invalid_provider_response",
      message: "Resend accepted the request without returning an email ID",
    });
  }

  return String(result.id);
}

export function classifyResendFailure(error: unknown): ResendFailureClass {
  if (error instanceof ResendDeliveryError) {
    const code = error.providerCode?.toLowerCase();
    if (
      error.providerStatus === 408 ||
      error.providerStatus === 425 ||
      error.providerStatus === 429 ||
      error.providerStatus >= 500 ||
      (error.providerStatus === 409 &&
        code === "concurrent_idempotent_requests")
    ) {
      return "retryable";
    }
    return "permanent";
  }

  if (
    error instanceof TypeError ||
    (error instanceof DOMException &&
      ["AbortError", "TimeoutError"].includes(error.name))
  ) {
    return "retryable";
  }

  // An unknown failure after entering the provider call is safest in the
  // durable queue, where attempts are bounded and become manual review.
  return "retryable";
}

export function providerFailureCode(error: unknown) {
  const safeCode = (value: string) =>
    redactSensitiveText(value)
      .replace(/[^a-z0-9_.:-]+/gi, "_")
      .slice(0, 120) || "provider_error";

  if (error instanceof ResendDeliveryError) {
    return safeCode(error.providerCode ?? `http_${error.providerStatus}`);
  }
  if (error instanceof DOMException) {
    return safeCode(error.name);
  }
  return error instanceof Error
    ? safeCode(error.name || "provider_error")
    : "unknown";
}

export function fixedMonitorEmail(from: string): ResendEmail {
  return {
    from,
    to: [CONTACT_MONITOR_RECIPIENT],
    reply_to: CONTACT_MONITOR_RECIPIENT,
    subject: "Elite Surface Group contact delivery monitor",
    text: "Synthetic contact delivery monitor. No customer data is included.",
    html: "<p>Synthetic contact delivery monitor.</p><p>No customer data is included.</p>",
  };
}
