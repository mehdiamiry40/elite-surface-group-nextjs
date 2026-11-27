import type { Metadata } from "next";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import {
  Checklist,
  ComparisonTable,
  NumberedSteps,
} from "@/components/ContentBlocks";
import { CtaBand } from "@/components/CtaBand";
import {
  BreadcrumbSchema,
  FAQPageSchema,
  HowToSchema,
} from "@/components/JsonLd";
import FeatureIcon, { type FeatureIconName } from "@/components/FeatureIcon";
import PageBanner from "@/components/PageBanner";
import { FaqList, ServiceCards, TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import {
  planningGuides,
  preparationByProjectType,
  projectPlanningPage,
  quotePreparation,
  siteReadiness,
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

// One icon per review point, in content order.
const reviewIcons: readonly FeatureIconName[] = [
  "layers",
  "clipboard",
  "ruler",
  "clock",
];

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
      {/* The same array feeds the visible steps below, so the two cannot drift. */}
      <HowToSchema
        name={quotePreparation.name}
        description={quotePreparation.description}
        steps={quotePreparation.steps}
      />
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
          <Checklist items={projectPlanningPage.enquiryDetails} />
          <p>
            Those six points are enough to start. The{" "}
            <a href="#site-readiness">site-readiness checklist</a> below goes
            further for anyone who wants a firmer quote, and the{" "}
            <a href="#quote-steps">seven-step workflow</a> puts it in order.
          </p>

          <h3 id="planning-guides">Start with the guide that matches your wall</h3>
          <p>
            Five situations come up often enough to have their own guide. Each
            one lists what to record before an enquiry is worth sending.
          </p>
          <dl className="planning-guides">
            {planningGuides.map((guide) => (
              <div key={guide.href} className="planning-guides__item">
                <dt>
                  <Link href={guide.href}>{guide.label}</Link>
                </dt>
                <dd>
                  <strong>{guide.when}</strong> {guide.covers}
                </dd>
              </div>
            ))}
          </dl>

          <p>
            If you are still comparing options, start with the outcome you want
            and the information you already have. Explore our{" "}
            <Link href="/cladding/">cladding</Link>,{" "}
            <Link href="/render/">render</Link>,{" "}
            <Link href="/hebel/">Hebel</Link> and{" "}
            <Link href="/walling/">walling</Link> services for the questions we
            consider for each type of work, or{" "}
            <Link href="/services/">compare the four services</Link> side by
            side.
          </p>
        </div>
      </section>

      <section
        className="section section--tint"
        aria-labelledby="site-readiness"
      >
        <div className="shell prose">
          <h2 id="site-readiness">Site-readiness checklist</h2>
          <p>
            A quote is only as firm as the information behind it. Work through
            the five groups below and note what you have, what you do not, and
            what is still being decided. Gaps are fine: they tell us which
            questions to ask first.
          </p>
          {siteReadiness.map((group) => (
            <div key={group.id}>
              <h3 id={group.id}>{group.title}</h3>
              <Checklist items={group.items} />
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="quote-steps">
        <div className="shell prose">
          <h2 id="quote-steps">How to prepare a quote request</h2>
          <p>
            The same information, in the order that is easiest to gather. None
            of it has to be complete before you get in touch.
          </p>
          <NumberedSteps steps={quotePreparation.steps} />

          <h2 id="by-project-type">What to have ready, by project type</h2>
          <p>
            Different projects lean on different information. A new build is
            quoted mostly from documents, while a repair is quoted mostly from
            the wall itself.
          </p>
        </div>
        <div className="shell block-wide">
          <ComparisonTable {...preparationByProjectType} />
        </div>
      </section>

      <section
        className="section section--tint"
        aria-labelledby="planning-review-title"
      >
        <div className="shell">
          <h2 id="planning-review-title" className="section-title">
            What we review before quoting
          </h2>
          <ul className="icon-cards">
            {projectPlanningPage.reviewPoints.map((point, index) => (
              <li key={point.title}>
                <FeatureIcon name={reviewIcons[index % reviewIcons.length]} />
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="planning-quote-title">
        <div className="shell prose">
          <h2 id="planning-quote-title">What a clear quote should explain</h2>
          <p>
            Once the available information has been reviewed, the written quote
            should make the agreed scope and its main assumptions easy to find.
            Our quotes set out:
          </p>
          <TickList items={projectPlanningPage.quoteIncludes} />

          <h2 id="planning-faqs">Project planning FAQs</h2>
          <FaqList faqs={projectPlanningPage.faqs} />
        </div>
      </section>

      <ServiceCards title="Explore the right service for your project" />
      <ContactSection
        withDetails
        intro="Tell us about the project and what plans or photos are available. If supporting files are needed, we’ll arrange how to review them before preparing an obligation-free quote."
      />
      <CtaBand />
    </>
  );
}
