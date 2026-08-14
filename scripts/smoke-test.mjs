#!/usr/bin/env node

/**
 * Post-deploy smoke checks against a running server.
 *
 *   npm run start &   # or SMOKE_BASE_URL=https://… npm run smoke
 *   npm run smoke
 */

import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const baseUrl = new URL(process.env.SMOKE_BASE_URL ?? "http://localhost:3000");
const isLoopbackSmoke = ["localhost", "127.0.0.1", "[::1]"].includes(
  baseUrl.hostname,
);

const failures = [];
let checks = 0;

function check(name, condition, detail = "") {
  checks += 1;
  if (!condition) {
    failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
  }
}

async function get(pathname, init) {
  const response = await fetch(new URL(pathname, baseUrl), init);
  return response;
}

/* ------------------------------------------------------------------ routes */

/** Pull `slug: "…",` entries from typed content modules (skips union types). */
function contentSlugs(relativePath) {
  const source = readFileSync(path.join(projectRoot, relativePath), "utf8");
  return [...source.matchAll(/slug:\s*"([^"]+)",/g)].map((match) => match[1]);
}

const serviceSlugs = contentSlugs("src/content/services.ts");
const projectSlugs = contentSlugs("src/content/projects.ts");
const locationSlugs = contentSlugs("src/content/locations.ts");
const resourceSlugs = contentSlugs("src/content/resources.ts");
const projectSource = readFileSync(
  path.join(projectRoot, "src/content/projects.ts"),
  "utf8",
);
const analyticsComponentSource = readFileSync(
  path.join(projectRoot, "src/components/ConversionAnalytics.tsx"),
  "utf8",
);
const contactRouteSource = readFileSync(
  path.join(projectRoot, "src/app/api/contact/route.ts"),
  "utf8",
);
const routesSource = readFileSync(
  path.join(projectRoot, "src/content/routes.ts"),
  "utf8",
);
const sitemapSource = readFileSync(
  path.join(projectRoot, "src/app/sitemap.ts"),
  "utf8",
);
const servicesSource = readFileSync(
  path.join(projectRoot, "src/content/services.ts"),
  "utf8",
);
const resourcesSource = readFileSync(
  path.join(projectRoot, "src/content/resources.ts"),
  "utf8",
);
const enquiryContextSource = readFileSync(
  path.join(projectRoot, "src/content/enquiry.ts"),
  "utf8",
);
const servicePageSource = readFileSync(
  path.join(projectRoot, "src/app/[service]/page.tsx"),
  "utf8",
);
const projectPageSource = readFileSync(
  path.join(projectRoot, "src/app/projects/[slug]/page.tsx"),
  "utf8",
);
const serviceNamesBySlug = new Map(
  [
    ...servicesSource.matchAll(
      /slug:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"/g,
    ),
  ].map(([, slug, name]) => [slug, name]),
);
const projectServices = new Map(
  [
    ...projectSource.matchAll(/slug:\s*"([^"]+)"[\s\S]*?service:\s*"([^"]+)"/g),
  ].map(([, slug, service]) => [slug, service]),
);
const resourceServices = new Map(
  [
    ...resourcesSource.matchAll(
      /slug:\s*"([^"]+)"[\s\S]*?serviceSlug:\s*"([^"]+)"/g,
    ),
  ].map(([, slug, service]) => [slug, service]),
);
const projectImages = new Map(
  [
    ...projectSource.matchAll(
      /slug:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]+)"/g,
    ),
  ].map(([, slug, image]) => [slug, image]),
);

/** Full public indexable set — must stay in lockstep with `src/app/sitemap.ts`. */
const EXPECTED_SITEMAP_PATHS = [
  "/",
  "/about/",
  "/services/",
  ...serviceSlugs.map((slug) => `/${slug}/`),
  "/projects/",
  ...projectSlugs.map((slug) => `/projects/${slug}/`),
  "/locations/",
  "/project-planning/",
  "/resources/",
  ...resourceSlugs.map((slug) => `/resources/${slug}/`),
  ...locationSlugs.map((slug) => `/locations/${slug}/`),
  "/contact-us/",
  "/privacy-policy/",
  "/terms-of-service/",
];

const ROUTES = EXPECTED_SITEMAP_PATHS;

const pages = new Map();

for (const route of ROUTES) {
  const response = await get(route);
  const html = await response.text();
  pages.set(route, html);
  check(`GET ${route}`, response.status === 200, `status ${response.status}`);
}

const homeH1 =
  (pages.get("/") ?? "").match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "";
const homeH1Text = homeH1
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim()
  .toLowerCase();
check(
  "homepage H1 describes the core Adelaide services",
  ["adelaide", "cladding", "render", "hebel", "walling"].every((term) =>
    homeH1Text.includes(term),
  ),
);
check(
  "homepage H1 preserves spacing between render and Hebel",
  homeH1Text.includes("render, hebel"),
  homeH1Text,
);

/* -------------------------------------------------------------- retired WP */

for (const retired of [
  "/sample-page/",
  "/2026/01/28/hello-world/",
  "/category/uncategorized/",
  "/author/admin/",
]) {
  const response = await get(retired, { redirect: "manual" });
  check(
    `retired ${retired} returns 404`,
    response.status === 404,
    `status ${response.status}`,
  );
}

for (const sitemap of [
  "/sitemap_index.xml",
  "/page-sitemap.xml",
  "/post-sitemap.xml",
  "/category-sitemap.xml",
  "/wp-sitemap.xml",
]) {
  const response = await get(sitemap, { redirect: "manual" });
  check(
    `legacy ${sitemap} redirects`,
    [301, 308].includes(response.status),
    `status ${response.status}`,
  );
}

/* ----------------------------------------------------- legacy asset URLs */

const legacyAssets = JSON.parse(
  readFileSync(
    path.join(projectRoot, "src/content/legacy-assets.json"),
    "utf8",
  ),
);
for (const [legacy, destination] of Object.entries(legacyAssets)) {
  const response = await get(legacy, { redirect: "manual" });
  const location = response.headers.get("location") ?? "";
  check(
    `legacy asset ${legacy} redirects`,
    [301, 308].includes(response.status),
    `status ${response.status}`,
  );
  check(
    `legacy asset ${legacy} targets ${destination}`,
    location.includes(destination),
    `location ${location}`,
  );
  const target = await get(destination, { redirect: "manual" });
  check(
    `legacy target ${destination} exists`,
    target.status === 200,
    `status ${target.status}`,
  );
}

/* --------------------------------------------------------------- 404 + SEO */

const notFound = await get("/this-route-does-not-exist/");
check(
  "unknown route 404s",
  notFound.status === 404,
  `status ${notFound.status}`,
);
const notFoundHtml = await notFound.text();
check(
  "404 does not canonicalize to the homepage",
  !/<link rel="canonical"/.test(notFoundHtml),
);
check(
  "404 emits exactly one robots directive",
  (notFoundHtml.match(/<meta name="robots"/g) ?? []).length === 1,
);

const llms = await get("/llms.txt");
check("GET /llms.txt", llms.status === 200, `status ${llms.status}`);
const llmsBody = await llms.text();
check(
  "llms.txt references primary service pages",
  /cladding|render|hebel|walling/i.test(llmsBody) &&
    /elitesurfacegroup\.com\.au/.test(llmsBody),
);
check(
  "llms.txt references the resources hub and published guides",
  /\/resources\//.test(llmsBody) &&
    /\/resources\/render-cracking-adelaide\//.test(llmsBody) &&
    /\/resources\/cladding-maintenance-coastal-adelaide\//.test(llmsBody) &&
    /\/resources\/rendering-hebel-panels-adelaide\//.test(llmsBody) &&
    /\/resources\/hebel-boundary-walls-adelaide\//.test(llmsBody) &&
    /\/resources\/rendering-over-painted-brick-adelaide\//.test(llmsBody),
);

for (const endpoint of ["/sitemap.xml", "/robots.txt"]) {
  const response = await get(endpoint);
  check(
    `GET ${endpoint}`,
    response.status === 200,
    `status ${response.status}`,
  );
}

const sitemapXml = await (await get("/sitemap.xml")).text();
const sitemapLocs = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => match[1],
);
const sitemapEntries = [...sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(
  ([, entry]) => ({
    loc: entry.match(/<loc>(.*?)<\/loc>/)?.[1] ?? "",
    lastModified: entry.match(/<lastmod>(.*?)<\/lastmod>/)?.[1] ?? "",
  }),
);
const expectedSitemapLocs = EXPECTED_SITEMAP_PATHS.map((route) =>
  route === "/"
    ? "https://elitesurfacegroup.com.au/"
    : `https://elitesurfacegroup.com.au${route}`,
);
check(
  "sitemap excludes retired WordPress pages",
  !/sample-page|hello-world|uncategorized|author/.test(sitemapXml),
);
check(
  "sitemap URL count matches public pages",
  sitemapLocs.length === expectedSitemapLocs.length,
  `found ${sitemapLocs.length}, expected ${expectedSitemapLocs.length}`,
);
check(
  "sitemap URL set matches public pages exactly",
  sitemapLocs.length === expectedSitemapLocs.length &&
    expectedSitemapLocs.every((loc) => sitemapLocs.includes(loc)) &&
    sitemapLocs.every((loc) => expectedSitemapLocs.includes(loc)),
);
check(
  "sitemap locs use apex host with trailing slashes",
  sitemapLocs.every(
    (loc) =>
      loc.startsWith("https://elitesurfacegroup.com.au/") && loc.endsWith("/"),
  ),
);
check(
  "sitemap lastmod is present on every URL",
  (sitemapXml.match(/<lastmod>/g) ?? []).length === sitemapLocs.length,
);
check(
  "sitemap lastmod is not stale WordPress-era dates",
  !/<lastmod>2026-0[1-4]-/.test(sitemapXml),
);
check(
  "sitemap omits ignored priority and change-frequency hints",
  !/<priority>|<changefreq>/.test(sitemapXml) &&
    !/priority|changeFrequency/.test(sitemapSource),
);
const todayInAdelaide = new Date().toLocaleDateString("en-CA", {
  timeZone: "Australia/Adelaide",
});
check(
  "sitemap lastmod values are valid ISO dates and are not in the future",
  sitemapEntries.length === sitemapLocs.length &&
    sitemapEntries.every(({ lastModified }) => {
      const date = lastModified.slice(0, 10);
      const parsed = new Date(`${date}T00:00:00Z`);
      return (
        /^\d{4}-\d{2}-\d{2}$/.test(date) &&
        !Number.isNaN(parsed.valueOf()) &&
        parsed.toISOString().slice(0, 10) === date &&
        date <= todayInAdelaide
      );
    }),
);
const sitemapLastModified = new Map(
  sitemapEntries.map(({ loc, lastModified }) => [loc, lastModified.slice(0, 10)]),
);
check(
  "sitemap uses truthful route-specific dates",
  sitemapLastModified.get("https://elitesurfacegroup.com.au/services/") ===
    "2026-08-10" &&
    sitemapLastModified.get(
      "https://elitesurfacegroup.com.au/resources/rendering-over-painted-brick-adelaide/",
    ) === "2026-08-13" &&
    new Set(sitemapLastModified.values()).size > 1 &&
    /publicRouteRecords/.test(sitemapSource) &&
    /publicPaths\s*=\s*publicRouteRecords\.map/.test(routesSource),
);

/* ----------------------------------------------------------------- content */

function decodeHtmlText(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/gi, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function tagAttribute(tag, name) {
  return decodeHtmlText(
    tag.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`))?.[1] ?? "",
  );
}

function metaContent(html, attribute, value) {
  const tag = (html.match(/<meta[^>]*>/g) ?? []).find(
    (candidate) => tagAttribute(candidate, attribute) === value,
  );
  return tag ? tagAttribute(tag, "content") : "";
}

function jsonLdFor(html) {
  const data = [];
  let invalid = 0;
  for (const [, block] of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )) {
    try {
      data.push(JSON.parse(block));
    } catch {
      invalid += 1;
    }
  }
  return { data, invalid };
}

const titlesByRoute = new Map();
const descriptionsByRoute = new Map();
const jsonLdByRoute = new Map();

for (const [route, html] of pages) {
  const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
  check(`${route} has exactly one <h1>`, h1Count === 1, `found ${h1Count}`);

  const title = decodeHtmlText(
    html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "",
  );
  titlesByRoute.set(route, title);
  check(
    `${route} title is within the search snippet budget`,
    title.length > 0 && title.length <= 65,
    `${title.length} characters: ${title}`,
  );

  const description = decodeHtmlText(
    html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "",
  );
  descriptionsByRoute.set(route, description);
  check(
    `${route} description is within the search snippet budget`,
    description.length >= 40 && description.length <= 160,
    `${description.length} characters`,
  );

  check(
    `${route} has a meta description`,
    /<meta name="description" content="[^"]{40,}"/.test(html),
  );

  const expectedUrl = `https://elitesurfacegroup.com.au${route}`;
  const canonicalTags = (html.match(/<link[^>]*>/g) ?? []).filter(
    (tag) => tagAttribute(tag, "rel") === "canonical",
  );
  check(
    `${route} has one exact self-canonical`,
    canonicalTags.length === 1 &&
      tagAttribute(canonicalTags[0], "href") === expectedUrl,
  );

  const ogTitle = metaContent(html, "property", "og:title");
  const ogDescription = metaContent(html, "property", "og:description");
  const ogUrl = metaContent(html, "property", "og:url");
  const ogImage = metaContent(html, "property", "og:image");
  const twitterTitle = metaContent(html, "name", "twitter:title");
  const twitterDescription = metaContent(html, "name", "twitter:description");
  const twitterImage = metaContent(html, "name", "twitter:image");
  check(`${route} has an Open Graph image`, Boolean(ogImage));
  check(`${route} og:url matches the page`, ogUrl === expectedUrl, ogUrl);
  check(
    `${route} Open Graph and Twitter metadata match the page metadata`,
    ogTitle === title &&
      twitterTitle === title &&
      ogDescription === description &&
      twitterDescription === description &&
      twitterImage === ogImage,
  );

  const routeJsonLd = jsonLdFor(html);
  jsonLdByRoute.set(route, routeJsonLd.data);
  check(
    `${route} JSON-LD blocks are valid JSON`,
    routeJsonLd.data.length > 0 && routeJsonLd.invalid === 0,
    `${routeJsonLd.invalid} invalid`,
  );

  // Every tel: link must be the single E.164 number — no placeholders.
  const telLinks = [...html.matchAll(/href="tel:([^"]+)"/g)].map((m) => m[1]);
  check(`${route} has at least one tel: link`, telLinks.length > 0);
  const badTel = telLinks.filter((value) => value !== "+61413844912");
  check(
    `${route} tel: links are all +61413844912`,
    badTel.length === 0,
    badTel.join(", "),
  );

  check(
    `${route} references no first-party wp-content asset`,
    !/(?:src|href)="(?:https:\/\/elitesurfacegroup\.com\.au)?\/wp-content\//.test(
      html,
    ),
  );

  check(
    `${route} loads no third-party font or script`,
    !/fonts\.googleapis\.com|fonts\.gstatic\.com|gravatar\.com/.test(html),
  );

  const imgTags = html.match(/<img[^>]*>/g) ?? [];
  const missingAlt = imgTags.filter((tag) => !/\salt=/.test(tag));
  check(
    `${route} images all declare alt`,
    missingAlt.length === 0,
    `${missingAlt.length} without alt`,
  );
}

check(
  "public pages have unique titles",
  new Set(titlesByRoute.values()).size === titlesByRoute.size,
);
check(
  "public pages have unique meta descriptions",
  new Set(descriptionsByRoute.values()).size === descriptionsByRoute.size,
);

/* ----------------------------------------------------------------- headers */

const headerResponse = await get("/");
for (const [header, expected] of [
  ["content-security-policy", /default-src 'self'/],
  ["x-content-type-options", /nosniff/],
  ["referrer-policy", /strict-origin-when-cross-origin/],
  ["x-frame-options", /DENY/],
  ["strict-transport-security", /max-age=\d+/],
  ["permissions-policy", /camera=\(\)/],
]) {
  const value = headerResponse.headers.get(header) ?? "";
  check(`header ${header}`, expected.test(value), `got "${value}"`);
}

check(
  "powered-by header is suppressed",
  !headerResponse.headers.get("x-powered-by"),
);

const assetResponse = await get("/images/esg-logo-1.webp");
check(
  "GET /images/esg-logo-1.webp",
  assetResponse.status === 200,
  `status ${assetResponse.status}`,
);
check(
  "images are cached without immutable year-long headers",
  /max-age=604800/.test(assetResponse.headers.get("cache-control") ?? "") &&
    !/immutable/.test(assetResponse.headers.get("cache-control") ?? ""),
  assetResponse.headers.get("cache-control") ?? "",
);
check(
  "images serve as image/webp",
  assetResponse.headers.get("content-type") === "image/webp",
  assetResponse.headers.get("content-type") ?? "",
);

/* ------------------------------------------------- every image is reachable */

const imageDir = path.join(projectRoot, "public/images");

/**
 * Every image under `public/images`, relative to it and including nested paths
 * such as `og/og-cladding.jpg`. A flat `readdirSync` returns subdirectory
 * *names*, which then get requested as though they were files.
 */
function imagePaths(dir, prefix = "") {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? imagePaths(path.join(dir, entry.name), `${prefix}${entry.name}/`)
      : [`${prefix}${entry.name}`],
  );
}

const imageFiles = imagePaths(imageDir);
check("image directory is not empty", imageFiles.length > 0);
for (let index = 0; index < imageFiles.length; index += 12) {
  const batch = imageFiles.slice(index, index + 12);
  const results = await Promise.all(
    batch.map(async (file) => [file, (await get(`/images/${file}`)).status]),
  );
  for (const [file, status] of results) {
    check(`GET /images/${file}`, status === 200, `status ${status}`);
  }
}

// Nothing should ship that no page references.
const contentDir = path.join(projectRoot, "src/content");
const contentSources = readdirSync(contentDir)
  .filter((file) => file.endsWith(".ts") || file.endsWith(".json"))
  .map((file) => readFileSync(path.join(contentDir, file), "utf8"))
  .join("\n");
const allReferences = [...pages.values()].join("") + contentSources;
const orphans = imageFiles.filter(
  (file) =>
    !allReferences.includes(encodeURIComponent(`/images/${file}`)) &&
    !allReferences.includes(`/images/${file}`) &&
    !file.startsWith("cropped-esg-logo"),
);
check(
  "no orphaned images are shipped",
  orphans.length === 0,
  orphans.join(", "),
);

/* ------------------------------------------------------- contact endpoint */

const contactChecks = [
  [
    "rejects non-JSON",
    415,
    { method: "POST", headers: { "Content-Type": "text/plain" }, body: "{}" },
  ],
  [
    "rejects cross-site origin",
    403,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://example.invalid",
        "Sec-Fetch-Site": "cross-site",
      },
      body: "{}",
    },
  ],
  ...(isLoopbackSmoke
    ? [
        [
          "rejects a malformed body",
          400,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Origin: baseUrl.origin,
              "x-real-ip": "198.51.100.10",
            },
            body: "null",
          },
        ],
      ]
    : []),
];

for (const [name, expected, init] of contactChecks) {
  const response = await get("/api/contact/", init);
  check(
    `contact endpoint ${name}`,
    response.status === expected,
    `status ${response.status}`,
  );
}

// Detailed validation probes deliberately consume the endpoint's rate-limit
// budget. Run them against the isolated local/CI server, where the test IPs are
// controllable; a remote smoke run keeps to the pre-rate-limit 415/403 probes
// above so verification cannot temporarily throttle real visitors.
if (isLoopbackSmoke) {
  const invalidService = await get("/api/contact/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: baseUrl.origin,
      "x-real-ip": "198.51.100.11",
    },
    body: JSON.stringify({
      name: "Smoke Tester",
      email: "smoke@example.com",
      service: "Not A Real Service",
      message: "Please ignore — smoke suite service allowlist check.",
    }),
  });
  check(
    "contact endpoint rejects an unknown service",
    invalidService.status === 400,
    `status ${invalidService.status}`,
  );

  const invalidProjectType = await get("/api/contact/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: baseUrl.origin,
      "x-real-ip": "198.51.100.13",
    },
    body: JSON.stringify({
      name: "Smoke Tester",
      email: "smoke@example.com",
      projectType: "Unsupported project type",
      message: "Please ignore — smoke suite project-type allowlist check.",
    }),
  });
  check(
    "contact endpoint rejects an unknown project type",
    invalidProjectType.status === 400,
    `status ${invalidProjectType.status}`,
  );

  const invalidProjectTiming = await get("/api/contact/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: baseUrl.origin,
      "x-real-ip": "198.51.100.14",
    },
    body: JSON.stringify({
      name: "Smoke Tester",
      email: "smoke@example.com",
      projectTiming: "Yesterday",
      message: "Please ignore — smoke suite project-timing allowlist check.",
    }),
  });
  check(
    "contact endpoint rejects an unknown project timing",
    invalidProjectTiming.status === 400,
    `status ${invalidProjectTiming.status}`,
  );

  const overlongProjectArea = await get("/api/contact/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: baseUrl.origin,
      "x-real-ip": "198.51.100.15",
    },
    body: JSON.stringify({
      name: "Smoke Tester",
      email: "smoke@example.com",
      projectArea: "A".repeat(121),
      message: "Please ignore — smoke suite project-area length check.",
    }),
  });
  check(
    "contact endpoint rejects an overlong project area",
    overlongProjectArea.status === 422,
    `status ${overlongProjectArea.status}`,
  );

  // The client posts to the trailing-slash form; it must not redirect.
  const noRedirect = await get("/api/contact/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: baseUrl.origin,
      "x-real-ip": "198.51.100.12",
    },
    body: "null",
    redirect: "manual",
  });
  check(
    "contact endpoint does not redirect",
    ![307, 308].includes(noRedirect.status),
    `status ${noRedirect.status}`,
  );

  const progressiveForm = await get("/api/contact/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: baseUrl.origin,
      "x-real-ip": "198.51.100.22",
    },
    body: new URLSearchParams({
      firstName: "Smoke",
      lastName: "Tester",
      email: "smoke@example.com",
      service: "",
      projectArea: "Salisbury East 5109",
      projectType: "Multi-unit development",
      projectTiming: "Within 3–6 months",
      message: "Progressive form fallback check.",
      company: "honeypot-check",
      sourcePath: "/contact-us/",
    }),
    redirect: "manual",
  });
  const progressiveLocation = progressiveForm.headers.get("location") ?? "";
  check(
    "progressive form POST redirects without personal data",
    progressiveForm.status === 303 &&
      /\/contact-us\/#enquiry-sent$/.test(progressiveLocation) &&
      !/Smoke|smoke%40|message=|Salisbury|Multi-unit|Within/.test(
        progressiveLocation,
      ),
    `status ${progressiveForm.status}, location ${progressiveLocation}`,
  );
}

/* ------------------------------------------- content / compliance guards */

const privacyHtml = pages.get("/privacy-policy/") ?? "";
const termsHtml = pages.get("/terms-of-service/") ?? "";
check(
  "privacy policy publishes the public business email",
  privacyHtml.includes("elite.surfacegroup@gmail.com"),
);
check(
  "privacy policy cites Australian Privacy Principles",
  /Australian Privacy Principles|Privacy Act 1988/.test(privacyHtml),
);
check(
  "llms.txt publishes the public business email",
  llmsBody.includes("elite.surfacegroup@gmail.com"),
);
check(
  "the retired info@ inbox is not published",
  ![...pages.values(), llmsBody].some((html) =>
    html.includes("info@elitesurfacegroup.com.au"),
  ),
);
check(
  "legal pages do not cite UK Data Protection Act 1998",
  !/Data Protection Act 1998/.test(privacyHtml + termsHtml),
);
check(
  "legal pages do not claim Google Analytics",
  !/(?<!do not )use(?:s)? Google Analytics/.test(privacyHtml + termsHtml),
);
check(
  "legal pages disclose Vercel Web Analytics and cookie-free measurement",
  [privacyHtml, termsHtml].every(
    (html) =>
      /Vercel Web Analytics/.test(html) &&
      /does not use (?:analytics or advertising )?cookies/.test(html),
  ),
);
check(
  "privacy policy discloses project fields and excludes them from analytics",
  /successful enquiry event may include the allowlisted source page and service category/i.test(
    privacyHtml,
  ) &&
    /Project suburb or postcode, project type and target timing/.test(
      privacyHtml,
    ) &&
    /do not send names, email addresses, phone numbers, enquiry text, project suburbs or postcodes, project types or target timing in analytics events/.test(
      privacyHtml,
    ),
);
check(
  "analytics redacts URL query strings and fragments before sending",
  /redactAnalyticsUrl\(event\.url/.test(analyticsComponentSource),
);
check(
  "contact links use fixed analytics events without destination properties",
  /track\(analyticsEvent\)/.test(analyticsComponentSource) &&
    !/track\(analyticsEvent,/.test(analyticsComponentSource),
);
const enquiryTrackBlock =
  contactRouteSource.match(
    /await track\(\s*CONVERSION_EVENT_NAMES\.enquirySubmitted,[\s\S]*?\n\s*\);/,
  )?.[0] ?? "";
check(
  "successful enquiry analytics uses only allowlisted non-personal dimensions",
  /CONVERSION_EVENT_NAMES\.enquirySubmitted/.test(enquiryTrackBlock) &&
    /page: sourcePath/.test(enquiryTrackBlock) &&
    /service: service \|\| "Not specified"/.test(enquiryTrackBlock) &&
    !/(?:name|email|phone|message|projectArea|projectType|projectTiming)\s*:/.test(
      enquiryTrackBlock,
    ),
);
const contactLogBodies = [
  ...contactRouteSource.matchAll(/contactLog\("[^"]+",\s*\{([\s\S]*?)\}\);/g),
].map(([, body]) => body);
check(
  "contact logs exclude enquiry and project details",
  contactLogBodies.length >= 4 &&
    contactLogBodies.every(
      (body) =>
        !/(?:name|email|phone|message|projectArea|projectType|projectTiming)\s*:/.test(
          body,
        ),
    ),
);
check(
  "project context reaches every email fallback without entering analytics",
  ["Project area:", "Project type:", "Target timing:"].every(
    (label) => (contactRouteSource.match(new RegExp(label, "g")) ?? []).length >= 3,
  ) &&
    /escapeHtml\(\s*projectArea \|\| "Not provided"/.test(contactRouteSource) &&
    /escapeHtml\(\s*projectType \|\| "Not specified"/.test(contactRouteSource) &&
    /escapeHtml\(\s*projectTiming \|\| "Not specified"/.test(contactRouteSource),
);
check(
  "analytics cannot turn an accepted enquiry into a delivery failure",
  contactRouteSource.indexOf("contact.analytics.failed") >
    contactRouteSource.indexOf("contact.resend.failed") &&
    contactRouteSource.indexOf("contact.analytics.failed") <
      contactRouteSource.lastIndexOf("return contactResponse("),
);
check(
  "terms are governed by South Australian / Australian law",
  /South Australia/.test(termsHtml) &&
    /Australian Consumer Law/.test(termsHtml),
);
check(
  "legal pages identify the registered entity and ABN",
  [privacyHtml, termsHtml].every(
    (html) =>
      /Elite Surface Group Pty Ltd/.test(html) && /35 691 074 567/.test(html),
  ),
);

const homeHtml = pages.get("/") ?? "";
const aboutHtml = pages.get("/about/") ?? "";
const contactHtml = pages.get("/contact-us/") ?? "";
const adelaideHtml = pages.get("/locations/adelaide/") ?? "";
const resourcesHtml = pages.get("/resources/") ?? "";
const renderCrackingHtml =
  pages.get("/resources/render-cracking-adelaide/") ?? "";
const claddingMaintenanceHtml =
  pages.get("/resources/cladding-maintenance-coastal-adelaide/") ?? "";
const renderingHebelHtml =
  pages.get("/resources/rendering-hebel-panels-adelaide/") ?? "";
const hebelBoundaryWallsHtml =
  pages.get("/resources/hebel-boundary-walls-adelaide/") ?? "";
const renderingPaintedBrickHtml =
  pages.get("/resources/rendering-over-painted-brick-adelaide/") ?? "";
const projectPlanningHtml = pages.get("/project-planning/") ?? "";
check(
  "contact form collects optional project context with fixed choices",
  ["projectArea", "projectType", "projectTiming"].every((name) =>
    contactHtml.includes(`name="${name}"`),
  ) &&
    [
      "Project suburb or postcode (optional)",
      "Project type (optional)",
      "Target timing (optional)",
      "Multi-unit development",
      "Ready to request a quote",
      "Planning / not sure",
    ].every((copy) => contactHtml.includes(copy)),
);
check(
  "enquiry copy does not promise an unverified response time or file upload",
  ![...pages.values()].some((html) =>
    /respond within one business day|(?:send (?:us )?|through our contact form)[^.]{0,100}(?:plans|photos|drawings)|type="file"/i.test(
      html,
    ),
  ),
);

const expectedContextRoutes = [
  ...serviceSlugs.map((slug) => [
    `/${slug}/`,
    serviceNamesBySlug.get(slug),
  ]),
  ...projectSlugs.map((slug) => {
    const serviceSlug = projectServices.get(slug);
    return [`/projects/${slug}/`, serviceNamesBySlug.get(serviceSlug)];
  }),
  ...resourceSlugs.map((slug) => {
    const serviceSlug = resourceServices.get(slug);
    return [`/resources/${slug}/`, serviceNamesBySlug.get(serviceSlug)];
  }),
];
check(
  "quote dialog preserves service intent on every service, project and guide",
  expectedContextRoutes.every(
    ([route, service]) =>
      typeof service === "string" &&
      enquiryContextSource.includes(`"${route}": "${service}"`),
  ),
);
for (const slug of serviceSlugs) {
  const serviceHtml = pages.get(`/${slug}/`) ?? "";
  const name = serviceNamesBySlug.get(slug) ?? slug;
  check(
    `${slug} service page offers an early intent-specific quote action`,
    serviceHtml.includes('class="service-intro__actions"') &&
      /<a(?=[^>]*class="btn")(?=[^>]*href="\/contact-us\/#contact")[^>]*>/.test(
        serviceHtml,
      ) &&
      enquiryContextSource.includes(`"/${slug}/": "${name}"`) &&
      /Request a \{serviceLabel\} quote/.test(servicePageSource),
  );
}
check(
  "site publishes the registered entity and ABN",
  /Elite Surface Group Pty Ltd/.test(homeHtml) &&
    /35 691 074 567/.test(homeHtml),
);
check(
  "every public page publishes the verified Salisbury East address",
  [...pages.values()].every((html) =>
    /22 Robin St, Salisbury East SA 5109/.test(html),
  ),
);
check(
  "contact page publishes complete local contact details",
  /Contact our Salisbury East team/.test(contactHtml) &&
    /22 Robin St, Salisbury East SA 5109/.test(contactHtml) &&
    /0413 844 912/.test(contactHtml) &&
    /elite\.surfacegroup@gmail\.com/.test(contactHtml) &&
    /Adelaide &amp; South Australia/.test(contactHtml),
);
check(
  "about and Adelaide pages identify the Salisbury East base",
  /Salisbury East/.test(aboutHtml) && /Salisbury East/.test(adelaideHtml),
);
check(
  "footer links directly to the Adelaide service area",
  /href="\/locations\/adelaide\/?"/.test(homeHtml),
);
check(
  "official Instagram profile is linked from the site",
  /href="https:\/\/www\.instagram\.com\/elite\.surface\.group\/"/.test(
    homeHtml,
  ),
);

const jsonLdBlocks = [
  ...homeHtml.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  ),
];
const parsedJsonLd = [];
for (const [, block] of jsonLdBlocks) {
  try {
    parsedJsonLd.push(JSON.parse(block));
  } catch {
    check("homepage JSON-LD blocks are valid JSON", false);
  }
}
const organisationJsonLd = parsedJsonLd.find((data) => {
  const types = Array.isArray(data?.["@type"])
    ? data["@type"]
    : [data?.["@type"]];
  return types.includes("HomeAndConstructionBusiness");
});
check(
  "organisation schema publishes the verified local NAP",
  organisationJsonLd?.name === "Elite Surface Group" &&
    organisationJsonLd?.legalName === "Elite Surface Group Pty Ltd" &&
    organisationJsonLd?.telephone === "+61413844912" &&
    organisationJsonLd?.email === "elite.surfacegroup@gmail.com" &&
    organisationJsonLd?.address?.streetAddress === "22 Robin St" &&
    organisationJsonLd?.address?.addressLocality === "Salisbury East" &&
    organisationJsonLd?.address?.addressRegion === "SA" &&
    organisationJsonLd?.address?.postalCode === "5109" &&
    organisationJsonLd?.address?.addressCountry === "AU",
);
const expectedServiceAreas = [
  { "@type": "City", name: "Adelaide" },
  { "@type": "AdministrativeArea", name: "South Australia" },
];
check(
  "organisation schema uses real City and AdministrativeArea service areas",
  JSON.stringify(organisationJsonLd?.areaServed) ===
    JSON.stringify(expectedServiceAreas) &&
    JSON.stringify(organisationJsonLd?.contactPoint?.[0]?.areaServed) ===
      JSON.stringify(expectedServiceAreas),
);
check(
  "every service schema uses the same precise service areas",
  serviceSlugs.every((slug) => {
    const serviceSchema = (jsonLdByRoute.get(`/${slug}/`) ?? []).find(
      (data) => data?.["@type"] === "Service",
    );
    return (
      JSON.stringify(serviceSchema?.areaServed) ===
      JSON.stringify(expectedServiceAreas)
    );
  }),
);
const offeredServices = organisationJsonLd?.hasOfferCatalog?.itemListElement ?? [];
check(
  "organisation schema connects its four verified service offers",
  organisationJsonLd?.hasOfferCatalog?.["@type"] === "OfferCatalog" &&
    offeredServices.length === serviceSlugs.length &&
    serviceSlugs.every((slug) =>
      offeredServices.some(
        (offer) =>
          offer?.["@type"] === "Offer" &&
          offer?.itemOffered?.["@id"] ===
            `https://elitesurfacegroup.com.au/${slug}/#service` &&
          offer?.itemOffered?.url ===
            `https://elitesurfacegroup.com.au/${slug}/` &&
          offer?.itemOffered?.name ===
            (jsonLdByRoute.get(`/${slug}/`) ?? []).find(
              (data) => data?.["@type"] === "Service",
            )?.name,
      ),
    ),
);
check(
  "organisation schema maps the verified address, not a route from nowhere",
  organisationJsonLd?.hasMap ===
    "https://www.google.com/maps/search/?api=1&query=22%20Robin%20St%2C%20Salisbury%20East%20SA%205109",
);
check(
  "organisation schema and visible footer publish the same business hours",
  organisationJsonLd?.openingHoursSpecification?.opens === "09:00" &&
    organisationJsonLd?.openingHoursSpecification?.closes === "17:00" &&
    organisationJsonLd?.openingHoursSpecification?.dayOfWeek?.length === 6 &&
    organisationJsonLd?.openingHoursSpecification?.dayOfWeek?.includes(
      "Saturday",
    ) &&
    [...pages.values()].every((html) =>
      /Monday–Saturday, 9:00 am–5:00 pm/.test(html),
    ),
);
check(
  "organisation schema links the official Instagram entity",
  organisationJsonLd?.sameAs?.includes(
    "https://www.instagram.com/elite.surface.group/",
  ),
);
check(
  "homepage links directly to the Adelaide service area",
  /href="\/locations\/adelaide\/"/.test(homeHtml),
);
check(
  "homepage does not emit instructional HowTo schema",
  !/\"@type\":\"HowTo\"/.test(homeHtml),
);
check(
  "resources hub links to its published guides and project planning",
  [
    "/resources/render-cracking-adelaide/",
    "/resources/cladding-maintenance-coastal-adelaide/",
    "/resources/rendering-hebel-panels-adelaide/",
    "/resources/hebel-boundary-walls-adelaide/",
    "/resources/rendering-over-painted-brick-adelaide/",
    "/project-planning/",
    "/cladding/",
    "/render/",
    "/hebel/",
    "/contact-us/#contact",
  ].every((href) => resourcesHtml.includes(`href="${href}"`)),
);
check(
  "resource pages use matching social cards",
  resourcesHtml.includes(
    "https://elitesurfacegroup.com.au/images/og/og-resources.jpg",
  ) &&
    renderCrackingHtml.includes(
      "https://elitesurfacegroup.com.au/images/og/og-render-cracking-adelaide.jpg",
    ) &&
    claddingMaintenanceHtml.includes(
      "https://elitesurfacegroup.com.au/images/og/og-cladding-maintenance-coastal-adelaide.jpg",
    ) &&
    renderingHebelHtml.includes(
      "https://elitesurfacegroup.com.au/images/og/og-rendering-hebel-panels-adelaide.jpg",
    ) &&
    hebelBoundaryWallsHtml.includes(
      "https://elitesurfacegroup.com.au/images/og/og-hebel-boundary-walls-adelaide.jpg",
    ) &&
    renderingPaintedBrickHtml.includes(
      "https://elitesurfacegroup.com.au/images/og/og-rendering-over-painted-brick-adelaide.jpg",
    ),
);
check(
  "render-cracking guide publishes visible date and illustration boundary",
  /<time date[Tt]ime="2026-08-13">Published (?:<!-- -->)?13 August 2026<\/time>/.test(
    renderCrackingHtml,
  ) &&
    /AI-generated illustration only—not a photograph of an Elite Surface Group project or an actual property/.test(
      renderCrackingHtml,
    ) &&
    /crack’s appearance can provide context, but cannot identify the cause by itself/.test(
      renderCrackingHtml,
    ),
);
check(
  "render-cracking guide links authoritative sources",
  [
    "cdn.environment.sa.gov.au/environment/docs/tech_note3_1.pdf",
    "research.csiro.au/infratech/",
    "ncc.abcb.gov.au/editions/",
    "www.sa.gov.au/topics/housing/",
    "rockcote.com.au/resources/structural-movement/",
    "dulux.com.au/specifier/products/acratex/",
  ].every((source) => renderCrackingHtml.includes(source)),
);
check(
  "render-cracking guide links service, proof, location, planning and enquiry",
  [
    "/render/",
    "/projects/",
    "/locations/adelaide/",
    "/project-planning/",
    "/contact-us/#contact",
  ].every((href) => renderCrackingHtml.includes(`href="${href}"`)),
);
check(
  "render-cracking guide avoids instructional HowTo schema",
  !/\"@type\":\"HowTo\"/.test(renderCrackingHtml),
);

const renderCrackingJsonLd = [
  ...renderCrackingHtml.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  ),
]
  .map(([, block]) => {
    try {
      return JSON.parse(block);
    } catch {
      return null;
    }
  })
  .find((data) => data?.["@type"] === "Article");
check(
  "render-cracking guide emits matching Article schema",
  renderCrackingJsonLd?.["@id"] ===
    "https://elitesurfacegroup.com.au/resources/render-cracking-adelaide/#article" &&
    renderCrackingJsonLd?.url ===
      "https://elitesurfacegroup.com.au/resources/render-cracking-adelaide/" &&
    renderCrackingJsonLd?.mainEntityOfPage?.["@id"] ===
      "https://elitesurfacegroup.com.au/resources/render-cracking-adelaide/" &&
    renderCrackingJsonLd?.datePublished === "2026-08-13" &&
    renderCrackingJsonLd?.dateModified === "2026-08-13" &&
    renderCrackingJsonLd?.image?.contentUrl ===
      "https://elitesurfacegroup.com.au/images/v2/resource-render-cracking-adelaide.webp" &&
    renderCrackingJsonLd?.image?.width === 1536 &&
    renderCrackingJsonLd?.image?.height === 1024 &&
    renderCrackingJsonLd?.author?.["@id"] ===
      "https://elitesurfacegroup.com.au/#organization" &&
    renderCrackingJsonLd?.publisher?.["@id"] ===
      "https://elitesurfacegroup.com.au/#organization" &&
    renderCrackingJsonLd?.inLanguage === "en-AU",
);
check(
  "render and planning pages link to the render-cracking guide",
  [pages.get("/render/") ?? "", projectPlanningHtml].every((html) =>
    html.includes('href="/resources/render-cracking-adelaide/"'),
  ),
);
check(
  "coastal cladding guide publishes its visible date and image boundary",
  /<time date[Tt]ime="2026-08-13">Published (?:<!-- -->)?13 August 2026<\/time>/.test(
    claddingMaintenanceHtml,
  ) &&
    /shown as an installation example—not as evidence of a particular coastal exposure category/.test(
      claddingMaintenanceHtml,
    ) &&
    /Prepared by (?:<!-- -->)?<a href="\/about\/">Elite Surface Group<\/a>/.test(
      claddingMaintenanceHtml,
    ) &&
    /not a cleaning specification, a warranty statement or a remote diagnosis/.test(
      claddingMaintenanceHtml,
    ),
);
check(
  "coastal cladding guide links authoritative sources",
  [
    "www.sa.gov.au/topics/business-and-trade/building-industry/",
    "www.yourhome.gov.au/materials/cladding-systems",
    "www.jameshardie.com.au/fibre-cement",
    "colorbond.com/why-colorbond-steel/maintenance",
    "safework.sa.gov.au/industry/construction/working-at-heights",
  ].every((source) => claddingMaintenanceHtml.includes(source)),
);
check(
  "coastal cladding guide links service, proof, location, planning and enquiry",
  [
    "/cladding/",
    "/projects/dark-feature-cladding/",
    "/locations/adelaide/",
    "/project-planning/",
    "/contact-us/#contact",
  ].every((href) => claddingMaintenanceHtml.includes(`href="${href}"`)),
);
check(
  "coastal cladding guide avoids instructional HowTo schema",
  !/"@type":"HowTo"/.test(claddingMaintenanceHtml),
);

const claddingMaintenanceJsonLd = [
  ...claddingMaintenanceHtml.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  ),
]
  .map(([, block]) => {
    try {
      return JSON.parse(block);
    } catch {
      return null;
    }
  })
  .find((data) => data?.["@type"] === "Article");
check(
  "coastal cladding guide emits matching Article schema",
  claddingMaintenanceJsonLd?.["@id"] ===
    "https://elitesurfacegroup.com.au/resources/cladding-maintenance-coastal-adelaide/#article" &&
    claddingMaintenanceJsonLd?.url ===
      "https://elitesurfacegroup.com.au/resources/cladding-maintenance-coastal-adelaide/" &&
    claddingMaintenanceJsonLd?.mainEntityOfPage?.["@id"] ===
      "https://elitesurfacegroup.com.au/resources/cladding-maintenance-coastal-adelaide/" &&
    claddingMaintenanceJsonLd?.datePublished === "2026-08-13" &&
    claddingMaintenanceJsonLd?.dateModified === "2026-08-13" &&
    claddingMaintenanceJsonLd?.image?.contentUrl ===
      "https://elitesurfacegroup.com.au/images/v2/project-dark-feature-cladding.webp" &&
    claddingMaintenanceJsonLd?.image?.width === 1600 &&
    claddingMaintenanceJsonLd?.image?.height === 1067 &&
    claddingMaintenanceJsonLd?.about?.["@id"] ===
      "https://elitesurfacegroup.com.au/cladding/#service" &&
    claddingMaintenanceJsonLd?.author?.["@id"] ===
      "https://elitesurfacegroup.com.au/#organization" &&
    claddingMaintenanceJsonLd?.publisher?.["@id"] ===
      "https://elitesurfacegroup.com.au/#organization" &&
    claddingMaintenanceJsonLd?.inLanguage === "en-AU",
);
check(
  "cladding and planning pages link to the coastal cladding guide",
  [pages.get("/cladding/") ?? "", projectPlanningHtml].every((html) =>
    html.includes(
      'href="/resources/cladding-maintenance-coastal-adelaide/"',
    ),
  ),
);
check(
  "Hebel finishing guide publishes its visible date and evidence boundary",
  /<time date[Tt]ime="2026-08-13">Published (?:<!-- -->)?13 August 2026<\/time>/.test(
    renderingHebelHtml,
  ) &&
    /Illustrative wall-system image—not a record of a particular Elite Surface Group project/.test(
      renderingHebelHtml,
    ) &&
    /not an application method, an engineering specification, a warranty promise or a remote assessment/.test(
      renderingHebelHtml,
    ) &&
    /Prepared by (?:<!-- -->)?<a href="\/about\/">Elite Surface Group<\/a>/.test(
      renderingHebelHtml,
    ),
);
check(
  "Hebel finishing guide links authoritative sources",
  [
    "hebel.com.au/resources/technical-documents/",
    "hebel.com.au/wp-content/uploads/downloads/Houses-and-Low-Rise-Multi-Residential-External-Walls-PowerPanelXL-Design-and-Installation-Guide_HELIT016.pdf",
    "hebel.com.au/coatings/",
    "hebel.com.au/resources/warranty/",
    "hebel.com.au/resources/safety/",
    "dulux.com.au/specifier/products/acratex/",
    "plan.sa.gov.au/resources/building/building_code",
    "safework.sa.gov.au/industry/construction/silica",
  ].every((source) => renderingHebelHtml.includes(source)) &&
    !renderingHebelHtml.includes("2016/11/Installer-Checklist.pdf"),
);
check(
  "Hebel finishing guide links services, location, planning, resources and enquiry",
  [
    "/hebel/",
    "/render/",
    "/locations/adelaide/",
    "/project-planning/",
    "/resources/",
    "/contact-us/#contact",
  ].every((href) => renderingHebelHtml.includes(`href="${href}"`)),
);
check(
  "Hebel finishing guide avoids instructional HowTo schema",
  !/"@type":"HowTo"/.test(renderingHebelHtml),
);

const renderingHebelJsonLd = [
  ...renderingHebelHtml.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  ),
]
  .map(([, block]) => {
    try {
      return JSON.parse(block);
    } catch {
      return null;
    }
  })
  .find((data) => data?.["@type"] === "Article");
check(
  "Hebel finishing guide emits matching Article schema",
  renderingHebelJsonLd?.["@id"] ===
    "https://elitesurfacegroup.com.au/resources/rendering-hebel-panels-adelaide/#article" &&
    renderingHebelJsonLd?.url ===
      "https://elitesurfacegroup.com.au/resources/rendering-hebel-panels-adelaide/" &&
    renderingHebelJsonLd?.mainEntityOfPage?.["@id"] ===
      "https://elitesurfacegroup.com.au/resources/rendering-hebel-panels-adelaide/" &&
    renderingHebelJsonLd?.datePublished === "2026-08-13" &&
    renderingHebelJsonLd?.dateModified === "2026-08-13" &&
    renderingHebelJsonLd?.image?.contentUrl ===
      "https://elitesurfacegroup.com.au/images/v2/service-hebel-installation.webp" &&
    renderingHebelJsonLd?.image?.width === 1600 &&
    renderingHebelJsonLd?.image?.height === 1067 &&
    renderingHebelJsonLd?.about?.["@id"] ===
      "https://elitesurfacegroup.com.au/hebel/#service" &&
    renderingHebelJsonLd?.author?.["@id"] ===
      "https://elitesurfacegroup.com.au/#organization" &&
    renderingHebelJsonLd?.publisher?.["@id"] ===
      "https://elitesurfacegroup.com.au/#organization" &&
    renderingHebelJsonLd?.inLanguage === "en-AU",
);
check(
  "Hebel, render and planning pages link to the Hebel finishing guide",
  [
    pages.get("/hebel/") ?? "",
    pages.get("/render/") ?? "",
    projectPlanningHtml,
  ].every((html) =>
    html.includes('href="/resources/rendering-hebel-panels-adelaide/"'),
  ),
);
check(
  "Hebel boundary-wall guide publishes its date and evidence boundaries",
  /<time date[Tt]ime="2026-08-13">Published (?:<!-- -->)?13 August 2026<\/time>/.test(
    hebelBoundaryWallsHtml,
  ) &&
    /AI-generated planning illustration only—not a photograph of an Elite Surface Group project/.test(
      hebelBoundaryWallsHtml,
    ) &&
    /General planning information only/.test(hebelBoundaryWallsHtml) &&
    /does not select a wall system, locate a legal boundary, determine a setback or fire requirement/.test(
      hebelBoundaryWallsHtml,
    ) &&
    /Hebel® is a registered trademark of the Xella group/.test(
      hebelBoundaryWallsHtml,
    ) &&
    /not represented here as a CSR-authorised, accredited or endorsed installer/.test(
      hebelBoundaryWallsHtml,
    ),
);
check(
  "Hebel boundary-wall guide distinguishes systems without generic performance claims",
  [
    "External wall on or near an allotment boundary",
    "Zero-boundary or dual zero-boundary system",
    "Intertenancy, party or separating wall",
    "Fence or retaining wall",
    "Does this guide determine the required setback or fire rating?",
    "Does an uncoated boundary-side face prove the wall is unfinished or defective?",
  ].every((copy) => hebelBoundaryWallsHtml.includes(copy)) &&
    !/three-hour rated|NCC-approved|fireproof/i.test(
      hebelBoundaryWallsHtml,
    ) &&
    /not evidence that every variation[\s\S]{0,180}automatically compliant/.test(
      hebelBoundaryWallsHtml,
    ),
);
check(
  "Hebel boundary-wall guide links authoritative current sources",
  [
    "hebel.com.au/residential/boundary-walls/",
    "hebel.com.au/residential/party-walls/",
    "hebel.com.au/resources/technical-documents/",
    "PowerPanelXL-Design-and-Installation-Guide_HELIT016.pdf",
    "PowerPanel-Intertenancy-and-Dual-Zero-Boundary-Walls-Design-and-Installation-Guide_HELIT152.pdf",
    "CM40165-I03-R00_PowerPanel50mm-Dual-Zero-Residential.pdf",
    "CM40049-I05-R00.pdf",
    "plan.sa.gov.au/development_applications/getting_approval/how_applications_are_assessed/types_of_consent",
    "dhud.sa.gov.au/our-department/office-of-the-surveyor-general/surveying/cadastral-surveying",
    "legislation.sa.gov.au/__legislation/lz/c/a/planning%20development%20and%20infrastructure%20act%202016/current/2016.14.auth.pdf",
    "plan.sa.gov.au/resources/building/building_code",
    "ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/8-south-australia/92-fire-separation-external-walls",
    "safework.sa.gov.au/industry/construction/crystalline-silica-substances-regulations",
    "hebel.com.au/resources/warranty/",
  ].every((source) => hebelBoundaryWallsHtml.includes(source)) &&
    /NCC 2022[\s\S]{0,100}Amendment 2[\s\S]{0,180}30[\s\S]{0,30}April 2027/.test(
      hebelBoundaryWallsHtml,
    ) &&
    /expiry date of (?:<!-- -->)?1 March 2027/.test(hebelBoundaryWallsHtml),
);
check(
  "Hebel boundary-wall guide narrows legal and uncoated-wall claims to their primary sources",
  /planning consent by itself is not full development[\s\S]{0,80}does not by itself authorise construction/.test(
    hebelBoundaryWallsHtml,
  ) &&
    /PowerPanelXL external-wall CodeMark certificate[\s\S]{0,160}specified uncoated boundary-wall sections[\s\S]{0,120}defined infeasibility conditions/.test(
      hebelBoundaryWallsHtml,
    ),
);
check(
  "Hebel boundary-wall guide links services, planning, location, finishing and enquiry",
  [
    "/hebel/",
    "/walling/",
    "/resources/rendering-hebel-panels-adelaide/",
    "/locations/adelaide/",
    "/project-planning/",
    "/resources/",
    "/contact-us/#contact",
  ].every((href) => hebelBoundaryWallsHtml.includes(`href="${href}"`)),
);
check(
  "Hebel boundary-wall guide avoids instructional HowTo and FAQ schema",
  !/"@type":"HowTo"|"@type":"FAQPage"/.test(hebelBoundaryWallsHtml),
);

const hebelBoundaryWallsJsonLd = [
  ...hebelBoundaryWallsHtml.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  ),
]
  .map(([, block]) => {
    try {
      return JSON.parse(block);
    } catch {
      return null;
    }
  })
  .find((data) => data?.["@type"] === "Article");
check(
  "Hebel boundary-wall guide emits matching Article schema",
  hebelBoundaryWallsJsonLd?.["@id"] ===
    "https://elitesurfacegroup.com.au/resources/hebel-boundary-walls-adelaide/#article" &&
    hebelBoundaryWallsJsonLd?.url ===
      "https://elitesurfacegroup.com.au/resources/hebel-boundary-walls-adelaide/" &&
    hebelBoundaryWallsJsonLd?.mainEntityOfPage?.["@id"] ===
      "https://elitesurfacegroup.com.au/resources/hebel-boundary-walls-adelaide/" &&
    hebelBoundaryWallsJsonLd?.datePublished === "2026-08-13" &&
    hebelBoundaryWallsJsonLd?.dateModified === "2026-08-13" &&
    hebelBoundaryWallsJsonLd?.image?.contentUrl ===
      "https://elitesurfacegroup.com.au/images/v2/resource-hebel-boundary-walls-adelaide.webp" &&
    hebelBoundaryWallsJsonLd?.image?.width === 1536 &&
    hebelBoundaryWallsJsonLd?.image?.height === 1024 &&
    hebelBoundaryWallsJsonLd?.about?.["@id"] ===
      "https://elitesurfacegroup.com.au/hebel/#service" &&
    hebelBoundaryWallsJsonLd?.author?.["@id"] ===
      "https://elitesurfacegroup.com.au/#organization" &&
    hebelBoundaryWallsJsonLd?.publisher?.["@id"] ===
      "https://elitesurfacegroup.com.au/#organization" &&
    hebelBoundaryWallsJsonLd?.inLanguage === "en-AU",
);
check(
  "Hebel, walling, planning and finishing pages link to the boundary-wall guide",
  [
    pages.get("/hebel/") ?? "",
    pages.get("/walling/") ?? "",
    projectPlanningHtml,
    renderingHebelHtml,
  ].every((html) =>
    html.includes('href="/resources/hebel-boundary-walls-adelaide/"'),
  ),
);
check(
  "painted-brick guide publishes its date, author and evidence boundary",
  /<time date[Tt]ime="2026-08-13">Published (?:<!-- -->)?13 August 2026<\/time>/.test(
    renderingPaintedBrickHtml,
  ) &&
    /Prepared by (?:<!-- -->)?<a href="\/about\/">Elite Surface Group<\/a>/.test(
      renderingPaintedBrickHtml,
    ) &&
    /AI-generated illustration only—not a photograph of an Elite Surface Group project or an actual property/.test(
      renderingPaintedBrickHtml,
    ) &&
    /Surface appearance alone cannot confirm coating adhesion, masonry condition or a suitable render specification/.test(
      renderingPaintedBrickHtml,
    ) &&
    /not a DIY removal method, product specification, warranty promise or remote wall assessment/.test(
      renderingPaintedBrickHtml,
    ),
);
check(
  "painted-brick guide links its authoritative sources",
  [
    "dulux.com.au/specifier/products/acratex/substrate-guides/",
    "dulux.com.au/specifier/products/acratex-texture/acratex-super-trowel-2mm/",
    "rockcote.com.au/wp-content/uploads/2020/09/Keycote_TDS_September2020.pdf",
    "sahealth.sa.gov.au/wps/wcm/connect/",
    "safework.sa.gov.au/industry/construction/silica",
    "plan.sa.gov.au/",
    "environment.sa.gov.au/topics/heritage/",
  ].every((source) => renderingPaintedBrickHtml.includes(source)),
);
check(
  "painted-brick guide links service, cracking, location, planning, hub and enquiry",
  [
    "/render/",
    "/resources/render-cracking-adelaide/",
    "/locations/adelaide/",
    "/project-planning/",
    "/resources/",
    "/contact-us/#contact",
  ].every((href) => renderingPaintedBrickHtml.includes(`href="${href}"`)),
);
check(
  "painted-brick guide avoids instructional HowTo schema",
  !/"@type":"HowTo"/.test(renderingPaintedBrickHtml),
);
const renderingPaintedBrickJsonLd = (
  jsonLdByRoute.get("/resources/rendering-over-painted-brick-adelaide/") ?? []
).find((data) => data?.["@type"] === "Article");
check(
  "painted-brick guide emits matching Article schema",
  renderingPaintedBrickJsonLd?.["@id"] ===
    "https://elitesurfacegroup.com.au/resources/rendering-over-painted-brick-adelaide/#article" &&
    renderingPaintedBrickJsonLd?.url ===
      "https://elitesurfacegroup.com.au/resources/rendering-over-painted-brick-adelaide/" &&
    renderingPaintedBrickJsonLd?.mainEntityOfPage?.["@id"] ===
      "https://elitesurfacegroup.com.au/resources/rendering-over-painted-brick-adelaide/" &&
    renderingPaintedBrickJsonLd?.datePublished === "2026-08-13" &&
    renderingPaintedBrickJsonLd?.dateModified === "2026-08-13" &&
    renderingPaintedBrickJsonLd?.image?.contentUrl ===
      "https://elitesurfacegroup.com.au/images/v2/resource-rendering-painted-brick.webp" &&
    renderingPaintedBrickJsonLd?.image?.width === 1536 &&
    renderingPaintedBrickJsonLd?.image?.height === 1024 &&
    renderingPaintedBrickJsonLd?.about?.["@id"] ===
      "https://elitesurfacegroup.com.au/render/#service" &&
    renderingPaintedBrickJsonLd?.author?.["@id"] ===
      "https://elitesurfacegroup.com.au/#organization" &&
    renderingPaintedBrickJsonLd?.author?.url ===
      "https://elitesurfacegroup.com.au/about/" &&
    renderingPaintedBrickJsonLd?.publisher?.["@id"] ===
      "https://elitesurfacegroup.com.au/#organization" &&
    renderingPaintedBrickJsonLd?.inLanguage === "en-AU",
);
check(
  "render and planning pages link to the painted-brick guide",
  [pages.get("/render/") ?? "", projectPlanningHtml].every((html) =>
    html.includes(
      'href="/resources/rendering-over-painted-brick-adelaide/"',
    ),
  ),
);
check(
  "homepage and Adelaide page link every published guide contextually",
  [homeHtml, adelaideHtml].every((html) =>
    resourceSlugs.every((slug) =>
      html.includes(`href="/resources/${slug}/"`),
    ),
  ),
);
check(
  "homepage shows three featured project case studies",
  (homeHtml.match(/>View case study</g) ?? []).length === 3,
);
check(
  "footer has no placeholder Facebook/Instagram home links",
  !/href="https:\/\/www\.facebook\.com\/?"/.test(homeHtml) &&
    !/href="https:\/\/www\.instagram\.com\/?"/.test(homeHtml),
);
check(
  "pages do not publish self-served AggregateRating schema",
  ![...pages.values()].some((html) => /AggregateRating/.test(html)),
);
check(
  "unverified testimonials and ratings are not published",
  ![...pages.values()].some((html) =>
    /Rated 5 out of 5|Sarah Mitchell/.test(html),
  ),
);
check(
  "CTA band is not cladding-only",
  !/External Cladding Services in Adelaide/.test([...pages.values()].join("")),
);

const projectsHtml = pages.get("/projects/") ?? "";
check(
  "projects hub emits an ItemList of case studies",
  /\"@type\":\"ItemList\"/.test(projectsHtml) &&
    projectSlugs.every((slug) => projectsHtml.includes(`/projects/${slug}/`)),
);
check(
  "projects hub links to its service, location and planning context",
  [
    "/render/",
    "/cladding/",
    "/locations/adelaide/",
    "/project-planning/",
  ].every((href) => projectsHtml.includes(`href="${href}"`)),
);
check(
  "projects hub identifies service and photographed stage on every card",
  (projectsHtml.match(/class="gallery__meta"/g) ?? []).length ===
    projectSlugs.length &&
    /Finished exterior/.test(projectsHtml) &&
    /Finished detail/.test(projectsHtml) &&
    /Work in progress/.test(projectsHtml),
);
check(
  "projects hub explains the public-detail boundary",
  /Exact addresses, systems and dates are omitted/.test(projectsHtml),
);

check(
  "render page links to its two-storey case study",
  (pages.get("/render/") ?? "").includes(
    'href="/projects/two-storey-exterior-render/"',
  ),
);
check(
  "cladding page links to its feature-cladding case study",
  (pages.get("/cladding/") ?? "").includes(
    'href="/projects/dark-feature-cladding/"',
  ),
);

for (const slug of projectSlugs) {
  const projectHtml = pages.get(`/projects/${slug}/`) ?? "";
  const service = projectServices.get(slug);
  const projectServiceName = serviceNamesBySlug.get(service) ?? service;
  const projectOgImage = metaContent(projectHtml, "property", "og:image");
  check(
    `${slug} uses its dedicated 1200x630 social card`,
    projectOgImage ===
      `https://elitesurfacegroup.com.au/images/og/og-${slug}.jpg` &&
      metaContent(projectHtml, "property", "og:image:width") === "1200" &&
      metaContent(projectHtml, "property", "og:image:height") === "630",
    projectOgImage,
  );
  const preloadTags = (projectHtml.match(/<link[^>]*rel="preload"[^>]*>/g) ?? [])
    .map((tag) => decodeURIComponent(tag))
    .join("\n");
  check(
    `${slug} does not preload its below-fold proof image`,
    !preloadTags.includes(projectImages.get(slug) ?? "missing-project-image"),
  );
  if (service === "render") {
    check(
      `${slug} links to the render-cracking guide`,
      projectHtml.includes('href="/resources/render-cracking-adelaide/"'),
    );
  }
  if (service === "cladding") {
    check(
      `${slug} links to the coastal cladding guide`,
      projectHtml.includes(
        'href="/resources/cladding-maintenance-coastal-adelaide/"',
      ),
    );
  }
  check(
    `${slug} links to the Adelaide service area`,
    projectHtml.includes('href="/locations/adelaide/"'),
  );
  check(
    `${slug} publishes evidence-led case-study sections`,
    [
      "Project overview",
      "Project details",
      "What the photograph records",
      "Detail focus",
      "Visible result",
      "Visible features",
    ].every((heading) => projectHtml.includes(heading)) &&
      /<figcaption>[^<]+<\/figcaption>/.test(projectHtml),
  );
  check(
    `${slug} links to its service, planning guide, hub and enquiry`,
    Boolean(service) &&
      [
        `href="/${service}/"`,
        'href="/project-planning/"',
        'href="/projects/"',
        'href="/contact-us/#contact"',
      ].every((href) => projectHtml.includes(href)),
  );
  check(
    `${slug} promotes a service-specific quote beside its project facts`,
    typeof projectServiceName === "string" &&
      /<a(?=[^>]*class="btn project-facts__cta")(?=[^>]*href="\/contact-us\/#contact")[^>]*>/.test(
        projectHtml,
      ) &&
      enquiryContextSource.includes(
        `"/projects/${slug}/": "${projectServiceName}"`,
      ) &&
      /Request a \{service\.name\.toLowerCase\(\)\} quote/.test(
        projectPageSource,
      ),
  );

  const projectJsonLd = [
    ...projectHtml.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ]
    .map(([, block]) => {
      try {
        return JSON.parse(block);
      } catch {
        return null;
      }
    })
    .find((data) => data?.["@type"] === "CreativeWork");
  check(
    `${slug} emits matching CreativeWork project schema`,
    projectJsonLd?.url ===
      `https://elitesurfacegroup.com.au/projects/${slug}/` &&
      projectJsonLd?.mainEntityOfPage ===
        `https://elitesurfacegroup.com.au/projects/${slug}/` &&
      projectJsonLd?.image?.["@type"] === "ImageObject" &&
      typeof projectJsonLd?.image?.caption === "string" &&
      projectJsonLd.image.caption.length > 20 &&
      projectJsonLd?.image?.width === 1600 &&
      projectJsonLd?.image?.height === 1067 &&
      !projectJsonLd?.contentLocation &&
      projectJsonLd?.about?.["@id"] ===
        `https://elitesurfacegroup.com.au/${service}/#service`,
  );
}

check(
  "project case studies avoid unsupported material labels and inferred process headings",
  projectSlugs.every((slug) => {
    const html = pages.get(`/projects/${slug}/`) ?? "";
    return !/charcoal|limestone|aluminium-framed|The challenge|The scope/i.test(
      html,
    );
  }),
);
check(
  "service copy avoids unsupported image-locality and portfolio claims",
  !/on an Adelaide home|on a new Adelaide build/.test(servicesSource) &&
    /View render and cladding portfolio/.test(servicesSource) &&
    /Explore our cladding portfolio/.test(servicesSource),
);

/* ------------------------------------------------------------------ report */

if (failures.length) {
  console.error(
    `\nSmoke test FAILED — ${failures.length} of ${checks} checks:\n`,
  );
  for (const failure of failures) {
    console.error(`  ✗ ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Smoke test passed: ${checks} checks across ${ROUTES.length} routes, ` +
    `${imageFiles.length} images, security headers, redirects and the contact endpoint.`,
);
