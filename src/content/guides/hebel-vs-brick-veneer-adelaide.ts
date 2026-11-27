import type { ComparisonTableData, GlossaryTerm } from "../blocks.ts";
import type { DecisionTable } from "../guide-blocks.ts";
import type { ServiceFaq } from "../services.ts";

/**
 * Blocks for the Hebel vs brick veneer guide. The table compares how the two
 * walls are built, finished and scoped. Like the guide, it carries no
 * insulation, fire or acoustic figure: those belong to the certification for
 * the specific assembly.
 */

export const comparison: ComparisonTableData = {
  caption: "Brick veneer and Hebel panels, side by side",
  rowHeading: "What is compared",
  columns: ["Brick veneer", "Hebel panels"],
  rows: [
    {
      label: "How the skin is built",
      cells: [
        "A single leaf of masonry standing off the frame, tied back at intervals, with a cavity between the two.",
        "Steel-reinforced autoclaved aerated concrete panels fixed vertically to top hat sections on the frame, then jointed and coated.",
      ],
    },
    {
      label: "How water is kept out",
      cells: [
        "A drained cavity. Water that gets through the outer leaf runs down its back and out at the flashings.",
        "The jointing and the coating, installed as documented.",
      ],
    },
    {
      label: "Weight on the footing",
      cells: [
        "Clay brick is the heavier skin, which the engineer allows for in the footing and frame design.",
        "Substantially lighter, which the engineer accounts for in the same design.",
      ],
    },
    {
      label: "Wall thickness",
      cells: [
        "A brick leaf plus its cavity.",
        "Usually a thinner build-up, which matters on a narrow allotment.",
      ],
    },
    {
      label: "When the surface is finished",
      cells: [
        "Face brick is finished the day it is laid.",
        "Not until the coating system is complete.",
      ],
    },
    {
      label: "Movement joints",
      cells: [
        "Needs articulation or control joints, set out from its own documents.",
        "Needs them too, but they land in different places and come from the panel system’s documents.",
      ],
    },
    {
      label: "Upkeep",
      cells: [
        "Face brick is repointed and cleaned rather than recoated. Rendering it adds a coating trade and a maintenance cycle.",
        "The coating is part of the system, so recoating follows the interval in the product literature.",
      ],
    },
    {
      label: "Scope to settle in writing",
      cells: [
        "The bricklayer, the flashings, the weepholes and any render trade.",
        "Who supplies the top hats and fixings, installs the panels, does the jointing, applies the coating and owns the window junctions.",
      ],
    },
  ],
};

export const decisions: DecisionTable = {
  caption: "Which wall suits which situation",
  rows: [
    {
      situation: "You want exposed face brick",
      preference:
        "Brick veneer. Face brick is essentially the finished surface, kept up by repointing and cleaning rather than recoating.",
      confirm:
        "The coastal exposure, which is harder on fixings and lintels, and any overlay on the allotment.",
    },
    {
      situation: "You want a rendered look either way",
      preference:
        "Either. The comparison narrows to buildability and programme, because both walls end up on the same recoating footing.",
      confirm:
        "That each quote names who does the jointing, the coating and the junctions.",
    },
    {
      situation: "The allotment is narrow",
      preference:
        "A panel on top hats is usually the thinner wall than a brick leaf plus its cavity.",
      confirm: "The documented build-up on the drawings.",
    },
    {
      situation: "You are adding an upper level over an existing house",
      preference:
        "Sometimes Hebel. Weight is one reason lighter systems come up in addition projects.",
      confirm:
        "That the existing footings and frame have been assessed for the added load. Our [second-storey addition guide](/resources/second-storey-addition-adelaide/) covers that assessment.",
    },
    {
      situation: "The site is on reactive clay",
      preference:
        "Neither yet. The site classification and footing design come first and the wall system follows.",
      confirm: "The soil report and the footing design it leads to.",
    },
    {
      situation: "The site is near the coast or on the Hills fringe",
      preference:
        "Either can be documented. Durability requirements follow the exposure category, and bushfire-prone designation adds its own.",
      confirm:
        "The exposure, whether the allotment is bushfire-prone, and any heritage or character overlay, before price enters the conversation.",
    },
    {
      situation: "You are choosing on price",
      preference:
        "Whichever comes out ahead on two comparable quotes for the same documented scope.",
      confirm:
        "That both quotes are based on your drawings. A figure quoted without them is a guess.",
    },
  ],
};

export const glossary: readonly GlossaryTerm[] = [
  {
    term: "Veneer",
    definition:
      "A skin that does not carry the roof. In both systems the frame behind the wall does that.",
  },
  {
    term: "AAC",
    definition:
      "Autoclaved aerated concrete, the steel-reinforced material Hebel panels are made from.",
  },
  {
    term: "Cavity",
    definition:
      "The gap between a brick leaf and the frame. It is how brick veneer sheds water away from the frame.",
  },
  {
    term: "Top hat section",
    definition:
      "The manufacturer’s perforated section fixed to the frame, which the Hebel panels are fixed to in turn.",
  },
  {
    term: "Coating system",
    definition:
      "The finish qualified for the panel product. On a Hebel wall it is part of the system, not a decorating choice made afterwards.",
  },
];

/** Rendered as the visible FAQ list and emitted as FAQPage schema. */
export const faqs: readonly ServiceFaq[] = [
  {
    question: "Is one system warmer than the other?",
    answer:
      "Thermal performance comes from the whole assembly, and in both systems most of the insulation sits in the frame. Compare the R-Value the documented build-up achieves against the climate zone 5 requirement, not the two skins against each other.",
  },
  {
    question: "Can Hebel be used on an upper level over an existing house?",
    answer:
      "Sometimes—it is one reason lighter systems come up in addition projects—but the existing footings and frame have to be assessed for the added load first. Our second-storey addition guide covers that assessment.",
  },
  {
    question: "Will a Hebel wall look different to rendered brick?",
    answer:
      "Finished well, the difference is hard to pick from the street. Where you do see it is in the joint layout and the reveal depths, because the two walls are different thicknesses.",
  },
  {
    question: "Which one is cheaper?",
    answer:
      "It depends on the design, site access, frame, finish and programme. The honest answer comes from two comparable quotes on the same documented scope; treat a figure quoted without your drawings as a guess.",
  },
];
