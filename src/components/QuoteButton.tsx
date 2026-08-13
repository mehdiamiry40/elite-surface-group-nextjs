"use client";

import type { MouseEvent } from "react";
import {
  preloadQuoteDialog,
  useQuoteDialog,
} from "@/components/QuoteDialogProvider";

type QuoteButtonProps = {
  className?: string;
  children?: React.ReactNode;
  /** Runs before the dialog opens (e.g. close the mobile drawer first). */
  onBeforeOpen?: () => void;
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
  href = "/contact-us/#contact",
}: QuoteButtonProps) {
  const { open } = useQuoteDialog();

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
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
    onBeforeOpen?.();
    open();
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
