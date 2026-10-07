import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/Hero";
import ProjectGallery from "@/components/ProjectGallery";
import { ArrowRightIcon } from "@/components/icons";
import { SectionHead, ServiceCards } from "@/components/sections";
import { aboutTeaser, process, trustPoints } from "@/content/home";
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
        <ul className="shell trust-strip__grid">
          {trustPoints.map((point, index) => (
            <li key={point}>
              <span className="trust-strip__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <strong>{point}</strong>
            </li>
          ))}
        </ul>
      </section>

      <ServiceCards title="Four specialist services. One coordinated team." />

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
            <p>{aboutTeaser.body}</p>
            <p className="home-story__links">
              <Link className="text-link" href="/about/">
                About our team
                <ArrowRightIcon />
              </Link>
              <Link className="text-link" href="/locations/adelaide/">
                Adelaide service area
                <ArrowRightIcon />
              </Link>
            </p>
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

      <section className="section home-process" aria-labelledby="process-title">
        <div className="shell">
          <div className="home-process__intro">
            <span className="eyebrow">How we work</span>
            <h2 id="process-title">{process.title}</h2>
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
          <p className="section-cta">
            <Link
              className="text-link text-link--light"
              href="/project-planning/"
            >
              What to send for a clearer quote
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
            eyebrow="Guides"
            title="Answers before work begins."
            id="home-resources-title"
          />
          <ul className="project-link-grid project-link-grid--3 resource-grid">
            {featuredResourceGuides.map((guide) => (
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
          </ul>
          <p className="section-cta">
            <Link className="text-link" href="/resources/" prefetch={false}>
              Explore all resources
              <ArrowRightIcon />
            </Link>
          </p>
        </div>
      </section>

      <ContactSection withDetails />
    </>
  );
}
