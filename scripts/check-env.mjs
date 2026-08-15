#!/usr/bin/env node

/**
 * Reports whether contact-form delivery is configured.
 *
 * Without RESEND_API_KEY the API answers 503 and offers direct call/email
 * options. CONTACT_FROM_EMAIL is required alongside it because its default —
 * the public Gmail inbox — cannot send: Resend delivers only from a domain
 * verified with it, and gmail.com can never be one. An unset sender therefore
 * fails at the provider on every enquiry, which is worth catching at build time
 * rather than discovering through lost leads. CONTACT_TO_EMAIL stays optional;
 * its default is the inbox enquiries should reach anyway.
 *
 * Production Vercel builds fail by default when configuration is absent.
 * REQUIRE_CONTACT_DELIVERY=1 applies the same rule elsewhere. The emergency
 * ALLOW_UNCONFIGURED_CONTACT=1 override must be explicit.
 */

const REQUIRED = ["RESEND_API_KEY", "CONTACT_FROM_EMAIL"];

const target = process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "development";
const missing = REQUIRED.filter((name) => !process.env[name]?.trim());

if (!missing.length) {
  console.log("check-env: contact-form delivery is configured.");
  process.exit(0);
}

const banner = "=".repeat(72);
console.warn(
  `\n${banner}\n` +
    `check-env: CONTACT FORM CANNOT DELIVER EMAIL (${target} build)\n` +
    `${banner}\n` +
    `Missing: ${missing.join(", ")}\n\n` +
    "The form will show direct phone/email options instead of delivering.\n\n" +
    "Set these in the Vercel project settings (or .env.local locally) before\n" +
    "this site serves real traffic. CONTACT_FROM_EMAIL must be an address on a\n" +
    "domain verified with Resend — its Gmail default cannot send, so delivery\n" +
    "fails at the provider while it is in use. CONTACT_TO_EMAIL is optional and\n" +
    "defaults to elite.surfacegroup@gmail.com.\n" +
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
