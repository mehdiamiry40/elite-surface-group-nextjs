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
            <p>
              In practical terms, steel framing is not susceptible to termite
              attack, but its coating, enclosure and thermal detailing must
              suit the site and wall build-up. Timber framing has established
              residential span-table pathways and broad trade familiarity,
              but susceptible primary elements may require a termite
              management system. Supply, fabrication and labour pricing vary
              by design and market conditions, so compare project-specific
              quotes for the complete compliant frame rather than material
              prices alone.
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
                For Class 1 and 10 buildings, the NCC recognises several
                compliance pathways for each material. Timber framing can be
                designed and built to the applicable parts of AS 1684 or AS
                1720. Steel framing can use NASH Residential and Low-Rise
                Steel Framing Parts 1 or 2, AS 4100, or AS/NZS 4600, as
                applicable to the project.
              </p>
              <p>
                Both materials therefore have standards-based design
                solutions; steel is not limited to project-specific
                engineering. The selected pathway still has to fit the
                building geometry, wind classification, loads and member
                system. For a proprietary light-gauge steel frame, use the
                supplier&rsquo;s compatible members, span information,
                connections and fabrication details rather than mixing
                literature from different systems.
              </p>
              <p className="article-source">
                Source:{" "}
                <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-two/h-class-1-and-10-buildings/part-h1-structure">
                  ABCB, NCC Volume Two Part H1 Structure
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
              The NCC termite provisions apply when a Class 1 or 10 building
              is in an area where subterranean termites are known to present
              a potential risk and a primary building element is susceptible
              to attack. Steel, concrete, masonry, fibre-reinforced cement,
              and timber that meets the NCC&rsquo;s naturally resistant or
              preservative-treated criteria are treated as not subject to
              termite attack for this purpose.
            </p>
            <p>
              Steel framing can therefore remove susceptibility from the
              frame itself, but it does not automatically resolve every
              termite question in a building containing other timber primary
              elements. If susceptible timber is selected, confirm whether a
              termite management system is required, what AS 3660.1-compliant
              method is documented, and what inspection and maintenance the
              system needs. South Australian guidance recommends following
              the approved system and its manufacturer&rsquo;s maintenance
              instructions.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/3-site-preparation/part-34-termite-risk-management">
                ABCB, NCC Housing Provisions Part 3.4 Termite risk management
              </a>
              {" "}and{" "}
              <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/building-safety-information/managing-the-risk-of-termite-damage-to-your-building">
                SA.GOV.AU, Managing the risk of termite damage
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
              coast. Steel-framing durability guidance classifies atmospheric
              corrosivity using the marine source, distance inland and local
              exposure. It also distinguishes between ventilated and
              unventilated framing and whether components are accessible for
              maintenance. Distance from the shoreline is therefore a useful
              input, not a complete corrosion specification.
            </p>
            <p>
              That matters directly for coastal Adelaide sites at Semaphore,
              Grange, Henley Beach, Glenelg and Brighton, where a standard
              framing product or enclosure detail should not be assumed
              suitable from the suburb name alone. Confirm the actual steel
              product, protective coating, ventilation or enclosure, fixings
              and any isolation details against the frame supplier&rsquo;s
              current marine guidance. Timber framing avoids corrosion of
              the studs themselves, but connectors and fixings still need
              exposure-appropriate protection, and the wall still needs
              correct moisture detailing.
            </p>
            <TickList
              items={[
                "The marine source, approximate distance and local shelter or prevailing exposure",
                "Whether the frame is ventilated, enclosed and accessible for maintenance",
                "The steel coating and isolation details specified for that exposure",
                "Whether fixings, flashings and connectors suit the same environment",
              ]}
            />
            <p className="article-source">
              Source:{" "}
              <a href="https://www.nash.asn.au/wp-content/uploads/2022/04/Durability-design-of-steel-framing-in-residential-and-low-rise-construction-Final-ASEC-2014_1411525018.pdf">
                NASH, Durability design of steel framing in residential and
                low-rise construction (PDF)
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
              movement on reactive clay. South Australian technical guidance
              identifies concentrations of reactive clay across the Adelaide
              Plain; these soils swell when wet and shrink as they dry.
              Site classification, the documented footing or slab design,
              drainage and foundation maintenance manage that movement—not
              the framing material fixed above. Choosing steel framing does
              not substitute for the site and structural information required
              for the footing design.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://cdn.environment.sa.gov.au/environment/docs/tech_note3_1.pdf">
                South Australian Department for Environment and Heritage,
                Maintenance and Repair of Older Buildings in South Australia
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
              For Class 1 homes in a designated bushfire-prone area, NCC
              Volume Two H7D4 recognises construction to AS 3959 or the NASH
              steel-framed bushfire standard. South Australia&rsquo;s H7D4
              variation assigns BAL-Low to general-risk areas and BAL-12.5 to
              medium-risk areas. High-risk areas, and urban-interface sites
              within 100 metres of a high-risk area, require the site BAL to
              be assessed under AS 3959.
            </p>
            <p>
              The applicable BAL and chosen compliance pathway determine the
              complete construction details. A steel frame alone does not
              make a wall bushfire-compliant, and timber is not automatically
              excluded: cladding, membranes, insulation, openings, gaps,
              junctions and fixings must work as the documented system.
            </p>
            <aside className="article-note article-note--warning">
              <strong>Confirm the applicable BAL; don&rsquo;t assume one.</strong>
              <p>
                Ask the project designer, building surveyor or bushfire
                consultant to confirm the risk-area mapping, applicable BAL
                under the South Australian variation, and resulting
                construction pathway before wall framing, cladding or window
                systems are finalised. This guide does not determine a rating
                or certify compliance.
              </p>
            </aside>
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/bushfire">
                SA.GOV.AU, Bushfire building regulations
              </a>{" "}
              and{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-two/h-class-1-and-10-buildings/part-h7-ancillary-provisions-and-additional-construction-requirements">
                ABCB, NCC Volume Two Part H7, including the South Australian
                H7D4 variation
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
                  the frame. For steel, confirm the applicable NASH or
                  engineered pathway, member system, span information and
                  connection details.
                </p>
              </li>
              <li>
                <h3>Confirm termite management scope</h3>
                <p>
                  Identify which primary elements the NCC treats as not
                  subject to attack, which susceptible elements need a
                  documented AS 3660.1 termite management system, and who is
                  responsible for its ongoing inspection.
                </p>
              </li>
              <li>
                <h3>Match corrosion class to the actual site</h3>
                <p>
                  For steel near the coast, confirm the framing product,
                  coating and enclosure details match the marine source,
                  distance, local exposure and ventilation—not a general
                  assumption based on suburb.
                </p>
              </li>
              <li>
                <h3>Check the bushfire overlay status</h3>
                <p>
                  Confirm whether the site sits within a designated
                  bushfire-prone area, which BAL applies under the South
                  Australian variation, and whether a site assessment is
                  required before the wall system is finalised.
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
                  framing material. The required site and structural
                  information should still confirm the footing system
                  regardless of which framing is chosen.
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
                    NCC Volume Two Part H1 Structure
                  </a>
                  ,{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/3-site-preparation/part-34-termite-risk-management">
                    NCC Housing Provisions, Part 3.4 Termite risk management
                  </a>{" "}
                  and{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-two/h-class-1-and-10-buildings/part-h7-ancillary-provisions-and-additional-construction-requirements">
                    NCC Volume Two Part H7, including the South Australian
                    H7D4 variation
                  </a>
                </dd>
              </div>
              <div>
                <dt>National Association of Steel-Framed Housing</dt>
                <dd>
                  <a href="https://www.nash.asn.au/wp-content/uploads/2022/04/Durability-design-of-steel-framing-in-residential-and-low-rise-construction-Final-ASEC-2014_1411525018.pdf">
                    Durability design of steel framing in residential and
                    low-rise construction (PDF)
                  </a>
                </dd>
              </div>
              <div>
                <dt>South Australian Government</dt>
                <dd>
                  <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/building-safety-information/managing-the-risk-of-termite-damage-to-your-building">
                    Managing the risk of termite damage
                  </a>
                  ,{" "}
                  <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/bushfire">
                    Bushfire building regulations
                  </a>{" "}
                  and{" "}
                  <a href="https://cdn.environment.sa.gov.au/environment/docs/tech_note3_1.pdf">
                    Maintenance and Repair of Older Buildings in South
                    Australia (PDF)
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
