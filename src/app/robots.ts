import type { MetadataRoute } from "next";
import { business } from "@/content/business";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
      // Allow major AI-search crawlers so the site can be cited in answers.
      // Training-only bots are not specially blocked here.
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: "/api/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: "/api/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: "/api/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: "/api/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: new URL("/sitemap.xml", business.siteUrl).toString(),
    host: business.siteUrl,
  };
}
