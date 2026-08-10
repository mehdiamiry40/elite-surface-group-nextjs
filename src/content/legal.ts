/**
 * Legal page copy for Elite Surface Group (South Australia).
 *
 * Written to match what the website actually does: enquiry forms emailed to the
 * business, no analytics, no advertising cookies, no marketing opt-in boxes.
 * This is practical website policy text, not a substitute for advice from a
 * qualified Australian lawyer if the business later adds tracking, online
 * payments or more complex data handling.
 */

export type LegalBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | {
      type: "paragraph";
      content: readonly (string | { text: string; href: string })[];
    }
  | { type: "list"; items: readonly string[] };

export const privacyPolicy: readonly LegalBlock[] = [
  {
    type: "paragraph",
    text: "Elite Surface Group is operated by Elite Surface Group Pty Ltd (ABN 35 691 074 567) (“we”, “us”), based in Adelaide, South Australia. This policy explains what personal information we collect through elitesurfacegroup.com.au, why we collect it, and what we do with it. We handle personal information in accordance with the Australian Privacy Principles in the Privacy Act 1988 (Cth).",
  },
  {
    type: "heading",
    text: "Who we are",
  },
  {
    type: "paragraph",
    content: [
      "Elite Surface Group Pty Ltd (ABN 35 691 074 567), trading as Elite Surface Group, provides cladding, render, Hebel and walling services across Adelaide and South Australia. You can raise any privacy matter with us through our ",
      { text: "Contact Us page", href: "/contact-us/" },
      ", by email at info@elitesurfacegroup.com.au, or by phone on 0413 844 912.",
    ],
  },
  {
    type: "heading",
    text: "Information we collect",
  },
  {
    type: "paragraph",
    text: "We collect the personal information you choose to give us when you submit an enquiry or quote request on this website. That is typically:",
  },
  {
    type: "list",
    items: [
      "Your name",
      "Your email address",
      "Your phone number, if you provide one",
      "The service you are interested in",
      "The details of your project or message",
      "The page you submitted the form from",
      "Your IP address and basic request information, used temporarily for security, rate limiting and hosting logs",
    ],
  },
  {
    type: "paragraph",
    text: "If you call or email us directly, we may also keep a record of that correspondence so we can respond and manage your project. We do not ask for, and you should not send us, sensitive information or payment card details through this website.",
  },
  {
    type: "heading",
    text: "How we use your information",
  },
  {
    type: "paragraph",
    text: "We use the information you provide to:",
  },
  {
    type: "list",
    items: [
      "Respond to your enquiry and prepare quotes or project advice",
      "Contact you about work you have asked us to discuss or carry out",
      "Keep the business records we need to operate and to meet legal obligations",
    ],
  },
  {
    type: "paragraph",
    text: "We do not sell your personal information. We do not use this website to send marketing newsletters, and the enquiry forms carry no marketing opt-in or opt-out checkboxes.",
  },
  {
    type: "heading",
    text: "Cookies and analytics",
  },
  {
    type: "paragraph",
    text: "This website does not use third-party analytics, advertising pixels or similar tracking tools, and we do not set marketing or analytics cookies. The site uses only the technical storage that your browser and our hosting platform need in order to deliver pages securely.",
  },
  {
    type: "heading",
    text: "How enquiries are delivered",
  },
  {
    type: "paragraph",
    text: "Where the contact form is configured for email delivery, your enquiry is sent to us through our email delivery provider so that we can reply from our business inbox, and your email address is used as the reply-to address on that message. If email delivery is unavailable, the site may instead offer to open your own email application so you can send the message directly.",
  },
  {
    type: "heading",
    text: "Who we share information with",
  },
  {
    type: "paragraph",
    text: "We may share personal information with the service providers that help us run the website and communicate with you — currently our hosting provider (Vercel) and our email delivery provider (Resend) — and only to the extent those services require. These providers may process or store information outside Australia, including in the United States. We may also disclose information where the law requires it, or where it is necessary to protect the rights, property or safety of Elite Surface Group, our customers or others.",
  },
  {
    type: "heading",
    text: "Storage, security and retention",
  },
  {
    type: "paragraph",
    text: "We take reasonable steps to protect personal information from misuse, interference, loss and unauthorised access, modification or disclosure. Enquiry details that reach our inbox are held alongside our ordinary business email and project records, and security rate-limit records are temporary. We keep enquiry and project correspondence only while it is needed to respond, manage any resulting work, meet record-keeping obligations or resolve a dispute, and we delete or de-identify it when that is no longer the case.",
  },
  {
    type: "heading",
    text: "Access, correction and complaints",
  },
  {
    type: "paragraph",
    content: [
      "You can ask us for access to the personal information we hold about you, or ask us to correct it, using the contact details above. If you have a privacy complaint, please raise it with us first so we have the opportunity to resolve it. If you are not satisfied with our response, you can contact the ",
      {
        text: "Office of the Australian Information Commissioner (OAIC)",
        href: "https://www.oaic.gov.au/",
      },
      ".",
    ],
  },
  {
    type: "heading",
    text: "Changes to this policy",
  },
  {
    type: "paragraph",
    text: "We may update this privacy policy from time to time. The current version is always the one published on this page.",
  },
];

export const termsOfService: readonly LegalBlock[] = [
  {
    type: "paragraph",
    text: "Welcome to the Elite Surface Group website. By browsing or using elitesurfacegroup.com.au you agree to these terms. If you do not agree with them, please do not use the site.",
  },
  {
    type: "heading",
    text: "About us",
  },
  {
    type: "paragraph",
    text: "“Elite Surface Group”, “we”, “us” and “our” refer to Elite Surface Group Pty Ltd (ABN 35 691 074 567), trading as Elite Surface Group in Adelaide and South Australia. “You” means the person using this website.",
  },
  {
    type: "heading",
    text: "Using this website",
  },
  {
    type: "list",
    items: [
      "The content on this website is general information about our cladding, render, Hebel and walling services. It is not a quote, a specification or a contract unless we confirm that in writing.",
      "We aim to keep the information accurate and current, but we do not warrant that the site is complete, up to date or free of errors. Confirm project details with us directly before relying on them.",
      "Guidance on this site — including anything we say about systems, substrates, maintenance or building requirements — is general in nature. Your own project must be assessed on its own facts and against the approvals that apply to it.",
      "You are responsible for satisfying yourself that any service discussed through the site suits your requirements.",
      "You must not misuse the site, attempt to disrupt it, or submit false or abusive enquiries.",
    ],
  },
  {
    type: "heading",
    text: "Quotes and enquiries",
  },
  {
    type: "paragraph",
    text: "Submitting an enquiry or quote request through this site is an invitation for us to contact you, and does not create a binding contract. Any quotation, scope of work, price or timeframe we later provide is subject to the terms we set out when we offer that work.",
  },
  {
    type: "heading",
    text: "Intellectual property",
  },
  {
    type: "paragraph",
    text: "The design, layout, text, graphics, logos and images on this website are owned by or licensed to Elite Surface Group. You may browse the site and print pages for your own personal use. You must not copy, republish or commercially exploit the content without our prior written permission.",
  },
  {
    type: "heading",
    text: "Links to other sites",
  },
  {
    type: "paragraph",
    text: "This website may link to other websites for convenience. We are not responsible for the content, availability or privacy practices of any third-party site.",
  },
  {
    type: "heading",
    text: "Cookies and tracking",
  },
  {
    type: "paragraph",
    content: [
      "This website does not use third-party analytics or advertising cookies to monitor browsing preferences. See our ",
      { text: "Privacy Policy", href: "/privacy-policy/" },
      " for how we handle the personal information you send through an enquiry.",
    ],
  },
  {
    type: "heading",
    text: "Liability",
  },
  {
    type: "paragraph",
    text: "To the extent permitted by law, we exclude liability for loss or damage arising from your use of this website or your reliance on its content. Nothing in these terms excludes, restricts or modifies any consumer guarantee, right or remedy under the Australian Consumer Law or other applicable law that cannot lawfully be excluded.",
  },
  {
    type: "heading",
    text: "Governing law",
  },
  {
    type: "paragraph",
    text: "These terms are governed by the laws of South Australia and the Commonwealth of Australia. The courts of South Australia have non-exclusive jurisdiction over any dispute arising from these terms or from your use of this website.",
  },
  {
    type: "heading",
    text: "Changes",
  },
  {
    type: "paragraph",
    text: "We may update these terms from time to time by publishing a new version on this page. Continuing to use the site after a change means you accept the updated terms.",
  },
];
