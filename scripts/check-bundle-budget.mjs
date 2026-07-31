#!/usr/bin/env node

/**
 * Fails the build if first-load JS grows past the budget.
 * Reads `.next/diagnostics/route-bundle-stats.json` from the latest build.
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const statsPath = path.join(
  projectRoot,
  ".next/diagnostics/route-bundle-stats.json",
);

/** Slightly above the post-split first-load sizes; ratchet down over time. */
const MAX_FIRST_LOAD_BYTES = 575_000;

let stats;
try {
  stats = JSON.parse(readFileSync(statsPath, "utf8"));
} catch (error) {
  console.error(
    `Bundle budget check could not read ${statsPath}:`,
    error instanceof Error ? error.message : error,
  );
  process.exit(1);
}

if (!Array.isArray(stats) || stats.length === 0) {
  console.error("Bundle budget check expected a non-empty route stats array.");
  process.exit(1);
}

const offenders = stats.filter(
  (row) =>
    typeof row?.firstLoadUncompressedJsBytes === "number" &&
    row.firstLoadUncompressedJsBytes > MAX_FIRST_LOAD_BYTES,
);

for (const row of stats) {
  const kb = (row.firstLoadUncompressedJsBytes / 1024).toFixed(1);
  console.log(`${row.route}: ${kb} KiB first-load JS`);
}

if (offenders.length) {
  console.error(
    `\nBundle budget exceeded (${MAX_FIRST_LOAD_BYTES} bytes uncompressed):`,
  );
  for (const row of offenders) {
    console.error(
      `  ${row.route}: ${row.firstLoadUncompressedJsBytes} bytes`,
    );
  }
  process.exit(1);
}

console.log(
  `\nBundle budget OK — all ${stats.length} routes under ${MAX_FIRST_LOAD_BYTES} bytes.`,
);
