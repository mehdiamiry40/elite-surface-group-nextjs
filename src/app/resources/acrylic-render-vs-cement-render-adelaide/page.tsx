import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { acrylicVsCementRenderGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: acrylicVsCementRenderGuide.metaTitle,
  description: acrylicVsCementRenderGuide.metaDescription,
  path: `/resources/${acrylicVsCementRenderGuide.slug}`,
  image: ogCard("render", "Rendering services in Adelaide"),
  openGraphType: "article",
  publishedTime: acrylicVsCementRenderGuide.published,
  modifiedTime: acrylicVsCementRenderGuide.modified,
});

export default function AcrylicVsCementRenderGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Acrylic render vs cement render in Adelaide",
            href: `/resources/${acrylicVsCementRenderGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={acrylicVsCementRenderGuide} />

      <article>
        <PageBanner
          title={acrylicVsCementRenderGuide.title}
          image={bannerImages[`/resources/${acrylicVsCementRenderGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Acrylic render vs cement render in Adelaide" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{acrylicVsCementRenderGuide.category}</span>
              <time dateTime={acrylicVsCementRenderGuide.published}>
                Published {acrylicVsCementRenderGuide.publishedDisplay}
              </time>
              <span>{acrylicVsCementRenderGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              Deciding between acrylic render vs cement render shapes how a
              wall looks, how it handles movement and how long it lasts
              before it needs attention—yet plenty of quotes assume the
              choice has already been made. The two are not interchangeable
              finishes in different colours: one is a rigid, minerally
              cementitious base coat, the other a flexible, polymer-modified
              coating usually applied as part of a coordinated system. Get
              the choice wrong for the substrate, the exposure or the
              existing wall, and even a well-applied render can crack, stain
              or fail early. This guide sets out what separates the two
              systems and what an Adelaide project should confirm before
              specifying either.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>The system matters more than the label.</strong>
              <p>
                This guide explains the general differences between acrylic
                and cement render. It is not a substitute for the selected
                manufacturer&rsquo;s technical data sheet, and any wall
                showing active cracking or movement should be assessed by a
                suitably qualified professional before a new coating goes
                over it.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#what-separates-them">What actually differs</a>
                </li>
                <li>
                  <a href="#substrate-fit">Matching the system to the wall</a>
                </li>
                <li>
                  <a href="#adelaide-conditions">Why Adelaide conditions matter</a>
                </li>
                <li>
                  <a href="#next-steps">Sensible next steps</a>
                </li>
                <li>
                  <a href="#who-to-call">Who should be involved</a>
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
          aria-labelledby="what-separates-them"
        >
          <div className="shell prose article-prose">
            <h2 id="what-separates-them">
              Acrylic render vs cement render: what actually separates them
            </h2>
            <p>
              Traditional cement render—sometimes called sand-and-cement or
              solid render—is built from cement, sand and water, mixed to a
              workable consistency and applied over masonry in one or more
              coats. It hardens into a hard, minerally bonded layer that
              becomes part of the wall rather than sitting as a separate
              skin. Because it is rigid, it does not tolerate movement well:
              as a substrate expands, contracts or settles, a straight
              cement render is more likely to develop hairline cracking than
              a flexible system, particularly where the mix, coat thickness
              or curing has not followed the specified process.
            </p>
            <h3>Where acrylic render differs</h3>
            <p>
              Acrylic render—also called polymer render—is a pre-mixed,
              water-based coating built around acrylic polymers rather than
              cement alone. Manufacturers such as Rockcote formulate acrylic
              base coats specifically for surfaces where movement tolerance
              and adhesion matter, including fibre cement sheeting and
              previously painted walls, and the polymer content lets the
              coating flex slightly rather than crack outright under minor
              substrate movement.
            </p>
            <p>
              The two are not always a strict either/or choice. Systems such
              as Dulux Acratex build a cementitious base coat first—to level
              the masonry and produce an even surface—then finish with a
              compatible acrylic texture coating over the top, so the
              finished wall benefits from both the cement base&rsquo;s
              strength and the acrylic topcoat&rsquo;s flexibility and
              protection. Which combination suits a given wall depends on
              the substrate, the exposure and the finish specified, so ask
              your render contractor to confirm the full system—not just the
              top layer—against the manufacturer&rsquo;s technical data
              sheet.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://rockcote.com.au/what-are-the-different-types-of-render-a-homeowners-guide/">
                Rockcote, What Are The Different Types of Render? A
                Homeowner&rsquo;s Guide
              </a>{" "}
              and{" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex-render/">
                Dulux Acratex, Acratex Render
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="substrate-fit">
          <div className="shell prose article-prose">
            <h2 id="substrate-fit">Matching the render system to the wall</h2>
            <p>
              Not every wall takes a straight cement render happily, and not
              every wall needs the flexibility acrylic render provides.
            </p>
            <p>
              Bare masonry—brick, besser block or stone—is the substrate
              cement render was developed for; it bonds mechanically into
              the surface and, correctly cured, becomes a stable base for a
              topcoat. Fibre cement sheeting behaves differently, moving and
              flexing with temperature in a way a rigid mix does not
              accommodate well, which is why Rockcote formulates dedicated
              acrylic base coats for it rather than a straight cement mix.
            </p>
            <p>
              Hebel (AAC) panel walls need a coating system matched to the
              panel manufacturer&rsquo;s specification and control-joint
              layout—our guide to{" "}
              <Link href="/resources/rendering-hebel-panels-adelaide/">
                rendering Hebel panels in Adelaide
              </Link>{" "}
              covers what that involves. Previously painted brick needs the
              existing coating&rsquo;s condition assessed before either
              render type goes over it, covered in our guide to{" "}
              <Link href="/resources/rendering-over-painted-brick-adelaide/">
                rendering over painted brick
              </Link>
              .
            </p>
            <p>
              Where render is going over an existing rendered or painted
              wall that is already cracking, the cause needs to be
              understood before a new coating is applied on top of it. Our
              guide to{" "}
              <Link href="/resources/render-cracking-adelaide/">
                render cracking in Adelaide
              </Link>{" "}
              covers the signs that need assessment first.
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="adelaide-conditions">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={acrylicVsCementRenderGuide.image}
                alt={acrylicVsCementRenderGuide.imageAlt}
                width={acrylicVsCementRenderGuide.imageWidth}
                height={acrylicVsCementRenderGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(acrylicVsCementRenderGuide.image)}
              />
              <figcaption>{acrylicVsCementRenderGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Local context</span>
              <h2 id="adelaide-conditions">Why Adelaide conditions matter</h2>
              <p>
                Across the Adelaide Plains—through suburbs such as
                Salisbury, Elizabeth and much of the northern and western
                suburbs—reactive clay soils mean the ground moves seasonally
                as it wets and dries, and that movement transmits into
                footings and walls over time. A flexible acrylic system
                tolerates that kind of minor, ongoing movement better than a
                rigid cement render on its own, which is one reason acrylic
                topcoats are common even over a cement base coat in
                established Adelaide suburbs.
              </p>
              <p>
                Coastal exposure changes the calculation again. Homes near
                Semaphore, Glenelg, Henley Beach and Brighton sit in a
                higher salt-exposure environment, and the coating&rsquo;s
                role shifts toward protecting the substrate from moisture
                and chloride ingress as much as covering it. Adelaide&rsquo;s
                hot, dry summers matter too: a cement-based coat curing too
                fast in full sun and low humidity is a common cause of
                shrinkage cracking, so application timing and the
                manufacturer&rsquo;s curing guidance matter as much as the
                product choice itself.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                  CSIRO,{" "}
                  <cite>Foundation Maintenance and Footing Performance</cite>
                </a>{" "}
                and{" "}
                <a href="https://www.dulux.com.au/specifier/products/acratex/overview/">
                  Dulux Acratex, High Performance Coating Solutions overview
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="next-steps">
          <div className="shell prose article-prose">
            <h2 id="next-steps">Sensible next steps</h2>
            <ol className="steps">
              <li>
                <h3>Identify the substrate and its condition</h3>
                <p>
                  Confirm whether the wall is bare masonry, fibre cement,
                  Hebel or an existing coating, and whether that surface is
                  sound enough to render over.
                </p>
              </li>
              <li>
                <h3>Match the system to the exposure</h3>
                <p>
                  Check the manufacturer&rsquo;s technical data sheet for
                  the substrate and exposure combination—coastal salt air
                  and inland heat call for different system specifications.
                </p>
              </li>
              <li>
                <h3>Confirm the full system, not just the topcoat</h3>
                <p>
                  The base coat, any reinforcing and the topcoat need to be
                  a compatible, documented system rather than mismatched
                  products chosen on colour alone.
                </p>
              </li>
              <li>
                <h3>Get the scope and warranty terms in writing</h3>
                <p>
                  Confirm which applicator is carrying out the work, what
                  system warranty applies, and what upkeep keeps that
                  warranty valid.
                </p>
              </li>
            </ol>

            <TickList
              items={[
                "Substrate identified and its condition confirmed before a system is chosen",
                "Manufacturer technical data sheet for the specific base coat and topcoat combination",
                "Written confirmation the system suits the property's coastal or inland exposure",
                "Whether the coating is being installed by a manufacturer-trained applicator",
                "What warranty applies to the complete system, not just one product",
                "How the new render meets existing render, cladding or trim junctions",
              ]}
            />

            <aside className="article-note article-note--warning">
              <strong>Don&rsquo;t judge a render system by its colour swatch.</strong>
              <p>
                A colour or texture sample says nothing about whether the
                underlying system suits your wall. Confirm the full
                specification—including primer, base coat and any
                reinforcing mesh—against the manufacturer&rsquo;s technical
                data sheet before work starts, particularly on a wall that
                has cracked or moved before.
              </p>
            </aside>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="who-to-call">
          <div className="shell prose article-prose">
            <h2 id="who-to-call">Who should be involved</h2>
            <dl className="faq-list professional-list">
              <div className="faq-list__item">
                <dt>Render applicator</dt>
                <dd>
                  Applies the confirmed base coat and topcoat system to the
                  manufacturer&rsquo;s specification for the substrate and
                  exposure.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Manufacturer technical support</dt>
                <dd>
                  Confirms which base coat and topcoat combination suits
                  your substrate and exposure category, and what warranty
                  applies to the full system.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Structural engineer</dt>
                <dd>
                  Needed only where existing cracking suggests ongoing
                  structural movement beyond what a flexible coating is
                  designed to tolerate.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Elite Surface Group render team</dt>
                <dd>
                  Assesses the existing wall, recommends a system suited to
                  the substrate and Adelaide exposure, and coordinates
                  preparation through to the finished coat.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          id="faqs-and-sources"
          className="section"
          aria-labelledby="render-comparison-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="render-comparison-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="render-comparison-faqs">
              <div className="faq-list__item">
                <dt>Is acrylic render vs cement render really an either/or choice?</dt>
                <dd>
                  Not always. Many systems use a cementitious base coat with
                  a compatible acrylic texture topcoat over it, so the
                  finished wall benefits from both.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Which render type costs more?</dt>
                <dd>
                  It depends on the substrate preparation required, the
                  specified system and the coverage needed, so it is not a
                  fair like-for-like comparison unless you are working from
                  itemised quotes for the same complete scope of work.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Can render go over Hebel or fibre cement sheeting?</dt>
                <dd>
                  Yes, with a system matched to that substrate—see our guide
                  to rendering Hebel panels for panel-specific detail.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>Rockcote</dt>
                <dd>
                  <a href="https://rockcote.com.au/what-are-the-different-types-of-render-a-homeowners-guide/">
                    What Are The Different Types of Render? A Homeowner&rsquo;s
                    Guide
                  </a>{" "}
                  and{" "}
                  <a href="https://rockcote.com.au/product/polymer-render-grey/">
                    Polymer Render Grey
                  </a>
                </dd>
              </div>
              <div>
                <dt>Dulux Acratex</dt>
                <dd>
                  <a href="https://www.dulux.com.au/specifier/products/acratex-render/">
                    Acratex Render
                  </a>{" "}
                  and{" "}
                  <a href="https://www.dulux.com.au/specifier/products/acratex/overview/">
                    High Performance Coating Solutions overview
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
            </dl>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/render/">Adelaide rendering services</Link>
              <Link href="/projects/two-storey-exterior-render/">
                Two-storey exterior render project
              </Link>
              <Link href="/locations/adelaide/">Adelaide service area</Link>
              <Link href="/contact-us/#contact">
                Discuss your render project
              </Link>
            </nav>
          </div>
        </section>
      </article>

      <ContactSection
        defaultService="Render"
        intro="Tell us the wall's substrate, its condition and the property's exposure—coastal or inland—and we'll recommend a render system to confirm before you commit to one."
      />
      <CtaBand />
    </>
  );
}
