import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { ServiceCards } from "@/components/sections";
import { bannerImages, servicesPage } from "@/content/pages";
import { services } from "@/content/services";
import { BreadcrumbSchema, ServiceListSchema } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cladding & Walling Adelaide",
  description: servicesPage.metaDescription,
  path: "/services",
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

      <ServiceCards />

      <CtaBand />
    </>
  );
}
