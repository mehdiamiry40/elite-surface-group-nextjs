import type { Metadata } from "next";
import { business } from "@/content/business";

/** Default social-share card. */
export const DEFAULT_OG_IMAGE = "/og.png";

export type SocialImage = {
  path: string;
  width: number;
  height: number;
  alt: string;
};

/**
 * A pre-rendered share card from `public/images/og/`.
 *
 * These are 1200×630 — the 1.91:1 ratio Facebook, LinkedIn, X and most chat
 * apps crop to. Passing a raw site photograph instead means the scraper crops a
 * 4:3 or 3:2 image to fit, usually cutting the subject in half, and the preview
 * carries no branding, headline or phone number.
 *
 * `name` matches the card filename: a route slug (`cladding`,
 * `two-storey-exterior-render`) or a page key (`about`, `contact`).
 */
export function ogCard(name: string, alt: string): SocialImage {
  return {
    path: `/images/og/og-${name}.jpg`,
    width: 1200,
    height: 630,
    alt,
  };
}

const defaultSocialImage: SocialImage = {
  path: DEFAULT_OG_IMAGE,
  width: 1200,
  height: 630,
  alt: `${business.name} — cladding, render, Hebel and walling in Adelaide`,
};

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
  image?: SocialImage;
  /** When false, omit robots index (used by the 404 page). */
  index?: boolean;
};

/** Title, description, canonical and matching Open Graph / Twitter tags. */
export function pageMetadata({
  title,
  description,
  path,
  image = defaultSocialImage,
  index = true,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image.path);

  const defaultTitle = `Cladding, Render and Hebel Adelaide | ${business.name}`;
  const resolvedTitle = title ? `${title} — ${business.name}` : defaultTitle;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url },
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : { index: false, follow: false },
    openGraph: {
      type: "website",
      siteName: business.name,
      locale: "en_AU",
      url,
      title: resolvedTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: image.width,
          height: image.height,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [imageUrl],
    },
  };
}
