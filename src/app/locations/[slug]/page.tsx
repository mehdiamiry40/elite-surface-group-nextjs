import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import ContactSection from "@/components/ContactSection";
import RichText from "@/components/RichText";
import {
  ContentSections,
  FaqList,
  ProjectLinks,
  SectionContents,
  TickList,
} from "@/components/sections";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/JsonLd";
import { bannerImages } from "@/content/pages";
import {
  getLocation,
  locationPages,
} from "@/content/locations";
import { projects } from "@/content/projects";
import { resourceGuides } from "@/content/resources";
import { services } from "@/content/services";
import { ogCard, pageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locationPages.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) {
    return {};
  }

  return pageMetadata({
    title: location.metaTitle,
    description: location.metaDescription,
    path: `/locations/${location.slug}`,
    // The Adelaide page reuses the default card, which already names the city;
    // region pages use the service-area card.
    image: ogCard(
      location.socialCard,
      `${location.bannerTitle} — Elite Surface Group`,
    ),
  });
}

/** Every published guide, grouped under the service it belongs to. */
const guidesByService = services
  .map((service) => ({
    service,
    guides: resourceGuides.filter(
      (guide) => guide.serviceSlug === service.slug,
    ),
  }))
  .filter((group) => group.guides.length > 0);

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const location = getLocation(slug);

  if (!location) {
    notFound();
  }

  const otherLocations = locationPages.filter(
    (candidate) => candidate.slug !== location.slug,
  );
  // The intro band is plain, so the first long-form section is tinted and the
  // bands alternate from there.
  const guidesTinted = location.sections.length % 2 === 0;

  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Service areas", href: "/locations" },
          { label: location.name, href: `/locations/${location.slug}` },
        ]}
      />
      <FAQPageSchema faqs={location.faqs} />
      <PageBanner
        title={location.bannerTitle}
        image={bannerImages[`/locations/${location.slug}`] ?? bannerImages["/locations"]}
        crumbs={[
          { label: "Service areas", href: "/locations" },
          { label: location.name },
        ]}
      />

      <section className="section" aria-labelledby="location-intro">
        <div className="shell prose">
          <h2 id="location-intro">{location.introHeading}</h2>
          {location.intro.map((paragraph) => (
            <p key={paragraph}>
              <RichText text={paragraph} />
            </p>
          ))}
          <p>{location.servicesLead}</p>
          <p>
            Planning a building facade? Our{" "}
            <Link href="/cladding/">
              facade and cladding installation in Adelaide
            </Link>{" "}
            page explains how we approach the system, the substrate and the
            junction details.
          </p>
          <ul className="plain-link-list service-chips">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/${service.slug}/`}>
                  {service.name} in {location.areaPhrase}
                </Link>
              </li>
            ))}
          </ul>
          <SectionContents
            sections={location.sections}
            extra={[
              { id: "location-guides", label: `${location.name} guides` },
              { id: "location-faqs", label: `${location.name} FAQs` },
            ]}
          />
        </div>
      </section>

      <ContentSections sections={location.sections} startTinted />

      <section
        className={guidesTinted ? "section section--tint" : "section"}
        aria-labelledby="location-guides"
      >
        <div className="shell prose">
          <h2 id="location-guides">{location.name} wall-system guidance</h2>
          {location.guides ? (
            <>
              <p>{location.guides.intro}</p>
              <nav
                className="guide-links"
                aria-label={`${location.name} wall-system guides`}
              >
                {location.guides.links.map((link) => (
                  <Link href={link.href} key={link.href} prefetch={false}>
                    {link.label}
                  </Link>
                ))}
                <Link className="guide-links__all" href="/resources/">
                  View all resources
                </Link>
              </nav>
            </>
          ) : (
            <>
              <p>
                Our practical guides explain what to record, which product or
                system documents to find and which questions to resolve before
                a quote or professional assessment.
              </p>
              {guidesByService.map(({ service, guides }) => (
                <div key={service.slug}>
                  <h3 id={`location-guides-${service.slug}`}>
                    {service.name} guides
                  </h3>
                  <nav
                    className="guide-links"
                    aria-labelledby={`location-guides-${service.slug}`}
                  >
                    {guides.map((guide) => (
                      <Link
                        href={`/resources/${guide.slug}/`}
                        key={guide.slug}
                        prefetch={false}
                      >
                        {guide.metaTitle}
                      </Link>
                    ))}
                  </nav>
                </div>
              ))}
              <p>
                <Link href="/resources/">View all resources</Link>
              </p>
            </>
          )}

          <h3>Other service areas</h3>
          <ul className="plain-link-list service-chips">
            {otherLocations.map((other) => (
              <li key={other.slug}>
                <Link href={`/locations/${other.slug}/`}>{other.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/locations/">All service areas</Link>
            </li>
          </ul>

          <h3>What you can expect</h3>
          <TickList items={location.proof} />
        </div>
      </section>

      <section
        className={guidesTinted ? "section" : "section section--tint"}
        aria-labelledby="location-faqs"
      >
        <div className="shell prose">
          <h2 id="location-faqs">{location.name} FAQs</h2>
          <FaqList faqs={location.faqs} />
        </div>
      </section>

      <ProjectLinks
        items={projects}
        title="Related project case studies"
        intro="Photographed render and cladding details from our portfolio. Individual project addresses are not published, so these are not presented as work in a particular suburb."
        id="location-projects"
      />

      <ContactSection intro={location.contactIntro} />
      <CtaBand />
    </>
  );
}
