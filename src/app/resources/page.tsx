import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { SectionHead } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { resourceGuides, resourcesHub } from "@/content/resources";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: resourcesHub.metaTitle,
  description: resourcesHub.metaDescription,
  path: "/resources",
  image: ogCard(
    "resources",
    "Adelaide render, cladding and wall-system resources",
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
            {resourceGuides.map((guide) => (
              <li className="project-link-card" key={guide.slug}>
                <span>{guide.category}</span>
                <h3>
                  <Link href={`/resources/${guide.slug}/`} prefetch={false}>
                    {guide.metaTitle}
                  </Link>
                </h3>
                <Link
                  className="text-link"
                  href={`/resources/${guide.slug}/`}
                  prefetch={false}
                >
                  Read the guide
                  <ArrowRightIcon />
                </Link>
              </li>
            ))}
            <li className="project-link-card">
              <span>Quote preparation</span>
              <h3>
                <Link href="/project-planning/" prefetch={false}>
                  Plan your cladding, render, Hebel or walling enquiry
                </Link>
              </h3>
              <Link
                className="text-link"
                href="/project-planning/"
                prefetch={false}
              >
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
            These guides can’t diagnose a building from a photo. Ready to talk?
            See <Link href="/cladding/">cladding</Link>,{" "}
            <Link href="/render/">rendering</Link> and{" "}
            <Link href="/hebel/">Hebel</Link>, or{" "}
            <Link href="/contact-us/#contact">send your project details</Link>.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
