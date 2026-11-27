import assert from "node:assert/strict";
import test from "node:test";
import {
  COMPATIBILITY_COLUMNS,
  DECISION_COLUMNS,
  PROBLEM_COLUMNS,
  assertTable,
  checklistParts,
  comparisonModel,
  compatibilityModel,
  decisionModel,
  howToSteps,
  linkedPaths,
  problemsModel,
  tableProblems,
  tableStrings,
  type TableModel,
} from "./content-blocks.ts";
import { richTextPlain } from "./rich-text.ts";

const sound: TableModel = {
  caption: "Two finishes compared",
  headings: ["Finish", "Look", "Upkeep"],
  rows: [
    { heading: "Smooth", cells: ["One clean plane", "Shows marks"] },
    { heading: "Textured", cells: ["Hides more", "Holds more dust"] },
  ],
};

test("a comparison puts the row heading first and keeps row links", () => {
  const model = comparisonModel({
    caption: "Services",
    rowHeading: "Service",
    columns: ["Covers", "Use"],
    rows: [{ label: "Render", href: "/render/", cells: ["Walls", "Homes"] }],
  });

  assert.deepEqual(model.headings, ["Service", "Covers", "Use"]);
  assert.deepEqual(model.rows, [
    { heading: "Render", href: "/render/", cells: ["Walls", "Homes"] },
  ]);
  assert.deepEqual(tableProblems(model), []);
});

test("decision, compatibility and problem tables share one three-column shape", () => {
  const decision = decisionModel("Which finish", [
    { situation: "Old brick", preference: "Render", confirm: "The coating" },
  ]);
  assert.deepEqual(decision.headings, DECISION_COLUMNS);
  assert.deepEqual(decision.rows, [
    { heading: "Old brick", cells: ["Render", "The coating"] },
  ]);

  const compatibility = compatibilityModel("Substrates", [
    { condition: "Painted brick", approach: "Assess first", confirm: "Bond" },
  ]);
  assert.deepEqual(compatibility.headings, COMPATIBILITY_COLUMNS);
  assert.deepEqual(compatibility.rows[0].cells, ["Assess first", "Bond"]);

  const problems = problemsModel("Render problems", [
    { problem: "Cracking", indicates: "Movement", next: "Find the cause" },
  ]);
  assert.deepEqual(problems.headings, PROBLEM_COLUMNS);
  assert.deepEqual(problems.rows[0].cells, ["Movement", "Find the cause"]);

  for (const model of [decision, compatibility, problems]) {
    assert.deepEqual(tableProblems(model), []);
  }
});

test("the three guide headings can be renamed", () => {
  const model = problemsModel(
    "Cladding problems",
    [{ problem: "Staining", indicates: "Unwashed areas", next: "Wash down" }],
    ["Sign", "Likely reason", "Next step"],
  );
  assert.deepEqual(model.headings, ["Sign", "Likely reason", "Next step"]);
});

test("a sound table reports no problems", () => {
  assert.deepEqual(tableProblems(sound), []);
  assert.equal(assertTable(sound), sound);
});

test("a table without a caption, columns or rows is rejected", () => {
  assert.match(
    tableProblems({ ...sound, caption: "  " }).join("; "),
    /no caption/,
  );
  assert.match(
    tableProblems({ ...sound, headings: ["Finish"], rows: [] }).join("; "),
    /row-heading column and a data column.*has no rows/,
  );
});

test("a short row, an empty cell or a repeated heading is rejected", () => {
  const short = tableProblems({
    ...sound,
    rows: [{ heading: "Smooth", cells: ["One clean plane"] }],
  });
  assert.match(short.join("; "), /row "Smooth" has 1 cells for 2 columns/);

  const empty = tableProblems({
    ...sound,
    rows: [{ heading: "Smooth", cells: ["One clean plane", " "] }],
  });
  assert.match(empty.join("; "), /row "Smooth" has an empty cell/);

  const repeatedRow = tableProblems({
    ...sound,
    rows: [sound.rows[0], sound.rows[0]],
  });
  assert.match(repeatedRow.join("; "), /repeats the row "Smooth"/);

  const repeatedColumn = tableProblems({
    ...sound,
    headings: ["Finish", "Look", "Look"],
  });
  assert.match(repeatedColumn.join("; "), /repeats a column heading/);
});

test("rendering a malformed table fails loudly, naming the table", () => {
  assert.throws(
    () =>
      assertTable({
        ...sound,
        rows: [{ heading: "Smooth", cells: [] }],
      }),
    /Invalid content table — Two finishes compared: row "Smooth" has 0 cells/,
  );
});

test("a checklist item is a label with an optional supporting sentence", () => {
  assert.deepEqual(checklistParts("Current photos"), {
    label: "Current photos",
  });
  assert.deepEqual(
    checklistParts({ label: "Current photos", detail: "Each wall." }),
    { label: "Current photos", detail: "Each wall." },
  );
});

test("link syntax is reduced to its label where copy feeds structured data", () => {
  assert.equal(
    richTextPlain("Read the [render guide](/resources/render/) first."),
    "Read the render guide first.",
  );
  assert.equal(richTextPlain("No links here."), "No links here.");
});

test("HowTo steps state exactly what the visible steps show", () => {
  assert.deepEqual(
    howToSteps([
      { title: "Note the site basics", body: "Write down the suburb." },
      {
        title: "Gather the documents",
        body: "Use the [planning page](/project-planning/) as a list.",
      },
    ]),
    [
      { name: "Note the site basics", text: "Write down the suburb." },
      {
        name: "Gather the documents",
        text: "Use the planning page as a list.",
      },
    ],
  );
});

test("every string and link in a table can be collected for checks", () => {
  const model = comparisonModel({
    caption: "Services",
    rowHeading: "Service",
    columns: ["Covers"],
    rows: [
      {
        label: "Render",
        href: "/render/",
        cells: ["See the [finishes guide](/resources/render-finishes-adelaide/)."],
      },
    ],
  });

  assert.deepEqual(tableStrings(model), [
    "Services",
    "Service",
    "Covers",
    "Render",
    "See the [finishes guide](/resources/render-finishes-adelaide/).",
  ]);
  assert.deepEqual(
    linkedPaths(
      tableStrings(model),
      model.rows.map((row) => row.href),
    ),
    ["/resources/render-finishes-adelaide/", "/render/"],
  );
});
