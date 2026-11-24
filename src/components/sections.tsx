import Image from "next/image";
import Link from "next/link";
import QuoteButton from "@/components/QuoteButton";
import RichText from "@/components/RichText";
import ServiceGlyph from "@/components/ServiceGlyph";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import type { Project } from "@/content/projects";
import {
  services,
  type ContentSection,
  type ServiceFaq,
} from "@/content/services";
import { blurProps } from "@/lib/lcp-blur";

function projectServiceName(project: Project) {
  return (
    services.find((service) => service.slug === project.service)?.name ??
    project.service
  );
}

export { CtaBand } from "@/components/CtaBand";

/* ------------------------------------------------------------ section head */

export function SectionHead({
  eyebrow,
  title,
  intro,
  id,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  id?: string;
}) {
  return (
    <div className="section-head">
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 id={id}>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  );
}

/* -------------------------------------------------------------- tick lists */

export function TickList({ items }: { items: readonly string[] }) {
  return (
    <ul className="ticks">
      {items.map((item) => (
        <li key={item}>
          <CheckIcon />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------- content sections */

/**
 * Long-form sections from a content module, one band per heading.
 *
 * Bands alternate between plain and tinted so a page with several sections
 * reads as distinct topics rather than one unbroken column. `startTinted`
 * says which the first band is, so the caller can contrast it with whatever
 * sits above.
 */
export function ContentSections({
  sections,
  startTinted = false,
}: {
  sections: readonly ContentSection[];
  startTinted?: boolean;
}) {
  return (
    <>
      {sections.map((section, index) => {
        const tinted = (index % 2 === 0) === startTinted;
        return (
          <section
            key={section.id}
            className={tinted ? "section section--tint" : "section"}
            aria-labelledby={section.id}
          >
            <div className="shell prose">
              <h2 id={section.id}>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>
                  <RichText text={paragraph} />
                </p>
              ))}
              {section.bullets ? <TickList items={section.bullets} /> : null}
              {section.closing?.map((paragraph) => (
                <p key={paragraph}>
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}

/** "On this page" list for a page built from content sections. */
export function SectionContents({
  sections,
  extra = [],
}: {
  sections: readonly ContentSection[];
  /** Further in-page targets listed after the content sections. */
  extra?: readonly { id: string; label: string }[];
}) {
  return (
    <nav className="article-toc" aria-label="On this page">
      <strong>On this page</strong>
      <ol>
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              {section.navLabel ?? section.heading}
            </a>
          </li>
        ))}
        {extra.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* --------------------------------------------------------------- FAQ list */

/** Visible question-and-answer list; pair with `FAQPageSchema` for the same data. */
export function FaqList({ faqs }: { faqs: readonly ServiceFaq[] }) {
  return (
    <dl className="faq-list">
      {faqs.map((faq) => (
        <div key={faq.question} className="faq-list__item">
          <dt>{faq.question}</dt>
          <dd>{faq.answer}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------------------------------------------------------- project links */

export function ProjectLinks({
  items,
  title,
  intro,
  id,
}: {
  items: readonly Project[];
  title: string;
  intro: string;
  id: string;
}) {
  if (!items.length) {
    return null;
  }

  const columns = Math.min(items.length, 3);

  return (
    <section className="section section--tint project-links" aria-labelledby={id}>
      <div className="shell">
        <SectionHead
          eyebrow="Project portfolio"
          title={title}
          intro={intro}
          id={id}
        />
        <ul className={`photo-cards photo-cards--${columns}`}>
          {items.map((project) => (
            <li className="photo-card" key={project.slug}>
              <div className="photo-card__media">
                <Image
                  src={project.image}
                  alt={project.alt}
                  width={project.width}
                  height={project.height}
                  sizes="(max-width: 767px) 100vw, 33vw"
                  {...blurProps(project.image)}
                />
              </div>
              <span>{projectServiceName(project)} project</span>
              <h3>
                <Link href={`/projects/${project.slug}/`}>{project.title}</Link>
              </h3>
              <Link className="text-link" href={`/projects/${project.slug}/`}>
                View project details
                <ArrowRightIcon />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- service cards */

export function ServiceCards({
  title = "Our services",
  currentSlug,
  withCta = false,
}: {
  title?: string;
  currentSlug?: string;
  /** Adds a "Get in touch" quote button under the cards. */
  withCta?: boolean;
}) {
  const shown = currentSlug
    ? services.filter((service) => service.slug !== currentSlug)
    : services;

  return (
    <section className="section services-section">
      <div className="shell">
        <h2 className="stack-title">{title}</h2>
        <ul className={`grid grid--${shown.length === 3 ? "3" : "4"}`}>
          {shown.map((service) => (
            <li key={service.slug} className="service-card">
              <Link
                className="service-card__link"
                href={`/${service.slug}`}
                prefetch={false}
              >
                <ServiceGlyph slug={service.slug} />
                <div className="service-card__body">
                  <h3>{service.name}</h3>
                  <p>{service.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {withCta ? (
          <div className="services-section__cta">
            <QuoteButton>Get in touch</QuoteButton>
          </div>
        ) : null}
      </div>
    </section>
  );
}
