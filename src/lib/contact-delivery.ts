import { business } from "../content/business";

export const DEFAULT_FROM_EMAIL = `${business.name} <${business.email}>`;

export function usesRetiredInbox(value: string) {
  return /@elitesurfacegroup\.com\.au\b/i.test(value);
}

export function contactFromAddress(
  configured = process.env.CONTACT_FROM_EMAIL,
) {
  const value = configured?.trim();
  if (!value || usesRetiredInbox(value)) {
    return DEFAULT_FROM_EMAIL;
  }
  return value;
}

export function contactToAddress(configured = process.env.CONTACT_TO_EMAIL) {
  const value = configured?.trim();
  if (!value || usesRetiredInbox(value)) {
    return business.email;
  }
  return value;
}
