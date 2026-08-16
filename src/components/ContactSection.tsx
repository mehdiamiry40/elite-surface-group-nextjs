"use client";

import EnquiryFields from "@/components/EnquiryFields";
import { useEnquiryForm } from "@/components/useEnquiryForm";
import { MailIcon, PhoneIcon } from "@/components/icons";
import { business } from "@/content/business";
import { contactSection } from "@/content/pages";

type ContactSectionProps = {
  /** Renders the contact details column beside the form. */
  withDetails?: boolean;
  intro?: string;
  /** Prefills the service dropdown on service pages. */
  defaultService?: string;
};

export default function ContactSection({
  withDetails = false,
  intro = contactSection.intro,
  defaultService,
}: ContactSectionProps) {
  const { submit, pending, status } = useEnquiryForm();

  return (
    <section
      className="section section--contact"
      aria-labelledby="contact-title"
      id="contact"
    >
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">{contactSection.eyebrow}</span>
          <h2 id="contact-title">{contactSection.title}</h2>
          <p>{intro}</p>
        </div>

        <div className={withDetails ? "split" : "contact-form-wrap"}>
          {withDetails ? (
            <div className="split__body">
              <h3>Contact our Salisbury East team</h3>
              <p>
                We’re based in Salisbury East. Call or email us with your
                suburb, plans and a short description of the work.
              </p>
              {/* A <dl> may only contain dt/dd (optionally wrapped in a single
                  div per group), so the icon lives inside the group div rather
                  than as a sibling of dt/dd. */}
              <address className="contact-details">
                <dl className="contact-list">
                  <div className="contact-list__row">
                    <span className="contact-list__icon" aria-hidden="true">
                      <PhoneIcon />
                    </span>
                    <dt>Phone</dt>
                    <dd>
                      <a href={`tel:${business.phone}`}>
                        {business.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                  <div className="contact-list__row">
                    <span className="contact-list__icon" aria-hidden="true">
                      <MailIcon />
                    </span>
                    <dt>Email</dt>
                    <dd>
                      <a href={`mailto:${business.email}`}>{business.email}</a>
                    </dd>
                  </div>
                  <div className="contact-list__row contact-list__row--plain">
                    <dt>Service area</dt>
                    <dd>{business.area}</dd>
                  </div>
                  <div className="contact-list__row contact-list__row--plain">
                    <dt>Hours</dt>
                    <dd>{business.hours.display}</dd>
                  </div>
                </dl>
              </address>
            </div>
          ) : null}

          <div className="form-card">
            <div className="form-card__head">
              <h3>{contactSection.formTitle}</h3>
              <p>{contactSection.formNote}</p>
            </div>
            <form
              className="form form--2col"
              action="/api/contact/"
              method="post"
              onSubmit={submit}
            >
              <EnquiryFields
                idPrefix="contact"
                pending={pending}
                status={status}
                defaultService={defaultService}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
