import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import {
  BlogListSchema,
  BreadcrumbSchema,
} from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { SectionHead } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { resourceGuides } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

const pageTitle = "Adelaide Cladding, Render & Hebel Blog";
const pageDescription =
  "Practical articles for Adelaide homeowners, builders and project teams about cladding, render, Hebel and wall systems, project planning and surface care.";

export const metadata: Metadata = pageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/blog",
  image: ogCard(
    "resources",
    "Elite Surface Group blog — Adelaide cladding, render and wall-system advice",
  ),
});

const blogGuides = [...resourceGuides].sort((a, b) =>
  b.published.localeCompare(a.published),
);

export default function BlogPage() {
  const [featuredGuide, ...moreGuides] = blogGuides;

  return (
    <>
      <BreadcrumbSchema trail={[{ label: "Blog", href: "/blog" }]} />
      <BlogListSchema guides={blogGuides} />
      <PageBanner
        title="Adelaide Cladding, Render & Hebel Blog"
        image={bannerImages["/blog"]}
        crumbs={[{ label: "Blog" }]}
      />

      <section
        className="section section--tint blog-feature-section"
        aria-labelledby="latest-guidance-title"
      >
        <div className="shell">
          <SectionHead
            eyebrow="Latest article"
            title="Practical knowledge for better project decisions"
            intro="Clear, useful guidance about wall systems, surface finishes and the details worth confirming before work begins."
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
                Read the latest article
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
            intro="Browse practical articles covering material selection, common wall and render questions, maintenance and pre-construction planning."
            id="all-articles-title"
          />

          <ul className="blog-grid">
            {moreGuides.map((guide) => (
              <li key={guide.slug}>
                <article className="blog-card">
                  <Link
                    className="blog-card__image"
                    href={`/resources/${guide.slug}/`}
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
                      <Link href={`/resources/${guide.slug}/`}>
                        {guide.title}
                      </Link>
                    </h3>
                    <p>{guide.summary}</p>
                    <div className="blog-card__footer">
                      <span>{guide.readingTime}</span>
                      <Link
                        className="text-link"
                        href={`/resources/${guide.slug}/`}
                      >
                        Read article
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

      <CtaBand />
    </>
  );
}
