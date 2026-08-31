import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { loadBearingWallRemovalGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: loadBearingWallRemovalGuide.metaTitle,
  description: loadBearingWallRemovalGuide.metaDescription,
  path: `/resources/${loadBearingWallRemovalGuide.slug}`,
  image: ogCard(
    "walling",
    "Load-bearing wall removal planning in Adelaide",
  ),
  openGraphType: "article",
  publishedTime: loadBearingWallRemovalGuide.published,
  modifiedTime: loadBearingWallRemovalGuide.modified,
});

export default function LoadBearingWallRemovalGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Load-bearing wall removal in Adelaide",
            href: `/resources/${loadBearingWallRemovalGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={loadBearingWallRemovalGuide} />

      <article>
        <PageBanner
          title={loadBearingWallRemovalGuide.title}
          image={bannerImages[`/resources/${loadBearingWallRemovalGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Load-bearing wall removal in Adelaide" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{loadBearingWallRemovalGuide.category}</span>
              <time dateTime={loadBearingWallRemovalGuide.published}>
                Published {loadBearingWallRemovalGuide.publishedDisplay}
              </time>
              <span>{loadBearingWallRemovalGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              Opening up a kitchen, taking out a dividing wall or widening a
              doorway can mean removing a wall that is quietly carrying roof,
              ceiling or upper-storey load down to its footing. A load-bearing
              wall removal is not a demolition job on its own—the load has to
              be picked up by a new beam and posts, engineered and approved,
              before the old wall can safely come out. This guide sets out
              what an Adelaide renovation should confirm first.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>Get the engineering first, not last.</strong>
              <p>
                This guide explains what a load-bearing wall removal
                generally involves. It cannot tell you whether a specific
                wall is safe to remove, and Elite Surface Group does not
                provide structural engineering advice. Any change to a
                load-bearing wall needs assessment and documented design from
                a suitably qualified structural engineer before demolition,
                propping or reframing begins.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#how-to-tell">Is the wall load-bearing?</a>
                </li>
                <li>
                  <a href="#before-you-start">What the removal usually needs</a>
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
          aria-labelledby="how-to-tell"
        >
          <div className="shell prose article-prose">
            <h2 id="how-to-tell">Working out whether a wall is load-bearing</h2>
            <p>
              A wall can be carrying structural load even when nothing about
              its finish suggests it. Getting this wrong before demolition is
              how ceilings sag, floors bounce or roof lines drop.
            </p>

            <h3>Signs a wall may be carrying load</h3>
            <p>
              A wall running perpendicular to the ceiling joists or roof
              trusses, sitting directly above a beam, post or wall on the
              floor below, or continuing in a straight line through several
              storeys can indicate it is part of the load path. Many project
              homes across Adelaide have a central spine wall running from
              front to back that lines up with a ridge beam or a steel member
              hidden in the roof space—often the first wall worth checking.
            </p>

            <h3>Why appearance alone is not proof</h3>
            <p>
              None of these signs confirm anything by themselves. Previous
              renovations, additions or roof changes can shift what a wall is
              actually doing, and a wall built as a simple partition can end
              up supporting load added later. Wall framing, connections and
              the path loads take down to the footings are covered by the
              structural provisions in the National Construction Code&rsquo;s
              Housing Provisions—confirming how a specific wall fits that
              path takes a structural engineer working from the drawings and,
              in an established or altered home, an on-site inspection.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/2-structure/part-21-scope-and-application-section-2">
                ABCB, NCC 2022 Housing Provisions, Part 2.1 Scope and
                application of Section 2 (Structure)
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="before-you-start">
          <div className="shell prose article-prose">
            <h2 id="before-you-start">
              What a load-bearing wall removal in Adelaide usually needs
            </h2>
            <p>
              Once a wall is confirmed as structural, several things need to
              line up before anyone touches it.
            </p>

            <h3>Structural engineering assessment and design</h3>
            <p>
              An engineer determines the size and species of the replacement
              beam, where the supporting posts and their footings need to
              sit, how the new work connects to the existing structure, and
              what temporary propping is required while the old wall is out
              and the new beam is not yet carrying load.
            </p>

            <h3>Building consent and approvals</h3>
            <p>
              South Australia&rsquo;s planning system generally requires
              building work—including structural alterations—to go through a
              building consent check against the National Construction Code
              before it proceeds, and some properties, such as those in a
              Local Heritage overlay, may need additional planning consent
              as well. PlanSA&rsquo;s online tools confirm what a specific
              property and scope of work needs before demolition starts.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval">
                PlanSA, Find out if you need approval
              </a>{" "}
              and{" "}
              <a href="https://plan.sa.gov.au/development_applications/getting_approval/how_applications_are_assessed/assessment_stages/assessment_timetables/building_consent">
                PlanSA, Building consent
              </a>
              .
            </p>

            <h3>A licensed contractor for the structural work</h3>
            <p>
              Domestic building work in South Australia generally needs to be
              carried out by, or under the supervision of, a licensed
              building work contractor. Confirm licensing for the trade
              carrying out the structural demolition, beam installation and
              propping before work starts, rather than assuming it is
              covered by whoever is doing the finishing trades.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://www.sa.gov.au/topics/business-and-trade/licensing/building-and-trades/building-work-contractor-s-licence">
                SA.GOV.AU, Building work contractor&rsquo;s licence
              </a>
              .
            </p>

            <h3>Temporary support and sequencing</h3>
            <p>
              The old wall typically stays in place, propped, until the new
              beam and posts are installed and able to carry load on their
              own. Services buried in the wall—wiring, data cabling,
              plumbing or ducting—need to be identified and safely relocated
              beforehand, and adjoining rooms, floors and finishes need
              protecting while the structural stage is underway.
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="adelaide-conditions">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={loadBearingWallRemovalGuide.image}
                alt={loadBearingWallRemovalGuide.imageAlt}
                width={loadBearingWallRemovalGuide.imageWidth}
                height={loadBearingWallRemovalGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(loadBearingWallRemovalGuide.image)}
              />
              <figcaption>{loadBearingWallRemovalGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Local context</span>
              <h2 id="adelaide-conditions">Why Adelaide conditions matter</h2>
              <p>
                Removing a wall does not just change a span—it changes where
                a concentrated new point load lands on the footing system.
                Across the Adelaide Plains, reactive clay soils mean footing
                performance depends on the site classification, not only on
                the beam size, so a new post footing needs to suit the actual
                site rather than a generic detail.
              </p>
              <p>
                Established homes in suburbs such as Norwood, Unley and
                Prospect often carry structural changes from earlier
                renovations that are not obvious from the current plans,
                which is another reason an engineer&rsquo;s on-site check
                matters as much as the drawings. Where the wall being removed
                is an external one—around a garage conversion near
                Semaphore, Glenelg or Brighton, for example—exposed steel
                fixings and brackets need a corrosion class suited to the
                coastal exposure, not just the structural span.
              </p>
              <p className="article-source">
                Source:{" "}
                <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                  CSIRO,{" "}
                  <cite>Foundation Maintenance and Footing Performance</cite>
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="next-steps">
          <div className="shell prose article-prose">
            <h2 id="next-steps">Sensible next steps</h2>
            <ol className="steps">
              <li>
                <h3>Get the load path assessed</h3>
                <p>
                  Engage a structural engineer before any demolition to
                  confirm whether the wall is load-bearing and, if so, design
                  the replacement beam, posts and footings.
                </p>
              </li>
              <li>
                <h3>Confirm what approvals apply</h3>
                <p>
                  Check with PlanSA or the relevant council whether the
                  specific property and scope of work needs building consent,
                  and factor that timeline into the renovation programme.
                </p>
              </li>
              <li>
                <h3>Plan the sequence and temporary support</h3>
                <p>
                  Agree the propping approach, isolate or relocate any
                  services in the wall, and protect adjoining rooms and
                  finishes before structural work begins.
                </p>
              </li>
              <li>
                <h3>Line up licensed structural work and finishing walling</h3>
                <p>
                  A licensed contractor carries out the engineered demolition,
                  beam and post installation. Once that structural stage is
                  signed off, the new opening still needs framing junctions,
                  linings and finishes brought back to a coordinated result.
                </p>
              </li>
            </ol>

            <TickList
              items={[
                "Engineer’s design for the beam, posts and footings, signed and dated",
                "Confirmation of whether building consent is required for the property and scope",
                "A record of services located inside or near the wall before demolition",
                "The proposed propping method and how long the old wall stays supported",
                "Which licensed contractor is responsible for the structural stage",
                "How the finished opening connects to existing linings, cornices and junctions",
              ]}
            />

            <aside className="article-note article-note--warning">
              <strong>Never remove or prop a load-bearing wall on assumption.</strong>
              <p>
                Do not start demolition, cut into a suspected load-bearing
                wall or remove any part of it before engineered documentation
                and any required consent are in place. Removing structural
                support prematurely can cause sudden movement, sagging or
                collapse and put people at risk.
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
                  Confirms whether the wall is load-bearing and provides the
                  design for the beam, posts, footings and temporary
                  propping.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Licensed building work contractor</dt>
                <dd>
                  Carries out or supervises the structural demolition, beam
                  installation and propping in line with South Australian
                  licensing requirements.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Building certifier or PlanSA portal</dt>
                <dd>
                  Assesses documented building work, including structural
                  alterations, against the National Construction Code and
                  issues the required consent.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Elite Surface Group walling team</dt>
                <dd>
                  Installs the engineered opening&rsquo;s framing, connects it
                  cleanly to the existing structure at the junctions, and
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
          aria-labelledby="load-bearing-wall-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="load-bearing-wall-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="load-bearing-wall-faqs">
              <div className="faq-list__item">
                <dt>Can Elite Surface Group tell me if a wall is load-bearing?</dt>
                <dd>
                  No. Appearance and general rules of thumb can suggest it,
                  but only a structural engineer working from the drawings
                  and, where needed, an on-site inspection can confirm it.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Do I need council approval to remove an internal wall?</dt>
                <dd>
                  It depends on the property and the scope of work. Use
                  PlanSA&rsquo;s approval check or ask the relevant council or
                  a certifier before demolition is scheduled.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Can the old wall come out before the new beam is fitted?</dt>
                <dd>
                  Not safely. The wall is usually propped and left in place
                  until the engineered beam and posts are installed and able
                  to carry the load on their own.
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
        intro="If a structural engineer has confirmed the wall and approvals are in hand, tell us the property suburb and what engineering drawings or photos are available. If supporting files are needed, we'll arrange how to review them."
      />
      <CtaBand />
    </>
  );
}
