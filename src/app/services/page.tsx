import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import { CtaBand, ServiceCards, Testimonials } from "@/components/sections";
import { bannerImages, servicesPage } from "@/content/site";
import { BreadcrumbSchema, ReviewSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Services",
  description: servicesPage.metaDescription,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ label: "Services", href: "/services" }]} />
      <ReviewSchema />
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
