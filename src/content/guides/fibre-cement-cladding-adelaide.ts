import type { ChecklistItem, ComparisonTableData } from "../blocks.ts";
import type { CompatibilityTable } from "../guide-blocks.ts";

/**
 * Blocks for the fibre cement cladding guide. The layer table and the
 * conditions matrix condense the guide's own sections; dimensions, classes
 * and ratings stay with the product guide and the project documents.
 */

export const wallLayers: ComparisonTableData = {
  caption: "The layers of a fibre-cement wall",
  rowHeading: "Layer",
  columns: ["What it does", "What to settle before ordering"],
  rows: [
    {
      label: "Frame",
      cells: [
        "Carries the cladding. Studs need to be straight, plumb and spaced to suit the product’s fixing schedule.",
        "Extra framing behind joints, corners and openings where the guide calls for it, and the order of work before the frame is handed over.",
      ],
    },
    {
      label: "Membrane",
      cells: [
        "A pliable layer behind the boards that deals with the water that gets past them.",
        "Specified together with any insulation and the cavity, not chosen on site.",
      ],
    },
    {
      label: "Battens and cavity",
      cells: [
        "In a cavity system, battens hold the cladding off the membrane so moisture can drain and air can move.",
        "Batten direction, which follows board direction, and spacing that matches the fixing pattern and the wind classification.",
      ],
    },
    {
      label: "Boards or panels",
      cells: [
        "The visible face. It sheds most of the water.",
        "The exact product, profile and thickness on the drawings, and the layout on each elevation.",
      ],
    },
    {
      label: "Joints, corners and trims",
      cells: [
        "Formed the way the selected system documents: lapped, butted over a backing, expressed with a gap, or closed with a trim or sealant.",
        "Corner, trim and joint details for that system, and where the control and movement joints fall.",
      ],
    },
    {
      label: "Flashings and penetrations",
      cells: [
        "Head, sill and jamb flashings lap with the membrane, and penetrations are sealed to the same documents. These are the places water finds first.",
        "Every opening and penetration, the clearance at the base of the wall, and which trade seals each one.",
      ],
    },
    {
      label: "Fixings",
      cells: [
        "The smallest part of the system, and the one exposure attacks first.",
        "The corrosion-resistance class for the property’s position, and the fixing type and spacing for the wind classification.",
      ],
    },
    {
      label: "Finish",
      cells: [
        "A coating system applied on site, or a factory finish with its own handling and touch-up rules.",
        "Which trade applies it, and when that happens relative to joint sealing and scaffold removal.",
      ],
    },
  ],
};

export const conditions: CompatibilityTable = {
  caption: "What changes with the wall and the site",
  rows: [
    {
      condition: "New timber or steel frame",
      approach:
        "Studs straight, plumb and spaced to suit the product’s fixing schedule, with the extra framing its guide calls for behind joints, corners and openings.",
      confirm:
        "That openings, flashings, the membrane, service penetrations and bracing each have a place in the order of work before the frame is handed over.",
    },
    {
      condition: "Existing brickwork",
      approach:
        "Fixed by the manufacturer’s documented over-masonry method, where the wall has been assessed as suitable for it.",
      confirm:
        "The condition of the wall. Our [cladding over brick guide](/resources/cladding-over-brick-adelaide/) works through it.",
    },
    {
      condition: "Old cladding being replaced",
      approach: "Planned around what removal exposes.",
      confirm:
        "What sits behind the old boards. See the [facade recladding guide](/resources/facade-recladding-adelaide/).",
    },
    {
      condition: "Old sheeting that could contain asbestos",
      approach:
        "Testing and licensed removal come first. We install from a cleared, sound substrate.",
      confirm:
        "The test result, before anyone drills, cuts or removes the sheeting. See [asbestos cladding replacement](/resources/asbestos-cladding-replacement-adelaide/).",
    },
    {
      condition: "Site near the coast",
      approach:
        "Fasteners at the corrosion-resistance class the manufacturer sets, which steps up within a defined distance of the coast.",
      confirm:
        "The product’s coastal conditions against the property’s actual position, not the suburb name. Our [coastal Adelaide page](/locations/coastal-adelaide/) explains how we approach those sites.",
    },
    {
      condition: "Wind-exposed site",
      approach:
        "Fixing type, spacing and batten layout set against the site’s assessed wind classification.",
      confirm:
        "The classification in the project documents. It does not come from a default.",
    },
    {
      condition: "Designated bushfire-prone area",
      approach:
        "Specific board, jointing and fixing details for the assessed rating, taken from the manufacturer’s bushfire documents.",
      confirm:
        "Whether a site-specific Bushfire Attack Level assessment is needed before the external wall is finalised. See our [Adelaide Hills page](/locations/adelaide-hills/).",
    },
    {
      condition: "Reactive clay soil",
      approach:
        "Control and movement joints shown on the drawings, because a clad wall shows seasonal movement at its joints.",
      confirm:
        "That the frame, the footing design and the manufacturer’s joint spacing agree before installation, not on site.",
    },
  ],
};

/** The guide's existing pre-quote list, rendered as a checklist. */
export const quoteChecklist: readonly ChecklistItem[] = [
  "The suburb or postcode and the type of project",
  "Elevations or plans showing which walls are clad and how high they are",
  "The specified product, profile and finish, or the look you are aiming for",
  "What the wall is framed in, or what the existing wall is built from",
  "Whether the cladding, membrane and battens are supplied by you, the builder or the installer",
  "Site access, scaffold arrangements and the programme",
  "Any exposure information already confirmed for the site",
];
