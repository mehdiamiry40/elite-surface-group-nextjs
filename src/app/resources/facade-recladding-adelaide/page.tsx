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
import { facadeRecladdingGuide } from "@/content/resources";
import type { ServiceFaq } from "@/content/services";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: facadeRecladdingGuide.metaTitle,
  description: facadeRecladdingGuide.metaDescription,
  path: `/resources/${facadeRecladdingGuide.slug}`,
  image: ogCard("cladding", facadeRecladdingGuide.metaTitle),
  openGraphType: "article",
  publishedTime: facadeRecladdingGuide.published,
  modifiedTime: facadeRecladdingGuide.modified,
});

/** Rendered in the visible FAQ list and emitted as FAQPage schema. */
const faqs: readonly ServiceFaq[] = [
  {
    question: "Is recladding the same as cladding over an existing wall?",
    answer:
      "No. Recladding removes the existing cladding layer and installs a replacement system in its place. Overcladding fixes a new system over a wall that stays where it is, such as brickwork. The two jobs rely on different checks, fixings and junction details, so confirm which one a quote actually describes.",
  },
  {
    question: "Can one elevation be reclad without doing the whole building?",
    answer:
      "Often, yes. Exposure and condition usually differ between elevations, and a single wall can be a sensible scope. The corners where new cladding meets old need a designed junction, the profile and colour may not match exactly, and staging the work means setting up access more than once.",
  },
  {
    question: "Will new cladding fix a leaking facade?",
    answer:
      "Only where the cladding layer or its junctions caused the leak and the replacement corrects that detail. Water can also enter from a roof, a window, a balcony or plumbing. Have the source established first, because new cladding over an unresolved source hides the problem rather than ending it.",
  },
  {
    question: "Can the building stay occupied while the facade is reclad?",
    answer:
      "In many cases, yes. It depends on the scope, the access equipment, how open sections of wall are protected between removal and installation, and whether any asbestos removal is involved, which is separate controlled work. Agree the sequence, the working hours and the entry points before the job starts.",
  },
  {
    question: "Do you supply the replacement cladding or only install it?",
    answer:
      "We install cladding to an agreed scope. The quote identifies the selected system, the substrate condition it assumes, who supplies each material and which adjoining work sits with other trades, so those responsibilities are clear before installation starts.",
  },
];

export default function FacadeRecladdingGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Facade recladding in Adelaide",
            href: `/resources/${facadeRecladdingGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={facadeRecladdingGuide} />
      <FAQPageSchema faqs={faqs} />

      <article>
        <PageBanner
          title={facadeRecladdingGuide.title}
          image={bannerImages[`/resources/${facadeRecladdingGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Facade recladding in Adelaide" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{facadeRecladdingGuide.category}</span>
              <time dateTime={facadeRecladdingGuide.published}>
                Published {facadeRecladdingGuide.publishedDisplay}
              </time>
              <span>{facadeRecladdingGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              Facade recladding means taking the existing cladding off a
              building and installing a replacement system in its place. It is
              the right scope less often than people expect, and a bigger one
              than the new boards suggest. The decision rests on what is
              happening behind the face, and the result rests on the frame, the
              membrane, the flashings and the junctions the old cladding has
              been hiding. Inspect first, allow for what removal uncovers, and
              plan the new system around the wall and its exposure rather than
              around a sample board.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>
                We install the replacement; we do not diagnose the old wall
                remotely.
              </strong>
              <p>
                Elite Surface Group installs cladding, render, Hebel and walling
                to a documented specification. We do not certify buildings,
                carry out engineering or remove asbestos. Where water entry,
                structural adequacy, fire performance or hazardous material is
                in question, arrange assessment by a suitably qualified
                professional before a replacement system is chosen.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#when">Recladding, repair or maintenance?</a>
                </li>
                <li>
                  <a href="#inspect">What to inspect first</a>
                </li>
                <li>
                  <a href="#removal">What removal can uncover</a>
                </li>
                <li>
                  <a href="#replacement">Planning the replacement system</a>
                </li>
                <li>
                  <a href="#approvals">Approvals, people and sequencing</a>
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

        <section className="section section--tint" aria-labelledby="when">
          <div className="shell prose article-prose">
            <h2 id="when">
              Facade recladding, repair or maintenance: which is it?
            </h2>
            <p>
              Three different scopes get described as &ldquo;fixing the
              facade&rdquo;, and they are not interchangeable.
            </p>
            <h3>Maintenance</h3>
            <p>
              Washing, recoating and resealing to the product&rsquo;s current
              instructions. If the cladding is sound and the wall behind it is
              dry, maintenance is the scope, and the manufacturer&rsquo;s
              guidance for that exact product governs it. Our{" "}
              <Link href="/resources/cladding-maintenance-coastal-adelaide/">
                coastal cladding maintenance guide
              </Link>{" "}
              explains how to find that guidance instead of borrowing another
              product&rsquo;s schedule.
            </p>
            <h3>Local repair</h3>
            <p>
              Replacing damaged boards or panels, refixing a loose run, or
              correcting one junction such as a window head flashing. A repair
              makes sense when the damage has a known, local cause and the same
              product, profile and finish can still be matched.
            </p>
            <h3>Recladding</h3>
            <p>
              Removing the cladding layer from an elevation, or from the whole
              building, and installing a replacement system. That is a
              construction project with its own design, approvals and
              sequencing, not a large repair.
            </p>
            <p>
              The conditions below tend to move a facade from the first two
              scopes toward the third. None of them is a diagnosis, and more
              than one usually applies.
            </p>
            <TickList
              items={[
                "Damage or deterioration spread across an elevation rather than confined to one area",
                "Water reaching the wall behind the cladding at more than one junction",
                "Repairs that keep being repeated because the cause sits behind the face",
                "A product, profile or finish that can no longer be matched or maintained to its documents",
                "Older sheeting that has to come off in any case, such as material confirmed to contain asbestos",
                "A design change, where the building is getting a different facade rather than a refreshed one",
              ]}
            />
            <p>
              Australian Government guidance treats cladding as part of an
              interacting wall system that also includes framing, membranes,
              insulation and water-management details. That is why the visible
              face cannot settle the question alone: a facade that looks tired
              may only need maintenance, and one that looks acceptable may be
              letting water in behind it.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://www.yourhome.gov.au/materials/cladding-systems">
                Australian Government YourHome, cladding systems
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="inspect">
          <div className="shell prose article-prose">
            <h2 id="inspect">What to inspect before a facade is reclad</h2>
            <p>
              A useful inspection works from the outside in, and starts with
              paperwork rather than a ladder.
            </p>
            <h3>The existing cladding and its records</h3>
            <p>
              Identify the product, profile, finish and approximate age from
              handover documents, drawings, invoices or warranty records before
              relying on appearance. Fibre-cement boards, coated steel,
              aluminium, timber-derived products and composites are fixed,
              jointed and maintained differently, and the removal method depends
              on which one is on the wall. Note any earlier repairs, repaints or
              partial replacements, because they often mark where a problem has
              already been chased.
            </p>
            <h3>Fixings, flashings and junctions</h3>
            <p>
              Most water gets in at a junction, not through the middle of a
              board. Look at window and door heads, sills and jambs, the base of
              the wall, the line where the wall meets the eaves or a lower roof,
              the corners, and every penetration for a tap, vent, light or
              air-conditioning line. Corrosion at fasteners or adjoining
              metalwork, open joints and split or missing sealant are all worth
              recording with their location.
            </p>
            <h3>The wall behind and its moisture history</h3>
            <p>
              What sits behind the cladding decides most of the replacement
              scope: a pliable membrane or none, a drained cavity or a
              direct-fixed board, a timber or steel frame, or masonry. Very
              little of that can be confirmed from outside. Inside the building,
              staining, swollen linings or skirtings, a persistent musty smell
              and marks that return after rain belong in the same record.
            </p>
            <p>
              Build a dated record from the ground or another safely accessible
              position:
            </p>
            <TickList
              items={[
                "A wide photograph of each elevation, then closer views that still show where they were taken",
                "The product, profile and finish, where records confirm them",
                "Loose, cracked, displaced or otherwise damaged boards and panels",
                "Visible corrosion at fixings, cut edges, flashings and adjoining metalwork",
                "The condition of joints and sealant at corners, openings and penetrations",
                "Soil, paving, garden beds or stored materials built up against the base of the wall",
                "Internal signs of moisture, and when they appear",
              ]}
            />
            <p>
              Do not pull panels, probe behind boards or work from height to
              complete the record. Where a defect could involve the membrane,
              the cavity, the flashings or the frame, the assessment belongs to
              a suitably qualified professional who can open the wall up
              safely.
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="removal">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={facadeRecladdingGuide.image}
                alt={facadeRecladdingGuide.imageAlt}
                width={facadeRecladdingGuide.imageWidth}
                height={facadeRecladdingGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(facadeRecladdingGuide.image)}
              />
              <figcaption>{facadeRecladdingGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Allow for the unknown</span>
              <h2 id="removal">What removing the old cladding can uncover</h2>
              <p>
                Once the cladding is off, the wall behind it is visible for the
                first time since it was built, and that is when the real scope
                forms. On older framed homes it is common to find some
                combination of framing members that need replacing, no membrane,
                no insulation and window flashings that were never installed.
                None of it can be confirmed beforehand.
              </p>
              <p>
                A recladding scope should say so in writing. Ask how the quote
                treats what cannot be seen: which substrate condition it
                assumes, what is allowed for frame or flashing repairs, who
                decides what happens when the wall is worse than assumed, and
                where the hold point sits before new cladding covers it again. A
                stated allowance with clear assumptions is a more honest
                document than a fixed figure renegotiated halfway through. Our
                guide to{" "}
                <Link href="/resources/what-affects-cladding-render-quotes-adelaide/">
                  what affects a cladding or render quote
                </Link>{" "}
                explains how those assumptions shape a price.
              </p>
              <p>
                Older flat or profiled sheeting needs one more step before any
                of this. South Australian government guidance treats a home
                built or renovated before the mid-1980s as highly likely to
                contain asbestos products, and that cannot be settled by
                looking. Identification is a testing question and removal is
                licensed work; we do neither, and install the replacement from a
                cleared substrate. Our guide to{" "}
                <Link href="/resources/asbestos-cladding-replacement-adelaide/">
                  replacing asbestos cladding in Adelaide
                </Link>{" "}
                sets out the order that work runs in.
              </p>
              <p className="article-source">
                Source:{" "}
                <a href="https://asbestos.sa.gov.au/in-your-home/find-and-identify-asbestos-in-the-home">
                  Government of South Australia, find and identify asbestos in
                  the home
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="replacement">
          <div className="shell prose article-prose">
            <h2 id="replacement">
              How replacement cladding is planned around the existing wall
            </h2>
            <p>
              The new system has to suit a wall that was designed around the old
              one. Four things shape it.
            </p>
            <h3>The build-up, not only the board</h3>
            <p>
              Replacement is the chance to add or renew a membrane, a drained
              cavity and insulation, but those layers interact and must be
              designed together. The NCC condensation provisions apply to the
              whole wall assembly rather than to the cladding, and Adelaide sits
              in climate zone 5. Part 7.5 of the NCC Housing Provisions sets out
              deemed-to-satisfy fixing provisions for timber and composite wall
              cladding on a wall frame; beyond that, the manufacturer&rsquo;s
              installation guide for the selected product governs battens,
              fixings and joints. Our{" "}
              <Link href="/resources/fibre-cement-cladding-adelaide/">
                fibre cement cladding guide
              </Link>{" "}
              walks through how one common family of products is planned, and
              the{" "}
              <Link href="/resources/cladding-vs-render-adelaide/">
                cladding or render comparison
              </Link>{" "}
              covers the wider choice of finish.
            </p>
            <h3>Openings, edges and wall thickness</h3>
            <p>
              A different product or a new cavity changes the thickness of the
              wall, and that change lands on every window and door reveal, the
              eaves lining, the meter box, taps, downpipe brackets and the base
              of the wall. Those junctions are resolved on the drawings before
              material is ordered, because they decide whether the new facade
              sheds water or collects it.
            </p>
            <h3>Recladding a brick or masonry wall</h3>
            <p>
              Fixing a lightweight system over existing brickwork is a different
              job to replacing cladding on a frame. The wall already manages
              water through its own cavity, weepholes and damp-proof course, and
              the new layer has to work with those details. Our{" "}
              <Link href="/resources/cladding-over-brick-adelaide/">
                guide to cladding over brick
              </Link>{" "}
              covers the direct-fix and cavity methods and what the masonry has
              to confirm first.
            </p>
            <h3>Coastal, wind-exposed and bushfire-prone sites</h3>
            <p>
              Exposure is a specification input, not a postcode. South
              Australian building guidance uses mapped corrosion environments to
              help determine corrosion-protection requirements for certain
              building classes near the coast, and manufacturer literature steps
              up fastener requirements within a defined distance of it. Fixing
              schedules are set against the site&rsquo;s assessed wind
              classification. In a designated bushfire-prone area, a
              site-specific Bushfire Attack Level assessment may be needed
              before the cladding and the rest of the external wall are
              finalised. Our{" "}
              <Link href="/locations/coastal-adelaide/">coastal Adelaide</Link>{" "}
              and{" "}
              <Link href="/locations/adelaide-hills/">Adelaide Hills</Link>{" "}
              pages explain how we approach those conditions, and the{" "}
              <Link href="/resources/fibre-cement-vs-weatherboard-cladding-adelaide/">
                fibre cement or weatherboard comparison
              </Link>{" "}
              explains how bushfire zoning is confirmed.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/10-health-and-amenity/part-108-condensation-management">
                NCC 2022 Housing Provisions, Part 10.8 Condensation management
              </a>
              ,{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/7-roof-and-wall-cladding/part-75-timber-and-composite-wall-cladding">
                Part 7.5 Timber and composite wall cladding
              </a>
              ,{" "}
              <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/maps-to-assist-with-technical-building-issues">
                SA.GOV.AU corrosion-environment maps and building guidance
              </a>{" "}
              and{" "}
              <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/bushfire">
                SA.GOV.AU, bushfire building regulations
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="approvals">
          <div className="shell prose article-prose">
            <h2 id="approvals">
              Approvals, people and working on an occupied building
            </h2>
            <p>
              In South Australia, whether planning consent is needed depends on
              how the work is categorised. Some work proceeds as accepted
              development with building consent only, but that category has
              exceptions&mdash;heritage areas and the Hills Face Zone among
              them&mdash;and recladding changes a building&rsquo;s external
              appearance, which is what a character or heritage overlay
              concerns. The NCC&rsquo;s South Australian provisions also set
              fire-separation requirements for external walls close to an
              allotment boundary, which can decide what one elevation may be
              clad in. Confirm the position for your allotment before material
              is ordered.
            </p>
            <h3>Who else is involved</h3>
            <dl className="faq-list professional-list">
              <div className="faq-list__item">
                <dt>Building designer or architect</dt>
                <dd>
                  Documents the replacement system, the junction details and the
                  finished appearance.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Building surveyor or certifier</dt>
                <dd>
                  Confirms the approval pathway and assesses the proposed wall
                  against the applicable building rules.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Structural engineer</dt>
                <dd>
                  Needed where the framing, the masonry or fixings into the
                  existing structure are in question.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Asbestos testing and licensed removal</dt>
                <dd>
                  Needed where older sheeting is suspected or confirmed to
                  contain asbestos. The area is cleared before any new work
                  starts.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Bushfire consultant</dt>
                <dd>
                  Confirms the assessed rating where the site sits in a
                  bushfire-prone area.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Elite Surface Group cladding team</dt>
                <dd>
                  Installs the documented cladding system to the agreed scope
                  and coordinates with the builder and adjoining trades.
                </dd>
              </div>
            </dl>
            <h3>Sequencing around people living or working inside</h3>
            <p>
              Most recladding happens on a building that is still in use. The
              programme usually runs elevation by elevation so that only part of
              the wall is open at a time, with temporary weather protection
              agreed for any period between removal and the new cladding.
              Scaffold or other access equipment tends to span every stage, so
              settle who provides it and for how long. Downpipes, meter boxes,
              taps, lights and air-conditioning lines have to be removed and
              reinstated by someone, and that someone should be named.
            </p>
            <p>
              Put the split in writing: who removes and disposes of the old
              cladding, who repairs framing, who supplies the membrane, battens,
              fixings and flashings, who flashes the windows, and who makes good
              at the eaves and the ground line. Our{" "}
              <Link href="/cladding/">
                Adelaide cladding and facade installation
              </Link>{" "}
              work is quoted to whichever split the project sets, the{" "}
              <Link href="/projects/dark-feature-cladding/">
                dark feature cladding case study
              </Link>{" "}
              shows how much the joint layout and corners carry a finished
              facade, and the{" "}
              <Link href="/locations/adelaide/">Adelaide service area page</Link>{" "}
              covers where we work.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval">
                PlanSA, find out if you need approval
              </a>
              ,{" "}
              <a href="https://plan.sa.gov.au/development_applications/getting_approval/how_applications_are_assessed/types_of_consent">
                PlanSA, types of consent
              </a>{" "}
              and{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/8-south-australia/92-fire-separation-external-walls">
                NCC 2022 Housing Provisions, Part 9.2 Fire separation of
                external walls (South Australia)
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="next-steps">
          <div className="shell prose article-prose">
            <h2 id="next-steps">Sensible next steps</h2>
            <ol className="steps">
              <li>
                <h3>Gather what is known about the existing wall</h3>
                <p>
                  Collect drawings, handover documents, product records and the
                  history of leaks or repairs, and build the ground-level record
                  described above.
                </p>
              </li>
              <li>
                <h3>Have unknown or older material tested</h3>
                <p>
                  Where the sheeting could contain asbestos, arrange sampling
                  through an accredited laboratory before anyone drills, cuts or
                  removes it.
                </p>
              </li>
              <li>
                <h3>Get the cause assessed before choosing the cure</h3>
                <p>
                  Where water entry, movement or structural condition is in
                  question, have a suitably qualified professional establish the
                  cause. Recladding over an unresolved source only hides it.
                </p>
              </li>
              <li>
                <h3>Confirm the approval pathway and the exposure</h3>
                <p>
                  Check the development category and any overlay on the
                  allotment, and have the wind classification, the corrosion
                  environment and any bushfire rating confirmed for the site.
                </p>
              </li>
              <li>
                <h3>Ask for a scope that states its assumptions</h3>
                <p>
                  A recladding quote should name the system, the substrate
                  condition it assumes, the allowance for concealed repairs and
                  who carries each junction.
                </p>
              </li>
            </ol>

            <h3>What a recladding enquiry should include</h3>
            <p>
              The more of this an installer has at the start, the fewer
              assumptions end up in the quote.
            </p>
            <TickList
              items={[
                "The suburb or postcode and the type of building",
                "Which elevations are in scope and roughly how high they are",
                "What the existing cladding is, if records confirm it, and its approximate age",
                "What the wall is built from behind the cladding, if known",
                "Any history of leaks, movement, earlier repairs or asbestos testing",
                "The replacement product or look in mind, and whether a designer is involved",
                "Whether the building stays occupied during the work, and any access constraints",
                "Which drawings, photographs or reports are available",
              ]}
            />
            <p>
              Our{" "}
              <Link href="/project-planning/">project planning notes</Link>{" "}
              list the wider information that makes an early conversation more
              useful.
            </p>

            <aside className="article-note article-note--warning">
              <strong>
                Removal and installation both carry dust and height risks.
              </strong>
              <p>
                Cutting fibre cement dry generates respirable crystalline
                silica, which is regulated in South Australia, and most
                recladding works above single-storey height. Confirm how dust
                and fall risks will be controlled before work starts.
              </p>
            </aside>
            <p className="article-source">
              Sources:{" "}
              <a href="https://safework.sa.gov.au/industry/construction/silica">
                SafeWork SA, silica in construction
              </a>{" "}
              and{" "}
              <a href="https://safework.sa.gov.au/industry/construction/working-at-heights">
                SafeWork SA, working at heights
              </a>
              .
            </p>
          </div>
        </section>

        <section
          id="faqs-and-sources"
          className="section section--tint"
          aria-labelledby="recladding-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="recladding-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="recladding-faqs">
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
                <dt>Australian Government YourHome</dt>
                <dd>
                  <a href="https://www.yourhome.gov.au/materials/cladding-systems">
                    Cladding systems
                  </a>
                </dd>
              </div>
              <div>
                <dt>Australian Building Codes Board</dt>
                <dd>
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/7-roof-and-wall-cladding/part-75-timber-and-composite-wall-cladding">
                    NCC 2022 Housing Provisions, Part 7.5 Timber and composite
                    wall cladding
                  </a>
                  ,{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/10-health-and-amenity/part-108-condensation-management">
                    Part 10.8 Condensation management
                  </a>{" "}
                  and{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/8-south-australia/92-fire-separation-external-walls">
                    Part 9.2 Fire separation of external walls (South Australia)
                  </a>
                </dd>
              </div>
              <div>
                <dt>Government of South Australia</dt>
                <dd>
                  <a href="https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval">
                    PlanSA, find out if you need approval
                  </a>
                  ,{" "}
                  <a href="https://plan.sa.gov.au/development_applications/getting_approval/how_applications_are_assessed/types_of_consent">
                    types of consent
                  </a>
                  ,{" "}
                  <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/maps-to-assist-with-technical-building-issues">
                    corrosion-environment maps and building guidance
                  </a>
                  ,{" "}
                  <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/bushfire">
                    bushfire building regulations
                  </a>{" "}
                  and{" "}
                  <a href="https://asbestos.sa.gov.au/in-your-home/find-and-identify-asbestos-in-the-home">
                    find and identify asbestos in the home
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
            </dl>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/cladding/">
                Cladding and facade installation Adelaide
              </Link>
              <Link href="/resources/cladding-over-brick-adelaide/">
                Cladding over brick guide
              </Link>
              <Link href="/resources/asbestos-cladding-replacement-adelaide/">
                Replacing asbestos cladding
              </Link>
              <Link href="/resources/fibre-cement-cladding-adelaide/">
                Fibre cement cladding guide
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
        intro="Considering recladding a facade? Tell us the suburb, the building type, what the existing cladding is if you know, and which elevations are in scope. Let us know what photos, plans or product records are available, and we’ll arrange how to review them."
      />
      <CtaBand />
    </>
  );
}
