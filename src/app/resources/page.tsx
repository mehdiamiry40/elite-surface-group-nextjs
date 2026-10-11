import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FeatureIcon from "@/components/FeatureIcon";
import { ArrowRightIcon } from "@/components/icons";
import { BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { SectionHead } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { resourceGuides, resourcesHub } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
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
          <ul className="photo-cards">
            {resourceGuides.map((guide) => (
              <li className="photo-card" key={guide.slug}>
                <div className="photo-card__media">
                  <Image
                    src={guide.image}
                    alt={guide.imageAlt}
                    width={guide.imageWidth}
                    height={guide.imageHeight}
                    sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    {...blurProps(guide.image)}
                  />
                </div>
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
            <li className="photo-card photo-card--icon">
              <FeatureIcon name="clipboard" />
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
            Buildings, substrates and wall systems differ. These resources help
            you record useful information and recognise when another
            professional should assess the building; they do not diagnose a
            property from a description or photograph.
          </p>
          <p>
            When you are ready to discuss a new installation or a clearly
            scoped finish, review our <Link href="/cladding/">cladding</Link>,{" "}
            <Link href="/render/">rendering</Link> and{" "}
            <Link href="/hebel/">Hebel</Link> services, or{" "}
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
