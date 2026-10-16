import type { Metadata } from "next";
import LegalContent from "@/components/LegalContent";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { termsOfService } from "@/content/legal";
import { business } from "@/content/business";
import { bannerImages } from "@/content/pages";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: `The terms that apply when you use the ${business.name} website, including how quotes and enquiries, site content, external links and liability are handled.`,
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
        <div className="shell prose">
          <LegalContent blocks={termsOfService} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
