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
                Timber wall framing for houses is usually documented against
                AS 1684 Residential Timber-Framed Construction, which the NCC
                treats as a deemed-to-satisfy pathway: match the wind
                classification, stress grade and member spacing to the
                published span tables and the framing is taken to meet the
                Code without a separate engineering design.
              </p>
              <p>
                Steel wall framing does not have one equivalent national
                span-table standard in the same way. Light-gauge steel
                systems are typically supplied and documented by a specific
                manufacturer—locally, Adelaide-based Stratco publishes its
                own steel wall-framing profiles and design guides—engineered
                to AS/NZS 4600 cold-formed steel structures. That means the
                selected steel system, its published span data and its
                fixing details need to be confirmed for the actual project,
                not assumed from a different manufacturer&rsquo;s literature.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://www.woodsolutions.com.au/resources/standards-codes/as1684-code-compliance">
                  WoodSolutions, AS 1684 code compliance
                </a>{" "}
                and{" "}
                <a href="https://www.stratco.com.au/au/building-hardware/steel-framing/steel-wall-framing/">
                  Stratco steel wall framing
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
              The NCC&rsquo;s termite risk-management provisions treat steel,
              aluminium and other metals, along with fibre-reinforced cement
              and specified naturally durable or preservative-treated
              timbers, as materials not subject to termite attack. Where
              those materials make up the primary building elements, a
              termite management system is not required for them. Ordinary
              structural timber framing, by contrast, needs a documented
              termite management system under AS 3660.1—typically a
              chemical or physical barrier, or a termite-resistant timber
              species—unless it is specified as one of the exempt materials.
            </p>
            <p>
              South Australia carries lower termite pressure than
              subtropical and tropical parts of Australia, but termite
              activity is still recorded across metropolitan Adelaide and
              the Hills, and the NCC requirement is not waived by location
              alone. If timber framing is selected, confirm which termite
              management system is documented for the project and how it
              will be inspected and maintained over the building&rsquo;s
              life; if steel framing is selected, confirm that any timber
              elements remaining in the wall—door jambs, battens, trims—are
              still covered.
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
              A steel-frame vs timber-frame comparison changes near the
              coast. Steel framing manufacturers classify corrosion
              exposure by distance from active surf and airborne salt, not
              by suburb name. Stratco&rsquo;s published guidance describes
              conditions within roughly 200 metres of active surf or
              industrial pollution as very severe, 200 to 1,000 metres as
              severe, and areas that can still carry salt-laden air out to
              about 1,000 metres as moderate—each calling for a different
              coating or steel base.
            </p>
            <p>
              That matters directly for coastal Adelaide sites at Semaphore,
              Grange, Henley Beach, Glenelg and Brighton, where a standard
              galvanised or zinc/aluminium coating suited to an inland
              suburb may not be the coating documented for a near-shore
              site. Timber framing avoids that particular corrosion
              question, but still needs the termite and moisture detailing
              covered above, plus correct flashing and drainage at every
              wall junction regardless of the framing material chosen.
            </p>
            <TickList
              items={[
                "The exact distance from active surf or salt-laden air, not just the suburb",
                "The steel coating class or base metal specified for that exposure",
                "Whether fixings, flashings and connectors match the same corrosion class",
                "Manufacturer maintenance guidance for the specified coating system",
              ]}
            />
            <p className="article-source">
              Source:{" "}
              <a href="https://www.stratco.com.au/siteassets/pdfs/selection_use_and_maintenance.pdf">
                Stratco, Selection, Use and Maintenance of Stratco Steel
                Products (PDF)
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="reactive-clay">
          <div className="shell prose article-prose">
            <h2 id="reactive-clay">
              Reactive clay and footing movement are a separate question
            </h2>
            <p>
              Neither steel nor timber wall framing resolves footing
              movement on reactive clay. Much of the Adelaide Plains sits
              on reactive clay that swells as it wets and shrinks as it
              dries, and that seasonal movement is managed through site
              classification and footing design—stiffened rafts, deepened
              or articulated footings—not by the framing material bolted or
              nailed on top of them. Choosing steel framing for its own
              stiffness does not substitute for a site-specific
              geotechnical assessment where reactive soil is present.
            </p>
            <p className="article-source">
              Source:{" "}
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
              Properties within a designated bushfire-prone or high
              bushfire-risk area—common across parts of the Adelaide Hills
              and outer fringe suburbs—may need a site-specific Bushfire
              Attack Level (BAL) assessment under AS 3959 before the NCC&rsquo;s
              construction requirements for that BAL rating can be
              confirmed. Non-combustible construction only becomes mandatory
              at the highest rating, BAL-FZ; lower ratings allow a wider mix
              of materials provided the assessed construction requirements
              are met. Framing material is one input into that assessment,
              not the outcome of it.
            </p>
            <aside className="article-note article-note--warning">
              <strong>Arrange a BAL assessment, don&rsquo;t assume one.</strong>
              <p>
                If a site sits within a bushfire overlay, ask the project
                designer or a bushfire consultant to confirm the assessed
                BAL rating and the resulting construction requirements
                before wall framing, cladding or window systems are
                finalised. This guide does not determine a rating or certify
                compliance.
              </p>
            </aside>
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/bushfire">
                SA.GOV.AU, Bushfire building regulations
              </a>{" "}
              and{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-one/g-ancillary-provisions/part-g5-construction-bushfire-prone-areas">
                ABCB, NCC Part G5 Construction in bushfire-prone areas
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
                  For timber, confirm the AS 1684 wind classification, stress
                  grade and span table used, or that an engineer has designed
                  the frame. For steel, confirm the specific manufacturer
                  system, published span data and connection details.
                </p>
              </li>
              <li>
                <h3>Confirm termite management scope</h3>
                <p>
                  Identify which elements are exempt materials and which
                  need a documented AS 3660.1 termite management system, and
                  who is responsible for its ongoing inspection.
                </p>
              </li>
              <li>
                <h3>Match corrosion class to the actual site</h3>
                <p>
                  For steel near the coast, confirm the coating or base
                  metal specified matches the site&rsquo;s measured distance
                  from surf and salt exposure—not a general assumption.
                </p>
              </li>
              <li>
                <h3>Check the bushfire overlay status</h3>
                <p>
                  Confirm whether the site sits within a bushfire-prone
                  area, and if so, obtain the assessed BAL rating before the
                  wall system is finalised.
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
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/3-site-preparation/part-34-termite-risk-management">
                    NCC Housing Provisions, Part 3.4 Termite risk management
                  </a>{" "}
                  and{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-one/g-ancillary-provisions/part-g5-construction-bushfire-prone-areas">
                    NCC Part G5 Construction in bushfire-prone areas
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
              <div>
                <dt>SA.GOV.AU</dt>
                <dd>
                  <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/bushfire">
                    Bushfire building regulations
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
