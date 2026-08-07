export const contactSection = {
  eyebrow: "Project enquiries",
  title: "Tell us what you’re planning.",
  intro:
    "Share the suburb, property type and the work you need. We’ll review the details and reply within one business day.",
  formTitle: "Project details",
  formNote: "A few specifics help us price the right scope.",
} as const;

export const ctaBand = {
  title: "Planning cladding, render or walling work?",
  body: "Send through the plans, photos or a short brief. We’ll confirm what we need to quote the scope and timing.",
  note: "Quotes are obligation-free.",
  background: "/images/v2/cta-render-action.webp",
} as const;

export const aboutPage = {
  bannerTitle: "About Our Adelaide Team",
  metaTitle: "About Our Adelaide Team",
  title: "About Elite Surface Group",
  metaDescription:
    "Meet the Adelaide team providing cladding, render, Hebel and walling installations for residential and commercial projects.",
  lead: "Elite Surface Group installs cladding, render, Hebel and walling across Adelaide and South Australia for homeowners, builders and developers.",
  identity:
    "Elite Surface Group is operated by Elite Surface Group Pty Ltd (ABN 35 691 074 567), with its main business location in South Australia.",
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
    "Our work spans residential homes, multi-unit developments and commercial sites. Each installation is planned around the documented scope, system requirements and conditions on site.",
    "We coordinate with builders and adjoining trades so substrates, junctions and finishes are ready in the right sequence.",
  ],
  prideLead: "What clients can expect:",
  pride: [
    [
      "Professional installers with practical site experience",
      "Materials and systems agreed in the project scope",
    ],
    [
      "Clear communication and agreed programmes",
      "Work aligned with the project specification",
    ],
  ],
  closing:
    "For new builds, renovations and larger developments, our focus is the same: a clear scope, practical site coordination and the agreed finish.",
} as const;

export const servicesPage = {
  bannerTitle: "Cladding, Render, Hebel & Walling Services",
  metaDescription:
    "Cladding, render, Hebel and complete walling services across Adelaide and South Australia, delivered by Elite Surface Group.",
} as const;

export const projectsPage = {
  bannerTitle: "Render & Cladding Projects Adelaide",
  metaDescription:
    "Explore render and cladding project details from Elite Surface Group across Adelaide and South Australia.",
} as const;

export const contactPage = {
  bannerTitle: "Contact Our Adelaide Team",
  metaTitle: "Contact Our Adelaide Team",
  metaDescription:
    "Get in touch with Elite Surface Group for a free, obligation-free quote on cladding, render, Hebel and walling work in Adelaide.",
  intro:
    "Tell us about your project and we’ll get back to you within one business day with advice and an obligation-free quote.",
} as const;

/** Banner background images, keyed by route. */
export const bannerImages: Record<string, string> = {
  "/about": "/images/v2/banner-about.webp",
  "/services": "/images/v2/banner-services.webp",
  "/cladding": "/images/v2/banner-cladding.webp",
  "/render": "/images/v2/banner-render.webp",
  "/hebel": "/images/v2/banner-hebel.webp",
  "/walling": "/images/v2/banner-walling.webp",
  "/projects": "/images/v2/banner-projects.webp",
  "/locations": "/images/v2/banner-locations.webp",
  "/locations/adelaide": "/images/v2/banner-locations.webp",
  "/contact-us": "/images/v2/banner-contact.webp",
  "/privacy-policy": "/images/v2/banner-legal.webp",
  "/terms-of-service": "/images/v2/banner-legal.webp",
};
