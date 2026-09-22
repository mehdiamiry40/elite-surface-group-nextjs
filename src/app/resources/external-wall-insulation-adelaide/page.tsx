import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { externalWallInsulationGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: externalWallInsulationGuide.metaTitle,
  description: externalWallInsulationGuide.metaDescription,
  path: `/resources/${externalWallInsulationGuide.slug}`,
  image: ogCard("walling", externalWallInsulationGuide.metaTitle),
  openGraphType: "article",
  publishedTime: externalWallInsulationGuide.published,
  modifiedTime: externalWallInsulationGuide.modified,
});

export default function ExternalWallInsulationGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "External wall insulation in Adelaide",
            href: `/resources/${externalWallInsulationGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={externalWallInsulationGuide} />

      <article>
        <PageBanner
          title={externalWallInsulationGuide.title}
          image={bannerImages[`/resources/${externalWallInsulationGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "External wall insulation in Adelaide" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{externalWallInsulationGuide.category}</span>
              <time dateTime={externalWallInsulationGuide.published}>
                Published {externalWallInsulationGuide.publishedDisplay}
              </time>
              <span>{externalWallInsulationGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              External wall insulation is bought as a product and delivered as
              an assembly. The batt or the board is one layer; the total
              R&#8209;value the wall reaches comes from the frame, the air
              spaces, the membrane, the fixings and the finish over them, and a
              detail missed on site costs more than the insulation added. In
              South Australia the target itself moved on 1&nbsp;October
              2024&mdash;so the wall your neighbour built five years ago is not
              the wall you are being quoted now.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>We install walls; we do not rate them.</strong>
              <p>
                Elite Surface Group installs cladding, render, Hebel and
                walling. Energy-efficiency compliance is demonstrated by an
                assessment prepared by a suitably qualified professional, and
                condensation risk, structural adequacy and fire performance sit
                with the same people. Use this to ask better questions of your
                designer, assessor and builder&mdash;not as a compliance
                pathway.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#system">Why the number is a whole-wall number</a>
                </li>
                <li>
                  <a href="#walls">What the wall you already have gives you</a>
                </li>
                <li>
                  <a href="#adelaide">Climate zones and the 7-star rule</a>
                </li>
                <li>
                  <a href="#moisture">The layer behind the insulation</a>
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

        <section className="section section--tint" aria-labelledby="system">
          <div className="shell prose article-prose">
            <h2 id="system">
              Why external wall insulation is a whole-wall number
            </h2>
            <p>
              A bag of batts carries a material R&#8209;value. A wall carries a
              total R&#8209;value, and the two are not the same figure. CSR
              Hebel puts it plainly in its explainer on the subject: the outside
              air surface, internal air spaces, insulation materials, fixings
              and the wall frame itself all contribute, and collectively they
              form the building system from which a total system
              R&#8209;value is calculated. Specify the layer and you have
              specified one term in that sum.
            </p>
            <p>
              The Australian Government&rsquo;s YourHome guide lists what erodes
              the rest of it: thermal bridging, compression of bulk insulation,
              dust settling on reflective insulation, and the absence of a
              suitable air gap next to a reflective surface. Every one of those
              is an installation outcome rather than a product choice. A batt
              stuffed in behind a service run is no longer the batt that was
              specified, and a reflective membrane pressed flat against sheeting
              has lost the gap it needed to do anything.
            </p>
            <p>
              Thermal bridging is the one most often left out of the
              conversation. Heat takes the easy path, and in a framed wall that
              path is the frame. YourHome notes that additional layers of
              insulation fixed to frames reduce bridging, and that a continuous
              layer of rigid board fixed to the outside of the studs gives a
              higher total R&#8209;value precisely because it is not interrupted
              by them&mdash;advice it frames for cold climates, but the geometry
              is the same everywhere. That board also changes the depth of every
              window reveal, sill, corner and junction behind the finish, which
              is where it stops being a thermal decision and becomes a
              setting-out one.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://hebel.com.au/inform-inspire/case-studies/r-values-mean-home-building-decisions/">
                CSR Hebel on what R&#8209;values mean
              </a>{" "}
              and{" "}
              <a href="https://www.yourhome.gov.au/passive-design/insulation">
                YourHome, insulation
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="walls">
          <div className="shell prose article-prose">
            <h2 id="walls">What the wall you already have gives you</h2>

            <h3>Brick veneer</h3>
            <p>
              The default across the northern and southern suburbs. YourHome
              describes brick veneer as bricks forming the external skin of a
              timber- or steel-framed home, and is blunt about what that
              achieves: clay brickwork has high thermal mass but low thermal
              resistance, and in conventional veneer the bricks contribute
              little to the building&rsquo;s thermal performance, with the total
              thermal resistance of typical brick veneer construction around
              R0.56. Adding foil or bulk insulation greatly increases it. The
              upgrade lives in the frame and the cavity, not in the brick you
              can see. Our{" "}
              <Link href="/resources/hebel-vs-brick-veneer-adelaide/">
                Hebel versus brick veneer comparison
              </Link>{" "}
              covers how the two walls differ once you are choosing rather than
              improving.
            </p>

            <h3>Lightweight framed and clad</h3>
            <p>
              Low thermal mass, and insulation is easy to add&mdash;which is the
              trade in both directions. YourHome notes that cladding fixed
              outside a lightweight insulated frame does not contribute thermal
              mass, so the wall responds quickly to whatever the day is doing.
              In a house that runs mechanical cooling through an Adelaide
              February that responsiveness can work for you; in one relying on
              the night to shed heat, it will not. See{" "}
              <Link href="/resources/cladding-vs-render-adelaide/">
                cladding or render
              </Link>{" "}
              for how the outer layer itself is chosen.
            </p>

            <h3>AAC panel</h3>
            <p>
              Autoclaved aerated concrete sits between the two. YourHome
              describes it as much lighter than normal concrete and with
              significantly higher thermal resistance, with medium thermal mass
              and good thermal and sound insulation, available as panels and
              blocks and typically used for cladding though it can be
              loadbearing. Take the system R&#8209;value from the current CSR
              Hebel design and installation guide for the panel and build-up
              actually specified, rather than from a panel figure quoted
              in isolation.
            </p>

            <h3>Solid masonry</h3>
            <p>
              Older stone and double-brick homes around Prospect, Norwood and
              Semaphore are the hardest retrofit. There is no frame cavity to
              fill, so the options are an internal lining that costs floor area
              or an external system that changes the elevation&mdash;and on a
              character property, possibly the planning position. Lining the
              inside of a solid masonry wall also changes where moisture can
              condense within the build-up, which is a question for a suitably
              qualified professional and not a rule of thumb.
            </p>
            <p className="article-source">
              Sources: YourHome,{" "}
              <a href="https://www.yourhome.gov.au/materials/brickwork-and-blockwork">
                brickwork and blockwork
              </a>{" "}
              and{" "}
              <a href="https://www.yourhome.gov.au/materials/cladding-systems">
                cladding systems
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="adelaide">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={externalWallInsulationGuide.image}
                alt={externalWallInsulationGuide.imageAlt}
                width={externalWallInsulationGuide.imageWidth}
                height={externalWallInsulationGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(externalWallInsulationGuide.image)}
              />
              <figcaption>
                {externalWallInsulationGuide.imageCaption}
              </figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Local context</span>
              <h2 id="adelaide">Climate zones and the 7-star rule</h2>
              <p>
                External wall insulation is specified against a climate zone,
                and the Code does not treat South Australia as one place.
                Metropolitan Adelaide sits in NCC climate zone 5, while the
                Adelaide Hills and the South East fall in zone 6. The zones do
                not follow council boundaries, so check the address itself on
                the ABCB climate zone map before assuming a Stirling job and a
                Salisbury job are specified the same way.
              </p>
              <p>
                The bar moved recently. PlanSA records that from 1&nbsp;October
                2024 newly constructed homes in South Australia are required to
                be seven-star energy efficient, up from six. Walls are only one
                contributor to that rating, but they are a large one, and a
                plan drawn against the older standard will not carry across
                untouched.
              </p>
              <p>
                There is a documented exception worth knowing about. PlanSA
                publishes a concession allowing some homes to be built to the
                NCC 2019 thermal performance requirements&mdash;new Class 1
                homes on small or irregular allotments, workers&rsquo;
                accommodation, tourist accommodation, certain locations in the
                Mount Barker Master Planned Neighbourhood Zone, and manufactured
                homes of 70&nbsp;square metres or less. Those homes must still
                meet the NCC 2022 energy usage and condensation management
                requirements. Whether a particular allotment qualifies is a
                question for the designer and the relevant authority, not for
                the installer.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://www.abcb.gov.au/resources/climate-zone-map">
                  ABCB climate zone map
                </a>
                ,{" "}
                <a href="https://plan.sa.gov.au/news/article/2023/new-building-standards-to-improve-home-accessibility-and-energy-efficiency">
                  PlanSA on the new building standards
                </a>{" "}
                and the{" "}
                <a href="https://plan.sa.gov.au/resources/building/transitional-arrangements/accordions/energy-efficiency-concession">
                  PlanSA energy efficiency concession
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="moisture">
          <div className="shell prose article-prose">
            <h2 id="moisture">The layer behind the insulation</h2>
            <p>
              Insulating a wall slows heat through it, which also means the
              wall no longer dries the way it used to. NCC 2022 addresses that
              directly. Part 10.8 of the Housing Provisions requires pliable
              building membranes in an external wall to comply with
              AS/NZS&nbsp;4200.1 and to be installed in accordance with
              AS&nbsp;4200.2, and in climate zones 4 to 8&mdash;which takes in
              both Adelaide and the Hills&mdash;the membrane must be vapour
              permeable, at least class&nbsp;3 to that standard, so internal
              moisture can move outward rather than accumulate in the wall.
              Where no pliable membrane is installed, the cladding acting as the
              primary water control layer must be separated from water-sensitive
              materials by a drained cavity.
            </p>
            <p>
              The cavity is the part that gets compromised on site. YourHome
              describes the cladding&rsquo;s role as a weather screen, separated
              from the structure by a cavity that must be continuous top to
              bottom, with any water that gets past the cladding draining
              behind it. It also notes that the NCC now recommends ventilated
              cavities allowing moisture to drain and evaporate, and that in
              climate zones 6 to 8 they are mandatory&mdash;another reason a
              Hills elevation and a plains elevation are not the same detail. A
              cavity closed off by an over-enthusiastic flashing, a batten run
              hard into a sill, or insulation pushed into the gap is no longer a
              cavity.
            </p>
            <p>Worth settling before anyone orders material:</p>
            <TickList
              items={[
                "The wall's total R-value as calculated for the build-up actually being installed, not the material R-value on the packaging",
                "Who prepares the energy assessment, and whether the wall specification they modelled matches the one on the construction drawings",
                "The membrane: product, vapour permeance class, and the standard it is installed to",
                "Whether the cavity is drained, ventilated, or both, and how it is kept continuous past every flashing and penetration",
                "How window and door reveals, corners and junctions resolve if a continuous external board is added to the frame",
                "Which trade owns the membrane, which owns the cavity battens, and where the handover between them sits",
              ]}
            />
            <p className="article-source">
              Sources:{" "}
              <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/10-health-and-amenity/part-108-condensation-management">
                NCC 2022 Housing Provisions, Part 10.8 condensation management
              </a>{" "}
              and{" "}
              <a href="https://www.yourhome.gov.au/materials/cladding-systems">
                YourHome, cladding systems
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
                <h3>Establish what the existing wall actually is</h3>
                <p>
                  Brick veneer, solid masonry, framed and clad, or AAC. Every
                  sensible answer about external wall insulation follows from
                  that one, and a photograph of the outside rarely settles it.
                </p>
              </li>
              <li>
                <h3>Confirm the climate zone from the address</h3>
                <p>
                  Zone 5 and zone 6 carry different cavity expectations. Check
                  the property rather than the suburb next door.
                </p>
              </li>
              <li>
                <h3>Get the assessment before the specification hardens</h3>
                <p>
                  An assessor can tell you where a star is cheapest to buy.
                  Sometimes it is in the wall; often it is in glazing,
                  orientation or sealing, and finding that out after the wall is
                  detailed wastes the finding.
                </p>
              </li>
              <li>
                <h3>Ask for the wall as a drawn section</h3>
                <p>
                  A section through the wall at a window head shows the
                  membrane, the cavity, the insulation and the finish in one
                  place. Ambiguity there is what turns into a site
                  argument later.
                </p>
              </li>
            </ol>
            <p>
              Our{" "}
              <Link href="/walling/">Adelaide walling service page</Link>{" "}
              explains how we scope wall build-ups and the trades around them,
              the{" "}
              <Link href="/project-planning/">project planning guide</Link>{" "}
              lists what is useful to have ready before quoting, and the{" "}
              <Link href="/locations/adelaide/">Adelaide service area page</Link>{" "}
              covers where we work across the metropolitan area and wider South
              Australia.
            </p>
          </div>
        </section>

        <section
          id="faqs-and-sources"
          className="section"
          aria-labelledby="external-wall-insulation-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="external-wall-insulation-faqs">Common questions</h2>
            <dl
              className="faq-list"
              aria-labelledby="external-wall-insulation-faqs"
            >
              <div className="faq-list__item">
                <dt>
                  Can insulation be added to an existing brick veneer wall
                  without opening it up?
                </dt>
                <dd>
                  Sometimes, and it depends entirely on what is in the cavity
                  and what the wall is doing with moisture. The cavity in a
                  brick veneer wall is there partly to drain, so filling it is
                  not a neutral act. Have the wall assessed before assuming a
                  blow-in product is suitable for it.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Does render or cladding add much insulation value?</dt>
                <dd>
                  On its own, very little. A finish is a thin layer with modest
                  thermal resistance. What can matter is what goes on with
                  it&mdash;a continuous insulating board behind the finish, or a
                  properly formed and maintained cavity behind cladding.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Does my renovation have to meet the 7-star standard?</dt>
                <dd>
                  The seven-star requirement PlanSA describes applies to newly
                  constructed homes from 1&nbsp;October 2024. How the
                  requirements apply to alterations and additions depends on
                  the work and is a question for your designer and the relevant
                  authority, not something to read off a website.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Is more insulation always better?</dt>
                <dd>
                  Past a point the wall stops being the constraint. Thermal
                  bridging, air leakage, glazing and the sealing of the
                  building all cap what another layer of batt returns, and
                  adding insulation without resolving the vapour and drainage
                  path can create a problem the old wall did not have.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>Australian Government &mdash; YourHome</dt>
                <dd>
                  <a href="https://www.yourhome.gov.au/passive-design/insulation">
                    Insulation
                  </a>
                  ,{" "}
                  <a href="https://www.yourhome.gov.au/materials/brickwork-and-blockwork">
                    brickwork and blockwork
                  </a>{" "}
                  and{" "}
                  <a href="https://www.yourhome.gov.au/materials/cladding-systems">
                    cladding systems
                  </a>
                </dd>
              </div>
              <div>
                <dt>Australian Building Codes Board</dt>
                <dd>
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/10-health-and-amenity/part-108-condensation-management">
                    NCC 2022 Housing Provisions, Part 10.8 condensation
                    management
                  </a>{" "}
                  and the{" "}
                  <a href="https://www.abcb.gov.au/resources/climate-zone-map">
                    climate zone map
                  </a>
                </dd>
              </div>
              <div>
                <dt>Government of South Australia &mdash; PlanSA</dt>
                <dd>
                  <a href="https://plan.sa.gov.au/news/article/2023/new-building-standards-to-improve-home-accessibility-and-energy-efficiency">
                    New building standards to improve home accessibility and
                    energy efficiency
                  </a>{" "}
                  and the{" "}
                  <a href="https://plan.sa.gov.au/resources/building/transitional-arrangements/accordions/energy-efficiency-concession">
                    energy efficiency concession
                  </a>
                </dd>
              </div>
              <div>
                <dt>CSR Hebel</dt>
                <dd>
                  <a href="https://hebel.com.au/inform-inspire/case-studies/r-values-mean-home-building-decisions/">
                    What R&#8209;values mean in home building decisions
                  </a>
                </dd>
              </div>
            </dl>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/walling/">Adelaide walling services</Link>
              <Link href="/resources/hebel-vs-brick-veneer-adelaide/">
                Hebel vs brick veneer
              </Link>
              <Link href="/resources/cladding-vs-render-adelaide/">
                Cladding or render
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
        defaultService="Walling"
        intro="Working through a wall build-up? Tell us the suburb, what the existing wall is made of, whether an energy assessment has been prepared and what drawings or sections are available. If supporting files are needed, we’ll arrange how to review them."
      />
      <CtaBand />
    </>
  );
}
