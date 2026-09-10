import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { claddingOverBrickGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: claddingOverBrickGuide.metaTitle,
  description: claddingOverBrickGuide.metaDescription,
  path: `/resources/${claddingOverBrickGuide.slug}`,
  image: ogCard("cladding", claddingOverBrickGuide.metaTitle),
  openGraphType: "article",
  publishedTime: claddingOverBrickGuide.published,
  modifiedTime: claddingOverBrickGuide.modified,
});

export default function CladdingOverBrickGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Cladding over brick in Adelaide",
            href: `/resources/${claddingOverBrickGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={claddingOverBrickGuide} />

      <article>
        <PageBanner
          title={claddingOverBrickGuide.title}
          image={bannerImages[`/resources/${claddingOverBrickGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Cladding over brick in Adelaide" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{claddingOverBrickGuide.category}</span>
              <time dateTime={claddingOverBrickGuide.published}>
                Published {claddingOverBrickGuide.publishedDisplay}
              </time>
              <span>{claddingOverBrickGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              Cladding over brick is a normal renovation on Adelaide&rsquo;s
              older brick-veneer suburbs, and the manufacturers publish
              documented systems for it. The cladding is not fixed to the
              brickwork directly. It is fixed to battens anchored back to the
              masonry, with a weather barrier and a drained cavity between the
              two—which means the questions that decide the job are about the
              existing wall, not the colour of the boards.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>The substrate has to be assessed, not assumed.</strong>
              <p>
                James Hardie&rsquo;s own technical supplement for cladding over
                masonry states that a structural engineer must determine whether
                the substrate is adequate to hold the proposed anchors, the
                battens and the cladding loads. Elite Surface Group installs; we
                do not certify structures. Arrange that assessment by a suitably
                qualified professional before a reclad is scoped.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#wall">What the wall has to confirm</a>
                </li>
                <li>
                  <a href="#cavity">Battens, cavity and keeping water out</a>
                </li>
                <li>
                  <a href="#adelaide-conditions">
                    Adelaide conditions that change the detail
                  </a>
                </li>
                <li>
                  <a href="#approvals">Approvals, boundaries and bushfire</a>
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

        <section className="section section--tint" aria-labelledby="wall">
          <div className="shell prose article-prose">
            <h2 id="wall">
              What the wall has to confirm before cladding over brick
            </h2>
            <p>
              A brick-veneer wall built in the 1960s or 1970s was designed to
              carry itself and nothing else. Adding a batten cavity and a
              cladding skin puts new point loads into that masonry through every
              anchor, so the first question is whether the brickwork can take
              them. James Hardie specifies an anchor working load capacity for
              its masonry batten fixings and leaves the adequacy of the
              substrate to a structural engineer—the anchor is only as good as
              what it is anchored into.
            </p>
            <p>
              Before anyone measures for boards, these are the things worth
              establishing:
            </p>
            <TickList
              items={[
                "Whether the wall is brick veneer over a frame, or solid double-brick—the two behave differently and the fixing detail differs",
                "The condition of the mortar joints, and whether any are soft, eroded or previously repointed",
                "Existing cracking, and whether it is stable or still moving through the seasons",
                "Damp, salt damp or efflorescence at the base of the wall, and what is causing it",
                "How far the wall sits from the allotment boundary, which can change what the wall is allowed to be made of",
                "Where the eaves, window reveals, meter box, taps and downpipes land once the wall face moves outward",
              ]}
            />
            <p>
              That last point is the one that most often surprises people. A
              batten and cladding build-up moves the finished face of the wall
              out by the thickness of the whole system, so windows sit deeper,
              eaves overhang less, and every service penetration needs
              re-detailing. It is detail work, not a problem—but it belongs in
              the scope from the start rather than arriving as a variation.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.jameshardie.com.au/ContentfulCMS/Technical-Library/JH_External_Cladding_over_Masonry_Walls_Technical_supplement.pdf">
                James Hardie,{" "}
                <cite>External Cladding over Masonry Walls</cite> technical
                supplement (PDF)
              </a>{" "}
              and{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-two/h-class-1-and-10-buildings/part-h1-structure">
                NCC Volume Two, Part H1 Structure
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="cavity">
          <div className="shell prose article-prose">
            <h2 id="cavity">Battens, cavity and keeping water out</h2>
            <p>
              The cavity is the part of a reclad that does the real work.
              Cladding materials are weather resistant rather than waterproof:
              they act as a screen, and the layer that actually stops water
              entering the building is the membrane behind them, with the cavity
              draining and ventilating whatever gets past. YourHome makes the
              point plainly—any water that penetrates the cladding should be
              drained in the cavity behind, and that cavity has to be continuous
              from top to bottom to do it.
            </p>
            <p>
              That is why the batten is a specified component and not just a
              packer. The Hardie&trade; Structural Batten, for example, is
              castellated with a sloped top face so air can move through the
              cavity and water cannot pool on the batten, and the manufacturer
              states it can be used in a system compliant with the drainage
              requirements of the National Construction Code 2022. Substitute a
              plain timber batten for a documented one and the drainage path is
              the thing you have quietly given up.
            </p>
            <p>
              The membrane, the batten, the flashings at every opening and the
              cladding itself are one system with one set of installation
              instructions. Our{" "}
              <Link href="/cladding/">Adelaide cladding installation</Link> works
              to the selected manufacturer&rsquo;s documents rather than mixing
              components between systems, because warranty and weatherproofing
              both depend on the assembly being built as published.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.yourhome.gov.au/materials/cladding-systems">
                YourHome, Cladding systems
              </a>
              ,{" "}
              <a href="https://www.jameshardie.com.au/accessory/hardie-structural-batten">
                James Hardie, Hardie&trade; Structural Batten
              </a>{" "}
              and{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-two/h-class-1-and-10-buildings/part-h2-damp-and-weatherproofing">
                NCC Volume Two, Part H2 Damp and weatherproofing
              </a>
              .
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="adelaide-conditions"
        >
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={claddingOverBrickGuide.image}
                alt={claddingOverBrickGuide.imageAlt}
                width={claddingOverBrickGuide.imageWidth}
                height={claddingOverBrickGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(claddingOverBrickGuide.image)}
              />
              <figcaption>{claddingOverBrickGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Local context</span>
              <h2 id="adelaide-conditions">
                Adelaide conditions that change the detail
              </h2>
              <p>
                Reactive clay soils run through much of the Adelaide Plains, and
                they move with the seasons. CSIRO&rsquo;s guidance on footing
                performance is worth reading before a reclad, because seasonal
                movement is what produces the cracking you can see in the brick
                now—and cladding over a moving wall hides the evidence without
                changing the cause. Record the cracks first.
              </p>
              <p>
                Exposure matters too. Salt-laden air at Semaphore, Glenelg and
                Brighton is harder on fixings and coatings than a sheltered wall
                in Salisbury East or Golden Grove, and the fastener and finish
                specification should reflect that rather than defaulting to the
                cheapest option in the range. Our guide to{" "}
                <Link href="/resources/cladding-maintenance-coastal-adelaide/">
                  coastal cladding maintenance
                </Link>{" "}
                covers the upkeep side of the same question.
              </p>
              <p>
                Climate zone is the other local variable. Adelaide metro sits in
                NCC climate zone 5 and the Adelaide Hills in zone 6, and
                ventilated cavities are treated differently across those zones.
                Confirm the zone for the actual address on the ABCB map rather
                than assuming the metropolitan answer applies in Stirling or
                Aldgate.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                  CSIRO,{" "}
                  <cite>Foundation Maintenance and Footing Performance</cite>{" "}
                  (PDF)
                </a>{" "}
                and{" "}
                <a href="https://ncc.abcb.gov.au/resources/climate-zone-map">
                  ABCB, Climate zone map
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="approvals">
          <div className="shell prose article-prose">
            <h2 id="approvals">Approvals, boundaries and bushfire</h2>
            <p>
              Cladding over brick changes the external material of the house,
              and that makes it development work in South Australia. Whether it
              needs consent depends on the property, the zone and any overlays
              sitting over it. PlanSA is the
              place to establish that, and the answer is address-specific: a
              character or heritage overlay can make an external material change
              a very different application from the same work two streets away.
            </p>
            <p>
              Boundary proximity is the constraint people miss. The NCC sets
              fire-separation requirements for external walls close to an
              allotment boundary, and South Australia adds its own provisions on
              top of the national ones. On the narrow allotments common through
              the inner north-western suburbs, that can decide whether a
              particular cladding product is available to you at all on one
              elevation while remaining fine on the other three.
            </p>
            <p>
              In a designated bushfire-prone area—relevant across the Hills face
              and the fringes of the Adelaide metropolitan area—the applicable
              Bushfire Attack Level governs what the external wall can be built
              from. Manufacturers publish which of their systems suit which BAL
              rating, and that documentation is the thing to work from. Anything
              touching combustibility or fire performance should be confirmed by
              a suitably qualified professional rather than settled on site.
            </p>
            <p>
              If the reclad is part of a larger facade change, deciding the scope
              before design work starts saves rework later.{" "}
              <Link href="/project-planning/">Our project planning notes</Link>{" "}
              set out what is useful to have ready, and the{" "}
              <Link href="/locations/adelaide/">Adelaide service area page</Link>{" "}
              covers where we work.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval">
                PlanSA, Find out if you need approval
              </a>
              ,{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/8-south-australia/92-fire-separation-external-walls">
                NCC Housing Provisions, Part 9.2 Fire separation of external
                walls (South Australia)
              </a>{" "}
              and{" "}
              <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/bushfire">
                SA Government, Bushfire building requirements
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
                <h3>Photograph the wall as it stands</h3>
                <p>
                  Each elevation, plus close views of any cracking, damp
                  staining or eroded mortar, with something for scale and the
                  date noted. This is the record that tells an assessor whether
                  movement is stable.
                </p>
              </li>
              <li>
                <h3>Establish what the wall actually is</h3>
                <p>
                  Brick veneer over a frame and solid masonry are different
                  fixing problems. If the house has been extended, different
                  elevations may not match.
                </p>
              </li>
              <li>
                <h3>Get the structural adequacy assessed</h3>
                <p>
                  The manufacturer&rsquo;s literature requires it, and the
                  assessment covers the anchors, the battens and the added
                  cladding load together rather than one at a time.
                </p>
              </li>
              <li>
                <h3>Check the address on PlanSA and the ABCB climate map</h3>
                <p>
                  Overlays, boundary setbacks, bushfire-prone designation and
                  climate zone are all address-specific and all shape the
                  specification before a product is chosen.
                </p>
              </li>
              <li>
                <h3>Specify the whole system, then the look</h3>
                <p>
                  Membrane, batten, flashings, fasteners and cladding come from
                  one documented system. Colour and profile are the last
                  decision, not the first.
                </p>
              </li>
            </ol>

            <aside className="article-note article-note--warning">
              <strong>Cutting fibre cement releases silica dust.</strong>
              <p>
                Fibre cement cladding contains crystalline silica, and cutting or
                drilling it is regulated work in South Australia with specific
                control requirements. Confirm how dust will be controlled on site
                before work starts—this applies to the trade doing the cutting
                and to anyone else on the property.
              </p>
            </aside>
            <p className="article-source">
              Source:{" "}
              <a href="https://www.safework.sa.gov.au/industry/construction/crystalline-silica-substances-regulations">
                SafeWork SA, Crystalline silica substances regulations
              </a>
              .
            </p>
          </div>
        </section>

        <section
          id="faqs-and-sources"
          className="section"
          aria-labelledby="cladding-brick-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="cladding-brick-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="cladding-brick-faqs">
              <div className="faq-list__item">
                <dt>Can cladding be screwed straight onto the brickwork?</dt>
                <dd>
                  The documented systems do not work that way. Cladding is fixed
                  to battens that are anchored to the masonry, with a weather
                  barrier behind and a drained cavity between. Fixing boards
                  flat to brick removes the drainage path the system depends on.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Does the whole house have to be clad?</dt>
                <dd>
                  No. Partial recladding—a front elevation, a garage projection,
                  an upper level—is common, and mixing cladding with rendered or
                  face-brick sections is a design decision. The junctions between
                  the two need detailing, so include them in the scope.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Is rendering the brick a simpler alternative?</dt>
                <dd>
                  It is a different job with different requirements rather than
                  a simpler one, and it depends on the condition and coating
                  history of the masonry. Our guide on{" "}
                  <Link href="/resources/rendering-over-painted-brick-adelaide/">
                    rendering over painted brick
                  </Link>{" "}
                  covers what has to be established for that route.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Will cladding over brick fix a damp problem?</dt>
                <dd>
                  It will conceal it. Rising damp and salt damp have causes at
                  the base of the wall, and covering the evidence traps moisture
                  behind a new skin. Have the cause identified and resolved
                  first.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>James Hardie</dt>
                <dd>
                  <a href="https://www.jameshardie.com.au/ContentfulCMS/Technical-Library/JH_External_Cladding_over_Masonry_Walls_Technical_supplement.pdf">
                    <cite>External Cladding over Masonry Walls</cite> technical
                    supplement (PDF)
                  </a>
                  ,{" "}
                  <a href="https://www.jameshardie.com.au/accessory/hardie-structural-batten">
                    Hardie&trade; Structural Batten
                  </a>{" "}
                  and{" "}
                  <a href="https://www.jameshardie.com.au/ContentfulCMS/Technical-Library/Bushfire_Prone_Area_Technical_supplement.pdf">
                    <cite>Bushfire Prone Area</cite> technical supplement (PDF)
                  </a>
                </dd>
              </div>
              <div>
                <dt>National Construction Code</dt>
                <dd>
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-two/h-class-1-and-10-buildings/part-h2-damp-and-weatherproofing">
                    Volume Two, Part H2 Damp and weatherproofing
                  </a>
                  ,{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-two/h-class-1-and-10-buildings/part-h1-structure">
                    Volume Two, Part H1 Structure
                  </a>
                  ,{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/8-south-australia/92-fire-separation-external-walls">
                    Housing Provisions, Part 9.2 Fire separation of external
                    walls (South Australia)
                  </a>{" "}
                  and{" "}
                  <a href="https://ncc.abcb.gov.au/resources/climate-zone-map">
                    Climate zone map
                  </a>
                </dd>
              </div>
              <div>
                <dt>Australian and South Australian government</dt>
                <dd>
                  <a href="https://www.yourhome.gov.au/materials/cladding-systems">
                    YourHome, Cladding systems
                  </a>
                  ,{" "}
                  <a href="https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval">
                    PlanSA, Find out if you need approval
                  </a>
                  ,{" "}
                  <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/bushfire">
                    Bushfire building requirements
                  </a>{" "}
                  and{" "}
                  <a href="https://www.safework.sa.gov.au/industry/construction/crystalline-silica-substances-regulations">
                    SafeWork SA, Crystalline silica substances regulations
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
              <Link href="/cladding/">Adelaide cladding services</Link>
              <Link href="/resources/fibre-cement-vs-weatherboard-cladding-adelaide/">
                Fibre cement vs weatherboard guide
              </Link>
              <Link href="/projects/dark-feature-cladding/">
                Dark feature cladding case study
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
        defaultService="Cladding"
        intro="If you are considering cladding over an existing brick exterior, tell us the suburb, the age of the house and which elevations you have in mind. Photographs of the walls, including any cracking or damp staining, help."
      />
      <CtaBand />
    </>
  );
}
