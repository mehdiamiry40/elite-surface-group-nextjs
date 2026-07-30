import type { MetadataRoute } from "next";
import { business } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: new URL("/sitemap.xml", business.siteUrl).toString(),
    host: business.siteUrl,
  };
}
