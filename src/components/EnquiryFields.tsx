"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { serviceOptions, type EnquiryStatus } from "@/components/useEnquiryForm";
import {
  projectTimingOptions,
  projectTypeOptions,
} from "@/content/enquiry";
import { SPAM_TRAP_FIELD } from "@/lib/contact-submission";

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
 * The last field is a spam trap: hidden from visitors, named so that browsers
 * and password managers have no reason to fill it, and marked for the common
 * managers to skip. The API delivers an enquiry that fills it with a
 * "possible spam" flag — it does not discard it.
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
          maxLength={60}
          required
        />
      </div>

      <div className="field">
        <label htmlFor={id("last-name")}>Last name (optional)</label>
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
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          maxLength={254}
          required
        />
      </div>

      <div className="field">
        <label htmlFor={id("phone")}>Phone number (optional)</label>
        <input
          id={id("phone")}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={50}
        />
      </div>

      <div className="field">
        <label htmlFor={id("service")}>Service needed (optional)</label>
        <select
          key={`${pathname}:${selected}`}
          id={id("service")}
          name="service"
          autoComplete="off"
          defaultValue={selected}
        >
          <option value="">Select…</option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor={id("project-type")}>Project type (optional)</label>
        <select
          id={id("project-type")}
          name="projectType"
          autoComplete="off"
          defaultValue=""
        >
          <option value="">Select…</option>
          {projectTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor={id("project-location")}>
          Suburb or postcode (optional)
        </label>
        <input
          id={id("project-location")}
          name="projectArea"
          autoComplete="off"
          maxLength={120}
        />
      </div>

      <div className="field">
        <label htmlFor={id("target-start")}>Target timing (optional)</label>
        <select
          id={id("target-start")}
          name="projectTiming"
          autoComplete="off"
          defaultValue=""
        >
          <option value="">Select…</option>
          {projectTimingOptions.map((option) => (
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
          placeholder="The work, access, plans or site details"
          required
        />
      </div>

      <input type="hidden" name="sourcePath" value={pathname} />

      <div className="field field--hidden" aria-hidden="true">
        <label htmlFor={id("enquiry-check")}>Leave this field empty</label>
        <input
          id={id("enquiry-check")}
          name={SPAM_TRAP_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          maxLength={120}
          data-1p-ignore
          data-lpignore="true"
          data-bwignore
          data-form-type="other"
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
        We use the contact and project details you enter to respond to your
        enquiry and manage any resulting quote. See our{" "}
        <Link href="/privacy-policy/">Privacy Policy</Link>.
      </p>
    </>
  );
}
