export const projectPlanningPage = {
  bannerTitle: "Plan Your Cladding, Render, Hebel or Walling Project",
  metaTitle: "Project Planning Guide Adelaide",
  metaDescription:
    "Prepare a clearer cladding, render, Hebel or walling quote with the plans, photos, site details and programme information our Adelaide team needs.",
  lead: "You don’t need every detail. These help us scope accurately:",
  enquiryDetails: [
    "Suburb and property type",
    "Service needed",
    "Plans, elevations or specifications",
    "Current site photos",
    "Preferred material, finish or colour",
    "Target dates and site access",
  ],
  reviewPoints: [
    {
      title: "System and substrate",
      body: "What is installed, and whether the surface is ready.",
    },
    {
      title: "Scope boundaries",
      body: "Who supplies, prepares and finishes what.",
    },
    {
      title: "Junctions and interfaces",
      body: "Windows, corners, penetrations and flashings.",
    },
    {
      title: "Programme and access",
      body: "Start window, site access and surrounding trades.",
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

/** The five enquiries that come up often enough to have their own guide. */
export const planningGuides = [
  {
    href: "/resources/render-cracking-adelaide/",
    label: "Adelaide render-cracking guide",
    when: "An existing rendered wall is cracked.",
  },
  {
    href: "/resources/cladding-maintenance-coastal-adelaide/",
    label: "Coastal cladding maintenance guide",
    when: "New cladding or a facade replacement near the coast.",
  },
  {
    href: "/resources/rendering-hebel-panels-adelaide/",
    label: "Guide to rendering Hebel panels",
    when: "A Hebel wall will receive a rendered or coated finish.",
  },
  {
    href: "/resources/hebel-boundary-walls-adelaide/",
    label: "Adelaide Hebel boundary-wall planning guide",
    when: "A wall sits on or near an allotment boundary.",
  },
  {
    href: "/resources/rendering-over-painted-brick-adelaide/",
    label: "Guide to rendering over painted brick",
    when: "An existing painted-brick exterior is being rendered.",
  },
] as const;
