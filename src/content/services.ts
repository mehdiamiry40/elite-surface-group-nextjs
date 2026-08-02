export type ServiceFaq = {
  question: string;
  answer: string;
};

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
  /** Related internal paths shown in body copy. */
  relatedLinks: readonly { label: string; href: string }[];
  faqs: readonly ServiceFaq[];
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
      "Cladding installation for Adelaide homes and commercial builds, using systems selected for the project design, exposure and budget.",
    metaTitle: "Cladding Installation Adelaide",
    metaDescription:
      "Cladding installation across Adelaide for homes and commercial builds, with systems selected for the design, substrate, exposure and budget.",
    intro: [
      "Cladding is an effective way to update both the appearance and weather protection of a building. At Elite Surface Group, we install cladding systems suited to residential and commercial projects across Adelaide and South Australia.",
      "We help you choose a cladding approach that fits the design intent, substrate and local conditions, then install it to the manufacturer and project requirements. Finished performance depends on the selected system, detailing and ongoing maintenance.",
    ],
    detail: [
      "Our cladding process focuses on preparation, accurate setting-out and clean junctions. We assess each site to recommend a suitable system based on design, environmental exposure and budget. When installed as specified, quality cladding can improve weather protection and presentation — results vary with product choice, substrate condition and maintenance.",
    ],
    benefitsLead: "Typical benefits of a well-specified cladding installation include:",
    benefits: [
      "Improved thermal and acoustic performance when the full wall system is specified for those outcomes",
      "A refreshed exterior appearance matched to the project design",
      "Added weather protection for the wall build-up behind the cladding",
      "Lower-maintenance exterior finishes compared with some painted substrates",
    ],
    closing:
      "From contemporary homes to larger developments, we deliver cladding solutions tailored to the documented project requirements. See our cladding and mixed-facade work on the projects page, or ask about rendering where a combined finish is planned.",
    relatedLinks: [
      { label: "View cladding projects", href: "/projects/" },
      { label: "Rendering services", href: "/render/" },
      { label: "Adelaide service area", href: "/locations/adelaide/" },
    ],
    faqs: [
      {
        question: "Which cladding systems do you install in Adelaide?",
        answer:
          "We install a range of residential and commercial cladding systems. The right option depends on design, substrate, exposure and budget — we recommend a system after reviewing the project details.",
      },
      {
        question: "Is cladding suitable for coastal or wind-exposed Adelaide sites?",
        answer:
          "Many cladding systems can perform well in exposed conditions when the product, fixings and detailing are specified for that environment. We assess exposure during consultation and follow the relevant installation requirements.",
      },
      {
        question: "How do I maintain external cladding?",
        answer:
          "Maintenance varies by product. Most systems benefit from periodic cleaning and inspection of junctions, flashings and sealants. We can outline care expectations for the system used on your project.",
      },
    ],
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
      "Rendering for new work and repairs — smooth, textured and custom finishes prepared and applied to suit the substrate and conditions.",
    metaTitle: "Rendering Services Adelaide",
    metaDescription:
      "Expert rendering services in Adelaide. Smooth, textured and custom render finishes for internal and external walls, applied with careful substrate preparation.",
    intro: [
      "Our render services provide smooth, durable and visually consistent finishes for internal and external walls. We prepare and apply each finish with close attention to the substrate, conditions and project specification.",
      "We offer a variety of render finishes to suit different architectural styles, whether you want a modern, textured or classic look. Longevity depends on preparation, product system, exposure and maintenance — we focus on getting those foundations right.",
    ],
    detail: [
      "Rendering is both a technical and visual process. We pay close attention to surface preparation, weather conditions and finishing techniques to achieve a consistent result. Render systems can help resist weathering and present a clean finish when specified, applied and maintained correctly; no finish is immune to movement, impact or deferred maintenance.",
    ],
    benefitsLead: "Why choose our render services:",
    benefits: [
      "Clean and consistent finishes matched to the agreed sample or specification",
      "Improved wall protection when render forms part of a suitable weatherproofing strategy",
      "Suitable for residential and commercial properties",
      "Custom finishes to support the design intent",
    ],
    closing:
      "A quality render can improve presentation and help protect the wall surface behind it. Pair it with cladding feature elements where the design calls for contrast — browse our render projects or request a quote.",
    relatedLinks: [
      { label: "View render projects", href: "/projects/" },
      { label: "Cladding installation", href: "/cladding/" },
      { label: "Contact for a quote", href: "/contact-us/#contact" },
    ],
    faqs: [
      {
        question: "What causes render to crack?",
        answer:
          "Cracking can come from substrate movement, inadequate preparation, incompatible systems, impact or age. We assess the wall build-up and recommend a suitable render approach; existing cracks may need repair before a new finish is applied.",
      },
      {
        question: "Do you offer acrylic and cement render?",
        answer:
          "We work with render systems suited to the substrate and project brief. Product selection is confirmed during quoting so the finish matches the design and performance requirements.",
      },
      {
        question: "Can you repair and re-render existing walls?",
        answer:
          "Yes. We assess adhesion, substrate condition and previous coatings, then recommend repair, patching or a full re-render where that is the better long-term option.",
      },
    ],
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
      "Hebel panel installation for residential and commercial projects, following the specified system details for placement, fixing and finishing.",
    metaTitle: "Hebel Wall Systems Adelaide",
    metaDescription:
      "Hebel wall system installation across Adelaide, with lightweight panels installed to the specified thermal, acoustic and fire-performance system details.",
    intro: [
      "Elite Surface Group installs Hebel wall systems for modern construction across Adelaide and South Australia. Hebel panels are a lightweight autoclaved aerated concrete option commonly specified for strength-to-weight, fire, thermal and acoustic performance when used as a complete compliant system.",
      "Our team handles panel placement, fixing and detailing to the project and manufacturer requirements. Final system performance depends on the specified product, design, penetrations and the complete installed assembly.",
    ],
    detail: [
      "Hebel systems need accurate setting-out and specialist detailing. We focus on correct panel placement, secure fixing and junctions so the installed wall can deliver the performance the specification intends — including construction programme benefits where the design allows faster enclosure than some traditional masonry approaches.",
    ],
    benefitsLead: "Advantages of Hebel systems, when specified and installed as a complete system, can include:",
    benefits: [
      "Lightweight panels with useful structural capacity for the designed wall type",
      "Thermal and sound insulation characteristics defined by the full wall build-up",
      "Fire-performance ratings as documented for the specified system",
      "Efficient installation compared with some traditional masonry methods",
    ],
    closing:
      "We work with builders and developers to deliver Hebel solutions that meet project timelines and specifications. Discuss walling and finish packages alongside Hebel where your programme needs a single trade partner.",
    relatedLinks: [
      { label: "Walling services", href: "/walling/" },
      { label: "View related projects", href: "/projects/" },
      { label: "Adelaide service area", href: "/locations/adelaide/" },
    ],
    faqs: [
      {
        question: "Are Hebel walls fire resistant?",
        answer:
          "Hebel systems can achieve fire-performance ratings when the complete wall assembly is specified and installed to the tested system details. Ratings apply to the documented build-up, not to the panel alone in isolation from the design.",
      },
      {
        question: "Is Hebel suitable for residential and commercial builds?",
        answer:
          "Yes. Hebel is used on homes, multi-residential and commercial projects. Suitability depends on structural design, finishes and the project specification.",
      },
      {
        question: "Do you only supply labour, or full Hebel installation?",
        answer:
          "We install Hebel wall systems to the agreed scope. Materials, accessories and finishing packages are confirmed in the quote so responsibilities are clear before work starts.",
      },
    ],
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
      "Internal and external walling solutions for renovations and new builds, coordinated to the project specification and finish requirements.",
    metaTitle: "Walling Services Adelaide",
    metaDescription:
      "Complete walling solutions across South Australia — structural wall systems, internal and external walls, and high-quality finishes.",
    intro: [
      "From structural walls to finishing systems, Elite Surface Group delivers walling solutions for a wide range of construction projects across Adelaide and South Australia.",
      "We manage walling installations with attention to precision, safety, the project specification and applicable product installation requirements — coordinating with builders so walls integrate with the wider build.",
    ],
    detail: [
      "Every walling project is planned around durability and the documented performance goals. We work with builders and project managers so wall systems integrate with adjoining trades from early-stage construction through to final finishes.",
    ],
    benefitsLead: "Our walling services include:",
    benefits: [
      "Internal and external wall systems",
      "Structural wall installations where within our agreed scope",
      "Finishes and detailing aligned to the specification",
      "Residential and commercial projects",
    ],
    closing:
      "We focus on workmanship and clear communication so walling work is completed to the agreed standard. Explore cladding, render and Hebel pages for specialised systems, or request a quote for a combined package.",
    relatedLinks: [
      { label: "Cladding services", href: "/cladding/" },
      { label: "Hebel wall systems", href: "/hebel/" },
      { label: "Contact for a quote", href: "/contact-us/#contact" },
    ],
    faqs: [
      {
        question: "Do you handle internal and external walling?",
        answer:
          "Yes. We work on internal and external wall systems as defined in the project scope, including coordination with finishes such as render or cladding where specified.",
      },
      {
        question: "Can you work with our builder or project manager?",
        answer:
          "We regularly work under builder direction. Clear drawings, programme dates and scope boundaries help us integrate cleanly with other trades.",
      },
      {
        question: "How do I get a walling quote?",
        answer:
          "Share plans, photos or a brief through our contact form, or call us. We provide an obligation-free quote outlining scope, materials and timing assumptions.",
      },
    ],
  },
];

/** Service names for form dropdowns — avoids importing full page copy into clients when possible. */
export const serviceNames = services.map((service) => service.name);

export const servicesIntro =
  "Cladding, render, Hebel and walling for Adelaide homes, renovations and commercial builds.";
