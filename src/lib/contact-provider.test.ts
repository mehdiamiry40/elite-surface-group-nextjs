import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ResendDeliveryError } from "./contact-security.ts";
import {
  classifyResendFailure,
  CONTACT_MONITOR_RECIPIENT,
  contactEmailTags,
  fixedMonitorEmail,
  providerFailureCode,
  sendWithResend,
  type ResendEmail,
} from "./contact-provider.ts";

const submissionId = "48f7491e-39a9-40f8-a7af-fd5fc532890b";
const email: ResendEmail = {
  from: "Elite Surface Group <info@elitesurfacegroup.com.au>",
  to: ["owner@example.com"],
  reply_to: "visitor@example.com",
  subject: "Website enquiry",
  text: "Hello",
  html: "<p>Hello</p>",
  tags: contactEmailTags(submissionId),
};

describe("Resend contact provider", () => {
  it("uses the stable submission key and correlation tags", async () => {
    let request: RequestInit | undefined;
    const fetcher = (async (_url: string | URL | Request, init?: RequestInit) => {
      request = init;
      return Response.json({ id: "email_123" });
    }) as typeof fetch;

    const id = await sendWithResend("re_test", email, submissionId, { fetcher });
    assert.equal(id, "email_123");
    assert.equal(
      new Headers(request?.headers).get("Idempotency-Key"),
      `contact-enquiry/${submissionId}`,
    );
    assert.deepEqual(JSON.parse(String(request?.body)).tags, [
      { name: "submission_id", value: submissionId },
      { name: "category", value: "website-enquiry" },
    ]);
  });

  it("classifies provider failures conservatively", () => {
    assert.equal(
      classifyResendFailure(
        new ResendDeliveryError(409, {
          providerCode: "concurrent_idempotent_requests",
        }),
      ),
      "retryable",
    );
    assert.equal(classifyResendFailure(new ResendDeliveryError(429)), "retryable");
    assert.equal(classifyResendFailure(new ResendDeliveryError(503)), "retryable");
    assert.equal(classifyResendFailure(new ResendDeliveryError(403)), "permanent");
    assert.equal(classifyResendFailure(new TypeError("network")), "retryable");
    assert.equal(
      providerFailureCode(
        new ResendDeliveryError(422, {
          providerCode: "invalid owner@example.com / recipient",
        }),
      ),
      "invalid_redacted-email_recipient",
    );
  });

  it("keeps the monitor recipient and payload fixed", () => {
    const first = fixedMonitorEmail("monitor@example.com");
    const second = fixedMonitorEmail("monitor@example.com");
    assert.deepEqual(first, second);
    assert.deepEqual(first.to, [CONTACT_MONITOR_RECIPIENT]);
    assert.equal(first.text.includes("customer data"), true);
  });
});
