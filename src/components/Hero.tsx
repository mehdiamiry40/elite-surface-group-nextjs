import Image from "next/image";
import QuoteButton from "@/components/QuoteButton";
import { PhoneIcon } from "@/components/icons";
import { business } from "@/content/business";
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
        <span className="hero__eyebrow">{heroCopy.eyebrow}</span>
        <h1>{heroCopy.title}</h1>
        <p>{heroCopy.body}</p>
        <div className="hero__actions">
          <QuoteButton>Request a quote</QuoteButton>
          <a className="btn btn--ghost" href={`tel:${business.phone}`}>
            <PhoneIcon />
            Call {business.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
