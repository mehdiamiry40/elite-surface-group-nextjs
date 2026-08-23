import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { steelVsTimberFramingGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: steelVsTimberFramingGuide.metaTitle,
  description: steelVsTimberFramingGuide.metaDescription,
  path: `/resources/${steelVsTimberFramingGuide.slug}`,
  image: ogCard("walling", "Internal and external walling in Adelaide"),
  openGraphType: "article",
  publishedTime: steelVsTimberFramingGuide.published,
  modifiedTime: steelVsTimberFramingGuide.modified,
});

export default function SteelVsTimberFramingGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Steel vs timber wall framing",
            href: `/resources/${steelVsTimberFramingGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={steelVsTimberFramingGuide} />

      <article>
        <PageBanner
          title={steelVsTimberFramingGuide.title}
          image={bannerImages[`/resources/${steelVsTimberFramingGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Steel vs timber wall framing" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="framing-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{steelVsTimberFramingGuide.category}</span>
              <time dateTime={steelVsTimberFramingGuide.published}>
                Published {steelVsTimberFramingGuide.publishedDisplay}
              </time>
              <span>{steelVsTimberFramingGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="framing-summary">The short answer</h2>
            <p className="article-lead">
              Steel frame vs timber frame walls is not a single right answer
              for every Adelaide project. Both are common, standards-based
              framing choices, and the better fit depends on termite
              exposure, how close the site sits to the coast, whether it
              falls in a bushfire-prone area, and what the structural design
              and budget already assume. The documented system—not a general
              preference—should decide the framing material.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>Design decision, not an installer decision.</strong>
              <p>
                Elite Surface Group installs the wall framing specified on
                the approved drawings. Choosing between steel and timber,
                confirming span tables or engineering, and any bushfire or
                structural assessment sit with the project&rsquo;s designer,
                engineer or building surveyor. Arrange that assessment before
                relying on this guide to make the decision.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#what-differs">Steel vs timber: what differs</a>
                </li>
                <li>
                  <a href="#termites">Termite exposure</a>
                </li>
                <li>
                  <a href="#coastal-corrosion">Coastal corrosion</a>
                </li>
                <li>
                  <a href="#reactive-clay">Reactive clay and footings</a>
                </li>
                <li>
                  <a href="#bushfire">Bushfire-prone zoning</a>
                </li>
                <li>
                  <a href="#confirm-first">What to confirm first</a>
                </li>
                <li>
                  <a href="#framing-faqs">Common questions</a>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="what-differs">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={steelVsTimberFramingGuide.image}
                alt={steelVsTimberFramingGuide.imageAlt}
                width={steelVsTimberFramingGuide.imageWidth}
                height={steelVsTimberFramingGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(steelVsTimberFramingGuide.image)}
              />
              <figcaption>{steelVsTimberFramingGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Two standards-based systems</span>
              <h2 id="what-differs">
                Steel frame vs timber frame walls: what actually differs
              </h2>
              <p>
                For Class 1 and 10 buildings, NCC H1D6 recognises several
                Deemed-to-Satisfy framing pathways. Timber framing may use
                AS 1684.2 or AS 1684.4 in non-cyclonic areas, or another
                standard listed by H1D6 where applicable. The selected
                pathway must cover the complete frame—including loads,
                bracing, tie-downs, connections, member sizes and construction
                details—not only the wind classification and span tables.
              </p>
              <p>
                For residential and low-rise steel framing, H1D6 recognises
                NASH Standard Part 1 design criteria and NASH Standard Part 2
                design solutions, as well as AS 4100 and AS/NZS 4600 where
                applicable. Confirm which pathway the engineer or proprietary
                system uses and that its scope, member data, bracing,
                connections and corrosion protection suit the project.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-two/h-class-1-and-10-buildings/part-h1-structure">
                  ABCB, NCC H1D6 Framing
                </a>{" "}
                and{" "}
                <a href="https://www.woodsolutions.com.au/resources/standards-codes/as1684-code-compliance">
                  WoodSolutions, AS 1684 code compliance
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="termites">
          <div className="shell prose article-prose">
            <h2 id="termites">Termite exposure across Adelaide</h2>
            <p>
              NCC Part 3.4 applies where subterranean termites are a known
              potential risk and a primary building element is susceptible to
              attack. Steel, fibre-reinforced cement, specified naturally
              termite-resistant timber and specified preservative-treated
              timber are treated as not subject to termite attack. Where a
              building mixes susceptible and non-susceptible primary
              elements, only the susceptible primary elements require a
              compliant termite-management system.
            </p>
            <p>
              The scope is therefore project-specific. Do not assume every
              timber component in a wall is covered by Part 3.4 simply because
              it is timber, or that location alone settles the risk. Confirm
              the local termite risk, which primary building elements are
              susceptible, the documented system boundaries and any required
              notices, inspection and maintenance with the designer or
              relevant authority.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/3-site-preparation/part-34-termite-risk-management">
                ABCB, NCC Housing Provisions Part 3.4 Termite risk management
              </a>
              .
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="coastal-corrosion"
        >
          <div className="shell prose article-prose">
            <h2 id="coastal-corrosion">
              Coastal corrosion class matters for steel framing
            </h2>
            <p>
              Coastal exposure is not determined by suburb name or a generic
              distance band alone. The applicable design standard and chosen
              framing system classify the environment using relevant factors,
              which can include breaking surf versus sheltered salt water,
              airborne salts, industrial pollutants, shelter and expected
              corrosion rate. Manufacturer guidance can inform product
              limitations, but it does not replace a project-specific
              classification and specification.
            </p>
            <p>
              Steel framing needs coating or other protection compatible with
              that exposure. Timber framing avoids corrosion of the timber
              members themselves, but its metal straps, fasteners, brackets
              and connectors still need compatible, exposure-appropriate
              protection. Flashings, drainage and dissimilar-metal contact
              also need to match the complete wall system.
            </p>
            <TickList
              items={[
                "The documented environmental exposure classification under the applicable standard and framing system",
                "The coating, base metal or other protection specified for the framing members",
                "Compatible protection for fasteners, straps, brackets, connectors and flashings",
                "Manufacturer requirements for cut edges, dissimilar-metal contact and maintenance",
              ]}
            />
            <p className="article-source">
              Sources:{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/6-framing/part-63-structural-steel-members">
                ABCB, NCC Housing Provisions 6.3.9 Corrosion protection
              </a>{" "}
              and{" "}
              <a href="https://www.stratco.com.au/siteassets/pdfs/selection_use_and_maintenance.pdf">
                Stratco, Selection, Use and Maintenance of Stratco Steel
                Products
              </a>{" "}
              (manufacturer maintenance background).
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="reactive-clay">
          <div className="shell prose article-prose">
            <h2 id="reactive-clay">
              Reactive clay and footing movement are a separate question
            </h2>
            <p>
              Neither steel nor timber wall framing resolves footing movement
              on reactive soil. Reactive soils occur in parts of metropolitan
              Adelaide, but the site class is project-specific. Changes in
              soil moisture can cause swelling and shrinkage, and that
              movement is managed through site classification, drainage and
              footing design—not by the framing material fixed above it.
            </p>
            <p>
              Choosing steel framing for its own stiffness does not substitute
              for the site investigation and footing design required for the
              project. The designer should confirm the applicable NCC H1D4
              and AS 2870 pathway and coordinate the frame with the documented
              footing system.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-two/h-class-1-and-10-buildings/part-h1-structure">
                ABCB, NCC H1D4 Footings and slabs
              </a>{" "}
              and{" "}
              <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                CSIRO, <cite>Foundation Maintenance and Footing Performance</cite>
              </a>{" "}
              (PDF).
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="bushfire">
          <div className="shell prose article-prose">
            <h2 id="bushfire">
              Bushfire-prone zoning in the Hills and hinterland
            </h2>
            <p>
              South Australia does not require an individual BAL assessment
              for every property shown in a bushfire-prone area. Under
              Ministerial Building Standard MBS 008, general-risk areas are
              deemed BAL-Low and medium-risk areas are deemed BAL-12.5.
              High-risk areas and specified urban-interface locations require
              assessment under AS 3959. Confirm the designation and assessment
              pathway for the actual property.
            </p>
            <p>
              BAL is determined from site and bushfire conditions, including
              vegetation, distance and slope—not from whether the frame is
              steel or timber. After the BAL or deemed classification is
              established, the frame and complete wall assembly must be
              selected to meet the applicable construction solution.
              Requirements at several BALs can affect wall components, so
              compliance should not be inferred from frame material or from a
              claim that non-combustible construction matters only at BAL-FZ.
            </p>
            <aside className="article-note article-note--warning">
              <strong>Confirm the mapping and assessment pathway.</strong>
              <p>
                Ask the project designer, bushfire consultant or building
                certifier to confirm the site designation, any deemed BAL
                classification or required AS 3959 assessment, and the
                resulting wall, cladding, window and door requirements. This
                guide does not determine a rating or certify compliance.
              </p>
            </aside>
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/bushfire">
                SA.GOV.AU, Bushfire building regulations
              </a>
              ,{" "}
              <a href="https://plan.sa.gov.au/__data/assets/pdf_file/0012/678288/MBS_008_-_Additional_requirements.pdf">
                PlanSA, Ministerial Building Standard MBS 008
              </a>
              , and{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-two/h-class-1-and-10-buildings/part-h7-ancillary-provisions-and-additional-construction-requirements">
                ABCB, NCC H7D4 Construction in bushfire-prone areas
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="confirm-first">
          <div className="shell prose article-prose">
            <h2 id="confirm-first">
              What to confirm before the framing material is locked in
            </h2>
            <p>
              A useful steel-frame or timber-frame decision rests on
              project-specific documents, not a general comparison. Before
              committing, confirm the following with the designer, engineer
              or building surveyor.
            </p>
            <ol className="steps">
              <li>
                <h3>Confirm the design standard or engineering</h3>
                <p>
                  Confirm the NCC H1D6 pathway used for the complete frame.
                  For timber, this may include an applicable AS 1684 standard;
                  for steel, it may include NASH Parts 1 or 2, AS 4100 or
                  AS/NZS 4600. Check the selected pathway&rsquo;s scope, loads,
                  bracing, tie-downs, connections and product details.
                </p>
              </li>
              <li>
                <h3>Confirm termite management scope</h3>
                <p>
                  Confirm whether termites are a known potential risk, which
                  primary building elements are susceptible and what compliant
                  system, notices, inspection and maintenance are required.
                </p>
              </li>
              <li>
                <h3>Match corrosion class to the actual site</h3>
                <p>
                  Use the applicable standard and framing system to classify
                  the exposure, then specify compatible protection for frame
                  members, fasteners, connectors and flashings.
                </p>
              </li>
              <li>
                <h3>Check the bushfire overlay status</h3>
                <p>
                  Confirm the South Australian risk designation and whether
                  a deemed BAL classification applies or an AS 3959 assessment
                  is required before the wall system is finalised.
                </p>
              </li>
              <li>
                <h3>Confirm the complete wall build-up</h3>
                <p>
                  Thermal, acoustic and fire performance depend on the whole
                  wall assembly—framing, insulation, lining and external
                  finish together—so confirm the documented build-up rather
                  than the framing material alone.
                </p>
              </li>
            </ol>
            <p>
              Our{" "}
              <Link href="/project-planning/">project-planning guide</Link>{" "}
              covers the wider information that helps turn an early
              framing question into a clear installation scope.
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="framing-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="framing-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="framing-faqs">
              <div className="faq-list__item">
                <dt>Is steel framing always better than timber in Adelaide?</dt>
                <dd>
                  Not automatically. Steel framing is not subject to termite
                  attack and can suit exposed or termite-prone sites well,
                  but the design standard, coating class, cost and trade
                  availability still need to be confirmed against timber
                  framing for the specific project.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>
                  Does steel framing avoid reactive-clay problems?
                </dt>
                <dd>
                  No. Footing movement on reactive clay is managed through
                  site classification and footing design, not the wall
                  framing material. A geotechnical or structural assessment
                  should still confirm the footing system regardless of
                  which framing is chosen.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>
                  Can Elite Surface Group choose the framing material for
                  us?
                </dt>
                <dd>
                  No. Framing material selection is a design and engineering
                  decision made before installation. We install the wall
                  system to the approved drawings and specification, and can
                  discuss coordination once that documentation is in place.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>Australian Building Codes Board</dt>
                <dd>
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-two/h-class-1-and-10-buildings/part-h1-structure">
                    NCC H1D4 Footings and slabs and H1D6 Framing
                  </a>
                  ,{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/3-site-preparation/part-34-termite-risk-management">
                    NCC Housing Provisions Part 3.4 Termite risk management
                  </a>
                  ,{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/6-framing/part-63-structural-steel-members">
                    NCC Housing Provisions 6.3.9 Corrosion protection
                  </a>
                  , and{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-two/h-class-1-and-10-buildings/part-h7-ancillary-provisions-and-additional-construction-requirements">
                    NCC H7D4 Construction in bushfire-prone areas
                  </a>
                </dd>
              </div>
              <div>
                <dt>PlanSA and SA.GOV.AU</dt>
                <dd>
                  <a href="https://plan.sa.gov.au/__data/assets/pdf_file/0012/678288/MBS_008_-_Additional_requirements.pdf">
                    Ministerial Building Standard MBS 008
                  </a>{" "}
                  and{" "}
                  <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/bushfire">
                    Bushfire building regulations
                  </a>
                </dd>
              </div>
              <div>
                <dt>WoodSolutions</dt>
                <dd>
                  <a href="https://www.woodsolutions.com.au/resources/standards-codes/as1684-code-compliance">
                    AS 1684 code compliance
                  </a>
                </dd>
              </div>
              <div>
                <dt>Stratco</dt>
                <dd>
                  <a href="https://www.stratco.com.au/au/building-hardware/steel-framing/steel-wall-framing/">
                    Steel wall framing
                  </a>{" "}
                  and{" "}
                  <a href="https://www.stratco.com.au/siteassets/pdfs/selection_use_and_maintenance.pdf">
                    Selection, Use and Maintenance of Stratco Steel Products
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
            </dl>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/walling/">Walling services in Adelaide</Link>
              <Link href="/hebel/">Hebel wall systems</Link>
              <Link href="/projects/">Project case studies</Link>
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
        defaultService="Walling"
        intro="Have an approved drawing set that specifies steel or timber wall framing? Tell us the project type, suburb and what documents are available. We can arrange how to review supporting files and confirm the installation scope."
      />
      <CtaBand />
    </>
  );
}
