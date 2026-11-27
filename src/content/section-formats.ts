/**
 * Structured formats a long-form page section can carry beside its prose: a
 * table, numbered steps, a checklist, a glossary or a callout.
 *
 * Each one names a block in `src/components/ContentBlocks.tsx` and holds the
 * data that block takes, so the copy stays in the content module and the page
 * only decides where it goes. `src/components/ServiceSections.tsx` renders
 * them.
 *
 * Type-only imports, so `node --test` can load any content module that uses
 * these shapes.
 */
import type {
  CalloutNote,
  ChecklistItem,
  ComparisonTableData,
  CompatibilityRow,
  DecisionRow,
  GlossaryTerm,
  ProblemRow,
  Step,
} from "./blocks.ts";

/** What can sit around any format. All of it is optional. */
type FormatFrame = {
  /** Sub-heading above the block, one level below the section heading. */
  heading?: string;
  /** Fragment id for that sub-heading. Unique within the page. */
  id?: string;
  /** Sentence shown between the sub-heading and the block. */
  intro?: string;
};

/** Renames the three column headings of a guide table. */
type GuideColumns = readonly [string, string, string];

export type SectionFormat = FormatFrame &
  (
    | { type: "comparison"; table: ComparisonTableData }
    | {
        type: "decision";
        caption: string;
        columns?: GuideColumns;
        rows: readonly DecisionRow[];
      }
    | {
        type: "compatibility";
        caption: string;
        columns?: GuideColumns;
        rows: readonly CompatibilityRow[];
      }
    | {
        type: "problems";
        caption: string;
        columns?: GuideColumns;
        rows: readonly ProblemRow[];
      }
    | { type: "steps"; steps: readonly Step[] }
    | { type: "checklist"; items: readonly ChecklistItem[]; columns?: 1 | 2 }
    | { type: "glossary"; terms: readonly GlossaryTerm[] }
    | { type: "callout"; note: CalloutNote; tone?: "note" | "caution" }
  );
