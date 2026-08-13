import type { Metadata } from "next";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema, FAQPageSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { ServiceCards, TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { projectPlanningPage } from "@/content/project-planning";
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
          <p>
            If an existing rendered wall is cracked, first read our{" "}
            <Link href="/resources/render-cracking-adelaide/">
              Adelaide render-cracking guide
            </Link>{" "}
            for what to record and when another professional may need to assess
            the building before a repair is scoped.
          </p>
          <p>
            For a new cladding or facade-replacement enquiry near Adelaide’s
            coast, use our{" "}
            <Link href="/resources/cladding-maintenance-coastal-adelaide/">
              coastal cladding maintenance guide
            </Link>{" "}
            to identify the proposed product, site exposure, unwashed areas and
            future access questions worth resolving before installation.
          </p>
          <p>
            If a Hebel wall will receive a rendered or coated finish, review
            our{" "}
            <Link href="/resources/rendering-hebel-panels-adelaide/">
              guide to rendering Hebel panels
            </Link>{" "}
            for the system documents, movement details, coating specification
            and trade responsibilities that should be clear before work begins.
          </p>
          <p>
            For an existing painted-brick exterior, use our {" "}
            <Link href="/resources/rendering-over-painted-brick-adelaide/">
              guide to rendering over painted brick
            </Link>{" "}
            to record the coating history, visible wall condition, safety
            questions and preparation assumptions that need to be resolved
            before a finish is specified.
          </p>
          <TickList items={projectPlanningPage.enquiryDetails} />
          <p>
            If you are still comparing options, start with the outcome you want
            and the information you already have. Explore our{" "}
            <Link href="/cladding/">cladding</Link>,{" "}
            <Link href="/render/">render</Link>,{" "}
            <Link href="/hebel/">Hebel</Link> and{" "}
            <Link href="/walling/">walling</Link> services for the questions we
            consider for each type of work.
          </p>
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
          <p>
            Once the available information has been reviewed, the written quote
            should make the agreed scope and its main assumptions easy to find.
            Our quotes set out:
          </p>
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

      <ServiceCards title="Explore the right service for your project" />
      <ContactSection
        withDetails
        intro="Send us the plans, photos and project details you have. We’ll review the information and let you know what is still needed for an obligation-free quote."
      />
      <CtaBand />
    </>
  );
}
