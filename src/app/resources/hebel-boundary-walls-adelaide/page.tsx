import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { hebelBoundaryWallsGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: hebelBoundaryWallsGuide.metaTitle,
  description: hebelBoundaryWallsGuide.metaDescription,
  path: `/resources/${hebelBoundaryWallsGuide.slug}`,
  image: ogCard(
    "hebel-boundary-walls-adelaide",
    "AI-generated planning artwork for an Adelaide Hebel boundary-wall guide",
  ),
  openGraphType: "article",
  publishedTime: hebelBoundaryWallsGuide.published,
  modifiedTime: hebelBoundaryWallsGuide.modified,
});

export default function HebelBoundaryWallsGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Hebel boundary walls",
            href: `/resources/${hebelBoundaryWallsGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={hebelBoundaryWallsGuide} />

      <article>
        <PageBanner
          title={hebelBoundaryWallsGuide.title}
          image={bannerImages[`/resources/${hebelBoundaryWallsGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Hebel boundary walls" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="boundary-wall-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{hebelBoundaryWallsGuide.category}</span>
              <time dateTime={hebelBoundaryWallsGuide.published}>
                Published {hebelBoundaryWallsGuide.publishedDisplay}
              </time>
              <span>{hebelBoundaryWallsGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="boundary-wall-summary">The short answer</h2>
            <p className="article-lead">
              A plan note saying “Hebel boundary wall” is not enough to select,
              price or install a wall system. The approved project documents
              need to identify the exact wall configuration, current technical
              evidence, interfaces and performance requirements. Access,
              sequencing and responsibility for adjoining work also need to be
              clear before an installation quote can be reliable.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>General planning information only.</strong>
              <p>
                This guide does not select a wall system, locate a legal
                boundary, determine a setback or fire requirement, or replace
                engineering, building-consent, planning or legal advice.
                Requirements depend on the property, building classification,
                wall configuration and current South Australian rules. The
                approved drawings and current system documents always prevail.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#terms">Separate the wall terms</a>
                </li>
                <li>
                  <a href="#approval-path">Confirm the approval pathway</a>
                </li>
                <li>
                  <a href="#system-documents">Identify the exact system</a>
                </li>
                <li>
                  <a href="#quote-documents">Prepare the quote documents</a>
                </li>
                <li>
                  <a href="#access-sequencing">Plan access and sequencing</a>
                </li>
                <li>
                  <a href="#responsibilities">Assign responsibilities</a>
                </li>
                <li>
                  <a href="#boundary-wall-faqs">Common questions</a>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="terms">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={hebelBoundaryWallsGuide.image}
                alt={hebelBoundaryWallsGuide.imageAlt}
                width={hebelBoundaryWallsGuide.imageWidth}
                height={hebelBoundaryWallsGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(hebelBoundaryWallsGuide.image)}
              />
              <figcaption>{hebelBoundaryWallsGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Terminology first</span>
              <h2 id="terms">
                “Boundary wall” can describe different construction
              </h2>
              <p>
                Start by identifying what the drawings actually show. Similar
                phrases can refer to different relationships between the wall,
                allotment boundary and neighbouring building. They should not
                be treated as interchangeable search terms on a quote.
              </p>
              <dl className="source-list professional-list">
                <div>
                  <dt>External wall on or near an allotment boundary</dt>
                  <dd>
                    This remains an external wall of one building. Its position
                    can affect fire-separation, openings, weatherproofing and
                    access requirements, but proximity alone does not name the
                    product or approved solution.
                  </dd>
                </div>
                <div>
                  <dt>Zero-boundary or dual zero-boundary system</dt>
                  <dd>
                    These are documented system configurations used by CSR
                    Hebel for particular detached-building arrangements. The
                    product, framing, fixing direction and evidence still need
                    to match the project documents.
                  </dd>
                </div>
                <div>
                  <dt>Intertenancy, party or separating wall</dt>
                  <dd>
                    CSR uses intertenancy or party-wall terminology. The NCC
                    calls a wall common to adjoining Class 1 buildings a
                    separating wall. That is not the same relationship as two
                    detached walls near an allotment boundary.
                  </dd>
                </div>
                <div>
                  <dt>Fence or retaining wall</dt>
                  <dd>
                    A PowerFence® installation, freestanding fence and
                    retaining structure are separate applications. This guide
                    concerns building walls, not fencing or earth retention.
                  </dd>
                </div>
              </dl>
              <p className="article-source">
                Sources: {" "}
                <a href="https://hebel.com.au/residential/boundary-walls/">
                  CSR Hebel boundary-wall systems
                </a>
                , {" "}
                <a href="https://hebel.com.au/residential/party-walls/">
                  CSR Hebel party-wall systems
                </a>{" "}
                and {" "}
                <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-two/1-definitions/glossary">
                  NCC glossary
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="approval-path">
          <div className="shell prose article-prose">
            <h2 id="approval-path">
              Confirm the Adelaide approval and design pathway first
            </h2>
            <p>
              Boundary proximity can trigger fire-separation requirements, but
              the applicable solution depends on the building classification,
              wall location, openings, project design and current South
              Australian Building Rules. An installer should not infer those
              requirements from a fence line, marketing brochure or generic
              wall label.
            </p>
            <p>
              PlanSA explains that development approval can require one or more
              consents depending on the proposal and location, including
              planning, building and land-division consent. Building consent
              assesses proposed work against the building rules. Confirm the
              address-specific pathway and obtain the required approval before
              construction; planning consent by itself is not full development
              approval and does not by itself authorise construction.
            </p>
            <p>
              If the legal allotment boundary is uncertain, the owner or
              builder should engage a licensed surveyor. A visible fence,
              informal site measurement or title sketch should not be used as a
              substitute for boundary confirmation. Any need to access
              adjoining land, deal with an affected site or invoke South
              Australia’s statutory party-wall provisions also needs separate
              advice and lawful arrangements—it is not resolved by choosing an
              AAC panel.
            </p>
            <aside className="article-note">
              <strong>Current South Australian code timing</strong>
              <p>
                As checked on 31 August 2026, PlanSA states that NCC 2022
                Amendment 2 remains South Australia’s Building Code until 30
                April 2027, with the Building Code within NCC 2025 scheduled
                for adoption on 1 May 2027. Transitional and project-specific
                provisions still need to be confirmed for each application.
              </p>
            </aside>
            <p className="article-source">
              Sources: {" "}
              <a href="https://plan.sa.gov.au/development_applications/getting_approval/how_applications_are_assessed/types_of_consent">
                PlanSA types of consent
              </a>
              , {" "}
              <a href="https://www.dhud.sa.gov.au/our-department/office-of-the-surveyor-general/surveying/cadastral-surveying">
                Office of the Surveyor-General cadastral surveying guidance
              </a>
              , {" "}
              <a href="https://www.legislation.sa.gov.au/__legislation/lz/c/a/planning%20development%20and%20infrastructure%20act%202016/current/2016.14.auth.pdf">
                Planning, Development and Infrastructure Act 2016 (PDF)
              </a>
              , {" "}
              <a href="https://plan.sa.gov.au/resources/building/building_code">
                PlanSA Building Code information
              </a>
              , {" "}
              <a href="https://plan.sa.gov.au/resources/building/building_code/2025-updates/state-updates">
                PlanSA NCC 2025 state update
              </a>{" "}
              and {" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/8-south-australia/92-fire-separation-external-walls">
                NCC 2022 South Australia fire separation of external walls
              </a>
              .
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="system-documents"
        >
          <div className="shell prose article-prose">
            <h2 id="system-documents">
              Identify the exact Hebel system and current evidence
            </h2>
            <p>
              Hebel® autoclaved aerated concrete (AAC) is a product family, not
              one interchangeable wall. CSR currently publishes separately
              documented external, zero-boundary, dual zero-boundary and
              intertenancy/party-wall systems. The approved project drawings
              and current technical evidence must identify which product,
              system and configuration apply.
            </p>
            <p>
              For example, CSR publishes separate PowerPanelXL external-wall
              guidance and PowerPanel50 guidance for intertenancy and dual
              zero-boundary systems. That is not a universal product-selection
              rule. It demonstrates why a generic table cannot replace the
              applicable design-and-installation guide, evidence of suitability
              and approved project detail.
            </p>
            <p>
              Some CSR system documents provide installation methods where
              outside access is limited or unavailable. That does not make
              every Hebel product suitable for every boundary condition. Check
              the applicable version through CSR’s technical-document library,
              the exact system identifier on the drawings and all limitations
              in any CodeMark certificate or project-specific evidence.
            </p>
            <TickList
              items={[
                "Exact manufacturer, product and documented wall-system name",
                "Applicable design-and-installation guide and detail reference",
                "Project drawings that match the proposed configuration",
                "Evidence of suitability and every stated limitation or condition",
                "Structural, fire, weatherproofing and condensation inputs assigned to the responsible designers",
                "Approved treatment of openings, penetrations, joints and adjoining construction",
              ]}
            />
            <p>
              A certificate may address only identified criteria for a defined
              configuration. It is not evidence that every variation, omitted
              component or complete building solution is automatically
              compliant. Deviations and project-specific requirements need to
              go back to the responsible designer, engineer, manufacturer and
              appropriately accredited building professional.
            </p>
            <p className="article-source">
              Sources: {" "}
              <a href="https://hebel.com.au/resources/technical-documents/">
                CSR Hebel technical documents
              </a>
              , {" "}
              <a href="https://hebel.com.au/wp-content/uploads/2025/12/Hebel-Houses-and-Low-Rise-Multi-Residential-External-Walls-PowerPanelXL-Design-and-Installation-Guide_HELIT016_MAY24-1.pdf">
                PowerPanelXL External Walls Design and Installation Guide,
                HELIT016AUG26 (PDF)
              </a>
              , {" "}
              <a href="https://hebel.com.au/wp-content/uploads/downloads/Low-Rise-Multi-Residential-PowerPanel-Intertenancy-and-Dual-Zero-Boundary-Walls-Design-and-Installation-Guide_HELIT152.pdf">
                PowerPanel50 Intertenancy and Dual Zero Boundary Walls Design
                and Installation Guide (PDF)
              </a>{" "}
              and {" "}
              <a href="https://hebel.com.au/wp-content/uploads/downloads/CM40165-I03-R00_PowerPanel50mm-Dual-Zero-Residential.pdf">
                PowerPanel50 Dual Zero Boundary CodeMark certificate (PDF)
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="quote-documents">
          <div className="shell prose article-prose">
            <h2 id="quote-documents">
              Documents that support a useful installation quote
            </h2>
            <p>
              A quote should be based on the same approved information the site
              team will use. Tell the installer which documents are available
              and whether they are approved, issued for construction or still
              being coordinated. If supporting files are needed, Elite Surface
              Group can arrange how to review them; the website form does not
              accept file uploads.
            </p>
            <TickList
              items={[
                "Approved site plan, floor plans, elevations and relevant sections",
                "Wall schedule naming the exact product and system configuration",
                "Structural framing, support and engineer’s details that affect the wall",
                "Applicable building-consent documents and performance requirements",
                "Openings, penetrations, services and fire- or weather-separation details",
                "Roof, eaves, parapet, flashing, base and adjoining-wall interfaces",
                "Coating or finish specification and responsibility for preparation",
                "Site access, storage, lifting, boundary-side access and programme information",
                "A responsibility matrix covering supply, installation, sealing, coating and inspection",
              ]}
            />
            <p>
              Record the drawing revision and technical-document version used
              for the quote. When the design changes, recheck the scope rather
              than assuming the earlier quantities, access plan or system
              details still apply.
            </p>
            <p>
              Our <Link href="/project-planning/">project-planning guide</Link>{" "}
              explains the wider project information that helps turn an early
              enquiry into a clearer scope.
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="access-sequencing"
        >
          <div className="shell prose article-prose">
            <h2 id="access-sequencing">
              Resolve access, sequencing and interfaces before the programme
              is fixed
            </h2>
            <p>
              Boundary-side access can disappear as adjacent frames, roofs,
              fences, scaffolds or landscaping progress. The documented wall
              system may also rely on a particular fixing direction, panel
              handling plan or sequence. These decisions affect whether the
              selected method can be carried out safely and whether later
              trades can complete flashings, sealants and coatings.
            </p>
            <TickList
              items={[
                "Confirm slab, frame and support readiness before installation",
                "Identify which side of the wall remains accessible at each stage",
                "Plan lawful access, delivery, storage and mechanical handling",
                "Coordinate openings, services and penetrations before panels close the work area",
                "Allocate roof, eave, parapet, flashing, sealant and drainage interfaces",
                "Confirm when the approved coating or weather-exposed finish can be completed",
                "Protect required joints and inspection points from being hidden by later work",
              ]}
            />
            <p>
              This is coordination guidance, not an installation method. The
              current system document, safe-work planning and project details
              determine the actual procedure.
            </p>
            <aside className="article-note article-note--warning">
              <strong>AAC processing requires silica controls.</strong>
              <p>
                SafeWork SA expressly includes autoclaved-aerated concrete
                among crystalline-silica substances. Cutting, drilling,
                grinding or similar processing can create respirable dust and
                must be assessed and controlled under current workplace rules.
                A respirator alone is not a complete control strategy, and this
                guide does not provide DIY processing instructions.
              </p>
            </aside>
            <p className="article-source">
              Sources: {" "}
              <a href="https://www.safework.sa.gov.au/industry/construction/crystalline-silica-substances-regulations">
                SafeWork SA crystalline-silica substances regulations
              </a>{" "}
              and {" "}
              <a href="https://hebel.com.au/resources/safety/">
                CSR Hebel safety information
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="responsibilities">
          <div className="shell prose article-prose">
            <h2 id="responsibilities">Who confirms what?</h2>
            <p>
              A clear responsibility matrix prevents a gap between design,
              approval and trade delivery. The contract and approved documents
              govern each project, but the following division is a useful
              starting point.
            </p>
            <dl className="source-list professional-list">
              <div>
                <dt>Owner, developer or builder</dt>
                <dd>
                  Confirms the project brief, required approvals, programme,
                  site access, contracts and coordination between the appointed
                  professionals and trades.
                </dd>
              </div>
              <div>
                <dt>Designer and relevant engineers</dt>
                <dd>
                  Establish the project-specific wall configuration,
                  structural and performance requirements, interfaces and any
                  technical evidence or design beyond the published system
                  scope.
                </dd>
              </div>
              <div>
                <dt>Appropriately accredited building professional</dt>
                <dd>
                  Assesses the relevant building-consent evidence and Building
                  Rules requirements for the relevant authority. This is not
                  the same role as selecting or physically installing the wall
                  system.
                </dd>
              </div>
              <div>
                <dt>Manufacturer and system suppliers</dt>
                <dd>
                  Provide current product documents and technical support for
                  the identified system. Project-specific questions outside a
                  published document should be referred to the appropriate
                  technical contact and design professional.
                </dd>
              </div>
              <div>
                <dt>Installer and finishing trades</dt>
                <dd>
                  Work to the approved documents and agreed scope, coordinate
                  interfaces, identify conflicts and keep required records.
                  They do not replace the designer, engineer, surveyor or
                  building-consent authority.
                </dd>
              </div>
            </dl>
            <p>
              Elite Surface Group can discuss installation and finishing
              requirements for a specified Hebel wall system within its
              contracted trade scope. Boundary confirmation, system design,
              approvals and certification remain with the owner or builder and
              the appointed surveyor, designer, engineers and accredited
              building professional.
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="boundary-wall-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="boundary-wall-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="boundary-wall-faqs">
              <div className="faq-list__item">
                <dt>
                  Is a zero-boundary wall the same as a party or separating
                  wall?
                </dt>
                <dd>
                  No. A separating wall is common to adjoining Class 1
                  buildings. CSR’s zero-boundary and dual zero-boundary terms
                  describe other documented configurations, including detached
                  dwellings. Confirm the relationship shown on the approved
                  plans and the exact system name.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Is a Hebel boundary wall a fence?</dt>
                <dd>
                  Not in this guide. CSR publishes PowerFence® as a separate
                  fencing system. A building wall, fence and retaining wall
                  have different applications and should not share a generic
                  detail or quote scope.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Who selects the Hebel wall system?</dt>
                <dd>
                  The project’s appointed design team documents the suitable
                  configuration and performance requirements, supported by
                  current manufacturer information and technical evidence. The
                  building professional assesses the relevant approval
                  evidence; the installer should not redesign the system on
                  site.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>
                  Does this guide determine the required setback or fire
                  rating?
                </dt>
                <dd>
                  No. Those requirements depend on the address, building
                  classification, wall and opening locations, proposal and
                  current South Australian rules. Use the approved project
                  documents and advice from the responsible professionals and
                  relevant authority.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>
                  Does an uncoated boundary-side face prove the wall is
                  unfinished or defective?
                </dt>
                <dd>
                  Not by appearance alone. The linked {" "}
                  <a href="https://hebel.com.au/wp-content/uploads/2025/12/Hebel-Houses-and-Low-Rise-Multi-Residential-External-Walls-PowerPanelXL-Design-and-Installation-Guide_HELIT016_MAY24-1.pdf">
                    PowerPanelXL guide HELIT016AUG26
                  </a>{" "}
                  and {" "}
                  <a href="https://hebel.com.au/wp-content/uploads/2025/12/PowerPanelXL-PowerPattern-Track-and-PowerProfile-External-Walls-CodeMark-Certificate_CM40049.pdf">
                    CodeMark certificate CM40049-I05-R01
                  </a>{" "}
                  require the documented external coating system. The guide
                  identifies inside-fixing details where outside access is
                  limited; it does not make appearance alone proof of compliance
                  or non-compliance. Confirm the approved system, coating
                  specification, certificate and project documents with the
                  responsible professionals before reaching a conclusion.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Are photos enough for an installation quote?</dt>
                <dd>
                  No. Photos can show site access and visible progress, but a
                  useful quote normally also needs the approved wall-system
                  schedule, drawings, technical documents, programme and trade
                  scope. Tell us what is available and we can arrange how to
                  review supporting files.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>When should the coating scope be coordinated?</dt>
                <dd>
                  Before installation and access decisions are finalised. The
                  selected system documents should identify exposed surfaces,
                  joints, flashings and finish requirements. See our {" "}
                  <Link href="/resources/rendering-hebel-panels-adelaide/">
                    guide to rendering Hebel panels
                  </Link>{" "}
                  for coating-specification and trade-scope questions.
                </dd>
              </div>
            </dl>

            <h2 id="warranty-records">Safety, product cover and handover</h2>
            <p>
              Keep the approved drawings, system guide, evidence of
              suitability, product records, inspection documents and agreed
              trade scopes with the project handover. CSR’s published warranty
              information describes conditional product cover for eligible
              products and systems; it is not an Elite Surface Group warranty,
              a building approval, a coating warranty or proof that every
              trade’s work carries identical cover.
            </p>
            <p>
              Confirm the current warranty document that actually names the
              selected product and system. Do not rely on a headline period or
              assume that a document for one system covers a different
              boundary-wall configuration. Product, design, engineering,
              coating and installation responsibilities can each have separate
              terms.
            </p>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>CSR Hebel system information</dt>
                <dd>
                  <a href="https://hebel.com.au/residential/boundary-walls/">
                    Boundary walls
                  </a>
                  , {" "}
                  <a href="https://hebel.com.au/residential/party-walls/">
                    party walls
                  </a>
                  , {" "}
                  <a href="https://hebel.com.au/resources/technical-documents/">
                    technical documents
                  </a>
                  , {" "}
                  <a href="https://hebel.com.au/resources/safety/">safety</a>{" "}
                  and {" "}
                  <a href="https://hebel.com.au/resources/warranty/">
                    warranty information
                  </a>
                </dd>
              </div>
              <div>
                <dt>Technical evidence reviewed 31 August 2026</dt>
                <dd>
                  <a href="https://hebel.com.au/wp-content/uploads/2025/12/PowerPanelXL-PowerPattern-Track-and-PowerProfile-External-Walls-CodeMark-Certificate_CM40049.pdf">
                    PowerPanelXL external-wall CodeMark certificate
                    CM40049-I05-R01 (PDF)
                  </a>{" "}
                  and {" "}
                  <a href="https://hebel.com.au/wp-content/uploads/downloads/CM40165-I03-R00_PowerPanel50mm-Dual-Zero-Residential.pdf">
                    PowerPanel50 Dual Zero Boundary CodeMark certificate (PDF)
                  </a>
                </dd>
              </div>
              <div>
                <dt>South Australian approvals and Building Code</dt>
                <dd>
                  <a href="https://plan.sa.gov.au/">
                    PlanSA address and approval information
                  </a>
                  , {" "}
                  <a href="https://plan.sa.gov.au/resources/building/building_code">
                    Building Code updates
                  </a>{" "}
                  and {" "}
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/8-south-australia/92-fire-separation-external-walls">
                    NCC 2022 South Australia Part 9.2
                  </a>
                </dd>
              </div>
              <div>
                <dt>South Australian workplace safety</dt>
                <dd>
                  <a href="https://www.safework.sa.gov.au/industry/construction/crystalline-silica-substances-regulations">
                    SafeWork SA crystalline-silica substances regulations
                  </a>
                </dd>
              </div>
            </dl>
            <p className="article-source">
              Sources reviewed 31 August 2026. Recheck the applicable system
              guide, certificate and South Australian rules for every project.
              The linked PowerPanelXL certificate CM40049-I05-R01 was issued 14
              August 2026 and expires 29 April 2028. The linked PowerPanel50
              Dual Zero Boundary certificate expires 1 March 2027, and PlanSA
              schedules NCC 2025 Building Code adoption for 1 May 2027.
            </p>
            <p className="article-source">
              Hebel® is a registered trademark of the Xella group. CSR Building
              Products Ltd is the exclusive licensee of Xella in Australia.
              Elite Surface Group is not represented here as a CSR-authorised,
              accredited or endorsed installer.
            </p>

            <nav className="article-related" aria-label="Related pages">
              <Link href="/hebel/">Hebel installation Adelaide</Link>
              <Link href="/walling/">Internal and external walling</Link>
              <Link href="/resources/rendering-hebel-panels-adelaide/">
                Rendering Hebel panels
              </Link>
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
        intro="Planning a specified Hebel boundary-wall installation in Adelaide? Tell us the project type, system named on the drawings and which approved documents are available. We can arrange how to review supporting files and confirm whether the installation or finishing work fits our service scope."
      />
      <CtaBand />
    </>
  );
}
