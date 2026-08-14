import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { business } from "../content/business.ts";
import {
  contactFromAddress,
  contactToAddress,
  defaultFromAddress,
  usesRetiredInbox,
} from "./contact-delivery.ts";

const from = (configured?: string) =>
  contactFromAddress(configured, business.name, business.email);
const to = (configured?: string) =>
  contactToAddress(configured, business.email);

describe("usesRetiredInbox", () => {
  it("detects the former domain inbox", () => {
    assert.equal(usesRetiredInbox("info@elitesurfacegroup.com.au"), true);
    assert.equal(
      usesRetiredInbox("Elite Surface Group <info@elitesurfacegroup.com.au>"),
      true,
    );
    assert.equal(usesRetiredInbox("elite.surfacegroup@gmail.com"), false);
  });
});

describe("contactFromAddress", () => {
  it("defaults to the public Gmail inbox", () => {
    const expected = defaultFromAddress(business.name, business.email);
    assert.equal(from(""), expected);
    assert.equal(from("  "), expected);
    assert.equal(expected, `${business.name} <${business.email}>`);
    assert.equal(business.email, "elite.surfacegroup@gmail.com");
  });

  it("replaces former domain senders", () => {
    const expected = defaultFromAddress(business.name, business.email);
    assert.equal(from("info@elitesurfacegroup.com.au"), expected);
    assert.equal(
      from("Elite Surface Group Website <info@elitesurfacegroup.com.au>"),
      expected,
    );
    assert.equal(
      from("Elite Surface Group <website@elitesurfacegroup.com.au>"),
      expected,
    );
  });

  it("keeps a configured sender on another domain", () => {
    assert.equal(
      from("Elite Surface Group <beth.t@example.com>"),
      "Elite Surface Group <beth.t@example.com>",
    );
  });
});

describe("contactToAddress", () => {
  it("defaults to the public Gmail inbox", () => {
    assert.equal(to(""), business.email);
    assert.equal(to("  "), business.email);
  });

  it("replaces former domain inboxes", () => {
    assert.equal(to("info@elitesurfacegroup.com.au"), business.email);
    assert.equal(to("quotes@elitesurfacegroup.com.au"), business.email);
  });

  it("keeps an explicit non-domain destination", () => {
    assert.equal(to("owner@example.com"), "owner@example.com");
  });
});
