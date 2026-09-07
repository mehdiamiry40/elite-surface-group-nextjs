import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { secondStoreyAdditionGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: secondStoreyAdditionGuide.metaTitle,
  description: secondStoreyAdditionGuide.metaDescription,
  path: `/resources/${secondStoreyAdditionGuide.slug}`,
  image: ogCard("walling", secondStoreyAdditionGuide.metaTitle),
  openGraphType: "article",
  publishedTime: secondStoreyAdditionGuide.published,
  modifiedTime: secondStoreyAdditionGuide.modified,
});

export default function SecondStoreyAdditionGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Second storey addition in Adelaide",
            href: `/resources/${secondStoreyAdditionGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={secondStoreyAdditionGuide} />

      <article>
        <PageBanner
          title={secondStoreyAdditionGuide.title}
          image={bannerImages[`/resources/${secondStoreyAdditionGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Second storey addition in Adelaide" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{secondStoreyAdditionGuide.category}</span>
              <time dateTime={secondStoreyAdditionGuide.published}>
                Published {secondStoreyAdditionGuide.publishedDisplay}
              </time>
              <span>{secondStoreyAdditionGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              A second storey addition does not sit lightly on top of an
              existing Adelaide home—every wall, footing and connection
              underneath it now has to carry more load than the original
              design allowed for. Before any framing for the new level goes
              up, the existing structure, the site and the approvals pathway
              all need to be confirmed, not assumed from how the house looks
              from the street.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>This is an engineering and consent decision first.</strong>
              <p>
                Elite Surface Group installs the walling for a second storey
                addition once it is designed and approved. Whether the
                existing walls and footings can support an additional level,
                and what needs to be strengthened, is a structural engineer&rsquo;s
                assessment—arrange that, and the required building consent,
                before treating this guide as a basis for design.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#existing-structure">Assessing the existing structure</a>
                </li>
                <li>
                  <a href="#framing-the-addition">Framing the new level</a>
                </li>
                <li>
                  <a href="#adelaide-conditions">Why Adelaide conditions matter</a>
                </li>
                <li>
                  <a href="#approvals">Approvals and licensing</a>
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
          aria-labelledby="existing-structure"
        >
          <div className="shell prose article-prose">
            <h2 id="existing-structure">
              Assessing the existing structure before a second storey addition
            </h2>
            <p>
              A single-storey home is typically designed to carry its own
              roof and ceiling load down through its walls to footings sized
              for exactly that. Adding a second storey introduces new floor,
              wall and roof loads that the ground-floor walls, footings and
              foundations may never have been designed to carry.
            </p>

            <h3>What an engineer needs to check</h3>
            <p>
              A structural engineer working from the existing drawings—and,
              on an established home, an on-site inspection—confirms which
              ground-floor walls can carry the new load path, whether
              footings need underpinning or replacement, and how the new
              upper-level framing connects down through the existing structure
              to the ground. Wall framing, connections and the load path down
              to the footings sit within the structural provisions of the
              National Construction Code&rsquo;s Housing Provisions, and the
              specific detailing depends on the documented design for the
              project rather than a general rule of thumb.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/2-structure/part-21-scope-and-application-section-2">
                ABCB, NCC 2022 Housing Provisions, Part 2.1 Scope and
                application of Section 2 (Structure)
              </a>
              .
            </p>

            <h3>Previous renovations can change the picture</h3>
            <p>
              Many established Adelaide homes have already been altered—an
              earlier extension, a removed wall or a converted garage can mean
              the load path is different from what the original plans show.
              That is one reason the engineer&rsquo;s on-site inspection
              matters as much as the drawings when a second storey addition
              is being planned for an existing house rather than a new build.
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="framing-the-addition">
          <div className="shell prose article-prose">
            <h2 id="framing-the-addition">
              Framing the new level once the design is confirmed
            </h2>
            <p>
              Once the engineer has confirmed what the existing structure can
              carry and designed any strengthening required, the upper level
              itself still needs framing decisions made against the
              documented structural requirements for a Class 1 building.
            </p>
            <p>
              Timber wall framing for the addition is typically sized and
              braced against span tables in the timber-framing standard
              referenced by the NCC, while a steel-framed upper level follows
              the Housing Provisions&rsquo; structural steel member
              requirements instead. Bracing for wind and, where relevant,
              earthquake loads is assessed for the completed two-storey
              form—not the original single-storey building—so bracing that
              was adequate before the addition may not remain adequate
              afterwards.
            </p>
            <TickList
              items={[
                "Engineer's design confirming which existing walls and footings carry the new load",
                "Whether underpinning, footing replacement or new footings are required",
                "The framing material and bracing design for the completed two-storey form",
                "How new framing connects to existing walls, floors and roof structure at each junction",
                "Temporary support and sequencing for the stage when the roof is open to weather",
              ]}
            />
            <p className="article-source">
              Sources:{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-two/h-class-1-and-10-buildings/part-h1-structure">
                ABCB, NCC 2022 Volume Two, Part H1 Structure
              </a>
              ,{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/6-framing/part-63-structural-steel-members">
                ABCB, NCC 2022 Housing Provisions, Part 6.3 Structural steel
                members
              </a>{" "}
              and{" "}
              <a href="https://www.woodsolutions.com.au/resources/standards-codes/as1684-code-compliance">
                WoodSolutions, AS 1684 code compliance
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="adelaide-conditions">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={secondStoreyAdditionGuide.image}
                alt={secondStoreyAdditionGuide.imageAlt}
                width={secondStoreyAdditionGuide.imageWidth}
                height={secondStoreyAdditionGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(secondStoreyAdditionGuide.image)}
              />
              <figcaption>{secondStoreyAdditionGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Local context</span>
              <h2 id="adelaide-conditions">
                Why Adelaide conditions matter for a second storey addition
              </h2>
              <p>
                Across the Adelaide Plains, reactive clay soils mean footing
                performance depends heavily on the site classification, and a
                footing sized for a single-storey load may need underpinning
                or replacement before it can safely carry an added level.
                Established homes in suburbs such as Norwood, Unley and
                Prospect sit inside a Local Heritage overlay or State Heritage
                Area in some streets, and additional planning consent—not
                only building consent—may apply where a second storey would
                change the street-facing form of a heritage-listed or
                contributory building.
              </p>
              <p>
                Properties in the Adelaide Hills and hinterland can also sit
                within a designated bushfire-prone area, which affects the
                construction requirements for the new upper-level walls,
                windows and roof under the NCC once a Bushfire Attack Level
                assessment is obtained.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                  CSIRO,{" "}
                  <cite>Foundation Maintenance and Footing Performance</cite>
                </a>
                ,{" "}
                <a href="https://www.environment.sa.gov.au/topics/heritage/owning-a-heritage-place/living-in-a-state-heritage-area">
                  Department for Environment and Water, Living in a State
                  Heritage Area
                </a>{" "}
                and{" "}
                <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/bushfire">
                  SA.GOV.AU, Bushfire building regulations
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="approvals">
          <div className="shell prose article-prose">
            <h2 id="approvals">Approvals and licensing for the addition</h2>
            <p>
              A second storey addition is substantial building work, and
              South Australia&rsquo;s planning system generally requires it to
              go through a development application and a building consent
              check against the National Construction Code before
              construction starts. Depending on the property, height,
              setbacks and any heritage or character overlay, planning
              consent may be required in addition to building consent—PlanSA&rsquo;s
              online tools confirm what a specific address and scope of work
              needs.
            </p>
            <p>
              Domestic building work in South Australia generally needs to be
              carried out by, or under the supervision of, a licensed
              building work contractor. Confirm licensing for whoever is
              responsible for the structural framing, propping and
              connections before the addition is scheduled.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval">
                PlanSA, Find out if you need approval
              </a>
              ,{" "}
              <a href="https://plan.sa.gov.au/development_applications/getting_approval/how_applications_are_assessed/assessment_stages/assessment_timetables/building_consent">
                PlanSA, Building consent
              </a>{" "}
              and{" "}
              <a href="https://www.sa.gov.au/topics/business-and-trade/licensing/building-and-trades/building-work-contractor-s-licence">
                SA.GOV.AU, Building work contractor&rsquo;s licence
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
                <h3>Get the existing structure assessed</h3>
                <p>
                  Engage a structural engineer before any design work locks in
                  a floor plan, so the existing walls, footings and load path
                  are confirmed—or their required strengthening is scoped—first.
                </p>
              </li>
              <li>
                <h3>Confirm the approvals pathway</h3>
                <p>
                  Check with PlanSA or the relevant council whether planning
                  consent applies in addition to building consent, especially
                  where a heritage overlay, character area or bushfire-prone
                  zoning is involved.
                </p>
              </li>
              <li>
                <h3>Lock in the framing design</h3>
                <p>
                  Confirm the framing material, bracing design and connection
                  details for the completed two-storey form before ordering
                  materials or booking trades.
                </p>
              </li>
              <li>
                <h3>Sequence the build around the exposed roof stage</h3>
                <p>
                  Agree how the site is protected and weatherproofed while the
                  existing roof is removed and the new level is framed, and
                  line up the licensed contractor responsible for that stage.
                </p>
              </li>
            </ol>

            <aside className="article-note article-note--warning">
              <strong>Do not frame an addition on an unassessed structure.</strong>
              <p>
                Starting demolition, propping or framing before the existing
                walls and footings have been engineered for the additional
                load can cause movement, cracking or a structural failure that
                is far more expensive to fix than the assessment itself.
              </p>
            </aside>
          </div>
        </section>

        <section className="section" aria-labelledby="who-to-call">
          <div className="shell prose article-prose">
            <h2 id="who-to-call">Who should be involved</h2>
            <dl className="faq-list professional-list">
              <div className="faq-list__item">
                <dt>Structural engineer</dt>
                <dd>
                  Assesses the existing walls and footings, designs any
                  required strengthening and specifies the framing and
                  bracing for the new level.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Building designer or architect</dt>
                <dd>
                  Develops the floor plan and elevations and coordinates
                  planning matters such as setbacks, overlooking and heritage
                  or character requirements.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Licensed building work contractor</dt>
                <dd>
                  Carries out or supervises the structural work, in line with
                  South Australian licensing requirements.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Building certifier or PlanSA portal</dt>
                <dd>
                  Assesses the documented design against the National
                  Construction Code and confirms whether planning consent is
                  also required.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Elite Surface Group walling team</dt>
                <dd>
                  Installs the engineered framing for the new level, connects
                  it cleanly to the existing structure at each junction, and
                  coordinates with the certifier&rsquo;s sign-off before
                  linings and finishes proceed.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          id="faqs-and-sources"
          className="section section--tint"
          aria-labelledby="second-storey-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="second-storey-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="second-storey-faqs">
              <div className="faq-list__item">
                <dt>
                  Can our existing walls definitely carry a second storey?
                </dt>
                <dd>
                  Not without assessment. Only a structural engineer working
                  from the drawings and an on-site inspection can confirm
                  whether the existing walls and footings can carry the added
                  load, or what strengthening they need first.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>
                  Do we need planning consent as well as building consent?
                </dt>
                <dd>
                  It depends on the property, height and any heritage,
                  character or bushfire overlay. Use PlanSA&rsquo;s approval
                  check or ask the relevant council before design work is
                  finalised.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>
                  Can Elite Surface Group design the second storey addition?
                </dt>
                <dd>
                  No. Structural design and planning approval sit with the
                  engineer, designer and certifier. Once that design is
                  approved, we install the engineered walling for the new
                  level and coordinate with the finishing trades.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>Australian Building Codes Board</dt>
                <dd>
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/2-structure/part-21-scope-and-application-section-2">
                    NCC 2022 Housing Provisions, Part 2.1 Scope and
                    application of Section 2
                  </a>
                  ,{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-two/h-class-1-and-10-buildings/part-h1-structure">
                    NCC 2022 Volume Two, Part H1 Structure
                  </a>{" "}
                  and{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/6-framing/part-63-structural-steel-members">
                    Part 6.3 Structural steel members
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
                <dt>PlanSA</dt>
                <dd>
                  <a href="https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval">
                    Find out if you need approval
                  </a>{" "}
                  and{" "}
                  <a href="https://plan.sa.gov.au/development_applications/getting_approval/how_applications_are_assessed/assessment_stages/assessment_timetables/building_consent">
                    Building consent
                  </a>
                </dd>
              </div>
              <div>
                <dt>SA.GOV.AU</dt>
                <dd>
                  <a href="https://www.sa.gov.au/topics/business-and-trade/licensing/building-and-trades/building-work-contractor-s-licence">
                    Building work contractor&rsquo;s licence
                  </a>{" "}
                  and{" "}
                  <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/bushfire">
                    Bushfire building regulations
                  </a>
                </dd>
              </div>
              <div>
                <dt>Department for Environment and Water</dt>
                <dd>
                  <a href="https://www.environment.sa.gov.au/topics/heritage/owning-a-heritage-place/living-in-a-state-heritage-area">
                    Living in a State Heritage Area
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
              <Link href="/walling/">Adelaide walling services</Link>
              <Link href="/resources/steel-frame-vs-timber-frame-walls-adelaide/">
                Steel vs timber wall framing guide
              </Link>
              <Link href="/project-planning/">Plan your project enquiry</Link>
              <Link href="/locations/adelaide/">Adelaide service area</Link>
              <Link href="/contact-us/#contact">
                Discuss the available project details
              </Link>
            </nav>
          </div>
        </section>
      </article>

      <ContactSection
        defaultService="Walling"
        intro="If a structural engineer has confirmed the existing structure and approvals are in hand, tell us the property suburb and what engineering drawings or photos are available. If supporting files are needed, we'll arrange how to review them."
      />
      <CtaBand />
    </>
  );
}
