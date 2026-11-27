import type { ComparisonTableData, GlossaryTerm } from "../blocks.ts";
import type { DecisionTable } from "../guide-blocks.ts";

/**
 * Blocks for the cladding vs render guide. The comparison table carries the
 * guide's "at a glance" points as a real grid, and every row restates what
 * the guide's own sections already say.
 */

export const comparison: ComparisonTableData = {
  caption: "Render and cladding compared on the points that change a scope",
  rowHeading: "What is compared",
  columns: ["Render", "Cladding"],
  rows: [
    {
      label: "How it is attached",
      cells: [
        "Applied wet, so it bonds to the wall and cures in place.",
        "Fixed mechanically over a frame or battens, with a cavity and a membrane behind it.",
      ],
    },
    {
      label: "What it needs behind it",
      cells: [
        "Masonry, an AAC panel system or a documented render base sheet.",
        "A frame, or a battened substrate it can be fixed to.",
      ],
    },
    {
      label: "How it handles movement",
      cells: [
        "Shows substrate movement as cracking.",
        "Conceals more of it, and tends to show it at the joints and junctions instead.",
      ],
    },
    {
      label: "Where water is managed",
      cells: [
        "At the surface. The coating is the exposed layer.",
        "Out of sight, by the flashings, the membrane and the cavity.",
      ],
    },
    {
      label: "How it looks",
      cells: [
        "One continuous plane in a chosen texture.",
        "An expressed pattern of boards, panels and joints that has to be set out.",
      ],
    },
    {
      label: "Near the coast",
      cells: [
        "The coating is the layer exposed to the salt.",
        "The fasteners, flashings and coated boards carry it.",
      ],
    },
    {
      label: "How it is repaired",
      cells: [
        "Patched and matched into a continuous texture.",
        "A damaged board is replaced individually.",
      ],
    },
    {
      label: "Where problems show",
      cells: [
        "At the surface, as cracks. The cause has to be settled before the cosmetic repair, or the same line comes back.",
        "Late. The membrane, flashings and cavity are invisible once the boards are on.",
      ],
    },
  ],
};

export const decisions: DecisionTable = {
  caption: "Which finish usually suits which wall",
  rows: [
    {
      situation: "A new build with a bare timber or steel frame",
      preference:
        "Cladding fixes to the frame directly. Render needs masonry, an AAC panel system or a documented render base sheet on that frame first.",
      confirm:
        "Which substrate the drawings show, because each one changes the trade sequence.",
    },
    {
      situation: "An existing home in sound, unpainted brick veneer",
      preference:
        "Render takes well with the right preparation. Cladding is also possible, as a battened, cavity-forming job with its own flashings.",
      confirm:
        "What the existing wall has to settle first. Our [guide to cladding over brick](/resources/cladding-over-brick-adelaide/) lists it.",
    },
    {
      situation: "The masonry has been painted",
      preference:
        "Render becomes an adhesion question, to be answered before a system is specified.",
      confirm:
        "The paint and the masonry behind it. The [rendering over painted brick guide](/resources/rendering-over-painted-brick-adelaide/) works through the checks.",
    },
    {
      situation: "The wall shows signs of salt damp",
      preference:
        "Neither finish fixes it, and coating over it usually makes the damage worse.",
      confirm:
        "The moisture source. Start with our [salt damp guide](/resources/salt-damp-adelaide/).",
    },
    {
      situation: "The house has a movement history",
      preference:
        "Neither is a remedy. A rendered wall shows the movement as cracking; a clad wall tends to show it at the joints.",
      confirm:
        "The cause, before a finish is chosen. The [guide to render cracking](/resources/render-cracking-adelaide/) sets out what to record.",
    },
    {
      situation: "A masonry ground floor with a framed upper level",
      preference:
        "Both. Render on the masonry and cladding on the frame puts each finish where its substrate already is.",
      confirm:
        "The level of the join, its flashing and which trade installs and seals it.",
    },
    {
      situation:
        "The allotment sits in a heritage or character area or the Hills Face Zone",
      preference:
        "Either may need planning consent, because both change the external appearance.",
      confirm:
        "The approval pathway for the allotment, before material is ordered.",
    },
  ],
};

export const glossary: readonly GlossaryTerm[] = [
  {
    term: "Substrate",
    definition:
      "The wall a finish goes onto: brickwork, blockwork, AAC panels such as Hebel, or a sheeted frame.",
  },
  {
    term: "Render base sheet",
    definition:
      "A proprietary sheet fixed to a frame so that a render system documented for it has something solid to bond to.",
  },
  {
    term: "Drained cavity",
    definition:
      "The gap battens create behind cladding, so water that gets past the face has somewhere to go.",
  },
  {
    term: "Flashing",
    definition:
      "The concealed trim that turns water out at windows, doors, corners, the base of the wall and every penetration.",
  },
];
