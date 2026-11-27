import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import {
  Checklist,
  ComparisonTable,
  CompatibilityMatrix,
} from "@/components/ContentBlocks";
import { CtaBand } from "@/components/CtaBand";
import {
  ArticleSchema,
  BreadcrumbSchema,
  FAQPageSchema,
} from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import {
  junctionDecisions,
  quoteChecklist,
  substrates,
} from "@/content/guides/internal-rendering-adelaide";
import { bannerImages } from "@/content/pages";
import { internalRenderingGuide } from "@/content/resources";
import type { ServiceFaq } from "@/content/services";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: internalRenderingGuide.metaTitle,
  description: internalRenderingGuide.metaDescription,
  path: `/resources/${internalRenderingGuide.slug}`,
  image: ogCard("render", internalRenderingGuide.metaTitle),
  openGraphType: "article",
  publishedTime: internalRenderingGuide.published,
  modifiedTime: internalRenderingGuide.modified,
});

/** Rendered below and emitted as FAQPage schema, so the two cannot drift. */
const faqs: readonly ServiceFaq[] = [
  {
    question: "Can any internal wall be rendered?",
    answer:
      "Not automatically. Render bonds to a solid substrate, so brickwork, blockwork and panel systems the selected render is documented for are the usual candidates. A framed wall with a sheet lining is a different build-up, and whether it can carry a rendered finish depends on the lining and the render system’s documents. The wall’s construction is the first thing to confirm.",
  },
  {
    question: "Is a smooth finish harder to get right indoors?",
    answer:
      "It is less forgiving. A smooth finish inherits the flatness of the wall beneath it, and interior lighting set close to a wall shows variations that a fine texture would soften. Bringing an uneven wall flat enough for a smooth finish is its own scope of work, so raise it before the finish is chosen.",
  },
  {
    question: "Can internal rendering be done while we are living in the home?",
    answer:
      "It can be planned, and it does need planning. Internal rendering is wet work, preparation makes dust and the wall needs ventilation while it cures. The rooms involved, the path through the house, protection for floors and furniture and the order of work should all be agreed before a start date is set.",
  },
  {
    question: "Will internal render cover cracks or damp patches?",
    answer:
      "It will cover them for a while, which is not the same as fixing them. Render bonded to a wall that is moving or damp reproduces the problem at the new surface. Cracking and damp need their cause assessed by a suitably qualified professional before a finish is applied.",
  },
  {
    question: "How soon can a rendered internal wall be painted?",
    answer:
      "That is set by the render system and the coating going over it, not by a general rule. Each product’s current data sheet states its curing and recoating requirements, and room temperature and ventilation affect how the wall dries. Ask for those documents and build the answer into the programme.",
  },
];

export default function InternalRenderingGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Internal rendering in Adelaide",
            href: `/resources/${internalRenderingGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={internalRenderingGuide} />
      <FAQPageSchema faqs={faqs} />

      <article>
        <PageBanner
          title={internalRenderingGuide.title}
          image={bannerImages[`/resources/${internalRenderingGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Internal rendering in Adelaide" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{internalRenderingGuide.category}</span>
              <time dateTime={internalRenderingGuide.published}>
                Published {internalRenderingGuide.publishedDisplay}
              </time>
              {internalRenderingGuide.modifiedDisplay ? (
                <time dateTime={internalRenderingGuide.modified}>
                  Updated {internalRenderingGuide.modifiedDisplay}
                </time>
              ) : null}
              <span>{internalRenderingGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              Internal rendering puts a hard, continuous finish on masonry or
              panel walls inside a building, and it is judged more closely than
              the same finish outside. People stand an arm&rsquo;s length from
              it, downlights and windows rake light across it, and it has to
              meet skirtings, door frames, floors and joinery in clean lines.
              Weather stops being the main question. What the wall is built
              from, how flat it is, which finish the room&rsquo;s light will
              tolerate and where the render stops at every edge are what decide
              the result.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>
                A what-to-confirm guide, not an application method.
              </strong>
              <p>
                Elite Surface Group applies render and installs cladding, Hebel
                and walling. We do not certify buildings, assess structure or
                diagnose damp. Where an internal wall is cracking, damp or of
                uncertain construction, arrange assessment by a suitably
                qualified professional before a finish is specified, and take
                preparation, application and drying requirements from the
                current data sheets for the selected system.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#where-it-fits">What internal render is asked to do</a>
                </li>
                <li>
                  <a href="#substrate">What the wall is built from</a>
                </li>
                <li>
                  <a href="#finish">Choosing a finish for indoors</a>
                </li>
                <li>
                  <a href="#junctions">Junctions and edges</a>
                </li>
                <li>
                  <a href="#sequencing">Sequencing, dust and drying</a>
                </li>
                <li>
                  <a href="#quote-ready">What to have ready for a quote</a>
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
          aria-labelledby="where-it-fits"
        >
          <div className="shell prose article-prose">
            <h2 id="where-it-fits">What internal rendering is asked to do</h2>
            <p>
              Render is applied wet and cures in place, bonded to something
              solid: brickwork, blockwork, an AAC panel such as Hebel, or a base
              the render system is documented for. Indoors it is chosen where a
              wall is already masonry or panel and the design wants one
              continuous, hard surface rather than a lined and jointed one.
            </p>
            <p>It is commonly considered for:</p>
            <TickList
              items={[
                "Masonry or blockwork walls left exposed by an extension or renovation",
                "Entries, stairwells and double-height walls where one unbroken surface is wanted",
                "Garages, undercrofts and service areas built from block or panel",
                "Feature walls where a texture or coloured render is part of the design",
                "Commercial interiors where the specification calls for a rendered wall finish",
                "External finishes that return inside through a glazed opening, so the wall reads as one element",
              ]}
            />

            <h3>How it differs from rendering outside</h3>
            <p>
              Outside, a render system is part of how the wall handles rain,
              sun and, near the coast, salt. Inside, that load largely
              disappears and three others take its place. The first is
              scrutiny: an internal wall is seen close up, often in low-angle
              light from a window at the end of a hallway or a row of downlights
              set near the wall. The second is its surroundings. Finished
              floors, installed joinery, power points and door frames are either
              already there or arriving straight after, so every edge of the
              render is a visible line. The third is the people in the building,
              because dust, access and drying all happen inside a space someone
              wants to use.
            </p>

            <h3>Where render is not automatically the answer</h3>
            <p>
              A framed wall with a sheet lining is a different build-up from a
              masonry wall. Whether it can carry a rendered finish depends on
              the lining and on what the selected render system is documented to
              go over, so the wall&rsquo;s construction is the first thing to
              establish. Our{" "}
              <Link href="/walling/">internal and external walling</Link> page
              covers how wall systems are planned; this guide is about the
              rendered finish applied to them, and our{" "}
              <Link href="/render/">Adelaide rendering service</Link> page
              explains how we scope that work.
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="substrate">
          <div className="shell prose article-prose">
            <h2 id="substrate">Start with what the wall is built from</h2>
            <p>
              Render is bonded to its substrate, so the substrate has a vote
              before anyone discusses texture. Brickwork, blockwork, AAC panel
              and previously coated walls do not all take the same base coat,
              and one room can contain more than one of them. Our guide to{" "}
              <Link href="/resources/preparing-walls-for-render-adelaide/">
                preparing walls for render
              </Link>{" "}
              works through the checks in detail; indoors, these are the ones
              that come up most.
            </p>

            <h3>New brickwork and blockwork</h3>
            <p>
              Bare, clean masonry is the substrate cement render was developed
              for. On a new internal wall the questions are about readiness
              rather than suitability: whether the wall is flat and plumb enough
              for the finish chosen, whether chases cut for cables and pipes
              have been filled, and whether the masonry and any filled areas
              have cured to the point the product data requires. A smooth finish
              inherits the tolerance of the wall beneath it, and bringing an
              uneven wall flat enough to carry one is its own scope of work.
            </p>

            <h3>AAC and Hebel panel walls</h3>
            <p>
              Hebel is a product family, and CSR publishes separate systems for
              internal and external walls, each with its own design and
              installation information. A panel wall needs a coating system
              matched to the panel manufacturer&rsquo;s specification and to its
              control-joint layout, so identify the exact system on the drawings
              before a finish is discussed. Our guide to{" "}
              <Link href="/resources/rendering-hebel-panels-adelaide/">
                rendering Hebel panels
              </Link>{" "}
              sets out what to confirm.
            </p>

            <h3>Existing render and painted walls</h3>
            <p>
              A previously painted or rendered surface often needs sealing,
              priming or patching before a new coat goes on, so that absorption
              is even and the new coating adheres properly. Where the history of
              the wall is unknown, the proposed system&rsquo;s technical
              literature sets out the testing and preparation it requires.
              Existing render that sounds hollow, or has cracked and been
              patched before, is a repair question first; the{" "}
              <Link href="/resources/render-repair-adelaide/">
                render repair guide
              </Link>{" "}
              explains how that scope is decided.
            </p>
            <p>
              Age matters for a second reason. SA Health says properties built
              before 1980 are likely to contain lead-based paint, and that
              damaged or disturbed lead paint can create an exposure risk. The
              age of a house does not prove what is on one wall, but it is a
              reason to identify the risk before any coating is sanded or
              scraped indoors.
            </p>

            <h3>Damp in older internal walls</h3>
            <p>
              White powdery deposits, bubbling paint or crumbling mortar low on
              an internal wall point to a moisture source, not a finish problem.
              Render applied over it does not stop the water, and the moisture
              often takes the new coating with it. Our{" "}
              <Link href="/resources/salt-damp-adelaide/">salt damp guide</Link>{" "}
              explains why the cause has to be assessed and dealt with first. We
              apply finishes; we do not diagnose or treat damp.
            </p>

            <h3>Internal substrates at a glance</h3>
            <p>
              The table gathers those substrates, and two that come up
              elsewhere in this guide, into one view: what each usually needs
              and what to confirm before a finish is specified.
            </p>
            <CompatibilityMatrix {...substrates} />
            <p className="article-source">
              Sources:{" "}
              <a href="https://rockcote.com.au/resources/choosing-the-best-paint-for-rendered-homes/">
                Rockcote, choosing the best paint for rendered homes
              </a>
              ,{" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex-preparation/">
                Dulux, Acratex preparation
              </a>
              ,{" "}
              <a href="https://hebel.com.au/resources/technical-documents/">
                CSR Hebel technical documents
              </a>{" "}
              and{" "}
              <a href="https://www.sahealth.sa.gov.au/wps/wcm/connect/9d1caad2-c402-4327-b213-3b8e0319cf96/Managing%2Blead-based%2Bpaint%2Bfact%2Bsheet-final%2Bendorsed_October%2B2023.pdf?MOD=AJPERES">
                SA Health, <cite>Managing lead-based paint</cite> (PDF)
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="finish">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={internalRenderingGuide.image}
                alt={internalRenderingGuide.imageAlt}
                width={internalRenderingGuide.imageWidth}
                height={internalRenderingGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(internalRenderingGuide.image)}
              />
              <figcaption>{internalRenderingGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Finish selection</span>
              <h2 id="finish">Choosing a render finish for indoors</h2>
              <p>
                The same grades are available inside as out: a smooth trowelled
                surface, a fine sand or float grain, or a coarser texture.
                Rockcote&rsquo;s homeowner guide describes smooth render as
                common in modern architectural work where clean lines and
                minimal detailing are wanted, and notes that textured finishes
                can help conceal minor substrate variations. Indoors that trade
                is sharper. A smooth wall hides nothing, and a light fitting
                mounted close to it will find every ripple the substrate hands
                upward.
              </p>
              <p>
                Light and sheen work together. A coating with more sheen shows
                more of the surface beneath it under the same light, so the
                finish, the coating over it and the lighting plan are worth
                deciding as one question rather than three. A fine grain is
                often the practical choice on an older masonry wall that is not
                perfectly flat; a smooth finish suits a wall that has been
                prepared to carry it.
              </p>
              <p>
                The last choice is where the colour sits: in the render itself,
                or in a separate coating applied over a rendered base. Indoors
                that decides how scuffs are touched up, who applies the final
                coat and who is responsible for each layer. Our guide to{" "}
                <Link href="/resources/render-finishes-adelaide/">
                  render finishes
                </Link>{" "}
                compares the grades, and the{" "}
                <Link href="/resources/acrylic-render-vs-cement-render-adelaide/">
                  acrylic versus cement render comparison
                </Link>{" "}
                covers the system underneath them.
              </p>
              <p>
                Ask for a sample applied to the wall itself and look at it under
                the lighting the room will actually have. A handheld board
                viewed in daylight says little about a hallway lit from one end.
              </p>
              <p className="article-source">
                Source:{" "}
                <a href="https://rockcote.com.au/what-are-the-different-types-of-render-a-homeowners-guide/">
                  Rockcote, types of render
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="junctions">
          <div className="shell prose article-prose">
            <h2 id="junctions">Junctions decide how finished the room looks</h2>
            <p>
              Outside, junctions are mostly about keeping water out. Inside they
              are about lines. Render has thickness, so it moves the face of the
              wall relative to everything fixed to or set into it, and each of
              those meetings needs a decision before work starts rather than a
              trowel-edge solution on the day.
            </p>

            <h3>Skirtings, floors and ceilings</h3>
            <p>
              Decide whether the render runs down behind a skirting or stops at
              a set line above the floor, and whether skirtings are fixed before
              or after. At the top of the wall, the meeting with the ceiling
              lining can be a cornice, a shadow line or a square-set corner, and
              each one changes which trade goes first. Finished floors need a
              known level to work to and protection while the wall is wet.
            </p>

            <h3>Door frames and window reveals</h3>
            <p>
              Render build changes the depth of a reveal and how far a door
              frame sits proud of or behind the wall face. Confirm whether
              openings will have architraves or a square rendered return, who
              sets the beads that form each edge, and how the render meets the
              window frame.
            </p>

            <h3>Corners, beads and movement joints</h3>
            <p>
              External corners in hallways, stairwells and garages take knocks,
              so the bead or corner detail matters for wear as well as line.
              Movement joints matter more. Articulation and control joints exist
              so movement has somewhere to go, and Rockcote&rsquo;s guidance on
              structural movement is explicit that carrying a rigid finish
              across one relocates the stress into the surface rather than
              removing it.
            </p>
            <p>
              That is a local issue as much as a general one. Reactive clay is
              common across the Adelaide plains, and CSIRO guidance on
              foundation maintenance explains how seasonal moisture change in
              that soil moves footings and the brittle masonry above them.
              Internal walls are not exempt. Where a crack already follows a
              joint or the corner of an opening, read our{" "}
              <Link href="/resources/render-cracking-adelaide/">
                render cracking guide
              </Link>{" "}
              before choosing a finish to cover it.
            </p>

            <h3>Changes of material</h3>
            <p>
              Where a masonry wall meets a framed and lined wall in the same
              plane, two materials that move differently are being asked to look
              like one. That meeting needs a designed detail, such as a joint, a
              bead or a shadow line, not a skim of render taken across the
              change.
            </p>

            <h3>Power points, switches and services</h3>
            <p>
              Electrical boxes, plumbing outlets and air-conditioning
              penetrations should be positioned for the finished wall face and
              in place before rendering, so the render is worked neatly around
              them once instead of being cut and patched afterwards.
            </p>

            <h3>Junction decisions at a glance</h3>
            <p>
              Each of those meetings comes down to a decision to make before
              work starts. The table lists what to decide at each junction and
              why it matters.
            </p>
            <ComparisonTable {...junctionDecisions} />
            <p className="article-source">
              Sources:{" "}
              <a href="https://rockcote.com.au/resources/structural-movement/">
                Rockcote technical guidance on structural movement
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

        <section className="section section--tint" aria-labelledby="sequencing">
          <div className="shell prose article-prose">
            <h2 id="sequencing">Sequencing, protection, dust and drying</h2>
            <p>
              Internal rendering is a wet trade working in a space every other
              trade wants. Where it sits in the programme affects the finish as
              much as the application does. Worth agreeing before a start date:
            </p>
            <TickList
              items={[
                "Services rough-in and wall chasing complete, so the render is not cut into afterwards",
                "Which adjoining finishes go in before the render and which follow it",
                "Who protects floors, windows, joinery and fixtures, and who removes the protection",
                "Where materials are mixed, how dust is controlled and who cleans up",
                "How the rooms will be ventilated while the render cures",
                "When the wall is ready for the next trade, taken from the product data sheet",
              ]}
            />
            <p>
              Drying deserves its own line in the programme. A wet-applied
              coating has to give up its moisture, and indoors there is no sun
              or breeze doing that work. Room temperature, ventilation and the
              time allowed between coats and before painting all sit inside
              documented limits that vary between systems, so they belong in the
              programme, taken from the current data sheet rather than a rule of
              thumb.
            </p>

            <h3>Rendering in an occupied home</h3>
            <p>
              When people are living in the building, add the practical
              questions: which rooms are out of use at each stage, the path
              materials take through the house, what happens to furniture and
              window coverings, and how dust is kept out of the rooms that are
              not being worked on. Staging the work room by room can be planned,
              but it changes the programme and the scope, so raise it at quoting
              rather than on the first morning.
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="quote-ready">
          <div className="shell prose article-prose">
            <h2 id="quote-ready">
              What to have ready for an internal rendering quote
            </h2>
            <p>
              You do not need every decision made before asking. A useful first
              conversation covers:
            </p>
            <Checklist items={quoteChecklist} />
            <p>
              The <Link href="/project-planning/">project planning guide</Link>{" "}
              lists what helps with any enquiry, and our guide to{" "}
              <Link href="/resources/what-affects-cladding-render-quotes-adelaide/">
                what affects a cladding or render quote
              </Link>{" "}
              explains why those details change the scope. When you are ready,{" "}
              <Link href="/contact-us/#contact">tell us about the project</Link>{" "}
              and what plans or photos are available.
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="next-steps">
          <div className="shell prose article-prose">
            <h2 id="next-steps">Sensible next steps</h2>
            <ol className="steps">
              <li>
                <h3>Identify every wall&rsquo;s substrate and coating history</h3>
                <p>
                  One room can contain brick, block, panel and a lined frame.
                  What each wall is, and what has already been applied to it,
                  removes more options than any other answer.
                </p>
              </li>
              <li>
                <h3>Look at the walls under the light they will live in</h3>
                <p>
                  View each wall with the room lit the way it will be used, or
                  with a torch held close to the surface. How flat it reads
                  tells you whether a smooth finish is realistic.
                </p>
              </li>
              <li>
                <h3>Decide the junctions before the finish</h3>
                <p>
                  Skirtings, reveals, ceilings, corners and joints are where an
                  internal render job is judged. Settle each detail and who
                  forms it.
                </p>
              </li>
              <li>
                <h3>Ask for a sample on the wall</h3>
                <p>
                  Have the proposed finish applied to a small area in the room
                  itself, then look at it in daylight and under artificial light
                  before approving it.
                </p>
              </li>
              <li>
                <h3>Put the sequence in writing</h3>
                <p>
                  Agree where rendering sits among the other trades, who
                  protects what, and when the wall is ready for whatever
                  follows, based on the system&rsquo;s data sheets.
                </p>
              </li>
            </ol>

            <aside className="article-note article-note--warning">
              <strong>Older paint and high walls both carry risk.</strong>
              <p>
                Sanding or scraping paint in a property built before 1980 can
                disturb lead-based coatings, and rendering a stairwell void or
                double-height wall is work at height. Both are regulated safety
                matters in South Australia&mdash;confirm how they will be
                managed before preparation starts.
              </p>
            </aside>
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.sahealth.sa.gov.au/wps/wcm/connect/9d1caad2-c402-4327-b213-3b8e0319cf96/Managing%2Blead-based%2Bpaint%2Bfact%2Bsheet-final%2Bendorsed_October%2B2023.pdf?MOD=AJPERES">
                SA Health, <cite>Managing lead-based paint</cite> (PDF)
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
          className="section"
          aria-labelledby="internal-rendering-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="internal-rendering-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="internal-rendering-faqs">
              {faqs.map((faq) => (
                <div key={faq.question} className="faq-list__item">
                  <dt>{faq.question}</dt>
                  <dd>{faq.answer}</dd>
                </div>
              ))}
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>Rockcote</dt>
                <dd>
                  <a href="https://rockcote.com.au/what-are-the-different-types-of-render-a-homeowners-guide/">
                    Types of render: a homeowner&rsquo;s guide
                  </a>
                  ,{" "}
                  <a href="https://rockcote.com.au/resources/choosing-the-best-paint-for-rendered-homes/">
                    choosing the best paint for rendered homes
                  </a>{" "}
                  and{" "}
                  <a href="https://rockcote.com.au/resources/structural-movement/">
                    structural movement
                  </a>
                </dd>
              </div>
              <div>
                <dt>Dulux AcraTex</dt>
                <dd>
                  <a href="https://www.dulux.com.au/specifier/products/acratex-preparation/">
                    Acratex preparation
                  </a>{" "}
                  and the{" "}
                  <a href="https://www.dulux.com.au/specifier/products/acratex/substrate-guides/">
                    Acratex substrate guides
                  </a>
                </dd>
              </div>
              <div>
                <dt>CSR Hebel</dt>
                <dd>
                  <a href="https://hebel.com.au/resources/technical-documents/">
                    Technical documents
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
              <div>
                <dt>SA Health</dt>
                <dd>
                  <a href="https://www.sahealth.sa.gov.au/wps/wcm/connect/9d1caad2-c402-4327-b213-3b8e0319cf96/Managing%2Blead-based%2Bpaint%2Bfact%2Bsheet-final%2Bendorsed_October%2B2023.pdf?MOD=AJPERES">
                    <cite>Managing lead-based paint</cite> (PDF)
                  </a>
                </dd>
              </div>
              <div>
                <dt>SafeWork SA</dt>
                <dd>
                  <a href="https://safework.sa.gov.au/industry/construction/working-at-heights">
                    Working at heights
                  </a>
                </dd>
              </div>
            </dl>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/render/">Adelaide rendering services</Link>
              <Link href="/walling/">Internal and external walling</Link>
              <Link href="/resources/preparing-walls-for-render-adelaide/">
                Preparing walls for render
              </Link>
              <Link href="/resources/render-finishes-adelaide/">
                Render finishes guide
              </Link>
              <Link href="/resources/render-repair-adelaide/">
                Render repair guide
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
        defaultService="Render"
        intro="Planning internal rendering? Tell us the suburb, which walls are involved, what they are built from and what stage the build or renovation is at. If supporting files are needed, we’ll arrange how to review them."
      />
      <CtaBand />
    </>
  );
}
