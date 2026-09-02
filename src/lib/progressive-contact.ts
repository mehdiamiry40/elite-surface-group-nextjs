export type ProgressiveContactFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  projectType: string;
  projectArea: string;
  projectTiming: string;
  message: string;
  sourcePath: string;
  submissionId: string;
};

type ProgressiveContactPageOptions = {
  fields: ProgressiveContactFields;
  message: string;
  mailto?: string;
  serviceOptions: readonly string[];
  projectTypeOptions: readonly string[];
  projectTimingOptions: readonly string[];
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessPhoneDisplay: string;
};

type ProgressiveContactReceivedOptions = Pick<
  ProgressiveContactPageOptions,
  "message" | "businessName" | "businessPhone" | "businessPhoneDisplay"
>;

export const progressiveContactHeaders = {
  "Cache-Control": "private, no-store, max-age=0",
  Pragma: "no-cache",
  "Referrer-Policy": "no-referrer",
  "Content-Type": "text/html; charset=utf-8",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
} as const;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function input({
  id,
  name,
  label,
  value,
  type = "text",
  autocomplete,
  maxlength,
  required = false,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  type?: string;
  autocomplete?: string;
  maxlength: number;
  required?: boolean;
}) {
  return `<div class="field">
    <label for="${id}">${escapeHtml(label)}</label>
    <input id="${id}" name="${name}" type="${type}" value="${escapeHtml(value)}"${
      autocomplete ? ` autocomplete="${autocomplete}"` : ""
    } maxlength="${maxlength}"${required ? " required" : ""} />
  </div>`;
}

function select({
  id,
  name,
  label,
  value,
  placeholder,
  options,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder: string;
  options: readonly string[];
}) {
  const optionMarkup = ["", ...options]
    .map((option) => {
      const selected = option === value ? " selected" : "";
      const display = option || placeholder;
      return `<option value="${escapeHtml(option)}"${selected}>${escapeHtml(display)}</option>`;
    })
    .join("");

  return `<div class="field">
    <label for="${id}">${escapeHtml(label)}</label>
    <select id="${id}" name="${name}">${optionMarkup}</select>
  </div>`;
}

/**
 * POST-bound success document for a durably queued native form submission.
 *
 * This message must not live in an unconditional GET page where a caller can
 * forge it with a query string or fragment. The enhanced JSON flow remains a
 * normal 202 response and does not use this document.
 */
export function renderProgressiveContactReceived({
  message,
  businessName,
  businessPhone,
  businessPhoneDisplay,
}: ProgressiveContactReceivedOptions) {
  return `<!doctype html>
<html lang="en-AU">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex,nofollow,noarchive" />
    <title>Enquiry received — ${escapeHtml(businessName)}</title>
    <style>
      :root{font-family:Arial,sans-serif;color:#142125;background:#faf8f3;color-scheme:light}
      *{box-sizing:border-box}body{margin:0}header,main{width:min(720px,calc(100% - 32px));margin-inline:auto}
      header{padding:24px 0 8px}header a{color:#7f2f13;font-weight:700;text-decoration:none}
      main{padding:48px 0 72px}h1{font-size:clamp(1.9rem,6vw,2.8rem);line-height:1.1;margin:0 0 16px}
      .notice{border-left:5px solid #415f54;background:#fff;padding:20px;margin:24px 0}
      .notice p{margin:0 0 12px}.notice p:last-child{margin-bottom:0}a{color:#7f2f13}
    </style>
  </head>
  <body>
    <header><a href="/">${escapeHtml(businessName)} home</a></header>
    <main>
      <h1>Your enquiry is safely queued</h1>
      <div class="notice" role="status">
        <p>${escapeHtml(message)}</p>
        <p>You do not need to submit it again. If the matter is urgent, <a href="tel:${escapeHtml(businessPhone)}">call ${escapeHtml(businessPhoneDisplay)}</a>.</p>
      </div>
      <p><a href="/">Return to the website</a></p>
    </main>
  </body>
</html>`;
}

/**
 * Standalone recovery document for a native browser form submission.
 *
 * A redirect cannot retain entered values without putting personal data in a
 * URL or cookie. Returning this no-store document keeps the values only in the
 * response body, lets the visitor correct/retry them, and keeps the normal 303
 * success redirect free of personal information.
 */
export function renderProgressiveContactFailure({
  fields,
  message,
  mailto,
  serviceOptions,
  projectTypeOptions,
  projectTimingOptions,
  businessName,
  businessEmail,
  businessPhone,
  businessPhoneDisplay,
}: ProgressiveContactPageOptions) {
  const safeMailto = mailto?.startsWith("mailto:") ? mailto : undefined;

  return `<!doctype html>
<html lang="en-AU">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex,nofollow,noarchive" />
    <title>Review your enquiry — ${escapeHtml(businessName)}</title>
    <style>
      :root{font-family:Arial,sans-serif;color:#142125;background:#faf8f3;color-scheme:light}
      *{box-sizing:border-box}body{margin:0}header,main{width:min(760px,calc(100% - 32px));margin-inline:auto}
      header{padding:24px 0 8px}header a{color:#7f2f13;font-weight:700;text-decoration:none}
      main{padding:24px 0 56px}h1{font-size:clamp(1.8rem,5vw,2.5rem);line-height:1.1;margin:0 0 12px}
      .notice{border-left:5px solid #a33f18;background:#fff3ec;padding:16px 18px;margin:24px 0}
      .notice p{margin:0}.actions{display:flex;flex-wrap:wrap;gap:10px 18px;margin-top:12px}
      form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;background:#fff;padding:clamp(18px,4vw,30px);border:1px solid #d9dfdd}
      .field{display:grid;gap:6px}.field--full{grid-column:1/-1}label{font-weight:700}
      input,select,textarea{width:100%;min-height:46px;border:1px solid #98a5a3;border-radius:3px;padding:10px 12px;font:inherit;font-size:16px;background:#fff;color:#142125}
      textarea{min-height:130px;resize:vertical}.submit{grid-column:1/-1;min-height:48px;border:0;border-radius:3px;padding:12px 18px;background:#a33f18;color:#fff;font:inherit;font-weight:700;cursor:pointer}
      .privacy{grid-column:1/-1;margin:0;color:#536366;font-size:.9rem}.hidden{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
      a{color:#7f2f13}@media(max-width:620px){form{grid-template-columns:1fr}.field--full,.submit,.privacy{grid-column:1}}
    </style>
  </head>
  <body>
    <header><a href="/">${escapeHtml(businessName)} home</a></header>
    <main>
      <h1>Your enquiry has not been sent yet</h1>
      <p>Your details are still in the form below. Review them and try again, or contact us directly.</p>
      <div class="notice" role="alert">
        <p>${escapeHtml(message)}</p>
        <div class="actions">
          <a href="tel:${escapeHtml(businessPhone)}">Call ${escapeHtml(businessPhoneDisplay)}</a>
          <a href="mailto:${escapeHtml(businessEmail)}">Email ${escapeHtml(businessEmail)}</a>
          ${safeMailto ? `<a href="${escapeHtml(safeMailto)}">Continue with this enquiry in your email app</a>` : ""}
        </div>
      </div>
      <form action="/api/contact/" method="post">
        ${input({ id: "recovery-first-name", name: "firstName", label: "First name", value: fields.firstName, autocomplete: "given-name", maxlength: 60, required: true })}
        ${input({ id: "recovery-last-name", name: "lastName", label: "Last name (optional)", value: fields.lastName, autocomplete: "family-name", maxlength: 59 })}
        ${input({ id: "recovery-email", name: "email", label: "Email", value: fields.email, type: "email", autocomplete: "email", maxlength: 254, required: true })}
        ${input({ id: "recovery-phone", name: "phone", label: "Phone number (optional)", value: fields.phone, type: "tel", autocomplete: "tel", maxlength: 50 })}
        ${select({ id: "recovery-service", name: "service", label: "Service needed (optional)", value: fields.service, placeholder: "Choose a service / not sure yet", options: serviceOptions })}
        ${select({ id: "recovery-project-type", name: "projectType", label: "Project type (optional)", value: fields.projectType, placeholder: "Choose a project type / not sure yet", options: projectTypeOptions })}
        ${input({ id: "recovery-project-area", name: "projectArea", label: "Project suburb or postcode (optional)", value: fields.projectArea, maxlength: 120 })}
        ${select({ id: "recovery-project-timing", name: "projectTiming", label: "Target timing (optional)", value: fields.projectTiming, placeholder: "Choose a timeframe / not sure yet", options: projectTimingOptions })}
        <div class="field field--full">
          <label for="recovery-message">Project details</label>
          <textarea id="recovery-message" name="message" maxlength="5000" required>${escapeHtml(fields.message)}</textarea>
        </div>
        <input type="hidden" name="sourcePath" value="${escapeHtml(fields.sourcePath)}" />
        <input type="hidden" name="submissionId" value="${escapeHtml(fields.submissionId)}" />
        <div class="hidden" aria-hidden="true">
          <label for="recovery-company">Company</label>
          <input id="recovery-company" name="company" tabindex="-1" autocomplete="off" maxlength="120" />
        </div>
        <button class="submit" type="submit">Try sending again</button>
        <p class="privacy">For your privacy, this response is not cached and your details are not placed in the page URL.</p>
      </form>
    </main>
  </body>
</html>`;
}
