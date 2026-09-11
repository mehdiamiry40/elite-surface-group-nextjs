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
  image: ogCard(
    "hebel-vs-brick-veneer-adelaide",
    hebelVsBrickVeneerGuide.metaTitle,
  ),
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
            label: "Hebel or brick veneer",
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
            { label: "Hebel or brick veneer" },
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
              The Hebel vs brick veneer decision usually gets made on look and
              price, and those are the two things that separate them least. A
              rendered brick veneer wall and a rendered Hebel wall can finish
              almost identically. What differs sits behind the finish: how the
              wall sheds water, what it weighs on the footing, how thick the
              build-up is, and which trade owns the surface at the end.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>The wall system is a documented design decision.</strong>
              <p>
                Structural adequacy, footing design, fire separation and
                weatherproofing are determined by the engineer, designer and
                certifier for your site—not by a product comparison. Arrange
                assessment by a suitably qualified professional before a system
                is locked in. We install and finish walls to a documented
                specification; we do not certify structures.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#how-built">How each wall is actually built</a>
                </li>
                <li>
                  <a href="#what-differs">What actually differs</a>
                </li>
                <li>
                  <a href="#adelaide">What Adelaide conditions change</a>
                </li>
                <li>
                  <a href="#finish">Finish, coatings and upkeep</a>
                </li>
                <li>
                  <a href="#approvals">Approvals, warranties and trade scope</a>
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

        <section className="section section--tint" aria-labelledby="how-built">
          <div className="shell prose article-prose">
            <h2 id="how-built">How each wall is actually built</h2>
            <p>
              Both are veneers: neither the brickwork nor the panel carries the
              roof, the frame behind it does. So the comparison is about the
              skin, not the structure.
            </p>
            <h3>Brick veneer</h3>
            <p>
              A single leaf of masonry stands off the frame with a cavity
              between the two, tied back at intervals. The NCC housing
              provisions set the clear width of that cavity at not less than
              25&nbsp;mm and not more than 75&nbsp;mm, with damp-proof courses
              and flashings to the weatherproofing clauses. The cavity is the
              point of the system: water that gets through the outer leaf runs
              down its back and out at the flashings instead of reaching the
              frame.
            </p>
            <h3>Hebel panels</h3>
            <p>
              Hebel&rsquo;s PowerPanelXL external wall system uses 75&nbsp;mm
              thick, 600&nbsp;mm wide steel-reinforced autoclaved aerated
              concrete panels, fixed vertically to the manufacturer&rsquo;s
              perforated top hat sections on a loadbearing steel or timber
              frame. The panels are jointed, then finished with a coating
              system qualified for the product. It is a panel-and-coating wall
              rather than a masonry-and-cavity wall, so the details that keep
              water out sit in the jointing and the coating. Our{" "}
              <Link href="/resources/rendering-hebel-panels-adelaide/">
                guide to rendering Hebel panels
              </Link>{" "}
              covers that side of the system in more depth.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/5-masonry/part-52-masonry-veneer">
                NCC 2022 Housing Provisions, Part 5.2 Masonry veneer
              </a>{" "}
              and{" "}
              <a href="https://hebel.com.au/residential/external-walls/">
                CSR Hebel, external wall panels
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="what-differs">
          <div className="shell prose article-prose">
            <h2 id="what-differs">
              Hebel vs brick veneer: what actually differs
            </h2>
            <p>
              Set aside the marketing on both sides and a short list of real
              differences remains—the ones that change a drawing, a budget or a
              programme.
            </p>
            <TickList
              items={[
                "Weight—autoclaved aerated concrete is substantially lighter than clay brick, which the engineer accounts for in the footing and frame design",
                "Build-up thickness—a panel on top hats is usually a thinner wall than a brick leaf plus its cavity, which matters on a narrow allotment",
                "Water management—brick veneer relies on a drained cavity and flashings; a panel wall relies on its jointing and coating being installed as documented",
                "Finish—face brick is finished the day it is laid; a Hebel wall is not finished until the coating system is complete",
                "Movement control—both need articulation or control joints, but they land in different places and come from different documents",
                "Programme and scope—the two systems put the wall trade at different points in the build, and split the finishing work differently",
              ]}
            />
            <p>
              Notice what is not on that list: a single number for insulation,
              fire or acoustic performance. What a wall achieves depends on the
              whole documented build-up, not the outer skin, so take those
              figures from the certification for the specific assembly rather
              than a comparison table.
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="adelaide">
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
              <span className="eyebrow">Local context</span>
              <h2 id="adelaide">What Adelaide conditions change</h2>
              <p>
                Reactive clay soils run across much of the Adelaide plains, and
                they swell and shrink with the seasons. That movement reaches
                the wall through the footing, so the site classification and
                footing design come first and the wall system follows.
                CSIRO&rsquo;s guidance on footing performance is worth reading
                before either system is priced.
              </p>
              <p>
                Adelaide sits in NCC climate zone 5, warm temperate, and the
                housing provisions set minimum wall R-Values by zone. Whichever
                skin you choose, the wall has to reach the figure the energy
                assessment relies on, and the insulation that gets it there
                generally sits in the frame, not the veneer.
              </p>
              <p>
                Exposure varies sharply across the metro area. Salt-laden air
                at Semaphore, Glenelg and Brighton is harder on fixings,
                lintels and coatings than an inland suburb, and durability
                requirements follow the exposure category, not the postcode. On
                the Hills fringe, bushfire-prone designation adds its own
                requirements—our{" "}
                <Link href="/resources/fibre-cement-vs-weatherboard-cladding-adelaide/">
                  cladding comparison guide
                </Link>{" "}
                covers how that zoning is confirmed.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                  CSIRO,{" "}
                  <cite>Foundation Maintenance and Footing Performance</cite>{" "}
                  (PDF)
                </a>
                ,{" "}
                <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/13-energy-efficiency/part-132-building-fabric">
                  NCC 2022 Housing Provisions, Part 13.2 Building fabric
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

        <section className="section" aria-labelledby="finish">
          <div className="shell prose article-prose">
            <h2 id="finish">Finish, coatings and upkeep</h2>
            <p>
              This is where the two paths diverge most for an owner. Face brick
              is essentially the finished surface, and its upkeep is repointing
              and cleaning rather than recoating. A Hebel wall is designed to
              be coated, and the coating is part of the system rather than a
              decorating choice made afterwards.
            </p>
            <p>
              If the plan is a rendered look either way, the Hebel vs brick
              veneer comparison narrows sharply: rendering brick veneer adds a
              coating trade and a maintenance cycle to a wall that did not need
              one, putting both systems on the same recoating footing. Our{" "}
              <Link href="/resources/repainting-render-adelaide/">
                guide to repainting rendered walls
              </Link>{" "}
              sets out what that cycle involves, and{" "}
              <Link href="/resources/acrylic-render-vs-cement-render-adelaide/">
                acrylic render vs cement render
              </Link>{" "}
              covers how the coating type behaves locally. Take the recoat
              interval from the product literature for the system you select,
              not from a colour chart.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://hebel.com.au/coatings/">
                CSR Hebel, coatings
              </a>{" "}
              and{" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex/systems-and-guides/">
                Dulux AcraTex systems and guides
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="approvals">
          <div className="shell prose article-prose">
            <h2 id="approvals">Approvals, warranties and trade scope</h2>
            <p>
              Both systems go through the same South Australian approval
              pathway, and the wall is one of the things building consent is
              assessed against. South Australia also applies its own variations
              to the NCC, so a detail settled interstate is worth confirming
              against the SA position before it is drawn.
            </p>
            <p>
              Product warranties are conditional on the documented system being
              installed as specified—substituting a fixing, a jointing product
              or a coating outside the manufacturer&rsquo;s literature is the
              usual way a warranty quietly stops applying. Read the warranty
              terms alongside the installation guide.
            </p>
            <p>
              Then settle the scope in writing: who supplies the top hats and
              fixings, who installs the panels, who does the jointing, who
              applies the coating, and who owns the window junctions. On a
              brick veneer job the equivalent questions are about the
              bricklayer, the flashings, the weepholes and the render trade.
              Our{" "}
              <Link href="/hebel/">Adelaide Hebel installation services</Link>{" "}
              and <Link href="/render/">render services</Link> work to whichever
              split the contract sets, and{" "}
              <Link href="/project-planning/">our project planning notes</Link>{" "}
              list what is useful to have ready first. The{" "}
              <Link href="/projects/two-storey-exterior-render/">
                two-storey exterior render case study
              </Link>{" "}
              records the finish both systems usually aim at.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://plan.sa.gov.au/resources/building/building_code">
                PlanSA, the Building Code in South Australia
              </a>
              ,{" "}
              <a href="https://plan.sa.gov.au/development_applications/getting_approval/how_applications_are_assessed/types_of_consent">
                PlanSA, types of consent
              </a>{" "}
              and{" "}
              <a href="https://hebel.com.au/resources/warranty/">
                CSR Hebel, warranty
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
                <h3>Get the site classified before you choose a skin</h3>
                <p>
                  The soil report and site classification drive the footing
                  design, which constrains what the wall can be. Ordering it
                  early stops a system being chosen twice.
                </p>
              </li>
              <li>
                <h3>Decide the finished look first</h3>
                <p>
                  Face brick, rendered brick and coated panel are three
                  different maintenance futures. A rendered result narrows the
                  comparison to buildability and programme.
                </p>
              </li>
              <li>
                <h3>Confirm exposure and any overlays</h3>
                <p>
                  Check the coastal exposure, whether the allotment is
                  bushfire-prone, and whether a heritage or character overlay
                  applies. Each can rule a detail out before price enters the
                  conversation.
                </p>
              </li>
              <li>
                <h3>Ask for the system documents, not the brochure</h3>
                <p>
                  Request the design and installation guide, certification and
                  warranty conditions for the exact system proposed, then check
                  the quoted scope matches them and names who does the
                  jointing, coating and junctions. Most finish disputes trace
                  back to a scope gap nobody priced.
                </p>
              </li>
            </ol>

            <aside className="article-note article-note--warning">
              <strong>Cutting either material is regulated work.</strong>
              <p>
                Dry-cutting or grinding autoclaved aerated concrete, brick,
                mortar and render can generate respirable crystalline silica,
                which is regulated in South Australia. Whichever system is
                selected, confirm how dust will be controlled before cutting
                starts.
              </p>
            </aside>
            <p className="article-source">
              Source:{" "}
              <a href="https://www.safework.sa.gov.au/industry/construction/crystalline-silica-substances-regulations">
                SafeWork SA, crystalline silica substances regulations
              </a>
              .
            </p>
          </div>
        </section>

        <section
          id="faqs-and-sources"
          className="section section--tint"
          aria-labelledby="hebel-brick-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="hebel-brick-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="hebel-brick-faqs">
              <div className="faq-list__item">
                <dt>Is one system warmer than the other?</dt>
                <dd>
                  Thermal performance comes from the whole assembly, and in
                  both systems most of the insulation sits in the frame.
                  Compare the R-Value the documented build-up achieves against
                  the climate zone 5 requirement, not the two skins against
                  each other.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Can Hebel be used on an upper level over an existing house?</dt>
                <dd>
                  Sometimes—it is one reason lighter systems come up in
                  addition projects—but the existing footings and frame have to
                  be assessed for the added load first. Our{" "}
                  <Link href="/resources/second-storey-addition-adelaide/">
                    second-storey addition guide
                  </Link>{" "}
                  covers that assessment.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Will a Hebel wall look different to rendered brick?</dt>
                <dd>
                  Finished well, the difference is hard to pick from the
                  street. Where you do see it is in the joint layout and the
                  reveal depths, because the two walls are different
                  thicknesses.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Which one is cheaper?</dt>
                <dd>
                  It depends on the design, site access, frame, finish and
                  programme. The honest answer comes from two comparable quotes
                  on the same documented scope; treat a figure quoted without
                  your drawings as a guess.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>Australian Building Codes Board</dt>
                <dd>
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/5-masonry/part-52-masonry-veneer">
                    NCC 2022 Housing Provisions, Part 5.2 Masonry veneer
                  </a>
                  ,{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/13-energy-efficiency/part-132-building-fabric">
                    Part 13.2 Building fabric
                  </a>{" "}
                  and the{" "}
                  <a href="https://www.abcb.gov.au/resource/map/climate-zone-map-sa">
                    South Australian climate zone map
                  </a>
                </dd>
              </div>
              <div>
                <dt>CSR Hebel</dt>
                <dd>
                  <a href="https://hebel.com.au/residential/external-walls/">
                    External wall panels
                  </a>
                  ,{" "}
                  <a href="https://hebel.com.au/wp-content/uploads/2025/12/Hebel-Houses-and-Low-Rise-Multi-Residential-External-Walls-PowerPanelXL-Design-and-Installation-Guide_HELIT016_MAY24-1.pdf">
                    <cite>
                      Houses and Low Rise Multi Residential External Walls
                      PowerPanelXL Design and Installation Guide
                    </cite>{" "}
                    (PDF)
                  </a>
                  ,{" "}
                  <a href="https://hebel.com.au/resources/technical-documents/">
                    technical documents
                  </a>{" "}
                  and{" "}
                  <a href="https://hebel.com.au/resources/warranty/">warranty</a>
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
                  <a href="https://plan.sa.gov.au/resources/building/building_code">
                    PlanSA, the Building Code in South Australia
                  </a>
                  ,{" "}
                  <a href="https://plan.sa.gov.au/development_applications/getting_approval/how_applications_are_assessed/types_of_consent">
                    types of consent
                  </a>{" "}
                  and{" "}
                  <a href="https://www.safework.sa.gov.au/industry/construction/crystalline-silica-substances-regulations">
                    SafeWork SA, crystalline silica substances regulations
                  </a>
                </dd>
              </div>
              <div>
                <dt>Dulux</dt>
                <dd>
                  <a href="https://www.dulux.com.au/specifier/products/acratex/systems-and-guides/">
                    AcraTex systems and guides
                  </a>
                </dd>
              </div>
            </dl>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/hebel/">Adelaide Hebel installation</Link>
              <Link href="/resources/rendering-hebel-panels-adelaide/">
                Rendering Hebel panels guide
              </Link>
              <Link href="/resources/hebel-boundary-walls-adelaide/">
                Hebel boundary walls guide
              </Link>
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
        intro="If a wall system has been documented, tell us the suburb, the frame type and what the drawings and specification call for. Plans, elevations and the system guide help us scope the work accurately."
      />
      <CtaBand />
    </>
  );
}
