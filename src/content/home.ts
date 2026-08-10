import { business } from "@/content/business";

export const heroSlides = [
  {
    image: "/images/v2/home-hero-adelaide.webp",
    mobileImage: "/images/v2/home-hero-adelaide-mobile-v2.webp",
    alt: "Contemporary Adelaide home with charcoal wall cladding and light rendered walls",
  },
] as const;

export const heroCopy = {
  eyebrow: "Adelaide & South Australia",
  /** Rendered as the homepage `h1`; keep the primary keywords in these lines. */
  titleLines: ["Cladding, render and Hebel", "specialists in Adelaide."],
  body: "One team for the whole wall — cladding, rendering, Hebel and walling for homes, renovations and commercial builds, from the first quote through to handover.",
} as const;

export const trustPoints = [
  {
    eyebrow: "One point of contact",
    title: "Four trades, one scope",
    body: "Cladding, render, Hebel and walling under a single clearly defined scope, so nothing falls between contractors.",
  },
  {
    eyebrow: "Homes to commercial sites",
    title: "Projects of every scale",
    body: "New homes, renovations, townhouse and multi-unit developments, and commercial builds across the metropolitan area.",
  },
  {
    eyebrow: "Local delivery",
    title: "Adelaide and South Australia",
    body: "Straightforward quotes, practical trade coordination and communication that keeps your programme moving.",
  },
] as const;

export const homeIntro = {
  title: "Wall cladding, rendering and Hebel across Adelaide",
  body: [
    `${business.name} is an Adelaide walling and facade contractor. We install architectural wall cladding, apply internal and external render, erect Hebel AAC panel and block walls, and deliver complete walling packages for builders — across metropolitan Adelaide and wider South Australia.`,
    "Homeowners come to us to modernise a tired brick exterior or finish a new facade properly. Builders and developers come to us for a wall package that arrives on the programmed date, matches the documented specification, and leaves the following trade a surface it can actually work with.",
    "Either way the method is the same: understand the building first, agree a scope that says exactly what is included, then install it to the system details it was designed around.",
  ],
  points: [
    "Quotes prepared from your plans, photos or a site visit — obligation-free",
    "Systems and materials confirmed in writing before work starts",
    "Substrate preparation treated as part of the job, not an extra",
    "Coordination with builders, developers and adjoining trades",
  ],
} as const;

export const aboutTeaser = {
  eyebrow: "About Elite Surface Group",
  title: "The planning behind a better finish.",
  image: "/images/v2/home-team-site-review.webp",
  imageAlt:
    "Elite Surface Group team reviewing facade details on an Adelaide construction site",
  body: [
    `${business.name} delivers cladding, render, Hebel and walling for new homes, renovations, multi-unit developments and commercial projects across Adelaide and South Australia.`,
    "The work that decides a finish happens before anyone opens a bag of product. We review the system, the substrate, the site conditions and the trades either side of us early, so responsibilities are clear and the job runs without a queue of unanswered questions.",
    "It is an unglamorous approach. It is also why our walls turn out the way the drawings said they would.",
  ],
} as const;

export const coverage = {
  eyebrow: "Where we work",
  title: "Local knowledge. Site-ready delivery.",
  body: "From coastal facades at Glenelg and Henley Beach to the Hills, the northern growth corridors and the southern suburbs, we plan each job around the site, the selected system and the wider construction programme. Adelaide conditions — reactive clay soils, salt-laden coastal air, hot dry summers and bushfire-prone Hills locations — all shape what we specify and how we detail it.",
  image: "/images/v2/home-adelaide-coverage.webp",
  imageAlt:
    "Contemporary Adelaide home with charcoal cladding, rendered walls and native landscaping",
} as const;

export const process = {
  title: "Well planned. Clearly communicated. Properly finished.",
  intro:
    "You will know what is included, which systems are being used and when the work is happening. If site conditions change, you hear it from us early — not in an invoice at the end.",
  steps: [
    {
      title: "Site review",
      body: "We go through your plans, photos and site conditions to understand the work and surface the questions that affect price and programme.",
    },
    {
      title: "Scope and quote",
      body: "Your quote sets out the work, the materials, who supplies what, and the timing assumptions behind the number. Obligation-free.",
    },
    {
      title: "Installation",
      body: "We install the agreed system to its published details, working in step with the trades around us and keeping the site tidy.",
    },
    {
      title: "Handover check",
      body: "We walk the completed work with you, resolve any outstanding items and leave the project ready for the next stage or for handover.",
    },
  ],
} as const;

export const audiences = [
  {
    eyebrow: "For homeowners and renovators",
    title: "Turn a rough idea into a clear scope.",
    body: "Share your plans, photos and the finish you have in mind. We will tell you what needs inspecting, what needs allowing for, and what it will realistically take to get there.",
    image: "/images/v2/homeowner-consultation.webp",
    imageAlt:
      "Homeowner and estimator reviewing exterior cladding and render samples in Adelaide",
    href: "/contact-us/#contact",
    linkLabel: "Discuss your project",
  },
  {
    eyebrow: "For builders and developers",
    title: "A trade partner who works to the programme.",
    body: "Send the drawings, the specification and the dates. We will come back on scope boundaries, system details and the handover points that keep the trades after us moving.",
    image: "/images/v2/builders-plan-review.webp",
    imageAlt:
      "Builder and walling contractor reviewing elevation drawings on an Adelaide site",
    href: "/services/",
    linkLabel: "Explore our services",
  },
] as const;

export const homeFaqs = {
  title: "Common questions",
  intro:
    "The questions we are asked most often before a quote. If yours is not here, call or send an enquiry and we will answer it directly.",
  items: [
    {
      question: "What areas of Adelaide do you service?",
      answer:
        "We work across metropolitan Adelaide — the city and inner suburbs, the north, south, east and western coastal suburbs, and the Adelaide Hills — plus wider South Australia depending on the scope and programme. Send us the suburb with your enquiry and we will confirm straight away.",
    },
    {
      question: "Do you work for homeowners as well as builders?",
      answer:
        "Both. Roughly half our work is renovation and facade work for homeowners, and the rest is walling, Hebel and facade packages for builders and developers. The process is the same either way: review the job, agree a scope, install it properly.",
    },
    {
      question: "Should I render or clad my house?",
      answer:
        "Render suits masonry and gives a continuous, monolithic surface; cladding suits framed walls and adds texture, shadow lines and panel-by-panel repairability. Many Adelaide facades use both — render as the field with cladding as the feature. We install either, so the advice is not steered by what we happen to sell.",
    },
    {
      question: "How much will my project cost?",
      answer:
        "Nobody can answer that honestly from a square-metre rate alone. Price is driven by the system selected, the condition of the existing wall, access and scaffold, the number of junctions and openings, and how the work is staged. Send plans or photos and we will quote your actual job, obligation-free.",
    },
    {
      question: "How do I get a quote?",
      answer:
        `Send your plans, photos and a short description of the work through the enquiry form, email ${business.email}, or call ${business.phoneDisplay}. We review the details and respond within one business day, and we will tell you if we need a site visit before we can be accurate.`,
    },
    {
      question: "Are your quotes obligation-free?",
      answer:
        "Yes. A quote is our proposal for the work, not a commitment from you. It sets out the scope, materials, responsibilities and timing assumptions so you can compare it properly against anything else you have.",
    },
  ],
} as const;
