"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Modal plumbing shared by the quote dialog and the project lightbox: locks
 * body scroll, closes on Escape, keeps Tab inside the dialog, and restores
 * focus to whatever opened it.
 */
export function useDialog(
  open: boolean,
  onClose: () => void,
  /** Optional left/right handler; must be stable (wrap in `useCallback`). */
  onArrow?: (direction: 1 | -1) => void,
) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    if (document.activeElement instanceof HTMLElement) {
      restoreRef.current = document.activeElement;
    }

    document.body.classList.add("is-locked");

    const frame = window.requestAnimationFrame(() => {
      const dialog = dialogRef.current;
      if (!dialog) {
        return;
      }
      const target =
        dialog.querySelector<HTMLElement>("input, textarea, select") ??
        dialog.querySelector<HTMLElement>(FOCUSABLE);
      target?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (onArrow && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
        event.preventDefault();
        onArrow(event.key === "ArrowRight" ? 1 : -1);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;
      if (!dialog) {
        return;
      }

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((element) => element.offsetParent !== null);

      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("is-locked");
      restoreRef.current?.focus();
    };
  }, [open, onClose, onArrow]);

  return dialogRef;
}
