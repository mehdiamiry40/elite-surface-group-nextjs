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
  siteUrl: "https://elitesurfacegroup.com.au",
  openingHours: "Mo-Sa 09:00-17:00",
  openingHoursDisplay: "Monday–Saturday, 9:00 am–5:00 pm",
  /**
   * Public profile URLs. Leave empty until real pages exist — the footer only
   * renders icons for URLs that are set.
   */
  social: {
    facebook: "",
    instagram: "",
  },
} as const;
