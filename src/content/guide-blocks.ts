/**
 * Shapes for the tables each resource guide feeds to the reusable content
 * blocks in `src/components/ContentBlocks.tsx`.
 *
 * A guide keeps its block copy in `src/content/guides/<slug>.ts`, one module
 * per guide, and its page spreads a table straight into the matching block:
 * `<DecisionGuide {...decisions} />`. `src/lib/guide-blocks.test.ts` loads
 * every module in that folder and checks the copy, so a module may export
 * only block data: tables, steps, checklists, glossaries, callouts, FAQs and
 * plain strings.
 *
 * This module has no runtime imports so `node --test` can load it.
 */
import type {
  CompatibilityRow,
  DecisionRow,
  ProblemRow,
} from "./blocks.ts";

/** A captioned three-column table; `columns` renames its three headings. */
export type GuideTable<Row> = {
  caption: string;
  rows: readonly Row[];
  columns?: readonly [string, string, string];
};

/** Situation, what usually suits it, what is still to confirm. */
export type DecisionTable = GuideTable<DecisionRow>;

/** Substrate or condition, the typical approach, what to confirm first. */
export type CompatibilityTable = GuideTable<CompatibilityRow>;

/** What the reader notices, what it can indicate, what to do next. */
export type ProblemsTableData = GuideTable<ProblemRow>;
