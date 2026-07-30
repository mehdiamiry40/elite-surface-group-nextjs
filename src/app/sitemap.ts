import type { MetadataRoute } from "next";
import siteData from "@/content/site-pages.json";

type SiteData = {
  routes?: Record<string, { canonical: string }>;
};

const SOURCE_LAST_MODIFIED: Record<string, string> = {
  "/": "2026-04-16T09:48:19+00:00",
  "/about/": "2026-02-27T21:49:53+00:00",
  "/terms-of-service/": "2026-02-02T18:20:49+00:00",
  "/privacy-policy/": "2026-02-02T16:08:40+00:00",
  "/projects/": "2026-02-02T13:59:05+00:00",
  "/walling/": "2026-02-02T13:54:33+00:00",
  "/hebel/": "2026-02-02T13:52:56+00:00",
  "/render/": "2026-02-02T13:51:08+00:00",
  "/cladding/": "2026-02-02T13:36:26+00:00",
  "/contact-us/": "2026-01-29T11:36:13+00:00",
  "/services/": "2026-01-29T11:35:30+00:00",
  "/sample-page/": "2026-01-28T18:25:25+00:00",
  "/2026/01/28/hello-world/": "2026-01-28T18:25:25+00:00",
  "/category/uncategorized/": "2026-01-28T18:25:25+00:00",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const data = siteData as SiteData;

  return Object.entries(data.routes ?? {})
    .filter(([path]) => path in SOURCE_LAST_MODIFIED)
    .map(([path, page]) => ({
      url: page.canonical,
      lastModified: new Date(SOURCE_LAST_MODIFIED[path]),
      changeFrequency: "monthly",
      priority: path === "/" ? 1 : 0.8,
    }));
}
