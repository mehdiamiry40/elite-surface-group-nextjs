/**
 * Pure helpers behind `src/components/ContentBlocks.tsx`.
 *
 * Kept free of JSX and path aliases so `node --test` can exercise the same
 * code the components run.
 */
import type {
  ChecklistItem,
  ComparisonTableData,
  CompatibilityRow,
  DecisionRow,
  ProblemRow,
  Step,
} from "../content/blocks.ts";
import { richTextLinks, richTextPlain } from "./rich-text.ts";

/** A table reduced to what the markup needs: headings and rows of cells. */
export type TableModel = {
  caption: string;
  /** Column headings; the first belongs to the row-heading column. */
  headings: readonly string[];
  rows: readonly {
    heading: string;
    href?: string;
    cells: readonly string[];
  }[];
};

export const DECISION_COLUMNS = [
  "Your situation",
  "What usually suits",
  "Still to confirm",
] as const;

export const COMPATIBILITY_COLUMNS = [
  "Substrate or condition",
  "Typical approach",
  "Confirm first",
] as const;

export const PROBLEM_COLUMNS = [
  "What you notice",
  "What it can indicate",
  "What to do next",
] as const;

export type ThreeColumns = readonly [string, string, string];

export function comparisonModel(table: ComparisonTableData): TableModel {
  return {
    caption: table.caption,
    headings: [table.rowHeading, ...table.columns],
    rows: table.rows.map((row) => ({
      heading: row.label,
      href: row.href,
      cells: row.cells,
    })),
  };
}

export function decisionModel(
  caption: string,
  rows: readonly DecisionRow[],
  columns: ThreeColumns = DECISION_COLUMNS,
): TableModel {
  return {
    caption,
    headings: columns,
    rows: rows.map((row) => ({
      heading: row.situation,
      cells: [row.preference, row.confirm],
    })),
  };
}

export function compatibilityModel(
  caption: string,
  rows: readonly CompatibilityRow[],
  columns: ThreeColumns = COMPATIBILITY_COLUMNS,
): TableModel {
  return {
    caption,
    headings: columns,
    rows: rows.map((row) => ({
      heading: row.condition,
      cells: [row.approach, row.confirm],
    })),
  };
}

export function problemsModel(
  caption: string,
  rows: readonly ProblemRow[],
  columns: ThreeColumns = PROBLEM_COLUMNS,
): TableModel {
  return {
    caption,
    headings: columns,
    rows: rows.map((row) => ({
      heading: row.problem,
      cells: [row.indicates, row.next],
    })),
  };
}

/**
 * Reasons a table cannot be rendered as a sound grid. A short row would leave
 * a cell with no column heading above it and no label when the table stacks,
 * and two rows with one heading cannot be told apart.
 */
export function tableProblems(table: TableModel): string[] {
  const problems: string[] = [];
  const name = table.caption.trim() || "(no caption)";

  if (!table.caption.trim()) {
    problems.push("table has no caption");
  }
  if (table.headings.length < 2) {
    problems.push(`${name}: needs a row-heading column and a data column`);
  }
  if (table.headings.some((heading) => !heading.trim())) {
    problems.push(`${name}: has an empty column heading`);
  }
  if (new Set(table.headings).size !== table.headings.length) {
    problems.push(`${name}: repeats a column heading`);
  }
  if (!table.rows.length) {
    problems.push(`${name}: has no rows`);
  }

  const seen = new Set<string>();
  for (const row of table.rows) {
    if (!row.heading.trim()) {
      problems.push(`${name}: has a row with no heading`);
    }
    if (seen.has(row.heading)) {
      problems.push(`${name}: repeats the row "${row.heading}"`);
    }
    seen.add(row.heading);
    if (row.cells.length !== table.headings.length - 1) {
      problems.push(
        `${name}: row "${row.heading}" has ${row.cells.length} cells for ${
          table.headings.length - 1
        } columns`,
      );
    }
    if (row.cells.some((cell) => !cell.trim())) {
      problems.push(`${name}: row "${row.heading}" has an empty cell`);
    }
  }

  return problems;
}

/** Throws at render (so at build, for these static pages) on a malformed table. */
export function assertTable(table: TableModel): TableModel {
  const problems = tableProblems(table);
  if (problems.length) {
    throw new Error(`Invalid content table — ${problems.join("; ")}`);
  }
  return table;
}

/** A checklist item as its short label and optional supporting sentence. */
export function checklistParts(item: ChecklistItem): {
  label: string;
  detail?: string;
} {
  return typeof item === "string" ? { label: item } : item;
}

/**
 * Steps as HowTo schema states them. The text is the visible step with any
 * inline-link syntax reduced to its label, so the markup and the page say
 * the same thing word for word.
 */
export function howToSteps(
  steps: readonly Step[],
): { name: string; text: string }[] {
  return steps.map((step) => ({
    name: richTextPlain(step.title),
    text: richTextPlain(step.body),
  }));
}

/** Every string a table shows, for link and wording checks. */
export function tableStrings(table: TableModel): string[] {
  return [
    table.caption,
    ...table.headings,
    ...table.rows.flatMap((row) => [row.heading, ...row.cells]),
  ];
}

/** Site-relative paths linked from any of the given strings or row links. */
export function linkedPaths(
  strings: readonly string[],
  hrefs: readonly (string | undefined)[] = [],
): string[] {
  return [
    ...strings.flatMap(richTextLinks),
    ...hrefs.filter((href): href is string => Boolean(href)),
  ];
}
