"use client";

import { usePathname } from "next/navigation";
import EnquiryFields from "@/components/EnquiryFields";
import { useDialog } from "@/components/useDialog";
import { useEnquiryForm } from "@/components/useEnquiryForm";
import { defaultEnquiryService } from "@/content/enquiry";

type QuoteDialogProps = {
  open: boolean;
  onClose: () => void;
  restoreFocusTo?: HTMLElement | null;
};

export default function QuoteDialog({
  open,
  onClose,
  restoreFocusTo,
}: QuoteDialogProps) {
  const { submit, pending, status } = useEnquiryForm();
  const dialogRef = useDialog(open, onClose, undefined, restoreFocusTo);
  const pathname = usePathname();
  const defaultService = defaultEnquiryService(pathname);

  return (
    <div
      className="modal__scrim"
      hidden={!open}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-dialog-title"
      >
        <button
          className="modal__close"
          type="button"
          aria-label="Close quote form"
          onClick={onClose}
        >
          ×
        </button>
        <h2 id="quote-dialog-title">Request an Obligation-Free Quote</h2>
        <form
          className="form form--2col"
          action="/api/contact/"
          method="post"
          onSubmit={submit}
        >
          <EnquiryFields
            idPrefix="quote"
            pending={pending}
            status={status}
            submitLabel="Send enquiry"
            defaultService={defaultService}
          />
        </form>
      </div>
    </div>
  );
}
