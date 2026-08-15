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
  | "contact.analytics.failed"
  | "contact.resend.accepted"
  | "contact.resend.failed";

export function contactLog(
  event: ContactLogEvent,
  fields: Record<string, string | number | undefined>,
) {
  const payload = { event, ...fields };
  if (
    event === "contact.resend.accepted" ||
    event === "contact.delivery_logged_locally"
  ) {
    console.info("[contact]", payload);
  } else {
    console.error("[contact]", payload);
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
