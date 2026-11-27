import type { GlossaryTerm } from "../blocks.ts";
import type { DecisionTable, ProblemsTableData } from "../guide-blocks.ts";

/**
 * Blocks for the facade recladding guide. They restate the guide's own
 * scopes, inspection points and terms; the FAQs stay beside the page.
 */

export const scopeDecisions: DecisionTable = {
  caption: "Maintenance, local repair or recladding: which scope fits",
  columns: ["What the facade shows", "Scope that usually fits", "Still to confirm"],
  rows: [
    {
      situation: "The cladding is sound and the wall behind it is dry",
      preference:
        "Maintenance: washing, recoating and resealing to the product’s current instructions.",
      confirm:
        "The manufacturer’s guidance for that exact product. Our [coastal cladding maintenance guide](/resources/cladding-maintenance-coastal-adelaide/) explains how to find it.",
    },
    {
      situation: "Damage with a known, local cause",
      preference:
        "A local repair: replacing damaged boards or panels, refixing a loose run or correcting one junction.",
      confirm:
        "That the same product, profile and finish can still be matched.",
    },
    {
      situation:
        "Deterioration spread across an elevation, or water behind the cladding at more than one junction",
      preference: "Recladding that elevation, planned as a construction project.",
      confirm:
        "The cause, established by a suitably qualified professional before a replacement system is chosen.",
    },
    {
      situation: "Repairs that keep being repeated",
      preference:
        "Recladding is worth considering, because the cause may sit behind the face.",
      confirm:
        "What is behind the cladding: the membrane, the cavity, the flashings and the frame.",
    },
    {
      situation:
        "A product, profile or finish that can no longer be matched or maintained",
      preference: "Recladding the affected elevation.",
      confirm:
        "A designed junction at the corners where new cladding meets old, since profile and colour may not match exactly.",
    },
    {
      situation: "Older sheeting confirmed to contain asbestos",
      preference:
        "Licensed removal first, then a replacement system installed from a cleared substrate.",
      confirm:
        "Who tests, who removes and who clears the area. Our guide to [replacing asbestos cladding](/resources/asbestos-cladding-replacement-adelaide/) sets out the order.",
    },
    {
      situation: "The building is getting a different facade",
      preference: "Recladding, with its own design, approvals and sequencing.",
      confirm:
        "The approval position for the allotment, before material is ordered.",
    },
    {
      situation: "The wall to be covered is brick or masonry",
      preference:
        "Overcladding, which is a different job to replacing cladding on a frame.",
      confirm:
        "What the masonry has to confirm first. Our guide to [cladding over brick](/resources/cladding-over-brick-adelaide/) covers it.",
    },
  ],
};

export const recordFindings: ProblemsTableData = {
  caption: "What the ground-level record can point to",
  rows: [
    {
      problem: "Loose, cracked or displaced boards in one area",
      indicates: "Damage with a local cause, which may suit a local repair.",
      next: "Record where it is, and ask whether the same product, profile and finish can still be matched.",
    },
    {
      problem:
        "Corrosion at fixings, cut edges, flashings or adjoining metalwork",
      indicates:
        "Exposure working on the metal components. Near the coast, corrosion-protection requirements can apply.",
      next: "Record each location, and have the corrosion environment confirmed for the site before a replacement is specified.",
    },
    {
      problem:
        "Open joints, or split or missing sealant at corners, openings and penetrations",
      indicates:
        "A junction where water can get in. Most water enters at a junction, not through the middle of a board.",
      next: "Record each one with its location. One junction can be a local repair; several point to a wider scope.",
    },
    {
      problem:
        "Staining, swollen linings or skirtings, or a musty smell inside",
      indicates:
        "Water may be reaching the wall behind the cladding. It can also enter from a roof, a window, a balcony or plumbing.",
      next: "Note when the marks appear, such as after rain, and have the source established before new cladding is chosen.",
    },
    {
      problem:
        "Earlier repairs, repaints or partial replacements on the same wall",
      indicates:
        "A place where a problem has already been chased, and a cause that may sit behind the face.",
      next: "Include the repair history in the record. Leave opening the wall up to a suitably qualified professional who can do it safely.",
    },
    {
      problem:
        "Older flat or profiled sheeting on a home built or renovated before the mid-1980s",
      indicates:
        "South Australian government guidance treats such a home as highly likely to contain asbestos products, and the sheeting may be one of them. Looking cannot settle it.",
      next: "Arrange sampling through an accredited laboratory before anyone drills, cuts or removes it.",
    },
    {
      problem: "A facade that looks tired, with no sign of moisture inside",
      indicates: "A wall that may only need maintenance.",
      next: "Check the manufacturer’s current instructions for that exact product before replacement is considered.",
    },
  ],
};

export const glossary: readonly GlossaryTerm[] = [
  {
    term: "Recladding",
    definition:
      "Removing the cladding layer from an elevation, or from the whole building, and installing a replacement system.",
  },
  {
    term: "Overcladding",
    definition:
      "Fixing a new system over a wall that stays where it is, such as brickwork.",
  },
  {
    term: "Hold point",
    definition:
      "The agreed pause before new cladding covers the wall again, so that what removal uncovered is dealt with first.",
  },
  {
    term: "Wind classification",
    definition:
      "The site’s assessed wind category. Fixing schedules are set against it.",
  },
  {
    term: "Corrosion environment",
    definition:
      "A mapped category that South Australian building guidance uses to help determine corrosion-protection requirements for certain building classes near the coast.",
  },
  {
    term: "Bushfire Attack Level",
    definition:
      "A site-specific assessment that may be needed in a designated bushfire-prone area before the cladding and the rest of the external wall are finalised.",
  },
];
