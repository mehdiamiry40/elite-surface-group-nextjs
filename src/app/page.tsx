import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import {
  Checklist,
  ComparisonTable,
  DecisionGuide,
} from "@/components/ContentBlocks";
import Hero from "@/components/Hero";
import { FAQPageSchema } from "@/components/JsonLd";
import QuoteButton from "@/components/QuoteButton";
import ScrollStrip from "@/components/ScrollStrip";
import { ArrowRightIcon } from "@/components/icons";
import { ServiceCards } from "@/components/sections";
import { consultation, welcome } from "@/content/home";
import { getLocation } from "@/content/locations";
import {
  enquiryChecklist,
  projectPlanningPage,
} from "@/content/project-planning";
import { projectCards } from "@/content/projects";
import { featuredResourceGuides } from "@/content/resources";
import {
  homeServiceDecisions,
  serviceComparison,
} from "@/content/service-comparison";
import { services, type ServiceFaq } from "@/content/services";
import { blurProps } from "@/lib/lcp-blur";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  description:
    "Cladding, render, Hebel and walling for homes and commercial projects across Adelaide and South Australia. Request an obligation-free quote.",
  path: "/",
});

// One question from each service page, the most common planning one, and the
// coverage question from the Adelaide page. Each is the published question and
// answer, unchanged. The same array feeds the accordion and the FAQPage
// schema, so the markup always matches what is on the page.
const adelaideCoverageFaq = getLocation("adelaide")?.faqs[0];
const homeFaqs: readonly ServiceFaq[] = [
  ...services.map((service) => service.faqs[0]),
  projectPlanningPage.faqs[0],
  ...(adelaideCoverageFaq ? [adelaideCoverageFaq] : []),
];

const aboutImages = {
  small: projectCards.find((p) => p.slug === "rendered-window-reveal-detail"),
  large: projectCards.find((p) => p.slug === "two-storey-exterior-render"),
};

export default function HomePage() {
  return (
    <>
      <FAQPageSchema faqs={homeFaqs} />
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

      <section
        className="section section--tint home-compare"
        aria-labelledby="compare-title"
      >
        <div className="shell">
          <div className="stack-head">
            <h2 id="compare-title" className="stack-title">
              Which service fits your wall?
            </h2>
            <Link className="btn btn--pill" href="/services/">
              Compare in detail
            </Link>
          </div>
          <div className="prose">
            <p>
              Cladding, render, Hebel and walling are four different jobs that
              often meet on the same wall. This table shows what each one
              covers and where it is typically used. It lists no prices,
              because a price follows the wall rather than a rate card.
            </p>
          </div>
          <ComparisonTable {...serviceComparison} />

          <div className="prose">
            <h3 id="choose-title">
              When to choose cladding, render, Hebel or walling
            </h3>
            <p>
              Most enquiries start from a situation rather than a service.
              These are four common ones, with what usually suits and what
              still has to be confirmed on the wall itself.
            </p>
          </div>
          <DecisionGuide
            caption="Common situations and the service that usually suits"
            rows={homeServiceDecisions}
          />
        </div>
      </section>

      <section className="section home-prequote" aria-labelledby="prequote-title">
        <div className="shell">
          <div className="stack-head">
            <h2 id="prequote-title" className="stack-title">
              Before you ask for a quote
            </h2>
            <Link className="btn btn--pill" href="/project-planning/">
              Full planning checklist
            </Link>
          </div>
          <div className="prose">
            <p>
              Six details give us a clear picture of the job. You do not need
              all of them to get in touch, and the{" "}
              <Link href="/project-planning/">project planning page</Link> goes
              through each one.
            </p>
          </div>
          <Checklist items={enquiryChecklist} columns={2} />
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
