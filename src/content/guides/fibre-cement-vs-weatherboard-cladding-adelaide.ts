import type { ComparisonTableData, GlossaryTerm } from "../blocks.ts";
import type { DecisionTable } from "../guide-blocks.ts";
import type { ServiceFaq } from "../services.ts";

/**
 * Blocks for the fibre cement vs timber weatherboard guide. Every row restates
 * what the guide's own sections and cited sources already say; none of it
 * determines a bushfire rating or selects a product.
 */

export const comparison: ComparisonTableData = {
  caption: "Fibre cement and timber weatherboard, side by side",
  rowHeading: "What is compared",
  columns: ["Fibre cement weatherboard", "Timber weatherboard"],
  rows: [
    {
      label: "What it is",
      cells: [
        "A manufactured cement-and-fibre board, cut and finished at the factory to a consistent thickness and width.",
        "A wider range: traditional solid timber boards, and engineered boards made from compressed hardwood fibre and wax.",
      ],
    },
    {
      label: "Movement with moisture",
      cells: [
        "Manufacturer literature describes it as resistant to shrinking, swelling and warping compared with solid timber.",
        "Solid timber can swell, shrink and check with seasonal moisture change. Engineered boards are marketed on dimensional stability.",
      ],
    },
    {
      label: "Reliance on the paint film",
      cells: [
        "Needs a maintained coating system, but does not rely on the paint film for weather protection the way timber does.",
        "Solid and engineered boards both rely on a sound paint or coating film for weather protection.",
      ],
    },
    {
      label: "In a bushfire-prone area",
      cells: [
        "Documented by manufacturers as meeting non-combustibility and fire-performance requirements across a wide range of BAL ratings, with specific board, jointing and fixing details.",
        "More limited at the highest ratings, where only a bushfire-resisting species or a manufacturer-tested and certified system may be acceptable.",
      ],
    },
    {
      label: "Near the coast",
      cells: [
        "Manufacturer guidance generally recommends closer inspection, more frequent washing and fixings made for coastal exposure within a defined distance of the coastline.",
        "The same guidance generally applies to engineered timber boards. The exact distance and conditions vary by product.",
      ],
    },
    {
      label: "Routine checks",
      cells: [
        "Regular washing, and prompt attention to chips or scratches at joints and corners.",
        "The same, with particular attention to joints, end grain and any exposed fixings on solid timber.",
      ],
    },
    {
      label: "Repainting",
      cells: [
        "On the cycle the coating manufacturer documents for the finish and exposure selected.",
        "On the documented cycle as well. Hot, dry summers and strong UV age a painted exterior faster, whichever board is under the paint.",
      ],
    },
  ],
};

export const decisions: DecisionTable = {
  caption: "Which board suits which situation",
  rows: [
    {
      situation: "The site is inside a designated bushfire-prone area",
      preference:
        "Hold the choice until the rating is known. Fibre cement is documented as compliant across a wider range of BAL ratings than most timber weatherboard.",
      confirm:
        "The assessed BAL rating, from the project designer or a bushfire consultant, before a product is chosen.",
    },
    {
      situation: "The assessed rating is at the higher end",
      preference:
        "Fibre cement with the board, jointing and fixing details tested for that rating, or a timber system that is manufacturer-tested and certified for it.",
      confirm:
        "The construction requirements for that rating, which tighten considerably toward BAL-FZ.",
    },
    {
      situation: "The property is close to the coast",
      preference:
        "Either can be specified. Fixings, flashings and trims need to suit the same exposure as the cladding.",
      confirm:
        "The manufacturer’s coastal conditions against the property’s actual distance from the coast, not the suburb name alone.",
    },
    {
      situation: "You want solid timber boards",
      preference:
        "Timber weatherboard is not ruled out. Confirm the coating system and maintenance schedule documented for the product before installation.",
      confirm:
        "That joints, end grain and exposed fixings are part of a routine check you are prepared to keep up.",
    },
    {
      situation: "You want as little board movement as possible",
      preference:
        "Fibre cement, or an engineered timber board marketed on dimensional stability.",
      confirm:
        "The specific product data. Neither timber option is maintenance-free.",
    },
    {
      situation: "You are replacing the cladding on an existing house",
      preference:
        "Check approval before choosing between them. Changing external cladding can require development approval, depending on the work and the property.",
      confirm:
        "The PlanSA portal or the local council, before material is ordered.",
    },
    {
      situation: "Thermal or acoustic performance is the priority",
      preference:
        "Neither board decides it alone. Performance depends on the whole wall assembly: frame, sarking, battens and cladding together.",
      confirm: "The documented build-up, not the cladding product alone.",
    },
  ],
};

export const glossary: readonly GlossaryTerm[] = [
  {
    term: "Bushfire Attack Level (BAL)",
    definition:
      "The site-specific bushfire rating a property inside a bushfire-prone overlay may need assessed. The cladding and the rest of the external wall are finalised against the construction requirements for that rating.",
  },
  {
    term: "Bushfire-prone area",
    definition:
      "A designated overlay. Around Adelaide it is most visible through the Hills Face Zone and the wider Adelaide Hills, and it also covers some outer suburban fringes.",
  },
  {
    term: "Engineered timber weatherboard",
    definition:
      "A board made from compressed hardwood fibre and wax, as distinct from a traditional solid timber board.",
  },
  {
    term: "Coating system",
    definition:
      "The coating the product’s documents call for, including any priming. Warranty terms, priming requirements and repaint intervals are set by the specific product and finish.",
  },
];

/** Rendered as the visible FAQ list and emitted as FAQPage schema. */
export const faqs: readonly ServiceFaq[] = [
  {
    question: "Is fibre cement always the safer bushfire choice?",
    answer:
      "It is documented as compliant across a wider range of BAL ratings than most timber weatherboard, but the assessed BAL rating for the actual site still needs to be confirmed before any product is chosen or assumed suitable.",
  },
  {
    question:
      "Does engineered timber weatherboard need less maintenance than solid timber?",
    answer:
      "Manufacturers generally market engineered boards on improved dimensional stability, but both still rely on a maintained coating system. Confirm the specific product data rather than assuming either timber option is maintenance-free.",
  },
  {
    question: "Can Elite Surface Group choose the cladding product for us?",
    answer:
      "No. Product selection depends on bushfire zoning, coastal exposure, budget and design intent, which sit with the project’s designer or the homeowner. We install the documented system and can discuss coordination once that selection is confirmed.",
  },
];
