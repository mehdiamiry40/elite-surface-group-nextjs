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
            label: "Hebel fences in Adelaide",
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
            { label: "Hebel fences in Adelaide" },
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
              A Hebel fence in Adelaide is a row of steel posts set in concrete
              with reinforced AAC panels slotted between them, then coated. It
              is solid, private and heavier than a paling or steel sheet fence,
              which is why four things need settling before the first post
              hole: whether the council treats it as needing approval, whether
              your neighbour has been properly notified, what the post footings
              need for your soil and wind exposure, and which coating will
              protect the panels.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>A fence is still a structure.</strong>
              <p>
                A solid panel fence catches the wind along its full face. Where
                the site has reactive clay, a slope, a retaining wall under the
                fence line or high wind exposure, arrange assessment by a
                suitably qualified engineer rather than relying on a general
                footing table. Elite Surface Group installs to the documented
                design; it does not certify structural adequacy.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#what-it-is">What the system is</a>
                </li>
                <li>
                  <a href="#approval">Council approval</a>
                </li>
                <li>
                  <a href="#neighbours">Your neighbour and the Fences Act</a>
                </li>
                <li>
                  <a href="#footings">Posts, footings and wind</a>
                </li>
                <li>
                  <a href="#finish">Coating and upkeep</a>
                </li>
                <li>
                  <a href="#before-quote">What to have ready</a>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="what-it-is">
          <div className="shell prose article-prose">
            <h2 id="what-it-is">What a Hebel fence actually is</h2>
            <p>
              CSR sells its fencing system as PowerFence®. It is a modular
              arrangement of steel-reinforced autoclaved aerated concrete (AAC)
              panels held by steel posts and brackets. CSR notes that it does
              not need a continuous strip footing, which is one of the main
              differences from a laid brick or block fence: the load goes down
              through individual post footings instead.
            </p>
            <p>
              That makes it a different application from a Hebel wall on a
              building. A boundary wall on a house is part of the building, with
              its own framing, fire-separation and approval questions—covered in
              our{" "}
              <Link href="/resources/hebel-boundary-walls-adelaide/">
                Hebel boundary walls guide
              </Link>
              . A fence stands on its own, so its stability comes entirely from
              the posts and what they are set in.
            </p>
            <p>
              Owners usually choose it for privacy and to take the edge off
              road noise. CSR positions PowerFence as a noise barrier, but how
              much quieter a garden gets depends on the fence height, its
              length, gaps under gates and the path the sound takes around the
              ends. Our{" "}
              <Link href="/resources/soundproofing-walls-adelaide/">
                soundproofing walls guide
              </Link>{" "}
              explains why sealing and flanking paths matter as much as mass.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://hebel.com.au/wp-content/uploads/downloads/Hebel-PowerFence-Brochure_HELIT086.pdf">
                CSR Hebel PowerFence brochure
              </a>{" "}
              and{" "}
              <a href="https://hebel.com.au/inform-inspire/diy/how-to-build-a-hebel-powerfence/">
                CSR Hebel, How to build a Hebel PowerFence
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="approval">
          <div className="shell prose article-prose">
            <h2 id="approval">Does a Hebel fence need council approval?</h2>
            <p>
              Often, and the height at which it does may be lower than people
              expect. South Australia&rsquo;s Law Handbook, published by the
              Legal Services Commission, says brick or masonry fences over one
              metre high, and other fences over 2.1 metres (apart from post and
              wire), will generally need development approval from the local
              council. Fences near road intersections and around swimming pools
              generally need approval too.
            </p>
            <p>
              The gap between those two figures is the question to put to the
              council early. A reinforced AAC panel fence is not laid brick, but
              it is not a timber or steel sheet fence either. Whether your
              council treats it under the masonry threshold is its call, not the
              supplier&rsquo;s or the installer&rsquo;s—so ask before assuming a
              1.8 metre fence is exempt.
            </p>
            <h3>Things that change the answer</h3>
            <TickList
              items={[
                "A corner block, where sight lines near the intersection are protected",
                "A fence built on top of, or as part of, a retaining wall",
                "A local heritage place or a heritage-listed streetscape",
                "Any area the council says has its own fencing rules",
                "A fence that also forms part of a pool safety barrier",
              ]}
            />
            <p className="article-source">
              Source:{" "}
              <a href="https://www.lawhandbook.sa.gov.au/ch31s02s04.php">
                Law Handbook (Legal Services Commission of SA), Common
                questions about fences
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="neighbours">
          <div className="shell prose article-prose">
            <h2 id="neighbours">Your neighbour and the Fences Act</h2>
            <p>
              Replacing a dividing fence in South Australia runs under the{" "}
              <cite>Fences Act 1975</cite>. The SA Government explains that you
              serve your neighbour a notice describing the proposed fence, and
              they have 30 days to object with a cross-notice. Unless they have
              agreed in writing, work should not start before the 30 days are
              up—and starting early can cost you the right to recover their
              share.
            </p>
            <p>
              Cost sharing is where AAC fences cause friction. The general
              position is that both owners benefit equally from an adequate
              fence and share its cost. If one owner wants something better
              than adequate and the other is content with an ordinary fence, the
              owner asking for more can be expected to pay the difference. A
              Hebel fence will often be the more expensive option, so talk to
              your neighbour before the notice arrives, not after.
            </p>
            <p>
              Confirm where the boundary actually is, too. An old fence line is
              not a survey. If there is any doubt, a licensed surveyor can
              locate it before posts go in.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://www.sa.gov.au/topics/housing-and-property/owning-a-property/property-boundaries/boundaries-fences">
                SA.GOV.AU, Boundaries and fences
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
              <h2 id="footings">Posts, footings and Adelaide wind</h2>
              <p>
                CSR&rsquo;s PowerFence guide includes a footing table, and says
                plainly that it is a general guide based on broad soil types
                and terrain categories. It recommends a relevant engineer or the
                local authority confirm the soil type and wind loading for the
                area. CSR also offers a post extension for where deeper footings
                are needed.
              </p>
              <p>
                Both variables are real in Adelaide. Much of the metropolitan
                area sits on reactive clay that swells when wet and shrinks
                through a dry summer, and CSIRO&rsquo;s footing guidance explains
                how that seasonal movement affects anything founded in it. On the
                coast at Semaphore, Glenelg or Brighton, an open fetch to the
                sea can put a fence in a more exposed wind category than a
                sheltered street further inland.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://hebel.com.au/inform-inspire/diy/how-to-build-a-hebel-powerfence/">
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

        <section className="section section--tint" aria-labelledby="slopes">
          <div className="shell prose article-prose">
            <h2 id="slopes">Sloping blocks and retaining walls</h2>
            <p>
              The Hills-face suburbs and plenty of blocks on the plains fall
              along the fence line. The PowerFence system steps panels between
              bays on a slope by setting the brackets at different heights on
              each post, and CSR&rsquo;s guide limits how large each step can be.
              A steep run may need more, shorter steps, or a different approach
              entirely.
            </p>
            <p>
              Where the fence sits on or behind a retaining wall, treat them as
              two structures that affect each other. The retaining wall has to
              carry the fence&rsquo;s wind load as well as the soil behind it.
              That combination is a question for an engineer and, as above, may
              change the council&rsquo;s view of the fence&rsquo;s height.
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="finish">
          <div className="shell prose article-prose">
            <h2 id="finish">Coating and upkeep</h2>
            <p>
              AAC panels are not left bare outdoors. CSR describes a roll-on
              coloured acrylic texture coating as the simplest and most
              economical finish; other compatible coating systems can be
              specified where the design calls for them. Either way the coating is what keeps water out of the panel,
              so the product&rsquo;s own data sheet should set the preparation,
              film build and application limits. Those limits matter in an
              Adelaide summer, when a hot, dry wind can dry a coat faster than
              the product allows.
            </p>
            <p>
              Upkeep is mostly about the coating. Look for cracks at post
              junctions, chips at the base from mowers and whipper snippers,
              and garden beds or irrigation keeping the bottom of the fence
              wet. Recoating on the schedule the coating manufacturer
              recommends keeps the panels protected. Our guide to{" "}
              <Link href="/resources/rendering-hebel-panels-adelaide/">
                rendering Hebel panels
              </Link>{" "}
              covers how coating systems and trade responsibilities fit
              together.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://hebel.com.au/inform-inspire/diy/how-to-build-a-hebel-powerfence/">
                CSR Hebel, How to build a Hebel PowerFence
              </a>
              .
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="before-quote"
        >
          <div className="shell prose article-prose">
            <h2 id="before-quote">What to have ready before asking for a quote</h2>
            <TickList
              items={[
                "The suburb, and whether the fence is a front, side or rear boundary",
                "The approximate length and height, and where gates or returns sit",
                "What the council has said about approval, or that you have not asked yet",
                "Whether the Fences Act notice has been served and how your neighbour responded",
                "Any engineer’s footing detail, soil report or site classification you hold",
                "Photos of the fence line, including slopes, retaining walls, trees and services",
                "The finish and colour you have in mind",
              ]}
            />
            <p>
              A clear brief shortens the back-and-forth. Our{" "}
              <Link href="/project-planning/">project planning page</Link>{" "}
              explains what else helps, and the{" "}
              <Link href="/locations/adelaide/">Adelaide service area</Link>{" "}
              page shows where we work.
            </p>

            <h2 id="hebel-fence-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="hebel-fence-faqs">
              <div className="faq-list__item">
                <dt>Can the panels go on an existing brick plinth?</dt>
                <dd>
                  Not as a default. The system is designed around its own posts
                  and footings. Building on something else changes how the load
                  travels, so it needs an engineer&rsquo;s design.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Is the fence fire-rated?</dt>
                <dd>
                  Do not assume so. Any fire-performance claim applies to a
                  specific, documented system and use. If fire separation or
                  bushfire requirements apply, have a suitably qualified
                  professional confirm what is required.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Can the neighbour&rsquo;s side be left uncoated?</dt>
                <dd>
                  Both faces are exposed to the weather, so both need the
                  protective coating. Agree access to the neighbour&rsquo;s side
                  before work starts.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>CSR Hebel</dt>
                <dd>
                  <a href="https://hebel.com.au/inform-inspire/diy/how-to-build-a-hebel-powerfence/">
                    How to build a Hebel PowerFence
                  </a>{" "}
                  and{" "}
                  <a href="https://hebel.com.au/wp-content/uploads/downloads/Hebel-PowerFence-Brochure_HELIT086.pdf">
                    Hebel PowerFence brochure (PDF)
                  </a>
                </dd>
              </div>
              <div>
                <dt>Legal Services Commission of South Australia</dt>
                <dd>
                  <a href="https://www.lawhandbook.sa.gov.au/ch31s02s04.php">
                    Law Handbook: Common questions about fences
                  </a>
                </dd>
              </div>
              <div>
                <dt>SA.GOV.AU</dt>
                <dd>
                  <a href="https://www.sa.gov.au/topics/housing-and-property/owning-a-property/property-boundaries/boundaries-fences">
                    Boundaries and fences
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
                Hebel boundary walls
              </Link>
              <Link href="/resources/rendering-hebel-panels-adelaide/">
                Rendering Hebel panels
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
        intro="If you are planning a Hebel fence, tell us the suburb, the length and height, and what the council and any engineer have said. Photos of the fence line help us scope the work accurately."
      />
      <CtaBand />
    </>
  );
}
