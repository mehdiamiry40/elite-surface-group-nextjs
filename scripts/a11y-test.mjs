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
let layoutChecks = 0;
let anchorChecks = 0;

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

async function checkServiceAreaLayout(page, label) {
  layoutChecks += 1;
  const result = await page.evaluate(() => {
    function paintedTextRect(element) {
      const range = document.createRange();
      range.selectNodeContents(element);
      const rect = range.getBoundingClientRect();
      return { width: rect.width, bottom: rect.bottom };
    }

    const locationItems = [
      ...document.querySelectorAll(".locations-directory__item"),
    ].map((item) => {
      const link = item.querySelector("h3 a");
      const summary = item.querySelector(".locations-directory__summary");
      if (!(link instanceof HTMLElement) || !(summary instanceof HTMLElement)) {
        return { valid: false };
      }
      const linkRect = link.getBoundingClientRect();
      const summaryRect = summary.getBoundingClientRect();
      const painted = paintedTextRect(link);
      return {
        valid: true,
        linkWidth: linkRect.width,
        paintedWidth: painted.width,
        separated: painted.bottom <= summaryRect.top + 1,
        noOverflow: item.scrollWidth <= item.clientWidth + 1,
      };
    });

    const serviceLinks = [
      ...document.querySelectorAll(".services-section .service-card__link"),
    ].map((link) => ({
      width: link.getBoundingClientRect().width,
      noOverflow: link.scrollWidth <= link.clientWidth + 1,
    }));

    return {
      locationItems,
      serviceLinks,
      noPageOverflow:
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth + 1,
    };
  });

  const valid =
    result.locationItems.length > 0 &&
    result.locationItems.every(
      (item) =>
        item.valid &&
        item.linkWidth > 20.5 &&
        item.linkWidth + 1 >= item.paintedWidth &&
        item.separated &&
        item.noOverflow,
    ) &&
    result.serviceLinks.length > 0 &&
    result.serviceLinks.every((link) => link.width > 20.5 && link.noOverflow) &&
    result.noPageOverflow;

  if (!valid) {
    failures.push(`${label}: service-area layout ${JSON.stringify(result)}`);
  }
}

async function checkArticleAnchors(page, label) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const targets = ["#how-to-tell", "#faqs-and-sources"];
  for (const target of targets) {
    anchorChecks += 1;
    await page.getByRole("navigation", { name: "On this page" })
      .locator(`a[href="${target}"]`).click();
    // Exercise both a heading anchor and a section-wrapper anchor through
    // real TOC links. A correct hash alone does not prove the title is visible.
    const geometry = await page.evaluate((selector) => {
      const targetElement = document.querySelector(selector);
      const heading = targetElement?.matches("h2")
        ? targetElement
        : targetElement?.querySelector("h2");
      const header = document.querySelector(".site-header");
      return {
        hash: window.location.hash,
        headingTop: heading?.getBoundingClientRect().top,
        headingBottom: heading?.getBoundingClientRect().bottom,
        headerBottom: header?.getBoundingClientRect().bottom,
        viewportBottom: window.innerHeight,
      };
    }, target);
    if (
      geometry.hash !== target ||
      !(geometry.headingTop >= geometry.headerBottom + 8) ||
      !(geometry.headingBottom <= geometry.viewportBottom)
    ) {
      failures.push(`${label} ${target}: hidden anchor ${JSON.stringify(geometry)}`);
    }
  }

  anchorChecks += 1;
  await page.locator(".skip-link").focus();
  await page.locator(".skip-link").press("Enter");
  const skipVisible = await page.evaluate(() => {
    const main = document.querySelector("#main");
    const header = document.querySelector(".site-header");
    return window.location.hash === "#main" && main && header &&
      main.getBoundingClientRect().top >= header.getBoundingClientRect().bottom - 1;
  });
  if (!skipVisible) failures.push(`${label}: skip target hidden behind header`);
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
      if (route === "/resources/load-bearing-wall-removal-adelaide/") {
        await checkArticleAnchors(page, `article (${viewport.label})`);
      }
      if (route === "/locations/") {
        await checkServiceAreaLayout(
          page,
          `/locations/ (${viewport.label})`,
        );
      }
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

// A 1280×900 desktop window at 200% zoom has a 640×450 CSS viewport.
// Also verify the CSS fallbacks keep anchors usable before/without hydration.
for (const options of [
  { viewport: { width: 640, height: 450 }, deviceScaleFactor: 2, label: "200% desktop zoom-equivalent viewport" },
  { viewport: VIEWPORTS[0], javaScriptEnabled: false, label: "desktop without JavaScript" },
  { viewport: VIEWPORTS[1], javaScriptEnabled: false, label: "mobile without JavaScript" },
]) {
  const { label, ...contextOptions } = options;
  const context = await browser.newContext(contextOptions);
  try {
    const page = await context.newPage();
    await page.goto(new URL("/resources/load-bearing-wall-removal-adelaide/", baseUrl).toString(), {
      waitUntil: "networkidle",
    });
    await checkArticleAnchors(page, label);
  } catch (error) {
    failures.push(`${label}: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    await context.close();
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
await mobilePage.locator('summary[aria-label="Navigation menu"]').click();
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
    `desktop/mobile viewports and interactive UI states; ` +
    `${layoutChecks} service-area layout checks and ${anchorChecks} anchor checks passed.`,
);
