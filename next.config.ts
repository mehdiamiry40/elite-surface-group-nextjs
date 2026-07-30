import type { NextConfig } from "next";
import legacyAssets from "./src/content/legacy-assets.json";

/**
 * Content-Security-Policy.
 *
 * The site loads nothing third-party: `next/font` self-hosts the webfonts,
 * icons are inline SVG, and every image is local. That lets the policy stay at
 * `'self'` for all fetch directives.
 *
 * `'unsafe-inline'` is still needed for `style-src` (Next.js injects inline
 * style attributes) and `script-src` (its inline bootstrap plus our JSON-LD
 * block). Tightening those to nonces means routing every response through
 * middleware — worth doing later, but it buys little while there is no
 * third-party script to constrain.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  // Next.js ships an inline bootstrap script and inline JSON-LD.
  "script-src 'self' 'unsafe-inline'" +
    (process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""),
  "connect-src 'self'",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

/** Pages the WordPress install shipped by default; none should stay indexed. */
const RETIRED_PATHS = [
  "/sample-page",
  "/2026/01/28/hello-world",
  "/category/uncategorized",
  "/author/admin",
];

const LEGACY_SITEMAPS = [
  "/sitemap_index.xml",
  "/page-sitemap.xml",
  "/post-sitemap.xml",
  "/category-sitemap.xml",
  "/wp-sitemap.xml",
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  reactStrictMode: true,
  turbopack: { root: process.cwd() },

  images: {
    formats: ["image/avif", "image/webp"],
    // deviceSizes/imageSizes are left at their defaults on purpose: the
    // optimiser only accepts widths from that allowlist and 400s on anything
    // else, so narrowing it to the widths the current layout happens to ask for
    // turns any future `sizes` change into a broken image. Variants are built
    // lazily per request, so a longer list costs nothing.
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Content-addressed by filename; safe to cache hard.
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      ...LEGACY_SITEMAPS.map((source) => ({
        source,
        destination: "/sitemap.xml",
        permanent: true,
      })),
      ...RETIRED_PATHS.map((source) => ({
        source,
        destination: "/",
        permanent: true,
      })),
      // Old WordPress upload URLs -> consolidated WebP assets.
      ...Object.entries(legacyAssets).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      { source: "/wp-login.php", destination: "/", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
