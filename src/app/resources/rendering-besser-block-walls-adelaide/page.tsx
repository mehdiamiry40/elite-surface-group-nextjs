import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { renderingBesserBlockGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: renderingBesserBlockGuide.metaTitle,
  description: renderingBesserBlockGuide.metaDescription,
  path: `/resources/${renderingBesserBlockGuide.slug}`,
  image: ogCard("render", renderingBesserBlockGuide.metaTitle),
  openGraphType: "article",
  publishedTime: renderingBesserBlockGuide.published,
  modifiedTime: renderingBesserBlockGuide.modified,
});

export default function RenderingBesserBlockGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Rendering besser block walls",
            href: `/resources/${renderingBesserBlockGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={renderingBesserBlockGuide} />

      <article>
        <PageBanner
          title={renderingBesserBlockGuide.title}
          image={bannerImages[`/resources/${renderingBesserBlockGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Rendering besser block walls" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{renderingBesserBlockGuide.category}</span>
              <time dateTime={renderingBesserBlockGuide.published}>
                Published {renderingBesserBlockGuide.publishedDisplay}
              </time>
              <span>{renderingBesserBlockGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              Rendering besser block walls is routine work when the blockwork
              is sound, clean, dry enough and prepared for the render system
              that has been selected. What usually goes wrong is not the render
              itself but something the blockwork brought with it: uneven
              suction, salts working out of fresh masonry, control joints
              rendered over, or water pushing through from soil held behind
              the wall.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>Render is a finish, not a structural repair.</strong>
              <p>
                A render coat will not make a leaning, bulging or cracked block
                wall safe, and it cannot waterproof the soil side of a retaining
                wall. If a wall has moved, is holding back soil or supports a
                fence or structure, arrange assessment by a suitably qualified
                professional, such as a structural engineer, before any finish
                is discussed.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#which-wall">Which kind of block wall?</a>
                </li>
                <li>
                  <a href="#preparation">Preparing blockwork for render</a>
                </li>
                <li>
                  <a href="#salts-and-joints">Salts, joints and movement</a>
                </li>
                <li>
                  <a href="#retaining-walls">Retaining walls and approvals</a>
                </li>
                <li>
                  <a href="#before-a-quote">What to have ready</a>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="which-wall">
          <div className="shell prose article-prose">
            <h2 id="which-wall">Start with what the wall is doing</h2>
            <p>
              &ldquo;Besser block&rdquo; is the everyday Australian name for
              hollow concrete masonry units, and across Adelaide they turn up in
              very different jobs. The same grey block can be a freestanding
              garden wall in Modbury, a boundary wall between two courtyards in
              Mawson Lakes, the lower storey of an older shed, or a stepped
              retaining wall on a sloping block in the foothills. Each asks
              something different of the finish.
            </p>
            <dl className="faq-list professional-list">
              <div className="faq-list__item">
                <dt>Freestanding garden or boundary wall</dt>
                <dd>
                  Both faces are exposed to weather and the top is exposed too.
                  Capping, the base where the wall meets paving or soil, and
                  any joints along its length decide how the render ages.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Retaining wall</dt>
                <dd>
                  One face holds back soil and moisture. Whatever drainage and
                  back-face treatment the wall was built with governs what the
                  rendered face will do. Render on the exposed side does not
                  replace either.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Wall of a building</dt>
                <dd>
                  Blockwork forming part of a house, garage or outbuilding
                  brings in weatherproofing, openings, flashings and any
                  articulation in the wall. The render system needs to suit the
                  whole wall, not just the block face.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="section" aria-labelledby="preparation">
          <div className="shell prose article-prose">
            <h2 id="preparation">
              Preparing blockwork before rendering besser block
            </h2>
            <p>
              Concrete block is absorbent and often irregular in texture, which
              is part of why it takes render well. The catch is that absorption
              varies. Rockcote&rsquo;s substrate guidance describes a simple
              check: pour roughly a cup of water on the brick or block. If it
              soaks in slowly, the surface suits render. If it pools on top, or
              disappears almost instantly, a bonding coat such as Keycote is
              called for, because a substrate with too much suction draws water
              out of cement render before it can cure and bond properly. Water
              that beads into droplets can signal a sealer or bond breaker on
              the face, which has to be dealt with first.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://rockcote.com.au/resources/preparing-brick-substrates-for-render/">
                Rockcote, Preparing brick substrates for render
              </a>{" "}
              and the{" "}
              <a href="https://rockcote.com.au/wp-content/uploads/2020/09/Keycote_TDS_September2020.pdf">
                Rockcote Keycote technical data sheet
              </a>
              .
            </p>
            <p>
              The same guidance asks for a clean, stable face, free of dust,
              grease, loose material and anything that acts as a bond breaker.
              On an older Adelaide wall that can mean moss on the shaded side,
              old paint or sealer, or mortar that has weathered back and become
              friable.
            </p>
            <p>
              Dulux Acratex publishes separate substrate specification guides
              for clay brick, cement brick and block, which is a fair
              indication that the manufacturer does not treat all masonry as
              one surface. The selected system&rsquo;s own guide and data
              sheets set the primer, the number and thickness of coats, curing
              times and the conditions work can proceed in, so those figures
              belong to the specification rather than to a general article.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex/substrate-guides/">
                Dulux Acratex substrate specification guides
              </a>
              .
            </p>
            <aside className="article-note article-note--warning">
              <strong>Cutting or grinding block creates silica dust.</strong>
              <p>
                SafeWork SA lists cement products and bricks among crystalline
                silica substances, and from 1 September 2024 South Australian
                regulations set specific obligations for businesses that cut,
                grind, drill or otherwise process them with power tools.
                Chasing blockwork, grinding back mortar or cutting blocks to
                fit is work to plan with dust controls, not to improvise.
              </p>
            </aside>
            <p className="article-source">
              Source:{" "}
              <a href="https://safework.sa.gov.au/industry/construction/crystalline-silica-substances-regulations">
                SafeWork SA, Crystalline silica substances regulations
              </a>
              .
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="salts-and-joints"
        >
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={renderingBesserBlockGuide.image}
                alt={renderingBesserBlockGuide.imageAlt}
                width={renderingBesserBlockGuide.imageWidth}
                height={renderingBesserBlockGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(renderingBesserBlockGuide.image)}
              />
              <figcaption>{renderingBesserBlockGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">What shows through later</span>
              <h2 id="salts-and-joints">Salts, joints and movement</h2>
              <h3>White deposits on new blockwork</h3>
              <p>
                Fresh masonry is alkaline and can push white salts to the
                surface as it dries. Dulux describes its Acratex Green Render
                Sealer as a primer for fresh &ldquo;green&rdquo; masonry,
                intended to minimise efflorescence migrating through the
                coating system. Whether a sealer of that kind is needed, and
                how long new work should stand first, is a question for the
                chosen system rather than a rule of thumb.
              </p>
              <p>
                On an old wall, persistent salting near the base is a
                different matter: it points to moisture moving through the
                block, and our{" "}
                <Link href="/resources/salt-damp-adelaide/">
                  salt damp guide
                </Link>{" "}
                explains why render alone does not fix that.
              </p>
              <h3>Control joints and ground movement</h3>
              <p>
                Long runs of blockwork are usually broken by control joints.
                Rendering straight across one moves the crack into the finish.
                Much of the Adelaide Plain sits on reactive clay that swells
                when wet and shrinks when dry, and CSIRO&rsquo;s homeowner
                guidance links that moisture change to footing movement. A
                garden wall on a shallow footing in clay can move with the
                seasons, so the joints need to carry through the render.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://www.dulux.com.au/specifier/products/acratex-prep-and-additives/acratex-green-render-sealer/">
                  Dulux Acratex Green Render Sealer
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

        <section className="section" aria-labelledby="retaining-walls">
          <div className="shell prose article-prose">
            <h2 id="retaining-walls">Retaining walls and council approval</h2>
            <p>
              Retaining walls are where most besser block rendering questions
              in Adelaide start, because so many sloping sites in suburbs like
              Golden Grove, Hope Valley and the foothills have one. Two things
              matter before render.
            </p>
            <p>
              First, the water. A retaining wall holds back soil that gets wet
              every winter. If that moisture can reach the back of the
              blockwork, it will try to come through, carrying salts with it,
              and a render coat on the front face tends to show it as damp
              patches, staining or loss of bond. Drainage behind the wall and
              any treatment of the retained face belong to the wall&rsquo;s
              design. If you do not know what was built in, find out before
              paying for a finish.
            </p>
            <p>
              Second, the paperwork. Requirements depend on the council and on
              the Planning and Design Code for the address. The City of
              Salisbury, for example, says a development application is needed
              where a retaining wall is one metre or higher, and where a
              retaining wall and fence together exceed 2.1 metres. It asks for
              construction details and an engineer&rsquo;s design with
              footing calculations. Other councils and zones differ, so check
              the Code for your property on PlanSA rather than relying on a
              neighbour&rsquo;s experience.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.salisbury.sa.gov.au/development/building-in-salisbury/residential/retaining-walls">
                City of Salisbury, Retaining walls
              </a>{" "}
              and{" "}
              <a href="https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval">
                PlanSA, Find out if you need approval
              </a>
              .
            </p>
            <p>
              Approval for a new or raised wall sits with the owner and their
              builder or designer. We plan the finish around those documents;
              we do not provide the engineering.
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="before-a-quote"
        >
          <div className="shell prose article-prose">
            <h2 id="before-a-quote">What to have ready before a quote</h2>
            <TickList
              items={[
                "Wide photographs of every face to be rendered, plus the top and the base where it meets soil or paving",
                "Whether the wall is freestanding, part of a building or retaining soil, and roughly how high it is",
                "Its approximate age, and whether it has been painted, sealed or rendered before",
                "Any white deposits, damp patches, cracks, lean or bulging, with dates if they have changed",
                "Where the existing control joints are, if you can see them",
                "Any approval documents or engineering drawings for the wall",
                "Access: side paths, neighbours, pools, plants or paving close to the wall",
              ]}
            />
            <p>
              If the wall has moved or is holding back soil, have it assessed
              first. Once the structure and moisture questions are answered,
              choosing between a cement-based and acrylic system is covered in
              our{" "}
              <Link href="/resources/acrylic-render-vs-cement-render-adelaide/">
                acrylic vs cement render guide
              </Link>
              , and the texture grade in{" "}
              <Link href="/resources/render-finishes-adelaide/">
                render finishes for Adelaide homes
              </Link>
              .
            </p>

            <h2 id="besser-block-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="besser-block-faqs">
              <div className="faq-list__item">
                <dt>Can you render straight onto besser blocks?</dt>
                <dd>
                  Often, once the face is clean and sound and its suction has
                  been checked. Very dense, smooth, sealed or painted blocks
                  may need a bonding coat or other preparation set by the
                  render system&rsquo;s documentation.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Will render stop a retaining wall leaking?</dt>
                <dd>
                  No. Render on the exposed face is a finish. Water coming
                  through from the retained soil needs to be dealt with through
                  the wall&rsquo;s drainage and design, assessed by a suitably
                  qualified professional.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>Manufacturer technical guidance</dt>
                <dd>
                  <a href="https://rockcote.com.au/resources/preparing-brick-substrates-for-render/">
                    Rockcote: Preparing Brick Substrates for Render
                  </a>
                  ,{" "}
                  <a href="https://rockcote.com.au/wp-content/uploads/2020/09/Keycote_TDS_September2020.pdf">
                    Rockcote Keycote technical data sheet (PDF)
                  </a>
                  ,{" "}
                  <a href="https://www.dulux.com.au/specifier/products/acratex/substrate-guides/">
                    Dulux Acratex substrate specification guides
                  </a>{" "}
                  and{" "}
                  <a href="https://www.dulux.com.au/specifier/products/acratex-prep-and-additives/acratex-green-render-sealer/">
                    Dulux Acratex Green Render Sealer
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
                <dt>City of Salisbury</dt>
                <dd>
                  <a href="https://www.salisbury.sa.gov.au/development/building-in-salisbury/residential/retaining-walls">
                    Retaining walls
                  </a>
                </dd>
              </div>
              <div>
                <dt>PlanSA</dt>
                <dd>
                  <a href="https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval">
                    Find out if you need approval
                  </a>
                </dd>
              </div>
              <div>
                <dt>SafeWork SA</dt>
                <dd>
                  <a href="https://safework.sa.gov.au/industry/construction/crystalline-silica-substances-regulations">
                    Crystalline silica substances regulations
                  </a>
                </dd>
              </div>
            </dl>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/render/">Adelaide rendering services</Link>
              <Link href="/projects/rendered-column-and-stone-junctions/">
                Rendered column and stone junction case study
              </Link>
              <Link href="/locations/adelaide/">Adelaide service area</Link>
              <Link href="/project-planning/">Plan your project enquiry</Link>
              <Link href="/contact-us/#contact">
                Discuss your block wall
              </Link>
            </nav>
          </div>
        </section>
      </article>

      <ContactSection
        defaultService="Render"
        intro="Planning to render a block wall? Tell us the suburb, what the wall does, roughly how high it is and whether it has been painted or sealed. Photographs of each face help, and if supporting files are needed, we’ll arrange how to review them."
      />
      <CtaBand />
    </>
  );
}
