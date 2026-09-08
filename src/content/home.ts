import { business } from "@/content/business";

export const heroSlides = [
  {
    image: "/images/v2/home-hero-adelaide.webp",
    mobileImage: "/images/v2/home-hero-adelaide-mobile-v2.webp",
    alt: "Contemporary Adelaide home with charcoal cladding and light rendered walls",
  },
] as const;

export const heroCopy = {
  eyebrow: "Cladding, render, Hebel & walling across Adelaide",
  /**
   * Preferred line breaks for the headline. They are hints, not hard breaks —
   * the h1 balances its own wrapping when a line will not fit.
   */
  titleLines: [
    "Adelaide cladding, render,",
    "Hebel & walling specialists.",
  ],
  body: "One team for carefully planned, professionally installed walling and exterior finishes—from the first quote through to handover.",
  /** Short proof points shown under the hero actions. Facts only. */
  assurances: [
    "Obligation-free quotes",
    "Homes, renovations & commercial",
    business.area,
  ],
} as const;

export const trustPoints = [
  {
    eyebrow: "One point of contact",
    title: "Four specialist services",
    body: "Bring cladding, render, Hebel and walling together under one clearly defined scope.",
  },
  {
    eyebrow: "Projects of every scale",
    title: "Homes to commercial sites",
    body: "Practical installation for new homes, renovations, multi-unit developments and commercial builds.",
  },
  {
    eyebrow: "Local, reliable delivery",
    title: "Adelaide & South Australia",
    body: "Straightforward quotes, thoughtful trade coordination and clear communication throughout.",
  },
] as const;

export const aboutTeaser = {
  eyebrow: "About Elite Surface Group",
  title: "The planning behind a better finish.",
  image: "/images/v2/home-team-site-review.webp",
  imageAlt: "Construction team reviewing facade details on an Adelaide building site",
  body: [
    `${business.name} delivers cladding, render, Hebel and walling for homes, renovations, multi-unit developments and commercial projects across Adelaide and South Australia.`,
    "Good work starts well before installation. We review the system, site conditions and surrounding trades early, so responsibilities are clear and the job is ready to run smoothly.",
  ],
} as const;

export const coverage = {
  eyebrow: "Adelaide & South Australia",
  title: "Local knowledge. Site-ready delivery.",
  body: "From a focused facade update to a complete walling package, we plan the work around your site, the selected system and the wider construction programme.",
  image: "/images/v2/home-adelaide-coverage.webp",
  imageAlt: "Contemporary Adelaide home with charcoal cladding and native landscaping",
} as const;

export const process = {
  title: "Well planned. Clearly communicated. Properly finished.",
  intro:
    "You’ll know what is included, which materials are being used and when the work is due to happen. If site conditions change, we raise it early and agree on the next step.",
  steps: [
    {
      title: "Site review",
      body: "We review your plans, photos and site conditions to understand the work and identify any open questions.",
    },
    {
      title: "Scope and quote",
      body: "Your quote clearly sets out the work, materials, responsibilities and timing assumptions.",
    },
    {
      title: "Installation",
      body: "We install the agreed system and coordinate our work with the trades around us.",
    },
    {
      title: "Handover check",
      body: "We review the completed work, resolve any outstanding items and leave the project ready for handover.",
    },
  ],
} as const;

export const audiences = [
  {
    eyebrow: "For homeowners & renovators",
    title: "Turn your ideas into a clear plan.",
    body: "Tell us what plans or photos are available and the finish you have in mind. If supporting files are needed, we’ll arrange how to review them before work is scoped.",
    image: "/images/v2/homeowner-consultation.webp",
    imageAlt: "Homeowner and estimator reviewing exterior renovation materials",
    href: "/contact-us/#contact",
    linkLabel: "Discuss your project",
  },
  {
    eyebrow: "For builders & developers",
    title: "A trade partner who works to the programme.",
    body: "Tell us what drawings, specifications and programme information are available. We’ll arrange how to review what is needed to clarify scope and adjoining-trade handovers.",
    image: "/images/v2/builders-plan-review.webp",
    imageAlt: "Builder and tradesperson reviewing elevation drawings on site",
    href: "/services/",
    linkLabel: "Explore our services",
  },
] as const;
