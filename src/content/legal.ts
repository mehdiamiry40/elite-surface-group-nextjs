import { business } from "./business";

export const privacyPolicyUpdated = "2026-09-05" as const;

/**
 * Legal page copy for Elite Surface Group (South Australia).
 *
 * Written to match what the website actually does: enquiry forms emailed to the
 * business with encrypted retry storage, Vercel usage/performance analytics, no
 * advertising cookies and no marketing opt-in boxes. This is practical policy
 * text, not a
 * substitute for advice from a qualified Australian lawyer.
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
    text: "Elite Surface Group is operated by Elite Surface Group Pty Ltd (ABN 35 691 074 567) (“we”, “us”), based in Adelaide, South Australia. This privacy policy explains how we collect, use and hold personal information when you use elitesurfacegroup.com.au or contact us through the site.",
  },
  {
    type: "heading",
    text: "Who we are",
  },
  {
    type: "paragraph",
    content: [
      "Elite Surface Group Pty Ltd (ABN 35 691 074 567), trading as Elite Surface Group, provides cladding, render, Hebel and walling services across Adelaide and South Australia. You can contact us about privacy matters using our ",
      { text: "Contact Us page", href: "/contact-us/" },
      `, by email at ${business.email}, or by phone on ${business.phoneDisplay}.`,
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
      "Project suburb or postcode, project type and target timing (if you provide them)",
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
    type: "paragraph",
    text: "Vercel Web Analytics may process usage information such as the page or route visited, referrer, event time, approximate location, browser, operating system and device type. Vercel Speed Insights may process page-performance measurements, including loading speed, responsiveness, layout shifts and technical browser, device and network information. Our website removes query strings and fragments from the page URLs sent to both services. A successful enquiry event includes only the permitted source page and service category; we do not send names, email addresses, phone numbers, enquiry text or optional project details in analytics events.",
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
      "Deliver enquiries reliably, retry temporary email failures and investigate delivery problems",
      "Understand aggregate website use, page performance and which contact channels visitors choose",
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
    text: "We use Vercel Web Analytics for aggregated page views and contact events, and Vercel Speed Insights to understand how quickly and reliably pages work. These services do not use analytics cookies on our site. We do not use Google Analytics, advertising pixels, marketing cookies or cross-site advertising trackers.",
  },
  {
    type: "heading",
    text: "How enquiries are delivered",
  },
  {
    type: "paragraph",
    text: "Our website normally encrypts a copy of the email message containing your enquiry details before storing it in an Upstash delivery queue. This temporary copy lets us retry delivery after a service interruption and investigate delivery problems. If temporary storage is unavailable, the website may attempt direct delivery through Resend instead. Resend sends the message to our business inbox, with your email address as the reply-to address. If the site offers a direct-email alternative, your own email application sends that message instead.",
  },
  {
    type: "heading",
    text: "Disclosure of your information",
  },
  {
    type: "paragraph",
    text: "Our service providers include Vercel for website hosting, Web Analytics and Speed Insights, Upstash for encrypted enquiry delivery storage and temporary rate limiting, and Resend for email delivery. We share information with them as needed for those services. These providers operate internationally and may process or store information outside Australia, including in the United States. Storage and processing locations depend on the service and its configuration; we do not promise that enquiry information stays in Australia. We may also disclose information if required by law, or to protect the rights, property or safety of Elite Surface Group, our customers or others.",
  },
  {
    type: "heading",
    text: "Storage and security",
  },
  {
    type: "paragraph",
    text: "The temporary enquiry copy is encrypted before it is written to Upstash. A pending copy is set to expire after 30 days. Once Resend accepts the message, or the enquiry reaches a delivery, failure or manual-review outcome, its expiry is set to 7 days from that update. Individual delivery records used to reconcile enquiries and prevent duplicate sending are set to expire after 30 days from creation or renewal. These records include submission and email references, status, timestamps, attempt counts, error codes and a keyed message fingerprint; the full enquiry text is held in the encrypted copy. Separate monitoring indexes are cleaned during routine health checks, with incident references eligible for removal after 30 days. Security rate-limit records are temporary.",
  },
  {
    type: "paragraph",
    text: "The delivery-queue expiry rules do not delete messages already held by our email provider, in our business inbox or in project records. We retain enquiry and project correspondence while it is needed to respond, manage resulting work, meet record-keeping obligations or resolve a dispute, then delete or de-identify it when practical.",
  },
  {
    type: "heading",
    text: "Access, correction and complaints",
  },
  {
    type: "paragraph",
    content: [
      "You may ask us to access, correct or delete the personal information we hold about you using the contact details above. Include the email address used for the enquiry and its approximate date so we can locate it. We will check relevant delivery-queue, email and project records and explain any information we need to retain. If you have a privacy complaint, please contact us first so we can try to resolve it. If you are not satisfied with our response, you may contact the ",
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
    text: "The terms “Elite Surface Group”, “we”, “us” and “our” refer to Elite Surface Group Pty Ltd (ABN 35 691 074 567), trading as Elite Surface Group in Adelaide and South Australia. “You” means the person using this website.",
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
      "This website uses Vercel Web Analytics for anonymous, aggregated page views and conversion events. It does not use analytics or advertising cookies, Google Analytics, advertising pixels or cross-site advertising trackers. See our ",
      { text: "Privacy Policy", href: "/privacy-policy/" },
      " for the information processed and how enquiry details are handled.",
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
