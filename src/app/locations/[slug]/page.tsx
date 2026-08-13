import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import ContactSection from "@/components/ContactSection";
import { TickList } from "@/components/sections";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { bannerImages } from "@/content/pages";
import { business } from "@/content/business";
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
    // The Adelaide page reuses the default card; it already names the city.
    image: ogCard("default", `${location.bannerTitle} — Elite Surface Group`),
  });
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const location = getLocation(slug);

  if (!location) {
    notFound();
  }

  const localProjects = projects.filter((project) =>
    project.suburb.toLowerCase().includes(location.name.toLowerCase()) ||
    project.suburb.toLowerCase().includes("adelaide"),
  );

  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Service areas", href: "/locations" },
          { label: location.name, href: `/locations/${location.slug}` },
        ]}
      />
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
          <p>{location.servicesLead}</p>
          <p>
            Our customer-facing location is at{" "}
            <a
              href={business.address.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {business.address.formatted}
            </a>
            . Contact the team with your suburb and project details so we can
            confirm availability and the next step.
          </p>
          <ul>
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/${service.slug}/`}>
                  {service.name} in {location.name}
                </Link>
              </li>
            ))}
          </ul>
          <h3>What you can expect</h3>
          <TickList items={location.proof} />
          {localProjects.length ? (
            <>
              <h3>Project examples</h3>
              <ul>
                {localProjects.map((project) => (
                  <li key={project.slug}>
                    <Link href={`/projects/${project.slug}/`}>
                      {project.title}
                    </Link>
                    {" — "}
                    {project.summary}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </section>

      <ContactSection
        intro={`Planning cladding, render, Hebel or walling work in ${location.name}? Send us the details for an obligation-free quote.`}
      />
      <CtaBand />
    </>
  );
}
