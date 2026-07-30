#!/usr/bin/env node

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const baseUrl = new URL(process.env.SMOKE_BASE_URL ?? "http://localhost:3000");
const siteData = JSON.parse(
  await readFile(
    path.join(projectRoot, "src", "content", "site-pages.json"),
    "utf8",
  ),
);

async function expectStatus(url, expected, init) {
  const response = await fetch(new URL(url, baseUrl), init);
  if (response.status !== expected) {
    throw new Error(
      `${url} returned ${response.status}; expected ${expected}`,
    );
  }
  return response;
}

async function filesBelow(directory, prefix = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relative = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) {
      files.push(
        ...(await filesBelow(path.join(directory, entry.name), relative)),
      );
    } else if (entry.isFile()) {
      files.push(relative);
    }
  }

  return files;
}

for (const route of Object.keys(siteData.routes)) {
  await expectStatus(route, 200);
}
await expectStatus("/this-route-does-not-exist/", 404);
await expectStatus("/sitemap.xml", 200);
await expectStatus("/robots.txt", 200);

const legacySitemaps = [
  "/sitemap_index.xml",
  "/page-sitemap.xml",
  "/post-sitemap.xml",
  "/category-sitemap.xml",
  "/wp-sitemap.xml",
];
for (const sitemap of legacySitemaps) {
  const response = await fetch(new URL(sitemap, baseUrl), {
    redirect: "manual",
  });
  if (![307, 308].includes(response.status)) {
    throw new Error(
      `${sitemap} returned ${response.status}; expected a permanent redirect`,
    );
  }
}

const mirrorRoot = path.join(projectRoot, "public", "mirror");
const mirrorFiles = await filesBelow(mirrorRoot);
for (let index = 0; index < mirrorFiles.length; index += 12) {
  await Promise.all(
    mirrorFiles
      .slice(index, index + 12)
      .map((asset) => expectStatus(`/mirror/${asset}`, 200)),
  );
}

const legacyAsset = mirrorFiles.find((asset) =>
  asset.startsWith("wp-content/"),
);
if (!legacyAsset) {
  throw new Error("No WordPress asset was available for rewrite testing.");
}
await expectStatus(`/${legacyAsset}`, 200);

await expectStatus("/api/contact", 415, {
  method: "POST",
  headers: { "Content-Type": "text/plain" },
  body: "{}",
});
await expectStatus("/api/contact", 403, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Origin: "https://example.invalid",
    "Sec-Fetch-Site": "cross-site",
  },
  body: "{}",
});
await expectStatus("/api/contact", 400, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Origin: baseUrl.origin,
  },
  body: "null",
});

console.log(
  `Smoke test passed: ${Object.keys(siteData.routes).length} routes, ${
    mirrorFiles.length
  } assets, compatibility URLs, and guarded contact endpoint.`,
);
