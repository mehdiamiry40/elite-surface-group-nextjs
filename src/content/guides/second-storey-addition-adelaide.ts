import type { ChecklistItem } from "../blocks.ts";
import type { CompatibilityTable } from "../guide-blocks.ts";
import type { ServiceFaq } from "../services.ts";

/**
 * Blocks for the second-storey addition guide. Each row restates what the
 * guide already says about the existing structure, the site and the consent
 * pathway, and names who confirms it. Nothing here is structural advice.
 */

export const houseAndSite: CompatibilityTable = {
  caption: "What the existing house and the site change, and what confirms it",
  columns: [
    "What the house or site shows",
    "What it can mean for the addition",
    "What confirms it",
  ],
  rows: [
    {
      condition: "Footings sized for a single-storey load",
      approach:
        "They may need underpinning or replacement before they can carry another level. On reactive clay, footing performance depends heavily on the site classification.",
      confirm:
        "The structural engineer, working from the existing drawings and an on-site inspection.",
    },
    {
      condition: "An earlier extension, a removed wall or a converted garage",
      approach:
        "The load path may be different from what the original plans show.",
      confirm:
        "The engineer’s on-site inspection, which matters as much as the drawings on a house that has been altered.",
    },
    {
      condition: "Bracing that suited the single-storey house",
      approach:
        "It is assessed again for the completed two-storey form, for wind and, where relevant, earthquake loads, and may not remain adequate.",
      confirm: "The engineer’s bracing design for the completed form.",
    },
    {
      condition: "A heritage overlay, State Heritage Area or character area",
      approach:
        "Planning consent may apply in addition to building consent where the new level changes the street-facing form.",
      confirm:
        "PlanSA’s online tools or the relevant council, for the specific address and scope of work.",
    },
    {
      condition: "A designated bushfire-prone area",
      approach:
        "It affects the construction requirements for the new upper-level walls, windows and roof.",
      confirm: "A Bushfire Attack Level assessment for the site.",
    },
    {
      condition: "A timber or a steel frame for the new level",
      approach:
        "Timber framing is sized and braced against the timber-framing standard the NCC references; a steel-framed level follows the Housing Provisions’ structural steel member requirements. Our [steel vs timber wall framing guide](/resources/steel-frame-vs-timber-frame-walls-adelaide/) compares the two.",
      confirm:
        "The framing material, bracing and connection details on the documented design.",
    },
    {
      condition: "The existing roof coming off",
      approach:
        "The house is open to weather while the new level is framed, so temporary support, protection and sequencing are agreed beforehand.",
      confirm:
        "The licensed building work contractor responsible for that stage.",
    },
  ],
};

export const quoteChecklist: readonly ChecklistItem[] = [
  {
    label: "The structural engineer’s assessment",
    detail:
      "Confirming which existing walls and footings carry the new load, and any strengthening they need first.",
  },
  {
    label: "The engineering drawings",
    detail:
      "The framing material, bracing design and connection details for the completed two-storey form.",
  },
  {
    label: "Where the approvals stand",
    detail:
      "Whether planning consent applies as well as building consent, and what is already in hand.",
  },
  {
    label: "Who holds the structural work",
    detail:
      "The licensed building work contractor responsible for the framing, propping and connections.",
  },
  {
    label: "The plan for the open-roof stage",
    detail:
      "How the site is protected and weatherproofed while the existing roof is off.",
  },
  {
    label: "Suburb and photos",
    detail:
      "The property suburb, and any photos of the existing house where the new framing will connect.",
  },
];

/** Rendered as the visible FAQ list and emitted as FAQPage schema. */
export const faqs: readonly ServiceFaq[] = [
  {
    question: "Can our existing walls definitely carry a second storey?",
    answer:
      "Not without assessment. Only a structural engineer working from the drawings and an on-site inspection can confirm whether the existing walls and footings can carry the added load, or what strengthening they need first.",
  },
  {
    question: "Do we need planning consent as well as building consent?",
    answer:
      "It depends on the property, height and any heritage, character or bushfire overlay. Use PlanSA’s approval check or ask the relevant council before design work is finalised.",
  },
  {
    question: "Can Elite Surface Group design the second storey addition?",
    answer:
      "No. Structural design and planning approval sit with the engineer, designer and certifier. Once that design is approved, we install the engineered walling for the new level and coordinate with the finishing trades.",
  },
];
