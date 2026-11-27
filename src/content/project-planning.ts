import type {
  ChecklistItem,
  ComparisonTableData,
  Step,
} from "./blocks.ts";

export const projectPlanningPage = {
  bannerTitle: "Plan Your Cladding, Render, Hebel or Walling Project",
  metaTitle: "Project Planning Guide Adelaide",
  metaDescription:
    "Prepare a clearer cladding, render, Hebel or walling quote with the plans, photos, site details and programme information our Adelaide team needs.",
  lead:
    "A useful quote starts with a clear picture of the building, the selected wall system and the conditions around the work. You do not need to have every detail resolved before contacting us, but the information below helps us identify open questions early and prepare a more accurate scope.",
  enquiryDetails: [
    "The project suburb, property type and whether the work is residential or commercial",
    "The service you need: cladding, render, Hebel, walling or a coordinated package",
    "Plans, elevations, specifications or marked-up drawings when they are available",
    "Current photos of the building, substrate and nearby openings or junctions",
    "The preferred material, system, finish or colour if one has already been selected",
    "Your target dates, site access constraints and any known programme dependencies",
  ],
  reviewPoints: [
    {
      title: "System and substrate",
      body: "We confirm what is being installed, what it is fixed or applied to, and whether the existing surface is ready for the proposed work.",
    },
    {
      title: "Scope boundaries",
      body: "We clarify who supplies materials, prepares the substrate, provides access equipment and completes adjoining finishes so responsibilities are visible in the quote.",
    },
    {
      title: "Junctions and interfaces",
      body: "Windows, corners, penetrations, flashings and connections to other materials are reviewed because these details often shape both labour and sequencing.",
    },
    {
      title: "Programme and access",
      body: "We consider the proposed start window, site access, surrounding trades and any staging needed to keep the work practical and safe.",
    },
  ],
  quoteIncludes: [
    "The work included in the agreed scope",
    "Material and system responsibilities",
    "Key preparation and access assumptions",
    "Known exclusions or items that still need confirmation",
    "Timing assumptions discussed during review",
  ],
  faqs: [
    {
      question: "Can I request a quote before the plans are final?",
      answer:
        "Yes. Send the information you have and explain what is still being decided. We can identify the details needed before the scope and price can be confirmed.",
    },
    {
      question: "Are photos enough for a quote?",
      answer:
        "Photos are a helpful starting point, especially for existing buildings, but plans, measurements or a site review may still be needed depending on the system and complexity of the work.",
    },
    {
      question: "What helps make a trade quote more accurate?",
      answer:
        "Clear drawings, current site photos, the selected system or finish, known access constraints and realistic programme dates help reduce assumptions and expose scope gaps before work begins.",
    },
    {
      question: "What should I have ready before asking for a quote?",
      answer:
        "The suburb and property type, the service you need, any plans or drawings, current photos of the walls, the system or finish if one has been selected, and your target dates and access constraints. The checklists on this page set out each one.",
    },
    {
      question: "Do I need to choose a system or finish before I enquire?",
      answer:
        "No. You do not need every detail resolved before contacting us. Tell us the result you want and which decisions are still open, and we can identify what has to be confirmed before a price is firm.",
    },
    {
      question: "What do you check before preparing a quote?",
      answer:
        "Four things: the system and the substrate it is fixed or applied to, the scope boundaries between trades, the junctions with windows, corners and other materials, and the programme and site access.",
    },
    {
      question: "What does a written quote set out?",
      answer:
        "The work included in the agreed scope, the material and system responsibilities, the key preparation and access assumptions, any known exclusions or items still to be confirmed, and the timing assumptions discussed during the review.",
    },
    {
      question: "Can one enquiry cover more than one service?",
      answer:
        "Yes. Cladding, render, Hebel and walling can be quoted separately or as a coordinated package, so tell us about every part of the work you have in mind.",
    },
    {
      question: "How do I share plans or photos?",
      answer:
        "Tell us what plans or photos are available when you enquire. If supporting files are needed, we will arrange how to review them.",
    },
  ],
} as const;

/**
 * The six enquiry details above as short labels, in the same order.
 *
 * Home, contact and the projects hub show this and link here. This page stays
 * the one place the full checklist is written out, so the other pages cannot
 * drift into describing a different process.
 */
export const enquiryChecklist: readonly ChecklistItem[] = [
  {
    label: "Suburb and property type",
    detail: "Say whether the work is residential or commercial.",
  },
  {
    label: "The service you need",
    detail: "Cladding, render, Hebel, walling or a coordinated package.",
  },
  {
    label: "Plans or drawings",
    detail:
      "Plans, elevations, specifications or marked-up drawings, when they are available.",
  },
  {
    label: "Current photos",
    detail: "The building, the substrate and nearby openings or junctions.",
  },
  {
    label: "System, finish or colour",
    detail: "Only if one has already been selected.",
  },
  {
    label: "Dates and access",
    detail:
      "Target dates, site access constraints and any known programme dependencies.",
  },
];

/**
 * The full site-readiness checklist, grouped the way a quote is reviewed.
 * Every item is something for the reader to gather or note, not a promise.
 */
export const siteReadiness: readonly {
  id: string;
  title: string;
  items: readonly ChecklistItem[];
}[] = [
  {
    id: "readiness-photos",
    title: "Photos",
    items: [
      "Each wall or elevation in the work, taken from far enough back to show the whole face",
      "The existing surface up close, so the substrate and any earlier coating can be seen",
      "Openings, corners and junctions with other materials",
      "Any cracks, damp, damage or earlier repairs you have noticed",
    ],
  },
  {
    id: "readiness-plans",
    title: "Plans and documents",
    items: [
      "Plans and elevations showing wall locations, heights and openings",
      "Specifications or marked-up drawings that name the system or finish",
      "Engineering details where a wall is structural or a Hebel system is specified",
      "The approximate size of each wall and what it is built from, if there are no drawings",
      "The development approval status and any conditions that affect the walls",
    ],
  },
  {
    id: "readiness-access",
    title: "Access notes",
    items: [
      "The wall heights and the levels the work is on",
      "How each wall can be reached, including narrow side access, boundaries and sloping ground",
      "Whether scaffold or other access equipment is already on site, and who is providing it",
      "Whether the building will be occupied while the work is done",
    ],
  },
  {
    id: "readiness-system",
    title: "System and finish",
    items: [
      "The service or services needed: cladding, render, Hebel, walling or a combination",
      "The product, system, finish or colour, if one has been selected",
      "What each wall is built from, and whether it has been painted, rendered or clad before",
      "Who is supplying the materials",
    ],
  },
  {
    id: "readiness-programme",
    title: "Programme",
    items: [
      "Your target start window or dates",
      "The trades working before, alongside and after the walls",
      "Anything that has to be finished first, such as windows, flashings or services",
      "Whether the work will be done in stages",
    ],
  },
];

/**
 * How to prepare a quote request, as steps the reader carries out.
 *
 * The page renders these with `NumberedSteps` and passes the same array to
 * `HowToSchema`, so the structured data repeats the visible steps exactly.
 * Step bodies stay plain text for that reason.
 */
export const quotePreparation: {
  name: string;
  description: string;
  steps: readonly Step[];
} = {
  name: "How to prepare a cladding, render, Hebel or walling quote request",
  description:
    "Seven steps that give a quote request the site, document and programme details it needs.",
  steps: [
    {
      title: "Note the site basics",
      body: "Write down the project suburb, the property type and whether the work is residential or commercial.",
    },
    {
      title: "Name the service",
      body: "Decide whether you need cladding, render, Hebel, walling or a coordinated package. If you are unsure, describe the result you want instead.",
    },
    {
      title: "Gather the documents",
      body: "Collect plans, elevations, specifications or marked-up drawings. If there are none, note the approximate size of each wall and what it is built from.",
    },
    {
      title: "Photograph the walls",
      body: "Take current photos of the building, the substrate and nearby openings or junctions.",
    },
    {
      title: "Record what has been selected",
      body: "List the material, system, finish or colour if one has been chosen, and say which decisions are still open.",
    },
    {
      title: "Add dates and access",
      body: "Note your target dates, any site access constraints and the programme dependencies you know about.",
    },
    {
      title: "Make the enquiry",
      body: "Call, email or use the enquiry form and tell us what plans or photos are available. If supporting files are needed, we will arrange how to review them.",
    },
  ],
};

/**
 * What is worth having ready for each project type. The row labels are the
 * enquiry form's own project-type choices (`src/content/enquiry.ts`).
 */
export const preparationByProjectType: ComparisonTableData = {
  caption: "Documents, photos and details to have ready for each project type",
  rowHeading: "Project type",
  columns: ["Documents", "Photos", "Also tell us"],
  rows: [
    {
      label: "New build",
      cells: [
        "Plans and elevations, the specified wall systems, and engineering details where a wall is structural or Hebel is specified.",
        "The frame or slab edge, once it is built.",
        "The builder’s programme, who supplies the materials, and what access or scaffold is provided.",
      ],
    },
    {
      label: "Renovation or extension",
      cells: [
        "Drawings for the new work. If there are none, the approximate wall sizes and what the walls are built from.",
        "The existing walls the new work meets, with their openings and junctions.",
        "Whether the home will be occupied, and how the new work is meant to meet the old.",
      ],
    },
    {
      label: "Existing property repair or upgrade",
      cells: [
        "The approximate wall sizes, and any product or coating details you already hold.",
        "Each wall, any cracked or damaged areas up close, and the base of the wall.",
        "The coating history if you know it, any signs of damp, and whether older sheeting could contain asbestos.",
      ],
    },
    {
      label: "Multi-unit development",
      cells: [
        "The drawing set, the wall types, and any fire or acoustic requirements for boundary and separating walls.",
        "The site, once construction has started.",
        "The staging, the programme dates, and which buildings or elevations are in the package.",
      ],
    },
    {
      label: "Commercial project",
      cells: [
        "The drawings, the specification, and the facade or wall system they name.",
        "The existing building, where the work is a refurbishment.",
        "The site access arrangements, the programme dates, and the scope boundaries between trades.",
      ],
    },
  ],
};

/**
 * The five enquiries that come up often enough to have their own guide.
 *
 * These were five near-identical paragraphs on the planning page. Nobody reads
 * five paragraphs that all open with "For a…, use our…", so the trigger
 * condition and what the guide resolves are now separate fields and the page
 * renders them as a scannable list.
 */
export const planningGuides = [
  {
    href: "/resources/render-cracking-adelaide/",
    label: "Adelaide render-cracking guide",
    when: "An existing rendered wall is cracked.",
    covers:
      "What to record, and when another professional may need to assess the building before a repair is scoped.",
  },
  {
    href: "/resources/cladding-maintenance-coastal-adelaide/",
    label: "Coastal cladding maintenance guide",
    when: "New cladding or a facade replacement near the coast.",
    covers:
      "Identifying the proposed product, site exposure, unwashed areas and future access questions worth resolving before installation.",
  },
  {
    href: "/resources/rendering-hebel-panels-adelaide/",
    label: "Guide to rendering Hebel panels",
    when: "A Hebel wall will receive a rendered or coated finish.",
    covers:
      "The system documents, movement details, coating specification and trade responsibilities that should be clear before work begins.",
  },
  {
    href: "/resources/hebel-boundary-walls-adelaide/",
    label: "Adelaide Hebel boundary-wall planning guide",
    when: "A wall sits on or near an allotment boundary.",
    covers:
      "Distinguishing the wall configuration, identifying the approved system documents, and coordinating access, sequencing, interfaces and professional responsibilities before an installation quote.",
  },
  {
    href: "/resources/rendering-over-painted-brick-adelaide/",
    label: "Guide to rendering over painted brick",
    when: "An existing painted-brick exterior is being rendered.",
    covers:
      "Recording the coating history, visible wall condition, safety questions and preparation assumptions that need resolving before a finish is specified.",
  },
] as const;
