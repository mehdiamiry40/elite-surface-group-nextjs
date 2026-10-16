import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { BreadcrumbSchema, GuideListSchema } from "@/components/JsonLd";
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

/** Newest first, so the hub doubles as the site's article feed. */
const guidesByDate = [...resourceGuides].sort((a, b) =>
  b.published.localeCompare(a.published),
);

export default function ResourcesPage() {
  const [featuredGuide, ...moreGuides] = guidesByDate;

  return (
    <>
      <BreadcrumbSchema trail={[{ label: "Resources", href: "/resources" }]} />
      <GuideListSchema guides={guidesByDate} />
      <PageBanner
        title={resourcesHub.bannerTitle}
        image={bannerImages["/resources"]}
        crumbs={[{ label: "Resources" }]}
      />

      <section
        className="section section--tint blog-feature-section"
        aria-labelledby="latest-guidance-title"
      >
        <div className="shell">
          <SectionHead
            eyebrow="Latest guide"
            title="Understand the issue before choosing the work"
            intro={resourcesHub.lead}
            id="latest-guidance-title"
          />

          <article className="blog-feature">
            <Link
              className="blog-feature__image"
              href={`/resources/${featuredGuide.slug}/`}
              aria-label={`Read ${featuredGuide.title}`}
            >
              <Image
                src={featuredGuide.image}
                alt={featuredGuide.imageAlt}
                width={featuredGuide.imageWidth}
                height={featuredGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 58vw"
                {...blurProps(featuredGuide.image)}
              />
            </Link>

            <div className="blog-feature__content">
              <div className="blog-post-meta">
                <span>{featuredGuide.category}</span>
                <time dateTime={featuredGuide.published}>
                  {featuredGuide.publishedDisplay}
                </time>
                <span>{featuredGuide.readingTime}</span>
              </div>
              <h2 id="latest-article-title">
                <Link href={`/resources/${featuredGuide.slug}/`}>
                  {featuredGuide.title}
                </Link>
              </h2>
              <p>{featuredGuide.summary}</p>
              <Link
                className="text-link"
                href={`/resources/${featuredGuide.slug}/`}
              >
                Read the latest guide
                <ArrowRightIcon />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section" aria-labelledby="all-articles-title">
        <div className="shell">
          <SectionHead
            eyebrow="From the site notebook"
            title="More advice and project guides"
            intro="Material selection, common wall and render questions, maintenance and pre-construction planning."
            id="all-articles-title"
          />

          <ul className="blog-grid">
            {moreGuides.map((guide) => (
              <li key={guide.slug}>
                <article className="blog-card">
                  <Link
                    className="blog-card__image"
                    href={`/resources/${guide.slug}/`}
                    prefetch={false}
                    aria-label={`Read ${guide.title}`}
                  >
                    <Image
                      src={guide.image}
                      alt={guide.imageAlt}
                      width={guide.imageWidth}
                      height={guide.imageHeight}
                      sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      {...blurProps(guide.image)}
                    />
                  </Link>
                  <div className="blog-card__content">
                    <div className="blog-post-meta">
                      <span>{guide.category}</span>
                      <time dateTime={guide.published}>
                        {guide.publishedDisplay}
                      </time>
                    </div>
                    <h3>
                      <Link
                        href={`/resources/${guide.slug}/`}
                        prefetch={false}
                      >
                        {guide.title}
                      </Link>
                    </h3>
                    <p>{guide.summary}</p>
                    <div className="blog-card__footer">
                      <span>{guide.readingTime}</span>
                      <Link
                        className="text-link"
                        href={`/resources/${guide.slug}/`}
                        prefetch={false}
                      >
                        Read guide
                        <ArrowRightIcon />
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight blog-guidance">
        <div className="shell blog-guidance__inner">
          <div>
            <span className="eyebrow">Planning a project?</span>
            <h2>Turn what you know into a clearer scope.</h2>
          </div>
          <div>
            <p>
              Use the planning guide to gather the site details, photos, drawings
              and programme information that make an early project conversation
              more useful.
            </p>
            <Link className="text-link" href="/project-planning/">
              Open the project-planning guide
              <ArrowRightIcon />
            </Link>
          </div>
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
