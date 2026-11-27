import type { ChecklistItem, ComparisonTableData } from "../blocks.ts";
import type { ServiceFaq } from "../services.ts";

/**
 * Blocks for the load-bearing wall removal guide. Each row restates who the
 * guide already says confirms or carries a stage. Nothing here is structural
 * advice: whether a wall can come out is a structural engineer's assessment.
 */

export const stages: ComparisonTableData = {
  caption: "Load-bearing wall removal, stage by stage",
  rowHeading: "Stage",
  columns: [
    "Who or what settles it",
    "What should be in hand before moving on",
  ],
  rows: [
    {
      label: "Confirming the wall",
      cells: [
        "A structural engineer, from the drawings and, in an established or altered home, an on-site inspection.",
        "A confirmed answer for that wall. Appearance and rules of thumb can only suggest it.",
      ],
    },
    {
      label: "Designing the opening",
      cells: [
        "The structural engineer.",
        "A signed and dated design for the beam, the posts and their footings, and how the new work connects to the existing structure.",
      ],
    },
    {
      label: "Consent",
      cells: [
        "A building certifier or the PlanSA portal. Some properties, such as those in a Local Heritage overlay, may need planning consent as well.",
        "Confirmation of whether building consent is required for the property and the work, and the consent itself where it is.",
      ],
    },
    {
      label: "Services in the wall",
      cells: [
        "Located before demolition and safely relocated before the structural stage begins.",
        "A record of the wiring, data cabling, plumbing or ducting inside or near the wall.",
      ],
    },
    {
      label: "Temporary propping",
      cells: [
        "Set out in the engineer’s design, and carried out or supervised by the licensed building work contractor.",
        "The propping method, and how long the old wall stays supported.",
      ],
    },
    {
      label: "Structural demolition, beam and posts",
      cells: [
        "A licensed building work contractor, who carries out or supervises the engineered work.",
        "The new beam and posts installed and carrying load on their own, and the structural stage signed off.",
      ],
    },
    {
      label: "Framing, linings and finishes",
      cells: [
        "The Elite Surface Group walling team, once the structural stage is signed off.",
        "The opening’s framing connected to the existing structure at the junctions, with linings, cornices and finishes brought back to a coordinated result.",
      ],
    },
  ],
};

export const assessmentChecklist: readonly ChecklistItem[] = [
  {
    label: "Any drawings of the house",
    detail:
      "The original plans and anything drawn for later work. The engineer works from the drawings as well as the site.",
  },
  {
    label: "A history of earlier changes",
    detail:
      "Renovations, additions or roof changes can shift what a wall is actually doing.",
  },
  {
    label: "What sits above and below the wall",
    detail:
      "An upper storey, or a beam, post or wall on the floor below, as far as you can see without opening anything up.",
  },
  {
    label: "Known services in the wall",
    detail:
      "Wiring, data cabling, plumbing or ducting that will need to be identified and relocated.",
  },
  {
    label: "The opening you have in mind",
    detail:
      "Whether the wall comes out entirely, a doorway is widened or a kitchen is opened up.",
  },
  {
    label: "The property and any overlay",
    detail:
      "The suburb, and whether a Local Heritage overlay applies, because some properties need planning consent as well as building consent.",
  },
  {
    label: "Whether the wall is external",
    detail:
      "Near the coast, exposed steel fixings and brackets need a corrosion class suited to the exposure.",
  },
];

/** Rendered as the visible FAQ list and emitted as FAQPage schema. */
export const faqs: readonly ServiceFaq[] = [
  {
    question: "Can Elite Surface Group tell me if a wall is load-bearing?",
    answer:
      "No. Appearance and general rules of thumb can suggest it, but only a structural engineer working from the drawings and, where needed, an on-site inspection can confirm it.",
  },
  {
    question: "Do I need council approval to remove an internal wall?",
    answer:
      "It depends on the property and the scope of work. Use PlanSA’s approval check or ask the relevant council or a certifier before demolition is scheduled.",
  },
  {
    question: "Can the old wall come out before the new beam is fitted?",
    answer:
      "Not safely. The wall is usually propped and left in place until the engineered beam and posts are installed and able to carry the load on their own.",
  },
  {
    question:
      "What part of a load-bearing wall removal does Elite Surface Group carry out?",
    answer:
      "The walling that follows the engineering. Our walling team installs the engineered opening’s framing, connects it to the existing structure at the junctions and coordinates with the certifier’s sign-off before linings and finishes proceed. We do not provide structural engineering advice, and the structural demolition, beam installation and propping are carried out or supervised by a licensed building work contractor.",
  },
];
