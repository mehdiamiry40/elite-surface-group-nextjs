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

const ROUTES = [
  "/",
  "/about/",
  "/services/",
  "/cladding/",
  "/render/",
  "/hebel/",
  "/walling/",
  "/projects/",
  "/contact-us/",
  "/privacy-policy/",
  "/terms-of-service/",
];

const pages = new Map();

for (const route of ROUTES) {
  const response = await get(route);
  const html = await response.text();
  pages.set(route, html);
  check(`GET ${route}`, response.status === 200, `status ${response.status}`);
}

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
  readFileSync(path.join(projectRoot, "src/content/legacy-assets.json"), "utf8"),
);
const legacySample = Object.keys(legacyAssets).slice(0, 8);
for (const legacy of legacySample) {
  const response = await get(legacy, { redirect: "manual" });
  check(
    `legacy asset ${legacy} redirects`,
    [301, 308].includes(response.status),
    `status ${response.status}`,
  );
}

/* --------------------------------------------------------------- 404 + SEO */

const notFound = await get("/this-route-does-not-exist/");
check("unknown route 404s", notFound.status === 404, `status ${notFound.status}`);
const notFoundHtml = await notFound.text();
check(
  "404 does not canonicalize to the homepage",
  !/<link rel="canonical"/.test(notFoundHtml),
);
check(
  "404 emits exactly one robots directive",
  (notFoundHtml.match(/<meta name="robots"/g) ?? []).length === 1,
);

for (const endpoint of ["/sitemap.xml", "/robots.txt"]) {
  const response = await get(endpoint);
  check(`GET ${endpoint}`, response.status === 200, `status ${response.status}`);
}

const sitemapXml = await (await get("/sitemap.xml")).text();
check(
  "sitemap excludes retired WordPress pages",
  !/sample-page|hello-world|uncategorized|author/.test(sitemapXml),
);
check(
  "sitemap lists every route with trailing slashes",
  ROUTES.every((route) =>
    sitemapXml.includes(
      route === "/"
        ? "<loc>https://elitesurfacegroup.com.au/</loc>"
        : `<loc>https://elitesurfacegroup.com.au${route}</loc>`,
    ),
  ),
);

/* ----------------------------------------------------------------- content */

for (const [route, html] of pages) {
  const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
  check(`${route} has exactly one <h1>`, h1Count === 1, `found ${h1Count}`);

  check(
    `${route} has a meta description`,
    /<meta name="description" content="[^"]{40,}"/.test(html),
  );

  check(
    `${route} has a canonical link`,
    /<link rel="canonical"/.test(html),
  );

  check(
    `${route} has an Open Graph image`,
    /property="og:image"/.test(html),
  );

  check(
    `${route} og:url matches the page`,
    html.includes(
      `property="og:url" content="https://elitesurfacegroup.com.au${
        route === "/" ? "/" : route
      }"`,
    ) ||
      html.includes(
        `property="og:url" content="http://localhost:3000${
          route === "/" ? "/" : route
        }"`,
      ),
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
    `${route} references no wp-content asset`,
    !/wp-content/.test(html),
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
const imageFiles = readdirSync(imageDir);
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
const allHtml = [...pages.values()].join("");
const orphans = imageFiles.filter(
  (file) =>
    !allHtml.includes(encodeURIComponent(`/images/${file}`)) &&
    !allHtml.includes(`/images/${file}`) &&
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
  [
    "rejects a malformed body",
    400,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: baseUrl.origin,
      },
      body: "null",
    },
  ],
];

for (const [name, expected, init] of contactChecks) {
  const response = await get("/api/contact/", init);
  check(`contact endpoint ${name}`, response.status === expected, `status ${response.status}`);
}

const invalidService = await get("/api/contact/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Origin: baseUrl.origin,
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

// The client posts to the trailing-slash form; it must not redirect.
const noRedirect = await get("/api/contact/", {
  method: "POST",
  headers: { "Content-Type": "application/json", Origin: baseUrl.origin },
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
  },
  body: new URLSearchParams({
    firstName: "Smoke",
    lastName: "Tester",
    email: "smoke@example.com",
    service: "",
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
    !/Smoke|smoke%40|message=/.test(progressiveLocation),
  `status ${progressiveForm.status}, location ${progressiveLocation}`,
);

/* ------------------------------------------- content / compliance guards */

const privacyHtml = pages.get("/privacy-policy/") ?? "";
const termsHtml = pages.get("/terms-of-service/") ?? "";
check(
  "privacy policy cites Australian Privacy Principles",
  /Australian Privacy Principles|Privacy Act 1988/.test(privacyHtml),
);
check(
  "legal pages do not cite UK Data Protection Act 1998",
  !/Data Protection Act 1998/.test(privacyHtml + termsHtml),
);
check(
  "legal pages do not claim Google Analytics",
  !/Google Analytics/.test(privacyHtml + termsHtml),
);
check(
  "terms are governed by South Australian / Australian law",
  /South Australia/.test(termsHtml) && /Australian Consumer Law/.test(termsHtml),
);

const homeHtml = pages.get("/") ?? "";
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
  ![...pages.values()].some((html) => /Rated 5 out of 5|Sarah Mitchell/.test(html)),
);
check(
  "CTA band is not cladding-only",
  !/External Cladding Services in Adelaide/.test(
    [...pages.values()].join(""),
  ),
);

/* ------------------------------------------------------------------ report */

if (failures.length) {
  console.error(`\nSmoke test FAILED — ${failures.length} of ${checks} checks:\n`);
  for (const failure of failures) {
    console.error(`  ✗ ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Smoke test passed: ${checks} checks across ${ROUTES.length} routes, ` +
    `${imageFiles.length} images, security headers, redirects and the contact endpoint.`,
);
