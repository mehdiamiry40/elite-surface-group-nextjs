import type {
  ChecklistItem,
  ComparisonTableData,
  GlossaryTerm,
} from "../blocks.ts";
import type { DecisionTable } from "../guide-blocks.ts";
import type { ServiceFaq } from "../services.ts";

/**
 * Blocks for the soundproofing guide. They restate the guide's own sections
 * and add no sound insulation figure, clause or test result. A rating still
 * belongs to a complete tested system, as the guide says.
 */

export const measures: ComparisonTableData = {
  caption: "The four things that decide what you hear",
  rowHeading: "Measure",
  columns: ["What it changes", "Where it stops"],
  rows: [
    {
      label: "Mass",
      cells: [
        "Heavier surfaces are harder to set moving. A second layer of lining, or a denser board, adds mass without touching the framing.",
        "Studs still bridge the two faces and carry vibration straight across.",
      ],
    },
    {
      label: "Separation",
      cells: [
        "Two independent frames, staggered studs or resilient mounting break the link between the two faces.",
        "It means opening or rebuilding the wall, so it is specified from a tested build-up.",
      ],
    },
    {
      label: "Sealing",
      cells: [
        "Closing perimeter gaps and penetrations lets a system reach the result it was tested at.",
        "Where flanking dominates, the roof space, ducting and ceiling penetrations may matter more.",
      ],
    },
    {
      label: "Absorption",
      cells: [
        "Acoustic batts work on the sound energy bouncing inside the cavity.",
        "They will not by themselves quieten a single-framed, hard-linked wall.",
      ],
    },
  ],
};

export const noiseDecisions: DecisionTable = {
  caption: "Matching the measure to the noise",
  columns: ["What you want to reduce", "What changes it", "What to confirm"],
  rows: [
    {
      situation: "Voices or television through a wall between two rooms",
      preference:
        "Mass, separation, sealing and cavity absorption working as one build-up. Extra lining on one face is usually the cheapest worthwhile start.",
      confirm:
        "The existing construction, the lining thickness and whether the cavity is insulated.",
    },
    {
      situation: "Sound that seems to come over or around the wall",
      preference:
        "Dealing with the flanking path first: the roof space or ceiling void, shared ducting, and fittings cut through the lining on both sides.",
      confirm:
        "What sits above the wall, and whether evaporative cooling, downlights or exhaust fans penetrate the ceiling both sides.",
    },
    {
      situation: "Footsteps and other impact noise",
      preference:
        "Impact noise is carried by continuous floor framing or hard finishes, which is a path around the wall.",
      confirm:
        "Where the noise is heard and when, so the dominant path can be identified before the wall is touched.",
    },
    {
      situation: "Noise through a solid double-brick wall",
      preference:
        "The wall has useful mass but no separation. Its weakness is the roof space above it.",
      confirm: "What happens at the ceiling line and in the roof space above.",
    },
    {
      situation: "Noise through a light timber-framed wall",
      preference:
        "Light linings and hard-linked studs are the weakness. Sealing and added mass come first, then a rebuilt cavity if the wall is being opened.",
      confirm:
        "How much of the wall you are willing to open. A rebuilt cavity is specified from a tested build-up.",
    },
    {
      situation: "Noise between two attached dwellings",
      preference:
        "A complete tested separating-wall system, carried to the underside of the roof. That is a compliance wall, not a comfort upgrade.",
      confirm:
        "Which Code edition applies to the approval, with the certifier, and the acoustic consultant’s specification.",
    },
    {
      situation: "Traffic or other external noise",
      preference: "Glazing and sealing, more than the wall itself.",
      confirm:
        "That the wall is the weak element, before money goes into the wrong one.",
    },
  ],
};

export const glossary: readonly GlossaryTerm[] = [
  {
    term: "Flanking transmission",
    definition:
      "Sound arriving by any route other than straight through the wall, such as a shared roof space, ducting or continuous floor framing.",
  },
  {
    term: "Discontinuous construction",
    definition:
      "A wall built as two separate leaves with a cavity between them, linked only at the periphery or by resilient ties where masonry leaves must connect.",
  },
  {
    term: "Separating wall",
    definition:
      "The wall between two attached dwellings. The Code sets its sound insulation, and it usually carries a fire resistance requirement as well.",
  },
  {
    term: "Rw and Ctr",
    definition:
      "Rw describes a wall’s airborne sound insulation. Ctr is a spectrum adaptation term that weights the result towards lower frequencies.",
  },
  {
    term: "Tested system",
    definition:
      "A complete wall build-up with a test report. A rating belongs to the whole system installed the way the report describes, not to a board, a batt or a stud.",
  },
];

/**
 * The guide's existing pre-quote list, with two points added from its
 * retrofit section.
 */
export const quoteChecklist: readonly ChecklistItem[] = [
  "Whether the wall separates two dwellings or two rooms in one dwelling",
  "What the noise is—voices, television, footsteps, traffic, plant—and when you hear it",
  "The existing construction, lining thickness and whether the cavity is insulated",
  "What sits above the wall: a ceiling and roof space, a floor, or continuous framing",
  "Whether evaporative cooling, downlights or exhaust fans penetrate the ceiling both sides",
  "Any acoustic report, tested system number, approved drawings or certifier requirement",
  "How much of the wall you are willing to open: seal it, line one face, or strip and rebuild the cavity",
  "Whether the work adds real weight to an upper floor or removes part of a wall, which is a structural question first",
];

/** Rendered as the visible FAQ list and emitted as FAQPage schema. */
export const faqs: readonly ServiceFaq[] = [
  {
    question:
      "Can an existing wall be brought up to the separating-wall standard?",
    answer:
      "Sometimes, but it has to be assessed rather than assumed. The requirement covers the complete construction including the junction at the roof, so a retrofit that cannot address the ceiling line rarely gets there.",
  },
  {
    question: "Who do I contact about noise from a neighbouring property?",
    answer:
      "In South Australia it depends on the source. Councils handle neighbourhood nuisance such as construction noise, pool pumps and air conditioners; SAPOL handles domestic noise such as parties; the EPA deals with licensed commercial and industrial premises. That is a separate matter from building work on your own wall.",
  },
  {
    question: "Will acoustic batts soundproof a wall on their own?",
    answer:
      "No. Acoustic batts work on the sound energy bouncing inside the cavity, not on the vibration crossing the studs. They contribute to a tested system’s result, but will not by themselves quieten a single-framed, hard-linked wall, and where a gap is left at the ceiling line most of the noise keeps taking the easier route.",
  },
];
