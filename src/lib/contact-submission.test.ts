import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createSubmissionId,
  isSubmissionId,
  normaliseSubmissionId,
  resendIdempotencyKey,
  resolveSubmissionId,
} from "./contact-submission.ts";

describe("contact submission IDs", () => {
  it("creates and normalises UUID v4 identifiers", () => {
    const id = createSubmissionId();
    assert.equal(isSubmissionId(id), true);
    assert.equal(normaliseSubmissionId(id.toUpperCase()), id);
    assert.equal(resolveSubmissionId(id), id);
  });

  it("replaces malformed identifiers and builds a stable provider key", () => {
    const generated = resolveSubmissionId("attacker-chosen");
    assert.equal(isSubmissionId(generated), true);
    assert.equal(
      resendIdempotencyKey(generated),
      `contact-enquiry/${generated}`,
    );
    assert.throws(() => resendIdempotencyKey("invalid"));
  });
});
