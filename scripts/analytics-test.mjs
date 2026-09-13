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
  // Install the SDK transport spy before any application or Vercel script. The
  // production platform can inline the queue and can randomise its transport
  // path, so intercepting one `/_vercel/insights/script.js` URL is not portable.
  await page.addInitScript(() => {
    window.__analyticsTestEvents = [];
    window.__beforeSend = undefined;
    window.__speedBeforeSend = undefined;
    const analyticsSpy = (event, payload) => {
      if (event === "beforeSend") {
        window.__beforeSend = payload;
        return;
      }
      window.__analyticsTestEvents.push([event, payload]);
    };
    Object.defineProperty(window, "va", {
      configurable: false,
      enumerable: true,
      get: () => analyticsSpy,
      set: () => {},
    });
    const speedInsightsSpy = (event, payload) => {
      if (event === "beforeSend") {
        window.__speedBeforeSend = payload;
      }
    };
    Object.defineProperty(window, "si", {
      configurable: false,
      enumerable: true,
      get: () => speedInsightsSpy,
      set: () => {},
    });
  });

  await page.goto(
    new URL("/contact-us/?private=value#contact", baseUrl).toString(),
    {
      waitUntil: "domcontentloaded",
    },
  );
  await page.waitForFunction(() => typeof window.__beforeSend === "function");
  await page.waitForFunction(
    () => typeof window.__speedBeforeSend === "function",
  );

  // Every link asserted below would navigate: `tel:`/`mailto:` hand off to an
  // external protocol. That breaks the assertions — after an external-protocol
  // hand-off some Chromium builds drop the next synthesized click before it
  // reaches the page. Cancelling the default in the capture phase leaves the
  // site's own delegated click listener untouched, so the measurement under
  // test still runs.
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
    .getByRole("link", { name: "elite.surfacegroup@gmail.com" })
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

  const redactedUrl = await page.evaluate(
    () =>
      window.__beforeSend?.({ type: "pageview", url: window.location.href })
        ?.url,
  );
  if (redactedUrl !== new URL("/contact-us/", baseUrl).toString()) {
    throw new Error(`Expected query and hash redaction, got ${redactedUrl}`);
  }

  const redactedVital = await page.evaluate(() =>
    window.__speedBeforeSend?.({
      type: "vital",
      url: window.location.href,
      route: "/contact-us/",
    }),
  );
  if (
    redactedVital?.url !== new URL("/contact-us/", baseUrl).toString() ||
    redactedVital?.type !== "vital" ||
    redactedVital?.route !== "/contact-us/"
  ) {
    throw new Error(
      `Speed Insights must redact only the URL: ${JSON.stringify(redactedVital)}`,
    );
  }
  console.log(
    "Analytics test passed: contact clicks are property-free and both telemetry URLs are redacted.",
  );
} finally {
  await browser.close();
}
