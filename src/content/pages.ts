import { business } from "@/content/business";

export const contactSection = {
  eyebrow: "Project enquiries",
  title: "Tell us about your project.",
  intro:
    "Share the suburb, property type and work you have in mind. We’ll review the details and follow up about the next step.",
  formTitle: "Project details",
  formNote: "A few useful details will help us understand and price the work.",
} as const;

export const ctaBand = {
  title: "Ready to move your project forward?",
  body: "Tell us what work you have in mind and what plans or photos are available. If supporting files are needed, we’ll arrange how to review them.",
  note: "Quotes are obligation-free.",
  background: "/images/v2/cta-render-action.webp",
} as const;

export const aboutPage = {
  bannerTitle: "The Team Behind the Finish",
  metaTitle: "About Our Adelaide Team",
  title: "Practical expertise, from planning to handover",
  metaDescription:
    "Meet our Salisbury East-based team providing cladding, render, Hebel and walling installations across Adelaide and South Australia.",
  lead: "Elite Surface Group brings cladding, render, Hebel and walling together for homeowners, builders and developers across Adelaide and South Australia.",
  identity: `${business.name} is operated by ${business.legalName} (ABN ${business.abn}), based in ${business.address.suburb}, ${business.address.region}. From this Adelaide base, we deliver cladding, render, Hebel and walling work across metropolitan Adelaide and wider South Australia.`,
  gallery: [
    {
      image: "/images/v2/home-team-site-review.webp",
      alt: "Construction team reviewing plans and facade details on site",
      width: 1600,
      height: 1200,
    },
    {
      image: "/images/v2/service-render-application.webp",
      alt: "Tradesperson finishing fresh exterior render with a hand trowel",
      width: 1600,
      height: 1067,
    },
    {
      image: "/images/v2/service-cladding-installation.webp",
      alt: "Installer fixing charcoal vertical cladding around a window",
      width: 1600,
      height: 1067,
    },
    {
      image: "/images/v2/service-walling-installation.webp",
      alt: "Installer checking steel wall framing with a laser level",
      width: 1600,
      height: 1067,
    },
  ],
  body: [
    "Our work spans new homes, renovations, multi-unit developments and commercial sites. Every installation is shaped by the plans, the selected system and the real conditions on site.",
    "We work closely with builders and adjoining trades so substrates, junctions and finishes are ready at the right time—not left to become someone else’s problem later.",
  ],
  prideLead: "What you can expect from us:",
  pride: [
    [
      "Careful installers with practical site experience",
      "Materials and systems confirmed before work begins",
    ],
    [
      "Clear communication and realistic programmes",
      "Work delivered to the agreed project specification",
    ],
  ],
  closing:
    "Whether the job is a single facade or a larger development, our focus stays the same: clear expectations, practical coordination and a finish everyone can be proud of.",
} as const;

export const servicesPage = {
  bannerTitle: "Cladding, Render, Hebel & Walling",
  metaDescription:
    "Explore cladding, render, Hebel and walling services for homes and commercial projects across Adelaide and South Australia.",
} as const;

export const projectsPage = {
  bannerTitle: "Cladding & Render Project Case Studies",
  metaDescription:
    "Explore image-backed cladding and render case studies from residential work, with the project type, visible details and recorded finish.",
} as const;

export const contactPage = {
  bannerTitle: "Let’s Talk About Your Project",
  metaTitle: "Contact Our Salisbury East Team",
  metaDescription: `Contact ${business.name} for cladding, render, Hebel and walling enquiries across Adelaide.`,
  intro:
    "Tell our Salisbury East team what you’re planning and where the project is located. We’ll review the details and follow up about the next step.",
} as const;

/** Banner background images, keyed by route. */
export const bannerImages: Record<string, string> = {
  "/about": "/images/v2/banner-about.webp",
  "/services": "/images/v2/banner-services.webp",
  "/cladding": "/images/v2/banner-cladding.webp",
  "/render": "/images/v2/banner-render.webp",
  "/hebel": "/images/v2/banner-hebel.webp",
  "/walling": "/images/v2/banner-walling.webp",
  "/project-planning": "/images/v2/banner-services.webp",
  "/resources": "/images/v2/banner-services.webp",
  "/resources/render-cracking-adelaide": "/images/v2/banner-render.webp",
  "/resources/cladding-maintenance-coastal-adelaide":
    "/images/v2/banner-cladding.webp",
  "/resources/rendering-hebel-panels-adelaide":
    "/images/v2/banner-hebel.webp",
  "/resources/hebel-boundary-walls-adelaide":
    "/images/v2/banner-hebel.webp",
  "/resources/rendering-over-painted-brick-adelaide":
    "/images/v2/banner-render.webp",
  "/projects": "/images/v2/banner-projects.webp",
  "/locations": "/images/v2/banner-locations.webp",
  "/locations/adelaide": "/images/v2/banner-locations.webp",
  "/contact-us": "/images/v2/banner-contact.webp",
  "/privacy-policy": "/images/v2/banner-legal.webp",
  "/terms-of-service": "/images/v2/banner-legal.webp",
};
