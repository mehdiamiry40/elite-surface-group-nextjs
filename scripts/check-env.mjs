#!/usr/bin/env node

/**
 * Reports whether contact-form delivery is configured.
 *
 * Without RESEND_API_KEY the API answers 503 and offers direct call/email
 * options. CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL default to the public
 * Gmail inbox when unset. That is acceptable during local development, but
 * not for a production deployment whose primary purpose is lead generation.
 *
 * Production Vercel builds fail by default when configuration is absent.
 * REQUIRE_CONTACT_DELIVERY=1 applies the same rule elsewhere. The emergency
 * ALLOW_UNCONFIGURED_CONTACT=1 override must be explicit.
 */

const REQUIRED = ["RESEND_API_KEY"];

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
    "Set RESEND_API_KEY in the Vercel project settings (or .env.local locally)\n" +
    "before this site serves real traffic. CONTACT_FROM_EMAIL and\n" +
    "CONTACT_TO_EMAIL default to elite.surfacegroup@gmail.com when unset.\n" +
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
