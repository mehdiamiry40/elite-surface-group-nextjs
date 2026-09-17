import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { claddingVsRenderGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: claddingVsRenderGuide.metaTitle,
  description: claddingVsRenderGuide.metaDescription,
  path: `/resources/${claddingVsRenderGuide.slug}`,
  image: ogCard("cladding", claddingVsRenderGuide.metaTitle),
  openGraphType: "article",
  publishedTime: claddingVsRenderGuide.published,
  modifiedTime: claddingVsRenderGuide.modified,
});

export default function CladdingVsRenderGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Cladding or render",
            href: `/resources/${claddingVsRenderGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={claddingVsRenderGuide} />

      <article>
        <PageBanner
          title={claddingVsRenderGuide.title}
          image={bannerImages[`/resources/${claddingVsRenderGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Cladding or render" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{claddingVsRenderGuide.category}</span>
              <time dateTime={claddingVsRenderGuide.published}>
                Published {claddingVsRenderGuide.publishedDisplay}
              </time>
              <span>{claddingVsRenderGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              Cladding vs render is less a choice between two looks than a
              choice about the wall behind them. Render is a coating bonded to a
              substrate, so it inherits whatever that substrate does, movement
              included. Cladding is a separate layer fixed over a frame or
              battens, so it can be detailed to shed and drain water
              independently of the wall behind it. On most Adelaide sites the
              substrate, the soil and the exposure narrow the field well before
              taste gets a say.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>We install both, so the answer is not a sales pitch.</strong>
              <p>
                Elite Surface Group installs cladding, render, Hebel and walling,
                and does not certify buildings. Anything touching structural
                adequacy, weatherproofing compliance or fire performance should
                be assessed by a suitably qualified professional before a finish
                is chosen.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#difference">What actually differs</a>
                </li>
                <li>
                  <a href="#substrate">Start with the wall you have</a>
                </li>
                <li>
                  <a href="#conditions">What Adelaide conditions change</a>
                </li>
                <li>
                  <a href="#upkeep">Upkeep, repair and how each ages</a>
                </li>
                <li>
                  <a href="#approvals">Approvals, scope and who carries it</a>
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

        <section className="section section--tint" aria-labelledby="difference">
          <div className="shell prose article-prose">
            <h2 id="difference">Cladding vs render: what actually differs</h2>
            <h3>Render is a coating</h3>
            <p>
              Render is applied wet and cures in place. Traditional cement-based
              renders and modern polymer-modified or acrylic systems all bond to
              something solid&mdash;brickwork, blockwork, AAC panels such as
              Hebel, or a proprietary base sheet fixed to a frame&mdash;and are
              then finished with a texture and a coating. There is no gap and no
              separation: the render and the wall behave as one element. That is
              the source of its best quality, a continuous monolithic face, and
              of its main weakness&mdash;anything the wall does eventually
              reaches the surface.
            </p>
            <h3>Cladding is a layer</h3>
            <p>
              Cladding is fixed, not bonded. Boards, planks or sheets are
              screwed or nailed to the frame, usually over battens that create a
              drained and ventilated cavity, with a pliable membrane behind them
              doing the weatherproofing. Water that gets past the face has
              somewhere to go. The trade-off is that a clad wall lives or dies
              by its junctions: flashings at windows, doors, corners, the base
              of the wall and every penetration.
            </p>
            <TickList
              items={[
                "Render is bonded to the substrate; cladding is fixed over it with a cavity and membrane behind",
                "Render gives one continuous plane; cladding gives an expressed joint pattern you have to design",
                "Render telegraphs substrate movement; cladding conceals it but relies on concealed flashings",
                "Render can only go on a substrate the system is documented for; cladding suits a frame directly",
              ]}
            />
            <p className="article-source">
              Sources:{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/7-roof-and-wall-cladding/part-75-timber-and-composite-wall-cladding">
                NCC 2022 Housing Provisions, Part 7.5 Timber and composite wall
                cladding
              </a>
              ,{" "}
              <a href="https://www.yourhome.gov.au/materials/cladding-systems">
                Australian Government YourHome, cladding systems
              </a>{" "}
              and{" "}
              <a href="https://rockcote.com.au/what-are-the-different-types-of-render-a-homeowners-guide/">
                Rockcote, types of render
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="substrate">
          <div className="shell prose article-prose">
            <h2 id="substrate">Start with the wall you have</h2>
            <p>
              On a new build the frame and its sheeting settle most of it. A
              bare timber or steel frame cannot simply be rendered; render needs
              masonry, an AAC panel system or a documented render base sheet,
              and each of those changes the trade sequence long before anyone
              picks a colour. Cladding fixes to the frame more directly, which
              is why mixed facades so often clad the upper level and render the
              masonry below.
            </p>
            <p>
              On an existing Adelaide home the question is sharper. Sound,
              unpainted brick veneer will take render well with the right
              preparation. The same wall can also be clad, but that becomes a
              battened, cavity-forming job with its own flashing
              requirements&mdash;our{" "}
              <Link href="/resources/cladding-over-brick-adelaide/">
                guide to cladding over brick
              </Link>{" "}
              covers what the existing wall has to confirm first.
            </p>
            <p>
              Two conditions hold render up until they are resolved. Painted
              masonry turns the job into an adhesion question, which the{" "}
              <Link href="/resources/rendering-over-painted-brick-adelaide/">
                rendering over painted brick guide
              </Link>{" "}
              works through. And where{" "}
              <Link href="/resources/salt-damp-adelaide/">salt damp</Link> is
              present&mdash;common in older stone and brick homes across
              Adelaide&rsquo;s inner suburbs&mdash;neither finish fixes it, and
              coating over it usually makes the damage worse.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://rockcote.com.au/resources/preparing-brick-substrates-for-render/">
                Rockcote, preparing brick substrates for render
              </a>{" "}
              and{" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex/substrate-guides/">
                Dulux, Acratex substrate guides
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="conditions">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={claddingVsRenderGuide.image}
                alt={claddingVsRenderGuide.imageAlt}
                width={claddingVsRenderGuide.imageWidth}
                height={claddingVsRenderGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(claddingVsRenderGuide.image)}
              />
              <figcaption>{claddingVsRenderGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Local context</span>
              <h2 id="conditions">What Adelaide conditions change</h2>
              <p>
                Reactive clay soils run through much of the Adelaide plains, and
                they swell and shrink with the seasons. A rendered wall over a
                moving substrate shows it as cracking; a clad wall tends to show
                it at the joints instead. Neither is a remedy. Where a house has
                a movement history, have the cause understood&mdash;our{" "}
                <Link href="/resources/render-cracking-adelaide/">
                  guide to render cracking
                </Link>{" "}
                sets out what to record before anyone quotes a repair.
              </p>
              <p>
                Coastal exposure at Semaphore, Glenelg and Brighton is harder on
                both systems, but in different places. On a clad wall the
                fasteners, flashings and coated boards carry the salt load; on a
                rendered wall the coating is the exposed layer. Durability
                requirements follow the documented exposure category and the
                manufacturer&rsquo;s literature rather than the postcode, and
                the{" "}
                <Link href="/resources/cladding-maintenance-coastal-adelaide/">
                  coastal cladding maintenance guide
                </Link>{" "}
                covers what that means in practice.
              </p>
              <p>
                Hot dry summers matter mostly to render, because application and
                curing happen on site. Temperature, wind and drying conditions
                sit in each system&rsquo;s product data sheet, and a summer
                programme should follow those documented limits. Up on the Hills
                Face side of town,
                bushfire-prone designation brings its own material
                requirements&mdash;the{" "}
                <Link href="/resources/fibre-cement-vs-weatherboard-cladding-adelaide/">
                  cladding comparison guide
                </Link>{" "}
                explains how that zoning is confirmed.
              </p>
              <p>
                Whichever face goes on, the condensation provisions apply to the
                whole wall assembly rather than to the finish alone, and
                Adelaide sits in climate zone 5.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                  CSIRO,{" "}
                  <cite>
                    Foundation maintenance and footing performance
                  </cite>{" "}
                  (PDF)
                </a>
                ,{" "}
                <a href="https://rockcote.com.au/resources/structural-movement/">
                  Rockcote, structural movement
                </a>
                ,{" "}
                <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/10-health-and-amenity/part-108-condensation-management">
                  NCC 2022 Housing Provisions, Part 10.8 Condensation management
                </a>{" "}
                and the{" "}
                <a href="https://www.abcb.gov.au/resource/map/climate-zone-map-sa">
                  ABCB climate zone map, South Australia
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="upkeep">
          <div className="shell prose article-prose">
            <h2 id="upkeep">Upkeep, repair and how each ages</h2>
            <p>
              Neither finish is maintenance-free. The useful comparison is what
              fails first and how it gets repaired. A rendered wall is recoated
              on an interval set by the coating system and the exposure, with
              the manufacturer&rsquo;s warranty terms usually setting the
              maintenance conditions that keep it valid&mdash;the{" "}
              <Link href="/resources/repainting-render-adelaide/">
                repainting guide
              </Link>{" "}
              covers what the existing surface has to confirm first. Cracks are
              repairable, but the cause has to be settled before the cosmetic
              work, or the same line comes back.
            </p>
            <p>
              A clad wall is washed down to the manufacturer&rsquo;s schedule,
              and coated boards are repainted on their own cycle. Its advantage
              shows up in damage: a struck or split board is replaced
              individually, where the equivalent render repair is a patch
              matched into a continuous texture. Its disadvantage is that the
              parts that matter&mdash;membrane, flashings and cavity&mdash;are
              invisible once the boards are on, so defects there are found late.
            </p>
            <p>
              Colour is a repaint either way. Both systems will change their
              look in ten years; neither will leave you alone for thirty.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex/overview/warranty/">
                Dulux, Acratex warranty
              </a>
              ,{" "}
              <a href="https://rockcote.com.au/wp-content/uploads/2020/09/ROCKCOTE_Maintenance_Guide_opt.pdf">
                Rockcote maintenance guide (PDF)
              </a>{" "}
              and{" "}
              <a href="https://www.jameshardie.com.au/fibre-cement">
                James Hardie, fibre cement product information
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="approvals">
          <div className="shell prose article-prose">
            <h2 id="approvals">Approvals, scope and who carries the finish</h2>
            <p>
              Changing a building&rsquo;s external appearance is exactly what a
              character or heritage overlay concerns itself with, and in South
              Australia whether planning consent is needed depends on how the
              work is categorised. Some work proceeds as accepted development
              with building consent only, but that category carries
              exceptions&mdash;heritage areas and the Hills Face Zone among
              them. Confirm the position for your allotment before material is
              ordered.
            </p>
            <p>
              Trade scope is the other thing to settle in writing. On a clad
              wall, name who supplies and installs the membrane, the battens and
              every flashing, and who makes good at the windows. On a rendered
              wall, name who prepares the substrate, who sets the control joints
              and who owns the finish if the sheeting below it moves.
            </p>
            <p>
              Our <Link href="/cladding/">Adelaide cladding installation</Link>{" "}
              and <Link href="/render/">rendering</Link> work often lands on the
              same elevation, because mixed facades are the common answer. The{" "}
              <Link href="/projects/dark-feature-cladding/">
                dark feature cladding case study
              </Link>{" "}
              shows how much the joint layout carries a clad finish, the{" "}
              <Link href="/projects/two-storey-exterior-render/">
                two-storey render case study
              </Link>{" "}
              shows what a continuous rendered plane looks like across a whole
              facade,{" "}
              <Link href="/project-planning/">our project planning notes</Link>{" "}
              list what is useful to have ready before quoting, and the{" "}
              <Link href="/locations/adelaide/">Adelaide service area page</Link>{" "}
              covers where we work.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval">
                PlanSA, find out if you need approval
              </a>
              ,{" "}
              <a href="https://plan.sa.gov.au/development_applications/getting_approval/how_applications_are_assessed/types_of_consent">
                PlanSA, types of consent
              </a>{" "}
              and{" "}
              <a href="https://www.sa.gov.au/topics/business-and-trade/licensing/building-and-trades/building-work-contractor-s-licence">
                Government of South Australia, building work contractor&rsquo;s
                licence
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
                <h3>Confirm what the substrate actually is</h3>
                <p>
                  Brick veneer, solid masonry, AAC panel or a sheeted
                  frame&mdash;and whether it has been painted before. That
                  answer removes options faster than anything else.
                </p>
              </li>
              <li>
                <h3>Get the site classified before you commit</h3>
                <p>
                  A geotechnical site classification tells you what the soil
                  does. Settle the cladding vs render question after it, not
                  before.
                </p>
              </li>
              <li>
                <h3>Check the overlays on your allotment</h3>
                <p>
                  Heritage, character and Hills Face Zone provisions can shape
                  the external appearance, so confirm the approval pathway
                  before choosing a material.
                </p>
              </li>
              <li>
                <h3>Ask for the system documents, not the brochure</h3>
                <p>
                  Whichever way you lean, ask for the manufacturer&rsquo;s
                  installation guide and warranty conditions for the specific
                  system. They set the exposure limits and the maintenance
                  terms.
                </p>
              </li>
            </ol>

            <aside className="article-note article-note--warning">
              <strong>Both jobs carry dust and height risks.</strong>
              <p>
                Cutting fibre cement dry generates respirable crystalline
                silica, which is regulated in South Australia, and most exterior
                work on a two-storey home happens at height. Confirm how dust
                and fall risks will be controlled before work starts.
              </p>
            </aside>
            <p className="article-source">
              Sources:{" "}
              <a href="https://safework.sa.gov.au/industry/construction/silica">
                SafeWork SA, silica in construction
              </a>{" "}
              and{" "}
              <a href="https://safework.sa.gov.au/industry/construction/working-at-heights">
                SafeWork SA, working at heights
              </a>
              .
            </p>
          </div>
        </section>

        <section
          id="faqs-and-sources"
          className="section section--tint"
          aria-labelledby="cladding-render-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="cladding-render-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="cladding-render-faqs">
              <div className="faq-list__item">
                <dt>Which one lasts longer?</dt>
                <dd>
                  Service life belongs to the specific system and its exposure,
                  not to the category. Maintained to their documented terms,
                  both are long-life walls. The one that fails early is usually
                  the one installed on the wrong substrate or detailed badly at
                  the junctions.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Can we use both on the same house?</dt>
                <dd>
                  Yes, and it is common. Render on the masonry ground floor with
                  cladding to an upper level or a feature element is a standard
                  Adelaide approach. The junction between the two systems is the
                  detail that has to be designed rather than improvised on site.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>
                  Does cladding vs render change the insulation in the wall?
                </dt>
                <dd>
                  It can. A clad wall with a batten cavity is a different
                  assembly to a bonded render, and thermal and condensation
                  performance is assessed across the whole build-up, not the
                  finish. Where insulation or a membrane is being added, have
                  the assembly designed as one thing.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Will render hide the cracks already in our wall?</dt>
                <dd>
                  Only until the wall moves again. Render bonded to a moving
                  substrate reproduces the movement at the surface, so the cause
                  needs assessment first. Covering it is the expensive way to
                  find that out.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>Australian Building Codes Board</dt>
                <dd>
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/7-roof-and-wall-cladding/part-75-timber-and-composite-wall-cladding">
                    NCC 2022 Housing Provisions, Part 7.5 Timber and composite
                    wall cladding
                  </a>
                  ,{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/5-masonry/part-57-weatherproofing-masonry">
                    Part 5.7 Weatherproofing of masonry
                  </a>
                  ,{" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/10-health-and-amenity/part-108-condensation-management">
                    Part 10.8 Condensation management
                  </a>{" "}
                  and the{" "}
                  <a href="https://www.abcb.gov.au/resource/map/climate-zone-map-sa">
                    South Australian climate zone map
                  </a>
                </dd>
              </div>
              <div>
                <dt>Australian Government YourHome</dt>
                <dd>
                  <a href="https://www.yourhome.gov.au/materials/cladding-systems">
                    Cladding systems
                  </a>
                </dd>
              </div>
              <div>
                <dt>Government of South Australia</dt>
                <dd>
                  <a href="https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval">
                    PlanSA, find out if you need approval
                  </a>
                  ,{" "}
                  <a href="https://plan.sa.gov.au/development_applications/getting_approval/how_applications_are_assessed/types_of_consent">
                    types of consent
                  </a>{" "}
                  and{" "}
                  <a href="https://www.sa.gov.au/topics/business-and-trade/licensing/building-and-trades/building-work-contractor-s-licence">
                    building work contractor&rsquo;s licence
                  </a>
                </dd>
              </div>
              <div>
                <dt>SafeWork SA</dt>
                <dd>
                  <a href="https://safework.sa.gov.au/industry/construction/silica">
                    Silica in construction
                  </a>{" "}
                  and{" "}
                  <a href="https://safework.sa.gov.au/industry/construction/working-at-heights">
                    working at heights
                  </a>
                </dd>
              </div>
              <div>
                <dt>CSIRO</dt>
                <dd>
                  <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                    <cite>Foundation maintenance and footing performance</cite>{" "}
                    (PDF)
                  </a>
                </dd>
              </div>
              <div>
                <dt>Rockcote</dt>
                <dd>
                  <a href="https://rockcote.com.au/what-are-the-different-types-of-render-a-homeowners-guide/">
                    Types of render
                  </a>
                  ,{" "}
                  <a href="https://rockcote.com.au/resources/preparing-brick-substrates-for-render/">
                    preparing brick substrates for render
                  </a>
                  ,{" "}
                  <a href="https://rockcote.com.au/resources/structural-movement/">
                    structural movement
                  </a>{" "}
                  and the{" "}
                  <a href="https://rockcote.com.au/wp-content/uploads/2020/09/ROCKCOTE_Maintenance_Guide_opt.pdf">
                    maintenance guide (PDF)
                  </a>
                </dd>
              </div>
              <div>
                <dt>Dulux</dt>
                <dd>
                  <a href="https://www.dulux.com.au/specifier/products/acratex/substrate-guides/">
                    Acratex substrate guides
                  </a>{" "}
                  and{" "}
                  <a href="https://www.dulux.com.au/specifier/products/acratex/overview/warranty/">
                    Acratex warranty
                  </a>
                </dd>
              </div>
              <div>
                <dt>James Hardie</dt>
                <dd>
                  <a href="https://www.jameshardie.com.au/fibre-cement">
                    Fibre cement product information
                  </a>
                </dd>
              </div>
            </dl>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/cladding/">Adelaide cladding installation</Link>
              <Link href="/render/">Adelaide rendering</Link>
              <Link href="/resources/cladding-over-brick-adelaide/">
                Cladding over brick guide
              </Link>
              <Link href="/resources/acrylic-render-vs-cement-render-adelaide/">
                Acrylic or cement render?
              </Link>
              <Link href="/project-planning/">Project planning notes</Link>
              <Link href="/contact-us/#contact">
                Discuss the available project details
              </Link>
            </nav>
          </div>
        </section>
      </article>

      <ContactSection
        defaultService="Cladding"
        intro="If you are weighing cladding against render, tell us the suburb, what the existing walls are built from and which elevations are in scope. Photographs of the walls and any plans let us set out what each system would involve."
      />
      <CtaBand />
    </>
  );
}
