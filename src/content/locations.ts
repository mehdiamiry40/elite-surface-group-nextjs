export type LocationFaq = {
  question: string;
  answer: string;
};

/** A local building condition that shapes how we specify and detail the work. */
export type LocationCondition = {
  title: string;
  body: string;
};

export type LocationPage = {
  slug: string;
  name: string;
  /** The page `h1`. */
  bannerTitle: string;
  /** Rendered as `metaTitle — Elite Surface Group`; keep under 40 characters. */
  metaTitle: string;
  metaDescription: string;
  /** One-line summary used on the service-areas hub. */
  hubBlurb: string;
  intro: readonly string[];
  conditionsTitle: string;
  conditions: readonly LocationCondition[];
  servicesLead: string;
  proof: readonly string[];
  suburbsLead: string;
  suburbs: readonly string[];
  faqs: readonly LocationFaq[];
};

export const locationsHub = {
  bannerTitle: "Where We Work Across Adelaide",
  metaTitle: "Service Areas Across Adelaide",
  metaDescription:
    "Cladding, rendering, Hebel and walling across metropolitan Adelaide — north, south, east, the western coast and the Adelaide Hills.",
  introTitle: "Our Adelaide service areas",
  intro: [
    "Elite Surface Group works across metropolitan Adelaide and wider South Australia. Adelaide is not one building environment but several: a coastal strip where salt drives every fixing decision, plains of reactive clay where articulation matters, hills where bushfire ratings and damp change the specification, and growth corridors where the programme is as fixed as the drawings.",
    "The pages below set out what each area means for cladding, render, Hebel and walling work, and which suburbs sit inside it. Project availability still depends on scope and timing, so send us your suburb and plans and we will confirm quickly either way.",
  ],
  closing:
    "Not listed, or somewhere in regional South Australia? Ask anyway. If a job suits our programme we will travel for it, and if it does not we will say so rather than waste your time.",
} as const;

export const locationPages: readonly LocationPage[] = [
  {
    slug: "adelaide",
    name: "Adelaide",
    bannerTitle: "Cladding, Render, Hebel and Walling in Adelaide",
    metaTitle: "Cladding and Rendering Adelaide",
    metaDescription:
      "Cladding, rendering, Hebel and walling installation across metropolitan Adelaide, with clear quotes, practical coordination and careful finishes.",
    hubBlurb:
      "The metropolitan overview — every service, every suburb, from the CBD out.",
    intro: [
      "Elite Surface Group delivers cladding, render, Hebel and walling for homes, renovations, multi-unit developments and commercial builds right across metropolitan Adelaide and wider South Australia.",
      "Adelaide’s housing stock is unusually mixed, and it shows in the work. A stone villa in the east, a post-war double-brick home in the inner north, a 1970s brick-veneer house in the southern suburbs and a slab-on-ground build in a northern estate each want a different approach — different preparation, sometimes a different system, always different detailing.",
      "Whether it is one feature elevation or a coordinated facade and walling package, we quote from the plans and the site information, then install to the agreed specification. Explore our Adelaide project details, or send your brief for an obligation-free quote.",
    ],
    conditionsTitle: "What Adelaide conditions mean for your walls",
    conditions: [
      {
        title: "Reactive clay soils",
        body: "Much of the Adelaide plains sits on soils that swell and shrink through the seasons. Buildings move with them, which is why control joints and articulation are respected rather than rendered over, and why a straight-line crack is investigated before it is filled.",
      },
      {
        title: "Hot, dry summers and high UV",
        body: "Long, hot summer days shorten the working time on a render face and punish colour retention on exposed elevations. We sequence the work elevation by elevation, keep wet edges live, and factor UV and thermal movement into system and colour selection.",
      },
      {
        title: "A coastline on one side and hills on the other",
        body: "Salt-laden air along the Gulf drives fixing and finish selection in the west and south, while bushfire-prone Hills locations bring assessed BAL ratings into the wall assembly. Two edges of the same city, two different specifications.",
      },
      {
        title: "Infill, subdivision and narrow allotments",
        body: "Adelaide keeps subdividing, and narrow allotments mean boundary and party walls built from one side, tight access for materials, and neighbours close enough that the sequence of work matters.",
      },
    ],
    servicesLead:
      "Our Adelaide work covers architectural wall cladding, internal and external render, Hebel AAC panel and block wall systems for new construction, and coordinated walling packages for builders and developers.",
    proof: [
      "Residential render and cladding work completed across metropolitan Adelaide",
      "Practical coordination with builders, developers and owner-builders",
      "Quotes that state the work, the materials and the programme assumptions",
      "One team where a project needs walling, Hebel, render and cladding together",
    ],
    suburbsLead:
      "We regularly quote work throughout the metropolitan area, including:",
    suburbs: [
      "Adelaide CBD and North Adelaide",
      "Prospect, Walkerville and the inner north",
      "Norwood, Kensington and the inner east",
      "Unley, Mitcham and the inner south",
      "Glenelg, Henley Beach and the western coast",
      "Salisbury, Elizabeth and the northern suburbs",
      "Marion, Noarlunga and the southern suburbs",
      "Stirling, Hahndorf and the Adelaide Hills",
    ],
    faqs: [
      {
        question: "Do you cover all of metropolitan Adelaide?",
        answer:
          "Yes — north, south, east, the western coastal suburbs and the Adelaide Hills, plus wider South Australia depending on the scope and timing. Tell us the suburb with your enquiry and we will confirm availability straight away.",
      },
      {
        question: "How quickly can you look at a job in Adelaide?",
        answer:
          "We respond to enquiries within one business day. How soon we can attend site depends on the current programme, but photos and plans often let us give useful guidance before a visit is needed at all.",
      },
      {
        question: "Do you take on small jobs, or only full facades?",
        answer:
          "Both. A single feature elevation, a render repair or one boundary wall is worth asking about. Small work is scheduled around larger packages, so there may be a wait, and we will be upfront about it.",
      },
    ],
  },
  {
    slug: "adelaide-hills",
    name: "Adelaide Hills",
    bannerTitle: "Rendering and Cladding in the Adelaide Hills",
    metaTitle: "Rendering and Cladding Adelaide Hills",
    metaDescription:
      "Cladding, rendering and Hebel work through the Adelaide Hills, allowing for bushfire ratings, damp conditions and sloping, access-limited sites.",
    hubBlurb:
      "Bushfire ratings, damp winters and steep blocks — Stirling to Mount Barker.",
    intro: [
      "The Hills are a different build to the plains, and pretending otherwise is how work fails up there. Cooler air, real rainfall, long damp winters, heavy tree cover and bushfire risk all change what should go on a wall — and steep driveways change how it gets there.",
      "Elite Surface Group takes on cladding, rendering, Hebel and walling work through the Adelaide Hills for renovations, new homes and rural-residential builds, from Crafers and Stirling out to Hahndorf, Woodside and Mount Barker.",
      "Because access and weather both affect the programme here, we are candid at quote stage about what a Hills site adds to the job rather than discovering it halfway through.",
    ],
    conditionsTitle: "What Hills conditions change",
    conditions: [
      {
        title: "Bushfire-prone areas and BAL ratings",
        body: "Where a site carries an assessed Bushfire Attack Level under AS 3959, the external wall assembly has to suit that rating. AAC systems such as Hebel are frequently part of the answer at higher ratings. We install to the specified system rather than improvising an equivalent, and we work from the assessment your building designer or private certifier provides.",
      },
      {
        title: "Damp, cool and slow to dry",
        body: "Higher rainfall and lower winter temperatures lengthen cure times and keep moisture in a wall for longer. That affects scheduling, system selection — breathable systems suit older stone and masonry — and why rendered surfaces in shaded, tree-covered gullies attract moss and lichen and need occasional washing down.",
      },
      {
        title: "Sloping blocks and difficult access",
        body: "Steep driveways, retained levels and limited turning space determine how scaffold, materials and lifting equipment reach the wall. It is a real cost input, so we look at access before quoting rather than after.",
      },
      {
        title: "Stone cottages and character stock",
        body: "Much of the older Hills housing is stone or solid masonry that predates modern damp-proofing. Sealing a wall like that with the wrong coating traps moisture and pushes salt attack into the stone. We assess first and recommend accordingly, including recommending against render where it would do harm.",
      },
    ],
    servicesLead:
      "In the Hills we take on exterior rendering and repair work on masonry and stone homes, architectural cladding on new builds and extensions, Hebel wall systems including bushfire-rated assemblies, and walling packages for local builders.",
    proof: [
      "Specification matched to the assessed BAL rating where bushfire construction applies",
      "Realistic programmes that allow for Hills weather and cure times",
      "Access and scaffold assessed before the quote, not after the booking",
      "Honest advice on older stone walls, including when not to render them",
    ],
    suburbsLead: "Areas we cover through the Hills include:",
    suburbs: [
      "Stirling, Aldgate and Bridgewater",
      "Crafers, Piccadilly and Summertown",
      "Hahndorf, Verdun and Balhannah",
      "Mount Barker, Littlehampton and Nairne",
      "Woodside, Lobethal and Charleston",
      "Uraidla, Basket Range and Carey Gully",
    ],
    faqs: [
      {
        question: "Can you install bushfire-rated wall systems in the Hills?",
        answer:
          "We install to the system specified for your assessed BAL rating, working from the bushfire assessment prepared for the project. AAC systems such as Hebel are commonly specified at higher ratings. The rating belongs to the complete tested assembly, so the fixings, jointing and perimeter details all get installed as the system requires.",
      },
      {
        question: "Should an old stone Hills cottage be rendered?",
        answer:
          "Sometimes yes, often no. Solid stone walls built without a damp-proof course rely on being able to breathe. A modern impermeable coating can trap moisture and drive salt damp and stone decay. We look at the wall, the ground levels and any existing damp before recommending anything — and we will tell you if the honest answer is to leave it alone.",
      },
      {
        question: "Does Hills weather delay work?",
        answer:
          "It can. Wet spells and cold mornings extend cure times and there are days when applying render simply is not sensible. We build realistic weather allowance into Hills programmes and keep you informed rather than promising dates the conditions will not support.",
      },
      {
        question: "Do you travel out past Mount Barker?",
        answer:
          "Frequently, yes — and further into the Fleurieu and the Barossa for jobs that suit the programme. Send the location and scope and we will tell you honestly whether we are the right fit.",
      },
    ],
  },
  {
    slug: "western-adelaide",
    name: "Western Adelaide",
    bannerTitle: "Cladding and Rendering in Western Adelaide",
    metaTitle: "Cladding and Render Western Adelaide",
    metaDescription:
      "Coastal cladding and rendering across western Adelaide, from Glenelg to Semaphore, specified for salt exposure, sea breezes and sandy soils.",
    hubBlurb:
      "Coastal salt, sea breezes and dense infill — Glenelg to Port Adelaide.",
    intro: [
      "Everything within a few kilometres of the Gulf lives in a marine environment, and marine environments are unforgiving about fixings. Salt-laden air finds every unprotected fastener, every under-specified flashing and every coating chosen on price. It is the single biggest factor in how we specify a western-suburbs facade.",
      "Elite Surface Group installs cladding, render, Hebel and walling throughout western and coastal Adelaide — Glenelg, Henley Beach, Grange, West Lakes, Semaphore, Seaton, Woodville and Port Adelaide.",
      "The area is also Adelaide’s busiest infill corridor, so a large share of our work here is boundary walls, townhouse facades and recladding tired mid-century homes.",
    ],
    conditionsTitle: "What the coast changes",
    conditions: [
      {
        title: "Salt exposure and corrosion",
        body: "Proximity to the water drives the corrosion-resistance requirements for fixings, sub-framing and flashings, and narrows the sensible range of finishes. Manufacturers publish coastal distance limits for their systems and warranties depend on respecting them — so we select against the actual exposure, not the nearest convenient product.",
      },
      {
        title: "Wind off the Gulf",
        body: "Open coastal frontage and higher wind classifications feed straight into fixing centres, panel spans and system selection. Exposed upper storeys and beachfront elevations get detailed for the conditions they actually face.",
      },
      {
        title: "Sandy soils and mid-century stock",
        body: "Much of the western suburbs housing is 1950s to 1980s brick and cement sheet on sandy ground. Those walls are ideal candidates for render or recladding, but the existing coatings, sheeting and any asbestos-era materials need identifying before a scope is written.",
      },
      {
        title: "Infill, subdivision and narrow allotments",
        body: "Battle-axe blocks, torrens-title rows and courtyard homes mean boundary and party walls built from one side, restricted material access, and neighbours who deserve some notice. Hebel earns its keep here more than almost anywhere else in Adelaide.",
      },
    ],
    servicesLead:
      "Along the coast we handle exterior rendering and re-rendering, coastal-rated wall cladding, Hebel boundary and party walls for infill developments, and complete walling packages for local builders.",
    proof: [
      "Fixings and finishes selected against the actual coastal exposure of the site",
      "Wind classification reflected in the fixing and system details",
      "Boundary and party walls planned for one-sided access on narrow allotments",
      "Straight advice on whether a tired coastal facade wants render, cladding or both",
    ],
    suburbsLead: "Western and coastal suburbs we work in include:",
    suburbs: [
      "Glenelg, Glenelg North and Somerton Park",
      "Henley Beach, Grange and Tennyson",
      "West Lakes, Semaphore and Largs Bay",
      "Seaton, Fulham and Findon",
      "Woodville, Kilkenny and Croydon",
      "Port Adelaide, Ethelton and Birkenhead",
    ],
    faqs: [
      {
        question: "Is cladding a good idea this close to the beach?",
        answer:
          "Yes, provided the system is selected for the exposure. Coastal sites need corrosion-resistant fixings and sub-framing, finishes rated for marine environments, and detailing that keeps salt out of the junctions. Get those right and cladding performs well near the water; get them wrong and the fixings tell you within a few years.",
      },
      {
        question: "How often should a coastal facade be washed down?",
        answer:
          "More often than an inland one. A periodic freshwater wash to remove salt deposits is the cheapest maintenance available for both cladding and render, and most manufacturers make it a warranty condition near the coast. We give the specific interval for the system installed.",
      },
      {
        question: "Can you render an old cement-sheet or brick beach house?",
        answer:
          "Usually. Brick renders readily once prepared; cement sheet depends on the sheet type, its condition and its fixing. Anything from the asbestos era must be identified and handled by the appropriate licensed process before we touch it — we will tell you if that is what we are looking at.",
      },
      {
        question: "Do you build boundary walls for infill developments?",
        answer:
          "Regularly. Narrow western-suburbs allotments are exactly where Hebel boundary and party walls make sense, and we install them to the tested system details where documented fire or acoustic performance applies.",
      },
    ],
  },
  {
    slug: "northern-adelaide",
    name: "Northern Adelaide",
    bannerTitle: "Rendering and Hebel in Northern Adelaide",
    metaTitle: "Render and Hebel Northern Adelaide",
    metaDescription:
      "Rendering, Hebel and walling packages across northern Adelaide, built around volume-builder programmes, narrow allotments and reactive clay soils.",
    hubBlurb:
      "New-build estates and fixed programmes — Mawson Lakes to Gawler.",
    intro: [
      "Northern Adelaide is where most of the city’s new housing is going up, and new-build work runs on dates. A render or Hebel package in an estate has a slot: the trade before you finishes, you have your window, and the trade after you is already booked. Miss it and you have not just delayed your own scope.",
      "Elite Surface Group delivers render, Hebel, cladding and walling packages across the northern suburbs and growth corridors — Mawson Lakes, Salisbury, Elizabeth, Craigmore, Blakeview, Munno Para, Angle Vale and Gawler.",
      "We work directly for homeowners here too, particularly on facade updates to established brick homes across the older northern suburbs.",
    ],
    conditionsTitle: "What northern projects demand",
    conditions: [
      {
        title: "Programmes that do not move",
        body: "Volume and project builders sequence trades tightly. We quote against the programme, confirm our window, and tell you early if something upstream has pushed our start — because silence is what turns one late trade into three.",
      },
      {
        title: "Narrow allotments and boundary walls",
        body: "Compact estate blocks put walls hard against boundaries, often buildable from one side only. Lightweight AAC systems such as Hebel suit this work, and where fire or acoustic ratings apply the tested details are what deliver them.",
      },
      {
        title: "Highly reactive soils",
        body: "Parts of the northern plains carry very reactive clay. The engineer’s footing design and articulation joints exist for a reason, and a rigid finish applied straight over an articulation joint will crack on that line within a season or two. We respect the joints the design puts there.",
      },
      {
        title: "Hot inland summers",
        body: "The northern suburbs run hotter than the coast through summer. That compresses the working window on a render face on a 40-degree day, and it is why thermal performance in the wall build-up is worth the attention it gets at design stage.",
      },
    ],
    servicesLead:
      "In the north we deliver new-build render packages, Hebel boundary, party and external wall systems, cladding for feature elevations and facade updates, and full walling packages coordinated to the builder’s programme.",
    proof: [
      "Work quoted and staged against the builder’s programme, not around it",
      "Boundary and party walls detailed for one-sided access on estate allotments",
      "Articulation and control joints respected rather than covered over",
      "Facade updates for established brick homes across the older northern suburbs",
    ],
    suburbsLead: "Northern suburbs and corridors we work in include:",
    suburbs: [
      "Mawson Lakes, Parafield Gardens and Salisbury",
      "Elizabeth, Craigmore and Blakeview",
      "Munno Para, Andrews Farm and Smithfield",
      "Angle Vale, Virginia and Two Wells",
      "Gawler, Evanston and Hewett",
      "Golden Grove, Greenwith and Modbury",
    ],
    faqs: [
      {
        question: "Can you work to a volume builder’s programme?",
        answer:
          "Yes, and most of our northern work does. Give us the drawings, the specification and the dates and we will confirm what we can hold. If something changes at our end you will hear it from us early enough to re-sequence.",
      },
      {
        question: "Why has the render on my new home cracked already?",
        answer:
          "On reactive soils, early cracking most often follows building movement or an articulation joint that was rendered over instead of carried through. Occasionally it is a preparation or system issue. The cause determines the fix, so we look before we quote — patching over movement just moves the crack.",
      },
      {
        question: "Do you do boundary walls on narrow estate blocks?",
        answer:
          "Yes. Zero-lot and near-boundary walls are routine northern work, and Hebel is usually the sensible system. Where a fire or acoustic rating is specified, we install the tested assembly that the rating depends on.",
      },
      {
        question: "Can you render an older northern-suburbs brick home?",
        answer:
          "Absolutely — it is one of the most cost-effective facade transformations available. We check the brickwork, damp-proof course, ground levels and any existing coating first, then quote the preparation and the render system that wall actually needs.",
      },
    ],
  },
  {
    slug: "southern-adelaide",
    name: "Southern Adelaide",
    bannerTitle: "Cladding and Rendering in Southern Adelaide",
    metaTitle: "Cladding and Render Southern Adelaide",
    metaDescription:
      "Cladding, rendering and walling across southern Adelaide, from Marion to Aldinga, allowing for coastal exposure, sloping sites and 1970s brick stock.",
    hubBlurb:
      "Coastal exposure, foothills slopes and facade updates — Marion to Aldinga.",
    intro: [
      "The southern suburbs cover more ground than people expect: cliff-top coastal frontage at Hallett Cove, foothills slopes through Flagstaff Hill and Aberfoyle Park, an enormous stock of 1970s and 1980s brick-veneer homes, and newer estates running south through Seaford and Aldinga.",
      "Elite Surface Group handles cladding, rendering, Hebel and walling across all of it — from single-elevation facade updates to complete walling packages for builders working the southern corridor.",
      "Facade renewal is the bulk of the residential work here. A brick-veneer home from forty years ago responds extremely well to render, cladding, or a combination of the two.",
    ],
    conditionsTitle: "What southern sites bring",
    conditions: [
      {
        title: "Coastal and cliff-top exposure",
        body: "The southern coastline from Brighton down through Hallett Cove and Seaford carries both salt and serious wind. Elevated and cliff-top allotments get fixings, sub-framing and finishes specified for that exposure, and fixing centres set to the wind classification.",
      },
      {
        title: "Sloping foothills allotments",
        body: "Through Flagstaff Hill, Aberfoyle Park and Happy Valley the ground falls away, so upper-level access, scaffold and material handling shape the programme and the price. We work that out at quote stage.",
      },
      {
        title: "A large stock of brick-veneer homes",
        body: "The 1970s to 1990s housing that fills the southern suburbs is the ideal candidate for a facade update. The variables are the existing brickwork, the ground levels around the base of the wall, and whatever coating a previous owner applied.",
      },
      {
        title: "The bushfire interface further south",
        body: "Approaching the Willunga escarpment and the southern Hills face, some allotments sit in mapped bushfire-prone areas with an assessed BAL rating. Where that applies, the wall assembly is specified and installed to suit it.",
      },
    ],
    servicesLead:
      "In the south we take on exterior render and facade updates to brick-veneer homes, coastal-rated wall cladding, Hebel wall systems for new builds and boundary walls, and walling packages for builders working the southern corridor.",
    proof: [
      "Systems specified against real coastal and wind exposure along the southern beaches",
      "Access and scaffold assessed properly on sloping foothills blocks",
      "Facade renewal experience on 1970s and 1980s brick-veneer housing",
      "Bushfire-rated assemblies installed where an assessed BAL applies",
    ],
    suburbsLead: "Southern suburbs we cover include:",
    suburbs: [
      "Marion, Oaklands Park and Warradale",
      "Brighton, Seacliff and Hallett Cove",
      "Flagstaff Hill, Aberfoyle Park and Happy Valley",
      "Reynella, Morphett Vale and Woodcroft",
      "Noarlunga, Seaford and Moana",
      "Aldinga, Willunga and McLaren Vale",
    ],
    faqs: [
      {
        question: "Is render or cladding better for a 1970s brick-veneer home?",
        answer:
          "Render is the usual choice — it goes directly onto sound brickwork and gives the whole house a continuous, contemporary surface. Cladding earns its place as a feature: an entry, a garage elevation, an upper level. A lot of the best southern-suburbs updates use render as the field with a cladding feature for contrast.",
      },
      {
        question: "Do coastal southern suburbs need special specification?",
        answer:
          "Yes. Anywhere along the Gulf, corrosion-resistant fixings and marine-rated finishes matter, and exposed or elevated sites need fixing details that suit the wind classification. Hallett Cove and the cliff-top frontage are genuinely exposed positions, not nominally coastal ones.",
      },
      {
        question: "Does a sloping block cost more to work on?",
        answer:
          "Generally it adds something, because access, scaffold and material handling all take longer. It is not dramatic, and we would rather price it accurately at the start than discover it on day two. We assess access before quoting.",
      },
      {
        question: "How far south do you travel?",
        answer:
          "Through Aldinga, Willunga and McLaren Vale routinely, and further down the Fleurieu for work that suits the programme. Send us the location and the scope and we will confirm.",
      },
    ],
  },
  {
    slug: "eastern-adelaide",
    name: "Eastern Adelaide",
    bannerTitle: "Rendering and Cladding in Eastern Adelaide",
    metaTitle: "Render and Cladding Eastern Adelaide",
    metaDescription:
      "Rendering and cladding for character homes and renovations across eastern Adelaide, from Norwood to Burnside, with heritage-era masonry handled carefully.",
    hubBlurb:
      "Character homes, tight sites and high-end renovation — Norwood to Burnside.",
    intro: [
      "Eastern Adelaide holds the city’s densest concentration of character housing: bluestone and sandstone villas, symmetrical returns, tuckpointed facades and rear additions from every decade since. It is also where renovation budgets tend to be highest and expectations of finish are highest with them.",
      "Elite Surface Group works throughout the eastern suburbs — Norwood, Kensington, St Peters, Payneham, Magill, Burnside, Toorak Gardens and Rostrevor — on render, cladding, Hebel and walling for renovations, extensions and new builds.",
      "Most of this work involves an old building and a new one meeting. Getting that junction right, without damaging the original masonry or making the addition look apologetic, is the actual job.",
    ],
    conditionsTitle: "What eastern-suburbs work involves",
    conditions: [
      {
        title: "Heritage and character overlays",
        body: "Many eastern councils apply heritage or character-area provisions that affect what can change on a street-facing facade. Confirm the planning position with your council or designer before committing to a facade change — we will happily work to whatever is approved, but the approval comes first.",
      },
      {
        title: "Solid masonry that predates damp-proofing",
        body: "Bluestone and sandstone villas were built to breathe. Sealing them with an impermeable coating can trap moisture and push salt damp into the stone. On these buildings we assess ground levels, existing damp and previous coatings before recommending anything — including recommending against it.",
      },
      {
        title: "Old meets new at the rear",
        body: "Most eastern work is a rear or upper-level addition. The junction between original masonry and new framed or AAC construction is where movement, moisture and visual mismatch all show up, so it gets detailed deliberately rather than left to the last trade on site.",
      },
      {
        title: "Tight sites and mature trees",
        body: "Narrow frontages, rear-lane access, close neighbours and large established trees all constrain scaffold, deliveries and sequencing — and tree roots in reactive clay are a genuine contributor to wall movement in these suburbs.",
      },
    ],
    servicesLead:
      "In the east we take on render to additions and secondary elevations, contemporary cladding on rear and upper-level extensions, Hebel walls for additions and boundary conditions, and walling packages for renovation builders.",
    proof: [
      "Careful assessment of solid masonry before any coating is recommended",
      "Deliberate detailing where original masonry meets new construction",
      "Work sequenced around tight access, rear lanes and close neighbours",
      "Finish standards suited to high-specification renovation work",
    ],
    suburbsLead: "Eastern suburbs we work in include:",
    suburbs: [
      "Norwood, Kent Town and St Peters",
      "Kensington, Marryatville and Dulwich",
      "Burnside, Toorak Gardens and Beaumont",
      "Payneham, Felixstow and Firle",
      "Magill, Rostrevor and Athelstone",
      "Erindale, Auldana and Wattle Park",
    ],
    faqs: [
      {
        question: "Can I render the front of a heritage or character home?",
        answer:
          "That is a planning question before it is a trade question. Heritage listings and character-area provisions can restrict changes to a street-facing facade, so check with your council or building designer first. There is also a technical question: solid masonry often should not be sealed at all. We will give you the technical view honestly, and work to whatever is approved.",
      },
      {
        question: "What is salt damp and does render cause it?",
        answer:
          "Salt damp is moisture rising through solid masonry, carrying dissolved salts that crystallise and break down stone, brick and mortar near the base of a wall. Render does not cause it, but an impermeable render over an affected wall traps moisture and can make it worse. The damp problem is resolved first; the finish comes after.",
      },
      {
        question: "How do you match new work to an existing rendered wall?",
        answer:
          "By matching the texture and the finishing method as well as the colour, and where possible by finishing to a natural break — a corner, a downpipe line, a control joint — rather than stopping mid-elevation. A patch in the middle of a wall is visible in raking light no matter how good the colour match is.",
      },
      {
        question: "Do you work with renovation builders and architects?",
        answer:
          "Regularly. On documented renovation work we quote from the drawings and specification, raise conflicts early, and coordinate with the builder so the wall finishes land where the programme needs them.",
      },
    ],
  },
];

export function getLocation(slug: string) {
  return locationPages.find((location) => location.slug === slug);
}
