import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import QuoteButton from "@/components/QuoteButton";
import { ArrowRightIcon, CheckIcon, StarIcon } from "@/components/icons";
import {
  ctaBand,
  services,
  servicesIntro,
  testimonials,
  testimonialsSection,
} from "@/content/site";

/* ------------------------------------------------------------ section head */

export function SectionHead({
  eyebrow,
  titleAccent,
  title,
  intro,
  id,
}: {
  eyebrow?: string;
  titleAccent?: string;
  title: string;
  intro?: string;
  id?: string;
}) {
  return (
    <div className="section-head">
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 id={id}>
        {titleAccent ? <span className="accent">{titleAccent} </span> : null}
        {title}
      </h2>
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
  titleAccent = "Our",
  title = "Services",
  currentSlug,
}: {
  titleAccent?: string;
  title?: string;
  currentSlug?: string;
}) {
  const shown = currentSlug
    ? services.filter((service) => service.slug !== currentSlug)
    : services;

  return (
    <section className="section section--tint">
      <div className="shell">
        <SectionHead
          titleAccent={titleAccent}
          title={title}
          intro={servicesIntro}
        />
        <ul className={`grid grid--${shown.length === 3 ? "3" : "4"}`}>
          {shown.map((service) => (
            <li key={service.slug} className="service-card">
              <div className="service-card__media">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  width={400}
                  height={500}
                  sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 280px"
                  quality={78}
                />
              </div>
              <div className="service-card__body">
                <h3>
                  <Link href={`/${service.slug}`}>{service.name}</Link>
                </h3>
                <p>{service.summary}</p>
                <Link
                  className="service-card__more"
                  href={`/${service.slug}`}
                  aria-label={`Read more about ${service.name}`}
                >
                  <ArrowRightIcon />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ testimonials */

export function Testimonials() {
  return (
    <section
      className="testimonials"
      style={{ backgroundImage: `url(${testimonialsSection.background})` }}
      aria-labelledby="testimonials-title"
      id="testimonials"
    >
      <div className="shell">
        <SectionHead
          eyebrow={testimonialsSection.eyebrow}
          title={testimonialsSection.title}
          intro={testimonialsSection.intro}
          id="testimonials-title"
        />
        <Carousel label="testimonial">
          {testimonials.map((item) => (
            <figure className="quote" key={item.name}>
              <div className="quote__stars" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }, (_, index) => (
                  <StarIcon key={index} />
                ))}
              </div>
              <blockquote>
                <p>{item.quote}</p>
              </blockquote>
              <figcaption>
                <h3>{item.name}</h3>
              </figcaption>
            </figure>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- cta band */

export function CtaBand() {
  return (
    <section
      className="cta"
      style={{ backgroundImage: `url(${ctaBand.background})` }}
      aria-labelledby="cta-title"
    >
      <div className="shell cta__inner">
        <div>
          <h2 id="cta-title">{ctaBand.title}</h2>
          <p>{ctaBand.body}</p>
        </div>
        <div className="cta__aside">
          <QuoteButton />
          <p>{ctaBand.note}</p>
        </div>
      </div>
    </section>
  );
}
