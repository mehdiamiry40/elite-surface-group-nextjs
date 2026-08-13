import { absoluteUrl } from "@/lib/seo";
import { business } from "@/content/business";
import type { Project } from "@/content/projects";
import type { Service, ServiceFaq } from "@/content/services";

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
        areaServed: { "@type": "AdministrativeArea", name: business.area },
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
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `${absoluteUrl(`/projects/${project.slug}`)}#project`,
        name: project.title,
        description: `${project.summary} ${project.scope}`,
        image: absoluteUrl(project.image),
        url: absoluteUrl(`/projects/${project.slug}`),
        about: {
          "@type": "Service",
          name: project.service,
          provider: { "@id": `${business.siteUrl}/#organization` },
        },
        contentLocation: {
          "@type": "Place",
          name: project.suburb,
        },
        creator: { "@id": `${business.siteUrl}/#organization` },
        inLanguage: "en-AU",
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
        name: `${business.name} Adelaide render and cladding projects`,
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
