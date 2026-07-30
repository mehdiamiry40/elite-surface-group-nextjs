"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Nested overlays (mobile drawer + quote dialog) both need body scroll lock.
 * A simple counter keeps the class on until the last overlay closes.
 */
let scrollLocks = 0;

function lockScroll() {
  scrollLocks += 1;
  document.body.classList.add("is-locked");
}

function unlockScroll() {
  scrollLocks = Math.max(0, scrollLocks - 1);
  if (scrollLocks === 0) {
    document.body.classList.remove("is-locked");
  }
}

function anotherModalIsOpen(except: HTMLElement | null) {
  return [...document.querySelectorAll<HTMLElement>('[aria-modal="true"]')].some(
    (element) =>
      element !== except &&
      !element.hasAttribute("hidden") &&
      element.getClientRects().length > 0,
  );
}

/**
 * Modal plumbing shared by the quote dialog, mobile drawer and project
 * lightbox: locks body scroll, closes on Escape, keeps Tab inside the dialog,
 * and restores focus to whatever opened it.
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

    lockScroll();

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
      ).filter((element) => {
        if (element.closest("[hidden]")) {
          return false;
        }
        return element.getClientRects().length > 0;
      });

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
    const dialogNode = dialogRef.current;

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      unlockScroll();
      // Another overlay (quote dialog) may have opened while this one closed —
      // leave focus alone so it can take over.
      if (!anotherModalIsOpen(dialogNode)) {
        restoreRef.current?.focus();
      }
    };
  }, [open, onClose, onArrow]);

  return dialogRef;
}
