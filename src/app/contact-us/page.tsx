import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { business } from "@/content/business";
import { bannerImages, contactPage } from "@/content/pages";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: contactPage.metaTitle,
  description: contactPage.metaDescription,
  path: "/contact-us",
  image: ogCard("contact", "Request an obligation-free Adelaide quote"),
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
          Thanks—your enquiry has been sent. We’ll be in touch soon.
        </p>
        <p
          id="enquiry-received"
          className="form__status"
          data-state="warning"
          tabIndex={-1}
        >
          Your enquiry has been safely received and queued for delivery. You do
          not need to submit it again. If the matter is urgent, please{" "}
          <a href={`tel:${business.phone}`}>call {business.phoneDisplay}</a>.
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
          We couldn’t submit your enquiry. Please check the form and try again.
        </p>
      </div>

      {/* The WordPress version of this page had no form and no contact details
          at all — only the banner and the closing CTA. Both are added here. */}
      <ContactSection withDetails intro={contactPage.intro} />

      <CtaBand />
    </>
  );
}
