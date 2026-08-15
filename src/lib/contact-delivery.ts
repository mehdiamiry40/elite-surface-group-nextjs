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

export function emailAddressFromHeader(value: string) {
  const angled = value.match(/<([^>]+)>/);
  return (angled ? angled[1] : value).trim().toLowerCase();
}

export function isResendCompatibleFrom(from: string) {
  const email = emailAddressFromHeader(from);
  const at = email.lastIndexOf("@");
  if (at <= 0 || at === email.length - 1) {
    return false;
  }
  return !UNSENDABLE_FROM_DOMAINS.has(email.slice(at + 1));
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
