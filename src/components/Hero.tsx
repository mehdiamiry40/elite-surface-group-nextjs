import Image, { getImageProps } from "next/image";
import { preload } from "react-dom";
import QuoteButton from "@/components/QuoteButton";
import { PhoneIcon } from "@/components/icons";
import { business } from "@/content/business";
import { heroCopy, heroSlides } from "@/content/home";
import { blurProps } from "@/lib/lcp-blur";

const HERO_SIZES = "(max-width: 1280px) 100vw, 1220px";
const HERO_QUALITY = 75;

export default function Hero() {
  const slide = heroSlides[0];
  const shared = {
    alt: slide.alt,
    fill: true,
    sizes: HERO_SIZES,
    quality: HERO_QUALITY,
  } as const;

  const { props: desktop } = getImageProps({ ...shared, src: slide.image });
  const { props: mobile } = getImageProps({
    ...shared,
    src: slide.mobileImage,
  });

  // `priority` on the <img> would preload the desktop source with no media
  // query, so phones would download both crops. Art-directed preloads keep
  // LCP to a single photograph.
  preload(desktop.src, {
    as: "image",
    imageSrcSet: desktop.srcSet,
    imageSizes: desktop.sizes,
    media: "(min-width: 768px)",
    fetchPriority: "high",
  });
  preload(mobile.src, {
    as: "image",
    imageSrcSet: mobile.srcSet,
    imageSizes: mobile.sizes,
    media: "(max-width: 767px)",
    fetchPriority: "high",
  });

  return (
    <section className="hero" aria-label="Introduction">
      <div className="shell">
        <h1>
          {/* Inline spans, not blocks: the authored break is the preferred
              one, but a line that no longer fits rebalances instead of
              overflowing or orphaning its last word. */}
          {heroCopy.titleLines.map((line, index) => (
            <span className="hero__headline-line" key={line}>
              {index > 0 ? " " : null}
              {line}
            </span>
          ))}
        </h1>

        <div className="hero__media">
          <picture>
            <source
              media="(max-width: 767px)"
              sizes={mobile.sizes}
              srcSet={mobile.srcSet}
            />
            <Image
              className="hero__image"
              src={slide.image}
              alt={slide.alt}
              fill
              sizes={HERO_SIZES}
              quality={HERO_QUALITY}
              loading="eager"
              fetchPriority="high"
              {...blurProps(slide.image)}
            />
          </picture>
        </div>

        <div className="hero__foot">
          <p>{heroCopy.body}</p>
          <div className="hero__actions">
            <QuoteButton>Get a free quote</QuoteButton>
            {/* The header hides the phone number below 1024px, so the hero
                carries the tap-to-call for high-intent mobile visitors. */}
            <a className="hero__call" href={`tel:${business.phone}`}>
              <PhoneIcon size={16} />
              <span>{business.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
