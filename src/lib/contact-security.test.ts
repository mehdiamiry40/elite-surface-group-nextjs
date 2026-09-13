import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  contactLog,
  isAllowedOrigin,
  isLoopbackHostname,
  redactSensitiveText,
  ResendDeliveryError,
} from "./contact-security.ts";
import {
  contactEventName,
  redactAnalyticsUrl,
} from "./conversion-analytics.ts";

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

describe("contactLog", () => {
  it("emits one parseable JSON line with stable context", () => {
    const original = console.info;
    const calls: unknown[][] = [];
    console.info = (...args: unknown[]) => calls.push(args);

    try {
      contactLog("contact.resend.accepted", {
        requestId: "request-123",
        emailId: "email-456",
        page: "/contact-us/",
        level: "forged",
      });
    } finally {
      console.info = original;
    }

    assert.equal(calls.length, 1);
    assert.equal(calls[0].length, 1);
    assert.equal(typeof calls[0][0], "string");
    const payload = JSON.parse(String(calls[0][0]));
    assert.equal(payload.level, "info");
    assert.equal(payload.event, "contact.resend.accepted");
    assert.equal(payload.service, "elite-surface-group-web");
    assert.equal(payload.route, "/api/contact/");
    assert.equal(payload.requestId, "request-123");
    assert.equal(Object.values(payload).includes("forged"), false);
    assert.match(payload.timestamp, /^\d{4}-\d{2}-\d{2}T/);
  });

  it("drops non-allowlisted fields before serialization", () => {
    const original = console.error;
    const calls: unknown[][] = [];
    console.error = (...args: unknown[]) => calls.push(args);

    try {
      contactLog("contact.resend.failed", {
        requestId: "request-123",
        phone: "0470 000 000",
        message: "private project details",
      });
    } finally {
      console.error = original;
    }

    const line = String(calls[0]?.[0]);
    assert.doesNotMatch(line, /0470|private project details/);
  });

  it("redacts address-shaped field values and uses error severity", () => {
    const original = console.error;
    const calls: unknown[][] = [];
    console.error = (...args: unknown[]) => calls.push(args);

    try {
      contactLog("contact.resend.webhook.bounced", {
        providerEventId: "event-123",
        error: "Mailbox user@example.com rejected the message",
      });
    } finally {
      console.error = original;
    }

    const line = String(calls[0]?.[0]);
    const payload = JSON.parse(line);
    assert.equal(payload.level, "error");
    assert.equal(payload.error, "Mailbox [redacted-email] rejected the message");
    assert.doesNotMatch(line, /user@example\.com/);
  });

  it("keeps analytics failures at warning severity", () => {
    const original = console.warn;
    const calls: unknown[][] = [];
    console.warn = (...args: unknown[]) => calls.push(args);

    try {
      contactLog("contact.analytics.failed", { page: "/contact-us/" });
    } finally {
      console.warn = original;
    }

    assert.equal(JSON.parse(String(calls[0]?.[0])).level, "warn");
  });
});

describe("conversion analytics", () => {
  it("classifies contact links without returning their destinations", () => {
    const directions = "https://www.google.com/maps/dir/?api=1&destination=office";
    assert.equal(contactEventName("tel:+61413844912", directions), "Phone Click");
    assert.equal(
      contactEventName(
        "mailto:info@example.com?body=private%20enquiry",
        directions,
      ),
      "Email Click",
    );
    assert.equal(contactEventName(directions, directions), "Directions Click");
    assert.equal(contactEventName("https://example.com/", directions), null);
  });

  it("removes query strings and fragments from analytics URLs", () => {
    assert.equal(
      redactAnalyticsUrl(
        "/contact-us/?email=private%40example.com#message",
        "https://elitesurfacegroup.com.au",
      ),
      "https://elitesurfacegroup.com.au/contact-us/",
    );
  });
});
