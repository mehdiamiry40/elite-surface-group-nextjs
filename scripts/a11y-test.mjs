#!/usr/bin/env node

/**
 * axe-core pass over the main routes at desktop and mobile widths.
 *
 *   npm run start &
 *   npm run a11y
 */

import { createRequire } from "node:module";
import { chromium } from "playwright";

const require = createRequire(import.meta.url);
const axeSource = require("fs").readFileSync(
  require.resolve("axe-core/axe.min.js"),
  "utf8",
);

const baseUrl = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";
const sitemapResponse = await fetch(new URL("/sitemap.xml", baseUrl));
if (!sitemapResponse.ok) {
  throw new Error(
    `Could not load sitemap for accessibility routes: ${sitemapResponse.status}`,
  );
}
const sitemapXml = await sitemapResponse.text();
const ROUTES = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  ([, location]) => new URL(location).pathname,
);
if (!ROUTES.length) {
  throw new Error("Sitemap contains no public routes for accessibility checks.");
}
const VIEWPORTS = [
  { width: 1440, height: 900, label: "desktop" },
  { width: 390, height: 844, label: "mobile" },
];
const UI_SETTLE_MS = 400;

const failures = [];
let checks = 0;

// CI images and sandboxes often ship a pre-provisioned Chromium rather than the
// exact revision `npx playwright install` would fetch. Honour an explicit path
// when one is set; unset, this behaves exactly as before.
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHROMIUM_PATH
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
    : {}),
});

async function runAxe(page, label) {
  checks += 1;
  if (!(await page.evaluate(() => Boolean(globalThis.axe)))) {
    await page.addScriptTag({ content: axeSource });
  }
  const violations = await page.evaluate(async () => {
    const results = await globalThis.axe.run(document, {
      runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
    });
    return results.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      nodes: violation.nodes.length,
    }));
  });

  if (violations.length) {
    failures.push(
      `${label}: ${violations
        .map(
          (violation) =>
            `${violation.impact} ${violation.id}×${violation.nodes}`,
        )
        .join(", ")}`,
    );
  }
}

for (const viewport of VIEWPORTS) {
  for (const route of ROUTES) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    try {
      await page.goto(new URL(route, baseUrl).toString(), {
        waitUntil: "networkidle",
      });
      await runAxe(page, `${route} (${viewport.label})`);
    } catch (error) {
      failures.push(
        `${route} (${viewport.label}): ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    } finally {
      await context.close();
    }
  }
}

// Exercise the states most likely to regress after hydration.
const desktop = await browser.newContext({ viewport: VIEWPORTS[0] });
const desktopPage = await desktop.newPage();
await desktopPage.goto(new URL("/", baseUrl).toString(), {
  waitUntil: "networkidle",
});
await runAxe(desktopPage, "desktop navigation");
await desktopPage
  .getByRole("link", { name: /start a project|request a quote|free quote/i })
  .first()
  .click();
await desktopPage.waitForTimeout(UI_SETTLE_MS);
await runAxe(desktopPage, "desktop quote dialog open");
await desktopPage.getByRole("button", { name: "Close quote form" }).click();
await desktopPage.waitForTimeout(UI_SETTLE_MS);
await runAxe(desktopPage, "desktop static hero");

await desktopPage.goto(new URL("/about/", baseUrl).toString(), {
  waitUntil: "networkidle",
});
await desktopPage.getByRole("button", { name: "Next workshop image" }).click();
await desktopPage.waitForTimeout(UI_SETTLE_MS);
await runAxe(desktopPage, "desktop workshop carousel advanced");

await desktopPage.goto(new URL("/projects/", baseUrl).toString(), {
  waitUntil: "networkidle",
});
await desktopPage
  .getByRole("button", { name: /Enlarge project photo/ })
  .first()
  .click();
await desktopPage.waitForTimeout(UI_SETTLE_MS);
await runAxe(desktopPage, "desktop project lightbox open");
await desktop.close();

const mobile = await browser.newContext({ viewport: VIEWPORTS[1] });
const mobilePage = await mobile.newPage();
await mobilePage.goto(new URL("/", baseUrl).toString(), {
  waitUntil: "networkidle",
});
await mobilePage.getByRole("button", { name: "Open navigation" }).click();
await mobilePage.waitForTimeout(UI_SETTLE_MS);
await runAxe(mobilePage, "mobile navigation open");
await mobilePage
  .getByRole("navigation", { name: "Mobile navigation" })
  .getByRole("link", {
    name: /start a project|request a quote|free quote/i,
  })
  .click();
await mobilePage.waitForTimeout(UI_SETTLE_MS);
await runAxe(mobilePage, "mobile quote opened from navigation");
await mobile.close();

await browser.close();

if (failures.length) {
  console.error(
    `\nA11y test FAILED — ${failures.length} of ${checks} checks:\n`,
  );
  for (const failure of failures) {
    console.error(`  ✗ ${failure}`);
  }
  process.exit(1);
}

console.log(
  `A11y test passed: ${checks} axe-core runs across ${ROUTES.length} routes, ` +
    `desktop/mobile viewports and interactive UI states.`,
);
