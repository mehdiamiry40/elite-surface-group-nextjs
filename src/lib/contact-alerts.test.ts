import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildContactAlert, sendContactAlert } from "./contact-alerts.ts";
import { isSubmissionId } from "./contact-submission.ts";

const env = { CONTACT_ALERT_TO_EMAIL: "operator@example.com", RESEND_API_KEY: "fixture" };
const now = Date.UTC(2026, 8, 5, 12, 5);

describe("dedicated contact failure notifications", () => {
  it("uses an identical payload and provider identity for concurrent/retried issues in one hour", () => {
    const first = buildContactAlert(["queue_overdue", "delivery_failure"], env, now)!;
    const retry = buildContactAlert(["delivery_failure", "queue_overdue", "queue_overdue"], env, now + 20 * 60_000)!;
    assert.deepEqual(first, retry);
    assert.ok(isSubmissionId(first.submissionId));
    assert.notEqual(buildContactAlert(["queue_overdue", "delivery_failure"], env, now + 60 * 60_000)!.submissionId, first.submissionId);
    assert.notEqual(buildContactAlert(["worker_error"], env, now)!.submissionId, first.submissionId);
  });

  it("never sends to an inferred recipient or accepts a recipient list/header injection", async () => {
    let calls = 0;
    for (const recipient of [undefined, "", "one@example.com,two@example.com", "A <one@example.com>", "one@example.com\r\nBcc: other@example.com"]) {
      const result = await sendContactAlert(["worker_error"], { ...env, CONTACT_ALERT_TO_EMAIL: recipient }, {
        now, send: async () => { calls++; return "fixture"; },
      });
      assert.equal(result.state, "unconfigured");
    }
    assert.equal(calls, 0);
  });

  it("sends an actionable allowlisted notification without reflecting untrusted data", async () => {
    const result = await sendContactAlert(["outbox_unavailable", "visitor@example.com <script>"], env, {
      now,
      send: async (_key, email, id) => {
        assert.deepEqual(email.to, ["operator@example.com"]);
        assert.equal(email.tags?.[0].value, "operations-alert");
        assert.ok(email.text.includes("encrypted enquiry store"));
        assert.ok(!email.text.includes("visitor@example.com"));
        assert.ok(!email.html.includes("<script>"));
        assert.ok(isSubmissionId(id));
        return "provider-fixture";
      },
    });
    assert.equal(result.state, "accepted");
  });

  it("does not turn a provider failure into a delivered/healthy result", async () => {
    await assert.rejects(sendContactAlert(["worker_error"], env, {
      now, send: async () => { throw new Error("offline provider fixture"); },
    }), /offline provider fixture/);
    const healthy = await sendContactAlert([], env, { send: async () => { throw new Error("must not send"); } });
    assert.equal(healthy.state, "healthy");
  });
});
