"use client";

import EnquiryFields from "@/components/EnquiryFields";
import { useEnquiryForm } from "@/components/useEnquiryForm";

type EnquiryFormProps = {
  /** Prefixes field ids so two forms can coexist on one page. */
  idPrefix: string;
  /** Prefills the service dropdown on service pages. */
  defaultService?: string;
};

/**
 * The interactive half of the contact section.
 *
 * Kept separate from ContactSection so the surrounding heading and contact
 * details stay on the server: only the form itself is shipped and hydrated.
 */
export default function EnquiryForm({
  idPrefix,
  defaultService,
}: EnquiryFormProps) {
  const { submit, pending, status } = useEnquiryForm();

  return (
    <form
      className="form form--2col"
      action="/api/contact/"
      method="post"
      onSubmit={submit}
    >
      <EnquiryFields
        idPrefix={idPrefix}
        pending={pending}
        status={status}
        defaultService={defaultService}
      />
    </form>
  );
}
