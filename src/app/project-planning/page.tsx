import type { Metadata } from "next";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import {
  planningGuides,
  projectPlanningPage,
} from "@/content/project-planning";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: projectPlanningPage.metaTitle,
  description: projectPlanningPage.metaDescription,
  path: "/project-planning",
  image: ogCard(
    "services",
    "Plan a cladding, render, Hebel or walling project in Adelaide",
  ),
});

export default function ProjectPlanningPage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          { label: "Project planning", href: "/project-planning" },
        ]}
      />
      <FAQPageSchema faqs={projectPlanningPage.faqs} />
      <PageBanner
        title={projectPlanningPage.bannerTitle}
        image={bannerImages["/project-planning"]}
        crumbs={[
          { label: "Resources", href: "/resources" },
          { label: "Project planning" },
        ]}
      />

      <section className="section" aria-labelledby="planning-details-title">
        <div className="shell prose">
          <h2 id="planning-details-title">
            What to send with your project enquiry
          </h2>
          <p>{projectPlanningPage.lead}</p>
          <TickList items={projectPlanningPage.enquiryDetails} />

          <h3 id="planning-guides">Start with the guide that matches your wall</h3>
          <dl className="planning-guides">
            {planningGuides.map((guide) => (
              <div key={guide.href} className="planning-guides__item">
                <dt>
                  <Link href={guide.href}>{guide.label}</Link>
                </dt>
                <dd>{guide.when}</dd>
              </div>
            ))}
          </dl>

        </div>
      </section>

      <section
        className="section section--tint"
        aria-labelledby="planning-review-title"
      >
        <div className="shell prose">
          <h2 id="planning-review-title">What we review before quoting</h2>
          {projectPlanningPage.reviewPoints.map((point) => (
            <div key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="planning-quote-title">
        <div className="shell prose">
          <h2 id="planning-quote-title">What a clear quote should explain</h2>
          <TickList items={projectPlanningPage.quoteIncludes} />

          <h2 id="planning-faqs">Project planning FAQs</h2>
          <dl className="faq-list" aria-labelledby="planning-faqs">
            {projectPlanningPage.faqs.map((faq) => (
              <div key={faq.question} className="faq-list__item">
                <dt>{faq.question}</dt>
                <dd>{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ContactSection
        withDetails
        intro="Tell us about the project and what plans or photos you have."
      />
      <CtaBand />
    </>
  );
}
