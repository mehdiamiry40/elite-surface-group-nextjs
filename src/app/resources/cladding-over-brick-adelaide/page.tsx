import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { claddingOverBrickGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: claddingOverBrickGuide.metaTitle,
  description: claddingOverBrickGuide.metaDescription,
  path: `/resources/${claddingOverBrickGuide.slug}`,
  image: ogCard("cladding", claddingOverBrickGuide.metaTitle),
  openGraphType: "article",
  publishedTime: claddingOverBrickGuide.published,
  modifiedTime: claddingOverBrickGuide.modified,
});

export default function CladdingOverBrickGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Cladding over brick",
            href: `/resources/${claddingOverBrickGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={claddingOverBrickGuide} />

      <article>
        <PageBanner
          title={claddingOverBrickGuide.title}
          image={bannerImages[`/resources/${claddingOverBrickGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Cladding over brick" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{claddingOverBrickGuide.category}</span>
              <time dateTime={claddingOverBrickGuide.published}>
                Published {claddingOverBrickGuide.publishedDisplay}
              </time>
              <span>{claddingOverBrickGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              Cladding over brick changes a house completely from the street
              without touching the structure, which is most of its appeal. The
              complication is that the wall being covered already sheds water on
              its own, and a new skin either works with those details or quietly
              undermines them. The decisions that matter get made before a
              single board goes up: what the wall behind actually is, whether
              the cladding sits on battens or hard against the masonry, and
              where the new surface lands at every window, eave and downpipe.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>
                Fixing into existing masonry is an engineering question.
              </strong>
              <p>
                The condition of the brickwork, the fixings that suit it,
                weatherproofing and any fire or combustibility requirement are
                determined for your building by a suitably qualified
                professional, not by a product brochure. Arrange assessment
                before a system is locked in. We install and finish cladding to
                a documented specification; we do not certify structures.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#wall-behind">Start with the wall you have</a>
                </li>
                <li>
                  <a href="#direct-fix">Direct fix or a drained cavity</a>
                </li>
                <li>
                  <a href="#adelaide">What Adelaide conditions change</a>
                </li>
                <li>
                  <a href="#junctions">The junctions decide the result</a>
                </li>
                <li>
                  <a href="#approvals">Approvals, scope and who owns what</a>
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
          aria-labelledby="wall-behind"
        >
          <div className="shell prose article-prose">
            <h2 id="wall-behind">Start with the wall you have</h2>
            <p>
              Two very different walls get called &ldquo;brick&rdquo; in
              Adelaide, and they behave differently once something is fixed to
              them.
            </p>
            <h3>Brick veneer</h3>
            <p>
              Most homes built across the northern and southern suburbs from the
              1960s onward are brick veneer: a single leaf of masonry standing
              off a timber or steel frame, with a drained cavity between them
              and weepholes at the bottom. The frame carries the roof; the brick
              carries itself.
            </p>
            <h3>Solid double brick</h3>
            <p>
              Inner suburbs&mdash;Prospect, Norwood, Unley, parts of Semaphore
              and Port Adelaide&mdash;hold a lot of pre-war solid masonry, where
              two leaves of brickwork do the structural work and there is no
              frame at all. Everything fixes into the masonry, so mortar
              condition, previous repointing and the state of the damp-proof
              course matter more than the cladding product.
            </p>
            <p>
              Wall thickness at a window reveal, weepholes near the ground and
              the age of the house usually point to which you have. Treat that
              as a starting point, not a diagnosis.
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="direct-fix">
          <div className="shell prose article-prose">
            <h2 id="direct-fix">
              Cladding over brick: direct fix or a drained cavity?
            </h2>
            <p>
              Manufacturer literature for fixing cladding to existing masonry
              splits into two methods, and the choice affects more than labour.
            </p>
            <TickList
              items={[
                "Direct fix—the cladding is fastened to the masonry or to shallow furring, keeping the build-up thin",
                "Cavity fix—vertical battens or a proprietary cavity trim create a drained, ventilated space behind the boards",
                "A weather barrier usually sits in front of the brickwork and behind the battens",
                "Fixing type, batten depth and spacing come from the system documents for that substrate and wind classification",
              ]}
            />
            <p>
              James Hardie&rsquo;s technical supplement for external cladding
              over brick walls installs a vertical cavity trim over the masonry
              to replicate a stud frame, with a weather barrier in front of the
              brick and behind the trim. Weathertex splits its over-brick and
              veneer construction details into direct fix and cavity
              installation, and recommends the cavity method. Read the detail
              for the product being quoted; one system&rsquo;s method does not
              transfer.
            </p>
            <p>
              Part 7.5 of the NCC Housing Provisions sets out deemed-to-satisfy
              fixing provisions for timber and composite wall cladding,
              including cladding fixed through battens attached to the wall
              frame with a minimum penetration into it. A brick wall is not a
              wall frame, so over masonry the specification comes back to the
              manufacturer&rsquo;s documented system and its certification. Ask
              the certifier which pathway the job is assessed under before
              battens are ordered.
            </p>
            <h3>The membrane is not an optional extra</h3>
            <p>
              A cavity adds a condensation question. Where a pliable building
              membrane is installed in an external wall, Part 10.8 requires it
              to comply with AS 4200.1, be installed to AS 4200.2 and sit on the
              exterior side of the primary insulation layer. A membrane, sarking
              or insulation layer on that exterior side must have a vapour
              permeance of not less than 0.143&nbsp;&micro;g/N&middot;s in
              climate zones 4 and 5. Adelaide is climate zone 5, so that figure
              applies here&mdash;a property of the product, not a site decision.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.jameshardie.com.au/ContentfulCMS/Technical-Library/JH_External_Cladding_over_Brick_Walls_with_Scyon_Cavity_Trim_Technical_supplement.pdf">
                James Hardie,{" "}
                <cite>
                  External Cladding over Brick Walls with Scyon Cavity Trim
                </cite>{" "}
                technical supplement (PDF)
              </a>
              ,{" "}
              <a href="https://weathertex.com.au/construction-details/">
                Weathertex construction details
              </a>
              ,{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/7-roof-and-wall-cladding/part-75-timber-and-composite-wall-cladding">
                NCC 2022 Housing Provisions, Part 7.5 Timber and composite wall
                cladding
              </a>{" "}
              and{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/10-health-and-amenity/part-108-condensation-management">
                Part 10.8 Condensation management
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="adelaide">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={claddingOverBrickGuide.image}
                alt={claddingOverBrickGuide.imageAlt}
                width={claddingOverBrickGuide.imageWidth}
                height={claddingOverBrickGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(claddingOverBrickGuide.image)}
              />
              <figcaption>{claddingOverBrickGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Local context</span>
              <h2 id="adelaide">What Adelaide conditions change</h2>
              <p>
                Reactive clay soils run across much of the Adelaide plains and
                move seasonally, and that movement reaches brickwork through the
                footing. Cladding hides an existing crack; it does not change
                what caused it. If the wall is still moving, the movement turns
                up at the cladding joints instead. Our{" "}
                <Link href="/resources/render-cracking-adelaide/">
                  guide to cracking in wall finishes
                </Link>{" "}
                covers what to record, and CSIRO&rsquo;s footing guidance
                explains why the movement happens.
              </p>
              <p>
                Older solid-brick homes bring a second problem. Salt damp draws
                moisture up through masonry, and covering a damp wall with
                battens, a membrane and boards gives it fewer ways out while
                making the wall harder to inspect. Where there are powdery
                deposits or crumbling mortar near the base, the source comes
                first&mdash;our{" "}
                <Link href="/resources/salt-damp-adelaide/">
                  salt damp guide
                </Link>{" "}
                sets out what gets assessed.
              </p>
              <p>
                Exposure then shapes the material and the fixings. Salt-laden
                air at Semaphore, Glenelg and Brighton is harder on fasteners
                and coatings than an inland suburb, and durability requirements
                follow the exposure category, not the postcode. On the Hills
                Face side of town, bushfire-prone designation adds its own
                requirements&mdash;our{" "}
                <Link href="/resources/fibre-cement-vs-weatherboard-cladding-adelaide/">
                  cladding comparison guide
                </Link>{" "}
                explains how that zoning is confirmed, and the{" "}
                <Link href="/resources/cladding-maintenance-coastal-adelaide/">
                  coastal maintenance guide
                </Link>{" "}
                covers the upkeep that follows.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                  CSIRO,{" "}
                  <cite>Foundation Maintenance and Footing Performance</cite>{" "}
                  (PDF)
                </a>
                ,{" "}
                <a href="https://cdn.environment.sa.gov.au/environment/docs/saltdamp_techguide.pdf">
                  Government of South Australia,{" "}
                  <cite>Salt attack and rising damp</cite> (PDF)
                </a>{" "}
                and{" "}
                <a href="https://www.abcb.gov.au/resource/map/climate-zone-map-sa">
                  ABCB climate zone map, South Australia
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="junctions">
          <div className="shell prose article-prose">
            <h2 id="junctions">The junctions decide the result</h2>
            <p>
              A clad wall is thicker than the brick wall by the batten depth
              plus the board. Every item that meets it has to be resolved on
              paper first: window and door reveals, the eaves soffit, the meter
              box, garden taps, downpipe brackets and any air-conditioning
              penetration.
            </p>
            <p>
              Two existing details deserve particular care. Weepholes above
              flashings drain the cavity behind the brickwork, and the
              damp-proof course separates the wall from the soil. Part 5.7 of
              the Housing Provisions requires those weepholes above any
              flashing, and sets out sill and head flashings extending beyond
              the reveals of openings. A batten screwed across a weephole, or
              cladding run down past the damp-proof course into a garden bed,
              defeats details the house already has.
            </p>
            <p>
              Existing articulation joints should carry through the new surface
              rather than be covered over, and the{" "}
              <Link href="/projects/dark-feature-cladding/">
                dark feature cladding case study
              </Link>{" "}
              shows how much the joint layout and corners carry the finished
              look.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/5-masonry/part-57-weatherproofing-masonry">
                NCC 2022 Housing Provisions, Part 5.7 Weatherproofing of masonry
              </a>{" "}
              and{" "}
              <a href="https://www.yourhome.gov.au/materials/cladding-systems">
                Australian Government, Your Home, cladding systems
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="approvals">
          <div className="shell prose article-prose">
            <h2 id="approvals">Approvals, scope and who owns what</h2>
            <p>
              In South Australia, whether planning consent is needed depends on
              how the work is categorised. Some work proceeds as accepted
              development with building consent only, but that category has
              exceptions&mdash;heritage areas and the Hills Face Zone among
              them&mdash;and re-cladding changes a building&rsquo;s external
              appearance, which is what a character or heritage overlay
              concerns. Check the position for your allotment before material is
              ordered.
            </p>
            <p>
              Boundary proximity is the constraint people miss. The NCC&rsquo;s
              South Australian provisions set fire-separation requirements for
              external walls close to an allotment boundary, which on a narrow
              allotment can decide what one elevation may be clad in while the
              other three are unaffected.
            </p>
            <p>
              Then settle the scope in writing. The usual gaps are small items:
              who removes and reinstates the downpipes, meter box and taps; who
              supplies the battens, fixings and weather barrier; who flashes the
              windows; and who makes good where the new surface meets the eaves.
              Our <Link href="/cladding/">Adelaide cladding installation</Link>{" "}
              and <Link href="/render/">render services</Link> work to whichever
              split the contract sets,{" "}
              <Link href="/project-planning/">our project planning notes</Link>{" "}
              list what is useful to have ready before quoting, and the{" "}
              <Link href="/locations/adelaide/">
                Adelaide service area page
              </Link>{" "}
              covers where we work.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval">
                PlanSA, find out if you need approval
              </a>{" "}
              and{" "}
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
                <h3>Confirm what the wall is</h3>
                <p>
                  Brick veneer or solid masonry decides where the cladding loads
                  go, so have it established rather than assumed, and the mortar
                  and any damp checked too.
                </p>
              </li>
              <li>
                <h3>Photograph and measure every junction</h3>
                <p>
                  Windows, eaves, meter box, taps, downpipes and ground levels.
                  The extra wall thickness lands on all of them.
                </p>
              </li>
              <li>
                <h3>Ask for the system documents</h3>
                <p>
                  Request the installation guide and certification for the
                  product and over-masonry method proposed, then check the
                  quoted build-up matches them.
                </p>
              </li>
              <li>
                <h3>Check the approval pathway early</h3>
                <p>
                  Confirm the development category and any overlay on your
                  allotment before committing to a material or a programme.
                </p>
              </li>
            </ol>

            <aside className="article-note article-note--warning">
              <strong>Cutting and working at height are both regulated.</strong>
              <p>
                Dry-cutting or grinding fibre cement, brick and mortar can
                generate respirable crystalline silica, which is regulated in
                South Australia, and most re-cladding works above single-storey
                height. Confirm how dust and fall risks will be controlled
                before work starts.
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
          aria-labelledby="cladding-brick-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="cladding-brick-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="cladding-brick-faqs">
              <div className="faq-list__item">
                <dt>Is cladding over brick better than rendering it?</dt>
                <dd>
                  They solve different problems. Render bonds to the masonry and
                  follows its movement; cladding stands off it and changes the
                  facade&rsquo;s form as well as its colour. For a clean painted
                  surface on sound brickwork, render is usually simpler. Where
                  the design calls for profile or shadow lines, cladding earns
                  the extra build-up.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Can cladding fix a damp or cracking brick wall?</dt>
                <dd>
                  No. It covers the symptom and makes the wall harder to
                  inspect. Have the moisture source or the movement assessed and
                  addressed first, then treat the cladding as a finish decision.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Can insulation be added at the same time?</dt>
                <dd>
                  A new cavity is an opportunity, but it has to be designed
                  rather than filled opportunistically: membrane, insulation and
                  drainage interact, and the condensation provisions apply to
                  the whole assembly.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Does the cladding have to cover the whole house?</dt>
                <dd>
                  No. Cladding one elevation or a feature area and rendering the
                  rest is common, provided the transition between the finishes
                  is detailed rather than left to the day.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>Australian Building Codes Board</dt>
                <dd>
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/7-roof-and-wall-cladding/part-75-timber-and-composite-wall-cladding">
                    NCC 2022 Housing Provisions, Part 7.5 Timber and composite
                    wall cladding
                  </a>
                  ,{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/5-masonry/part-57-weatherproofing-masonry">
                    Part 5.7 Weatherproofing of masonry
                  </a>
                  ,{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/10-health-and-amenity/part-108-condensation-management">
                    Part 10.8 Condensation management
                  </a>
                  ,{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/8-south-australia/92-fire-separation-external-walls">
                    Part 9.2 Fire separation of external walls (South Australia)
                  </a>{" "}
                  and the{" "}
                  <a href="https://www.abcb.gov.au/resource/map/climate-zone-map-sa">
                    South Australian climate zone map
                  </a>
                </dd>
              </div>
              <div>
                <dt>James Hardie</dt>
                <dd>
                  <a href="https://www.jameshardie.com.au/ContentfulCMS/Technical-Library/JH_External_Cladding_over_Brick_Walls_with_Scyon_Cavity_Trim_Technical_supplement.pdf">
                    <cite>
                      External Cladding over Brick Walls with Scyon Cavity Trim
                    </cite>{" "}
                    technical supplement (PDF)
                  </a>{" "}
                  and{" "}
                  <a href="https://www.jameshardie.com.au/fibre-cement">
                    fibre cement product information
                  </a>
                </dd>
              </div>
              <div>
                <dt>Weathertex</dt>
                <dd>
                  <a href="https://weathertex.com.au/construction-details/">
                    Construction details
                  </a>{" "}
                  and{" "}
                  <a href="https://weathertex.com.au/faqs/">
                    frequently asked questions
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
                  <a href="https://cdn.environment.sa.gov.au/environment/docs/saltdamp_techguide.pdf">
                    <cite>
                      Salt attack and rising damp: a guide to salt damp in
                      historic and older buildings
                    </cite>{" "}
                    (PDF)
                  </a>
                  ,{" "}
                  <a href="https://safework.sa.gov.au/industry/construction/silica">
                    SafeWork SA, silica in construction
                  </a>{" "}
                  and{" "}
                  <a href="https://safework.sa.gov.au/industry/construction/working-at-heights">
                    working at heights
                  </a>
                </dd>
              </div>
              <div>
                <dt>Australian Government</dt>
                <dd>
                  <a href="https://www.yourhome.gov.au/materials/cladding-systems">
                    Your Home, cladding systems
                  </a>
                </dd>
              </div>
            </dl>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/cladding/">Adelaide cladding installation</Link>
              <Link href="/resources/cladding-maintenance-coastal-adelaide/">
                Coastal cladding maintenance guide
              </Link>
              <Link href="/resources/salt-damp-adelaide/">Salt damp guide</Link>
              <Link href="/project-planning/">Project planning notes</Link>
              <Link href="/contact-us/#contact">
                Discuss the available project details
              </Link>
            </nav>
          </div>
        </section>
      </article>

      <ContactSection
        defaultService="Cladding"
        intro="If you are considering cladding over an existing brick wall, tell us the suburb, the age of the house and what the wall is. Photographs of the elevations, the eaves and the ground line help us scope the work accurately."
      />
      <CtaBand />
    </>
  );
}
