#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import * as cheerio from "cheerio";

const SOURCE_ORIGIN = "https://elitesurfacegroup.com.au";
const FIRST_PARTY_DOMAIN = "elitesurfacegroup.com.au";
const FETCH_CONCURRENCY = 8;
const FETCH_TIMEOUT_MS = 45_000;
const FETCH_ATTEMPTS = 3;

// These are the published WordPress pages known at migration time. Keeping this
// list explicit makes snapshots reproducible and prevents a future draft or
// unreviewed page from silently becoming part of the Next.js site.
const ROUTE_PATHS = [
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
  "/sample-page/",
  "/2026/01/28/hello-world/",
  "/category/uncategorized/",
  "/author/admin/",
];

const SCRIPT_TYPES_THAT_ARE_DATA = new Set([
  "application/ld+json",
  "application/schema+json",
  "text/template",
  "text/x-template",
]);

const IMAGE_EXTENSIONS = new Set([
  ".avif",
  ".bmp",
  ".gif",
  ".heic",
  ".heif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".tif",
  ".tiff",
  ".webp",
]);

const FONT_EXTENSIONS = new Set([
  ".eot",
  ".otf",
  ".ttc",
  ".ttf",
  ".woff",
  ".woff2",
]);

const currentFile = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(currentFile), "..");
const mirrorRoot = path.join(projectRoot, "public", "mirror");
const contentFile = path.join(projectRoot, "src", "content", "site-pages.json");

const assetQueue = [];
const assetRecords = new Map();
const warnings = [];

function routeKey(routePath) {
  if (routePath === "/") {
    return "/";
  }

  return `/${routePath.split("/").filter(Boolean).join("/")}/`;
}

function routeSlug(routePath) {
  const segments = routePath.split("/").filter(Boolean);
  return segments.at(-1) ?? "home";
}

function canonicalAssetKey(url) {
  const normalizedHost = url.hostname.replace(/^www\./i, "").toLowerCase();
  return `${normalizedHost}${url.pathname}`;
}

function isFirstParty(url) {
  const hostname = url.hostname.replace(/^www\./i, "").toLowerCase();
  return (
    (url.protocol === "http:" || url.protocol === "https:") &&
    hostname === FIRST_PARTY_DOMAIN
  );
}

function isSkippableUrl(value) {
  const normalized = value.trim().toLowerCase();
  return (
    normalized === "" ||
    normalized.startsWith("#") ||
    normalized.startsWith("data:") ||
    normalized.startsWith("blob:") ||
    normalized.startsWith("about:") ||
    normalized.startsWith("javascript:") ||
    normalized.startsWith("mailto:") ||
    normalized.startsWith("tel:")
  );
}

function resolveUrl(value, baseUrl) {
  if (typeof value !== "string" || isSkippableUrl(value)) {
    return null;
  }

  try {
    return new URL(value.trim(), baseUrl);
  } catch {
    return null;
  }
}

function safeSegment(segment) {
  let decoded = segment;

  try {
    decoded = decodeURIComponent(segment);
  } catch {
    // Keep the encoded segment if it contains malformed percent escapes.
  }

  const sanitized = decoded
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/[^a-zA-Z0-9._@+-]/g, "_")
    .replace(/^\.+$/, "_");

  if (sanitized.length <= 180) {
    return sanitized || "_";
  }

  const digest = createHash("sha256").update(decoded).digest("hex").slice(0, 12);
  return `${sanitized.slice(0, 160)}-${digest}`;
}

function inferAssetKind(url, suggestedKind = "asset") {
  if (suggestedKind !== "asset") {
    return suggestedKind;
  }

  const extension = path.posix.extname(url.pathname).toLowerCase();

  if (extension === ".css") {
    return "css";
  }

  if (IMAGE_EXTENSIONS.has(extension)) {
    return "image";
  }

  if (FONT_EXTENSIONS.has(extension)) {
    return "font";
  }

  return "asset";
}

function localAssetUrl(url, kind) {
  const segments = url.pathname
    .split("/")
    .filter(Boolean)
    .map(safeSegment);

  if (segments.length === 0 || url.pathname.endsWith("/")) {
    segments.push("index");
  }

  const finalSegment = segments.at(-1);
  if (kind === "css" && path.posix.extname(finalSegment) === "") {
    segments[segments.length - 1] = `${finalSegment}.css`;
  }

  return `/mirror/${segments.join("/")}`;
}

function enqueueAsset(url, suggestedKind = "asset") {
  const cleanUrl = new URL(url);
  cleanUrl.hash = "";

  const key = canonicalAssetKey(cleanUrl);
  const existing = assetRecords.get(key);

  if (existing) {
    return existing.localUrl;
  }

  const kind = inferAssetKind(cleanUrl, suggestedKind);
  const localUrl = localAssetUrl(cleanUrl, kind);
  const record = { key, kind, localUrl, url: cleanUrl };

  assetRecords.set(key, record);
  assetQueue.push(record);
  return localUrl;
}

function localizeAssetReference(value, baseUrl, kind = "asset") {
  const resolved = resolveUrl(value, baseUrl);

  if (!resolved || !isFirstParty(resolved)) {
    return value;
  }

  const hash = resolved.hash;
  const localUrl = enqueueAsset(resolved, kind);
  return `${localUrl}${hash}`;
}

function localizeNavigationReference(value, baseUrl) {
  const resolved = resolveUrl(value, baseUrl);

  if (!resolved || !isFirstParty(resolved)) {
    return value;
  }

  const kind = inferAssetKind(resolved);
  if (kind !== "asset") {
    return localizeAssetReference(value, baseUrl, kind);
  }

  return `${resolved.pathname}${resolved.search}${resolved.hash}`;
}

function rewriteSrcset(value, baseUrl, kind = "image") {
  if (!value || value.trim().toLowerCase().startsWith("data:")) {
    return value;
  }

  return value
    .split(",")
    .map((candidate) => {
      const trimmed = candidate.trim();
      if (!trimmed) {
        return "";
      }

      const whitespaceIndex = trimmed.search(/\s/);
      const rawUrl =
        whitespaceIndex === -1 ? trimmed : trimmed.slice(0, whitespaceIndex);
      const descriptor =
        whitespaceIndex === -1 ? "" : trimmed.slice(whitespaceIndex).trim();
      const localized = localizeAssetReference(rawUrl, baseUrl, kind);
      return descriptor ? `${localized} ${descriptor}` : localized;
    })
    .filter(Boolean)
    .join(", ");
}

function rewriteCss(css, baseUrl) {
  let rewritten = css.replace(
    /@import(\s+)(["'])([^"']+)\2/gim,
    (match, spacing, quote, rawUrl) => {
      const localized = localizeAssetReference(rawUrl, baseUrl, "css");
      return `@import${spacing}${quote}${localized}${quote}`;
    },
  );

  rewritten = rewritten.replace(
    /url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*?))\s*\)/gim,
    (match, doubleQuoted, singleQuoted, unquoted) => {
      const rawUrl = (doubleQuoted ?? singleQuoted ?? unquoted ?? "").trim();

      if (!rawUrl || isSkippableUrl(rawUrl)) {
        return match;
      }

      const localized = localizeAssetReference(rawUrl, baseUrl, "asset");
      if (localized === rawUrl) {
        return match;
      }

      return `url("${localized.replaceAll('"', '\\"')}")`;
    },
  );

  return rewritten;
}

function requestUrl(url) {
  const requested = new URL(url);

  if (isFirstParty(requested)) {
    requested.protocol = "https:";
    requested.hostname = `www.${FIRST_PARTY_DOMAIN}`;
  }

  return requested;
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function fetchResponse(url, accept) {
  let lastError;
  const requested = requestUrl(url);

  for (let attempt = 1; attempt <= FETCH_ATTEMPTS; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
      const response = await fetch(requested, {
        headers: {
          Accept: accept,
          "Accept-Language": "en-AU,en;q=0.9",
          "Cache-Control": "no-cache",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) " +
            "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        },
        redirect: "follow",
        signal: controller.signal,
      });

      if (response.ok) {
        return response;
      }

      lastError = new Error(
        `${response.status} ${response.statusText} for ${requested}`,
      );

      if (
        response.status < 500 &&
        response.status !== 403 &&
        response.status !== 429
      ) {
        break;
      }
    } catch (error) {
      lastError = error;
    } finally {
      clearTimeout(timer);
    }

    if (attempt < FETCH_ATTEMPTS) {
      await delay(350 * 2 ** (attempt - 1));
    }
  }

  throw new Error(
    `Unable to fetch ${requested}: ${lastError?.message ?? "unknown error"}`,
    { cause: lastError },
  );
}

function isExecutableScript(element) {
  const type = (element.attribs?.type ?? "").trim().toLowerCase();

  if (type === "") {
    return true;
  }

  return !SCRIPT_TYPES_THAT_ARE_DATA.has(type);
}

function stripExecutableContent($) {
  $("body script").each((_, element) => {
    if (isExecutableScript(element)) {
      $(element).remove();
    }
  });

  $("body *").each((_, element) => {
    for (const attribute of Object.keys(element.attribs ?? {})) {
      if (/^on/i.test(attribute)) {
        $(element).removeAttr(attribute);
      }
    }

    for (const attribute of ["href", "src", "action", "formaction"]) {
      const value = $(element).attr(attribute);
      if (value?.trim().toLowerCase().startsWith("javascript:")) {
        $(element).removeAttr(attribute);
      }
    }
  });
}

function rewriteResourceAttribute($, selector, attribute, baseUrl, kind) {
  $(selector).each((_, element) => {
    const value = $(element).attr(attribute);
    if (!value) {
      return;
    }

    $(element).attr(
      attribute,
      localizeAssetReference(value, baseUrl, kind),
    );
  });
}

function rewriteSrcsetAttribute($, selector, attribute, baseUrl, kind) {
  $(selector).each((_, element) => {
    const value = $(element).attr(attribute);
    if (!value) {
      return;
    }

    $(element).attr(attribute, rewriteSrcset(value, baseUrl, kind));
  });
}

function materializeLazyImages($) {
  $(".e-con.e-parent").addClass("e-lazyloaded");

  $("[data-src], [data-lazy-src]").each((_, element) => {
    const source =
      $(element).attr("data-src") ?? $(element).attr("data-lazy-src");
    if (source) {
      $(element).attr("src", source);
    }
    $(element).removeClass("lazyload lazy-loading").addClass("lazyloaded");
  });

  $("[data-srcset], [data-lazy-srcset]").each((_, element) => {
    const sourceSet =
      $(element).attr("data-srcset") ??
      $(element).attr("data-lazy-srcset");
    if (sourceSet) {
      $(element).attr("srcset", sourceSet);
    }
  });

  $("[data-sizes], [data-lazy-sizes]").each((_, element) => {
    const sizes =
      $(element).attr("data-sizes") ?? $(element).attr("data-lazy-sizes");
    if (sizes) {
      $(element).attr("sizes", sizes);
    }
  });
}

function rewriteBodyUrls($, pageUrl) {
  const resourceAttributes = [
    ["img[src]", "src", "image"],
    ["img[data-src]", "data-src", "image"],
    ["img[data-lazy-src]", "data-lazy-src", "image"],
    ["[data-thumbnail]", "data-thumbnail", "image"],
    ["[data-thumb]", "data-thumb", "image"],
    ["[data-background-image]", "data-background-image", "image"],
    ["source[src]", "src", "image"],
    ["source[data-src]", "data-src", "image"],
    ["video[poster]", "poster", "image"],
    ["input[type='image'][src]", "src", "image"],
    ["svg image[href]", "href", "image"],
    ["svg image[xlink\\:href]", "xlink:href", "image"],
  ];

  for (const [selector, attribute, kind] of resourceAttributes) {
    rewriteResourceAttribute($, selector, attribute, pageUrl, kind);
  }

  const srcsetAttributes = [
    ["img[srcset]", "srcset"],
    ["img[data-srcset]", "data-srcset"],
    ["img[data-lazy-srcset]", "data-lazy-srcset"],
    ["source[srcset]", "srcset"],
    ["source[data-srcset]", "data-srcset"],
  ];

  for (const [selector, attribute] of srcsetAttributes) {
    rewriteSrcsetAttribute($, selector, attribute, pageUrl, "image");
  }

  materializeLazyImages($);

  $("body [style]").each((_, element) => {
    const value = $(element).attr("style");
    if (value) {
      $(element).attr("style", rewriteCss(value, pageUrl));
    }
  });

  $("body style").each((_, element) => {
    const css = $(element).html();
    if (css) {
      $(element).html(rewriteCss(css, pageUrl));
    }
  });

  $("body a[href], body area[href]").each((_, element) => {
    const value = $(element).attr("href");
    if (value) {
      $(element).attr(
        "href",
        localizeNavigationReference(value, pageUrl),
      );
    }
  });

  $("body form[action]").each((_, element) => {
    const value = $(element).attr("action");
    if (value) {
      $(element).attr(
        "action",
        localizeNavigationReference(value, pageUrl),
      );
    }
  });
}

function stylesheetReferences($, pageUrl) {
  const stylesheets = [];
  const seen = new Set();

  $("head link").each((_, element) => {
    const relTokens = ($(element).attr("rel") ?? "")
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    if (!relTokens.includes("stylesheet")) {
      return;
    }

    const href = $(element).attr("href") ?? $(element).attr("data-href");
    if (!href) {
      return;
    }

    const localized = localizeAssetReference(href, pageUrl, "css");
    if (!seen.has(localized)) {
      seen.add(localized);
      stylesheets.push(localized);
    }
  });

  return stylesheets;
}

function enqueueHeadAssets($, pageUrl) {
  $("head link[href], head link[data-href]").each((_, element) => {
    const relTokens = ($(element).attr("rel") ?? "")
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);
    const as = ($(element).attr("as") ?? "").toLowerCase();
    const isIcon = relTokens.some((token) =>
      ["icon", "apple-touch-icon", "mask-icon"].includes(token),
    );
    const isVisualPreload =
      relTokens.includes("preload") &&
      ["font", "image", "style"].includes(as);

    if (!isIcon && !isVisualPreload) {
      return;
    }

    const href = $(element).attr("href") ?? $(element).attr("data-href");
    const resolved = resolveUrl(href ?? "", pageUrl);
    if (!resolved || !isFirstParty(resolved)) {
      return;
    }

    const kind = as === "style" ? "css" : as === "font" ? "font" : "image";
    enqueueAsset(resolved, kind);
  });

  $(
    "head meta[property='og:image'][content], " +
      "head meta[property='og:image:url'][content], " +
      "head meta[name='twitter:image'][content]",
  ).each((_, element) => {
    const content = $(element).attr("content");
    const resolved = resolveUrl(content ?? "", pageUrl);
    if (resolved && isFirstParty(resolved)) {
      enqueueAsset(resolved, "image");
    }
  });
}

async function writeAtomically(filename, data) {
  await mkdir(path.dirname(filename), { recursive: true });

  const digest = createHash("sha256")
    .update(filename)
    .digest("hex")
    .slice(0, 12);
  const temporaryFile = `${filename}.snapshot-${process.pid}-${digest}`;

  await writeFile(temporaryFile, data);
  await rename(temporaryFile, filename);
}

async function captureInlineHeadCss($, pageUrl, slug) {
  const styleBlocks = [];

  $("head style").each((index, element) => {
    const css = $(element).html();
    if (!css?.trim()) {
      return;
    }

    const id = $(element).attr("id") ?? `block-${index + 1}`;
    styleBlocks.push(`/* Source head style: ${id} */\n${css}`);
  });

  if (styleBlocks.length === 0) {
    return null;
  }

  const localUrl = `/mirror/_inline/${safeSegment(slug)}.css`;
  const localFile = path.join(projectRoot, "public", localUrl);
  const css = rewriteCss(styleBlocks.join("\n\n"), pageUrl).replace(
    /[ \t]+$/gm,
    "",
  );

  await writeAtomically(localFile, `${css.trim()}\n`);
  return localUrl;
}

function metaContent($, selector) {
  return ($(selector).first().attr("content") ?? "").trim();
}

async function snapshotPage(routePath) {
  const key = routeKey(routePath);
  const slug = routeSlug(key);
  const pageUrl = new URL(key, SOURCE_ORIGIN);
  const response = await fetchResponse(
    pageUrl,
    "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
  );
  const html = await response.text();
  const $ = cheerio.load(html, {
    decodeEntities: false,
    scriptingEnabled: false,
  });

  const title = $("head title").first().text().trim();
  if (!title || /^403\s*-\s*forbidden$/i.test(title)) {
    throw new Error(`Source returned an invalid document for ${key}`);
  }

  const stylesheets = stylesheetReferences($, pageUrl);
  enqueueHeadAssets($, pageUrl);
  const inlineCss = await captureInlineHeadCss($, pageUrl, slug);
  if (inlineCss) {
    stylesheets.push(inlineCss);
  }

  stripExecutableContent($);
  rewriteBodyUrls($, pageUrl);

  const canonicalHref = $("head link[rel~='canonical']").first().attr("href");
  const canonicalUrl = resolveUrl(canonicalHref ?? "", pageUrl);
  const canonical = canonicalUrl
    ? canonicalUrl.toString()
    : new URL(key, `https://${FIRST_PARTY_DOMAIN}`).toString();
  const description =
    metaContent($, "head meta[name='description']") ||
    metaContent($, "head meta[property='og:description']");
  const schema = $("head script[type='application/ld+json']")
    .map((_, element) => ($(element).html() ?? "").trim())
    .get()
    .filter(Boolean);

  return {
    key,
    page: {
      slug,
      path: key,
      title,
      description,
      bodyClass: ($("body").attr("class") ?? "").trim(),
      html: $("body").html() ?? "",
      stylesheets,
      canonical,
      schema,
    },
  };
}

function responseKind(response, record) {
  const contentType = (response.headers.get("content-type") ?? "")
    .split(";")[0]
    .trim()
    .toLowerCase();

  if (record.kind === "css" || contentType === "text/css") {
    return "css";
  }

  return record.kind;
}

async function downloadAsset(record) {
  try {
    const response = await fetchResponse(
      record.url,
      "text/css,image/avif,image/webp,image/svg+xml,image/*,font/woff2,font/woff,*/*;q=0.8",
    );
    const buffer = Buffer.from(await response.arrayBuffer());
    const localFile = path.join(projectRoot, "public", record.localUrl);

    if (responseKind(response, record) === "css") {
      const cssBaseUrl = new URL(response.url || record.url);
      const css = rewriteCss(buffer.toString("utf8"), cssBaseUrl);
      await writeAtomically(localFile, css);
    } else {
      await writeAtomically(localFile, buffer);
    }
  } catch (error) {
    warnings.push(`${record.url}: ${error.message}`);
  }
}

async function downloadQueuedAssets() {
  let cursor = 0;

  while (cursor < assetQueue.length) {
    const batch = assetQueue.slice(cursor, cursor + FETCH_CONCURRENCY);
    cursor += batch.length;
    await Promise.all(batch.map(downloadAsset));
  }
}

async function main() {
  const routes = {};

  for (const routePath of ROUTE_PATHS) {
    const { key, page } = await snapshotPage(routePath);
    routes[key] = page;
    console.log(`Captured ${key}`);
  }

  await downloadQueuedAssets();

  const payload = {
    routes,
    generatedAt: new Date().toISOString(),
    sourceOrigin: SOURCE_ORIGIN,
  };

  await writeAtomically(contentFile, `${JSON.stringify(payload, null, 2)}\n`);

  console.log(
    `Wrote ${Object.keys(routes).length} routes and ${assetRecords.size} assets.`,
  );
  console.log(`Content: ${path.relative(projectRoot, contentFile)}`);
  console.log(`Assets: ${path.relative(projectRoot, mirrorRoot)}`);

  if (warnings.length > 0) {
    console.warn(`\n${warnings.length} asset download(s) failed:`);
    for (const warning of warnings) {
      console.warn(`- ${warning}`);
    }
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
