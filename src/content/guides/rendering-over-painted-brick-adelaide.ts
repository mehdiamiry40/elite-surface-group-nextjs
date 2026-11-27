import type { ChecklistItem, GlossaryTerm } from "../blocks.ts";
import type { CompatibilityTable } from "../guide-blocks.ts";
import type { ServiceFaq } from "../services.ts";

/**
 * Blocks for the rendering over painted brick guide. Every row restates the
 * guide's own sections on coating condition, moisture, safety and planning.
 * Nothing here is a removal method, a preparation recipe or a product
 * specification.
 */

export const wallConditions: CompatibilityTable = {
  caption: "Painted-brick conditions and how each is usually approached",
  columns: ["Wall condition", "Typical approach", "Confirm first"],
  rows: [
    {
      condition: "Paint that appears sound on sound brickwork",
      approach:
        "A compatible render or texture system may be specified over the properly prepared surface. Appearance alone does not settle it.",
      confirm:
        "The selected system’s substrate requirements, and who confirms substrate acceptance against documented criteria.",
    },
    {
      condition: "Loose, flaking, blistered or chalking paint",
      approach:
        "Not simply covered. Incompatible areas may need removal or remediation, or the wall may need a different finish strategy.",
      confirm:
        "The extent and likely cause, and the limits of preparation, removal and repairs in the written specification.",
    },
    {
      condition: "An unknown coating on a house built before 1980",
      approach:
        "Identify the lead risk before any preparation. SA Health strongly recommends qualified help for removing lead-based paint.",
      confirm:
        "How the responsible contractor will plan the work and controls for the actual materials. Property age does not prove what is on one wall.",
    },
    {
      condition: "Cracked brickwork, mortar or earlier repairs",
      approach: "Assess the movement first. A finish is not a structural repair.",
      confirm:
        "Whether the line is stable, active or part of a wider pattern. Our [Adelaide render-cracking guide](/resources/render-cracking-adelaide/) covers what to document.",
    },
    {
      condition: "Moisture, salts, staining or persistent damp",
      approach:
        "Investigate the source before a new layer makes the evidence harder to see.",
      confirm:
        "The gutter, downpipe, plumbing, roof and ground-drainage history near the wall. Our [salt damp guide](/resources/salt-damp-adelaide/) explains what an older home needs assessed.",
    },
    {
      condition: "Soft, fretted or damaged brick and mortar",
      approach:
        "Repair advice may need to come before a decorative-finish decision.",
      confirm:
        "Whether the masonry provides a suitable base, which surface appearance cannot establish.",
    },
    {
      condition: "A heritage place or a State Heritage Area",
      approach:
        "Check the address before the finish is priced as approved work. Changes there can require development approval.",
      confirm:
        "The Planning and Design Code rules for the address, and advice from the relevant planning authority.",
    },
  ],
};

export const glossary: readonly GlossaryTerm[] = [
  {
    term: "Substrate",
    definition:
      "Everything the new finish relies on. On painted brick that is the existing paint and its bond, as well as the brick and mortar.",
  },
  {
    term: "Substrate acceptance",
    definition:
      "Confirmation, against documented criteria, that the wall is ready for the specified system. The written specification names who gives it.",
  },
  {
    term: "Complete system",
    definition:
      "The full specified sequence, such as primer, key coat, render, texture and topcoat where applicable, as distinct from a finish name.",
  },
  {
    term: "Lead-based paint",
    definition:
      "Paint that SA Health says properties built before 1980 are likely to contain. Damaged or disturbed lead paint can create an exposure risk.",
  },
  {
    term: "Respirable crystalline silica",
    definition:
      "Respirable dust that cutting, grinding or sanding bricks, blocks, mortar and cement-based products can generate. Its controls belong in the workplace safety plan.",
  },
  {
    term: "State Heritage Area",
    definition:
      "An area where Heritage South Australia says changes, including alterations and external painting, can require development approval, subject to stated exemptions.",
  },
];

export const settledFirst: readonly ChecklistItem[] = [
  {
    label: "The lead risk is identified",
    detail:
      "Especially where the property was built before 1980 or the coating is unknown.",
  },
  {
    label: "Substrate acceptance is assigned",
    detail:
      "The specification names who confirms it, and by what documented criteria.",
  },
  {
    label: "Any moisture source is understood",
    detail:
      "Where damp, salts or staining are present, the source is investigated first.",
  },
  {
    label: "Cracks are assessed",
    detail: "As stable, active or part of a wider movement pattern.",
  },
  {
    label: "The complete system is written down",
    detail:
      "Every layer, with the extent and limits of preparation, removal and repairs.",
  },
  {
    label: "Lead, silica, waste and occupied-site controls are in the scope",
    detail: "Planned by the responsible contractor for the actual materials.",
  },
  {
    label: "Planning and heritage are checked for the address",
    detail: "Before the finish is priced as approved work.",
  },
  {
    label: "Assumptions and exclusions are in writing",
    detail: "So that two quotes describe comparable work.",
  },
];

/** Rendered as the visible FAQ list and emitted as FAQPage schema. */
export const faqs: readonly ServiceFaq[] = [
  {
    question: "Does all paint need to be removed before rendering?",
    answer:
      "There is no universal answer. Some documented systems allow properly prepared painted surfaces, while unsuitable or unstable layers may require a different approach. The wall and selected system must be assessed together.",
  },
  {
    question: "Can a photo confirm whether the paint is sound?",
    answer:
      "No. Photos can show visible condition and access, but cannot establish the bond between hidden layers, identify every coating or rule out moisture and masonry issues.",
  },
  {
    question: "Will new render stop existing wall cracks?",
    answer:
      "A finish should not be treated as a structural repair. The crack and underlying movement need an appropriate assessment before a finish or repair system is selected.",
  },
  {
    question: "Does rendering painted brick need council approval?",
    answer:
      "It depends on the address, applicable overlays and proposed change. Use PlanSA’s address-based tools and seek advice from the relevant planning authority, especially for heritage or historic places and areas.",
  },
  {
    question: "What should I tell Elite Surface Group?",
    answer:
      "Tell us the suburb, property age if known, coating history, affected elevations, access notes, proposed finish and what dated photos are available. We can arrange how to review supporting files, then identify what else is needed to confirm whether the work sits within our scope.",
  },
];
