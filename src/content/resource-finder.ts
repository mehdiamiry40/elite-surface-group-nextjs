import type { ChecklistItem } from "./blocks.ts";
import type { DecisionTable } from "./guide-blocks.ts";

/**
 * Resources hub blocks: the "choose a guide" matrix and the short checklist
 * on how to use the guides.
 *
 * Each row points a common question at the one guide that answers it, and
 * describes that guide from its own published summary. Every guide appears
 * exactly once across the four tables; `guide-blocks.test.ts` checks that, so
 * a newly published guide has to be given a row.
 */

/** Headings for every finder table. */
export const GUIDE_FINDER_COLUMNS = [
  "Your question",
  "Start with this guide",
  "What it helps you settle",
] as const;

export type GuideFinderGroup = {
  /** Anchor for the group's heading. */
  id: string;
  title: string;
  table: DecisionTable;
};

export const guideFinder: readonly GuideFinderGroup[] = [
  {
    id: "finder-existing-walls",
    title: "Something looks wrong with an existing wall",
    table: {
      caption: "Guides for a problem with an existing wall",
      columns: GUIDE_FINDER_COLUMNS,
      rows: [
        {
          situation: "Cracks have appeared in a rendered wall",
          preference:
            "[Render cracking causes](/resources/render-cracking-adelaide/)",
          confirm:
            "Why rendered walls crack, which changes deserve prompt assessment and what to document before asking for repair advice.",
        },
        {
          situation: "You cannot tell whether render needs a patch or more",
          preference: "[Render repair](/resources/render-repair-adelaide/)",
          confirm:
            "What separates a patch, a re-rendered elevation and a full strip-back, and which findings stop a repair until the cause is dealt with.",
        },
        {
          situation:
            "White powdery deposits or crumbling mortar near the base of a wall",
          preference: "[Salt damp](/resources/salt-damp-adelaide/)",
          confirm:
            "Why this points to a moisture source, not a finish problem, and what has to be assessed before render is considered.",
        },
        {
          situation: "Rendered walls look tired and you are thinking of paint",
          preference:
            "[Repainting rendered walls](/resources/repainting-render-adelaide/)",
          confirm:
            "What the existing surface, its cracks and its exposure need to confirm before a recoat is specified.",
        },
        {
          situation: "Cladding near the coast needs looking after",
          preference:
            "[Coastal cladding maintenance](/resources/cladding-maintenance-coastal-adelaide/)",
          confirm:
            "How to plan cleaning and ground-level checks from the exact product and exposure, and which signs need professional assessment.",
        },
        {
          situation: "A facade may need its cladding replaced",
          preference:
            "[Facade recladding](/resources/facade-recladding-adelaide/)",
          confirm:
            "What to inspect first, what removal can uncover and how a replacement system is planned around the wall behind it.",
        },
        {
          situation: "The house has old fibro sheeting",
          preference:
            "[Replacing asbestos cladding](/resources/asbestos-cladding-replacement-adelaide/)",
          confirm:
            "The order the work runs in, from identification and licensed removal to the new system, and who carries each part.",
        },
      ],
    },
  },
  {
    id: "finder-choices",
    title: "Choosing between systems or finishes",
    table: {
      caption: "Guides for choosing between two systems or finishes",
      columns: GUIDE_FINDER_COLUMNS,
      rows: [
        {
          situation: "Cladding or render for the exterior?",
          preference:
            "[Cladding vs render](/resources/cladding-vs-render-adelaide/)",
          confirm:
            "What the wall decides, how each finish handles local conditions and when combining the two works.",
        },
        {
          situation: "Acrylic or cement render?",
          preference:
            "[Acrylic vs cement render](/resources/acrylic-render-vs-cement-render-adelaide/)",
          confirm:
            "Movement tolerance, substrate fit, coastal exposure and upkeep, compared before a system is chosen.",
        },
        {
          situation: "Smooth, sand float or textured render?",
          preference:
            "[Render finishes and textures](/resources/render-finishes-adelaide/)",
          confirm:
            "Where each finish suits, what the wall allows and how each one cleans, patches and ages.",
        },
        {
          situation: "Fibre cement or timber weatherboard?",
          preference:
            "[Fibre cement vs weatherboard](/resources/fibre-cement-vs-weatherboard-cladding-adelaide/)",
          confirm:
            "How bushfire-prone zoning, coastal salt exposure and repaint cycles separate the two.",
        },
        {
          situation: "Should the boards run vertically or horizontally?",
          preference:
            "[Vertical vs horizontal cladding](/resources/vertical-vs-horizontal-cladding-adelaide/)",
          confirm:
            "Batten orientation, drainage cavities and coastal detailing to confirm before choosing a direction.",
        },
        {
          situation: "Hebel or brick veneer for a new wall?",
          preference:
            "[Hebel vs brick veneer](/resources/hebel-vs-brick-veneer-adelaide/)",
          confirm:
            "How each wall is built, insulated, finished and approved, and who carries the finish.",
        },
        {
          situation: "Steel or timber wall framing?",
          preference:
            "[Steel vs timber wall framing](/resources/steel-frame-vs-timber-frame-walls-adelaide/)",
          confirm:
            "Compliance pathways, termite scope, coastal exposure, footing design and bushfire requirements.",
        },
      ],
    },
  },
  {
    id: "finder-installations",
    title: "Preparing a wall or planning an installation",
    table: {
      caption: "Guides for preparing a wall or planning an installation",
      columns: GUIDE_FINDER_COLUMNS,
      rows: [
        {
          situation: "Can painted brick be rendered?",
          preference:
            "[Rendering over painted brick](/resources/rendering-over-painted-brick-adelaide/)",
          confirm:
            "Why the paint, the masonry, the moisture history and the selected coating system are assessed before the exterior is rendered.",
        },
        {
          situation: "Can cladding go over existing brick?",
          preference:
            "[Cladding over brick](/resources/cladding-over-brick-adelaide/)",
          confirm:
            "What the wall behind it, its cavity, its flashings and approvals need to confirm before boards go up.",
        },
        {
          situation: "What has to be right before render goes on?",
          preference:
            "[Preparing walls for render](/resources/preparing-walls-for-render-adelaide/)",
          confirm:
            "Substrate condition, movement joints, old coatings, damp and adjoining finishes.",
        },
        {
          situation: "Rendering walls inside a building",
          preference:
            "[Internal rendering](/resources/internal-rendering-adelaide/)",
          confirm:
            "Substrate, finish, junctions and how the work is coordinated with other trades.",
        },
        {
          situation: "Planning a fibre cement cladding installation",
          preference:
            "[Fibre cement cladding](/resources/fibre-cement-cladding-adelaide/)",
          confirm:
            "How the frame, the cavity, the junctions and the site exposure shape an installation before a profile is chosen.",
        },
        {
          situation: "Can Hebel panels be rendered?",
          preference:
            "[Rendering Hebel panels](/resources/rendering-hebel-panels-adelaide/)",
          confirm:
            "How the exact Hebel system, movement details, coating specification and trade responsibilities are coordinated before work begins.",
        },
        {
          situation: "A Hebel wall on or near a boundary",
          preference:
            "[Hebel boundary walls](/resources/hebel-boundary-walls-adelaide/)",
          confirm:
            "Wall terminology, approved documents, access, sequencing and trade responsibilities to confirm before installation.",
        },
      ],
    },
  },
  {
    id: "finder-planning",
    title: "Quotes, installers and bigger building changes",
    table: {
      caption: "Guides for quotes, installers and bigger building changes",
      columns: GUIDE_FINDER_COLUMNS,
      rows: [
        {
          situation: "What will change the quote?",
          preference:
            "[What affects a quote](/resources/what-affects-cladding-render-quotes-adelaide/)",
          confirm:
            "What a quote usually needs, which conditions move it and which scope questions let two quotes be compared fairly. It carries no rates.",
        },
        {
          situation: "How do I choose a Hebel installer?",
          preference:
            "[Choosing a Hebel installer](/resources/choosing-a-hebel-installer-adelaide/)",
          confirm:
            "What to ask about the specification, the drawings, the junctions and the quote.",
        },
        {
          situation: "Adding a second storey",
          preference:
            "[Second-storey additions](/resources/second-storey-addition-adelaide/)",
          confirm:
            "What the existing walls, footings and approvals should confirm before framing begins.",
        },
        {
          situation: "Removing or opening up an internal wall",
          preference:
            "[Load-bearing wall removal](/resources/load-bearing-wall-removal-adelaide/)",
          confirm:
            "The engineering assessment, approvals and reframing sequence to confirm before work begins.",
        },
        {
          situation: "Improving how well the walls insulate",
          preference:
            "[External wall insulation](/resources/external-wall-insulation-adelaide/)",
          confirm:
            "How the frame, the cavity, the membrane and the finish set what the whole wall achieves.",
        },
        {
          situation: "Reducing noise through a wall",
          preference:
            "[Soundproofing walls](/resources/soundproofing-walls-adelaide/)",
          confirm:
            "What mass, separation and sealing change, and what applies to a wall between two attached dwellings.",
        },
      ],
    },
  },
];

/** How to get the most from a guide before an enquiry. */
export const guideUseChecklist: readonly ChecklistItem[] = [
  {
    label: "Start from what you can see, or the decision in front of you",
    detail:
      "The guide finder on this page matches each common question to one guide.",
  },
  {
    label: "Note the exact product or system on your drawings or quote",
    detail:
      "A guide explains the principle. The documents for your product set the detail.",
  },
  {
    label: "Record what the guide asks for",
    detail:
      "Most guides list what to photograph or note about the wall before anyone visits.",
  },
  {
    label: "Check who confirms what",
    detail:
      "Engineering, approvals, asbestos and moisture diagnosis sit with other professionals, and each guide says where that line falls.",
  },
  {
    label: "Bring the same details to an enquiry",
    detail:
      "The [project-planning checklist](/project-planning/) sets out what to have ready for a quote.",
  },
];
