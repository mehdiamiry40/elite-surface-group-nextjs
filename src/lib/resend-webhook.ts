import { Webhook } from "svix";
import type { ContactLogEvent } from "./contact-security";

export const MAX_RESEND_WEBHOOK_BYTES = 64 * 1024;

export type ResendProviderStatus =
  | "delivered"
  | "delivery_delayed"
  | "failed"
  | "bounced"
  | "complained"
  | "suppressed";

const TRACKED_EVENTS: Record<
  string,
  { status: ResendProviderStatus; logEvent: ContactLogEvent }
> = {
  "email.delivered": {
    status: "delivered",
    logEvent: "contact.resend.webhook.delivered",
  },
  "email.delivery_delayed": {
    status: "delivery_delayed",
    logEvent: "contact.resend.webhook.delivery_delayed",
  },
  "email.failed": {
    status: "failed",
    logEvent: "contact.resend.webhook.failed",
  },
  "email.bounced": {
    status: "bounced",
    logEvent: "contact.resend.webhook.bounced",
  },
  "email.complained": {
    status: "complained",
    logEvent: "contact.resend.webhook.complained",
  },
  "email.suppressed": {
    status: "suppressed",
    logEvent: "contact.resend.webhook.suppressed",
  },
};

export type NormalisedResendWebhook =
  | {
      kind: "tracked";
      logEvent: ContactLogEvent;
      status: ResendProviderStatus;
      providerEventId: string;
      emailId: string;
      providerCreatedAt?: string;
      category?: "website-enquiry" | "synthetic-monitor";
      providerReason?: string;
    }
  | {
      kind: "ignored";
      providerEventId: string;
      webhookType: string;
    };

export class InvalidResendWebhookPayload extends Error {
  constructor(message = "Invalid Resend webhook payload") {
    super(message);
    this.name = "InvalidResendWebhookPayload";
  }
}

function record(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function safeToken(value: unknown, maxLength = 200) {
  if (typeof value !== "string") {
    return undefined;
  }
  const token = value.trim();
  return token.length > 0 &&
    token.length <= maxLength &&
    /^[a-zA-Z0-9._:-]+$/.test(token)
    ? token
    : undefined;
}

function safeTimestamp(value: unknown) {
  if (typeof value !== "string" || value.length > 80) {
    return undefined;
  }
  const timestamp = new Date(value);
  return Number.isNaN(timestamp.valueOf()) ? undefined : timestamp.toISOString();
}

function safeCategory(value: unknown) {
  return value === "website-enquiry" || value === "synthetic-monitor"
    ? value
    : undefined;
}

function providerReason(
  status: ResendProviderStatus,
  data: Record<string, unknown>,
) {
  if (status === "failed") {
    return safeToken(record(data.failed)?.reason);
  }
  if (status === "bounced") {
    const bounce = record(data.bounce);
    return [safeToken(bounce?.type), safeToken(bounce?.subType)]
      .filter(Boolean)
      .join(":") || undefined;
  }
  if (status === "suppressed") {
    return safeToken(record(data.suppressed)?.type);
  }
  return undefined;
}

export function normaliseResendWebhook(
  payload: unknown,
  providerEventId: string,
): NormalisedResendWebhook {
  const event = record(payload);
  const eventType = safeToken(event?.type);
  const safeProviderEventId = safeToken(providerEventId);
  if (!event || !eventType || !safeProviderEventId) {
    throw new InvalidResendWebhookPayload();
  }

  const tracked = TRACKED_EVENTS[eventType];
  if (!tracked) {
    return {
      kind: "ignored",
      providerEventId: safeProviderEventId,
      webhookType: eventType,
    };
  }

  const data = record(event.data);
  const emailId = safeToken(data?.email_id);
  if (!data || !emailId) {
    throw new InvalidResendWebhookPayload(
      "Tracked Resend event is missing a safe email identifier",
    );
  }

  const tags = record(data.tags);
  return {
    kind: "tracked",
    logEvent: tracked.logEvent,
    status: tracked.status,
    providerEventId: safeProviderEventId,
    emailId,
    providerCreatedAt: safeTimestamp(event.created_at),
    category: safeCategory(tags?.category),
    providerReason: providerReason(tracked.status, data),
  };
}

export function resendWebhookNeedsDurableCorrelation(
  event: NormalisedResendWebhook,
) {
  return event.kind === "tracked" && event.category === "website-enquiry";
}

export function verifyAndNormaliseResendWebhook(options: {
  rawBody: string;
  webhookSecret: string;
  providerEventId: string;
  providerTimestamp: string;
  providerSignature: string;
}) {
  const verifier = new Webhook(options.webhookSecret);
  verifier.verify(options.rawBody, {
    "svix-id": options.providerEventId,
    "svix-timestamp": options.providerTimestamp,
    "svix-signature": options.providerSignature,
  });

  let payload: unknown;
  try {
    payload = JSON.parse(options.rawBody);
  } catch {
    throw new InvalidResendWebhookPayload("Resend webhook body is not JSON");
  }

  return normaliseResendWebhook(payload, options.providerEventId);
}
