import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/sections";
import { bannerImages, business, contactPage } from "@/content/site";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description: contactPage.metaDescription,
  path: "/contact-us",
});

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ label: "Contact Us", href: "/contact-us" }]} />
      <PageBanner
        title={contactPage.bannerTitle}
        image={bannerImages["/contact-us"]}
        crumbs={[{ label: "Contact Us" }]}
      />

      <div className="shell progressive-notices" aria-live="polite">
        <p
          id="enquiry-sent"
          className="form__status"
          data-state="success"
          tabIndex={-1}
        >
          Thanks — your message has been accepted.
        </p>
        <p
          id="enquiry-unavailable"
          className="form__status"
          data-state="warning"
          tabIndex={-1}
        >
          Email delivery is unavailable. Please{" "}
          <a href={`tel:${business.phone}`}>call {business.phoneDisplay}</a> or{" "}
          <a href={`mailto:${business.email}`}>email us directly</a>.
        </p>
        <p
          id="enquiry-invalid"
          className="form__status"
          data-state="error"
          tabIndex={-1}
        >
          The enquiry could not be submitted. Please check the form and try
          again.
        </p>
      </div>

      {/* The WordPress version of this page had no form and no contact details
          at all — only the banner and the closing CTA. Both are added here. */}
      <ContactSection withDetails intro={contactPage.intro} />

      <CtaBand />
    </>
  );
}
