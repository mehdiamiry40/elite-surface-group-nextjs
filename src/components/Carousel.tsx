"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

type CarouselProps = {
  label: string;
  children: ReactNode[];
  /** Slides visible at desktop / tablet / mobile widths. */
  perView?: { desktop: number; tablet: number; mobile: number };
};

function visibleFor(
  width: number,
  perView: NonNullable<CarouselProps["perView"]>,
) {
  if (width <= 767) {
    return perView.mobile;
  }
  if (width <= 1024) {
    return perView.tablet;
  }
  return perView.desktop;
}

/**
 * Minimal slide track: no autoplay, arrow + swipe navigation, and it degrades
 * to a plain list when everything already fits.
 */
export default function Carousel({
  label,
  children,
  perView = { desktop: 3, tablet: 2, mobile: 1 },
}: CarouselProps) {
  const [rawIndex, setIndex] = useState(0);
  const [visible, setVisible] = useState(perView.desktop);
  const pointerStart = useRef<number | null>(null);

  useEffect(() => {
    const measure = () => setVisible(visibleFor(window.innerWidth, perView));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [perView]);

  const maxIndex = Math.max(0, children.length - visible);
  // Derived rather than synced in an effect: a resize that reduces `maxIndex`
  // clamps the position on the very next render, with no intermediate paint at
  // an out-of-range offset.
  const index = Math.min(rawIndex, maxIndex);

  const move = useCallback(
    (direction: 1 | -1) => {
      setIndex((current) =>
        Math.min(maxIndex, Math.max(0, Math.min(current, maxIndex) + direction)),
      );
    },
    [maxIndex],
  );

  const slideWidth = `calc((100% - ${(visible - 1) * 26}px) / ${visible})`;
  const offset = `calc(-${index} * (${slideWidth} + 26px))`;

  return (
    <div className="carousel">
      <div
        className="carousel__viewport"
        onPointerDown={(event) => {
          pointerStart.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (pointerStart.current === null) {
            return;
          }
          const distance = pointerStart.current - event.clientX;
          pointerStart.current = null;
          if (Math.abs(distance) >= 40) {
            move(distance > 0 ? 1 : -1);
          }
        }}
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
      >
        <ul
          className="carousel__track"
          style={{
            transform: `translate3d(${offset}, 0, 0)`,
            ["--slide" as string]: slideWidth,
          }}
        >
          {children.map((child, position) => (
            <li
              key={position}
              className="carousel__item"
              aria-hidden={position < index || position >= index + visible}
            >
              {child}
            </li>
          ))}
        </ul>
      </div>

      {maxIndex > 0 ? (
        <div className="carousel__nav">
          <button
            type="button"
            aria-label={`Previous ${label}`}
            disabled={index === 0}
            onClick={() => move(-1)}
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            aria-label={`Next ${label}`}
            disabled={index === maxIndex}
            onClick={() => move(1)}
          >
            <ChevronRightIcon />
          </button>
        </div>
      ) : null}
    </div>
  );
}
