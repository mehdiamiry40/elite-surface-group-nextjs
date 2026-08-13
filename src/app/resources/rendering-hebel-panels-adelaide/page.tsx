import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { renderingHebelGuide } from "@/content/resources";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: renderingHebelGuide.metaTitle,
  description: renderingHebelGuide.metaDescription,
  path: `/resources/${renderingHebelGuide.slug}`,
  image: ogCard(
    "rendering-hebel-panels-adelaide",
    "Can Hebel be rendered? Adelaide project guide",
  ),
  openGraphType: "article",
  publishedTime: renderingHebelGuide.published,
  modifiedTime: renderingHebelGuide.modified,
});

export default function RenderingHebelPanelsGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Rendering Hebel panels",
            href: `/resources/${renderingHebelGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={renderingHebelGuide} />

      <article>
        <PageBanner
          title={renderingHebelGuide.title}
          image={bannerImages[`/resources/${renderingHebelGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Rendering Hebel panels" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="hebel-render-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{renderingHebelGuide.category}</span>
              <time dateTime={renderingHebelGuide.published}>
                Published {renderingHebelGuide.publishedDisplay}
              </time>
              <span>{renderingHebelGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="hebel-render-summary">The short answer</h2>
            <p className="article-lead">
              Yes—selected Hebel wall systems can receive compatible render,
              texture or coating finishes. The safe specification depends on
              the exact Hebel product, application, wall details and exposure;
              “render over Hebel” is not one universal build-up.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>Treat the finish as part of the wall system.</strong>
              <p>
                This guide explains the information and responsibilities to
                coordinate before a new installation or finishing quote. It is
                not an application method, an engineering specification, a
                warranty promise or a remote assessment of an existing wall.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#identify-hebel-system">Identify the system</a>
                </li>
                <li>
                  <a href="#coordinate-wall">Coordinate the whole wall</a>
                </li>
                <li>
                  <a href="#coating-specification">Specify the finish</a>
                </li>
                <li>
                  <a href="#scope-responsibilities">Define responsibilities</a>
                </li>
                <li>
                  <a href="#compare-quotes">Compare quote scopes</a>
                </li>
                <li>
                  <a href="#handover-records">Keep handover records</a>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="identify-hebel-system"
        >
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={renderingHebelGuide.image}
                alt={renderingHebelGuide.imageAlt}
                width={renderingHebelGuide.imageWidth}
                height={renderingHebelGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
              />
              <figcaption>{renderingHebelGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Start with the documents</span>
              <h2 id="identify-hebel-system">
                Hebel is a product family, not one interchangeable panel
              </h2>
              <p>
                Hebel® is a registered trademark for autoclaved aerated concrete
                products supplied in Australia by CSR Building Products.
                Autoclaved aerated concrete is commonly shortened to AAC. CSR
                publishes different systems for external walls, internal
                walls, floors, fences and other applications, with
                product-specific design and installation information.
              </p>
              <p>
                Before discussing a finish, confirm the product name and the
                application shown in the current project documents. A detail
                written for one panel, block or wall application should not be
                transferred to another because the visible material looks
                similar.
              </p>
              <p>
                Useful evidence can include the architectural elevations,
                system schedule, engineer’s details, relevant Hebel design and
                installation guide, coating specification and any approved
                project-specific details.
              </p>
              <p className="article-source">
                Sources: {" "}
                <a href="https://hebel.com.au/products/panels/powerpanelxl/">
                  CSR Hebel PowerPanelXL product information
                </a>{" "}
                and {" "}
                <a href="https://hebel.com.au/resources/technical-documents/">
                  CSR Hebel technical documents
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="coordinate-wall">
          <div className="shell prose article-prose">
            <h2 id="coordinate-wall">
              Coordinate the wall before choosing its appearance
            </h2>
            <p>
              A finished Hebel wall is more than the visible texture. Framing,
              support components, panels, fixings, joints, openings, flashings,
              sealants and coatings have to work together under the documented
              design. A neat surface cannot compensate for unresolved details
              behind it.
            </p>
            <p>
              CSR’s current PowerPanelXL design and installation guide shows
              why the exact system matters: it addresses project design,
              building setout, wind design, framing, openings, control joints,
              flashings, sealants and coatings. The applicable requirements
              still come from the selected system guide and project drawings.
            </p>
            <TickList
              items={[
                "Exact Hebel product and wall application",
                "Current architectural, structural and system details",
                "Frame and substrate readiness before panel installation",
                "Openings, penetrations, corners and adjoining materials",
                "Documented movement or control-joint locations",
                "Flashings, sealants and water-management interfaces",
                "Specified coating system and required surface condition",
                "Access, sequencing and responsibility for each trade interface",
              ]}
            />
            <p>
              Do not assume a coating can hide or replace a required movement
              detail. If drawings, product documents or trade scopes conflict,
              resolve the conflict with the responsible designer, builder and
              suppliers before either panel installation or coating proceeds.
            </p>
            <p className="article-source">
              Source: {" "}
              <a href="https://hebel.com.au/wp-content/uploads/downloads/Houses-and-Low-Rise-Multi-Residential-External-Walls-PowerPanelXL-Design-and-Installation-Guide_HELIT016.pdf">
                CSR Hebel PowerPanelXL Design and Installation Guide (PDF)
              </a>
              .
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="coating-specification"
        >
          <div className="shell prose article-prose">
            <h2 id="coating-specification">
              What the coating specification should make clear
            </h2>
            <p>
              On site, “render” can be used loosely for several different
              layers or appearances. CSR’s coatings information refers to
              approved finishes and acrylic coating systems, and points to
              coating suppliers with their own system documents. The project
              specification should identify the complete finish rather than a
              generic bag of render.
            </p>
            <TickList
              items={[
                "The confirmed Hebel substrate and its permitted finish system",
                "Required preparation and acceptance criteria before coating",
                "Specified base, levelling, reinforcement, texture and topcoat layers where applicable",
                "How panel joints, control joints, corners and openings remain detailed",
                "Selected texture, colour and any documented colour limitations",
                "Application conditions, inspection points and curing requirements from the current product data",
                "Maintenance information and handover records for the chosen finish",
              ]}
            />
            <p>
              Dulux AcraTex is one example of a supplier that publishes
              substrate, application and care guides for multi-layer coating
              systems. Its documents apply only when that supplier and system
              have actually been selected. They are not generic instructions
              for every Hebel wall or every brand of coating.
            </p>
            <p className="article-source">
              Sources: {" "}
              <a href="https://hebel.com.au/coatings/">
                CSR Hebel coatings and finishes
              </a>{" "}
              and {" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex/systems-and-guides/">
                Dulux AcraTex systems and guides
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="scope-responsibilities">
          <div className="shell prose article-prose">
            <h2 id="scope-responsibilities">
              Define who owns each decision and interface
            </h2>
            <p>
              The same company may hold more than one role, but the written
              scope should still make each responsibility visible. A practical
              responsibility check can look like this:
            </p>
            <dl className="faq-list professional-list">
              <div className="faq-list__item">
                <dt>Designer and engineer</dt>
                <dd>
                  Specify the suitable wall system, performance requirements
                  and project details for the particular building. Product
                  literature does not replace project design.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Building certifier</dt>
                <dd>
                  Assess the evidence and approvals required for the project
                  within the certifier’s role. Certification does not replace
                  design by the responsible practitioners.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Builder or project manager</dt>
                <dd>
                  Issue current documents, coordinate frame and substrate
                  readiness, manage access and sequencing, and resolve clashes
                  between trades before they are concealed.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Hebel installer</dt>
                <dd>
                  Install the agreed panel or block scope to the selected
                  system documents and project details, while recording any
                  unresolved condition that prevents the work from following
                  the issued details.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Renderer or coating applicator</dt>
                <dd>
                  Confirm substrate acceptance, use the specified compatible
                  coating system and preserve the documented joints and
                  interfaces within the finishing scope.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Product and coating suppliers</dt>
                <dd>
                  Provide current technical data, compatibility information,
                  care guidance and any applicable warranty conditions for the
                  exact products selected.
                </dd>
              </div>
            </dl>
            <p>
              South Australian building requirements and transition
              arrangements can change. Confirm the current rules and approvals
              for the project with the responsible building professionals,
              using PlanSA’s current Building Code information as a starting
              point.
            </p>
            <p className="article-source">
              Source: {" "}
              <a href="https://www.plan.sa.gov.au/resources/building/building_code">
                PlanSA Building Code information
              </a>
              .
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="compare-quotes"
        >
          <div className="shell prose article-prose">
            <h2 id="compare-quotes">
              Compare the scope—not only the final price
            </h2>
            <p>
              Two quotations can appear to describe the same wall while
              assigning very different work to the builder, installer and
              renderer. Ask each quote to identify its assumptions and
              exclusions so the project team can compare like with like.
            </p>
            <TickList
              items={[
                "Panel or block product, application and documented system",
                "Who supplies panels, accessories, coatings and consumables",
                "Who confirms framing and substrate readiness",
                "Included openings, junctions, flashings, sealants and movement details",
                "Cutting, waste handling, scaffold or other access responsibilities",
                "Whether coating preparation and every specified finish layer are included",
                "Protection, inspection, rectification and handover responsibilities",
                "Known exclusions and information still needed before price or timing is final",
              ]}
            />
            <p>
              Our <Link href="/project-planning/">project-planning guide</Link>{" "}
              lists the plans, photos, programme and access information that
              can help turn an early enquiry into a clearer scope.
            </p>

            <aside className="article-note article-note--warning">
              <strong>Cutting AAC is a site-safety issue.</strong>
              <p>
                SafeWork SA identifies autoclaved aerated concrete as a
                crystalline-silica substance and regulates work that can create
                respirable dust through cutting, grinding, drilling or similar
                processing. Dust controls, training and work planning belong in
                the site safety system; this article is not a DIY cutting or
                sanding method.
              </p>
            </aside>
            <p className="article-source">
              Sources: {" "}
              <a href="https://safework.sa.gov.au/industry/construction/silica">
                SafeWork SA respirable crystalline silica guidance
              </a>{" "}
              and {" "}
              <a href="https://hebel.com.au/resources/safety/">
                CSR Hebel safety information
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="existing-hebel-wall">
          <div className="shell prose article-prose">
            <h2 id="existing-hebel-wall">
              Existing cracks or coating failure need a different starting point
            </h2>
            <p>
              A new-project specification cannot diagnose an existing wall.
              Cracking, open joints, moisture, movement, coating loss or
              corrosion may involve more than the visible finish. Record the
              pattern, history, weather exposure and surrounding building
              conditions before deciding whether the appropriate next step is
              product advice, a coating assessment, a building consultant or
              engineering input.
            </p>
            <p>
              Our <Link href="/resources/render-cracking-adelaide/">
                Adelaide render-cracking guide
              </Link>{" "}
              explains what to document and why the underlying cause should be
              understood before a cosmetic repair is proposed. Do not conceal
              a required joint or active defect beneath a new finish without an
              appropriate assessment.
            </p>

            <h2 id="warranty-boundaries">
              Product, coating and workmanship cover can be separate
            </h2>
            <p>
              CSR’s current low-rise residential warranty describes product
              cover for eligible Hebel panels subject to its stated system,
              installation, maintenance and other terms. Its warranty material
              also distinguishes third-party coating products. A coating
              supplier or applicator may have separate eligibility,
              registration and maintenance conditions.
            </p>
            <p>
              Ask for the actual documents that apply to the selected products
              and scope. Do not treat a headline warranty period as proof that
              the whole wall, coating or every trade’s work has identical
              cover.
            </p>
            <p className="article-source">
              Sources: {" "}
              <a href="https://hebel.com.au/resources/warranty/">
                CSR Hebel warranty information
              </a>{" "}
              and {" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex/overview/warranty/">
                Dulux AcraTex warranty information
              </a>
              .
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="handover-records"
        >
          <div className="shell prose article-prose">
            <h2 id="handover-records">Keep enough information for the next decision</h2>
            <p>
              A useful handover record lets the owner, builder and future trades
              identify what is on the wall without guessing from appearance.
              Retain:
            </p>
            <TickList
              items={[
                "Final drawings and the exact Hebel system or product schedule",
                "Approved project details and recorded departures or variations",
                "Coating specification, product data and colour references",
                "Installer, applicator and supplier contact details",
                "Applicable product, coating and workmanship warranty documents",
                "Inspection, maintenance and cleaning guidance current at handover",
                "Dated completion photographs of key elevations and visible joints",
              ]}
            />

            <h2 id="hebel-render-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="hebel-render-faqs">
              <div className="faq-list__item">
                <dt>Can every Hebel product receive the same render?</dt>
                <dd>
                  No universal specification should be assumed. Confirm the
                  exact Hebel product and application, then follow its current
                  system documents and the selected coating supplier’s
                  compatible specification.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Can render cover the panel joints?</dt>
                <dd>
                  Joint treatment depends on the selected system and project
                  details. Do not assume a finish can remove a documented
                  movement or control joint; resolve its location and finish
                  with the responsible project team before coating.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Who selects the coating system?</dt>
                <dd>
                  The decision may involve the designer, builder, Hebel and
                  coating suppliers, installer and applicator. The written
                  project documents should identify the selected compatible
                  system and who is responsible for each layer.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Are photos enough for a Hebel and render quote?</dt>
                <dd>
                  Photos help show access and current conditions, but new work
                  normally also needs plans, the selected wall system, finish
                  specification, scope boundaries and programme information.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Can Elite coordinate Hebel installation and rendering?</dt>
                <dd>
                  Tell us which system documents and drawings are available and
                  the proposed finish. We can arrange how to review supporting
                  files, confirm whether the installation and coating work sit
                  within our service scope and identify the information still
                  needed for a quote; project design and certification remain
                  with the responsible professionals.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>CSR Hebel</dt>
                <dd>
                  <a href="https://hebel.com.au/resources/technical-documents/">
                    Technical documents
                  </a>
                  , <a href="https://hebel.com.au/coatings/">coatings</a>, {" "}
                  <a href="https://hebel.com.au/resources/safety/">safety</a>{" "}
                  and {" "}
                  <a href="https://hebel.com.au/resources/warranty/">
                    warranty information
                  </a>
                </dd>
              </div>
              <div>
                <dt>Dulux AcraTex</dt>
                <dd>
                  <a href="https://www.dulux.com.au/specifier/products/acratex/systems-and-guides/">
                    Coating systems and guides
                  </a>{" "}
                  and {" "}
                  <a href="https://www.dulux.com.au/specifier/products/acratex/overview/warranty/">
                    warranty information
                  </a>
                </dd>
              </div>
              <div>
                <dt>Government of South Australia</dt>
                <dd>
                  <a href="https://www.plan.sa.gov.au/resources/building/building_code">
                    PlanSA Building Code information
                  </a>{" "}
                  and {" "}
                  <a href="https://safework.sa.gov.au/industry/construction/silica">
                    SafeWork SA silica guidance
                  </a>
                </dd>
              </div>
            </dl>
            <p className="article-source">
              Source pages reviewed 13 August 2026. Always check the current
              product, project and regulatory documents before work begins.
            </p>

            <nav className="article-related" aria-label="Related pages">
              <Link href="/hebel/">Hebel installation Adelaide</Link>
              <Link href="/render/">Rendering services Adelaide</Link>
              <Link href="/locations/adelaide/">Adelaide service area</Link>
              <Link href="/project-planning/">Plan a project enquiry</Link>
              <Link href="/resources/">More practical guides</Link>
              <Link href="/contact-us/#contact">Discuss your project</Link>
            </nav>
          </div>
        </section>
      </article>

      <ContactSection
        defaultService="Hebel"
        intro="Planning a new Hebel installation with a rendered or coated finish? Tell us the selected system, scope and what plans are available. If supporting files are needed, we’ll arrange how to review them."
      />
      <CtaBand />
    </>
  );
}
