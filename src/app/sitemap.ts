import type { MetadataRoute } from "next";
import { business, services } from "@/content/site";

/**
 * Last-modified dates carried over from the WordPress sitemap so search
 * engines do not see every page suddenly change at once.
 */
const LAST_MODIFIED: Record<string, string> = {
  "/": "2026-04-16T09:48:19+00:00",
  "/about": "2026-02-27T21:49:53+00:00",
  "/terms-of-service": "2026-02-02T18:20:49+00:00",
  "/privacy-policy": "2026-02-02T16:08:40+00:00",
  "/projects": "2026-02-02T13:59:05+00:00",
  "/walling": "2026-02-02T13:54:33+00:00",
  "/hebel": "2026-02-02T13:52:56+00:00",
  "/render": "2026-02-02T13:51:08+00:00",
  "/cladding": "2026-02-02T13:36:26+00:00",
  "/contact-us": "2026-01-29T11:36:13+00:00",
  "/services": "2026-01-29T11:35:30+00:00",
};

const PRIORITY: Record<string, number> = {
  "/": 1,
  "/services": 0.9,
  "/contact-us": 0.9,
  "/privacy-policy": 0.3,
  "/terms-of-service": 0.3,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/services",
    ...services.map((service) => `/${service.slug}`),
    "/projects",
    "/contact-us",
    "/privacy-policy",
    "/terms-of-service",
  ];

  return paths.map((path) => ({
    url: new URL(path, business.siteUrl).toString(),
    lastModified: new Date(LAST_MODIFIED[path] ?? Date.now()),
    changeFrequency: "monthly",
    priority: PRIORITY[path] ?? 0.8,
  }));
}
