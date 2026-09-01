#!/usr/bin/env node

/**
 * Validate the contact-form environment before Next.js builds the site.
 *
 * The sender check is imported from the contact route's runtime module so a
 * value cannot pass here and then fail every enquiry at runtime. Local builds
 * retain a conspicuous warning; production and explicitly delivery-required
 * builds fail closed. There is intentionally no production bypass.
 */

import {
  contactEnvironmentProblems,
  requiresContactDelivery,
} from "../src/lib/contact-delivery.ts";

const target =
  process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "development";
const problems = contactEnvironmentProblems(process.env);

if (!problems.length) {
  console.log("check-env: contact-form environment is configured.");
  process.exit(0);
}

const banner = "=".repeat(72);
console.warn(
  `\n${banner}\n` +
    `check-env: CONTACT ENVIRONMENT IS INVALID (${target} build)\n` +
    `${banner}\n` +
    `Missing or invalid: ${problems.join(", ")}\n\n` +
    "Set RESEND_API_KEY in the Vercel project settings (or .env.local locally).\n" +
    "CONTACT_FROM_EMAIL is optional and defaults to Elite Surface Group\n" +
    "<info@elitesurfacegroup.com.au>; if set, it must be a valid mailbox on a\n" +
    "domain verified in Resend, never a public Gmail/Outlook-style mailbox.\n" +
    "CONTACT_TO_EMAIL is optional and defaults to elite.surfacegroup@gmail.com.\n" +
    "The encrypted outbox is optional, but its two UPSTASH_REDIS_REST_* values,\n" +
    "CONTACT_OUTBOX_ENCRYPTION_KEY and CRON_SECRET must be set together.\n" +
    "The encryption key must be base64 for 32 random bytes; CRON_SECRET and any\n" +
    "CONTACT_MONITOR_TOKEN must each contain at least 32 characters.\n" +
    `${banner}\n`,
);

if (requiresContactDelivery(process.env)) {
  console.error(
    "check-env: failing a production or delivery-required build. Configure " +
      "the missing values before deployment.\n",
  );
  process.exit(1);
}

console.warn(
  "check-env: continuing because this build is not Production or explicitly " +
    "delivery-required.\n",
);
process.exit(0);
