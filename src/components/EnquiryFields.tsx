"use client";

import { serviceOptions, type EnquiryStatus } from "@/components/useEnquiryForm";

type EnquiryFieldsProps = {
  /** Prefixes field ids so the two forms can coexist on one page. */
  idPrefix: string;
  pending: boolean;
  status: EnquiryStatus;
  submitLabel?: string;
};

/**
 * The enquiry fields, shared by the contact section and the quote dialog.
 *
 * `company` is a honeypot — it is visually hidden and the API treats any
 * submission that fills it as spam.
 */
export default function EnquiryFields({
  idPrefix,
  pending,
  status,
  submitLabel = "Send enquiry",
}: EnquiryFieldsProps) {
  const id = (name: string) => `${idPrefix}-${name}`;

  return (
    <>
      <div className="field">
        <label htmlFor={id("first-name")}>First name</label>
        <input
          id={id("first-name")}
          name="firstName"
          autoComplete="given-name"
          maxLength={60}
          required
        />
      </div>

      <div className="field">
        <label htmlFor={id("last-name")}>Last name</label>
        <input
          id={id("last-name")}
          name="lastName"
          autoComplete="family-name"
          maxLength={59}
        />
      </div>

      <div className="field">
        <label htmlFor={id("email")}>Email</label>
        <input
          id={id("email")}
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          required
        />
      </div>

      <div className="field">
        <label htmlFor={id("phone")}>Phone number</label>
        <input
          id={id("phone")}
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={50}
        />
      </div>

      <div className="field field--full">
        <label htmlFor={id("service")}>Service needed</label>
        <select id={id("service")} name="service" defaultValue={serviceOptions[0]}>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="field field--full">
        <label htmlFor={id("message")}>Project details</label>
        <textarea
          id={id("message")}
          name="message"
          rows={4}
          maxLength={5000}
          required
        />
      </div>

      <div className="field field--hidden" aria-hidden="true">
        <label htmlFor={id("company")}>Company</label>
        <input
          id={id("company")}
          name="company"
          tabIndex={-1}
          autoComplete="off"
          maxLength={120}
        />
      </div>

      {status ? (
        <p className="form__status" data-state={status.state} role="status">
          {status.message}
        </p>
      ) : null}

      <button className="btn form__submit" type="submit" disabled={pending}>
        {pending ? "Sending…" : submitLabel}
      </button>
    </>
  );
}
