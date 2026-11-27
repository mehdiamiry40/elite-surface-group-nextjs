import type { ChecklistItem, GlossaryTerm } from "../blocks.ts";
import type { CompatibilityTable } from "../guide-blocks.ts";
import type { ServiceFaq } from "../services.ts";

/**
 * Blocks for the rendering Hebel panels guide. Every row restates the guide's
 * own sections on system documents, joints, coating specification and trade
 * scope. Nothing here is an application method or a product instruction.
 */

export const finishConditions: CompatibilityTable = {
  caption: "Hebel wall conditions and how the finish is approached",
  columns: ["Wall or condition", "Typical approach", "Confirm first"],
  rows: [
    {
      condition: "A new Hebel external wall with the finish still to choose",
      approach:
        "Choose the finish as part of the wall system. Selected Hebel systems can receive compatible render, texture or coating finishes.",
      confirm:
        "The exact Hebel product and application in the current project documents, and the finish system permitted for it.",
    },
    {
      condition: "A zero-boundary, dual zero-boundary or intertenancy wall",
      approach:
        "Settle the wall terminology, approved evidence, access and trade responsibilities before the finish.",
      confirm:
        "The points in our [Hebel boundary-wall planning guide](/resources/hebel-boundary-walls-adelaide/). Those configurations are not interchangeable.",
    },
    {
      condition: "Panel joints and control joints across the finished face",
      approach:
        "Documented movement and control joints stay detailed through the finish. A coating does not hide or replace one.",
      confirm:
        "Each joint’s location and finish with the responsible project team, before coating.",
    },
    {
      condition: "A coating supplier already selected",
      approach:
        "That supplier’s substrate, application and care guides apply to the selected system only.",
      confirm:
        "That the project specification names the complete finish, layer by layer, for the confirmed Hebel substrate.",
    },
    {
      condition: "Drawings, product documents or trade scopes that conflict",
      approach:
        "Resolve the conflict before either panel installation or coating proceeds.",
      confirm: "The answer from the responsible designer, builder and suppliers.",
    },
    {
      condition: "An existing Hebel wall with cracks or coating loss",
      approach:
        "Start from the cause. A new-project specification cannot diagnose an existing wall, and more than the visible finish may be involved.",
      confirm:
        "The pattern, history, weather exposure and surrounding conditions. Our [Adelaide render-cracking guide](/resources/render-cracking-adelaide/) explains what to document.",
    },
    {
      condition: "Panels that need cutting on site",
      approach:
        "A site-safety matter. AAC is a crystalline-silica substance, so dust controls, training and work planning belong in the site safety system.",
      confirm:
        "Who carries cutting, waste handling and access in the written scope.",
    },
  ],
};

export const glossary: readonly GlossaryTerm[] = [
  {
    term: "AAC",
    definition:
      "Autoclaved aerated concrete, the material Hebel® products are made from.",
  },
  {
    term: "System documents",
    definition:
      "The current Hebel design and installation guide and details for the exact product and application, read together with the approved drawings.",
  },
  {
    term: "Control joint",
    definition:
      "A documented joint that allows for movement in the wall. Its location comes from the system documents and project details, and it stays detailed through the finish.",
  },
  {
    term: "Coating system",
    definition:
      "The complete specified finish: base, levelling, reinforcement, texture and topcoat layers where applicable, not a generic bag of render.",
  },
  {
    term: "Substrate acceptance",
    definition:
      "The renderer or coating applicator’s confirmation that the surface meets the preparation and acceptance criteria the specification sets before coating.",
  },
];

export const enquiryChecklist: readonly ChecklistItem[] = [
  {
    label: "The Hebel product and wall application",
    detail:
      "As named in the current project documents, not judged from how the panel looks.",
  },
  {
    label: "Drawings and the system schedule",
    detail:
      "Architectural elevations, the system schedule and the engineer’s details.",
  },
  {
    label: "The finish specification",
    detail:
      "The complete coating system, the texture and colour, and any documented colour limitations.",
  },
  {
    label: "Joint locations",
    detail:
      "Where movement or control joints fall, and how each stays detailed in the finish.",
  },
  {
    label: "Who does what",
    detail:
      "Who supplies panels, accessories and coatings, and who confirms frame and substrate readiness.",
  },
  {
    label: "Access and sequencing",
    detail: "Scaffold or other access, and when each trade can work.",
  },
  {
    label: "For an existing wall, its history",
    detail:
      "Crack pattern, coating loss, moisture and weather exposure, recorded before a finish is discussed.",
  },
];

/** Rendered as the visible FAQ list and emitted as FAQPage schema. */
export const faqs: readonly ServiceFaq[] = [
  {
    question: "Can every Hebel product receive the same render?",
    answer:
      "No universal specification should be assumed. Confirm the exact Hebel product and application, then follow its current system documents and the selected coating supplier’s compatible specification.",
  },
  {
    question: "Can render cover the panel joints?",
    answer:
      "Joint treatment depends on the selected system and project details. Do not assume a finish can remove a documented movement or control joint; resolve its location and finish with the responsible project team before coating.",
  },
  {
    question: "Who selects the coating system?",
    answer:
      "The decision may involve the designer, builder, Hebel and coating suppliers, installer and applicator. The written project documents should identify the selected compatible system and who is responsible for each layer.",
  },
  {
    question: "Are photos enough for a Hebel and render quote?",
    answer:
      "Photos help show access and current conditions, but new work normally also needs plans, the selected wall system, finish specification, scope boundaries and programme information.",
  },
  {
    question: "Can Elite coordinate Hebel installation and rendering?",
    answer:
      "Tell us which system documents and drawings are available and the proposed finish. We can arrange how to review supporting files, confirm whether the installation and coating work sit within our service scope and identify the information still needed for a quote; project design and certification remain with the responsible professionals.",
  },
];
