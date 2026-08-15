import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { business } from "../content/business.ts";
import {
  contactFromAddress,
  contactToAddress,
  DEFAULT_FROM_EMAIL,
  defaultFromAddress,
  isResendCompatibleFrom,
  shouldCaptureEnquiryLocally,
  usesRetiredInbox,
} from "./contact-delivery.ts";

const from = (configured?: string) =>
  contactFromAddress(configured, business.name);
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
  it("defaults to the business domain, not Gmail", () => {
    const expected = defaultFromAddress(business.name);
    assert.equal(from(""), expected);
    assert.equal(from("  "), expected);
    assert.equal(expected, `${business.name} <${DEFAULT_FROM_EMAIL}>`);
    assert.equal(DEFAULT_FROM_EMAIL, "info@elitesurfacegroup.com.au");
    assert.notEqual(DEFAULT_FROM_EMAIL, business.email);
  });

  // The sender is the one place the business domain must survive: it is the
  // domain that can be verified with Resend, and a Gmail sender cannot send
  // at all. Rejecting it here fails every enquiry at the provider.
  it("keeps a configured sender on the business domain", () => {
    assert.equal(
      from("Elite Surface Group <info@elitesurfacegroup.com.au>"),
      "Elite Surface Group <info@elitesurfacegroup.com.au>",
    );
    assert.equal(
      from("website@elitesurfacegroup.com.au"),
      "website@elitesurfacegroup.com.au",
    );
  });

  it("keeps a configured sender on another domain", () => {
    assert.equal(
      from("Elite Surface Group <beth.t@example.com>"),
      "Elite Surface Group <beth.t@example.com>",
    );
  });
});

describe("isResendCompatibleFrom", () => {
  it("accepts the business domain and Resend's test domain", () => {
    assert.equal(
      isResendCompatibleFrom("Elite Surface Group <info@elitesurfacegroup.com.au>"),
      true,
    );
    assert.equal(isResendCompatibleFrom("website@elitesurfacegroup.com.au"), true);
    assert.equal(
      isResendCompatibleFrom("Elite Surface Group <beth.t@example.com>"),
      true,
    );
  });

  it("rejects Gmail and other public-mailbox senders", () => {
    assert.equal(
      isResendCompatibleFrom("Elite Surface Group <elite.surfacegroup@gmail.com>"),
      false,
    );
    assert.equal(isResendCompatibleFrom("owner@googlemail.com"), false);
    assert.equal(isResendCompatibleFrom("owner@outlook.com"), false);
    assert.equal(isResendCompatibleFrom("not-an-email"), false);
  });
});

describe("shouldCaptureEnquiryLocally", () => {
  it("captures only on local next-dev, never on Vercel or production", () => {
    assert.equal(
      shouldCaptureEnquiryLocally({ NODE_ENV: "development" }),
      true,
    );
    assert.equal(
      shouldCaptureEnquiryLocally({ NODE_ENV: "production" }),
      false,
    );
    assert.equal(
      shouldCaptureEnquiryLocally({ VERCEL: "1", NODE_ENV: "development" }),
      false,
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
