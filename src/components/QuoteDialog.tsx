"use client";

import EnquiryFields from "@/components/EnquiryFields";
import { useDialog } from "@/components/useDialog";
import { useEnquiryForm } from "@/components/useEnquiryForm";

type QuoteDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function QuoteDialog({ open, onClose }: QuoteDialogProps) {
  const { submit, pending, status } = useEnquiryForm();
  const dialogRef = useDialog(open, onClose);

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
        <h2 id="quote-dialog-title">Get a Free Quote</h2>
        <form className="form form--2col" onSubmit={submit} noValidate={false}>
          <EnquiryFields
            idPrefix="quote"
            pending={pending}
            status={status}
            submitLabel="Send"
          />
        </form>
      </div>
    </div>
  );
}
