import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { hebelFenceGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: hebelFenceGuide.metaTitle,
  description: hebelFenceGuide.metaDescription,
  path: `/resources/${hebelFenceGuide.slug}`,
  image: ogCard("hebel", hebelFenceGuide.metaTitle),
  openGraphType: "article",
  publishedTime: hebelFenceGuide.published,
  modifiedTime: hebelFenceGuide.modified,
});

export default function HebelFenceGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Hebel fence in Adelaide",
            href: `/resources/${hebelFenceGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={hebelFenceGuide} />

      <article>
        <PageBanner
          title={hebelFenceGuide.title}
          image={bannerImages[`/resources/${hebelFenceGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Hebel fence in Adelaide" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{hebelFenceGuide.category}</span>
              <time dateTime={hebelFenceGuide.published}>
                Published {hebelFenceGuide.publishedDisplay}
              </time>
              <span>{hebelFenceGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              A Hebel fence in Adelaide is decided by three things before
              anyone talks about colour: whether your council treats an AAC
              panel fence as masonry for approval purposes, how much of the
              cost your neighbour is actually obliged to share, and what the
              soil and wind on your site ask of the posts. Settle those first
              and the panels themselves are the easy part.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>Footings and approvals are not installer calls.</strong>
              <p>
                Post embedment, footing size and whether a fence needs
                development approval depend on your site, its soil, its wind
                exposure and the current rules. Arrange assessment by a
                suitably qualified professional where the manufacturer&rsquo;s
                tables do not clearly cover your site, and confirm the approval
                pathway with your council. We install to a documented
                specification; we do not certify structures.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#what-it-is">What the fence is made of</a>
                </li>
                <li>
                  <a href="#approval">Does it need approval?</a>
                </li>
                <li>
                  <a href="#neighbour">Your neighbour and the Fences Act</a>
                </li>
                <li>
                  <a href="#footings">Posts, footings and Adelaide soil</a>
                </li>
                <li>
                  <a href="#finish">Finish and upkeep</a>
                </li>
                <li>
                  <a href="#faqs-and-sources">Questions and sources</a>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="what-it-is">
          <div className="shell prose article-prose">
            <h2 id="what-it-is">What the fence is actually made of</h2>
            <p>
              CSR sells its fencing system as PowerFence. It uses 75&nbsp;mm
              thick, steel-reinforced autoclaved aerated concrete panels that
              slide between galvanised steel posts and are held with a
              purpose-made bracket set. The panels arrive raw and are finished
              on site with a render or paint coating.
            </p>
            <p>
              That makes it a different thing from the Hebel walls on a house.
              A fence stands on its own, carries nothing but its own weight and
              the wind, and is open to weather on both faces. It is also not a{" "}
              <Link href="/resources/hebel-boundary-walls-adelaide/">
                Hebel boundary wall
              </Link>
              , which is part of a building and sits under a separate set of
              fire and building rules. Keep the two apart in drawings, quotes
              and conversations with council. Our{" "}
              <Link href="/hebel/">Hebel installation</Link> page covers the
              wall systems.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://hebel.com.au/products/panels/powerfence/">
                CSR Hebel PowerFence product information
              </a>{" "}
              and{" "}
              <a href="https://hebel.com.au/wp-content/uploads/downloads/How-to-Build-a-Hebel-PowerFence_HELIT080.pdf">
                <cite>How to Build a Hebel PowerFence</cite> (PDF)
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="approval">
          <div className="shell prose article-prose">
            <h2 id="approval">Does a Hebel fence need council approval?</h2>
            <p>
              South Australian planning rules exempt many residential fences
              from development approval, but the height limit is lower for
              masonry. The Legal Services Commission&rsquo;s Law Handbook
              summarises it as fences under 2.1&nbsp;metres being exempt, or
              under 1&nbsp;metre where the fence is masonry. A 1.8&nbsp;metre
              boundary fence clears the first limit but not the second, so
              whether an AAC panel fence counts as masonry is the question that
              matters.
            </p>
            <p>
              Do not guess the answer, and do not take it from a sales
              brochure. Ask your council in writing, describing the product,
              its height and the site, and keep the reply. PlanSA&rsquo;s
              approval checker is the place to start.
            </p>
            <p>
              Several things can require approval regardless of material:
            </p>
            <TickList
              items={[
                "A fence close to a road intersection, where sight lines for drivers are protected",
                "A fence forming part of a swimming pool safety barrier",
                "A fence on top of, or combined with, a retaining wall where ground levels differ",
                "Sites in a heritage area or a character overlay, common across older suburbs such as Unley, Norwood and Prospect",
              ]}
            />
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.lawhandbook.sa.gov.au/ch28s02s03s03.php">
                Law Handbook, Categories of development
              </a>{" "}
              and{" "}
              <a href="https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval">
                PlanSA, Find out if you need approval
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="neighbour">
          <div className="shell prose article-prose">
            <h2 id="neighbour">Your neighbour and the Fences Act</h2>
            <p>
              A dividing fence in South Australia falls under the{" "}
              <cite>Fences Act 1975</cite>. Before work starts, the owner
              proposing it serves the adjoining owner with a formal notice
              setting out the work, its cost and the contribution sought. The
              neighbour then has 30 days to serve a cross-notice objecting or
              making a counter-proposal. Silence for 30 days is treated as
              agreement.
            </p>
            <h3>Who pays for the upgrade</h3>
            <p>
              This is where AAC panels differ most from sheet steel. The
              Act asks a neighbour to contribute half the cost of an{" "}
              <em>adequate</em> fence, judged against ordinary fencing in the
              area. In most Adelaide residential streets that means a steel
              sheet fence. If you want something better than adequate and your
              neighbour is content with steel, the difference in cost is yours.
              Price both options before serving the notice so the figures you
              put in it hold up.
            </p>
            <h3>Where the line actually is</h3>
            <p>
              A solid fence is costly to move. If the existing fence has
              wandered, or a title sketch is the only evidence, have a licensed
              surveyor peg the boundary first. And if the old fence is
              corrugated fibro, still common on older Adelaide properties, it
              may contain asbestos and has to
              be dealt with properly before demolition. Our{" "}
              <Link href="/resources/asbestos-cladding-replacement-adelaide/">
                asbestos cladding guide
              </Link>{" "}
              covers who is licensed to remove it.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.legislation.sa.gov.au/__legislation/lz/c/a/fences%20act%201975/current/1975.44.auth.pdf">
                <cite>Fences Act 1975</cite> (PDF)
              </a>
              ,{" "}
              <a href="https://www.lawhandbook.sa.gov.au/ch31s02s01.php">
                Law Handbook, Sharing costs between neighbours
              </a>{" "}
              and{" "}
              <a href="https://www.dhud.sa.gov.au/our-department/office-of-the-surveyor-general/surveying/cadastral-surveying">
                Office of the Surveyor-General cadastral surveying guidance
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="footings">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={hebelFenceGuide.image}
                alt={hebelFenceGuide.imageAlt}
                width={hebelFenceGuide.imageWidth}
                height={hebelFenceGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(hebelFenceGuide.image)}
              />
              <figcaption>{hebelFenceGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Local context</span>
              <h2 id="footings">Posts, footings and Adelaide soil</h2>
              <p>
                A solid panel fence catches the full force of the wind, and
                every bit of that load ends up in the post footings. CSR&rsquo;s
                installation guide makes post embedment depend on wind region
                and soil type, gives its table as a general guide only, and
                recommends confirming soil and wind conditions with an engineer
                or the local authority.
              </p>
              <p>
                Much of the Adelaide plains sits on reactive clay that swells
                when wet and shrinks through a dry summer. Garden watering,
                trees and leaking downpipes along a boundary all change soil
                moisture near the posts. A rigid panel fence shows movement
                that a steel sheet fence would hide, so treat the footing as
                part of the design rather than a hole to fill.
              </p>
              <p>
                Exposure matters too. A coastal frontage at Semaphore, Glenelg
                or Brighton, or a ridge-top block in the Hills, is a different
                case from a sheltered suburban yard. Ask what corrosion
                protection the posts and brackets carry and whether the
                manufacturer&rsquo;s tables cover your site.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://hebel.com.au/wp-content/uploads/downloads/How-to-Build-a-Hebel-PowerFence_HELIT080.pdf">
                  CSR Hebel PowerFence guide
                </a>{" "}
                and{" "}
                <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                  CSIRO,{" "}
                  <cite>Foundation Maintenance and Footing Performance</cite>
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="finish">
          <div className="shell prose article-prose">
            <h2 id="finish">Finish and upkeep</h2>
            <p>
              Uncoated AAC is porous, so the coating is what keeps water out
              of the panels. Choose a coating system documented for AAC and
              follow its preparation, joint and recoat guidance; the same{" "}
              <Link href="/render/">render and texture coating</Link> questions
              that apply to a Hebel wall apply here. Both faces need finishing,
              so agree with your neighbour who coats their side, and when.
            </p>
            <p>
              Before you ask for a price, have this ready:
            </p>
            <TickList
              items={[
                "Fence length, height and the number of gates or returns",
                "Your council's written answer on approval",
                "The agreed Fences Act position with your neighbour",
                "Whether the boundary has been surveyed",
                "What is there now, and whether it may contain asbestos",
                "Any soil report or engineering advice for the site",
                "Access along the boundary for panels, posts and concrete",
              ]}
            />
            <aside className="article-note article-note--warning">
              <strong>Cutting AAC needs silica controls.</strong>
              <p>
                SafeWork SA includes autoclaved aerated concrete among
                crystalline-silica substances. Cutting or routing panels
                creates respirable dust that must be controlled under current
                workplace rules. Follow CSR&rsquo;s safety information if you
                are building it yourself.
              </p>
            </aside>
            <p className="article-source">
              Sources:{" "}
              <a href="https://hebel.com.au/coatings/">CSR Hebel coatings</a>,{" "}
              <a href="https://hebel.com.au/resources/safety/">
                CSR Hebel safety information
              </a>{" "}
              and{" "}
              <a href="https://www.safework.sa.gov.au/industry/construction/crystalline-silica-substances-regulations">
                SafeWork SA crystalline-silica substances regulations
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="faqs-and-sources">
          <div className="shell prose article-prose">
            <h2 id="faqs-and-sources">Common questions</h2>
            <dl className="faq-list" aria-labelledby="faqs-and-sources">
              <div className="faq-list__item">
                <dt>Will a Hebel fence block road noise?</dt>
                <dd>
                  CSR describes PowerFence as reflecting unwanted noise, and a
                  solid fence generally does better than lapped sheet steel.
                  How much quieter a yard gets depends on height, gaps, gates
                  and where the noise comes from, so we don&rsquo;t quote a
                  figure.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Can the fence hold back soil where levels differ?</dt>
                <dd>
                  Do not assume so. Retaining is a separate structure with its
                  own design, and a retaining wall combined with a fence can
                  need approval. Get it documented before the panels go in.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Can my neighbour refuse a Hebel fence?</dt>
                <dd>
                  They can serve a cross-notice within 30 days objecting to the
                  proposal. If agreement cannot be reached, the Act provides a
                  path through the courts. Get legal advice before building a
                  disputed fence.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>CSR Hebel</dt>
                <dd>
                  <a href="https://hebel.com.au/products/panels/powerfence/">
                    PowerFence
                  </a>
                  ,{" "}
                  <a href="https://hebel.com.au/wp-content/uploads/downloads/How-to-Build-a-Hebel-PowerFence_HELIT080.pdf">
                    <cite>How to Build a Hebel PowerFence</cite> (PDF)
                  </a>
                  , <a href="https://hebel.com.au/coatings/">coatings</a> and{" "}
                  <a href="https://hebel.com.au/resources/safety/">safety</a>
                </dd>
              </div>
              <div>
                <dt>South Australian legislation and planning</dt>
                <dd>
                  <a href="https://www.legislation.sa.gov.au/__legislation/lz/c/a/fences%20act%201975/current/1975.44.auth.pdf">
                    <cite>Fences Act 1975</cite> (PDF)
                  </a>{" "}
                  and{" "}
                  <a href="https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval">
                    PlanSA, Find out if you need approval
                  </a>
                </dd>
              </div>
              <div>
                <dt>Legal Services Commission of South Australia</dt>
                <dd>
                  Law Handbook:{" "}
                  <a href="https://www.lawhandbook.sa.gov.au/ch28s02s03s03.php">
                    Categories of development
                  </a>{" "}
                  and{" "}
                  <a href="https://www.lawhandbook.sa.gov.au/ch31s02s01.php">
                    Sharing costs between neighbours
                  </a>
                </dd>
              </div>
              <div>
                <dt>Government of South Australia</dt>
                <dd>
                  <a href="https://www.dhud.sa.gov.au/our-department/office-of-the-surveyor-general/surveying/cadastral-surveying">
                    Office of the Surveyor-General, cadastral surveying
                  </a>{" "}
                  and{" "}
                  <a href="https://www.safework.sa.gov.au/industry/construction/crystalline-silica-substances-regulations">
                    SafeWork SA, crystalline-silica substances regulations
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
              <Link href="/hebel/">Adelaide Hebel installation</Link>
              <Link href="/resources/hebel-boundary-walls-adelaide/">
                Hebel boundary walls guide
              </Link>
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
        defaultService="Hebel"
        intro="If you are planning an AAC panel fence, tell us the suburb, the fence length and height, and where approval and your neighbour's agreement stand. We'll confirm whether it is work we can quote and what we would need to see."
      />
      <CtaBand />
    </>
  );
}
