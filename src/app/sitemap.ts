import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { publicPaths } from "@/content/routes";

/** Updated whenever this typed content release changes public pages. */
const CONTENT_LAST_MODIFIED = new Date("2026-08-13T00:00:00.000Z");

const PRIORITY: Record<string, number> = {
  "/": 1,
  "/services/": 0.9,
  "/contact-us/": 0.9,
  "/locations/adelaide/": 0.9,
  "/about/": 0.8,
  "/projects/": 0.8,
  "/locations/": 0.8,
  "/project-planning/": 0.8,
  "/resources/": 0.8,
  "/resources/render-cracking-adelaide/": 0.85,
  "/privacy-policy/": 0.3,
  "/terms-of-service/": 0.3,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: PRIORITY[path] ?? 0.8,
  }));
}
