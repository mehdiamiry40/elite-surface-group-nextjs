"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const loadQuoteDialog = () => import("@/components/QuoteDialog");

export function preloadQuoteDialog() {
  // Preloading is an optional latency improvement. A transient chunk failure
  // must not surface as an unhandled rejection; opening still uses the
  // dynamic loader's normal load/error behaviour.
  void loadQuoteDialog().catch(() => undefined);
}

const QuoteDialog = dynamic(loadQuoteDialog, {
  ssr: false,
});

type QuoteDialogContextValue = {
  open: () => void;
};

const QuoteDialogContext = createContext<QuoteDialogContextValue | null>(null);

/**
 * Holds the "Get a Free Quote" dialog once for the whole app so any button on
 * any page can open it without each page mounting its own copy.
 */
export function QuoteDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <QuoteDialogContext.Provider value={value}>
      {children}
      {isOpen ? <QuoteDialog open onClose={close} /> : null}
    </QuoteDialogContext.Provider>
  );
}

export function useQuoteDialog() {
  const context = useContext(QuoteDialogContext);
  if (!context) {
    throw new Error("useQuoteDialog must be used inside QuoteDialogProvider");
  }
  return context;
}
