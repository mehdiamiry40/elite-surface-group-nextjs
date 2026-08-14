import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { business } from "../content/business.ts";
import {
  contactFromAddress,
  contactToAddress,
  DEFAULT_FROM_EMAIL,
  usesRetiredInbox,
} from "./contact-delivery.ts";

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
    assert.equal(contactFromAddress(""), DEFAULT_FROM_EMAIL);
    assert.equal(contactFromAddress("  "), DEFAULT_FROM_EMAIL);
    assert.equal(DEFAULT_FROM_EMAIL, `${business.name} <${business.email}>`);
  });

  it("replaces former domain senders", () => {
    assert.equal(
      contactFromAddress("info@elitesurfacegroup.com.au"),
      DEFAULT_FROM_EMAIL,
    );
    assert.equal(
      contactFromAddress(
        "Elite Surface Group Website <info@elitesurfacegroup.com.au>",
      ),
      DEFAULT_FROM_EMAIL,
    );
    assert.equal(
      contactFromAddress(
        "Elite Surface Group <website@elitesurfacegroup.com.au>",
      ),
      DEFAULT_FROM_EMAIL,
    );
  });

  it("keeps a configured sender on another domain", () => {
    assert.equal(
      contactFromAddress("Elite Surface Group <beth.t@example.com>"),
      "Elite Surface Group <beth.t@example.com>",
    );
  });
});

describe("contactToAddress", () => {
  it("defaults to the public Gmail inbox", () => {
    assert.equal(contactToAddress(""), business.email);
    assert.equal(contactToAddress("  "), business.email);
    assert.equal(business.email, "elite.surfacegroup@gmail.com");
  });

  it("replaces former domain inboxes", () => {
    assert.equal(
      contactToAddress("info@elitesurfacegroup.com.au"),
      business.email,
    );
    assert.equal(
      contactToAddress("quotes@elitesurfacegroup.com.au"),
      business.email,
    );
  });

  it("keeps an explicit non-domain destination", () => {
    assert.equal(
      contactToAddress("owner@example.com"),
      "owner@example.com",
    );
  });
});
