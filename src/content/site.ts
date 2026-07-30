/**
 * Single source of truth for site content.
 *
 * Copy was carried over from the WordPress site this project replaced. Edit it
 * here — there is no CMS behind the site any more.
 */

export const business = {
  name: "Elite Surface Group",
  tagline: "SA's Leading Experts in Walling Installations & Finishes",
  /** E.164 for `tel:` hrefs — never hand-write a `tel:` link anywhere else. */
  phone: "+61413844912",
  /** Human-readable form of the same number. */
  phoneDisplay: "0413 844 912",
  email: "info@elitesurfacegroup.com.au",
  area: "Adelaide & South Australia",
  siteUrl: "https://elitesurfacegroup.com.au",
  openingHours: "Mo-Sa 09:00-17:00",
  foundedYears: 10,
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
    { label: "Testimonials", href: "/about#testimonials" },
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
  "Elite Surface Group has been transforming properties across Adelaide and South Australia for over a decade. Our team of skilled professionals brings expertise, dedication, and an unwavering commitment to quality to every project.";

/* ---------------------------------------------------------------- services */

export type Service = {
  slug: "cladding" | "render" | "hebel" | "walling";
  name: string;
  /** Heading as it appears on the service page banner. */
  bannerTitle: string;
  image: string;
  imageAlt: string;
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
    bannerTitle: "Cladding",
    image: "/images/cladding.webp",
    imageAlt:
      "Modern home with dark timber-look exterior cladding installed by Elite Surface Group",
    summary:
      "We provide high-quality cladding solutions that enhance your property’s appearance and protection. Our team ensures a precise installation using durable materials that withstand Adelaide’s weather.",
    metaTitle: "Cladding",
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
    bannerTitle: "Render",
    image: "/images/render.webp",
    imageAlt:
      "Smooth rendered interior wall with a clean contemporary finish by Elite Surface Group",
    summary:
      "Our professional rendering services give walls a smooth and polished finish. We specialise in both new render applications and repairs, ensuring a long-lasting and visually appealing result.",
    metaTitle: "Render",
    metaDescription:
      "Expert rendering services in Adelaide. Smooth, textured and custom render finishes for internal and external walls, applied to last.",
    intro: [
      "Our professional render services provide smooth, durable, and visually striking finishes for both internal and external walls. With over a decade of experience, Elite Surface Group ensures every render application is completed to the highest standard.",
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
    bannerTitle: "Hebel",
    image: "/images/hebel.webp",
    imageAlt:
      "Hebel panel wall system installed on a modern build by Elite Surface Group",
    summary:
      "We install Hebel panels that are lightweight, energy-efficient, and fire-resistant. Perfect for modern homes, our expert team guarantees accurate installation and lasting performance.",
    metaTitle: "Hebel",
    metaDescription:
      "Hebel wall system specialists in Adelaide. Lightweight, fire-resistant, thermally efficient panels installed to Australian standards.",
    intro: [
      "Elite Surface Group specialises in Hebel wall systems, a lightweight yet highly durable solution ideal for modern construction. Hebel panels are known for their strength, fire resistance, thermal efficiency, and acoustic performance.",
      "Our experienced team handles complete Hebel installations, ensuring accuracy, compliance, and structural integrity throughout the process. Hebel is a smart choice for projects that demand efficiency without compromising on performance.",
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
    bannerTitle: "Walling",
    image: "/images/walling.webp",
    imageAlt:
      "Interior walling installation with a crisp painted finish by Elite Surface Group",
    summary:
      "Our walling solutions are designed for strength and durability. From renovations to new builds, we deliver high-quality finishes that combine practicality with a premium look.",
    metaTitle: "Walling",
    metaDescription:
      "Complete walling solutions across South Australia — structural wall systems, internal and external walls, and high-quality finishes.",
    intro: [
      "From structural walls to finishing systems, Elite Surface Group delivers comprehensive walling solutions for a wide range of construction projects. Our walling services are designed to provide strength, stability, and a high-quality finish.",
      "We manage walling installations from start to finish, ensuring precision, safety, and compliance with Australian standards. Whether it’s a residential build or a large commercial project, our team delivers dependable results.",
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
    "Elite Surface Group has been transforming homes and commercial properties across Adelaide and South Australia for over a decade. Our skilled team combines technical expertise with a dedication to quality, ensuring every project is completed to the highest standards.",
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
      "Over 10 years of industry experience",
      "Quality craftsmanship guaranteed",
      "Local Adelaide experts",
    ],
    [
      "Licensed and fully insured services",
      "Competitive pricing",
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
      title: "Skilled – Craftsmanship",
      body: "Delivering high-quality workmanship on every project.",
    },
    {
      icon: "/images/rating.webp",
      title: "Trusted – Experts",
      body: "Over 10 years of experience you can rely on.",
    },
    {
      icon: "/images/color-palette.webp",
      title: "Wide Range – Of Walling Solutions",
      body: "Cladding, rendering, Hebel panels, and more.",
    },
    {
      icon: "/images/price-tag.webp",
      title: "Clear – Pricing",
      body: "Honest, transparent quotes with no hidden costs.",
    },
    {
      icon: "/images/shield.webp",
      title: "Reliable – Project Delivery",
      body: "We complete every project on time, every time.",
    },
    {
      icon: "/images/support.webp",
      title: "Dedicated – Customer Support",
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
      body: "Skilled professionals providing a 7-year labour warranty for peace of mind.",
    },
    {
      icon: "/images/price-tag.webp",
      title: "Price Guarantee",
      body: "Honest, obligation-free quotes to ensure fair and clear pricing.",
    },
  ],
} as const;

/* ----------------------------------------------------------------- projects */

export type Project = {
  image: string;
  alt: string;
};

export const projects: readonly Project[] = [
  {
    image: "/images/img-6.webp",
    alt: "Rendered two-storey home with a smooth white exterior finish",
  },
  {
    image: "/images/img-5.webp",
    alt: "Curved rendered wall detail with a crisp painted finish",
  },
  {
    image: "/images/img-4.webp",
    alt: "External cladding installation on a contemporary residence",
  },
  {
    image: "/images/img-3.webp",
    alt: "Rendered boundary wall alongside a landscaped driveway",
  },
  {
    image: "/images/img-2.webp",
    alt: "Modern facade combining cladding and render finishes",
  },
  {
    image: "/images/img-1.webp",
    alt: "Completed residential exterior with dark feature cladding",
  },
];

export const featuredProjects = {
  eyebrow: "Our Work",
  title: "Featured Projects",
  intro:
    "Browse our portfolio of completed projects showcasing our quality craftsmanship.",
} as const;

/* ------------------------------------------------------------- testimonials */

export const testimonials = [
  {
    name: "Sarah Mitchell",
    quote:
      "Elite Surface Group completely transformed the exterior of our home with high-quality rendering. The team was professional, efficient, and the final finish looks incredible. Highly recommend!",
  },
  {
    name: "David Robertson",
    quote:
      "We chose Elite Surface Group for our cladding installation and couldn’t be happier. The workmanship was excellent, communication was clear, and the project was finished right on schedule.",
  },
  {
    name: "Amanda Lee",
    quote:
      "The Hebel installation was handled with great attention to detail. The team was punctual, respectful, and delivered exactly what they promised. The results exceeded our expectations.",
  },
  {
    name: "Mark Thompson",
    quote:
      "From start to finish, the experience was smooth and stress-free. Honest pricing, quality craftsmanship, and a team that truly cares about the final outcome.",
  },
  {
    name: "Jason Carter",
    quote:
      "Elite Surface Group did an outstanding job on our renovation project. The finish is clean and modern, and the professionalism shown throughout was second to none.",
  },
] as const;

export const testimonialsSection = {
  eyebrow: "What We Do",
  title: "What Our Clients Say",
  intro: "Don’t just take our word for it – hear from our satisfied customers.",
  background: "/images/testi-bg.webp",
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
    "Elite Surface Group is South Australia’s trusted specialist in walling installations and surface finishes, with over 10 years of industry experience.",
  lead: "Elite Surface Group is South Australia’s trusted specialist in walling installations and surface finishes. With over 10 years of hands-on industry experience, we’ve built a reputation for delivering high-quality workmanship, reliable service, and long-lasting results across residential, commercial, and development projects.",
  gallery: [
    { image: "/images/hebel.webp", alt: "Hebel panel wall system installation" },
    {
      image: "/images/trusted-walling.webp",
      alt: "Tradespeople rendering an interior wall",
    },
    {
      image: "/images/cladding.webp",
      alt: "Exterior cladding on a modern Adelaide home",
    },
    {
      image: "/images/walling.webp",
      alt: "Finished interior walling with a painted surface",
    },
  ],
  body: [
    "Based in Adelaide, South Australia, we work closely with builders, developers, and homeowners to provide tailored walling solutions that meet both functional and aesthetic requirements. From modern cladding systems to durable render finishes and structural Hebel installations, our team combines technical expertise with attention to detail on every project.",
    "Over the years, Elite Surface Group has successfully completed a wide range of projects across South Australia, from single residential homes to multi-unit developments and commercial sites. Our experience allows us to adapt to different project scopes and construction requirements while maintaining the same high standard of quality.",
  ],
  prideLead: "At Elite Surface Group, we pride ourselves on:",
  pride: [
    [
      "Professional and experienced installers",
      "High-quality materials and proven systems",
    ],
    [
      "Clear communication and reliable timelines",
      "Compliance with Australian building standards",
    ],
  ],
  closing:
    "We take a hands-on approach to every job, ensuring careful planning, skilled execution, and results that exceed expectations. Whether it’s a new build, renovation, or large-scale development, our goal is simple — to deliver walling solutions that look great, perform exceptionally, and stand the test of time.",
} as const;

/* ------------------------------------------------------------ simple pages */

export const servicesPage = {
  bannerTitle: "Services",
  metaDescription:
    "Cladding, render, Hebel and complete walling services across Adelaide and South Australia, delivered by Elite Surface Group.",
} as const;

export const projectsPage = {
  bannerTitle: "Projects",
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
