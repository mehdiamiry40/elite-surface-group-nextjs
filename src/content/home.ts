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
  title: "Trusted Walling Specialists",
  image: "/images/trusted-walling.webp",
  imageAlt: "Elite Surface Group tradespeople rendering an interior wall",
  body: [
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

export const whyChoose = {
  titleAccent: "Why Choose",
  title: "Elite Surface Group?",
  intro:
    "We provide walling solutions that balance durability, appearance and value for the documented scope. Clients choose us because we offer:",
  image: "/images/pexels-curtis-adams-1694007-8031949.webp",
  imageAlt: "Bright living room with a smooth rendered feature wall",
  columns: [
    [
      "Practical walling and surface-finish experience",
      "Careful workmanship and quality checks",
      "Local Adelaide team",
    ],
    [
      "Project-specific scope and documentation",
      "Clear, itemised pricing",
      "Free quotes and consultations",
    ],
  ],
  closing:
    "With Elite Surface Group, you get a team focused on clear communication, reliable delivery and workmanship that matches the agreed project standard.",
} as const;

export const differentiators = {
  titleAccent: "What Sets",
  title: "Us Apart",
  items: [
    {
      icon: "/images/carpentry.webp",
      title: "Skilled Craftsmanship",
      body: "Careful workmanship checked against the agreed finish standard.",
    },
    {
      icon: "/images/rating.webp",
      title: "Experienced Team",
      body: "Practical advice and careful installation for each project.",
    },
    {
      icon: "/images/color-palette.webp",
      title: "Walling Solutions",
      body: "Cladding, rendering, Hebel panels, and related walling work.",
    },
    {
      icon: "/images/price-tag.webp",
      title: "Clear Pricing",
      body: "Honest, transparent quotes with no hidden costs.",
    },
    {
      icon: "/images/shield.webp",
      title: "Planned Project Delivery",
      body: "We agree the scope and expected programme before work begins.",
    },
    {
      icon: "/images/support.webp",
      title: "Customer Support",
      body: "Friendly guidance throughout your project.",
    },
  ],
} as const;

export const expertise = {
  titleAccent: "Experts In –",
  title: "Residential, Commercial & Industrial Walling",
  intro: "Durable, carefully finished walling solutions matched to each property and brief.",
  background: "/images/470.webp",
  items: [
    {
      icon: "/images/high-quality.webp",
      title: "Our Mission",
      body: "Reliable workmanship and clear service on every engagement.",
    },
    {
      icon: "/images/checked.webp",
      title: "Our Values",
      body: "Supporting your property’s presentation, function and agreed outcomes.",
    },
    {
      icon: "/images/diamond.webp",
      title: "Installation",
      body: "Careful installation to the agreed scope and project specification.",
    },
    {
      icon: "/images/price-tag.webp",
      title: "Clear Quotes",
      body: "Obligation-free quotes describing the included scope and pricing.",
    },
  ],
} as const;
