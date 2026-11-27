/**
 * Content rules for the tables, workflows, checklists and glossaries on the
 * four service pages.
 *
 * The service pages publish only what the site already states elsewhere, so
 * these checks guard the wording as well as the shape: sound tables, links
 * that resolve, FAQ answers that can feed structured data unchanged, and no
 * price, rating, accreditation or response-time claim.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { business } from "../content/business.ts";
import { projects } from "../content/projects.ts";
import { resourceGuides } from "../content/resources.ts";
import type { SectionFormat } from "../content/section-formats.ts";
import {
  serviceNames,
  services,
  type Service,
} from "../content/services.ts";
import {
  checklistParts,
  comparisonModel,
  compatibilityModel,
  decisionModel,
  linkedPaths,
  problemsModel,
  tableProblems,
  tableStrings,
  type TableModel,
} from "./content-blocks.ts";
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
  "/locations/adelaide/",
  "/locations/northern-adelaide/",
  "/locations/coastal-adelaide/",
  "/locations/adelaide-hills/",
  ...services.map((service) => `/${service.slug}/`),
  ...projects.map((project) => `/projects/${project.slug}/`),
  ...resourceGuides.map((guide) => `/resources/${guide.slug}/`),
]);

type FormatType = SectionFormat["type"];

function formatsOf(service: Service): SectionFormat[] {
  return (service.sections ?? []).flatMap((section) => section.formats ?? []);
}

function formatTypes(service: Service): FormatType[] {
  return formatsOf(service).map((format) => format.type);
}

/** A table format as the model the component renders, or nothing. */
function tableOf(format: SectionFormat): TableModel | undefined {
  switch (format.type) {
    case "comparison":
      return comparisonModel(format.table);
    case "decision":
      return decisionModel(format.caption, format.rows, format.columns);
    case "compatibility":
      return compatibilityModel(format.caption, format.rows, format.columns);
    case "problems":
      return problemsModel(format.caption, format.rows, format.columns);
    default:
      return undefined;
  }
}

/** Every string a format shows, whatever block renders it. */
function formatStrings(format: SectionFormat): string[] {
  const frame = [format.heading, format.intro].filter(
    (value): value is string => Boolean(value),
  );
  const table = tableOf(format);
  if (table) {
    return [...frame, ...tableStrings(table)];
  }
  switch (format.type) {
    case "steps":
      return [...frame, ...format.steps.flatMap((s) => [s.title, s.body])];
    case "checklist":
      return [
        ...frame,
        ...format.items.flatMap((item) => {
          const { label, detail } = checklistParts(item);
          return detail ? [label, detail] : [label];
        }),
      ];
    case "glossary":
      return [
        ...frame,
        ...format.terms.flatMap((entry) => [entry.term, entry.definition]),
      ];
    case "callout":
      return [...frame, format.note.title, format.note.body];
    default:
      return frame;
  }
}

/** Row-heading links, which sit outside the rich-text strings. */
function formatHrefs(format: SectionFormat): (string | undefined)[] {
  return format.type === "comparison"
    ? format.table.rows.map((row) => row.href)
    : [];
}

/** All long-form copy on a service page: prose, formats and FAQs. */
function pageCopy(service: Service): string[] {
  return [
    ...(service.sections ?? []).flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
      ...(section.closing ?? []),
      ...(section.formats ?? []).flatMap(formatStrings),
    ]),
    ...service.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ];
}

function service(slug: Service["slug"]): Service {
  const found = services.find((candidate) => candidate.slug === slug);
  assert.ok(found, `${slug} is a published service`);
  return found;
}

function count<T>(items: readonly T[], wanted: T): number {
  return items.filter((item) => item === wanted).length;
}

test("each service page carries the formats planned for it", () => {
  const planned: Record<Service["slug"], readonly FormatType[]> = {
    cladding: [
      "compatibility",
      "decision",
      "comparison",
      "steps",
      "problems",
      "checklist",
      "glossary",
      "callout",
    ],
    render: [
      "comparison",
      "compatibility",
      "steps",
      "problems",
      "checklist",
      "glossary",
    ],
    hebel: ["decision", "compatibility", "steps", "checklist", "glossary"],
    walling: [
      "comparison",
      "compatibility",
      "steps",
      "checklist",
      "callout",
      "glossary",
    ],
  };

  for (const [slug, types] of Object.entries(planned)) {
    const present = formatTypes(service(slug as Service["slug"]));
    for (const type of types) {
      assert.ok(present.includes(type), `${slug} has a ${type} block`);
    }
  }

  // Hebel compares wall applications and sets out coating notes separately.
  assert.equal(count(formatTypes(service("hebel")), "compatibility"), 2);
});

test("every service table is a sound grid with a unique caption", () => {
  for (const item of services) {
    const tables = formatsOf(item)
      .map(tableOf)
      .filter((table): table is TableModel => Boolean(table));
    assert.ok(tables.length >= 2, `${item.slug} has at least two tables`);

    for (const table of tables) {
      assert.deepEqual(tableProblems(table), [], table.caption);
      // Sentences in cells need the reading column, so no table is wider
      // than a row heading and three data columns.
      assert.ok(table.headings.length <= 4, table.caption);
    }

    const captions = tables.map((table) => table.caption);
    assert.equal(new Set(captions).size, captions.length, item.slug);
  }
});

test("section and format ids are unique on each service page", () => {
  for (const item of services) {
    const sections = item.sections ?? [];
    const ids = [
      // Ids the page template itself uses.
      "service-intro",
      "service-detail",
      "service-faqs",
      "service-guides",
      `${item.slug}-project-details`,
      ...sections.map((section) => section.id),
      ...formatsOf(item).flatMap((format) => (format.id ? [format.id] : [])),
    ];
    assert.equal(new Set(ids).size, ids.length, item.slug);
    for (const id of ids) {
      assert.match(id, /^[a-z][a-z0-9-]*$/, id);
    }
    // A format id names its sub-heading, so it needs one to attach to.
    for (const format of formatsOf(item)) {
      assert.ok(!format.id || format.heading, `${format.id} has a heading`);
    }
  }
});

test("service copy links only to published routes", () => {
  for (const item of services) {
    const links = linkedPaths(
      pageCopy(item),
      formatsOf(item).flatMap(formatHrefs),
    );
    assert.ok(links.length > 10, `${item.slug} carries internal links`);
    for (const href of links) {
      assert.ok(knownRoutes.has(href), `${item.slug} links to ${href}`);
    }
  }
});

test("each service page keeps the guide links the plan and smoke test rely on", () => {
  const required: Record<Service["slug"], readonly string[]> = {
    cladding: [
      "/resources/vertical-vs-horizontal-cladding-adelaide/",
      "/resources/cladding-maintenance-coastal-adelaide/",
      "/locations/coastal-adelaide/",
      "/resources/facade-recladding-adelaide/",
      "/resources/fibre-cement-cladding-adelaide/",
      "/resources/cladding-vs-render-adelaide/",
    ],
    render: [
      "/resources/acrylic-render-vs-cement-render-adelaide/",
      "/resources/salt-damp-adelaide/",
      "/resources/render-cracking-adelaide/",
      "/resources/render-repair-adelaide/",
      "/resources/render-finishes-adelaide/",
      "/resources/preparing-walls-for-render-adelaide/",
      "/resources/internal-rendering-adelaide/",
      "/resources/cladding-vs-render-adelaide/",
    ],
    hebel: [
      "/resources/hebel-vs-brick-veneer-adelaide/",
      "/resources/hebel-boundary-walls-adelaide/",
      "/resources/rendering-hebel-panels-adelaide/",
      "/resources/choosing-a-hebel-installer-adelaide/",
    ],
    walling: [
      "/resources/steel-frame-vs-timber-frame-walls-adelaide/",
      "/resources/load-bearing-wall-removal-adelaide/",
      "/resources/external-wall-insulation-adelaide/",
    ],
  };

  for (const item of services) {
    const inCopy = new Set(linkedPaths(pageCopy(item)));
    const inGuides = new Set(item.guides?.links.map((link) => link.href));
    for (const href of [
      ...required[item.slug],
      "/resources/what-affects-cladding-render-quotes-adelaide/",
    ]) {
      assert.ok(
        inCopy.has(href) || inGuides.has(href),
        `${item.slug} links to ${href}`,
      );
    }
    // The comparison each page is built around is linked from the body copy,
    // not only from the guide list under the FAQs.
    assert.ok(inCopy.has(required[item.slug][0]), item.slug);
    assert.ok(inCopy.has("/project-planning/"), item.slug);
  }
});

test("service FAQs can feed FAQPage schema unchanged", () => {
  for (const item of services) {
    assert.ok(item.faqs.length >= 4, `${item.slug} keeps at least four FAQs`);
    const questions = item.faqs.map((faq) => faq.question);
    assert.equal(new Set(questions).size, questions.length, item.slug);
    for (const faq of item.faqs) {
      // Plain text only: the schema repeats the visible answer word for word.
      assert.deepEqual(richTextLinks(faq.answer), [], faq.question);
      assert.doesNotMatch(faq.answer, /\]\(|<[a-z]/i, faq.question);
      assert.ok(faq.question.endsWith("?"), faq.question);
      assert.ok(faq.answer.length >= 40, faq.question);
    }
  }
});

test("the homepage still shows each service's opening FAQ", () => {
  assert.deepEqual(
    services.map((item) => item.faqs[0].question),
    [
      "Which cladding systems do you install in Adelaide?",
      "What causes render to crack?",
      "Are Hebel walls fire resistant?",
      "Do you handle internal and external walling?",
    ],
  );
});

test("numbered workflows have distinct, complete steps", () => {
  for (const item of services) {
    const workflows = formatsOf(item).flatMap((format) =>
      format.type === "steps" ? [format.steps] : [],
    );
    assert.ok(workflows.length >= 1, `${item.slug} has a workflow`);
    for (const steps of workflows) {
      assert.ok(steps.length >= 5, item.slug);
      const titles = steps.map((step) => step.title);
      assert.equal(new Set(titles).size, titles.length, item.slug);
      for (const step of steps) {
        assert.ok(step.body.endsWith("."), step.title);
      }
    }
  }
});

test("checklists are tasks for the reader, each with a supporting sentence", () => {
  for (const item of services) {
    const checklists = formatsOf(item).flatMap((format) =>
      format.type === "checklist" ? [format.items] : [],
    );
    assert.equal(checklists.length, 1, `${item.slug} has one checklist`);
    for (const entry of checklists[0]) {
      const { label, detail } = checklistParts(entry);
      assert.ok(label.length > 0 && label.length <= 34, label);
      assert.ok(detail && detail.endsWith("."), label);
    }
    assert.ok(checklists[0].length >= 6, item.slug);
  }
});

test("glossary terms are unique and used by the page they sit on", () => {
  for (const item of services) {
    const terms = formatsOf(item).flatMap((format) =>
      format.type === "glossary" ? format.terms : [],
    );
    assert.ok(terms.length >= 6, `${item.slug} has a glossary`);
    const names = terms.map((entry) => entry.term);
    assert.equal(new Set(names).size, names.length, item.slug);

    // Everything on the page except the glossary itself.
    const elsewhere = [
      ...item.intro,
      ...item.detail,
      ...item.benefits,
      ...(item.sections ?? []).flatMap((section) => [
        ...section.paragraphs,
        ...(section.bullets ?? []),
        ...(section.closing ?? []),
        ...(section.formats ?? [])
          .filter((format) => format.type !== "glossary")
          .flatMap(formatStrings),
      ]),
      ...item.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ]
      .join(" ")
      .toLowerCase();

    for (const entry of terms) {
      assert.ok(
        elsewhere.includes(entry.term.toLowerCase()),
        `${item.slug}: "${entry.term}" is not a term the page uses`,
      );
      assert.ok(entry.definition.endsWith("."), entry.term);
    }
  }
});

test("render copy never suggests render fixes rising damp", () => {
  const render = service("render");
  const problems = formatsOf(render).find((f) => f.type === "problems");
  assert.ok(problems && problems.type === "problems");
  const dampRow = problems.rows.find((row) => /salt damp/i.test(row.indicates));
  assert.ok(dampRow, "the problems table has a salt-damp row");
  assert.match(dampRow.next, /Render alone does not fix rising damp/);
  assert.match(dampRow.next, /moisture source assessed and dealt with/);

  for (const copy of pageCopy(render)) {
    assert.doesNotMatch(
      copy,
      /render (?:will|can|to) (?:fix|cure|stop|treat) (?:rising|salt) damp/i,
    );
  }
});

test("walling leaves load-bearing walls to a structural engineer", () => {
  const walling = service("walling");
  const section = (walling.sections ?? []).find(
    (candidate) => candidate.id === "renovation-walling",
  );
  assert.ok(section);
  const callout = (section.formats ?? []).find((f) => f.type === "callout");
  assert.ok(callout && callout.type === "callout");
  assert.equal(callout.tone, "caution");
  assert.match(callout.note.body, /only a structural engineer/);
  assert.ok(
    linkedPaths(section.closing ?? []).includes(
      "/resources/load-bearing-wall-removal-adelaide/",
    ),
  );

  // No sizing, propping or removal method anywhere on the page.
  for (const copy of pageCopy(walling)) {
    assert.doesNotMatch(
      copy,
      /\b(?:beam size|lintel size|acrow|span of|you can remove)\b/i,
    );
  }
});

test("the framing comparison leaves bushfire ratings to the assessors", () => {
  for (const item of services) {
    for (const copy of formatsOf(item).flatMap(formatStrings)) {
      assert.doesNotMatch(copy, /\bBAL[- ]?(?:Low|FZ|\d)/i, copy);
    }
  }
});

test("service formats and FAQs make no unverified or unpublished claim", () => {
  const rules: readonly [RegExp, string][] = [
    [
      // Mirrors the smoke test: no response time and no file-upload promise.
      /respond within one business day|(?:send (?:us )?|through our contact form)[^.]{0,100}(?:plans|photos|drawings)/i,
      "a response time or file upload",
    ],
    [/\bsend\b/i, "the word “send”"],
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
    [/on an Adelaide home|on a new Adelaide build/, "an image-locality claim"],
  ];

  for (const item of services) {
    const copy = [
      ...formatsOf(item).flatMap(formatStrings),
      ...item.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ];
    for (const text of copy) {
      for (const [pattern, claim] of rules) {
        assert.doesNotMatch(text, pattern, `copy must not state ${claim}`);
      }
    }
  }
});

test("service formats and FAQs are written in Australian English", () => {
  const american =
    /\b(?:colors?|colored|programs?|meters?|center|centered|gray|aluminum|molded|neighbor\w*|organiz\w*|recogniz\w*|specializ\w*|fiber|license[sd]? (?:the|a|to)|mold)\b/i;
  // Straight quotes would break the site's typography.
  const straightQuote = /['"]/;
  for (const item of services) {
    const copy = [
      ...formatsOf(item).flatMap(formatStrings),
      ...item.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ];
    for (const text of copy) {
      assert.doesNotMatch(text, american, text);
      assert.doesNotMatch(text, straightQuote, text);
    }
  }
});

test("service titles and descriptions stay within the snippet budget", () => {
  for (const item of services) {
    const full = `${item.metaTitle}${TITLE_SUFFIX}`;
    assert.ok(full.length <= 60, `${item.slug} title is ${full.length}: ${full}`);
    assert.ok(
      item.metaDescription.length <= 155,
      `${item.slug} description is ${item.metaDescription.length}`,
    );
  }
  const titles = services.map((item) => item.metaTitle);
  assert.equal(new Set(titles).size, titles.length);

  // The trimmed cladding title still names both services and the city.
  const cladding = service("cladding");
  assert.ok(cladding.metaTitle.length <= 38);
  assert.match(cladding.metaTitle, /Cladding/);
  assert.match(cladding.metaTitle, /Facade/);
  assert.match(cladding.metaTitle, /Adelaide/);
});

test("service pages show their steps without HowTo, Review or rating schema", () => {
  for (const file of [
    "../app/[service]/page.tsx",
    "../components/ServiceSections.tsx",
  ]) {
    const source = readFileSync(new URL(file, import.meta.url), "utf8");
    assert.doesNotMatch(source, /HowTo|AggregateRating|"Review"/, file);
  }
});

test("the enquiry form's service names match the services without importing their copy", () => {
  assert.deepEqual(
    serviceNames,
    services.map((item) => item.name),
  );

  // The enquiry form is a client component. If this list were derived from
  // `services`, the bundler could not drop the page copy from the browser
  // bundle, and the first-load budget would fail.
  const source = readFileSync(
    new URL("../content/services.ts", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(source, /serviceNames[^=]*=\s*services\b/);
});
