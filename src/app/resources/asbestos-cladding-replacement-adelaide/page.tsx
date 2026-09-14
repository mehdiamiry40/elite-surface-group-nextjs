import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { asbestosCladdingReplacementGuide } from "@/content/resources";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: asbestosCladdingReplacementGuide.metaTitle,
  description: asbestosCladdingReplacementGuide.metaDescription,
  path: `/resources/${asbestosCladdingReplacementGuide.slug}`,
  image: ogCard("cladding", asbestosCladdingReplacementGuide.metaTitle),
  openGraphType: "article",
  publishedTime: asbestosCladdingReplacementGuide.published,
  modifiedTime: asbestosCladdingReplacementGuide.modified,
});

export default function AsbestosCladdingReplacementGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Replacing asbestos cladding",
            href: `/resources/${asbestosCladdingReplacementGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={asbestosCladdingReplacementGuide} />

      <article>
        <PageBanner
          title={asbestosCladdingReplacementGuide.title}
          image={
            bannerImages[`/resources/${asbestosCladdingReplacementGuide.slug}`]
          }
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Replacing asbestos cladding" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{asbestosCladdingReplacementGuide.category}</span>
              <time dateTime={asbestosCladdingReplacementGuide.published}>
                Published {asbestosCladdingReplacementGuide.publishedDisplay}
              </time>
              <span>{asbestosCladdingReplacementGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              Replacing asbestos cladding is two jobs with a hard line between
              them. The first is taking the old sheeting off: licensed,
              notified, monitored work with its own disposal rules and its own
              contractor. The second is the new wall&mdash;what the frame
              underneath turns out to be, which system suits the exposure, and
              how every junction is detailed. We do the second. Until the first
              is finished and the area cleared, nothing about the replacement
              can be scoped properly.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>
                Elite Surface Group does not remove or handle asbestos.
              </strong>
              <p>
                Identification is a testing question and removal is licensed
                work, both of which sit with suitably qualified professionals.
                Arrange sampling and removal first; we quote and install the
                replacement cladding from a cleared substrate. Nothing here is
                advice on removing asbestos yourself.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#identify">Does the house actually have it?</a>
                </li>
                <li>
                  <a href="#removal">Who is allowed to remove it</a>
                </li>
                <li>
                  <a href="#substrate">What the wall underneath decides</a>
                </li>
                <li>
                  <a href="#approvals">Approvals, scope and sequencing</a>
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

        <section className="section section--tint" aria-labelledby="identify">
          <div className="shell prose article-prose">
            <h2 id="identify">Does the house actually have it?</h2>
            <p>
              Age is the first filter, and South Australian government guidance
              puts it in tiers. A home built or renovated before the mid-1980s
              is highly likely to contain asbestos products; between the
              mid-1980s and 1990 it is likely; after 1990 it is unlikely.
              Australia&rsquo;s total ban on the manufacture, use, import and
              sale of all forms of asbestos took effect on 31 December 2003, and
              the national agency estimates asbestos is still present in around
              one in three Australian homes.
            </p>
            <p>
              Adelaide&rsquo;s post-war expansion left a great deal of that
              era&rsquo;s housing across the northern and southern
              suburbs&mdash;Elizabeth, Salisbury, Para Hills, Christies
              Beach&mdash;and the inner west. Age is the flag, though, not the
              suburb.
            </p>
            <TickList
              items={[
                "Flat or profiled external wall sheeting, often with timber or aluminium cover strips over the joints",
                "Eaves and soffit lining, gable infill, and sheeting to carports, laundries and garages",
                "Fencing and roof sheeting of the same era, which often ends up in the same scope",
                "Bonded (non-friable) sheet behaves differently to friable material, and that difference decides who may remove it",
              ]}
            />
            <p>
              You cannot settle it by looking. The accurate way to find out is
              inspection and testing by an accredited laboratory, and a sample
              costs very little next to the cost of assuming wrong. Sheeting
              that is weathered, drilled, damaged or about to be disturbed is
              the case for testing sooner rather than later.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://asbestos.sa.gov.au/in-your-home/find-and-identify-asbestos-in-the-home">
                Government of South Australia, find and identify asbestos in the
                home
              </a>
              ,{" "}
              <a href="https://asbestos.sa.gov.au/in-your-home/homeowners">
                asbestos information for homeowners
              </a>{" "}
              and{" "}
              <a href="https://www.asbestossafety.gov.au/about-asbestos">
                Asbestos and Silica Safety and Eradication Agency, about
                asbestos
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="removal">
          <div className="shell prose article-prose">
            <h2 id="removal">Who is allowed to remove it</h2>
            <p>
              SafeWork SA licenses asbestos removal by class. A Class A licence
              covers friable asbestos as well as non-friable material and
              asbestos-contaminated dust or debris. A Class B licence covers
              more than 10 square metres of non-friable asbestos. Removal of 10
              square metres or less of non-friable material is not licensed
              work&mdash;but unlicensed is not unregulated, and South Australian
              guidance still recommends engaging a licensed removalist.
              Anything friable always requires Class A.
            </p>
            <p>
              Licensed removal carries a process worth understanding as the
              client. The licence holder must notify SafeWork SA at least five
              days before the work starts, and the job closes with a clearance
              certificate, which is not issued unless the removal area and the
              area immediately around it are free of visible asbestos
              contamination. That certificate is the document the next trade
              works from.
            </p>
            <h3>Method matters as much as licensing</h3>
            <p>
              High-pressure water spray equipment must not be used on asbestos
              cement: it destroys the binding matrix holding the fibres in the
              sheet, and SafeWork SA has published incident alerts after exactly
              that. Power tools, abrasive cutting and sanding discs and
              compressed air are excluded for the same reason. Hand tools,
              careful wetting with a low-pressure spray and controlled removal
              of whole sheets are the accepted approach.
            </p>
            <p>
              Disposal is regulated separately again. Asbestos waste cannot go
              into a kerbside bin or a hard-rubbish collection. EPA SA requires
              it wrapped in manageable packages of thick (200 micron) plastic,
              sealed at the seams, clearly labelled and taken only to a depot
              licensed to accept it. Ring the depot first.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://safework.sa.gov.au/workplaces/chemicals-and-substances/storage,-use-and-transport-of-hazardous-chemicals/asbestos">
                SafeWork SA, asbestos
              </a>
              ,{" "}
              <a href="https://www.safework.sa.gov.au/licence-and-registration/apply-renew/asbestos">
                asbestos licences
              </a>
              ,{" "}
              <a href="https://safework.sa.gov.au/notify/asbestos-removal">
                notification of asbestos removal
              </a>
              ,{" "}
              <a href="https://www.safework.sa.gov.au/news-and-alerts/safety-alerts/incident-alerts/2023/high-pressure-cleaning-leads-to-asbestos-contamination">
                incident alert on high-pressure cleaning
              </a>{" "}
              and{" "}
              <a href="https://www.epa.sa.gov.au/files/47711_guide_asbestos.pdf">
                EPA South Australia,{" "}
                <cite>
                  Wastes containing asbestos&mdash;removal, transport and
                  disposal
                </cite>{" "}
                (PDF)
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="substrate">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={asbestosCladdingReplacementGuide.image}
                alt={asbestosCladdingReplacementGuide.imageAlt}
                width={asbestosCladdingReplacementGuide.imageWidth}
                height={asbestosCladdingReplacementGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(asbestosCladdingReplacementGuide.image)}
              />
              <figcaption>
                {asbestosCladdingReplacementGuide.imageCaption}
              </figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Local context</span>
              <h2 id="substrate">
                Replacing asbestos cladding: what the wall underneath decides
              </h2>
              <p>
                Once the sheeting is gone and the area cleared, the frame is
                visible for the first time in sixty years, and that is when the
                real scope forms. Homes sheeted in this era are usually
                timber-framed. Expect some combination of members needing
                replacement, no sarking, no insulation, and window flashings
                that were never installed. None of it is visible beforehand, so
                a fixed price written before removal is an estimate carrying
                assumptions.
              </p>
              <p>
                Exposure then shapes the replacement system. Salt-laden air at
                Semaphore, Glenelg and Brighton is harder on fasteners and
                coatings than an inland suburb, and durability requirements
                follow the exposure category rather than the postcode. On the
                Hills Face side of town, bushfire-prone designation brings its
                own requirements&mdash;our{" "}
                <Link href="/resources/fibre-cement-vs-weatherboard-cladding-adelaide/">
                  cladding comparison guide
                </Link>{" "}
                explains how that zoning is confirmed, and the{" "}
                <Link href="/resources/cladding-maintenance-coastal-adelaide/">
                  coastal maintenance guide
                </Link>{" "}
                covers the upkeep that follows.
              </p>
              <p>
                Reactive clay soils across the Adelaide plains move seasonally,
                and a new finish on a frame that is still moving shows it at the
                joints. Where there is a history of movement, have it understood
                rather than covered&mdash;our{" "}
                <Link href="/resources/render-cracking-adelaide/">
                  guide to cracking in wall finishes
                </Link>{" "}
                sets out what to record.
              </p>
              <p>
                A rebuilt wall is also the chance to add a membrane and
                insulation, but those layers interact with drainage and must be
                designed together: the NCC condensation provisions apply to the
                whole assembly, not to the boards, and Adelaide sits in climate
                zone 5.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/10-health-and-amenity/part-108-condensation-management">
                  NCC 2022 Housing Provisions, Part 10.8 Condensation management
                </a>
                ,{" "}
                <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/7-roof-and-wall-cladding/part-75-timber-and-composite-wall-cladding">
                  Part 7.5 Timber and composite wall cladding
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

        <section className="section" aria-labelledby="approvals">
          <div className="shell prose article-prose">
            <h2 id="approvals">Approvals, scope and sequencing</h2>
            <p>
              In South Australia, whether planning consent is needed depends on
              how the work is categorised. Some work proceeds as accepted
              development with building consent only, but that category has
              exceptions&mdash;heritage areas and the Hills Face Zone among
              them&mdash;and re-cladding changes a building&rsquo;s external
              appearance, which is precisely what a character or heritage
              overlay concerns. Confirm the position for your allotment before
              material is ordered.
            </p>
            <p>
              Sequencing is where these jobs come unstuck commercially. The
              removalist&rsquo;s programme, the clearance certificate, any frame
              repairs and the cladding installation are four separate items, and
              the scaffold usually spans all of them. Settle in writing who pays
              for the scaffold, who reinstates downpipes, meter box and taps,
              who flashes the windows, and what happens to the price if the
              frame is worse than assumed. A provisional sum for frame repair is
              a more honest document than a fixed price renegotiated in week
              two.
            </p>
            <p>
              Our <Link href="/cladding/">Adelaide cladding installation</Link>{" "}
              work starts at a cleared, sound substrate, and{" "}
              <Link href="/render/">render</Link> is often part of the same
              elevation where the design mixes finishes. The{" "}
              <Link href="/projects/dark-feature-cladding/">
                dark feature cladding case study
              </Link>{" "}
              shows how much the joint layout and corners carry the finished
              look,{" "}
              <Link href="/project-planning/">our project planning notes</Link>{" "}
              list what is useful to have ready before quoting, and the{" "}
              <Link href="/locations/adelaide/">Adelaide service area page</Link>{" "}
              covers where we work.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval">
                PlanSA, find out if you need approval
              </a>{" "}
              and{" "}
              <a href="https://plan.sa.gov.au/development_applications/getting_approval/how_applications_are_assessed/types_of_consent">
                PlanSA, types of consent
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
                <h3>Have the material tested</h3>
                <p>
                  Get a sample analysed by an accredited laboratory before
                  anyone quotes, drills or disturbs the sheeting. The result
                  decides everything that follows.
                </p>
              </li>
              <li>
                <h3>Engage a licensed removalist directly</h3>
                <p>
                  Check the licence class against the area and the material,
                  and treat the notification and the clearance certificate as
                  deliverables rather than favours.
                </p>
              </li>
              <li>
                <h3>Photograph the exposed frame</h3>
                <p>
                  Once the wall is cleared, record the framing, any damage,
                  window openings and the ground line. That set is what a
                  replacement quote should be priced from.
                </p>
              </li>
              <li>
                <h3>Confirm the approval pathway</h3>
                <p>
                  Check the development category and any overlay on your
                  allotment before committing to a material, a colour or a
                  programme.
                </p>
              </li>
            </ol>

            <aside className="article-note article-note--warning">
              <strong>
                The replacement work has its own dust and height risks.
              </strong>
              <p>
                Modern fibre cement contains no asbestos, but cutting it dry
                generates respirable crystalline silica, which is regulated in
                South Australia. Most re-cladding also works above
                single-storey height. Confirm how dust and fall risks will be
                controlled before work starts.
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
          className="section"
          aria-labelledby="asbestos-cladding-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="asbestos-cladding-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="asbestos-cladding-faqs">
              <div className="faq-list__item">
                <dt>Can new cladding just go over the top of the old sheeting?</dt>
                <dd>
                  Covering asbestos sheeting leaves it in the building, where it
                  still has to be managed, disclosed and eventually removed, and
                  fixing through it disturbs the material. Where encapsulation
                  is considered at all, it is a decision for a licensed assessor
                  about that wall&mdash;not a way to avoid removal.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Do we have to do the whole house at once?</dt>
                <dd>
                  Not necessarily. Staging elevation by elevation spreads the
                  cost, but it means paying scaffold and removal mobilisation
                  more than once and living with two finishes in between.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Will the replacement look like the original?</dt>
                <dd>
                  Profiles close to mid-century flat sheet and cover strip are
                  available, as are weatherboard and panel systems that change
                  the character entirely. In a heritage or character overlay the
                  external appearance may be assessed, so check that before
                  choosing.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Who tells the neighbours?</dt>
                <dd>
                  A licensed removalist manages notification, signage and
                  exclusion zones. Telling adjoining neighbours what is
                  happening and when is still worth doing yourself, especially
                  on a narrow allotment.
                </dd>
              </div>
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>Government of South Australia</dt>
                <dd>
                  <a href="https://asbestos.sa.gov.au/in-your-home/homeowners">
                    Asbestos information for homeowners
                  </a>
                  ,{" "}
                  <a href="https://asbestos.sa.gov.au/in-your-home/find-and-identify-asbestos-in-the-home">
                    find and identify asbestos in the home
                  </a>
                  ,{" "}
                  <a href="https://plan.sa.gov.au/development_applications/before_you_lodge/find_out_if_you_need_approval">
                    PlanSA, find out if you need approval
                  </a>{" "}
                  and{" "}
                  <a href="https://plan.sa.gov.au/development_applications/getting_approval/how_applications_are_assessed/types_of_consent">
                    types of consent
                  </a>
                </dd>
              </div>
              <div>
                <dt>SafeWork SA</dt>
                <dd>
                  <a href="https://safework.sa.gov.au/workplaces/chemicals-and-substances/storage,-use-and-transport-of-hazardous-chemicals/asbestos">
                    Asbestos
                  </a>
                  ,{" "}
                  <a href="https://www.safework.sa.gov.au/licence-and-registration/apply-renew/asbestos">
                    asbestos licences
                  </a>
                  ,{" "}
                  <a href="https://safework.sa.gov.au/notify/asbestos-removal">
                    notification of asbestos removal
                  </a>
                  ,{" "}
                  <a href="https://www.safework.sa.gov.au/news-and-alerts/safety-alerts/incident-alerts/2023/high-pressure-cleaning-leads-to-asbestos-contamination">
                    incident alert on high-pressure cleaning
                  </a>
                  ,{" "}
                  <a href="https://safework.sa.gov.au/industry/construction/silica">
                    silica in construction
                  </a>{" "}
                  and{" "}
                  <a href="https://safework.sa.gov.au/industry/construction/working-at-heights">
                    working at heights
                  </a>
                </dd>
              </div>
              <div>
                <dt>EPA South Australia</dt>
                <dd>
                  <a href="https://www.epa.sa.gov.au/files/47711_guide_asbestos.pdf">
                    <cite>
                      Wastes containing asbestos&mdash;removal, transport and
                      disposal
                    </cite>{" "}
                    (PDF)
                  </a>
                </dd>
              </div>
              <div>
                <dt>
                  Asbestos and Silica Safety and Eradication Agency
                </dt>
                <dd>
                  <a href="https://www.asbestossafety.gov.au/about-asbestos">
                    About asbestos
                  </a>{" "}
                  and{" "}
                  <a href="https://www.asbestossafety.gov.au/about-asbestos/practical-guidance/householders-and-home-renovators">
                    guidance for householders and home renovators
                  </a>
                </dd>
              </div>
              <div>
                <dt>Australian Building Codes Board</dt>
                <dd>
                  <a href="https://ncc.abcb.gov.au/editions/ncc-2022/adopted/housing-provisions/7-roof-and-wall-cladding/part-75-timber-and-composite-wall-cladding">
                    NCC 2022 Housing Provisions, Part 7.5 Timber and composite
                    wall cladding
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
              <Link href="/resources/cladding-over-brick-adelaide/">
                Cladding over brick guide
              </Link>
              <Link href="/resources/fibre-cement-vs-weatherboard-cladding-adelaide/">
                Fibre cement or weatherboard?
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
        intro="If an asbestos removalist has cleared the wall, or you are working out the order of the job, tell us the suburb, the age of the house and what the elevations look like. Photographs of the exposed frame let us scope the replacement cladding accurately."
      />
      <CtaBand />
    </>
  );
}
