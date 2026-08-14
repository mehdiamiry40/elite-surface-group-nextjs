#!/usr/bin/env node

import { chromium } from "playwright";

const baseUrl = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHROMIUM_PATH
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
    : {}),
});
const context = await browser.newContext();
const page = await context.newPage();

try {
  await page.route("**/_vercel/insights/script.js", async (route) => {
    await route.fulfill({
      contentType: "application/javascript",
      body: "window.__analyticsTestEvents=window.vaq||[];for(const [event,payload] of window.__analyticsTestEvents){if(event==='beforeSend')window.__beforeSend=payload;}window.va=function(event,payload){if(event==='beforeSend'){window.__beforeSend=payload;return;}window.__analyticsTestEvents=(window.__analyticsTestEvents||[]).concat([[event,payload]]);};",
    });
  });
  await page.goto(
    new URL("/contact-us/?private=value#contact", baseUrl).toString(),
    {
      waitUntil: "networkidle",
    },
  );
  await page.waitForFunction(() => typeof window.va === "function");

  // Every link asserted below would navigate: `tel:`/`mailto:` hand off to an
  // external protocol and the directions link leaves the origin entirely. Both
  // break the assertions — a cross-origin load discards the queue before it can
  // be read, and after an external-protocol hand-off some Chromium builds drop
  // the next synthesized click before it reaches the page. Cancelling the
  // default in the capture phase leaves the site's own delegated click listener
  // untouched, so the measurement under test still runs.
  await page.evaluate(() => {
    document.addEventListener(
      "click",
      (event) => {
        const target = event.target;
        if (target instanceof Element && target.closest("a[href]")) {
          event.preventDefault();
        }
      },
      true,
    );
  });

  await page.getByRole("link", { name: "0413 844 912" }).first().click();
  const queuedEvents = await page.evaluate(
    () => window.__analyticsTestEvents ?? [],
  );

  const phoneEvents = queuedEvents.filter(
    ([event, payload]) => event === "event" && payload?.name === "Phone Click",
  );
  if (phoneEvents.length !== 1) {
    throw new Error(
      `Expected one Phone Click event, got ${JSON.stringify(queuedEvents)}`,
    );
  }
  if (Object.keys(phoneEvents[0][1]).sort().join(",") !== "name,options") {
    throw new Error(
      `Phone Click must not contain destination data: ${JSON.stringify(phoneEvents[0])}`,
    );
  }

  await page.evaluate(() => {
    window.__analyticsTestEvents = [];
  });
  await page
    .getByRole("link", { name: "info@elitesurfacegroup.com.au" })
    .first()
    .click();
  const emailQueue = await page.evaluate(
    () => window.__analyticsTestEvents ?? [],
  );
  const emailEvents = emailQueue.filter(
    ([event, payload]) => event === "event" && payload?.name === "Email Click",
  );
  if (emailEvents.length !== 1) {
    throw new Error(
      `Expected one Email Click event, got ${JSON.stringify(emailEvents)}`,
    );
  }
  if (Object.keys(emailEvents[0][1]).sort().join(",") !== "name,options") {
    throw new Error(
      `Email Click must not contain destination data: ${JSON.stringify(emailEvents[0])}`,
    );
  }

  await page.evaluate(() => {
    window.__analyticsTestEvents = [];
  });
  await page
    .getByRole("link", { name: "22 Robin St, Salisbury East SA 5109" })
    .first()
    .click();
  const directionsQueue = await page.evaluate(
    () => window.__analyticsTestEvents ?? [],
  );
  const directionsEvents = directionsQueue.filter(
    ([event, payload]) =>
      event === "event" && payload?.name === "Directions Click",
  );
  if (directionsEvents.length !== 1) {
    throw new Error(
      `Expected one Directions Click event, got ${JSON.stringify(directionsEvents)}`,
    );
  }
  if (Object.keys(directionsEvents[0][1]).sort().join(",") !== "name,options") {
    throw new Error(
      `Directions Click must not contain destination data: ${JSON.stringify(directionsEvents[0])}`,
    );
  }

  const redactedUrl = await page.evaluate(
    () =>
      window.__beforeSend?.({ type: "pageview", url: window.location.href })
        ?.url,
  );
  if (redactedUrl !== new URL("/contact-us/", baseUrl).toString()) {
    throw new Error(`Expected query and hash redaction, got ${redactedUrl}`);
  }
  console.log(
    "Analytics test passed: contact clicks emit fixed, property-free events.",
  );
} finally {
  await browser.close();
}
