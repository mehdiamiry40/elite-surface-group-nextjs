import type { ChecklistItem, GlossaryTerm } from "../blocks.ts";
import type { ProblemsTableData } from "../guide-blocks.ts";
import type { ServiceFaq } from "../services.ts";

/**
 * Blocks for the coastal cladding maintenance guide. They restate the
 * guide's own checks and boundaries. No wash interval, cleaner or method is
 * given here: those stay with the confirmed product's current guidance.
 */

export const findings: ProblemsTableData = {
  caption: "From what you notice to what to do next",
  rows: [
    {
      problem: "Salt or grime on walls below eaves and in sheltered junctions",
      indicates:
        "An area rain does not naturally wash, where salt can accumulate.",
      next: "Confirm the product and finish, then follow what its current guidance says about areas rain does not reach.",
    },
    {
      problem: "Staining, chalking or fading",
      indicates:
        "A change in the finish or coating. What it needs depends on the exact product.",
      next: "Add it to a dated photo record and check the guidance for the confirmed product and coating before choosing a cleaner.",
    },
    {
      problem: "A rust-coloured stain",
      indicates:
        "Corrosion somewhere, but not its source, extent or significance.",
      next: "Record the context and have the relevant materials and interfaces assessed before covering or repairing the stain. Significant or spreading corrosion at fixings, edges or support components needs prompt assessment.",
    },
    {
      problem: "Open joints, or split or missing sealant",
      indicates:
        "The defect could involve the wall behind the cladding, not just the surface.",
      next: "Do not disturb the joint or reach for a generic sealant. Have it assessed, most of all at windows, doors, parapets and penetrations.",
    },
    {
      problem: "Loose, displaced or unstable boards or panels",
      indicates: "Support, movement or safety may be in question.",
      next: "Do not pull the panel to check it. Arrange prompt professional assessment; an engineer may be needed.",
    },
    {
      problem: "Interior damp, or moisture that keeps returning around an opening",
      indicates:
        "Active water entry. Cleaning the visible face does not show that the concealed wall build-up is sound.",
      next: "Stop treating it as routine surface care. A facade or building consultant can assess the construction and its water management.",
    },
    {
      problem: "Widespread coating loss, or a repair that has failed again",
      indicates: "More than routine surface care can put right.",
      next: "Arrange an appropriate assessment. A product supplier or coating specialist can clarify the confirmed product’s instructions.",
    },
    {
      problem: "A defect you can only reach by working at height",
      indicates: "A job beyond a ground-level check.",
      next: "Do not improvise access. Elevated inspection or cleaning is planned by people with suitable equipment and competence.",
    },
  ],
};

export const glossary: readonly GlossaryTerm[] = [
  {
    term: "Unwashed area",
    definition:
      "A surface rain does not naturally wash, such as a wall below deep eaves or a sheltered junction. Salt can accumulate there.",
  },
  {
    term: "Corrosion environment",
    definition:
      "A mapped category South Australian building guidance uses to help determine corrosion-protection requirements near the coast and breaking surf.",
  },
  {
    term: "Wall system",
    definition:
      "The cladding together with the framing, membranes, insulation and water-management details behind it.",
  },
  {
    term: "Product-specific guidance",
    definition:
      "The current manufacturer instructions for the exact product and finish. They govern the method, cleaner, pressure and rinse procedure.",
  },
  {
    term: "Handover documents",
    definition:
      "The manuals, warranties, colour records and product details supplied at the end of a project. They show which guidance applies later.",
  },
];

export const beforeCleaning: readonly ChecklistItem[] = [
  {
    label: "The manufacturer and product profile",
    detail:
      "From handover documents, invoices, drawings, warranty records or product labels, not from appearance.",
  },
  {
    label: "The finish or coating, and its colour",
    detail:
      "Washing and recoating requirements can come from the coating’s manufacturer.",
  },
  {
    label: "The installation date and any earlier repair or repaint",
    detail: "Record them where they are known.",
  },
  {
    label: "The current instructions for that exact product and finish",
    detail:
      "They set the method, water quality, cleaner, pressure, tools and rinse procedure.",
  },
  {
    label: "Whether the instructions call for a test area",
    detail:
      "Test first where they do, and protect nearby materials and landscaping as the product information directs.",
  },
  {
    label: "Which areas rain does not wash",
    detail:
      "Walls below deep eaves and sheltered junctions, where salt can accumulate.",
  },
  {
    label: "That the work can be done from the ground",
    detail:
      "Or from another safely accessible position. Anything at height is planned by people with suitable equipment and competence.",
  },
];

/** Rendered as the visible FAQ list and emitted as FAQPage schema. */
export const faqs: readonly ServiceFaq[] = [
  {
    question: "How often should coastal cladding be washed?",
    answer:
      "There is no universal interval. Use the current guidance for the confirmed product, coating and exposure. A frequency published by one manufacturer should not be applied to a different system.",
  },
  {
    question: "Can I pressure-wash exterior cladding?",
    answer:
      "Only if the exact product and finish instructions permit it and you can follow their limits safely. If the instructions do not expressly permit it, do not assume it is suitable.",
  },
  {
    question: "Does “low maintenance” mean maintenance-free?",
    answer:
      "No. The need may be lower than for another material, but cleaning, finish care and checks of joints, fixings and water management can still apply.",
  },
  {
    question: "Does a rust-coloured stain prove the cladding is failing?",
    answer:
      "No. Appearance alone does not identify the source, extent or significance of corrosion. Record the context and have the relevant materials and interfaces assessed before covering or repairing the stain.",
  },
  {
    question: "Can Elite diagnose an existing facade from photographs?",
    answer:
      "Photographs and product records help with initial context, but they cannot establish the condition of concealed layers or identify every cause. Some issues need on-site or independent assessment before an installation or replacement scope is appropriate.",
  },
  {
    question: "Who should assess a problem with existing cladding?",
    answer:
      "The right person depends on the evidence. A product supplier or coating specialist can clarify confirmed product instructions; a facade or building consultant can assess uncertain construction and water-management issues; and an engineer may be needed where support, movement or safety is in question.",
  },
];
