import assert from "node:assert/strict";
import test from "node:test";
import { resourceGuides } from "../content/resources.ts";
import { services } from "../content/services.ts";
import { parseRichText, richTextLinks } from "./rich-text.ts";

test("plain copy is returned as one text segment", () => {
  assert.deepEqual(parseRichText("Render is bonded to its substrate."), [
    { type: "text", value: "Render is bonded to its substrate." },
  ]);
});

test("inline links are split out with their surrounding text", () => {
  assert.deepEqual(
    parseRichText("Read the [render guide](/resources/render/) first."),
    [
      { type: "text", value: "Read the " },
      { type: "link", label: "render guide", href: "/resources/render/" },
      { type: "text", value: " first." },
    ],
  );
  assert.deepEqual(parseRichText("[Cladding](/cladding/) and [Hebel](/hebel/)"), [
    { type: "link", label: "Cladding", href: "/cladding/" },
    { type: "text", value: " and " },
    { type: "link", label: "Hebel", href: "/hebel/" },
  ]);
});

test("only site-relative paths become links", () => {
  for (const source of [
    "See [the manufacturer](https://example.com/guide) for details.",
    "See [the manufacturer](//example.com/guide) for details.",
    "A bracketed [note] followed by (an aside).",
  ]) {
    assert.deepEqual(parseRichText(source), [{ type: "text", value: source }]);
  }
});

test("service copy links only to published routes", () => {
  const known = new Set([
    "/project-planning/",
    "/projects/",
    "/resources/",
    "/locations/",
    "/locations/adelaide/",
    "/locations/northern-adelaide/",
    "/locations/coastal-adelaide/",
    "/locations/adelaide-hills/",
    ...services.map((service) => `/${service.slug}/`),
    ...resourceGuides.map((guide) => `/resources/${guide.slug}/`),
  ]);

  for (const service of services) {
    const copy = [
      ...(service.sections ?? []).flatMap((section) => [
        ...section.paragraphs,
        ...(section.closing ?? []),
      ]),
    ];
    const links = copy.flatMap(richTextLinks);
    assert.ok(links.length > 0, `${service.slug} sections carry inline links`);
    for (const href of links) {
      assert.ok(known.has(href), `${service.slug} links to unknown ${href}`);
    }
    for (const link of service.guides?.links ?? []) {
      assert.ok(known.has(link.href), `${service.slug} guide ${link.href}`);
    }
    // FAQ answers feed FAQPage structured data and must stay plain text.
    for (const faq of service.faqs) {
      assert.deepEqual(richTextLinks(faq.answer), []);
    }
  }
});

test("service section ids are unique on each page", () => {
  for (const service of services) {
    const ids = (service.sections ?? []).map((section) => section.id);
    assert.equal(new Set(ids).size, ids.length, service.slug);
  }
});
