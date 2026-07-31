import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { services } from "@/content/site";

/** Updated whenever this typed content release changes public pages. */
const CONTENT_LAST_MODIFIED = new Date("2026-07-31T00:00:00.000Z");

const PRIORITY: Record<string, number> = {
  "/": 1,
  "/services/": 0.9,
  "/contact-us/": 0.9,
  "/privacy-policy/": 0.3,
  "/terms-of-service/": 0.3,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about/",
    "/services/",
    ...services.map((service) => `/${service.slug}/`),
    "/projects/",
    "/contact-us/",
    "/privacy-policy/",
    "/terms-of-service/",
  ];

  return paths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: PRIORITY[path] ?? 0.8,
  }));
}
