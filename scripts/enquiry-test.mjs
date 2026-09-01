#!/usr/bin/env node

import { chromium } from "playwright";

const baseUrl = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHROMIUM_PATH
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
    : {}),
});
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function stubAnalytics(targetPage) {
  await targetPage.route("**/_vercel/insights/script.js", async (route) => {
    await route.fulfill({
      contentType: "application/javascript",
      body: "window.va=function(){};",
    });
  });
}

try {
  // Avoid relying on Vercel's production-only analytics script in local tests.
  await stubAnalytics(page);

  let submittedPayload;
  await page.route("**/api/contact/", async (route) => {
    submittedPayload = route.request().postDataJSON();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        message: "Thanks—your enquiry has been sent.",
      }),
    });
  });

  await page.goto(
    new URL("/projects/dark-feature-cladding/", baseUrl).toString(),
    { waitUntil: "networkidle" },
  );
  const projectQuote = page.getByRole("link", {
    name: "Request a cladding quote",
    exact: true,
  });
  assert(
    (await projectQuote.getAttribute("href")) === "/contact-us/#contact",
    "Project quote action must keep its no-JavaScript contact fallback.",
  );
  await projectQuote.focus();
  await projectQuote.click();

  const dialog = page.getByRole("dialog", { name: "Request an Obligation-Free Quote" });
  await dialog.waitFor();
  assert(
    (await dialog.getByLabel("Service needed (optional)").inputValue()) ===
      "Cladding",
    "Cladding project did not preserve its service context.",
  );

  await dialog.getByLabel("First name").fill("Alex");
  await dialog.getByLabel("Email").fill("alex@example.com");
  await dialog
    .getByLabel("Project suburb or postcode (optional)")
    .fill("Salisbury East 5109");
  await dialog
    .getByLabel("Project type (optional)")
    .selectOption("Multi-unit development");
  await dialog
    .getByLabel("Target timing (optional)")
    .selectOption("Within 3–6 months");
  await dialog
    .getByLabel("Project details")
    .fill("Exterior feature-cladding enquiry for the browser test.");
  await dialog.getByRole("button", { name: "Send enquiry" }).click();
  await dialog.getByText("Thanks—your enquiry has been sent.").waitFor();

  assert(submittedPayload, "The project enquiry was not posted.");
  assert(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      submittedPayload.submissionId,
    ),
    "The project enquiry did not include a valid stable submission ID.",
  );
  for (const [key, expected] of Object.entries({
    service: "Cladding",
    projectArea: "Salisbury East 5109",
    projectType: "Multi-unit development",
    projectTiming: "Within 3–6 months",
    sourcePath: "/projects/dark-feature-cladding/",
  })) {
    assert(
      submittedPayload[key] === expected,
      `Expected ${key}=${JSON.stringify(expected)}, got ${JSON.stringify(
        submittedPayload[key],
      )}.`,
    );
  }

  await page.goto(
    new URL("/resources/rendering-hebel-panels-adelaide/", baseUrl).toString(),
    { waitUntil: "networkidle" },
  );
  const guideQuote = page.getByRole("link", {
    name: "Request a quote",
    exact: true,
  });
  assert(
    (await guideQuote.getAttribute("href")) === "/contact-us/#contact",
    "Guide quote action must keep its no-JavaScript contact fallback.",
  );
  await guideQuote.click();
  const guideDialog = page.getByRole("dialog", {
    name: "Request an Obligation-Free Quote",
  });
  await guideDialog.waitFor();
  assert(
    (await guideDialog.getByLabel("Service needed (optional)").inputValue()) ===
      "Hebel",
    "Hebel guide did not preserve its service context.",
  );

  // An ambiguous network failure can unmount the quote form before the server
  // outcome is known. The identical retry must retain its submission ID across
  // that remount; a confirmed 2xx must rotate it.
  const retryContext = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const retryPage = await retryContext.newPage();
  await stubAnalytics(retryPage);
  const retryPayloads = [];
  await retryPage.route("**/api/contact/", async (route) => {
    retryPayloads.push(route.request().postDataJSON());
    if (retryPayloads.length === 1) {
      await route.abort("failed");
      return;
    }
    const queued = retryPayloads.length === 2;
    await route.fulfill({
      status: queued ? 202 : 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        message: queued
          ? "Thanks—your enquiry has been received and queued for delivery."
          : "Thanks—your enquiry has been sent.",
      }),
    });
  });
  await retryPage.goto(
    new URL("/projects/dark-feature-cladding/", baseUrl).toString(),
    { waitUntil: "networkidle" },
  );

  async function openAndFillRetryDialog() {
    await retryPage
      .getByRole("link", { name: "Request a cladding quote", exact: true })
      .click();
    const retryDialog = retryPage.getByRole("dialog", {
      name: "Request an Obligation-Free Quote",
    });
    await retryDialog.waitFor();
    await retryDialog.getByLabel("First name").fill("Casey");
    await retryDialog.getByLabel("Email").fill("casey@example.com");
    await retryDialog
      .getByLabel("Project details")
      .fill("Stable submission identifier browser test.");
    return retryDialog;
  }

  const failedRetryDialog = await openAndFillRetryDialog();
  await failedRetryDialog.getByRole("button", { name: "Send enquiry" }).click();
  await failedRetryDialog.locator('.form__status[data-state="error"]').waitFor();
  await failedRetryDialog
    .getByRole("button", { name: "Close quote form" })
    .click();

  const acceptedRetryDialog = await openAndFillRetryDialog();
  await acceptedRetryDialog
    .getByRole("button", { name: "Send enquiry" })
    .click();
  await acceptedRetryDialog
    .getByText(
      "Thanks—your enquiry has been received and queued for delivery.",
    )
    .waitFor();
  await acceptedRetryDialog
    .getByRole("button", { name: "Close quote form" })
    .click();

  const rotatedRetryDialog = await openAndFillRetryDialog();
  await rotatedRetryDialog
    .getByRole("button", { name: "Send enquiry" })
    .click();
  await rotatedRetryDialog
    .getByText("Thanks—your enquiry has been sent.")
    .waitFor();

  assert(
    retryPayloads.length === 3,
    `Expected three retry probes, received ${retryPayloads.length}.`,
  );
  assert(
    retryPayloads[0].submissionId === retryPayloads[1].submissionId,
    "An identical enquiry did not retain its submission ID across a dialog remount.",
  );
  assert(
    retryPayloads[2].submissionId !== retryPayloads[1].submissionId,
    "A confirmed enquiry acceptance did not rotate the submission ID.",
  );
  await retryContext.close();

  // Ubiquitous Home links must not make an internal page download the Home
  // hero, and scrolling a long article grid must not prefetch every guide.
  const prefetchContext = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const prefetchPage = await prefetchContext.newPage();
  await stubAnalytics(prefetchPage);
  const homeHeroRequests = [];
  prefetchPage.on("request", (request) => {
    if (request.url().includes("home-hero-adelaide")) {
      homeHeroRequests.push(request.url());
    }
  });
  await prefetchPage.goto(new URL("/about/", baseUrl).toString(), {
    waitUntil: "networkidle",
  });
  await prefetchPage.waitForTimeout(500);
  assert(
    homeHeroRequests.length === 0,
    `An internal page requested an unused Home hero: ${homeHeroRequests.join(", ")}`,
  );

  const resourcePrefetches = [];
  prefetchPage.on("request", (request) => {
    const url = new URL(request.url());
    if (
      url.pathname.startsWith("/resources/") &&
      url.searchParams.has("_rsc")
    ) {
      resourcePrefetches.push(url.pathname);
    }
  });
  await prefetchPage.goto(new URL("/", baseUrl).toString(), {
    waitUntil: "networkidle",
  });
  await prefetchPage.locator("#home-resources-title").scrollIntoViewIfNeeded();
  await prefetchPage.waitForTimeout(750);
  assert(
    resourcePrefetches.length === 0,
    `The Home resource grid prefetched article routes: ${resourcePrefetches.join(", ")}`,
  );
  await prefetchContext.close();

  // A missing lazy chunk must fall back to the real contact-page link rather
  // than trapping the visitor on an inert CTA or surfacing an unhandled error.
  const chunkFailureContext = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const chunkFailurePage = await chunkFailureContext.newPage();
  await stubAnalytics(chunkFailurePage);
  const chunkErrors = [];
  chunkFailurePage.on("pageerror", (error) => chunkErrors.push(error.message));
  await chunkFailurePage.goto(
    new URL("/projects/dark-feature-cladding/", baseUrl).toString(),
    { waitUntil: "networkidle" },
  );

  let blockedChunkPath = "";
  let blockedChunkRequests = 0;
  await chunkFailurePage.route(
    /\/_next\/static\/chunks\/.*\.js(?:\?.*)?$/,
    async (route) => {
      const pathname = new URL(route.request().url()).pathname;
      blockedChunkPath ||= pathname;
      if (pathname === blockedChunkPath) {
        blockedChunkRequests += 1;
        await route.abort("failed");
        return;
      }
      await route.continue();
    },
  );

  const chunkFailureQuote = chunkFailurePage.getByRole("link", {
    name: "Request a cladding quote",
    exact: true,
  });
  await Promise.all([
    chunkFailurePage.waitForURL(
      (url) => url.pathname === "/contact-us/" && url.hash === "#contact",
    ),
    chunkFailureQuote.click(),
  ]);
  await chunkFailurePage.waitForTimeout(150);
  assert(
    blockedChunkRequests > 0,
    "The quote chunk-failure test did not intercept a lazy JavaScript chunk.",
  );
  assert(
    chunkErrors.length === 0,
    `Quote chunk failure surfaced page errors: ${chunkErrors.join("; ")}`,
  );
  await chunkFailureContext.close();

  // Closing a dialog launched from the drawer must restore focus to the
  // visible disclosure control, not to the hidden link or document body.
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const mobilePage = await mobileContext.newPage();
  await stubAnalytics(mobilePage);
  await mobilePage.goto(new URL("/", baseUrl).toString(), {
    waitUntil: "networkidle",
  });
  const navigationMenu = mobilePage.locator(
    'summary[aria-label="Navigation menu"]',
  );
  await navigationMenu.click();
  const mobileNavigation = mobilePage.getByRole("navigation", {
    name: "Mobile navigation",
  });
  const mobileQuote = mobileNavigation.getByRole("link", {
    name: "Start a project",
    exact: true,
  });
  await mobileQuote.click();
  const mobileDialog = mobilePage.getByRole("dialog", {
    name: "Request an Obligation-Free Quote",
  });
  await mobileDialog.waitFor();
  await mobileDialog.getByRole("button", { name: "Close quote form" }).click();
  await mobilePage.waitForFunction(
    () => document.activeElement?.getAttribute("aria-label") === "Navigation menu",
  );
  assert(
    await navigationMenu.evaluate((element) => document.activeElement === element),
    "Closing a mobile-menu quote did not restore focus to the navigation disclosure.",
  );
  await mobileContext.close();

  // The same navigation remains fully usable when JavaScript never runs.
  const noScriptContext = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const noScriptPage = await noScriptContext.newPage();
  await noScriptPage.goto(new URL("/", baseUrl).toString(), {
    waitUntil: "load",
  });
  const noScriptMenu = noScriptPage.locator(
    'summary[aria-label="Navigation menu"]',
  );
  await noScriptMenu.click();
  const noScriptNavigation = noScriptPage.getByRole("navigation", {
    name: "Mobile navigation",
  });
  assert(
    await noScriptNavigation.isVisible(),
    "Mobile navigation is not visible after opening its native no-JavaScript disclosure.",
  );
  assert(
    await noScriptNavigation
      .getByRole("link", { name: /^Call / })
      .isVisible(),
    "The no-JavaScript mobile navigation does not expose the call action.",
  );
  const noScriptQuote = noScriptNavigation.getByRole("link", {
    name: "Start a project",
    exact: true,
  });
  assert(
    await noScriptQuote.isVisible(),
    "The no-JavaScript mobile navigation does not expose the quote action.",
  );
  await Promise.all([
    noScriptPage.waitForURL(
      (url) => url.pathname === "/contact-us/" && url.hash === "#contact",
    ),
    noScriptQuote.click(),
  ]);
  assert(
    await noScriptPage.getByRole("button", { name: "Send enquiry" }).isVisible(),
    "The no-JavaScript quote fallback did not reach the contact form.",
  );
  await noScriptContext.close();

  console.log(
    "Enquiry test passed: route context, chunk fallback, mobile focus and no-JavaScript navigation are intact.",
  );
} finally {
  await browser.close();
}
