/**
 * Content rules for the multi-format blocks on the service-area hub and the
 * four area pages.
 *
 * These pages describe site conditions, so the checks guard the wording as
 * well as the shape: sound tables, links that resolve, FAQ copy that can feed
 * structured data unchanged, and no rating, approval outcome, price or
 * named-suburb claim the business has not published.
 */
import assert from "node:assert/strict";
import test from "node:test";
import type { ChecklistItem } from "../content/blocks.ts";
import { business } from "../content/business.ts";
import {
  areaComparison,
  getLocation,
  locationPages,
  locationsHub,
  siteChecklist,
} from "../content/locations.ts";
import type {
  LocationBlock,
  LocationPage,
  LocationSection,
} from "../content/locations.ts";
import { projects } from "../content/projects.ts";
import { resourceGuides } from "../content/resources.ts";
import { services } from "../content/services.ts";
import {
  checklistParts,
  comparisonModel,
  compatibilityModel,
  linkedPaths,
  problemsModel,
  tableProblems,
  tableStrings,
} from "./content-blocks.ts";
import type { TableModel } from "./content-blocks.ts";
import { richTextLinks } from "./rich-text.ts";

/** Layout title template: `%s — Elite Surface Group`. */
const TITLE_SUFFIX = ` — ${business.name}`;

const knownRoutes = new Set([
  "/",
  "/about/",
  "/contact-us/",
  "/services/",
  "/projects/",
  "/project-planning/",
  "/resources/",
  "/locations/",
  ...locationPages.map((location) => `/locations/${location.slug}/`),
  ...services.map((service) => `/${service.slug}/`),
  ...projects.map((project) => `/projects/${project.slug}/`),
  ...resourceGuides.map((guide) => `/resources/${guide.slug}/`),
]);

/** In-page targets on the project planning page that location copy may use. */
const planningAnchors = new Set(["site-readiness", "quote-steps"]);

function page(slug: string): LocationPage {
  const location = getLocation(slug);
  assert.ok(location, `missing location ${slug}`);
  return location;
}

function blocksOf(location: LocationPage): LocationBlock[] {
  return location.sections.flatMap((section) => section.blocks ?? []);
}

function blocksOfKind<K extends LocationBlock["kind"]>(
  location: LocationPage,
  kind: K,
): Extract<LocationBlock, { kind: K }>[] {
  return blocksOf(location).filter(
    (block): block is Extract<LocationBlock, { kind: K }> =>
      block.kind === kind,
  );
}

function tableOf(block: LocationBlock): TableModel | undefined {
  switch (block.kind) {
    case "comparison":
      return comparisonModel(block.table);
    case "conditions":
      return compatibilityModel(block.caption, block.rows, block.columns);
    case "problems":
      return problemsModel(block.caption, block.rows);
    default:
      return undefined;
  }
}

function checklistStrings(items: readonly ChecklistItem[]): string[] {
  return items.flatMap((item) => {
    const { label, detail } = checklistParts(item);
    return detail ? [label, detail] : [label];
  });
}

function blockStrings(block: LocationBlock): string[] {
  const table = tableOf(block);
  if (table) {
    return tableStrings(table);
  }
  if (block.kind === "checklist") {
    return checklistStrings(block.items);
  }
  if (block.kind === "steps") {
    return block.steps.flatMap((step) => [step.title, step.body]);
  }
  return [];
}

function blockHrefs(block: LocationBlock): (string | undefined)[] {
  return tableOf(block)?.rows.map((row) => row.href) ?? [];
}

/** Sections that this run added outright, by page. */
const addedSectionIds: Record<string, readonly string[]> = {
  adelaide: ["adelaide-services"],
  "northern-adelaide": ["northern-problems"],
  "coastal-adelaide": ["coastal-systems", "coastal-problems"],
  "adelaide-hills": ["hills-considerations", "hills-access"],
};

/** FAQs that this run added, by page: everything after the original set. */
const originalFaqCount: Record<string, number> = {
  adelaide: 5,
  "northern-adelaide": 4,
  "coastal-adelaide": 5,
  "adelaide-hills": 4,
};

function sectionCopy(section: LocationSection): string[] {
  return [
    section.heading,
    ...(section.navLabel ? [section.navLabel] : []),
    ...section.paragraphs,
    ...(section.bullets ?? []),
    ...(section.closing ?? []),
  ];
}

const hubCopy: readonly string[] = [
  locationsHub.comparisonTitle,
  locationsHub.comparisonIntro,
  locationsHub.comparisonNote,
  locationsHub.siteChecklistTitle,
  locationsHub.siteChecklistIntro,
  locationsHub.siteChecklistClosing,
  ...tableStrings(comparisonModel(areaComparison)),
  ...checklistStrings(siteChecklist),
];

/** Every string this run added to a location page, whatever renders it. */
function addedCopy(location: LocationPage): string[] {
  return [
    ...blocksOf(location).flatMap(blockStrings),
    ...location.sections
      .filter((section) =>
        (addedSectionIds[location.slug] ?? []).includes(section.id),
      )
      .flatMap(sectionCopy),
    ...location.faqs
      .slice(originalFaqCount[location.slug] ?? 0)
      .flatMap((faq) => [faq.question, faq.answer]),
  ];
}

const allAddedCopy: readonly string[] = [
  ...hubCopy,
  ...locationPages.flatMap(addedCopy),
];

test("the service-area inventory is Adelaide and three region pages", () => {
  assert.deepEqual(
    locationPages.map((location) => location.slug),
    ["adelaide", "northern-adelaide", "coastal-adelaide", "adelaide-hills"],
  );
});

test("every location table is a sound grid with a caption", () => {
  assert.deepEqual(tableProblems(comparisonModel(areaComparison)), []);

  const captions: string[] = [areaComparison.caption];
  for (const location of locationPages) {
    for (const block of blocksOf(location)) {
      const table = tableOf(block);
      if (table) {
        assert.deepEqual(tableProblems(table), [], table.caption);
        captions.push(table.caption);
      }
    }
  }
  assert.equal(new Set(captions).size, captions.length, "captions are unique");
});

test("tables stay at four columns or fewer so cells can hold sentences", () => {
  const tables = [
    comparisonModel(areaComparison),
    ...locationPages.flatMap((location) =>
      blocksOf(location).flatMap((block) => tableOf(block) ?? []),
    ),
  ];
  for (const table of tables) {
    assert.ok(table.headings.length <= 4, table.caption);
    assert.ok(table.rows.length >= 4, table.caption);
  }
});

test("the hub comparison lists the four areas in site order, each linked", () => {
  assert.deepEqual(
    areaComparison.rows.map((row) => row.href),
    locationPages.map((location) => `/locations/${location.slug}/`),
  );
  assert.deepEqual(
    areaComparison.rows.map((row) => row.label),
    [
      "Metropolitan Adelaide",
      "Northern Adelaide",
      "Coastal Adelaide",
      "Adelaide Hills",
    ],
  );

  // One row per area, each on the question its own page leads with.
  const rows = new Map(
    areaComparison.rows.map((row) => [row.label, row.cells.join(" ")]),
  );
  assert.match(rows.get("Northern Adelaide") ?? "", /[Rr]eactive clay/);
  assert.match(rows.get("Coastal Adelaide") ?? "", /Salt and wind/);
  assert.match(rows.get("Adelaide Hills") ?? "", /Slope and access/);
  assert.match(rows.get("Adelaide Hills") ?? "", /bushfire-related/);
});

test("the hub site checklist is a list of things to tell us, linked to planning", () => {
  assert.ok(siteChecklist.length >= 6);
  const labels = siteChecklist.map((item) => checklistParts(item).label);
  assert.equal(new Set(labels).size, labels.length);
  assert.equal(labels[0], "Suburb or postcode");
  for (const item of siteChecklist) {
    const { label, detail } = checklistParts(item);
    assert.ok(label.length <= 48, label);
    assert.ok(detail && detail.endsWith("."), label);
  }
  assert.deepEqual(richTextLinks(locationsHub.siteChecklistClosing), [
    "/project-planning/",
  ]);
});

test("every area page carries a table and a pre-quote checklist", () => {
  for (const location of locationPages) {
    const blocks = blocksOf(location);
    assert.ok(
      blocks.some((block) => tableOf(block)),
      `${location.slug} has a table`,
    );

    const checklists = blocksOfKind(location, "checklist");
    assert.equal(checklists.length, 1, `${location.slug} has one checklist`);
    const labels = checklists[0].items.map(
      (item) => checklistParts(item).label,
    );
    assert.ok(labels.length >= 6, location.slug);
    assert.equal(new Set(labels).size, labels.length, location.slug);
    assert.equal(labels[0], "Suburb or postcode", location.slug);
  }
});

test("the Adelaide page compares the four services and links the three regions", () => {
  const adelaide = page("adelaide");

  const [comparison] = blocksOfKind(adelaide, "comparison");
  assert.ok(comparison, "Adelaide has a service comparison");
  assert.deepEqual(
    comparison.table.rows.map((row) => [row.label, row.href]),
    services.map((service) => [service.name, `/${service.slug}/`]),
  );

  const [conditions] = blocksOfKind(adelaide, "conditions");
  assert.ok(conditions, "Adelaide has a city-wide considerations table");
  const links = linkedPaths(blockStrings(conditions));
  for (const slug of ["northern-adelaide", "coastal-adelaide", "adelaide-hills"]) {
    assert.ok(links.includes(`/locations/${slug}/`), slug);
  }
});

test("the northern page covers movement and links the cracking guide", () => {
  const northern = page("northern-adelaide");

  const [movement] = blocksOfKind(northern, "conditions");
  assert.match(movement.caption, /Reactive clay and movement/);
  assert.ok(
    movement.rows.some((row) => /control joints/.test(row.condition)),
    "movement table covers control joints",
  );

  const [problems] = blocksOfKind(northern, "problems");
  assert.ok(problems.rows.length >= 5);
  const problemsSection = northern.sections.find((section) =>
    section.blocks?.includes(problems),
  );
  assert.ok(
    linkedPaths(sectionCopy(problemsSection!)).includes(
      "/resources/render-cracking-adelaide/",
    ),
    "the problems section links the render-cracking guide",
  );
});

test("the coastal page covers salt, wind, unwashed areas and upkeep", () => {
  const coastal = page("coastal-adelaide");
  const conditions = blocksOfKind(coastal, "conditions");
  assert.equal(conditions.length, 2);

  const factors = conditions[0].rows.map((row) => row.condition).join(" | ");
  for (const factor of [/Salt/, /Wind/, /Unwashed areas/, /upkeep/]) {
    assert.match(factors, factor);
  }
  // Cladding and coating considerations sit in their own table.
  const finishes = conditions[1].rows.map((row) => row.condition).join(" | ");
  for (const finish of [/cladding/, /Rendered masonry/, /Hebel/]) {
    assert.match(finishes, finish);
  }

  const [problems] = blocksOfKind(coastal, "problems");
  assert.ok(problems.rows.length >= 5);
  assert.ok(
    linkedPaths(blockStrings(problems)).includes(
      "/resources/salt-damp-adelaide/",
    ),
  );
});

test("the Hills page covers slope, access and bushfire-related planning", () => {
  const hills = page("adelaide-hills");

  const [considerations] = blocksOfKind(hills, "conditions");
  const rows = considerations.rows.map((row) => row.condition).join(" | ");
  for (const topic of [/Bushfire-prone/, /Slope/, /Deliveries/, /Climate zone/]) {
    assert.match(rows, topic);
  }

  const [access] = blocksOfKind(hills, "steps");
  assert.ok(access.steps.length >= 5);
  const titles = access.steps.map((step) => step.title);
  assert.equal(new Set(titles).size, titles.length);
  assert.equal(titles[0], "Confirm coverage first");
});

test("bushfire copy names no rating and no approval outcome", () => {
  // The business does not assess a BAL: copy may say an assessment can be
  // needed and who makes it, never which rating applies or what will pass.
  const rating = /BAL[\s\-–]*(?:LOW|12(?:\.5)?|19|29|40|FZ)\b|flame zone/i;
  const outcome =
    /\b(?:will|would|should) (?:be approved|comply|pass)\b|is (?:compliant|approved for|suitable for BAL)|meets? (?:the )?BAL/i;

  const bushfireCopy = [
    ...allAddedCopy,
    ...locationPages.flatMap((location) => [
      ...location.sections.flatMap(sectionCopy),
      ...location.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ]),
  ];
  for (const copy of bushfireCopy) {
    assert.doesNotMatch(copy, rating, copy);
    assert.doesNotMatch(copy, outcome, copy);
  }
});

test("a wide table closes its section and is the only wide block in it", () => {
  for (const location of locationPages) {
    for (const section of location.sections) {
      const wide = (section.blocks ?? []).filter(
        (block) => block.kind === "comparison" && block.wide,
      );
      if (wide.length > 0) {
        assert.equal(wide.length, 1, section.id);
        assert.equal(section.closing, undefined, section.id);
      }
    }
  }
});

test("section ids are unique and the added sections exist", () => {
  for (const location of locationPages) {
    const ids = location.sections.map((section) => section.id);
    assert.equal(new Set(ids).size, ids.length, location.slug);
    for (const id of addedSectionIds[location.slug] ?? []) {
      assert.ok(ids.includes(id), `${location.slug} has #${id}`);
    }
    // Reserved by the page template.
    for (const reserved of ["location-intro", "location-guides", "location-faqs"]) {
      assert.ok(!ids.includes(reserved), reserved);
    }
  }
});

test("location copy links only to published routes", () => {
  const strings = [
    ...hubCopy,
    ...locationPages.flatMap((location) => [
      ...location.sections.flatMap(sectionCopy),
      ...blocksOf(location).flatMap(blockStrings),
    ]),
  ];
  const hrefs = [
    ...areaComparison.rows.map((row) => row.href),
    ...locationPages.flatMap((location) =>
      blocksOf(location).flatMap(blockHrefs),
    ),
  ];
  const links = linkedPaths(strings, hrefs);

  assert.ok(links.length > 40, "the location pages carry internal links");
  for (const href of links) {
    const [path, fragment] = href.split("#");
    assert.ok(knownRoutes.has(path), `links to unknown route ${href}`);
    if (fragment !== undefined) {
      assert.equal(path, "/project-planning/", href);
      assert.ok(planningAnchors.has(fragment), href);
    }
  }
});

test("region pages keep the internal links the smoke test requires", () => {
  const required: Record<string, readonly string[]> = {
    "northern-adelaide": [
      "/resources/render-cracking-adelaide/",
      "/resources/hebel-vs-brick-veneer-adelaide/",
    ],
    "coastal-adelaide": [
      "/resources/cladding-maintenance-coastal-adelaide/",
      "/resources/salt-damp-adelaide/",
      "/resources/steel-frame-vs-timber-frame-walls-adelaide/",
    ],
    "adelaide-hills": [
      "/resources/fibre-cement-vs-weatherboard-cladding-adelaide/",
      "/resources/steel-frame-vs-timber-frame-walls-adelaide/",
    ],
  };
  for (const [slug, hrefs] of Object.entries(required)) {
    const location = page(slug);
    const links = new Set([
      ...linkedPaths(location.sections.flatMap(sectionCopy)),
      ...(location.guides?.links.map((link) => link.href) ?? []),
    ]);
    for (const href of hrefs) {
      assert.ok(links.has(href), `${slug} links ${href}`);
    }
  }
});

test("every area page has at least four plain-text FAQs", () => {
  for (const location of locationPages) {
    assert.ok(location.faqs.length >= 4, location.slug);
    assert.ok(
      location.faqs.length > (originalFaqCount[location.slug] ?? 0),
      `${location.slug} gained FAQs`,
    );
    const questions = location.faqs.map((faq) => faq.question);
    assert.equal(new Set(questions).size, questions.length, location.slug);
    for (const faq of location.faqs) {
      // They feed FAQPage structured data, which cannot carry link syntax.
      assert.deepEqual(richTextLinks(faq.answer), [], faq.question);
      assert.doesNotMatch(faq.answer, /[[\]]|\]\(/, faq.question);
      assert.ok(faq.question.endsWith("?"), faq.question);
      assert.ok(faq.answer.length >= 40, faq.question);
    }
  }
});

test("the homepage's Adelaide coverage FAQ is still first", () => {
  assert.equal(
    page("adelaide").faqs[0].question,
    "Which parts of Adelaide do you service?",
  );
});

test("added copy makes no unverified or unpublished claim", () => {
  const rules: readonly [RegExp, string][] = [
    [
      // Mirrors the smoke test: no response time and no file-upload promise.
      /respond within one business day|(?:send (?:us )?|through our contact form)[^.]{0,100}(?:plans|photos|drawings)/i,
      "a response time or file upload",
    ],
    [/\bsen[dt]\b|\bsending\b/i, "the word “send”"],
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
      "years in business or a project count",
    ],
    [
      /testimonial|five[- ]star|5[- ]star|Google reviews?|\brated\b|award/i,
      "a review, rating or award",
    ],
    [/guarantee|warrant/i, "a guarantee or warranty"],
    [
      // Manufacturers are named only in the guides that cite them.
      /James Hardie|Hardie|COLORBOND|BlueScope|Weathertex|Rockcote|Dulux|CSR\b/i,
      "a manufacturer by name",
    ],
  ];

  for (const copy of allAddedCopy) {
    for (const [pattern, claim] of rules) {
      assert.doesNotMatch(copy, pattern, `copy must not state ${claim}`);
    }
  }
});

test("added copy names no suburb and no completed job", () => {
  // The area pages are planning pages. New tables, checklists, steps and FAQs
  // describe conditions, never work done in a particular suburb.
  const suburbs =
    /Salisbury|Elizabeth|Paralowie|Semaphore|Grange|Henley Beach|Glenelg|Brighton|Stirling|Mount Barker|Prospect|Norwood|Port Adelaide|Gawler|Mawson Lakes/;
  const completedJob =
    /\bwe (?:recently )?(?:completed|finished|rendered|clad|built)\b|\bour (?:recent )?(?:job|project|work) (?:in|at)\b/i;

  for (const copy of allAddedCopy) {
    assert.doesNotMatch(copy, suburbs, copy);
    assert.doesNotMatch(copy, completedJob, copy);
  }
});

test("added copy is written in Australian English with curly apostrophes", () => {
  const american =
    /\b(?:colors?|colored|programs?|meters?|center|centered|gray|aluminum|molded|neighbor\w*|organiz\w*|recogniz\w*|specializ\w*|license[ds]?|fiber)\b/i;
  for (const copy of allAddedCopy) {
    assert.doesNotMatch(copy, american, copy);
    assert.doesNotMatch(copy, /\w'\w/, `straight apostrophe in: ${copy}`);
  }
});

test("location titles and descriptions stay within the snippet budget", () => {
  const titled: [string, string, string][] = [
    ["hub", locationsHub.metaTitle, locationsHub.metaDescription],
    ...locationPages.map(
      (location): [string, string, string] => [
        location.slug,
        location.metaTitle,
        location.metaDescription,
      ],
    ),
  ];
  for (const [name, metaTitle, metaDescription] of titled) {
    const full = `${metaTitle}${TITLE_SUFFIX}`;
    assert.ok(full.length <= 60, `${name} title is ${full.length}: ${full}`);
    assert.ok(
      metaDescription.length <= 155,
      `${name} description is ${metaDescription.length}`,
    );
  }
  assert.equal(
    new Set(titled.map(([, metaTitle]) => metaTitle)).size,
    titled.length,
  );
  assert.equal(
    new Set(titled.map(([, , description]) => description)).size,
    titled.length,
  );
});
