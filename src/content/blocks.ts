/**
 * Data shapes for the reusable content blocks in
 * `src/components/ContentBlocks.tsx`.
 *
 * Every string a block renders — a table cell, a step, a checklist item, a
 * glossary definition — may carry inline links written as `[label](/path/)`
 * (see `src/lib/rich-text.ts`). FAQ answers are the exception: they use
 * `ServiceFaq` and stay plain text because they also feed FAQPage schema.
 *
 * This module has no runtime imports so `node --test` can load any content
 * module that only needs these types.
 */

/** One row of a comparison table: a row heading and one cell per column. */
export type ComparisonRow = {
  label: string;
  /** Site-relative path that turns the row heading into a link. */
  href?: string;
  cells: readonly string[];
};

export type ComparisonTableData = {
  /** Names the table for readers and assistive technology. */
  caption: string;
  /** Heading of the first column, the one that holds each row's heading. */
  rowHeading: string;
  /** Headings of the remaining columns, in cell order. */
  columns: readonly string[];
  rows: readonly ComparisonRow[];
};

/** One numbered stage. `title` and `body` are both visible. */
export type Step = {
  title: string;
  body: string;
};

/**
 * Something for the reader to prepare or confirm. A bare string is a one-line
 * item; `detail` adds a supporting sentence under a short label.
 */
export type ChecklistItem = string | { label: string; detail?: string };

/** "When to choose X or Y": a situation, what usually suits it, what is open. */
export type DecisionRow = {
  situation: string;
  preference: string;
  confirm: string;
};

/** A substrate or site condition, the usual approach, and what to confirm. */
export type CompatibilityRow = {
  condition: string;
  approach: string;
  confirm: string;
};

/** A visible problem, what it can indicate, and the sensible next step. */
export type ProblemRow = {
  problem: string;
  indicates: string;
  next: string;
};

export type GlossaryTerm = {
  term: string;
  definition: string;
};

/** A short titled note, for content modules that feed a `Callout`. */
export type CalloutNote = {
  title: string;
  body: string;
};
