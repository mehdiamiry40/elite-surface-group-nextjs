import Image, { getImageProps } from "next/image";
import Link from "next/link";
import QuoteButton from "@/components/QuoteButton";
import { ArrowRightIcon } from "@/components/icons";
import { heroCopy, heroSlides } from "@/content/home";

export default function Hero() {
  const mobileHeroSizes = "130vw";
  const {
    props: { srcSet: mobileHeroSrcSet },
  } = getImageProps({
    src: heroSlides[0].mobileImage,
    alt: heroSlides[0].alt,
    fill: true,
    sizes: mobileHeroSizes,
    quality: 90,
  });

  return (
    <section className="hero" aria-label="Introduction">
      <picture>
        <source
          media="(max-width: 767px)"
          sizes={mobileHeroSizes}
          srcSet={mobileHeroSrcSet}
        />
        <Image
          className="hero__image"
          src={heroSlides[0].image}
          alt={heroSlides[0].alt}
          fill
          sizes="100vw"
          quality={90}
          loading="eager"
          fetchPriority="high"
        />
      </picture>

      <div className="shell hero__inner">
        <div className="hero__frame">
          <span className="hero__eyebrow">
            <span aria-hidden="true" />
            {heroCopy.eyebrow}
          </span>
          <h1>
            {heroCopy.titleLines.map((line) => (
              <span className="hero__headline-line" key={line}>
                {line}{" "}
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
