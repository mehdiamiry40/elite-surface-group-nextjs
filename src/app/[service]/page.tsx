import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactSection from "@/components/ContactSection";
import PageBanner from "@/components/PageBanner";
import QuoteButton from "@/components/QuoteButton";
import { CtaBand } from "@/components/CtaBand";
import ServiceSections from "@/components/ServiceSections";
import {
  FaqList,
  ProjectLinks,
  SectionContents,
  ServiceCards,
  TickList,
} from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { projects } from "@/content/projects";
import { samePhotograph } from "@/lib/photographs";
import { services, type Service } from "@/content/services";
import {
  BreadcrumbSchema,
  FAQPageSchema,
  ServiceSchema,
} from "@/components/JsonLd";
import { business } from "@/content/business";
import { ogCard, pageMetadata } from "@/lib/seo";
import { blurProps } from "@/lib/lcp-blur";

type PageProps = {
  params: Promise<{ service: string }>;
};

/** Only the four service slugs resolve here; everything else 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}

function findService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { service: slug } = await params;
  const service = findService(slug);
  if (!service) {
    return {};
  }

  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/${service.slug}`,
    image: ogCard(service.slug, `${service.bannerTitle} — ${business.name}`),
  });
}

export default async function ServicePage({ params }: PageProps) {
  const { service: slug } = await params;
  const service = findService(slug);

  if (!service) {
    notFound();
  }

  const serviceLabel =
    service.slug === "hebel" ? service.name : service.name.toLowerCase();
  const relatedProjects = projects
    .filter((project) => project.service === service.slug)
    .slice(0, 3);
  const banner = bannerImages[`/${service.slug}`];
  // The service photograph and the banner file are the same shot. The banner
  // keeps it; the intro underneath does not show it again.
  const introRepeatsBanner = samePhotograph(service.image, banner);
  const sections = service.sections ?? [];
  const faqsHeading = service.headings?.faqs ?? `${service.name} FAQs`;

  const intro = (
    <>
      <h2 id="service-intro">
        {service.headings?.intro ?? (
          <>{service.name} services across Adelaide</>
        )}
      </h2>
      {service.intro.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="service-intro__actions">
        <QuoteButton>Request a {serviceLabel} quote</QuoteButton>
      </div>
      <ul className="related-links">
        {service.relatedLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
      {sections.length ? (
        <SectionContents
          sections={sections}
          extra={[{ id: "service-faqs", label: faqsHeading }]}
        />
      ) : null}
    </>
  );

  return (
    <>
      <ServiceSchema service={service} />
      <FAQPageSchema faqs={service.faqs} />
      <BreadcrumbSchema
        trail={[
          { label: "Services", href: "/services" },
          { label: service.name, href: `/${service.slug}` },
        ]}
      />
      <PageBanner
        title={service.bannerTitle}
        image={banner}
        imageAlt={introRepeatsBanner ? service.imageAlt : undefined}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
      />

      <section className="section" aria-labelledby="service-intro">
        {introRepeatsBanner ? (
          <div className="shell service-intro">{intro}</div>
        ) : (
          <div className="shell split">
            <div className="split__media">
              <Image
                src={service.image}
                alt={service.imageAlt}
                width={service.imageWidth}
                height={service.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(service.image)}
              />
            </div>
            <div className="split__body">{intro}</div>
          </div>
        )}
      </section>

      <section className="section section--tint" aria-labelledby="service-detail">
        <div className="shell prose">
          <h2 id="service-detail">How we approach {serviceLabel}</h2>
          {service.detail.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>{service.benefitsLead}</p>
          <TickList items={service.benefits} />
          <p style={{ marginTop: 24 }}>{service.closing}</p>
        </div>
      </section>

      <ProjectLinks
        items={relatedProjects}
        title={`${service.name} project details`}
        intro={`Review the visible finish and construction details recorded in the public ${serviceLabel} project portfolio.`}
        id={`${service.slug}-project-details`}
      />

      {/* The approach block and the project links above are both tinted, so
          the first long-form section starts plain and they alternate from
          there. */}
      <ServiceSections sections={sections} />

      <section
        className={
          sections.length % 2 === 1 ? "section section--tint" : "section"
        }
        aria-labelledby="service-faqs"
      >
        <div className="shell prose">
          <h2 id="service-faqs">{faqsHeading}</h2>
          <FaqList faqs={service.faqs} />
          {service.guides ? (
            <>
              <h2 id="service-guides">{service.guides.heading}</h2>
              <p>{service.guides.intro}</p>
              <nav
                className="guide-links"
                aria-label={service.guides.heading}
              >
                {service.guides.links.map((link) => (
                  <Link href={link.href} key={link.href} prefetch={false}>
                    {link.label}
                  </Link>
                ))}
                <Link className="guide-links__all" href="/resources/">
                  View all resources
                </Link>
              </nav>
            </>
          ) : null}
        </div>
      </section>

      <ServiceCards title="Other services" currentSlug={service.slug} />

      <ContactSection
        defaultService={service.name}
        intro={`Tell us about your ${serviceLabel} project, and we’ll review the details for an obligation-free quote.`}
      />

      <CtaBand />
    </>
  );
}
