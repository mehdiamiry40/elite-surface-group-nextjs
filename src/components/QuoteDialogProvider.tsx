"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type QuoteDialogModule = typeof import("@/components/QuoteDialog");
type QuoteDialogComponent = QuoteDialogModule["default"];

let quoteDialogPromise: Promise<QuoteDialogModule> | null = null;

function loadQuoteDialog() {
  if (!quoteDialogPromise) {
    quoteDialogPromise = import("@/components/QuoteDialog").catch((error) => {
      // A failed asset request must not poison every later attempt. The click
      // handler will use the real contact-page link for this attempt, while a
      // later interaction gets a fresh chunk request.
      quoteDialogPromise = null;
      throw error;
    });
  }

  return quoteDialogPromise;
}

export function preloadQuoteDialog() {
  // Intent-based preloading is optional. The activation path awaits the same
  // promise and owns the visible fallback if this request fails.
  void loadQuoteDialog().catch(() => undefined);
}

type OpenQuoteDialogOptions = {
  /** Runs only after the dialog chunk is ready (for example, close a drawer). */
  beforeOpen?: () => void;
  /** Visible element that should receive focus when the dialog closes. */
  restoreFocusTo?: HTMLElement | null;
};

type QuoteDialogContextValue = {
  open: (options?: OpenQuoteDialogOptions) => Promise<void>;
};

const QuoteDialogContext = createContext<QuoteDialogContextValue | null>(null);

/**
 * Holds the "Get a Free Quote" dialog once for the whole app so any button on
 * any page can open it without each page mounting its own copy.
 */
export function QuoteDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [Dialog, setDialog] = useState<QuoteDialogComponent | null>(null);
  const [restoreFocusTo, setRestoreFocusTo] = useState<HTMLElement | null>(null);

  const open = useCallback(async (options?: OpenQuoteDialogOptions) => {
    const loadedDialog = await loadQuoteDialog();

    options?.beforeOpen?.();
    setRestoreFocusTo(options?.restoreFocusTo ?? null);
    // A component function passed directly to a state setter is treated as an
    // updater, so wrap it to store the function itself.
    setDialog(() => loadedDialog.default);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <QuoteDialogContext.Provider value={value}>
      {children}
      {isOpen && Dialog ? (
        <Dialog
          open
          onClose={close}
          restoreFocusTo={restoreFocusTo}
        />
      ) : null}
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
