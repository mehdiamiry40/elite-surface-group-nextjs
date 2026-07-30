import { business, testimonials, type Service } from "@/content/site";

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

const absolute = (path: string) => new URL(path, business.siteUrl).toString();

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
            item: absolute(crumb.href),
          }),
        ),
      }}
    />
  );
}

/**
 * The five testimonials are already on the page; this makes them legible to
 * search engines as reviews of the business.
 */
export function ReviewSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness",
        "@id": `${business.siteUrl}/#organization`,
        name: business.name,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
          reviewCount: testimonials.length,
        },
        review: testimonials.map((item) => ({
          "@type": "Review",
          author: { "@type": "Person", name: item.name },
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
            worstRating: "1",
          },
          reviewBody: item.quote,
        })),
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
        "@id": absolute(`/${service.slug}#service`),
        name: `${service.name} — ${business.name}`,
        serviceType: service.name,
        description: service.metaDescription,
        url: absolute(`/${service.slug}`),
        image: absolute(service.image),
        provider: { "@id": `${business.siteUrl}/#organization` },
        areaServed: { "@type": "AdministrativeArea", name: business.area },
      }}
    />
  );
}
