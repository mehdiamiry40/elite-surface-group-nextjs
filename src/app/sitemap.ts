import type { MetadataRoute } from "next";
import { publicRouteRecords } from "@/content/routes";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRouteRecords.map(({ path, lastModified }) => ({
    url: absoluteUrl(path),
    lastModified,
  }));
}
