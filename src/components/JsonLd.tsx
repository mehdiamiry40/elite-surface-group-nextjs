import { absoluteUrl } from "@/lib/seo";
import { business } from "@/content/business";
import type { Project } from "@/content/projects";
import type { ResourceGuide } from "@/content/resources";
import { services, type Service, type ServiceFaq } from "@/content/services";

/**
 * Structured data helpers.
 *
 * Everything here is developer-authored and serialised from typed objects — no
 * user input reaches these scripts.
 */

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Marks up the breadcrumb trail that `PageBanner` already renders visually.
 * Without this the trail is invisible to search engines.
 */
export function BreadcrumbSchema({
  trail,
}: {
  trail: readonly { label: string; href: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{ label: "Home", href: "/" }, ...trail].map(
          (crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.label,
            item: absoluteUrl(crumb.href),
          }),
        ),
      }}
    />
  );
}

/** Describes one service as an offering of the business. */
export function ServiceSchema({ service }: { service: Service }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${absoluteUrl(`/${service.slug}`)}#service`,
        name: `${service.name} — ${business.name}`,
        serviceType: service.name,
        description: service.metaDescription,
        url: absoluteUrl(`/${service.slug}`),
        image: absoluteUrl(service.image),
        provider: { "@id": `${business.siteUrl}/#organization` },
        areaServed: business.serviceAreas,
      }}
    />
  );
}

/** FAQPage schema — only emit when the same Q&A is visible on the page. */
export function FAQPageSchema({ faqs }: { faqs: readonly ServiceFaq[] }) {
  if (!faqs.length) {
    return null;
  }

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  );
}

/** Case-study CreativeWork for project detail pages. */
export function ProjectSchema({ project }: { project: Project }) {
  const service = services.find((item) => item.slug === project.service);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `${absoluteUrl(`/projects/${project.slug}`)}#project`,
        name: project.title,
        description: project.metaDescription,
        mainEntityOfPage: absoluteUrl(`/projects/${project.slug}`),
        image: {
          "@type": "ImageObject",
          contentUrl: absoluteUrl(project.image),
          caption: project.imageCaption,
          width: project.width,
          height: project.height,
        },
        url: absoluteUrl(`/projects/${project.slug}`),
        about: {
          "@type": "Service",
          "@id": `${absoluteUrl(`/${project.service}`)}#service`,
          name: service?.name ?? project.service,
          provider: { "@id": `${business.siteUrl}/#organization` },
        },
        creator: { "@id": `${business.siteUrl}/#organization` },
        inLanguage: "en-AU",
      }}
    />
  );
}

/** Visible editorial guide authored and published by the business. */
export function ArticleSchema({ guide }: { guide: ResourceGuide }) {
  const url = absoluteUrl(`/resources/${guide.slug}`);
  const service = services.find((item) => item.slug === guide.serviceSlug);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${url}#article`,
        url,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        headline: guide.title,
        description: guide.metaDescription,
        image: {
          "@type": "ImageObject",
          contentUrl: absoluteUrl(guide.image),
          caption: guide.imageCaption,
          width: guide.imageWidth,
          height: guide.imageHeight,
        },
        datePublished: guide.published,
        dateModified: guide.modified,
        author: {
          "@type": "Organization",
          "@id": `${business.siteUrl}/#organization`,
          name: business.name,
          url: absoluteUrl("/about"),
        },
        publisher: {
          "@type": "Organization",
          "@id": `${business.siteUrl}/#organization`,
          name: business.name,
          url: business.siteUrl,
        },
        about: {
          "@type": "Service",
          "@id": `${absoluteUrl(`/${guide.serviceSlug}`)}#service`,
          name: service?.name ?? guide.serviceSlug,
        },
        inLanguage: "en-AU",
      }}
    />
  );
}


/** Chronological list of editorial guides shown on the blog index. */
export function BlogListSchema({
  guides,
}: {
  guides: readonly ResourceGuide[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${business.name} cladding, render and walling articles`,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: guides.length,
        itemListElement: guides.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: guide.title,
          url: absoluteUrl(`/resources/${guide.slug}`),
        })),
      }}
    />
  );
}

/** ItemList of case studies for the projects hub. */
export function ProjectListSchema({
  projects,
}: {
  projects: readonly Project[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${business.name} render and cladding case studies`,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.title,
          url: absoluteUrl(`/projects/${project.slug}`),
        })),
      }}
    />
  );
}

/** ItemList of services for the services hub. */
export function ServiceListSchema({
  services,
}: {
  services: readonly Service[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${business.name} walling services`,
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.name,
          url: absoluteUrl(`/${service.slug}`),
        })),
      }}
    />
  );
}
