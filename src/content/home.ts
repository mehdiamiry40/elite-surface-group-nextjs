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
  titleLines: ["Adelaide cladding,", "render, Hebel", "& walling"],
  body: "One team for walls and exterior finishes on Adelaide homes, renovations and commercial builds — from the first quote to handover.",
  /** Short proof points shown under the hero actions. Facts only. */
  assurances: [
    "Obligation-free quotes",
    "Homes, renovations & commercial",
    business.area,
  ],
} as const;

/** `icon` keys map to components in the homepage, keeping content JSX-free. */
export const trustPoints = [
  {
    icon: "layers",
    title: "Four specialist services",
    body: "One team, one clear scope.",
  },
  {
    icon: "building",
    title: "Homes to commercial sites",
    body: "New builds, renovations and multi-unit.",
  },
  {
    icon: "pin",
    title: "Adelaide & South Australia",
    body: "Local, straightforward quotes.",
  },
] as const;

export const aboutTeaser = {
  eyebrow: "About Elite Surface Group",
  title: "The planning behind a better finish.",
  image: "/images/v2/home-team-site-review.webp",
  imageAlt: "Construction team reviewing facade details on an Adelaide building site",
  body: [
    "We review the system, site and surrounding trades before work starts, so the job runs smoothly.",
  ],
  facts: [
    { icon: "pin", label: `Based in ${business.address.suburb}` },
    { icon: "clock", label: "Monday–Saturday, 9am–5pm" },
    { icon: "phone", label: business.phoneDisplay, href: `tel:${business.phone}` },
  ],
} as const;

export const coverage = {
  eyebrow: "Adelaide & South Australia",
  title: "Local knowledge. Site-ready delivery.",
  body: "From a single facade to a full walling package, planned around your site and programme.",
  points: [
    { icon: "clipboard", label: "Planned around your site" },
    { icon: "layers", label: "Installed to the specified system" },
    { icon: "hardhat", label: "Coordinated with surrounding trades" },
  ],
  image: "/images/v2/home-adelaide-coverage.webp",
  imageAlt: "Contemporary Adelaide home with charcoal cladding and native landscaping",
} as const;

export const process = {
  title: "Well planned. Clearly communicated. Properly finished.",
  intro: "Clear scope, clear materials, clear timing.",
  steps: [
    {
      icon: "search",
      title: "Site review",
      body: "Plans, photos and site conditions.",
    },
    {
      icon: "clipboard",
      title: "Scope and quote",
      body: "Work, materials and timing in writing.",
    },
    {
      icon: "hardhat",
      title: "Installation",
      body: "Coordinated with the trades around us.",
    },
    {
      icon: "shield",
      title: "Handover check",
      body: "Outstanding items resolved before handover.",
    },
  ],
} as const;

export const audiences = [
  {
    eyebrow: "For homeowners & renovators",
    icon: "home",
    title: "Turn your ideas into a clear plan.",
    body: "Tell us the finish you have in mind and what plans or photos are available.",
    image: "/images/v2/homeowner-consultation.webp",
    imageAlt: "Homeowner and estimator reviewing exterior renovation materials",
    href: "/contact-us/#contact",
    linkLabel: "Discuss your project",
  },
  {
    eyebrow: "For builders & developers",
    icon: "building",
    title: "A trade partner who works to the programme.",
    body: "Share your drawings and programme — we’ll clarify scope and handovers.",
    image: "/images/v2/builders-plan-review.webp",
    imageAlt: "Builder and tradesperson reviewing elevation drawings on site",
    href: "/services/",
    linkLabel: "Explore our services",
  },
] as const;

/* ------------------------------------------------ concept-style homepage */

export const welcome = {
  title: `Welcome to ${business.name}`,
  subtitle: "Cladding, render, Hebel and walling for Adelaide homes and builders",
  body: [
    `${business.name} installs cladding, render, Hebel and walling for new homes, renovations, multi-unit developments and commercial projects across Adelaide and South Australia.`,
    "We review the system, site and surrounding trades before work starts, so responsibilities are clear and the job runs smoothly.",
  ],
  callLabel: "Call us – get a free quote",
  image: "/images/v2/project-two-storey-exterior-render.webp",
  imageAlt:
    "Two-storey home with a light render finish across its upper and lower walls",
} as const;

export const specialists = {
  title: "Cladding and render specialists in Adelaide",
  heading: "Local knowledge. Site-ready delivery.",
  subtitle: "Planned around your site, system and programme.",
  body: [
    "From a single feature facade to a complete walling package, we plan the work around your site, the selected system and the wider construction programme.",
    "Each job is installed to the manufacturer’s system and the project specification, and coordinated with the trades around us.",
  ],
  image: "/images/v2/project-curved-render-detail.webp",
  imageAlt: "Curved upper wall finished in a continuous light render",
} as const;

export const consultation = {
  title: "Get a free quote",
  image: "/images/v2/project-rendered-columns-stone.webp",
  body: "Tell us about the job and what plans or photos you have, and we’ll arrange the next step.",
} as const;

export const expect = {
  title: "What you can expect",
  intro: `Working with ${business.name}, you can expect:`,
  features: [
    {
      icon: "layers",
      title: "Four specialist services",
      body: "Cladding, render, Hebel and walling under one scope.",
    },
    {
      icon: "clipboard",
      title: "Clear written quotes",
      body: "Work, materials and timing set out in writing.",
    },
    {
      icon: "building",
      title: "Homes to commercial",
      body: "New builds, renovations and multi-unit work.",
    },
    {
      icon: "pin",
      title: "Local to Adelaide",
      body: `Based in ${business.address.suburb}, working across SA.`,
    },
  ],
  image: "/images/v2/project-rendered-window-reveal.webp",
  imageAlt: "Deep rendered return framing a large glazed opening",
} as const;
