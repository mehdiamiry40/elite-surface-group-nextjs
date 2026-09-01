/**
 * Pure helpers for the contact endpoint — kept separate so they can be unit
 * tested without standing up the Next.js route runtime.
 */

const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]", "::1"]);

export function isLoopbackHostname(hostname: string) {
  return LOOPBACK_HOSTS.has(hostname.toLowerCase());
}

/**
 * Origins allowed to post to /api/contact/.
 *
 * In non-production, `localhost` and `127.0.0.1` (and IPv6 loopback) with the
 * same protocol and port are treated as equivalent so local smoke/dev against
 * either host works when NEXT_PUBLIC_SITE_URL points at production.
 */
export function isAllowedOrigin(
  requestOrigin: string | null,
  requestUrlOrigin: string,
  extras: readonly (string | undefined)[] = [],
  options: {
    allowLoopbackEquivalence?: boolean;
    /** Raw Host header — used so 127.0.0.1 and localhost both work locally. */
    hostHeader?: string | null;
  } = {},
) {
  if (!requestOrigin) {
    return true;
  }

  const allowed = new Set<string>([requestUrlOrigin]);
  for (const candidate of extras) {
    if (!candidate) {
      continue;
    }
    try {
      allowed.add(new URL(candidate).origin);
    } catch {
      // Ignore malformed optional deployment configuration.
    }
  }

  let originUrl: URL;
  try {
    originUrl = new URL(requestOrigin);
  } catch {
    return false;
  }

  if (allowed.has(originUrl.origin)) {
    return true;
  }

  if (!isLoopbackHostname(originUrl.hostname)) {
    return false;
  }

  // Loopback Origin is only useful for local `next start` / smoke. Always allow
  // when the Host header is also loopback — including NODE_ENV=production
  // local servers — because public deployments never receive loopback Host.
  const hostHostname = options.hostHeader?.split(":")[0]?.toLowerCase();
  if (hostHostname && isLoopbackHostname(hostHostname)) {
    return true;
  }

  const allowLoopback =
    options.allowLoopbackEquivalence ??
    process.env.NODE_ENV !== "production";

  if (!allowLoopback) {
    return false;
  }

  for (const allowedOrigin of allowed) {
    try {
      const allowedUrl = new URL(allowedOrigin);
      if (
        isLoopbackHostname(allowedUrl.hostname) &&
        originUrl.protocol === allowedUrl.protocol &&
        originUrl.port === allowedUrl.port
      ) {
        return true;
      }
    } catch {
      // Ignore malformed allowed origins.
    }
  }

  return false;
}

const EMAIL_LIKE =
  /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;

/** Redacts email-like substrings before any provider text is logged. */
export function redactSensitiveText(value: string) {
  return value.replace(EMAIL_LIKE, "[redacted-email]");
}

export type ContactLogEvent =
  | "contact.delivery_unconfigured"
  | "contact.delivery_logged_locally"
  | "contact.outbox.unavailable"
  | "contact.outbox.queued"
  | "contact.outbox.delivery_deferred"
  | "contact.analytics.failed"
  | "contact.resend.accepted"
  | "contact.resend.failed"
  | "contact.resend.webhook.delivered"
  | "contact.resend.webhook.delivery_delayed"
  | "contact.resend.webhook.failed"
  | "contact.resend.webhook.bounced"
  | "contact.resend.webhook.complained"
  | "contact.resend.webhook.suppressed"
  | "contact.resend.webhook.ignored"
  | "contact.resend.webhook.rejected"
  | "contact.resend.webhook.persistence_failed"
  | "contact.resend.webhook.unconfigured";

type ContactLogLevel = "info" | "warn" | "error";

const CONTACT_LOG_LEVELS: Record<ContactLogEvent, ContactLogLevel> = {
  "contact.delivery_unconfigured": "error",
  "contact.delivery_logged_locally": "info",
  "contact.outbox.unavailable": "error",
  "contact.outbox.queued": "error",
  "contact.outbox.delivery_deferred": "error",
  "contact.analytics.failed": "warn",
  "contact.resend.accepted": "info",
  "contact.resend.failed": "error",
  "contact.resend.webhook.delivered": "info",
  "contact.resend.webhook.delivery_delayed": "warn",
  "contact.resend.webhook.failed": "error",
  "contact.resend.webhook.bounced": "error",
  "contact.resend.webhook.complained": "error",
  "contact.resend.webhook.suppressed": "error",
  "contact.resend.webhook.ignored": "info",
  "contact.resend.webhook.rejected": "warn",
  "contact.resend.webhook.persistence_failed": "error",
  "contact.resend.webhook.unconfigured": "error",
};

type ContactLogValue = string | number | boolean | null | undefined;

const CONTACT_LOG_FIELDS = new Set([
  "route",
  "page",
  "requestId",
  "submissionId",
  "emailId",
  "providerEventId",
  "providerCreatedAt",
  "providerStatus",
  "providerCode",
  "providerReason",
  "webhookType",
  "category",
  "duplicate",
  "durationMs",
  "error",
  "errorCode",
  "reason",
]);

function safeLogValue(value: ContactLogValue) {
  if (typeof value !== "string") {
    return value;
  }

  // Provider errors and webhook metadata are external input. Redact any
  // address-shaped text here as a final guard, even when the caller already
  // allowlists its fields, and cap it so one event cannot flood runtime logs.
  return redactSensitiveText(value).slice(0, 500);
}

export function contactLog(
  event: ContactLogEvent,
  fields: Record<string, ContactLogValue>,
) {
  const level = CONTACT_LOG_LEVELS[event];
  const safeFields = Object.fromEntries(
    Object.entries(fields)
      .filter(
        ([key, value]) =>
          value !== undefined &&
          CONTACT_LOG_FIELDS.has(key) &&
          !["timestamp", "level", "event", "service"].includes(key),
      )
      .map(([key, value]) => [key, safeLogValue(value)]),
  );
  const line = JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    event,
    service: "elite-surface-group-web",
    route: safeFields.route ?? "/api/contact/",
    ...safeFields,
  });

  if (level === "error") {
    console.error(line);
  } else if (level === "warn") {
    console.warn(line);
  } else {
    console.info(line);
  }
}

export class ResendDeliveryError extends Error {
  readonly providerStatus: number;
  readonly providerCode: string | undefined;

  constructor(
    providerStatus: number,
    options: { providerCode?: string; message?: string } = {},
  ) {
    super(
      options.message
        ? redactSensitiveText(options.message)
        : `Resend returned HTTP ${providerStatus}`,
    );
    this.name = "ResendDeliveryError";
    this.providerStatus = providerStatus;
    this.providerCode = options.providerCode;
  }
}
