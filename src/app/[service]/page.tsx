import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactSection from "@/components/ContactSection";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { ServiceCards, TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { services, type Service } from "@/content/services";
import {
  BreadcrumbSchema,
  FAQPageSchema,
  ServiceSchema,
} from "@/components/JsonLd";
import { business } from "@/content/business";
import { ogCard, pageMetadata } from "@/lib/seo";

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
        image={bannerImages[`/${service.slug}`]}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
      />

      <section className="section" aria-labelledby="service-intro">
        <div className="shell split">
          <div className="split__media">
            <Image
              src={service.image}
              alt={service.imageAlt}
              width={service.imageWidth}
              height={service.imageHeight}
              sizes="(max-width: 767px) 100vw, 560px"
            />
          </div>
          <div className="split__body">
            <h2 id="service-intro">{service.name} services across Adelaide</h2>
            {service.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul className="related-links">
              {service.relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
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

      <section className="section" aria-labelledby="service-faqs">
        <div className="shell prose">
          <h2 id="service-faqs">{service.name} FAQs</h2>
          <dl className="faq-list">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="faq-list__item">
                <dt>{faq.question}</dt>
                <dd>{faq.answer}</dd>
              </div>
            ))}
          </dl>
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
