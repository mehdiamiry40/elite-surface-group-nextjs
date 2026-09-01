import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bearerTokenIsValid } from "./contact-auth.ts";

describe("contact internal route authentication", () => {
  it("accepts only the exact configured bearer token", () => {
    assert.equal(bearerTokenIsValid("Bearer correct-token", "correct-token"), true);
    assert.equal(bearerTokenIsValid("Bearer wrong-token", "correct-token"), false);
    assert.equal(bearerTokenIsValid("Basic correct-token", "correct-token"), false);
    assert.equal(bearerTokenIsValid(null, "correct-token"), false);
    assert.equal(bearerTokenIsValid("Bearer correct-token", undefined), false);
  });
});
