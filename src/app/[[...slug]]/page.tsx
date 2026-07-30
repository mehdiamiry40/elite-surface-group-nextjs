import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SourceInteractions from "@/components/SourceInteractions";
import siteData from "@/content/site-pages.json";

type PageRecord = {
  slug: string;
  path: string;
  title: string;
  description: string;
  bodyClass: string;
  html: string;
  stylesheets: string[];
  canonical: string;
  schema?: string[];
};

type SiteData = {
  sourceOrigin?: string;
  generatedAt?: string;
  routes?: Record<string, PageRecord>;
};

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

const pages = (siteData as SiteData).routes ?? {};

function routeKey(slug?: string[]) {
  if (!slug?.length) {
    return "/";
  }
  return `/${slug.join("/")}/`;
}

export function generateStaticParams() {
  return Object.keys(pages)
    .filter((path) => path !== "/")
    .map((path) => ({
      slug: path.split("/").filter(Boolean),
    }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[routeKey(slug)];
  if (!page) {
    return {};
  }

  return {
    title: {
      absolute: page.title,
    },
    description: page.description,
    alternates: {
      canonical: page.canonical,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.canonical,
      siteName: "Elite Surface Group",
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-video-preview": -1,
      "max-image-preview": "large",
    },
  };
}

export default async function SourcePage({ params }: PageProps) {
  const { slug } = await params;
  const page = pages[routeKey(slug)];

  if (!page) {
    notFound();
  }

  return (
    <>
      {page.stylesheets.map((stylesheet) => (
        <link key={stylesheet} rel="stylesheet" href={stylesheet} />
      ))}
      {(page.schema ?? []).map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schema }}
        />
      ))}
      <div
        className="esg-source-page"
        dangerouslySetInnerHTML={{ __html: page.html }}
      />
      <SourceInteractions bodyClass={page.bodyClass} />
    </>
  );
}
