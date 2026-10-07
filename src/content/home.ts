export const heroSlides = [
  {
    image: "/images/v2/home-hero-adelaide.webp",
    mobileImage: "/images/v2/home-hero-adelaide-mobile-v2.webp",
    alt: "Contemporary Adelaide home with charcoal cladding and light rendered walls",
  },
] as const;

export const heroCopy = {
  /**
   * Preferred line breaks for the headline. They are hints, not hard breaks —
   * the h1 balances its own wrapping when a line will not fit.
   */
  titleLines: [
    "Adelaide cladding, render,",
    "Hebel & walling specialists.",
  ],
  body: "One team from quote to handover.",
} as const;

export const trustPoints = [
  "Four services, one team",
  "Homes to commercial sites",
  "Adelaide & South Australia",
] as const;

export const aboutTeaser = {
  eyebrow: "About us",
  title: "The planning behind a better finish.",
  image: "/images/v2/home-team-site-review.webp",
  imageAlt: "Construction team reviewing facade details on an Adelaide building site",
  body: "We review the system, site and surrounding trades early, so the job runs smoothly.",
} as const;

export const process = {
  title: "Planned, communicated, properly finished.",
  steps: [
    { title: "Site review", body: "Plans, photos and site conditions." },
    { title: "Scope and quote", body: "Work, materials and timing in writing." },
    { title: "Installation", body: "Coordinated with surrounding trades." },
    { title: "Handover check", body: "Final review and outstanding items closed." },
  ],
} as const;
