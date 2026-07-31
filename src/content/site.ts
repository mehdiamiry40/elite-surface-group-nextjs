/**
 * Single source of truth for site content.
 *
 * Copy was carried over from the WordPress site this project replaced. Edit it
 * here — there is no CMS behind the site any more.
 */

export const business = {
  name: "Elite Surface Group",
  tagline: "Adelaide Walling Installation & Finish Specialists",
  /** E.164 for `tel:` hrefs — never hand-write a `tel:` link anywhere else. */
  phone: "+61413844912",
  /** Human-readable form of the same number. */
  phoneDisplay: "0413 844 912",
  email: "info@elitesurfacegroup.com.au",
  area: "Adelaide & South Australia",
  siteUrl: "https://elitesurfacegroup.com.au",
  openingHours: "Mo-Sa 09:00-17:00",
  openingHoursDisplay: "Monday–Saturday, 9:00 am–5:00 pm",
  /**
   * Public profile URLs. Leave empty until real pages exist — the footer only
   * renders icons for URLs that are set.
   */
  social: {
    facebook: "",
    instagram: "",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: readonly NavItem[];
};

export const mainNav: readonly NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Cladding", href: "/cladding" },
      { label: "Render", href: "/render" },
      { label: "Hebel", href: "/hebel" },
      { label: "Walling", href: "/walling" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact-us" },
];

export const footerNav = {
  quickLinks: [
    { label: "About Us", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact Us", href: "/contact-us" },
  ],
  services: [
    { label: "Cladding", href: "/cladding" },
    { label: "Render", href: "/render" },
    { label: "Hebel", href: "/hebel" },
    { label: "Walling", href: "/walling" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
} as const;

export const footerBlurb =
  "Elite Surface Group provides cladding, render, Hebel and walling services across Adelaide and South Australia, with a focus on careful installation, clear communication and durable finishes.";

/* ---------------------------------------------------------------- services */

export type Service = {
  slug: "cladding" | "render" | "hebel" | "walling";
  name: string;
  /** Heading as it appears on the service page banner. */
  bannerTitle: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  /** Short blurb used on the homepage service cards. */
  summary: string;
  metaTitle: string;
  metaDescription: string;
  intro: readonly string[];
  detail: readonly string[];
  benefitsLead: string;
  benefits: readonly string[];
  closing: string;
};

export const services: readonly Service[] = [
  {
    slug: "cladding",
    name: "Cladding",
    bannerTitle: "Cladding Installation Adelaide",
    image: "/images/cladding.webp",
    imageAlt:
      "Modern home with dark timber-look exterior cladding installed by Elite Surface Group",
    imageWidth: 1000,
    imageHeight: 667,
    summary:
      "We provide high-quality cladding solutions that enhance your property’s appearance and protection. Our team ensures a precise installation using durable materials that withstand Adelaide’s weather.",
    metaTitle: "Cladding Installation Adelaide",
    metaDescription:
      "Professional cladding installation across Adelaide and South Australia. Durable, weather-resistant systems for residential and commercial properties.",
    intro: [
      "Cladding is one of the most effective ways to enhance both the appearance and performance of a building. At Elite Surface Group, we specialise in professional cladding installations that improve durability, insulation, and visual appeal.",
      "We work with a range of cladding systems suitable for residential and commercial projects, ensuring precise installation and long-term performance. Our cladding solutions are designed to withstand South Australia’s climate while delivering a clean, modern finish.",
    ],
    detail: [
      "Our cladding process focuses on precision, safety, and long-term performance. We carefully assess each project to recommend the most suitable cladding system based on design, environmental exposure, and budget. By using proven installation techniques and quality materials, we ensure a seamless finish that enhances both the functionality and appearance of the building for years to come.",
    ],
    benefitsLead: "Benefits of our cladding services include:",
    benefits: [
      "Improved thermal and acoustic performance",
      "Enhanced exterior appearance",
      "Added protection against weather elements",
      "Low-maintenance, long-lasting finishes",
    ],
    closing:
      "From contemporary homes to large developments, we deliver cladding solutions tailored to your project’s requirements.",
  },
  {
    slug: "render",
    name: "Render",
    bannerTitle: "Rendering Services Adelaide",
    image: "/images/render.webp",
    imageAlt:
      "Smooth rendered interior wall with a clean contemporary finish by Elite Surface Group",
    imageWidth: 1000,
    imageHeight: 422,
    summary:
      "Our professional rendering services give walls a smooth and polished finish. We specialise in both new render applications and repairs, ensuring a long-lasting and visually appealing result.",
    metaTitle: "Rendering Services Adelaide",
    metaDescription:
      "Expert rendering services in Adelaide. Smooth, textured and custom render finishes for internal and external walls, applied to last.",
    intro: [
      "Our professional render services provide smooth, durable, and visually striking finishes for both internal and external walls. We prepare and apply each finish with close attention to the substrate, conditions, and project specification.",
      "We offer a variety of render finishes to suit different architectural styles, whether you’re after a modern, textured, or classic look. Our team focuses on proper surface preparation and expert application to achieve long-lasting results.",
    ],
    detail: [
      "At Elite Surface Group, we understand that rendering is both a technical and visual process. That’s why we pay close attention to surface preparation, weather conditions, and finishing techniques to achieve consistent and durable results. Our render solutions are designed to resist cracking and wear, providing a polished finish that maintains its appearance over time.",
    ],
    benefitsLead: "Why choose our render services:",
    benefits: [
      "Clean and consistent finishes",
      "Improved wall protection and durability",
      "Suitable for residential and commercial properties",
      "Custom finishes to match your design vision",
    ],
    closing:
      "A quality render not only enhances appearance but also adds value and protection to your property.",
  },
  {
    slug: "hebel",
    name: "Hebel",
    bannerTitle: "Hebel Wall Systems Adelaide",
    image: "/images/hebel.webp",
    imageAlt:
      "Hebel panel wall system installed on a modern build by Elite Surface Group",
    imageWidth: 1000,
    imageHeight: 646,
    summary:
      "We install Hebel panels for residential and commercial projects, following the specified system details for accurate placement, fixing and finishing.",
    metaTitle: "Hebel Wall Systems Adelaide",
    metaDescription:
      "Hebel wall system installation in Adelaide. Lightweight panels with thermal, acoustic and fire-performance properties when specified and installed as a complete system.",
    intro: [
      "Elite Surface Group specialises in Hebel wall systems, a lightweight yet highly durable solution ideal for modern construction. Hebel panels are known for their strength, fire resistance, thermal efficiency, and acoustic performance.",
      "Our team handles complete Hebel installations with attention to panel placement, fixing and detailing. Final system performance depends on the specified product, design and complete installed assembly.",
    ],
    detail: [
      "Hebel systems require specialist knowledge and accurate installation, and our team is trained to deliver both. We ensure correct panel placement, secure fixing, and proper detailing to maximise the performance benefits of Hebel walls, resulting in faster construction timelines and reliable outcomes.",
    ],
    benefitsLead: "Advantages of Hebel systems include:",
    benefits: [
      "Lightweight and structurally strong",
      "Excellent thermal and sound insulation",
      "Fire-resistant and energy-efficient",
      "Faster installation compared to traditional materials",
    ],
    closing:
      "We work closely with builders and developers to deliver Hebel solutions that meet project timelines and specifications.",
  },
  {
    slug: "walling",
    name: "Walling",
    bannerTitle: "Walling Services Adelaide",
    image: "/images/walling.webp",
    imageAlt:
      "Interior walling installation with a crisp painted finish by Elite Surface Group",
    imageWidth: 1000,
    imageHeight: 778,
    summary:
      "Our walling solutions are designed for strength and durability. From renovations to new builds, we deliver high-quality finishes that combine practicality with a premium look.",
    metaTitle: "Walling Services Adelaide",
    metaDescription:
      "Complete walling solutions across South Australia — structural wall systems, internal and external walls, and high-quality finishes.",
    intro: [
      "From structural walls to finishing systems, Elite Surface Group delivers comprehensive walling solutions for a wide range of construction projects. Our walling services are designed to provide strength, stability, and a high-quality finish.",
      "We manage walling installations from start to finish with attention to precision, safety, the project specification and applicable product installation requirements.",
    ],
    detail: [
      "Every walling project we undertake is planned with durability and performance in mind. We work closely with builders and project managers to ensure wall systems integrate seamlessly with other construction elements, from early-stage construction through to final finishes.",
    ],
    benefitsLead: "Our walling services include:",
    benefits: [
      "Internal and external wall systems",
      "Structural wall installations",
      "High-quality finishes and detailing",
      "Residential and commercial projects",
    ],
    closing:
      "With a strong focus on workmanship and reliability, we ensure every walling project is completed to the highest standard.",
  },
];

export const servicesIntro =
  "From cladding to rendering, we deliver exceptional walling solutions tailored to your needs.";

/* ----------------------------------------------------------------- homepage */

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
  title: business.tagline,
  body: "Transforming Adelaide homes and businesses with premium cladding, render, Hebel, and walling solutions.",
} as const;

export const aboutTeaser = {
  eyebrow: "Adelaide's",
  title: "Trusted Walling Specialists",
  image: "/images/trusted-walling.webp",
  imageAlt: "Elite Surface Group tradespeople rendering an interior wall",
  body: [
    "Elite Surface Group works on homes and commercial properties across Adelaide and South Australia. Our team combines practical walling experience with careful planning, clear communication and attention to finish.",
    "Whether it’s modern cladding, professional rendering, or Hebel panel installation, we focus on delivering results that enhance both the look and value of your property.",
  ],
} as const;

export const process = {
  title: "Our Professional Process",
  intro:
    "We believe every successful project starts with clear communication and ends with exceptional results. Our streamlined process ensures quality, transparency, and efficiency at every stage.",
  image: "/images/2148211774.webp",
  imageAlt: "Modern dining space framed by a finished feature wall",
  steps: [
    {
      title: "Consultation & Site Assessment",
      body: "We meet with you to understand your goals, inspect the site, and recommend the most suitable cladding or walling solution for your property.",
    },
    {
      title: "Detailed & Transparent Quote",
      body: "You receive a clear, obligation-free quote outlining scope, materials, timeline, and pricing — no hidden costs.",
    },
    {
      title: "Expert Installation",
      body: "Our experienced team carries out the installation with precision, safety, and attention to detail, using high-quality materials built to last.",
    },
    {
      title: "Final Quality Check",
      body: "Before completion, we conduct a thorough inspection to ensure everything meets our high standards and your expectations.",
    },
  ],
} as const;

export const whyChoose = {
  titleAccent: "Why Choose",
  title: "Elite Surface Group?",
  intro:
    "We take pride in providing walling solutions that combine durability, aesthetics, and value. Our clients choose us because we offer:",
  image: "/images/pexels-curtis-adams-1694007-8031949.webp",
  imageAlt: "Bright living room with a smooth rendered feature wall",
  columns: [
    [
      "Practical walling and surface-finish experience",
      "Careful workmanship and quality checks",
      "Local Adelaide experts",
    ],
    [
      "Project-specific scope and documentation",
      "Clear, itemised pricing",
      "Free quotes and consultations",
    ],
  ],
  closing:
    "With Elite Surface Group, you get a team committed to excellence, reliability, and exceptional customer service on every project.",
} as const;

export const differentiators = {
  titleAccent: "What Sets",
  title: "Us Apart",
  items: [
    {
      icon: "/images/carpentry.webp",
      title: "Skilled Craftsmanship",
      body: "Delivering high-quality workmanship on every project.",
    },
    {
      icon: "/images/rating.webp",
      title: "Experienced Team",
      body: "Practical advice and careful installation for each project.",
    },
    {
      icon: "/images/color-palette.webp",
      title: "Walling Solutions",
      body: "Cladding, rendering, Hebel panels, and more.",
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
      body: "Friendly guidance and advice throughout your project.",
    },
  ],
} as const;

export const expertise = {
  titleAccent: "Experts In –",
  title: "Residential, Commercial & Industrial Walling",
  intro: "Delivering durable, visually striking solutions for every property.",
  background: "/images/470.webp",
  items: [
    {
      icon: "/images/high-quality.webp",
      title: "Our Mission",
      body: "High-quality workmanship and exceptional service on every project.",
    },
    {
      icon: "/images/checked.webp",
      title: "Our Values",
      body: "Enhancing your property’s value, aesthetics, and functionality.",
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

/* ----------------------------------------------------------------- projects */

export type Project = {
  title: string;
  service: Service["slug"];
  summary: string;
  image: string;
  alt: string;
  width: number;
  height: number;
};

export const projects: readonly Project[] = [
  {
    title: "Two-storey exterior render",
    service: "render",
    summary: "Smooth white render across a completed two-storey facade.",
    image: "/images/img-6.webp",
    alt: "Rendered two-storey home with a smooth white exterior finish",
    width: 1600,
    height: 2133,
  },
  {
    title: "Curved rendered wall detail",
    service: "render",
    summary: "Crisp render and paint finish around a curved wall detail.",
    image: "/images/img-5.webp",
    alt: "Curved rendered wall detail with a crisp painted finish",
    width: 1600,
    height: 2133,
  },
  {
    title: "Contemporary exterior cladding",
    service: "cladding",
    summary: "Feature cladding installed on a contemporary residence.",
    image: "/images/img-4.webp",
    alt: "External cladding installation on a contemporary residence",
    width: 1600,
    height: 2133,
  },
  {
    title: "Rendered boundary wall",
    service: "render",
    summary: "Completed render finish beside a landscaped driveway.",
    image: "/images/img-3.webp",
    alt: "Rendered boundary wall alongside a landscaped driveway",
    width: 1600,
    height: 2133,
  },
  {
    title: "Mixed cladding and render facade",
    service: "cladding",
    summary: "A modern facade combining contrasting cladding and render.",
    image: "/images/img-2.webp",
    alt: "Modern facade combining cladding and render finishes",
    width: 1600,
    height: 2133,
  },
  {
    title: "Dark feature cladding",
    service: "cladding",
    summary: "Dark feature cladding on a completed residential exterior.",
    image: "/images/img-1.webp",
    alt: "Completed residential exterior with dark feature cladding",
    width: 1280,
    height: 960,
  },
];

export const featuredProjects = {
  eyebrow: "Our Work",
  title: "Featured Projects",
  intro:
    "Browse our portfolio of completed projects showcasing our quality craftsmanship.",
} as const;

/* ------------------------------------------------------------- testimonials */

/**
 * Testimonials inherited from the former site are retained as drafts until
 * their source, wording, rating and publication permission are documented.
 */
const testimonialDrafts = [
  {
    name: "Sarah Mitchell",
    quote:
      "Elite Surface Group completely transformed the exterior of our home with high-quality rendering. The team was professional, efficient, and the final finish looks incredible. Highly recommend!",
    verified: false,
  },
  {
    name: "David Robertson",
    quote:
      "We chose Elite Surface Group for our cladding installation and couldn’t be happier. The workmanship was excellent, communication was clear, and the project was finished right on schedule.",
    verified: false,
  },
  {
    name: "Amanda Lee",
    quote:
      "The Hebel installation was handled with great attention to detail. The team was punctual, respectful, and delivered exactly what they promised. The results exceeded our expectations.",
    verified: false,
  },
  {
    name: "Mark Thompson",
    quote:
      "From start to finish, the experience was smooth and stress-free. Honest pricing, quality craftsmanship, and a team that truly cares about the final outcome.",
    verified: false,
  },
  {
    name: "Jason Carter",
    quote:
      "Elite Surface Group did an outstanding job on our renovation project. The finish is clean and modern, and the professionalism shown throughout was second to none.",
    verified: false,
  },
] as const;

export const testimonials = testimonialDrafts.filter((item) => item.verified);

export const testimonialsSection = {
  eyebrow: "Customer Feedback",
  title: "What Our Clients Say",
  intro: "Don’t just take our word for it – hear from our satisfied customers.",
} as const;

/* --------------------------------------------------------------------- CTAs */

export const contactSection = {
  eyebrow: "Get In Touch",
  title: "Ready to Transform Your Property?",
  intro:
    "Contact us today for a free quote and consultation. Our team is ready to discuss your project and provide expert advice.",
  formTitle: "Send Us a Message",
  formNote: "We typically respond within 24 hours.",
} as const;

export const ctaBand = {
  title: "Walling & surface finishes across Adelaide",
  body: "Every property is unique. Tell us about your cladding, render, Hebel or walling project and we will recommend a solution that balances durability, style and long-term performance.",
  note: "Quick, easy, and obligation-free — start transforming your property today!",
  background: "/images/2150921011.webp",
} as const;

/* -------------------------------------------------------------------- about */

export const aboutPage = {
  bannerTitle: "About Us",
  title: "About Elite Surface Group",
  metaDescription:
    "Meet the Adelaide team providing cladding, render, Hebel and walling installations for residential and commercial projects.",
  lead: "Elite Surface Group provides walling installations and surface finishes across Adelaide and South Australia. We work with homeowners, builders and developers on residential, commercial and development projects.",
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
    "Based in Adelaide, South Australia, we work closely with builders, developers, and homeowners to provide tailored walling solutions that meet both functional and aesthetic requirements. From modern cladding systems to durable render finishes and structural Hebel installations, our team combines technical expertise with attention to detail on every project.",
    "Our project experience spans residential homes, multi-unit developments and commercial sites. We adapt the installation plan to the documented scope, system requirements and conditions on each site.",
  ],
  prideLead: "At Elite Surface Group, we pride ourselves on:",
  pride: [
    [
      "Professional and experienced installers",
      "High-quality materials and proven systems",
    ],
    [
      "Clear communication and agreed programmes",
      "Work aligned with the project specification",
    ],
  ],
  closing:
    "We take a hands-on approach to every job, with careful planning, skilled execution and a clear final quality check. Whether it’s a new build, renovation or larger development, our goal is to deliver the agreed walling solution and finish.",
} as const;

/* ------------------------------------------------------------ simple pages */

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
  "/contact-us": "/images/pexels-fwstudio-33348-131637.webp",
  "/privacy-policy": "/images/pexels-peter-vang-2157328093-35419416.webp",
  "/terms-of-service": "/images/pexels-peter-vang-2157328093-35419416.webp",
};
