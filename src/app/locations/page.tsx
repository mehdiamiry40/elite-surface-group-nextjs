import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { bannerImages } from "@/content/pages";
import { locationPages, locationsHub } from "@/content/locations";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: locationsHub.metaTitle,
  description: locationsHub.metaDescription,
  path: "/locations",
});

export default function LocationsPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ label: "Service areas", href: "/locations" }]} />
      <PageBanner
        title={locationsHub.bannerTitle}
        image={bannerImages["/locations"]}
        crumbs={[{ label: "Service areas" }]}
      />

      <section className="section" aria-labelledby="locations-intro">
        <div className="shell prose">
          <h2 id="locations-intro">Where we work</h2>
          <p>{locationsHub.intro}</p>
          <ul>
            {locationPages.map((location) => (
              <li key={location.slug}>
                <Link href={`/locations/${location.slug}/`}>
                  {location.name}
                </Link>
                {" — "}
                {location.metaDescription}
              </li>
            ))}
          </ul>
          <h3>Services available across our service area</h3>
          <ul>
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/${service.slug}/`}>{service.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
