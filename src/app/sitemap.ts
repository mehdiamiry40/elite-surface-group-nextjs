import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { locationPages } from "@/content/locations";
import { projects } from "@/content/projects";
import { services } from "@/content/services";

/** Updated whenever this typed content release changes public pages. */
const CONTENT_LAST_MODIFIED = new Date("2026-07-31T12:00:00.000Z");

const PRIORITY: Record<string, number> = {
  "/": 1,
  "/services/": 0.9,
  "/contact-us/": 0.9,
  "/locations/": 0.8,
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
    ...projects.map((project) => `/projects/${project.slug}/`),
    "/locations/",
    ...locationPages.map((location) => `/locations/${location.slug}/`),
    "/contact-us/",
    "/privacy-policy/",
    "/terms-of-service/",
  ];

  return paths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: PRIORITY[path] ?? 0.8,
  }));
}
