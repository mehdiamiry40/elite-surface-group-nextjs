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
  brand: business.name,
  title: business.tagline,
  body: "Cladding, render, Hebel and walling for Adelaide homes and commercial builds — specified for each project, finished with care.",
} as const;

export const aboutTeaser = {
  eyebrow: "Adelaide's",
  title: "Walling Specialists",
  image: "/images/trusted-walling.webp",
  imageAlt: "Elite Surface Group tradespeople rendering an interior wall",
  body: [
    `${business.name} is operated by ${business.legalName} (ABN ${business.abn}), with its main business location in South Australia.`,
    "Elite Surface Group works on homes and commercial properties across Adelaide and South Australia. Our team combines practical walling experience with careful planning, clear communication and attention to finish.",
    "Whether it is modern cladding, professional rendering or Hebel panel installation, we focus on results that improve presentation and support the long-term performance of the wall system when maintained as recommended.",
  ],
} as const;

export const process = {
  title: "Our Professional Process",
  intro:
    "Successful projects start with clear communication and finish with a documented quality check. Our process keeps scope, pricing and programme visible at every stage.",
  image: "/images/2148211774.webp",
  imageAlt: "Modern dining space framed by a finished feature wall",
  steps: [
    {
      title: "Consultation & Site Assessment",
      body: "We meet with you to understand your goals, inspect the site, and recommend a suitable cladding or walling approach for the property and brief.",
    },
    {
      title: "Detailed & Transparent Quote",
      body: "You receive a clear, obligation-free quote outlining scope, materials, timeline assumptions and pricing — no hidden line items.",
    },
    {
      title: "Careful Installation",
      body: "Our team carries out the installation with attention to safety and detailing, using materials and systems agreed in the quote.",
    },
    {
      title: "Final Quality Check",
      body: "Before handover we inspect the completed work against the agreed scope and finish expectations.",
    },
  ],
} as const;
