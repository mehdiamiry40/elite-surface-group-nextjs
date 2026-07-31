"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import QuoteButton from "@/components/QuoteButton";
import { PhoneIcon } from "@/components/icons";
import { business, heroCopy, heroSlides } from "@/content/site";

const INTERVAL = 6000;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]));

  useEffect(() => {
    if (interactionPaused || manuallyPaused || heroSlides.length < 2) {
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
  }, [interactionPaused, manuallyPaused]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const next = (active + 1) % heroSlides.length;
      setLoaded((current) => {
        if (current.has(next)) {
          return current;
        }
        const updated = new Set(current);
        updated.add(next);
        return updated;
      });
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [active]);

  return (
    <section
      className="hero"
      aria-label="Introduction"
      onMouseEnter={() => setInteractionPaused(true)}
      onMouseLeave={() => setInteractionPaused(false)}
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setInteractionPaused(false);
        }
      }}
    >
      {heroSlides.map((slide, index) =>
        loaded.has(index) ? (
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
              fetchPriority={index === 0 ? "high" : undefined}
              quality={80}
            />
          </div>
        ) : null,
      )}

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
        <div className="hero__controls">
          <div className="hero__dots" role="group" aria-label="Choose slide">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                aria-pressed={index === active}
                aria-label={`Show slide ${index + 1} of ${heroSlides.length}`}
                onClick={() => {
                  setLoaded((current) => new Set(current).add(index));
                  setActive(index);
                }}
              />
            ))}
          </div>
          <button
            className="hero__pause"
            type="button"
            aria-pressed={manuallyPaused}
            onClick={() => setManuallyPaused((current) => !current)}
          >
            {manuallyPaused ? "Play slides" : "Pause slides"}
          </button>
        </div>
      ) : null}
    </section>
  );
}
