import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/Hero";
import ProjectGallery from "@/components/ProjectGallery";
import { SectionHead, ServiceCards } from "@/components/sections";
import { aboutTeaser, process } from "@/content/home";
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
          <div>
            <span className="trust-strip__number">01</span>
            <strong>Adelaide focused</strong>
            <p>Local walling and surface expertise across South Australia.</p>
          </div>
          <div>
            <span className="trust-strip__number">02</span>
            <strong>One coordinated team</strong>
            <p>Cladding, render, Hebel and walling in one clear scope.</p>
          </div>
          <div>
            <span className="trust-strip__number">03</span>
            <strong>Built around your brief</strong>
            <p>Practical advice, transparent quotes and careful finishes.</p>
          </div>
        </div>
      </section>

      <ServiceCards />

      {/* Trusted specialists */}
      <section className="section" aria-labelledby="about-teaser-title">
        <div className="shell split">
          <div className="split__media">
            <Image
              src={aboutTeaser.image}
              alt={aboutTeaser.imageAlt}
              width={600}
              height={400}
              sizes="(max-width: 767px) 100vw, 560px"
            />
          </div>
          <div className="split__body">
            <span className="eyebrow">{aboutTeaser.eyebrow}</span>
            <h2 id="about-teaser-title">{aboutTeaser.title}</h2>
            {aboutTeaser.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link className="btn" href="/about">
              Learn more about us
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section section--tint" aria-labelledby="process-title">
        <div className="shell split split--flip">
          <div className="split__media">
            <Image
              src={process.image}
              alt={process.imageAlt}
              width={600}
              height={400}
              sizes="(max-width: 767px) 100vw, 560px"
            />
          </div>
          <div className="split__body">
            <span className="eyebrow">How we work</span>
            <h2 id="process-title">Our Professional Process</h2>
            <p>{process.intro}</p>
            <ul className="steps">
              {process.steps.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="section" aria-labelledby="featured-title">
        <div className="shell">
          <SectionHead
            eyebrow={featuredProjects.eyebrow}
            title={featuredProjects.title}
            intro={featuredProjects.intro}
            id="featured-title"
          />
          <ProjectGallery items={projects.slice(0, 3)} />
          <p className="section-cta">
            <Link className="btn" href="/projects">
              View all projects
            </Link>
          </p>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
