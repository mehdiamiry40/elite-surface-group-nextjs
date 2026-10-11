import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import type { Project } from "@/content/projects";
import { services, servicesIntro } from "@/content/services";
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
  title = "Cladding, render, Hebel & walling",
  currentSlug,
  compact = true,
}: {
  title?: string;
  currentSlug?: string;
  /** Image-led cards: name only, no intro or summary copy. */
  compact?: boolean;
}) {
  const shown = currentSlug
    ? services.filter((service) => service.slug !== currentSlug)
    : services;

  return (
    <section
      className={`section section--tint services-section${
        compact ? " services-section--compact" : ""
      }`}
    >
      <div className="shell">
        <SectionHead
          eyebrow={currentSlug ? "Related services" : "What we install"}
          title={title}
          intro={compact ? undefined : servicesIntro}
        />
        <ul className={`grid grid--${shown.length === 3 ? "3" : "4"}`}>
          {shown.map((service, index) => (
            <li key={service.slug} className="service-card">
              <Link
                className="service-card__link"
                href={`/${service.slug}`}
                prefetch={false}
              >
                <div className="service-card__media">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    width={480}
                    height={360}
                    sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 280px"
                    {...blurProps(service.image)}
                  />
                </div>
                <div className="service-card__body">
                  <span className="service-card__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{service.name}</h3>
                  {compact ? null : <p>{service.summary}</p>}
                  <span className="service-card__more">
                    Explore service
                    <ArrowRightIcon />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
