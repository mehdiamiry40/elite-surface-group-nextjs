import { business } from "@/content/business";

export const heroSlides = [
  {
    image: "/images/banner.webp",
    alt: "Contemporary Adelaide home with dark cladding and a landscaped frontage",
  },
  {
    image: "/images/10734.webp",
    alt: "Rendered exterior wall detail on a modern residential build",
  },
  {
    image: "/images/pexels-karola-g2-5701.webp",
    alt: "Textured render finish on an exterior feature wall",
  },
] as const;

export const heroCopy = {
  eyebrow: "Adelaide walling & exterior finish specialists",
  titleLines: ["Built for performance.", "Finished with precision."],
  body: "Cladding, render, Hebel and walling coordinated under one clear scope for homes, renovations and commercial builds across Adelaide.",
} as const;

export const trustPoints = [
  {
    eyebrow: "One coordinated scope",
    title: "Four specialist systems",
    body: "Cladding, render, Hebel and walling planned around the same project brief.",
  },
  {
    eyebrow: "Built around the site",
    title: "Residential & commercial",
    body: "Practical installation for homes, renovations, multi-unit and commercial work.",
  },
  {
    eyebrow: "Local project delivery",
    title: "Adelaide & South Australia",
    body: "Clear quoting, trade coordination and a defined handover process.",
  },
] as const;

export const aboutTeaser = {
  eyebrow: "About Elite Surface Group",
  title: "The details behind a clean, considered finish.",
  image: "/images/trusted-walling.webp",
  imageAlt: "Two tradespeople finishing a bright interior wall",
  body: [
    `${business.name} installs cladding, render, Hebel and walling on homes, renovations, multi-unit developments and commercial projects across Adelaide and South Australia.`,
    "We plan each installation around the specified system, site conditions and surrounding trades, with the scope and responsibilities made clear before work begins.",
  ],
} as const;

export const coverage = {
  eyebrow: "Adelaide & South Australia",
  title: "Local knowledge. Project-ready delivery.",
  body: "From a focused facade upgrade to a coordinated walling package, we review the brief, confirm the system requirements and plan the work around the wider build.",
  image: "/images/cladding.webp",
  imageAlt: "Contemporary home exterior with timber-look cladding",
} as const;

export const process = {
  title: "Clear from first review to final handover.",
  intro:
    "From the first site review to handover, we keep the scope, materials and timing visible. If site conditions change, we discuss them before the work continues.",
  steps: [
    {
      title: "Site review",
      body: "We review the plans, photos and site conditions, then confirm the work that needs to be quoted.",
    },
    {
      title: "Scope and quote",
      body: "The quote sets out the scope, materials, responsibilities and timing assumptions.",
    },
    {
      title: "Installation",
      body: "Installation follows the agreed system details and is coordinated with the surrounding trades.",
    },
    {
      title: "Handover check",
      body: "We check the completed work against the agreed scope and close out outstanding items before handover.",
    },
  ],
} as const;

export const audiences = [
  {
    eyebrow: "For homeowners & renovators",
    title: "Bring the idea. We’ll help define the scope.",
    body: "Share photos, plans and the finish you have in mind. We’ll clarify what needs to be inspected and quoted before work begins.",
    image: "/images/2148211774.webp",
    imageAlt: "Close-up of pale masonry blocks",
    href: "/contact-us/#contact",
    linkLabel: "Discuss your project",
  },
  {
    eyebrow: "For builders & developers",
    title: "A walling partner built around the programme.",
    body: "Send the drawings, specification and programme. We’ll review scope boundaries, system details and coordination points with adjoining trades.",
    image: "/images/470.webp",
    imageAlt: "Building plans, scale rulers and drawing tools",
    href: "/services/",
    linkLabel: "Explore our services",
  },
] as const;
