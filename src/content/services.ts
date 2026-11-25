export type ServiceFaq = {
  question: string;
  answer: string;
};

/**
 * One headed block of long-form copy on a service or location page.
 *
 * Paragraph strings may carry inline links written as `[label](/path/)`; see
 * `src/lib/rich-text.ts`. FAQ answers never do, because they also feed the
 * FAQPage structured data.
 */
export type ContentSection = {
  /** Fragment id for the heading. Unique within the page. */
  id: string;
  heading: string;
  /** Shorter wording for the on-page contents list. Falls back to `heading`. */
  navLabel?: string;
  paragraphs: readonly string[];
  /** Tick list shown after the opening paragraphs. */
  bullets?: readonly string[];
  /** Paragraphs shown after the tick list. */
  closing?: readonly string[];
};

export type Service = {
  slug: "cladding" | "render" | "hebel" | "walling";
  name: string;
  /**
   * Fuller phrase for the service, used in structured data where the one-word
   * name says too little about what its page covers. Falls back to `name`.
   */
  longName?: string;
  /** Section headings that replace the name-based defaults on the service page. */
  headings?: { intro?: string; faqs?: string };
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
  /** Deeper, intent-specific sections shown after the project links. */
  sections?: readonly ContentSection[];
  /** Related internal paths shown in body copy. */
  relatedLinks: readonly { label: string; href: string }[];
  /** Planning guides that belong to this service, listed beside its FAQs. */
  guides?: {
    heading: string;
    intro: string;
    links: readonly { label: string; href: string }[];
  };
  faqs: readonly ServiceFaq[];
};

export const services: readonly Service[] = [
  {
    slug: "cladding",
    name: "Cladding",
    longName: "Cladding and facade installation",
    headings: {
      intro: "Facade and cladding installation across Adelaide",
      faqs: "Cladding and facade FAQs",
    },
    bannerTitle: "Cladding & Facade Installation Adelaide",
    image: "/images/v2/service-cladding-installation.webp",
    imageAlt:
      "Installer aligning charcoal vertical cladding on a residential exterior",
    imageWidth: 1600,
    imageHeight: 1067,
    summary:
      "Cladding and facade installation with careful setting-out, clean junctions and close attention to the system details.",
    metaTitle: "Cladding & Facade Installation Adelaide",
    metaDescription:
      "Facade and cladding installation in Adelaide for new homes, renovations and commercial builds, planned around the design, substrate and exposure.",
    intro: [
      "The right cladding can completely change the character of a building facade while adding another layer of protection to the wall behind it. We install architectural cladding, from a single feature wall to a complete building facade, for new homes, renovations and commercial projects across Adelaide and South Australia.",
      "Every cladding and facade installation starts with the building, not a one-size-fits-all product. We consider the design, substrate, site exposure and budget, then install the selected cladding or facade system to the manufacturer’s requirements and project specification.",
    ],
    detail: [
      "A strong cladding result comes down to what sits behind the finished surface. We focus on substrate readiness, accurate setting-out, aligned panel lines and tidy junctions around windows, corners and adjoining finishes. Product choice, exposure and ongoing maintenance all influence long-term performance, so those details are considered before installation begins.",
      "On a full building facade installation, we work from the drawings and the selected system’s installation details, and coordinate with the builder and adjoining trades so each elevation is ready before the cladding goes on.",
    ],
    benefitsLead:
      "A well-selected and correctly installed cladding system can offer:",
    benefits: [
      "A distinctive exterior finish shaped around the architectural design",
      "Added protection for the wall build-up behind the cladding",
      "Thermal and acoustic benefits when included in the complete wall specification",
      "A lower-maintenance surface than some painted exterior substrates",
    ],
    closing:
      "From a single feature elevation to a complete facade, we tailor the installation to the documented design and site conditions. Explore our cladding portfolio, or ask us about combining cladding with render for a contrasting finish.",
    sections: [
      {
        id: "facade-or-feature-cladding",
        heading: "Facade installation or feature cladding?",
        navLabel: "Facade installation vs feature cladding",
        paragraphs: [
          "Facade installation usually means the whole external face of an elevation or a building: the cladding, the framing or battens it is fixed to, the flashings, and the junctions with windows, roofs and other finishes. Feature cladding is a smaller element set against render or brick, such as an entry wall, an upper-level projection, a gable or a garage surround.",
          "The trade work overlaps, but the planning does not. A full facade is set out from the drawings, elevation by elevation, with board or panel lines resolved around every opening. A feature element is set out from the thing it frames, and its edges matter more than its area, because that is where it stops against another material.",
          "Tell us which one you have in mind when you enquire. If the documents call up a named facade system, we work from that system’s installation guide. If the design is still open, our [cladding or render comparison](/resources/cladding-vs-render-adelaide/) and [vertical or horizontal cladding guide](/resources/vertical-vs-horizontal-cladding-adelaide/) cover the decisions that usually come first.",
        ],
      },
      {
        id: "substrate-cavity-and-fixing",
        heading: "Substrate, cavity and fixing details",
        paragraphs: [
          "Cladding is fixed to a wall, not bonded to it. Most systems rely on a frame or batten layout, a membrane behind the boards and, where the system calls for one, a drained cavity, so water that gets past the face has a way out. What the cladding is fixed to decides most of the detail: a new timber or steel frame, existing brick veneer, solid masonry and AAC panel walls each need a different approach.",
          "Before installation we confirm:",
        ],
        bullets: [
          "What the wall behind is built from, and whether it is ready to receive the system",
          "The batten or framing layout, and the direction the boards or panels run",
          "The membrane, cavity and flashing requirements in the selected system’s installation guide",
          "The fixing type and spacing specified for the product and the site exposure",
          "How the cladding meets windows, doors, corners, the base of the wall and adjoining finishes",
        ],
        closing: [
          "For fibre-cement boards and panels, our [fibre cement cladding guide](/resources/fibre-cement-cladding-adelaide/) explains how an installation is planned, and the [fibre cement or weatherboard comparison](/resources/fibre-cement-vs-weatherboard-cladding-adelaide/) covers the material choice itself.",
        ],
      },
      {
        id: "recladding-or-new-work",
        heading: "Recladding an existing building or cladding a new one",
        navLabel: "Recladding vs new work",
        paragraphs: [
          "New work starts from drawings and a frame that was designed for the cladding. Recladding starts from a wall that already exists, with its own fixings, flashings and moisture history. The old cladding has to be identified before it is disturbed, the wall behind it checked once it is exposed, and the new system planned around openings and levels that are already fixed in place.",
          "Older fibre-cement sheeting can contain asbestos. Identifying it is a testing question and removing it is licensed work, and both have to be finished before a replacement system can be scoped properly. We install the new cladding; we do not remove or handle asbestos.",
          "Our [facade recladding guide](/resources/facade-recladding-adelaide/) sets out what to inspect first, the [asbestos cladding replacement guide](/resources/asbestos-cladding-replacement-adelaide/) explains the order that work runs in, and the [cladding over brick guide](/resources/cladding-over-brick-adelaide/) covers fixing a new system over existing masonry.",
        ],
      },
      {
        id: "coastal-and-exposed-sites",
        heading: "Coastal and wind-exposed sites",
        paragraphs: [
          "Exposure changes the specification, not only the upkeep. Near the coast, salt in the air works on fasteners, flashings and coatings. On open or elevated sites, wind affects how the cladding has to be fixed. Manufacturers publish different requirements for different exposure conditions, so the product, the fixings and the detailing need to be selected for the site rather than carried over from a similar job somewhere else.",
          "We raise exposure when quoting and install to the requirements the selected system documents for it. For properties near the gulf, our [coastal Adelaide page](/locations/coastal-adelaide/) and [coastal cladding maintenance guide](/resources/cladding-maintenance-coastal-adelaide/) explain what to confirm. In bushfire-prone parts of the [Adelaide Hills](/locations/adelaide-hills/), the assessed Bushfire Attack Level needs to be confirmed by the project’s designer or a bushfire consultant before a cladding product is chosen.",
        ],
      },
      {
        id: "working-with-builders",
        heading: "Working with builders, designers and owners",
        navLabel: "Working with builders and owners",
        paragraphs: [
          "On new homes, multi-unit developments and commercial projects, we usually work to the builder’s programme. The details that keep a cladding package on track are simple, but they need to be settled early: which elevations are in our scope, who supplies the cladding and accessories, when windows and flashings will be in, what access or scaffold is provided, and which trade finishes each junction.",
          "Homeowners renovating directly are welcome too. If you do not have drawings, a description of the wall, its approximate size and what it is built from is enough to start the conversation.",
          "Where cladding sits beside render, Hebel panels or new wall framing, we can quote those together through our [render](/render/), [Hebel](/hebel/) and [walling](/walling/) services, so the junctions between systems have one owner.",
        ],
      },
      {
        id: "cladding-quotes",
        heading: "How cladding quotes work",
        paragraphs: [
          "We do not publish a price list, because a cladding price follows the wall rather than a rate card. Quotes are obligation-free and prepared from the project information: the drawings or measurements, the selected system, the substrate, the access and the programme.",
          "A cladding quote from us identifies:",
        ],
        bullets: [
          "The cladding system and profile the price is based on",
          "The elevations or areas included",
          "The substrate and access assumptions",
          "Who supplies the cladding, battens, membrane, flashings and fixings",
          "Work by adjoining trades that sits outside our scope",
        ],
        closing: [
          "Our guide to [what affects a cladding or render quote](/resources/what-affects-cladding-render-quotes-adelaide/) explains the drivers in plain terms, and the [project planning page](/project-planning/) lists what is useful to have ready.",
        ],
      },
    ],
    relatedLinks: [
      { label: "View cladding projects", href: "/projects/" },
      { label: "Rendering services", href: "/render/" },
      { label: "Adelaide service area", href: "/locations/adelaide/" },
      {
        label: "Coastal cladding maintenance guide",
        href: "/resources/cladding-maintenance-coastal-adelaide/",
      },
      { label: "Plan your project enquiry", href: "/project-planning/" },
    ],
    guides: {
      heading: "Cladding and facade guides",
      intro:
        "Planning guides for the decisions that usually come before a cladding quote.",
      links: [
        {
          label: "Facade recladding: what to inspect first",
          href: "/resources/facade-recladding-adelaide/",
        },
        {
          label: "Fibre cement cladding installation",
          href: "/resources/fibre-cement-cladding-adelaide/",
        },
        {
          label: "Cladding or render?",
          href: "/resources/cladding-vs-render-adelaide/",
        },
        {
          label: "Cladding over brick",
          href: "/resources/cladding-over-brick-adelaide/",
        },
        {
          label: "Fibre cement or weatherboard?",
          href: "/resources/fibre-cement-vs-weatherboard-cladding-adelaide/",
        },
        {
          label: "Vertical or horizontal cladding?",
          href: "/resources/vertical-vs-horizontal-cladding-adelaide/",
        },
        {
          label: "Replacing asbestos cladding",
          href: "/resources/asbestos-cladding-replacement-adelaide/",
        },
        {
          label: "What affects a cladding quote",
          href: "/resources/what-affects-cladding-render-quotes-adelaide/",
        },
      ],
    },
    faqs: [
      {
        question: "Which cladding systems do you install in Adelaide?",
        answer:
          "We install a range of residential and commercial cladding systems. The best fit depends on the design, substrate, site exposure and budget, so we confirm the system after reviewing the project details.",
      },
      {
        question: "Do you handle complete facade and cladding installation?",
        answer:
          "We install the cladding components included in the agreed facade scope. The quote identifies the selected system, substrate assumptions, material responsibilities and any work by adjoining trades before installation starts.",
      },
      {
        question: "What does a facade system installation include?",
        answer:
          "A facade system is more than the visible panels or boards. It usually includes the framing or battens, fixings, flashings and junction details set out in the manufacturer’s installation guide. We follow that guide and the project documents for the parts in our scope, and the quote lists what is included.",
      },
      {
        question:
          "What is the difference between facade installation and feature cladding?",
        answer:
          "Facade installation covers the whole external face of an elevation or building, set out from the drawings around every opening. Feature cladding is a smaller element, such as an entry wall or upper-level projection, set against render or brick. Both use the same trade skills, but a feature element is planned around its edges and the materials it meets.",
      },
      {
        question: "Can you reclad an existing facade?",
        answer:
          "Yes, once the existing cladding and the wall behind it have been checked. Recladding starts with identifying the old material, inspecting the wall when it is exposed and planning the new system around openings that are already in place. We install the replacement cladding. Asbestos removal, structural repair and certification are carried out by the appropriately licensed or qualified parties.",
      },
      {
        question: "Can cladding be installed over existing brick?",
        answer:
          "Often, yes. It becomes a battened installation with its own cavity, membrane and flashing requirements, and the condition of the brickwork and any moisture history need to be checked first. Our cladding over brick guide explains what the existing wall has to confirm.",
      },
      {
        question:
          "Is cladding suitable for coastal or wind-exposed Adelaide sites?",
        answer:
          "Yes, many systems are suitable for exposed sites when the product, fixings and detailing are specified for those conditions. We consider exposure during quoting and follow the relevant system requirements during installation.",
      },
      {
        question: "How much does cladding cost in Adelaide?",
        answer:
          "We do not publish rates, because the system, the wall behind it, the access and the amount of detail around openings all change the price. Tell us about the project and what plans or photos are available, and we will prepare an obligation-free quote for the agreed scope.",
      },
      {
        question: "How do I maintain external cladding?",
        answer:
          "There is no single schedule for every cladding system. Identify the exact product, finish and exposure, then follow the current manufacturer guidance for cleaning, inspections and recoating. Our coastal Adelaide cladding guide explains what to confirm without treating one product’s instructions as universal.",
      },
    ],
  },
  {
    slug: "render",
    name: "Render",
    longName: "Rendering services",
    headings: {
      intro: "Rendering services for Adelaide homes and commercial projects",
      faqs: "Rendering FAQs",
    },
    bannerTitle: "Rendering Services Adelaide",
    image: "/images/v2/service-render-application.webp",
    imageAlt: "Tradesperson applying an even render finish to an exterior wall",
    imageWidth: 1600,
    imageHeight: 1067,
    summary:
      "Smooth, textured and custom render finishes, prepared and applied to suit the wall, the conditions and the design.",
    metaTitle: "Rendering Services Adelaide",
    metaDescription:
      "Rendering services in Adelaide for internal and external walls, including surface preparation, finish selection and coordination with cladding or Hebel.",
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
    sections: [
      {
        id: "internal-and-external-rendering",
        heading: "Internal and external rendering",
        paragraphs: [
          "External render has to cope with sun, rain, salt and the movement of the wall it is bonded to. Internal render does not face the weather, but it is seen at arm’s length and under raking light, beside floors, joinery and fittings that are often already finished. We do both, on new construction and on existing buildings, and we treat them as different jobs.",
          "Outside, the questions are about the substrate, the exposure and the system that suits both. Inside, they are about flatness, how the finish reads under the room’s lighting, clean junctions at reveals, corners and ceilings, and working in sequence with the other trades. Our [internal rendering guide](/resources/internal-rendering-adelaide/) covers what to confirm before work starts indoors.",
        ],
      },
      {
        id: "render-finishes",
        heading: "Render finishes: smooth, textured and custom",
        navLabel: "Render finishes",
        paragraphs: [
          "The finish is the part people choose on, and it does more than set the look. A smooth trowelled finish reads as one clean plane and hides nothing in the wall behind it. Fine sand and float finishes soften minor variation without looking heavily textured. Coarser textured render hides more, and presents more surface to dust and salt. The colour can sit in the render itself or in a coating over it.",
          "We confirm the finish against a sample and the wall it is going on, because the same texture reads differently on a flat new wall and an older, uneven one. Our [render finishes guide](/resources/render-finishes-adelaide/) explains where each texture suits, and the [acrylic or cement render comparison](/resources/acrylic-render-vs-cement-render-adelaide/) covers the system underneath the finish.",
        ],
      },
      {
        id: "render-preparation",
        heading: "Preparation before render goes on",
        navLabel: "Surface preparation",
        paragraphs: [
          "Render is bonded to its substrate, so it inherits whatever the substrate does. Brick, block, Hebel panels, fibre-cement sheet and previously painted or rendered walls each need different preparation and, often, a different base coat.",
          "Before we render, we check:",
        ],
        bullets: [
          "What the wall is built from, and whether it has been coated before",
          "Whether the surface is sound, clean and stable enough to bond to",
          "Existing cracks, hollow areas and signs of movement or damp",
          "Movement and control joints that the finish must not bridge",
          "Junctions with windows, flashings, cladding and paving",
        ],
        closing: [
          "Our [guide to preparing walls for render](/resources/preparing-walls-for-render-adelaide/) goes through each of these. Painted masonry and AAC panels have their own requirements, covered in the [rendering over painted brick](/resources/rendering-over-painted-brick-adelaide/) and [rendering Hebel panels](/resources/rendering-hebel-panels-adelaide/) guides.",
        ],
      },
      {
        id: "render-repair-or-re-render",
        heading: "Render repair or a full re-render",
        navLabel: "Repair vs full re-render",
        paragraphs: [
          "Not every tired or cracked wall needs to be stripped. Local damage on otherwise sound render can often be patched and the elevation recoated. Where render has lost its bond over larger areas, where an earlier coating is failing, or where the texture can no longer be matched acceptably, re-rendering a whole elevation back to a natural break usually gives the better result.",
          "What we will not do is cover a problem that is still active. Cracking that keeps opening needs its cause understood first, and salt damp at the base of an older wall has to be dealt with at its source before any finish goes back on.",
          "Our [render repair guide](/resources/render-repair-adelaide/) explains how the scope is decided, alongside the guides to [what causes render cracking](/resources/render-cracking-adelaide/) and [repainting rendered walls](/resources/repainting-render-adelaide/).",
        ],
      },
      {
        id: "rendering-in-adelaide-conditions",
        heading: "Rendering in Adelaide conditions",
        navLabel: "Adelaide conditions",
        paragraphs: [
          "Three local conditions come up on most jobs. Reactive clay soils across much of the Adelaide plains move with the seasons, and that movement reaches the walls above. Hot, dry and windy summer days affect how render cures, so application is planned around the limits in the product data sheet. Near the coast, salt-laden air is harder on coatings.",
          "Older stone and brick homes add a fourth: salt damp. Rendering over it does not fix it and usually makes the damage worse, so it has to be assessed before render is considered. Our [salt damp guide](/resources/salt-damp-adelaide/) explains why, and the [coastal Adelaide page](/locations/coastal-adelaide/) covers what changes for sites near the gulf.",
        ],
      },
      {
        id: "render-quotes",
        heading: "Render with cladding or Hebel, and how quotes work",
        navLabel: "Combined scopes and quotes",
        paragraphs: [
          "Render often shares an elevation with other systems: cladding to an upper level or feature wall, Hebel panels that need a compatible coating system, or new wall framing. We install all of them, so the junctions between finishes can be planned and quoted as one scope through our [cladding](/cladding/), [Hebel](/hebel/) and [walling](/walling/) services.",
          "We do not publish rendering rates, because preparation, access, the system and the finish move the price more than the wall area does. Quotes are obligation-free and state the system, the areas included and the assumptions about the wall.",
          "Our guide to [what affects a render quote](/resources/what-affects-cladding-render-quotes-adelaide/) explains the drivers, and the [cladding or render comparison](/resources/cladding-vs-render-adelaide/) helps if you are still choosing between finishes.",
        ],
      },
    ],
    relatedLinks: [
      { label: "View render projects", href: "/projects/" },
      { label: "Cladding and facade installation", href: "/cladding/" },
      { label: "Adelaide service area", href: "/locations/adelaide/" },
      { label: "Contact for a quote", href: "/contact-us/#contact" },
      { label: "Plan your project enquiry", href: "/project-planning/" },
    ],
    guides: {
      heading: "Rendering guides",
      intro:
        "Planning guides for the questions that come up before, during and after a render job.",
      links: [
        {
          label: "Render repair: patch or re-render?",
          href: "/resources/render-repair-adelaide/",
        },
        {
          label: "Render finishes and textures",
          href: "/resources/render-finishes-adelaide/",
        },
        {
          label: "Acrylic or cement render?",
          href: "/resources/acrylic-render-vs-cement-render-adelaide/",
        },
        {
          label: "Preparing walls for render",
          href: "/resources/preparing-walls-for-render-adelaide/",
        },
        {
          label: "Internal rendering",
          href: "/resources/internal-rendering-adelaide/",
        },
        {
          label: "What affects a render quote",
          href: "/resources/what-affects-cladding-render-quotes-adelaide/",
        },
        {
          label: "What causes render cracking?",
          href: "/resources/render-cracking-adelaide/",
        },
        {
          label: "Can painted brick be rendered?",
          href: "/resources/rendering-over-painted-brick-adelaide/",
        },
        {
          label: "Rendering Hebel panels",
          href: "/resources/rendering-hebel-panels-adelaide/",
        },
        {
          label: "Repainting rendered walls",
          href: "/resources/repainting-render-adelaide/",
        },
        {
          label: "Salt damp and render",
          href: "/resources/salt-damp-adelaide/",
        },
        {
          label: "Cladding or render?",
          href: "/resources/cladding-vs-render-adelaide/",
        },
      ],
    },
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
      {
        question: "Do you render internal walls as well as exteriors?",
        answer:
          "Yes. We render internal and external walls for residential and commercial projects. Internal work is planned around the room’s lighting, the junctions with floors, ceilings and joinery, and the other trades on site.",
      },
      {
        question: "What render finishes can I choose from?",
        answer:
          "Smooth trowelled, fine sand or float, and coarser textured finishes are the main options, with the colour either in the render or in a coating over it. We confirm the finish against a sample and the wall it is going on, because substrate flatness and exposure affect which finishes suit.",
      },
      {
        question: "Can you render over painted brick or Hebel?",
        answer:
          "Often, yes, with the right preparation and a system documented for that substrate. Painted brick needs the existing coating assessed first, and Hebel panels need a coating system compatible with the panel manufacturer’s requirements.",
      },
      {
        question: "Will render fix salt damp?",
        answer:
          "No. Salt damp is a moisture problem in the wall, and rendering over it usually makes the damage worse. It needs to be assessed and dealt with at its source before a new finish is considered.",
      },
      {
        question: "How much does rendering cost in Adelaide?",
        answer:
          "We do not publish rates, because preparation, access, the render system and the finish change the price more than wall area alone. Tell us about the walls and what plans or photos are available, and we will prepare an obligation-free quote for the agreed scope.",
      },
    ],
  },
  {
    slug: "hebel",
    name: "Hebel",
    longName: "Hebel installation",
    headings: {
      intro: "Hebel installers for Adelaide homes and commercial projects",
      faqs: "Hebel installation FAQs",
    },
    bannerTitle: "Hebel Installation Adelaide",
    image: "/images/v2/service-hebel-installation.webp",
    imageAlt:
      "Installer checking lightweight AAC wall panels on a new build",
    imageWidth: 1600,
    imageHeight: 1067,
    summary:
      "Hebel wall systems installed with accurate panel placement, secure fixing and careful junction detailing.",
    metaTitle: "Hebel Installation Adelaide",
    metaDescription:
      "Hebel installation in Adelaide for homes and commercial projects, planned around the specified system, fixings, openings and finishing trades.",
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
    sections: [
      {
        id: "hebel-installer-scope",
        heading: "What a Hebel installer does on your project",
        navLabel: "What the installer does",
        paragraphs: [
          "Hebel walls perform as documented systems. The panels, the fixings, the framing or structure they attach to, the joints and the coating all appear in the manufacturer’s design and installation guide for that system, and the fire, acoustic and thermal performance in the design relies on those parts being installed as documented. Our job as the installer is to build the wall the documents describe.",
          "On a typical project that covers:",
        ],
        bullets: [
          "Checking that the frame, slab edge or structure is ready to receive panels",
          "Setting out panels around openings, corners and levels",
          "Fixing panels with the specified fixings and accessories",
          "Forming control joints, penetrations and junctions as detailed",
          "Handing over a wall ready for the specified coating system",
        ],
        closing: [
          "We do not design the wall, engineer it or certify it. Those roles sit with the designer, the engineer and the building certifier. If you are comparing installers, our guide to [choosing a Hebel installer](/resources/choosing-a-hebel-installer-adelaide/) lists the questions worth asking any of them, including us.",
        ],
      },
      {
        id: "hebel-systems",
        heading: "Which Hebel system the drawings call for",
        navLabel: "Which Hebel system",
        paragraphs: [
          "Hebel is a family of products rather than one interchangeable panel. An external wall on a house, a wall on or near a boundary, and a wall separating two attached dwellings are different documented systems, with their own panels, fixings and performance requirements. A detail written for one should not be borrowed for another.",
          "Before quoting, we confirm which system and application the current drawings specify, and we install to that system’s guide. If you are still weighing Hebel against other wall types, our [Hebel or brick veneer comparison](/resources/hebel-vs-brick-veneer-adelaide/) explains how the two walls differ in build-up, weight, finishing and approvals.",
        ],
      },
      {
        id: "hebel-boundary-walls",
        heading: "Boundary and separating walls",
        paragraphs: [
          "Walls on or near an allotment boundary, and walls between attached homes, carry fire-separation and acoustic requirements that are set by the design and the building rules, not chosen on site. Access is often tight, the neighbouring side may be hard to reach, and the sequence with framing and roofing matters.",
          "These projects go more smoothly when the wall type, the approved documents, the access arrangements and each trade’s responsibilities are confirmed before a quote is finalised. Our [Hebel boundary walls guide](/resources/hebel-boundary-walls-adelaide/) works through those checks, and the [soundproofing walls guide](/resources/soundproofing-walls-adelaide/) explains what a wall between attached dwellings has to achieve.",
        ],
      },
      {
        id: "rendering-hebel",
        heading: "Rendering and finishing Hebel",
        paragraphs: [
          "A Hebel external wall is not finished until its coating system is on. The panel manufacturer documents compatible coating systems, and the control joints formed in the panels have to be carried through the finish rather than rendered over. Leaving the coating unassigned between trades is one of the easiest ways for a Hebel job to go wrong.",
          "Because we install Hebel and apply [render](/render/), the panel installation and the finish can be quoted and programmed together, with one party responsible for the junction between them. Our guide to [rendering Hebel panels](/resources/rendering-hebel-panels-adelaide/) explains what to confirm about the system, the joints and the trade scopes before work begins.",
        ],
      },
      {
        id: "hebel-drawings-and-approvals",
        heading: "Drawings and approvals to have ready",
        paragraphs: [
          "We quote Hebel from documents, not from a general description. The more of the following that is settled, the firmer the quote can be:",
        ],
        bullets: [
          "Current architectural drawings showing wall locations, heights and openings",
          "Structural or engineering details for the walls and their supports",
          "The Hebel system and panel specification nominated in the documents",
          "Any fire or acoustic requirements the wall has to meet",
          "The development approval status and any conditions affecting the walls",
          "Site access, programme dates and who is supplying panels and accessories",
        ],
        closing: [
          "We do not arrange approvals or certify compliance; those sit with your designer, engineer and building certifier. If documents are still being prepared, tell us what stage they are at and we can discuss what is needed before pricing. The [project planning page](/project-planning/) has a fuller checklist.",
        ],
      },
      {
        id: "hebel-quotes",
        heading: "Hebel with walling, render or cladding, and how quotes work",
        navLabel: "Combined scopes and quotes",
        paragraphs: [
          "Hebel is rarely the only wall system on a job. Internal framing, feature cladding and render usually sit alongside it. We can quote Hebel alone, or together with our [walling](/walling/), [cladding](/cladding/) and render services as one coordinated package, which keeps set-out, junctions and programme under one scope.",
          "We do not publish Hebel rates. The system, the wall heights, the number of openings, the access and who supplies the panels all change the price. Quotes are obligation-free and state the system, the areas and the supply responsibilities they are based on. Our guide to [what affects a quote](/resources/what-affects-cladding-render-quotes-adelaide/) explains the drivers.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Walling services", href: "/walling/" },
      { label: "View render and cladding portfolio", href: "/projects/" },
      { label: "Adelaide service area", href: "/locations/adelaide/" },
      { label: "Contact for a quote", href: "/contact-us/#contact" },
      { label: "Plan your project enquiry", href: "/project-planning/" },
    ],
    guides: {
      heading: "Hebel guides",
      intro:
        "Planning guides for specifying, installing and finishing Hebel walls.",
      links: [
        {
          label: "Choosing a Hebel installer",
          href: "/resources/choosing-a-hebel-installer-adelaide/",
        },
        {
          label: "Hebel boundary-wall planning guide",
          href: "/resources/hebel-boundary-walls-adelaide/",
        },
        {
          label: "Can Hebel be rendered?",
          href: "/resources/rendering-hebel-panels-adelaide/",
        },
        {
          label: "Hebel or brick veneer?",
          href: "/resources/hebel-vs-brick-veneer-adelaide/",
        },
        {
          label: "Soundproofing walls",
          href: "/resources/soundproofing-walls-adelaide/",
        },
        {
          label: "External wall insulation",
          href: "/resources/external-wall-insulation-adelaide/",
        },
        {
          label: "What affects a Hebel quote",
          href: "/resources/what-affects-cladding-render-quotes-adelaide/",
        },
      ],
    },
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
        question: "Do you supply and install Hebel in Adelaide?",
        answer:
          "We install Hebel wall systems to an agreed scope. The quote confirms whether panels, accessories and finishing components are supplied by us, the builder or another party, so every responsibility is clear before work starts.",
      },
      {
        question:
          "Do you install Hebel boundary walls and walls between units?",
        answer:
          "We install the Hebel system specified in the project documents, including external walls, boundary walls and walls between attached dwellings where they are within the agreed scope. Each is a separately documented system, so we confirm the wall type and its requirements before quoting.",
      },
      {
        question: "Can you render Hebel after installing it?",
        answer:
          "Yes. We apply render as well as installing Hebel, so the panel installation and the coating can be quoted together. The coating system needs to be compatible with the panel manufacturer’s requirements, and control joints are carried through the finish.",
      },
      {
        question: "What do you need to quote a Hebel installation?",
        answer:
          "Current drawings showing the walls and openings, the specified Hebel system, any engineering details, and the site access and programme. Tell us what documents are available and what stage approvals are at, and we will confirm what is needed before pricing.",
      },
      {
        question:
          "Do you arrange engineering or building approval for Hebel walls?",
        answer:
          "No. Design, engineering and certification are carried out by the project’s designer, engineer and building certifier. We install the wall those documents specify and raise anything on site that does not match them.",
      },
    ],
  },
  {
    slug: "walling",
    name: "Walling",
    longName: "Internal and external walling",
    headings: {
      intro: "Walling services for Adelaide builds and renovations",
      faqs: "Walling FAQs",
    },
    bannerTitle: "Walling Services Adelaide",
    image: "/images/v2/service-walling-installation.webp",
    imageAlt:
      "Installer checking internal steel wall framing with a laser level",
    imageWidth: 1600,
    imageHeight: 1067,
    summary:
      "Internal and external walling installed accurately, safely and in step with the wider construction programme.",
    metaTitle: "Walling Services Adelaide",
    metaDescription:
      "Internal and external walling in Adelaide for new builds, renovations and commercial projects, coordinated with services, openings and finishes.",
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
    sections: [
      {
        id: "internal-and-external-walling",
        heading: "Internal and external walling",
        paragraphs: [
          "Internal walling divides a building into rooms: the wall framing and wall systems, and the openings and junctions that linings and joinery later rely on. External walling forms the envelope: the framed or panel walls that carry the cladding, render or other finish and keep the weather out. We install both, in new homes, extensions and renovations, multi-unit developments and commercial projects.",
          "The two overlap on site but are judged differently. Internal walls are judged on straightness, plumb and accurate openings, because every door, cabinet and tile line that follows will show an error. External walls are judged on how well they are prepared for the finish and for the weatherproofing details around it.",
        ],
      },
      {
        id: "walling-or-hebel",
        heading: "How walling differs from a Hebel-only package",
        navLabel: "Walling vs a Hebel-only package",
        paragraphs: [
          "[Hebel installation](/hebel/) is one wall system: AAC panels installed to the manufacturer’s guide for a specific application. Walling is the broader package around it. It covers the wall framing and wall systems across a project, of which Hebel may be one part, alongside framed walls that will be lined, clad or rendered.",
          "On some jobs we are engaged for Hebel alone. On others, a builder wants one contractor to carry the internal and external walls together, so set-out, openings and the junctions between systems are resolved by one team. If you are deciding between wall types, our guides to [Hebel or brick veneer](/resources/hebel-vs-brick-veneer-adelaide/) and [steel or timber wall framing](/resources/steel-frame-vs-timber-frame-walls-adelaide/) cover the comparisons that come up most often.",
        ],
      },
      {
        id: "openings-and-services",
        heading: "Openings, services and junctions",
        paragraphs: [
          "Most walling problems start at an opening or a penetration, not in the middle of a wall. Door and window openings have to be the right size, in the right place and properly supported. Plumbing, electrical and mechanical services have to pass through or sit within the wall without weakening it. Corners, wall-to-ceiling junctions and changes of material each need a planned detail.",
          "We coordinate with the builder and the other trades on:",
        ],
        bullets: [
          "Opening sizes and positions against the window, door and joinery schedules",
          "Where services run, and who forms the penetrations",
          "Any fire, acoustic or structural requirements a wall has to meet",
          "The sequence between framing, services rough-in, linings and finishes",
          "The tolerances the following trade needs for its finish",
        ],
        closing: [
          "Where a wall has to control sound or contribute to an energy-efficiency target, the whole build-up matters, not one product. Our guides to [soundproofing walls](/resources/soundproofing-walls-adelaide/) and [external wall insulation](/resources/external-wall-insulation-adelaide/) explain what to confirm.",
        ],
      },
      {
        id: "renovation-walling",
        heading: "Walling in renovations and additions",
        paragraphs: [
          "New walls in an existing building have to meet floors, ceilings and walls that are rarely level, plumb or square, and they often go in while the building is occupied. We set out from what is actually there, agree how new work meets old, and plan access and protection with the owner or builder.",
          "Removing or opening up an existing wall is a different matter. If a wall may be load-bearing, a structural engineer has to assess it and specify any beam and support before work starts, and the appropriate approvals need to be in place. We do not make that call. We install the new walling the engineered design calls for, where it is within the agreed scope.",
          "Our guides to [load-bearing wall removal](/resources/load-bearing-wall-removal-adelaide/) and [second-storey additions](/resources/second-storey-addition-adelaide/) explain what to confirm first.",
        ],
      },
      {
        id: "walling-with-render-or-cladding",
        heading: "When walling is quoted with render or cladding",
        navLabel: "Walling with render or cladding",
        paragraphs: [
          "A wall and its finish depend on each other. A framed wall that will be clad needs its battens, membrane and openings set up for that cladding system. A wall that will be rendered needs a substrate the render system is documented for. When different contractors carry the wall and the finish, the junction between their scopes is where gaps tend to appear.",
          "Because we also install [cladding](/cladding/), apply [render](/render/) and install Hebel, walling can be quoted as a package with the finish, with one scope covering the wall and what goes on it. It can equally be quoted as walling only, with the handover condition for the next trade written into the scope. Either way, the quote states which it is.",
          "Boundary and separating walls have their own checks, set out in our [boundary-wall guide](/resources/hebel-boundary-walls-adelaide/).",
        ],
      },
      {
        id: "walling-quotes",
        heading: "What a walling quote needs",
        paragraphs: [
          "We quote walling from drawings and a clear scope. We do not publish rates, because the wall heights, the number of openings, the system specified, the access and the programme all change the price. It is useful to have ready:",
        ],
        bullets: [
          "Floor plans and elevations showing wall locations, heights and openings",
          "The wall systems or framing specified, and any engineering details",
          "Fire, acoustic or thermal requirements for particular walls",
          "Whether finishes such as render or cladding are to be included",
          "Site access, programme dates and who is supplying materials",
        ],
        closing: [
          "Quotes are obligation-free. Our guide to [what affects a quote](/resources/what-affects-cladding-render-quotes-adelaide/) explains the drivers, and the [project planning page](/project-planning/) lists what to gather before you enquire.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Cladding and facade installation", href: "/cladding/" },
      { label: "Hebel wall systems", href: "/hebel/" },
      { label: "Adelaide service area", href: "/locations/adelaide/" },
      { label: "Contact for a quote", href: "/contact-us/#contact" },
      { label: "Plan your project enquiry", href: "/project-planning/" },
    ],
    guides: {
      heading: "Walling guides",
      intro:
        "Planning guides for wall framing, structural changes and wall performance.",
      links: [
        {
          label: "Steel vs timber wall framing guide",
          href: "/resources/steel-frame-vs-timber-frame-walls-adelaide/",
        },
        {
          label: "Load-bearing wall removal",
          href: "/resources/load-bearing-wall-removal-adelaide/",
        },
        {
          label: "Second-storey additions",
          href: "/resources/second-storey-addition-adelaide/",
        },
        {
          label: "Soundproofing walls",
          href: "/resources/soundproofing-walls-adelaide/",
        },
        {
          label: "External wall insulation",
          href: "/resources/external-wall-insulation-adelaide/",
        },
        {
          label: "Boundary-wall project checks",
          href: "/resources/hebel-boundary-walls-adelaide/",
        },
        {
          label: "Hebel or brick veneer?",
          href: "/resources/hebel-vs-brick-veneer-adelaide/",
        },
        {
          label: "Internal rendering",
          href: "/resources/internal-rendering-adelaide/",
        },
        {
          label: "What affects a walling quote",
          href: "/resources/what-affects-cladding-render-quotes-adelaide/",
        },
      ],
    },
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
          "Tell us about the project and what plans or photos are available, or call us directly. If supporting files are needed, we’ll arrange how to review them before preparing an obligation-free quote.",
      },
      {
        question:
          "What is the difference between walling and Hebel installation?",
        answer:
          "Hebel installation is one specific wall system: AAC panels installed to the manufacturer’s guide. Walling is the wider package of internal and external walls on a project, which may include Hebel alongside framed walls that are later lined, clad or rendered.",
      },
      {
        question: "Can walling be quoted together with render or cladding?",
        answer:
          "Yes. We install cladding, apply render and install Hebel as well as walling, so the wall and its finish can be quoted as one package. If you only need walling, the quote states the condition the wall will be handed over in for the next trade.",
      },
      {
        question: "Do you remove load-bearing walls?",
        answer:
          "A wall that may be load-bearing has to be assessed by a structural engineer, with the appropriate approvals in place, before any removal. We do not make that assessment. We install the new walling the engineered design specifies, where that is within the agreed scope.",
      },
      {
        question: "Do you work on renovations and occupied homes?",
        answer:
          "Yes. We install walling in renovations and extensions as well as new builds. We set out from the existing building, agree how new walls meet old ones, and plan access and protection with the owner or builder before work starts.",
      },
    ],
  },
];

/** Service names for form dropdowns — avoids importing full page copy into clients when possible. */
export const serviceNames = services.map((service) => service.name);

export const servicesIntro =
  "Specialist installation for new homes, renovations, multi-unit developments and commercial builds across Adelaide.";
