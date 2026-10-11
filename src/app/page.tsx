import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/Hero";
import ProjectGallery from "@/components/ProjectGallery";
import FeatureIcon from "@/components/FeatureIcon";
import { ArrowRightIcon } from "@/components/icons";
import { SectionHead, ServiceCards } from "@/components/sections";
import {
  aboutTeaser,
  audiences,
  coverage,
  process,
  trustPoints,
} from "@/content/home";
import { featuredProjects, projectCards } from "@/content/projects";
import { featuredResourceGuides } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  description:
    "Cladding, render, Hebel and walling for homes and commercial projects across Adelaide and South Australia. Request an obligation-free quote.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="trust-strip" aria-label="Why work with Elite Surface Group">
        <div className="shell trust-strip__grid">
          {trustPoints.map((point) => (
            <div key={point.title}>
              <FeatureIcon name={point.icon} />
              <strong>{point.title}</strong>
              <p>{point.body}</p>
            </div>
          ))}
        </div>
      </section>

      <ServiceCards
        title="Four specialist services. One coordinated team."
        compact
      />

      <section
        className="section home-story home-story--coverage"
        aria-labelledby="coverage-title"
      >
        <div className="shell home-story__grid">
          <div className="home-story__copy">
            <span className="eyebrow">{coverage.eyebrow}</span>
            <h2 id="coverage-title">{coverage.title}</h2>
            <p>{coverage.body}</p>
            <ul className="icon-points">
              {coverage.points.map((point) => (
                <li key={point.label}>
                  <FeatureIcon name={point.icon} small />
                  {point.label}
                </li>
              ))}
            </ul>
            <Link className="text-link" href="/locations/adelaide/">
              Explore our Adelaide service area
              <ArrowRightIcon />
            </Link>
          </div>
          <div className="home-story__media home-story__media--framed">
            <Image
              src={coverage.image}
              alt={coverage.imageAlt}
              width={1600}
              height={1200}
              sizes="(max-width: 767px) 100vw, 55vw"
              {...blurProps(coverage.image)}
            />
          </div>
        </div>
      </section>

      <section
        className="section home-story home-story--about"
        aria-labelledby="about-teaser-title"
      >
        <div className="shell home-story__grid home-story__grid--reverse">
          <div className="home-story__media">
            <Image
              src={aboutTeaser.image}
              alt={aboutTeaser.imageAlt}
              width={1600}
              height={1200}
              sizes="(max-width: 767px) 100vw, 55vw"
              {...blurProps(aboutTeaser.image)}
            />
          </div>
          <div className="home-story__copy">
            <span className="eyebrow">{aboutTeaser.eyebrow}</span>
            <h2 id="about-teaser-title">{aboutTeaser.title}</h2>
            {aboutTeaser.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul className="icon-points">
              {aboutTeaser.facts.map((fact) => (
                <li key={fact.label}>
                  <FeatureIcon name={fact.icon} small />
                  {"href" in fact ? (
                    <a href={fact.href}>{fact.label}</a>
                  ) : (
                    fact.label
                  )}
                </li>
              ))}
            </ul>
            <Link className="text-link" href="/about/">
              Get to know our team
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="section home-projects" aria-labelledby="featured-title">
        <div className="shell">
          <SectionHead
            eyebrow={featuredProjects.eyebrow}
            title={featuredProjects.title}
            id="featured-title"
          />
          <ProjectGallery items={projectCards.slice(0, 3)} />
          <p className="section-cta home-projects__actions">
            <Link className="text-link" href="/projects/">
              Explore all projects
              <ArrowRightIcon />
            </Link>
            <Link className="btn" href="/contact-us/">
              Discuss your project
              <ArrowRightIcon />
            </Link>
          </p>
        </div>
      </section>

      <section
        className="section section--tint"
        aria-labelledby="home-resources-title"
      >
        <div className="shell">
          <SectionHead
            eyebrow="Practical project guidance"
            title="Resolve the right questions before work begins."
            id="home-resources-title"
          />
          <ul className="photo-cards">
            {featuredResourceGuides.map((guide) => (
              <li className="photo-card" key={guide.slug}>
                <div className="photo-card__media">
                  <Image
                    src={guide.image}
                    alt={guide.imageAlt}
                    width={guide.imageWidth}
                    height={guide.imageHeight}
                    sizes="(max-width: 767px) 100vw, 33vw"
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
          </ul>
          <p className="section-cta">
            <Link className="text-link" href="/resources/" prefetch={false}>
              Explore all resources
              <ArrowRightIcon />
            </Link>
          </p>
        </div>
      </section>

      <section className="section home-process" aria-labelledby="process-title">
        <div className="shell">
          <div className="home-process__intro">
            <span className="eyebrow">How we work</span>
            <h2 id="process-title">{process.title}</h2>
            <p>{process.intro}</p>
          </div>
          <ol className="home-process__list">
            {process.steps.map((step) => (
              <li key={step.title}>
                <FeatureIcon name={step.icon} />
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="section-cta">
            <Link
              className="text-link text-link--light"
              href="/project-planning/"
            >
              See what to send for a clearer quote
              <ArrowRightIcon />
            </Link>
          </p>
        </div>
      </section>

      <section className="section home-audiences" aria-labelledby="audience-title">
        <div className="shell">
          <SectionHead
            eyebrow="Support shaped around your project"
            title="A practical place to start."
            intro="Clear next steps for homeowners, builders and development teams."
            id="audience-title"
          />
          <ul className="audience-grid">
            {audiences.map((audience) => (
              <li className="audience-card" key={audience.title}>
                <div className="audience-card__media">
                  <Image
                    src={audience.image}
                    alt={audience.imageAlt}
                    width={1600}
                    height={900}
                    sizes="(max-width: 767px) 100vw, 50vw"
                    {...blurProps(audience.image)}
                  />
                </div>
                <div className="audience-card__body">
                  <FeatureIcon name={audience.icon} />
                  <span className="eyebrow">{audience.eyebrow}</span>
                  <h3>{audience.title}</h3>
                  <p>{audience.body}</p>
                  <Link className="audience-card__link" href={audience.href}>
                    {audience.linkLabel}
                    <span aria-hidden="true">
                      <ArrowRightIcon />
                    </span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactSection withDetails />
    </>
  );
}
