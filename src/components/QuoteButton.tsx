"use client";

import { useQuoteDialog } from "@/components/QuoteDialogProvider";

type QuoteButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

/** Opens the shared quote dialog. */
export default function QuoteButton({
  className = "btn",
  children = "Get a Free Quote",
}: QuoteButtonProps) {
  const { open } = useQuoteDialog();

  return (
    <button className={className} type="button" onClick={open}>
      {children}
    </button>
  );
}
