import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { bushfireRatedCladdingGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: bushfireRatedCladdingGuide.metaTitle,
  description: bushfireRatedCladdingGuide.metaDescription,
  path: `/resources/${bushfireRatedCladdingGuide.slug}`,
  image: ogCard("cladding", bushfireRatedCladdingGuide.metaTitle),
  openGraphType: "article",
  publishedTime: bushfireRatedCladdingGuide.published,
  modifiedTime: bushfireRatedCladdingGuide.modified,
});

export default function BushfireRatedCladdingGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Bushfire-rated cladding in Adelaide",
            href: `/resources/${bushfireRatedCladdingGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={bushfireRatedCladdingGuide} />

      <article>
        <PageBanner
          title={bushfireRatedCladdingGuide.title}
          image={bannerImages[`/resources/${bushfireRatedCladdingGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Bushfire-rated cladding in Adelaide" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{bushfireRatedCladdingGuide.category}</span>
              <time dateTime={bushfireRatedCladdingGuide.published}>
                Published {bushfireRatedCladdingGuide.publishedDisplay}
              </time>
              <span>{bushfireRatedCladdingGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              There is no single bushfire-rated cladding for Adelaide. The
              site&rsquo;s Bushfire Attack Level (BAL) is set first, from the
              overlay the land sits in and, where required, an assessment of
              the vegetation, distance and slope around it. Only then can a
              cladding product and the wall details behind it be chosen to
              suit that rating.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>We install; we do not rate or certify.</strong>
              <p>
                Elite Surface Group installs the cladding system documented
                for a project. Determining a BAL, confirming that a wall meets
                it and certifying bushfire compliance belong to a bushfire
                consultant, the designer and the building surveyor. Arrange
                that assessment before relying on this guide to choose a
                product.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#where-it-applies">Where it applies in Adelaide</a>
                </li>
                <li>
                  <a href="#how-bal-is-set">How the BAL is set</a>
                </li>
                <li>
                  <a href="#whole-wall">The whole wall, not the board</a>
                </li>
                <li>
                  <a href="#existing-homes">Re-cladding an existing home</a>
                </li>
                <li>
                  <a href="#confirm-first">What to confirm first</a>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="where-it-applies"
        >
          <div className="shell prose article-prose">
            <h2 id="where-it-applies">
              Where bushfire rules reach into Adelaide
            </h2>
            <p>
              Most people picture the Adelaide Hills, and with reason. Crafers
              and the country around Mount Lofty and Stirling burned on Ash
              Wednesday in 1983, and the Cudlee Creek fire of 2019 ran through
              the northern Hills. But the
              designation does not stop where the scrub starts. Suburbs along
              the Hills Face, and some outer fringes to the north and south,
              can sit in an urban-interface overlay because of the vegetation
              they back onto.
            </p>
            <p>
              In South Australia the designation comes from the bushfire
              hazard overlays in the Planning and Design Code, not from the
              suburb name. Two neighbouring lots can fall into different
              categories. Check the overlay for the actual allotment before
              anything about the wall is decided.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/bushfire">
                SA.GOV.AU, Bushfire building regulations
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="how-bal-is-set">
          <div className="shell prose article-prose">
            <h2 id="how-bal-is-set">How South Australia sets the BAL</h2>
            <p>
              AS 3959, the Australian Standard for construction in
              bushfire-prone areas, grades exposure from BAL-LOW through
              BAL-12.5, BAL-19, BAL-29 and BAL-40 to BAL-FZ (flame zone). The
              number refers to expected radiant heat exposure; the higher it
              is, the more the building has to resist ember attack, radiant
              heat and, at the top end, direct flame contact.
            </p>
            <p>
              South Australia does not require an individual assessment for
              every designated property. Under Ministerial Building Standard
              MBS 008, general-risk areas are deemed BAL-LOW and medium-risk
              areas are deemed BAL-12.5. High-risk areas, and urban-interface
              land close to a high bushfire hazard area, need a site-specific
              assessment under AS 3959. That assessment looks at the type of
              vegetation, its distance from the building and the slope of the
              land beneath it.
            </p>
            <h3>Why the slope matters on a Hills block</h3>
            <p>
              Fire runs faster uphill. A house on a ridge above a gully of
              stringybark at Upper Sturt can land a much higher rating than a
              similar house on flat ground the same distance from similar
              scrub. That is why a BAL cannot be read off a neighbour&rsquo;s
              plans or guessed from a street view.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://plan.sa.gov.au/__data/assets/pdf_file/0012/678288/MBS_008_-_Additional_requirements.pdf">
                PlanSA, Ministerial Building Standard MBS 008
              </a>{" "}
              and{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-two/h-class-1-and-10-buildings/part-h7-ancillary-provisions-and-additional-construction-requirements">
                ABCB, NCC H7D4 Construction in bushfire-prone areas
              </a>
              .
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="whole-wall"
        >
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={bushfireRatedCladdingGuide.image}
                alt={bushfireRatedCladdingGuide.imageAlt}
                width={bushfireRatedCladdingGuide.imageWidth}
                height={bushfireRatedCladdingGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(bushfireRatedCladdingGuide.image)}
              />
              <figcaption>{bushfireRatedCladdingGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">The wall as a system</span>
              <h2 id="whole-wall">
                Bushfire-rated cladding is a wall system, not a board
              </h2>
              <p>
                A board label that mentions a BAL is a starting point. Embers
                get into a building through gaps, so the junctions, vents,
                weep holes, sarking and edges around windows and doors matter
                as much as the face of the sheet. Requirements at several BALs
                reach into those wall components, so compliance cannot be
                inferred from the cladding material alone, or from the idea
                that non-combustible construction only matters at BAL-FZ.
              </p>
              <p>
                Manufacturers document this. James Hardie, for example,
                publishes a bushfire supplement setting out which fibre cement
                products, jointing and fixing details are documented for which
                ratings, including higher ones. Timber weatherboard is more
                limited as the rating rises; at the upper levels only a
                bushfire-resisting species or a tested and certified system
                may be acceptable.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://www.jameshardie.com.au/ContentfulCMS/Technical-Library/Bushfire_Prone_Area_Technical_supplement.pdf">
                  James Hardie, Construction of Buildings in Bushfire Prone
                  Areas
                </a>{" "}
                (PDF) and{" "}
                <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-one/g-ancillary-provisions/part-g5-construction-bushfire-prone-areas">
                  ABCB, NCC Part G5
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="materials">
          <div className="shell prose article-prose">
            <h2 id="materials">What this means for common cladding choices</h2>
            <h3>Fibre cement</h3>
            <p>
              Often the first option looked at on a Hills site because the
              manufacturer documentation covers a wide range of ratings. The
              detail that applies at BAL-29 may differ from the one at
              BAL-12.5, so the rating has to be known before the fixing and
              jointing details are drawn. Our{" "}
              <Link href="/resources/fibre-cement-vs-weatherboard-cladding-adelaide/">
                fibre cement vs weatherboard comparison
              </Link>{" "}
              covers the broader trade-offs.
            </p>
            <h3>Timber and timber-look products</h3>
            <p>
              Possible at lower ratings and in some cases higher, but the
              species, the product and the tested system all have to line up
              with the assessed BAL. A timber look achieved with another
              material is a separate product with its own documentation.
            </p>
            <h3>Render and AAC panel systems</h3>
            <p>
              A rendered wall or a{" "}
              <Link href="/hebel/">Hebel panel wall</Link> is still a system
              with junctions, fixings and openings. Ask for the supplier&rsquo;s
              bushfire documentation for the exact system and rating rather
              than assuming a masonry look settles the question.
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="existing-homes"
        >
          <div className="shell prose article-prose">
            <h2 id="existing-homes">Re-cladding an existing Hills home</h2>
            <p>
              Replacing tired weatherboard on a 1970s house in Aldgate is not
              the same as a new build, but it is not automatically exempt
              either. Whether the work needs planning or building consent,
              and what bushfire requirements attach to it, depends on the
              scope and the property. PlanSA&rsquo;s approval check is the
              place to start, followed by a conversation with a building
              surveyor.
            </p>
            <p>
              Summer programming matters up here too. Hot north winds dry
              out sealants and coatings quickly, and any installation should
              follow the product&rsquo;s documented temperature and weather
              limits. Cutting and grinding can also be restricted on total
              fire ban days, which is worth allowing for in the programme.
            </p>
            <aside className="article-note article-note--warning">
              <strong>Do not assume the old rating still applies.</strong>
              <p>
                Vegetation grows back, overlays are reviewed and a rating that
                suited an earlier approval may not suit new work. Ask the
                designer or a bushfire consultant to confirm the current
                designation and any required assessment before the cladding
                is ordered. This guide does not determine a rating or certify
                compliance.
              </p>
            </aside>
            <p className="article-source">
              Source:{" "}
              <a href="https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval">
                PlanSA, Find out if you need approval
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="confirm-first">
          <div className="shell prose article-prose">
            <h2 id="confirm-first">What to confirm before choosing cladding</h2>
            <TickList
              items={[
                "The bushfire overlay and risk category for the actual allotment",
                "Whether MBS 008 deems a BAL for the site or requires an AS 3959 assessment",
                "The assessed or deemed BAL, in writing, from the person responsible for it",
                "The manufacturer’s bushfire documentation for the exact product at that rating",
                "How junctions, vents, weep holes, sarking and window and door edges are detailed",
                "Whether the work needs planning or building consent, and who is certifying it",
                "Any coastal, heritage or character overlay that also applies to the wall",
              ]}
            />
            <p>
              Bring that information to an enquiry and the conversation moves
              quickly from &ldquo;what can we use?&rdquo; to &ldquo;how will
              it be installed?&rdquo; Our{" "}
              <Link href="/project-planning/">project planning guide</Link>{" "}
              lists the drawings and documents that help, and the{" "}
              <Link href="/cladding/">cladding installation page</Link>{" "}
              explains the scope we take on across the{" "}
              <Link href="/locations/adelaide/">Adelaide service area</Link>.
            </p>

            <h2 id="bushfire-cladding-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="bushfire-cladding-faqs">
              <div className="faq-list__item">
                <dt>Is any fibre cement board automatically bushfire rated?</dt>
                <dd>
                  No. The manufacturer documents specific products and details
                  for specific ratings. The rating for the site, the product
                  and the details shown on the drawings all have to match.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Can Elite Surface Group tell us our BAL?</dt>
                <dd>
                  No. A deemed BAL comes from the site&rsquo;s designation, and
                  a site-specific BAL comes from an assessment under AS 3959
                  by a suitably qualified person. We install to the rating and
                  documentation provided.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>We are in the suburbs, not the Hills. Can we skip this?</dt>
                <dd>
                  Only once you have checked. Urban-interface overlays reach
                  into some suburban streets near the Hills Face and outer
                  fringes, so confirm the overlay for the allotment first.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>SA.GOV.AU and PlanSA</dt>
                <dd>
                  <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/bushfire">
                    Bushfire building regulations
                  </a>
                  ,{" "}
                  <a href="https://plan.sa.gov.au/__data/assets/pdf_file/0012/678288/MBS_008_-_Additional_requirements.pdf">
                    Ministerial Building Standard MBS 008
                  </a>{" "}
                  (PDF) and{" "}
                  <a href="https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval">
                    Find out if you need approval
                  </a>
                </dd>
              </div>
              <div>
                <dt>Australian Building Codes Board</dt>
                <dd>
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-two/h-class-1-and-10-buildings/part-h7-ancillary-provisions-and-additional-construction-requirements">
                    NCC H7D4 Construction in bushfire-prone areas
                  </a>{" "}
                  and{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-one/g-ancillary-provisions/part-g5-construction-bushfire-prone-areas">
                    NCC Part G5 Construction in bushfire-prone areas
                  </a>
                </dd>
              </div>
              <div>
                <dt>James Hardie</dt>
                <dd>
                  <a href="https://www.jameshardie.com.au/ContentfulCMS/Technical-Library/Bushfire_Prone_Area_Technical_supplement.pdf">
                    Construction of Buildings in Bushfire Prone Areas
                  </a>{" "}
                  (PDF)
                </dd>
              </div>
            </dl>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/cladding/">Cladding installation in Adelaide</Link>
              <Link href="/projects/dark-feature-cladding/">
                Feature cladding project case study
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
        defaultService="Cladding"
        intro="Have a confirmed BAL and a documented cladding system? Tell us the suburb, the rating and what drawings are available. We can arrange how to review supporting files and confirm the installation scope."
      />
      <CtaBand />
    </>
  );
}
