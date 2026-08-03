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
  background: "/images/2150921011.webp",
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
      image: "/images/hebel.webp",
      alt: "Hebel panel wall system installation",
      width: 1000,
      height: 646,
    },
    {
      image: "/images/trusted-walling.webp",
      alt: "Tradespeople rendering an interior wall",
      width: 1000,
      height: 668,
    },
    {
      image: "/images/cladding.webp",
      alt: "Exterior cladding on a modern Adelaide home",
      width: 1000,
      height: 667,
    },
    {
      image: "/images/walling.webp",
      alt: "Finished interior walling with a painted surface",
      width: 1000,
      height: 778,
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
  bannerTitle: "Cladding & Walling Projects Adelaide",
  metaDescription:
    "See completed cladding, render, Hebel and walling projects delivered by Elite Surface Group across Adelaide and South Australia.",
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
  "/about": "/images/pexels-eye4dtail-118009.webp",
  "/services": "/images/2185.webp",
  "/cladding": "/images/cladding.webp",
  "/render": "/images/render.webp",
  "/hebel": "/images/hebel.webp",
  "/walling": "/images/walling.webp",
  "/projects": "/images/2197.webp",
  "/locations": "/images/banner.webp",
  "/locations/adelaide": "/images/banner.webp",
  "/contact-us": "/images/pexels-fwstudio-33348-131637.webp",
  "/privacy-policy": "/images/pexels-peter-vang-2157328093-35419416.webp",
  "/terms-of-service": "/images/pexels-peter-vang-2157328093-35419416.webp",
};
