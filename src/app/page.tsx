import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/Hero";
import ProjectGallery from "@/components/ProjectGallery";
import { ArrowRightIcon } from "@/components/icons";
import { SectionHead, ServiceCards } from "@/components/sections";
import {
  aboutTeaser,
  audiences,
  coverage,
  process,
  trustPoints,
} from "@/content/home";
import { featuredProjects, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  description:
    "Elite Surface Group installs cladding, render, Hebel and walling across Adelaide and South Australia. Free quotes for homes, renovations and commercial builds.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="trust-strip" aria-label="Why work with Elite Surface Group">
        <div className="shell trust-strip__grid">
          {trustPoints.map((point, index) => (
            <div key={point.title}>
              <span className="trust-strip__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="trust-strip__eyebrow">{point.eyebrow}</span>
              <strong>{point.title}</strong>
              <p>{point.body}</p>
            </div>
          ))}
        </div>
      </section>

      <ServiceCards title="One team. Every surface." />

      <section
        className="section home-story home-story--coverage"
        aria-labelledby="coverage-title"
      >
        <div className="shell home-story__grid">
          <div className="home-story__copy">
            <span className="eyebrow">{coverage.eyebrow}</span>
            <h2 id="coverage-title">{coverage.title}</h2>
            <p>{coverage.body}</p>
            <Link className="text-link" href="/locations/">
              Explore our service area
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
            />
          </div>
          <div className="home-story__copy">
            <span className="eyebrow">{aboutTeaser.eyebrow}</span>
            <h2 id="about-teaser-title">{aboutTeaser.title}</h2>
            {aboutTeaser.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link className="text-link" href="/about/">
              Meet Elite Surface Group
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
            intro={featuredProjects.intro}
            id="featured-title"
          />
          <ProjectGallery items={projects.slice(0, 3)} />
          <p className="section-cta">
            <Link className="text-link" href="/projects/">
              View all project details
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
            {process.steps.map((step, index) => (
              <li key={step.title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section home-audiences" aria-labelledby="audience-title">
        <div className="shell">
          <SectionHead
            eyebrow="Built around your project"
            title="How can we help?"
            intro="A clearer starting point for homeowners, builders and development teams."
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
                  />
                </div>
                <div className="audience-card__body">
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
