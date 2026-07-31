import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { ServiceCards, Testimonials } from "@/components/sections";
import { bannerImages, servicesPage } from "@/content/site";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cladding, Render, Hebel & Walling Services Adelaide",
  description: servicesPage.metaDescription,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ label: "Services", href: "/services" }]} />
      <PageBanner
        title={servicesPage.bannerTitle}
        image={bannerImages["/services"]}
        crumbs={[{ label: "Services" }]}
      />

      <ServiceCards />

      <Testimonials />

      <CtaBand />
    </>
  );
}
