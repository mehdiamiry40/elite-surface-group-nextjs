import type { ChecklistItem, GlossaryTerm } from "../blocks.ts";
import type { ProblemsTableData } from "../guide-blocks.ts";
import type { ServiceFaq } from "../services.ts";

/**
 * Blocks for the repainting render guide. Each row and item restates the
 * guide's own assessment points; no recoating interval is added here.
 */

export const surfaceSigns: ProblemsTableData = {
  caption: "Surface signs, what they can indicate and what to do next",
  rows: [
    {
      problem: "Paint that lifts, flakes or feels powdery to the touch",
      indicates: "A coating that is no longer firmly bonded, or is chalking.",
      next: "Expect sealing, priming or patching before a new coat, so the new coating adheres properly.",
    },
    {
      problem: "A wall that stays damp",
      indicates: "Something is keeping the wall wet.",
      next: "Find and deal with the cause before a coating is specified. Where the damp sits in a band near the ground, read our [salt damp guide](/resources/salt-damp-adelaide/).",
    },
    {
      problem: "Dirt, mould, salt deposits or organic growth",
      indicates:
        "Contamination that has to come off first, and that can disguise the real condition of the wall.",
      next: "Wash the wall down and look again before the surface is judged.",
    },
    {
      problem: "Fine hairline crazing in the coating",
      indicates:
        "A coating-level defect that a flexible, crack-bridging system can often handle.",
      next: "Photograph it with something for scale and note the date, so a record over time shows whether it is stable.",
    },
    {
      problem:
        "A crack that appears in one part of the year and closes in another",
      indicates:
        "Seasonal movement. Reactive clay soils across the Adelaide Plains move seasonally.",
      next: "Record it before anything is filled. Our [render cracking guide](/resources/render-cracking-adelaide/) covers what to note before a repair is scoped.",
    },
    {
      problem: "A crack that is active, widening or following a structural path",
      indicates: "Structural cracking, which a topcoat hides and does not stop.",
      next: "Have it assessed by a suitably qualified professional and repaired before painting.",
    },
    {
      problem: "Earlier repairs and patches that read through the finish",
      indicates: "Areas that absorb differently from the wall around them.",
      next: "Ask how the surface will be sealed or primed so absorption is uniform, and have any patching compound specified together with the coating.",
    },
    {
      problem: "An existing coating that nobody can identify",
      indicates:
        "An unknown base for the new system, which is common on a house that has changed hands.",
      next: "Expect the specification to include adhesion testing, or the test patches the manufacturer’s literature requires.",
    },
  ],
};

export const enquiryChecklist: readonly ChecklistItem[] = [
  {
    label: "The suburb and the exposure",
    detail:
      "Coastal air and a dark, west-facing wall both work a coating harder.",
  },
  {
    label: "The age of the current finish",
    detail: "An approximate age is enough.",
  },
  {
    label: "What is on the wall",
    detail:
      "Cement render, acrylic render or a texture coat, and the existing coating system where a record names it.",
  },
  {
    label: "Photographs of any cracking",
    detail:
      "Dated, with something for scale, and repeated over time where a crack may be moving.",
  },
  {
    label: "Damp, mould or salt deposits",
    detail: "Where they are, and anything nearby that keeps the wall wet.",
  },
  {
    label: "Previous repairs and patches",
    detail:
      "Where they are, since they can absorb differently from the wall around them.",
  },
  {
    label: "The colour direction",
    detail:
      "A darker choice will generally need recoating sooner, so it is a maintenance decision as well as a look.",
  },
  {
    label: "The age of the house and the wall height",
    detail:
      "Paint on a property built before 1980 may be lead-based, and anything above single storey is work at height.",
  },
];

export const glossary: readonly GlossaryTerm[] = [
  {
    term: "Chalking",
    definition: "A coating that has turned powdery to the touch.",
  },
  {
    term: "Crazing",
    definition:
      "Fine hairline cracking in a coating, as distinct from a crack that traces a structural movement path.",
  },
  {
    term: "Crack-bridging coating",
    definition:
      "A flexible coating system that can often handle minor hairline cracks. It does not repair structural cracking.",
  },
  {
    term: "Coating system",
    definition:
      "Primer, intermediate and topcoat specified together from one manufacturer’s documented system.",
  },
  {
    term: "Test patch",
    definition:
      "A trial area the manufacturer’s literature can require before a new system goes over an unknown coating.",
  },
];

/** Rendered as the visible FAQ list and emitted as FAQPage schema. */
export const faqs: readonly ServiceFaq[] = [
  {
    question: "How often does render need repainting?",
    answer:
      "There is no single interval. It depends on the coating system, the colour, the exposure and how well the original application was done. Manufacturers publish expectations for their own systems—use the one that is actually on your wall.",
  },
  {
    question: "Can we just paint over the cracks?",
    answer:
      "Fine hairline cracking can often be covered by a flexible crack-bridging system. Cracking that is active, widening or following a structural path needs assessment and repair first, because a coating will conceal it rather than resolve it.",
  },
  {
    question: "Is normal exterior house paint good enough?",
    answer:
      "Render coating systems are specified for water management and, on refurbishment work, crack bridging and stain resistance. Check what the manufacturer’s system requires for your substrate rather than assuming a general exterior paint covers it.",
  },
  {
    question: "Do dark colours need repainting sooner?",
    answer:
      "Generally, yes. Dark colours and coastal environments both shorten maintenance cycles, and long, hot, dry Adelaide summers push surface temperatures up on dark walls. That makes colour a maintenance decision as much as an aesthetic one.",
  },
];
