import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import {
  DecisionGuide,
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
  inspectionFindings,
  scopeDecisions,
} from "@/content/guides/render-repair-adelaide";
import { bannerImages } from "@/content/pages";
import { renderRepairGuide } from "@/content/resources";
import type { ServiceFaq } from "@/content/services";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: renderRepairGuide.metaTitle,
  description: renderRepairGuide.metaDescription,
  path: `/resources/${renderRepairGuide.slug}`,
  image: ogCard("render", renderRepairGuide.metaTitle),
  openGraphType: "article",
  publishedTime: renderRepairGuide.published,
  modifiedTime: renderRepairGuide.modified,
});

/** Rendered below and emitted as FAQPage schema, so the two cannot drift. */
const faqs: readonly ServiceFaq[] = [
  {
    question: "Can a render crack simply be filled and painted over?",
    answer:
      "Only once the cause is understood and has stopped. Filler and paint cover the visible line, but movement, moisture or lost bond behind it will bring the crack back. Record the crack, confirm what is driving it and choose the repair after that.",
  },
  {
    question: "Will a render patch be invisible?",
    answer:
      "It should not be promised as invisible. A textured patch is matched by hand and tends to show in low, raking light, while a smooth wall shows a patch as a change in flatness and sheen. Taking the repair to a corner, an opening or a joint, and recoating the whole panel, is how the join is made to read as intended.",
  },
  {
    question: "How do I know whether render is hollow or drummy?",
    answer:
      "Render that has lost its bond often sounds hollow when tapped, but the extent cannot be judged from the surface. A crack or bulge may sit at the edge of a much larger unbonded area, so mapping it is part of the inspection rather than something to estimate from a photograph.",
  },
  {
    question: "Is it better to repair the damage or re-render the whole wall?",
    answer:
      "It depends on how much of the existing render is still bonded, whether the cause is resolved and how consistent the finish needs to look. Isolated damage on sound render suits a patch. Several defects on one elevation usually suit a partial re-render to a natural break. Widespread bond loss or an incompatible coating points to a full strip.",
  },
  {
    question: "Can Elite Surface Group confirm a repair scope from photos?",
    answer:
      "Photos give useful early context, but they cannot show bond, moisture or movement. We confirm a render repair scope after the wall has been viewed and, where the cause is uncertain, after the appropriate professional has assessed it.",
  },
];

export default function RenderRepairGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Render repair in Adelaide",
            href: `/resources/${renderRepairGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={renderRepairGuide} />
      <FAQPageSchema faqs={faqs} />

      <article>
        <PageBanner
          title={renderRepairGuide.title}
          image={bannerImages[`/resources/${renderRepairGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Render repair in Adelaide" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{renderRepairGuide.category}</span>
              <time dateTime={renderRepairGuide.published}>
                Published {renderRepairGuide.publishedDisplay}
              </time>
              {renderRepairGuide.modifiedDisplay ? (
                <time dateTime={renderRepairGuide.modified}>
                  Updated {renderRepairGuide.modifiedDisplay}
                </time>
              ) : null}
              <span>{renderRepairGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              Render repair in Adelaide comes down to three scopes: a local
              patch, a partial re-render taken to a natural break, or a full
              strip and re-render. Which one fits depends less on how the damage
              looks than on how well the existing render is still bonded,
              whether the cause has stopped, and how much of a visible join the
              finished wall can carry.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>A repair scope follows an inspection, not a photo.</strong>
              <p>
                Elite Surface Group applies render and installs cladding, Hebel
                and walling. We do not certify buildings, diagnose structural
                movement or treat rising damp, and we cannot confirm a repair
                from a description alone. Where cracking, movement or moisture
                is unexplained, assessment by a suitably qualified professional
                comes before any render work is priced.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#scopes">The three repair scopes</a>
                </li>
                <li>
                  <a href="#scope-guide">Which scope fits which wall</a>
                </li>
                <li>
                  <a href="#document">What to document first</a>
                </li>
                <li>
                  <a href="#findings">What changes the scope</a>
                </li>
                <li>
                  <a href="#findings-table">Findings at a glance</a>
                </li>
                <li>
                  <a href="#causes">When the cause comes first</a>
                </li>
                <li>
                  <a href="#blending">Blending and maintenance</a>
                </li>
                <li>
                  <a href="#who-to-call">Who else may be involved</a>
                </li>
                <li>
                  <a href="#quote-scope">What a repair quote should state</a>
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

        <section className="section section--tint" aria-labelledby="scopes">
          <div className="shell prose article-prose">
            <h2 id="scopes">Render repair in Adelaide: the three scopes</h2>
            <p>
              Whether it is called render repair, facade repair or facade
              maintenance, the work falls into three quite different jobs. They
              differ in how much of the existing render stays on the wall, where
              the new work stops and how the finished elevation will read.
              Sorting a wall into the right one is most of the decision.
            </p>

            <h3>A local patch</h3>
            <p>
              A patch removes a defined area of damaged or unbonded render,
              makes good the substrate beneath it and rebuilds the render and
              finish within that area. It suits damage with a clear, finished
              cause&mdash;an impact, a removed fixture, a chased-in service, a
              small area disturbed by another trade&mdash;on a wall where the
              surrounding render is sound and well bonded. Its weakness is
              appearance. The edge of the patch sits in the middle of a
              continuous surface, so any difference in texture, flatness or
              colour has nowhere to hide.
            </p>

            <h3>A partial re-render to a natural break</h3>
            <p>
              A partial re-render takes the new finish, and often the render
              beneath it, across a whole panel of wall: corner to corner,
              between two openings, up to a control joint or down to a change of
              material. The repair area is deliberately larger than the damage.
              Stopping at a natural break puts the join on a line the eye
              already expects, which is why this is the usual answer when
              several defects share one elevation or when a patch could not be
              blended acceptably.
            </p>

            <h3>A full strip and re-render</h3>
            <p>
              A full strip takes the existing render back to the substrate and
              starts again. It becomes the sensible scope when loss of bond is
              widespread, when the existing coating is incompatible with
              anything going over it, when repairs have been layered on repairs,
              or when joint and junction detailing has to be corrected across
              the wall. It is also the scope that exposes the most. Once the old
              render is off, the masonry, the joints and the flashings can be
              seen properly, and our guide to{" "}
              <Link href="/resources/preparing-walls-for-render-adelaide/">
                preparing walls for render
              </Link>{" "}
              covers what that exposed substrate then has to confirm.
            </p>
            <TickList
              items={[
                "Patch: isolated damage with a known, finished cause on otherwise sound render",
                "Partial re-render: several defects on one elevation, or a finish that will not blend mid-wall",
                "Full strip: widespread bond loss, incompatible coatings or detailing that needs correcting",
                "Every scope: the cause of the damage understood and stopped before the finish is rebuilt",
              ]}
            />

            <h3 id="scope-guide">Which scope fits which wall</h3>
            <p>
              Read across from what the wall shows to the scope that usually
              fits it. The last column is what an inspection still has to
              settle before that scope is priced.
            </p>
            <DecisionGuide {...scopeDecisions} />
          </div>
        </section>

        <section className="section" aria-labelledby="document">
          <div className="shell prose article-prose">
            <h2 id="document">What to document before anyone visits</h2>
            <p>
              A clear record shortens the first conversation and makes it less
              likely that the wrong trade turns up. None of it requires touching
              the wall, and none of it should involve scraping, cutting or
              pulling at loose material.
            </p>
            <TickList
              items={[
                "Where the damage is: which elevation, how high, and how close to openings, corners, the ground and any downpipes",
                "How long it has been there, and whether it followed a specific event such as building work, a leak or a hot, dry spell",
                "Whether it changes: opening and closing with the seasons, spreading, or returning after an earlier repair",
                "Wide photographs of the whole wall, then closer ones with the date and something for scale",
                "What the wall is built from, if known: brick, block, AAC panel, a sheeted frame or older stone",
                "The coating history: when the wall was last rendered or painted, with what and by whom, where records exist",
                "Anything nearby that keeps the wall wet or stressed, such as garden beds, raised paving, taps, air-conditioning drains or large trees",
              ]}
            />
            <p>
              Plans, invoices and old product containers are worth more than a
              confident guess, and gaps are fine as long as they are labelled as
              gaps. Our{" "}
              <Link href="/project-planning/">project planning guide</Link>{" "}
              lists what else is useful to have ready. When you get in touch,
              tell us what records and images are available and we will arrange
              how to review them.
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="findings">
          <div className="shell prose article-prose">
            <h2 id="findings">
              What an inspection finds, and how it changes the scope
            </h2>
            <p>
              Four findings do most of the work in moving a job from one scope
              to another. Each is about the layers behind the visible damage
              rather than the damage itself.
            </p>

            <h3>Hollow or drummy areas</h3>
            <p>
              Render that has let go of the wall behind it often sounds hollow
              when tapped, a condition usually called drummy. The visible defect
              is rarely the full extent of it: a crack or a bulge may sit at the
              edge of a much larger unbonded area. Mapping that area decides
              whether a patch is realistic. A small, isolated hollow can be cut
              out and rebuilt. Hollow render spread across an elevation means
              the bond has failed generally, and patching it only moves the next
              failure along the wall.
            </p>

            <h3>Cracking patterns</h3>
            <p>
              Fine, random crazing confined to the coating is a different
              finding from a single line running off a window corner, a stepped
              line following the mortar joints, or a crack that also shows on
              the inside face. A pattern is a clue rather than a diagnosis, but
              it does help sort cracks into those that belong to the finish and
              those that belong to the wall. Cracks at the junction between old
              and new work, or over a movement joint that was rendered across,
              point to detailing a repair has to correct rather than cover.
              Rockcote&rsquo;s guidance on structural movement is explicit that
              carrying a rigid finish across a joint relocates the stress into
              the surface rather than removing it.
            </p>

            <h3>Failed or incompatible coatings</h3>
            <p>
              Paint or texture that is flaking, blistering or chalking tells you
              about the coating before it tells you about the render.
              Dulux&rsquo;s facade refurbishment guidance lists ageing,
              atmospheric exposure, unsuitable previous coatings, corrosion and
              failure in the substrate or coating system among the things that
              degrade a facade, and they do not all call for the same repair.
              Where only the coating has failed and the render beneath is sound,
              the job may be preparation and recoating rather than render repair
              at all; our guide to{" "}
              <Link href="/resources/repainting-render-adelaide/">
                repainting rendered walls
              </Link>{" "}
              covers that case. Where a coating was never compatible with the
              layer under it, it usually has to come off before anything new
              will hold.
            </p>

            <h3>Damp and salts</h3>
            <p>
              Staining, blistering or a powdery white deposit concentrated in
              one band of wall is a moisture finding, not a finish finding. A
              repair made over a wall that is still wet tends to fail along the
              same line, so the source of the water&mdash;a leak, a drainage
              fault or moisture rising from the ground&mdash;has to be
              identified before the render scope is written.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://rockcote.com.au/resources/structural-movement/">
                Rockcote technical guidance on structural movement
              </a>{" "}
              and{" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex/overview/acratex-facade-refurbishment/">
                Dulux Acratex facade-refurbishment guidance
              </a>
              .
            </p>

            <h3 id="findings-table">Findings and next steps at a glance</h3>
            <p>
              The table gathers those findings, and the simpler ones either
              side of them, with the step each one calls for. A finding sorts
              the conversation; it does not confirm a cause.
            </p>
            <ProblemsTable {...inspectionFindings} />

            <h3>Terms used in this guide</h3>
            <Glossary terms={glossary} />
          </div>
        </section>

        <section className="section" aria-labelledby="causes">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={renderRepairGuide.image}
                alt={renderRepairGuide.imageAlt}
                width={renderRepairGuide.imageWidth}
                height={renderRepairGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(renderRepairGuide.image)}
              />
              <figcaption>{renderRepairGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Cause before cosmetics</span>
              <h2 id="causes">When the cause has to be settled first</h2>
              <p>
                Two findings stop a cosmetic repair outright. The first is
                cracking with an unresolved cause. Reactive clay is common
                across the Adelaide plains, and movement that is still active
                will reopen a filled crack and can break a new patch along the
                same line. Our{" "}
                <Link href="/resources/render-cracking-adelaide/">
                  guide to render cracking in Adelaide
                </Link>{" "}
                sets out what to record, which signs call for prompt assessment
                and who should make it. Until that question is answered, a
                repair is a guess.
              </p>
              <p>
                The second is salt damp. Rendering over rising moisture does not
                stop it; it changes where the water leaves the wall and commonly
                takes the new render with it. Our{" "}
                <Link href="/resources/salt-damp-adelaide/">
                  salt damp guide
                </Link>{" "}
                explains why, and what has to be assessed before surface work is
                worth paying for. We do not diagnose or treat rising damp. The
                render scope starts once a specialist has dealt with the source
                and the wall has dried.
              </p>
              <p>
                Coastal exposure belongs in the same conversation. Salt-laden
                air keeps working on a coating between washes, so a repair on an
                exposed elevation is specified for that exposure rather than
                matched blindly to what was there before. Our{" "}
                <Link href="/locations/coastal-adelaide/">
                  coastal Adelaide page
                </Link>{" "}
                covers how those sites are approached.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                  CSIRO,{" "}
                  <cite>Foundation maintenance and footing performance</cite>{" "}
                  (PDF)
                </a>{" "}
                and the{" "}
                <a href="https://cdn.environment.sa.gov.au/environment/docs/saltdamp_techguide.pdf">
                  Government of South Australia guide to salt attack and rising
                  damp (PDF)
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="blending">
          <div className="shell prose article-prose">
            <h2 id="blending">
              Blending a repair: texture, colour and facade maintenance
            </h2>
            <p>
              No repair should be sold as invisible. A textured patch has to be
              matched in profile by hand and will usually show in raking light;
              a smooth wall shows a patch as a difference in flatness and sheen
              instead. That is the practical reason sound repairs are taken out
              to a corner, an opening or a joint rather than feathered into the
              middle of an elevation. Our{" "}
              <Link href="/resources/render-finishes-adelaide/">
                render finishes guide
              </Link>{" "}
              explains how each texture grade behaves when it is patched.
            </p>
            <p>
              Colour is the other half. A weathered coating has faded, collected
              dirt and lost sheen, so fresh material in the original colour will
              not match the wall around it. In practice the repaired panel, and
              often the whole elevation, is recoated so the finish reads as one
              surface. That turns many repair jobs into repair-and-recoat jobs,
              and it is better to know that when the quote is written than at
              handover. The repair material and the coating going over it also
              need to be specified together rather than chosen separately, so
              the patch does not read through the finished wall.
            </p>
            <p>
              Repair sits beside ordinary facade maintenance, too.
              Rockcote&rsquo;s maintenance guide asks for exterior render
              systems to be inspected regularly and washed down with a hose
              annually, and warns that cracking, damp areas and dirt build-up
              encourage mould. A wall that is looked at routinely gives up its
              defects while they are still patch-sized. For a sense of the
              benchmark a repaired elevation is judged against, the{" "}
              <Link href="/projects/two-storey-exterior-render/">
                two-storey exterior render case study
              </Link>{" "}
              shows one consistent finish carried across a whole facade.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://rockcote.com.au/wp-content/uploads/2020/09/ROCKCOTE_Maintenance_Guide_opt.pdf">
                Rockcote maintenance guide (PDF)
              </a>{" "}
              and{" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex-preparation/">
                Dulux, Acratex preparation
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="who-to-call">
          <div className="shell prose article-prose">
            <h2 id="who-to-call">Who else may need to be involved</h2>
            <p>
              A renderer repairs render. Several of the findings above belong to
              someone else first, and the repair lasts longer when they are
              asked in the right order.
            </p>
            <dl className="faq-list professional-list">
              <div className="faq-list__item">
                <dt>Structural engineer</dt>
                <dd>
                  Where cracking continues through the wall, changes or recurs,
                  appears on both faces, or comes with distortion in doors,
                  windows or floors. The engineer&rsquo;s advice sets what the
                  repair has to accommodate.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Independent building consultant</dt>
                <dd>
                  Useful when the cause or extent of a defect is unclear and a
                  broader look at the building is needed before any trade is
                  asked to price.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Damp specialist</dt>
                <dd>
                  Where rising moisture or a failed damp-proof course is
                  suspected. Dealing with the source is a specialist trade, not
                  a render trade, and it comes before the finish.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Heritage adviser or planning authority</dt>
                <dd>
                  If the building is a State or local heritage place, or sits in
                  a heritage area, removing render or altering masonry may need
                  approval. Confirm the position before work is scoped, not
                  after.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Elite Surface Group render team</dt>
                <dd>
                  Checks the bond, the substrate and the previous coatings for
                  the render scope, then repairs or re-renders to the agreed
                  specification once the cause has been resolved.
                </dd>
              </div>
            </dl>
            <p className="article-source">
              Source:{" "}
              <a href="https://www.environment.sa.gov.au/topics/heritage/owning-a-heritage-place/living-in-a-state-heritage-area">
                Heritage South Australia, living in a State Heritage Area
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="quote-scope">
          <div className="shell prose article-prose">
            <h2 id="quote-scope">What a render repair quote should state</h2>
            <p>
              Two repair quotes can describe the same wall and price very
              different work. Ask for the assumptions in writing so the numbers
              describe comparable scopes.
            </p>
            <TickList
              items={[
                "The areas and elevations included, and exactly where each repair stops",
                "Whether the scope is a patch, a partial re-render or a full strip, and why",
                "How additional hollow or unbonded render found during the work will be handled",
                "The assumed cause of the damage, and who has confirmed it",
                "The render and coating system for the repair, layer by layer",
                "Whether recoating the panel or the whole elevation is included",
                "Treatment of joints, beads, openings and junctions with other materials",
                "Access, protection of adjoining finishes, dust control and clean-up",
                "Exclusions, such as structural work, damp remediation and anything uncovered behind the render",
              ]}
            />
            <p>
              Our guide to{" "}
              <Link href="/resources/what-affects-cladding-render-quotes-adelaide/">
                what affects cladding and render quotes
              </Link>{" "}
              goes through the same drivers in more detail, without price lists,
              and the{" "}
              <Link href="/render/">Adelaide rendering services page</Link>{" "}
              explains how repair and re-render work is scoped.
            </p>

            <aside className="article-note article-note--warning">
              <strong>Removing render is dusty and often done at height.</strong>
              <p>
                Cutting or grinding render, mortar and masonry can generate
                respirable crystalline silica, which is regulated in South
                Australia. Paint on a property built before 1980 may contain
                lead, and repairs above a single storey are work at height.
                Confirm how each will be controlled before removal starts.
              </p>
            </aside>
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.safework.sa.gov.au/industry/construction/crystalline-silica-substances-regulations">
                SafeWork SA, crystalline silica substances regulations
              </a>
              ,{" "}
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

        <section className="section" aria-labelledby="next-steps">
          <div className="shell prose article-prose">
            <h2 id="next-steps">Sensible next steps</h2>
            <ol className="steps">
              <li>
                <h3>Record the wall before anything is touched</h3>
                <p>
                  Photograph the damage in context and note when it appeared and
                  whether it changes. A dated record is the only way to tell a
                  stable defect from an active one.
                </p>
              </li>
              <li>
                <h3>Find out what is on the wall and behind it</h3>
                <p>
                  The substrate and the coating history remove more options than
                  any other answer. If the history is unknown, say so; the
                  inspection can allow for it.
                </p>
              </li>
              <li>
                <h3>Have the cause confirmed where it is uncertain</h3>
                <p>
                  Movement, moisture and salts each belong to a different
                  professional. Getting that advice first costs less than
                  repairing the same wall twice.
                </p>
              </li>
              <li>
                <h3>Agree where the repair stops</h3>
                <p>
                  Walk the elevation and identify the natural breaks. Settle
                  whether the repaired panel or the whole wall is being recoated
                  before the quote is accepted.
                </p>
              </li>
            </ol>
            <p>
              Our <Link href="/render/">rendering services in Adelaide</Link>{" "}
              cover local repairs, partial re-renders and full re-render work
              within an agreed scope, and the{" "}
              <Link href="/locations/adelaide/">Adelaide service area page</Link>{" "}
              sets out where we work.
            </p>
          </div>
        </section>

        <section
          id="faqs-and-sources"
          className="section section--tint"
          aria-labelledby="render-repair-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="render-repair-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="render-repair-faqs">
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
                  <a href="https://rockcote.com.au/resources/structural-movement/">
                    Structural movement
                  </a>
                  ,{" "}
                  <a href="https://rockcote.com.au/resources/preparing-brick-substrates-for-render/">
                    preparing brick substrates for render
                  </a>{" "}
                  and the{" "}
                  <a href="https://rockcote.com.au/wp-content/uploads/2020/09/ROCKCOTE_Maintenance_Guide_opt.pdf">
                    maintenance guide (PDF)
                  </a>
                </dd>
              </div>
              <div>
                <dt>Dulux Acratex</dt>
                <dd>
                  <a href="https://www.dulux.com.au/specifier/products/acratex/overview/acratex-facade-refurbishment/">
                    Facade refurbishment
                  </a>
                  ,{" "}
                  <a href="https://www.dulux.com.au/specifier/products/acratex-preparation/">
                    Acratex preparation
                  </a>{" "}
                  and{" "}
                  <a href="https://www.dulux.com.au/specifier/products/acratex/overview/warranty/">
                    Acratex warranty
                  </a>
                </dd>
              </div>
              <div>
                <dt>Government of South Australia</dt>
                <dd>
                  <a href="https://cdn.environment.sa.gov.au/environment/docs/tech_note3_1.pdf">
                    <cite>
                      Maintenance and Repair of Older Buildings in South
                      Australia
                    </cite>{" "}
                    (PDF)
                  </a>
                  ,{" "}
                  <a href="https://cdn.environment.sa.gov.au/environment/docs/saltdamp_techguide.pdf">
                    <cite>Salt attack and rising damp</cite> (PDF)
                  </a>{" "}
                  and{" "}
                  <a href="https://www.environment.sa.gov.au/topics/heritage/owning-a-heritage-place/living-in-a-state-heritage-area">
                    living in a State Heritage Area
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
                <dt>SafeWork SA and SA Health</dt>
                <dd>
                  <a href="https://www.safework.sa.gov.au/industry/construction/crystalline-silica-substances-regulations">
                    Crystalline silica substances regulations
                  </a>
                  ,{" "}
                  <a href="https://safework.sa.gov.au/industry/construction/working-at-heights">
                    working at heights
                  </a>{" "}
                  and{" "}
                  <a href="https://www.sahealth.sa.gov.au/wps/wcm/connect/9d1caad2-c402-4327-b213-3b8e0319cf96/Managing%2Blead-based%2Bpaint%2Bfact%2Bsheet-final%2Bendorsed_October%2B2023.pdf?MOD=AJPERES">
                    <cite>Managing lead-based paint</cite> (PDF)
                  </a>
                </dd>
              </div>
            </dl>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/render/">Adelaide rendering services</Link>
              <Link href="/resources/render-cracking-adelaide/">
                Render cracking guide
              </Link>
              <Link href="/resources/salt-damp-adelaide/">Salt damp guide</Link>
              <Link href="/resources/preparing-walls-for-render-adelaide/">
                Preparing walls for render
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
        defaultService="Render"
        intro="Planning a render repair? Tell us the suburb, what the wall is built from, how long the damage has been there and what images or reports are available. If supporting files are needed, we’ll arrange how to review them."
      />
      <CtaBand />
    </>
  );
}
