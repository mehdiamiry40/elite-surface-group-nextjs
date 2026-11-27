/**
 * Markup contract for the shared content blocks.
 *
 * Later pages reuse these components, so the accessibility and layout hooks
 * the stylesheet depends on are pinned here: a captioned table with a header
 * row and scoped headings, a scroll wrapper, and a label on every cell for
 * the stacked phone layout.
 */
import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Callout,
  Checklist,
  ComparisonTable,
  CompatibilityMatrix,
  DecisionGuide,
  Glossary,
  NumberedSteps,
  ProblemsTable,
} from "./ContentBlocks";
import { HowToSchema } from "./JsonLd";
import { quotePreparation } from "../content/project-planning";
import {
  serviceComparison,
  serviceComparisonDetailed,
} from "../content/service-comparison";

function count(html: string, pattern: RegExp): number {
  return (html.match(pattern) ?? []).length;
}

function assertTableContract(html: string, columns: number, rows: number) {
  // The wrapper scrolls, is reachable by keyboard and is named by the caption.
  const wrapper = html.match(
    /^<div class="table-scroll" role="region" aria-labelledby="([^"]+)" tabindex="0">/,
  );
  assert.ok(wrapper, "table sits in a focusable .table-scroll region");
  assert.ok(
    html.includes(`<caption id="${wrapper[1]}">`),
    "the caption names the scroll region",
  );

  assert.equal(count(html, /<table\b/g), 1);
  assert.equal(count(html, /<caption\b/g), 1);
  assert.equal(count(html, /<thead\b/g), 1);

  // Every heading cell is scoped: one per column, then one per row.
  assert.equal(count(html, /<th\b/g), columns + rows);
  assert.equal(count(html, /<th scope="col"/g), columns);
  assert.equal(count(html, /<th scope="row"/g), rows);

  // Every data cell names its column for the stacked layout.
  const cells = count(html, /<td\b/g);
  assert.equal(cells, (columns - 1) * rows);
  assert.equal(count(html, /<td role="cell" data-label="[^"]+"/g), cells);
}

test("ComparisonTable renders a captioned, scoped, labelled table", () => {
  const html = renderToStaticMarkup(
    <ComparisonTable
      caption="Two finishes compared"
      rowHeading="Finish"
      columns={["Look", "Upkeep"]}
      rows={[
        { label: "Smooth", cells: ["One clean plane", "Shows marks"] },
        {
          label: "Textured",
          href: "/render/",
          cells: [
            "Hides more. See the [finishes guide](/resources/render-finishes-adelaide/).",
            "Holds more dust",
          ],
        },
      ]}
    />,
  );

  assertTableContract(html, 3, 2);
  assert.ok(html.includes("data-table--comparison"));
  assert.ok(html.includes("data-table--cols-3"));
  assert.ok(html.includes(">Two finishes compared</caption>"));
  assert.ok(html.includes('<td role="cell" data-label="Look">One clean plane'));
  assert.ok(html.includes('<td role="cell" data-label="Upkeep">Shows marks'));
  // A row heading with an href and inline link syntax both become anchors.
  assert.match(html, /<th scope="row" role="rowheader"><a href="\/render\/?">Textured<\/a>/);
  assert.match(
    html,
    /See the <a href="\/resources\/render-finishes-adelaide\/?">finishes guide<\/a>\./,
  );
  assert.ok(!html.includes("]("), "no link syntax reaches the page");
});

test("an explicit id is used for the table and its caption", () => {
  const html = renderToStaticMarkup(
    <ComparisonTable
      id="finishes"
      caption="Finishes"
      rowHeading="Finish"
      columns={["Look"]}
      rows={[{ label: "Smooth", cells: ["One clean plane"] }]}
    />,
  );
  assert.ok(html.includes('aria-labelledby="finishes-caption"'));
  assert.ok(html.includes('<table id="finishes"'));
  assert.ok(html.includes('<caption id="finishes-caption">'));
});

test("the published service comparisons meet the table contract", () => {
  assertTableContract(
    renderToStaticMarkup(<ComparisonTable {...serviceComparison} />),
    3,
    4,
  );
  const detailed = renderToStaticMarkup(
    <ComparisonTable {...serviceComparisonDetailed} />,
  );
  assertTableContract(detailed, 5, 4);
  assert.ok(detailed.includes("data-table--cols-5"));
});

test("DecisionGuide, CompatibilityMatrix and ProblemsTable share the contract", () => {
  const decision = renderToStaticMarkup(
    <DecisionGuide
      caption="Which finish"
      rows={[
        { situation: "Old brick", preference: "Render", confirm: "The coating" },
        { situation: "New frame", preference: "Cladding", confirm: "The system" },
      ]}
    />,
  );
  assertTableContract(decision, 3, 2);
  assert.ok(decision.includes("data-table--guide"));
  for (const heading of [
    "Your situation",
    "What usually suits",
    "Still to confirm",
  ]) {
    assert.ok(decision.includes(`role="columnheader">${heading}</th>`));
  }
  assert.ok(decision.includes('data-label="Still to confirm">The coating'));

  const compatibility = renderToStaticMarkup(
    <CompatibilityMatrix
      caption="Substrates"
      rows={[
        { condition: "Painted brick", approach: "Assess", confirm: "The bond" },
      ]}
    />,
  );
  assertTableContract(compatibility, 3, 1);
  assert.ok(compatibility.includes('data-label="Typical approach">Assess'));
  assert.ok(compatibility.includes('data-label="Confirm first">The bond'));

  const problems = renderToStaticMarkup(
    <ProblemsTable
      caption="Render problems"
      columns={["Sign", "Likely reason", "Next step"]}
      rows={[
        { problem: "Cracking", indicates: "Movement", next: "Find the cause" },
      ]}
    />,
  );
  assertTableContract(problems, 3, 1);
  assert.ok(problems.includes('data-label="Likely reason">Movement'));
  assert.ok(problems.includes('data-label="Next step">Find the cause'));
});

test("a malformed table refuses to render", () => {
  assert.throws(
    () =>
      renderToStaticMarkup(
        <ComparisonTable
          caption="Broken"
          rowHeading="Finish"
          columns={["Look", "Upkeep"]}
          rows={[{ label: "Smooth", cells: ["One clean plane"] }]}
        />,
      ),
    /Invalid content table — Broken: row "Smooth" has 1 cells for 2 columns/,
  );
});

test("NumberedSteps reuses ol.steps with a heading per step", () => {
  const steps = [
    { title: "Note the site basics", body: "Write down the suburb." },
    { title: "Gather the documents", body: "Collect the drawings." },
  ];
  const html = renderToStaticMarkup(<NumberedSteps steps={steps} />);

  assert.ok(html.startsWith('<ol class="steps" role="list">'));
  assert.equal(count(html, /<li>/g), 2);
  assert.ok(
    html.includes(
      "<li><h3>Note the site basics</h3><p>Write down the suburb.</p></li>",
    ),
  );

  // Under an h3 the step titles drop to h4, so no heading level is skipped.
  const nested = renderToStaticMarkup(
    <NumberedSteps steps={steps} headingLevel={4} label="Preparation" />,
  );
  assert.equal(count(nested, /<h4>/g), 2);
  assert.equal(count(nested, /<h3>/g), 0);
  assert.ok(nested.includes('aria-label="Preparation"'));
});

test("HowTo schema repeats the visible quote-preparation steps exactly", () => {
  const visible = renderToStaticMarkup(
    <NumberedSteps steps={quotePreparation.steps} />,
  );
  const schema = renderToStaticMarkup(
    <HowToSchema
      name={quotePreparation.name}
      description={quotePreparation.description}
      steps={quotePreparation.steps}
    />,
  );
  const data = JSON.parse(
    schema.replace(/^<script type="application\/ld\+json">|<\/script>$/g, ""),
  );

  assert.equal(data["@type"], "HowTo");
  assert.equal(data.name, quotePreparation.name);
  assert.equal(data.step.length, quotePreparation.steps.length);
  assert.equal(count(visible, /<li>/g), data.step.length);

  data.step.forEach(
    (
      step: { "@type": string; position: number; name: string; text: string },
      index: number,
    ) => {
      assert.equal(step["@type"], "HowToStep");
      assert.equal(step.position, index + 1);
      assert.ok(
        visible.includes(`<li><h3>${step.name}</h3><p>${step.text}</p></li>`),
        `step ${index + 1} is visible word for word`,
      );
    },
  );
  assert.doesNotMatch(schema, /Review|AggregateRating/);
});

test("HowToSchema emits nothing without steps", () => {
  assert.equal(
    renderToStaticMarkup(<HowToSchema name="Empty" steps={[]} />),
    "",
  );
});

test("Checklist reuses the tick list and separates label from detail", () => {
  const html = renderToStaticMarkup(
    <Checklist
      items={[
        "Current photos of each wall",
        {
          label: "Plans or drawings",
          detail: "See the [planning page](/project-planning/).",
        },
      ]}
    />,
  );

  assert.ok(html.startsWith('<ul class="ticks checklist" role="list">'));
  assert.equal(count(html, /<li>/g), 2);
  assert.equal(count(html, /<svg\b[^>]*aria-hidden="true"/g), 2);
  assert.ok(
    html.includes(
      '<span class="checklist__text">Current photos of each wall</span>',
    ),
  );
  assert.match(
    html,
    /<strong>Plans or drawings<\/strong> <span class="checklist__detail">See the <a href="\/project-planning\/?">planning page<\/a>\.<\/span>/,
  );

  const twoColumn = renderToStaticMarkup(
    <Checklist items={["One", "Two"]} columns={2} label="Before you enquire" />,
  );
  assert.ok(twoColumn.includes('class="ticks checklist checklist--2"'));
  assert.ok(twoColumn.includes('aria-label="Before you enquire"'));
});

test("Glossary is a definition list with one group per term", () => {
  const html = renderToStaticMarkup(
    <Glossary
      terms={[
        { term: "Return", definition: "The surface that turns in to a window." },
        {
          term: "Junction",
          definition: "Where finishes meet. See [render](/render/).",
        },
      ]}
    />,
  );

  assert.ok(html.startsWith('<dl class="glossary">'));
  assert.equal(count(html, /<div class="glossary__item">/g), 2);
  assert.ok(
    html.includes(
      "<dt>Return</dt><dd>The surface that turns in to a window.</dd>",
    ),
  );
  assert.match(html, /<dd>Where finishes meet\. See <a href="\/render\/?">render<\/a>\.<\/dd>/);
});

test("Callout is a note labelled by its title", () => {
  const html = renderToStaticMarkup(
    <Callout title="Agree a sample first" body="Large planes show everything." />,
  );
  const labelled = html.match(
    /^<aside class="callout" role="note" aria-labelledby="([^"]+)">/,
  );
  assert.ok(labelled);
  assert.ok(
    html.includes(
      `<strong id="${labelled[1]}" class="callout__title">Agree a sample first</strong>`,
    ),
  );
  assert.ok(html.includes("<p>Large planes show everything.</p>"));

  const caution = renderToStaticMarkup(
    <Callout title="Check first" tone="caution">
      <p>Confirm the wall is dry.</p>
    </Callout>,
  );
  assert.ok(caution.includes('class="callout callout--caution"'));
  assert.ok(caution.includes("<p>Confirm the wall is dry.</p>"));
});
