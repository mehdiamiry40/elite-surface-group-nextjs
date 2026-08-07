import Image from "next/image";
import Link from "next/link";
import QuoteButton from "@/components/QuoteButton";
import { ArrowRightIcon } from "@/components/icons";
import { heroCopy, heroSlides } from "@/content/home";

export default function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <Image
        className="hero__image"
        src={heroSlides[0].image}
        alt={heroSlides[0].alt}
        fill
        sizes="100vw"
        priority
        fetchPriority="high"
      />

      <div className="shell hero__inner">
        <div className="hero__frame">
          <span className="hero__eyebrow">
            <span aria-hidden="true" />
            {heroCopy.eyebrow}
          </span>
          <h1>
            {heroCopy.titleLines.map((line) => (
              <span className="hero__headline-line" key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p>{heroCopy.body}</p>
          <div className="hero__actions">
            <QuoteButton>Request a free quote</QuoteButton>
            <Link className="btn btn--hero-link" href="/services/">
              Explore our services
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
