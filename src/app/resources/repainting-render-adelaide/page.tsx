import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { repaintingRenderGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: repaintingRenderGuide.metaTitle,
  description: repaintingRenderGuide.metaDescription,
  path: `/resources/${repaintingRenderGuide.slug}`,
  image: ogCard("render", repaintingRenderGuide.metaTitle),
  openGraphType: "article",
  publishedTime: repaintingRenderGuide.published,
  modifiedTime: repaintingRenderGuide.modified,
});

export default function RepaintingRenderGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Repainting render in Adelaide",
            href: `/resources/${repaintingRenderGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={repaintingRenderGuide} />

      <article>
        <PageBanner
          title={repaintingRenderGuide.title}
          image={bannerImages[`/resources/${repaintingRenderGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Repainting render in Adelaide" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{repaintingRenderGuide.category}</span>
              <time dateTime={repaintingRenderGuide.published}>
                Published {repaintingRenderGuide.publishedDisplay}
              </time>
              <span>{repaintingRenderGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              Repainting render is mostly preparation. The coating you choose
              matters, but a sound, clean, properly primed wall is what decides
              whether the new finish lasts a decade or lifts in three years.
              Before any colour is picked, the existing surface needs to be
              assessed for adhesion, chalking, moisture and cracking—and the
              cracks in particular need to be understood rather than simply
              filled.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>Cracks are a diagnosis, not a filling job.</strong>
              <p>
                Fine hairline crazing in a coating and a crack that traces a
                structural movement path are different problems. Have active or
                widening cracking assessed by a suitably qualified professional
                before it is coated over—paint hides a crack, it does not stop
                one.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#assess">Assessing the existing surface</a>
                </li>
                <li>
                  <a href="#cracks">Cracks, patches and preparation</a>
                </li>
                <li>
                  <a href="#adelaide-conditions">
                    What Adelaide exposure does to a recoat
                  </a>
                </li>
                <li>
                  <a href="#coating">Choosing the coating system</a>
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

        <section className="section section--tint" aria-labelledby="assess">
          <div className="shell prose article-prose">
            <h2 id="assess">Assessing the existing surface</h2>
            <p>
              Repainting render starts with establishing that the surface is
              sound, stable and suitable for another coating. That assessment
              is the part homeowners most often skip, and it is the part that
              decides the specification.
            </p>
            <TickList
              items={[
                "Whether the existing paint is firmly bonded, or lifting, flaking and powdery to the touch",
                "Whether the wall is dry, and whether anything is keeping it damp",
                "Dirt, mould, salt deposits and any organic growth that has to come off first",
                "Whether the substrate is cement render, acrylic render or a texture coat",
                "Previous repairs and patches, which can absorb differently from the wall around them",
              ]}
            />
            <p>
              A previously painted or rendered surface often needs sealing,
              priming or patching before a new coat goes on, so that absorption
              is uniform and the new coating adheres properly. Where the
              existing coating is unknown—common on a house that has changed
              hands—the manufacturer&rsquo;s technical literature for the
              proposed system sets out what test patches and preparation it
              requires.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://rockcote.com.au/resources/choosing-the-best-paint-for-rendered-homes/">
                Rockcote, Choosing the best paint for rendered homes
              </a>{" "}
              and{" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex-preparation/">
                Dulux, Acratex preparation
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="cracks">
          <div className="shell prose article-prose">
            <h2 id="cracks">Cracks, patches and preparation</h2>
            <p>
              Minor hairline cracks can often be handled by a flexible,
              crack-bridging coating system. Structural cracking is different:
              it should be repaired before painting, and the movement causing it
              needs to be understood first. Reactive clay soils across the
              Adelaide Plains move seasonally, so cracking that appears in one
              part of the year and closes in another is telling you something a
              topcoat will not fix. Our{" "}
              <Link href="/resources/render-cracking-adelaide/">
                guide to render cracking
              </Link>{" "}
              covers what to record before a repair is scoped.
            </p>
            <p>
              Patching compounds and levelling renders exist precisely for this
              stage—products designed to bond to clean masonry and to shrink as
              little as possible while drying, so the repair does not read
              through the finished wall. Which one suits depends on the depth of
              the repair and the coating going over it, and the two need to be
              specified together rather than chosen separately.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://rockcote.com.au/resources/structural-movement/">
                Rockcote, Structural movement
              </a>
              ,{" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex-preparation/">
                Dulux, Acratex preparation
              </a>{" "}
              and{" "}
              <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                CSIRO,{" "}
                <cite>Foundation Maintenance and Footing Performance</cite>{" "}
                (PDF)
              </a>
              .
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="adelaide-conditions"
        >
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={repaintingRenderGuide.image}
                alt={repaintingRenderGuide.imageAlt}
                width={repaintingRenderGuide.imageWidth}
                height={repaintingRenderGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(repaintingRenderGuide.image)}
              />
              <figcaption>{repaintingRenderGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Local context</span>
              <h2 id="adelaide-conditions">
                What Adelaide exposure does to a recoat
              </h2>
              <p>
                Maintenance cycles are not a fixed number of years. They depend
                on the colour, the exposure, the quality of the original
                application and the location—and dark colours and coastal
                environments both shorten them. A charcoal west-facing wall at
                Semaphore or Brighton is working far harder than a light
                north-facing wall in Salisbury East, and the two should not be
                on the same repaint schedule.
              </p>
              <p>
                Long, hot, dry Adelaide summers push surface temperatures up on
                dark walls, and salt-laden air along the coast keeps working at
                a coating between washes. Manufacturers set expectations for
                their own systems: Dulux, for example, states that whole-of-life
                facade costs are optimised when its AcraShield weatherproofing
                topcoat is re-applied every 7&ndash;10 years. Treat that as a
                system-specific figure, not a rule for every rendered wall—yours
                depends on what is actually on it.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://rockcote.com.au/wp-content/uploads/2020/09/ROCKCOTE_Maintenance_Guide_opt.pdf">
                  Rockcote, <cite>Maintenance Guide</cite> (PDF)
                </a>{" "}
                and{" "}
                <a href="https://www.dulux.com.au/specifier/products/acratex/overview/acratex-facade-refurbishment/">
                  Dulux, Acratex facade refurbishment
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="coating">
          <div className="shell prose article-prose">
            <h2 id="coating">Choosing the coating system for repainting render</h2>
            <p>
              A render coating does more than colour the wall. It is the layer
              managing water, and on a refurbishment it is often also asked to
              bridge fine cracking and resist staining. That is why membrane and
              high-build systems are specified on facade work where a standard
              exterior wall paint would not hold up.
            </p>
            <p>
              Two things are worth settling early. The first is colour: a darker
              choice will generally need recoating sooner, so it is a
              maintenance decision as much as an aesthetic one. The second is
              the system, not the product—primer, intermediate and topcoat are
              specified together, and manufacturer warranties depend on the full
              system being applied as documented. Our{" "}
              <Link href="/render/">Adelaide render services</Link> work to the
              selected system rather than substituting products between coats.
            </p>
            <p>
              If the wall is being recoated as part of a larger facade change
              rather than straight maintenance, it is worth deciding that before
              preparation starts—{" "}
              <Link href="/project-planning/">our planning notes</Link> cover
              what is useful to have ready.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex/overview/">
                Dulux, Acratex overview
              </a>
              ,{" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex/overview/warranty/">
                Dulux, Acratex warranty
              </a>{" "}
              and{" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex/technotes-faqs/">
                Dulux, Acratex care and maintenance guides
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
                <h3>Wash the wall and look again</h3>
                <p>
                  A hose-down removes the dirt that disguises the real
                  condition. Rockcote recommends an annual wash as ordinary
                  upkeep, and it is the cheapest way to see what you are dealing
                  with.
                </p>
              </li>
              <li>
                <h3>Record the cracks before anything is filled</h3>
                <p>
                  Photograph each crack with something for scale and note the
                  date. Whether a crack is stable or still moving changes the
                  repair, and only a record over time shows which it is.
                </p>
              </li>
              <li>
                <h3>Identify what is already on the wall</h3>
                <p>
                  Cement render, acrylic render and texture coats take
                  preparation differently. If the history is unknown, expect the
                  specification to include adhesion testing.
                </p>
              </li>
              <li>
                <h3>Specify the full system, then the colour</h3>
                <p>
                  Choose primer, intermediate and topcoat together from one
                  manufacturer&rsquo;s documented system, and let the exposure
                  and colour choice inform the expected recoating interval.
                </p>
              </li>
            </ol>

            <aside className="article-note article-note--warning">
              <strong>Older coatings and height both carry risk.</strong>
              <p>
                Sanding or blasting paint applied before 1970 can disturb
                lead-based coatings, and repainting render on anything above
                single storey is work at height. Both are regulated safety
                matters in South Australia—confirm how they will be managed
                before preparation starts.
              </p>
            </aside>
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.sahealth.sa.gov.au/wps/wcm/connect/9d1caad2-c402-4327-b213-3b8e0319cf96/Managing%2Blead-based%2Bpaint%2Bfact%2Bsheet-final%2Bendorsed_October%2B2023.pdf?MOD=AJPERES">
                SA Health, <cite>Managing lead-based paint</cite> (PDF)
              </a>{" "}
              and{" "}
              <a href="https://safework.sa.gov.au/industry/construction/working-at-heights">
                SafeWork SA, Working at heights
              </a>
              .
            </p>
          </div>
        </section>

        <section
          id="faqs-and-sources"
          className="section"
          aria-labelledby="repaint-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="repaint-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="repaint-faqs">
              <div className="faq-list__item">
                <dt>How often does render need repainting?</dt>
                <dd>
                  There is no single interval. It depends on the coating system,
                  the colour, the exposure and how well the original application
                  was done. Manufacturers publish expectations for their own
                  systems—use the one that is actually on your wall.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Can we just paint over the cracks?</dt>
                <dd>
                  Fine hairline cracking can often be covered by a flexible
                  crack-bridging system. Cracking that is active, widening or
                  following a structural path needs assessment and repair first,
                  because a coating will conceal it rather than resolve it.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Is normal exterior house paint good enough?</dt>
                <dd>
                  Render coating systems are specified for water management and,
                  on refurbishment work, crack bridging and stain resistance.
                  Check what the manufacturer&rsquo;s system requires for your
                  substrate rather than assuming a general exterior paint
                  covers it.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>Rockcote</dt>
                <dd>
                  <a href="https://rockcote.com.au/resources/choosing-the-best-paint-for-rendered-homes/">
                    Choosing the best paint for rendered homes
                  </a>
                  ,{" "}
                  <a href="https://rockcote.com.au/wp-content/uploads/2020/09/ROCKCOTE_Maintenance_Guide_opt.pdf">
                    <cite>Maintenance Guide</cite> (PDF)
                  </a>{" "}
                  and{" "}
                  <a href="https://rockcote.com.au/resources/structural-movement/">
                    Structural movement
                  </a>
                </dd>
              </div>
              <div>
                <dt>Dulux</dt>
                <dd>
                  <a href="https://www.dulux.com.au/specifier/products/acratex/overview/acratex-facade-refurbishment/">
                    Acratex facade refurbishment
                  </a>
                  ,{" "}
                  <a href="https://www.dulux.com.au/specifier/products/acratex-preparation/">
                    Acratex preparation
                  </a>
                  ,{" "}
                  <a href="https://www.dulux.com.au/specifier/products/acratex/technotes-faqs/">
                    Acratex care and maintenance guides
                  </a>{" "}
                  and{" "}
                  <a href="https://www.dulux.com.au/specifier/products/acratex/overview/warranty/">
                    Acratex warranty
                  </a>
                </dd>
              </div>
              <div>
                <dt>CSIRO</dt>
                <dd>
                  <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                    <cite>Foundation Maintenance and Footing Performance</cite>{" "}
                    (PDF)
                  </a>
                </dd>
              </div>
              <div>
                <dt>SA Health and SafeWork SA</dt>
                <dd>
                  <a href="https://www.sahealth.sa.gov.au/wps/wcm/connect/9d1caad2-c402-4327-b213-3b8e0319cf96/Managing%2Blead-based%2Bpaint%2Bfact%2Bsheet-final%2Bendorsed_October%2B2023.pdf?MOD=AJPERES">
                    <cite>Managing lead-based paint</cite> (PDF)
                  </a>{" "}
                  and{" "}
                  <a href="https://safework.sa.gov.au/industry/construction/working-at-heights">
                    Working at heights
                  </a>
                </dd>
              </div>
            </dl>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/render/">Adelaide render services</Link>
              <Link href="/resources/render-cracking-adelaide/">
                Render cracking guide
              </Link>
              <Link href="/projects/two-storey-exterior-render/">
                Two-storey exterior render case study
              </Link>
              <Link href="/locations/adelaide/">Adelaide service area</Link>
              <Link href="/contact-us/#contact">
                Discuss the available project details
              </Link>
            </nav>
          </div>
        </section>
      </article>

      <ContactSection
        defaultService="Render"
        intro="If a rendered exterior is due for a recoat, tell us the suburb, the approximate age of the current finish and what the walls look like up close. Photographs of any cracking help."
      />
      <CtaBand />
    </>
  );
}
