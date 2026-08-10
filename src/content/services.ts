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
    image: "/images/v2/service-cladding-installation.webp",
    imageAlt: "Installer aligning charcoal vertical cladding on an Adelaide home",
    imageWidth: 1600,
    imageHeight: 1067,
    summary:
      "Architectural cladding installed with careful setting-out, clean junctions and close attention to the system details.",
    metaTitle: "Cladding Installation Adelaide",
    metaDescription:
      "Architectural cladding installation across Adelaide for homes and commercial builds, planned around the design, substrate, exposure and budget.",
    intro: [
      "The right cladding can completely change the character of a building while adding another layer of protection to the wall behind it. We install architectural cladding for new homes, renovations and commercial projects across Adelaide and South Australia.",
      "Every project starts with the building, not a one-size-fits-all product. We consider the design, substrate, site exposure and budget, then install the selected system to the manufacturer’s requirements and project specification.",
    ],
    detail: [
      "A strong cladding result comes down to what sits behind the finished surface. We focus on substrate readiness, accurate setting-out, aligned panel lines and tidy junctions around windows, corners and adjoining finishes. Product choice, exposure and ongoing maintenance all influence long-term performance, so those details are considered before installation begins.",
    ],
    benefitsLead: "A well-selected and correctly installed cladding system can offer:",
    benefits: [
      "A distinctive exterior finish shaped around the architectural design",
      "Added protection for the wall build-up behind the cladding",
      "Thermal and acoustic benefits when included in the complete wall specification",
      "A lower-maintenance surface than some painted exterior substrates",
    ],
    closing:
      "From a single feature elevation to a complete facade, we tailor the installation to the documented design and site conditions. Explore our cladding and mixed-facade projects, or ask us about combining cladding with render for a contrasting finish.",
    relatedLinks: [
      { label: "View cladding projects", href: "/projects/" },
      { label: "Rendering services", href: "/render/" },
      { label: "Adelaide service area", href: "/locations/adelaide/" },
    ],
    faqs: [
      {
        question: "Which cladding systems do you install in Adelaide?",
        answer:
          "We install a range of residential and commercial cladding systems. The best fit depends on the design, substrate, site exposure and budget, so we confirm the system after reviewing the project details.",
      },
      {
        question: "Is cladding suitable for coastal or wind-exposed Adelaide sites?",
        answer:
          "Yes, many systems are suitable for exposed sites when the product, fixings and detailing are specified for those conditions. We consider exposure during quoting and follow the relevant system requirements during installation.",
      },
      {
        question: "How do I maintain external cladding?",
        answer:
          "Care requirements vary by product. Most cladding benefits from periodic cleaning and checks of junctions, flashings and sealants. We can explain the maintenance needs of the system selected for your project.",
      },
    ],
  },
  {
    slug: "render",
    name: "Render",
    bannerTitle: "Rendering Services Adelaide",
    image: "/images/v2/service-render-application.webp",
    imageAlt: "Tradesperson applying an even render finish to an exterior wall",
    imageWidth: 1600,
    imageHeight: 1067,
    summary:
      "Smooth, textured and custom render finishes, prepared and applied to suit the wall, the conditions and the design.",
    metaTitle: "Rendering Services Adelaide",
    metaDescription:
      "Rendering services across Adelaide for internal and external walls, with smooth, textured and custom finishes backed by careful surface preparation.",
    intro: [
      "Render can refresh a tired exterior, create a clean finish on new construction or add texture and depth to an architectural design. We render internal and external walls for residential and commercial projects across Adelaide and South Australia.",
      "The finish is only as sound as the preparation beneath it. We assess the substrate, repair or prepare it as required, and apply the agreed render system with close attention to weather conditions, junctions and surface consistency.",
    ],
    detail: [
      "Rendering is equal parts technical preparation and skilled finishing. We work to achieve even colour, texture and lines across the visible surface while allowing for the movement, exposure and maintenance needs of the underlying wall. Existing cracks, weak coatings or damaged substrates are identified before the new finish goes on.",
    ],
    benefitsLead: "Our rendering work is built around:",
    benefits: [
      "Thorough preparation suited to the existing substrate",
      "Clean, consistent finishes matched to the agreed sample or specification",
      "Smooth, textured and custom options for different architectural styles",
      "Careful detailing around openings, edges and adjoining materials",
    ],
    closing:
      "A well-executed render finish can sharpen the appearance of a building and support the wall system behind it. Browse our completed render details, or talk to us about pairing render with feature cladding for contrast.",
    relatedLinks: [
      { label: "View render projects", href: "/projects/" },
      { label: "Cladding installation", href: "/cladding/" },
      { label: "Contact for a quote", href: "/contact-us/#contact" },
    ],
    faqs: [
      {
        question: "What causes render to crack?",
        answer:
          "Cracks can result from substrate movement, poor preparation, incompatible materials, impact or age. We assess the wall before recommending a system, and existing cracks may need to be repaired before a new finish is applied.",
      },
      {
        question: "Do you offer acrylic and cement render?",
        answer:
          "We work with render systems selected to suit the substrate and project brief. The product and finish are confirmed during quoting so they align with the design and performance requirements.",
      },
      {
        question: "Can you repair and re-render existing walls?",
        answer:
          "Yes. We check the substrate, adhesion and previous coatings before recommending local repairs, patching or a full re-render, depending on the wall’s condition.",
      },
    ],
  },
  {
    slug: "hebel",
    name: "Hebel",
    bannerTitle: "Hebel Wall Systems Adelaide",
    image: "/images/v2/service-hebel-installation.webp",
    imageAlt: "Installer checking lightweight AAC wall panels on a new Adelaide build",
    imageWidth: 1600,
    imageHeight: 1067,
    summary:
      "Hebel wall systems installed with accurate panel placement, secure fixing and careful junction detailing.",
    metaTitle: "Hebel Wall Systems Adelaide",
    metaDescription:
      "Hebel wall system installation across Adelaide for residential and commercial projects, completed to the specified fixing and performance details.",
    intro: [
      "Hebel is a lightweight autoclaved aerated concrete system used across homes, multi-residential developments and commercial construction. When designed and installed as a complete system, it can provide documented fire, thermal and acoustic performance without the weight of traditional masonry.",
      "We install Hebel wall systems across Adelaide and South Australia, handling panel placement, fixing and junction detailing to the project specification and manufacturer requirements.",
    ],
    detail: [
      "Accuracy matters at every stage of a Hebel installation. We set out panels carefully, use the specified fixings and pay close attention to openings, penetrations and adjoining materials. That disciplined approach helps the completed wall assembly deliver the performance documented in the design.",
    ],
    benefitsLead: "When specified as a complete system, Hebel can provide:",
    benefits: [
      "A lightweight alternative to some traditional masonry wall systems",
      "Thermal and acoustic performance defined by the complete wall build-up",
      "Fire-performance ratings documented for the specified system",
      "Efficient installation where the design and site programme allow",
    ],
    closing:
      "We work closely with builders and developers to keep Hebel installation aligned with the programme and surrounding trades. If the project also includes walling or exterior finishes, ask us about bringing the work together under one coordinated package.",
    relatedLinks: [
      { label: "Walling services", href: "/walling/" },
      { label: "View related projects", href: "/projects/" },
      { label: "Adelaide service area", href: "/locations/adelaide/" },
    ],
    faqs: [
      {
        question: "Are Hebel walls fire resistant?",
        answer:
          "Hebel systems can achieve documented fire-performance ratings when the complete wall assembly is designed and installed to the tested system details. The rating applies to that full build-up, not the panel by itself.",
      },
      {
        question: "Is Hebel suitable for residential and commercial builds?",
        answer:
          "Yes. Hebel is used across homes, multi-residential developments and commercial projects. Its suitability depends on the structural design, required finishes and full project specification.",
      },
      {
        question: "Do you only supply labour, or full Hebel installation?",
        answer:
          "We install Hebel wall systems to an agreed scope. The quote confirms who supplies the panels, accessories and finishing components so every responsibility is clear before work starts.",
      },
    ],
  },
  {
    slug: "walling",
    name: "Walling",
    bannerTitle: "Walling Services Adelaide",
    image: "/images/v2/service-walling-installation.webp",
    imageAlt: "Installer checking internal steel wall framing with a laser level",
    imageWidth: 1600,
    imageHeight: 1067,
    summary:
      "Internal and external walling installed accurately, safely and in step with the wider construction programme.",
    metaTitle: "Walling Services Adelaide",
    metaDescription:
      "Internal and external walling services across Adelaide and South Australia for new homes, renovations, multi-unit and commercial projects.",
    intro: [
      "Good walling gives every trade that follows a better starting point. Elite Surface Group installs internal and external wall systems for new homes, renovations, multi-unit developments and commercial projects across Adelaide and South Australia.",
      "We plan the work around the drawings, selected system and site programme, then coordinate closely with builders so framing, linings, openings and finishes connect cleanly with the wider build.",
    ],
    detail: [
      "Walling demands accuracy long before the surface is finished. We focus on set-out, alignment, openings and junctions while keeping safety, access and adjoining trades in view. The result is a wall system prepared for the next stage and aligned with the documented performance requirements.",
    ],
    benefitsLead: "Our walling capability includes:",
    benefits: [
      "Internal and external wall systems for residential and commercial work",
      "Structural wall installation where included in the agreed scope",
      "Accurate openings, junctions and finishing details",
      "Coordination with builders, services and adjoining trades",
    ],
    closing:
      "Clear communication and careful installation keep walling work moving towards the agreed finish. Explore our cladding, render and Hebel services, or request a quote for a coordinated package.",
    relatedLinks: [
      { label: "Cladding services", href: "/cladding/" },
      { label: "Hebel wall systems", href: "/hebel/" },
      { label: "Contact for a quote", href: "/contact-us/#contact" },
    ],
    faqs: [
      {
        question: "Do you handle internal and external walling?",
        answer:
          "Yes. We install internal and external wall systems within the agreed project scope, including coordination with render or cladding finishes where required.",
      },
      {
        question: "Can you work with our builder or project manager?",
        answer:
          "Yes. We regularly work under builder or project-manager direction. Clear drawings, programme dates and scope boundaries help us integrate efficiently with other trades.",
      },
      {
        question: "How do I get a walling quote?",
        answer:
          "Send your plans, photos and project brief through our contact form, or call us directly. We’ll review the details and prepare an obligation-free quote outlining the work, materials and timing assumptions.",
      },
    ],
  },
];

/** Service names for form dropdowns — avoids importing full page copy into clients when possible. */
export const serviceNames = services.map((service) => service.name);

export const servicesIntro =
  "Specialist installation for new homes, renovations, multi-unit developments and commercial builds across Adelaide.";
