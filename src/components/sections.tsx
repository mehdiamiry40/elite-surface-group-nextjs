import Image from "next/image";
import Link from "next/link";
import QuoteButton from "@/components/QuoteButton";
import ServiceGlyph from "@/components/ServiceGlyph";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import type { Project } from "@/content/projects";
import { services } from "@/content/services";
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
