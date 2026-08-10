import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { bannerImages } from "@/content/pages";
import { locationPages, locationsHub } from "@/content/locations";
import { services } from "@/content/services";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: locationsHub.metaTitle,
  description: locationsHub.metaDescription,
  path: "/locations",
  image: ogCard("locations", "Service areas across Adelaide and South Australia"),
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
          <h2 id="locations-intro">{locationsHub.introTitle}</h2>
          {locationsHub.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="locations-areas">
        <div className="shell">
          <div className="section-head">
            <h2 id="locations-areas">Areas we cover</h2>
          </div>
          <div className="grid grid--2">
            {locationPages.map((location) => (
              <div key={location.slug}>
                <h3>
                  <Link href={`/locations/${location.slug}/`}>
                    {location.name}
                  </Link>
                </h3>
                <p>{location.hubBlurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="locations-services">
        <div className="shell prose">
          <h2 id="locations-services">What we deliver in every area</h2>
          <ul>
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/${service.slug}/`}>{service.name}</Link>
                {" — "}
                {service.summary}
              </li>
            ))}
          </ul>
          <p>{locationsHub.closing}</p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
