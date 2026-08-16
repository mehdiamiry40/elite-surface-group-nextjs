#!/usr/bin/env node

/**
 * Builds tiny blur placeholders for LCP / full-bleed photographs.
 *
 * Run after changing those source images:
 *   node scripts/generate-lcp-blur.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const contentDir = path.join(projectRoot, "src/content");
const contentSources = [
  "home.ts",
  "pages.ts",
  "services.ts",
  "projects.ts",
  "resources.ts",
].map((file) => readFileSync(path.join(contentDir, file), "utf8"));

const paths = [
  ...new Set(
    contentSources.flatMap((source) =>
      [...source.matchAll(/"(\/images\/v2\/[^"]+\.webp)"/g)].map(
        (match) => match[1],
      ),
    ),
  ),
].sort();

if (paths.length === 0) {
  console.error("generate-lcp-blur: no /images/v2/*.webp paths found in content.");
  process.exit(1);
}

const blurs = {};
for (const publicPath of paths) {
  const file = path.join(projectRoot, "public", publicPath);
  const buffer = await sharp(file)
    .rotate()
    .resize(16, 16, { fit: "inside" })
    .webp({ quality: 25 })
    .toBuffer();
  blurs[publicPath] = `data:image/webp;base64,${buffer.toString("base64")}`;
}

const outFile = path.join(projectRoot, "src/lib/lcp-blur.json");
writeFileSync(outFile, `${JSON.stringify(blurs, null, 2)}\n`);
console.log(`Wrote ${paths.length} LCP placeholders to ${path.relative(projectRoot, outFile)}`);
