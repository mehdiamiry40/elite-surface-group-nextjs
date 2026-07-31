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
    text: "Elite Surface Group (“we”, “us”) is based in Adelaide, South Australia. This privacy policy explains how we collect, use and hold personal information when you use elitesurfacegroup.com.au or contact us through the site. We handle personal information in accordance with the Australian Privacy Principles in the Privacy Act 1988 (Cth).",
  },
  {
    type: "heading",
    text: "Who we are",
  },
  {
    type: "paragraph",
    content: [
      "Elite Surface Group provides cladding, render, Hebel and walling services across Adelaide and South Australia. You can contact us about privacy matters using our ",
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
    text: "We collect personal information that you choose to give us when you submit an enquiry or quote request on this website. That typically includes:",
  },
  {
    type: "list",
    items: [
      "Your name",
      "Email address",
      "Phone number (if you provide one)",
      "The service you are interested in",
      "Details of your project or message",
      "The page you submitted the form from",
      "Your IP address and basic request information used temporarily for security, rate limiting and hosting logs",
    ],
  },
  {
    type: "paragraph",
    text: "If you phone or email us directly, we may also keep a record of that correspondence so we can respond and manage your project.",
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
      "Respond to your enquiry and provide quotes or project advice",
      "Contact you about work you have asked us to discuss or carry out",
      "Keep basic records needed to run the business and meet legal obligations",
    ],
  },
  {
    type: "paragraph",
    text: "We do not sell your personal information. We do not use this website to send marketing newsletters, and the enquiry forms do not include marketing opt-in or opt-out checkboxes.",
  },
  {
    type: "heading",
    text: "Cookies and analytics",
  },
  {
    type: "paragraph",
    text: "This website does not use third-party analytics, advertising pixels or similar tracking tools. We do not set marketing or analytics cookies. The site may use only the technical storage that your browser and our hosting platform need to deliver pages securely.",
  },
  {
    type: "heading",
    text: "How enquiries are delivered",
  },
  {
    type: "paragraph",
    text: "When the contact form is configured for email delivery, your enquiry is sent to us by our email delivery provider so we can reply from our business inbox. Your email address is used as the reply-to address for that message. If email delivery is unavailable, the site may offer to open your own email application so you can send the message directly.",
  },
  {
    type: "heading",
    text: "Disclosure of your information",
  },
  {
    type: "paragraph",
    text: "We may share personal information with service providers who help us operate the website or communicate with you, including our hosting provider (Vercel) and email delivery provider (Resend), and only as needed for those services. These providers may process or store information outside Australia, including in the United States. We may also disclose information if required by law, or to protect the rights, property or safety of Elite Surface Group, our customers or others.",
  },
  {
    type: "heading",
    text: "Storage and security",
  },
  {
    type: "paragraph",
    text: "We take reasonable steps to protect personal information from misuse, interference, loss and unauthorised access, modification or disclosure. Enquiry details that reach our inbox are held with our ordinary business email and project records. Security rate-limit records are temporary. We retain enquiry and project correspondence only while it is needed to respond, manage any resulting work, meet record-keeping obligations, or resolve a dispute, then delete or de-identify it when practical.",
  },
  {
    type: "heading",
    text: "Access, correction and complaints",
  },
  {
    type: "paragraph",
    content: [
      "You may ask us for access to the personal information we hold about you, or ask us to correct it, by contacting us using the details above. If you have a privacy complaint, please contact us first so we can try to resolve it. If you are not satisfied with our response, you may contact the ",
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
    text: "We may update this privacy policy from time to time. The current version will always be published on this page.",
  },
];

export const termsOfService: readonly LegalBlock[] = [
  {
    type: "paragraph",
    text: "Welcome to the Elite Surface Group website. By browsing or using elitesurfacegroup.com.au you agree to these terms. If you do not agree, please do not use the site.",
  },
  {
    type: "heading",
    text: "About us",
  },
  {
    type: "paragraph",
    text: "The terms “Elite Surface Group”, “we”, “us” and “our” refer to Elite Surface Group, operating in Adelaide and South Australia. “You” means the person using this website.",
  },
  {
    type: "heading",
    text: "Using this website",
  },
  {
    type: "list",
    items: [
      "The content on this website is general information about our cladding, render, Hebel and walling services. It is not a formal quote, specification or contract unless we confirm that in writing.",
      "We try to keep information accurate and up to date, but we do not warrant that the site is complete, current or free of errors. You should confirm project details directly with us.",
      "You are responsible for ensuring that any services discussed through the site suit your requirements.",
      "You must not misuse the site, attempt to disrupt it, or submit false or abusive enquiries.",
    ],
  },
  {
    type: "heading",
    text: "Quotes and enquiries",
  },
  {
    type: "paragraph",
    text: "Submitting an enquiry or quote request through the site is an invitation for us to contact you. It does not create a binding contract. Any quotation, scope of work, price or timeframe we later provide is subject to the terms we set out when we offer that work.",
  },
  {
    type: "heading",
    text: "Intellectual property",
  },
  {
    type: "paragraph",
    text: "The design, layout, text, graphics, logos and images on this website are owned by or licensed to Elite Surface Group. You may browse and print pages for your personal use. You must not copy, republish or commercially exploit site content without our prior written permission.",
  },
  {
    type: "heading",
    text: "Links",
  },
  {
    type: "paragraph",
    text: "This website may include links to other websites for convenience. We are not responsible for the content, availability or privacy practices of third-party sites.",
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
      " for how we handle personal information from enquiries.",
    ],
  },
  {
    type: "heading",
    text: "Liability",
  },
  {
    type: "paragraph",
    text: "To the extent permitted by law, we exclude liability for loss or damage arising from your use of this website or reliance on its content. Nothing in these terms excludes, restricts or modifies any consumer guarantee, right or remedy under the Australian Consumer Law or other applicable law that cannot be excluded.",
  },
  {
    type: "heading",
    text: "Governing law",
  },
  {
    type: "paragraph",
    text: "These terms are governed by the laws of South Australia and the Commonwealth of Australia. The courts of South Australia have non-exclusive jurisdiction over disputes arising from these terms or your use of the website.",
  },
  {
    type: "heading",
    text: "Changes",
  },
  {
    type: "paragraph",
    text: "We may update these terms from time to time by publishing a new version on this page. Continued use of the site after a change means you accept the updated terms.",
  },
];
