// Hosts this site actually loads.
// Production scripts are Next.js chunks, the inline bootstrap, Vercel Analytics
// (`/_vercel/insights/script.js`) and Speed Insights (`/_vercel/speed-insights/script.js`).
// Development, and Speed Insights when Vercel injects a DSN, also load
// https://va.vercel-scripts.com. That script posts to
// https://vitals.vercel-insights.com only when a DSN is set. Same-origin beacons
// stay covered by 'self'. The enquiry form posts to this origin (`/api/contact/`).
// vercel.live is not allowed. There is no Google tag on this site.

export const CSP_HASH_PLACEHOLDER = "__CSP_INLINE_HASHES__";

const SCRIPT_HOSTS = ["https://va.vercel-scripts.com"];

const CONNECT_HOSTS = ["https://vitals.vercel-insights.com"];

function join(directive: string, sources: string[]): string {
  return `${directive} ${sources.join(" ")}`;
}

/**
 * Production policy. `scriptHashes` are `'sha256-...'` sources.
 * An empty list leaves a placeholder that the build must replace inside the
 * output Vercel serves. Shipping the placeholder blocks every inline script.
 */
export function buildContentSecurityPolicy(scriptHashes: string[]): string {
  const hashes = scriptHashes.length > 0 ? [...scriptHashes].sort() : [CSP_HASH_PLACEHOLDER];
  return [
    join("default-src", ["'self'"]),
    join("script-src", ["'self'", ...hashes, ...SCRIPT_HOSTS]),
    join("script-src-attr", ["'none'"]),
    join("style-src", ["'self'", "'unsafe-inline'"]),
    join("img-src", ["'self'", "data:", "blob:"]),
    join("font-src", ["'self'"]),
    join("connect-src", ["'self'", ...CONNECT_HOSTS]),
    join("frame-src", ["'none'"]),
    join("worker-src", ["'self'"]),
    join("object-src", ["'none'"]),
    join("base-uri", ["'self'"]),
    join("form-action", ["'self'"]),
    join("frame-ancestors", ["'none'"]),
    join("manifest-src", ["'self'"]),
    "upgrade-insecure-requests",
  ].join("; ");
}

/** React's development overlay needs eval, and dev inline scripts change every compile. */
export function buildDevContentSecurityPolicy(): string {
  return [
    join("default-src", ["'self'"]),
    join("script-src", ["'self'", "'unsafe-inline'", "'unsafe-eval'", ...SCRIPT_HOSTS]),
    join("script-src-attr", ["'none'"]),
    join("style-src", ["'self'", "'unsafe-inline'"]),
    join("img-src", ["'self'", "data:", "blob:"]),
    join("font-src", ["'self'"]),
    join("connect-src", ["'self'", ...CONNECT_HOSTS, "ws:", "wss:"]),
    join("frame-src", ["'none'"]),
    join("worker-src", ["'self'"]),
    join("object-src", ["'none'"]),
    join("base-uri", ["'self'"]),
    join("form-action", ["'self'"]),
    join("frame-ancestors", ["'none'"]),
    join("manifest-src", ["'self'"]),
  ].join("; ");
}

export function directiveValue(policy: string, name: string): string {
  const match = policy
    .split(";")
    .map((part) => part.trim())
    .find((part) => part === name || part.startsWith(`${name} `));
  if (!match) throw new Error(`CSP is missing ${name}`);
  return match.slice(name.length).trim();
}

export function assertProductionScriptSrc(policy: string): void {
  const scriptSrc = directiveValue(policy, "script-src");
  if (scriptSrc.includes("'unsafe-inline'") || scriptSrc.includes("'unsafe-eval'")) {
    throw new Error(`production script-src must not allow unsafe-inline or unsafe-eval: ${scriptSrc}`);
  }
  if (scriptSrc.includes("'nonce-") || policy.includes("'nonce-") || policy.includes("strict-dynamic")) {
    throw new Error("production CSP must use hashes, not a nonce");
  }
  if (scriptSrc.includes(CSP_HASH_PLACEHOLDER) || policy.includes(CSP_HASH_PLACEHOLDER)) {
    throw new Error("production CSP still contains the inline-script hash placeholder");
  }
  if (!scriptSrc.includes("'sha256-")) {
    throw new Error("production script-src has no sha256 hashes");
  }
  if (policy.includes("vercel.live")) {
    throw new Error("production CSP must not allow vercel.live");
  }
}

export function missingScriptHashes(policy: string, required: string[]): string[] {
  const scriptSrc = directiveValue(policy, "script-src");
  return required.filter((hash) => !scriptSrc.includes(hash));
}
