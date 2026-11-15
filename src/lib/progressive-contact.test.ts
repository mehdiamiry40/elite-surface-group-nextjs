import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { SPAM_TRAP_FIELD } from "./contact-submission.ts";
import {
  progressiveContactHeaders,
  renderProgressiveContactFailure,
  renderProgressiveContactReceived,
  type ProgressiveContactFields,
} from "./progressive-contact.ts";

const fields: ProgressiveContactFields = {
  firstName: 'Alex <script>alert("x")</script>',
  lastName: "Nguyen",
  email: "alex@example.com",
  phone: "0470 000 000",
  service: "Render",
  projectType: "Renovation / extension",
  projectArea: 'Salisbury East & "nearby"',
  projectTiming: "Within 3–6 months",
  message: "Please keep <all> of this & call me.",
  sourcePath: "/contact-us/",
  submissionId: "48f7491e-39a9-40f8-a7af-fd5fc532890b",
};

function render(overrides: Partial<Parameters<typeof renderProgressiveContactFailure>[0]> = {}) {
  return renderProgressiveContactFailure({
    fields,
    message: "Delivery is temporarily unavailable.",
    mailto:
      "mailto:owner@example.com?subject=Website%20enquiry&body=Please%20call",
    serviceOptions: ["Cladding", "Render", "Hebel", "Walling"],
    projectTypeOptions: ["Renovation / extension", "New build"],
    projectTimingOptions: ["Within 3–6 months", "Just researching"],
    businessName: "Elite Surface Group",
    businessEmail: "elite.surfacegroup@gmail.com",
    businessPhone: "+61413844912",
    businessPhoneDisplay: "0413 844 912",
    ...overrides,
  });
}

describe("progressive contact recovery", () => {
  it("retains valid fields and selected options in a no-store response", () => {
    const html = render();

    assert.match(html, /value="alex@example\.com"/);
    assert.match(html, /value="Render" selected/);
    assert.match(html, /value="Renovation \/ extension" selected/);
    assert.match(html, /value="Within 3–6 months" selected/);
    assert.match(html, /Please keep &lt;all&gt; of this &amp; call me\./);
    assert.match(html, /name="submissionId" value="48f7491e-/);
    assert.equal(progressiveContactHeaders["Cache-Control"], "private, no-store, max-age=0");
    assert.equal(progressiveContactHeaders["Referrer-Policy"], "no-referrer");
    assert.match(progressiveContactHeaders["X-Robots-Tag"], /noindex/);
  });

  it("escapes reflected values", () => {
    const html = render();

    assert.doesNotMatch(html, /<script>alert/);
    assert.match(html, /Alex &lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt;/);
    assert.match(html, /Salisbury East &amp; &quot;nearby&quot;/);
  });

  it("renders an empty spam trap that autofill has no reason to fill", () => {
    const html = render();
    const trap = /<input id="recovery-enquiry-check"[^>]*>/.exec(html)?.[0] ?? "";

    assert.match(trap, new RegExp(`name="${SPAM_TRAP_FIELD}"`));
    assert.doesNotMatch(trap, /value=/);
    assert.match(trap, /tabindex="-1"/);
    assert.match(trap, /data-1p-ignore/);
    assert.match(trap, /data-lpignore="true"/);
    // A name or label a browser recognises is what made the old trap fire for
    // genuine visitors: `company` was filled from saved address profiles.
    assert.doesNotMatch(
      SPAM_TRAP_FIELD,
      /company|organi[sz]ation|business|name|mail|phone|address|street|city|suburb|state|zip|post|country|url|website/i,
    );
    assert.doesNotMatch(html, /name="company"/);
    assert.match(html, /<label for="recovery-enquiry-check">Leave this field empty<\/label>/);
  });

  it("only renders a generated mailto fallback", () => {
    assert.match(render(), /href="mailto:owner@example\.com\?subject=/);
    assert.doesNotMatch(
      render({ mailto: "javascript:alert(1)" }),
      /Continue with this enquiry/,
    );
  });
});

describe("progressive queued confirmation", () => {
  it("renders only a PII-free, no-store POST result", () => {
    const html = renderProgressiveContactReceived({
      message:
        "Thanks—your enquiry has been received and queued for delivery.",
      businessName: "Elite Surface Group",
      businessPhone: "+61413844912",
      businessPhoneDisplay: "0413 844 912",
    });

    assert.match(html, /Your enquiry is safely queued/);
    assert.match(html, /received and queued for delivery/);
    assert.match(html, /You do not need to submit it again/);
    assert.match(html, /href="tel:\+61413844912"/);
    assert.doesNotMatch(html, /firstName|submissionId|example\.com/);
    assert.equal(
      progressiveContactHeaders["Cache-Control"],
      "private, no-store, max-age=0",
    );
  });
});
