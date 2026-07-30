#!/usr/bin/env node

/**
 * Reports whether contact-form delivery is configured.
 *
 * Without RESEND_API_KEY, CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL the API
 * answers 503 and falls back to opening the visitor's mail client, which loses
 * the enquiry for anyone without a configured mail app. That is worth shouting
 * about — but it is a *runtime* condition, so this warns by default rather than
 * failing the build:
 *
 *   - the route handler already degrades gracefully and logs an error per
 *     dropped enquiry, so the failure is observable where it actually happens;
 *   - blocking builds would mean a rotated or expired Resend key makes the whole
 *     site undeployable, so you could not ship an unrelated fix to a live site.
 *
 * Set REQUIRE_CONTACT_DELIVERY=1 to make this fatal instead. Do that once the
 * site is serving real traffic — that is the point where a form which cannot
 * deliver becomes lost business rather than an unfinished setup step.
 */

const REQUIRED = ["RESEND_API_KEY", "CONTACT_FROM_EMAIL", "CONTACT_TO_EMAIL"];

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
    "Enquiries will fall back to opening the visitor's mail client, which\n" +
    "silently loses them for anyone without a configured mail app.\n\n" +
    "Set these in the Vercel project settings (or .env.local locally) before\n" +
    "this site serves real traffic.\n" +
    `${banner}\n`,
);

if (process.env.REQUIRE_CONTACT_DELIVERY === "1") {
  console.error(
    "check-env: failing the build because REQUIRE_CONTACT_DELIVERY=1.\n",
  );
  process.exit(1);
}

process.exit(0);
