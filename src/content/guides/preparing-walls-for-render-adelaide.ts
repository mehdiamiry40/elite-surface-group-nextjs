import type { ChecklistItem, GlossaryTerm } from "../blocks.ts";
import type {
  CompatibilityTable,
  ProblemsTableData,
} from "../guide-blocks.ts";

/**
 * Blocks for the preparing-walls-for-render guide. Each row condenses what
 * the guide's own sections already say about a substrate or a finding; none
 * adds a preparation method, a product or a figure.
 */

export const substrates: CompatibilityTable = {
  caption: "Preparation by substrate",
  rows: [
    {
      condition: "Clay brick, concrete brick or block",
      approach:
        "Render was developed for these, but they are not interchangeable. Density, surface texture, suction and the state of the mortar all change what happens before the first coat.",
      confirm:
        "Which unit each wall is built from, and the preparation the selected system’s documents set for it.",
    },
    {
      condition: "AAC panels such as Hebel",
      approach:
        "A coating system matched to the panel manufacturer’s documents instead of a generic render. Panel joints and control joints are part of that system.",
      confirm:
        "The panel system and the coating supplier’s documents. Our guide to [rendering Hebel panels](/resources/rendering-hebel-panels-adelaide/) covers what to confirm.",
    },
    {
      condition: "Fibre-cement or render base sheet",
      approach:
        "A base coat formulated for sheeting, because a sheeted frame flexes with temperature in a way a rigid mix does not accommodate well.",
      confirm:
        "That the sheet is one the render system is documented for, that it is fixed as its installation guide requires, and how the sheet joints are treated.",
    },
    {
      condition: "Previously rendered wall",
      approach:
        "The old render is part of the substrate. Where it is cracked or hollow, that is a repair question before it is a preparation question.",
      confirm:
        "Its bond and condition. Our [render repair guide](/resources/render-repair-adelaide/) explains how those findings change the scope.",
    },
    {
      condition: "Painted wall",
      approach:
        "Assessed as paint on masonry: whether the coating still holds to the brick, and whether the selected system is documented for prepared painted surfaces.",
      confirm:
        "The coating’s history before anything is disturbed. SA Health says properties built before 1980 are likely to contain lead-based paint; see [rendering over painted brick](/resources/rendering-over-painted-brick-adelaide/).",
    },
    {
      condition: "New masonry or new concrete",
      approach:
        "Left to cure as its own documents call for before it is rendered.",
      confirm:
        "That the curing time is allowed for in the programme. Better preparation cannot shorten it.",
    },
    {
      condition: "Wall showing damp or salts",
      approach:
        "Not treated as ready. The moisture source is dealt with and the wall dries before the render scope begins.",
      confirm:
        "What is keeping the wall wet. Our [salt damp guide](/resources/salt-damp-adelaide/) explains what is assessed first.",
    },
    {
      condition: "Elevation that mixes materials",
      approach:
        "Each material is prepared as itself, and the junction between them gets a planned detail in place of a continuous skin.",
      confirm:
        "Where old work meets new and masonry meets a sheeted frame, and how each junction is carried through the finish.",
    },
  ],
};

export const wallSigns: ProblemsTableData = {
  caption: "Signs on the wall that change the preparation",
  rows: [
    {
      problem: "Loose or fretting brick faces, soft mortar or crumbling render",
      indicates:
        "A weak layer. New render bonded to it fails with it.",
      next: "Have making good included in the scope—repointing, removing failed material or repairing the masonry—before render is priced.",
    },
    {
      problem: "Flaking or chalky paint",
      indicates:
        "A coating that may no longer be holding to the wall, with residue that sits between the render and the brick.",
      next: "Have the paint and the masonry assessed together. Do not scrape or sand an unknown coating to find out more.",
    },
    {
      problem: "Patches that take up water differently",
      indicates:
        "Uneven suction from old repairs, mixed brick types or areas of remaining paint.",
      next: "Expect a sealer, primer or key coat to be specified to even it out, as the system’s documents direct.",
    },
    {
      problem:
        "Tide marks, white powdery deposits or blistered paint near the base",
      indicates:
        "Moisture in the wall. In older Adelaide homes the usual suspect is salt damp.",
      next: "Have the moisture source assessed first. We do not diagnose or treat rising damp.",
    },
    {
      problem: "A wall wet from the top down",
      indicates:
        "A leaking gutter, a failed flashing or an unsealed parapet capping.",
      next: "Have the responsible trade fix it before the wall is treated as ready.",
    },
    {
      problem: "Cracks in the wall",
      indicates:
        "Movement that has already happened. Whether it is still happening decides the preparation.",
      next: "Record each crack and its history. Our [render cracking guide](/resources/render-cracking-adelaide/) explains when independent advice is needed.",
    },
    {
      problem: "A joint that has been filled or painted over",
      indicates:
        "A movement joint hidden by an earlier finish. Rendered over, it relocates the stress into the new surface.",
      next: "Find every joint before render goes on, and agree how each is carried through the finish and who seals it.",
    },
    {
      problem: "Bowed courses, proud bricks or a wavy wall",
      indicates:
        "A surface a smooth finish will show, most of all when low sun rakes across the elevation.",
      next: "Settle the finish first. Straightening the wall is its own scope of work, best identified when the quote is written.",
    },
  ],
};

export const glossary: readonly GlossaryTerm[] = [
  {
    term: "Substrate",
    definition:
      "Whatever the render is bonded to: the brick, block, panel or sheet, together with any old coating still on it.",
  },
  {
    term: "Suction",
    definition:
      "How readily the wall takes up water. Too much can draw water out of a cement render too quickly.",
  },
  {
    term: "Sealer, primer or key coat",
    definition:
      "Preparatory coats named in a render system’s documents. One of their jobs is to even out patches of different absorbency.",
  },
  {
    term: "Movement joint",
    definition:
      "A joint that lets sections of wall move independently, also called an articulation or control joint. It is carried through the render, not covered by it.",
  },
  {
    term: "Bead",
    definition:
      "A profile set on the wall before rendering to form a true edge, corner or joint line. Agree who supplies and sets them.",
  },
  {
    term: "Damp-proof course",
    definition:
      "A barrier built into masonry near its base against ground moisture. A finish carried across its line can give that moisture a way around it.",
  },
];

/** The guide's existing pre-quote list, rendered as a checklist. */
export const quoteChecklist: readonly ChecklistItem[] = [
  "The suburb or postcode and the elevations in scope",
  "What each wall is built from, and its age if known",
  "The coating history and any previous repairs",
  "Elevations or details showing joints, openings and adjoining materials, where they exist",
  "The finish and colour you have in mind, or a reference for it",
  "Site access, working height and any programme constraints",
];
