/**
 * Content rules for the multi-format blocks on the home, company, planning
 * and project pages.
 *
 * These pages publish only what the business has confirmed, so the checks
 * below guard the wording as well as the shape: no prices, ratings,
 * accreditations or response times, links that resolve, and FAQ and HowTo
 * copy that can feed structured data unchanged.
 */
import assert from "node:assert/strict";
import test from "node:test";
import type { ChecklistItem } from "../content/blocks.ts";
import { business } from "../content/business.ts";
import {
  aboutScope,
  aboutWorkflow,
  contactFaqs,
} from "../content/company.ts";
import {
  enquiryChecklist,
  preparationByProjectType,
  projectPlanningPage,
  quotePreparation,
  siteReadiness,
} from "../content/project-planning.ts";
import {
  projectBriefChecklist,
  projectGlossary,
  projects,
} from "../content/projects.ts";
import { resourceGuides } from "../content/resources.ts";
import {
  homeServiceDecisions,
  serviceComparison,
  serviceComparisonDetailed,
  serviceDecisions,
} from "../content/service-comparison.ts";
import { services } from "../content/services.ts";
import {
  checklistParts,
  comparisonModel,
  decisionModel,
  howToSteps,
  linkedPaths,
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

function checklistStrings(items: readonly ChecklistItem[]): string[] {
  return items.flatMap((item) => {
    const { label, detail } = checklistParts(item);
    return detail ? [label, detail] : [label];
  });
}

const tables: readonly TableModel[] = [
  comparisonModel(serviceComparison),
  comparisonModel(serviceComparisonDetailed),
  decisionModel("Service decisions", serviceDecisions),
  comparisonModel(aboutScope),
  comparisonModel(preparationByProjectType),
];

const faqSets = {
  "project planning": projectPlanningPage.faqs,
  contact: contactFaqs,
} as const;

/** Per-project copy this run added, kept apart for the case-study rules. */
function caseStudyAdditions(project: (typeof projects)[number]): string[] {
  return [
    ...project.confirm,
    ...(project.terms ?? []).flatMap((entry) => [entry.term, entry.definition]),
    ...(project.note ? [project.note.title, project.note.body] : []),
  ];
}

/** Every string this run added to a page, whatever block renders it. */
const blockCopy: readonly string[] = [
  ...tables.flatMap(tableStrings),
  ...checklistStrings(enquiryChecklist),
  ...siteReadiness.flatMap((group) => [
    group.title,
    ...checklistStrings(group.items),
  ]),
  quotePreparation.name,
  quotePreparation.description,
  ...quotePreparation.steps.flatMap((step) => [step.title, step.body]),
  ...aboutWorkflow.flatMap((step) => [step.title, step.body]),
  ...checklistStrings(projectBriefChecklist),
  ...projectGlossary.flatMap((entry) => [entry.term, entry.definition]),
  ...projects.flatMap(caseStudyAdditions),
  ...Object.values(faqSets).flatMap((faqs) =>
    faqs.flatMap((faq) => [faq.question, faq.answer]),
  ),
];

test("every table is a sound grid with a caption", () => {
  for (const table of tables) {
    assert.deepEqual(tableProblems(table), [], table.caption);
  }
});

test("the service comparisons list the four services in site order", () => {
  for (const table of [serviceComparison, serviceComparisonDetailed]) {
    assert.deepEqual(
      table.rows.map((row) => [row.label, row.href]),
      services.map((service) => [service.name, `/${service.slug}/`]),
      table.caption,
    );
  }
});

test("the homepage decision guide is the start of the services-hub guide", () => {
  assert.ok(homeServiceDecisions.length >= 3);
  assert.ok(homeServiceDecisions.length < serviceDecisions.length);
  assert.deepEqual(
    homeServiceDecisions,
    serviceDecisions.slice(0, homeServiceDecisions.length),
  );
});

test("block copy links only to published routes", () => {
  const hrefs = tables.flatMap((table) => table.rows.map((row) => row.href));
  const links = linkedPaths(blockCopy, hrefs);

  assert.ok(links.length > 10, "the blocks carry internal links");
  for (const href of links) {
    assert.ok(knownRoutes.has(href), `links to unknown route ${href}`);
  }
});

test("other pages can point at the planning checklist", () => {
  // The projects hub brief sends readers to the canonical checklist rather
  // than restating it.
  assert.ok(
    linkedPaths(checklistStrings(projectBriefChecklist)).includes(
      "/project-planning/",
    ),
  );
});

test("the short enquiry checklist mirrors the six canonical enquiry details", () => {
  assert.equal(projectPlanningPage.enquiryDetails.length, 6);
  assert.equal(enquiryChecklist.length, 6);
  for (const item of enquiryChecklist) {
    const { label, detail } = checklistParts(item);
    assert.ok(label.length > 0 && label.length <= 32, label);
    assert.ok(detail && detail.endsWith("."), label);
  }
});

test("the site-readiness checklist covers its five groups with unique ids", () => {
  assert.deepEqual(
    siteReadiness.map((group) => group.title),
    [
      "Photos",
      "Plans and documents",
      "Access notes",
      "System and finish",
      "Programme",
    ],
  );
  const ids = siteReadiness.map((group) => group.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const group of siteReadiness) {
    assert.ok(group.items.length >= 3, group.title);
  }
});

test("the quote-preparation steps can feed HowTo schema word for word", () => {
  assert.ok(quotePreparation.steps.length >= 5);
  // Plain text only: the schema must repeat the visible step exactly.
  assert.deepEqual(
    howToSteps(quotePreparation.steps),
    quotePreparation.steps.map((step) => ({
      name: step.title,
      text: step.body,
    })),
  );
  const titles = quotePreparation.steps.map((step) => step.title);
  assert.equal(new Set(titles).size, titles.length);
});

test("FAQ answers stay plain text and questions are not repeated", () => {
  for (const [page, faqs] of Object.entries(faqSets)) {
    const questions = faqs.map((faq) => faq.question);
    assert.equal(new Set(questions).size, questions.length, page);
    for (const faq of faqs) {
      // They feed FAQPage structured data, which cannot carry link syntax.
      assert.deepEqual(richTextLinks(faq.answer), [], faq.question);
      assert.ok(faq.question.endsWith("?"), faq.question);
      assert.ok(faq.answer.length >= 20, faq.question);
    }
  }
});

test("the first planning FAQ is still the one the homepage shows", () => {
  assert.equal(
    projectPlanningPage.faqs[0].question,
    "Can I request a quote before the plans are final?",
  );
  assert.ok(projectPlanningPage.faqs.length >= 6);
});

test("contact FAQs publish the contact facts held in business.ts", () => {
  const answers = contactFaqs.map((faq) => faq.answer).join(" ");
  for (const fact of [
    business.hours.display,
    business.phoneDisplay,
    business.email,
    business.address.suburb,
  ]) {
    assert.ok(answers.includes(fact), `contact FAQs state ${fact}`);
  }
  // Locality only: no street, postcode or second phone number.
  assert.doesNotMatch(answers, /\b5\d{3}\b|\bSt(?:reet)?\b|\bRoad\b/);
  assert.deepEqual(answers.match(/0\d{3} \d{3} \d{3}/g), [
    business.phoneDisplay,
  ]);
});

test("the about scope table states the limits the brief requires", () => {
  const rows = new Map(aboutScope.rows.map((row) => [row.label, row.cells]));
  assert.match(rows.get("Trades")?.[1] ?? "", /outside those four services/);
  assert.match(
    rows.get("Service area")?.[0] ?? "",
    /assess sites elsewhere in South Australia individually/,
  );
  assert.match(rows.get("Premises")?.[1] ?? "", /shopfront/);
  assert.match(rows.get("Quotes")?.[1] ?? "", /price list or rates/);
});

test("block copy makes no unverified or unpublished claim", () => {
  const rules: readonly [RegExp, string][] = [
    [
      // Mirrors the smoke test: no response time and no file-upload promise.
      /respond within one business day|(?:send (?:us )?|through our contact form)[^.]{0,100}(?:plans|photos|drawings)/i,
      "a response time or file upload",
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
      "years in business or a project count",
    ],
    [
      /testimonial|five[- ]star|5[- ]star|Google reviews?|\brated\b|award/i,
      "a review, rating or award",
    ],
    [/guarantee|warrant/i, "a guarantee or warranty"],
  ];

  for (const copy of blockCopy) {
    for (const [pattern, claim] of rules) {
      assert.doesNotMatch(copy, pattern, `copy must not state ${claim}`);
    }
  }
});

test("block copy is written in Australian English", () => {
  const american =
    /\b(?:colors?|colored|programs?|meters?|center|centered|gray|aluminum|molded|neighbor\w*|organiz\w*|recogniz\w*|specializ\w*)\b/i;
  for (const copy of blockCopy) {
    assert.doesNotMatch(copy, american, copy);
  }
});

test("each case study carries a checklist and one supporting block", () => {
  for (const project of projects) {
    assert.ok(project.confirm.length >= 4, project.slug);
    assert.equal(
      new Set(project.confirm).size,
      project.confirm.length,
      project.slug,
    );
    assert.ok(
      Boolean(project.terms?.length) || Boolean(project.note),
      `${project.slug} has a glossary or a note`,
    );
  }
});

test("case-study terms come from that project's own copy", () => {
  for (const project of projects) {
    const published = [
      project.title,
      project.summary,
      project.overview,
      project.detailFocus,
      project.visibleResult,
      project.imageCaption,
      ...project.features,
    ]
      .join(" ")
      .toLowerCase();

    for (const entry of project.terms ?? []) {
      assert.ok(
        published.includes(entry.term.toLowerCase()),
        `${project.slug}: "${entry.term}" is not a term its copy uses`,
      );
    }
  }
});

test("case-study additions avoid unsupported labels and inferred headings", () => {
  // Mirrors the smoke test's rule for every case-study page.
  const unsupported =
    /charcoal|limestone|aluminium-framed|The challenge|The scope/i;
  for (const project of projects) {
    for (const copy of caseStudyAdditions(project)) {
      assert.doesNotMatch(copy, unsupported, project.slug);
    }
  }
});

test("page titles and descriptions stay within the snippet budget", () => {
  const titled = [
    ["project planning", projectPlanningPage.metaTitle],
    ...projects.map((project) => [project.slug, project.metaTitle]),
  ];
  for (const [page, metaTitle] of titled) {
    const full = `${metaTitle}${TITLE_SUFFIX}`;
    assert.ok(full.length <= 60, `${page} title is ${full.length}: ${full}`);
  }
  assert.equal(
    new Set(titled.map(([, metaTitle]) => metaTitle)).size,
    titled.length,
  );
  assert.ok(projectPlanningPage.metaDescription.length <= 155);
});
