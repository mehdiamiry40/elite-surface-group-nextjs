import type { ComparisonTableData, GlossaryTerm } from "../blocks.ts";
import type { DecisionTable } from "../guide-blocks.ts";
import type { ServiceFaq } from "../services.ts";

/**
 * Blocks for the vertical vs horizontal cladding guide. Every row restates
 * what the guide's own sections and cited installation guides already say.
 */

export const comparison: ComparisonTableData = {
  caption: "Horizontal and vertical cladding, side by side",
  rowHeading: "What is compared",
  columns: ["Horizontal cladding", "Vertical cladding"],
  rows: [
    {
      label: "How the boards shed water",
      cells: [
        "Down the face of each board and over the top of the one below, in the direction the boards run.",
        "The boards do not lap water downward the way weatherboard does, which is why the cavity behind them is detailed differently.",
      ],
    },
    {
      label: "Cavity battens",
      cells: [
        "Fixed vertically to the studs, so water and air move straight down the cavity and out at the base of the wall.",
        "Fixed horizontally, and notched or castellated so moisture can still travel down and out instead of pooling on the batten.",
      ],
    },
    {
      label: "Where movement shows",
      cells: [
        "A continuous run of boards tends to hide a small amount of frame movement.",
        "At the sheet joints and control joints running up the wall, where spacing and flashing are more visible.",
      ],
    },
    {
      label: "Near the coast",
      cells: [
        "Fixings and cavity components need the corrosion-resistance class the manufacturer sets for the property’s distance from the coast.",
        "The same fastener rule applies, and moisture in the cavity travels further sideways before it reaches a drainage point.",
      ],
    },
    {
      label: "What sets the fixing pattern",
      cells: [
        "The installation guide for the chosen product, read against the site’s assessed wind classification.",
        "The same two documents, read for the vertical system and its batten profile.",
      ],
    },
  ],
};

export const decisions: DecisionTable = {
  caption: "Which orientation suits which situation",
  rows: [
    {
      situation: "The approved drawings already show an orientation",
      preference:
        "Build what is drawn. Orientation is a design decision made with the architect, designer or drafter.",
      confirm:
        "That the cavity batten profile on the drawings matches that orientation.",
    },
    {
      situation: "You want strong vertical lines on a feature wall",
      preference:
        "A vertical system on a notched or castellated horizontal batten.",
      confirm:
        "Where the sheet joints and control joints fall, because they stay visible on the finished wall.",
    },
    {
      situation: "The property is close to the coast",
      preference:
        "Either orientation can be specified. The fixings and cavity components carry the extra corrosive load, whichever way the boards run.",
      confirm:
        "The manufacturer’s coastal distance and corrosion-class requirements against the property’s actual distance from the coast. Our [coastal cladding maintenance guide](/resources/cladding-maintenance-coastal-adelaide/) covers upkeep afterwards.",
    },
    {
      situation: "The house sits on reactive clay",
      preference:
        "Either orientation, with documented control and movement joints. Horizontal boards tend to hide a little movement; a vertical system shows it at the joints.",
      confirm:
        "That the frame, the footing system and the manufacturer’s joint spacing agree on the drawings.",
    },
    {
      situation: "You want both directions on one façade",
      preference:
        "Mixing orientations as a design feature, with each section’s cavity, battens and flashing detailed for the orientation used there.",
      confirm:
        "A documented flashing detail at the junction between the two sections.",
    },
    {
      situation: "You are changing the cladding on an existing house",
      preference:
        "Check approval before choosing a profile. A change to the visible exterior, including a switch of orientation, can need development approval.",
      confirm:
        "The PlanSA portal or the local council, before material is ordered.",
    },
  ],
};

export const glossary: readonly GlossaryTerm[] = [
  {
    term: "Cavity batten",
    definition:
      "The batten fixed between the frame and the cladding. It forms the ventilation and drainage path behind the boards.",
  },
  {
    term: "Castellated batten",
    definition:
      "A horizontal batten with a notched profile, so moisture and air inside the cavity keep moving past it.",
  },
  {
    term: "Control joint",
    definition:
      "A planned joint that lets the wall move. Its spacing comes from the cladding manufacturer and is shown on the drawings.",
  },
  {
    term: "Wind classification",
    definition:
      "The site’s assessed wind category. Batten spacing and fixing schedules are set against it, not against a standard default.",
  },
];

/** Rendered as the visible FAQ list and emitted as FAQPage schema. */
export const faqs: readonly ServiceFaq[] = [
  {
    question: "Is vertical cladding more expensive than horizontal?",
    answer:
      "Material and labour costs depend on the specific product, panel size and site access, not the orientation alone. Ask for a quote against the documented system rather than assuming one direction costs more.",
  },
  {
    question:
      "Can vertical and horizontal cladding be combined on the same house?",
    answer:
      "Yes—many Adelaide façades mix orientations as a design feature, provided each section’s cavity, battens and flashing are detailed for the orientation used in that section. The junction between the two needs its own documented flashing detail.",
  },
  {
    question: "Can Elite Surface Group choose the orientation for us?",
    answer:
      "No. Orientation is a design decision made with the architect, designer or drafter, usually shown on the elevations. We install the documented cladding and cavity system once that decision, and the supporting drawings, are confirmed.",
  },
];
