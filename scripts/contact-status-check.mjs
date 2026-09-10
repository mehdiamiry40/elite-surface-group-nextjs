#!/usr/bin/env node

import { appendFile } from "node:fs/promises";

// Independent read-only watchdog: it neither sends mail nor acknowledges
// incidents. Failed Actions notifications complement the primary Vercel alerts.
const baseUrl = new URL(process.env.MONITOR_BASE_URL ?? "https://elitesurfacegroup.com.au");
const token = process.env.CONTACT_MONITOR_TOKEN?.trim();
if (!token) throw new Error("CONTACT_MONITOR_TOKEN is required.");

// Actions emails the operator on a failed run and stays quiet on a green one,
// so failure is the wrong channel for a finding that cannot change between
// runs: it would mail the same unchanged fact on every scheduled run until
// somebody edits the deployment, and a watchdog that is permanently red is one
// nobody reads when delivery genuinely breaks. Those findings are annotated on
// the run instead, where they stay visible without repeating themselves.
const warnings = [];
function warn(message) {
  warnings.push(message);
  console.log(`::warning::${message}`);
}

for (const pathname of ["/", "/api/health/", "/api/internal/contact-status/"]) {
  const protectedRoute = pathname === "/api/internal/contact-status/";
  const response = await fetch(new URL(pathname, baseUrl), {
    redirect: "manual",
    signal: AbortSignal.timeout(15_000),
    headers: {
      "User-Agent": "Elite-Surface-Group-Delivery-Watchdog/1.0",
      ...(protectedRoute ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!response.ok) {
    // Never print arbitrary remote bodies, credentials or personal data into
    // Actions logs. The route and HTTP status locate the operator's next check.
    throw new Error(`Production delivery watchdog failed: ${pathname} HTTP ${response.status}.`);
  }
  if (pathname === "/") {
    if (!(await response.text()).includes("Elite Surface Group")) {
      throw new Error("The homepage did not contain the expected site identity.");
    }
  } else {
    const body = await response.json();
    if (pathname === "/api/health/" && body.status !== "ready") {
      throw new Error("Production configuration is not ready.");
    }
    if (protectedRoute) {
      // Live delivery state: transient, urgent, and the reason this job exists.
      if (body.ok !== true) throw new Error("Durable delivery is unhealthy.");
      // Deployment configuration, not a delivery incident. It leaves the
      // five-minute Vercel alert cron with no recipient, but this watchdog is
      // the independent second path and still fails on real delivery trouble,
      // so enquiries stay monitored while the mailbox owner is decided.
      if (body.notificationsConfigured !== true) {
        warn(
          "Dedicated operator notifications are unconfigured, so the Vercel alert cron has nowhere to send. " +
            "Set CONTACT_ALERT_TO_EMAIL to one plain operator address in the Vercel Production environment " +
            "and redeploy; see \"Required production configuration\" in OPS.md.",
        );
      }
    }
  }
}

// The run page carries the same note as the annotation, so an operator reading
// a green run still sees what is outstanding.
if (warnings.length && process.env.GITHUB_STEP_SUMMARY) {
  await appendFile(
    process.env.GITHUB_STEP_SUMMARY,
    `### Production delivery watchdog\n\n${warnings.map((warning) => `- ${warning}`).join("\n")}\n`,
  );
}

console.log(
  warnings.length
    ? `Production watchdog passed: homepage, configuration and durable delivery are healthy. ${warnings.length} configuration warning(s) above.`
    : "Production watchdog passed: homepage, configuration, durable delivery and alert configuration are healthy.",
);
