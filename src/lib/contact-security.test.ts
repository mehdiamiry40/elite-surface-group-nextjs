import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  isAllowedOrigin,
  isLoopbackHostname,
  redactSensitiveText,
  ResendDeliveryError,
} from "./contact-security.ts";

describe("isLoopbackHostname", () => {
  it("recognises common loopback hosts", () => {
    assert.equal(isLoopbackHostname("localhost"), true);
    assert.equal(isLoopbackHostname("127.0.0.1"), true);
    assert.equal(isLoopbackHostname("[::1]"), true);
    assert.equal(isLoopbackHostname("example.com"), false);
  });
});

describe("isAllowedOrigin", () => {
  it("allows matching origins", () => {
    assert.equal(
      isAllowedOrigin(
        "http://localhost:3000",
        "http://localhost:3000",
        [],
        { allowLoopbackEquivalence: false },
      ),
      true,
    );
  });

  it("allows configured site extras", () => {
    assert.equal(
      isAllowedOrigin(
        "https://elitesurfacegroup.com.au",
        "http://localhost:3000",
        ["https://elitesurfacegroup.com.au"],
        { allowLoopbackEquivalence: false },
      ),
      true,
    );
  });

  it("rejects cross-origin production posts", () => {
    assert.equal(
      isAllowedOrigin(
        "https://evil.example",
        "https://elitesurfacegroup.com.au",
        [],
        { allowLoopbackEquivalence: false },
      ),
      false,
    );
  });

  it("equates localhost and 127.0.0.1 in non-production", () => {
    assert.equal(
      isAllowedOrigin(
        "http://127.0.0.1:3000",
        "http://localhost:3000",
        ["https://elitesurfacegroup.com.au"],
        { allowLoopbackEquivalence: true },
      ),
      true,
    );
  });

  it("allows loopback Origin when Host is also loopback", () => {
    assert.equal(
      isAllowedOrigin(
        "http://127.0.0.1:3000",
        "https://elitesurfacegroup.com.au",
        ["https://elitesurfacegroup.com.au"],
        {
          allowLoopbackEquivalence: false,
          hostHeader: "127.0.0.1:3000",
        },
      ),
      true,
    );
  });

  it("allows missing Origin", () => {
    assert.equal(
      isAllowedOrigin(null, "https://elitesurfacegroup.com.au"),
      true,
    );
  });
});

describe("redactSensitiveText", () => {
  it("redacts email-like substrings", () => {
    assert.equal(
      redactSensitiveText("Invalid `to` field: smoke@example.com"),
      "Invalid `to` field: [redacted-email]",
    );
  });
});

describe("ResendDeliveryError", () => {
  it("stores provider status and redacts messages", () => {
    const error = new ResendDeliveryError(422, {
      providerCode: "validation_error",
      message: "Failed for user@example.com",
    });
    assert.equal(error.providerStatus, 422);
    assert.equal(error.providerCode, "validation_error");
    assert.match(error.message, /\[redacted-email\]/);
  });
});
