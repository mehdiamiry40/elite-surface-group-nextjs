"use client";

import { useRef, type ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";

/**
 * Horizontal scroll-snap list with previous/next buttons. The list stays a
 * native scroller, so touch, trackpad and keyboard (via the links inside)
 * keep working without JavaScript; the buttons step one card at a time.
 */
export default function ScrollStrip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const listRef = useRef<HTMLUListElement>(null);

  function step(direction: 1 | -1) {
    const list = listRef.current;
    const first = list?.firstElementChild as HTMLElement | null;
    if (!list || !first) {
      return;
    }
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    list.scrollBy({
      left: direction * (first.offsetWidth + gap),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <div className="scroll-strip">
      <ul ref={listRef} className="project-strip" aria-label={label}>
        {children}
      </ul>
      <div className="scroll-strip__nav">
        <button
          type="button"
          className="round-btn round-btn--prev"
          aria-label={`Previous ${label.toLowerCase()}`}
          onClick={() => step(-1)}
        >
          <ArrowRightIcon size={22} />
        </button>
        <button
          type="button"
          className="round-btn"
          aria-label={`Next ${label.toLowerCase()}`}
          onClick={() => step(1)}
        >
          <ArrowRightIcon size={22} />
        </button>
      </div>
    </div>
  );
}
