import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { saltDampGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: saltDampGuide.metaTitle,
  description: saltDampGuide.metaDescription,
  path: `/resources/${saltDampGuide.slug}`,
  image: ogCard("render", saltDampGuide.metaTitle),
  openGraphType: "article",
  publishedTime: saltDampGuide.published,
  modifiedTime: saltDampGuide.modified,
});

export default function SaltDampGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Salt damp in Adelaide homes",
            href: `/resources/${saltDampGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={saltDampGuide} />

      <article>
        <PageBanner
          title={saltDampGuide.title}
          image={bannerImages[`/resources/${saltDampGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Salt damp in Adelaide homes" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{saltDampGuide.category}</span>
              <time dateTime={saltDampGuide.published}>
                Published {saltDampGuide.publishedDisplay}
              </time>
              <span>{saltDampGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              Salt damp is a moisture problem, not a finish problem. Ground
              water rises through masonry that has no working damp-proof
              course, carries dissolved salts with it, and leaves them behind
              as the water evaporates at the wall surface. Rendering over that
              does not stop the water—it moves the evaporation point further up
              the wall and often takes the new coating with it. The source has
              to be found and dealt with before any surface work is worth
              paying for.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>This needs a diagnosis before a quote.</strong>
              <p>
                Rising moisture in masonry can involve the footing, the
                subfloor, drainage, plumbing and the wall construction itself.
                Have the cause assessed by a suitably qualified
                professional—a building consultant, or a heritage specialist
                where the building warrants one—before a repair scope is
                written. We install and finish walls; we do not diagnose
                structural or moisture defects.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#recognise">What it looks like</a>
                </li>
                <li>
                  <a href="#why-render-fails">
                    Why render over salt damp fails
                  </a>
                </li>
                <li>
                  <a href="#adelaide">Why Adelaide sees so much of it</a>
                </li>
                <li>
                  <a href="#what-helps">What actually helps</a>
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

        <section className="section section--tint" aria-labelledby="recognise">
          <div className="shell prose article-prose">
            <h2 id="recognise">What it looks like</h2>
            <p>
              The signs cluster near the bottom of a wall, usually within about
              a metre of the ground, and they tend to be worse where the wall
              is shaded or covered.
            </p>
            <TickList
              items={[
                "A tide mark or band of discolouration running along the lower wall",
                "White, powdery salt deposits on the brick, stone or mortar surface",
                "Mortar that has gone soft and can be raked out with a fingernail",
                "Brick or stone faces fretting, flaking or crumbling away",
                "Paint or render bubbling, blistering and letting go in the same band",
                "Damp, musty smells and deteriorating skirtings or plaster inside",
              ]}
            />
            <p>
              None of that is proof on its own. Leaking downpipes, a garden bed
              built up against the wall, a failed shower or a blocked subfloor
              vent can all produce similar-looking damage, and the fix for each
              is different. The South Australian Department for Environment and
              Water publishes a detailed technical guide on salt attack and
              rising damp that is worth reading before you commission anything.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://cdn.environment.sa.gov.au/environment/docs/saltdamp_techguide.pdf">
                Government of South Australia,{" "}
                <cite>
                  Salt attack and rising damp: a guide to salt damp in historic
                  and older buildings
                </cite>{" "}
                (PDF)
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="why-render-fails">
          <div className="shell prose article-prose">
            <h2 id="why-render-fails">Why render over salt damp fails</h2>
            <p>
              A solid masonry wall built before damp-proof courses were normal
              relies on being able to dry out. Water that gets in leaves again
              by evaporating through the face of the brick, stone and mortar.
              Put a dense, low-permeability coating across that face and the
              water does not stop arriving—it simply has to leave somewhere
              else.
            </p>
            <p>
              What usually follows is predictable. The damp band climbs above
              the new render. Salts crystallise behind the coating instead of
              on the surface, and the pressure pushes the render off in sheets.
              The masonry underneath, now wetter for longer, deteriorates
              faster than it did before the work. Meanwhile the damage is
              hidden, so it is found later and costs more.
            </p>
            <p>
              This is also why coating choice matters so much on older walls.
              Vapour permeability, not just adhesion, is part of the
              specification, and the manufacturer&rsquo;s literature for the
              selected system sets out where it may and may not be used. Our{" "}
              <Link href="/resources/rendering-over-painted-brick-adelaide/">
                guide to rendering over painted brick
              </Link>{" "}
              covers the substrate testing side of the same question.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://cdn.environment.sa.gov.au/environment/docs/saltdamp_techguide.pdf">
                Government of South Australia,{" "}
                <cite>Salt attack and rising damp</cite> (PDF)
              </a>{" "}
              and{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-two/h-class-1-and-10-buildings/part-h2-damp-and-weatherproofing">
                NCC 2022 Volume Two, Part H2 Damp and weatherproofing
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="adelaide">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={saltDampGuide.image}
                alt={saltDampGuide.imageAlt}
                width={saltDampGuide.imageWidth}
                height={saltDampGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(saltDampGuide.image)}
              />
              <figcaption>{saltDampGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Local context</span>
              <h2 id="adelaide">Why Adelaide sees so much of it</h2>
              <p>
                Three things line up here. A large stock of nineteenth and
                early twentieth century stone and brick housing across the
                inner suburbs was built before damp-proof courses were
                standard. The reactive clay soils across the plains hold
                moisture against footings and move seasonally. And long dry
                summers drive hard evaporation at the wall face, which is
                exactly the mechanism that concentrates salt in the masonry.
              </p>
              <p>
                Coastal suburbs add salt from the air on top of whatever is
                coming up from the ground. That is also why masonry units carry
                a durability classification: an exposure-grade unit is the one
                intended for conditions including attack by salts in ground
                water below the damp-proof course, and for sea fronts. What is
                already in an existing wall is a question for the assessment,
                not an assumption.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                  CSIRO,{" "}
                  <cite>Foundation Maintenance and Footing Performance</cite>{" "}
                  (PDF)
                </a>{" "}
                and{" "}
                <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/5-masonry/part-56-masonry-components-and-accessories">
                  NCC 2022 Housing Provisions, Part 5.6 Masonry components and
                  accessories
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="what-helps">
          <div className="shell prose article-prose">
            <h2 id="what-helps">What actually helps</h2>
            <p>
              Remediation works in one order: reduce the water reaching the
              wall, restore or install a barrier where one is needed, let the
              wall dry, then deal with the surface. Skipping to the last step
              is the expensive mistake.
            </p>
            <p>
              The cheap part comes first, and often does more than people
              expect. Ground levels built up against a wall, garden beds and
              irrigation close to the footing, a downpipe discharging beside
              the house, paving that falls back towards the wall—each of those
              keeps masonry wet, and each is fixable without touching the wall
              itself. CSIRO&rsquo;s guidance on footing performance is direct
              about how much difference drainage and planting decisions make
              around an Australian house.
            </p>
            <p>
              Where a damp-proof course is missing or has failed, the remedy is
              a specialist trade, not a render trade. The NCC sets out where a
              damp-proof course sits in new masonry—including minimum heights
              above adjacent paving or landscaped surfaces—and South Australia
              carries its own damp-proofing membrane variations. Both matter
              when the work is being designed, and neither is something a
              coating substitutes for.
            </p>
            <p>
              Only once the wall is dry and stable is a finish worth
              specifying, and on an older building the coating has to suit the
              masonry rather than the other way around. That is the point at
              which our{" "}
              <Link href="/render/">Adelaide render services</Link> can work to
              a specification someone else has written, and{" "}
              <Link href="/project-planning/">our planning notes</Link> cover
              what is useful to have ready before that conversation.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                CSIRO, <cite>Foundation Maintenance and Footing Performance</cite>{" "}
                (PDF)
              </a>
              ,{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/5-masonry/part-57-weatherproofing-masonry">
                NCC 2022 Housing Provisions, Part 5.7 Weatherproofing of masonry
              </a>{" "}
              and{" "}
              <a href="https://plan.sa.gov.au/__data/assets/pdf_file/0012/653997/Advisory_Notice_Building_-_01-20_-_Damp-proofing_membrane_requirements_in_South_Australia.pdf">
                PlanSA Building Advisory Notice 01/20,{" "}
                <cite>
                  Damp-proofing membrane requirements in South Australia
                </cite>{" "}
                (PDF)
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
                <h3>Photograph the band and date it</h3>
                <p>
                  Record the affected height on each elevation, inside and out,
                  with something for scale. Whether the band rises, falls or
                  stays put across a season tells an assessor more than a
                  single visit does.
                </p>
              </li>
              <li>
                <h3>Walk the outside for water sources</h3>
                <p>
                  Check downpipes, gutters, taps, air conditioning condensate,
                  irrigation, garden beds and paving falls. Note where the
                  ground level sits relative to the floor level inside.
                </p>
              </li>
              <li>
                <h3>Get the cause assessed, not the symptom</h3>
                <p>
                  Commission an independent assessment of the moisture source
                  and the wall construction. Ask specifically whether a
                  damp-proof course exists and what condition it is in.
                </p>
              </li>
              <li>
                <h3>Check the heritage position before anything is removed</h3>
                <p>
                  If the building is a State or local heritage place, or sits
                  in a heritage area or a contributory item, removing render or
                  altering masonry may need approval. Confirm it before work is
                  scoped, not after.
                </p>
              </li>
            </ol>

            <aside className="article-note article-note--warning">
              <strong>Removing old coatings is regulated work.</strong>
              <p>
                Cutting, grinding or blasting masonry, render and mortar can
                generate respirable crystalline silica, which is regulated in
                South Australia, and paint applied before 1970 may contain
                lead. Confirm how both will be controlled before any stripping
                or cutting starts.
              </p>
            </aside>
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.environment.sa.gov.au/topics/heritage/owning-a-heritage-place/living-in-a-state-heritage-area">
                Government of South Australia, living in a State Heritage Area
              </a>
              ,{" "}
              <a href="https://www.safework.sa.gov.au/industry/construction/crystalline-silica-substances-regulations">
                SafeWork SA, crystalline silica substances regulations
              </a>{" "}
              and{" "}
              <a href="https://www.sahealth.sa.gov.au/wps/wcm/connect/9d1caad2-c402-4327-b213-3b8e0319cf96/Managing%2Blead-based%2Bpaint%2Bfact%2Bsheet-final%2Bendorsed_October%2B2023.pdf?MOD=AJPERES">
                SA Health, <cite>Managing lead-based paint</cite> (PDF)
              </a>
              .
            </p>
          </div>
        </section>

        <section
          id="faqs-and-sources"
          className="section"
          aria-labelledby="salt-damp-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="salt-damp-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="salt-damp-faqs">
              <div className="faq-list__item">
                <dt>Will rendering the wall stop the damp?</dt>
                <dd>
                  No. A coating changes where the moisture leaves the wall, not
                  whether it arrives. On a wall without a working damp-proof
                  course, a dense render commonly pushes the problem higher and
                  then fails along the same band.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Do we have to remove the existing render?</dt>
                <dd>
                  Sometimes, and it depends on what is behind it and what the
                  remediation design calls for. On a heritage place, removal
                  may itself need approval. That decision belongs in the
                  assessment, not in a rendering quote.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>How long before the wall can be finished?</dt>
                <dd>
                  A wall that has been wet for years does not dry in a
                  fortnight, and the drying time depends on the thickness, the
                  masonry, the salt load and the weather. The specialist doing
                  the remediation should set the interval; treat a fixed number
                  offered without an inspection as a warning sign.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>Government of South Australia</dt>
                <dd>
                  <a href="https://cdn.environment.sa.gov.au/environment/docs/saltdamp_techguide.pdf">
                    <cite>
                      Salt attack and rising damp: a guide to salt damp in
                      historic and older buildings
                    </cite>{" "}
                    (PDF)
                  </a>
                  ,{" "}
                  <a href="https://plan.sa.gov.au/__data/assets/pdf_file/0012/653997/Advisory_Notice_Building_-_01-20_-_Damp-proofing_membrane_requirements_in_South_Australia.pdf">
                    PlanSA Building Advisory Notice 01/20,{" "}
                    <cite>
                      Damp-proofing membrane requirements in South Australia
                    </cite>{" "}
                    (PDF)
                  </a>{" "}
                  and{" "}
                  <a href="https://www.environment.sa.gov.au/topics/heritage/owning-a-heritage-place/living-in-a-state-heritage-area">
                    living in a State Heritage Area
                  </a>
                </dd>
              </div>
              <div>
                <dt>Australian Building Codes Board</dt>
                <dd>
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-two/h-class-1-and-10-buildings/part-h2-damp-and-weatherproofing">
                    NCC 2022 Volume Two, Part H2 Damp and weatherproofing
                  </a>
                  ,{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/5-masonry/part-57-weatherproofing-masonry">
                    Housing Provisions Part 5.7 Weatherproofing of masonry
                  </a>{" "}
                  and{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/5-masonry/part-56-masonry-components-and-accessories">
                    Part 5.6 Masonry components and accessories
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
                <dt>SafeWork SA and SA Health</dt>
                <dd>
                  <a href="https://www.safework.sa.gov.au/industry/construction/crystalline-silica-substances-regulations">
                    Crystalline silica substances regulations
                  </a>{" "}
                  and{" "}
                  <a href="https://www.sahealth.sa.gov.au/wps/wcm/connect/9d1caad2-c402-4327-b213-3b8e0319cf96/Managing%2Blead-based%2Bpaint%2Bfact%2Bsheet-final%2Bendorsed_October%2B2023.pdf?MOD=AJPERES">
                    <cite>Managing lead-based paint</cite> (PDF)
                  </a>
                </dd>
              </div>
            </dl>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/render/">Adelaide render services</Link>
              <Link href="/resources/rendering-over-painted-brick-adelaide/">
                Rendering over painted brick guide
              </Link>
              <Link href="/resources/render-cracking-adelaide/">
                Render cracking guide
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
        defaultService="Render"
        intro="If a wall has been assessed and the moisture source dealt with, tell us the suburb, the age of the house and what the remediation report specifies. Photographs of the affected wall help."
      />
      <CtaBand />
    </>
  );
}
