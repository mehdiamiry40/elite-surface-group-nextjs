export type ServiceFaq = {
  question: string;
  answer: string;
};

/** A named use case for the service, rendered as an `h3` block. */
export type ServiceApplication = {
  title: string;
  body: string;
};

export type Service = {
  slug: "cladding" | "render" | "hebel" | "walling";
  name: string;
  /** Heading as it appears on the service page banner (the page `h1`). */
  bannerTitle: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  /** Short blurb used on the homepage and services-hub cards. */
  summary: string;
  /** Rendered as `metaTitle — Elite Surface Group`; keep under 40 characters. */
  metaTitle: string;
  metaDescription: string;
  intro: readonly string[];
  detail: readonly string[];
  applicationsLead: string;
  applications: readonly ServiceApplication[];
  benefitsLead: string;
  benefits: readonly string[];
  /** Adelaide-specific conditions that shape the specification. */
  localLead: string;
  local: readonly string[];
  closing: string;
  /** Related internal paths shown in body copy. */
  relatedLinks: readonly { label: string; href: string }[];
  faqs: readonly ServiceFaq[];
};

export const services: readonly Service[] = [
  {
    slug: "cladding",
    name: "Cladding",
    bannerTitle: "Wall Cladding Installation in Adelaide",
    image: "/images/v2/service-cladding-installation.webp",
    imageAlt:
      "Cladding installer aligning charcoal vertical wall cladding on an Adelaide home",
    imageWidth: 1600,
    imageHeight: 1067,
    summary:
      "Architectural wall cladding set out, fixed and detailed so panel lines, junctions and flashings read clean from the street.",
    metaTitle: "Cladding Installation Adelaide",
    metaDescription:
      "Architectural wall cladding installation across Adelaide for new homes, renovations and commercial builds. Send your plans for an obligation-free quote.",
    intro: [
      "Cladding is the fastest way to change how a building reads from the street, and one of the few facade decisions that also changes how the wall behind it performs. Elite Surface Group installs architectural wall cladding across Adelaide and South Australia for new homes, renovations, townhouse developments and commercial projects.",
      "We start with the building rather than a favourite product. The design intent, the substrate, the exposure of the site and the budget all narrow the field before a system is chosen, and the selected system is then installed to the manufacturer’s published details and the project specification.",
      "That covers everything from a single feature elevation on a renovation to a full facade package running alongside a builder’s programme.",
    ],
    detail: [
      "A cladding job is won or lost behind the finished surface. Battens and top hats have to sit true, the substrate has to be sound and dry, and the drainage cavity has to stay a cavity once the trades that follow start fixing to it. We set out from the openings and the eaves line first, so panel joints land where the eye expects them instead of wherever the run happens to finish.",
      "Junctions are where cheap work shows up a year later. Head and sill flashings, corner details, control joints, and the transition into render, brick or stone are all resolved before the first sheet is fixed, not improvised at the end of the run. Where a facade mixes materials, we agree the setting-out with the builder so the cladding and the adjoining finishes share the same lines.",
      "Product choice drives long-term maintenance as much as appearance. Prefinished panels, fibre cement, composite and timber-look systems all age differently in Adelaide conditions, so we talk through cleaning, sealant renewal and repairability while the specification is still open.",
    ],
    applicationsLead: "Where cladding usually lands on our jobs:",
    applications: [
      {
        title: "New homes and custom builds",
        body: "Feature elevations, entry statements and full facades installed to the architect’s or designer’s documented detail, coordinated with the builder’s frame and lock-up dates.",
      },
      {
        title: "Renovations and facade updates",
        body: "Recladding tired exteriors, covering dated brick or cement sheet, and adding contrast to a rendered home without rebuilding the wall behind it.",
      },
      {
        title: "Townhouse and multi-unit developments",
        body: "Repeatable facade details across multiple dwellings, set out so each unit reads consistently and the programme keeps moving between trades.",
      },
      {
        title: "Commercial and light industrial",
        body: "Shopfronts, offices and warehouse frontages where the cladding has to meet a documented specification and a fixed handover date.",
      },
    ],
    benefitsLead: "A well-selected, correctly installed cladding system can offer:",
    benefits: [
      "A distinctive exterior shaped around the architectural design rather than the product catalogue",
      "Another protective layer over the wall build-up behind the cladding",
      "Thermal and acoustic gains when the cladding is specified as part of the complete wall system",
      "Lower ongoing maintenance than some painted exterior substrates",
      "A practical way to modernise an existing facade without structural work",
    ],
    localLead: "What we allow for on Adelaide sites:",
    local: [
      "Salt-laden air along the western and southern coastline, which drives fixing and finish selection",
      "Hot, dry summers and high UV, which affect colour retention, thermal movement and joint spacing",
      "Reactive clay soils across much of the metropolitan area, which make articulation and control joints matter",
      "Bushfire-prone areas in the Adelaide Hills, where the assembly must suit the assessed BAL rating",
      "Wind exposure on open and elevated allotments, which informs fixing centres and system selection",
    ],
    closing:
      "Whether it is one elevation or an entire facade package, we install to the documented design and the real conditions on site. Look through our completed cladding and mixed-facade work, or ask how cladding pairs with render for a contrasting finish.",
    relatedLinks: [
      { label: "See cladding and facade projects", href: "/projects/" },
      { label: "Rendering services in Adelaide", href: "/render/" },
      { label: "Hebel wall systems", href: "/hebel/" },
      { label: "Where we work across Adelaide", href: "/locations/" },
    ],
    faqs: [
      {
        question: "Which cladding systems do you install in Adelaide?",
        answer:
          "We install the common residential and commercial systems — fibre cement sheet and planks, prefinished panel and composite systems, expressed-joint boards and timber-look profiles. The right one depends on the design, the substrate, the exposure of the site and the budget, so we confirm the system after reviewing the plans rather than before.",
      },
      {
        question: "How much does cladding cost in Adelaide?",
        answer:
          "There is no useful per-square-metre figure until the system is known. Cost is driven by the product, the area and complexity of the elevation, access and scaffold, the amount of substrate preparation, and how many junctions, corners and openings the facade contains. Send plans or photos and we will quote the actual scope, obligation-free.",
      },
      {
        question: "Should I choose cladding or render?",
        answer:
          "Render suits masonry and blockwork and gives a continuous, monolithic surface. Cladding suits framed construction, adds texture and shadow lines, and is easier to repair panel by panel. Plenty of Adelaide facades use both — render as the field and cladding as the feature — and we install either or both.",
      },
      {
        question: "Can you clad over an existing brick or rendered wall?",
        answer:
          "Often, yes. It depends on the condition of the existing wall, whether it can carry the fixing system, and how the new cladding will resolve at windows, eaves and the damp-proof course. We inspect before recommending an approach, because covering a wall that is moving or damp only hides the problem.",
      },
      {
        question: "Is cladding suitable for coastal or wind-exposed sites?",
        answer:
          "Yes, when the product, fixings and detailing are specified for those conditions. Along the coast we allow for salt exposure in the fastener and finish selection, and on exposed or elevated allotments we follow the manufacturer’s wind-classification requirements for fixing centres.",
      },
      {
        question: "How do I maintain external cladding?",
        answer:
          "Most systems want an occasional wash to remove salt and dust, plus periodic checks of sealants, flashings and junctions. Prefinished products generally need less attention than painted substrates. We will explain the specific maintenance requirements of whatever system is selected for your project.",
      },
      {
        question: "How long does a cladding job take?",
        answer:
          "A single feature elevation is usually a matter of days once access is available; a full facade or a multi-unit development runs longer and is normally staged around the builder’s programme. We give an indicative duration with the quote and confirm dates when the job is booked.",
      },
    ],
  },
  {
    slug: "render",
    name: "Render",
    bannerTitle: "House Rendering Services in Adelaide",
    image: "/images/v2/service-render-application.webp",
    imageAlt:
      "Renderer applying an even acrylic render finish to an exterior Adelaide wall",
    imageWidth: 1600,
    imageHeight: 1067,
    summary:
      "Smooth, textured and custom render finishes over brick, block, Hebel and cement sheet, with the preparation done properly first.",
    metaTitle: "House Rendering Adelaide",
    metaDescription:
      "House rendering across Adelaide for brick, block, Hebel and cement sheet walls. Smooth and textured finishes, prepared properly and quoted from your plans.",
    intro: [
      "Render is the quickest transformation available to most Adelaide homes. A dated brick exterior becomes a clean, contemporary facade, and a new build gets the continuous surface the design was drawn around. We render internal and external walls for residential and commercial projects across Adelaide and South Australia.",
      "The finish is never better than the preparation underneath it. We assess the substrate first — its material, its condition, its moisture and whatever coating is already on it — then prepare or repair it before any new render goes on.",
      "From there it is a controlled process: the right system for that wall, applied in the right conditions, finished to the agreed sample.",
    ],
    detail: [
      "Rendering is equal parts preparation and finishing. Brick, besser block, Hebel and cement sheet all behave differently, so each takes a different bonding approach and, in some cases, a different render system entirely. Getting that wrong is what produces the drummy, patchy walls people call us to fix.",
      "Cracks tell you something. Movement at a control joint is not the same problem as a debonded coating or a wall drawing moisture from the ground, and each needs a different response. We work out which one is in front of us before quoting a repair, because a new coat over an unresolved cause simply cracks again on the same line.",
      "Weather governs the finish. Adelaide summers can flash-dry a wall before it is closed up, and winter mornings can hold moisture in the surface long enough to shade the colour. We plan the sequence and the working face around the forecast, keep wet edges live, and finish elevation by elevation so the colour and texture stay consistent across the whole wall.",
    ],
    applicationsLead: "The render work we are usually asked for:",
    applications: [
      {
        title: "Rendering an existing brick home",
        body: "The classic Adelaide facade update — preparing and rendering brick or brick-veneer walls to give a dated exterior a continuous modern finish.",
      },
      {
        title: "New builds and extensions",
        body: "Render over blockwork, Hebel or cement sheet on new construction, sequenced to the builder’s programme and matched across old and new where an extension meets the original.",
      },
      {
        title: "Repairs and re-rendering",
        body: "Assessing drummy, cracked or failing render, cutting out what has to go, and re-rendering so the repair does not read as a patch.",
      },
      {
        title: "Internal walls and feature finishes",
        body: "Internal render and texture work where the design calls for a solid, hand-finished surface rather than a plasterboard line.",
      },
    ],
    benefitsLead: "Our rendering work is built around:",
    benefits: [
      "Preparation matched to the actual substrate rather than a standard method",
      "Even colour, texture and line across the whole visible elevation",
      "Smooth, sponge, sand and textured options to suit the architectural style",
      "Careful detailing at reveals, edges, control joints and adjoining materials",
      "Honest advice when a wall needs repair before it needs a new finish",
    ],
    localLead: "What Adelaide conditions mean for a render job:",
    local: [
      "Reactive clay soils that move with the seasons, which is why control joints and articulation are respected rather than rendered over",
      "Hot, dry summer days that shorten working time and demand careful sequencing of each elevation",
      "Coastal salt exposure in the west and south, which affects system selection and long-term maintenance",
      "A large stock of older brick and stone homes where the existing wall condition sets the scope",
      "Cooler, damper conditions in the Adelaide Hills that lengthen cure times and favour breathable systems on older masonry",
    ],
    closing:
      "A good render finish sharpens the whole building and protects the wall behind it. Browse the render details we have completed around Adelaide, or ask about pairing render with feature cladding for contrast.",
    relatedLinks: [
      { label: "See completed render projects", href: "/projects/" },
      { label: "Cladding installation in Adelaide", href: "/cladding/" },
      { label: "Hebel wall systems", href: "/hebel/" },
      { label: "Request an obligation-free quote", href: "/contact-us/#contact" },
    ],
    faqs: [
      {
        question: "What is the difference between acrylic and cement render?",
        answer:
          "Traditional cement render is a sand-and-cement mix that is strong, breathable and well suited to older masonry. Acrylic render carries polymer additives that improve flexibility and adhesion, which lets it go over a wider range of substrates including Hebel and cement sheet. We select between them based on the wall, the exposure and the finish you are after.",
      },
      {
        question: "Why does render crack, and can it be fixed?",
        answer:
          "Cracking usually comes from substrate movement, an unsuitable or poorly prepared bond, incompatible coatings, impact damage or simple age. Fine hairline crazing is often cosmetic; cracks that follow a straight line at a joint, or that keep reopening, point to movement. We identify the cause first, then quote repair, patching or a full re-render accordingly.",
      },
      {
        question: "Can you render over painted brick or an existing render?",
        answer:
          "Sometimes. It depends on how well the existing coating is bonded and what it is made of. Sound, well-adhered surfaces can often be prepared and rendered over; flaking, drummy or unstable coatings have to come off first. We test and inspect before committing to an approach.",
      },
      {
        question: "How long does render take to dry before painting?",
        answer:
          "It depends on the system, the thickness and the weather. Cement-based render generally needs a substantial cure period before coating, while many acrylic systems can be painted much sooner. We give the actual waiting period for your system when we quote, so painting can be booked with confidence.",
      },
      {
        question: "How much does it cost to render a house in Adelaide?",
        answer:
          "The wall area is only one input. Preparation and repair, the number of storeys, access and scaffold, the render system, the texture selected and the amount of detailing at openings all move the price. We quote from plans, photos or a site visit so the number reflects your wall rather than an average.",
      },
      {
        question: "Do you render Hebel and blockwork as well as brick?",
        answer:
          "Yes. Hebel, besser block, brick and cement sheet are all regular substrates for us, each with its own preparation and system requirements. Where we have also installed the Hebel, the render is coordinated as one package.",
      },
      {
        question: "How should rendered walls be maintained?",
        answer:
          "Wash down periodically to remove dust and salt, keep garden beds and sprinklers from soaking the base of the wall, and repaint or recoat on the schedule the coating manufacturer recommends. Address new cracks early — they are much cheaper to resolve before water gets behind the finish.",
      },
    ],
  },
  {
    slug: "hebel",
    name: "Hebel",
    bannerTitle: "Hebel Wall System Installation in Adelaide",
    image: "/images/v2/service-hebel-installation.webp",
    imageAlt:
      "Installer positioning lightweight Hebel AAC wall panels on a new Adelaide build",
    imageWidth: 1600,
    imageHeight: 1067,
    summary:
      "Hebel AAC panel and block walls set out accurately, fixed to the tested system details and left ready for render.",
    metaTitle: "Hebel Installation Adelaide",
    metaDescription:
      "Hebel AAC panel and block wall installation across Adelaide for homes, townhouses and commercial builds, completed to the specified system details.",
    intro: [
      "Hebel is autoclaved aerated concrete — a lightweight masonry product used for external walls, party walls, boundary walls and floors across houses, townhouse developments and commercial construction. Installed as a complete, tested system, it delivers documented fire, thermal and acoustic performance at a fraction of the weight of traditional masonry.",
      "We install Hebel wall systems across Adelaide and South Australia: setting out, panel and block placement, fixing, jointing and the junction detailing that the system relies on.",
      "Most of our Hebel work runs alongside builders and developers, so it is planned around the frame, the services rough-in and the render or cladding that follows.",
    ],
    detail: [
      "Accuracy compounds on a Hebel job. Panels are set out from a true, level base so the coursing stays square all the way up, and the specified fixings, adhesives and jointing compounds are used as the tested system intends rather than substituted for whatever is on the truck.",
      "The performance a designer specifies belongs to the whole assembly, not the panel. A fire or acoustic rating depends on the joints being filled correctly, the perimeter details being executed as tested, and penetrations being treated properly. We install to those details, and we raise it early when something on site conflicts with them.",
      "Hebel also has to leave the site ready for the next trade. Panels are finished flat and true, joints are struck consistently, and openings and service penetrations are formed where the drawings put them — so the render, cladding or lining that follows starts from a sound surface instead of a repair job.",
    ],
    applicationsLead: "Where Hebel typically earns its place:",
    applications: [
      {
        title: "Boundary and party walls",
        body: "Narrow allotments and zero-lot builds where a lightweight wall with documented fire performance is easier to build and load than double brick.",
      },
      {
        title: "External walls on new homes",
        body: "Full external wall systems on new builds, delivering thermal and acoustic performance in a wall that is quick to erect and ready to render.",
      },
      {
        title: "Townhouse and multi-unit developments",
        body: "Repeatable inter-tenancy and facade walls across multiple dwellings, installed to the tested system details the design relies on.",
      },
      {
        title: "Commercial and mixed-use projects",
        body: "Wall assemblies where the fire and acoustic documentation matters and the programme leaves no room for rework.",
      },
    ],
    benefitsLead: "Specified and installed as a complete system, Hebel can offer:",
    benefits: [
      "A lightweight alternative to traditional masonry, easing structural and footing demands",
      "Thermal performance that helps buffer Adelaide’s summer heat when designed into the full wall build-up",
      "Acoustic separation between dwellings and from the street, defined by the tested assembly",
      "Documented fire-performance ratings for the specified system",
      "Fast erection that suits tight programmes, and a flat substrate ready for render",
    ],
    localLead: "How we approach Hebel in Adelaide:",
    local: [
      "Narrow and zero-lot allotments across the inner and northern suburbs, where boundary walls have to be built from one side",
      "Reactive clay soils, which make the base set-out and the engineer’s footing and articulation details critical",
      "Hot summers and cool winters, where the thermal mass of the wall build-up does real work",
      "Bushfire-prone Adelaide Hills locations, where AAC assemblies are often part of the response to an assessed BAL rating",
      "Builder programmes where the Hebel has to be up, jointed and ready for the following trade on a fixed date",
    ],
    closing:
      "We work closely with builders and developers to keep Hebel installation aligned with the programme and the trades on either side of it. Where the project also includes walling, render or cladding, ask about bringing the work together under one coordinated package.",
    relatedLinks: [
      { label: "Walling services for builders", href: "/walling/" },
      { label: "Rendering over Hebel", href: "/render/" },
      { label: "See our project details", href: "/projects/" },
      { label: "Adelaide service areas", href: "/locations/" },
    ],
    faqs: [
      {
        question: "Is Hebel better than brick?",
        answer:
          "It is different rather than universally better. Hebel is far lighter, goes up faster, and brings thermal and acoustic performance into a single element, which suits boundary walls, tight programmes and sites where weight is a problem. Brick offers a finished masonry face without a coating and a different maintenance profile. The right choice comes out of the structural design, the required finish and the budget.",
      },
      {
        question: "Are Hebel walls fire resistant?",
        answer:
          "Hebel systems can achieve documented fire-performance ratings, but the rating belongs to the complete tested assembly — panel, fixings, jointing and perimeter details — not to the panel on its own. We install to those tested details so the rating the designer specified is the one the wall can actually support.",
      },
      {
        question: "Can Hebel be rendered?",
        answer:
          "Yes, and it usually is. Hebel is designed to receive a render system suited to AAC, which is exactly why the panel surface has to be left flat, true and correctly jointed. We render Hebel as well as install it, so the two stages can be quoted and coordinated together.",
      },
      {
        question: "Is Hebel suitable for residential and commercial projects?",
        answer:
          "Both. Hebel is used in detached homes, townhouse and multi-unit developments and commercial construction. Suitability in any specific case comes down to the structural design, the required performance and the full project specification.",
      },
      {
        question: "Do you supply the Hebel or is it labour only?",
        answer:
          "We work to whichever arrangement suits the project. The quote states clearly who supplies the panels, adhesives, fixings and finishing components, so there is no gap between our scope and the builder’s before work starts.",
      },
      {
        question: "How quickly can a Hebel wall go up?",
        answer:
          "Faster than equivalent traditional masonry in most cases, which is a large part of its appeal on tight programmes. The actual duration depends on the wall area, access, crane or lifting arrangements and how the work is staged around other trades. We give an indicative duration with the quote.",
      },
    ],
  },
  {
    slug: "walling",
    name: "Walling",
    bannerTitle: "Walling Contractors in Adelaide",
    image: "/images/v2/service-walling-installation.webp",
    imageAlt:
      "Walling installer checking internal steel wall framing with a laser level",
    imageWidth: 1600,
    imageHeight: 1067,
    summary:
      "Internal and external wall systems installed accurately, safely and in step with the wider construction programme.",
    metaTitle: "Walling Services Adelaide",
    metaDescription:
      "Internal and external walling services across Adelaide for new homes, renovations, multi-unit developments and commercial builds. Quoted from your drawings.",
    intro: [
      "Every trade that follows inherits the walls. Set them out accurately and the linings, joinery, glazing and finishes all go in cleanly; get them wrong and the problem is paid for four times over. Elite Surface Group installs internal and external wall systems for new homes, renovations, multi-unit developments and commercial projects across Adelaide and South Australia.",
      "We plan the work from the drawings, the selected system and the site programme, then coordinate closely with the builder so framing, linings, openings and finishes connect cleanly with everything around them.",
      "Where the same project also needs Hebel, render or cladding, the whole wall package can sit with one team and one scope.",
    ],
    detail: [
      "Walling is a set-out trade before it is a finishing trade. We work from established lines and levels, check openings against the actual joinery and glazing schedules rather than the assumption, and keep runs straight and plumb so the tolerances the following trades rely on are still there when they arrive.",
      "Coordination is the other half. Services need their penetrations, waterproofing needs its substrate, and the ceiling and floor junctions have to suit whoever is fixing next. We flag conflicts between the drawings and the site while there is still time to resolve them cheaply, which is generally the difference between a smooth handover and a variation.",
      "Safety and access shape the sequence too — particularly on tight infill sites, upper levels and boundary work where scaffold, deliveries and neighbouring properties all have to be worked around.",
    ],
    applicationsLead: "The walling work builders bring to us:",
    applications: [
      {
        title: "New home construction",
        body: "Internal and external wall systems set out from the working drawings and delivered to the builder’s lock-up dates.",
      },
      {
        title: "Renovations and extensions",
        body: "New walls tied into existing structure, where the levels are rarely as drawn and the junction between old and new decides the finish.",
      },
      {
        title: "Multi-unit and townhouse developments",
        body: "Repeatable wall packages across dwellings, including inter-tenancy walls where documented fire and acoustic performance applies.",
      },
      {
        title: "Commercial fit-out and construction",
        body: "Wall systems built to a documented specification and a fixed programme, coordinated with services and following trades.",
      },
    ],
    benefitsLead: "Our walling capability covers:",
    benefits: [
      "Internal and external wall systems for residential and commercial work",
      "Structural wall installation where it forms part of the agreed scope",
      "Accurate openings, junctions and finishing details checked against the real schedules",
      "Coordination with builders, services and the trades on either side of us",
      "One combined scope where walling, Hebel, render and cladding are all required",
    ],
    localLead: "What we account for on Adelaide walling packages:",
    local: [
      "Tight infill and subdivision sites through the inner suburbs, where access dictates the sequence",
      "Boundary and inter-tenancy walls on narrow allotments, often built from one side only",
      "Volume-builder programmes in the northern and southern growth corridors, where dates are fixed",
      "Reactive clay soils and the articulation details that come with them",
      "Renovation work on older brick and stone homes, where nothing existing is quite square",
    ],
    closing:
      "Clear communication and accurate installation are what keep a walling package moving toward the agreed finish. Explore our cladding, render and Hebel services, or send the drawings for a quote on a coordinated package.",
    relatedLinks: [
      { label: "Hebel wall systems", href: "/hebel/" },
      { label: "Cladding installation", href: "/cladding/" },
      { label: "Rendering services", href: "/render/" },
      { label: "Request a quote", href: "/contact-us/#contact" },
    ],
    faqs: [
      {
        question: "Do you handle internal and external walling?",
        answer:
          "Yes. We install internal and external wall systems within the agreed project scope, including coordination with the render or cladding finishes that follow where those are also part of the job.",
      },
      {
        question: "Can you work under our builder or project manager?",
        answer:
          "Yes, and most of our walling work runs that way. Clear drawings, programme dates and defined scope boundaries are what let us integrate efficiently with the other trades on site.",
      },
      {
        question: "Do you take on inter-tenancy and boundary walls?",
        answer:
          "Yes. These are common on townhouse and multi-unit projects, and Hebel is frequently the system of choice. Where documented fire or acoustic performance applies, we install to the tested system details that the rating depends on.",
      },
      {
        question: "Can walling, Hebel, render and cladding come from one team?",
        answer:
          "That is often the most efficient way to run it. A single scope removes the gaps between trades, keeps the responsibility for junctions in one place, and usually shortens the programme. We are happy to quote the whole package or just the part you need.",
      },
      {
        question: "How far ahead should we book walling work?",
        answer:
          "As early as the programme allows. Once the drawings and dates are settled we can hold a slot; the more notice we have, the better we can line the work up with your other trades. Tell us the target dates with your enquiry and we will be straight about what is achievable.",
      },
      {
        question: "How do I get a walling quote?",
        answer:
          "Send the drawings, photos and a short brief through our contact form, or call us. We will review the documentation and prepare an obligation-free quote setting out the work, the materials, the responsibilities and the timing assumptions behind it.",
      },
    ],
  },
];

/** Service names for form dropdowns — avoids importing full page copy into clients when possible. */
export const serviceNames = services.map((service) => service.name);

export const servicesIntro =
  "Specialist installation for new homes, renovations, multi-unit developments and commercial builds across Adelaide and South Australia.";
