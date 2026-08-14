export const CONVERSION_EVENT_NAMES = {
  enquirySubmitted: "Enquiry Submitted",
  phoneClick: "Phone Click",
  emailClick: "Email Click",
  directionsClick: "Directions Click",
} as const;

/**
 * The analytics URL is reporting context, never a payload channel. Stripping
 * search and hash values protects against future routes that use either for
 * personal details or tokens.
 */
export function redactAnalyticsUrl(value: string, origin: string) {
  const url = new URL(value, origin);
  url.search = "";
  url.hash = "";
  return url.toString();
}

export function contactEventName(href: string, directionsUrl: string) {
  if (href.startsWith("tel:")) {
    return CONVERSION_EVENT_NAMES.phoneClick;
  }
  if (href.startsWith("mailto:")) {
    return CONVERSION_EVENT_NAMES.emailClick;
  }
  if (href === directionsUrl) {
    return CONVERSION_EVENT_NAMES.directionsClick;
  }
  return null;
}
