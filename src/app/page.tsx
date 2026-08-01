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
            <h2 id="about-teaser-title">
              <span className="accent">{aboutTeaser.eyebrow} </span>
              {aboutTeaser.title}
            </h2>
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
            <h2 id="process-title">
              <span className="accent">Our </span>
              Professional Process
            </h2>
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
