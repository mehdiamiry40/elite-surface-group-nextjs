import type { GlossaryTerm } from "../blocks.ts";
import type { DecisionTable, ProblemsTableData } from "../guide-blocks.ts";

/**
 * Blocks for the render repair guide. They sort the guide's own findings and
 * scopes into tables; the FAQs stay beside the page that renders them.
 */

export const scopeDecisions: DecisionTable = {
  caption: "Patch, partial re-render or full strip: which scope fits",
  columns: ["What the wall shows", "Scope that usually fits", "Still to confirm"],
  rows: [
    {
      situation: "Isolated damage with a known, finished cause",
      preference: "A local patch.",
      confirm:
        "That the surrounding render is sound and well bonded, and how much the patch edge will show mid-wall.",
    },
    {
      situation: "Several defects on one elevation",
      preference: "A partial re-render taken to a natural break.",
      confirm:
        "Which corner, opening, control joint or change of material the new work stops at.",
    },
    {
      situation: "A finish that will not blend mid-wall",
      preference:
        "A partial re-render, with the panel or the whole elevation recoated.",
      confirm:
        "Whether recoating the panel or the whole elevation is included in the quote.",
    },
    {
      situation: "Loss of bond across the wall",
      preference: "A full strip and re-render.",
      confirm:
        "What the masonry, the joints and the flashings show once the old render is off. Our guide to [preparing walls for render](/resources/preparing-walls-for-render-adelaide/) covers that stage.",
    },
    {
      situation:
        "An existing coating that is incompatible with anything going over it",
      preference: "A full strip and re-render.",
      confirm: "What the existing coating is, from records where they exist.",
    },
    {
      situation:
        "Repairs layered on repairs, or joint and junction detailing that needs correcting",
      preference: "A full strip and re-render.",
      confirm:
        "How joints, beads, openings and junctions with other materials will be treated.",
    },
    {
      situation: "Cracking with an unresolved cause, or salt damp",
      preference: "No render scope yet. The cause is settled first.",
      confirm:
        "Assessment by the appropriate professional and, for rising damp, that a specialist has dealt with the source and the wall has dried.",
    },
  ],
};

export const inspectionFindings: ProblemsTableData = {
  caption: "Inspection findings, what they can indicate and what to do next",
  rows: [
    {
      problem: "Render that sounds hollow when tapped",
      indicates:
        "Lost bond, usually called drummy render. The visible defect is rarely its full extent.",
      next: "Have the hollow area mapped at the inspection. A small, isolated hollow can be cut out and rebuilt; hollow render across an elevation points to a wider scope.",
    },
    {
      problem: "Fine, random crazing in the surface",
      indicates: "A defect confined to the coating, not the wall.",
      next: "Confirm the render beneath is sound. The job may be preparation and recoating, which our [repainting guide](/resources/repainting-render-adelaide/) covers.",
    },
    {
      problem:
        "A single line off a window corner, or a stepped line along the mortar joints",
      indicates: "A crack that may belong to the wall behind the finish.",
      next: "Record it and have the cause confirmed before a repair is priced. Our [render cracking guide](/resources/render-cracking-adelaide/) sets out who should assess it.",
    },
    {
      problem: "A crack that also shows on the inside face",
      indicates: "Cracking that continues through the wall.",
      next: "Arrange assessment by a structural engineer first. Their advice sets what the repair has to accommodate.",
    },
    {
      problem: "A crack where old work meets new, or over a movement joint",
      indicates: "Detailing that a repair has to correct instead of cover.",
      next: "Ask how the joint or junction will be treated in the repair scope.",
    },
    {
      problem: "Paint or texture that is flaking, blistering or chalking",
      indicates:
        "A failed or incompatible coating. The render beneath may still be sound.",
      next: "Have the coating and the bond checked. A coating that was never compatible usually has to come off before anything new will hold.",
    },
    {
      problem:
        "Staining, blistering or a powdery white deposit in one band of wall",
      indicates:
        "A moisture finding: a leak, a drainage fault or moisture rising from the ground.",
      next: "Have the source of the water identified before the render scope is written. Our [salt damp guide](/resources/salt-damp-adelaide/) explains why.",
    },
    {
      problem: "Damage from an impact, a removed fixture or a chased-in service",
      indicates: "A clear, finished cause on render that may otherwise be sound.",
      next: "A local patch can suit. Agree where it stops and whether the panel around it is recoated.",
    },
  ],
};

export const glossary: readonly GlossaryTerm[] = [
  {
    term: "Drummy render",
    definition:
      "Render that has let go of the wall behind it. It often sounds hollow when tapped.",
  },
  {
    term: "Crazing",
    definition: "Fine, random cracking confined to the coating.",
  },
  {
    term: "Natural break",
    definition:
      "A line the eye already expects: a corner, an opening, a control joint or a change of material. Stopping a repair there keeps the join off the open wall.",
  },
  {
    term: "Full strip",
    definition:
      "Taking the existing render back to the substrate and starting again.",
  },
  {
    term: "Raking light",
    definition:
      "Low light across the face of a wall. It is where a textured patch tends to show.",
  },
  {
    term: "Substrate",
    definition:
      "What the wall is built from behind the render: brick, block, AAC panel, a sheeted frame or older stone.",
  },
];
