import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { services, servicesIntro } from "@/content/services";

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

/* ----------------------------------------------------------- service cards */

export function ServiceCards({
  title = "Cladding, render, Hebel & walling",
  currentSlug,
}: {
  title?: string;
  currentSlug?: string;
}) {
  const shown = currentSlug
    ? services.filter((service) => service.slug !== currentSlug)
    : services;

  return (
    <section className="section section--tint services-section">
      <div className="shell">
        <SectionHead
          eyebrow={currentSlug ? "Related services" : "What we install"}
          title={title}
          intro={servicesIntro}
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
                  />
                </div>
                <div className="service-card__body">
                  <span className="service-card__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{service.name}</h3>
                  <p>{service.summary}</p>
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
