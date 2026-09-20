import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { renderFinishesGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: renderFinishesGuide.metaTitle,
  description: renderFinishesGuide.metaDescription,
  path: `/resources/${renderFinishesGuide.slug}`,
  image: ogCard("render", renderFinishesGuide.metaTitle),
  openGraphType: "article",
  publishedTime: renderFinishesGuide.published,
  modifiedTime: renderFinishesGuide.modified,
});

export default function RenderFinishesGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Render finishes in Adelaide",
            href: `/resources/${renderFinishesGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={renderFinishesGuide} />

      <article>
        <PageBanner
          title={renderFinishesGuide.title}
          image={bannerImages[`/resources/${renderFinishesGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Render finishes in Adelaide" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{renderFinishesGuide.category}</span>
              <time dateTime={renderFinishesGuide.published}>
                Published {renderFinishesGuide.publishedDisplay}
              </time>
              <span>{renderFinishesGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              Most render finishes come down to a smooth trowelled surface, a
              fine sand or float grain, or a coarser rolled or trowelled
              texture&mdash;plus one more decision about whether the colour sits
              in the render itself or in a coating over it. The look is the part
              people choose on. The grade is the part that decides how much of
              the wall behind it disappears, how readily the surface collects
              dust and salt, and how a patch will blend in five years.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>A finish covers a wall; it does not correct one.</strong>
              <p>
                Elite Surface Group applies render and installs cladding,
                Hebel and walling. We do not certify buildings. Where cracking,
                movement, damp or the structural condition of the wall is in
                question, arrange assessment by a suitably qualified
                professional first&mdash;a texture applied over an unresolved
                problem simply reproduces it.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#grades">The finishes you will be offered</a>
                </li>
                <li>
                  <a href="#wall">The wall sets the shortlist</a>
                </li>
                <li>
                  <a href="#adelaide">Matching a finish to Adelaide</a>
                </li>
                <li>
                  <a href="#upkeep">Upkeep, patching and ageing</a>
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

        <section className="section section--tint" aria-labelledby="grades">
          <div className="shell prose article-prose">
            <h2 id="grades">
              The render finishes you will actually be offered
            </h2>
            <p>
              Manufacturers grade their texture ranges by surface profile and
              by how the product is applied&mdash;rolled, sprayed, or laid on
              with a hawk and trowel and floated. Names change between brands;
              the profile carries across all of them.
            </p>

            <h3>Smooth and trowelled</h3>
            <p>
              A smooth finish suits contemporary elevations where the eye is
              meant to follow an unbroken line. Rockcote&rsquo;s homeowner guide
              describes smooth render as common in modern architectural work
              where clean lines and minimal detailing are wanted, and notes that
              textured finishes can instead add visual interest and help conceal
              minor substrate variations. That is the trade in one sentence: a
              smooth wall hides nothing. Set-out variations, a bowed course of
              brickwork and every hairline the substrate hands upward stay
              visible, and late sun raking across a western elevation will find
              all of them.
            </p>

            <h3>Sand, float and fine-grain textures</h3>
            <p>
              A fine grain scatters reflected light and takes the hard edge off
              what sits underneath, without reading as a &ldquo;textured&rdquo;
              wall from the street. Dulux&rsquo;s AcraTex range is organised
              this way: the Tuscany finishes are fine-grain acrylic textures
              laid on by hawk-and-trowel plastering for a float render
              appearance, while SuperTrowel 2&nbsp;mm is a high-build
              scratch-float finish with maximum substrate hiding power,
              trowelled on and finished with a polystyrene float. Fine grades
              are the usual compromise on an older masonry home that is not
              perfectly flat.
            </p>

            <h3>Coarse and rolled textures</h3>
            <p>
              Heavier profiles are rolled or trowelled at a greater film build
              and hide more. Rockcote describes its 100% acrylic polymer renders
              as applied in film builds of 2&ndash;4&nbsp;mm, suiting a coarse,
              sponge-finished look while levelling out uneven areas. The
              deeper the profile, the more it conceals&mdash;and the more
              surface area it presents to dust, wind-driven sand and salt. On a
              sheltered inland elevation that costs little. Facing the gulf at
              Semaphore or Glenelg it is a maintenance decision as much as an
              aesthetic one.
            </p>

            <h3>Colour in the render, or colour in a coating</h3>
            <p>
              The last choice is where the colour lives. A through-coloured
              render carries it in the render layer itself rather than in a thin
              film over the top. The alternative is a rendered base with a
              separate exterior coating, and Rockcote describes what that
              coating is doing: protecting the render from moisture, movement
              and weather, which means staying flexible enough to accommodate
              minor movement. Both are legitimate. They put the maintenance in
              different places&mdash;worth reading alongside our guide to{" "}
              <Link href="/resources/repainting-render-adelaide/">
                repainting rendered walls
              </Link>
              .
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://rockcote.com.au/what-are-the-different-types-of-render-a-homeowners-guide/">
                Rockcote, types of render
              </a>
              ,{" "}
              <a href="https://rockcote.com.au/resources/choosing-the-best-paint-for-rendered-homes/">
                choosing paint for rendered homes
              </a>
              ,{" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex-texture/">
                Dulux AcraTex texture range
              </a>{" "}
              and{" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex-texture/acratex-super-trowel-2mm/">
                AcraTex SuperTrowel 2&nbsp;mm
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="wall">
          <div className="shell prose article-prose">
            <h2 id="wall">The wall underneath sets the shortlist</h2>
            <p>
              Render is bonded to its substrate, so the substrate has a vote
              before anyone opens a colour chart. Brickwork, blockwork, AAC
              panel and a sheeted frame do not all take the same base coat, and
              a wall that has been painted before narrows the options again. Our{" "}
              <Link href="/resources/acrylic-render-vs-cement-render-adelaide/">
                acrylic versus cement render comparison
              </Link>{" "}
              covers that system-level decision; the finish grade sits on top of
              whatever it settles.
            </p>
            <p>
              Two substrate facts matter more than the rest. The first is
              flatness: a smooth finish inherits the tolerance of the wall it is
              applied to, and bringing a wavy wall flat enough to carry one is
              its own scope of work. The second is movement. Articulation and
              control joints exist so movement has somewhere to go, and
              Rockcote&rsquo;s guidance on structural movement is explicit that
              carrying a rigid finish across one relocates the stress into the
              surface rather than removing it. No texture grade changes that.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://rockcote.com.au/resources/structural-movement/">
                Rockcote technical guidance on structural movement
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="adelaide">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={renderFinishesGuide.image}
                alt={renderFinishesGuide.imageAlt}
                width={renderFinishesGuide.imageWidth}
                height={renderFinishesGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(renderFinishesGuide.image)}
              />
              <figcaption>{renderFinishesGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Local context</span>
              <h2 id="adelaide">
                Matching render finishes to Adelaide conditions
              </h2>
              <p>
                Reactive clay is common across the Adelaide plains, and CSIRO
                guidance on foundation maintenance explains how seasonal
                moisture change in that soil moves footings and the brittle
                masonry above them. Around Salisbury, Elizabeth and Paralowie
                that is the background condition a finish lives with. It does
                not decide the texture, but it does make a dead-flat smooth wall
                the least forgiving surface on a house that moves seasonally.
              </p>
              <p>
                Exposure pulls the other way along the coast. Rockcote&rsquo;s
                maintenance guide states plainly that maintenance cycles depend
                on colour choice, exposure, application quality and location,
                and that dark colours and coastal environments may need more
                frequent repainting. At Semaphore, Glenelg and Brighton that
                combination&mdash;deep colour, heavy texture, salt-laden
                air&mdash;is the one to think through before committing, not
                after.
              </p>
              <p>
                Adelaide summers add a third constraint, at the application
                end rather than the design end. Ambient and substrate
                temperature, humidity and wind all sit inside documented limits
                that vary between systems, so they belong in the programme,
                taken from the current data sheet rather than a rule of thumb.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                  CSIRO,{" "}
                  <cite>Foundation maintenance and footing performance</cite>{" "}
                  (PDF)
                </a>{" "}
                and the{" "}
                <a href="https://rockcote.com.au/wp-content/uploads/2020/09/ROCKCOTE_Maintenance_Guide_opt.pdf">
                  Rockcote maintenance guide (PDF)
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="upkeep">
          <div className="shell prose article-prose">
            <h2 id="upkeep">Upkeep, patching and how a finish ages</h2>
            <p>
              Rockcote&rsquo;s maintenance guide asks for exterior render
              systems to be inspected regularly and washed down with a hose
              annually, and warns that cracking, damp areas and dirt build-up
              encourage mould, which stains the surface and can affect the
              long-term performance of the coating. A hose is the instruction,
              not a high-pressure gun&mdash;pressure can drive water into a wall
              and damage the profile you paid for.
            </p>
            <p>
              Patching deserves a realistic expectation either way. A textured
              repair has to be matched in profile by hand and will usually show
              in raking light; a smooth wall shows a patch as a difference in
              flatness and sheen instead. Neither disappears, which is why sound
              repairs are normally taken out to a natural break&mdash;a corner,
              an opening, a joint&mdash;rather than feathered into the middle of
              an elevation.
            </p>
            <p>Worth settling before the quote is accepted:</p>
            <TickList
              items={[
                "The exact system: base coat, any reinforcement, the texture product and grade, and the topcoat or coloured render",
                "Whether colour is in the render or in a separate coating, and who warrants each layer",
                "A sample panel applied on the building, in daylight, on the elevation that matters most",
                "The documented cleaning method, inspection interval and warranty conditions for that system",
                "How future patch repairs will be handled, and where the natural breaks on each elevation are",
                "Which trade is responsible for joints, flashings, beads and junctions with other materials",
              ]}
            />
            <p className="article-source">
              Source:{" "}
              <a href="https://rockcote.com.au/wp-content/uploads/2020/09/ROCKCOTE_Maintenance_Guide_opt.pdf">
                Rockcote maintenance guide (PDF)
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
                <h3>Confirm the substrate and its coating history</h3>
                <p>
                  What the wall is, and what has already been applied to it,
                  removes more options than any other single answer.
                </p>
              </li>
              <li>
                <h3>Look at the wall in raking light first</h3>
                <p>
                  Walk the elevations early and late in the day. How flat the
                  wall reads in low sun tells you whether a smooth finish is
                  realistic or whether a grain is doing you a favour.
                </p>
              </li>
              <li>
                <h3>Ask for a sample panel on the building</h3>
                <p>
                  A handheld board indoors is not a test. Colour and texture
                  both change at scale and in direct Adelaide sun.
                </p>
              </li>
              <li>
                <h3>Specify the full system, not the top layer</h3>
                <p>
                  Ask for the manufacturer&rsquo;s system documents and warranty
                  conditions covering every coat. They set the exposure limits,
                  the application conditions and the maintenance terms that keep
                  the finish covered.
                </p>
              </li>
            </ol>
            <p>
              Our{" "}
              <Link href="/render/">Adelaide rendering service page</Link>{" "}
              explains how we scope this work, the{" "}
              <Link href="/project-planning/">project planning guide</Link>{" "}
              lists what is useful to have ready before quoting, and the{" "}
              <Link href="/projects/curved-rendered-wall-detail/">
                curved rendered wall case study
              </Link>{" "}
              shows one finished surface carried around a radius and into a
              straight parapet.
            </p>
          </div>
        </section>

        <section
          id="faqs-and-sources"
          className="section"
          aria-labelledby="render-finishes-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="render-finishes-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="render-finishes-faqs">
              <div className="faq-list__item">
                <dt>Will a coarse texture stop the wall cracking?</dt>
                <dd>
                  No. A heavier profile can disguise fine surface variation, but
                  a crack driven by substrate or footing movement will still
                  come through. The cause needs assessment before the finish is
                  chosen, not after the second repair.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Can we change the texture without removing the render?</dt>
                <dd>
                  Sometimes. It depends on what the existing surface is, how
                  well it is bonded, and whether the new system is documented
                  for that substrate. Going coarser is generally easier than
                  going smoother, because a finer grade inherits the flatness
                  beneath it.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Which finish is the cheapest?</dt>
                <dd>
                  Comparing textures by rate alone tells you little.
                  Preparation, access, the number of coats and the flatness the
                  chosen grade demands usually move the number more than the
                  texture product does.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Does a dark colour cost anything later?</dt>
                <dd>
                  It can. The Rockcote maintenance guide ties repainting
                  frequency to colour choice, exposure, application quality and
                  location, and names dark colours and coastal environments as
                  the combination that may need attention sooner. Some systems
                  also document colour limits over particular substrates, so
                  check the selected colour against the system data.
                </dd>
              </div>
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
                  </a>
                  ,{" "}
                  <a href="https://rockcote.com.au/resources/structural-movement/">
                    structural movement
                  </a>{" "}
                  and the{" "}
                  <a href="https://rockcote.com.au/wp-content/uploads/2020/09/ROCKCOTE_Maintenance_Guide_opt.pdf">
                    maintenance guide (PDF)
                  </a>
                </dd>
              </div>
              <div>
                <dt>Dulux AcraTex</dt>
                <dd>
                  <a href="https://www.dulux.com.au/specifier/products/acratex-texture/">
                    Texture range
                  </a>
                  ,{" "}
                  <a href="https://www.dulux.com.au/specifier/products/acratex-texture/acratex-super-trowel-2mm/">
                    SuperTrowel 2&nbsp;mm
                  </a>{" "}
                  and the{" "}
                  <a href="https://www.dulux.com.au/specifier/products/acratex/systems-and-guides/">
                    AcraTex systems and guides
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
              <Link href="/render/">Adelaide rendering services</Link>
              <Link href="/resources/acrylic-render-vs-cement-render-adelaide/">
                Acrylic vs cement render
              </Link>
              <Link href="/resources/repainting-render-adelaide/">
                Repainting rendered walls
              </Link>
              <Link href="/locations/adelaide/">Adelaide service area</Link>
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
        intro="Weighing up a render finish? Tell us the suburb, what the wall is built from, whether it has been coated before and what elevation photos or specification details are available. If supporting files are needed, we’ll arrange how to review them."
      />
      <CtaBand />
    </>
  );
}
