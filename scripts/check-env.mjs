#!/usr/bin/env node

/**
 * Reports whether contact-form delivery is configured.
 *
 * Without RESEND_API_KEY the API answers 503 (except local `next dev`, which
 * captures the enquiry in the server log). CONTACT_FROM_EMAIL is optional: the
 * runtime defaults to info@elitesurfacegroup.com.au, which Resend can send
 * from once that domain is verified. A Gmail From is never delivery — Resend
 * rejects public-mailbox senders — so a CONTACT_FROM_EMAIL set to one is
 * treated as unconfigured. CONTACT_TO_EMAIL stays optional; its default is the
 * inbox enquiries should reach anyway.
 *
 * Production Vercel builds fail by default when configuration is absent.
 * REQUIRE_CONTACT_DELIVERY=1 applies the same rule elsewhere. The emergency
 * ALLOW_UNCONFIGURED_CONTACT=1 override must be explicit.
 */

const REQUIRED = ["RESEND_API_KEY"];

const target = process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "development";
const missing = REQUIRED.filter((name) => !process.env[name]?.trim());
const configuredFrom = process.env.CONTACT_FROM_EMAIL?.trim() ?? "";
const fromCannotSend = Boolean(
  configuredFrom && senderCannotSend(configuredFrom),
);

if (!missing.length && !fromCannotSend) {
  console.log("check-env: contact-form delivery is configured.");
  process.exit(0);
}

const problems = [
  ...missing,
  ...(fromCannotSend
    ? [
        "CONTACT_FROM_EMAIL (must be on a Resend-verified domain, not Gmail)",
      ]
    : []),
];

const banner = "=".repeat(72);
console.warn(
  `\n${banner}\n` +
    `check-env: CONTACT FORM CANNOT DELIVER EMAIL (${target} build)\n` +
    `${banner}\n` +
    `Missing or invalid: ${problems.join(", ")}\n\n` +
    "The form will show direct phone/email options instead of delivering.\n\n" +
    "Set RESEND_API_KEY in the Vercel project settings (or .env.local locally)\n" +
    "before this site serves real traffic. CONTACT_FROM_EMAIL is optional and\n" +
    "defaults to Elite Surface Group <info@elitesurfacegroup.com.au>; do not set\n" +
    "it to a Gmail address — Resend cannot send as gmail.com. CONTACT_TO_EMAIL\n" +
    "is optional and defaults to elite.surfacegroup@gmail.com.\n" +
    `${banner}\n`,
);

const mustDeliver =
  process.env.VERCEL_ENV === "production" ||
  process.env.REQUIRE_CONTACT_DELIVERY === "1";
const emergencyOverride = process.env.ALLOW_UNCONFIGURED_CONTACT === "1";

if (mustDeliver && !emergencyOverride) {
  console.error(
    "check-env: failing a delivery-required build. Configure Resend or set " +
      "ALLOW_UNCONFIGURED_CONTACT=1 only for an emergency deployment.\n",
  );
  process.exit(1);
}

process.exit(0);

/** True when the From header is on a domain Resend can never verify. */
function senderCannotSend(value) {
  const email = /<([^>]+)>/.exec(value)?.[1] ?? value;
  const domain = email.split("@")[1]?.trim().toLowerCase() ?? "";
  return /^(gmail|googlemail|outlook|hotmail|live|msn|yahoo|icloud|me)\.com$/.test(
    domain,
  );
}
