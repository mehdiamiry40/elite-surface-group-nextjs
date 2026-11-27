import type {
  ChecklistItem,
  ComparisonTableData,
  CompatibilityRow,
  ProblemRow,
  Step,
} from "./blocks.ts";
// Relative imports with their extension, so `node --test` can load this module
// for `src/lib/location-content.test.ts` without the `@/` path alias.
import { business } from "./business.ts";
import type { ContentSection, ServiceFaq } from "./services.ts";

/** Headings for a three-column guide table: the row heading, then two cells. */
type GuideColumns = readonly [string, string, string];

/**
 * A multi-format block set inside a long-form location section, after its
 * paragraphs and before its closing copy. Each one maps to a component in
 * `src/components/ContentBlocks.tsx`; `LocationSections` in the location page
 * does the mapping.
 *
 * Any string in a block may carry inline links written as `[label](/path/)`.
 */
export type LocationBlock =
  | {
      kind: "comparison";
      table: ComparisonTableData;
      /**
       * Four or more columns of sentences need more room than the reading
       * column. A wide table is rendered last in its section, so a section
       * that has one carries no `closing` copy.
       */
      wide?: boolean;
    }
  | {
      /** A site condition, what it means for a wall and what to confirm. */
      kind: "conditions";
      caption: string;
      columns: GuideColumns;
      rows: readonly CompatibilityRow[];
    }
  | {
      /** What the owner notices, what it can indicate and what to do next. */
      kind: "problems";
      caption: string;
      rows: readonly ProblemRow[];
    }
  | { kind: "checklist"; items: readonly ChecklistItem[] }
  | { kind: "steps"; steps: readonly Step[] };

/** A long-form location section, optionally carrying multi-format blocks. */
export type LocationSection = ContentSection & {
  blocks?: readonly LocationBlock[];
};

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
  sections: readonly LocationSection[];
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
  comparisonTitle: "How the four areas compare",
  comparisonIntro:
    "Each area page starts from a different question. The table sets them side by side: the conditions that stand out, what they change for a wall, and what to confirm before a system is chosen. Follow an area name for the full page.",
  comparisonNote:
    "Treat the table as a starting point. Soil, exposure and bushfire designation belong to the property rather than the suburb, so two sites in the same area can raise different questions.",
  siteChecklistTitle: "What to tell us about your site",
  siteChecklistIntro:
    "Wherever the project is, the same site details let us confirm coverage and work out which of those questions apply. Gaps are fine: tell us what you know and what is still being decided.",
  siteChecklistClosing:
    "The [project planning page](/project-planning/) has the full site-readiness checklist and what to have ready for each type of project.",
} as const;

/**
 * The four service areas side by side, for the service-area hub.
 *
 * Every cell restates what that area's own page says below: reactive clay in
 * the north, salt and wind on the coast, and slope, exposure and
 * bushfire-related requirements in the Hills. Nothing here is a rating, an
 * approval outcome or a claim about a completed job.
 */
export const areaComparison: ComparisonTableData = {
  caption: "Metropolitan, northern, coastal and Hills sites compared",
  rowHeading: "Area",
  columns: [
    "Conditions that stand out",
    "What they change for a wall",
    "What to confirm first",
  ],
  rows: [
    {
      label: "Metropolitan Adelaide",
      href: "/locations/adelaide/",
      cells: [
        "Reactive clay soils across much of the plains, hot and dry summers, and salt damp in some older stone and brick homes.",
        "Render bonded to a moving wall shows the movement, summer heat affects how render cures, and damp masonry has to be assessed before it is rendered.",
        "What the walls are built from, whether they have been coated or clad before, and which drawings or specifications exist.",
      ],
    },
    {
      label: "Northern Adelaide",
      href: "/locations/northern-adelaide/",
      cells: [
        "Soil movement. Reactive clay is common on the plains, and the ground swells and shrinks as it wets and dries through the year.",
        "A rendered wall shows movement as cracking and a clad wall tends to show it at the joints, so movement and control joints are kept rather than rendered over.",
        "Whether cracks are already present and what is causing them, and what the existing wall is built from.",
      ],
    },
    {
      label: "Coastal Adelaide",
      href: "/locations/coastal-adelaide/",
      cells: [
        "Salt and wind. Exposure depends on the site rather than the suburb name: the distance from the water, the way an elevation faces and how sheltered it is.",
        "The exposure category decides which products are suitable, which fixings and flashings are specified, and what the maintenance conditions are.",
        "The exposure category nominated by your designer or the product manufacturer, and the product, fixing and coating specification.",
      ],
    },
    {
      label: "Adelaide Hills",
      href: "/locations/adelaide-hills/",
      cells: [
        "Slope and access, exposure on elevated sites, and bushfire-related design requirements.",
        "Sloping blocks change working heights, scaffold and deliveries. In a bushfire-prone area, a site-specific Bushfire Attack Level (BAL) assessment may be needed before the external wall system can be finalised.",
        "Coverage for the suburb or postcode first, then the assessed BAL if one has been done, and photos or drawings showing the fall of the site.",
      ],
    },
  ],
};

/**
 * Site details worth having for any area. The project planning page stays the
 * canonical checklist; this one covers only what describes the site itself and
 * the hub links on to the full list.
 */
export const siteChecklist: readonly ChecklistItem[] = [
  {
    label: "Suburb or postcode",
    detail: "Coverage is confirmed from the location before a quote is prepared.",
  },
  {
    label: "New, existing or occupied",
    detail:
      "Whether the building is new or existing, and whether it will be lived in or trading while the work is done.",
  },
  {
    label: "What the walls are built from",
    detail: "Include any coating or cladding already on them.",
  },
  {
    label: "Cracks, damp or earlier repairs",
    detail:
      "Anything you have noticed on the walls, and whether it changes through the year.",
  },
  {
    label: "Exposure",
    detail:
      "How open each elevation is to the coast or the weather, and any exposure category your designer has nominated.",
  },
  {
    label: "Slope, access and working height",
    detail:
      "How each wall is reached, including narrow side access, boundaries and sloping ground.",
  },
  {
    label: "Bushfire, heritage or character considerations",
    detail:
      "Anything already raised by your designer or council, and the assessed BAL if one has been done.",
  },
  {
    label: "Drawings and documents",
    detail:
      "Which plans, engineering details or specifications exist, and what stage approvals are at.",
  },
];

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
        blocks: [
          {
            kind: "conditions",
            caption: "Adelaide conditions and what each means for a wall",
            columns: [
              "Local condition",
              "What it means for a wall",
              "What to confirm",
            ],
            rows: [
              {
                condition: "Reactive clay soils on the plains",
                approach:
                  "The ground moves with the seasons and the walls above follow. Render shows that movement as cracking, and cladding tends to show it at the joints.",
                confirm:
                  "Whether cracks are already present and what is causing them. Our [northern Adelaide page](/locations/northern-adelaide/) covers movement in detail.",
              },
              {
                condition: "Hot, dry and windy summer days",
                approach:
                  "They affect how render cures, so application is planned around the limits in the product data sheet.",
                confirm:
                  "The dates you are working to, so the programme can allow for those limits.",
              },
              {
                condition: "Salt air and wind near the gulf",
                approach:
                  "Both are harder on fixings, flashings and coatings, and manufacturers publish separate requirements for coastal conditions.",
                confirm:
                  "The exposure category for the site, nominated by your designer or the product manufacturer. See [coastal Adelaide](/locations/coastal-adelaide/).",
              },
              {
                condition: "Salt damp in older stone and brick homes",
                approach:
                  "It is a moisture problem in the wall rather than a finish problem, and rendering over it does not fix it.",
                confirm:
                  "That the cause has been assessed and dealt with at its source first. The [salt damp guide](/resources/salt-damp-adelaide/) explains why.",
              },
              {
                condition: "Bushfire-prone areas in the foothills and the Hills",
                approach:
                  "A site-specific Bushfire Attack Level (BAL) assessment may be needed before the external wall system can be finalised.",
                confirm:
                  "Whether the property is in a bushfire-prone area and the assessed BAL, through your designer or a bushfire consultant. See the [Adelaide Hills page](/locations/adelaide-hills/).",
              },
              {
                condition: "Sloping blocks and elevated sites",
                approach:
                  "Working height, scaffold on uneven ground and material delivery change how the work is staged, and open sites see more wind and weather.",
                confirm:
                  "Photos or drawings showing the fall of the site and how each wall is reached.",
              },
              {
                condition: "Heritage and character properties",
                approach:
                  "Changing the external appearance of the building can require approval.",
                confirm:
                  "Any heritage or character considerations already raised by your designer or council.",
              },
            ],
          },
        ],
      },
      {
        id: "adelaide-services",
        heading: "The four services on Adelaide sites",
        paragraphs: [
          "We install all four services across metropolitan Adelaide, and each one meets those local conditions differently. The table sets out the projects each one typically suits here, the local condition worth raising early, and the guides to start with. For what each service covers in general, see the [services comparison](/services/).",
        ],
        blocks: [
          {
            kind: "comparison",
            wide: true,
            table: {
              caption: "Cladding, render, Hebel and walling on Adelaide sites",
              rowHeading: "Service",
              columns: [
                "Typical Adelaide projects",
                "Local condition to raise early",
                "Guides to start with",
              ],
              rows: [
                {
                  label: "Cladding",
                  href: "/cladding/",
                  cells: [
                    "Complete facades and feature elevations on new homes, renovations and commercial builds, and upper levels or feature elements set against render or brick.",
                    "Site exposure. Salt near the gulf and wind on open or elevated sites change the fixings, flashings and detailing a system needs.",
                    "[Cladding or render?](/resources/cladding-vs-render-adelaide/) and [coastal cladding maintenance](/resources/cladding-maintenance-coastal-adelaide/).",
                  ],
                },
                {
                  label: "Render",
                  href: "/render/",
                  cells: [
                    "New masonry and panel walls, and established brick homes being refreshed, repaired or re-rendered.",
                    "Seasonal movement on reactive clay, summer heat while the render cures, and salt damp in older stone and brick walls.",
                    "[What causes render cracking?](/resources/render-cracking-adelaide/) and [salt damp and render](/resources/salt-damp-adelaide/).",
                  ],
                },
                {
                  label: "Hebel",
                  href: "/hebel/",
                  cells: [
                    "External walls on new homes, walls on or near a boundary, and walls between attached dwellings, where the drawings specify Hebel.",
                    "Which documented system the drawings call for, and the coating system on exposed sites, where the coating is the wall’s weather protection.",
                    "[Hebel or brick veneer?](/resources/hebel-vs-brick-veneer-adelaide/) and [Hebel boundary walls](/resources/hebel-boundary-walls-adelaide/).",
                  ],
                },
                {
                  label: "Walling",
                  href: "/walling/",
                  cells: [
                    "Internal and external wall packages on new homes, extensions and renovations, multi-unit developments and commercial projects.",
                    "The climate zone for the address, which changes the insulation and cavity requirements, and any coastal or bushfire-related requirements for the wall build-up.",
                    "[Steel or timber wall framing?](/resources/steel-frame-vs-timber-frame-walls-adelaide/) and [external wall insulation](/resources/external-wall-insulation-adelaide/).",
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        id: "planning-checks",
        heading: "Planning checks before you ask for a quote",
        paragraphs: [
          "A quote is only as firm as the information behind it. Before you enquire, it helps to know:",
        ],
        blocks: [
          {
            kind: "checklist",
            items: [
              {
                label: "Suburb or postcode",
                detail:
                  "Say whether the building is new, existing or occupied.",
              },
              {
                label: "Wall construction",
                detail:
                  "What the walls are built from, and whether they have been coated or clad before.",
              },
              {
                label: "Drawings and documents",
                detail:
                  "Which drawings, engineering details or specifications exist, and what stage approvals are at.",
              },
              {
                label: "Site considerations",
                detail:
                  "Any heritage, character, bushfire or coastal considerations already raised by your designer or council.",
              },
              {
                label: "Access and programme",
                detail:
                  "The site access, the working height and the programme you are working to.",
              },
              {
                label: "Current photos",
                detail:
                  "Each wall in the work, and any cracks, damp or earlier repairs you have noticed.",
              },
            ],
          },
        ],
        closing: [
          "The [site-readiness checklist](/project-planning/#site-readiness) on the project planning page goes further, grouped by photos, documents, access, system and programme.",
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
      {
        question: "Which Adelaide conditions affect cladding and render?",
        answer:
          "Reactive clay soils across much of the Adelaide plains move with the seasons, hot and dry summers affect how render cures, salt air near the gulf is harder on fixings, flashings and coatings, and older stone and brick homes can carry salt damp. None of these rules a finish in or out by itself, but each should be raised before a system is chosen.",
      },
      {
        question: "What should I have ready before asking for an Adelaide quote?",
        answer:
          "The suburb or postcode, what the walls are built from, which drawings or specifications exist, any heritage, character, bushfire or coastal considerations already raised, and the site access, working height and programme. Current photos of the walls help too. Gaps are fine: tell us what is still being decided.",
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
        blocks: [
          {
            kind: "conditions",
            caption: "Reactive clay and movement: what to allow for",
            columns: [
              "Wall or detail",
              "What movement means for it",
              "What to confirm first",
            ],
            rows: [
              {
                condition: "Rendered brick or masonry",
                approach:
                  "Render is comparatively rigid, so movement in the wall or the footing under it shows as cracking in the finish.",
                confirm:
                  "Whether existing cracks are stable, and what is causing them, before a new finish goes on.",
              },
              {
                condition: "Clad walls",
                approach:
                  "Movement tends to show at the joints rather than across the face of the boards or panels.",
                confirm:
                  "The joint and fixing details in the selected system’s installation guide.",
              },
              {
                condition: "Movement and control joints",
                approach:
                  "They are there to take up movement, so they are kept and carried through the finish rather than rendered over.",
                confirm:
                  "Where the joints are, on the drawings or on the wall itself.",
              },
              {
                condition: "Junctions between old and new work",
                approach:
                  "An extension and the original house can move differently, and so can two different wall materials where they meet.",
                confirm:
                  "How the junction is detailed, and whether a joint is specified there.",
              },
              {
                condition: "Smooth, dead-flat render finishes",
                approach:
                  "They are the least forgiving choice on a house that moves seasonally.",
                confirm:
                  "The finish against a sample, and the render system that suits the substrate. Our [acrylic or cement render comparison](/resources/acrylic-render-vs-cement-render-adelaide/) covers the choice.",
              },
              {
                condition: "Hebel walls",
                approach:
                  "The control joints formed in the panels are carried through the coating system rather than rendered over.",
                confirm:
                  "The Hebel system and the joint details the drawings specify.",
              },
              {
                condition: "Steel or timber wall framing",
                approach:
                  "Neither resolves footing movement on reactive soil. That is managed through site classification and footing design.",
                confirm:
                  "The site classification and footing design, with your designer or engineer. See the [steel or timber framing guide](/resources/steel-frame-vs-timber-frame-walls-adelaide/).",
              },
            ],
          },
        ],
      },
      {
        id: "northern-problems",
        heading: "Render cracks and junction problems: what they can mean",
        navLabel: "Render cracks and junction problems",
        paragraphs: [
          "A crack pattern is a clue, not a diagnosis. The table lists signs that come up on rendered and clad walls, what each can indicate, and the sensible next step. Our guide to [what causes render cracking](/resources/render-cracking-adelaide/) goes further into the causes and who should assess them.",
        ],
        blocks: [
          {
            kind: "problems",
            caption: "Render cracking and junction problems on moving ground",
            rows: [
              {
                problem: "A fine crack in the render that has not changed",
                indicates:
                  "It may be limited to the coating, but appearance alone cannot show whether the wall behind is moving.",
                next: "Photograph it with the wall around it, date the record and check it again before choosing a repair.",
              },
              {
                problem: "A crack that opens and closes with the seasons",
                indicates:
                  "Seasonal ground movement, where reactive clay is present. In older masonry, some seasonal cracks are widest near the end of summer and close as moisture returns.",
                next: "Keep a dated record through a season. Movement-related work may need independent structural or geotechnical advice.",
              },
              {
                problem: "A crack that returns after filling or painting",
                indicates:
                  "The filler or paint covered the line without dealing with the movement, moisture, adhesion or joint detailing beneath it.",
                next: "Have the cause confirmed, and whether it is still active, before another repair.",
              },
              {
                problem:
                  "Cracking at a window corner, or where two wall materials meet",
                indicates:
                  "The connected materials may be moving differently at that junction.",
                next: "Check whether a movement or control joint is specified there, and describe the junction when you enquire.",
              },
              {
                problem: "A crack along a movement joint that was rendered across",
                indicates:
                  "A rigid finish carried across a movement joint relocates the stress into the surface instead of removing it.",
                next: "The repair has to correct the detailing: the joint is reinstated and carried through the finish, not covered again.",
              },
              {
                problem: "Render that sounds hollow when tapped, or is bulging",
                indicates:
                  "Render that has lost its bond with the wall, often called drummy. A crack or bulge may sit at the edge of a much larger unbonded area.",
                next: "Have the area mapped. A small, isolated hollow can be cut out and rebuilt, while hollow render across an elevation points to a wider re-render. See the [render repair guide](/resources/render-repair-adelaide/).",
              },
              {
                problem:
                  "A crack that runs through the wall, shows on both faces, or comes with distortion at doors or windows",
                indicates:
                  "Possible movement in the wall, the footing or the ground, rather than a problem with the finish.",
                next: "Arrange prompt assessment by a structural engineer before any refinishing is scoped.",
              },
            ],
          },
        ],
        closing: [
          "We apply render and install wall systems; we do not diagnose structural movement. Where movement is significant, a suitably qualified professional should assess the cause before a new finish is priced.",
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
        blocks: [
          {
            kind: "checklist",
            items: [
              {
                label: "Suburb or postcode",
                detail: "Say whether the building is new or existing.",
              },
              {
                label: "Wall construction",
                detail:
                  "What the walls are built from, and any coating or cladding already on them.",
              },
              {
                label: "Cracks and earlier repairs",
                detail:
                  "Where they are, how long they have been there and whether they change through the year.",
              },
              {
                label: "Movement and control joints",
                detail: "Where they are, on the wall or on the drawings.",
              },
              {
                label: "Older fibre-cement sheeting",
                detail:
                  "Say if the house has it. It can contain asbestos, which has to be identified and removed under licence before recladding is scoped.",
              },
              {
                label: "Drawings and documents",
                detail:
                  "Drawings, engineering details or a builder’s scope, if they exist.",
              },
              {
                label: "Access and dates",
                detail:
                  "The access, the working height and the dates you are working to.",
              },
            ],
          },
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
      {
        question: "Can you render over existing cracks?",
        answer:
          "Not until the cause is understood. Filling or rendering over a moving crack can hide useful evidence and may fail again. A stable crack confined to the finish can be repaired, but movement in the wall or footing needs to be assessed by a suitably qualified professional first.",
      },
      {
        question: "Is cladding a safer choice than render on reactive clay?",
        answer:
          "Neither finish is ruled out, and neither removes the movement. A rendered wall shows it as cracking and a clad wall tends to show it at the joints, so both need the wall’s movement allowed for in the joints and the detailing.",
      },
      {
        question: "Does summer heat affect rendering in northern Adelaide?",
        answer:
          "Yes. Hot, dry and windy days affect how render cures, so application is planned around the limits in the product data sheet rather than squeezed into a heatwave.",
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
        blocks: [
          {
            kind: "conditions",
            caption: "Salt, wind, unwashed areas and upkeep at a glance",
            columns: ["Coastal factor", "What it changes", "What to confirm"],
            rows: [
              {
                condition: "Salt in the air",
                approach:
                  "It works on fasteners, flashings, coatings and rendered surfaces in ways an inland site does not see.",
                confirm:
                  "The manufacturer’s coastal requirements for the exact product, fixings and coating.",
              },
              {
                condition: "Wind off the water",
                approach:
                  "Elevations that face the prevailing weather are more exposed than sheltered ones, and wind affects how cladding has to be fixed.",
                confirm:
                  "Which elevations face the water and the weather, and the fixing requirements the selected system documents for the site.",
              },
              {
                condition: "Unwashed areas",
                approach:
                  "Salt can build up on surfaces that rain does not naturally wash, such as the areas below eaves and sheltered junctions.",
                confirm:
                  "Which parts of the facade will not be washed by rain, and what the product’s care instructions say about them.",
              },
              {
                condition: "Exposure category",
                approach:
                  "It decides which products are suitable, which fixings and flashings are specified, and what the maintenance conditions are.",
                confirm:
                  "The category your designer or the product manufacturer nominates. It belongs to the site, not the suburb.",
              },
              {
                condition: "Cleaning and upkeep",
                approach:
                  "There is no universal schedule. Cleaning, inspection and recoating follow the current guidance for the exact product and finish.",
                confirm:
                  "The manufacturer’s cleaning, inspection and recoating information, before the system is chosen. Our [coastal cladding maintenance guide](/resources/cladding-maintenance-coastal-adelaide/) explains how to find it.",
              },
              {
                condition: "Access for upkeep",
                approach:
                  "Cleaning or inspecting an upper level is work at height, which has to be planned rather than improvised.",
                confirm:
                  "How upper levels and difficult junctions can be reached safely later.",
              },
            ],
          },
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
        id: "coastal-systems",
        heading: "Cladding and coating choices at a glance",
        paragraphs: [
          "The sections above take each system in turn. This table puts them side by side: what coastal exposure changes for each wall or finish, and what to confirm before it is specified.",
        ],
        blocks: [
          {
            kind: "conditions",
            caption: "Cladding, render and coating considerations near the coast",
            columns: [
              "Wall or finish",
              "What coastal exposure changes",
              "Confirm first",
            ],
            rows: [
              {
                condition: "Fibre cement or timber weatherboard cladding",
                approach:
                  "Both need a maintained coating system. Manufacturer guidance generally asks for closer inspection, more frequent washing and fixings specified for coastal conditions within a defined distance of the coastline.",
                confirm:
                  "The current installation and care literature for the selected product, because the distance and the conditions vary. See the [fibre cement or weatherboard comparison](/resources/fibre-cement-vs-weatherboard-cladding-adelaide/).",
              },
              {
                condition: "Other coated cladding systems",
                approach:
                  "Finishes, fixings, joints and care limits differ between materials, so one product’s instructions do not carry over to another that looks similar.",
                confirm:
                  "The manufacturer, product profile and finish, and the current manual for that exact product.",
              },
              {
                condition: "Fasteners, flashings and battens",
                approach:
                  "They carry the salt load out of sight once the boards are on, so the fixing material and the cavity detailing have to match the manufacturer’s coastal requirements.",
                confirm:
                  "The fixings, flashings and cavity details specified for the site’s exposure.",
              },
              {
                condition: "Rendered masonry",
                approach:
                  "The coating is the exposed layer. Its job shifts towards keeping moisture and salt out of the substrate as well as carrying the colour.",
                confirm:
                  "The render and coating system, and what an existing elevation needs before a recoat. See the [repainting rendered walls guide](/resources/repainting-render-adelaide/).",
              },
              {
                condition: "Deep colours and heavy textures",
                approach:
                  "Coarser profiles hold more dust and salt, and maintenance cycles depend on colour, exposure and location.",
                confirm:
                  "The finish against a sample, with its upkeep in mind. The [render finishes guide](/resources/render-finishes-adelaide/) compares the options.",
              },
              {
                condition: "Hebel external walls",
                approach:
                  "They rely on their coating system for weather protection, so the coating specification and its upkeep matter as much as the panels.",
                confirm:
                  "The coating system documented for the panels, and which trade applies it. See the [rendering Hebel panels guide](/resources/rendering-hebel-panels-adelaide/).",
              },
              {
                condition: "Steel in the wall or frame",
                approach:
                  "Steel framing needs protection compatible with the exposure, and so do the metal straps, fasteners and connectors in a timber frame.",
                confirm:
                  "The protection your designer or engineer has specified for the conditions.",
              },
            ],
          },
        ],
      },
      {
        id: "coastal-problems",
        heading: "Common coastal problems and what to do next",
        paragraphs: [
          "Most coastal problems are first noticed as a mark on the surface. The table lists the common ones, what each can indicate, and the step that should come before any new finish.",
        ],
        blocks: [
          {
            kind: "problems",
            caption: "Coastal wall problems, what they can indicate and next steps",
            rows: [
              {
                problem:
                  "White, powdery deposits and crumbling mortar low on an older masonry wall",
                indicates:
                  "Salt damp: a moisture problem in the wall rather than a finish problem.",
                next: "Have the cause assessed and dealt with at its source before any render is considered. The [salt damp guide](/resources/salt-damp-adelaide/) explains what has to be checked.",
              },
              {
                problem:
                  "Render lifting, or a damp band rising above a newer coating",
                indicates:
                  "Moisture and salts held behind a coating that was applied over a damp wall.",
                next: "Hold off refinishing and have the moisture source assessed by a suitably qualified professional.",
              },
              {
                problem: "Rust-coloured staining on cladding or around fixings",
                indicates:
                  "Possible corrosion at a fastener, cut edge or flashing. Appearance alone does not identify its source, extent or significance.",
                next: "Record where it is, and have the materials and their interfaces assessed before the stain is covered or repaired.",
              },
              {
                problem:
                  "Dirt and salt building up under eaves and in sheltered corners",
                indicates:
                  "Unwashed areas: surfaces that rain does not naturally rinse.",
                next: "Follow the current care instructions for the confirmed product and finish. A wash interval or cleaner approved for one product may be wrong for another.",
              },
              {
                problem: "Paint or texture that is flaking, blistering or chalking",
                indicates:
                  "A coating that has aged or failed. That tells you about the coating before it tells you about the render beneath.",
                next: "Have the surface assessed for adhesion, moisture and cracking before a recoat. See the [repainting rendered walls guide](/resources/repainting-render-adelaide/).",
              },
              {
                problem: "Chips or scratches in coated boards at joints and corners",
                indicates:
                  "A break in the coating system that the cladding relies on.",
                next: "Attend to them promptly, using only the method the product’s current guidance allows.",
              },
              {
                problem:
                  "Loose or displaced boards, open joints, or damp inside near an opening",
                indicates:
                  "A problem that may involve the membrane, cavity, flashing or substrate behind the cladding, not only the surface.",
                next: "Arrange a prompt assessment by a facade or building consultant before any installation or replacement is scoped.",
              },
            ],
          },
        ],
        closing: [
          "We install and finish walls; we do not diagnose moisture or structural defects. Once the cause is known, the [render repair guide](/resources/render-repair-adelaide/) and the [facade recladding guide](/resources/facade-recladding-adelaide/) explain how a repair or replacement scope is decided.",
        ],
      },
      {
        id: "coastal-planning",
        heading: "What to confirm before a coastal quote",
        paragraphs: [
          "For a site near the coast, it helps to settle these before asking for a price:",
        ],
        blocks: [
          {
            kind: "checklist",
            items: [
              {
                label: "Suburb or postcode",
                detail:
                  "Note how exposed each elevation is to the water and the prevailing weather.",
              },
              {
                label: "Exposure category",
                detail:
                  "The one nominated by your designer or the product manufacturer, if there is one.",
              },
              {
                label: "Product, fixing and coating specification",
                detail:
                  "The exact products, including the manufacturer’s coastal requirements.",
              },
              {
                label: "Cleaning and maintenance conditions",
                detail:
                  "The conditions the manufacturer attaches to the product, and which areas rain will not wash.",
              },
              {
                label: "The existing wall and finish",
                detail:
                  "What the wall is built from, any earlier coating, and any salt deposits, staining or damp you have noticed.",
              },
              {
                label: "Access, now and later",
                detail:
                  "Working heights, narrow side access, any wall on or near a boundary, and how upper levels will be reached for upkeep.",
              },
              {
                label: "Heritage or character considerations",
                detail: "Any that apply to the property.",
              },
            ],
          },
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
      {
        question: "What are unwashed areas on a coastal home?",
        answer:
          "Surfaces that rain does not naturally wash, such as the areas below eaves and sheltered junctions. Salt can build up there, so the care instructions for some products treat them differently. Follow the current guidance for the exact product and finish.",
      },
      {
        question: "Does Hebel suit a coastal site?",
        answer:
          "It can. A Hebel external wall relies on its coating system for weather protection, so on an exposed site the coating specification and its upkeep matter as much as the panels. Fixings and any steel in the wall or frame are selected for the conditions by the designer or engineer.",
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
        id: "hills-considerations",
        heading: "Hills planning considerations at a glance",
        paragraphs: [
          "The three sections above cover a lot of ground. This table gathers them into one place: what each consideration changes, what to confirm, and who confirms it.",
        ],
        blocks: [
          {
            kind: "conditions",
            caption: "Slope, access, exposure and bushfire-related planning in the Hills",
            columns: [
              "Consideration",
              "What it changes",
              "What to confirm, and with whom",
            ],
            rows: [
              {
                condition: "Coverage and travel",
                approach:
                  "Hills projects are confirmed case by case, depending on the location, the scope, the programme, the travel involved and the site access.",
                confirm:
                  "The suburb or postcode, with us, before a quote is prepared.",
              },
              {
                condition: "Bushfire-prone designation",
                approach:
                  "A site-specific Bushfire Attack Level (BAL) assessment may be needed before the cladding, and the rest of the external wall system, can be finalised.",
                confirm:
                  "Whether the property is in a designated bushfire-prone area, with a bushfire consultant, designer or building surveyor.",
              },
              {
                condition: "The assessed rating",
                approach:
                  "The rating narrows the material choices, and the wall system has to be one that is documented for it.",
                confirm:
                  "The assessed BAL and the wall systems nominated for it in the approved documents. We ask for the rating before pricing external wall work.",
              },
              {
                condition: "Exposure on elevated or open sites",
                approach:
                  "More wind and weather than a sheltered suburban block, which affects how cladding is fixed and how its junctions are detailed.",
                confirm:
                  "The fixing and junction requirements in the selected system’s installation guide.",
              },
              {
                condition: "Climate zone",
                approach:
                  "The building code places the Adelaide Hills in a different climate zone from metropolitan Adelaide, which changes the insulation and cavity requirements for the wall as a whole.",
                confirm:
                  "The zone for the address itself, with your designer. The zones do not follow council boundaries. See the [external wall insulation guide](/resources/external-wall-insulation-adelaide/).",
              },
              {
                condition: "Slope and working height",
                approach:
                  "The downhill side of a sloping block is higher to work on, and scaffold has to stand on uneven ground.",
                confirm:
                  "Photos or drawings showing the fall of the site and the height of each wall.",
              },
              {
                condition: "Deliveries, storage and vehicle access",
                approach:
                  "Where materials can be unloaded and kept affects how the work is staged and priced.",
                confirm:
                  "How vehicles reach the site, and where materials can be stored.",
              },
              {
                condition: "Heritage and character properties",
                approach:
                  "Changing the external appearance can require approval, and damp masonry should be assessed before any render is considered.",
                confirm:
                  "Any heritage, character or Hills Face Zone considerations raised by your designer or council.",
              },
            ],
          },
        ],
      },
      {
        id: "hills-access",
        heading: "Planning access on a sloping block",
        paragraphs: [
          "On a sloping block, access is often the part of the scope that takes longest to pin down. These steps put the information in the order that makes a first conversation useful. None of it has to be complete before you get in touch.",
        ],
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                title: "Confirm coverage first",
                body: "Tell us the suburb or postcode, the kind of work and which drawings exist. We confirm whether the location is workable before preparing a quote.",
              },
              {
                title: "Show the fall of the site",
                body: "Photograph each elevation from far enough back to show the slope, or mark the levels on a drawing. Note which side is downhill.",
              },
              {
                title: "Record the working heights",
                body: "Note the height of each wall in the work, and where the ground falls away beneath it.",
              },
              {
                title: "Describe how each wall is reached",
                body: "Say how wide the side access is and what stands beside each wall, such as established gardens, a boundary or a neighbouring property.",
              },
              {
                title: "Plan deliveries and storage",
                body: "Point out where a vehicle can get to, where materials can be unloaded and where they can be kept on site.",
              },
              {
                title: "Settle who provides scaffold",
                body: "Say whether scaffold or other access equipment is already on site, who is providing it, and where it can stand on uneven ground.",
              },
              {
                title: "Add the bushfire and exposure documents",
                body: "Include the assessed BAL, if one has been done, and the wall systems nominated for it, so the access and the specification are priced together.",
              },
            ],
          },
        ],
        closing: [
          "Work at height is a regulated safety matter in South Australia, so access is agreed before a price is given rather than worked out on the day. The [project planning page](/project-planning/) lists the access notes that help on any site.",
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
        blocks: [
          {
            kind: "checklist",
            items: [
              {
                label: "Suburb or postcode",
                detail: "So coverage can be confirmed first.",
              },
              {
                label: "Bushfire-prone status",
                detail:
                  "Whether the property is in a bushfire-prone area, and the assessed BAL if one has been done.",
              },
              {
                label: "Drawings and specifications",
                detail: "Including the wall systems nominated for that rating.",
              },
              {
                label: "Heritage, character or Hills Face Zone considerations",
                detail: "Any raised by your designer or council.",
              },
              {
                label: "Slope, access and working heights",
                detail: "Photos or a description of each.",
              },
              {
                label: "Deliveries and storage",
                detail:
                  "How vehicles reach the site and where materials can be kept.",
              },
              {
                label: "Climate zone",
                detail:
                  "The zone for the address, if your designer has confirmed it.",
              },
            ],
          },
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
      {
        question: "Can you price external wall work before the BAL is assessed?",
        answer:
          "We ask for the assessed rating before pricing external wall work on a Hills site, because the rating narrows the material choices. If an assessment is still under way, tell us what stage it is at and we can discuss what is needed before a quote.",
      },
      {
        question: "What access details help for a sloping Hills block?",
        answer:
          "Photos or drawings showing the fall of the site, the height of each wall, how vehicles and materials reach the work, where materials can be stored, and who is providing scaffold or other access equipment.",
      },
      {
        question:
          "Is the Adelaide Hills in a different climate zone from Adelaide?",
        answer:
          "Yes. The building code places the Adelaide Hills in a different climate zone from metropolitan Adelaide, which changes the insulation and cavity requirements for the wall as a whole. The zones do not follow council boundaries, so the address itself needs checking.",
      },
    ],
    contactIntro:
      "Planning cladding, render, Hebel or walling work in the Adelaide Hills? Tell us the suburb or postcode first so we can confirm coverage, then the work you have in mind and what plans or photos are available.",
  },
];

export function getLocation(slug: string) {
  return locationPages.find((location) => location.slug === slug);
}
