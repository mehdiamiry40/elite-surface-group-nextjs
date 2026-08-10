import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import ContactSection from "@/components/ContactSection";
import { TickList } from "@/components/sections";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/JsonLd";
import { bannerImages } from "@/content/pages";
import {
  getLocation,
  locationPages,
} from "@/content/locations";
import { projects } from "@/content/projects";
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
    // Area pages reuse the default card; it already names the city.
    image: ogCard("default", `${location.bannerTitle} — Elite Surface Group`),
  });
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const location = getLocation(slug);

  if (!location) {
    notFound();
  }

  const relatedProjects = projects.slice(0, 3);

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
          <h2 id="location-intro">
            Walling and surface finishes in {location.name}
          </h2>
          {location.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="location-conditions">
        <div className="shell">
          <div className="section-head">
            <h2 id="location-conditions">{location.conditionsTitle}</h2>
          </div>
          <div className="grid grid--2">
            {location.conditions.map((condition) => (
              <div key={condition.title}>
                <h3>{condition.title}</h3>
                <p>{condition.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="location-services">
        <div className="shell prose">
          <h2 id="location-services">Our services in {location.name}</h2>
          <p>{location.servicesLead}</p>
          <ul>
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/${service.slug}/`}>
                  {service.name} in {location.name}
                </Link>
                {" — "}
                {service.summary}
              </li>
            ))}
          </ul>

          <h3>What you can expect</h3>
          <TickList items={location.proof} />

          <h3>Suburbs we cover</h3>
          <p>{location.suburbsLead}</p>
          <ul>
            {location.suburbs.map((suburb) => (
              <li key={suburb}>{suburb}</li>
            ))}
          </ul>

          <h3>Related project details from around Adelaide</h3>
          <ul>
            {relatedProjects.map((project) => (
              <li key={project.slug}>
                <Link href={`/projects/${project.slug}/`}>{project.title}</Link>
                {" — "}
                {project.summary}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="location-faqs">
        <div className="shell prose">
          <h2 id="location-faqs">{location.name} questions</h2>
          <dl className="faq-list">
            {location.faqs.map((faq) => (
              <div key={faq.question} className="faq-list__item">
                <dt>{faq.question}</dt>
                <dd>{faq.answer}</dd>
              </div>
            ))}
          </dl>
          <p>
            <Link href="/locations/">See all our Adelaide service areas</Link>
          </p>
        </div>
      </section>

      <ContactSection
        intro={`Planning cladding, render, Hebel or walling work in ${location.name}? Send us the details for an obligation-free quote.`}
      />
      <CtaBand />
    </>
  );
}
