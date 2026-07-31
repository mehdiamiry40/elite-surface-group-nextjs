"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useDialog } from "@/components/useDialog";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import type { Project } from "@/content/projects";

type ProjectGalleryProps = {
  items: readonly Project[];
};

export default function ProjectGallery({ items }: ProjectGalleryProps) {
  const [active, setActive] = useState<number | null>(null);
  const open = active !== null;

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (direction: 1 | -1) =>
      setActive((current) =>
        current === null
          ? null
          : (current + direction + items.length) % items.length,
      ),
    [items.length],
  );

  const dialogRef = useDialog(open, close, step);
  const current = active === null ? null : items[active];

  return (
    <>
      <ul className="gallery">
        {items.map((item, index) => (
          <li key={item.image}>
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Enlarge project image: ${item.alt}`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 380px"
              />
            </button>
            <div className="gallery__caption">
              <h3>
                <Link href={`/projects/${item.slug}/`}>{item.title}</Link>
              </h3>
              <p>{item.summary}</p>
              <p>
                <Link href={`/projects/${item.slug}/`}>View case study</Link>
                {" · "}
                <Link href={`/${item.service}/`}>
                  View {item.service} services
                </Link>
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div
        className="lightbox"
        hidden={!open}
        role="presentation"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            close();
          }
        }}
      >
        <div
          ref={dialogRef}
          className="lightbox__figure"
          role="dialog"
          aria-modal="true"
          aria-label={current ? current.alt : "Project image"}
        >
          <button
            className="lightbox__btn lightbox__close"
            type="button"
            aria-label="Close image"
            onClick={close}
          >
            ×
          </button>

          {items.length > 1 ? (
            <>
              <span className="lightbox__counter" aria-live="polite">
                {(active ?? 0) + 1} / {items.length}
              </span>
              <button
                className="lightbox__btn lightbox__prev"
                type="button"
                aria-label="Previous image"
                onClick={() => step(-1)}
              >
                <ChevronLeftIcon size={22} />
              </button>
              <button
                className="lightbox__btn lightbox__next"
                type="button"
                aria-label="Next image"
                onClick={() => step(1)}
              >
                <ChevronRightIcon size={22} />
              </button>
            </>
          ) : null}

          {current ? (
            <Image
              src={current.image}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="92vw"
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
