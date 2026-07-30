import { absoluteUrl } from "@/lib/seo";
import { business, type Service } from "@/content/site";

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
