import type { ComparisonTableData, GlossaryTerm } from "../blocks.ts";
import type { DecisionTable } from "../guide-blocks.ts";
import type { ServiceFaq } from "../services.ts";

/**
 * Blocks for the steel vs timber wall-framing guide. Every row restates what
 * the guide's own sections and cited sources already say, and names only the
 * standards the guide already cites. None of it selects a framing material.
 */

export const comparison: ComparisonTableData = {
  caption: "Timber and steel wall framing, side by side",
  rowHeading: "What is compared",
  columns: ["Timber framing", "Steel framing"],
  rows: [
    {
      label: "Recognised design pathway",
      cells: [
        "May use AS 1684.2 or AS 1684.4 in non-cyclonic areas, or another standard listed by NCC H1D6 where applicable.",
        "NASH Standard Part 1 design criteria and Part 2 design solutions, or AS 4100 and AS/NZS 4600 where applicable.",
      ],
    },
    {
      label: "What the pathway has to cover",
      cells: [
        "The complete frame: loads, bracing, tie-downs, connections, member sizes and construction details, not only the wind classification and span tables.",
        "The complete frame as well, with the system’s scope, member data, bracing, connections and corrosion protection confirmed for the project.",
      ],
    },
    {
      label: "Termites",
      cells: [
        "Susceptible timber in a primary building element needs a compliant termite-management system where termites are a known potential risk. Specified naturally resistant or preservative-treated timber is treated as not subject to attack.",
        "Treated as not subject to termite attack. Any susceptible primary elements elsewhere in the building still need a compliant system.",
      ],
    },
    {
      label: "Corrosion",
      cells: [
        "The timber members do not corrode, but metal straps, fasteners, brackets and connectors still need exposure-appropriate protection.",
        "The members need a coating or other protection compatible with the classified exposure.",
      ],
    },
    {
      label: "Reactive soil",
      cells: [
        "Does not resolve footing movement, which is managed through site classification, drainage and footing design.",
        "The same. Its stiffness does not substitute for the site investigation and footing design.",
      ],
    },
    {
      label: "Bushfire-prone areas",
      cells: [
        "The BAL comes from the site, not the frame. The frame and the complete wall assembly are then selected to meet the applicable construction solution.",
        "The same rule. Compliance should not be inferred from the frame material.",
      ],
    },
  ],
};

export const decisions: DecisionTable = {
  caption: "Which frame suits which situation",
  rows: [
    {
      situation: "The approved drawings already specify a frame",
      preference:
        "Build what is documented. Choosing between steel and timber is a design and engineering decision made before installation.",
      confirm:
        "Which pathway the engineer or proprietary system uses, and that it covers the complete frame.",
    },
    {
      situation: "Termites are a known potential risk",
      preference:
        "Steel is not subject to termite attack and can suit termite-prone sites well. Specified resistant or preservative-treated timber is treated the same way.",
      confirm:
        "Which primary building elements are susceptible, and the system, notices, inspection and maintenance required.",
    },
    {
      situation: "The site is exposed to salt air",
      preference:
        "Either, with protection matched to the classified exposure: the steel members themselves, or the metal straps, fasteners, brackets and connectors on a timber frame.",
      confirm:
        "The documented exposure classification. A suburb name or a generic distance band does not settle it.",
    },
    {
      situation: "The site is on reactive soil",
      preference:
        "Neither frame addresses it. Site classification, drainage and footing design do.",
      confirm:
        "The project-specific site class, and the footing system the frame is coordinated with.",
    },
    {
      situation: "The property is shown in a bushfire-prone area",
      preference:
        "Establish the BAL or deemed classification first, then select the frame and the complete wall assembly to suit.",
      confirm:
        "The risk designation, and whether a deemed classification applies or an AS 3959 assessment is required.",
    },
    {
      situation: "Thermal, acoustic or fire performance is the priority",
      preference:
        "Neither material decides it alone. Performance depends on the whole wall assembly: framing, insulation, lining and external finish together.",
      confirm:
        "The documented build-up. Our guides to [external wall insulation](/resources/external-wall-insulation-adelaide/) and [soundproofing walls](/resources/soundproofing-walls-adelaide/) look at the whole wall.",
    },
  ],
};

export const glossary: readonly GlossaryTerm[] = [
  {
    term: "Deemed-to-Satisfy pathway",
    definition:
      "A framing route the NCC recognises, such as a listed standard. The pathway selected has to cover the complete frame, not only the span tables.",
  },
  {
    term: "Exposure classification",
    definition:
      "How the applicable standard and framing system class the site’s corrosive environment, from factors such as breaking surf, airborne salts, pollutants and shelter.",
  },
  {
    term: "Site classification",
    definition:
      "The project-specific class given to the soil. With drainage and footing design, it is how movement on reactive soil is managed.",
  },
  {
    term: "BAL",
    definition:
      "Bushfire Attack Level. It is determined from site and bushfire conditions, including vegetation, distance and slope, not from the frame material.",
  },
];

/** Rendered as the visible FAQ list and emitted as FAQPage schema. */
export const faqs: readonly ServiceFaq[] = [
  {
    question: "Is steel framing always better than timber in Adelaide?",
    answer:
      "Not automatically. Steel framing is not subject to termite attack and can suit exposed or termite-prone sites well, but the design standard, coating class, cost and trade availability still need to be confirmed against timber framing for the specific project.",
  },
  {
    question: "Does steel framing avoid reactive-clay problems?",
    answer:
      "No. Footing movement on reactive clay is managed through site classification and footing design, not the wall framing material. A geotechnical or structural assessment should still confirm the footing system regardless of which framing is chosen.",
  },
  {
    question: "Can Elite Surface Group choose the framing material for us?",
    answer:
      "No. Framing material selection is a design and engineering decision made before installation. We install the wall system to the approved drawings and specification, and can discuss coordination once that documentation is in place.",
  },
];
