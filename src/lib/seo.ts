import type { Metadata } from "next";
import { business } from "@/content/site";

/** Default social-share image (existing site banner, 1280×960 WebP). */
export const DEFAULT_OG_IMAGE = "/images/banner.webp";

/**
 * Absolute URL for a site path or public asset.
 *
 * Page paths get a trailing slash to match `trailingSlash: true`. Asset paths
 * that look like files (have an extension) do not.
 */
export function absoluteUrl(path: string): string {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  const leaf = normalised.split("/").pop() ?? "";
  const isFile = leaf.includes(".");
  const withSlash =
    !isFile && normalised !== "/" && !normalised.endsWith("/")
      ? `${normalised}/`
      : normalised;
  return new URL(withSlash, business.siteUrl).toString();
}

type PageMetadataInput = {
  title?: string;
  description: string;
  path: string;
  image?: string;
  /** When false, omit robots index (used by the 404 page). */
  index?: boolean;
};

/** Title, description, canonical and matching Open Graph / Twitter tags. */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  index = true,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: "website",
      siteName: business.name,
      locale: "en_AU",
      url,
      title: title
        ? `${title} — ${business.name}`
        : `${business.name} — Cladding, Render & Hebel Specialists in Adelaide`,
      description,
      images: [
        {
          url: imageUrl,
          width: 1280,
          height: 960,
          alt: `${business.name} — walling and surface finishes in Adelaide`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title
        ? `${title} — ${business.name}`
        : `${business.name} — Cladding, Render & Hebel Specialists in Adelaide`,
      description,
      images: [imageUrl],
    },
  };
}
