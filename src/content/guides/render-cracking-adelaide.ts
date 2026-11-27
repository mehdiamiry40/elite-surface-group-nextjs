import type { GlossaryTerm } from "../blocks.ts";
import type { DecisionTable, ProblemsTableData } from "../guide-blocks.ts";
import type { ServiceFaq } from "../services.ts";

/**
 * Blocks for the render cracking guide. Each row restates what the guide's
 * own sections already say; none of it diagnoses a wall.
 */

export const crackSigns: ProblemsTableData = {
  caption: "Crack signs, what they can indicate and what to do next",
  rows: [
    {
      problem: "A fine hairline that looks the same in each dated photograph",
      indicates:
        "It may be limited to the coating. Appearance alone cannot show whether the substrate is moving.",
      next: "Keep the record going, and confirm the cause and stability before choosing a repair.",
    },
    {
      problem:
        "A crack running from a window corner, or where two wall materials meet",
      indicates:
        "The connected materials may be moving differently, or a movement joint may have been rendered across.",
      next: "Have the junction and any joint detailing checked before the finish is repaired.",
    },
    {
      problem: "A crack that opens in one season and closes in another",
      indicates:
        "Seasonal ground movement can be one contributor where reactive clay is present. It is not the cause of every Adelaide crack.",
      next: "Repeat the same photographs and measurements through the seasons, and seek structural or geotechnical advice where movement is suspected.",
    },
    {
      problem:
        "A crack that continues into the masonry or shows on both faces of the wall",
      indicates: "The wall itself may be affected, not only the finish.",
      next: "Arrange prompt assessment by a structural or civil engineer.",
    },
    {
      problem:
        "Cracking alongside sticking doors or windows, sloping floors or displaced trim",
      indicates:
        "Distortion in the building around the wall, which points beyond the render.",
      next: "Arrange prompt professional assessment. If a wall appears unstable, keep clear.",
    },
    {
      problem: "The same crack returning after it was filled or painted",
      indicates:
        "Movement, moisture, failed adhesion or joint detailing beneath the surface may still be active.",
      next: "Have the underlying condition assessed before another cosmetic repair.",
    },
    {
      problem:
        "Cracking with damp staining, failed sealant or a leaking gutter or downpipe nearby",
      indicates: "Moisture may be contributing to the damage.",
      next: "Note what is readily visible without excavating or disturbing the wall, and include it in the record you give the assessor.",
    },
    {
      problem: "Render that has come away from the wall over a broad area",
      indicates:
        "Failure in the substrate or coating system, which is a different condition from a stable surface blemish.",
      next: "Expect broader removal to be considered. A local patch suits a defect confined to the finish on a sound, dry substrate.",
    },
  ],
};

export const repairDecisions: DecisionTable = {
  caption: "Local repair or broader re-render: how the findings point",
  columns: ["What the assessment finds", "What usually suits", "Still to confirm"],
  rows: [
    {
      situation:
        "The defect is confined to the finish, and the substrate is sound and dry",
      preference: "A local repair may be reasonable.",
      confirm:
        "That movement has stopped or been controlled, the joints remain functional and a compatible repair can be blended acceptably.",
    },
    {
      situation: "Adhesion failure is widespread",
      preference: "Broader removal or wall-to-wall refinishing.",
      confirm: "How far the loss of bond extends beyond the visible damage.",
    },
    {
      situation: "Moisture remains active",
      preference: "Broader removal may be more appropriate than a patch.",
      confirm:
        "Where the water is coming from, and that the source has been dealt with.",
    },
    {
      situation: "Many cracks recur, or the previous coating is incompatible",
      preference: "Broader removal or wall-to-wall refinishing.",
      confirm:
        "What is on the wall now, and which repair system is compatible with it.",
    },
    {
      situation: "Joint detailing needs correction",
      preference:
        "A broader scope that reinstates the joints instead of rendering across them.",
      confirm:
        "Where the articulation, control and expansion joints are meant to sit.",
    },
    {
      situation: "A local patch cannot produce an acceptable finish",
      preference: "Wall-to-wall refinishing.",
      confirm:
        "Where the new finish will stop. Our [render repair guide](/resources/render-repair-adelaide/) explains how that line is chosen.",
    },
    {
      situation: "Structural or substrate movement is still active",
      preference:
        "Neither yet. Active movement needs to be resolved before either option is treated as a durable repair.",
      confirm:
        "Assessment by a structural, civil or geotechnical professional, as the signs suggest.",
    },
  ],
};

export const glossary: readonly GlossaryTerm[] = [
  {
    term: "Reactive clay",
    definition:
      "Soil that swells as it gains moisture and shrinks as it dries. Where it sits beneath a building, seasonal moisture change can move footings and brittle masonry.",
  },
  {
    term: "Movement joint",
    definition:
      "An articulation, control or expansion joint, intended to accommodate movement. A rigid render carried across one can relocate the stress into the finish.",
  },
  {
    term: "Substrate",
    definition:
      "The wall behind the render. Render needs a suitable, sound substrate and the correct preparation for the selected system.",
  },
  {
    term: "Substrate suction",
    definition:
      "How strongly the wall draws water out of fresh render. Excessive suction can interfere with hydration in cement render and contribute to early cracking or poor bond.",
  },
  {
    term: "Site classification",
    definition:
      "The soil category for a property, which a geotechnical report usually provides.",
  },
];

/** Rendered as the visible FAQ list and emitted as FAQPage schema. */
export const faqs: readonly ServiceFaq[] = [
  {
    question: "Can I simply fill a hairline render crack?",
    answer:
      "Not safely as a universal rule. A fine line may be limited to the coating, but appearance alone cannot show whether the substrate is moving. Record it, check the context and confirm the cause and stability before choosing a repair.",
  },
  {
    question: "Why does the same crack return after painting?",
    answer:
      "Paint or filler may cover the visible line without addressing movement, moisture, failed adhesion or joint detailing beneath it. If the underlying condition remains active, the symptom can reappear.",
  },
  {
    question: "Can Elite diagnose the cause from one photograph?",
    answer:
      "No. Photos are useful for initial context, but the wall, substrate, history and surrounding building conditions may need on-site or independent assessment before a repair scope is appropriate.",
  },
  {
    question: "Is every render crack in Adelaide caused by reactive clay?",
    answer:
      "No. Seasonal ground movement can be one contributor where reactive clay is present, but soil, footing design, construction type, drainage, nearby vegetation and the wall system all vary by property. Preparation, moisture, junction detailing, curing and ageing can matter too.",
  },
];
