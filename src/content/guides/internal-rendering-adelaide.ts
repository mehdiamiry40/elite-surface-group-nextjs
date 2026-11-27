import type { ChecklistItem, ComparisonTableData } from "../blocks.ts";
import type { CompatibilityTable } from "../guide-blocks.ts";

/**
 * Blocks for the internal rendering guide. The two tables condense the
 * guide's own substrate and junction sections, and the checklist is the
 * guide's existing quote list, word for word, on the shared checklist block.
 */

export const substrates: CompatibilityTable = {
  caption: "Internal wall substrates and what each needs confirmed",
  rows: [
    {
      condition: "New brickwork or blockwork",
      approach:
        "Bare, clean masonry is the substrate cement render was developed for, so the questions are about readiness rather than suitability.",
      confirm:
        "That the wall is flat and plumb enough for the finish chosen, chases for cables and pipes are filled, and the masonry has cured to the point the product data requires.",
    },
    {
      condition: "AAC or Hebel panel",
      approach:
        "A coating system matched to the panel manufacturer’s specification and to the wall’s control-joint layout.",
      confirm:
        "The exact panel system on the drawings. Our guide to [rendering Hebel panels](/resources/rendering-hebel-panels-adelaide/) sets out the rest.",
    },
    {
      condition: "Previously painted or rendered wall",
      approach:
        "Sealing, priming or patching is often needed first, so absorption is even and the new coating adheres properly.",
      confirm:
        "The testing and preparation the proposed system’s technical literature requires, especially where the wall’s history is unknown.",
    },
    {
      condition: "Existing render that sounds hollow or has been patched",
      approach: "Treat it as a repair question before a finish question.",
      confirm:
        "How the repair scope is decided, which the [render repair guide](/resources/render-repair-adelaide/) explains.",
    },
    {
      condition: "Paint in a property built before 1980",
      approach:
        "Identify the lead risk before any coating is sanded or scraped indoors. The age of the house does not prove what is on one wall.",
      confirm:
        "How disturbing the paint will be managed, before preparation starts.",
    },
    {
      condition: "Damp, bubbling paint or powdery deposits low on the wall",
      approach:
        "Have the moisture source assessed and dealt with first. Render applied over it does not stop the water.",
      confirm:
        "The cause, through a suitably qualified professional. We apply finishes; we do not diagnose or treat damp. See the [salt damp guide](/resources/salt-damp-adelaide/).",
    },
    {
      condition: "Framed wall with a sheet lining",
      approach:
        "A different build-up from masonry, and not automatically a candidate for a rendered finish.",
      confirm:
        "The lining, and what the selected render system is documented to go over.",
    },
    {
      condition: "Masonry meeting a lined frame in the same plane",
      approach:
        "A designed detail at the change, such as a joint, a bead or a shadow line, instead of a skim of render taken across it.",
      confirm: "Which detail is used and who forms it.",
    },
  ],
};

export const junctionDecisions: ComparisonTableData = {
  caption: "Internal junctions to settle before rendering starts",
  rowHeading: "Junction",
  columns: ["What to decide", "Why it matters"],
  rows: [
    {
      label: "Skirtings and floors",
      cells: [
        "Whether the render runs down behind the skirting or stops at a set line above the floor, and whether skirtings are fixed before or after.",
        "Finished floors need a known level to work to, and protection while the wall is wet.",
      ],
    },
    {
      label: "Ceilings",
      cells: [
        "A cornice, a shadow line or a square-set corner where the wall meets the ceiling lining.",
        "Each one changes which trade goes first.",
      ],
    },
    {
      label: "Door frames and window reveals",
      cells: [
        "Architraves or a square rendered return, who sets the beads that form each edge, and how the render meets the window frame.",
        "Render build changes the depth of a reveal and how far a frame sits proud of or behind the wall face.",
      ],
    },
    {
      label: "External corners",
      cells: [
        "The bead or corner detail in hallways, stairwells and garages.",
        "These corners take knocks, so the detail matters for wear as well as for line.",
      ],
    },
    {
      label: "Movement joints",
      cells: [
        "Where the articulation and control joints are, so the finish is not carried across them.",
        "A rigid finish taken across a joint relocates the stress into the surface instead of removing it.",
      ],
    },
    {
      label: "Changes of material",
      cells: [
        "A joint, a bead or a shadow line where masonry meets a framed and lined wall.",
        "Two materials that move differently are being asked to look like one.",
      ],
    },
    {
      label: "Power points, switches and services",
      cells: [
        "Positions set for the finished wall face, with boxes, outlets and penetrations in place before rendering.",
        "The render is worked neatly around them once, not cut and patched afterwards.",
      ],
    },
  ],
};

/** The guide's existing quote list, unchanged, rendered as a checklist. */
export const quoteChecklist: readonly ChecklistItem[] = [
  "The suburb, the type of property and whether it will be occupied during the work",
  "Which walls or rooms are involved, with drawings or approximate dimensions if you have them",
  "What each wall is built from and what is on it now",
  "The finish you have in mind, and any system already specified",
  "How you want the render to meet skirtings, reveals and ceilings",
  "The stage of the build or renovation and which trades come before and after",
  "Wall heights, stairwells and anything that limits access",
  "Any history of cracking, patching or damp in those walls",
];
