"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { serviceOptions, type EnquiryStatus } from "@/components/useEnquiryForm";

type EnquiryFieldsProps = {
  /** Prefixes field ids so the two forms can coexist on one page. */
  idPrefix: string;
  pending: boolean;
  status: EnquiryStatus;
  submitLabel?: string;
  /** Prefills the service select (e.g. on a service page). */
  defaultService?: string;
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
  defaultService,
}: EnquiryFieldsProps) {
  const id = (name: string) => `${idPrefix}-${name}`;
  const pathname = usePathname();
  const selected =
    defaultService && serviceOptions.includes(defaultService)
      ? defaultService
      : "";

  return (
    <>
      <div className="field">
        <label htmlFor={id("first-name")}>First name</label>
        <input
          id={id("first-name")}
          name="firstName"
          autoComplete="given-name"
          placeholder="Alex"
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
          placeholder="Nguyen"
          maxLength={59}
        />
      </div>

      <div className="field">
        <label htmlFor={id("email")}>Email</label>
        <input
          id={id("email")}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          placeholder="you@example.com"
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
          inputMode="tel"
          autoComplete="tel"
          placeholder="0413 844 912"
          maxLength={50}
        />
      </div>

      <div className="field field--full">
        <label htmlFor={id("service")}>Service needed</label>
        <select
          key={`${pathname}:${selected}`}
          id={id("service")}
          name="service"
          autoComplete="off"
          defaultValue={selected}
        >
          <option value="">Choose a service / not sure yet</option>
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
          placeholder="Tell us the suburb, property type, timing and work you have in mind."
          required
        />
      </div>

      <input type="hidden" name="sourcePath" value={pathname} />

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
        <p
          className="form__status"
          data-state={status.state}
          role={status.state === "error" ? "alert" : "status"}
          aria-live={status.state === "error" ? "assertive" : "polite"}
        >
          {status.message}
          {status.mailto ? (
            <>
              {" "}
              <a href={status.mailto}>Continue in your email app</a>.
            </>
          ) : null}
        </p>
      ) : null}

      <button className="btn form__submit" type="submit" disabled={pending}>
        {pending ? "Sending…" : submitLabel}
      </button>
      <p className="form__privacy">
        We’ll only use your details to respond to this enquiry. See our{" "}
        <Link href="/privacy-policy/">Privacy Policy</Link>.
      </p>
    </>
  );
}
