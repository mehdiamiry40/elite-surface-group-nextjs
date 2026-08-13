import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { renderingPaintedBrickGuide } from "@/content/resources";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: renderingPaintedBrickGuide.metaTitle,
  description: renderingPaintedBrickGuide.metaDescription,
  path: `/resources/${renderingPaintedBrickGuide.slug}`,
  image: ogCard(
    "rendering-over-painted-brick-adelaide",
    "Can painted brick be rendered? Adelaide guide",
  ),
  openGraphType: "article",
  publishedTime: renderingPaintedBrickGuide.published,
  modifiedTime: renderingPaintedBrickGuide.modified,
});

export default function RenderingPaintedBrickGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Rendering painted brick",
            href: `/resources/${renderingPaintedBrickGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={renderingPaintedBrickGuide} />

      <article>
        <PageBanner
          title={renderingPaintedBrickGuide.title}
          image={bannerImages[`/resources/${renderingPaintedBrickGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Rendering painted brick" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="painted-brick-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{renderingPaintedBrickGuide.category}</span>
              <time dateTime={renderingPaintedBrickGuide.published}>
                Published {renderingPaintedBrickGuide.publishedDisplay}
              </time>
              <span>{renderingPaintedBrickGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="painted-brick-summary">The short answer</h2>
            <p className="article-lead">
              Sometimes. A compatible render or texture system may be specified
              over properly prepared painted masonry, but the existing paint is
              now part of the substrate. Its condition, bond, contamination and
              compatibility need to be considered alongside the brickwork,
              moisture history and proposed finish.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>“Painted brick” is not one substrate condition.</strong>
              <p>
                A photograph can help show the extent and access, but it cannot
                confirm adhesion between hidden layers or select a coating
                system. This guide is for project preparation—not a DIY removal
                method, product specification, warranty promise or remote wall
                assessment.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#why-paint-matters">Why the paint matters</a>
                </li>
                <li>
                  <a href="#wall-history">Record the wall history</a>
                </li>
                <li>
                  <a href="#assessment-signs">Conditions to assess</a>
                </li>
                <li>
                  <a href="#system-path">Define the complete system</a>
                </li>
                <li>
                  <a href="#safety-planning">Safety and planning checks</a>
                </li>
                <li>
                  <a href="#compare-quotes">Compare quote scopes</a>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="why-paint-matters"
        >
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={renderingPaintedBrickGuide.image}
                alt={renderingPaintedBrickGuide.imageAlt}
                width={renderingPaintedBrickGuide.imageWidth}
                height={renderingPaintedBrickGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
              />
              <figcaption>{renderingPaintedBrickGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Start below the new finish</span>
              <h2 id="why-paint-matters">
                Why existing paint changes the render decision
              </h2>
              <p>
                A new finish can only be as dependable as the layers supporting
                it. On bare masonry, the specified system interacts with the
                brick and mortar. On painted masonry, it may instead rely on an
                older coating—and on that coating’s bond to everything below.
              </p>
              <p>
                Manufacturer information confirms that some products are
                designed for properly cleaned and prepared pre-painted
                surfaces. It also places limits on painted surfaces and calls
                for specialist application. That supports a careful
                “sometimes”, not a blanket rule that every painted wall can be
                rendered.
              </p>
              <p>
                Dulux’s AcraTex SuperTrowel page directs previously painted
                surfaces back to a project-specific specification and
                substrate guide. The exact masonry, existing coating and
                selected finish therefore need to be considered together.
              </p>
              <p className="article-source">
                Sources: {" "}
                <a href="https://rockcote.com.au/wp-content/uploads/2020/09/Keycote_TDS_September2020.pdf">
                  ROCKCOTE Keycote Technical Data Sheet (PDF)
                </a>{" "}
                and {" "}
                <a href="https://www.dulux.com.au/specifier/products/acratex-texture/acratex-super-trowel-2mm/">
                  Dulux AcraTex SuperTrowel substrate guidance
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="wall-history">
          <div className="shell prose article-prose">
            <h2 id="wall-history">
              Record what is known before requesting a specification or quote
            </h2>
            <p>
              Older walls often have incomplete records. The goal is not to
              guess a product from colour or sheen, but to separate known facts
              from assumptions so the assessor, product supplier and contractor
              can identify what still needs checking.
            </p>
            <TickList
              items={[
                "Approximate property age and whether the wall is original or part of an addition",
                "When the exterior was last painted and any known paint, primer or coating products",
                "Whether the brick was painted before you owned the property",
                "Previous patching, repointing, crack repairs or moisture work",
                "Which elevations are affected and whether sheltered areas look different",
                "Dated wide and close photographs, including openings, corners and the wall base",
                "Interior damp, plumbing, gutter, downpipe, roof or ground-drainage history near the wall",
                "Access constraints, neighbouring boundaries and the proposed finish or colour",
              ]}
            />
            <p>
              Plans, invoices, product containers and past maintenance records
              can be more useful than a confident description such as “normal
              exterior paint”. Our {" "}
              <Link href="/project-planning/">project-planning guide</Link>{" "}
              explains what else to send with an enquiry.
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="assessment-signs"
        >
          <div className="shell prose article-prose">
            <h2 id="assessment-signs">
              Conditions that need assessment before a finish is selected
            </h2>
            <p>
              The surface should be viewed as a connected wall, not as isolated
              paint chips. A contractor or specifier may need to examine more
              than one elevation and distinguish a local coating defect from a
              condition affecting the masonry or moisture path.
            </p>
            <dl className="faq-list professional-list">
              <div className="faq-list__item">
                <dt>Loose, flaking, blistered or chalking coating</dt>
                <dd>
                  A visibly unstable layer should not simply be hidden. Its
                  extent, likely cause and the selected system’s substrate
                  requirements need to be established.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Cracked brickwork, mortar or previous repairs</dt>
                <dd>
                  Determine whether the line is stable, active or part of a
                  wider movement pattern. A new finish is not a substitute for
                  assessing the underlying wall.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Moisture, salts, staining or persistent damp</dt>
                <dd>
                  Water may come from several building or site conditions. The
                  source should be investigated before a new layer reduces the
                  visibility of the evidence.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Soft, fretted or damaged brick and mortar</dt>
                <dd>
                  Surface appearance alone cannot establish whether the
                  masonry provides a suitable base. Repair advice may need to
                  come before a decorative-finish decision.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Junctions, movement details and openings</dt>
                <dd>
                  Window and door edges, changes in material, additions and
                  documented joints need to remain coordinated with the
                  proposed finish rather than being treated as flat wall area.
                </dd>
              </div>
            </dl>
            <p>
              If cracking is the main concern, first use our {" "}
              <Link href="/resources/render-cracking-adelaide/">
                Adelaide render-cracking guide
              </Link>{" "}
              to document the pattern and identify when independent building,
              structural or geotechnical advice may be appropriate.
            </p>
            <p className="article-source">
              Source: {" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex/overview/acratex-facade-refurbishment/">
                Dulux AcraTex facade-refurbishment guidance
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="system-path">
          <div className="shell prose article-prose">
            <h2 id="system-path">
              The written specification should define the complete system
            </h2>
            <p>
              “Render over the paint” is not a complete scope. Depending on the
              assessed condition and chosen manufacturer system, the project
              may retain only suitable existing layers, require removal or
              remediation of incompatible areas, or need a different finish
              strategy. That decision should come from the wall condition and
              current system documents—not a generic preparation recipe.
            </p>
            <p>A useful written specification identifies:</p>
            <TickList
              items={[
                "The masonry and existing coating condition it assumes",
                "Who confirms substrate acceptance and by what documented criteria",
                "The extent and limits of preparation, removal and repairs",
                "The compatible primer, key coat, render, texture and topcoat sequence where applicable",
                "Treatment of cracks, joints, corners, openings and adjoining materials",
                "Application conditions and inspection points from current product data",
                "The selected texture, colour and any documented colour limitations",
                "Protection, waste handling, clean-up, care and handover responsibilities",
              ]}
            />
            <p>
              Dulux publishes separate substrate guides for clay brick, cement
              brick and block. Its AcraTex SuperTrowel page says previously
              painted surfaces depend on the project substrate and specified
              finish. This is why a product that can be used on one properly
              prepared painted surface does not become a universal approval
              for every painted wall.
            </p>
            <p className="article-source">
              Sources: {" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex/substrate-guides/">
                Dulux AcraTex substrate guides
              </a>
              , the {" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex-texture/acratex-super-trowel-2mm/">
                AcraTex SuperTrowel page
              </a>{" "}
              and the {" "}
              <a href="https://rockcote.com.au/wp-content/uploads/2020/09/Keycote_TDS_September2020.pdf">
                ROCKCOTE Keycote Technical Data Sheet (PDF)
              </a>
              .
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="safety-planning"
        >
          <div className="shell prose article-prose">
            <h2 id="safety-planning">
              Older paint, silica and planning checks belong in the scope
            </h2>
            <aside className="article-note article-note--warning">
              <strong>Do not treat surface preparation as a casual DIY test.</strong>
              <p>
                Disturbing unknown coatings or masonry can introduce hazards
                that cannot be identified from a photograph. The responsible
                contractor must plan the work and controls for the actual
                materials and process.
              </p>
            </aside>

            <h3>Lead-based paint</h3>
            <p>
              SA Health says properties built before 1980 are likely to contain
              lead-based paint and that damaged or disturbed lead paint can
              create an exposure risk. It strongly recommends qualified help
              for removal. Property age does not prove the coating on one wall,
              but it is a reason to identify the risk before preparation begins.
            </p>
            <p className="article-source">
              Source: {" "}
              <a href="https://www.sahealth.sa.gov.au/wps/wcm/connect/9d1caad2-c402-4327-b213-3b8e0319cf96/Managing%2Blead-based%2Bpaint%2Bfact%2Bsheet-final%2Bendorsed_October%2B2023.pdf?MOD=AJPERES">
                SA Health, <cite>Managing lead-based paint</cite> (PDF)
              </a>
              .
            </p>

            <h3>Respirable crystalline silica</h3>
            <p>
              SafeWork SA lists bricks, blocks, mortar and cement-based products
              as crystalline-silica substances. Mechanical cutting, grinding,
              sanding and similar processing can generate respirable dust, so
              regulated risk assessment and controls belong in the workplace
              safety plan. This guide does not prescribe a removal technique.
            </p>
            <p className="article-source">
              Source: {" "}
              <a href="https://safework.sa.gov.au/industry/construction/silica">
                SafeWork SA respirable crystalline silica guidance
              </a>
              .
            </p>

            <h3>Planning and heritage</h3>
            <p>
              Approval depends on the property and proposal. PlanSA directs
              owners to enter the address in the Planning and Design Code to
              see which rules and next steps apply. Heritage South Australia
              says changes within State Heritage Areas can require development
              approval and specifically includes alterations and external
              painting, subject to stated exemptions.
            </p>
            <p>
              Check the address before assuming an exterior change is exempt.
              For a heritage place or area, seek advice from the relevant
              planning authority before the finish is priced as approved work.
            </p>
            <p className="article-source">
              Sources: <a href="https://plan.sa.gov.au/">PlanSA</a> and {" "}
              <a href="https://www.environment.sa.gov.au/topics/heritage/owning-a-heritage-place/living-in-a-state-heritage-area">
                Heritage South Australia, living in a State Heritage Area
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="compare-quotes">
          <div className="shell prose article-prose">
            <h2 id="compare-quotes">
              Compare what each quotation assumes—not only the finish name
            </h2>
            <p>
              Two quotes can use similar language while allocating very
              different preparation, repair and risk responsibilities. Ask for
              assumptions and exclusions in writing so the prices describe
              comparable work.
            </p>
            <TickList
              items={[
                "Areas and elevations included, with access and protection responsibilities",
                "Known coating and masonry assumptions and information still required",
                "Who assesses substrate acceptance before the work starts",
                "Preparation, coating removal and repair scope, including excluded defects",
                "Exact specified system and every included layer",
                "Treatment of openings, joints, fixtures, services and adjoining finishes",
                "Lead, silica, waste and occupied-site controls where relevant",
                "Inspection, variations, clean-up, maintenance and handover documents",
              ]}
            />

            <h2 id="warranty-boundaries">
              Material and workmanship cover may not be the same
            </h2>
            <p>
              Manufacturer warranty eligibility can depend on the specified
              products, substrate suitability, number of coats, correct
              application, registration and certificate conditions. Ask which
              document applies to the proposed wall and who provides any
              separate workmanship cover. A headline period does not prove that
              an existing painted substrate, preparation and every trade are
              covered together.
            </p>
            <p className="article-source">
              Source: {" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex/overview/warranty/">
                Dulux AcraTex material warranty information
              </a>
              .
            </p>

            <h2 id="painted-brick-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="painted-brick-faqs">
              <div className="faq-list__item">
                <dt>Does all paint need to be removed before rendering?</dt>
                <dd>
                  There is no universal answer. Some documented systems allow
                  properly prepared painted surfaces, while unsuitable or
                  unstable layers may require a different approach. The wall
                  and selected system must be assessed together.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Can a photo confirm whether the paint is sound?</dt>
                <dd>
                  No. Photos can show visible condition and access, but cannot
                  establish the bond between hidden layers, identify every
                  coating or rule out moisture and masonry issues.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Will new render stop existing wall cracks?</dt>
                <dd>
                  A finish should not be treated as a structural repair. The
                  crack and underlying movement need an appropriate assessment
                  before a finish or repair system is selected.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Does rendering painted brick need council approval?</dt>
                <dd>
                  It depends on the address, applicable overlays and proposed
                  change. Use PlanSA’s address-based tools and seek advice from
                  the relevant planning authority, especially for heritage or
                  historic places and areas.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>What should I tell Elite Surface Group?</dt>
                <dd>
                  Tell us the suburb, property age if known, coating history,
                  affected elevations, access notes, proposed finish and what
                  dated photos are available. We can arrange how to review
                  supporting files, then identify what else is needed to
                  confirm whether the work sits within our scope.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>System and substrate guidance</dt>
                <dd>
                  <a href="https://www.dulux.com.au/specifier/products/acratex/substrate-guides/">
                    Dulux AcraTex substrate guides
                  </a>
                  , {" "}
                  <a href="https://www.dulux.com.au/specifier/products/acratex-texture/acratex-super-trowel-2mm/">
                    previously painted surface guidance
                  </a>{" "}
                  and {" "}
                  <a href="https://rockcote.com.au/wp-content/uploads/2020/09/Keycote_TDS_September2020.pdf">
                    ROCKCOTE Keycote technical data (PDF)
                  </a>
                </dd>
              </div>
              <div>
                <dt>South Australian safety guidance</dt>
                <dd>
                  <a href="https://www.sahealth.sa.gov.au/wps/wcm/connect/9d1caad2-c402-4327-b213-3b8e0319cf96/Managing%2Blead-based%2Bpaint%2Bfact%2Bsheet-final%2Bendorsed_October%2B2023.pdf?MOD=AJPERES">
                    SA Health lead-based paint fact sheet (PDF)
                  </a>{" "}
                  and {" "}
                  <a href="https://safework.sa.gov.au/industry/construction/silica">
                    SafeWork SA silica guidance
                  </a>
                </dd>
              </div>
              <div>
                <dt>Planning and heritage</dt>
                <dd>
                  <a href="https://plan.sa.gov.au/">PlanSA</a> and {" "}
                  <a href="https://www.environment.sa.gov.au/topics/heritage/owning-a-heritage-place/living-in-a-state-heritage-area">
                    Heritage South Australia
                  </a>
                </dd>
              </div>
            </dl>
            <p className="article-source">
              Source pages reviewed 13 August 2026. Check current product,
              safety and address-specific planning information before work
              begins.
            </p>

            <nav className="article-related" aria-label="Related pages">
              <Link href="/render/">Rendering services Adelaide</Link>
              <Link href="/resources/render-cracking-adelaide/">
                Render-cracking guide
              </Link>
              <Link href="/locations/adelaide/">Adelaide service area</Link>
              <Link href="/project-planning/">Plan a project enquiry</Link>
              <Link href="/resources/">More practical guides</Link>
              <Link href="/contact-us/#contact">Discuss your project</Link>
            </nav>
          </div>
        </section>
      </article>

      <ContactSection
        defaultService="Render"
        intro="Considering a rendered or textured finish over existing painted brick? Tell us the suburb, coating history and what dated photos or elevation details are available. If supporting files are needed, we’ll arrange how to review them."
      />
      <CtaBand />
    </>
  );
}
