import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  defaultEnquiryService,
  enquiryServiceByPath,
  projectTimingOptions,
  projectTypeOptions,
} from "../content/enquiry.ts";

describe("enquiry option allowlists", () => {
  it("contains only unique, non-empty project choices", () => {
    for (const options of [projectTypeOptions, projectTimingOptions]) {
      assert.equal(new Set(options).size, options.length);
      assert.equal(options.every((option) => option.trim().length > 0), true);
    }
  });
});

describe("defaultEnquiryService", () => {
  it("preserves service intent for every mapped route", () => {
    for (const [path, service] of Object.entries(enquiryServiceByPath)) {
      assert.equal(defaultEnquiryService(path), service);
      assert.equal(defaultEnquiryService(path.slice(0, -1)), service);
      assert.equal(defaultEnquiryService(`${path}?private=value#quote`), service);
    }
  });

  it("leaves pages without one clear service unselected", () => {
    for (const path of [
      "/",
      "/contact-us/",
      "/locations/adelaide/",
      "/projects/",
      "/resources/",
      "/unknown/",
    ]) {
      assert.equal(defaultEnquiryService(path), undefined);
    }
  });
});
