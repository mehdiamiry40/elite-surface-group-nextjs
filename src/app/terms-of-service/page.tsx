import type { Metadata } from "next";
import LegalContent from "@/components/LegalContent";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/sections";
import { termsOfService } from "@/content/legal";
import { bannerImages, business } from "@/content/site";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: `The terms and conditions that apply when you browse and use the ${business.name} website.`,
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ label: "Terms of Service", href: "/terms-of-service" }]} />
      <PageBanner
        title="Terms of Service"
        image={bannerImages["/terms-of-service"]}
        crumbs={[{ label: "Terms of Service" }]}
      />

      <section className="section">
        <div className="shell">
          <LegalContent blocks={termsOfService} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
