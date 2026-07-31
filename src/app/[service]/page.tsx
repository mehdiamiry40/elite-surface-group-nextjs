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
import { pageMetadata } from "@/lib/seo";

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
    image: {
      path: service.image,
      width: service.imageWidth,
      height: service.imageHeight,
      alt: service.imageAlt,
    },
  });
}

export default async function ServicePage({ params }: PageProps) {
  const { service: slug } = await params;
  const service = findService(slug);

  if (!service) {
    notFound();
  }

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
            <h2 id="service-intro">{service.name} services in Adelaide</h2>
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
          <h2 id="service-detail">Why choose our {service.name.toLowerCase()}</h2>
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

      <ServiceCards titleAccent="Other" currentSlug={service.slug} />

      <ContactSection
        defaultService={service.name}
        intro={`Tell us about your ${service.name.toLowerCase()} project and we will come back to you with an obligation-free quote.`}
      />

      <CtaBand />
    </>
  );
}
