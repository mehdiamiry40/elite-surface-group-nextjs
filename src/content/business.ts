export const business = {
  name: "Elite Surface Group",
  legalName: "Elite Surface Group Pty Ltd",
  /** Australian Business Number, displayed with the standard 2-3-3-3 grouping. */
  abn: "35 691 074 567",
  tagline: "Adelaide Cladding, Render, Hebel & Walling Specialists",
  /** E.164 for `tel:` hrefs — never hand-write a `tel:` link anywhere else. */
  phone: "+61413844912",
  /** Human-readable form of the same number. */
  phoneDisplay: "0413 844 912",
  email: "info@elitesurfacegroup.com.au",
  area: "Adelaide & South Australia",
  address: {
    street: "22 Robin St",
    suburb: "Salisbury East",
    region: "SA",
    postcode: "5109",
    country: "AU",
    formatted: "22 Robin St, Salisbury East SA 5109",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=22%20Robin%20St%2C%20Salisbury%20East%20SA%205109",
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
