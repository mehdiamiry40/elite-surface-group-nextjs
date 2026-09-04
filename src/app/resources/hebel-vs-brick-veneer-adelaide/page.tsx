import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { hebelVsBrickVeneerGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: hebelVsBrickVeneerGuide.metaTitle,
  description: hebelVsBrickVeneerGuide.metaDescription,
  path: `/resources/${hebelVsBrickVeneerGuide.slug}`,
  image: ogCard("hebel", "Hebel wall installation services in Adelaide"),
  openGraphType: "article",
  publishedTime: hebelVsBrickVeneerGuide.published,
  modifiedTime: hebelVsBrickVeneerGuide.modified,
});

export default function HebelVsBrickVeneerGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Hebel vs brick veneer",
            href: `/resources/${hebelVsBrickVeneerGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={hebelVsBrickVeneerGuide} />

      <article>
        <PageBanner
          title={hebelVsBrickVeneerGuide.title}
          image={bannerImages[`/resources/${hebelVsBrickVeneerGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Hebel vs brick veneer" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{hebelVsBrickVeneerGuide.category}</span>
              <time dateTime={hebelVsBrickVeneerGuide.published}>
                Published {hebelVsBrickVeneerGuide.publishedDisplay}
              </time>
              <span>{hebelVsBrickVeneerGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              Hebel vs brick veneer is not a question with one universal
              winner for every Adelaide new build. Hebel—autoclaved aerated
              concrete (AAC) panels supplied by CSR—is lighter and typically
              faster to close in than clay brick veneer, while brick veneer
              is a long-established, widely understood system with its own
              documented design rules. The better fit depends on the
              site&rsquo;s soil, its bushfire and coastal exposure, and the
              wall
              performance the design actually calls for.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>Selection and compliance sit outside installation.</strong>
              <p>
                Elite Surface Group installs the wall system specified for a
                project. Confirming site classification, footing design, a
                Bushfire Attack Level (BAL) rating or planning consent is a
                designer, structural engineer, geotechnical professional or
                building surveyor&rsquo;s role. Arrange that assessment before
                relying on this guide to choose a system.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#what-differs">What actually differs</a>
                </li>
                <li>
                  <a href="#footings">Reactive clay soils and footings</a>
                </li>
                <li>
                  <a href="#bushfire">Bushfire-prone zoning</a>
                </li>
                <li>
                  <a href="#coastal">Coastal salt exposure</a>
                </li>
                <li>
                  <a href="#programme">Build programme and sequencing</a>
                </li>
                <li>
                  <a href="#confirm-first">What to confirm first</a>
                </li>
                <li>
                  <a href="#hebel-brick-faqs">Common questions</a>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section className="section" aria-labelledby="what-differs">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={hebelVsBrickVeneerGuide.image}
                alt={hebelVsBrickVeneerGuide.imageAlt}
                width={hebelVsBrickVeneerGuide.imageWidth}
                height={hebelVsBrickVeneerGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(hebelVsBrickVeneerGuide.image)}
              />
              <figcaption>{hebelVsBrickVeneerGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Two established systems</span>
              <h2 id="what-differs">
                Hebel vs brick veneer: what actually differs
              </h2>
              <p>
                Hebel® is CSR Building Products&rsquo; trademark for
                autoclaved aerated concrete, a factory-cured mix of cement,
                lime, sand and an aerating agent that is cut into panels or
                blocks and reinforced with anti-corrosion-coated steel for
                external wall applications. CSR describes AAC as lighter than
                brick and highlights its thermal, acoustic and
                non-combustible properties.
              </p>
              <p>
                Brick veneer is a timber or steel-framed wall with a single
                skin of clay brick fixed to the frame with wall ties, leaving
                a cavity between the brick and the sarking. It is governed in
                the National Construction Code&rsquo;s Housing Provisions as
                its own masonry category, with its own tie, cavity, damp-proofing
                and weatherproofing rules.
              </p>
              <p>
                Both are proven systems used across Adelaide, and neither is
                automatically &ldquo;better&rdquo;: the frame behind either
                wall still needs its own engineering, and the available
                finish, colour and texture differ between the two.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://hebel.com.au/aac/">
                  CSR Hebel, Autoclaved Aerated Concrete
                </a>{" "}
                and{" "}
                <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/5-masonry/part-52-masonry-veneer">
                  ABCB, NCC Housing Provisions Part 5.2 Masonry veneer
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="footings"
        >
          <div className="shell prose article-prose">
            <h2 id="footings">Reactive clay soils and footing design</h2>
            <p>
              Much of the Adelaide Plains sits on reactive clay that swells
              as it wets and shrinks as it dries, and South Australian
              guidance identifies that seasonal soil movement as a frequent
              contributor to masonry cracking in buildings founded on it.
              Wall weight is one of several inputs a structural engineer
              weighs when sizing footings for a given site classification—
              lighter AAC construction is not automatically exempt from
              reactive-soil risk, and a heavier brick veneer wall is not
              automatically unsuitable for it. The soil report and the
              engineer&rsquo;s footing design govern the outcome, not the
              wall material on its own, so treat this as a site-specific
              engineering decision rather than a general preference.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://cdn.environment.sa.gov.au/environment/docs/tech_note3_1.pdf">
                South Australian Department for Environment and Heritage,{" "}
                <cite>
                  Maintenance and Repair of Older Buildings in South Australia
                </cite>
              </a>{" "}
              and{" "}
              <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                CSIRO,{" "}
                <cite>Foundation Maintenance and Footing Performance</cite>
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="bushfire">
          <div className="shell prose article-prose">
            <h2 id="bushfire">Bushfire-prone zoning changes the detailing</h2>
            <p>
              Parts of metropolitan Adelaide sit inside a designated
              bushfire-prone area, most visibly through the Hills Face Zone
              and the wider Adelaide Hills, and some outer suburban fringes
              carry the same overlay. A property inside it may need a
              site-specific Bushfire Attack Level (BAL) assessment under AS
              3959 before either wall system is finalised against the
              NCC&rsquo;s construction requirements for that rating.
            </p>
            <p>
              CSR publishes bushfire guidance stating its Hebel wall and
              panel systems are designed to meet the requirements of the
              relevant BAL categories, reflecting AAC&rsquo;s
              non-combustible composition. Clay brick is also
              non-combustible, but a veneer wall&rsquo;s compliance still
              depends on the frame, sarking, cavity detailing, openings and
              junctions behind the brick skin, which need to be assessed and
              detailed to the assessed BAL rating just as they would for any
              other cladding.
            </p>
            <aside className="article-note article-note--warning">
              <strong>Arrange a BAL assessment, don&rsquo;t assume one.</strong>
              <p>
                If a site sits within a bushfire overlay, ask the project
                designer or a bushfire consultant to confirm the assessed BAL
                rating before either wall system is chosen. This guide does
                not determine a rating or certify compliance.
              </p>
            </aside>
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/bushfire">
                SA.GOV.AU, Bushfire building regulations
              </a>
              ,{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-one/g-ancillary-provisions/part-g5-construction-bushfire-prone-areas">
                ABCB, NCC Part G5 Construction in bushfire-prone areas
              </a>{" "}
              and{" "}
              <a href="https://hebel.com.au/resources/building-bushfire-zone/">
                CSR Hebel, Bushfire Building BAL Compliance Guide
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="coastal">
          <div className="shell prose article-prose">
            <h2 id="coastal">
              Coastal salt exposure near Adelaide&rsquo;s beaches
            </h2>
            <p>
              Suburbs such as Semaphore, Grange, Henley Beach, Glenelg and
              Brighton sit close enough to the coast that airborne salt can
              accelerate corrosion of exposed metal fixings faster than an
              inland suburb of the same age. Brick veneer relies on wall
              ties that the NCC&rsquo;s masonry components and accessories
              provisions require to suit the building&rsquo;s durability
              class and exposure; a tie rated for a standard environment is
              not automatically suitable close to the surf. Hebel panels use
              their own manufacturer-specified steel fixings and
              anti-corrosion-coated reinforcement—so the same principle
              applies: confirm the fixing specification against the
              property&rsquo;s actual coastal distance, not the suburb name.
            </p>
            <TickList
              items={[
                "The property's approximate distance from active surf or salt-laden air",
                "Whether the selected system's documentation sets closer coastal conditions or durability class",
                "Wall ties, fixings and flashings rated for that exposure category",
                "A realistic inspection routine for exposed metal components and joints",
              ]}
            />
            <p className="article-source">
              Source:{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/5-masonry/part-56-masonry-components-and-accessories">
                ABCB, NCC Housing Provisions Part 5.6 Masonry components and
                accessories
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="programme">
          <div className="shell prose article-prose">
            <h2 id="programme">Build programme and site sequencing</h2>
            <p>
              Large-format AAC panels close in more wall area per lift than
              individual clay bricks laid and jointed one at a time, and
              manufacturer literature generally presents Hebel panel
              construction as a faster path to lock-up than traditional brick
              veneer. Brick veneer, in turn, is a familiar trade for most
              Adelaide builders, with well-established supply chains and
              bricklaying crews.
            </p>
            <p>
              Treat any programme comparison as indicative only. The actual
              time difference depends on wall area, layout, openings,
              weather and trade availability, so ask each business quoting
              the work for its documented programme for the specific design.
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="confirm-first"
        >
          <div className="shell prose article-prose">
            <h2 id="confirm-first">
              What to confirm before the wall system is locked in
            </h2>
            <p>
              A useful Hebel vs brick veneer decision rests on
              project-specific documents, not a general comparison. Before
              committing, confirm the following with the designer, engineer
              or building surveyor.
            </p>
            <ol className="steps">
              <li>
                <h3>Get the soil classification and footing design</h3>
                <p>
                  Confirm the site&rsquo;s soil classification and let the
                  structural engineer size footings for the actual wall
                  system chosen, rather than assuming a lighter system needs
                  no engineering attention.
                </p>
              </li>
              <li>
                <h3>Confirm the bushfire overlay status</h3>
                <p>
                  Check whether the site sits within a designated
                  bushfire-prone area, and if so, obtain the assessed BAL
                  rating before either system is finalised.
                </p>
              </li>
              <li>
                <h3>Match fixings and ties to the coastal distance</h3>
                <p>
                  Confirm the manufacturer&rsquo;s durability requirements
                  and recommended fixings against the property&rsquo;s actual
                  distance from the coast.
                </p>
              </li>
              <li>
                <h3>Read the current technical and warranty documents</h3>
                <p>
                  Panel or brick specification, coating or mortar
                  requirements, and warranty terms are set by the specific
                  product selected and change between manufacturers and
                  systems.
                </p>
              </li>
              <li>
                <h3>Check whether council or PlanSA approval applies</h3>
                <p>
                  Confirm current development approval requirements for the
                  project on the PlanSA portal or with the local council
                  before ordering material.
                </p>
              </li>
            </ol>
            <p>
              Our{" "}
              <Link href="/project-planning/">project-planning guide</Link>{" "}
              covers the wider information that helps turn an early wall-system
              question into a clear installation scope, and our{" "}
              <Link href="/projects/">project case studies</Link> show
              completed cladding, render and Hebel work across Adelaide.
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

        <section className="section" aria-labelledby="hebel-brick-faqs">
          <div className="shell prose article-prose">
            <h2 id="hebel-brick-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="hebel-brick-faqs">
              <div className="faq-list__item">
                <dt>Is Hebel cheaper than brick veneer?</dt>
                <dd>
                  It depends on the design, wall area, openings, finish and
                  each supplier&rsquo;s current pricing—there is no fixed
                  percentage difference we can quote in general. Ask for
                  itemised pricing on the actual drawings for a like-for-like
                  comparison.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>
                  Does a lighter wall system mean smaller footings?
                </dt>
                <dd>
                  Not automatically. Wall weight is one input among several
                  the structural engineer considers alongside soil
                  classification, building height and loads. Let the
                  engineer&rsquo;s footing design decide, rather than
                  assuming a lighter system needs less engineering.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Can a home mix Hebel and brick veneer?</dt>
                <dd>
                  Yes—many Adelaide designs combine cladding, render, Hebel
                  and masonry across different elevations or feature areas.
                  The junctions between systems need their own documented
                  detailing, so confirm those details with the designer
                  before work begins.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>
                  Can Elite Surface Group choose the wall system for us?
                </dt>
                <dd>
                  No. Wall-system selection depends on soil conditions,
                  bushfire zoning, coastal exposure, budget and design
                  intent, which sit with the project&rsquo;s designer,
                  engineer or the homeowner. We install the documented
                  system and can discuss coordination once that selection is
                  confirmed.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>CSR Hebel</dt>
                <dd>
                  <a href="https://hebel.com.au/aac/">
                    Autoclaved Aerated Concrete
                  </a>{" "}
                  and{" "}
                  <a href="https://hebel.com.au/resources/building-bushfire-zone/">
                    Bushfire Building BAL Compliance Guide
                  </a>
                </dd>
              </div>
              <div>
                <dt>Australian Building Codes Board</dt>
                <dd>
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/5-masonry/part-52-masonry-veneer">
                    NCC Housing Provisions Part 5.2 Masonry veneer
                  </a>
                  ,{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/5-masonry/part-56-masonry-components-and-accessories">
                    Part 5.6 Masonry components and accessories
                  </a>{" "}
                  and{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-one/g-ancillary-provisions/part-g5-construction-bushfire-prone-areas">
                    NCC Part G5 Construction in bushfire-prone areas
                  </a>
                </dd>
              </div>
              <div>
                <dt>South Australian Department for Environment and Heritage</dt>
                <dd>
                  <a href="https://cdn.environment.sa.gov.au/environment/docs/tech_note3_1.pdf">
                    <cite>
                      Maintenance and Repair of Older Buildings in South
                      Australia
                    </cite>{" "}
                    (PDF)
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
                <dt>SA.GOV.AU and PlanSA</dt>
                <dd>
                  <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/bushfire">
                    Bushfire building regulations
                  </a>{" "}
                  and{" "}
                  <a href="https://plan.sa.gov.au/development_applications/getting_approval">
                    Getting approval
                  </a>
                </dd>
              </div>
            </dl>
            <p className="article-source">
              Source pages reviewed 4 September 2026. Always check the
              current product, project and regulatory documents before work
              begins.
            </p>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/hebel/">Hebel installation in Adelaide</Link>
              <Link href="/resources/hebel-boundary-walls-adelaide/">
                Hebel boundary-wall planning guide
              </Link>
              <Link href="/projects/">Cladding and render case studies</Link>
              <Link href="/locations/adelaide/">Adelaide service area</Link>
              <Link href="/contact-us/#contact">
                Discuss the available project details
              </Link>
            </nav>
          </div>
        </section>
      </article>

      <ContactSection
        defaultService="Hebel"
        intro="Weighing up Hebel and brick veneer for a new build? Tell us the suburb, project type and what drawings are available. We can arrange how to review supporting files and confirm the installation scope."
      />
      <CtaBand />
    </>
  );
}
