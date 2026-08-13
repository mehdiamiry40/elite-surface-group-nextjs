import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { claddingMaintenanceGuide } from "@/content/resources";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: claddingMaintenanceGuide.metaTitle,
  description: claddingMaintenanceGuide.metaDescription,
  path: `/resources/${claddingMaintenanceGuide.slug}`,
  image: ogCard(
    "cladding-maintenance-coastal-adelaide",
    "Coastal Adelaide cladding maintenance guide",
  ),
  openGraphType: "article",
  publishedTime: claddingMaintenanceGuide.published,
  modifiedTime: claddingMaintenanceGuide.modified,
});

export default function CoastalCladdingMaintenanceGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Coastal cladding maintenance",
            href: `/resources/${claddingMaintenanceGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={claddingMaintenanceGuide} />

      <article>
        <PageBanner
          title={claddingMaintenanceGuide.title}
          image={bannerImages[`/resources/${claddingMaintenanceGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Coastal cladding maintenance" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="cladding-guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{claddingMaintenanceGuide.category}</span>
              <time dateTime={claddingMaintenanceGuide.published}>
                Published {claddingMaintenanceGuide.publishedDisplay}
              </time>
              <span>{claddingMaintenanceGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="cladding-guide-summary">The short answer</h2>
            <p className="article-lead">
              There is no single coastal-cladding maintenance schedule. First
              identify the exact cladding product, coating and site exposure;
              then use the current manufacturer instructions for that system.
              A wash interval or cleaner approved for one product may be wrong
              for another.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>Product-specific guidance comes first.</strong>
              <p>
                This guide helps you inspect from a safe, readily accessible
                position and find the information that should govern the work.
                It is not a cleaning specification, a warranty statement or a
                remote diagnosis of an existing facade.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#coastal-exposure">Coastal exposure</a>
                </li>
                <li>
                  <a href="#identify-system">Identify the system</a>
                </li>
                <li>
                  <a href="#inspection-checklist">Ground-level checks</a>
                </li>
                <li>
                  <a href="#maker-guidance">Manufacturer examples</a>
                </li>
                <li>
                  <a href="#assessment-signs">Assessment signs</a>
                </li>
                <li>
                  <a href="#planning-new-work">Planning new work</a>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="coastal-exposure"
        >
          <div className="shell prose article-prose">
            <h2 id="coastal-exposure">
              Why coastal exposure changes the questions
            </h2>
            <p>
              South Australian building guidance uses mapped corrosion
              environments to help determine corrosion-protection requirements
              for certain building classes near the coast and breaking surf.
              That confirms exposure is a design and specification issue—not
              something to decide from the suburb name or a photograph alone.
            </p>
            <p>
              Salt can also accumulate on surfaces that rain does not naturally
              wash, including areas below eaves and sheltered junctions. The
              relevant product, finish, distance and orientation to marine
              influence, surrounding terrain and how much rain reaches the wall
              can all affect the manufacturer guidance that applies.
            </p>
            <p>
              Do not apply one distance threshold across every product, or use
              distance alone to diagnose an existing facade. For a new or
              replacement system, check the applicable SA map and building
              class as well as the product guide and local conditions. The
              designer, supplier and installer should work from that documented
              information.
            </p>
            <p className="article-source">
              Source: {" "}
              <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/maps-to-assist-with-technical-building-issues">
                SA.GOV.AU corrosion-environment maps and building guidance
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="identify-system">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={claddingMaintenanceGuide.image}
                alt={claddingMaintenanceGuide.imageAlt}
                width={claddingMaintenanceGuide.imageWidth}
                height={claddingMaintenanceGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
              />
              <figcaption>{claddingMaintenanceGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Start with evidence</span>
              <h2 id="identify-system">Identify the system before cleaning</h2>
              <p>
                “Cladding” describes many different materials and wall
                build-ups. Fibre-cement boards, coated steel, aluminium,
                timber-derived products, composites and rendered panel systems
                can have different finishes, fixings, joints and care limits.
              </p>
              <p>
                Check handover documents, invoices, drawings, warranty records
                and product labels before relying on appearance. Record the
                manufacturer, product profile, finish or coating, colour,
                installation date if known and any previous repair or repaint.
                If the product remains uncertain, ask an appropriate
                professional to identify it before selecting a chemical,
                pressure or repair method.
              </p>
              <p>
                Australian Government guidance treats cladding as part of an
                interacting wall system that also includes framing, membranes,
                insulation and water-management details. Cleaning the visible
                face does not establish that the concealed wall build-up is
                sound.
              </p>
              <p className="article-source">
                Source: {" "}
                <a href="https://www.yourhome.gov.au/materials/cladding-systems">
                  Australian Government YourHome, Cladding systems
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="inspection-checklist"
        >
          <div className="shell prose article-prose">
            <h2 id="inspection-checklist">
              A safe ground-level inspection checklist
            </h2>
            <p>
              Create a dated record from ground level or another safely
              accessible position. Include a wide view of each elevation and
              closer photographs that retain enough context to locate the area
              again.
            </p>
            <TickList
              items={[
                "Product, profile and finish where these can be confirmed from records",
                "Staining, chalking, fading or other visible colour change",
                "Loose, displaced, cracked, dented or otherwise damaged boards and panels",
                "Visible corrosion at fasteners, cut edges, flashings or adjoining metalwork",
                "Open joints, split or missing sealant and changes around corners",
                "Junctions around windows, doors, penetrations and adjoining finishes",
                "Blocked or bridged drainage and ventilation openings that are readily visible",
                "Overflow marks, damaged gutters or downpipes and signs of active water entry",
                "Soil, mulch, stored materials or vegetation touching the cladding",
                "Areas sheltered from regular rain, including walls below deep eaves",
              ]}
            />
            <p>
              Do not pull panels, probe concealed layers or disturb a joint to
              complete this check. If a defect could involve the wall behind
              the cladding, the appropriate assessment may need to consider the
              membrane, cavity, flashing, substrate and internal moisture—not
              just the surface mark.
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="maker-guidance">
          <div className="shell prose article-prose">
            <h2 id="maker-guidance">
              Manufacturer guidance: examples, not universal rules
            </h2>
            <p>
              The examples below show why the product name matters. They apply
              only where that manufacturer and product family have been
              confirmed, and the latest product-specific manual may add or
              replace requirements.
            </p>
            <dl className="faq-list professional-list">
              <div className="faq-list__item">
                <dt>James Hardie fibre cement</dt>
                <dd>
                  James Hardie’s general fibre-cement guidance says maintenance
                  depends on location and exposure. It lists washing exterior
                  surfaces every 6–12 months, periodic fastener checks,
                  maintenance of protective finishes, and checks that joints,
                  penetrations, flashings and sealants remain intact. It also
                  directs owners to the paint manufacturer for coating-specific
                  washing and recoating requirements.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>COLORBOND steel</dt>
                <dd>
                  BlueScope’s COLORBOND maintenance page distinguishes
                  rain-washed areas from sheltered “unwashed” areas. It says to
                  hose unwashed areas with clean fresh water at least every six
                  months and more often where coastal salt spray is prevalent,
                  and to prevent soil or mulch building up against the steel.
                  That instruction is for COLORBOND steel, not every coated
                  metal facade.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Other fibre cement, timber, composite or coated systems</dt>
                <dd>
                  Find the current manual for the exact product and finish.
                  Durability and maintenance vary with the material, coating,
                  joints and exposure. Do not transfer Hardie or COLORBOND
                  intervals, cleaners or repair methods to another brand or
                  material because the surfaces look similar.
                </dd>
              </div>
            </dl>
            <p className="article-source">
              Sources: {" "}
              <a href="https://www.jameshardie.com.au/fibre-cement">
                James Hardie fibre-cement maintenance guidance
              </a>
              , {" "}
              <a href="https://colorbond.com/why-colorbond-steel/maintenance">
                COLORBOND steel maintenance guidance
              </a>{" "}
              and {" "}
              <a href="https://www.yourhome.gov.au/materials/cladding-systems">
                YourHome cladding-systems guidance
              </a>
              .
            </p>

            <h2 id="cleaning-boundaries">Cleaning boundaries worth keeping</h2>
            <p>
              Use only the method, water quality, detergent or cleaner,
              pressure, tools and rinse procedure allowed by the confirmed
              manufacturer. Test where its instructions require a test area.
              Protect nearby materials and landscaping as directed by the
              product information.
            </p>
            <p>
              Do not use a pressure washer, abrasive tool, solvent, bleach,
              touch-up coating or generic sealant unless the current guidance
              for the exact product and finish expressly permits it. If the
              product remains unidentified or the instructions are unclear,
              stop and seek product-specific advice before proceeding.
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="assessment-signs"
        >
          <div className="shell prose article-prose">
            <h2 id="assessment-signs">
              Signs that need prompt professional assessment
            </h2>
            <p>
              Stop treating the issue as routine surface care and arrange an
              appropriate assessment if you observe:
            </p>
            <TickList
              items={[
                "Loose, displaced or unstable panels or boards",
                "Active water entry, interior damp or recurring moisture around openings",
                "Damaged flashings or open joints at windows, doors, parapets or penetrations",
                "Significant or spreading corrosion at fixings, edges or support components",
                "Widespread coating loss, delamination or repeated failure after earlier work",
                "Movement, impact damage or distortion affecting more than the surface finish",
                "Any area that cannot be inspected or maintained without work at height",
              ]}
            />
            <p>
              The right person depends on the evidence. A product supplier or
              coating specialist can clarify confirmed product instructions; a
              facade or building consultant can assess uncertain construction
              and water-management issues; and an engineer may be needed where
              support, movement or safety is in question.
            </p>
            <aside className="article-note article-note--warning">
              <strong>Do not improvise access at height.</strong>
              <p>
                SafeWork SA identifies falls as a serious risk and says ladders
                should be considered only after safer alternatives such as an
                elevated work platform or scaffold. Elevated inspection or
                cleaning should be planned by people with suitable equipment
                and competence.
              </p>
            </aside>
            <p className="article-source">
              Source: {" "}
              <a href="https://safework.sa.gov.au/industry/construction/working-at-heights">
                SafeWork SA, Working at heights
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="planning-new-work">
          <div className="shell prose article-prose">
            <h2 id="planning-new-work">
              Plan future maintenance before new cladding is installed
            </h2>
            <p>
              Maintenance is easier to manage when the project records are
              complete and the facade can be accessed safely. Before a new
              cladding or facade-replacement scope is finalised, ask the
              designer, supplier and installer to confirm:
            </p>
            <TickList
              items={[
                "The exact cladding product, finish and documented exposure limits",
                "Compatible fixings, flashings, sealants and adjoining materials",
                "How openings, penetrations, cavities and drainage paths are detailed",
                "Which areas will not be naturally washed by rain",
                "The manufacturer’s cleaning, inspection and recoating information",
                "How upper levels and difficult junctions can be accessed safely later",
                "Which manuals, warranties, colour records and handover documents will be supplied",
                "Who owns each part of the facade scope and any work by adjoining trades",
              ]}
            />
            <p>
              Tell Elite Surface Group which plans, elevations, photographs and
              access notes are available, along with the Adelaide project area,
              new-build or replacement status and proposed system if known. We
              can arrange how to review supporting files, check whether the
              proposed installation is within our service scope and identify
              what further information is needed to quote.
            </p>

            <h2 id="cladding-maintenance-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="cladding-maintenance-faqs">
              <div className="faq-list__item">
                <dt>How often should coastal cladding be washed?</dt>
                <dd>
                  There is no universal interval. Use the current guidance for
                  the confirmed product, coating and exposure. A frequency
                  published by one manufacturer should not be applied to a
                  different system.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Can I pressure-wash exterior cladding?</dt>
                <dd>
                  Only if the exact product and finish instructions permit it
                  and you can follow their limits safely. If the instructions
                  do not expressly permit it, do not assume it is suitable.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Does “low maintenance” mean maintenance-free?</dt>
                <dd>
                  No. The need may be lower than for another material, but
                  cleaning, finish care and checks of joints, fixings and water
                  management can still apply.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Does a rust-coloured stain prove the cladding is failing?</dt>
                <dd>
                  No. Appearance alone does not identify the source, extent or
                  significance of corrosion. Record the context and have the
                  relevant materials and interfaces assessed before covering or
                  repairing the stain.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Can Elite diagnose an existing facade from photographs?</dt>
                <dd>
                  Photographs and product records help with initial context, but
                  they cannot establish the condition of concealed layers or
                  identify every cause. Some issues need on-site or independent
                  assessment before an installation or replacement scope is
                  appropriate.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>Government of South Australia</dt>
                <dd>
                  <a href="https://www.sa.gov.au/topics/business-and-trade/building-industry/building-rules-regulations-and-information/maps-to-assist-with-technical-building-issues">
                    Maps to assist with technical building issues
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
                <dt>James Hardie</dt>
                <dd>
                  <a href="https://www.jameshardie.com.au/fibre-cement">
                    Fibre-cement maintenance guidance
                  </a>
                </dd>
              </div>
              <div>
                <dt>BlueScope</dt>
                <dd>
                  <a href="https://colorbond.com/why-colorbond-steel/maintenance">
                    COLORBOND steel maintenance guidance
                  </a>
                </dd>
              </div>
              <div>
                <dt>SafeWork SA</dt>
                <dd>
                  <a href="https://safework.sa.gov.au/industry/construction/working-at-heights">
                    Working at heights
                  </a>
                </dd>
              </div>
            </dl>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/cladding/">
                Adelaide cladding and facade installation
              </Link>
              <Link href="/projects/dark-feature-cladding/">
                Cladding project case study
              </Link>
              <Link href="/locations/adelaide/">Adelaide service area</Link>
              <Link href="/project-planning/">Plan your project enquiry</Link>
              <Link href="/resources/render-cracking-adelaide/">
                Render-cracking guide
              </Link>
              <Link href="/contact-us/#contact">
                Discuss the available project details
              </Link>
            </nav>
          </div>
        </section>
      </article>

      <ContactSection
        defaultService="Cladding"
        intro="Planning new cladding or a facade replacement? Tell us the site area, proposed system and what plans or access details are available. If supporting files are needed, we’ll arrange how to review them."
      />
      <CtaBand />
    </>
  );
}
