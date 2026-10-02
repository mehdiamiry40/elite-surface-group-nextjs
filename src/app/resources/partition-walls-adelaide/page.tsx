import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { partitionWallsGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: partitionWallsGuide.metaTitle,
  description: partitionWallsGuide.metaDescription,
  path: `/resources/${partitionWallsGuide.slug}`,
  image: ogCard("walling", partitionWallsGuide.metaTitle),
  openGraphType: "article",
  publishedTime: partitionWallsGuide.published,
  modifiedTime: partitionWallsGuide.modified,
});

export default function PartitionWallsGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Partition walls in Adelaide",
            href: `/resources/${partitionWallsGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={partitionWallsGuide} />

      <article>
        <PageBanner
          title={partitionWallsGuide.title}
          image={bannerImages[`/resources/${partitionWallsGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Partition walls in Adelaide" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{partitionWallsGuide.category}</span>
              <time dateTime={partitionWallsGuide.published}>
                Published {partitionWallsGuide.publishedDisplay}
              </time>
              <span>{partitionWallsGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              The wall is rarely the hard part. Adding a partition wall in
              Adelaide to turn one large room into two usually means framing,
              lining and finishing a few metres of non-load-bearing stud work.
              What decides whether the result is a legitimate bedroom is the
              room it leaves behind: does each side still get natural light and
              fresh air, is there a smoke alarm where the Code expects one, and
              has the new wall been kept clear of the roof structure above it?
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>A new wall must stay a partition.</strong>
              <p>
                A partition carries no roof, ceiling or floor load. If there is
                any doubt about what the structure above is doing—an older
                pitched roof with struts, a second storey, a sagging
                ceiling—arrange assessment by a suitably qualified professional
                before anything is framed.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#approval">Does it need approval?</a>
                </li>
                <li>
                  <a href="#new-room">What the new room has to meet</a>
                </li>
                <li>
                  <a href="#adelaide">Why Adelaide houses complicate it</a>
                </li>
                <li>
                  <a href="#what-to-confirm">What to confirm first</a>
                </li>
                <li>
                  <a href="#who-does-what">Who does what</a>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="approval">
          <div className="shell prose article-prose">
            <h2 id="approval">
              Does a partition wall in an Adelaide home need approval?
            </h2>
            <p>
              Often not, but the exemption is narrower than most people assume.
              South Australia’s planning regulations exclude certain internal
              building work from the definition of development. The conditions
              that matter here: the work must not involve demolition beyond
              fixtures, fittings or non-load-bearing partitions, and must not
              adversely affect the structural soundness of the building or the
              health or safety of the people using it.
            </p>
            <p>
              Two qualifications catch people out. The exclusions do not apply
              to a State heritage place. And they do not cover work that would
              leave the building not complying with the Building Rules—which is
              exactly what a windowless new bedroom would do. If the house is
              locally listed or sits in a heritage area, ask the council before
              assuming anything. PlanSA’s approval checker is the place to
              start.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.legislation.sa.gov.au/__legislation/lz/c/r/planning%20development%20and%20infrastructure%20(general)%20regulations%202017/current/2017.24.auth.pdf">
                Planning, Development and Infrastructure (General) Regulations
                2017, Schedule 4
              </a>{" "}
              and{" "}
              <a href="https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval">
                PlanSA, Find out if you need approval
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="new-room">
          <div className="shell prose article-prose">
            <h2 id="new-room">What the new room has to meet</h2>
            <p>
              Splitting a room with one window down the middle is the classic
              mistake. The half nearest the window is fine; the other half has
              become a habitable room with no light and no air. Three parts of
              the Housing Provisions do most of the work.
            </p>

            <h3>Natural light</h3>
            <p>
              Every habitable room needs natural light from windows—roof lights
              excluded—with a light-transmitting area of at least 10% of the
              room’s floor area. Light can be borrowed through glazing from an
              adjoining room, but only if that glazing is itself at least 10% of
              the inner room’s floor area and the outer room’s windows reach 10%
              of both rooms combined. A highlight window above the door rarely
              gets there.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/10-health-and-amenity/part-105-light">
                ABCB, NCC Housing Provisions Part 10.5 Light
              </a>
              .
            </p>

            <h3>Ventilation</h3>
            <p>
              Natural ventilation needs openable windows, doors or other devices
              with a ventilating area of at least 5% of the room’s floor area.
              Ventilating through an adjoining room is allowed on similar terms:
              5% of the inner room through the opening, and 5% of the two rooms
              combined to the outside. Neither room can be a sanitary
              compartment.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/10-health-and-amenity/part-106-ventilation">
                ABCB, NCC Housing Provisions Part 10.6 Ventilation
              </a>
              .
            </p>

            <h3>Smoke alarms</h3>
            <p>
              In a house, alarms are required in every corridor or hallway
              associated with a bedroom—or, where there is none, between the
              bedrooms and the rest of the building—and they must be
              interconnected. A new bedroom off a living area can leave the
              existing alarm in the wrong place. That is an electrician’s and
              certifier’s question, but it belongs in the plan from the start.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/9-fire-safety/part-95-smoke-alarms-and-evacuation-lighting">
                ABCB, NCC Housing Provisions Part 9.5 Smoke alarms and
                evacuation lighting
              </a>
              .
            </p>
            <p>
              Code editions change. Where the work does need consent, the
              certifier confirms which edition applies.
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="adelaide">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={partitionWallsGuide.image}
                alt={partitionWallsGuide.imageAlt}
                width={partitionWallsGuide.imageWidth}
                height={partitionWallsGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(partitionWallsGuide.image)}
              />
              <figcaption>{partitionWallsGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Local context</span>
              <h2 id="adelaide">Why Adelaide houses complicate a simple wall</h2>
              <h3>The roof above it</h3>
              <p>
                Many houses built from the 1970s on, from Golden Grove to
                Morphett Vale, have trussed roofs spanning between the external
                walls. Trusses deflect and
                settle over time, so a partition beneath them must not be packed
                tight to the bottom chord. Pryda’s installation guide calls for
                clearance between the top plate and the truss or ceiling batten,
                with slotted brackets that hold the wall steady while letting the
                truss move.
              </p>
              <p>
                Older villas in Unley, Prospect and Norwood often have pitched
                roofs where internal walls carry struts. A new wall there should
                never be wedged up to share the load.
              </p>
              <h3>The floor beneath it</h3>
              <p>
                Across the Adelaide plains, reactive clay swells and shrinks
                with moisture, and slabs and footings move with it. A slab may
                also hide plumbing or a termite management system, so nobody
                should drill the bottom plate blind. On a suspended timber floor
                the wall’s line against the joists matters.
              </p>
              <h3>The air around it</h3>
              <p>
                Ducted evaporative cooling is everywhere here. A new room usually
                wants its own outlet, and a closed door with no relief path can leave
                it stuffy. Our{" "}
                <Link href="/locations/adelaide/">Adelaide service area</Link>{" "}
                covers the suburbs where most of this work sits.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://pryda.com.au/wp-content/uploads/Pryda-Roof-Truss-Installation-Guide.pdf">
                  Pryda Roof Truss Installation Guide
                </a>
                ,{" "}
                <a href="https://pryda.com.au/product/pryda-hitch/">
                  Pryda Hitch
                </a>{" "}
                and{" "}
                <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                  CSIRO, Foundation Maintenance and Footing Performance
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="what-to-confirm">
          <div className="shell prose article-prose">
            <h2 id="what-to-confirm">What to confirm before requesting a quote</h2>
            <p>
              The more of this you can answer, the more useful the response. Our{" "}
              <Link href="/project-planning/">project planning guide</Link>{" "}
              covers the rest.
            </p>
            <TickList
              items={[
                "What each side of the wall will be used for, and which side keeps the existing window",
                "Window sizes and room dimensions, so the light and ventilation areas can be checked",
                "The roof type—trusses or a pitched roof with struts—and anything above, such as a second storey",
                "The floor: slab or suspended timber, and the wall’s direction against the joists",
                "Where the smoke alarms, cooling outlets, power points and switches sit now",
                "Heritage listing or overlay, and any council or certifier advice already received",
              ]}
            />
            <p>
              Steel or timber studs both suit a partition; the{" "}
              <Link href="/resources/steel-frame-vs-timber-frame-walls-adelaide/">
                steel versus timber framing guide
              </Link>{" "}
              covers the trade-offs. Where the plan is to take a wall out rather
              than add one, start with{" "}
              <Link href="/resources/load-bearing-wall-removal-adelaide/">
                removing a load-bearing wall in Adelaide
              </Link>
              . For sound between the two new rooms, see{" "}
              <Link href="/resources/soundproofing-walls-adelaide/">
                soundproofing walls
              </Link>
              .
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="who-does-what"
        >
          <div className="shell prose article-prose">
            <h2 id="who-does-what">Who does what</h2>
            <dl className="faq-list professional-list">
              <div className="faq-list__item">
                <dt>Council or building certifier</dt>
                <dd>
                  Confirms whether consent is needed and, where it is, which
                  Building Rules apply to the new room.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Structural engineer</dt>
                <dd>
                  Needed where the roof, ceiling or floor above may be bearing
                  on internal walls, or where a heavier wall is proposed on a
                  suspended floor.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Licensed electrician</dt>
                <dd>
                  Relocates or adds interconnected smoke alarms, switches and
                  power points.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Wall system installer</dt>
                <dd>
                  Sets out, frames, lines and finishes the wall to the agreed
                  scope, including the head detail that keeps it clear of the
                  roof. Our{" "}
                  <Link href="/walling/">Adelaide walling installation</Link>{" "}
                  work covers this stage.
                </dd>
              </div>
            </dl>

            <h2 id="partition-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="partition-faqs">
              <div className="faq-list__item">
                <dt>Can a skylight provide the light for the new room?</dt>
                <dd>
                  Not under the light provision described above, which
                  measures windows and excludes roof lights. A performance
                  solution may be possible; that is the certifier’s call.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Can the wall be taken out again later?</dt>
                <dd>
                  A true partition can, which is one reason to keep it clear of
                  the roof. Removal still means patching the ceiling, floor and
                  adjoining walls, and relocated alarms or outlets may need
                  moving back.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>Australian Building Codes Board</dt>
                <dd>
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/10-health-and-amenity/part-105-light">
                    NCC Housing Provisions, Part 10.5 Light
                  </a>
                  ,{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/10-health-and-amenity/part-106-ventilation">
                    Part 10.6 Ventilation
                  </a>{" "}
                  and{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/9-fire-safety/part-95-smoke-alarms-and-evacuation-lighting">
                    Part 9.5 Smoke alarms and evacuation lighting
                  </a>
                </dd>
              </div>
              <div>
                <dt>Government of South Australia</dt>
                <dd>
                  <a href="https://www.legislation.sa.gov.au/__legislation/lz/c/r/planning%20development%20and%20infrastructure%20(general)%20regulations%202017/current/2017.24.auth.pdf">
                    Planning, Development and Infrastructure (General)
                    Regulations 2017 (PDF)
                  </a>{" "}
                  and{" "}
                  <a href="https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval">
                    PlanSA: Find out if you need approval
                  </a>
                </dd>
              </div>
              <div>
                <dt>Manufacturer technical guidance</dt>
                <dd>
                  <a href="https://pryda.com.au/wp-content/uploads/Pryda-Roof-Truss-Installation-Guide.pdf">
                    Pryda Roof Truss Installation Guide (PDF)
                  </a>{" "}
                  and{" "}
                  <a href="https://pryda.com.au/product/pryda-hitch/">
                    Pryda Hitch
                  </a>
                </dd>
              </div>
              <div>
                <dt>CSIRO</dt>
                <dd>
                  <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                    <cite>
                      Foundation Maintenance and Footing Performance: A
                      Homeowner’s Guide
                    </cite>{" "}
                    (PDF)
                  </a>
                </dd>
              </div>
            </dl>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/walling/">Adelaide walling services</Link>
              <Link href="/resources/load-bearing-wall-removal-adelaide/">
                Load-bearing wall removal guide
              </Link>
              <Link href="/resources/steel-frame-vs-timber-frame-walls-adelaide/">
                Steel vs timber wall framing guide
              </Link>
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
        intro="If you have a floor plan or a sketch of where the new wall will go, tell us the property suburb and what drawings or photos are available. If supporting files are needed, we’ll arrange how to review them."
      />
      <CtaBand />
    </>
  );
}
