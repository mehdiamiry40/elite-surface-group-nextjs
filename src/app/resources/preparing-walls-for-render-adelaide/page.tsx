import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import {
  Checklist,
  CompatibilityMatrix,
  Glossary,
  ProblemsTable,
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
  glossary,
  quoteChecklist,
  substrates,
  wallSigns,
} from "@/content/guides/preparing-walls-for-render-adelaide";
import { bannerImages } from "@/content/pages";
import { preparingWallsForRenderGuide } from "@/content/resources";
import type { ServiceFaq } from "@/content/services";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: preparingWallsForRenderGuide.metaTitle,
  description: preparingWallsForRenderGuide.metaDescription,
  path: `/resources/${preparingWallsForRenderGuide.slug}`,
  image: ogCard("render", preparingWallsForRenderGuide.metaTitle),
  openGraphType: "article",
  publishedTime: preparingWallsForRenderGuide.published,
  modifiedTime: preparingWallsForRenderGuide.modified,
});

/** Rendered below and emitted as FAQPage schema, so the two cannot drift. */
const faqs: readonly ServiceFaq[] = [
  {
    question: "Can render go straight onto bare brick?",
    answer:
      "Often, but not without checking. The brick has to be sound, clean and consistent in how it absorbs water, and the selected system’s documents set the preparation and the first coat. Very dense, very absorbent and contaminated brick each need something different.",
  },
  {
    question: "Does old paint always have to come off before rendering?",
    answer:
      "There is no universal answer. Some render systems are documented for properly prepared painted surfaces, while unstable or incompatible coatings need a different approach. The wall and the selected system have to be assessed together.",
  },
  {
    question: "Will render cover the cracks already in the wall?",
    answer:
      "Only until the wall moves again. Render bonded to a moving substrate reproduces the movement at the surface, so the cause needs to be understood and the movement joints kept working before a finish goes on.",
  },
  {
    question: "How dry does a wall need to be before it is rendered?",
    answer:
      "Dry enough to meet the selected system’s requirements, and dry because the moisture source has been dealt with rather than because it happens to be summer. Where salt damp or a leak is suspected, that is assessed first.",
  },
  {
    question: "Can new brickwork be rendered straight away?",
    answer:
      "Not until it has had the curing its own documents call for. New masonry and new concrete both need that before they are rendered, and each render coat then cures as its data sheet requires. It is a programme item, and better preparation cannot shorten it.",
  },
  {
    question: "Who is responsible for preparation, the builder or the renderer?",
    answer:
      "It depends on the agreed scope, which is why it belongs in writing. A clear quote names who repairs the substrate, who confirms it is ready, who sets beads and joints and who makes good around other trades.",
  },
];

export default function PreparingWallsForRenderGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Preparing walls for render",
            href: `/resources/${preparingWallsForRenderGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={preparingWallsForRenderGuide} />
      <FAQPageSchema faqs={faqs} />

      <article>
        <PageBanner
          title={preparingWallsForRenderGuide.title}
          image={
            bannerImages[`/resources/${preparingWallsForRenderGuide.slug}`]
          }
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Preparing walls for render" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{preparingWallsForRenderGuide.category}</span>
              <time dateTime={preparingWallsForRenderGuide.published}>
                Published {preparingWallsForRenderGuide.publishedDisplay}
              </time>
              {preparingWallsForRenderGuide.modifiedDisplay ? (
                <time dateTime={preparingWallsForRenderGuide.modified}>
                  Updated {preparingWallsForRenderGuide.modifiedDisplay}
                </time>
              ) : null}
              <span>{preparingWallsForRenderGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              Render is bonded to the wall, so the wall decides most of the
              result before the first coat is mixed. Preparing walls for render
              means confirming what the substrate is, that it is sound, clean
              and dry, that its movement joints are known and respected, and
              that the trades around it have finished whatever must sit behind
              or beside the render. This guide sets out what to confirm before
              work starts in Adelaide. It is not an application method.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>Preparation is specified, not improvised.</strong>
              <p>
                The preparation a wall needs comes from the current data sheets
                for the selected render system and from the condition of the
                actual wall. Elite Surface Group applies render and installs
                cladding, Hebel and walling; we do not certify buildings or
                diagnose a wall remotely. Where cracking, damp or structural
                condition is in question, arrange assessment by a suitably
                qualified professional first. This guide is general planning
                information, not a DIY method or a specification.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#substrate">Identify the substrate</a>
                </li>
                <li>
                  <a href="#condition">Sound, clean and consistent</a>
                </li>
                <li>
                  <a href="#flatness">Flatness and the finish</a>
                </li>
                <li>
                  <a href="#joints">Movement joints and cracks</a>
                </li>
                <li>
                  <a href="#coatings-damp">Paint, damp and salts</a>
                </li>
                <li>
                  <a href="#adjoining">Adjoining trades and finishes</a>
                </li>
                <li>
                  <a href="#weather">Weather and curing</a>
                </li>
                <li>
                  <a href="#wall-signs">Signs that change the preparation</a>
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

        <section className="section section--tint" aria-labelledby="substrate">
          <div className="shell prose article-prose">
            <h2 id="substrate">Start by identifying the substrate</h2>
            <p>
              &ldquo;The wall&rdquo; is rarely one thing. A single elevation can
              combine original brickwork, a block extension, a sheeted upper
              storey and an earlier coat of paint, and each of those takes
              preparation differently. Naming them is the first job, because
              every later decision depends on it.
            </p>

            <h3>Brick and block</h3>
            <p>
              Clay brick, concrete brick and block are the substrates render was
              developed for, but they are not interchangeable. Dulux publishes
              separate substrate guides for clay brick, cement brick and block,
              which is a fair signal that the preparation differs between them.
              Density, surface texture and how readily the unit takes up water
              all change what has to happen before the first coat, and so does
              the condition of the mortar between the units.
            </p>

            <h3>AAC panels such as Hebel</h3>
            <p>
              Hebel and other autoclaved aerated concrete panels take a coating
              system matched to the panel manufacturer&rsquo;s documents rather
              than a generic render. CSR&rsquo;s coatings information refers to
              approved finishes and acrylic coating systems, and points to
              coating suppliers with their own system documents. Panel joints
              and control joints are part of that system, not an obstacle to it.
              Our guide to{" "}
              <Link href="/resources/rendering-hebel-panels-adelaide/">
                rendering Hebel panels
              </Link>{" "}
              covers what to confirm before the panels and the finish are
              scoped.
            </p>

            <h3>Fibre-cement and render base sheets</h3>
            <p>
              A sheeted frame moves differently from masonry, flexing with
              temperature in a way a rigid mix does not accommodate well.
              Rockcote formulates dedicated acrylic base coats for fibre cement
              sheeting for that reason. Preparation here is mostly about
              confirming that the sheet is one the render system is documented
              for, that it is fixed as its own installation guide requires, and
              that the sheet joints receive the treatment the system calls for.
              Our{" "}
              <Link href="/resources/acrylic-render-vs-cement-render-adelaide/">
                acrylic versus cement render comparison
              </Link>{" "}
              covers the system-level choice.
            </p>

            <h3>Previously rendered or painted walls</h3>
            <p>
              Once a wall has been coated, the old coating is part of the
              substrate. Its bond, condition and compatibility are assessed
              alongside the masonry beneath it, and an existing render that is
              cracked or hollow is a repair question before it is a preparation
              question. Our{" "}
              <Link href="/resources/render-repair-adelaide/">
                render repair guide
              </Link>{" "}
              explains how those findings change the scope.
            </p>

            <h3>The substrates side by side</h3>
            <p>
              The table sets those substrates, and three conditions that cut
              across them, beside what each usually needs and what to confirm
              before preparation is priced.
            </p>
            <CompatibilityMatrix {...substrates} />
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex/substrate-guides/">
                Dulux AcraTex substrate guides
              </a>
              ,{" "}
              <a href="https://hebel.com.au/coatings/">
                CSR Hebel coatings and finishes
              </a>{" "}
              and{" "}
              <a href="https://rockcote.com.au/what-are-the-different-types-of-render-a-homeowners-guide/">
                Rockcote, types of render
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="condition">
          <div className="shell prose article-prose">
            <h2 id="condition">
              Sound, clean and consistent: what the surface has to be
            </h2>
            <p>
              Three conditions sit under every render system, whatever the
              brand. They are simple to state and are where most of the
              preparation effort goes.
            </p>

            <h3>Soundness</h3>
            <p>
              Render can only be as well attached as the surface it is attached
              to. Loose or fretting brick faces, soft mortar, crumbling old
              render and flaking paint are all weak layers, and a new coat
              bonded to a weak layer fails with it. Where the surface is
              unsound, the scope has to include making it good&mdash;repointing,
              removing failed material or repairing the masonry&mdash;before any
              render is priced as going on.
            </p>

            <h3>Cleanliness</h3>
            <p>
              Dust, dirt, mould, salts, oil and the chalky residue of old paint
              all sit between the render and the wall. What has to come off, and
              how, belongs to the selected system&rsquo;s preparation documents.
              The point for planning is that cleaning is a real item of work
              with its own access, water and drying requirements, not something
              absorbed into the first coat.
            </p>

            <h3>Suction</h3>
            <p>
              How thirsty the wall is matters as much as how clean it is.
              Rockcote&rsquo;s guidance on preparing brick substrates explains
              that excessive suction can draw water out of a cement render too
              quickly, interfering with hydration and contributing to early
              cracking or poor bond. A wall with patches of very different
              absorbency&mdash;old repairs, mixed brick types, areas of
              remaining paint&mdash;needs that evened out, which is one of the
              jobs a sealer, primer or key coat is specified to do.
            </p>

            <h3>Terms used in this guide</h3>
            <Glossary terms={glossary} />
            <p className="article-source">
              Sources:{" "}
              <a href="https://rockcote.com.au/resources/preparing-brick-substrates-for-render/">
                Rockcote technical guidance on preparing brick substrates
              </a>{" "}
              and{" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex-preparation/">
                Dulux, Acratex preparation
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="flatness">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={preparingWallsForRenderGuide.image}
                alt={preparingWallsForRenderGuide.imageAlt}
                width={preparingWallsForRenderGuide.imageWidth}
                height={preparingWallsForRenderGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(preparingWallsForRenderGuide.image)}
              />
              <figcaption>{preparingWallsForRenderGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Finish and tolerance</span>
              <h2 id="flatness">Flatness, and what the chosen finish asks of it</h2>
              <p>
                A finish inherits the wall beneath it. A smooth trowelled
                surface hides nothing: bowed courses, proud bricks and set-out
                variations stay visible, especially when low sun rakes across
                the elevation. A fine float grain softens them and a coarser
                texture conceals more again. Our{" "}
                <Link href="/resources/render-finishes-adelaide/">
                  render finishes guide
                </Link>{" "}
                covers that trade in detail.
              </p>
              <p>
                For preparation the consequence is simple. The flatter the
                finish, the more of the job happens before the finish:
                straightening the wall, building out hollows and setting beads
                and edges true. Bringing a wavy wall flat enough to carry a
                smooth finish is its own scope of work, and it is better
                identified when the quote is written than discovered at the
                sample panel.
              </p>
              <p>
                Corners, moulded profiles and the line where render meets a
                different material are where set-out shows most. The{" "}
                <Link href="/projects/rendered-column-and-stone-junctions/">
                  rendered columns and stone junctions case study
                </Link>{" "}
                records that kind of detail at an in-progress stage.
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="joints">
          <div className="shell prose article-prose">
            <h2 id="joints">Movement joints, junctions and existing cracks</h2>
            <p>
              Masonry walls are built with joints that let sections of wall move
              independently. Reactive clay is common across the Adelaide plains,
              and CSIRO guidance on foundation maintenance explains how seasonal
              moisture change in that soil moves footings and the brittle
              masonry above them. On those sites the joints do real work.
            </p>
            <p>
              Preparation means finding every one of them before render goes
              on&mdash;including joints hidden by old paint or filler&mdash;and
              agreeing how each will be carried through the new finish.
              Rockcote&rsquo;s guidance on structural movement is explicit that
              carrying a rigid finish across a joint relocates the stress into
              the surface rather than removing it. A joint that has been
              rendered over is a crack waiting for its season.
            </p>
            <p>
              The same thinking applies wherever two materials meet: an old wall
              and a new extension, masonry and a sheeted frame, a wall and a
              concrete slab edge. Different materials move differently, and the
              junction needs a planned detail rather than a continuous skin.
            </p>
            <p>
              Existing cracks belong in this conversation as well. A crack is
              evidence of movement that has already happened; whether it is
              still happening decides the preparation. Our{" "}
              <Link href="/resources/render-cracking-adelaide/">
                guide to render cracking in Adelaide
              </Link>{" "}
              explains what to record and when independent advice is needed
              before anything is covered.
            </p>
            <p>Worth confirming on the drawings or on the wall itself:</p>
            <TickList
              items={[
                "Where the articulation or control joints are, and whether any have been filled or painted over",
                "How each joint will be expressed in the finished render, and who seals it",
                "Junctions between old and new work, and between different wall materials",
                "Existing cracks, their history and whether their cause has been assessed",
              ]}
            />
            <p className="article-source">
              Sources:{" "}
              <a href="https://rockcote.com.au/resources/structural-movement/">
                Rockcote technical guidance on structural movement
              </a>
              ,{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/5-masonry/part-56-masonry-components-and-accessories">
                NCC 2022 Housing Provisions, Part 5.6 Masonry components and
                accessories
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

        <section
          className="section section--tint"
          aria-labelledby="coatings-damp"
        >
          <div className="shell prose article-prose">
            <h2 id="coatings-damp">Old paint, coatings, damp and salts</h2>

            <h3>Existing paint and coatings</h3>
            <p>
              Paint changes the question from whether render will hold to brick
              to whether it will hold to this paint, and whether this paint is
              still holding to the brick. Some products are designed for
              properly cleaned and prepared pre-painted surfaces and place
              limits on them; none treats every painted wall as suitable. Our{" "}
              <Link href="/resources/rendering-over-painted-brick-adelaide/">
                guide to rendering over painted brick
              </Link>{" "}
              works through that assessment. It also covers the safety side: SA
              Health says properties built before 1980 are likely to contain
              lead-based paint, so disturbing an unknown coating is not a casual
              test.
            </p>

            <h3>Damp and salts</h3>
            <p>
              A wall has to be dry, and dry for the right reason. Tide marks,
              white powdery deposits, fretting mortar or blistered paint near
              the base of a wall point to moisture, and render applied over it
              tends to fail along the same band. In older Adelaide homes the
              usual suspect is salt damp, which is a moisture-source problem
              that no amount of surface preparation resolves. Our{" "}
              <Link href="/resources/salt-damp-adelaide/">salt damp guide</Link>{" "}
              explains what has to be assessed first. We do not diagnose or
              treat rising damp; the render scope begins once the source has
              been dealt with and the wall has dried.
            </p>
            <p>
              Water from above matters just as much. A leaking gutter, a failed
              flashing or an unsealed parapet capping wets a wall from the top
              down, and that needs fixing by the responsible trade before the
              wall is treated as ready.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://rockcote.com.au/wp-content/uploads/2020/09/Keycote_TDS_September2020.pdf">
                ROCKCOTE Keycote Technical Data Sheet (PDF)
              </a>
              ,{" "}
              <a href="https://www.sahealth.sa.gov.au/wps/wcm/connect/9d1caad2-c402-4327-b213-3b8e0319cf96/Managing%2Blead-based%2Bpaint%2Bfact%2Bsheet-final%2Bendorsed_October%2B2023.pdf?MOD=AJPERES">
                SA Health, <cite>Managing lead-based paint</cite> (PDF)
              </a>{" "}
              and the{" "}
              <a href="https://cdn.environment.sa.gov.au/environment/docs/saltdamp_techguide.pdf">
                Government of South Australia guide to salt attack and rising
                damp (PDF)
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="adjoining">
          <div className="shell prose article-prose">
            <h2 id="adjoining">Adjoining trades and finishes</h2>
            <p>
              Render is one of the last trades on an exterior, and it locks in
              whatever is behind and beside it. Preparing a wall therefore
              includes confirming that other people have finished.
            </p>
            <TickList
              items={[
                "Windows and doors installed, with their flashings and any sill or head details complete",
                "Roof, parapet and balcony flashings and cappings in place, so the wall is not being wet from above",
                "Services penetrations such as taps, conduits, vents, meter boxes and air-conditioning lines located and fixed before rendering, not cut through it afterwards",
                "Beads, stop edges and joint profiles agreed, including who supplies and sets them",
                "Paving, ground and garden levels known, so render is not carried down into soil or across a damp-proof course",
                "Junctions with cladding, stone, timber or exposed brick detailed, with the order of work settled",
                "Scaffold or other access, protection for finished surfaces, and somewhere to mix and wash out",
              ]}
            />
            <p>
              Ground levels deserve a second look. A finish carried down into
              the ground, or across the line of a damp-proof course, can give
              ground moisture a way around it. The NCC sets out where a
              damp-proof course sits in new masonry, including minimum heights
              above adjacent paving or landscaped surfaces, so if paving or
              garden beds are going in after the render, the finished levels
              need to be known before the render is set out.
            </p>
            <p>
              On a mixed facade the junction between render and another finish
              needs a designed detail and an agreed sequence rather than a
              decision made on the scaffold. Our{" "}
              <Link href="/render/">Adelaide rendering services page</Link>{" "}
              explains how render is coordinated with cladding and Hebel work on
              the same project.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/5-masonry/part-57-weatherproofing-masonry">
                NCC 2022 Housing Provisions, Part 5.7 Weatherproofing of masonry
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="weather">
          <div className="shell prose article-prose">
            <h2 id="weather">Weather and curing are programme items</h2>
            <p>
              Adelaide&rsquo;s hot, dry summers matter to render because
              application and curing happen on site. Ambient and substrate
              temperature, humidity and wind all sit inside documented limits
              that vary between systems, so they belong in the programme, taken
              from the current data sheet rather than a rule of thumb. Dulux
              AcraTex is one example of a supplier that publishes substrate,
              application and care guides for its coating systems. A wall in
              full western sun on a hot afternoon is a different substrate from
              the same wall early in the morning.
            </p>
            <p>
              For planning, that means allowing for elevations to be worked in a
              sensible order, for days when conditions fall outside the
              system&rsquo;s limits, and for each coat to cure as its data sheet
              requires before the next goes on. New masonry and new concrete
              also need the curing their own documents call for before they are
              rendered. None of that can be shortened by better preparation, and
              a programme that ignores it is not a faster job, only a riskier
              one.
            </p>
            <p>
              Internal walls trade weather for other constraints: ventilation,
              finished floors and joinery, and lighting that shows the surface
              at close range. Our{" "}
              <Link href="/resources/internal-rendering-adelaide/">
                internal rendering guide
              </Link>{" "}
              covers what to confirm indoors.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex/systems-and-guides/">
                Dulux AcraTex systems and guides
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="wall-signs">
          <div className="shell prose article-prose">
            <h2 id="wall-signs">
              Signs on the wall that change the preparation
            </h2>
            <p>
              Most of what this guide covers can be seen from the ground before
              anyone quotes. The table lists what to look for, what each sign
              can point to and what should happen before render is scoped. It
              is a prompt for what to record, not a diagnosis.
            </p>
            <ProblemsTable {...wallSigns} />
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="next-steps">
          <div className="shell prose article-prose">
            <h2 id="next-steps">Sensible next steps</h2>
            <ol className="steps">
              <li>
                <h3>Identify each wall and its history</h3>
                <p>
                  Note what every elevation is built from, roughly how old it
                  is, and what has been applied to it before. Label what you do
                  not know as unknown.
                </p>
              </li>
              <li>
                <h3>Walk the walls for joints, cracks and damp</h3>
                <p>
                  Look from the ground for movement joints, cracking, staining
                  and anything keeping the wall wet. Record it; do not scrape,
                  cut or fill anything to find out more.
                </p>
              </li>
              <li>
                <h3>Decide the finish before the preparation is priced</h3>
                <p>
                  A smooth finish and a textured one ask different things of the
                  same wall. Settling the finish first keeps the preparation
                  scope honest.
                </p>
              </li>
              <li>
                <h3>Confirm what other trades still have to do</h3>
                <p>
                  Windows, flashings, services and paving levels all need to be
                  known. Render should follow them, not work around their
                  absence.
                </p>
              </li>
            </ol>

            <p>Useful to have ready before asking for a quote:</p>
            <Checklist
              items={quoteChecklist}
              label="Useful to have ready before asking for a quote"
            />
            <p>
              Our <Link href="/project-planning/">project planning guide</Link>{" "}
              expands on that list, and the guide to{" "}
              <Link href="/resources/what-affects-cladding-render-quotes-adelaide/">
                what affects cladding and render quotes
              </Link>{" "}
              explains how substrate condition and preparation move a quote,
              without price lists.
            </p>

            <aside className="article-note article-note--warning">
              <strong>Preparation creates dust and often happens at height.</strong>
              <p>
                SafeWork SA lists bricks, blocks, mortar and cement-based
                products as crystalline-silica substances, and cutting, grinding
                or sanding them can generate respirable dust. Much exterior
                preparation is also work at height. Both are regulated in South
                Australia, so confirm how they will be controlled before
                preparation begins.
              </p>
            </aside>
            <p className="article-source">
              Sources:{" "}
              <a href="https://safework.sa.gov.au/industry/construction/silica">
                SafeWork SA respirable crystalline silica guidance
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
          aria-labelledby="preparing-walls-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="preparing-walls-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="preparing-walls-faqs">
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
                <dt>Rockcote</dt>
                <dd>
                  <a href="https://rockcote.com.au/resources/preparing-brick-substrates-for-render/">
                    Preparing brick substrates for render
                  </a>
                  ,{" "}
                  <a href="https://rockcote.com.au/resources/structural-movement/">
                    structural movement
                  </a>
                  ,{" "}
                  <a href="https://rockcote.com.au/what-are-the-different-types-of-render-a-homeowners-guide/">
                    types of render
                  </a>{" "}
                  and the{" "}
                  <a href="https://rockcote.com.au/wp-content/uploads/2020/09/Keycote_TDS_September2020.pdf">
                    Keycote Technical Data Sheet (PDF)
                  </a>
                </dd>
              </div>
              <div>
                <dt>Dulux AcraTex</dt>
                <dd>
                  <a href="https://www.dulux.com.au/specifier/products/acratex/substrate-guides/">
                    Substrate guides
                  </a>
                  ,{" "}
                  <a href="https://www.dulux.com.au/specifier/products/acratex-preparation/">
                    Acratex preparation
                  </a>{" "}
                  and{" "}
                  <a href="https://www.dulux.com.au/specifier/products/acratex/systems-and-guides/">
                    systems and guides
                  </a>
                </dd>
              </div>
              <div>
                <dt>CSR Hebel</dt>
                <dd>
                  <a href="https://hebel.com.au/coatings/">
                    Coatings and finishes
                  </a>{" "}
                  and{" "}
                  <a href="https://hebel.com.au/resources/technical-documents/">
                    technical documents
                  </a>
                </dd>
              </div>
              <div>
                <dt>Australian Building Codes Board</dt>
                <dd>
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/5-masonry/part-56-masonry-components-and-accessories">
                    NCC 2022 Housing Provisions, Part 5.6 Masonry components and
                    accessories
                  </a>{" "}
                  and{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/5-masonry/part-57-weatherproofing-masonry">
                    Part 5.7 Weatherproofing of masonry
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
                <dt>Government of South Australia</dt>
                <dd>
                  <a href="https://cdn.environment.sa.gov.au/environment/docs/saltdamp_techguide.pdf">
                    <cite>Salt attack and rising damp</cite> (PDF)
                  </a>
                  ,{" "}
                  <a href="https://www.sahealth.sa.gov.au/wps/wcm/connect/9d1caad2-c402-4327-b213-3b8e0319cf96/Managing%2Blead-based%2Bpaint%2Bfact%2Bsheet-final%2Bendorsed_October%2B2023.pdf?MOD=AJPERES">
                    SA Health, <cite>Managing lead-based paint</cite> (PDF)
                  </a>
                  ,{" "}
                  <a href="https://safework.sa.gov.au/industry/construction/silica">
                    SafeWork SA silica guidance
                  </a>{" "}
                  and{" "}
                  <a href="https://safework.sa.gov.au/industry/construction/working-at-heights">
                    working at heights
                  </a>
                </dd>
              </div>
            </dl>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/render/">Adelaide rendering services</Link>
              <Link href="/resources/rendering-over-painted-brick-adelaide/">
                Rendering over painted brick
              </Link>
              <Link href="/resources/render-repair-adelaide/">
                Render repair guide
              </Link>
              <Link href="/resources/render-finishes-adelaide/">
                Render finishes guide
              </Link>
              <Link href="/resources/internal-rendering-adelaide/">
                Internal rendering guide
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
        intro="Getting walls ready for render? Tell us the suburb, what each wall is built from, whether it has been coated before and what elevations or site images are available. If supporting files are needed, we’ll arrange how to review them."
      />
      <CtaBand />
    </>
  );
}
