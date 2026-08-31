/**
 * The mailbox the business has stopped reading.
 *
 * Applied to the recipient only. Enquiries must never be *delivered* there, but
 * the same address is exactly what the *sender* needs to be: Resend will only
 * send from a domain you have verified with it, and elitesurfacegroup.com.au is
 * the domain the business owns and can verify.
 */
export function usesRetiredInbox(value: string) {
  return /@elitesurfacegroup\.com\.au\b/i.test(value);
}

/**
 * Default Resend sender. The mailbox does not have to exist — Resend sends as
 * any address on a verified domain. This must stay on elitesurfacegroup.com.au
 * (or another domain the business can verify). Gmail can never be a sender.
 */
export const DEFAULT_FROM_EMAIL = "info@elitesurfacegroup.com.au";

export function defaultFromAddress(businessName: string) {
  return `${businessName} <${DEFAULT_FROM_EMAIL}>`;
}

/**
 * Public mailbox providers nobody outside the provider can verify with Resend.
 * A From header on one of these domains is rejected by the API, so treating it
 * as configured delivery would turn every enquiry into a provider 403.
 */
const UNSENDABLE_FROM_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "yahoo.com",
  "icloud.com",
  "me.com",
]);

const EMAIL_LOCAL_PART = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+$/i;
const DOMAIN_LABEL = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i;

/**
 * Parse the deliberately small From-header surface accepted by the contact
 * route: either `mailbox@example.com` or `Display name <mailbox@example.com>`.
 *
 * Resend still decides whether the domain is verified. This parser prevents a
 * malformed or header-injection value from passing the build gate only to be
 * rejected for every enquiry at runtime.
 */
function parseEmailAddressFromHeader(value: string) {
  const header = value.trim();
  if (!header || header.length > 320 || /[\r\n\0]/.test(header)) {
    return null;
  }

  let address = header;
  if (header.includes("<") || header.includes(">")) {
    const mailbox =
      /^(?:(?:"(?:[^"\\\r\n]|\\.)*"|[^<>"\r\n]+?)\s*)?<([^<>]+)>$/.exec(
        header,
      );
    if (!mailbox) {
      return null;
    }
    address = mailbox[1];
  }

  const email = address.trim().toLowerCase();
  if (!email || email.length > 254) {
    return null;
  }

  const at = email.lastIndexOf("@");
  if (at <= 0 || at !== email.indexOf("@") || at === email.length - 1) {
    return null;
  }

  const localPart = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (
    localPart.length > 64 ||
    localPart.startsWith(".") ||
    localPart.endsWith(".") ||
    localPart.includes("..") ||
    !EMAIL_LOCAL_PART.test(localPart)
  ) {
    return null;
  }

  const labels = domain.split(".");
  if (
    domain.length > 253 ||
    labels.length < 2 ||
    labels.some((label) => !DOMAIN_LABEL.test(label))
  ) {
    return null;
  }

  return email;
}

export function emailAddressFromHeader(value: string) {
  return parseEmailAddressFromHeader(value) ?? "";
}

export function isResendCompatibleFrom(from: string) {
  const email = emailAddressFromHeader(from);
  if (!email) {
    return false;
  }
  return !UNSENDABLE_FROM_DOMAINS.has(email.slice(email.lastIndexOf("@") + 1));
}

type ContactEnvironment = Partial<
  Record<
    | "RESEND_API_KEY"
    | "CONTACT_FROM_EMAIL"
    | "UPSTASH_REDIS_REST_URL"
    | "UPSTASH_REDIS_REST_TOKEN"
    | "VERCEL_ENV"
    | "NODE_ENV"
    | "REQUIRE_CONTACT_DELIVERY",
    string
  >
>;

/** Problems that would make delivery fail or silently weaken rate limiting. */
export function contactEnvironmentProblems(
  env: ContactEnvironment = process.env,
) {
  const problems: string[] = [];
  if (!env.RESEND_API_KEY?.trim()) {
    problems.push("RESEND_API_KEY (required)");
  }

  const configuredFrom = env.CONTACT_FROM_EMAIL?.trim();
  if (configuredFrom && !isResendCompatibleFrom(configuredFrom)) {
    problems.push(
      "CONTACT_FROM_EMAIL (must be a valid mailbox on a Resend-verified domain, not a public-mailbox provider)",
    );
  }

  const hasUpstashUrl = Boolean(env.UPSTASH_REDIS_REST_URL?.trim());
  const hasUpstashToken = Boolean(env.UPSTASH_REDIS_REST_TOKEN?.trim());
  if (hasUpstashUrl !== hasUpstashToken) {
    problems.push(
      "UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (set both or neither)",
    );
  }

  return problems;
}

/** Environments where an invalid delivery configuration must stop the build. */
export function requiresContactDelivery(
  env: ContactEnvironment = process.env,
) {
  return (
    env.VERCEL_ENV?.trim().toLowerCase() === "production" ||
    env.NODE_ENV?.trim().toLowerCase() === "production" ||
    env.REQUIRE_CONTACT_DELIVERY === "1"
  );
}

/**
 * Sender for the enquiry email.
 *
 * Any configured value is honoured as given, including one on the business's
 * own domain. When unset, the sender is the business domain — the address
 * Resend can actually deliver from once that domain is verified.
 */
export function contactFromAddress(
  configured: string | undefined,
  businessName: string,
) {
  const value = configured?.trim();
  if (!value) {
    return defaultFromAddress(businessName);
  }
  return value;
}

/**
 * Destination for the enquiry email.
 *
 * Falls back to the published inbox when unset, and overrides a configured
 * address still pointing at the retired domain mailbox so a stale deployment
 * variable cannot quietly swallow leads.
 */
export function contactToAddress(
  configured: string | undefined,
  publicEmail: string,
) {
  const value = configured?.trim();
  if (!value || usesRetiredInbox(value)) {
    return publicEmail;
  }
  return value;
}

/**
 * `next dev` only. Never Vercel, never `next start` (NODE_ENV=production).
 *
 * Lets the quote form be exercised without a Resend key; production still
 * answers 503 when delivery is unconfigured so leads cannot disappear quietly.
 */
export function shouldCaptureEnquiryLocally(
  env: { VERCEL?: string; NODE_ENV?: string } = process.env,
) {
  return !env.VERCEL && env.NODE_ENV !== "production";
}
