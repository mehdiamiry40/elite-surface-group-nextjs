import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Webhook } from "svix";
import {
  InvalidResendWebhookPayload,
  normaliseResendWebhook,
  resendWebhookNeedsDurableCorrelation,
  verifyAndNormaliseResendWebhook,
} from "./resend-webhook.ts";

const webhookSecret = `whsec_${Buffer.from(
  "elite-surface-group-webhook-test-secret",
).toString("base64")}`;

function signedEvent(payload: string) {
  const providerEventId = "msg_test_event_123";
  const timestamp = new Date();
  return {
    rawBody: payload,
    webhookSecret,
    providerEventId,
    providerTimestamp: String(Math.floor(timestamp.valueOf() / 1000)),
    providerSignature: new Webhook(webhookSecret).sign(
      providerEventId,
      timestamp,
      payload,
    ),
  };
}

describe("Resend webhook verification", () => {
  it("verifies the raw body and returns allowlisted delivery fields", () => {
    const rawBody = JSON.stringify({
      type: "email.delivered",
      created_at: "2026-09-01T03:00:00.000Z",
      data: {
        email_id: "email_123",
        from: "Visitor <visitor@example.com>",
        to: ["private@example.com"],
        subject: "Private subject",
        tags: { category: "website-enquiry", private: "not-logged" },
      },
    });

    assert.deepEqual(verifyAndNormaliseResendWebhook(signedEvent(rawBody)), {
      kind: "tracked",
      logEvent: "contact.resend.webhook.delivered",
      status: "delivered",
      providerEventId: "msg_test_event_123",
      emailId: "email_123",
      providerCreatedAt: "2026-09-01T03:00:00.000Z",
      category: "website-enquiry",
      providerReason: undefined,
    });
  });

  it("rejects a valid signature paired with a modified body", () => {
    const signed = signedEvent(
      JSON.stringify({
        type: "email.delivered",
        data: { email_id: "email_123" },
      }),
    );
    assert.throws(() =>
      verifyAndNormaliseResendWebhook({
        ...signed,
        rawBody: signed.rawBody.replace("email_123", "email_456"),
      }),
    );
  });
});

describe("Resend webhook normalisation", () => {
  it("keeps safe failure classification without recipient or message text", () => {
    const event = normaliseResendWebhook(
      {
        type: "email.bounced",
        data: {
          email_id: "email_456",
          to: ["private@example.com"],
          bounce: {
            type: "Permanent",
            subType: "NoEmail",
            message: "private@example.com does not exist",
          },
        },
      },
      "msg_test_event_456",
    );

    assert.deepEqual(event, {
      kind: "tracked",
      logEvent: "contact.resend.webhook.bounced",
      status: "bounced",
      providerEventId: "msg_test_event_456",
      emailId: "email_456",
      providerCreatedAt: undefined,
      category: undefined,
      providerReason: "Permanent:NoEmail",
    });
    assert.doesNotMatch(JSON.stringify(event), /private@example\.com/);
  });

  it("acknowledges unrelated signed event types without their payload", () => {
    assert.deepEqual(
      normaliseResendWebhook(
        {
          type: "email.opened",
          data: { to: ["private@example.com"] },
        },
        "msg_test_event_789",
      ),
      {
        kind: "ignored",
        providerEventId: "msg_test_event_789",
        webhookType: "email.opened",
      },
    );
  });

  it("rejects tracked events without a safe provider email id", () => {
    assert.throws(
      () =>
        normaliseResendWebhook(
          { type: "email.failed", data: {} },
          "msg_test_event_invalid",
        ),
      InvalidResendWebhookPayload,
    );
  });

  it("requires durable correlation for tagged enquiries and synthetic probes", () => {
    const base = {
      kind: "tracked" as const,
      logEvent: "contact.resend.webhook.delivered" as const,
      status: "delivered" as const,
      providerEventId: "msg_test_event_category",
      emailId: "email_category",
    };

    assert.equal(
      resendWebhookNeedsDurableCorrelation({
        ...base,
        category: "website-enquiry",
      }),
      true,
    );
    assert.equal(
      resendWebhookNeedsDurableCorrelation({
        ...base,
        category: "synthetic-monitor",
      }),
      true,
    );
    assert.equal(resendWebhookNeedsDurableCorrelation(base), false);
    assert.equal(
      resendWebhookNeedsDurableCorrelation({
        kind: "ignored",
        providerEventId: "msg_test_event_ignored",
        webhookType: "email.opened",
      }),
      false,
    );
  });
});
