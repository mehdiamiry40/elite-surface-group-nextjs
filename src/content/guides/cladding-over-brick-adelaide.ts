import type { ChecklistItem, GlossaryTerm } from "../blocks.ts";
import type { CompatibilityTable } from "../guide-blocks.ts";
import type { ServiceFaq } from "../services.ts";

/**
 * Blocks for the cladding over brick guide. Every row restates the guide's
 * own sections on the existing wall, the fixing method, local conditions,
 * junctions and approvals. No figure or code reference is repeated here.
 */

export const wallConditions: CompatibilityTable = {
  caption: "Existing brick walls and how cladding over them is approached",
  columns: ["Wall or condition", "Typical approach", "Confirm first"],
  rows: [
    {
      condition: "Brick veneer on a timber or steel frame",
      approach:
        "The new skin has to leave the drained cavity, the weepholes and the flashings behind the brick working.",
      confirm:
        "That the wall is veneer, established not assumed, and which over-masonry method the product documents.",
    },
    {
      condition: "Solid double brick with no frame",
      approach:
        "Everything fixes into the masonry, so the condition of the wall comes before the choice of product.",
      confirm:
        "Mortar condition, previous repointing and the state of the damp-proof course, assessed by a suitably qualified professional.",
    },
    {
      condition: "Cracked brickwork on reactive clay",
      approach:
        "Have the movement assessed first. Cladding hides a crack without changing its cause, and a wall that is still moving shows it at the cladding joints.",
      confirm:
        "What the crack is doing. Our [guide to cracking in wall finishes](/resources/render-cracking-adelaide/) covers what to record.",
    },
    {
      condition: "Powdery deposits or crumbling mortar near the base",
      approach:
        "The moisture source comes first. Battens, a membrane and boards give a damp wall fewer ways out and make it harder to inspect.",
      confirm:
        "What our [salt damp guide](/resources/salt-damp-adelaide/) sets out for assessment.",
    },
    {
      condition: "A site in salt-laden coastal air",
      approach:
        "Material and fixings are chosen for the exposure. Salt-laden air is harder on fasteners and coatings than an inland suburb.",
      confirm:
        "The exposure category, not the postcode. The [coastal maintenance guide](/resources/cladding-maintenance-coastal-adelaide/) covers the upkeep that follows.",
    },
    {
      condition: "A bushfire-prone designation",
      approach: "The designation adds its own requirements to the cladding.",
      confirm:
        "How the zoning is confirmed, which our [cladding comparison guide](/resources/fibre-cement-vs-weatherboard-cladding-adelaide/) explains.",
    },
    {
      condition: "An elevation close to an allotment boundary",
      approach:
        "Fire-separation requirements can decide what that one elevation may be clad in while the others are unaffected.",
      confirm: "The requirement for that wall, before a material is chosen.",
    },
    {
      condition: "A heritage area, a character overlay or the Hills Face Zone",
      approach:
        "Check the approval position early. Re-cladding changes the building’s external appearance, which is what those overlays concern.",
      confirm:
        "The development category and any overlay on the allotment, before material is ordered.",
    },
  ],
};

export const glossary: readonly GlossaryTerm[] = [
  {
    term: "Direct fix",
    definition:
      "Cladding fastened to the masonry or to shallow furring, which keeps the build-up thin.",
  },
  {
    term: "Cavity fix",
    definition:
      "Cladding fixed to vertical battens or a proprietary cavity trim, leaving a drained, ventilated space behind the boards.",
  },
  {
    term: "Weather barrier",
    definition:
      "The layer that usually sits in front of the brickwork and behind the battens.",
  },
  {
    term: "Weephole",
    definition:
      "An opening in the brickwork, near the ground and above flashings, that drains the cavity behind it. A batten should not be screwed across one.",
  },
  {
    term: "Damp-proof course",
    definition:
      "The layer that separates the wall from the soil. Cladding run down past it into a garden bed defeats it.",
  },
  {
    term: "Articulation joint",
    definition:
      "A movement joint already built into the brickwork. It should carry through the new surface, not be covered over.",
  },
];

export const quoteChecklist: readonly ChecklistItem[] = [
  {
    label: "What the wall is",
    detail: "Brick veneer or solid masonry, and the age of the house.",
  },
  {
    label: "Photographs of each elevation",
    detail: "Including the eaves and the ground line.",
  },
  {
    label: "Every junction the thicker wall will meet",
    detail:
      "Window and door reveals, the eaves soffit, garden taps, downpipe brackets, the meter box and any air-conditioning penetration.",
  },
  {
    label: "Any cracking, powdery deposits or crumbling mortar",
    detail: "Recorded before anything covers it.",
  },
  {
    label: "The system documents",
    detail:
      "The installation guide and certification for the product and the over-masonry method proposed.",
  },
  {
    label: "The approval position",
    detail: "The development category and any overlay on the allotment.",
  },
  {
    label: "Who handles the small items",
    detail:
      "Removing and reinstating downpipes and taps, supplying battens, fixings and the weather barrier, flashing the windows, and making good at the eaves.",
  },
];

/** Rendered as the visible FAQ list and emitted as FAQPage schema. */
export const faqs: readonly ServiceFaq[] = [
  {
    question: "Is cladding over brick better than rendering it?",
    answer:
      "They solve different problems. Render bonds to the masonry and follows its movement; cladding stands off it and changes the facade’s form as well as its colour. For a clean painted surface on sound brickwork, render is usually simpler. Where the design calls for profile or shadow lines, cladding earns the extra build-up.",
  },
  {
    question: "Can cladding fix a damp or cracking brick wall?",
    answer:
      "No. It covers the symptom and makes the wall harder to inspect. Have the moisture source or the movement assessed and addressed first, then treat the cladding as a finish decision.",
  },
  {
    question: "How can I tell whether my house is brick veneer or solid brick?",
    answer:
      "Wall thickness at a window reveal, weepholes near the ground and the age of the house usually point to which you have. Treat that as a starting point, not a diagnosis, and have the wall type established before a cladding system is chosen.",
  },
  {
    question: "Can insulation be added at the same time?",
    answer:
      "A new cavity is an opportunity, but it has to be designed rather than filled opportunistically: membrane, insulation and drainage interact, and the condensation provisions apply to the whole assembly.",
  },
  {
    question: "Does the cladding have to cover the whole house?",
    answer:
      "No. Cladding one elevation or a feature area and rendering the rest is common, provided the transition between the finishes is detailed rather than left to the day.",
  },
];
