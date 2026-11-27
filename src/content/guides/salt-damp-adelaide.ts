import type { ChecklistItem, GlossaryTerm } from "../blocks.ts";
import type { ProblemsTableData } from "../guide-blocks.ts";
import type { ServiceFaq } from "../services.ts";

/**
 * Blocks for the salt damp guide. The guide's position is unchanged: render
 * does not fix rising damp, and the cause is assessed by someone else first.
 */

export const dampSigns: ProblemsTableData = {
  caption: "Salt damp signs, what they can indicate and what to do next",
  rows: [
    {
      problem: "A tide mark or band of discolouration along the lower wall",
      indicates:
        "Ground water rising through masonry that has no working damp-proof course. A nearby water source can leave a similar band.",
      next: "Photograph the band on each elevation, inside and out, with the date and something for scale.",
    },
    {
      problem: "White, powdery deposits on brick, stone or mortar",
      indicates:
        "Dissolved salts left behind as water evaporates at the wall surface.",
      next: "Record where the deposits sit and how high they reach, and have the moisture source assessed before any coating is considered.",
    },
    {
      problem: "Soft mortar, or brick and stone faces fretting and flaking",
      indicates: "Salt concentrating in masonry that has stayed wet.",
      next: "Ask the assessor whether a damp-proof course exists and what condition it is in.",
    },
    {
      problem: "Paint or render bubbling, blistering and letting go in one band",
      indicates:
        "Moisture and salts behind the coating. Salts that crystallise behind a coating can push it off the wall.",
      next: "Hold off patching or recoating. A finish is worth specifying only once the wall is dry and stable.",
    },
    {
      problem: "A damp band that has climbed above earlier render",
      indicates:
        "A dense coating has moved the evaporation point further up the wall without stopping the water.",
      next: "Treat it as a moisture problem, and have the source found and dealt with before any surface work.",
    },
    {
      problem:
        "Damage beside a downpipe, tap, garden bed or paving that falls back to the wall",
      indicates:
        "A local water source keeping the masonry wet, which can look like salt damp.",
      next: "Fix what can be fixed without touching the wall, then note whether the band rises, falls or stays put across a season.",
    },
    {
      problem: "Musty smells, or skirtings and plaster deteriorating inside",
      indicates:
        "Moisture reaching the inside face. A failed shower or a blocked subfloor vent can produce similar damage.",
      next: "Note the room and the wall, and include both in the independent assessment.",
    },
  ],
};

export const finishReadiness: readonly ChecklistItem[] = [
  {
    label: "The assessment",
    detail:
      "Who assessed the moisture source and the wall construction, and what they found about the damp-proof course.",
  },
  {
    label: "What was done about the source",
    detail:
      "The drainage, ground-level or damp-proofing work carried out, and which specialist did it.",
  },
  {
    label: "The drying interval",
    detail:
      "The interval the remediation specialist set before the wall can be finished.",
  },
  {
    label: "The finish specification",
    detail:
      "The coating system specified to suit the masonry, and who wrote the specification.",
  },
  {
    label: "Dated photographs",
    detail:
      "The affected band on each elevation, inside and out, with something for scale.",
  },
  {
    label: "The house",
    detail: "The suburb and the age of the house.",
  },
  {
    label: "The heritage position",
    detail:
      "Whether the building is a State or local heritage place or sits in a heritage area, and any approval already in hand.",
  },
  {
    label: "Old coatings",
    detail:
      "How silica dust and any lead-based paint will be controlled if existing render or paint has to come off.",
  },
];

export const glossary: readonly GlossaryTerm[] = [
  {
    term: "Salt damp",
    definition:
      "Ground water that rises through masonry with no working damp-proof course, carrying dissolved salts and leaving them behind as it evaporates at the wall surface.",
  },
  {
    term: "Damp-proof course",
    definition:
      "The barrier built into a masonry wall to stop ground water rising through it. Where one is missing or has failed, the remedy is a specialist trade, not a render trade.",
  },
  {
    term: "Vapour permeability",
    definition:
      "How readily a coating lets moisture leave the wall. On older walls it is part of the specification, alongside adhesion.",
  },
  {
    term: "Exposure-grade masonry unit",
    definition:
      "A masonry unit intended for conditions that include attack by salts in ground water below the damp-proof course, and for sea fronts.",
  },
];

/** Rendered as the visible FAQ list and emitted as FAQPage schema. */
export const faqs: readonly ServiceFaq[] = [
  {
    question: "Will rendering the wall stop the damp?",
    answer:
      "No. A coating changes where the moisture leaves the wall, not whether it arrives. On a wall without a working damp-proof course, a dense render commonly pushes the problem higher and then fails along the same band.",
  },
  {
    question: "Do we have to remove the existing render?",
    answer:
      "Sometimes, and it depends on what is behind it and what the remediation design calls for. On a heritage place, removal may itself need approval. That decision belongs in the assessment, not in a rendering quote.",
  },
  {
    question: "How long before the wall can be finished?",
    answer:
      "A wall that has been wet for years does not dry in a fortnight, and the drying time depends on the thickness, the masonry, the salt load and the weather. The specialist doing the remediation should set the interval; treat a fixed number offered without an inspection as a warning sign.",
  },
  {
    question: "Can Elite Surface Group diagnose or treat salt damp?",
    answer:
      "No. We install and finish walls; we do not diagnose structural or moisture defects. Have the cause assessed by a suitably qualified professional, such as a building consultant or a heritage specialist where the building warrants one, before a repair scope is written. Our render work starts once the wall is dry and stable, to a specification someone else has written.",
  },
];
