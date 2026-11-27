import type { ChecklistItem, GlossaryTerm } from "../blocks.ts";
import type { CompatibilityTable } from "../guide-blocks.ts";

/**
 * Blocks for the Hebel boundary-wall guide. Each row restates what the
 * guide's own sections say about terminology, approvals, system documents
 * and access. Nothing here states a fire rating, a setback, a certificate
 * number or a performance figure, and nothing treats a variation as compliant.
 *
 * This guide's FAQ list stays in its page and carries no FAQPage schema, so
 * this module exports no `faqs`.
 */

export const situations: CompatibilityTable = {
  caption: "Boundary-wall situations and what each needs confirmed",
  columns: ["What the project shows", "How it is usually handled", "Confirm first"],
  rows: [
    {
      condition: "A plan note that only says “Hebel boundary wall”",
      approach:
        "Treat the wall as unresolved. A note like that is not enough to select, price or install a wall system.",
      confirm:
        "The exact product, system name and configuration on the approved drawings.",
    },
    {
      condition: "An external wall on or near the allotment boundary",
      approach:
        "It stays an external wall of one building. Its position can affect fire separation, openings, weatherproofing and access.",
      confirm:
        "The address-specific approval pathway and the building consent, before construction.",
    },
    {
      condition: "A zero-boundary or dual zero-boundary system on the drawings",
      approach:
        "Work to the CSR Hebel system document for that configuration. A document for one system does not cover a different one.",
      confirm:
        "That the product, framing, fixing direction and evidence all match the project documents.",
    },
    {
      condition: "A wall common to two attached dwellings",
      approach:
        "That is an intertenancy, party or separating wall, a different relationship from two detached walls near a boundary.",
      confirm:
        "The relationship shown on the approved plans and the exact system name.",
    },
    {
      condition: "An uncertain legal boundary",
      approach: "The owner or builder engages a licensed surveyor.",
      confirm:
        "The surveyed boundary. A visible fence, an informal site measurement or a title sketch is no substitute.",
    },
    {
      condition: "Limited or no access to the boundary side",
      approach:
        "Some CSR system documents provide installation methods for this. That does not make every Hebel product suitable for every boundary condition.",
      confirm:
        "The current version of the applicable document, the system identifier on the drawings and every limitation in the evidence.",
    },
    {
      condition: "Work that needs access to adjoining land",
      approach:
        "Separate advice and lawful arrangements. Choosing a panel does not resolve it.",
      confirm:
        "Who arranges that access, and that it is settled before the programme is fixed.",
    },
    {
      condition: "A detail that departs from the published system",
      approach:
        "It goes back to the responsible designer, engineer, manufacturer and appropriately accredited building professional.",
      confirm:
        "Their answer in the project documents. The installer does not redesign the system on site.",
    },
  ],
};

export const glossary: readonly GlossaryTerm[] = [
  {
    term: "AAC",
    definition:
      "Autoclaved aerated concrete. Hebel® AAC is a product family, not one interchangeable wall.",
  },
  {
    term: "Zero-boundary system",
    definition:
      "A documented CSR Hebel configuration for particular detached-building arrangements. The dual zero-boundary system is documented separately.",
  },
  {
    term: "Separating wall",
    definition:
      "The NCC’s term for a wall common to adjoining Class 1 buildings. CSR uses intertenancy or party-wall terminology.",
  },
  {
    term: "Building consent",
    definition:
      "The assessment of proposed work against the building rules. It is one of the consents a development approval can require.",
  },
  {
    term: "Evidence of suitability",
    definition:
      "The technical evidence that supports a product or system for a defined configuration. A certificate may address only identified criteria, so read every stated limitation.",
  },
  {
    term: "Responsibility matrix",
    definition:
      "A written record of who supplies, installs, seals, coats and inspects each part of the wall.",
  },
];

/** Seven items: the page heading states the count. */
export const installerBrief: readonly ChecklistItem[] = [
  {
    label: "The wall term the drawings use",
    detail:
      "An external wall near a boundary, a zero-boundary or dual zero-boundary system, an intertenancy or party wall, or a fence or retaining wall.",
  },
  {
    label: "The exact system on the wall schedule",
    detail:
      "Manufacturer, product and documented configuration, not a generic label.",
  },
  {
    label: "Where the approval stands",
    detail:
      "Which consents apply, and whether the documents are approved, issued for construction or still being coordinated.",
  },
  {
    label: "Whether the boundary has been surveyed",
    detail:
      "A licensed surveyor confirms an uncertain boundary. A fence line does not.",
  },
  {
    label: "Which side stays accessible, and until when",
    detail:
      "Adjacent frames, roofs, fences, scaffolds and landscaping can remove boundary-side access as the build progresses.",
  },
  {
    label: "Who seals, coats and inspects",
    detail:
      "A responsibility matrix for supply, installation, sealing, coating and inspection. Our [guide to rendering Hebel panels](/resources/rendering-hebel-panels-adelaide/) covers the coating scope.",
  },
  {
    label: "The drawing revision and document version",
    detail: "So the quote can be rechecked when the design changes.",
  },
];
