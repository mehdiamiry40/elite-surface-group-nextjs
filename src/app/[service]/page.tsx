import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ContactSection from "@/components/ContactSection";
import PageBanner from "@/components/PageBanner";
import { CtaBand, ServiceCards, TickList } from "@/components/sections";
import { bannerImages, services, type Service } from "@/content/site";
import { BreadcrumbSchema, ServiceSchema } from "@/components/JsonLd";

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

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/${service.slug}` },
  };
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
              width={600}
              height={400}
              sizes="(max-width: 767px) 100vw, 560px"
              quality={80}
              priority
            />
          </div>
          <div className="split__body">
            <h2 id="service-intro">{service.name} services in Adelaide</h2>
            {service.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
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

      <ServiceCards titleAccent="Other" currentSlug={service.slug} />

      <ContactSection intro={`Tell us about your ${service.name.toLowerCase()} project and we will come back to you with an obligation-free quote.`} />

      <CtaBand />
    </>
  );
}
