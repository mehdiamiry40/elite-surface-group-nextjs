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
  ],
} as const;

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
