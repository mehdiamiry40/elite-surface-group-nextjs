/**
 * Markup contract for the service-page sections and the formats they carry.
 *
 * Renders the real service content, so a block added to `services.ts` that
 * skips a heading level, repeats an id or loses its table markup fails here
 * rather than on the built page.
 */
import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import ServiceSections, { SectionFormatBlock } from "./ServiceSections";
import { services } from "../content/services";

function count(html: string, pattern: RegExp): number {
  return (html.match(pattern) ?? []).length;
}

const tableTypes = ["comparison", "decision", "compatibility", "problems"];

for (const service of services) {
  const sections = service.sections ?? [];
  const formats = sections.flatMap((section) => section.formats ?? []);
  const html = renderToStaticMarkup(<ServiceSections sections={sections} />);

  test(`${service.slug}: one labelled band per section, plain first`, () => {
    assert.equal(count(html, /<section\b/g), sections.length);
    assert.equal(count(html, /<h2\b/g), sections.length);
    for (const section of sections) {
      assert.ok(
        html.includes(`aria-labelledby="${section.id}"`) &&
          html.includes(`<h2 id="${section.id}">`),
        section.id,
      );
    }
    // The approach block above is tinted, so the first band is plain and
    // they alternate from there.
    const bands = [...html.matchAll(/<section class="([^"]+)"/g)].map(
      (match) => match[1],
    );
    assert.deepEqual(
      bands,
      sections.map((_, index) =>
        index % 2 === 0 ? "section" : "section section--tint",
      ),
    );
  });

  test(`${service.slug}: headings never skip a level`, () => {
    // The page supplies the h1; every band here starts again at h2.
    const levels = [...html.matchAll(/<h([1-6])\b/g)].map((match) =>
      Number(match[1]),
    );
    assert.ok(!levels.includes(1), "sections do not add an h1");
    let previous = 1;
    for (const level of levels) {
      assert.ok(level <= previous + 1, `h${previous} is followed by h${level}`);
      previous = level;
    }
  });

  test(`${service.slug}: every format is drawn on its content block`, () => {
    const tables = formats.filter((f) => tableTypes.includes(f.type));
    assert.equal(count(html, /<table\b/g), tables.length);
    assert.equal(count(html, /<caption\b/g), tables.length);
    assert.equal(count(html, /class="table-scroll"/g), tables.length);
    // Every data cell names its column for the stacked phone layout.
    assert.equal(
      count(html, /<td\b/g),
      count(html, /<td role="cell" data-label="[^"]+"/g),
    );

    const workflows = formats.filter((f) => f.type === "steps");
    assert.equal(count(html, /<ol class="steps"/g), workflows.length);

    const terms = formats.flatMap((f) =>
      f.type === "glossary" ? f.terms : [],
    );
    assert.equal(count(html, /<dt>/g), terms.length);

    const checklists = formats.filter((f) => f.type === "checklist");
    assert.equal(count(html, /class="ticks checklist"/g), checklists.length);

    const callouts = formats.filter((f) => f.type === "callout");
    assert.equal(count(html, /<aside class="callout/g), callouts.length);
    assert.equal(
      count(html, /class="callout callout--caution"/g),
      callouts.filter((f) => f.type === "callout" && f.tone === "caution")
        .length,
    );
  });

  test(`${service.slug}: ids are unique and sub-headings carry theirs`, () => {
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length);
    for (const format of formats) {
      if (format.id) {
        assert.ok(html.includes(`<h3 id="${format.id}">`), format.id);
      }
    }
  });

  test(`${service.slug}: inline links render as anchors, not markup`, () => {
    assert.doesNotMatch(html, /\]\(\//);
    assert.ok(count(html, /<a\b[^>]*href="\/[^"]*"/g) > 10);
    assert.doesNotMatch(html, /HowTo|AggregateRating/);
  });
}

test("steps drop to h4 under a format heading and keep h3 without one", () => {
  const steps = [
    { title: "First stage", body: "Do the first thing." },
    { title: "Second stage", body: "Then the second." },
  ];

  const headed = renderToStaticMarkup(
    <SectionFormatBlock
      format={{
        type: "steps",
        heading: "In order",
        id: "in-order",
        intro: "Read the [planning page](/project-planning/) first.",
        steps,
      }}
    />,
  );
  assert.ok(headed.startsWith('<h3 id="in-order">In order</h3><p>'));
  // Outside the Next router a link renders without its trailing slash.
  assert.match(headed, /<a href="\/project-planning\/?">planning page<\/a>/);
  assert.equal(count(headed, /<h4>/g), 2);
  assert.equal(count(headed, /<h3\b/g), 1);

  const bare = renderToStaticMarkup(
    <SectionFormatBlock format={{ type: "steps", steps }} />,
  );
  assert.ok(bare.startsWith('<ol class="steps"'));
  assert.equal(count(bare, /<h3>/g), 2);
  assert.equal(count(bare, /<h4>/g), 0);
});

test("a table format passes its renamed columns and row links through", () => {
  const html = renderToStaticMarkup(
    <>
      <SectionFormatBlock
        format={{
          type: "compatibility",
          caption: "Two walls",
          columns: ["Wall", "What sets it apart", "Confirm first"],
          rows: [
            { condition: "Brick", approach: "Bonded.", confirm: "Its age." },
            { condition: "Panel", approach: "Coated.", confirm: "Its system." },
          ],
        }}
      />
      <SectionFormatBlock
        format={{
          type: "comparison",
          table: {
            caption: "Two services",
            rowHeading: "Service",
            columns: ["Covers"],
            rows: [
              { label: "Render", href: "/render/", cells: ["A finish."] },
              { label: "Walling", cells: ["The walls."] },
            ],
          },
        }}
      />
    </>,
  );

  assert.ok(html.includes(">What sets it apart</th>"));
  assert.ok(html.includes('data-label="Confirm first"'));
  assert.ok(html.includes("data-table--guide"));
  assert.ok(html.includes("data-table--comparison"));
  assert.match(html, /<a href="\/render\/?">Render<\/a>/);
});
