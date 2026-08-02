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
  eyebrow: "Cladding · Render · Hebel · Walling",
  title: "Walling and exterior finishes for Adelaide builds.",
  body: "For homes, renovations and commercial projects. We quote the scope clearly, install the specified system and pay attention to the junctions and finish.",
} as const;

export const aboutTeaser = {
  eyebrow: "Based in Adelaide",
  title: "Cladding, render and walling under one scope",
  image: "/images/trusted-walling.webp",
  imageAlt: "Elite Surface Group tradespeople rendering an interior wall",
  body: [
    `${business.name} installs cladding, render, Hebel and walling on homes and commercial projects across Adelaide and South Australia.`,
    "We plan the work around the specified system, site conditions and surrounding trades, with the scope and responsibilities set out before installation begins.",
  ],
} as const;

export const process = {
  title: "Our Professional Process",
  intro:
    "From the first site review to handover, we keep the scope, materials and timing visible. If site conditions change, we discuss them before the work continues.",
  image: "/images/2148211774.webp",
  imageAlt: "Modern dining space framed by a finished feature wall",
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
