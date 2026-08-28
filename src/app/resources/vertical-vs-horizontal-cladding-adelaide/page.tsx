import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { claddingOrientationGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: claddingOrientationGuide.metaTitle,
  description: claddingOrientationGuide.metaDescription,
  path: `/resources/${claddingOrientationGuide.slug}`,
  image: ogCard("cladding", "Cladding installation services in Adelaide"),
  openGraphType: "article",
  publishedTime: claddingOrientationGuide.published,
  modifiedTime: claddingOrientationGuide.modified,
});

export default function CladdingOrientationGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Vertical vs horizontal cladding",
            href: `/resources/${claddingOrientationGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={claddingOrientationGuide} />

      <article>
        <PageBanner
          title={claddingOrientationGuide.title}
          image={bannerImages[`/resources/${claddingOrientationGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Vertical vs horizontal cladding" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="cladding-orientation-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{claddingOrientationGuide.category}</span>
              <time dateTime={claddingOrientationGuide.published}>
                Published {claddingOrientationGuide.publishedDisplay}
              </time>
              <span>{claddingOrientationGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="cladding-orientation-summary">The short answer</h2>
            <p className="article-lead">
              Vertical vs horizontal cladding is not just a look. The two
              orientations rely on different batten layouts and
              drainage-cavity details behind the boards, and pairing the
              wrong batten direction with the wrong orientation is one of the
              more avoidable ways moisture ends up trapped against the frame.
              Aesthetic preference matters, but the batten direction, cavity
              design and coastal exposure of the site should decide which
              orientation goes on an Adelaide wall—not the other way around.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>
                Cavity and weatherproofing design sit outside installation.
              </strong>
              <p>
                Elite Surface Group installs the cladding and cavity system
                specified for a project. Confirming the wall&rsquo;s
                weatherproofing performance under the National Construction
                Code, the cavity depth and batten spacing for the site&rsquo;s
                assessed wind classification, or any bushfire-related
                detailing is a building designer, engineer or building
                surveyor&rsquo;s role. Arrange that assessment before a batten
                layout or cavity depth is finalised.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#what-differs">What actually differs</a>
                </li>
                <li>
                  <a href="#batten-direction">
                    Batten direction and the drainage cavity
                  </a>
                </li>
                <li>
                  <a href="#coastal">Coastal salt exposure</a>
                </li>
                <li>
                  <a href="#clay-soils">Clay soils and joint lines</a>
                </li>
                <li>
                  <a href="#confirm-first">What to confirm first</a>
                </li>
                <li>
                  <a href="#cladding-orientation-faqs">Common questions</a>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="what-differs"
        >
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={claddingOrientationGuide.image}
                alt={claddingOrientationGuide.imageAlt}
                width={claddingOrientationGuide.imageWidth}
                height={claddingOrientationGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(claddingOrientationGuide.image)}
              />
              <figcaption>{claddingOrientationGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Two drainage layouts</span>
              <h2 id="what-differs">
                Vertical vs horizontal cladding: what actually differs
              </h2>
              <p>
                Horizontal cladding—weatherboard profiles such as James
                Hardie&rsquo;s Linea range, timber boards, or lapped fibre
                cement sheets—sheds water down the face of each board and
                over the top of the one below it, in the same direction the
                boards run. The drained cavity behind it is formed with
                battens fixed vertically to the studs, letting water and air
                move straight down the cavity and out at the base of the
                wall.
              </p>
              <p>
                Vertical cladding, such as James Hardie&rsquo;s Scyon Axon
                panel system, runs the opposite way. Because the boards
                themselves don&rsquo;t lap water downward the way weatherboard
                does, the cavity behind them needs battens fixed
                horizontally—and those battens have to be notched or
                castellated so moisture inside the cavity can still travel
                down and out, rather than pooling on top of a solid
                horizontal batten. James Hardie and the Forest &amp; Wood
                Products Australia (FWPA) cladding standard both document
                this: a horizontal cavity batten sitting behind vertical
                boards needs a shaped profile specifically so trapped
                moisture and air keep moving.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://www.jameshardie.com.au/ContentfulCMS/Installation-Guide/Axon_Cladding_Installation_Guide.pdf">
                  James Hardie, Axon Cladding Installation Guide
                </a>{" "}
                (PDF) and{" "}
                <a href="https://fwpa.com.au/wp-content/uploads/2024/11/Industry-Standard-Design-and-Installation-of-Exterior-Timber-Wall-Cladding-Version-7.0-Nov-2024.pdf">
                  FWPA, Design and Installation of Exterior Timber Wall
                  Cladding
                </a>{" "}
                (PDF).
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="batten-direction">
          <div className="shell prose article-prose">
            <h2 id="batten-direction">
              Batten direction and the drainage cavity
            </h2>
            <p>
              This is the detail that actually separates vertical vs
              horizontal cladding on a real Adelaide job, more than the
              visual style does. Get the batten direction wrong—for
              example, horizontal battens fixed behind horizontal
              weatherboard, instead of vertical ones—and the cavity
              can&rsquo;t drain the way it&rsquo;s meant to, which is exactly
              the moisture-trapping problem a ventilated cavity exists to
              prevent.
            </p>
            <p>
              Cemintel&rsquo;s cavity wall cladding documentation for fibre
              cement sheet systems sets out the same principle from the
              manufacturer side: cavity battens, sized and fixed to a
              documented minimum face width, create the ventilation and
              drainage path behind the sheet, spaced to match the fixing
              pattern for the product and the site&rsquo;s wind
              classification. The exact batten spacing, size and fixing
              schedule sit in the installation guide for the specific system
              chosen, not in a general rule of thumb that applies to every
              product.
            </p>
            <TickList
              items={[
                "The orientation and profile shown on the approved drawings",
                "Whether the cavity battens are the correct profile for that orientation—vertical for horizontal boards, notched horizontal for vertical boards",
                "The batten spacing and fixing schedule set against the site's assessed wind classification",
                "How the cavity drains and vents at the base of the wall and around openings",
              ]}
            />
            <p className="article-source">
              Source:{" "}
              <a href="https://www.cemintel.com.au/wp-content/uploads/2023/08/cemintel-cavity-wall-cladding-systems-fc152-web-1.pdf">
                Cemintel, Cavity Wall Cladding Systems (FC:152)
              </a>{" "}
              (PDF).
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="coastal">
          <div className="shell prose article-prose">
            <h2 id="coastal">Coastal salt exposure near Adelaide&rsquo;s beaches</h2>
            <p>
              Suburbs close to the coast—Semaphore, Grange, Henley Beach,
              Glenelg and Brighton among them—put fixings and cavity
              components under more corrosive load than an inland Adelaide
              suburb of the same age, regardless of which way the boards run.
              Manufacturer installation literature for both vertical panel
              systems and horizontal weatherboard sets a minimum
              corrosion-resistance class for fasteners generally, stepping up
              within a defined distance of the coast or in other corrosive
              environments.
            </p>
            <p>
              A vertical system can be marginally more exposed at the top of
              each cavity batten run, where moisture inside the cavity has
              further horizontal travel before it reaches a drainage
              point—one more reason the batten&rsquo;s exact profile and
              spacing, not just its material, needs to match the documented
              system for the property&rsquo;s actual distance from the coast.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://www.jameshardie.com.au/ContentfulCMS/Installation-Guide/Axon_Cladding_Installation_Guide.pdf">
                James Hardie, Axon Cladding Installation Guide
              </a>{" "}
              (PDF).
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="clay-soils">
          <div className="shell prose article-prose">
            <h2 id="clay-soils">Reactive clay soils, movement and joint lines</h2>
            <p>
              Much of the Adelaide plains sit on reactive clay that swells
              and shrinks with soil moisture across the seasons, and that
              ground movement eventually shows up at the wall. Horizontal
              cladding tends to hide a small amount of frame movement
              reasonably well along a continuous run of boards. Vertical
              cladding shows movement differently, concentrated at the sheet
              joints and control joints running up the wall, where
              consistent spacing and flashing detail matter more visibly.
            </p>
            <p>
              Neither orientation avoids the need for documented control and
              movement joints. The frame, the footing system and the
              cladding manufacturer&rsquo;s joint spacing all need to agree,
              and that is a design decision to confirm on the drawings before
              installation begins, not one to adjust on site.
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="confirm-first"
        >
          <div className="shell prose article-prose">
            <h2 id="confirm-first">
              What to confirm before you choose a direction
            </h2>
            <p>
              A useful vertical vs horizontal cladding decision rests on
              project-specific documents, not a general comparison. Before
              committing, confirm the following with the designer, supplier
              or building surveyor.
            </p>
            <ol className="steps">
              <li>
                <h3>Confirm the wind classification for the site</h3>
                <p>
                  Batten spacing and fixing schedules for both vertical and
                  horizontal cladding are set against the site&rsquo;s
                  assessed wind classification, not a standard default.
                </p>
              </li>
              <li>
                <h3>Match the cavity batten profile to the orientation</h3>
                <p>
                  Horizontal cladding needs vertical battens; vertical
                  cladding needs a horizontal, notched or castellated batten
                  so the cavity still drains.
                </p>
              </li>
              <li>
                <h3>Confirm the coastal fastener class</h3>
                <p>
                  Check the manufacturer&rsquo;s coastal distance and
                  corrosion-class requirements against the property&rsquo;s
                  actual distance from the coast.
                </p>
              </li>
              <li>
                <h3>Check whether council or PlanSA approval applies</h3>
                <p>
                  Changing the visible exterior cladding on an existing
                  building, including switching its orientation, can require
                  development approval depending on the property and the
                  work; confirm this on the PlanSA portal or with the local
                  council before ordering material.
                </p>
              </li>
              <li>
                <h3>Confirm the complete wall build-up</h3>
                <p>
                  Sarking, cavity depth, battens and cladding all need to be
                  documented together, because a good product on the wrong
                  batten layout still fails to drain properly.
                </p>
              </li>
            </ol>
            <p>
              Our <Link href="/project-planning/">project-planning guide</Link>{" "}
              covers the wider information that helps turn an early cladding
              question into a clear installation scope.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://plan.sa.gov.au/development_applications/getting_approval">
                PlanSA, Getting approval
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="cladding-orientation-faqs">
          <div className="shell prose article-prose">
            <h2 id="cladding-orientation-faqs">Common questions</h2>
            <dl
              className="faq-list"
              aria-labelledby="cladding-orientation-faqs"
            >
              <div className="faq-list__item">
                <dt>Is vertical cladding more expensive than horizontal?</dt>
                <dd>
                  Material and labour costs depend on the specific product,
                  panel size and site access, not the orientation alone. Ask
                  for a quote against the documented system rather than
                  assuming one direction costs more.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>
                  Can vertical and horizontal cladding be combined on the
                  same house?
                </dt>
                <dd>
                  Yes—many Adelaide fa&ccedil;ades mix orientations as a
                  design feature, provided each section&rsquo;s cavity,
                  battens and flashing are detailed for the orientation used
                  in that section. The junction between the two needs its
                  own documented flashing detail.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Can Elite Surface Group choose the orientation for us?</dt>
                <dd>
                  No. Orientation is a design decision made with the
                  architect, designer or drafter, usually shown on the
                  elevations. We install the documented cladding and cavity
                  system once that decision, and the supporting drawings,
                  are confirmed.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>James Hardie</dt>
                <dd>
                  <a href="https://www.jameshardie.com.au/ContentfulCMS/Installation-Guide/Axon_Cladding_Installation_Guide.pdf">
                    Axon Cladding Installation Guide
                  </a>{" "}
                  (PDF) and{" "}
                  <a href="https://www.jameshardie.com.au/products/scyon-linea-weatherboard">
                    Linea Weatherboard product information
                  </a>
                </dd>
              </div>
              <div>
                <dt>Forest &amp; Wood Products Australia</dt>
                <dd>
                  <a href="https://fwpa.com.au/wp-content/uploads/2024/11/Industry-Standard-Design-and-Installation-of-Exterior-Timber-Wall-Cladding-Version-7.0-Nov-2024.pdf">
                    Design and Installation of Exterior Timber Wall Cladding
                  </a>{" "}
                  (PDF)
                </dd>
              </div>
              <div>
                <dt>Cemintel (CSR)</dt>
                <dd>
                  <a href="https://www.cemintel.com.au/wp-content/uploads/2023/08/cemintel-cavity-wall-cladding-systems-fc152-web-1.pdf">
                    Cavity Wall Cladding Systems (FC:152)
                  </a>{" "}
                  (PDF)
                </dd>
              </div>
              <div>
                <dt>PlanSA</dt>
                <dd>
                  <a href="https://plan.sa.gov.au/development_applications/getting_approval">
                    Getting approval
                  </a>
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
        intro="Have cladding drawings that specify an orientation, or still weighing up vertical against horizontal? Tell us the project type, suburb and what documents are available, and we can confirm how the installation scope fits together."
      />
      <CtaBand />
    </>
  );
}
