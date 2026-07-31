import type { Metadata } from "next";
import LegalContent from "@/components/LegalContent";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { privacyPolicy } from "@/content/legal";
import { business } from "@/content/business";
import { bannerImages } from "@/content/pages";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${business.name} collects, uses and protects the personal information you provide through this website.`,
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
          <LegalContent blocks={privacyPolicy} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
