import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { renderCrackingGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: renderCrackingGuide.metaTitle,
  description: renderCrackingGuide.metaDescription,
  path: `/resources/${renderCrackingGuide.slug}`,
  image: ogCard(
    "render-cracking-adelaide",
    "What causes render cracking in Adelaide?",
  ),
  openGraphType: "article",
  publishedTime: renderCrackingGuide.published,
  modifiedTime: renderCrackingGuide.modified,
});

export default function RenderCrackingGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Render cracking in Adelaide",
            href: `/resources/${renderCrackingGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={renderCrackingGuide} />

      <article>
        <PageBanner
          title={renderCrackingGuide.title}
          image={bannerImages[`/resources/${renderCrackingGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Render cracking in Adelaide" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{renderCrackingGuide.category}</span>
              <time dateTime={renderCrackingGuide.published}>
                Published {renderCrackingGuide.publishedDisplay}
              </time>
              <span>{renderCrackingGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              Render can crack because the finish, the substrate or the building
              beneath it has changed. In Adelaide, seasonal ground movement can
              be one contributor where reactive clay is present—but preparation,
              moisture, junction detailing, curing and ageing can matter too.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>Diagnose first, repair second.</strong>
              <p>
                A crack pattern is a clue, not a diagnosis. Do not rely on this
                guide to decide whether a building is structurally safe. If a
                wall appears unstable, a crack is changing quickly or movement
                affects the wall or building around it, keep clear and arrange
                prompt professional assessment.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#common-causes">Common causes</a>
                </li>
                <li>
                  <a href="#adelaide-conditions">Adelaide conditions</a>
                </li>
                <li>
                  <a href="#what-to-record">What to record</a>
                </li>
                <li>
                  <a href="#next-steps">Sensible next steps</a>
                </li>
                <li>
                  <a href="#who-to-call">Who to call</a>
                </li>
                <li>
                  <a href="#repair-or-rerender">Repair or re-render?</a>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="common-causes"
        >
          <div className="shell prose article-prose">
            <h2 id="common-causes">Common reasons rendered walls crack</h2>
            <p>
              Several issues can create a similar line on the surface. The
              repair depends on which layer is moving or failing and whether
              that change is still active.
            </p>

            <h3>Movement in the wall, footing or ground</h3>
            <p>
              Render is comparatively rigid. Movement in masonry, framing,
              footings or foundation soil can transfer stress to the finish.
              Movement may be seasonal, related to settlement, concentrated at a
              junction between old and new work, or associated with changes in
              moisture around the building. South Australian guidance identifies
              soil movement as a frequent contributor to masonry cracking in
              older buildings, particularly across the Adelaide Plain.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://cdn.environment.sa.gov.au/environment/docs/tech_note3_1.pdf">
                South Australian Department for Environment and Heritage,{" "}
                <cite>
                  Maintenance and Repair of Older Buildings in South Australia
                </cite>
              </a>
              .
            </p>

            <h3>Movement joints and material junctions</h3>
            <p>
              Articulation, control and expansion joints are intended to
              accommodate movement. Applying a rigid render or texture coat
              across one can simply relocate the stress into the finish. Window
              corners and junctions between different wall materials also
              deserve attention because the connected materials may move
              differently.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/5-masonry/part-56-masonry-components-and-accessories">
                ABCB, NCC Housing Provisions Part 5.6
              </a>{" "}
              and{" "}
              <a href="https://rockcote.com.au/resources/structural-movement/">
                Rockcote technical guidance on structural movement
              </a>
              .
            </p>

            <h3>Substrate preparation, adhesion and curing</h3>
            <p>
              Render needs a suitable, sound substrate and the correct
              preparation for the selected system. Excessive substrate suction
              can draw water from cement render too quickly, interfering with
              hydration and contributing to early cracking or poor bond.
              Application limits and curing requirements vary by product,
              temperature, wind, humidity and wall condition, so the current
              system data must govern the work.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://rockcote.com.au/resources/preparing-brick-substrates-for-render/">
                Rockcote technical guidance on preparing brick substrates
              </a>
              .
            </p>

            <h3>Moisture, ageing or failure within the finish</h3>
            <p>
              Ageing, atmospheric exposure, unsuitable previous coatings,
              corrosion and failure in the substrate or coating system can
              contribute to cracking, staining and facade degradation. These
              conditions do not all call for the same repair: a stable surface
              blemish is different from a crack continuing into the wall or a
              coating that has detached over a broad area.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex/overview/acratex-facade-refurbishment/">
                Dulux Acratex facade-refurbishment guidance
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="adelaide-conditions">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={renderCrackingGuide.image}
                alt={renderCrackingGuide.imageAlt}
                width={renderCrackingGuide.imageWidth}
                height={renderCrackingGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(renderCrackingGuide.image)}
              />
              <figcaption>{renderCrackingGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Local context</span>
              <h2 id="adelaide-conditions">
                Why Adelaide conditions may matter
              </h2>
              <p>
                Reactive clay swells as it gains moisture and shrinks as it
                dries. Where that soil is present beneath a building, seasonal
                moisture change can move footings and brittle masonry. South
                Australian guidance says some seasonal cracks in older masonry
                may be widest near the end of summer and close as moisture
                returns.
              </p>
              <p>
                That does <strong>not</strong> mean every Adelaide render crack
                is caused by clay. Soil, footing design, construction type,
                drainage, nearby vegetation and the wall system all vary by
                property. A geotechnical report usually provides site
                classification, and movement-related work may require
                independent structural or geotechnical advice.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                  CSIRO,{" "}
                  <cite>Foundation Maintenance and Footing Performance</cite>
                </a>{" "}
                and the{" "}
                <a href="https://cdn.environment.sa.gov.au/environment/docs/tech_note3_1.pdf">
                  South Australian older-buildings guide
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="what-to-record"
        >
          <div className="shell prose article-prose">
            <h2 id="what-to-record">What to record before requesting advice</h2>
            <p>
              A repeatable record is more useful than a single close-up. Capture
              the surrounding wall as well as the line itself, then note
              anything that changes.
            </p>
            <TickList
              items={[
                "A wide photograph showing where the crack sits on the wall",
                "Close photographs with the date and a repeatable scale or reference point",
                "The crack’s length, direction and whether it continues into masonry or appears on the other face",
                "Whether it opens, closes, spreads or reappears after a previous repair",
                "Nearby sticking doors or windows, sloping floors, displaced trim or other visible distortion",
                "Damp staining, failed sealant, leaking gutters or downpipes, ponding, plumbing changes or recent landscaping",
                "The wall construction, render or coating system and any previous repair details you can confirm",
              ]}
            />
            <p>
              The SA Government includes cracked walls, sloping floors, damp,
              mould and blistering paint among signs worth checking during a
              property inspection, and recommends appropriately skilled
              independent inspection where structural soundness is in question.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://www.sa.gov.au/topics/housing/buying-building-selling/building-or-buying-home/inspecting-a-property">
                SA.GOV.AU, Inspecting a property
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
                <h3>Create a baseline</h3>
                <p>
                  Record the crack and its context now. Repeat the same photos
                  and measurements if monitoring is appropriate and the wall is
                  safe.
                </p>
              </li>
              <li>
                <h3>Check only what is readily visible</h3>
                <p>
                  Look for obvious leaks, damaged joints, ponding, failed window
                  seals or recent site changes without excavating or disturbing
                  the wall.
                </p>
              </li>
              <li>
                <h3>Avoid hiding an active symptom</h3>
                <p>
                  Filling or painting over a moving crack can conceal useful
                  evidence and may fail again. The underlying cause and movement
                  status should guide the repair.
                </p>
              </li>
              <li>
                <h3>Match the assessor to the risk</h3>
                <p>
                  Surface-finish problems, uncertain building movement and
                  possible soil or footing issues call for different expertise.
                </p>
              </li>
            </ol>

            <aside className="article-note article-note--warning">
              <strong>Avoid one-size-fits-all ground advice.</strong>
              <p>
                Do not begin foundation watering, major drainage alterations,
                excavation or large-tree removal solely because a render crack
                is visible. Each can change soil moisture or building conditions
                and may worsen a different underlying issue. Seek appropriate
                advice first.
              </p>
            </aside>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="who-to-call"
        >
          <div className="shell prose article-prose">
            <h2 id="who-to-call">Who should assess the crack?</h2>
            <dl className="faq-list professional-list">
              <div className="faq-list__item">
                <dt>Experienced render or coating professional</dt>
                <dd>
                  Appropriate when the issue is confirmed as stable and confined
                  to the finish, and the substrate is sound, dry and well
                  bonded.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Independent building consultant or architect</dt>
                <dd>
                  Useful when the construction, defect extent or cause is
                  unclear and a broader building assessment is needed.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Structural or civil engineer</dt>
                <dd>
                  Arrange prompt assessment where cracking continues through the
                  wall, changes or recurs, appears on both faces, affects
                  structural continuity or accompanies wall, floor, door or
                  window distortion.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Geotechnical professional</dt>
                <dd>
                  May be required where reactive soil, footing movement,
                  drainage changes, erosion or significant tree effects are
                  suspected.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Older-building or heritage specialist</dt>
                <dd>
                  Older masonry may need compatible materials and an
                  understanding of lime mortars, salt attack and damp behaviour
                  before work is specified.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="section" aria-labelledby="repair-or-rerender">
          <div className="shell prose article-prose">
            <h2 id="repair-or-rerender">Local repair or broader re-render?</h2>
            <p>
              A local repair may be reasonable when assessment confirms that the
              defect is confined to the finish, the substrate is sound and dry,
              movement has stopped or been controlled, joints remain functional
              and a compatible repair can be blended acceptably.
            </p>
            <p>
              Broader removal or wall-to-wall refinishing may be more
              appropriate when adhesion failure is widespread, moisture remains
              active, many cracks recur, the previous coating is incompatible,
              joint detailing needs correction or a local patch cannot produce
              an acceptable finish. Active structural or substrate movement
              needs to be resolved before either option is treated as a durable
              repair.
            </p>

            <h2 id="render-cracking-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="render-cracking-faqs">
              <div className="faq-list__item">
                <dt>Can I simply fill a hairline render crack?</dt>
                <dd>
                  Not safely as a universal rule. A fine line may be limited to
                  the coating, but appearance alone cannot show whether the
                  substrate is moving. Record it, check the context and confirm
                  the cause and stability before choosing a repair.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Why does the same crack return after painting?</dt>
                <dd>
                  Paint or filler may cover the visible line without addressing
                  movement, moisture, failed adhesion or joint detailing beneath
                  it. If the underlying condition remains active, the symptom
                  can reappear.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Can Elite diagnose the cause from one photograph?</dt>
                <dd>
                  No. Photos are useful for initial context, but the wall,
                  substrate, history and surrounding building conditions may
                  need on-site or independent assessment before a repair scope
                  is appropriate.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>
                  South Australian Department for Environment and Heritage
                </dt>
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
                <dt>Australian Building Codes Board</dt>
                <dd>
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/5-masonry/part-56-masonry-components-and-accessories">
                    NCC Housing Provisions, Part 5.6 Masonry components and
                    accessories
                  </a>
                </dd>
              </div>
              <div>
                <dt>SA.GOV.AU</dt>
                <dd>
                  <a href="https://www.sa.gov.au/topics/housing/buying-building-selling/building-or-buying-home/inspecting-a-property">
                    Inspecting a property
                  </a>
                </dd>
              </div>
              <div>
                <dt>Manufacturer technical guidance</dt>
                <dd>
                  <a href="https://rockcote.com.au/resources/structural-movement/">
                    Rockcote: Structural Movement
                  </a>
                  ,{" "}
                  <a href="https://rockcote.com.au/resources/preparing-brick-substrates-for-render/">
                    Preparing Brick Substrates for Render
                  </a>{" "}
                  and{" "}
                  <a href="https://www.dulux.com.au/specifier/products/acratex/overview/acratex-facade-refurbishment/">
                    Dulux Acratex Facade Refurbishment
                  </a>
                </dd>
              </div>
            </dl>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/render/">Adelaide rendering services</Link>
              <Link href="/projects/">Render project case studies</Link>
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
        intro="If an appropriate assessment has confirmed a render or coating issue, tell us the property suburb and what wall photos or findings are available. If supporting files are needed, we’ll arrange how to review them."
      />
      <CtaBand />
    </>
  );
}
