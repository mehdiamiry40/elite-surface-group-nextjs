export function usesRetiredInbox(value: string) {
  return /@elitesurfacegroup\.com\.au\b/i.test(value);
}

export function defaultFromAddress(businessName: string, publicEmail: string) {
  return `${businessName} <${publicEmail}>`;
}

export function contactFromAddress(
  configured: string | undefined,
  businessName: string,
  publicEmail: string,
) {
  const value = configured?.trim();
  if (!value || usesRetiredInbox(value)) {
    return defaultFromAddress(businessName, publicEmail);
  }
  return value;
}

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
