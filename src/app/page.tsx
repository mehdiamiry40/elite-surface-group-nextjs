import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/Hero";
import QuoteButton from "@/components/QuoteButton";
import ScrollStrip from "@/components/ScrollStrip";
import { ArrowRightIcon } from "@/components/icons";
import { ServiceCards } from "@/components/sections";
import { consultation, welcome } from "@/content/home";
import { projectPlanningPage } from "@/content/project-planning";
import { projectCards } from "@/content/projects";
import { featuredResourceGuides } from "@/content/resources";
import { services } from "@/content/services";
import { blurProps } from "@/lib/lcp-blur";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  description:
    "Cladding, render, Hebel and walling for homes and commercial projects across Adelaide and South Australia. Request an obligation-free quote.",
  path: "/",
});

// One question from each service page, plus the most common planning one.
const homeFaqs = [
  ...services.map((service) => service.faqs[0]),
  projectPlanningPage.faqs[0],
];

const aboutImages = {
  small: projectCards.find((p) => p.slug === "rendered-window-reveal-detail"),
  large: projectCards.find((p) => p.slug === "two-storey-exterior-render"),
};

export default function HomePage() {
  return (
    <>
      <Hero />

      <ServiceCards withCta />

      <section className="section home-projects" aria-labelledby="featured-title">
        <div className="shell">
          <div className="stack-head">
            <h2 id="featured-title" className="stack-title">
              Our projects
            </h2>
            <Link className="btn btn--pill" href="/projects/">
              All projects
            </Link>
          </div>
        </div>
        <ScrollStrip label="Project case studies">
          {projectCards.map((project) => (
            <li key={project.slug}>
              <Link href={`/projects/${project.slug}/`}>
                <span className="project-strip__media">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    width={project.width}
                    height={project.height}
                    sizes="(max-width: 767px) 72vw, 300px"
                    {...blurProps(project.image)}
                  />
                </span>
                <span className="project-strip__title">{project.title}</span>
              </Link>
            </li>
          ))}
        </ScrollStrip>
      </section>

      <section className="blue-band" aria-labelledby="consult-title">
        <div className="shell blue-band__grid">
          <div className="blue-band__media">
            <Image
              src={consultation.image}
              alt=""
              width={1600}
              height={1067}
              sizes="(max-width: 767px) 100vw, 260px"
              {...blurProps(consultation.image)}
            />
          </div>
          <div>
            <h2 id="consult-title">Ready to start your project?</h2>
            <p>{consultation.body}</p>
            <QuoteButton>Get in touch</QuoteButton>
          </div>
        </div>
      </section>

      <section className="section home-about" aria-labelledby="about-title">
        <div className="shell">
          <h2 id="about-title" className="home-about__title">
            One team for the whole wall
          </h2>
          <div className="home-about__grid">
            <div className="home-about__copy">
              {aboutImages.small ? (
                <Image
                  className="home-about__small"
                  src={aboutImages.small.image}
                  alt={aboutImages.small.alt}
                  width={aboutImages.small.width}
                  height={aboutImages.small.height}
                  sizes="(max-width: 767px) 60vw, 240px"
                  {...blurProps(aboutImages.small.image)}
                />
              ) : null}
              {welcome.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="home-about__links">
                <Link className="mono-link" href="/about/">
                  About us
                  <ArrowRightIcon />
                </Link>
                <Link className="mono-link" href="/locations/adelaide/">
                  Adelaide service area
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>
            {aboutImages.large ? (
              <Image
                className="home-about__large"
                src={aboutImages.large.image}
                alt={aboutImages.large.alt}
                width={aboutImages.large.width}
                height={aboutImages.large.height}
                sizes="(max-width: 767px) 100vw, 45vw"
                {...blurProps(aboutImages.large.image)}
              />
            ) : null}
          </div>
        </div>
      </section>

      <section className="section home-guides" aria-labelledby="home-resources-title">
        <div className="shell">
          <div className="stack-head">
            <h2 id="home-resources-title" className="stack-title">
              Project guides
            </h2>
            <Link className="btn btn--pill" href="/resources/" prefetch={false}>
              All guides
            </Link>
          </div>
          <ul className="people-cards">
            {featuredResourceGuides.map((guide) => (
              <li key={guide.slug}>
                <Image
                  src={guide.image}
                  alt={guide.imageAlt}
                  width={guide.imageWidth}
                  height={guide.imageHeight}
                  sizes="(max-width: 767px) 100vw, 33vw"
                  {...blurProps(guide.image)}
                />
                <h3>
                  <Link href={`/resources/${guide.slug}/`} prefetch={false}>
                    {guide.metaTitle}
                  </Link>
                </h3>
                <p>{guide.category}</p>
                <Link
                  className="mono-link"
                  href={`/resources/${guide.slug}/`}
                  prefetch={false}
                >
                  Read the guide
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section home-faq" aria-labelledby="faq-title">
        <div className="shell">
          <h2 id="faq-title" className="stack-title stack-title--center">
            Common questions
          </h2>
          <div className="faq-accordion">
            {homeFaqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ContactSection withDetails />
    </>
  );
}
