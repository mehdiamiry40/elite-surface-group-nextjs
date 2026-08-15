/**
 * The mailbox the business has stopped reading.
 *
 * Applied to the recipient only. Enquiries must never be *delivered* there, but
 * the same address is exactly what the *sender* needs to be: Resend will only
 * send from a domain you have verified with it, and elitesurfacegroup.com.au is
 * the domain the business owns and can verify. Rejecting it as a sender leaves
 * the Gmail default in its place, and no public mail provider lets a third
 * party send as one of its addresses — so every enquiry fails at the provider
 * instead.
 */
export function usesRetiredInbox(value: string) {
  return /@elitesurfacegroup\.com\.au\b/i.test(value);
}

export function defaultFromAddress(businessName: string, publicEmail: string) {
  return `${businessName} <${publicEmail}>`;
}

/**
 * Sender for the enquiry email.
 *
 * Any configured value is honoured as given, including one on the business's
 * own domain. The default applies only when nothing is configured, and it
 * cannot actually deliver — Resend rejects a Gmail sender — so treat an unset
 * CONTACT_FROM_EMAIL as broken delivery rather than a working fallback. That is
 * what `npm run prebuild` checks for.
 */
export function contactFromAddress(
  configured: string | undefined,
  businessName: string,
  publicEmail: string,
) {
  const value = configured?.trim();
  if (!value) {
    return defaultFromAddress(businessName, publicEmail);
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
