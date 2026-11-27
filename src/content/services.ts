import type { SectionFormat } from "./section-formats.ts";

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
  /**
   * Deeper, intent-specific sections shown after the project links. A section
   * may carry `formats`: tables, numbered steps, checklists, glossaries and
   * callouts drawn after its tick list and before its closing paragraphs.
   */
  sections?: readonly (ContentSection & {
    formats?: readonly SectionFormat[];
  })[];
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

/** A service-page section: a `ContentSection` plus its optional formats. */
export type ServiceSection = NonNullable<Service["sections"]>[number];

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
    metaTitle: "Cladding & Facade Installers Adelaide",
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
        formats: [
          {
            type: "compatibility",
            heading: "What the cladding can be fixed to",
            id: "cladding-substrates",
            intro:
              "This is the usual approach for the walls we are most often asked to clad. It describes what is typical, not what suits your wall, so each row ends with what has to be confirmed on site or in the documents first.",
            caption:
              "Cladding over different walls: typical approach and what to confirm",
            rows: [
              {
                condition: "New timber or steel wall frame",
                approach:
                  "The membrane, battens and cladding go on to the selected system’s installation guide, over a frame that was designed for the cladding.",
                confirm:
                  "That the frame is ready to receive the system, and that windows and flashings will be in before the cladding goes on.",
              },
              {
                condition: "Brick veneer",
                approach:
                  "A battened installation over the brickwork with its own cavity, membrane and flashings, using the over-masonry method the cladding manufacturer documents.",
                confirm:
                  "The condition of the brickwork and mortar, any moisture history, and that weepholes and the damp-proof course stay clear. See the [cladding over brick guide](/resources/cladding-over-brick-adelaide/).",
              },
              {
                condition: "Solid brick or other solid masonry",
                approach:
                  "Everything fixes into the masonry, so the fixings and the method are an engineering question for that wall rather than a standard detail.",
                confirm:
                  "Mortar condition, earlier repointing and any sign of salt damp, which has to be dealt with at its source before a wall is covered.",
              },
              {
                condition: "Hebel or other AAC panel walls",
                approach:
                  "Treated as its own substrate. The fixing method comes from the cladding system’s documents for that wall, not from a detail written for a framed one.",
                confirm:
                  "Which panel system the wall is, and that the cladding manufacturer documents a fixing method for it.",
              },
              {
                condition: "Existing cladding that is being replaced",
                approach:
                  "The old cladding is identified before it is disturbed, the wall behind is checked once it is exposed, and the new system is planned around openings and levels that are already fixed in place.",
                confirm:
                  "What the old material is. Older fibre-cement sheeting can contain asbestos, which has to be tested and removed under licence before we start. See the [facade recladding guide](/resources/facade-recladding-adelaide/).",
              },
              {
                condition: "A wall with cracking, damp or staining",
                approach:
                  "Cladding hides a symptom without changing its cause, so the movement or the moisture source is assessed and dealt with before the wall is covered.",
                confirm:
                  "Who is assessing the cause, and that the wall is stable and dry before a cladding scope is written.",
              },
            ],
          },
        ],
        closing: [
          "For fibre-cement boards and panels, our [fibre cement cladding guide](/resources/fibre-cement-cladding-adelaide/) explains how an installation is planned, and the [fibre cement or weatherboard comparison](/resources/fibre-cement-vs-weatherboard-cladding-adelaide/) covers the material choice itself.",
        ],
      },
      {
        id: "vertical-or-horizontal-cladding",
        heading: "Vertical or horizontal cladding?",
        navLabel: "Vertical or horizontal cladding",
        paragraphs: [
          "The direction the boards run is more than a look. Horizontal and vertical cladding rely on different batten layouts and cavity details behind the boards, so the choice changes how the wall is built as well as how it reads from the street.",
          "The guide below sets out what each direction means for the wall and what still has to be confirmed. Our [vertical or horizontal cladding guide](/resources/vertical-vs-horizontal-cladding-adelaide/) explains the reasoning in full.",
        ],
        formats: [
          {
            type: "decision",
            caption: "Vertical or horizontal cladding: what each choice means",
            columns: [
              "Your situation",
              "What it means for the wall",
              "Still to confirm",
            ],
            rows: [
              {
                situation: "You want boards running horizontally",
                preference:
                  "Each board sheds water down its face and over the board below. The cavity behind is formed with battens fixed vertically, so water and air can move straight down and out at the base of the wall.",
                confirm:
                  "The batten spacing and fixing schedule in the selected system’s installation guide, set against the site’s assessed wind classification.",
              },
              {
                situation: "You want boards or panels running vertically",
                preference:
                  "The battens behind run horizontally, and they have to be notched or castellated so moisture in the cavity can still travel down and out.",
                confirm:
                  "The batten profile and spacing documented for that system, and where the sheet joints and control joints fall on each elevation.",
              },
              {
                situation: "The property is close to the coast",
                preference:
                  "Either direction can be used. Fixings and cavity components carry more corrosive load near the coast whichever way the boards run.",
                confirm:
                  "The manufacturer’s coastal distance and corrosion-class requirements, checked against the property’s actual distance from the coast.",
              },
              {
                situation: "The house sits on reactive clay",
                preference:
                  "Either direction can be used. Horizontal boards tend to hide a small amount of frame movement along a continuous run, while vertical cladding shows it at the sheet joints and control joints.",
                confirm:
                  "That the frame, the footing system and the manufacturer’s joint spacing agree on the drawings before installation begins.",
              },
              {
                situation: "You want both directions on one facade",
                preference:
                  "Mixing directions is a common design feature, provided each section’s cavity, battens and flashings are detailed for the direction used in that section.",
                confirm:
                  "The documented flashing detail at the junction between the two.",
              },
              {
                situation:
                  "You are changing the direction on an existing building",
                preference:
                  "This is recladding. The new system is planned around the wall, the openings and the levels that are already there.",
                confirm:
                  "Whether the change needs development approval for the property. Check the PlanSA portal or ask the local council before material is ordered.",
              },
            ],
          },
          {
            type: "callout",
            note: {
              title: "The direction is a design decision",
              body: "Which way the boards run is decided with the architect, designer or drafter and is usually shown on the elevations. We install the documented cladding and cavity system once that decision and its supporting drawings are confirmed.",
            },
          },
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
        formats: [
          {
            type: "comparison",
            heading: "Coastal and inland sites compared",
            id: "coastal-or-inland-cladding",
            intro:
              "Exposure belongs to the site rather than the suburb name, so read the two columns as the ends of a range. Two houses in the same street can sit in different positions.",
            table: {
              caption: "Cladding on inland and coastal Adelaide sites",
              rowHeading: "Consideration",
              columns: [
                "Inland metropolitan sites",
                "Coastal and wind-exposed sites",
              ],
              rows: [
                {
                  label: "Fixings and flashings",
                  cells: [
                    "Taken from the selected system’s installation guide for the site’s assessed wind classification.",
                    "Salt in the air works on fasteners, flashings and coatings, so manufacturers step up the corrosion-resistance class for fasteners within a defined distance of the coast.",
                  ],
                },
                {
                  label: "Product choice",
                  cells: [
                    "Led by the design, the substrate and the budget.",
                    "The exposure category decides which products are suitable before appearance comes into it.",
                  ],
                },
                {
                  label: "Cavity and battens",
                  cells: [
                    "Batten direction and spacing follow the direction of the boards and the system’s installation guide.",
                    "The same rules apply, and the batten profile and spacing also have to match the system documented for the property’s distance from the coast.",
                  ],
                },
                {
                  label: "Cleaning and upkeep",
                  cells: [
                    "Follow the manufacturer’s instructions for the exact product and finish. There is no single schedule for every system.",
                    "Salt builds up on areas the rain does not wash, such as walls under eaves, and coated boards carry their own cleaning and recoating conditions. See the [coastal cladding maintenance guide](/resources/cladding-maintenance-coastal-adelaide/).",
                  ],
                },
                {
                  label: "What to confirm before quoting",
                  cells: [
                    "The system, the substrate, the access and the programme.",
                    "All of that, plus the exposure category nominated by the designer or the manufacturer and the product’s coastal requirements. Our [coastal Adelaide page](/locations/coastal-adelaide/) lists what to settle first.",
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        id: "cladding-installation-steps",
        heading: "How a cladding installation runs",
        navLabel: "How an installation runs",
        paragraphs: [
          "Most of the decisions on a cladding job are made before the first board is fixed. This is the order we work in, on a full facade or a single feature wall.",
        ],
        formats: [
          {
            type: "steps",
            steps: [
              {
                title: "Confirm the system and the documents",
                body: "We work from the drawings and the selected system’s installation guide. If the design is still open, the profile, the direction the boards run and the finish are settled first.",
              },
              {
                title: "Check the wall behind",
                body: "We confirm what the wall is built from and whether it is ready to receive the system. On a recladding job the old material is identified before it is disturbed, and the wall behind is checked once it is exposed.",
              },
              {
                title: "Confirm the exposure",
                body: "Coastal salt, wind and any bushfire-related requirement are raised at quoting, because they decide which product, fixings and details the manufacturer documents for the site.",
              },
              {
                title: "Set out each elevation",
                body: "A full facade is set out from the drawings, elevation by elevation, with board or panel lines resolved around every opening. A feature element is set out from the thing it frames.",
              },
              {
                title: "Install the membrane, battens and flashings",
                body: "These go on as the system’s installation guide requires, with the batten direction matched to the direction of the boards so the cavity can drain.",
              },
              {
                title: "Fix the cladding",
                body: "Boards or panels are fixed with the fixing type and spacing specified for the product and the site exposure, keeping the panel lines aligned.",
              },
              {
                title: "Finish the junctions and hand over",
                body: "Windows, doors, corners, the base of the wall and adjoining finishes are completed to the agreed details. Keep the product, finish and colour records, because later cleaning and recoating follow the manufacturer’s instructions for that exact system.",
              },
            ],
          },
        ],
        closing: [
          "Asbestos removal, structural repair, design and certification stay with the appropriately licensed or qualified parties. For one product family in more detail, see the [fibre cement cladding guide](/resources/fibre-cement-cladding-adelaide/).",
        ],
      },
      {
        id: "cladding-problems",
        heading: "Cladding problems and what to do next",
        navLabel: "Common cladding problems",
        paragraphs: [
          "A mark on the face of the cladding is a clue, not a diagnosis. The table lists what owners most often notice on an existing facade, what it can point to and the sensible next step. None of it replaces an inspection of the wall.",
        ],
        formats: [
          {
            type: "problems",
            caption:
              "Common cladding problems: what they can indicate and what to do",
            rows: [
              {
                problem: "Gaps or lines opening at sheet joints or control joints",
                indicates:
                  "Movement in the frame or footing reaching the cladding. On reactive clay that movement can be seasonal, and it shows at the joints.",
                next: "Photograph the joints with a date and note whether they change. If the wall is still moving, have the cause assessed before a repair or recladding is scoped.",
              },
              {
                problem:
                  "Rust-coloured staining at fixings, cut edges or flashings",
                indicates:
                  "Corrosion somewhere in the fixings, flashings or adjoining metalwork. Appearance alone does not show its source, extent or significance.",
                next: "Record where it is, and have the materials and junctions assessed before the stain is covered or repaired.",
              },
              {
                problem:
                  "Salt or grime building up under eaves and in sheltered corners",
                indicates:
                  "Unwashed areas: surfaces the rain does not rinse, where salt can accumulate.",
                next: "Identify the exact product and finish, then follow the manufacturer’s current cleaning instructions. A method approved for one product may be wrong for another.",
              },
              {
                problem:
                  "Damp or staining around windows, corners or the base of the wall",
                indicates:
                  "Water getting behind the face. The membrane, the cavity, the flashings and the wall behind may all be involved, not only the surface.",
                next: "Do not pull panels or probe the joint. Arrange an assessment that can look at the layers behind the cladding.",
              },
              {
                problem: "Loose, displaced or cracked boards and panels",
                indicates:
                  "Damage or movement that affects more than the surface finish.",
                next: "Keep clear of anything unstable and arrange a prompt professional assessment.",
              },
              {
                problem:
                  "Old sheeting of unknown age that is cracked or breaking down",
                indicates: "Older fibre-cement sheeting can contain asbestos.",
                next: "Leave it undisturbed and have it tested. Removal is licensed work and has to be finished before replacement cladding is scoped. See the [asbestos cladding replacement guide](/resources/asbestos-cladding-replacement-adelaide/).",
              },
            ],
          },
          {
            type: "callout",
            tone: "caution",
            note: {
              title: "Inspect from the ground",
              body: "Check only what can be seen from a safe, readily accessible position. Do not pull panels, disturb a joint or improvise access at height to find out more.",
            },
          },
        ],
        closing: [
          "Where damage is spread across an elevation, or the same repair keeps being repeated, the question becomes repair or recladding. Our [facade recladding guide](/resources/facade-recladding-adelaide/) sets out how that is decided.",
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
        formats: [
          {
            type: "checklist",
            heading: "Pre-quote checklist for cladding",
            id: "cladding-quote-checklist",
            intro:
              "Gaps are fine. Tell us what is settled and what is still open.",
            items: [
              {
                label: "Elevations or areas",
                detail:
                  "Which walls are to be clad and roughly how high they are.",
              },
              {
                label: "Drawings or measurements",
                detail:
                  "Plans and elevations if they exist, or a description of the wall and its approximate size.",
              },
              {
                label: "The wall behind",
                detail:
                  "What the cladding will be fixed to: a new frame, brick veneer, solid masonry or AAC panels.",
              },
              {
                label: "System, profile and direction",
                detail:
                  "The specified product if there is one, or the look you are aiming for and which way the boards run.",
              },
              {
                label: "Exposure",
                detail:
                  "How close the site is to the coast, how open it is to wind, and any bushfire-related requirement already confirmed.",
              },
              {
                label: "Existing cladding",
                detail:
                  "For recladding, what the old material is, its approximate age and whether it has been tested for asbestos.",
              },
              {
                label: "Supply",
                detail:
                  "Who supplies the cladding, battens, membrane, flashings and fixings.",
              },
              {
                label: "Access and programme",
                detail:
                  "Scaffold or access arrangements, target dates and when windows and flashings will be in.",
              },
            ],
          },
        ],
        closing: [
          "Our guide to [what affects a cladding or render quote](/resources/what-affects-cladding-render-quotes-adelaide/) explains the drivers in plain terms, and the [project planning page](/project-planning/) lists what is useful to have ready.",
        ],
      },
      {
        id: "cladding-terms",
        heading: "Cladding terms explained",
        navLabel: "Cladding terms",
        paragraphs: [
          "Quotes, drawings and installation guides use the same handful of terms. These are the ones this page relies on.",
        ],
        formats: [
          {
            type: "glossary",
            terms: [
              {
                term: "Substrate",
                definition:
                  "The wall the cladding is fixed to: a timber or steel frame, brick veneer, solid masonry or AAC panels.",
              },
              {
                term: "Batten",
                definition:
                  "A strip fixed to the frame or wall that the cladding is fixed to in turn. Battens form the cavity behind the boards, and their direction depends on which way the boards run.",
              },
              {
                term: "Drained cavity",
                definition:
                  "The gap behind the cladding that gives water which gets past the face a way down and out at the base of the wall.",
              },
              {
                term: "Membrane",
                definition:
                  "The weather barrier behind the battens and cladding. Each system’s installation guide says which membrane it needs and how the flashings lap with it.",
              },
              {
                term: "Flashing",
                definition:
                  "The detail at the head, sill and sides of an opening, and at other junctions, that directs water back to the outside.",
              },
              {
                term: "Control joint",
                definition:
                  "A planned break that lets sections of the wall move independently. Its position comes from the drawings and the manufacturer’s joint spacing, not from a decision on site.",
              },
              {
                term: "Exposure category",
                definition:
                  "The classification a manufacturer’s documents use for how much salt and wind a site sees. It decides which products are suitable, which fixings and flashings are specified, and what the maintenance conditions are.",
              },
              {
                term: "Unwashed area",
                definition:
                  "A surface the rain does not naturally rinse, such as a wall below a deep eave. Salt can build up there, so some manufacturers set separate cleaning requirements for it.",
              },
            ],
          },
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
      {
        question: "Should cladding run vertically or horizontally?",
        answer:
          "Either can work. The two directions rely on different batten layouts and cavity details behind the boards, so the choice affects how the wall is built as well as how it looks. The direction is a design decision, usually shown on the elevations, and we install the documented system once it is confirmed.",
      },
      {
        question: "Will new cladding fix cracks or damp in the wall behind?",
        answer:
          "No. Cladding covers the symptom and makes the wall harder to inspect. The movement or the moisture source needs to be assessed and dealt with first, and then the cladding can be treated as a finish decision.",
      },
      {
        question: "What should I have ready before asking for a cladding quote?",
        answer:
          "The elevations or areas to be clad, any drawings or measurements, what the wall is built from, the system or look you have in mind, and the site access and programme. For recladding, tell us what the existing cladding is and whether it has been tested for asbestos.",
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
        id: "acrylic-or-cement-render",
        heading: "Acrylic or cement render?",
        navLabel: "Acrylic or cement render",
        paragraphs: [
          "Under the finish sits the render system, and the two main families behave differently. Cement render is a rigid, mineral base. Acrylic render is a flexible, polymer-modified coating, usually applied as part of a coordinated system. They are not the same finish in different colours.",
          "The table gives the general tendencies of each family, not the specification of any one product. The selected manufacturer’s technical data sheet decides what a particular system can do on a particular wall.",
        ],
        formats: [
          {
            type: "comparison",
            table: {
              caption: "Cement render and acrylic render compared",
              rowHeading: "Compared on",
              columns: ["Cement render", "Acrylic render"],
              rows: [
                {
                  label: "What it is",
                  cells: [
                    "Cement, sand and water, mixed on site and applied over masonry in one or more coats.",
                    "A pre-mixed, polymer-based coating, usually applied as one layer of a coordinated system.",
                  ],
                },
                {
                  label: "Movement",
                  cells: [
                    "Sets hard and rigid, so it is more likely to show hairline cracking when the wall behind it moves.",
                    "Has some flexibility and copes better with minor movement. It does not bridge structural cracking or stand in for a movement joint.",
                  ],
                },
                {
                  label: "Substrates",
                  cells: [
                    "Developed for bare masonry such as brick, block and stone.",
                    "Formulated for a wider range of prepared surfaces, including fibre-cement sheet and some previously painted walls, where the system documents allow it.",
                  ],
                },
                {
                  label: "Application",
                  cells: [
                    "Has to cure, so the mix, the coat thickness and the curing conditions all shape the result.",
                    "Dries rather than cures, inside the temperature and weather limits on its data sheet.",
                  ],
                },
                {
                  label: "Finish and colour",
                  cells: [
                    "Commonly finished with a separate texture coat or paint system over the top.",
                    "Texture coats come in grades from smooth to coarse and can carry the colour in the coating itself.",
                  ],
                },
                {
                  label: "Upkeep",
                  cells: [
                    "Periodic washing and eventual recoating, on a cycle set by the system, the colour and the exposure.",
                    "The same washing and recoating cycle. The system, the colour and the exposure set it, not the render type.",
                  ],
                },
              ],
            },
          },
          {
            type: "callout",
            note: {
              title: "The system matters more than the label",
              body: "A colour or texture sample says nothing about whether the system underneath suits your wall. Confirm the full specification, including the primer, the base coat and any reinforcing mesh, against the manufacturer’s technical data sheet before work starts.",
            },
          },
        ],
        closing: [
          "The two are often used together. A cement base coat levelled over masonry with a compatible acrylic texture coat on top is a common documented combination, so the real question is usually which system rather than which material. Our [acrylic or cement render comparison](/resources/acrylic-render-vs-cement-render-adelaide/) goes through the choice in detail.",
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
        formats: [
          {
            type: "compatibility",
            heading: "What each substrate needs before render",
            id: "render-substrates",
            intro:
              "The same checks lead to different preparation on different walls. This is the usual approach for the substrates we are asked to render most often.",
            caption:
              "Render over different substrates: typical approach and what to confirm",
            rows: [
              {
                condition: "New brick or block",
                approach:
                  "The substrate render was developed for. Preparation follows the selected system’s documents for that masonry, including evening out the wall’s suction.",
                confirm:
                  "That the masonry has had the curing its own documents call for, and where its movement joints are.",
              },
              {
                condition: "Painted brick",
                approach:
                  "Sometimes rendered, with a system documented for prepared painted surfaces. The existing paint becomes part of the substrate, so its bond and condition are assessed with the brickwork.",
                confirm:
                  "The coating history, any flaking, blistering or chalking, and the age of the building, because older paint can contain lead. See the [painted brick guide](/resources/rendering-over-painted-brick-adelaide/).",
              },
              {
                condition: "Hebel and other AAC panels",
                approach:
                  "A coating system matched to the panel manufacturer’s documents rather than a generic render, with the panel joints and control joints carried through the finish.",
                confirm:
                  "The exact panel system and the coating specification. See the [rendering Hebel panels guide](/resources/rendering-hebel-panels-adelaide/).",
              },
              {
                condition: "Fibre-cement sheet",
                approach:
                  "A sheeted frame flexes with temperature in a way a rigid mix does not accommodate well, so an acrylic base coat formulated for the sheet is the usual choice.",
                confirm:
                  "That the sheet is one the render system is documented for, that it is fixed as its own guide requires, and how the sheet joints are treated.",
              },
              {
                condition: "Existing render",
                approach:
                  "The old coating is part of the substrate. Sound, well-bonded render can often be repaired and recoated, while cracked or hollow render is a repair question before it is a preparation question.",
                confirm:
                  "How much of the render is still bonded, and whether any cracking is still active. See the [render repair guide](/resources/render-repair-adelaide/).",
              },
              {
                condition: "Older masonry with damp or salt at the base",
                approach:
                  "Not rendered until the moisture source has been dealt with and the wall has dried. Rendering over salt damp does not fix it and usually makes the damage worse.",
                confirm:
                  "An assessment of the cause by a suitably qualified professional. See the [salt damp guide](/resources/salt-damp-adelaide/).",
              },
            ],
          },
          {
            type: "steps",
            heading: "Preparation, step by step",
            id: "render-preparation-steps",
            intro:
              "This is the order the preparation questions are settled in. It is a planning sequence, not an application method: the selected system’s current data sheets govern the work itself.",
            steps: [
              {
                title: "Identify each substrate",
                body: "One elevation can combine original brickwork, a block extension, a sheeted upper storey and an earlier coat of paint. Each is named first, because every later decision depends on it.",
              },
              {
                title: "Check that the surface is sound",
                body: "Loose brick faces, soft mortar, hollow render and flaking paint are weak layers. Making them good is part of the scope before any render is priced as going on.",
              },
              {
                title: "Deal with water first",
                body: "Damp from the ground, a leaking gutter or a failed flashing has to be fixed at its source by the responsible trade, and the wall has to dry, before it is treated as ready.",
              },
              {
                title: "Find the joints and the cracks",
                body: "Every movement joint is located, including joints hidden by old paint or filler, and we agree how each one is carried through the new finish. Existing cracks are checked for whether they are still moving.",
              },
              {
                title: "Clean and even out the surface",
                body: "Dust, salts, mould and chalky old paint come off as the system’s preparation documents require, and patches of very different absorbency are evened out with the specified sealer, primer or key coat.",
              },
              {
                title: "Settle the finish and the flatness",
                body: "The finish is confirmed against a sample. The flatter the finish, the more straightening and building out has to happen before it goes on.",
              },
              {
                title: "Confirm the other trades have finished",
                body: "Windows, flashings, services and finished ground levels need to be known, because render locks in whatever is behind and beside it.",
              },
              {
                title: "Programme around the weather",
                body: "Temperature, humidity and wind sit inside limits on the product data sheet, so elevations are worked in a sensible order and each coat is given the curing time it needs.",
              },
            ],
          },
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
        ],
        formats: [
          {
            type: "problems",
            heading: "Render problems and what to do next",
            id: "render-problems",
            intro:
              "A mark on the surface is a clue rather than a diagnosis. These are the problems we are asked about most, what each can point to and the sensible next step.",
            caption:
              "Common render problems: what they can indicate and what to do",
            rows: [
              {
                problem: "Fine, random crazing in the surface",
                indicates:
                  "Cracking confined to the coating rather than the wall. Appearance alone cannot confirm that.",
                next: "Record it with a dated photograph and check whether it changes. A stable defect in a sound, well-bonded finish may suit a local repair and recoat.",
              },
              {
                problem:
                  "A crack running off a window corner, or stepping along the mortar joints",
                indicates:
                  "Movement in the wall, the footing or the ground, or a movement joint that was rendered across.",
                next: "Do not fill or paint over it. Have the cause, and whether it is still active, understood first. See the [render cracking guide](/resources/render-cracking-adelaide/).",
              },
              {
                problem: "Render that sounds hollow when tapped (drummy render)",
                indicates:
                  "Render that has lost its bond to the wall. A crack or a bulge may sit at the edge of a much larger unbonded area.",
                next: "Have the extent mapped during an inspection. A small, isolated hollow can be cut out and rebuilt, while hollow render spread across an elevation points to a re-render.",
              },
              {
                problem: "Flaking, blistering or chalking paint or texture",
                indicates:
                  "A coating that has failed, or was never compatible with the layer under it. The render beneath may still be sound.",
                next: "Where only the coating has failed, the job may be preparation and recoating. See the [repainting rendered walls guide](/resources/repainting-render-adelaide/).",
              },
              {
                problem:
                  "White powdery deposits, tide marks or crumbling mortar low on the wall",
                indicates:
                  "Moisture in the wall, often salt damp in older masonry. A leaking downpipe or a garden bed built up against the wall can cause similar damage.",
                next: "Have the moisture source assessed and dealt with before any finish is considered. Render alone does not fix rising damp. See the [salt damp guide](/resources/salt-damp-adelaide/).",
              },
              {
                problem:
                  "A crack that comes back after patching or painting",
                indicates:
                  "Movement, moisture or failed adhesion that is still active beneath the repair.",
                next: "Arrange an assessment of the cause before another repair. A crack that changes quickly, or shows on both faces of the wall, needs a structural engineer.",
              },
            ],
          },
        ],
        closing: [
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
        ],
        formats: [
          {
            type: "checklist",
            heading: "Pre-quote checklist for render",
            id: "render-quote-checklist",
            intro:
              "Gaps are fine: label what you do not know as unknown. The [project planning page](/project-planning/) has the full site-readiness checklist.",
            items: [
              {
                label: "Which walls",
                detail:
                  "The elevations or rooms to be rendered, internal or external, and their approximate size.",
              },
              {
                label: "What each wall is built from",
                detail:
                  "Brick, block, Hebel panels, fibre-cement sheet or older stone.",
              },
              {
                label: "Coating history",
                detail:
                  "Whether the wall has been painted or rendered before, roughly when, and with what if records exist.",
              },
              {
                label: "Cracks, hollow areas and damp",
                detail:
                  "Where they are, how long they have been there and whether they change with the seasons.",
              },
              {
                label: "Finish and colour",
                detail:
                  "Smooth, fine float or textured, and any sample or specification already chosen.",
              },
              {
                label: "Other trades",
                detail:
                  "Whether windows, flashings, services and paving levels are finished or still to come.",
              },
              {
                label: "Other systems on the elevation",
                detail:
                  "Cladding, Hebel or new wall framing that should be quoted with the render.",
              },
              {
                label: "Access and programme",
                detail:
                  "Scaffold or access arrangements, target dates and whether the building is occupied.",
              },
            ],
          },
        ],
        closing: [
          "Our guide to [what affects a render quote](/resources/what-affects-cladding-render-quotes-adelaide/) explains the drivers, and the [cladding or render comparison](/resources/cladding-vs-render-adelaide/) helps if you are still choosing between finishes.",
        ],
      },
      {
        id: "render-terms",
        heading: "Render terms explained",
        navLabel: "Render terms",
        paragraphs: [
          "Render quotes and data sheets lean on a small set of terms. These are the ones this page uses.",
        ],
        formats: [
          {
            type: "glossary",
            terms: [
              {
                term: "Substrate",
                definition:
                  "The wall the render is bonded to: brick, block, Hebel panels, fibre-cement sheet or an earlier coating.",
              },
              {
                term: "Base coat",
                definition:
                  "The first layer of a render system. It levels the wall and gives the finish an even surface to sit on.",
              },
              {
                term: "Texture coat",
                definition:
                  "The finishing layer that sets the look, from smooth to coarse. It can carry the colour itself or be coated afterwards.",
              },
              {
                term: "Float finish",
                definition:
                  "A fine sand texture that softens minor variation in the wall without looking heavily textured.",
              },
              {
                term: "Suction",
                definition:
                  "How readily a wall takes up water. Too much draws water out of cement render too quickly, which can lead to early cracking or a poor bond.",
              },
              {
                term: "Key coat",
                definition:
                  "A preparatory coat, like a sealer or primer, that a system specifies to even out suction and help the render bond.",
              },
              {
                term: "Movement joint",
                definition:
                  "A joint that lets sections of wall move independently. The finish is detailed at the joint rather than carried across it.",
              },
              {
                term: "Drummy render",
                definition:
                  "Render that has lost its bond to the wall and sounds hollow when tapped.",
              },
              {
                term: "Salt damp",
                definition:
                  "Ground moisture rising through masonry and leaving salts behind as it evaporates. It is a moisture problem in the wall, not a finish problem.",
              },
              {
                term: "Natural break",
                definition:
                  "A corner, an opening or a joint where a repair or a re-render can stop without the join showing in the middle of a wall.",
              },
            ],
          },
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
      {
        question: "Is acrylic or cement render better?",
        answer:
          "Neither is better in every case. Cement render is rigid and was developed for bare masonry. Acrylic render is more flexible and is formulated for a wider range of prepared surfaces. They are often used together, with a cement base coat under an acrylic texture coat, so the system is chosen to suit the substrate and the exposure.",
      },
      {
        question: "What is drummy render?",
        answer:
          "Drummy render has lost its bond to the wall and sounds hollow when tapped. The visible crack or bulge is rarely the full extent, so the unbonded area is mapped during an inspection before deciding between a patch and a re-render.",
      },
      {
        question: "What preparation does a wall need before rendering?",
        answer:
          "It depends on what the wall is built from and what has been applied to it before. The surface has to be sound, clean and dry, movement joints have to be located and respected, and adjoining work such as windows and flashings needs to be finished. The selected render system’s data sheets set the detail.",
      },
      {
        question: "What should I have ready before asking for a render quote?",
        answer:
          "Which walls are to be rendered, what they are built from, whether they have been painted or rendered before, any cracks or damp you have noticed, and the finish you have in mind. Access arrangements and target dates help too.",
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
        formats: [
          {
            type: "decision",
            heading: "Hebel or brick veneer?",
            id: "hebel-or-brick-veneer",
            intro:
              "Both are veneers over a frame, so the comparison is about the skin rather than the structure. We install Hebel and apply render; bricklaying is outside our four services.",
            caption: "Hebel or brick veneer: how the two walls compare",
            columns: [
              "If this matters most",
              "How the two compare",
              "Still to confirm",
            ],
            rows: [
              {
                situation: "You want a rendered finish either way",
                preference:
                  "The comparison narrows. Finished well, the two are hard to tell apart from the street, and rendering brick veneer adds a coating trade and a maintenance cycle to a wall that did not need one.",
                confirm:
                  "Who installs the wall, who treats the joints and who applies the coating, written into the scope.",
              },
              {
                situation: "You want face brick with no coating to maintain",
                preference:
                  "Brick veneer. Face brick is the finished surface, and its upkeep is repointing and cleaning rather than recoating. A Hebel wall is designed to be coated.",
                confirm:
                  "The bricklayer’s scope, including the flashings and weepholes.",
              },
              {
                situation: "Wall thickness on a narrow allotment",
                preference:
                  "A panel on top hats is usually a thinner wall than a brick leaf plus its cavity.",
                confirm:
                  "Where the wall sits relative to the boundary, and the fire-separation requirements the design sets for it.",
              },
              {
                situation: "Weight on the footing or on an existing structure",
                preference:
                  "Autoclaved aerated concrete (AAC) is substantially lighter than clay brick, which is one reason it comes up for upper-level additions.",
                confirm:
                  "That the engineer has accounted for the wall in the footing and frame design. On an addition, the existing footings and frame are assessed first.",
              },
              {
                situation: "Keeping water out",
                preference:
                  "Brick veneer relies on a drained cavity and flashings. A panel wall relies on its jointing and its coating being installed as documented.",
                confirm:
                  "The jointing and coating system for a Hebel wall, and which trade owns the window junctions.",
              },
              {
                situation: "Thermal, fire or acoustic performance",
                preference:
                  "Neither skin settles it. What a wall achieves depends on the whole documented build-up, and in both systems most of the insulation sits in the frame.",
                confirm:
                  "The figures in the certification for the specific assembly, not a comparison of the two skins.",
              },
              {
                situation: "A site on reactive clay or near the coast",
                preference:
                  "Site classification and footing design come first and the wall system follows. Near the coast, durability requirements follow the exposure category for either wall.",
                confirm:
                  "The soil report, the exposure category and the control joints each system’s documents require.",
              },
            ],
          },
        ],
      },
      {
        id: "hebel-boundary-walls",
        heading: "Boundary and separating walls",
        paragraphs: [
          "Walls on or near an allotment boundary, and walls between attached homes, carry fire-separation and acoustic requirements that are set by the design and the building rules, not chosen on site. Access is often tight, the neighbouring side may be hard to reach, and the sequence with framing and roofing matters.",
          "These projects go more smoothly when the wall type, the approved documents, the access arrangements and each trade’s responsibilities are confirmed before a quote is finalised. Our [Hebel boundary walls guide](/resources/hebel-boundary-walls-adelaide/) works through those checks, and the [soundproofing walls guide](/resources/soundproofing-walls-adelaide/) explains what a wall between attached dwellings has to achieve.",
        ],
        formats: [
          {
            type: "compatibility",
            heading: "Boundary walls and other Hebel walls compared",
            id: "hebel-wall-applications",
            intro:
              "“Boundary wall” can describe different construction. Start with what the drawings actually show, because each application below is a separately documented system.",
            caption:
              "Hebel wall applications: what sets each apart and what to confirm",
            columns: ["Wall application", "What sets it apart", "Confirm first"],
            rows: [
              {
                condition: "External wall of a house, away from the boundary",
                approach:
                  "The general case: panels fixed to the frame and finished with a coating system documented for the product.",
                confirm:
                  "Which external wall system the current drawings specify, and the coating specification.",
              },
              {
                condition: "External wall on or near an allotment boundary",
                approach:
                  "Still an external wall of one building, but its position can affect fire separation, openings, weatherproofing and access.",
                confirm:
                  "The approved documents and the requirements the design sets. Proximity alone does not name the product or the approved solution.",
              },
              {
                condition: "Zero-boundary or dual zero-boundary wall",
                approach:
                  "Documented system configurations for particular detached-building arrangements, each with its own product, framing and fixing direction.",
                confirm:
                  "The exact system named on the drawings, and how the wall is installed and coated where outside access is limited.",
              },
              {
                condition: "Wall between attached dwellings",
                approach:
                  "Also called an intertenancy, party or separating wall. It is common to two adjoining homes and carries fire-separation and acoustic requirements set by the design.",
                confirm:
                  "The separating-wall system on the approved plans and the performance it has to achieve. See the [soundproofing walls guide](/resources/soundproofing-walls-adelaide/).",
              },
              {
                condition: "Fence or retaining wall",
                approach:
                  "A separate application from a building wall. The building-wall systems above do not cover fencing or earth retention.",
                confirm:
                  "Which application the drawings show, so a building-wall detail is not borrowed for something else.",
              },
            ],
          },
          {
            type: "callout",
            tone: "caution",
            note: {
              title: "A fence line is not a boundary survey",
              body: "If the legal allotment boundary is uncertain, the owner or builder should engage a licensed surveyor before the wall is set out. A visible fence is not a substitute for boundary confirmation.",
            },
          },
        ],
      },
      {
        id: "rendering-hebel",
        heading: "Rendering and finishing Hebel",
        paragraphs: [
          "A Hebel external wall is not finished until its coating system is on. The panel manufacturer documents compatible coating systems, and the control joints formed in the panels have to be carried through the finish rather than rendered over. Leaving the coating unassigned between trades is one of the easiest ways for a Hebel job to go wrong.",
          "Because we install Hebel and apply [render](/render/), the panel installation and the finish can be quoted and programmed together, with one party responsible for the junction between them. Our guide to [rendering Hebel panels](/resources/rendering-hebel-panels-adelaide/) explains what to confirm about the system, the joints and the trade scopes before work begins.",
        ],
        formats: [
          {
            type: "steps",
            heading: "Coating a Hebel wall, in order",
            id: "hebel-coating-steps",
            intro:
              "The coating is planned with the panels, not after them. This is the sequence when we carry both the installation and the finish.",
            steps: [
              {
                title: "Confirm the Hebel product and application",
                body: "The drawings name the system. A coating detail written for one panel or application is not carried over to another because the material looks similar.",
              },
              {
                title: "Select the coating system",
                body: "The specification identifies the complete finish, layer by layer, from a coating system compatible with the panel manufacturer’s requirements.",
              },
              {
                title: "Assign the scope",
                body: "The quote states who installs the panels, who treats the joints and who applies the coating, so the finish is not left unassigned between trades.",
              },
              {
                title: "Install the panels and form the joints",
                body: "Panels are fixed with the specified fixings, and control joints, penetrations and junctions are formed as detailed.",
              },
              {
                title: "Check the wall before coating",
                body: "The panel surface, the joints and the flashings are checked against the documents before any coating goes on. Anything that does not match is raised first.",
              },
              {
                title: "Apply the coating system",
                body: "The specified system is applied in its documented layers, and control joints are carried through the finish rather than rendered over.",
              },
              {
                title: "Keep the records",
                body: "The panel system, the coating products and the colour are recorded at handover, so later cleaning and recoating can follow the right instructions.",
              },
            ],
          },
          {
            type: "compatibility",
            heading: "Coating and compatibility notes",
            id: "hebel-coating-notes",
            caption:
              "Hebel coatings: conditions, usual approach and what to confirm",
            rows: [
              {
                condition: "New Hebel external wall",
                approach:
                  "Finished with a coating system the panel manufacturer documents as compatible. The wall is not finished until that system is on.",
                confirm: "The coating specification, and who applies it.",
              },
              {
                condition: "Control joints in the panels",
                approach:
                  "Carried through the finish. A coating does not hide or replace a required movement detail.",
                confirm:
                  "Where each joint falls on the elevations, and how it is finished.",
              },
              {
                condition: "A boundary-side face with limited access",
                approach:
                  "The coating scope is coordinated before installation and access decisions are finalised, because access can disappear as neighbouring work progresses.",
                confirm:
                  "Which surfaces the system documents require to be coated, and how they will be reached.",
              },
              {
                condition: "A coastal or exposed site",
                approach:
                  "The wall relies on its coating for weather protection, so the coating specification and its upkeep matter as much as the panels.",
                confirm:
                  "The exposure category, and the maintenance conditions attached to the coating.",
              },
              {
                condition: "An existing Hebel wall with cracks or coating loss",
                approach:
                  "A different starting point from new work. Cracking, open joints or coating loss may involve more than the visible finish.",
                confirm:
                  "The pattern, the history and the cause, before a recoat or repair is proposed. See the [render cracking guide](/resources/render-cracking-adelaide/).",
              },
            ],
          },
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
        formats: [
          {
            type: "checklist",
            heading: "Pre-quote checklist for Hebel",
            id: "hebel-quote-checklist",
            intro:
              "The documents are listed above. These are the decisions that sit beside them, and gaps are fine as long as we know about them.",
            items: [
              {
                label: "Wall type",
                detail:
                  "External wall, boundary wall or wall between attached dwellings, as named on the drawings.",
              },
              {
                label: "Document status",
                detail:
                  "Whether the drawings are approved, issued for construction or still being coordinated, and which revision the quote should use.",
              },
              {
                label: "Supply",
                detail:
                  "Who supplies the panels, top hats, fixings and accessories.",
              },
              {
                label: "Coating",
                detail:
                  "The coating specification, and whether we apply it or another trade does.",
              },
              {
                label: "Access",
                detail:
                  "Site access for handling panels, and boundary-side access where a wall sits close to a neighbour.",
              },
              {
                label: "Sequence",
                detail:
                  "Where the walls fall in the programme, including the framing and roofing dates.",
              },
              {
                label: "Other walls and finishes",
                detail:
                  "Walling, cladding or render that should be quoted with the Hebel.",
              },
            ],
          },
        ],
      },
      {
        id: "hebel-terms",
        heading: "Hebel terms explained",
        navLabel: "Hebel terms",
        paragraphs: [
          "Hebel drawings and quotes use terms that are easy to mix up. These are the ones this page relies on.",
        ],
        formats: [
          {
            type: "glossary",
            terms: [
              {
                term: "AAC",
                definition:
                  "Autoclaved aerated concrete, the lightweight material Hebel panels are made from.",
              },
              {
                term: "Hebel",
                definition:
                  "A registered trade mark for AAC products supplied in Australia by CSR Building Products. It is a family of products rather than one interchangeable panel.",
              },
              {
                term: "System",
                definition:
                  "The panels, fixings, framing, joints and coating documented together in the manufacturer’s design and installation guide. Performance figures apply to the whole system.",
              },
              {
                term: "Top hat",
                definition:
                  "The steel section fixed to the frame that the panels are fixed to in an external wall system.",
              },
              {
                term: "Control joint",
                definition:
                  "A planned joint that lets the wall move. It is formed in the panels and carried through the coating.",
              },
              {
                term: "Coating system",
                definition:
                  "The layers applied over the panels to finish and weatherproof the wall, selected to be compatible with the panel manufacturer’s requirements.",
              },
              {
                term: "Zero-boundary wall",
                definition:
                  "A documented Hebel configuration for particular detached-building arrangements at an allotment boundary. It is not the same as a wall shared by two homes.",
              },
              {
                term: "Separating wall",
                definition:
                  "A wall common to two attached dwellings, also called an intertenancy or party wall.",
              },
            ],
          },
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
      {
        question: "How does Hebel compare with brick veneer?",
        answer:
          "Both are veneers over a frame. Hebel panels are lighter and usually make a thinner wall, and they are designed to be coated. Brick veneer relies on a drained cavity and can be left as face brick. Thermal, fire and acoustic performance depend on the whole documented wall build-up rather than the outer skin.",
      },
      {
        question: "Is a boundary wall the same as a wall between two units?",
        answer:
          "No. An external wall on or near an allotment boundary is still the wall of one building, while a wall between attached dwellings is common to both. They are separately documented systems, so the drawings need to name which one applies.",
      },
      {
        question: "When should the coating for a Hebel wall be decided?",
        answer:
          "Before installation and access decisions are finalised. A Hebel external wall is not finished until its coating system is on, so the specification and the trade responsible for it should be settled when the panels are quoted.",
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
        formats: [
          {
            type: "comparison",
            heading: "Walling beside our other three services",
            id: "walling-and-other-services",
            intro:
              "Walling is the package the other three services attach to. The table shows where each one starts and stops against it.",
            table: {
              caption: "Walling compared with Hebel, cladding and render",
              rowHeading: "Service",
              columns: ["What it covers", "How it meets walling"],
              rows: [
                {
                  label: "Walling",
                  cells: [
                    "Internal and external wall framing and wall systems across a project, with their openings and junctions.",
                    "The base package. It is handed over ready for linings, or for the cladding or render that follows.",
                  ],
                },
                {
                  label: "Hebel",
                  href: "/hebel/",
                  cells: [
                    "One wall system: AAC panels installed to the manufacturer’s guide for a specific application.",
                    "It can be one of the wall systems inside a walling package, or it can be quoted alone.",
                  ],
                },
                {
                  label: "Cladding",
                  href: "/cladding/",
                  cells: [
                    "Boards or panels fixed to a wall on battens, with a membrane and flashings behind them.",
                    "A framed wall that will be clad needs its battens, membrane and openings set up for that cladding system.",
                  ],
                },
                {
                  label: "Render",
                  href: "/render/",
                  cells: [
                    "A finish bonded to the wall, with the preparation underneath it.",
                    "A wall that will be rendered needs a substrate the render system is documented for.",
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        id: "steel-or-timber-framing",
        heading: "Steel or timber wall framing?",
        navLabel: "Steel or timber framing",
        paragraphs: [
          "Both are common, standards-based ways to frame a wall, and neither is the right answer for every project. The framing material is chosen by the project’s designer or engineer and shown on the approved drawings. We install the wall framing those drawings specify.",
          "These are the considerations that usually decide it. Our [steel or timber wall framing guide](/resources/steel-frame-vs-timber-frame-walls-adelaide/) covers each one in detail.",
        ],
        formats: [
          {
            type: "compatibility",
            caption: "Steel and timber wall framing: what to weigh up",
            columns: [
              "Consideration",
              "How steel and timber differ",
              "Confirm first",
            ],
            rows: [
              {
                condition: "Termites",
                approach:
                  "Steel is not subject to termite attack. Timber framing may need a termite-management system, depending on the timber specified and the local risk.",
                confirm:
                  "Whether termites are a known risk for the site, and which parts of the structure are susceptible.",
              },
              {
                condition: "Coastal exposure",
                approach:
                  "Steel framing needs a coating or other protection suited to the exposure. Timber members do not corrode, but their metal straps, fasteners, brackets and connectors still need compatible protection.",
                confirm:
                  "The exposure classification for the actual site, rather than the suburb name or a distance band.",
              },
              {
                condition: "Reactive clay",
                approach:
                  "Neither material resolves footing movement. That is managed through site classification, drainage and footing design, not by the frame fixed above.",
                confirm:
                  "The site classification, and the footing design the frame is coordinated with.",
              },
              {
                condition: "Bushfire-prone areas",
                approach:
                  "The requirement comes from the site and its bushfire conditions, not from whether the frame is steel or timber. The frame and the complete wall assembly are then selected to meet it.",
                confirm:
                  "The site’s designation and assessment pathway, with the designer, a bushfire consultant or the building certifier.",
              },
              {
                condition: "Thermal, acoustic and fire performance",
                approach:
                  "These depend on the whole wall assembly: the framing, insulation, lining and external finish together.",
                confirm:
                  "The documented build-up, rather than the framing material alone.",
              },
              {
                condition: "Design and engineering",
                approach:
                  "Each material is designed under its own recognised standards or engineering, covering loads, bracing, tie-downs and connections.",
                confirm:
                  "Which pathway the designer or engineer has used, and that the drawings cover the complete frame.",
              },
            ],
          },
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
        ],
        formats: [
          {
            type: "callout",
            tone: "caution",
            note: {
              title: "Whether a wall is load-bearing is an engineer’s call",
              body: "Appearance and rules of thumb can suggest a wall is carrying load, but only a structural engineer working from the drawings and, where needed, a site inspection can confirm it. Nothing should be cut, propped or removed until the engineered design and any required consent are in place.",
            },
          },
        ],
        closing: [
          "Our guides to [load-bearing wall removal](/resources/load-bearing-wall-removal-adelaide/) and [second-storey additions](/resources/second-storey-addition-adelaide/) explain what to confirm first.",
        ],
      },
      {
        id: "walling-workflow",
        heading: "How a walling package is planned and installed",
        navLabel: "How a walling job runs",
        paragraphs: [
          "Walling sits early in the build, so most of its value comes from what is agreed before the first wall goes up. This is the usual order on a new build, an extension or a renovation.",
        ],
        formats: [
          {
            type: "steps",
            steps: [
              {
                title: "Review the drawings and the scope",
                body: "We work from the floor plans and elevations, the wall systems or framing specified and any engineering details, and confirm which walls are in our scope.",
              },
              {
                title: "Confirm what each wall has to do",
                body: "Any fire, acoustic, thermal or structural requirement for a particular wall comes from the design. We confirm them before pricing, because they decide the system that wall is built as.",
              },
              {
                title: "Agree the handover condition",
                body: "The quote states whether it is walling only or a package with the finish, who supplies the materials, and the condition each wall is handed over in for the next trade.",
              },
              {
                title: "Set out",
                body: "Walls and openings are set out from the drawings and checked against the window, door and joinery schedules. In a renovation, set-out starts from what is actually there.",
              },
              {
                title: "Install the walls",
                body: "Framing and wall systems go in to the specified system and details, with attention to straightness, plumb and accurate openings.",
              },
              {
                title: "Coordinate services and penetrations",
                body: "We agree with the builder where services run and who forms the penetrations, and keep to the sequence between framing, services rough-in, linings and finishes.",
              },
              {
                title: "Check and hand over",
                body: "Openings, junctions and alignment are checked against the tolerances the following trade needs, and the wall is handed over in the agreed condition.",
              },
            ],
          },
        ],
        closing: [
          "Design, engineering and certification stay with the project’s designer, engineer and building certifier. We install what those documents specify and raise anything on site that does not match them.",
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
        formats: [
          {
            type: "checklist",
            heading: "Pre-quote checklist for walling",
            id: "walling-quote-checklist",
            intro:
              "Beside those documents, these are the decisions that shape the scope. Tell us which are settled and which are still open.",
            items: [
              {
                label: "Walling only, or a package",
                detail:
                  "Whether render, cladding or Hebel should be quoted with the walls.",
              },
              {
                label: "Frame material",
                detail:
                  "Steel or timber, as specified by the designer or engineer.",
              },
              {
                label: "Openings",
                detail:
                  "The window, door and joinery schedules, so opening sizes and positions can be checked.",
              },
              {
                label: "Services",
                detail:
                  "Where plumbing, electrical and mechanical services run, and who forms the penetrations.",
              },
              {
                label: "Structural changes",
                detail:
                  "For a renovation, whether any wall being removed or opened up has been assessed by a structural engineer.",
              },
              {
                label: "Occupied building",
                detail:
                  "Whether people are living or working in the building during the work, and what access and protection are needed.",
              },
              {
                label: "Supply",
                detail: "Who supplies the framing and other materials.",
              },
              {
                label: "Programme",
                detail:
                  "Target dates, and the trades working before and after the walling.",
              },
            ],
          },
        ],
        closing: [
          "Quotes are obligation-free. Our guide to [what affects a quote](/resources/what-affects-cladding-render-quotes-adelaide/) explains the drivers, and the [project planning page](/project-planning/) lists what to gather before you enquire.",
        ],
      },
      {
        id: "walling-terms",
        heading: "Walling terms explained",
        navLabel: "Walling terms",
        paragraphs: [
          "A walling scope is easier to compare when everyone means the same thing. These are the terms this page uses.",
        ],
        formats: [
          {
            type: "glossary",
            terms: [
              {
                term: "Set-out",
                definition:
                  "Marking where walls and openings go before anything is built, from the drawings or, in a renovation, from the existing building.",
              },
              {
                term: "Plumb",
                definition:
                  "Truly vertical. Internal walls are judged on it because every door, cabinet and tile line that follows will show an error.",
              },
              {
                term: "Rough-in",
                definition:
                  "The stage when plumbing, electrical and mechanical services are run through the wall framing, before the linings go on.",
              },
              {
                term: "Penetration",
                definition:
                  "An opening formed in a wall for a pipe, cable or duct.",
              },
              {
                term: "Lining",
                definition:
                  "The sheet or board fixed over the framing to form the finished face of an internal wall.",
              },
              {
                term: "Load-bearing wall",
                definition:
                  "A wall that carries roof, ceiling or upper-storey load down to its footing. Whether a wall is load-bearing is for a structural engineer to confirm.",
              },
              {
                term: "Handover condition",
                definition:
                  "The agreed state a wall is left in for the next trade, written into a walling-only quote.",
              },
            ],
          },
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
      {
        question: "Should wall frames be steel or timber?",
        answer:
          "That is a design and engineering decision, shown on the approved drawings. Termite exposure, coastal corrosion, bushfire-related requirements and what the structural design assumes are the usual considerations. We install the wall framing the drawings specify.",
      },
      {
        question: "What does a walling-only quote include?",
        answer:
          "The walls in the agreed scope, the system or framing they are built from, who supplies the materials, and the condition each wall is handed over in for the next trade. Finishes such as render or cladding are quoted with the walls only where you ask for a package.",
      },
      {
        question: "How does walling fit in with the other trades on site?",
        answer:
          "Walling comes before services rough-in, linings and finishes, so we agree the sequence with the builder. Opening sizes are checked against the window, door and joinery schedules, and we confirm where services run and who forms the penetrations.",
      },
    ],
  },
];

/**
 * Service names for form dropdowns.
 *
 * Written out rather than mapped from `services`: the enquiry form is a
 * client component, and a value derived from `services` would pull every
 * service page's copy into the browser bundle with it. A test keeps this list
 * in step with the services above.
 */
export const serviceNames: string[] = ["Cladding", "Render", "Hebel", "Walling"];

export const servicesIntro =
  "Specialist installation for new homes, renovations, multi-unit developments and commercial builds across Adelaide.";
