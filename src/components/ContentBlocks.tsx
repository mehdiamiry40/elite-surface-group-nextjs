import { useId, type ReactNode } from "react";
import Link from "next/link";
import RichText from "@/components/RichText";
import { CheckIcon } from "@/components/icons";
import type {
  ChecklistItem,
  ComparisonTableData,
  CompatibilityRow,
  DecisionRow,
  GlossaryTerm,
  ProblemRow,
  Step,
} from "@/content/blocks";
import {
  assertTable,
  checklistParts,
  comparisonModel,
  compatibilityModel,
  decisionModel,
  problemsModel,
  type TableModel,
  type ThreeColumns,
} from "@/lib/content-blocks";

/**
 * Reusable content blocks: tables, numbered steps, checklists, glossaries and
 * callouts, shared by the home, company, service, location and guide pages.
 *
 * All of them are server components and take plain data, so a page can feed
 * them from a content module or from a literal beside its copy. Any string
 * they render may carry inline links written as `[label](/path/)`.
 *
 * Styles live under "Reusable content blocks" at the end of `globals.css`.
 */

export type {
  CalloutNote,
  ChecklistItem,
  ComparisonRow,
  ComparisonTableData,
  CompatibilityRow,
  DecisionRow,
  GlossaryTerm,
  ProblemRow,
  Step,
} from "@/content/blocks";

/* ------------------------------------------------------------------ tables */

/**
 * The one table every tabular block renders.
 *
 * Two things keep it readable on a phone. The wrapper scrolls sideways on its
 * own if the table is ever wider than its column, so the page never does. And
 * below the site's 768px breakpoint the stylesheet stops laying the table out
 * as a grid: each row becomes a card headed by its row heading, with every
 * cell labelled from `data-label`.
 *
 * Tables with five or more columns still scroll inside the wrapper on a
 * portrait tablet, so prefer four columns or fewer where the cells are prose.
 *
 * Changing `display` on table elements can strip their semantics in some
 * browsers, so the roles are stated outright. The wrapper is a focusable
 * named region so a keyboard user can scroll it when it does overflow.
 */
function DataTable({
  table,
  variant,
  id,
}: {
  table: TableModel;
  variant: "comparison" | "guide";
  id?: string;
}) {
  const generatedId = useId();
  const captionId = `${id ?? generatedId}-caption`;
  const { caption, headings, rows } = assertTable(table);

  return (
    <div
      className="table-scroll"
      role="region"
      aria-labelledby={captionId}
      tabIndex={0}
    >
      <table
        id={id}
        className={`data-table data-table--${variant} data-table--cols-${headings.length}`}
        role="table"
      >
        <caption id={captionId}>{caption}</caption>
        <thead role="rowgroup">
          <tr role="row">
            {headings.map((heading) => (
              <th key={heading} scope="col" role="columnheader">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {rows.map((row) => (
            <tr key={row.heading} role="row">
              <th scope="row" role="rowheader">
                {row.href ? (
                  <Link href={row.href} prefetch={false}>
                    {row.heading}
                  </Link>
                ) : (
                  <RichText text={row.heading} />
                )}
              </th>
              {row.cells.map((cell, index) => (
                <td
                  key={headings[index + 1]}
                  role="cell"
                  data-label={headings[index + 1]}
                >
                  <RichText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Side-by-side comparison of systems, materials, substrates, finishes or
 * regions. One row per thing compared; `columns` names what is compared.
 */
export function ComparisonTable({
  id,
  ...table
}: ComparisonTableData & { id?: string }) {
  return (
    <DataTable table={comparisonModel(table)} variant="comparison" id={id} />
  );
}

/**
 * "When to choose X or Y": a situation, what usually suits it and what still
 * has to be confirmed. `columns` renames the three headings.
 */
export function DecisionGuide({
  caption,
  rows,
  columns,
  id,
}: {
  caption: string;
  rows: readonly DecisionRow[];
  columns?: ThreeColumns;
  id?: string;
}) {
  return (
    <DataTable
      table={decisionModel(caption, rows, columns)}
      variant="guide"
      id={id}
    />
  );
}

/**
 * Substrate or site-condition suitability: the condition, the typical
 * approach and what must be confirmed. It states what is usual, never a
 * guaranteed outcome.
 */
export function CompatibilityMatrix({
  caption,
  rows,
  columns,
  id,
}: {
  caption: string;
  rows: readonly CompatibilityRow[];
  columns?: ThreeColumns;
  id?: string;
}) {
  return (
    <DataTable
      table={compatibilityModel(caption, rows, columns)}
      variant="guide"
      id={id}
    />
  );
}

/**
 * Common problems and remedies: what is visible, what it can indicate and
 * what to do next.
 */
export function ProblemsTable({
  caption,
  rows,
  columns,
  id,
}: {
  caption: string;
  rows: readonly ProblemRow[];
  columns?: ThreeColumns;
  id?: string;
}) {
  return (
    <DataTable
      table={problemsModel(caption, rows, columns)}
      variant="guide"
      id={id}
    />
  );
}

/* ---------------------------------------------------------- numbered steps */

/**
 * Numbered stages on the existing `ol.steps` styles.
 *
 * Pass the same `steps` to `HowToSchema` (in `JsonLd.tsx`) when the list is a
 * genuine how-to, so the structured data cannot drift from what is shown.
 * `headingLevel` is 3 under an `h2` and 4 under an `h3`.
 */
export function NumberedSteps({
  steps,
  headingLevel = 3,
  label,
}: {
  steps: readonly Step[];
  headingLevel?: 3 | 4;
  /** Accessible name, for a list that has no heading directly above it. */
  label?: string;
}) {
  const Heading = headingLevel === 4 ? "h4" : "h3";

  return (
    // `list-style: none` drops list semantics in Safari; the role restores them.
    <ol className="steps" role="list" aria-label={label}>
      {steps.map((step) => (
        <li key={step.title}>
          <Heading>
            <RichText text={step.title} />
          </Heading>
          <p>
            <RichText text={step.body} />
          </p>
        </li>
      ))}
    </ol>
  );
}

/* --------------------------------------------------------------- checklist */

/**
 * Things for the reader to prepare or confirm, on the existing tick-list
 * styles with an outlined box in place of the solid tick. Each item is a task
 * for the reader, never a promise from the business.
 */
export function Checklist({
  items,
  columns = 1,
  label,
}: {
  items: readonly ChecklistItem[];
  /** Two columns suit short one-line items on a wide page. */
  columns?: 1 | 2;
  /** Accessible name, for a list that has no heading directly above it. */
  label?: string;
}) {
  return (
    <ul
      className={
        columns === 2 ? "ticks checklist checklist--2" : "ticks checklist"
      }
      role="list"
      aria-label={label}
    >
      {items.map((item) => {
        const { label: itemLabel, detail } = checklistParts(item);
        return (
          <li key={itemLabel}>
            <CheckIcon />
            <span className="checklist__text">
              {detail ? (
                <>
                  <strong>
                    <RichText text={itemLabel} />
                  </strong>{" "}
                  <span className="checklist__detail">
                    <RichText text={detail} />
                  </span>
                </>
              ) : (
                <RichText text={itemLabel} />
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/* ---------------------------------------------------- glossary and callout */

/** Quick-reference terms in plain language, as a definition list. */
export function Glossary({ terms }: { terms: readonly GlossaryTerm[] }) {
  return (
    <dl className="glossary">
      {terms.map((entry) => (
        <div key={entry.term} className="glossary__item">
          <dt>{entry.term}</dt>
          <dd>
            <RichText text={entry.definition} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * A single short note set apart from the running copy. Pass `body` for one
 * paragraph of content-module copy, or children for anything richer.
 */
export function Callout({
  title,
  body,
  tone = "note",
  children,
}: {
  title: string;
  body?: string;
  /** "caution" marks something to check before going further. */
  tone?: "note" | "caution";
  children?: ReactNode;
}) {
  const titleId = `${useId()}-callout`;

  return (
    <aside
      className={tone === "caution" ? "callout callout--caution" : "callout"}
      role="note"
      aria-labelledby={titleId}
    >
      <strong id={titleId} className="callout__title">
        {title}
      </strong>
      {body ? (
        <p>
          <RichText text={body} />
        </p>
      ) : null}
      {children}
    </aside>
  );
}
