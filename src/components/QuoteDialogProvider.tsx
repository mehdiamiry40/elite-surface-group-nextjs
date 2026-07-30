"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import QuoteDialog from "@/components/QuoteDialog";

type QuoteDialogContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
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

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <QuoteDialogContext.Provider value={value}>
      {children}
      <QuoteDialog open={isOpen} onClose={close} />
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
