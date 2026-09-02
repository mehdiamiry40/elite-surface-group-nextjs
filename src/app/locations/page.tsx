import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import PageBanner from "@/components/PageBanner";
import { CtaBand, SectionHead, ServiceCards } from "@/components/sections";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { bannerImages } from "@/content/pages";
import { locationPages, locationsHub } from "@/content/locations";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: locationsHub.metaTitle,
  description: locationsHub.metaDescription,
  path: "/locations",
  image: ogCard(
    "locations",
    "Adelaide service coverage, with wider South Australia assessed by project",
  ),
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

      <section
        className="section locations-overview"
        aria-labelledby="locations-intro"
      >
        <div className="shell">
          <SectionHead
            eyebrow="Service coverage"
            title={locationsHub.introTitle}
            intro={locationsHub.intro}
            id="locations-intro"
          />

          <div className="locations-overview__grid">
            <ul className="project-link-grid project-link-grid--1 locations-directory">
              {locationPages.map((location) => (
                <li
                  className="project-link-card locations-directory__item"
                  key={location.slug}
                >
                  <span>Primary service area</span>
                  <h3>
                    <Link href={`/locations/${location.slug}/`}>
                      {location.hubTitle}
                    </Link>
                  </h3>
                  <p className="locations-directory__summary">
                    {location.hubSummary}
                  </p>
                  <Link
                    className="text-link"
                    href={`/locations/${location.slug}/`}
                  >
                    View {location.name} coverage
                    <ArrowRightIcon />
                  </Link>
                </li>
              ))}
            </ul>

            <aside
              className="article-note locations-overview__note"
              aria-labelledby="outside-adelaide-title"
            >
              <h3 id="outside-adelaide-title">
                {locationsHub.outsideAreaTitle}
              </h3>
              <p>{locationsHub.outsideAreaBody}</p>
              <Link className="text-link" href="/contact-us/#contact">
                Confirm your project location
                <ArrowRightIcon />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <ServiceCards
        title="Services available across our confirmed coverage area"
      />

      <CtaBand />
    </>
  );
}
