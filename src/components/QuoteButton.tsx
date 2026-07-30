"use client";

import { useQuoteDialog } from "@/components/QuoteDialogProvider";

type QuoteButtonProps = {
  className?: string;
  children?: React.ReactNode;
  /** Runs before the dialog opens (e.g. close the mobile drawer first). */
  onBeforeOpen?: () => void;
};

/** Opens the shared quote dialog. */
export default function QuoteButton({
  className = "btn",
  children = "Get a Free Quote",
  onBeforeOpen,
}: QuoteButtonProps) {
  const { open } = useQuoteDialog();

  return (
    <button
      className={className}
      type="button"
      onClick={() => {
        onBeforeOpen?.();
        open();
      }}
    >
      {children}
    </button>
  );
}
