import type { ChecklistItem, GlossaryTerm } from "../blocks.ts";
import type { DecisionTable } from "../guide-blocks.ts";

/**
 * Blocks for the choosing-a-Hebel-installer guide. The table gathers the
 * questions the guide already raises with the reason for each and the answer
 * to listen for. Nothing here describes any installer's standing, ours
 * included.
 */

export const installerQuestions: DecisionTable = {
  caption: "Questions for every installer, and what a clear answer covers",
  columns: ["Question to ask", "Why it matters", "What a clear answer covers"],
  rows: [
    {
      situation: "Which system do my drawings specify?",
      preference:
        "A note that says only “Hebel” can point to very different applications, each with its own guide.",
      confirm:
        "The product, application and documented system by name, or a request that the designer names it before anything is priced.",
    },
    {
      situation:
        "Which guide version and drawing revision is the quote based on?",
      preference:
        "Guides are revised and designs change. A recorded basis turns a later change into a recheck, not an argument.",
      confirm:
        "The installation-guide version and the drawing revision, written into the quote.",
    },
    {
      situation: "What happens when the site does not match the documents?",
      preference:
        "A substituted fixing, a closed-over joint or an improvised opening changes the system, even if the wall looks the same.",
      confirm:
        "Work stops at that point, and the conflict goes back to the builder, designer or engineer in writing.",
    },
    {
      situation: "Who confirms the frame is ready?",
      preference:
        "Panels follow what they are fixed to, so a frame that is out of line becomes a wall that is out of line.",
      confirm:
        "Who checks the frame, when, and who rectifies it before a start date is fixed.",
    },
    {
      situation: "How are control joints kept open through to the finish?",
      preference:
        "A documented control joint has to survive every trade that follows. A coating cannot hide or replace one.",
      confirm:
        "How joint locations are marked on the wall and handed over to whoever applies the finish.",
    },
    {
      situation: "Who carries the coating?",
      preference:
        "An external Hebel wall is not finished until its coating system is complete.",
      confirm:
        "Who accepts the panel surface as ready, who applies each specified layer, and who details the joints, corners and openings. Our guide to [rendering Hebel panels](/resources/rendering-hebel-panels-adelaide/) covers that split.",
    },
    {
      situation: "Who supplies, stores and lifts the panels?",
      preference:
        "Supply, delivery, storage and access all sit behind the price.",
      confirm:
        "Who supplies panels, accessories, fixings and coating materials, who takes delivery, and what access or scaffold is assumed and who provides it.",
    },
    {
      situation: "How will panels be cut, and how is dust controlled?",
      preference:
        "SafeWork SA identifies autoclaved aerated concrete as a crystalline-silica substance and regulates work that can create respirable dust.",
      confirm: "A stated approach to cutting and dust control on your site.",
    },
    {
      situation: "Which warranty document applies?",
      preference:
        "The manufacturer’s published cover is conditional. It is not an installer’s warranty, a coating warranty or a building approval.",
      confirm:
        "The actual document that names the selected product and system, with the installation, coating and maintenance conditions it sets.",
    },
  ],
};

export const glossary: readonly GlossaryTerm[] = [
  {
    term: "AAC",
    definition:
      "Autoclaved aerated concrete. Hebel is a registered trademark for AAC products supplied in Australia by CSR Building Products.",
  },
  {
    term: "Documented system",
    definition:
      "The complete build-up a guide describes: panels, support, fixings, joints, flashings and a compatible coating. Changing one part changes the system.",
  },
  {
    term: "Design and installation guide",
    definition:
      "The manufacturer’s current document for one system. Guides are revised, so the version a quote is based on matters.",
  },
  {
    term: "Drawing revision",
    definition:
      "The issue of the project drawings a quote was priced from. Recording it means a later design change prompts a recheck.",
  },
  {
    term: "Control joint",
    definition:
      "A documented movement joint. It stays open through to the finished coating.",
  },
  {
    term: "Intertenancy wall",
    definition:
      "A wall common to adjoining dwellings, also called a party wall. It has its own documented system and is not an external wall detail used indoors.",
  },
];

export const quoteChecklist: readonly ChecklistItem[] = [
  {
    label: "Drawings that name the wall system",
    detail:
      "The approved elevations and sections and the wall schedule. If they say only “Hebel”, ask the designer or builder to name the system first.",
  },
  {
    label: "Engineering that affects the wall",
    detail: "Together with the details for openings and penetrations.",
  },
  {
    label: "The finish specification",
    detail:
      "The coating system named for the wall, and whether the installer or another business is to apply it.",
  },
  {
    label: "Site location and access",
    detail:
      "The suburb or postcode, how panels reach the work area, and on a boundary which side of the wall stays reachable.",
  },
  {
    label: "The expected programme",
    detail: "When the frame is due to be ready, and which trades follow.",
  },
  {
    label: "Who supplies what",
    detail:
      "Panels, accessories, fixings and coating materials, and who takes delivery.",
  },
  {
    label: "The status of each document",
    detail: "Which are approved and which are still being coordinated.",
  },
];
