import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { ServiceCards } from "@/components/sections";
import { bannerImages, servicesPage } from "@/content/pages";
import { services } from "@/content/services";
import { BreadcrumbSchema, ServiceListSchema } from "@/components/JsonLd";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: servicesPage.metaTitle,
  description: servicesPage.metaDescription,
  path: "/services",
  image: ogCard("services", "Cladding, render, Hebel and walling services"),
});

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ label: "Services", href: "/services" }]} />
      <ServiceListSchema services={services} />
      <PageBanner
        title={servicesPage.bannerTitle}
        image={bannerImages["/services"]}
        crumbs={[{ label: "Services" }]}
      />

      <section className="section" aria-labelledby="services-intro">
        <div className="shell prose">
          <h2 id="services-intro">{servicesPage.introTitle}</h2>
          {servicesPage.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <ServiceCards />

      <section className="section" aria-labelledby="services-choose">
        <div className="shell">
          <div className="section-head">
            <h2 id="services-choose">{servicesPage.chooseTitle}</h2>
            <p>{servicesPage.chooseIntro}</p>
          </div>
          <div className="grid grid--2">
            {servicesPage.choose.map((option) => (
              <div key={option.title}>
                <h3>{option.title}</h3>
                <p>{option.body}</p>
                <p>
                  <Link href={`${option.href}`}>{option.label}</Link>
                </p>
              </div>
            ))}
          </div>
          <p className="section-cta">{servicesPage.closing}</p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
