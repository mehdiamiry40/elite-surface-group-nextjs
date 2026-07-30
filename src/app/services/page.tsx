import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import { CtaBand, ServiceCards, Testimonials } from "@/components/sections";
import { bannerImages, servicesPage } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description: servicesPage.metaDescription,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
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
