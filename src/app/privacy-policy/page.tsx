import type { Metadata } from "next";
import LegalContent from "@/components/LegalContent";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/sections";
import { privacyPolicy } from "@/content/legal";
import { bannerImages, business } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${business.name} collects, uses and protects the personal information you provide through this website.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
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
