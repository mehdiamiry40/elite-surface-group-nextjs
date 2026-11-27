import type { ComparisonTableData, Step } from "./blocks.ts";
import { business } from "./business.ts";
import type { ServiceFaq } from "./services.ts";

/**
 * About and contact page blocks.
 *
 * Everything here restates what the site already publishes: the planning
 * page's review points and quote contents, the about page's own commitments,
 * the service pages' stated limits, and the contact facts in `business.ts`.
 * No history, headcount, accreditation or response time is added.
 */

/**
 * How a job runs, from first contact to handover. This describes how the
 * business works rather than instructing the reader, so it carries no HowTo
 * schema.
 */
export const aboutWorkflow: readonly Step[] = [
  {
    title: "Enquiry",
    body: "You tell us the suburb, the property type and the work you have in mind, and what plans or photos are available.",
  },
  {
    title: "Review",
    body: "We look at the system and the substrate, the scope boundaries between trades, the junctions and interfaces, and the programme and site access.",
  },
  {
    title: "Written quote",
    body: "The quote sets out the work included, the material and system responsibilities, the main preparation and access assumptions, any known exclusions and the timing assumptions discussed.",
  },
  {
    title: "Confirmation before work begins",
    body: "Materials and systems are confirmed before work begins. We agree with the builder and adjoining trades when substrates, junctions and finishes need to be ready.",
  },
  {
    title: "Installation",
    body: "The work is installed to the selected system’s requirements and the agreed project specification, coordinated with the trades around it.",
  },
  {
    title: "Handover",
    body: "The finished work is handed over in the condition the quote describes, ready for the following trade where one is still to come.",
  },
];

/** Where the business's work starts and stops, as the service pages state it. */
export const aboutScope: ComparisonTableData = {
  caption: "What Elite Surface Group does and does not do",
  rowHeading: "Area",
  columns: ["What we do", "What we do not do"],
  rows: [
    {
      label: "Trades",
      cells: [
        "[Cladding and facade installation](/cladding/), [render](/render/), [Hebel installation](/hebel/), and internal and external [walling](/walling/).",
        "Trades outside those four services.",
      ],
    },
    {
      label: "Design and approvals",
      cells: [
        "Install the wall or finish the project documents specify, and raise anything on site that does not match them.",
        "Design, engineer or certify walls, or arrange approvals. Those sit with the project’s designer, engineer and building certifier.",
      ],
    },
    {
      label: "Existing cladding",
      cells: [
        "Install replacement cladding once the old material has been identified and the wall behind it checked.",
        "Remove or handle asbestos. That is licensed work.",
      ],
    },
    {
      label: "Structural changes",
      cells: [
        "Install the new walling an engineered design calls for, where it is within the agreed scope.",
        "Decide whether a wall is load-bearing. A structural engineer has to assess that first.",
      ],
    },
    {
      label: "Existing defects",
      cells: [
        "Assess the wall before recommending a local repair, a patch or a full re-render.",
        "Render over salt damp, or over cracking that is still active.",
      ],
    },
    {
      label: "Quotes",
      cells: [
        "Prepare obligation-free written quotes from the project information.",
        "Publish a price list or rates.",
      ],
    },
    {
      label: "Service area",
      cells: [
        "Work across metropolitan Adelaide, our [primary service area](/locations/), and assess sites elsewhere in South Australia individually.",
        "Confirm coverage before we know the location, scope, programme and site access.",
      ],
    },
    {
      label: "Premises",
      cells: [
        `Work from our ${business.address.suburb} base and travel to the site.`,
        "Operate a shopfront or showroom.",
      ],
    },
  ],
};

/**
 * Contact FAQs. Hours, phone, email and locality come from `business.ts`; the
 * coverage and enquiry answers repeat the service-area hub and the enquiry
 * copy. Answers are plain text because they also feed FAQPage schema.
 */
export const contactFaqs: readonly ServiceFaq[] = [
  {
    question: "What are your business hours?",
    answer: `Our hours are ${business.hours.display}.`,
  },
  {
    question: `How do I contact ${business.name}?`,
    answer: `Call ${business.phoneDisplay}, email ${business.email}, or use the enquiry form on this page.`,
  },
  {
    question: "Where are you based?",
    answer: `We are based in ${business.address.suburb}, South Australia. We travel to the site rather than operating a shopfront or showroom, so an enquiry starts by phone, by email or with the enquiry form.`,
  },
  {
    question: "Which areas do you cover?",
    answer:
      "Metropolitan Adelaide is our primary service area. Projects elsewhere in South Australia are assessed individually, so tell us the suburb or postcode and we will confirm coverage before quoting.",
  },
  {
    question: "What should I include in an enquiry?",
    answer:
      "The suburb and property type, the service you need and a short description of the work. Tell us what plans or photos are available. If supporting files are needed, we will arrange how to review them.",
  },
  {
    question: "Does a quote cost anything?",
    answer: "No. Quotes are free and obligation-free.",
  },
];
