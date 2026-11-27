import type { ChecklistItem, ComparisonTableData } from "../blocks.ts";
import type { CompatibilityTable } from "../guide-blocks.ts";
import type { ServiceFaq } from "../services.ts";

/**
 * Blocks for the asbestos cladding replacement guide. Every row restates the
 * guide's own sections: who tests, who removes, what the cleared wall shows
 * and where the replacement scope starts. Nothing here adds licensing or
 * removal detail the guide does not already carry.
 */

export const responsibilities: ComparisonTableData = {
  caption: "Replacing asbestos cladding: who carries each part",
  rowHeading: "Part of the job",
  columns: ["Who it sits with", "What you should end up with"],
  rows: [
    {
      label: "Identifying the material",
      cells: [
        "An accredited laboratory, through inspection and testing. It cannot be settled by looking.",
        "A test result, before anyone quotes, drills or disturbs the sheeting.",
      ],
    },
    {
      label: "Removing the sheeting",
      cells: [
        "A removalist whose SafeWork SA licence class matches the area and the material.",
        "Notification to SafeWork SA before the work starts, then controlled removal of the sheeting.",
      ],
    },
    {
      label: "Clearing the area",
      cells: [
        "Part of the licensed removal, which closes with a clearance certificate.",
        "The certificate itself. It is the document the next trade works from.",
      ],
    },
    {
      label: "Disposing of the waste",
      cells: [
        "Regulated separately from the removal, under EPA SA’s disposal rules. Confirm in the removal scope who takes the waste.",
        "Waste wrapped, sealed, labelled and taken only to a depot licensed to accept it.",
      ],
    },
    {
      label: "Repairing the frame",
      cells: [
        "A separate item from the removal and from the cladding installation. Agree in writing how it is priced.",
        "A provisional sum for frame repair, and an agreed answer to what happens to the price if the frame is worse than assumed.",
      ],
    },
    {
      label: "Scaffold, flashings and reinstatement",
      cells: [
        "Agreed in writing between the parties, because the scaffold usually spans every stage.",
        "A named party for the scaffold, the window flashings, and the downpipes, meter box and taps.",
      ],
    },
    {
      label: "Approvals",
      cells: [
        "You, checking the position for your allotment with PlanSA.",
        "The development category and any heritage, character or Hills Face constraint, confirmed before material is ordered.",
      ],
    },
    {
      label: "Installing the replacement cladding",
      cells: [
        "Elite Surface Group, starting from a cleared, sound substrate.",
        "A quote and an installation for the replacement system. We do not test for, remove or handle asbestos.",
      ],
    },
  ],
};

export const replacementScope: CompatibilityTable = {
  caption: "What the cleared wall and the site change in the replacement",
  columns: ["Wall or site condition", "What usually follows", "Confirm first"],
  rows: [
    {
      condition: "Framing members that need replacing",
      approach:
        "Frame repair before any new system is fixed, priced as its own item.",
      confirm:
        "Who carries the repair, and how the price moves if the frame is worse than assumed.",
    },
    {
      condition: "No sarking or insulation behind the old sheet",
      approach:
        "A rebuilt wall is the chance to add a membrane and insulation.",
      confirm:
        "That those layers are designed together with drainage. The NCC condensation provisions apply to the whole assembly, not to the boards.",
    },
    {
      condition: "Window flashings that were never installed",
      approach: "New flashings detailed as part of the replacement wall.",
      confirm: "Who flashes the windows, settled in writing.",
    },
    {
      condition: "Salt-laden coastal air",
      approach:
        "Fasteners and coatings selected for the site’s exposure category rather than the postcode.",
      confirm:
        "The exposure category for the property. Our [coastal maintenance guide](/resources/cladding-maintenance-coastal-adelaide/) covers the upkeep that follows.",
    },
    {
      condition: "A bushfire-prone designation",
      approach:
        "A replacement system chosen to meet the requirements the designation brings.",
      confirm:
        "How the zoning is confirmed, which our [cladding comparison guide](/resources/fibre-cement-vs-weatherboard-cladding-adelaide/) explains.",
    },
    {
      condition: "A history of movement on reactive clay",
      approach:
        "Have the movement understood before a new finish goes over it, because a frame that is still moving shows at the joints.",
      confirm:
        "What to record, set out in our [guide to cracking in wall finishes](/resources/render-cracking-adelaide/).",
    },
  ],
};

export const quoteChecklist: readonly ChecklistItem[] = [
  {
    label: "The test result",
    detail:
      "The laboratory analysis of the sheeting, so the scope starts from what the material is.",
  },
  {
    label: "The clearance certificate",
    detail:
      "Issued when the licensed removal closes. It is the document we work from.",
  },
  {
    label: "Photographs of the exposed frame",
    detail: "The framing, any damage, the window openings and the ground line.",
  },
  {
    label: "Suburb and age of the house",
    detail:
      "Along with what the elevations look like and which of them are in the job.",
  },
  {
    label: "The approval position",
    detail: "The development category and any overlay on the allotment.",
  },
  {
    label: "Site exposure",
    detail:
      "Whether the property is close to the coast or carries a bushfire-prone designation.",
  },
  {
    label: "Who carries the shared items",
    detail:
      "The scaffold, the window flashings, and the reinstatement of downpipes, meter box and taps.",
  },
];

/** Rendered as the visible FAQ list and emitted as FAQPage schema. */
export const faqs: readonly ServiceFaq[] = [
  {
    question: "Can new cladding just go over the top of the old sheeting?",
    answer:
      "Covering asbestos sheeting leaves it in the building, where it still has to be managed, disclosed and eventually removed, and fixing through it disturbs the material. Where encapsulation is considered at all, it is a decision for a licensed assessor about that wall—not a way to avoid removal.",
  },
  {
    question: "Do we have to do the whole house at once?",
    answer:
      "Not necessarily. Staging elevation by elevation spreads the cost, but it means paying scaffold and removal mobilisation more than once and living with two finishes in between.",
  },
  {
    question: "Will the replacement look like the original?",
    answer:
      "Profiles close to mid-century flat sheet and cover strip are available, as are weatherboard and panel systems that change the character entirely. In a heritage or character overlay the external appearance may be assessed, so check that before choosing.",
  },
  {
    question: "Who tells the neighbours?",
    answer:
      "A licensed removalist manages notification, signage and exclusion zones. Telling adjoining neighbours what is happening and when is still worth doing yourself, especially on a narrow allotment.",
  },
  {
    question: "Does Elite Surface Group remove asbestos cladding?",
    answer:
      "No. Elite Surface Group does not test for, remove or handle asbestos. Identification is a testing question and removal is licensed work, and both sit with suitably qualified professionals. We quote and install the replacement cladding once the area has been cleared.",
  },
  {
    question:
      "Can the replacement cladding be quoted before the old sheeting comes off?",
    answer:
      "It can be estimated, but the frame is not visible until the sheeting is gone and the area is cleared. A price written before removal carries assumptions about the frame, the sarking, the insulation and the window flashings, which is why a provisional sum for frame repair is the more honest way to write it.",
  },
];
