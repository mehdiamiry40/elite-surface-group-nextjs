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

try {
  // Avoid relying on Vercel's production-only analytics script in local tests.
  await page.route("**/_vercel/insights/script.js", async (route) => {
    await route.fulfill({
      contentType: "application/javascript",
      body: "window.va=function(){};",
    });
  });

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

  console.log(
    "Enquiry test passed: route context, optional project fields and progressive fallbacks are intact.",
  );
} finally {
  await browser.close();
}
