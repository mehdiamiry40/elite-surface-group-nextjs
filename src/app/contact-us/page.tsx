import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/sections";
import { bannerImages, contactPage } from "@/content/site";
import { BreadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contact Us",
  description: contactPage.metaDescription,
  alternates: { canonical: "/contact-us" },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ label: "Contact Us", href: "/contact-us" }]} />
      <PageBanner
        title={contactPage.bannerTitle}
        image={bannerImages["/contact-us"]}
        crumbs={[{ label: "Contact Us" }]}
      />

      {/* The WordPress version of this page had no form and no contact details
          at all — only the banner and the closing CTA. Both are added here. */}
      <ContactSection withDetails intro={contactPage.intro} />

      <CtaBand />
    </>
  );
}
