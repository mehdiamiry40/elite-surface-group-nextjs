import { business } from "@/content/business";
import type { ContentSection, ServiceFaq } from "@/content/services";

export type LocationPage = {
  slug: string;
  name: string;
  /** The area as it reads mid-sentence, e.g. "the Adelaide Hills". */
  areaPhrase: string;
  /** Short label above the title on the service-area hub card. */
  hubLabel: string;
  hubTitle: string;
  hubSummary: string;
  bannerTitle: string;
  metaTitle: string;
  metaDescription: string;
  /** Share card from `public/images/og/`. */
  socialCard: "default" | "locations";
  introHeading: string;
  intro: readonly string[];
  servicesLead: string;
  /** Region-specific long-form sections. Each page's set is written for it. */
  sections: readonly ContentSection[];
  /**
   * Guides chosen for this region. Omit to list every published guide, as the
   * metropolitan Adelaide page does.
   */
  guides?: {
    intro: string;
    links: readonly { label: string; href: string }[];
  };
  proof: readonly string[];
  faqs: readonly ServiceFaq[];
  contactIntro: string;
};

export const locationsHub = {
  bannerTitle: "Where We Work",
  metaTitle: "Adelaide & SA Service Areas",
  metaDescription:
    "Based in Salisbury East, we serve metropolitan Adelaide and assess suitable cladding, render, Hebel and walling projects elsewhere in South Australia.",
  introTitle: "Metropolitan Adelaide is our primary service area.",
  intro:
    "Based in Salisbury East, we primarily serve metropolitan Adelaide. Project availability depends on the location, scope, programme and site access, so tell us the suburb or postcode and what plans are available and we’ll confirm coverage before quoting.",
  regionsTitle: "Three parts of Adelaide with their own planning questions.",
  regionsIntro:
    "Conditions change across the city. The northern suburbs sit on reactive clay soils, the coast adds salt and wind, and the Hills bring bushfire-related requirements and sloping access. Each page explains what that means for a wall and how coverage is confirmed. They are planning pages, not lists of suburbs or completed jobs.",
  outsideAreaTitle: "Planning work outside metropolitan Adelaide?",
  outsideAreaBody:
    "We assess projects elsewhere in South Australia individually. Tell us the suburb or postcode, scope, programme and site-access details, and note which plans are available. We’ll confirm whether the location is workable before quoting.",
} as const;

export const locationPages: readonly LocationPage[] = [
  {
    slug: "adelaide",
    name: "Adelaide",
    areaPhrase: "Adelaide",
    hubLabel: "Primary service area",
    hubTitle: "Cladding, render, Hebel and walling across Adelaide",
    hubSummary:
      "Review our metropolitan Adelaide coverage, installation services, planning guidance and photographed project work.",
    bannerTitle: "Cladding, Render, Hebel & Walling in Adelaide",
    metaTitle: "Cladding & Rendering Adelaide",
    metaDescription:
      "Salisbury East-based cladding, render, Hebel and walling for metropolitan Adelaide, with clear quotes and practical coordination for your site.",
    socialCard: "default",
    introHeading: "Walling and surface finishes in Adelaide",
    intro: [
      `Based in ${business.address.suburb}, ${business.name} delivers cladding, render, Hebel and walling for homes, renovations, multi-unit developments and commercial builds across metropolitan Adelaide and wider South Australia.`,
      "Whether you need one feature elevation or a coordinated cladding and walling package, we quote from the plans and site information, then install to the agreed specification. Explore our project case studies or tell us about the work for an obligation-free quote.",
    ],
    servicesLead:
      "Our Adelaide work includes architectural cladding, internal and external render, Hebel systems for new construction, and coordinated walling packages for builders and developers.",
    sections: [
      {
        id: "who-this-page-is-for",
        heading: "Who this page is for",
        paragraphs: [
          "This page is for anyone planning cladding, render, Hebel or walling work in metropolitan Adelaide who wants to know whether we cover the site and how a project with us runs. Homeowners renovating or extending, owner-builders, builders pricing a new home or a multi-unit development, and commercial project teams all start from the same place: where the job is, what the wall is, and which documents exist.",
          "If you already know which trade you need, the service pages go deeper: [cladding and facade installation](/cladding/), [rendering](/render/), [Hebel installation](/hebel/) and [walling](/walling/). If you are still working out the scope, start with the [project planning page](/project-planning/).",
        ],
      },
      {
        id: "metropolitan-coverage",
        heading: "Coverage across metropolitan Adelaide",
        paragraphs: [
          "We are based in Salisbury East, in Adelaide’s north, and metropolitan Adelaide is our primary service area. We do not publish a list of suburbs, because a list promises more than it honestly can: whether we can take a job depends on the location, the scope, the programme and the site access, not only the postcode.",
          "Tell us the suburb or postcode and what plans are available, and we will confirm coverage before quoting. Projects elsewhere in South Australia are assessed individually on the same basis.",
          "Three parts of the city raise their own planning questions, so each has its own page: [northern Adelaide](/locations/northern-adelaide/), where we are based; [coastal Adelaide](/locations/coastal-adelaide/), where salt and wind shape the specification; and the [Adelaide Hills](/locations/adelaide-hills/), where bushfire-related requirements, exposure and access come first.",
        ],
      },
      {
        id: "adelaide-conditions",
        heading: "Adelaide conditions that shape a wall",
        paragraphs: [
          "Local conditions decide more about a wall than most people expect. Reactive clay soils across much of the Adelaide plains move with the seasons, and render bonded to a moving wall shows it. Hot, dry summers affect how render cures. Salt air near the gulf is harder on fixings, flashings and coatings. Older stone and brick homes in established suburbs can carry salt damp. Parts of the foothills and the Hills sit in bushfire-prone areas.",
          "None of these rules a finish in or out by itself, but each should be raised before a system is chosen. Our guides to [what causes render cracking](/resources/render-cracking-adelaide/), [salt damp](/resources/salt-damp-adelaide/), [coastal cladding maintenance](/resources/cladding-maintenance-coastal-adelaide/) and [choosing between cladding and render](/resources/cladding-vs-render-adelaide/) explain what to confirm.",
        ],
      },
      {
        id: "planning-checks",
        heading: "Planning checks before you ask for a quote",
        paragraphs: [
          "A quote is only as firm as the information behind it. Before you enquire, it helps to know:",
        ],
        bullets: [
          "The suburb or postcode, and whether the building is new, existing or occupied",
          "What the walls are built from, and whether they have been coated or clad before",
          "Which drawings, engineering details or specifications exist, and what stage approvals are at",
          "Any heritage, character, bushfire or coastal considerations already raised by your designer or council",
          "The site access, the working height and the programme you are working to",
        ],
        closing: [
          "We install wall systems and finishes. We do not design, engineer or certify buildings, so approvals and structural questions stay with your designer, engineer and building certifier. Our guide to [what affects a quote](/resources/what-affects-cladding-render-quotes-adelaide/) explains how these details change the price, without publishing rates.",
        ],
      },
    ],
    proof: [
      "Residential render and cladding services available across metropolitan Adelaide",
      "Practical coordination with builders, developers and owner-builders",
      "Clear quotes covering the work, materials and programme assumptions",
    ],
    faqs: [
      {
        question: "Which parts of Adelaide do you service?",
        answer:
          "Metropolitan Adelaide is our primary service area, from our base in Salisbury East. Availability depends on the location, scope, programme and site access, so tell us the suburb or postcode and we will confirm coverage before quoting.",
      },
      {
        question: "Do you work outside metropolitan Adelaide?",
        answer:
          "Projects elsewhere in South Australia are assessed individually. Tell us the suburb or postcode, the scope, the programme and the site-access details, and we will confirm whether the location is workable before quoting.",
      },
      {
        question: "Do you work for homeowners as well as builders?",
        answer:
          "Yes. We work with homeowners, owner-builders, builders, developers and commercial project teams. The scope is agreed from the plans and site information before work starts.",
      },
      {
        question:
          "Can one quote cover cladding, render, Hebel and walling together?",
        answer:
          "Yes. We install all four, so related work can be quoted as one coordinated package, with the junctions between systems inside a single scope. Each part can also be quoted separately.",
      },
      {
        question: "Do you publish prices for Adelaide projects?",
        answer:
          "No. Prices depend on the wall, the system, the access and the amount of detail, so we quote each project from its plans and site information. Quotes are obligation-free.",
      },
    ],
    contactIntro:
      "Planning cladding, render, Hebel or walling work in Adelaide? Tell us the suburb, the work you have in mind and what plans or photos are available for an obligation-free quote.",
  },
  {
    slug: "northern-adelaide",
    name: "Northern Adelaide",
    areaPhrase: "northern Adelaide",
    hubLabel: "Northern suburbs",
    hubTitle: "Cladding, render, Hebel and walling in northern Adelaide",
    hubSummary:
      "Our home base. See how reactive clay soils, summer heat and the mix of new and established homes shape wall work north of the city.",
    bannerTitle: "Cladding, Render, Hebel & Walling in Northern Adelaide",
    metaTitle: "Cladding & Render Northern Adelaide",
    metaDescription:
      "Cladding, render, Hebel and walling for Adelaide’s northern suburbs, delivered from our Salisbury East base with clear quotes and site coordination.",
    socialCard: "locations",
    introHeading: "Wall systems and finishes for Adelaide’s northern suburbs",
    intro: [
      `${business.name} is based in ${business.address.suburb}, which makes the northern suburbs the closest part of Adelaide to our base. We install cladding, apply render, install Hebel and carry internal and external walling for homes, renovations, multi-unit developments and commercial projects.`,
      "This page explains what tends to matter on northern Adelaide sites, what we need to confirm before quoting, and which of our guides are most relevant. It is not a list of suburbs or completed jobs: we do not publish project addresses, and coverage is confirmed for each enquiry.",
    ],
    servicesLead:
      "For northern Adelaide projects we offer cladding and facade installation, internal and external render, Hebel wall systems, and walling packages coordinated with the builder’s programme.",
    sections: [
      {
        id: "northern-coverage",
        heading: "Coverage from our Salisbury East base",
        paragraphs: [
          "Salisbury East is our only base. We are a service-area contractor, so we travel to the site rather than operating a showroom.",
          "Northern Adelaide sits inside our primary service area of metropolitan Adelaide. Availability still depends on the scope, the programme and the site access, so tell us the suburb or postcode and what plans are available, and we will confirm coverage before quoting. Sites beyond the metropolitan area, like others elsewhere in South Australia, are assessed individually.",
        ],
      },
      {
        id: "northern-conditions",
        heading: "Reactive soils, heat and what they mean for walls",
        paragraphs: [
          "Reactive clay soils are common across the Adelaide plains, including around Salisbury, Elizabeth and Paralowie. The ground swells and shrinks as it wets and dries through the year, footings move with it, and the walls above follow. A rendered wall shows that movement as cracking. A clad wall tends to show it at the joints.",
          "That does not rule out either finish. It means movement and control joints have to be respected rather than rendered over, the render system should suit the substrate, and a dead-flat smooth finish is the least forgiving choice on a house that moves seasonally. Where cracks are already present, the cause should be understood before a new finish goes on. Our guides to [what causes render cracking](/resources/render-cracking-adelaide/) and [acrylic or cement render](/resources/acrylic-render-vs-cement-render-adelaide/) cover both points.",
          "Summer adds a programming constraint. Hot, dry and windy days affect how render cures, so application is planned around the limits in the product data sheet rather than squeezed into a heatwave.",
        ],
      },
      {
        id: "northern-construction",
        heading: "New builds and established homes",
        paragraphs: [
          "Wall work in the north falls into two broad kinds, and they are planned differently. On new homes and multi-unit developments we work from the drawings to the builder’s programme: Hebel or framed walls, cladding to upper levels or feature elements, render to masonry or panel walls, and the junctions between them. The [Hebel or brick veneer comparison](/resources/hebel-vs-brick-veneer-adelaide/) and the [steel or timber framing guide](/resources/steel-frame-vs-timber-frame-walls-adelaide/) cover the wall-type decisions that come up at design stage.",
          "On established homes, the existing wall decides the job. Brick veneer can be rendered or clad, but painted brick has to be assessed before render goes over it, and older fibre-cement sheeting can contain asbestos, which has to be identified and removed under licence before any recladding is scoped. Our guides to [rendering over painted brick](/resources/rendering-over-painted-brick-adelaide/), [cladding over brick](/resources/cladding-over-brick-adelaide/) and [replacing asbestos cladding](/resources/asbestos-cladding-replacement-adelaide/) explain what to confirm first.",
        ],
      },
      {
        id: "northern-quotes",
        heading: "Getting a quote for a northern Adelaide project",
        paragraphs: [
          "For any site in the north, the same details make a quote firmer:",
        ],
        bullets: [
          "The suburb or postcode, and whether the building is new or existing",
          "What the walls are built from, and any coating or cladding already on them",
          "Drawings, engineering details or a builder’s scope, if they exist",
          "The access, the working height and the dates you are working to",
        ],
        closing: [
          "Quotes are obligation-free, and we do not publish rates. The [project planning page](/project-planning/) lists what to gather, and our guide to [what affects a quote](/resources/what-affects-cladding-render-quotes-adelaide/) explains what moves the price.",
        ],
      },
    ],
    guides: {
      intro:
        "These guides cover the questions that come up most often on plains sites with reactive soils and a mix of new and established homes.",
      links: [
        {
          label: "What causes render cracking?",
          href: "/resources/render-cracking-adelaide/",
        },
        {
          label: "Acrylic or cement render?",
          href: "/resources/acrylic-render-vs-cement-render-adelaide/",
        },
        {
          label: "Preparing walls for render",
          href: "/resources/preparing-walls-for-render-adelaide/",
        },
        {
          label: "Rendering over painted brick",
          href: "/resources/rendering-over-painted-brick-adelaide/",
        },
        {
          label: "Cladding over brick",
          href: "/resources/cladding-over-brick-adelaide/",
        },
        {
          label: "Replacing asbestos cladding",
          href: "/resources/asbestos-cladding-replacement-adelaide/",
        },
        {
          label: "Hebel or brick veneer?",
          href: "/resources/hebel-vs-brick-veneer-adelaide/",
        },
        {
          label: "Steel or timber wall framing?",
          href: "/resources/steel-frame-vs-timber-frame-walls-adelaide/",
        },
        {
          label: "Hebel boundary walls",
          href: "/resources/hebel-boundary-walls-adelaide/",
        },
        {
          label: "Choosing a Hebel installer",
          href: "/resources/choosing-a-hebel-installer-adelaide/",
        },
        {
          label: "What affects a quote",
          href: "/resources/what-affects-cladding-render-quotes-adelaide/",
        },
      ],
    },
    proof: [
      "A Salisbury East-based team that travels to your site",
      "Coverage confirmed for your suburb or postcode before quoting",
      "Clear quotes covering the work, materials and programme assumptions",
    ],
    faqs: [
      {
        question: "Where are you based in northern Adelaide?",
        answer:
          "We are based in Salisbury East. We are a service-area contractor, so we travel to the site rather than operating a showroom.",
      },
      {
        question: "Do you cover all of Adelaide’s northern suburbs?",
        answer:
          "Northern Adelaide is within our primary service area of metropolitan Adelaide. Availability depends on the scope, programme and site access, so tell us the suburb or postcode and we will confirm coverage before quoting.",
      },
      {
        question: "Does reactive clay soil mean I should avoid render?",
        answer:
          "No. It means the wall’s movement has to be allowed for. Movement and control joints are kept rather than rendered over, the render system is chosen to suit the substrate, and existing cracking is understood before a new finish goes on. Where movement is significant, a suitably qualified professional should assess the cause first.",
      },
      {
        question:
          "Do you work on new homes and multi-unit developments in the north?",
        answer:
          "We install cladding, render, Hebel and walling for new homes and multi-unit developments, working from the drawings to the builder’s programme. Tell us the location and what documents are available, and we will confirm the scope before quoting.",
      },
    ],
    contactIntro:
      "Planning cladding, render, Hebel or walling work in Adelaide’s northern suburbs? Tell us the suburb or postcode, the work you have in mind and what plans or photos are available.",
  },
  {
    slug: "coastal-adelaide",
    name: "Coastal Adelaide",
    areaPhrase: "coastal Adelaide",
    hubLabel: "Coastal suburbs",
    hubTitle: "Cladding, render, Hebel and walling for coastal Adelaide",
    hubSummary:
      "See how salt air and wind change the system, the fixings and the upkeep for sites near the gulf.",
    bannerTitle: "Cladding, Render, Hebel & Walling in Coastal Adelaide",
    metaTitle: "Cladding & Render Coastal Adelaide",
    metaDescription:
      "Cladding, render, Hebel and walling for coastal Adelaide sites, planned around salt, wind and product-specific maintenance requirements.",
    socialCard: "locations",
    introHeading: "Wall systems and finishes for coastal Adelaide sites",
    intro: [
      "Close to Gulf St Vincent, salt in the air and wind off the water are part of the brief. They work on fasteners, flashings, coatings and rendered surfaces in ways an inland site does not see, which is why manufacturers publish separate requirements for coastal conditions. Suburbs such as Semaphore, Grange, Henley Beach, Glenelg and Brighton are the usual examples, but exposure depends on the site rather than the suburb name.",
      `${business.name} installs cladding, applies render, installs Hebel and carries walling for coastal Adelaide projects from our base in ${business.address.suburb}. This page explains what changes near the coast and what to confirm before a system is chosen. It is not a list of completed jobs; we do not publish project addresses.`,
    ],
    servicesLead:
      "For coastal sites we offer cladding and facade installation, internal and external render, Hebel wall systems and walling, each installed to the requirements the selected system documents for the site’s exposure.",
    sections: [
      {
        id: "coastal-exposure",
        heading: "What salt and wind change",
        paragraphs: [
          "Exposure is a property of the site, not of a postcode. Distance from the water, whether an elevation faces the prevailing weather, and how sheltered it is by other buildings all matter, and two houses in the same street can sit in different positions. Manufacturers’ literature deals with this through documented exposure categories, and it is the designer’s or specifier’s job to confirm which one applies.",
          "What we do with that information is practical. The category decides which products are suitable, which fixings and flashings are specified, and what the maintenance conditions are. We raise it when quoting, and we install to what the selected system documents for that exposure.",
        ],
      },
      {
        id: "coastal-cladding",
        heading: "Cladding near the coast",
        paragraphs: [
          "On a clad wall, the parts that carry the salt load are mostly the ones you cannot see once the boards are on: fasteners, flashings, battens and the cavity behind the face. Product selection, fixing material and cavity detailing all need to match the manufacturer’s coastal requirements, and coated boards have their own cleaning and recoating conditions.",
          "Our [coastal cladding maintenance guide](/resources/cladding-maintenance-coastal-adelaide/) explains how to find and follow product-specific care instructions rather than a generic schedule. The [fibre cement or weatherboard comparison](/resources/fibre-cement-vs-weatherboard-cladding-adelaide/), the [fibre cement cladding guide](/resources/fibre-cement-cladding-adelaide/) and the [vertical or horizontal cladding guide](/resources/vertical-vs-horizontal-cladding-adelaide/) cover how coastal exposure affects material, fixing and cavity choices. Where the frame itself is still being decided, the [steel or timber framing guide](/resources/steel-frame-vs-timber-frame-walls-adelaide/) discusses coastal corrosion.",
        ],
      },
      {
        id: "coastal-render",
        heading: "Render near the coast",
        paragraphs: [
          "On a rendered wall, the coating is the exposed layer. Its job shifts towards keeping moisture and salt out of the substrate as well as carrying the colour. Deep colours and heavy textures in salt-laden air are a combination to think through before committing: coarser profiles hold more dust and salt, and maintenance cycles depend on colour, exposure and location.",
          "Our [render finishes guide](/resources/render-finishes-adelaide/) and [acrylic or cement render comparison](/resources/acrylic-render-vs-cement-render-adelaide/) cover those choices, and the [repainting rendered walls guide](/resources/repainting-render-adelaide/) explains what an existing elevation needs before a recoat.",
          "Older masonry homes near the beach raise a separate question. White, powdery deposits and crumbling mortar low on a wall point to salt damp, which is a moisture problem in the wall rather than a finish problem. Rendering over it does not fix it. Our [salt damp guide](/resources/salt-damp-adelaide/) explains what has to be assessed first, and the [render repair guide](/resources/render-repair-adelaide/) covers how a repair scope is decided once the cause is dealt with.",
        ],
      },
      {
        id: "coastal-hebel-and-walling",
        heading: "Hebel and walling on exposed sites",
        paragraphs: [
          "Hebel external walls rely on their coating system for weather protection, so on an exposed site the coating specification and its upkeep matter as much as the panels. Fixings and any steel in the wall or frame are selected for the conditions by the designer or engineer. Our [Hebel or brick veneer comparison](/resources/hebel-vs-brick-veneer-adelaide/) notes what coastal exposure changes for each wall type, and the [rendering Hebel panels guide](/resources/rendering-hebel-panels-adelaide/) covers the coating system.",
          "Where a coastal block is narrow and a wall sits on or near a boundary, the [Hebel boundary walls guide](/resources/hebel-boundary-walls-adelaide/) sets out the documents, access and responsibilities to confirm first.",
        ],
      },
      {
        id: "coastal-planning",
        heading: "What to confirm before a coastal quote",
        paragraphs: [
          "For a site near the coast, it helps to settle these before asking for a price:",
        ],
        bullets: [
          "The suburb or postcode, and how exposed each elevation is to the water and the prevailing weather",
          "The exposure category nominated by your designer or the product manufacturer, if there is one",
          "The exact product, fixing and coating specification, including the manufacturer’s coastal requirements",
          "The cleaning and maintenance conditions attached to the product warranty",
          "Any heritage or character considerations on the property",
        ],
        closing: [
          "Adelaide’s metropolitan coast sits within our primary service area, but availability still depends on the scope, the programme and the site access, so tell us the suburb or postcode and we will confirm coverage before quoting. Our guide to [what affects a quote](/resources/what-affects-cladding-render-quotes-adelaide/) explains how exposure changes the price, without publishing rates.",
        ],
      },
    ],
    guides: {
      intro:
        "These guides deal with salt, wind and upkeep, and with the older masonry homes found near the beach.",
      links: [
        {
          label: "Coastal cladding maintenance",
          href: "/resources/cladding-maintenance-coastal-adelaide/",
        },
        {
          label: "Fibre cement or weatherboard?",
          href: "/resources/fibre-cement-vs-weatherboard-cladding-adelaide/",
        },
        {
          label: "Fibre cement cladding installation",
          href: "/resources/fibre-cement-cladding-adelaide/",
        },
        {
          label: "Vertical or horizontal cladding?",
          href: "/resources/vertical-vs-horizontal-cladding-adelaide/",
        },
        {
          label: "Steel or timber wall framing?",
          href: "/resources/steel-frame-vs-timber-frame-walls-adelaide/",
        },
        {
          label: "Facade recladding",
          href: "/resources/facade-recladding-adelaide/",
        },
        {
          label: "Render finishes and textures",
          href: "/resources/render-finishes-adelaide/",
        },
        {
          label: "Acrylic or cement render?",
          href: "/resources/acrylic-render-vs-cement-render-adelaide/",
        },
        {
          label: "Repainting rendered walls",
          href: "/resources/repainting-render-adelaide/",
        },
        {
          label: "Salt damp and render",
          href: "/resources/salt-damp-adelaide/",
        },
        {
          label: "Render repair",
          href: "/resources/render-repair-adelaide/",
        },
        {
          label: "Hebel or brick veneer?",
          href: "/resources/hebel-vs-brick-veneer-adelaide/",
        },
      ],
    },
    proof: [
      "Exposure raised when quoting, not after materials are ordered",
      "Installation to the selected system’s documented coastal requirements",
      "Coverage confirmed for your suburb or postcode before quoting",
    ],
    faqs: [
      {
        question: "Is cladding or render better near the coast?",
        answer:
          "Neither is automatically better. On a clad wall the fixings, flashings and coated boards carry the salt load; on a rendered wall the coating does. Both can suit coastal sites when the product, fixings and detailing are specified for the exposure and the maintenance conditions are followed.",
      },
      {
        question: "How close to the beach counts as coastal?",
        answer:
          "There is no single distance that applies to every product. Manufacturers use documented exposure categories that depend on the site, and your designer or the product manufacturer confirms which one applies. We install to the requirements the selected system sets for that category.",
      },
      {
        question:
          "How often does coastal cladding or render need maintenance?",
        answer:
          "It depends on the exact product, its finish and the exposure, so there is no universal schedule. Follow the current manufacturer guidance for cleaning, inspection and recoating. Our coastal cladding maintenance guide explains how to find it.",
      },
      {
        question: "Can you render over salt damp on an older beachside home?",
        answer:
          "No. Salt damp is a moisture problem in the wall, and rendering over it usually makes the damage worse. It needs to be assessed and dealt with at its source before a new finish is considered.",
      },
      {
        question: "Do you service all of Adelaide’s coastal suburbs?",
        answer:
          "Adelaide’s metropolitan coast is within our primary service area, but availability depends on the scope, programme and site access. Tell us the suburb or postcode and we will confirm coverage before quoting. Coastal sites elsewhere in South Australia are assessed individually.",
      },
    ],
    contactIntro:
      "Planning cladding, render, Hebel or walling work near the coast? Tell us the suburb or postcode, how exposed the site is and what plans or photos are available.",
  },
  {
    slug: "adelaide-hills",
    name: "Adelaide Hills",
    areaPhrase: "the Adelaide Hills",
    hubLabel: "Adelaide Hills",
    hubTitle: "Cladding, render, Hebel and walling in the Adelaide Hills",
    hubSummary:
      "See how bushfire-related requirements, exposure and sloping access shape wall work in the Hills, and how coverage is confirmed.",
    bannerTitle: "Cladding, Render, Hebel & Walling in the Adelaide Hills",
    metaTitle: "Cladding & Render Adelaide Hills",
    metaDescription:
      "Cladding, render, Hebel and walling for Adelaide Hills projects, planned around exposure, access and bushfire-related design requirements.",
    socialCard: "locations",
    introHeading: "Wall systems and finishes for Adelaide Hills projects",
    intro: [
      "Hills projects are planned around three things that matter less on the plains: bushfire-related design requirements, exposure on elevated sites, and access on sloping blocks. Each one can change which wall system is suitable and how it is installed, so each needs to be confirmed before a product is chosen.",
      `${business.name} is based in ${business.address.suburb} on the Adelaide plains. Metropolitan Adelaide is our primary service area, and Hills projects are confirmed case by case: tell us the suburb or postcode and what plans are available, and we will confirm coverage before quoting. This page explains what we would need to know. It is not a list of completed jobs; we do not publish project addresses.`,
    ],
    servicesLead:
      "Where a Hills project is within reach, we offer cladding and facade installation, internal and external render, Hebel wall systems and walling, installed to the documented design and its bushfire and exposure requirements.",
    sections: [
      {
        id: "hills-coverage",
        heading: "How coverage works for the Hills",
        paragraphs: [
          "The Adelaide Hills covers a wide area, from the foothills on the edge of the metropolitan area to townships well beyond it. We do not claim to cover every township. Whether we can take a project depends on the location, the scope, the programme, the travel involved and the site access.",
          "The quickest way to find out is to tell us the suburb or postcode, the kind of work and which drawings exist. We will confirm whether the location is workable before preparing a quote, in the same way we assess any South Australian site outside metropolitan Adelaide.",
        ],
      },
      {
        id: "hills-bushfire",
        heading: "Bushfire-related design requirements",
        paragraphs: [
          "Parts of metropolitan Adelaide sit inside designated bushfire-prone areas, most visibly through the Hills Face Zone and the wider Adelaide Hills. A property in one of those areas may need a site-specific Bushfire Attack Level (BAL) assessment before the cladding, and the rest of the external wall system, can be finalised against the construction requirements for that rating.",
          "That assessment is not ours to make. Confirming a BAL, the combustibility requirements and planning consent is the role of a bushfire consultant, designer or building surveyor. We install the system the approved documents specify, and we ask for the assessed rating before pricing external wall work on a Hills site.",
          "The rating narrows the material choices. Our [fibre cement or weatherboard comparison](/resources/fibre-cement-vs-weatherboard-cladding-adelaide/) explains how bushfire-prone zoning affects cladding selection, the [steel or timber framing guide](/resources/steel-frame-vs-timber-frame-walls-adelaide/) covers the framing side, and the [fibre cement cladding guide](/resources/fibre-cement-cladding-adelaide/) explains how an installation is planned once the product is chosen.",
        ],
      },
      {
        id: "hills-exposure-and-access",
        heading: "Exposure, climate zone and access",
        paragraphs: [
          "Elevated and open sites see more wind and weather than a sheltered suburban block. For cladding, that affects how the system has to be fixed and how its junctions are detailed, as set out in the selected system’s installation guide. For render, application is planned around the temperature and drying limits in the product data sheet.",
          "The building code also places the Adelaide Hills in a different climate zone from metropolitan Adelaide, which changes the insulation and cavity requirements for the wall as a whole. The zones do not follow council boundaries, so the address itself needs checking. Our [external wall insulation guide](/resources/external-wall-insulation-adelaide/) explains why a Hills elevation and a plains elevation are not the same detail.",
          "Sloping blocks change the logistics. Working height on the downhill side, scaffold on uneven ground, material delivery and storage, and vehicle access all affect how the work is staged and priced. Photos or drawings showing the fall of the site make a first conversation far more useful.",
        ],
      },
      {
        id: "hills-homes",
        heading: "New homes, extensions and character properties",
        paragraphs: [
          "New Hills homes and extensions often combine systems: masonry or Hebel walls with a rendered finish, and cladding to upper levels or feature elements. Our [Hebel or brick veneer comparison](/resources/hebel-vs-brick-veneer-adelaide/) and [cladding or render guide](/resources/cladding-vs-render-adelaide/) cover the choices that usually come first, and a [second-storey addition](/resources/second-storey-addition-adelaide/) raises its own structural questions for the walls below.",
          "Older stone and brick buildings need more care. Changing the external appearance of a heritage or character property can require approval, and damp masonry should be assessed before any render is considered. The [salt damp guide](/resources/salt-damp-adelaide/) and the [guide to preparing walls for render](/resources/preparing-walls-for-render-adelaide/) explain what to confirm.",
        ],
      },
      {
        id: "hills-planning",
        heading: "What to confirm before a Hills quote",
        paragraphs: [
          "Before asking for a price on a Hills project, it helps to have:",
        ],
        bullets: [
          "The suburb or postcode, so coverage can be confirmed first",
          "Whether the property is in a bushfire-prone area, and the assessed BAL if one has been done",
          "The drawings and specifications, including the wall systems nominated for that rating",
          "Any heritage, character or Hills Face Zone considerations raised by your designer or council",
          "Photos or a description of the slope, the access and the working heights",
        ],
        closing: [
          "Our guide to [what affects a quote](/resources/what-affects-cladding-render-quotes-adelaide/) explains how access and specification change the price, without publishing rates, and the [project planning page](/project-planning/) lists what else to gather.",
        ],
      },
    ],
    guides: {
      intro:
        "These guides cover bushfire-prone zoning, wall-system choices and the whole-wall questions that come up on Hills sites.",
      links: [
        {
          label: "Fibre cement or weatherboard?",
          href: "/resources/fibre-cement-vs-weatherboard-cladding-adelaide/",
        },
        {
          label: "Steel or timber wall framing?",
          href: "/resources/steel-frame-vs-timber-frame-walls-adelaide/",
        },
        {
          label: "Fibre cement cladding installation",
          href: "/resources/fibre-cement-cladding-adelaide/",
        },
        {
          label: "Facade recladding",
          href: "/resources/facade-recladding-adelaide/",
        },
        {
          label: "Cladding or render?",
          href: "/resources/cladding-vs-render-adelaide/",
        },
        {
          label: "Hebel or brick veneer?",
          href: "/resources/hebel-vs-brick-veneer-adelaide/",
        },
        {
          label: "External wall insulation",
          href: "/resources/external-wall-insulation-adelaide/",
        },
        {
          label: "Second-storey additions",
          href: "/resources/second-storey-addition-adelaide/",
        },
        {
          label: "Preparing walls for render",
          href: "/resources/preparing-walls-for-render-adelaide/",
        },
        {
          label: "Salt damp and render",
          href: "/resources/salt-damp-adelaide/",
        },
        {
          label: "What affects a quote",
          href: "/resources/what-affects-cladding-render-quotes-adelaide/",
        },
      ],
    },
    proof: [
      "Coverage confirmed for your suburb or postcode before any quote is prepared",
      "The assessed bushfire rating requested before external wall work is priced",
      "Installation to the approved documents and the selected system’s requirements",
    ],
    faqs: [
      {
        question: "Do you service the whole Adelaide Hills?",
        answer:
          "Not automatically. Metropolitan Adelaide is our primary service area, and Hills projects are confirmed case by case, depending on the location, scope, programme and site access. Tell us the suburb or postcode and we will confirm coverage before quoting.",
      },
      {
        question: "Do you assess the Bushfire Attack Level for my property?",
        answer:
          "No. A BAL assessment is carried out by a bushfire consultant, designer or building surveyor. We ask for the assessed rating and install the wall system the approved documents specify for it.",
      },
      {
        question: "Which cladding suits a bushfire-prone Hills site?",
        answer:
          "That depends on the assessed BAL for the site and the products documented for that rating, so it is confirmed by the project’s designer or bushfire consultant rather than chosen from a general preference. Our fibre cement or weatherboard guide explains how bushfire-prone zoning narrows the options.",
      },
      {
        question: "Does a sloping block change the quote?",
        answer:
          "It can. Working height, scaffold on uneven ground, access for materials and how the work is staged all affect the scope. Photos or drawings that show the slope help us understand the site before quoting.",
      },
    ],
    contactIntro:
      "Planning cladding, render, Hebel or walling work in the Adelaide Hills? Tell us the suburb or postcode first so we can confirm coverage, then the work you have in mind and what plans or photos are available.",
  },
];

export function getLocation(slug: string) {
  return locationPages.find((location) => location.slug === slug);
}
