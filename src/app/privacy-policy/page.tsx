import type { Metadata } from "next";
import LegalContent from "@/components/LegalContent";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { privacyPolicy, privacyPolicyUpdated } from "@/content/legal";
import { business } from "@/content/business";
import { bannerImages } from "@/content/pages";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${business.name} handles enquiry details and privacy-friendly website analytics.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ label: "Privacy Policy", href: "/privacy-policy" }]} />
      <PageBanner
        title="Privacy Policy"
        image={bannerImages["/privacy-policy"]}
        crumbs={[{ label: "Privacy Policy" }]}
      />

      <section className="section">
        <div className="shell">
          <p>
            Last updated:{" "}
            <time dateTime={privacyPolicyUpdated}>5 September 2026</time>
          </p>
          <LegalContent blocks={privacyPolicy} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
