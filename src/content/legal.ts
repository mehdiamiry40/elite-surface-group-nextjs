/**
 * Legal page copy, carried over verbatim from the WordPress site.
 *
 * NOTE: this text was written against UK law (it cites the Data Protection Act
 * 1998 and the laws of England, Northern Ireland, Scotland and Wales). Elite
 * Surface Group operates in South Australia, so both documents should be
 * reviewed by someone qualified and replaced with Australian Privacy
 * Principles / Australian Consumer Law equivalents. Preserved as-is here
 * because rewriting legal text is not a migration decision.
 */

export type LegalBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: readonly string[] };

export const privacyPolicy: readonly LegalBlock[] = [
  { type: "paragraph", text: "Elite Surface Group (“We”) are committed to protecting and respecting your privacy. This policy and any other documents referred to on it sets out the basis on which any personal data we collect from you, or that you provide to us, will be processed by us. Please read the following carefully to understand our views and practices regarding your personal data and how we will treat it." },
  { type: "paragraph", text: "For the purpose of the Data Protection Act 1998 (the Act), the data controller is Elite Surface Group Adelaide & South Australia. Elite Surface Group is registered with the Data Protection Registrar." },
  { type: "heading", text: "Information we may collect from you" },
  { type: "paragraph", text: "We may collect and process the following data about you:" },
  { type: "list", items: [
    "Information that you provide by filling in forms on our site",
    "Information provided when you complete our online form and enquiry form",
    "If you contact us, we may keep a record of that correspondence We may also ask you to complete surveys/polls that we use for research and marketing purposes",
    "Details of transactions you carry out through our site and of the fulfillment of your orders, where applicable",
    "Details of your visits to our site including, but not limited to, traffic data, location data, weblogs and other communication data, whether this is required for our own billing purposes or otherwise and the resources that you access",
  ] },
  { type: "heading", text: "Uses made of your information" },
  { type: "paragraph", text: "We use information held about you in the following ways:" },
  { type: "list", items: [
    "To ensure that content from our site is presented in the most effective manner for you and for your computer",
    "To provide you with information, products or services that you request from us or which we feel may interest you, where you have consented to be contacted for such purposes",
    "To carry out our obligations arising from any contracts entered into between you and us",
    "To allow you to participate in interactive features of our service, when you choose to do so",
    "To notify you about changes to our service.",
  ] },
  { type: "paragraph", text: "We may also use your data, or permit selected third parties to use your data, to provide you with information about goods and services which may be of interest to you and we or they may contact you about these by post, telephone, or email." },
  { type: "paragraph", text: "If you are an existing customer, we will only contact you by electronic means (e-mail or SMS) with information about goods and services similar to those which were the subject of a previous sale to you. If you are a new customer, and where we permit selected third parties to use your data, we (or they) will contact you by electronic means only if you have consented to this. If you do not want us to use your data in this way, or to pass your details on to third parties for marketing purposes, please tick the relevant box situated on the form on which we collect your data the enquiry form." },
  { type: "heading", text: "Disclosure of your information" },
  { type: "list", items: [
    "In the event that we sell or buy any business or assets, in which case we may disclose your personal data to the prospective seller or buyer of such business or assets.",
    "If Elite Surface Group or substantially all of its assets are acquired by a third party, in which case personal data held by it about its customers will be one of the transferred assets.",
    "If we are under a duty to disclose or share your personal data in order to comply with any legal obligation, or in order to enforce or apply any other agreements; or to protect the rights, property, or safety of Elite Surface Group, our customers, or others, we may do so. This includes exchanging information with other companies and organisations for the purposes of fraud protection and credit risk reduction.",
  ] },
  { type: "heading", text: "Your rights" },
  { type: "paragraph", text: "You have the right to ask us not to process your personal data for marketing purposes. We will usually inform you (before collecting your data) if we intend to use your data for such purposes or if we intend to disclose your information to any third party for such purposes. You can exercise your right to prevent such processing by checking certain boxes on the forms we use to collect your data. You can also exercise the right at any time by contacting us at Elite Surface Group, Adelaide & South Australia" },
  { type: "paragraph", text: "Our site may, from time to time, contain links to and from the websites of our partner networks, advertisers and affiliates. If you follow a link to any of these websites, please note that these websites have their own privacy policies and that we do not accept any responsibility or liability for these policies. Please check these policies before you submit any personal data to these websites. In addition, we cannot be held responsible for the contents of third party sites." },
  { type: "heading", text: "Access to your information" },
  { type: "paragraph", text: "The Act gives you the right to access information held about you. Your right of access can be exercised in accordance with the Act." },
  { type: "heading", text: "Changes to our privacy policy" },
  { type: "paragraph", text: "Any changes we may make to our privacy policy in the future will be posted on this page and, where appropriate, notified to you by e-mail." },
  { type: "heading", text: "Contact us" },
  { type: "paragraph", text: "Questions, comments and requests regarding this privacy policy are welcomed and should be addressed to Elite Surface Group Adelaide & South Australia" },
];

export const termsOfService: readonly LegalBlock[] = [
  { type: "paragraph", text: "Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Elite Surface Group’s relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please do not use our website." },
  { type: "paragraph", text: "The term ‘Elite Surface Group’ or ‘us’ or ‘we’ refers to the owner of the website whose registered office is Adelaide & South Australia. The term ‘you’ refers to the user or viewer of our website." },
  { type: "paragraph", text: "The use of this website is subject to the following terms of use:" },
  { type: "list", items: [
    "The content of the pages of this website is for your general information and use only. It is subject to change without notice",
    "This website uses cookies to monitor browsing preferences and visitors via Google Analytics. If you do allow cookies to be used, the following personal information may be stored by us",
    "Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain  inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law",
    "Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.",
    "This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions",
    "All trade marks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website",
    "Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence",
    "From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s)",
    "Your use of this website and any dispute arising out of such use of the website is subject to the laws of England, Northern Ireland, Scotland and Wales",
  ] },
];
