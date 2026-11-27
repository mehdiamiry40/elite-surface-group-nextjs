import type { ChecklistItem, GlossaryTerm } from "../blocks.ts";
import type { DecisionTable } from "../guide-blocks.ts";

/**
 * Blocks for the quote-drivers guide. Like the guide itself, they carry no
 * price, rate, range or weighting: each row says why a factor moves a quote
 * and what the quote needs to know about it.
 */

export const quoteDrivers: DecisionTable = {
  caption: "What moves a quote, and what the quote needs to know",
  columns: [
    "What moves a quote",
    "Why it moves it",
    "What the quote needs to know",
  ],
  rows: [
    {
      situation: "Scope and area",
      preference:
        "The shape of the work matters as much as the total. Setting up, reaching the work and finishing every edge do not shrink in step with the area.",
      confirm:
        "Drawings, elevations or measurements, and which walls are in scope.",
    },
    {
      situation: "Substrate condition and preparation",
      preference:
        "Preparation is often most of the work. An existing wall with old coatings, cracks or uneven surfaces needs more done to it than a new, sound substrate.",
      confirm:
        "What the wall is built from and what is on it now: photographs and a description for an existing building, the specification for a new one.",
    },
    {
      situation: "System and finish specified",
      preference:
        "A system is more than its visible face. Framing or battens, fixings, flashings and junction details differ between systems, and so do render coats and finish grades.",
      confirm:
        "The product or system, if one has been chosen. If not, say so, and the quote can state what it has assumed.",
    },
    {
      situation: "Access, height and site constraints",
      preference:
        "Work at height brings scaffold or other access equipment into the job: who provides it, where it can stand and how long it stays.",
      confirm:
        "How high the work is, and anything that limits set-up, such as narrow side boundaries, a sloping block, established gardens or little room for deliveries.",
    },
    {
      situation: "Junctions and detail density",
      preference:
        "Windows, doors, corners, parapets and penetrations are edges, and edges are where the time goes.",
      confirm:
        "Drawings or photographs that show the openings. They are more useful than a single area figure.",
    },
    {
      situation: "Exposure",
      preference:
        "Coastal, wind-exposed and bushfire-prone sites change the specification before they change the quote.",
      confirm:
        "The suburb or postcode, and any exposure or Bushfire Attack Level information already confirmed for the site.",
    },
    {
      situation: "New, existing or occupied building",
      preference:
        "An existing building adds old finishes, services on the wall and surroundings to protect. An occupied one adds protection, staging and a tidy site each day.",
      confirm:
        "Which of the three it is, and whether existing material is being removed first and by whom.",
    },
    {
      situation: "Programme, staging and other trades",
      preference:
        "A job split into stages around other trades adds return visits to the scope.",
      confirm:
        "What the programme depends on, and which trades finish before the wall is ready.",
    },
    {
      situation: "Who supplies the materials",
      preference:
        "Supply by the installer, the builder or the owner changes what the quote contains and who is responsible for quantities, delivery, storage and any shortfall.",
      confirm: "Which supply arrangement the quote should be based on.",
    },
  ],
};

export const glossary: readonly GlossaryTerm[] = [
  {
    term: "Scope",
    definition:
      "The description of work a quote attaches its number to: which walls, which system and who does what.",
  },
  {
    term: "Assumption",
    definition:
      "Something the quote could not confirm and has taken as given, such as the condition of a wall behind an old finish.",
  },
  {
    term: "Exclusion",
    definition:
      "Work the quote leaves out. It still has to be done, and paid for, somewhere.",
  },
  {
    term: "Variation",
    definition:
      "A change to the agreed scope after work starts, whether it comes from a discovery behind an old finish or from a change you ask for.",
  },
  {
    term: "Junction",
    definition:
      "Where the work meets an opening, a corner or another material. Each one needs its flashings, beads, trims or returns formed and aligned.",
  },
  {
    term: "Making good",
    definition:
      "Repairing adjoining finishes, such as window frames, paving, floors or paintwork, once the work beside them is done.",
  },
];

export const acceptChecklist: readonly ChecklistItem[] = [
  {
    label: "The system is named",
    detail:
      "The quote names the product or system it is based on, or states what it assumed where none has been chosen.",
  },
  {
    label: "The scope boundaries are stated",
    detail:
      "Who prepares the substrate, who provides access equipment, who forms each junction and who applies the final coating.",
  },
  {
    label: "Material supply is assigned",
    detail:
      "Which arrangement the quote is based on, and who is responsible for quantities, delivery and storage on site.",
  },
  {
    label: "The assumptions are written down",
    detail:
      "What the quote takes as given about the condition of the wall, the access available and the programme.",
  },
  {
    label: "The exclusions are listed",
    detail:
      "What the quote leaves out, and who is expected to carry that work.",
  },
  {
    label: "Unknowns have a process",
    detail:
      "How a discovery will be reported, how additional work will be priced and who approves it before it proceeds.",
  },
];
