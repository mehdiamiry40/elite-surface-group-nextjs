export const business = {
  name: "Elite Surface Group",
  legalName: "Elite Surface Group Pty Ltd",
  /** Australian Business Number, displayed with the standard 2-3-3-3 grouping. */
  abn: "35 691 074 567",
  tagline: "Adelaide Cladding, Render, Hebel & Walling Specialists",
  /** E.164 for `tel:` hrefs — never hand-write a `tel:` link anywhere else. */
  phone: "+61470353225",
  /** Human-readable form of the same number. */
  phoneDisplay: "0470 353 225",
  email: "elite.surfacegroup@gmail.com",
  area: "Adelaide & South Australia",
  serviceAreas: [
    { "@type": "City", name: "Adelaide" },
    { "@type": "AdministrativeArea", name: "South Australia" },
  ],
  /**
   * Public locality only. No street, postcode or map URL is published — this
   * is a service-area contractor, not a customer-facing shopfront.
   */
  address: {
    suburb: "Salisbury East",
    region: "SA",
    country: "AU",
  },
  siteUrl: "https://elitesurfacegroup.com.au",
  hours: {
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "09:00",
    closes: "17:00",
    display: "Monday–Saturday, 9:00 am–5:00 pm",
  },
  /**
   * Public profile URLs. Leave empty until real pages exist — the footer only
   * renders icons for URLs that are set.
   */
  social: {
    facebook: "",
    instagram: "https://www.instagram.com/elite.surface.group/",
  },
} as const;

export const unavailableDeliveryCopy = `Email delivery is unavailable right now. You can call us on ${business.phoneDisplay}, or continue in your email app.`;
