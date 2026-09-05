#!/usr/bin/env node

const baseUrl = new URL(
  process.env.MONITOR_BASE_URL ?? "https://elitesurfacegroup.com.au",
);
const monitorToken = process.env.CONTACT_MONITOR_TOKEN?.trim();

if (!monitorToken) {
  throw new Error("CONTACT_MONITOR_TOKEN is required for the synthetic monitor.");
}

async function monitoredFetch(pathname, init = {}, timeoutMs = 15_000) {
  return fetch(new URL(pathname, baseUrl), {
    ...init,
    headers: {
      "User-Agent": "Elite-Surface-Group-Synthetic-Monitor/1.0",
      ...init.headers,
    },
    redirect: "manual",
    signal: AbortSignal.timeout(timeoutMs),
  });
}

const homepage = await monitoredFetch("/", {}, 10_000);
if (homepage.status !== 200) {
  throw new Error(`Homepage readiness failed with HTTP ${homepage.status}.`);
}
const homepageHtml = await homepage.text();
if (!homepageHtml.includes("Elite Surface Group")) {
  throw new Error("Homepage readiness response did not contain the site identity.");
}

const health = await monitoredFetch("/api/health/", {
  headers: { Accept: "application/json" },
});
if (health.status !== 200) {
  throw new Error(`Service readiness failed with HTTP ${health.status}.`);
}
const healthPayload = await health.json().catch(() => null);
if (healthPayload?.status !== "ready") {
  throw new Error("Service readiness response was not ready.");
}

const contact = await monitoredFetch(
  "/api/internal/contact-monitor/",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${monitorToken}`,
    },
  },
  20_000,
);
if (contact.status !== 200) {
  throw new Error(`Contact delivery probe failed with HTTP ${contact.status}.`);
}
const contactPayload = await contact.json().catch(() => null);
if (contactPayload?.ok !== true || contactPayload?.durable !== true || !contactPayload?.submissionId) {
  throw new Error("Contact delivery probe did not return a durable accepted outcome.");
}

const deadline = Date.now() + 120_000;
let delivered = false;
while (Date.now() < deadline) {
  const status = await monitoredFetch(`/api/internal/contact-monitor/?submissionId=${encodeURIComponent(contactPayload.submissionId)}`, {
    headers: { Authorization: `Bearer ${monitorToken}` },
  });
  if (status.status !== 200) throw new Error(`Durable probe status failed with HTTP ${status.status}.`);
  const outcome = await status.json();
  if (outcome.state === "delivered") { delivered = true; break; }
  if (["failed", "bounced", "complained", "suppressed", "manual_review"].includes(outcome.state)) {
    throw new Error(`Synthetic delivery requires operator review: ${outcome.state}.`);
  }
  await new Promise((resolve) => setTimeout(resolve, 5_000));
}
if (!delivered) throw new Error("Signed delivery confirmation was not recorded for the exact durable probe within 2 minutes.");

console.log(
  `Synthetic monitor passed for ${baseUrl.origin}: homepage, readiness, encrypted durable capture and signed provider delivery correlation. Inbox placement is not tested.`,
);
