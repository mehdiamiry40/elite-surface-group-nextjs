import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { baggedBrickVsRenderGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: baggedBrickVsRenderGuide.metaTitle,
  description: baggedBrickVsRenderGuide.metaDescription,
  path: `/resources/${baggedBrickVsRenderGuide.slug}`,
  image: ogCard("render", baggedBrickVsRenderGuide.metaTitle),
  openGraphType: "article",
  publishedTime: baggedBrickVsRenderGuide.published,
  modifiedTime: baggedBrickVsRenderGuide.modified,
});

export default function BaggedBrickVsRenderGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Bagged brick vs render in Adelaide",
            href: `/resources/${baggedBrickVsRenderGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={baggedBrickVsRenderGuide} />

      <article>
        <PageBanner
          title={baggedBrickVsRenderGuide.title}
          image={bannerImages[`/resources/${baggedBrickVsRenderGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Bagged brick vs render in Adelaide" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{baggedBrickVsRenderGuide.category}</span>
              <time dateTime={baggedBrickVsRenderGuide.published}>
                Published {baggedBrickVsRenderGuide.publishedDisplay}
              </time>
              <span>{baggedBrickVsRenderGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              The real difference in bagged brick vs render is how much of the
              wall survives. Bagging rubs a thin cement-based coat over the
              brickwork so the outline of each brick and joint still reads
              through. Render builds a full coat that buries the brick
              completely and can be finished smooth or textured. Bagging keeps
              the wall&rsquo;s character&mdash;and its flaws. Render can hide
              more, but it asks more of the wall underneath.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>A coating changes the look, not the wall.</strong>
              <p>
                Elite Surface Group applies render and installs cladding, Hebel
                and walling. We do not certify buildings. Where cracking,
                movement, damp or the structural condition of the brickwork is
                in question, arrange assessment by a suitably qualified
                professional before either finish is priced.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#difference">What each finish actually is</a>
                </li>
                <li>
                  <a href="#wall-decides">What the wall decides</a>
                </li>
                <li>
                  <a href="#adelaide">Adelaide conditions</a>
                </li>
                <li>
                  <a href="#safety-approvals">Safety and approvals</a>
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
            <h2 id="difference">What bagging and render actually are</h2>

            <h3>Bagging: a thin coat that follows the brick</h3>
            <p>
              Bagging takes its name from the hessian bag traditionally used to
              rub a wet sand-and-cement slurry across the face of the brickwork.
              Today it is as likely to be a sponge or brush. The coat fills the
              surface pores and softens the colour variation between bricks, but
              it is too thin to level anything. Mortar joints, chipped arrises
              and the line of each course remain visible as a gentle relief once
              the wall is painted.
            </p>
            <p>
              That is the appeal on a sound, reasonably flat wall. A mismatched
              extension, patched brickwork or dated face brick can be pulled
              together into one surface without pretending the wall is anything
              other than masonry.
            </p>

            <h3>Render: a full coat that replaces the surface</h3>
            <p>
              Render is applied in a thicker build and worked flat with a
              straightedge and float, so the brick pattern disappears. It can be
              a cement-based system, an acrylic polymer system, or a cement base
              under an acrylic texture coat&mdash;our{" "}
              <Link href="/resources/acrylic-render-vs-cement-render-adelaide/">
                acrylic versus cement render comparison
              </Link>{" "}
              covers that choice. The finish on top can then be smooth or
              textured, which the{" "}
              <Link href="/resources/render-finishes-adelaide/">
                render finishes guide
              </Link>{" "}
              works through. Rockcote&rsquo;s homeowner guide notes that
              textured finishes can help conceal minor substrate variations,
              while smooth render is common where clean architectural lines are
              wanted.
            </p>
            <p>
              The trade-off is that render is bonded to the brick across its
              whole area. Whatever the wall does&mdash;moves, stays damp,
              carries salt&mdash;the render has to live with it, and a thicker,
              flatter surface shows a failure more plainly than a bagged one.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://rockcote.com.au/what-are-the-different-types-of-render-a-homeowners-guide/">
                Rockcote, types of render
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="wall-decides">
          <div className="shell prose article-prose">
            <h2 id="wall-decides">What the existing brick wall decides</h2>
            <p>
              Taste rarely settles this on its own. Four facts about the wall
              usually narrow the options first.
            </p>

            <h3>How flat and consistent the brickwork is</h3>
            <p>
              Bagging inherits the wall exactly. A bowed course, a step between
              old and new brick or a badly raked joint will still show,
              especially in low sun across a western elevation. If the goal is a
              crisp contemporary face, bagging is the wrong tool; that is
              render&rsquo;s job.
            </p>

            <h3>Whether the brick has been painted or sealed</h3>
            <p>
              Both finishes rely on bonding to the masonry. A painted or sealed
              face changes that question entirely, and our{" "}
              <Link href="/resources/rendering-over-painted-brick-adelaide/">
                guide to rendering over painted brick
              </Link>{" "}
              covers the adhesion checks it calls for. Dulux publishes separate
              substrate guides for clay brick, cement brick and block, which is
              a reminder that &ldquo;brick&rdquo; is not one substrate.
            </p>

            <h3>Suction and preparation</h3>
            <p>
              Excessive suction in the brick can draw water out of a cement coat
              too quickly, interfering with hydration and contributing to early
              cracking or poor bond. Preparation, any bonding coat and
              application limits come from the selected system&rsquo;s data, not
              from habit.
            </p>

            <h3>Movement joints</h3>
            <p>
              Articulation and control joints exist so the wall can move.
              Rockcote&rsquo;s structural movement guidance is clear that
              carrying a rigid finish across one simply relocates the stress
              into the surface. That applies to a bagged coat as much as to
              render.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex/substrate-guides/">
                Dulux AcraTex substrate guides
              </a>
              ,{" "}
              <a href="https://rockcote.com.au/resources/preparing-brick-substrates-for-render/">
                Rockcote, preparing brick substrates for render
              </a>{" "}
              and{" "}
              <a href="https://rockcote.com.au/resources/structural-movement/">
                Rockcote, structural movement
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="adelaide">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={baggedBrickVsRenderGuide.image}
                alt={baggedBrickVsRenderGuide.imageAlt}
                width={baggedBrickVsRenderGuide.imageWidth}
                height={baggedBrickVsRenderGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(baggedBrickVsRenderGuide.image)}
              />
              <figcaption>{baggedBrickVsRenderGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Local context</span>
              <h2 id="adelaide">
                Bagged brick vs render in Adelaide conditions
              </h2>
              <p>
                Reactive clay is common across the Adelaide plains, and CSIRO
                guidance explains how seasonal moisture change in that soil
                moves footings and the brittle masonry above them. Where that
                ground sits under a face-brick home&mdash;around Salisbury,
                Elizabeth and Paralowie it is the background condition&mdash;a
                bagged wall wears old movement lightly, while a flat render coat
                tends to put a recurring crack on display.
              </p>
              <p>
                Older solid brick and stone homes in the inner suburbs raise a
                different issue: salt damp. Neither finish cures it, and sealing
                damp, salt-laden masonry behind a coating usually moves the
                damage rather than stopping it. Our{" "}
                <Link href="/resources/salt-damp-adelaide/">
                  salt damp guide
                </Link>{" "}
                and the South Australian government&rsquo;s technical guide
                cover what to have assessed first.
              </p>
              <p>
                On the coast, Rockcote&rsquo;s maintenance guide says dark
                colours and coastal environments may need more frequent
                repainting. Whichever finish goes on at Semaphore, Glenelg or
                Brighton, the paint over it carries most of the weather.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                  CSIRO,{" "}
                  <cite>Foundation Maintenance and Footing Performance</cite>{" "}
                  (PDF)
                </a>
                ,{" "}
                <a href="https://cdn.environment.sa.gov.au/environment/docs/saltdamp_techguide.pdf">
                  SA salt attack and rising damp guide (PDF)
                </a>{" "}
                and the{" "}
                <a href="https://rockcote.com.au/wp-content/uploads/2020/09/ROCKCOTE_Maintenance_Guide_opt.pdf">
                  Rockcote maintenance guide (PDF)
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="safety-approvals">
          <div className="shell prose article-prose">
            <h2 id="safety-approvals">Safety and approvals to check first</h2>
            <aside className="article-note article-note--warning">
              <strong>Preparation on old brick is regulated work.</strong>
              <p>
                SafeWork SA lists bricks, mortar and cement-based products as
                crystalline-silica substances, so cutting, grinding or raking
                them needs planned dust controls. SA Health says homes built
                before 1980 are likely to contain lead-based paint, which
                matters if an existing coating has to come off.
              </p>
            </aside>
            <p>
              A change from face brick to a bagged or rendered finish alters the
              look of the house from the street. PlanSA directs owners to check
              their address against the Planning and Design Code, and Heritage
              South Australia says changes in State Heritage Areas can need
              development approval, including external painting. For a heritage
              place or area, confirm the position with the relevant planning
              authority before anything is quoted as approved work.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://safework.sa.gov.au/industry/construction/silica">
                SafeWork SA silica guidance
              </a>
              ,{" "}
              <a href="https://www.sahealth.sa.gov.au/wps/wcm/connect/9d1caad2-c402-4327-b213-3b8e0319cf96/Managing%2Blead-based%2Bpaint%2Bfact%2Bsheet-final%2Bendorsed_October%2B2023.pdf?MOD=AJPERES">
                SA Health lead-based paint fact sheet (PDF)
              </a>
              ,{" "}
              <a href="https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval">
                PlanSA, find out if you need approval
              </a>{" "}
              and{" "}
              <a href="https://www.environment.sa.gov.au/topics/heritage/owning-a-heritage-place/living-in-a-state-heritage-area">
                living in a State Heritage Area
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
                <h3>Walk the wall in low sun</h3>
                <p>
                  Early morning and late afternoon light shows how flat the
                  brickwork really is. If it reads wavy, bagging will too.
                </p>
              </li>
              <li>
                <h3>Record cracks, damp and past repairs</h3>
                <p>
                  Photograph them with a date and reference point. Active
                  movement or damp needs resolving before either finish.
                </p>
              </li>
              <li>
                <h3>Confirm the coating history</h3>
                <p>
                  Bare, painted or sealed brick each lead to a different
                  preparation scope.
                </p>
              </li>
              <li>
                <h3>Ask for a sample on the building</h3>
                <p>
                  A small bagged or rendered panel on the main elevation shows
                  how much of the brick you keep, in real Adelaide light.
                </p>
              </li>
            </ol>
            <TickList
              items={[
                "The full system for each coat, and who warrants each layer",
                "How movement joints will be kept open through the finish",
                "Which trade handles sills, flashings, weep holes and junctions",
                "The documented cleaning and repaint terms for the coating",
              ]}
            />
            <p>
              Our <Link href="/render/">Adelaide render service</Link> explains
              how we scope this work, the{" "}
              <Link href="/project-planning/">project planning guide</Link>{" "}
              lists what to have ready before quoting, and the{" "}
              <Link href="/projects/two-storey-exterior-render/">
                two-storey exterior render case study
              </Link>{" "}
              shows one finished rendered elevation.
            </p>
          </div>
        </section>

        <section
          id="faqs-and-sources"
          className="section"
          aria-labelledby="bagged-brick-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="bagged-brick-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="bagged-brick-faqs">
              <div className="faq-list__item">
                <dt>Is bagging cheaper than render?</dt>
                <dd>
                  It uses a thinner coat, but comparing bagged brick vs render
                  by rate alone tells you little. Preparation, access, repairs
                  and the coating over the top usually move the price more than
                  the finish itself.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Will bagging hide cracked brickwork?</dt>
                <dd>
                  No. It is too thin to bridge or disguise a crack, and active
                  movement will come back through any finish. Have the cause
                  assessed first.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Can a bagged wall be rendered later?</dt>
                <dd>
                  Often, if the bagging and any paint over it are sound and the
                  new system is documented for that surface. It depends on what
                  is there, so the existing coat needs checking first.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
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
                    AcraTex substrate guides
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
                <dt>Government of South Australia</dt>
                <dd>
                  <a href="https://cdn.environment.sa.gov.au/environment/docs/saltdamp_techguide.pdf">
                    Salt attack and rising damp (PDF)
                  </a>
                  ,{" "}
                  <a href="https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval">
                    PlanSA: find out if you need approval
                  </a>{" "}
                  and{" "}
                  <a href="https://www.environment.sa.gov.au/topics/heritage/owning-a-heritage-place/living-in-a-state-heritage-area">
                    living in a State Heritage Area
                  </a>
                </dd>
              </div>
              <div>
                <dt>SafeWork SA and SA Health</dt>
                <dd>
                  <a href="https://safework.sa.gov.au/industry/construction/silica">
                    Respirable crystalline silica
                  </a>{" "}
                  and{" "}
                  <a href="https://www.sahealth.sa.gov.au/wps/wcm/connect/9d1caad2-c402-4327-b213-3b8e0319cf96/Managing%2Blead-based%2Bpaint%2Bfact%2Bsheet-final%2Bendorsed_October%2B2023.pdf?MOD=AJPERES">
                    <cite>Managing lead-based paint</cite> (PDF)
                  </a>
                </dd>
              </div>
            </dl>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/render/">Adelaide rendering services</Link>
              <Link href="/projects/">Render project case studies</Link>
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
        defaultService="Render"
        intro="Tell us the property suburb, whether the brick is bare or painted, and what photos of the wall you have. If supporting files are needed, we’ll arrange how to review them."
      />
      <CtaBand />
    </>
  );
}
