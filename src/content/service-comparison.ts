import type { ComparisonTableData, DecisionRow } from "./blocks.ts";

/**
 * The four services side by side, for the homepage and the services hub.
 *
 * Every cell restates what the service pages already say (see
 * `src/content/services.ts`); nothing here is a price, a rate or a claim the
 * service page does not make. The homepage shows the short table and the hub
 * shows the detailed one, so the two pages do not repeat each other.
 */
export const serviceComparison: ComparisonTableData = {
  caption: "Cladding, render, Hebel and walling at a glance",
  rowHeading: "Service",
  columns: ["What it covers", "Typical use"],
  rows: [
    {
      label: "Cladding",
      href: "/cladding/",
      cells: [
        "Architectural cladding and facade systems, from a single feature wall to a complete building facade.",
        "A new exterior finish on new homes, renovations and commercial projects, or a feature element set against render or brick.",
      ],
    },
    {
      label: "Render",
      href: "/render/",
      cells: [
        "Smooth, textured and custom render finishes on internal and external walls, including the surface preparation underneath.",
        "Finishing new masonry or panel walls, refreshing a tired exterior, and repairing or re-rendering existing walls.",
      ],
    },
    {
      label: "Hebel",
      href: "/hebel/",
      cells: [
        "Hebel autoclaved aerated concrete wall systems: panel placement, fixing and junction detailing to the specified system.",
        "External walls, boundary walls and walls between attached dwellings, where the drawings specify Hebel.",
      ],
    },
    {
      label: "Walling",
      href: "/walling/",
      cells: [
        "Internal and external wall framing and wall systems, with their openings and junctions.",
        "The wall package on a new build, extension or renovation, handed over ready for the finish that follows.",
      ],
    },
  ],
};

export const serviceComparisonDetailed: ComparisonTableData = {
  caption: "The four services compared in detail",
  rowHeading: "Service",
  columns: [
    "What it covers",
    "Typical projects",
    "What we confirm first",
    "Often quoted with",
  ],
  rows: [
    {
      label: "Cladding",
      href: "/cladding/",
      cells: [
        "Cladding and facade installation: the boards or panels, the framing or battens they fix to, the flashings, and the junctions with windows and other finishes.",
        "Complete facades and feature walls on new homes, renovations and commercial projects, and recladding of existing buildings.",
        "The selected system, what the wall behind is built from, the site exposure, and how the cladding meets openings and corners.",
        "Render, for a contrasting finish, and walling where new framing carries the cladding.",
      ],
    },
    {
      label: "Render",
      href: "/render/",
      cells: [
        "Internal and external rendering: substrate preparation, the agreed render system, and smooth, textured or custom finishes.",
        "New construction and existing buildings, from local repairs to a full re-render of an elevation.",
        "What the wall is built from, whether it has been coated before, any cracks or damp, and the finish against a sample.",
        "Hebel, which needs a compatible coating system, and feature cladding.",
      ],
    },
    {
      label: "Hebel",
      href: "/hebel/",
      cells: [
        "Hebel installation: setting out panels, fixing them with the specified fixings, and forming control joints, penetrations and junctions as detailed.",
        "Homes, multi-residential developments and commercial construction, including boundary and separating walls.",
        "Which Hebel system the current drawings specify, the engineering details, and any fire or acoustic requirements.",
        "Render, so the panels and their coating are one party’s responsibility, and walling.",
      ],
    },
    {
      label: "Walling",
      href: "/walling/",
      cells: [
        "Internal and external walling: wall framing and wall systems, accurate openings, and the junctions the following trades rely on.",
        "New homes, extensions and renovations, multi-unit developments and commercial projects.",
        "The drawings, the wall systems or framing specified, the opening sizes, and any fire, acoustic or structural requirements.",
        "Cladding or render as the finish, and Hebel where it is one of the wall systems.",
      ],
    },
  ],
};

/**
 * "When to choose cladding, render, Hebel or walling."
 *
 * Each row is a situation the service pages already discuss, the service that
 * usually suits it, and what still has to be confirmed. The third column is
 * there because none of these is a recommendation made without seeing the
 * wall.
 */
export const serviceDecisions: readonly DecisionRow[] = [
  {
    situation: "You want a new look for an existing brick or masonry exterior",
    preference:
      "[Render](/render/), or [cladding](/cladding/) fixed over the brick on battens.",
    confirm:
      "The condition of the brickwork, any existing paint or coating, and any moisture history. Our [cladding or render comparison](/resources/cladding-vs-render-adelaide/) covers the choice.",
  },
  {
    situation: "The drawings specify Hebel panels",
    preference:
      "[Hebel installation](/hebel/), with render as the coating where both are in the quote.",
    confirm:
      "Which Hebel system the drawings call for, the engineering details, and who applies the coating system.",
  },
  {
    situation: "A builder wants one contractor for the internal and external walls",
    preference:
      "A [walling](/walling/) package, with Hebel, cladding or render included where the project calls for them.",
    confirm:
      "The drawings, the wall systems specified, and the condition each wall is handed over in for the next trade.",
  },
  {
    situation: "An existing rendered wall is cracked or tired",
    preference:
      "Render repair, or a full re-render where the bond has failed or the texture can no longer be matched.",
    confirm:
      "What is causing the cracking, and whether any salt damp has been dealt with at its source first. See the [render repair guide](/resources/render-repair-adelaide/).",
  },
  {
    situation:
      "You want a feature element such as an entry wall, gable or upper-level projection",
    preference: "Feature cladding, set against render or brick.",
    confirm:
      "How its edges meet the materials around it, and the direction the boards or panels run.",
  },
  {
    situation: "Old cladding needs replacing",
    preference: "Recladding with a new cladding system.",
    confirm:
      "What the old cladding is, and the condition of the wall behind it. Older fibre-cement sheeting can contain asbestos, which has to be identified and removed under licence first. See the [facade recladding guide](/resources/facade-recladding-adelaide/).",
  },
  {
    situation:
      "A wall sits on or near a boundary, or separates two attached homes",
    preference: "The Hebel system documented for that application.",
    confirm:
      "The wall type, the approved documents, and the fire and acoustic requirements set by the design. See the [Hebel boundary walls guide](/resources/hebel-boundary-walls-adelaide/).",
  },
  {
    situation: "A renovation adds rooms or changes the layout",
    preference: "Walling for the new internal or external walls.",
    confirm:
      "Whether any wall being removed or opened up is load-bearing. A structural engineer has to assess that before work starts.",
  },
];

/** The homepage shows the first four rows; the services hub shows them all. */
export const homeServiceDecisions = serviceDecisions.slice(0, 4);
