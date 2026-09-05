#!/usr/bin/env node

// Rebuild these checked-in 1200×630 JPEGs with `node scripts/generate-article-social-cards.mjs`.
// Uses the existing navy/orange share-card palette, logo and typography hierarchy.
// The geometric background is decorative; it does not depict a company project.
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const output = new URL("public/images/og/", root);
const cards = [
  {
    slug: "fibre-cement-vs-weatherboard-cladding-adelaide",
    category: "CLADDING SELECTION",
    lines: ["Fibre cement or", "timber weatherboard?"],
  },
  {
    slug: "load-bearing-wall-removal-adelaide",
    category: "RENOVATION WALLING",
    lines: ["Removing a load-bearing", "wall in Adelaide"],
  },
  {
    slug: "steel-frame-vs-timber-frame-walls-adelaide",
    category: "WALL FRAMING",
    lines: ["Steel frame or", "timber frame walls?"],
  },
  {
    slug: "acrylic-render-vs-cement-render-adelaide",
    category: "RENDER SELECTION",
    lines: ["Acrylic render", "vs cement render"],
  },
];

const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
const logo = await sharp(fileURLToPath(new URL("public/images/footer-logo.webp", root)))
  .resize({ width: 160 })
  .png()
  .toBuffer();
await mkdir(output, { recursive: true });

for (const card of cards) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="backdrop"><stop stop-color="#09243b"/><stop offset="1" stop-color="#0b2b52"/></linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#backdrop)"/>
    <g fill="none" stroke="#ffffff" stroke-opacity="0.06" stroke-width="2">
      <path d="M920 0V630M1000 0V630M1080 0V630M1160 0V630"/>
      <path d="M840 0V630M760 0V630M760 90H1200M760 210H1200M760 330H1200M760 450H1200M760 570H1200"/>
    </g>
    <rect x="72" y="211" width="56" height="5" rx="2" fill="#f47935"/>
    <text x="72" y="269" fill="#f47935" font-family="Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="1.5">${escapeXml(card.category)}</text>
    ${card.lines.map((line, index) => `<text x="72" y="${349 + index * 76}" fill="#ffffff" font-family="Arial, sans-serif" font-size="62" font-weight="700">${escapeXml(line)}</text>`).join("")}
    <text x="72" y="482" fill="#c8d4df" font-family="Arial, sans-serif" font-size="25">What to confirm for your Adelaide project</text>
    <text x="72" y="563" fill="#dce4e9" font-family="Arial, sans-serif" font-size="19" font-weight="700" letter-spacing="0.6">ELITESURFACEGROUP.COM.AU</text>
    <rect y="620" width="1200" height="10" fill="#f47935"/>
  </svg>`;
  const file = new URL(`og-${card.slug}.jpg`, output);
  await sharp(Buffer.from(svg))
    .composite([{ input: logo, top: 62, left: 72 }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(fileURLToPath(file));
  console.log(`Generated ${fileURLToPath(file)}`);
}
