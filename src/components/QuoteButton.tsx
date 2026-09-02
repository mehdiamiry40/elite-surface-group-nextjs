"use client";

import type { MouseEvent } from "react";
import {
  preloadQuoteDialog,
  useQuoteDialog,
} from "@/components/QuoteDialogProvider";

type QuoteButtonProps = {
  className?: string;
  children?: React.ReactNode;
  /** Runs once the dialog chunk is ready, immediately before it opens. */
  onBeforeOpen?: () => void;
  /** Overrides the element that receives focus after the dialog closes. */
  restoreFocusTo?: () => HTMLElement | null;
  /** Progressive-enhancement target when JavaScript is unavailable. */
  href?: string;
};

/**
 * Opens the shared quote dialog when hydrated; otherwise navigates to the
 * contact form.
 */
export default function QuoteButton({
  className = "btn",
  children = "Request a Free Quote",
  onBeforeOpen,
  restoreFocusTo,
  href = "/contact-us/#contact",
}: QuoteButtonProps) {
  const { open } = useQuoteDialog();

  async function onClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    const fallbackHref = event.currentTarget.href;
    const restoreTarget = restoreFocusTo?.() ?? event.currentTarget;

    try {
      await open({ beforeOpen: onBeforeOpen, restoreFocusTo: restoreTarget });
    } catch {
      // The anchor remains the no-JavaScript baseline. Use that same real URL
      // when a stale deployment or interrupted network makes the lazy chunk
      // unavailable after hydration.
      window.location.assign(fallbackHref);
    }
  }

  return (
    <a
      className={className}
      href={href}
      onClick={onClick}
      onFocus={preloadQuoteDialog}
      onPointerEnter={preloadQuoteDialog}
    >
      {children}
    </a>
  );
}
