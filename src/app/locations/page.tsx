import type { Metadata } from "next";
import Link from "next/link";
import { Checklist, ComparisonTable } from "@/components/ContentBlocks";
import { ArrowRightIcon } from "@/components/icons";
import FeatureIcon from "@/components/FeatureIcon";
import PageBanner from "@/components/PageBanner";
import RichText from "@/components/RichText";
import { CtaBand, SectionHead, ServiceCards } from "@/components/sections";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { bannerImages } from "@/content/pages";
import {
  areaComparison,
  locationPages,
  locationsHub,
  siteChecklist,
  type LocationPage,
} from "@/content/locations";
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

// Metropolitan Adelaide is the primary area; the rest are regions within it.
const [primaryLocation, ...regionLocations] = locationPages;

function LocationCard({
  location,
  className,
}: {
  location: LocationPage;
  className: string;
}) {
  return (
    <li className={className}>
      <FeatureIcon name="pin" />
      <span>{location.hubLabel}</span>
      <h3>
        <Link href={`/locations/${location.slug}/`}>{location.hubTitle}</Link>
      </h3>
      <p className="locations-directory__summary">{location.hubSummary}</p>
      <Link className="text-link" href={`/locations/${location.slug}/`}>
        View {location.name} coverage
        <ArrowRightIcon />
      </Link>
    </li>
  );
}

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
              <LocationCard
                location={primaryLocation}
                className="project-link-card locations-directory__item"
              />
            </ul>

            <aside
              className="locations-overview__note"
              aria-labelledby="outside-adelaide-title"
            >
              <FeatureIcon name="search" />
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

      <section
        className="section section--tint"
        aria-labelledby="locations-regions"
      >
        <div className="shell">
          <SectionHead
            eyebrow="Regional guidance"
            title={locationsHub.regionsTitle}
            intro={locationsHub.regionsIntro}
            id="locations-regions"
          />
          <ul className="project-link-grid project-link-grid--3 locations-directory">
            {regionLocations.map((location) => (
              <LocationCard
                key={location.slug}
                location={location}
                className="project-link-card locations-directory__item"
              />
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="locations-compare">
        <div className="shell">
          <h2 id="locations-compare" className="section-title">
            {locationsHub.comparisonTitle}
          </h2>
          <div className="prose">
            <p>{locationsHub.comparisonIntro}</p>
          </div>
          <ComparisonTable {...areaComparison} />
          <div className="prose">
            <p>{locationsHub.comparisonNote}</p>
          </div>
        </div>
      </section>

      <section
        className="section section--tint"
        aria-labelledby="locations-site-checklist"
      >
        <div className="shell">
          <h2 id="locations-site-checklist" className="section-title">
            {locationsHub.siteChecklistTitle}
          </h2>
          <div className="prose">
            <p>{locationsHub.siteChecklistIntro}</p>
          </div>
          <Checklist items={siteChecklist} columns={2} />
          <div className="prose">
            <p>
              <RichText text={locationsHub.siteChecklistClosing} />
            </p>
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
