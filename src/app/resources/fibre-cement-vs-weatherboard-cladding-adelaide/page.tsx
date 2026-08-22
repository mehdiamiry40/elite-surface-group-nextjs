import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { claddingMaterialComparisonGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: claddingMaterialComparisonGuide.metaTitle,
  description: claddingMaterialComparisonGuide.metaDescription,
  path: `/resources/${claddingMaterialComparisonGuide.slug}`,
  image: ogCard("cladding", "Cladding installation services in Adelaide"),
  openGraphType: "article",
  publishedTime: claddingMaterialComparisonGuide.published,
  modifiedTime: claddingMaterialComparisonGuide.modified,
});

export default function CladdingMaterialComparisonGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Fibre cement vs weatherboard cladding",
            href: `/resources/${claddingMaterialComparisonGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={claddingMaterialComparisonGuide} />

      <article>
        <PageBanner
          title={claddingMaterialComparisonGuide.title}
          image={
            bannerImages[`/resources/${claddingMaterialComparisonGuide.slug}`]
          }
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Fibre cement vs weatherboard cladding" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="cladding-comparison-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{claddingMaterialComparisonGuide.category}</span>
              <time dateTime={claddingMaterialComparisonGuide.published}>
                Published {claddingMaterialComparisonGuide.publishedDisplay}
              </time>
              <span>{claddingMaterialComparisonGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="cladding-comparison-summary">The short answer</h2>
            <p className="article-lead">
              Fibre cement vs weatherboard cladding is not a single right
              answer for every Adelaide home. Both are established,
              standards-based exterior cladding options, and the better fit
              depends on whether the site sits in a bushfire-prone area, how
              close it is to the coast, and how much repainting the owner is
              prepared to plan for. The documented product—not a general
              preference—should decide the system.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>Selection and compliance sit outside installation.</strong>
              <p>
                Elite Surface Group installs the cladding system specified for
                a project. Confirming a Bushfire Attack Level (BAL) rating,
                combustibility requirements or planning consent is a
                bushfire consultant, designer or building surveyor&rsquo;s
                role. Arrange that assessment before relying on this guide to
                choose a product.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#what-differs">What actually differs</a>
                </li>
                <li>
                  <a href="#bushfire">Bushfire-prone zoning</a>
                </li>
                <li>
                  <a href="#coastal">Coastal salt exposure</a>
                </li>
                <li>
                  <a href="#maintenance">Maintenance and repainting</a>
                </li>
                <li>
                  <a href="#confirm-first">What to confirm first</a>
                </li>
                <li>
                  <a href="#cladding-comparison-faqs">Common questions</a>
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
                src={claddingMaterialComparisonGuide.image}
                alt={claddingMaterialComparisonGuide.imageAlt}
                width={claddingMaterialComparisonGuide.imageWidth}
                height={claddingMaterialComparisonGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(claddingMaterialComparisonGuide.image)}
              />
              <figcaption>
                {claddingMaterialComparisonGuide.imageCaption}
              </figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Two established systems</span>
              <h2 id="what-differs">
                Fibre cement vs weatherboard cladding: what actually differs
              </h2>
              <p>
                Fibre cement weatherboard is a manufactured cement-and-fibre
                sheet profile, cut and finished at the factory to a
                consistent thickness and board width. Manufacturer literature
                describes it as resistant to shrinking, swelling and warping
                compared with solid timber, and current profiles are
                CodeMark-certified against the National Construction Code.
              </p>
              <p>
                Timber weatherboard covers a wider range: traditional solid
                timber boards, and engineered timber products made from
                compressed hardwood fibre and wax. Engineered boards are
                marketed on dimensional stability and a long rot warranty,
                but—like solid timber—they still rely on a sound paint or
                coating film for weather protection in a way fibre cement
                does not.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://www.jameshardie.com.au/products/scyon-linea-weatherboard">
                  James Hardie, Linea Weatherboard product information
                </a>{" "}
                and{" "}
                <a href="https://weathertex.com.au/faqs/">
                  Weathertex, product FAQs
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="bushfire">
          <div className="shell prose article-prose">
            <h2 id="bushfire">
              Bushfire-prone zoning changes what the cladding must be
            </h2>
            <p>
              Parts of metropolitan Adelaide sit inside a designated
              bushfire-prone area, most visibly through the Hills Face Zone
              and the wider Adelaide Hills, but also across some outer
              suburban fringes. A property inside that overlay may need a
              site-specific Bushfire Attack Level (BAL) assessment under AS
              3959 before the cladding, and the rest of the external wall
              system, can be finalised against the NCC&rsquo;s construction
              requirements for that rating.
            </p>
            <p>
              Fibre cement is documented by manufacturers as meeting the
              non-combustibility and fire-performance requirements for a wide
              range of BAL ratings, with specific board, jointing and fixing
              details tested up to the higher ratings. Timber weatherboard
              options are more limited at the highest ratings—only a
              bushfire-resisting species or a manufacturer-tested and
              certified system may be acceptable, and requirements tighten
              considerably as the rating increases toward BAL-FZ.
            </p>
            <aside className="article-note article-note--warning">
              <strong>Arrange a BAL assessment, don&rsquo;t assume one.</strong>
              <p>
                If a site sits within a bushfire overlay, ask the project
                designer or a bushfire consultant to confirm the assessed BAL
                rating before a cladding product is chosen. This guide does
                not determine a rating or certify compliance.
              </p>
            </aside>
            <p className="article-source">
              Sources:{" "}
              <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/bushfire">
                SA.GOV.AU, Bushfire building regulations
              </a>
              ,{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-one/g-ancillary-provisions/part-g5-construction-bushfire-prone-areas">
                ABCB, NCC Part G5 Construction in bushfire-prone areas
              </a>{" "}
              and{" "}
              <a href="https://www.jameshardie.com.au/ContentfulCMS/Technical-Library/Bushfire_Prone_Area_Technical_supplement.pdf">
                James Hardie, Construction of Buildings in Bushfire Prone
                Areas
              </a>{" "}
              (PDF).
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="coastal">
          <div className="shell prose article-prose">
            <h2 id="coastal">Coastal salt exposure near Adelaide&rsquo;s beaches</h2>
            <p>
              Suburbs such as Semaphore, Grange, Henley Beach, Glenelg and
              Brighton sit close enough to the coast that airborne salt can
              affect fixings, coatings and paint film faster than an inland
              suburb of the same age. Manufacturer guidance for both fibre
              cement and engineered timber weatherboard generally recommends
              closer inspection, more frequent washing and coastal-rated
              fixings within a defined distance of the coastline—the exact
              distance and product-specific conditions vary, so the current
              warranty and installation literature for the selected product
              should be checked rather than assumed.
            </p>
            <TickList
              items={[
                "The property's approximate distance from active surf or salt-laden air",
                "Whether the chosen product's warranty sets closer coastal conditions",
                "Fixings, flashings and trims rated for the same exposure as the cladding",
                "A realistic washing and inspection routine for the finish and colour selected",
              ]}
            />
            <p className="article-source">
              Source:{" "}
              <a href="https://weathertex.com.au/blog_post/what-weatherboards-are-best-for-coastal-areas/">
                Weathertex, What weatherboards are best for coastal areas
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="maintenance">
          <div className="shell prose article-prose">
            <h2 id="maintenance">Maintenance and repainting expectations</h2>
            <p>
              Adelaide&rsquo;s hot, dry summers and strong UV exposure age a
              painted exterior faster than a milder climate does, whichever
              cladding sits underneath the paint film. Fibre cement and
              engineered timber weatherboard both need a maintained coating
              system—regular washing, prompt attention to chips or scratches
              at joints and corners, and repainting on the cycle the coating
              manufacturer documents for the finish and exposure selected.
            </p>
            <p>
              Solid timber weatherboard adds movement and moisture
              considerations that fibre cement does not usually share to the
              same degree: timber can swell, shrink and check with seasonal
              moisture change, so joints, end grain and any exposed fixings
              need particular attention during routine checks. None of this
              is a reason to avoid timber outright—it is a reason to confirm
              the specific coating system and maintenance schedule documented
              for the product before installation, not after a problem
              appears.
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="confirm-first"
        >
          <div className="shell prose article-prose">
            <h2 id="confirm-first">
              What to confirm before the cladding is locked in
            </h2>
            <p>
              A useful fibre cement vs weatherboard decision rests on
              project-specific documents, not a general comparison. Before
              committing, confirm the following with the designer, supplier
              or building surveyor.
            </p>
            <ol className="steps">
              <li>
                <h3>Confirm the bushfire overlay status</h3>
                <p>
                  Check whether the site sits within a designated
                  bushfire-prone area, and if so, obtain the assessed BAL
                  rating before a cladding product is finalised.
                </p>
              </li>
              <li>
                <h3>Match the product to the coastal distance</h3>
                <p>
                  Confirm the manufacturer&rsquo;s coastal conditions and
                  recommended fixings against the property&rsquo;s actual
                  distance from the coast, not the suburb name alone.
                </p>
              </li>
              <li>
                <h3>Read the current warranty and coating requirements</h3>
                <p>
                  Warranty terms, priming requirements and repaint intervals
                  are set by the specific product and finish selected, and
                  they change between manufacturers and profiles.
                </p>
              </li>
              <li>
                <h3>Check whether council or PlanSA approval applies</h3>
                <p>
                  Changing external cladding on an existing building can
                  require development approval depending on the work and the
                  property; confirm this on the PlanSA portal or with the
                  local council before ordering material.
                </p>
              </li>
              <li>
                <h3>Confirm the complete wall build-up</h3>
                <p>
                  Thermal, acoustic and weatherproofing performance depend on
                  the whole wall assembly—frame, sarking, battens and
                  cladding together—so confirm the documented build-up rather
                  than the cladding product alone.
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

        <section
          className="section"
          aria-labelledby="cladding-comparison-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="cladding-comparison-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="cladding-comparison-faqs">
              <div className="faq-list__item">
                <dt>Is fibre cement always the safer bushfire choice?</dt>
                <dd>
                  It is documented as compliant across a wider range of BAL
                  ratings than most timber weatherboard, but the assessed BAL
                  rating for the actual site still needs to be confirmed
                  before any product is chosen or assumed suitable.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>
                  Does engineered timber weatherboard need less maintenance
                  than solid timber?
                </dt>
                <dd>
                  Manufacturers generally market engineered boards on
                  improved dimensional stability, but both still rely on a
                  maintained coating system. Confirm the specific product
                  data rather than assuming either timber option is
                  maintenance-free.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>
                  Can Elite Surface Group choose the cladding product for us?
                </dt>
                <dd>
                  No. Product selection depends on bushfire zoning, coastal
                  exposure, budget and design intent, which sit with the
                  project&rsquo;s designer or the homeowner. We install the
                  documented system and can discuss coordination once that
                  selection is confirmed.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>SA.GOV.AU</dt>
                <dd>
                  <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/bushfire">
                    Bushfire building regulations
                  </a>
                </dd>
              </div>
              <div>
                <dt>Australian Building Codes Board</dt>
                <dd>
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
                  (PDF) and{" "}
                  <a href="https://www.jameshardie.com.au/products/scyon-linea-weatherboard">
                    Linea Weatherboard product information
                  </a>
                </dd>
              </div>
              <div>
                <dt>Weathertex</dt>
                <dd>
                  <a href="https://weathertex.com.au/blog_post/what-weatherboards-are-best-for-coastal-areas/">
                    What weatherboards are best for coastal areas
                  </a>{" "}
                  and <a href="https://weathertex.com.au/faqs/">Product FAQs</a>
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
        intro="Have a cladding product and drawings in mind? Tell us the project type, suburb and what documents are available. We can arrange how to review supporting files and confirm the installation scope."
      />
      <CtaBand />
    </>
  );
}
