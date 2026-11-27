import type {
  ChecklistItem,
  ComparisonTableData,
  GlossaryTerm,
} from "../blocks.ts";
import type { CompatibilityTable } from "../guide-blocks.ts";

/**
 * Blocks for the render finishes guide. Each row condenses what the guide's
 * own sections say about a grade, a wall condition or a term; the selected
 * system's documents still set what is applied.
 */

export const finishMatrix: ComparisonTableData = {
  caption: "Render finishes compared by grade",
  rowHeading: "Finish",
  columns: ["Where it suits", "What it hides", "Cleaning and patching"],
  rows: [
    {
      label: "Smooth and trowelled",
      cells: [
        "Contemporary flat elevations, parapet walls and long unbroken planes. Smoother finishes are also the norm indoors.",
        "Nothing. Set-out variations and hairlines stay visible, most of all in low sun.",
        "Shows every mark and later touch-up. A patch reads as a change in flatness and sheen.",
      ],
    },
    {
      label: "Fine sand or float",
      cells: [
        "Older or uneven masonry that is sound but not perfectly flat.",
        "Small variations, without reading as a textured wall from the street.",
        "A patch has to be matched in profile by hand and will usually show in raking light.",
      ],
    },
    {
      label: "Moderate texture",
      cells: [
        "Ground-level walls beside paths, driveways, bin stores and garden beds.",
        "Small knocks, where a very smooth face would show every mark.",
        "Washes down in line with the system’s documented cleaning method.",
      ],
    },
    {
      label: "Coarse or rolled",
      cells: [
        "Sheltered inland elevations. Facing the gulf it is a maintenance decision as much as a look.",
        "The most. A heavier film build levels out uneven areas.",
        "The deeper profile holds dust, wind-driven sand and salt, so soiling tends to show sooner.",
      ],
    },
  ],
};

export const textureLimits: CompatibilityTable = {
  caption: "What a textured finish will and will not disguise",
  columns: ["What the wall shows", "What a texture does", "Settle first"],
  rows: [
    {
      condition: "Slight trowel marks or small changes in plane",
      approach:
        "The grain breaks up reflected light, so they are far less visible than on a smooth wall.",
      confirm:
        "That the wall is sound, and how flat it reads early and late in the day.",
    },
    {
      condition: "A crack that is still moving",
      approach:
        "It comes through. A heavier profile disguises fine surface variation, not movement.",
      confirm:
        "The cause, before the finish is chosen. Our [render cracking guide](/resources/render-cracking-adelaide/) lists what to record.",
    },
    {
      condition: "A hollow or debonded area",
      approach:
        "It is not hidden, and a texture applied over it reproduces the problem.",
      confirm:
        "How far the loose area runs. The [render repair guide](/resources/render-repair-adelaide/) explains how that changes the scope.",
    },
    {
      condition: "A damp patch, or salt coming through from behind",
      approach: "A texture will not hide it.",
      confirm:
        "Where the moisture is coming from. See the [salt damp guide](/resources/salt-damp-adelaide/).",
    },
    {
      condition: "A movement joint that was never formed",
      approach:
        "A finish cannot stand in for it. A rigid finish carried across a joint moves the stress into the surface.",
      confirm:
        "Where the articulation and control joints belong, marked on the elevations early.",
    },
    {
      condition: "A wall that has been painted before",
      approach: "The existing coating narrows which systems can go over it.",
      confirm:
        "What the coating is, how well it is bonded and whether the new system is documented for that substrate.",
    },
  ],
};

export const glossary: readonly GlossaryTerm[] = [
  {
    term: "Texture grade",
    definition:
      "The surface profile of a finish, from smooth through fine grain to coarse. Names change between brands; the profile carries across all of them.",
  },
  {
    term: "Float finish",
    definition:
      "A fine-grain texture laid on with a hawk and trowel and worked with a float.",
  },
  {
    term: "Film build",
    definition:
      "The thickness a texture is applied at. Heavier profiles go on at a greater film build and hide more.",
  },
  {
    term: "Through-coloured render",
    definition:
      "Render that carries its colour in the render layer itself, not in a thin coating over the top.",
  },
  {
    term: "Raking light",
    definition:
      "Low sun travelling across a wall. It exaggerates every ripple that flat midday light hides.",
  },
  {
    term: "Natural break",
    definition:
      "A corner, an opening, a joint or a change of plane, where one finish can stop or a repair can end without showing mid-wall.",
  },
];

export const quoteChecklist: readonly ChecklistItem[] = [
  {
    label: "The suburb and the elevations involved",
    detail:
      "Which walls are being finished, and which of them face the coast or catch low western sun.",
  },
  {
    label: "What the wall is built from",
    detail:
      "Brickwork, blockwork, AAC panel and a sheeted frame do not all take the same base coat.",
  },
  {
    label: "Its coating history",
    detail:
      "Whether the wall has been painted or rendered before, and with what if you know.",
  },
  {
    label: "Photos taken in low sun",
    detail:
      "Each elevation early or late in the day, which is when a wall shows how flat it really is.",
  },
  {
    label: "Known cracks, damp or hollow areas",
    detail:
      "Where they are, so the cause is looked at before the finish is chosen.",
  },
  {
    label: "The finish and colour you have in mind",
    detail:
      "A grade, whether the colour sits in the render or in a coating, and how dark it is.",
  },
  {
    label: "Any drawings or specification",
    detail:
      "Including where movement joints and changes of finish are marked on the elevations.",
  },
];
