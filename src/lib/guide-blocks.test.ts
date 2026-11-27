/**
 * Content rules for the multi-format blocks on the resource guides.
 *
 * Each guide keeps its tables, steps, checklists, glossaries, callouts and
 * FAQs in `src/content/guides/<slug>.ts`. This file loads every module in
 * that folder and walks whatever it exports, so a new block is checked
 * without being registered anywhere: the wording rules apply to all of it,
 * and an export this file cannot recognise fails rather than slipping past.
 */
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
import { business } from "../content/business.ts";
import { projects } from "../content/projects.ts";
import {
  GUIDE_FINDER_COLUMNS,
  guideFinder,
  guideUseChecklist,
} from "../content/resource-finder.ts";
import { resourceGuides, resourcesHub } from "../content/resources.ts";
import { services } from "../content/services.ts";
import {
  checklistParts,
  comparisonModel,
  compatibilityModel,
  decisionModel,
  problemsModel,
  tableProblems,
  tableStrings,
  type TableModel,
} from "./content-blocks.ts";
import { richTextLinks } from "./rich-text.ts";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const guidesDir = path.join(projectRoot, "src/content/guides");
const pagesDir = path.join(projectRoot, "src/app/resources");

const knownRoutes = new Set([
  "/",
  "/about/",
  "/contact-us/",
  "/services/",
  "/projects/",
  "/project-planning/",
  "/resources/",
  "/locations/",
  "/locations/adelaide/",
  "/locations/northern-adelaide/",
  "/locations/coastal-adelaide/",
  "/locations/adelaide-hills/",
  ...services.map((service) => `/${service.slug}/`),
  ...projects.map((project) => `/projects/${project.slug}/`),
  ...resourceGuides.map((guide) => `/resources/${guide.slug}/`),
]);

/* ------------------------------------------------------- reading a module */

type Faq = { question: string; answer: string };

/** One guide's blocks, sorted by kind from whatever its module exports. */
type GuideCopy = {
  slug: string;
  tables: TableModel[];
  /** Every visible string outside the FAQs. */
  blockStrings: string[];
  faqs: Faq[];
  unrecognised: string[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasStrings(value: unknown, keys: readonly string[]): boolean {
  return (
    isRecord(value) && keys.every((key) => typeof value[key] === "string")
  );
}

function isChecklistItem(value: unknown): boolean {
  return (
    typeof value === "string" ||
    (isRecord(value) &&
      typeof value.label === "string" &&
      (value.detail === undefined || typeof value.detail === "string") &&
      Object.keys(value).every((key) => key === "label" || key === "detail"))
  );
}

/** A captioned table, whichever block it feeds, as the model the block renders. */
function tableModel(value: Record<string, unknown>): TableModel | null {
  const { caption, rows, columns } = value;
  if (typeof caption !== "string" || !Array.isArray(rows) || !rows.length) {
    return null;
  }
  const first = rows[0];
  if (hasStrings(first, ["label"]) && typeof value.rowHeading === "string") {
    return comparisonModel(value as never);
  }
  const three = columns as never;
  if (hasStrings(first, ["situation", "preference", "confirm"])) {
    return decisionModel(caption, rows as never, three);
  }
  if (hasStrings(first, ["condition", "approach", "confirm"])) {
    return compatibilityModel(caption, rows as never, three);
  }
  if (hasStrings(first, ["problem", "indicates", "next"])) {
    return problemsModel(caption, rows as never, three);
  }
  return null;
}

function sortExport(name: string, value: unknown, copy: GuideCopy): void {
  if (typeof value === "string") {
    copy.blockStrings.push(value);
    return;
  }
  if (Array.isArray(value) && value.length) {
    if (value.every((item) => hasStrings(item, ["question", "answer"]))) {
      copy.faqs.push(...(value as Faq[]));
      return;
    }
    if (value.every((item) => hasStrings(item, ["title", "body"]))) {
      copy.blockStrings.push(
        ...value.flatMap((step) => [step.title, step.body]),
      );
      return;
    }
    if (value.every((item) => hasStrings(item, ["term", "definition"]))) {
      copy.blockStrings.push(
        ...value.flatMap((entry) => [entry.term, entry.definition]),
      );
      return;
    }
    if (value.every(isChecklistItem)) {
      copy.blockStrings.push(
        ...value.flatMap((item) => {
          const { label, detail } = checklistParts(item);
          return detail ? [label, detail] : [label];
        }),
      );
      return;
    }
  }
  if (isRecord(value)) {
    const table = tableModel(value);
    if (table) {
      copy.tables.push(table);
      copy.blockStrings.push(...tableStrings(table));
      return;
    }
    // A callout: a title and one paragraph.
    if (
      hasStrings(value, ["title", "body"]) &&
      Object.keys(value).length === 2
    ) {
      copy.blockStrings.push(value.title as string, value.body as string);
      return;
    }
  }
  copy.unrecognised.push(name);
}

const guideFiles = readdirSync(guidesDir)
  .filter((file) => file.endsWith(".ts"))
  .sort();

const guides: GuideCopy[] = [];
for (const file of guideFiles) {
  const copy: GuideCopy = {
    slug: file.replace(/\.ts$/, ""),
    tables: [],
    blockStrings: [],
    faqs: [],
    unrecognised: [],
  };
  const exports = (await import(
    pathToFileURL(path.join(guidesDir, file)).href
  )) as Record<string, unknown>;
  for (const [name, value] of Object.entries(exports)) {
    sortExport(name, value, copy);
  }
  guides.push(copy);
}

function pageSource(slug: string): string {
  return readFileSync(path.join(pagesDir, slug, "page.tsx"), "utf8");
}

/* ------------------------------------------------------------------ shape */

test("every guide has a block module, and every module belongs to a guide", () => {
  assert.deepEqual(
    guides.map((guide) => guide.slug),
    resourceGuides.map((guide) => guide.slug).sort(),
  );
});

test("guide modules export only block data this file can check", () => {
  for (const guide of guides) {
    assert.deepEqual(guide.unrecognised, [], guide.slug);
    assert.ok(guide.blockStrings.length > 0, `${guide.slug} exports no blocks`);
  }
});

test("every guide table is a sound grid of four columns or fewer", () => {
  for (const guide of guides) {
    assert.ok(guide.tables.length >= 1, `${guide.slug} has no table`);
    const captions = guide.tables.map((table) => table.caption);
    assert.equal(new Set(captions).size, captions.length, guide.slug);
    for (const table of guide.tables) {
      const name = `${guide.slug}: ${table.caption}`;
      assert.deepEqual(tableProblems(table), [], name);
      assert.ok(table.rows.length >= 3, `${name} has under three rows`);
      // Cells are sentences, so a fifth column would scroll on a tablet.
      assert.ok(table.headings.length <= 4, `${name} has over four columns`);
    }
  }
});

test("each guide page renders the blocks from its own module", () => {
  for (const guide of guides) {
    const source = pageSource(guide.slug);
    assert.ok(
      source.includes(`from "@/content/guides/${guide.slug}"`),
      `${guide.slug} page does not import its block module`,
    );
    assert.match(source, /from "@\/components\/ContentBlocks"/, guide.slug);
  }
});

/* ---------------------------------------------------------- structured data */

test("no guide emits HowTo schema, and the boundary-wall guide emits no FAQ schema", () => {
  for (const guide of resourceGuides) {
    const source = pageSource(guide.slug);
    assert.doesNotMatch(source, /HowToSchema/, guide.slug);
  }
  assert.doesNotMatch(
    pageSource("hebel-boundary-walls-adelaide"),
    /FAQPageSchema/,
  );
});

test("every other guide emits FAQ schema from the array its FAQ list shows", () => {
  const missing = resourceGuides
    .map((guide) => guide.slug)
    .filter((slug) => slug !== "hebel-boundary-walls-adelaide")
    .filter((slug) => {
      const source = pageSource(slug);
      return !(
        source.includes("<FAQPageSchema faqs={faqs} />") &&
        source.includes("{faqs.map(")
      );
    });
  assert.deepEqual(missing, []);
});

test("FAQ answers stay plain text and questions are not repeated", () => {
  for (const guide of guides) {
    const questions = guide.faqs.map((faq) => faq.question);
    assert.equal(new Set(questions).size, questions.length, guide.slug);
    for (const faq of guide.faqs) {
      // They feed FAQPage structured data, which cannot carry link syntax.
      assert.deepEqual(richTextLinks(faq.answer), [], faq.question);
      assert.doesNotMatch(faq.answer, /<[a-z/]|&[a-z]+;|\{" "\}/i, faq.question);
      assert.ok(faq.question.endsWith("?"), faq.question);
      assert.ok(faq.answer.length >= 20, faq.question);
    }
  }
});

/* ----------------------------------------------------------------- wording */

test("guide block copy links only to published routes", () => {
  for (const guide of guides) {
    const hrefs = guide.tables.flatMap((table) =>
      table.rows.map((row) => row.href).filter(Boolean),
    );
    for (const href of [...guide.blockStrings.flatMap(richTextLinks), ...hrefs]) {
      assert.ok(
        knownRoutes.has(href as string),
        `${guide.slug} links to unknown route ${href}`,
      );
      assert.notEqual(
        href,
        `/resources/${guide.slug}/`,
        `${guide.slug} links to itself`,
      );
    }
  }
});

/** Claims no block may make, on a guide or on the hub. */
const claimRules: readonly [RegExp, string][] = [
  [
    // Stricter than the smoke test's "send us … plans/photos" rule.
    /\bsen[dt]\b|\bsend(?:s|ing)\b|respond within|through our contact form/i,
    "a response time, a file upload or the word “send”",
  ],
  [
    /\$\s?\d|\bper\s+(?:square\s+)?m(?:etre|²|2)\b|\bper hour\b|\d\s?%/i,
    "a price, rate or percentage",
  ],
  [
    /(?:accredited|authorised|certified|approved) (?:Hebel|CSR|James Hardie)|Master Builders|member of the HIA|licen[cs]ed (?:builder|installer)/i,
    "an accreditation, membership or licence",
  ],
  [
    /\b\d+\s*\+?\s*(?:years?|projects?|homes?|jobs?|clients?|customers?)\b/i,
    "years in business, a project count or an invented interval",
  ],
  [
    /testimonial|five[- ]star|5[- ]star|Google reviews?|\brated\b|award/i,
    "a review, rating or award",
  ],
  [
    /guarantee|\b(?:we|our)\b[^.]{0,60}\bwarrant/i,
    "a guarantee or a warranty of our own",
  ],
  [/(?<!not )\balways\b|\bnever fails?\b/i, "an absolute cause or outcome"],
];

/** Spellings the site does not use. A meter box is a meter, not a metre. */
const american =
  /\b(?:colors?|colored|programs?|meters?(?! box)|center|centered|gray|aluminum|molded|fiber|neighbor\w*|organiz\w*|recogniz\w*|specializ\w*)\b/i;

test("guide block copy makes no unverified or unpublished claim", () => {
  for (const guide of guides) {
    for (const copy of guide.blockStrings) {
      for (const [pattern, claim] of claimRules) {
        assert.doesNotMatch(
          copy,
          pattern,
          `${guide.slug} copy must not state ${claim}`,
        );
      }
    }
    for (const faq of guide.faqs) {
      // The rule the smoke test applies to every built page.
      assert.doesNotMatch(
        `${faq.question} ${faq.answer}`,
        /respond within one business day|(?:send (?:us )?|through our contact form)[^.]{0,100}(?:plans|photos|drawings)/i,
        `${guide.slug}: ${faq.question}`,
      );
    }
  }
});

test("guide blocks cite no standard, clause, rating, figure or brand the guide does not already publish", () => {
  // Each block restates its own guide, so anything that reads as a citation
  // or a measurement has to be in that guide's page already.
  const citation =
    /\bAS(?:\/NZS)?\s?\d{3,4}(?:\.\d+)?\b|\bNCC\s?\d{4}\b|\b[A-Z]\d[A-Z]\d{1,2}\b|\b(?:Part|Clause|Section)\s\d+(?:\.\d+)+|\bBAL[-–\s]?(?:\d{1,2}(?:\.\d)?|FZ|LOW)\b|\bR\d+(?:\.\d+)?\b|\b[NC][1-6]\b/g;
  const brand =
    /\b(?:James Hardie|Hardie\w*|Scyon|Linea|Axon|Cemintel|CSR|PowerPanel\w*|Dulux|Acratex|Rockcote|Wattyl|Taubmans|Haymes|Resene|Colorbond|BlueScope|Lysaght|Weathertex|Knauf|Gyprock|Boral|Bradford|Kingspan|Earthwool|Sika|Selleys|Mapei|Ardex|Unitex|Granosite|Masterwall|Stratco|TrueCore|PGH|Austral Bricks)\b/g;
  // Any figure of two or more digits: a year, a dimension, an interval.
  const figure = /\b\d{2,}(?:[.,]\d+)?\b/g;

  for (const guide of guides) {
    const source = pageSource(guide.slug);
    for (const copy of guide.blockStrings) {
      for (const token of [
        ...(copy.match(citation) ?? []),
        ...(copy.match(brand) ?? []),
        ...(copy.match(figure) ?? []),
      ]) {
        assert.ok(
          source.includes(token),
          `${guide.slug} blocks cite “${token}”, which its page does not`,
        );
      }
    }
  }
});

test("guide block copy is written in Australian English with the site's typography", () => {
  for (const guide of guides) {
    for (const copy of [
      ...guide.blockStrings,
      ...guide.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ]) {
      // Curly quotes and real dashes, as the guides' own prose uses.
      assert.doesNotMatch(copy, /['"]/, `${guide.slug}: straight quote in “${copy}”`);
      assert.doesNotMatch(copy, /\s-\s|--/, `${guide.slug}: hyphen as a dash in “${copy}”`);
    }
    for (const copy of guide.blockStrings) {
      assert.doesNotMatch(copy, american, `${guide.slug}: ${copy}`);
      assert.equal(copy, copy.trim(), `${guide.slug}: stray space in “${copy}”`);
    }
  }
});

/* --------------------------------------------------------------------- hub */

const finderTables = guideFinder.map((group) =>
  decisionModel(group.table.caption, group.table.rows, group.table.columns),
);
const hubStrings = [
  ...guideFinder.map((group) => group.title),
  ...finderTables.flatMap(tableStrings),
  ...guideUseChecklist.flatMap((item) => {
    const { label, detail } = checklistParts(item);
    return detail ? [label, detail] : [label];
  }),
];

test("the hub's guide finder points at every guide exactly once", () => {
  const linked = guideFinder.flatMap((group) =>
    group.table.rows.flatMap((row) => richTextLinks(row.preference)),
  );
  assert.deepEqual(
    [...linked].sort(),
    resourceGuides.map((guide) => `/resources/${guide.slug}/`).sort(),
  );
  for (const group of guideFinder) {
    for (const row of group.table.rows) {
      // One guide per row, named in the middle column only.
      assert.equal(richTextLinks(row.preference).length, 1, row.situation);
      assert.deepEqual(richTextLinks(row.situation), [], row.situation);
      assert.deepEqual(richTextLinks(row.confirm), [], row.situation);
    }
  }
});

test("the hub's finder tables are sound and share their headings", () => {
  const ids = guideFinder.map((group) => group.id);
  assert.equal(new Set(ids).size, ids.length);
  const captions = finderTables.map((table) => table.caption);
  assert.equal(new Set(captions).size, captions.length);
  for (const table of finderTables) {
    assert.deepEqual(tableProblems(table), [], table.caption);
    assert.deepEqual(table.headings, GUIDE_FINDER_COLUMNS, table.caption);
    assert.ok(table.rows.length >= 3, table.caption);
  }
});

test("hub block copy follows the same wording rules as the guides", () => {
  for (const href of hubStrings.flatMap(richTextLinks)) {
    assert.ok(knownRoutes.has(href), `hub links to unknown route ${href}`);
  }
  for (const copy of hubStrings) {
    for (const [pattern, claim] of claimRules) {
      assert.doesNotMatch(copy, pattern, `hub copy must not state ${claim}`);
    }
    assert.doesNotMatch(copy, american, copy);
    assert.doesNotMatch(copy, /['"]/, `straight quote in “${copy}”`);
    assert.doesNotMatch(copy, /\s-\s|--|\d/, copy);
    assert.equal(copy, copy.trim(), `stray space in “${copy}”`);
  }
  assert.ok(guideUseChecklist.length >= 4 && guideUseChecklist.length <= 6);
});

/* ------------------------------------------------------- titles and dates */

/** Layout title template: `%s — Elite Surface Group`. */
const TITLE_SUFFIX = ` — ${business.name}`;

test("guide and hub titles and descriptions stay within the snippet budget", () => {
  const titled = [
    ["resources hub", resourcesHub.metaTitle, resourcesHub.metaDescription],
    ...resourceGuides.map((guide) => [
      guide.slug,
      guide.metaTitle,
      guide.metaDescription,
    ]),
  ];
  for (const [page, metaTitle, metaDescription] of titled) {
    const full = `${metaTitle}${TITLE_SUFFIX}`;
    assert.ok(full.length <= 60, `${page} title is ${full.length}: ${full}`);
    assert.ok(
      metaDescription.length <= 155,
      `${page} description is ${metaDescription.length}`,
    );
  }
  assert.equal(
    new Set(titled.map(([, metaTitle]) => metaTitle)).size,
    titled.length,
  );
});

test("a guide's visible Updated date is its editorial modified date", () => {
  const display = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  for (const guide of resourceGuides) {
    assert.ok(guide.modified >= guide.published, guide.slug);
    assert.equal(
      guide.publishedDisplay,
      display.format(new Date(`${guide.published}T00:00:00Z`)),
      guide.slug,
    );
    if (guide.modified === guide.published) {
      assert.equal(guide.modifiedDisplay, undefined, guide.slug);
    } else {
      assert.equal(
        guide.modifiedDisplay,
        display.format(new Date(`${guide.modified}T00:00:00Z`)),
        guide.slug,
      );
      // A page that carries the date has to show it.
      assert.match(
        pageSource(guide.slug),
        /Updated \{\w+\.modifiedDisplay\}/,
        `${guide.slug} does not render its Updated date`,
      );
    }
  }
});
