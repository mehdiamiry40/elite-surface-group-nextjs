"use client";

import EnquiryFields from "@/components/EnquiryFields";
import { useEnquiryForm } from "@/components/useEnquiryForm";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
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
    <section className="section" aria-labelledby="contact-title" id="contact">
      <div className="shell">
        <div className="section-head">
          <span className="eyebrow">{contactSection.eyebrow}</span>
          <h2 id="contact-title">{contactSection.title}</h2>
          <p>{intro}</p>
        </div>

        <div className={withDetails ? "split" : undefined}>
          {withDetails ? (
            <div className="split__body">
              <h3>Talk to us directly</h3>
              <p>
                Prefer to speak to someone? Call or email and we will get
                straight back to you.
              </p>
              {/* A <dl> may only contain dt/dd (optionally wrapped in a single
                  div per group), so the icon lives inside the group div rather
                  than as a sibling of dt/dd. */}
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
                <div className="contact-list__row">
                  <span className="contact-list__icon" aria-hidden="true">
                    <PinIcon />
                  </span>
                  <dt>Service area</dt>
                  <dd>{business.area}</dd>
                </div>
              </dl>
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
