#!/usr/bin/env node

/**
 * Fails a production build when contact-form delivery is not configured.
 *
 * Without these three variables the API answers 503 and falls back to opening
 * the visitor's mail client — which silently loses the enquiry for anyone
 * without a configured mail app, and gives the site owner no signal at all.
 * Previews and local builds are allowed through so the site stays easy to run.
 */

const REQUIRED = ["RESEND_API_KEY", "CONTACT_FROM_EMAIL", "CONTACT_TO_EMAIL"];

const target = process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "development";
const isProduction = target === "production";
const missing = REQUIRED.filter((name) => !process.env[name]?.trim());

if (!missing.length) {
  console.log("check-env: contact-form delivery is configured.");
  process.exit(0);
}

const summary = `check-env: missing ${missing.join(", ")}`;

if (!isProduction) {
  console.warn(
    `${summary}. Allowed for a ${target} build — the contact form will fall ` +
      "back to the visitor's mail client.",
  );
  process.exit(0);
}

console.error(
  `${summary}.\n\n` +
    "A production build must be able to deliver enquiries. Set these in the\n" +
    "Vercel project settings (or .env.local when building locally) and retry.\n" +
    "Set ALLOW_UNCONFIGURED_CONTACT=1 to override deliberately.\n",
);

if (process.env.ALLOW_UNCONFIGURED_CONTACT === "1") {
  console.warn("check-env: overridden by ALLOW_UNCONFIGURED_CONTACT=1.");
  process.exit(0);
}

process.exit(1);
