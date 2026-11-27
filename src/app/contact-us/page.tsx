import type { Metadata } from "next";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { Checklist } from "@/components/ContentBlocks";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/sections";
import { business } from "@/content/business";
import { contactFaqs } from "@/content/company";
import { bannerImages, contactPage } from "@/content/pages";
import { enquiryChecklist } from "@/content/project-planning";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/JsonLd";
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
      <FAQPageSchema faqs={contactFaqs} />
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

      <section className="section" aria-labelledby="contact-checklist">
        <div className="shell prose">
          <h2 id="contact-checklist">Before you get in touch</h2>
          <p>
            An enquiry does not need to be complete. These six details are the
            ones we ask about first, so it helps to have them to hand.
          </p>
          <Checklist items={enquiryChecklist} />
          <p>
            The <Link href="/project-planning/">project planning page</Link> has
            the full site-readiness checklist, and sets out what to have ready
            for a new build, a renovation or a repair.
          </p>

          <h2 id="contact-faqs">Contact FAQs</h2>
          <FaqList faqs={contactFaqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
