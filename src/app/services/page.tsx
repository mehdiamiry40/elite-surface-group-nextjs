import type { Metadata } from "next";
import Link from "next/link";
import {
  Checklist,
  ComparisonTable,
  DecisionGuide,
} from "@/components/ContentBlocks";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { ServiceCards } from "@/components/sections";
import { bannerImages, servicesPage } from "@/content/pages";
import { enquiryChecklist } from "@/content/project-planning";
import {
  serviceComparisonDetailed,
  serviceDecisions,
} from "@/content/service-comparison";
import { services } from "@/content/services";
import { BreadcrumbSchema, ServiceListSchema } from "@/components/JsonLd";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Adelaide Cladding, Render & Hebel",
  description: servicesPage.metaDescription,
  path: "/services",
  image: ogCard("services", "Cladding, render, Hebel and walling services"),
});

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ label: "Services", href: "/services" }]} />
      <ServiceListSchema services={services} />
      <PageBanner
        title={servicesPage.bannerTitle}
        image={bannerImages["/services"]}
        crumbs={[{ label: "Services" }]}
      />

      <ServiceCards />

      <section className="section" aria-labelledby="services-compare">
        <div className="shell">
          <h2 id="services-compare" className="section-title">
            Compare cladding, render, Hebel and walling
          </h2>
          <div className="prose">
            <p>
              The four services overlap on site, but each is quoted from
              different information. The table sets out what each one covers,
              the projects it suits, what we confirm before quoting, and the
              services it is most often quoted with. Follow a service name for
              the full page.
            </p>
          </div>
          <ComparisonTable {...serviceComparisonDetailed} />
        </div>
      </section>

      <section
        className="section section--tint"
        aria-labelledby="services-choose"
      >
        <div className="shell">
          <h2 id="services-choose" className="section-title">
            When to choose each service
          </h2>
          <div className="prose">
            <p>
              Start from the situation you are in. Each row names the service
              that usually suits it and what still has to be confirmed. It is
              a starting point: the wall, the documents and the site decide
              the answer.
            </p>
          </div>
          <DecisionGuide
            caption="Which service suits which situation"
            rows={serviceDecisions}
          />
          <div className="prose">
            <p>
              Still choosing between finishes or wall types? The{" "}
              <Link href="/resources/">planning guides</Link> compare the
              common options, and work that spans more than one service can be
              quoted as a single coordinated package.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="services-checklist">
        <div className="shell">
          <h2 id="services-checklist" className="section-title">
            Before you request a quote
          </h2>
          <div className="prose">
            <p>
              Whichever service you need, the same six details get an enquiry
              started. The{" "}
              <Link href="/project-planning/">project planning page</Link> has
              the full site-readiness checklist and what to have ready for each
              type of project.
            </p>
          </div>
          <Checklist items={enquiryChecklist} columns={2} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
