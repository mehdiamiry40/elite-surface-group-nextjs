import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { SectionHead } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { renderCrackingGuide, resourcesHub } from "@/content/resources";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: resourcesHub.metaTitle,
  description: resourcesHub.metaDescription,
  path: "/resources",
  image: ogCard(
    "render-cracking-adelaide",
    "Adelaide render and wall-system homeowner resources",
  ),
});

export default function ResourcesPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ label: "Resources", href: "/resources" }]} />
      <PageBanner
        title={resourcesHub.bannerTitle}
        image={bannerImages["/resources"]}
        crumbs={[{ label: "Resources" }]}
      />

      <section
        className="section section--tint"
        aria-labelledby="resources-title"
      >
        <div className="shell">
          <SectionHead
            eyebrow="Useful before you quote"
            title="Understand the issue before choosing the work"
            intro={resourcesHub.lead}
            id="resources-title"
          />
          <ul className="project-link-grid project-link-grid--2 resource-grid">
            <li className="project-link-card">
              <span>{renderCrackingGuide.category}</span>
              <h3>
                <Link href={`/resources/${renderCrackingGuide.slug}/`}>
                  {renderCrackingGuide.metaTitle}
                </Link>
              </h3>
              <p>{renderCrackingGuide.summary}</p>
              <Link
                className="text-link"
                href={`/resources/${renderCrackingGuide.slug}/`}
              >
                Read the guide
                <ArrowRightIcon />
              </Link>
            </li>
            <li className="project-link-card">
              <span>Quote preparation</span>
              <h3>
                <Link href="/project-planning/">
                  Plan your cladding, render, Hebel or walling enquiry
                </Link>
              </h3>
              <p>
                See which plans, photos, site details and programme information
                can help turn an early enquiry into a clearer scope.
              </p>
              <Link className="text-link" href="/project-planning/">
                Use the planning guide
                <ArrowRightIcon />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="resource-boundary-title">
        <div className="shell prose">
          <h2 id="resource-boundary-title">Guidance, not a remote diagnosis</h2>
          <p>
            Buildings, substrates and wall systems differ. These resources help
            you record useful information and recognise when another
            professional should assess the building; they do not diagnose a
            property from a description or photograph.
          </p>
          <p>
            When you are ready to discuss visible render or wall-finish work,
            review our <Link href="/render/">Adelaide rendering services</Link>{" "}
            or{" "}
            <Link href="/contact-us/#contact">
              send the team your project details
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
