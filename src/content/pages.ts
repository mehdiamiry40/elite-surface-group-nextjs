export const contactSection = {
  eyebrow: "Get In Touch",
  title: "Ready to Transform Your Property?",
  intro:
    "Contact us today for a free quote and consultation. Our team is ready to discuss your project and recommend a practical next step.",
  formTitle: "Send Us a Message",
  formNote: "We typically respond within 24 hours.",
} as const;

export const ctaBand = {
  title: "Walling & surface finishes across Adelaide",
  body: "Every property is unique. Tell us about your cladding, render, Hebel or walling project and we will recommend a solution that balances durability, style and long-term performance for the specified system.",
  note: "Quick, easy, and obligation-free — start your project conversation today.",
  background: "/images/2150921011.webp",
} as const;

export const aboutPage = {
  bannerTitle: "About Us",
  title: "About Elite Surface Group",
  metaDescription:
    "Meet the Adelaide team providing cladding, render, Hebel and walling installations for residential and commercial projects.",
  lead: "Elite Surface Group provides walling installations and surface finishes across Adelaide and South Australia. We work with homeowners, builders and developers on residential, commercial and development projects.",
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
    "Based in Adelaide, South Australia, we work with builders, developers and homeowners on walling solutions that meet functional and aesthetic requirements. From cladding systems to render finishes and Hebel installations, our team combines practical trade knowledge with attention to detail on every project.",
    "Our project experience spans residential homes, multi-unit developments and commercial sites. We adapt the installation plan to the documented scope, system requirements and conditions on each site.",
  ],
  prideLead: "At Elite Surface Group, we pride ourselves on:",
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
    "We take a hands-on approach to every job, with careful planning, skilled execution and a clear final quality check. Whether it is a new build, renovation or larger development, our goal is to deliver the agreed walling solution and finish.",
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
  bannerTitle: "Contact Us",
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
