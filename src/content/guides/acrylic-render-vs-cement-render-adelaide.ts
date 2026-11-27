import type { ComparisonTableData, GlossaryTerm } from "../blocks.ts";
import type { DecisionTable } from "../guide-blocks.ts";

/**
 * Blocks for the acrylic vs cement render guide. The comparison table carries
 * the guide's "at a glance" points as a real grid; the decision guide and the
 * glossary restate what its own sections and linked guides already say.
 */

export const comparison: ComparisonTableData = {
  caption: "Cement render and acrylic render, as general families",
  rowHeading: "What is compared",
  columns: ["Cement render", "Acrylic render"],
  rows: [
    {
      label: "What it is",
      cells: [
        "Cement, sand and water, mixed and applied over masonry in one or more coats.",
        "A pre-mixed, polymer-based coating, usually applied as one layer of a coordinated system.",
      ],
    },
    {
      label: "Movement tolerance",
      cells: [
        "Sets hard and rigid, so it is more likely to show hairline cracking when the wall behind it moves.",
        "Has some flexibility and copes better with minor movement. Like cement render, it does not bridge structural cracking or stand in for a movement joint.",
      ],
    },
    {
      label: "Substrates it suits",
      cells: [
        "Developed for bare masonry such as brick, block and stone.",
        "Formulated for a wider range of prepared surfaces, including fibre cement sheeting and some previously painted walls, where the system documents allow it.",
      ],
    },
    {
      label: "Application and curing",
      cells: [
        "Mixed on site and has to cure, so the mix, the coat thickness and the curing conditions all shape the result.",
        "Arrives pre-mixed and dries rather than cures, inside the temperature and weather limits on its data sheet.",
      ],
    },
    {
      label: "Finish and colour",
      cells: [
        "Commonly finished with a separate texture coat or paint system over the top.",
        "Texture coats come in grades from smooth to coarse and can carry the colour in the coating itself.",
      ],
    },
    {
      label: "How a repair is made",
      cells: [
        "Cut back and patched with a compatible repair render, then the texture and coating are made good over the top.",
        "Patched by matching its grade and profile by hand.",
      ],
    },
    {
      label: "Upkeep",
      cells: [
        "Periodic washing and eventual recoating, on a cycle set by the system, the colour and the exposure.",
        "The same. The cycle follows the system, the colour and the exposure, not the render type.",
      ],
    },
    {
      label: "Used together",
      cells: [
        "Often the base coat, levelled over masonry.",
        "Often the compatible texture coat applied over that base, which is a common documented combination.",
      ],
    },
  ],
};

export const decisions: DecisionTable = {
  caption: "Which render system usually suits which wall",
  rows: [
    {
      situation: "Bare, sound brick, block or stone",
      preference:
        "A cement base coat, on the substrate it was developed for, commonly finished with a compatible acrylic texture coat.",
      confirm:
        "The full system, base coat to topcoat, against the manufacturer’s technical data sheet.",
    },
    {
      situation: "Fibre cement sheeting",
      preference:
        "An acrylic base coat formulated for it. The sheet moves and flexes with temperature in a way a rigid cement mix does not accommodate well.",
      confirm: "That the system is documented for that sheet.",
    },
    {
      situation: "Hebel (AAC) panel walls",
      preference:
        "A coating system matched to the panel manufacturer’s specification and control-joint layout.",
      confirm:
        "The panel system’s coating documents. Our guide to [rendering Hebel panels](/resources/rendering-hebel-panels-adelaide/) covers what that involves.",
    },
    {
      situation: "Previously painted brick",
      preference:
        "Neither, until the existing coating’s condition has been assessed.",
      confirm:
        "How well the paint is bonded and what is behind it. See [rendering over painted brick](/resources/rendering-over-painted-brick-adelaide/).",
    },
    {
      situation: "A rendered or painted wall that is already cracking",
      preference:
        "Neither yet. Acrylic tolerates minor movement better, but a crack caused by footing or structural movement comes through either system.",
      confirm:
        "The cause, before a new coating goes over it. The [render cracking guide](/resources/render-cracking-adelaide/) covers the signs that need assessment first.",
    },
    {
      situation: "Salt damp near the base of an older wall",
      preference:
        "Neither. No render fixes the moisture behind it, and coating over it usually makes the damage worse.",
      confirm:
        "What has to be assessed before any render is considered. Start with [salt damp in Adelaide homes](/resources/salt-damp-adelaide/).",
    },
    {
      situation: "An elevation close to the coast",
      preference:
        "The system whose documented exposure limits cover the site. Colour and the washing routine matter more there than the label on the base coat.",
      confirm:
        "Written confirmation that the system suits the property’s coastal exposure.",
    },
  ],
};

export const glossary: readonly GlossaryTerm[] = [
  {
    term: "Solid render",
    definition:
      "Another name for traditional cement render, also called sand-and-cement render.",
  },
  {
    term: "Polymer render",
    definition:
      "Another name for acrylic render: a pre-mixed, water-based coating built around acrylic polymers rather than cement alone.",
  },
  {
    term: "Base coat",
    definition:
      "The first layer of a render system. It levels the wall and produces an even surface for the finish.",
  },
  {
    term: "Texture coat",
    definition:
      "The finishing layer. Its grade runs from smooth to coarse, and an acrylic texture coat can carry the colour.",
  },
  {
    term: "Technical data sheet",
    definition:
      "The manufacturer’s document for one product. It decides what that system can do on a particular wall, including its temperature and weather limits.",
  },
];
