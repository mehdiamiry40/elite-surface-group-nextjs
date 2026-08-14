#!/usr/bin/env node

/**
 * Checks that every external source the site cites still resolves.
 *
 * The resource guides are built on primary manufacturer and South Australian
 * government documents, and that sourcing is the reason to trust them. Those
 * documents move: a manufacturer reorganises `/resources/`, a department
 * retires a page, a PDF gets a new filename. Nothing else in the suite would
 * notice, because a dead citation still renders perfectly.
 *
 *   npm run link-check
 *
 * Deliberately NOT part of `npm run smoke`. Smoke runs on every pull request
 * and must stay deterministic; this reaches 40-odd third-party hosts, so a
 * single unrelated outage would block unrelated work. It runs on a schedule
 * instead (see .github/workflows/link-check.yml) and on demand.
 *
 * Exits non-zero only for links that are definitively gone (404/410). Hosts
 * that block automated clients, rate-limit, or time out are reported and
 * skipped — they are not evidence of a broken citation, and failing on them
 * would train everyone to ignore this check.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const SCAN_DIRECTORIES = ["src", "public"];
const SCAN_EXTENSIONS = new Set([".ts", ".tsx", ".txt", ".md"]);

/**
 * Hosts and prefixes that are not citations.
 *
 * The site's own domain is covered by the smoke suite; `schema.org` is a JSON-LD
 * context rather than a link; `api.resend.com` is an API endpoint; the Maps and
 * Instagram links are functional destinations that block automated clients by
 * design; the rest are test fixtures.
 */
const NOT_A_CITATION = [
  "https://elitesurfacegroup.com.au",
  "https://schema.org",
  "https://api.resend.com",
  "https://www.google.com/maps",
  "https://www.instagram.com",
  "https://example.com",
  "https://evil.example",
  "http://localhost",
  "http://127.0.0.1",
];

const REQUEST_TIMEOUT_MS = 20_000;
const CONCURRENCY = 6;

/** A real browser UA: several government hosts reject unknown clients outright. */
const USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";

function walk(directory) {
  const entries = [];
  for (const entry of readdirSync(directory)) {
    const full = path.join(directory, entry);
    if (statSync(full).isDirectory()) {
      entries.push(...walk(full));
    } else if (SCAN_EXTENSIONS.has(path.extname(full))) {
      entries.push(full);
    }
  }
  return entries;
}

/** Every external URL the site publishes, mapped back to the files citing it. */
export function collectCitedUrls(root = projectRoot) {
  const found = new Map();

  for (const directory of SCAN_DIRECTORIES) {
    const absolute = path.join(root, directory);
    for (const file of walk(absolute)) {
      const contents = readFileSync(file, "utf8");
      const matches =
        contents.match(/https?:\/\/[a-zA-Z0-9._~:/?#@!$&*+,;=%-]+/g) ?? [];

      for (const match of matches) {
        // Prose and JSX leave sentence punctuation attached to the href.
        const url = match.replace(/[.,;:'"]+$/, "");
        if (NOT_A_CITATION.some((prefix) => url.startsWith(prefix))) {
          continue;
        }

        // Interpolated URLs (`https://${host}`) match as far as the `$`, which
        // is not a hostname anyone can resolve. A dot is the cheap test that
        // separates a real domain from a template fragment.
        let parsed;
        try {
          parsed = new URL(url);
        } catch {
          continue;
        }
        if (!parsed.hostname.includes(".")) {
          continue;
        }

        const sources = found.get(url) ?? new Set();
        sources.add(path.relative(root, file));
        found.set(url, sources);
      }
    }
  }

  return [...found]
    .map(([url, sources]) => ({ url, sources: [...sources].sort() }))
    .sort((a, b) => a.url.localeCompare(b.url));
}

async function request(url, method) {
  return fetch(url, {
    method,
    redirect: "follow",
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "text/html,application/xhtml+xml,application/pdf,*/*",
      "Accept-Language": "en-AU,en;q=0.9",
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
}

/**
 * Resolves one citation.
 *
 * `HEAD` first because most of these are PDFs and there is no reason to pull
 * megabytes to learn a status code — but plenty of hosts answer HEAD with 403
 * or 405 while serving GET fine, so that case retries rather than reports.
 */
export async function checkUrl(url) {
  let response;
  try {
    response = await request(url, "HEAD");
    if ([403, 405, 404, 501].includes(response.status)) {
      response = await request(url, "GET");
    }
  } catch {
    try {
      response = await request(url, "GET");
    } catch (error) {
      return {
        url,
        verdict: "unreachable",
        detail: error instanceof Error ? error.message : "request failed",
      };
    }
  }

  const { status } = response;
  const finalUrl = response.url || url;

  if (status === 404 || status === 410) {
    return { url, verdict: "dead", status, finalUrl };
  }
  if (status === 403 || status === 429 || status >= 500) {
    return { url, verdict: "blocked", status, finalUrl };
  }
  if (status >= 200 && status < 300) {
    return {
      url,
      verdict: finalUrl !== url ? "redirected" : "ok",
      status,
      finalUrl,
    };
  }
  return { url, verdict: "blocked", status, finalUrl };
}

async function checkAll(citations) {
  const results = [];
  let cursor = 0;

  async function worker() {
    while (cursor < citations.length) {
      const citation = citations[cursor];
      cursor += 1;
      const result = await checkUrl(citation.url);
      results.push({ ...result, sources: citation.sources });
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, citations.length) }, worker),
  );

  return results.sort((a, b) => a.url.localeCompare(b.url));
}

async function main() {
  const citations = collectCitedUrls();
  if (!citations.length) {
    console.error("Link check found no external citations to verify.");
    process.exit(1);
  }

  console.log(`Checking ${citations.length} cited sources…\n`);
  const results = await checkAll(citations);

  const byVerdict = (verdict) => results.filter((r) => r.verdict === verdict);
  const dead = byVerdict("dead");
  const redirected = byVerdict("redirected");
  const blocked = [...byVerdict("blocked"), ...byVerdict("unreachable")];
  const ok = byVerdict("ok");

  for (const result of redirected) {
    console.log(`→ moved   ${result.url}`);
    console.log(`          now ${result.finalUrl}`);
    console.log(`          cited in ${result.sources.join(", ")}`);
  }

  for (const result of blocked) {
    console.log(
      `? skipped ${result.url} (${result.status ?? result.detail ?? "no response"})`,
    );
  }

  for (const result of dead) {
    console.log(`✗ DEAD    ${result.url} (${result.status})`);
    console.log(`          cited in ${result.sources.join(", ")}`);
  }

  console.log(
    `\n${ok.length} reachable, ${redirected.length} redirected, ` +
      `${blocked.length} inconclusive, ${dead.length} dead ` +
      `— of ${results.length} cited sources.`,
  );

  if (dead.length) {
    console.error(
      "\nLink check FAILED: a cited source no longer exists. Replace the " +
        "citation, or the claim it supports.",
    );
    process.exit(1);
  }

  // Skipping is the safe answer for one hostile host; skipping *everything*
  // means the network, not the citations, is the thing being measured — and a
  // check that cannot reach anything must not read as a clean bill of health.
  if (!ok.length && !redirected.length) {
    console.error(
      "\nLink check INCONCLUSIVE: not one cited source was reachable. This " +
        "machine is behind a proxy or offline — the citations were never " +
        "actually tested. Re-run where outbound HTTPS is open.",
    );
    process.exit(1);
  }

  if (redirected.length) {
    console.log(
      "\nRedirects are not failures, but a permanent move is worth writing " +
        "into the citation while it is known.",
    );
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}
