import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { soundproofingWallsGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: soundproofingWallsGuide.metaTitle,
  description: soundproofingWallsGuide.metaDescription,
  path: `/resources/${soundproofingWallsGuide.slug}`,
  image: ogCard("walling", soundproofingWallsGuide.metaTitle),
  openGraphType: "article",
  publishedTime: soundproofingWallsGuide.published,
  modifiedTime: soundproofingWallsGuide.modified,
});

export default function SoundproofingWallsGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Soundproofing walls in Adelaide",
            href: `/resources/${soundproofingWallsGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={soundproofingWallsGuide} />

      <article>
        <PageBanner
          title={soundproofingWallsGuide.title}
          image={bannerImages[`/resources/${soundproofingWallsGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Soundproofing walls in Adelaide" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{soundproofingWallsGuide.category}</span>
              <time dateTime={soundproofingWallsGuide.published}>
                Published {soundproofingWallsGuide.publishedDisplay}
              </time>
              <span>{soundproofingWallsGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              Soundproofing walls in Adelaide is a build-up problem, not a
              product problem. Four things decide what you hear—how heavy the
              wall is, whether its two faces are mechanically joined, how
              completely it is sealed, and what the sound can travel around
              through instead. Add acoustic batts to a single-framed wall with a
              gap at the ceiling line and most of the noise keeps taking the
              easier route.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>Ratings come from tested systems, not components.</strong>
              <p>
                A board, a batt or a stud on its own has no sound insulation
                rating. A rating belongs to a complete, tested build-up
                installed the way its test report describes. Where the wall also
                has to satisfy the Building Code, have the specification
                confirmed by a building certifier and an acoustic consultant.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#how-sound-moves">How sound gets through a wall</a>
                </li>
                <li>
                  <a href="#flanking">The paths around the wall</a>
                </li>
                <li>
                  <a href="#attached-dwellings">What the Code requires</a>
                </li>
                <li>
                  <a href="#adelaide">Why Adelaide walls differ</a>
                </li>
                <li>
                  <a href="#existing-home">Improving an existing wall</a>
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

        <section
          className="section section--tint"
          aria-labelledby="how-sound-moves"
        >
          <div className="shell prose article-prose">
            <h2 id="how-sound-moves">How sound gets through a wall</h2>
            <p>
              Airborne sound sets one face vibrating, the vibration crosses to
              the other face, and that face radiates it into the next room.
              Every practical measure interrupts one of those steps.
            </p>

            <h3>Mass</h3>
            <p>
              Heavier surfaces are harder to set moving. Doubling the lining on
              one face, or swapping a standard sheet for a denser board, adds
              mass without touching the framing—usually the cheapest worthwhile
              improvement.
            </p>

            <h3>Separation</h3>
            <p>
              Mass alone has limits, because studs bridge the two faces and
              carry vibration straight across. Breaking that connection—two
              independent frames, staggered studs, or resilient mounting between
              frame and lining—often does more than another layer of board. The
              Building Code’s definition of discontinuous construction sets the
              principle: at least a 20 mm cavity between two separate leaves,
              resilient ties where masonry leaves must connect, and no
              mechanical linkage elsewhere except at the periphery.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/10-health-and-amenity/part-107-sound-insulation">
                ABCB, NCC Housing Provisions Part 10.7 Sound insulation
              </a>
              .
            </p>

            <h3>Sealing</h3>
            <p>
              Air gaps are why careful walls underperform. Hebel’s party-wall
              literature puts it bluntly: perimeter gaps and penetrations have
              to be completely sealed with an appropriate fire and acoustic
              rated sealant for the system to reach the ratings it was tested
              at.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://hebel.com.au/residential/party-walls/">
                CSR Hebel party wall systems
              </a>{" "}
              and the{" "}
              <a href="https://hebel.com.au/wp-content/uploads/downloads/Low-Rise-Multi-Residential-PowerPanel-Intertenancy-and-Dual-Zero-Boundary-Walls-Design-and-Installation-Guide_HELIT152.pdf">
                PowerPanel intertenancy and dual zero boundary walls design and
                installation guide
              </a>
              .
            </p>

            <h3>Absorption inside the cavity</h3>
            <p>
              Acoustic batts work on the sound energy bouncing inside the
              cavity, not on the vibration crossing the studs. High-density
              glasswool sold for this purpose—CSR Bradford’s SoundScreen is the
              one most Adelaide builders will name—contributes to a tested
              system’s result, but will not by itself quieten a single-framed,
              hard-linked wall.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.gyprock.com.au/solutions/building-performance/acoustic-considerations">
                Gyprock acoustic considerations
              </a>{" "}
              and{" "}
              <a href="https://www.csrbradford.com.au/products/wall-insulation/internal-walls/soundscreen">
                CSR Bradford SoundScreen acoustic wall insulation
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="flanking">
          <div className="shell prose article-prose">
            <h2 id="flanking">The paths around the wall</h2>
            <p>
              Flanking transmission is sound arriving by any route other than
              straight through the wall, and in an existing house it is often
              the dominant one. The wall gets blamed; the ceiling, floor or
              ductwork is responsible. Common paths:
            </p>
            <TickList
              items={[
                "A continuous roof space or ceiling cavity running over the wall",
                "Ducted evaporative cooling outlets linked by the same ceiling void",
                "Downlights, exhaust fans and vents cut through the lining on both sides",
                "Power points set back to back in the same stud cavity",
                "Continuous floor framing or hard finishes carrying impact noise",
                "Hollow-core doors and unsealed frames in the same wall run",
              ]}
            />
            <p>
              ABCB guidance covers flanking and the measures used to describe
              wall performance: R<sub>w</sub> for airborne sound insulation, and
              C<sub>tr</sub> as a spectrum adaptation term weighting the result
              towards lower frequencies.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://ncc.abcb.gov.au/sites/default/files/resources/2023/Sound%20Transmission%20and%20Insulation%20in%20Buildings%20handbook%202022.pdf">
                ABCB,{" "}
                <cite>Sound Transmission and Insulation in Buildings</cite>{" "}
                handbook
              </a>
              .
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="attached-dwellings"
        >
          <div className="shell prose article-prose">
            <h2 id="attached-dwellings">
              What the Code requires between attached dwellings
            </h2>
            <p>
              A wall inside one house is a comfort decision. A wall between two
              dwellings is a compliance one, and the two get confused constantly
              on townhouse and dual-occupancy sites.
            </p>
            <p>
              For a separating wall between Class 1 buildings—attached houses,
              townhouses and terraces—the Housing Provisions require airborne
              sound insulation of R<sub>w</sub> + C<sub>tr</sub> not less than
              50. Where that wall separates a bathroom, sanitary compartment,
              laundry or kitchen from a habitable room other than a kitchen next
              door, it must also be of discontinuous construction. It has to
              continue to the underside of the roof, or to a ceiling giving the
              same insulation, so the roof space cannot flank over the top.
            </p>
            <p>
              That wall almost always carries a fire resistance requirement too,
              and one tested system usually satisfies both.{" "}
              <Link href="/hebel/">Hebel panel systems</Link> are common here
              because the panel itself contributes the fire rating. Code
              editions change, so confirm with the certifier which one applies
              to your approval.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/10-health-and-amenity/part-107-sound-insulation">
                ABCB, NCC Housing Provisions Part 10.7
              </a>{" "}
              and{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/9-fire-safety/part-93-fire-protection-separating-walls-and-floors">
                Part 9.3 Fire protection of separating walls and floors
              </a>
              .
            </p>

            <aside className="article-note article-note--warning">
              <strong>Do not design a separating wall from a guide.</strong>
              <p>
                Elite Surface Group installs wall systems to a documented
                specification; we do not certify fire or acoustic performance.
                Arrange assessment by a suitably qualified professional before
                the wall is built or altered.
              </p>
            </aside>
          </div>
        </section>

        <section className="section" aria-labelledby="adelaide">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={soundproofingWallsGuide.image}
                alt={soundproofingWallsGuide.imageAlt}
                width={soundproofingWallsGuide.imageWidth}
                height={soundproofingWallsGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(soundproofingWallsGuide.image)}
              />
              <figcaption>{soundproofingWallsGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Local context</span>
              <h2 id="adelaide">Why Adelaide walls differ</h2>
              <p>
                Infill is where most of this comes up. The state’s planning
                strategy points denser housing at established corridors like
                Prospect Road, Unley Road and The Parade—more attached dwellings
                sharing a wall in suburbs built as detached cottages.
              </p>
              <p>
                The existing stock behaves differently again. A solid double
                brick wall in Norwood or Unley has useful mass but no
                separation, so its weakness is the roof space above it. A 1990s
                timber-framed house in Golden Grove or Salisbury has the
                opposite problem—light linings, hard-linked studs and a ceiling
                void running the length of the building. Adelaide’s widespread
                ducted evaporative cooling adds a second shared void, which is
                why bedrooms either side of a well-built wall still hear each
                other.
              </p>
              <p>
                External noise is a glazing and sealing question more than a
                wall one—worth separating out before money goes into the wrong
                element. Our{" "}
                <Link href="/locations/adelaide/">Adelaide service area</Link>{" "}
                covers the suburbs where most of this work sits.
              </p>
              <p className="article-source">
                Source:{" "}
                <a href="https://plan.sa.gov.au/news/article/2025/a-plan-for-a-greater-adelaide">
                  PlanSA, A plan for a greater Adelaide
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="existing-home"
        >
          <div className="shell prose article-prose">
            <h2 id="existing-home">
              Soundproofing walls in an existing Adelaide home
            </h2>
            <p>
              Retrofitting comes down to how much of the wall you are willing to
              open, in rough order of disruption:
            </p>
            <ol className="steps">
              <li>
                <h3>Seal what is already there</h3>
                <p>
                  Close service penetrations, pack door frames, stagger
                  back-to-back power points and deal with the ceiling line.
                  Often the difference between a wall that underperforms and one
                  that performs as designed.
                </p>
              </li>
              <li>
                <h3>Add mass to one face</h3>
                <p>
                  A second layer of dense lining, sealed at the perimeter. Costs
                  a little room width, and cornice, skirting, architraves and
                  switch plates need resetting.
                </p>
              </li>
              <li>
                <h3>Open the wall and rebuild the cavity</h3>
                <p>
                  Strip one face, insulate, add resilient mounting or a second
                  independent frame, then reline. Specify it from a tested
                  build-up, because you only want to do it once.
                </p>
              </li>
            </ol>
            <p>
              Where flanking dominates, none of that satisfies alone: the roof
              space, ducting and ceiling penetrations may matter more.
            </p>
            <p>
              Anything that adds real weight to an upper floor, or removes part
              of a wall rather than lining it, changes how load travels through
              the building—a structural question before an acoustic one. Our
              guide on{" "}
              <Link href="/resources/load-bearing-wall-removal-adelaide/">
                removing a load-bearing wall in Adelaide
              </Link>{" "}
              covers what to confirm first.
            </p>
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
                "Whether the wall separates two dwellings or two rooms in one dwelling",
                "What the noise is—voices, television, footsteps, traffic, plant—and when you hear it",
                "The existing construction, lining thickness and whether the cavity is insulated",
                "What sits above the wall: a ceiling and roof space, a floor, or continuous framing",
                "Whether evaporative cooling, downlights or exhaust fans penetrate the ceiling both sides",
                "Any acoustic report, tested system number, approved drawings or certifier requirement",
              ]}
            />
            <p>
              Where a documented system already exists, our{" "}
              <Link href="/walling/">Adelaide walling installation</Link> scope
              is to build it exactly as specified, so the wall on site matches
              the wall that was tested.
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
                <dt>Acoustic consultant</dt>
                <dd>
                  Identifies the dominant path and specifies a build-up that
                  will achieve the target. Worth engaging before spending on a
                  retrofit.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Building certifier</dt>
                <dd>
                  Confirms which Code requirements apply and accepts the
                  evidence that the chosen system satisfies them.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Structural engineer</dt>
                <dd>
                  Needed where added mass, an extra frame or an altered opening
                  changes how loads travel—particularly upstairs or on a
                  reactive clay site.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Wall system installer</dt>
                <dd>
                  Builds the specified system to its documentation, including
                  the sealing and junction details that decide whether the
                  tested result is reached.
                </dd>
              </div>
            </dl>

            <h2 id="soundproofing-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="soundproofing-faqs">
              <div className="faq-list__item">
                <dt>Can an existing wall be brought up to the separating-wall standard?</dt>
                <dd>
                  Sometimes, but it has to be assessed rather than assumed. The
                  requirement covers the complete construction including the
                  junction at the roof, so a retrofit that cannot address the
                  ceiling line rarely gets there.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Who do I contact about noise from a neighbouring property?</dt>
                <dd>
                  In South Australia it depends on the source. Councils handle
                  neighbourhood nuisance such as construction noise, pool pumps
                  and air conditioners; SAPOL handles domestic noise such as
                  parties; the EPA deals with licensed commercial and industrial
                  premises. That is a separate matter from building work on your
                  own wall. Where the external wall is still being chosen,
                  compare systems on{" "}
                  <Link href="/resources/hebel-vs-brick-veneer-adelaide/">
                    Hebel versus brick veneer
                  </Link>
                  .
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>Australian Building Codes Board</dt>
                <dd>
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/10-health-and-amenity/part-107-sound-insulation">
                    NCC Housing Provisions, Part 10.7 Sound insulation
                  </a>{" "}
                  and{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/9-fire-safety/part-93-fire-protection-separating-walls-and-floors">
                    Part 9.3 Fire protection of separating walls and floors
                  </a>
                </dd>
              </div>
              <div>
                <dt>Australian Building Codes Board</dt>
                <dd>
                  <a href="https://ncc.abcb.gov.au/sites/default/files/resources/2023/Sound%20Transmission%20and%20Insulation%20in%20Buildings%20handbook%202022.pdf">
                    <cite>Sound Transmission and Insulation in Buildings</cite>{" "}
                    handbook (PDF)
                  </a>
                </dd>
              </div>
              <div>
                <dt>Manufacturer technical guidance</dt>
                <dd>
                  <a href="https://hebel.com.au/residential/party-walls/">
                    CSR Hebel: Party Walls
                  </a>{" "}
                  and its{" "}
                  <a href="https://hebel.com.au/wp-content/uploads/downloads/Low-Rise-Multi-Residential-PowerPanel-Intertenancy-and-Dual-Zero-Boundary-Walls-Design-and-Installation-Guide_HELIT152.pdf">
                    intertenancy wall design and installation guide
                  </a>
                  ,{" "}
                  <a href="https://www.gyprock.com.au/solutions/building-performance/acoustic-considerations">
                    Gyprock: Acoustic Considerations
                  </a>{" "}
                  and{" "}
                  <a href="https://www.csrbradford.com.au/products/wall-insulation/internal-walls/soundscreen">
                    CSR Bradford: SoundScreen acoustic wall insulation
                  </a>
                </dd>
              </div>
              <div>
                <dt>Environment Protection Authority South Australia</dt>
                <dd>
                  <a href="https://www.epa.sa.gov.au/community/neighbourhood-nuisance">
                    Neighbourhood nuisance and noise
                  </a>
                </dd>
              </div>
              <div>
                <dt>PlanSA</dt>
                <dd>
                  <a href="https://plan.sa.gov.au/news/article/2025/a-plan-for-a-greater-adelaide">
                    A plan for a greater Adelaide
                  </a>
                </dd>
              </div>
            </dl>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/walling/">Adelaide walling services</Link>
              <Link href="/hebel/">Hebel wall systems</Link>
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
        intro="If an acoustic report or a specified wall system is already in hand, tell us the property suburb and what drawings, test documentation or photos are available. If supporting files are needed, we’ll arrange how to review them."
      />
      <CtaBand />
    </>
  );
}
