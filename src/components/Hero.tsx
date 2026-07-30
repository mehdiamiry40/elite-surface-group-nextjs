"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import QuoteButton from "@/components/QuoteButton";
import { PhoneIcon } from "@/components/icons";
import { business, heroCopy, heroSlides } from "@/content/site";

const INTERVAL = 6000;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || heroSlides.length < 2) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      return;
    }

    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % heroSlides.length),
      INTERVAL,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="hero"
      aria-label="Introduction"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      {heroSlides.map((slide, index) => (
        <div
          key={slide.image}
          className="hero__slide"
          data-active={index === active}
          aria-hidden={index !== active}
        >
          <Image
            src={slide.image}
            alt={index === 0 ? slide.alt : ""}
            fill
            sizes="100vw"
            priority={index === 0}
            quality={80}
          />
        </div>
      ))}

      <div className="shell hero__inner">
        <h1>{heroCopy.title}</h1>
        <p>{heroCopy.body}</p>
        <div className="hero__actions">
          <QuoteButton />
          <a className="btn btn--ghost" href={`tel:${business.phone}`}>
            <PhoneIcon />
            Call now
          </a>
        </div>
      </div>

      {heroSlides.length > 1 ? (
        <div className="hero__dots" role="group" aria-label="Choose slide">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              aria-pressed={index === active}
              aria-label={`Show slide ${index + 1} of ${heroSlides.length}`}
              onClick={() => {
                setActive(index);
                setPaused(true);
              }}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
