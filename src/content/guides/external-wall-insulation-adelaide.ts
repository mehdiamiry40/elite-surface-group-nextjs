import type { ChecklistItem, GlossaryTerm } from "../blocks.ts";
import type {
  CompatibilityTable,
  ProblemsTableData,
} from "../guide-blocks.ts";
import type { ServiceFaq } from "../services.ts";

/**
 * Blocks for the external wall insulation guide. They restate the guide's
 * own sections and cited sources, and add no R-value, rating or clause that
 * the guide does not already publish.
 */

export const wallTypes: CompatibilityTable = {
  caption: "Insulating the wall you already have",
  columns: ["Existing wall", "Where the upgrade sits", "Confirm first"],
  rows: [
    {
      condition: "Brick veneer",
      approach:
        "In the frame and the cavity, not in the brick you can see. The bricks contribute little, and adding foil or bulk insulation greatly increases the wall’s thermal resistance.",
      confirm:
        "What is in the cavity now and what the wall is doing with moisture. The cavity is there partly to drain.",
    },
    {
      condition: "Lightweight framed and clad",
      approach:
        "In the frame, where insulation is easy to add. The cladding adds no thermal mass, so the wall responds quickly to whatever the day is doing.",
      confirm:
        "The membrane, the cavity behind the cladding and how both stay continuous past every flashing and penetration.",
    },
    {
      condition: "AAC panel",
      approach:
        "The panel itself has significantly higher thermal resistance than normal concrete, with medium thermal mass.",
      confirm:
        "The system R-value from the current design and installation guide, for the panel and build-up actually specified.",
    },
    {
      condition: "Solid stone or double brick",
      approach:
        "There is no frame cavity to fill. The options are an internal lining, which costs floor area, or an external system, which changes the elevation.",
      confirm:
        "Where moisture can condense within the new build-up, with a suitably qualified professional, and the planning position on a character property.",
    },
  ],
};

export const siteLosses: ProblemsTableData = {
  caption: "Where a wall loses the R-value it was specified for",
  columns: ["What happens on site", "What it costs the wall", "What to confirm"],
  rows: [
    {
      problem: "Bulk insulation is compressed",
      indicates:
        "Compression erodes its R-value. A batt stuffed in behind a service run is no longer the batt that was specified.",
      next: "That the insulation drawn fits the frame depth and the services running through it.",
    },
    {
      problem: "A reflective membrane has no air gap",
      indicates:
        "Pressed flat against sheeting, it has lost the gap it needed to do anything.",
      next: "That the build-up leaves a suitable air gap beside the reflective surface.",
    },
    {
      problem: "The frame bridges the insulation",
      indicates:
        "Heat takes the easy path, and in a framed wall that path is the frame.",
      next: "Whether a continuous layer outside the studs is specified, and how window reveals, sills and corners resolve at the new depth.",
    },
    {
      problem: "The cavity is closed off",
      indicates:
        "Closed by a flashing, a batten run hard into a sill or insulation pushed into the gap, it is no longer a cavity.",
      next: "Whether the cavity is drained, ventilated or both, and how it stays continuous from top to bottom.",
    },
    {
      problem: "Moisture cannot move outward",
      indicates:
        "An insulated wall no longer dries the way it used to, so moisture can build up in the wall.",
      next: "The membrane product, its vapour permeance class and the standard it is installed to.",
    },
    {
      problem: "The assessed wall is not the drawn wall",
      indicates:
        "The rating was modelled on one wall specification and the building is detailed with another.",
      next: "That the wall the energy assessor modelled matches the one on the construction drawings.",
    },
  ],
};

export const glossary: readonly GlossaryTerm[] = [
  {
    term: "Material R-value",
    definition:
      "The thermal resistance of one product, as shown on its packaging.",
  },
  {
    term: "Total R-value",
    definition:
      "The thermal resistance of the whole wall, calculated from the air surfaces, air spaces, insulation, fixings and frame together.",
  },
  {
    term: "Thermal bridging",
    definition:
      "Heat taking the easy path around the insulation. In a framed wall that path is the frame.",
  },
  {
    term: "Vapour-permeable membrane",
    definition:
      "A pliable building membrane that lets internal moisture move outward instead of building up in the wall.",
  },
  {
    term: "Drained cavity",
    definition:
      "The gap that separates the cladding from the structure. It has to be continuous top to bottom so water that gets past the cladding drains behind it.",
  },
  {
    term: "Climate zone",
    definition:
      "The Code’s classification of a location, checked by address. Metropolitan Adelaide is in zone 5; the Adelaide Hills and the South East are in zone 6.",
  },
];

export const enquiryChecklist: readonly ChecklistItem[] = [
  {
    label: "The address or suburb",
    detail:
      "The climate zone is checked from the property itself, not from the suburb next door.",
  },
  {
    label: "What the existing wall is",
    detail:
      "Brick veneer, solid masonry, framed and clad, or AAC. A photograph of the outside rarely settles it.",
  },
  {
    label: "New home, addition or retrofit",
    detail:
      "The seven-star requirement applies to newly constructed homes. How the rules apply to alterations and additions depends on the work.",
  },
  {
    label: "The energy assessment, if one has been prepared",
    detail:
      "And whether the wall it modelled is the wall on the construction drawings.",
  },
  {
    label: "A drawn section through the wall",
    detail:
      "Ideally at a window head, where the membrane, the cavity, the insulation and the finish appear in one place.",
  },
  {
    label: "The finish going over it",
    detail:
      "Cladding or render, and whether a continuous insulating board is planned behind it.",
  },
];

/** Rendered as the visible FAQ list and emitted as FAQPage schema. */
export const faqs: readonly ServiceFaq[] = [
  {
    question:
      "Can insulation be added to an existing brick veneer wall without opening it up?",
    answer:
      "Sometimes, and it depends entirely on what is in the cavity and what the wall is doing with moisture. The cavity in a brick veneer wall is there partly to drain, so filling it is not a neutral act. Have the wall assessed before assuming a blow-in product is suitable for it.",
  },
  {
    question: "Does render or cladding add much insulation value?",
    answer:
      "On its own, very little. A finish is a thin layer with modest thermal resistance. What can matter is what goes on with it—a continuous insulating board behind the finish, or a properly formed and maintained cavity behind cladding.",
  },
  {
    question: "Does my renovation have to meet the 7-star standard?",
    answer:
      "The seven-star requirement PlanSA describes applies to newly constructed homes from 1 October 2024. How the requirements apply to alterations and additions depends on the work and is a question for your designer and the relevant authority, not something to read off a website.",
  },
  {
    question: "Is more insulation always better?",
    answer:
      "Past a point the wall stops being the constraint. Thermal bridging, air leakage, glazing and the sealing of the building all cap what another layer of batt returns, and adding insulation without resolving the vapour and drainage path can create a problem the old wall did not have.",
  },
];
