import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import {
  ArticleSchema,
  BreadcrumbSchema,
  FAQPageSchema,
} from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { fibreCementCladdingGuide } from "@/content/resources";
import type { ServiceFaq } from "@/content/services";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: fibreCementCladdingGuide.metaTitle,
  description: fibreCementCladdingGuide.metaDescription,
  path: `/resources/${fibreCementCladdingGuide.slug}`,
  image: ogCard("cladding", fibreCementCladdingGuide.metaTitle),
  openGraphType: "article",
  publishedTime: fibreCementCladdingGuide.published,
  modifiedTime: fibreCementCladdingGuide.modified,
});

/** Rendered in the visible FAQ list and emitted as FAQPage schema. */
const faqs: readonly ServiceFaq[] = [
  {
    question: "Is fibre cement cladding suitable for coastal Adelaide sites?",
    answer:
      "Many fibre-cement systems are used near the coast, but suitability belongs to the specific product, its fixings and its finish, set against the site’s exposure. Check the manufacturer’s coastal conditions against the property’s actual position rather than the suburb name, and make sure the fixings, flashings and trims are specified for the same exposure as the boards.",
  },
  {
    question: "Can fibre cement cladding be installed over existing brick?",
    answer:
      "It can where the manufacturer documents an over-masonry method for that product and the wall has been assessed as suitable for it. It is a different job to cladding a frame: the build-up is thicker, the existing weepholes and damp-proof course have to keep working, and every window, eave and service point needs a new detail.",
  },
  {
    question: "Does fibre cement cladding contain asbestos?",
    answer:
      "Modern fibre cement contains no asbestos. Older flat or profiled sheeting is a different matter: on a house built or renovated before 1990 it may contain asbestos and should be tested before anyone drills, cuts or removes it. We do not test for or remove asbestos, and we install new cladding from a cleared substrate.",
  },
  {
    question: "Does fibre cement cladding need painting?",
    answer:
      "It depends on the product. Some fibre-cement cladding is finished on site with a coating system the manufacturer nominates, and other products arrive with a factory finish. The installation guide and the coating manufacturer set what is applied, when, and what upkeep the finish needs afterwards.",
  },
  {
    question: "Can Elite Surface Group choose the fibre cement product for us?",
    answer:
      "No. Product selection depends on the design, the budget, the site exposure and any bushfire or planning requirements, which sit with the project’s designer or the owner. We install the documented system and can discuss how the installation is coordinated once that selection is confirmed.",
  },
];

export default function FibreCementCladdingGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Fibre cement cladding in Adelaide",
            href: `/resources/${fibreCementCladdingGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={fibreCementCladdingGuide} />
      <FAQPageSchema faqs={faqs} />

      <article>
        <PageBanner
          title={fibreCementCladdingGuide.title}
          image={bannerImages[`/resources/${fibreCementCladdingGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Fibre cement cladding in Adelaide" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{fibreCementCladdingGuide.category}</span>
              <time dateTime={fibreCementCladdingGuide.published}>
                Published {fibreCementCladdingGuide.publishedDisplay}
              </time>
              <span>{fibreCementCladdingGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              Fibre cement cladding is not one product. It is a family of
              planks, weatherboards, panels and sheets, each with its own
              installation guide, and a good result comes from planning the
              whole wall around the one that has been specified: a frame that is
              ready for it, a membrane and cavity that drain, junctions resolved
              on paper, and fixings and a finish matched to the site&rsquo;s
              exposure. Choosing the profile is the short part. This guide
              covers the rest.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>
                We install the documented system; selection and compliance sit
                elsewhere.
              </strong>
              <p>
                Elite Surface Group installs the cladding system specified for a
                project and does not certify buildings. Confirming the wind
                classification, a Bushfire Attack Level, weatherproofing
                compliance or planning consent is the role of the designer,
                engineer, bushfire consultant or building surveyor. This is
                general planning information, not an installation method, and it
                does not replace the current manufacturer guide for the selected
                product.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#product-family">One name, many products</a>
                </li>
                <li>
                  <a href="#substrate">What the wall must be ready for</a>
                </li>
                <li>
                  <a href="#cavity">Membrane, battens and orientation</a>
                </li>
                <li>
                  <a href="#junctions">Set-out, joints and junctions</a>
                </li>
                <li>
                  <a href="#exposure">Fixings and site exposure</a>
                </li>
                <li>
                  <a href="#finish-upkeep">Cutting, coating and upkeep</a>
                </li>
                <li>
                  <a href="#next-steps">Sensible next steps</a>
                </li>
                <li>
                  <a href="#faqs-and-sources">Questions and sources</a>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="product-family"
        >
          <div className="shell prose article-prose">
            <h2 id="product-family">
              Fibre cement cladding is a product family, not one board
            </h2>
            <p>
              The name covers several different things that happen to share a
              material.
            </p>
            <TickList
              items={[
                "Planks and weatherboard profiles, usually lapped or interlocked and run horizontally",
                "Vertical-joint panels and grooved sheets that give a board-and-shadow-line look",
                "Flat sheets and larger panels with expressed or covered joints",
                "Trims, corner pieces and accessories that belong to one particular system",
              ]}
            />
            <p>
              Each comes with a product-specific installation guide that sets
              the framing it suits, the fixing schedule, how joints and corners
              are formed and what finish it needs. A detail written for one
              profile does not transfer to another, even from the same
              manufacturer, so the first planning step is to pin down the exact
              product, profile and thickness shown on the drawings.
            </p>
            <p>
              Australian Government guidance treats cladding as part of an
              interacting wall system that also includes framing, membranes,
              insulation and water-management details. Planning a fibre-cement
              installation means planning those layers, not only the visible
              face.
            </p>
            <p>
              This guide assumes fibre cement has already been chosen. If you
              are still weighing it against timber, our{" "}
              <Link href="/resources/fibre-cement-vs-weatherboard-cladding-adelaide/">
                fibre cement or timber weatherboard comparison
              </Link>{" "}
              covers bushfire zoning, coastal exposure and repainting, and the{" "}
              <Link href="/resources/cladding-vs-render-adelaide/">
                cladding or render guide
              </Link>{" "}
              covers the wider choice of exterior finish.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.jameshardie.com.au/fibre-cement">
                James Hardie, fibre cement product information
              </a>{" "}
              and{" "}
              <a href="https://www.yourhome.gov.au/materials/cladding-systems">
                Australian Government YourHome, cladding systems
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="substrate">
          <div className="shell prose article-prose">
            <h2 id="substrate">What the frame or wall has to be ready for</h2>
            <p>
              Cladding follows whatever it is fixed to. On a new timber or steel
              frame, the installer needs studs that are straight, plumb and
              spaced to suit the product&rsquo;s fixing schedule, with any extra
              framing the guide calls for behind joints, corners and openings.
              Part 7.5 of the NCC Housing Provisions sets out deemed-to-satisfy
              fixing provisions for timber and composite wall cladding,
              including cladding fixed through battens attached to the wall
              frame; the manufacturer&rsquo;s guide adds the detail for the
              specific board.
            </p>
            <p>
              Sequence matters as much as straightness. Window and door
              openings, flashings, the membrane, service penetrations and any
              bracing all have a place in the order of work, and a frame handed
              over before those are settled costs time on site. Our{" "}
              <Link href="/resources/steel-frame-vs-timber-frame-walls-adelaide/">
                steel or timber wall framing guide
              </Link>{" "}
              covers how the frame itself is chosen.
            </p>
            <h3>Existing walls are a different job</h3>
            <p>
              Fixing fibre cement over existing brickwork relies on the
              manufacturer&rsquo;s documented over-masonry method and on the
              condition of the wall, which our{" "}
              <Link href="/resources/cladding-over-brick-adelaide/">
                cladding over brick guide
              </Link>{" "}
              works through. Replacing old cladding with new starts with what
              removal exposes, covered in the{" "}
              <Link href="/resources/facade-recladding-adelaide/">
                facade recladding guide
              </Link>
              . And where the old sheeting could contain asbestos, testing and
              licensed removal come first; our{" "}
              <Link href="/resources/asbestos-cladding-replacement-adelaide/">
                asbestos cladding replacement guide
              </Link>{" "}
              sets out that order. We install from a cleared, sound substrate.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/7-roof-and-wall-cladding/part-75-timber-and-composite-wall-cladding">
                NCC 2022 Housing Provisions, Part 7.5 Timber and composite wall
                cladding
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="cavity">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={fibreCementCladdingGuide.image}
                alt={fibreCementCladdingGuide.imageAlt}
                width={fibreCementCladdingGuide.imageWidth}
                height={fibreCementCladdingGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(fibreCementCladdingGuide.image)}
              />
              <figcaption>{fibreCementCladdingGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Behind the boards</span>
              <h2 id="cavity">Membrane, battens and why orientation matters</h2>
              <p>
                A clad wall manages water in layers. The boards shed most of it,
                a pliable membrane behind them deals with what gets past, and in
                a cavity system battens hold the cladding off the membrane so
                moisture can drain and air can move.
              </p>
              <p>
                Batten direction follows board direction. James Hardie and the
                Forest &amp; Wood Products Australia cladding standard both
                document the principle: horizontal boards sit on vertical
                battens so the cavity drains straight down, while vertical
                boards need horizontal battens that are notched or castellated
                so moisture is not held on top of them. Cemintel&rsquo;s cavity
                system documentation makes the same point from the fixing side,
                with battens spaced to match the fixing pattern for the product
                and the site&rsquo;s wind classification. Our{" "}
                <Link href="/resources/vertical-vs-horizontal-cladding-adelaide/">
                  vertical or horizontal cladding guide
                </Link>{" "}
                covers that decision in full.
              </p>
              <p>
                The membrane is part of the design, not an accessory. The NCC
                condensation provisions apply to the whole wall assembly, and
                Adelaide sits in climate zone 5, so the membrane, any insulation
                and the cavity need to be specified together rather than chosen
                on site.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://www.jameshardie.com.au/ContentfulCMS/Installation-Guide/Axon_Cladding_Installation_Guide.pdf">
                  James Hardie, Axon Cladding Installation Guide
                </a>{" "}
                (PDF),{" "}
                <a href="https://fwpa.com.au/wp-content/uploads/2024/11/Industry-Standard-Design-and-Installation-of-Exterior-Timber-Wall-Cladding-Version-7.0-Nov-2024.pdf">
                  FWPA, Design and Installation of Exterior Timber Wall Cladding
                </a>{" "}
                (PDF),{" "}
                <a href="https://www.cemintel.com.au/wp-content/uploads/2023/08/cemintel-cavity-wall-cladding-systems-fc152-web-1.pdf">
                  Cemintel, Cavity Wall Cladding Systems (FC:152)
                </a>{" "}
                (PDF) and{" "}
                <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/10-health-and-amenity/part-108-condensation-management">
                  NCC 2022 Housing Provisions, Part 10.8 Condensation management
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="junctions">
          <div className="shell prose article-prose">
            <h2 id="junctions">Set-out, joints, corners and openings</h2>
            <p>
              The visible quality of a fibre-cement facade is mostly decided
              before the first board is fixed. Set-out establishes where board
              courses or panel joints fall against window heads, sills, corners
              and the top and bottom of the wall, so the lines read as intended
              instead of ending in slivers above an opening.
            </p>
            <h3>Joints and corners</h3>
            <p>
              Every system has its own way of forming a joint: lapped, butted
              over a backing, expressed with a gap, or closed with a trim or
              sealant. Corners are formed with the system&rsquo;s own trims or
              details. Follow the guide for the selected product; improvised
              joints are where both the look and the weatherproofing usually
              fail.
            </p>
            <h3>Windows, doors and the base of the wall</h3>
            <p>
              Openings need head, sill and jamb flashings that lap correctly
              with the membrane, and the base of the wall needs the clearance
              from ground, paving and garden beds that the product guide sets.
              Penetrations for taps, vents, lights and air-conditioning lines
              are sealed to the same documents. These are the places water finds
              first.
            </p>
            <h3>Movement</h3>
            <p>
              Reactive clay soils across much of the Adelaide plains move
              seasonally, and a clad wall shows that movement at its joints.
              Control and movement joints belong on the drawings, agreed between
              the frame, the footing design and the cladding
              manufacturer&rsquo;s joint spacing, not adjusted on site.
            </p>
            <p>Worth resolving on paper before material is ordered:</p>
            <TickList
              items={[
                "The board or panel layout on each elevation, including where joints meet openings",
                "Corner, trim and joint details for the selected system",
                "Head, sill and jamb flashings, and how they lap with the membrane",
                "The detail at the base of the wall and at the eaves or parapet",
                "Every penetration, and which trade seals it",
                "Junctions with render, masonry or another cladding on the same elevation",
              ]}
            />
            <p>
              The{" "}
              <Link href="/projects/dark-feature-cladding/">
                dark feature cladding case study
              </Link>{" "}
              shows how much the joint layout and corners carry a finished
              facade.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.yourhome.gov.au/materials/cladding-systems">
                Australian Government YourHome, cladding systems
              </a>{" "}
              and{" "}
              <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                CSIRO,{" "}
                <cite>Foundation maintenance and footing performance</cite>{" "}
                (PDF)
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="exposure">
          <div className="shell prose article-prose">
            <h2 id="exposure">
              Fixings and exposure: coastal, wind-exposed and bushfire-prone
              sites
            </h2>
            <p>
              The fixing is the smallest part of the system and the one exposure
              attacks first. Manufacturer installation literature sets a minimum
              corrosion-resistance class for fasteners, stepping up within a
              defined distance of the coast or in other corrosive environments,
              and South Australian building guidance uses mapped corrosion
              environments to help determine corrosion-protection requirements
              for certain building classes near the coast. Check the
              product&rsquo;s coastal conditions against the property&rsquo;s
              actual position, not the suburb name. Our{" "}
              <Link href="/locations/coastal-adelaide/">
                coastal Adelaide page
              </Link>{" "}
              explains how we approach those sites.
            </p>
            <p>
              Wind works on the same schedule. Fixing type, spacing and batten
              layout are set against the site&rsquo;s assessed wind
              classification, which comes from the project documents rather than
              from a default.
            </p>
            <p>
              Bushfire-prone sites add a third layer. Parts of metropolitan
              Adelaide, most visibly the Hills Face Zone and the wider Adelaide
              Hills, sit inside a designated bushfire-prone area, where a
              site-specific Bushfire Attack Level assessment may be needed
              before the external wall is finalised. Fibre cement is documented
              by manufacturers as meeting the fire-performance requirements for
              a wide range of ratings, but with specific board, jointing and
              fixing details for each. The assessed rating and the
              manufacturer&rsquo;s bushfire documents decide the detail; our{" "}
              <Link href="/locations/adelaide-hills/">Adelaide Hills page</Link>{" "}
              covers how that shapes a project.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.jameshardie.com.au/ContentfulCMS/Installation-Guide/Axon_Cladding_Installation_Guide.pdf">
                James Hardie, Axon Cladding Installation Guide
              </a>{" "}
              (PDF),{" "}
              <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/maps-to-assist-with-technical-building-issues">
                SA.GOV.AU corrosion-environment maps and building guidance
              </a>
              ,{" "}
              <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/bushfire">
                SA.GOV.AU, bushfire building regulations
              </a>{" "}
              and{" "}
              <a href="https://www.jameshardie.com.au/ContentfulCMS/Technical-Library/Bushfire_Prone_Area_Technical_supplement.pdf">
                James Hardie, Construction of Buildings in Bushfire Prone Areas
              </a>{" "}
              (PDF).
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="finish-upkeep">
          <div className="shell prose article-prose">
            <h2 id="finish-upkeep">Cutting dust, coating and upkeep</h2>
            <p>
              Fibre cement is cut and drilled on site, and that needs planning.
              Cutting it dry generates respirable crystalline silica, which is
              regulated in South Australia, so ask how cutting will be done,
              where, and how dust will be controlled around neighbours, open
              windows and other trades.
            </p>
            <p>
              Finishing depends on the product. Some fibre-cement cladding is
              painted on site with a coating system the manufacturer nominates;
              other products arrive with a factory finish and their own handling
              and touch-up rules. Either way, settle which trade applies the
              coating, when it happens relative to joint sealing and scaffold
              removal, and which warranty conditions apply to the selected
              system.
            </p>
            <p>
              Upkeep is product-specific too. James Hardie&rsquo;s general
              fibre-cement guidance says maintenance depends on location and
              exposure, and lists periodic washing, fastener checks, maintenance
              of protective finishes and checks that joints, penetrations,
              flashings and sealants remain intact, while directing owners to
              the paint manufacturer for coating requirements. Our{" "}
              <Link href="/resources/cladding-maintenance-coastal-adelaide/">
                coastal cladding maintenance guide
              </Link>{" "}
              explains how to find the instructions for the exact product
              instead of applying one brand&rsquo;s schedule to another.
            </p>

            <aside className="article-note article-note--warning">
              <strong>Cutting and working at height are both regulated.</strong>
              <p>
                Most cladding above a single storey is installed from scaffold
                or other access equipment. Confirm how dust and fall risks will
                be controlled before work starts.
              </p>
            </aside>
            <p className="article-source">
              Sources:{" "}
              <a href="https://safework.sa.gov.au/industry/construction/silica">
                SafeWork SA, silica in construction
              </a>
              ,{" "}
              <a href="https://safework.sa.gov.au/industry/construction/working-at-heights">
                SafeWork SA, working at heights
              </a>{" "}
              and{" "}
              <a href="https://www.jameshardie.com.au/fibre-cement">
                James Hardie fibre-cement maintenance guidance
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="next-steps">
          <div className="shell prose article-prose">
            <h2 id="next-steps">Sensible next steps</h2>
            <ol className="steps">
              <li>
                <h3>Pin down the exact product</h3>
                <p>
                  Confirm the manufacturer, profile, thickness and finish on the
                  drawings, and get the current installation guide for that
                  product.
                </p>
              </li>
              <li>
                <h3>Have the site&rsquo;s exposure confirmed</h3>
                <p>
                  Wind classification, corrosion environment and any bushfire
                  rating come from the project documents and the relevant
                  professionals, not from the suburb.
                </p>
              </li>
              <li>
                <h3>Resolve the build-up and the junctions on paper</h3>
                <p>
                  Membrane, battens, cavity, flashings and joint layout should
                  be documented together before material is ordered.
                </p>
              </li>
              <li>
                <h3>Agree who does what</h3>
                <p>
                  Name who supplies the cladding, membrane, battens, fixings and
                  flashings, who installs each, who seals penetrations and who
                  applies the coating.
                </p>
              </li>
              <li>
                <h3>Check whether council or PlanSA approval applies</h3>
                <p>
                  Changing external cladding on an existing building can require
                  development approval depending on the work and the property;
                  confirm this on the PlanSA portal or with the local council
                  before ordering material.
                </p>
              </li>
            </ol>

            <h3>What to have ready for a quote</h3>
            <TickList
              items={[
                "The suburb or postcode and the type of project",
                "Elevations or plans showing which walls are clad and how high they are",
                "The specified product, profile and finish, or the look you are aiming for",
                "What the wall is framed in, or what the existing wall is built from",
                "Whether the cladding, membrane and battens are supplied by you, the builder or the installer",
                "Site access, scaffold arrangements and the programme",
                "Any exposure information already confirmed for the site",
              ]}
            />
            <p>
              Our guide to{" "}
              <Link href="/resources/what-affects-cladding-render-quotes-adelaide/">
                what affects a cladding or render quote
              </Link>{" "}
              explains how those answers move a price, the{" "}
              <Link href="/project-planning/">project planning notes</Link> list
              the wider information worth gathering, and our{" "}
              <Link href="/cladding/">
                Adelaide cladding and facade installation
              </Link>{" "}
              page covers how we scope the work.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://plan.sa.gov.au/development_applications/getting_approval">
                PlanSA, Getting approval
              </a>
              .
            </p>
          </div>
        </section>

        <section
          id="faqs-and-sources"
          className="section"
          aria-labelledby="fibre-cement-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="fibre-cement-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="fibre-cement-faqs">
              {faqs.map((faq) => (
                <div className="faq-list__item" key={faq.question}>
                  <dt>{faq.question}</dt>
                  <dd>{faq.answer}</dd>
                </div>
              ))}
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>James Hardie</dt>
                <dd>
                  <a href="https://www.jameshardie.com.au/fibre-cement">
                    Fibre cement product information
                  </a>
                  ,{" "}
                  <a href="https://www.jameshardie.com.au/ContentfulCMS/Installation-Guide/Axon_Cladding_Installation_Guide.pdf">
                    Axon Cladding Installation Guide
                  </a>{" "}
                  (PDF) and{" "}
                  <a href="https://www.jameshardie.com.au/ContentfulCMS/Technical-Library/Bushfire_Prone_Area_Technical_supplement.pdf">
                    Construction of Buildings in Bushfire Prone Areas
                  </a>{" "}
                  (PDF)
                </dd>
              </div>
              <div>
                <dt>Cemintel (CSR)</dt>
                <dd>
                  <a href="https://www.cemintel.com.au/wp-content/uploads/2023/08/cemintel-cavity-wall-cladding-systems-fc152-web-1.pdf">
                    Cavity Wall Cladding Systems (FC:152)
                  </a>{" "}
                  (PDF)
                </dd>
              </div>
              <div>
                <dt>Forest &amp; Wood Products Australia</dt>
                <dd>
                  <a href="https://fwpa.com.au/wp-content/uploads/2024/11/Industry-Standard-Design-and-Installation-of-Exterior-Timber-Wall-Cladding-Version-7.0-Nov-2024.pdf">
                    Design and Installation of Exterior Timber Wall Cladding
                  </a>{" "}
                  (PDF)
                </dd>
              </div>
              <div>
                <dt>Australian Building Codes Board</dt>
                <dd>
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/7-roof-and-wall-cladding/part-75-timber-and-composite-wall-cladding">
                    NCC 2022 Housing Provisions, Part 7.5 Timber and composite
                    wall cladding
                  </a>{" "}
                  and{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/10-health-and-amenity/part-108-condensation-management">
                    Part 10.8 Condensation management
                  </a>
                </dd>
              </div>
              <div>
                <dt>Government of South Australia</dt>
                <dd>
                  <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/maps-to-assist-with-technical-building-issues">
                    Corrosion-environment maps and building guidance
                  </a>
                  ,{" "}
                  <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/bushfire">
                    bushfire building regulations
                  </a>{" "}
                  and{" "}
                  <a href="https://plan.sa.gov.au/development_applications/getting_approval">
                    PlanSA, Getting approval
                  </a>
                </dd>
              </div>
              <div>
                <dt>SafeWork SA</dt>
                <dd>
                  <a href="https://safework.sa.gov.au/industry/construction/silica">
                    Silica in construction
                  </a>{" "}
                  and{" "}
                  <a href="https://safework.sa.gov.au/industry/construction/working-at-heights">
                    working at heights
                  </a>
                </dd>
              </div>
              <div>
                <dt>Australian Government YourHome</dt>
                <dd>
                  <a href="https://www.yourhome.gov.au/materials/cladding-systems">
                    Cladding systems
                  </a>
                </dd>
              </div>
              <div>
                <dt>CSIRO</dt>
                <dd>
                  <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                    <cite>Foundation maintenance and footing performance</cite>{" "}
                    (PDF)
                  </a>
                </dd>
              </div>
            </dl>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/cladding/">
                Cladding and facade installation Adelaide
              </Link>
              <Link href="/resources/fibre-cement-vs-weatherboard-cladding-adelaide/">
                Fibre cement or weatherboard?
              </Link>
              <Link href="/resources/vertical-vs-horizontal-cladding-adelaide/">
                Vertical or horizontal cladding?
              </Link>
              <Link href="/resources/facade-recladding-adelaide/">
                Facade recladding guide
              </Link>
              <Link href="/resources/what-affects-cladding-render-quotes-adelaide/">
                What affects a quote
              </Link>
              <Link href="/project-planning/">Plan your project enquiry</Link>
              <Link href="/contact-us/#contact">
                Discuss the available project details
              </Link>
            </nav>
          </div>
        </section>
      </article>

      <ContactSection
        defaultService="Cladding"
        intro="Planning fibre-cement cladding? Tell us the suburb, the project type, the product and profile shown on the drawings and what the wall is framed in. Let us know what plans or photos are available, and we’ll arrange how to review them."
      />
      <CtaBand />
    </>
  );
}
