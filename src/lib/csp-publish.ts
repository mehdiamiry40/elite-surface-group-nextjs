import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  CSP_HASH_PLACEHOLDER,
  assertProductionScriptSrc,
  buildContentSecurityPolicy,
  missingScriptHashes,
} from "./csp-policy.ts";
import { requiredScriptHashes, stripPreviewToolbar } from "./csp-inline.ts";

const SKIP_DIRS = new Set(["cache", "dev", "node_modules"]);

export type HashCollection = {
  files: { file: string; hashes: string[] }[];
  hashList: string[];
  policy: string;
};

async function walk(dir: string, visit: (file: string) => Promise<void>): Promise<void> {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return;
    throw err;
  }
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, visit);
    else if (entry.isFile()) await visit(full);
  }
}

export async function collectInlineHashes(distDir: string): Promise<HashCollection> {
  const serverDir = path.join(distDir, "server");
  const html: string[] = [];
  await walk(serverDir, async (file) => {
    if (file.endsWith(".html")) html.push(file);
  });
  html.sort();
  if (html.length === 0) {
    throw new Error(`no prerendered HTML under ${serverDir}`);
  }

  const required = new Set<string>();
  const files: { file: string; hashes: string[] }[] = [];
  for (const file of html) {
    const body = await readFile(file, "utf8");
    const hashes = requiredScriptHashes(body);
    if (hashes.length === 0) throw new Error(`${file} has no executable inline script to hash`);
    files.push({ file, hashes });
    for (const hash of hashes) required.add(hash);
  }

  const hashList = [...required].sort();
  const policy = buildContentSecurityPolicy(hashList);
  assertProductionScriptSrc(policy);
  if (policy.includes(CSP_HASH_PLACEHOLDER)) {
    throw new Error("built policy still contains the placeholder");
  }
  return { files, hashList, policy };
}

/** Replace the placeholder in place. Returns true when a string changed. */
export function replacePlaceholder(value: unknown, hashList: string): boolean {
  const replacement = hashList;
  let changed = false;
  const visit = (current: unknown): unknown => {
    if (typeof current === "string") {
      if (!current.includes(CSP_HASH_PLACEHOLDER)) return current;
      changed = true;
      return current.split(CSP_HASH_PLACEHOLDER).join(replacement);
    }
    if (Array.isArray(current)) {
      for (let index = 0; index < current.length; index += 1) current[index] = visit(current[index]);
      return current;
    }
    if (current && typeof current === "object") {
      const record = current as Record<string, unknown>;
      for (const key of Object.keys(record)) record[key] = visit(record[key]);
    }
    return current;
  };
  visit(value);
  return changed;
}

export function policiesIn(value: unknown, found: string[] = []): string[] {
  if (typeof value === "string") {
    if (value.includes("script-src ") && value.includes("default-src ")) found.push(value);
    return found;
  }
  if (Array.isArray(value)) {
    for (const item of value) policiesIn(item, found);
    return found;
  }
  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (key.toLowerCase() === "content-security-policy" && typeof item === "string") found.push(item);
      else policiesIn(item, found);
    }
  }
  return found;
}

function isSitePolicy(value: string): boolean {
  return value.includes("default-src 'self'") && value.includes("script-src ") && value.includes("frame-ancestors ");
}

/** Overwrite every copy of this site's CSP. Returns how many strings changed. */
export function rewriteSitePolicies(value: unknown, policy: string): number {
  let rewritten = 0;
  const visit = (current: unknown): unknown => {
    if (typeof current === "string") {
      if (!isSitePolicy(current) || current === policy) return current;
      rewritten += 1;
      return policy;
    }
    if (Array.isArray(current)) {
      for (let index = 0; index < current.length; index += 1) current[index] = visit(current[index]);
      return current;
    }
    if (current && typeof current === "object") {
      const record = current as Record<string, unknown>;
      for (const key of Object.keys(record)) record[key] = visit(record[key]);
    }
    return current;
  };
  visit(value);
  return rewritten;
}

export function deploymentConfigPaths(projectRoot: string, distDir: string): string[] {
  return [
    path.join(distDir, "output", "config.json"),
    path.join(projectRoot, ".vercel", "output", "config.json"),
    "/vercel/output/config.json",
  ];
}

async function patchFiles(distDir: string, hashList: string): Promise<string[]> {
  const placeholder = Buffer.from(CSP_HASH_PLACEHOLDER);
  const patched: string[] = [];
  await walk(distDir, async (file) => {
    const body = await readFile(file);
    if (!body.includes(placeholder)) return;
    const next = Buffer.from(body.toString("utf8").split(CSP_HASH_PLACEHOLDER).join(hashList));
    if (next.includes(placeholder)) throw new Error(`placeholder survived replacement in ${file}`);
    await writeFile(file, next);
    patched.push(file);
  });
  return patched;
}

/**
 * Remove the unconditional preview injector. Cookie-gated toolbar code is left in place.
 * Preview builds turn immutable assets off, so these files are deployment-scoped and the
 * stripped bytes are what gets uploaded. Renaming them would change the content hash the
 * deployer checks.
 */
export async function stripUnconditionalPreviewToolbar(root: string): Promise<string[]> {
  const strippedFiles: string[] = [];
  await walk(root, async (file) => {
    if (!file.endsWith(".js") && !file.endsWith(".html")) return;
    const body = await readFile(file, "utf8");
    if (!body.includes("https://vercel.live/_next-live/feedback/feedback.js")) return;
    const stripped = stripPreviewToolbar(body);
    if (stripped === body) return;
    await writeFile(file, stripped);
    strippedFiles.push(file);
  });
  return strippedFiles;
}

export async function publishInlineScriptHashes(options: {
  distDir: string;
  routing?: unknown;
}): Promise<HashCollection & { patchedFiles: string[] }> {
  const collected = await collectInlineHashes(options.distDir);
  const hashList = collected.hashList.join(" ");

  if (options.routing) {
    const before = JSON.stringify(options.routing);
    if (!before.includes("script-src ")) throw new Error("Deployment routing has no script-src policy to publish");
    if (before.includes(CSP_HASH_PLACEHOLDER)) replacePlaceholder(options.routing, hashList);
    if (JSON.stringify(options.routing).includes(CSP_HASH_PLACEHOLDER)) {
      throw new Error("CSP placeholder is still in the deployment routing");
    }
  }

  const patchedFiles = await patchFiles(options.distDir, hashList);
  const manifestPath = path.join(options.distDir, "routes-manifest.json");
  const manifest = await readFile(manifestPath, "utf8");
  if (manifest.includes(CSP_HASH_PLACEHOLDER)) {
    throw new Error(`CSP placeholder is still in ${manifestPath}`);
  }
  const policies = policiesIn(JSON.parse(manifest));
  if (policies.length === 0) throw new Error(`${manifestPath} does not contain a Content-Security-Policy`);
  for (const policy of policies) assertHashes(policy, collected.hashList, manifestPath);

  if (options.routing) {
    const policiesInRouting = policiesIn(options.routing);
    if (policiesInRouting.length === 0) throw new Error("Deployment routing lost its script-src policy");
    for (const policy of policiesInRouting) assertHashes(policy, collected.hashList, "deployment routing");
  }

  return { ...collected, patchedFiles };
}

function assertHashes(policy: string, hashList: string[], label: string): void {
  try {
    assertProductionScriptSrc(policy);
  } catch (err) {
    throw new Error(`${label}: ${err instanceof Error ? err.message : String(err)}`);
  }
  const missing = missingScriptHashes(policy, hashList);
  if (missing.length) throw new Error(`${label} is missing ${missing.length} inline-script hash(es), first ${missing[0]}`);
}

/**
 * Vercel serialises the routing object into `.next/output/config.json` during
 * onBuildComplete. Rewrite that policy from the routes manifest and refuse to
 * finish when the placeholder or a missing hash would be what production serves.
 */
export async function assertDeploymentOutput(options: {
  projectRoot: string;
  distDir: string;
  routing?: unknown;
  requireDeploymentOutput: boolean;
}): Promise<{ configs: string[] }> {
  const collected = await collectInlineHashes(options.distDir);
  const manifestPath = path.join(options.distDir, "routes-manifest.json");
  const manifestText = await readFile(manifestPath, "utf8");
  if (manifestText.includes(CSP_HASH_PLACEHOLDER)) {
    throw new Error(`CSP placeholder is still in ${manifestPath}`);
  }
  const manifestPolicies = policiesIn(JSON.parse(manifestText)).filter((policy) => policy.includes("frame-ancestors "));
  if (manifestPolicies.length === 0) throw new Error(`Content-Security-Policy is missing from ${manifestPath}`);
  const policy = manifestPolicies[0]!;
  for (const published of manifestPolicies) assertHashes(published, collected.hashList, manifestPath);

  if (options.routing) {
    if (JSON.stringify(options.routing).includes(CSP_HASH_PLACEHOLDER)) {
      throw new Error("CSP placeholder is still in the deployment routing");
    }
    for (const published of policiesIn(options.routing)) assertHashes(published, collected.hashList, "deployment routing");
  }

  const configs: string[] = [];
  for (const file of deploymentConfigPaths(options.projectRoot, options.distDir)) {
    try {
      await readFile(file, "utf8");
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") continue;
      throw err;
    }
    configs.push(file);
  }

  if (options.requireDeploymentOutput && configs.length === 0) {
    throw new Error(
      `Vercel adapter did not write a deployment config. Looked for ${deploymentConfigPaths(options.projectRoot, options.distDir).join(", ")}.`,
    );
  }

  for (const file of configs) {
    const data = JSON.parse(await readFile(file, "utf8")) as unknown;
    rewriteSitePolicies(data, policy);
    const serialised = JSON.stringify(data);
    if (serialised.includes(CSP_HASH_PLACEHOLDER)) {
      throw new Error(`CSP placeholder is still in ${file}`);
    }
    await writeFile(file, serialised);
    const policies = policiesIn(JSON.parse(serialised)).filter((published) => published.includes("frame-ancestors "));
    if (policies.length === 0) throw new Error(`Content-Security-Policy is missing from ${file}`);
    for (const published of policies) assertHashes(published, collected.hashList, file);
  }

  for (const { file, hashes } of collected.files) {
    for (const published of manifestPolicies) {
      const missing = missingScriptHashes(published, hashes);
      if (missing.length) throw new Error(`${file} hash ${missing[0]} is not in ${manifestPath}`);
    }
  }

  return { configs };
}
