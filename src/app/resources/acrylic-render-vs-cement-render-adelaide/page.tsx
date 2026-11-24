import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import { CtaBand } from "@/components/CtaBand";
import {
  ArticleSchema,
  BreadcrumbSchema,
  FAQPageSchema,
} from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import { bannerImages } from "@/content/pages";
import { acrylicVsCementRenderGuide } from "@/content/resources";
import type { ServiceFaq } from "@/content/services";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: acrylicVsCementRenderGuide.metaTitle,
  description: acrylicVsCementRenderGuide.metaDescription,
  path: `/resources/${acrylicVsCementRenderGuide.slug}`,
  image: ogCard(acrylicVsCementRenderGuide.slug, acrylicVsCementRenderGuide.metaTitle),
  openGraphType: "article",
  publishedTime: acrylicVsCementRenderGuide.published,
  modifiedTime: acrylicVsCementRenderGuide.modified,
});

/** Rendered as the visible FAQ list and emitted as FAQPage structured data. */
const faqs: readonly ServiceFaq[] = [
  {
    question: "Is acrylic render vs cement render really an either/or choice?",
    answer:
      "Not always. Many systems use a cementitious base coat with a compatible acrylic texture topcoat over it, so the finished wall benefits from both.",
  },
  {
    question: "Which render type costs more?",
    answer:
      "It depends on the substrate preparation required, the specified system and the coverage needed, so it is not a fair like-for-like comparison unless you are working from itemised quotes for the same complete scope of work.",
  },
  {
    question: "Can render go over Hebel or fibre cement sheeting?",
    answer:
      "Yes, with a system matched to that substrate—see our guide to rendering Hebel panels for panel-specific detail.",
  },
  {
    question: "Can acrylic render go over existing cement render?",
    answer:
      "Often, provided the existing render is sound, well bonded and clean, and the acrylic system is documented for that surface. Hollow, cracked or damp areas need to be dealt with first, and a wall that has been painted needs its coating assessed before anything goes over it.",
  },
  {
    question: "Does acrylic render stop a wall cracking?",
    answer:
      "No. Its flexibility helps it tolerate minor movement better than a rigid cement render, but a crack caused by footing or structural movement will come through either system. The cause needs assessment before the finish is chosen.",
  },
  {
    question: "Which suits an older brick home?",
    answer:
      "It depends on the wall. Sound, unpainted brickwork is the substrate cement render was developed for, and an acrylic finish over a cement base is common. Painted brick, previous repairs or signs of salt damp change the answer, so the wall is assessed before a system is selected.",
  },
  {
    question: "Is the choice different for internal walls?",
    answer:
      "Inside, weather exposure drops out and the surface is seen up close, so the decision turns on the substrate, the flatness required and the finish wanted. The system still needs to be documented for the wall it is going on.",
  },
];

export default function AcrylicVsCementRenderGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Acrylic render vs cement render in Adelaide",
            href: `/resources/${acrylicVsCementRenderGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={acrylicVsCementRenderGuide} />
      <FAQPageSchema faqs={faqs} />

      <article>
        <PageBanner
          title={acrylicVsCementRenderGuide.title}
          image={bannerImages[`/resources/${acrylicVsCementRenderGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Acrylic render vs cement render in Adelaide" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{acrylicVsCementRenderGuide.category}</span>
              <time dateTime={acrylicVsCementRenderGuide.published}>
                Published {acrylicVsCementRenderGuide.publishedDisplay}
              </time>
              {acrylicVsCementRenderGuide.modifiedDisplay ? (
                <time dateTime={acrylicVsCementRenderGuide.modified}>
                  Updated {acrylicVsCementRenderGuide.modifiedDisplay}
                </time>
              ) : null}
              <span>{acrylicVsCementRenderGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              Deciding between acrylic render vs cement render shapes how a
              wall looks, how it handles movement and how long it lasts
              before it needs attention—yet plenty of quotes assume the
              choice has already been made. The two are not interchangeable
              finishes in different colours: one is a rigid, minerally
              cementitious base coat, the other a flexible, polymer-modified
              coating usually applied as part of a coordinated system. Get
              the choice wrong for the substrate, the exposure or the
              existing wall, and even a well-applied render can crack, stain
              or fail early. This guide sets out what separates the two
              systems and what an Adelaide project should confirm before
              specifying either.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>The system matters more than the label.</strong>
              <p>
                This guide explains the general differences between acrylic
                and cement render. It is not a substitute for the selected
                manufacturer&rsquo;s technical data sheet, and any wall
                showing active cracking or movement should be assessed by a
                suitably qualified professional before a new coating goes
                over it.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#at-a-glance">The comparison at a glance</a>
                </li>
                <li>
                  <a href="#what-separates-them">What actually differs</a>
                </li>
                <li>
                  <a href="#substrate-fit">Matching the system to the wall</a>
                </li>
                <li>
                  <a href="#adelaide-conditions">Why Adelaide conditions matter</a>
                </li>
                <li>
                  <a href="#upkeep">Upkeep, repair and recoating</a>
                </li>
                <li>
                  <a href="#next-steps">Sensible next steps</a>
                </li>
                <li>
                  <a href="#who-to-call">Who should be involved</a>
                </li>
                <li>
                  <a href="#faqs-and-sources">Questions and sources</a>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="at-a-glance">
          <div className="shell prose article-prose">
            <h2 id="at-a-glance">Acrylic vs cement render at a glance</h2>
            <p>
              Read these as the general tendencies of each family, not as the
              specification of any one product. The selected
              manufacturer&rsquo;s technical data sheet decides what a
              particular system can do on a particular wall.
            </p>
            <dl className="faq-list professional-list">
              <div className="faq-list__item">
                <dt>What it is</dt>
                <dd>
                  Cement render is cement, sand and water, mixed and applied
                  over masonry in one or more coats. Acrylic render is a
                  pre-mixed, polymer-based coating, usually applied as one
                  layer of a coordinated system.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Movement tolerance</dt>
                <dd>
                  Cement render sets hard and rigid, so it is more likely to
                  show hairline cracking when the wall behind it moves.
                  Acrylic render has some flexibility and copes better with
                  minor movement. Neither bridges structural cracking or
                  stands in for a movement joint.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Substrates it suits</dt>
                <dd>
                  Cement render was developed for bare masonry such as brick,
                  block and stone. Acrylic systems are formulated for a wider
                  range of prepared surfaces, including fibre cement sheeting
                  and some previously painted walls, where the system
                  documents allow it.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Application and curing</dt>
                <dd>
                  Cement render is mixed on site and has to cure, so the mix,
                  the coat thickness and the curing conditions all shape the
                  result. Acrylic render arrives pre-mixed and dries rather
                  than cures, inside the temperature and weather limits on its
                  data sheet.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Finish and colour</dt>
                <dd>
                  A cement render is commonly finished with a separate texture
                  coat or paint system over the top. Acrylic texture coats
                  come in grades from smooth to coarse and can carry the
                  colour in the coating itself.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Upkeep</dt>
                <dd>
                  Both need periodic washing and eventual recoating, on a
                  cycle set by the system, the colour and the exposure rather
                  than by the render type alone.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Used together</dt>
                <dd>
                  Often. A cementitious base coat levelled over masonry with a
                  compatible acrylic texture coat on top is a common
                  documented combination, so the real question is usually
                  which system, not which material.
                </dd>
              </div>
            </dl>
            <p>
              The texture itself is a separate decision that sits on top of
              the system. Our guide to{" "}
              <Link href="/resources/render-finishes-adelaide/">
                render finishes in Adelaide
              </Link>{" "}
              covers where smooth, sand float and textured render are each
              used. And if you are comparing prices for the two, the guide to{" "}
              <Link href="/resources/what-affects-cladding-render-quotes-adelaide/">
                what affects a cladding or render quote
              </Link>{" "}
              explains why preparation and access usually move a quote more
              than the product does.
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="what-separates-them">
          <div className="shell prose article-prose">
            <h2 id="what-separates-them">
              Acrylic render vs cement render: what actually separates them
            </h2>
            <p>
              Traditional cement render—sometimes called sand-and-cement or
              solid render—is built from cement, sand and water, mixed to a
              workable consistency and applied over masonry in one or more
              coats. It hardens into a hard, minerally bonded layer that
              becomes part of the wall rather than sitting as a separate
              skin. Because it is rigid, it does not tolerate movement well:
              as a substrate expands, contracts or settles, a straight
              cement render is more likely to develop hairline cracking than
              a flexible system, particularly where the mix, coat thickness
              or curing has not followed the specified process.
            </p>
            <h3>Where acrylic render differs</h3>
            <p>
              Acrylic render—also called polymer render—is a pre-mixed,
              water-based coating built around acrylic polymers rather than
              cement alone. Manufacturers such as Rockcote formulate acrylic
              base coats specifically for surfaces where movement tolerance
              and adhesion matter, including fibre cement sheeting and
              previously painted walls, and the polymer content lets the
              coating flex slightly rather than crack outright under minor
              substrate movement.
            </p>
            <p>
              The two are not always a strict either/or choice. Systems such
              as Dulux Acratex build a cementitious base coat first—to level
              the masonry and produce an even surface—then finish with a
              compatible acrylic texture coating over the top, so the
              finished wall benefits from both the cement base&rsquo;s
              strength and the acrylic topcoat&rsquo;s flexibility and
              protection. Which combination suits a given wall depends on
              the substrate, the exposure and the finish specified, so ask
              your render contractor to confirm the full system—not just the
              top layer—against the manufacturer&rsquo;s technical data
              sheet.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://rockcote.com.au/what-are-the-different-types-of-render-a-homeowners-guide/">
                Rockcote, What Are The Different Types of Render? A
                Homeowner&rsquo;s Guide
              </a>{" "}
              and{" "}
              <a href="https://www.dulux.com.au/specifier/products/acratex-render/">
                Dulux Acratex, Acratex Render
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="substrate-fit">
          <div className="shell prose article-prose">
            <h2 id="substrate-fit">Matching the render system to the wall</h2>
            <p>
              Not every wall takes a straight cement render happily, and not
              every wall needs the flexibility acrylic render provides.
            </p>
            <p>
              Bare masonry—brick, besser block or stone—is the substrate
              cement render was developed for; it bonds mechanically into
              the surface and, correctly cured, becomes a stable base for a
              topcoat. Fibre cement sheeting behaves differently, moving and
              flexing with temperature in a way a rigid mix does not
              accommodate well, which is why Rockcote formulates dedicated
              acrylic base coats for it rather than a straight cement mix.
            </p>
            <p>
              Hebel (AAC) panel walls need a coating system matched to the
              panel manufacturer&rsquo;s specification and control-joint
              layout—our guide to{" "}
              <Link href="/resources/rendering-hebel-panels-adelaide/">
                rendering Hebel panels in Adelaide
              </Link>{" "}
              covers what that involves. Previously painted brick needs the
              existing coating&rsquo;s condition assessed before either
              render type goes over it, covered in our guide to{" "}
              <Link href="/resources/rendering-over-painted-brick-adelaide/">
                rendering over painted brick
              </Link>
              .
            </p>
            <p>
              Where render is going over an existing rendered or painted
              wall that is already cracking, the cause needs to be
              understood before a new coating is applied on top of it. Our
              guide to{" "}
              <Link href="/resources/render-cracking-adelaide/">
                render cracking in Adelaide
              </Link>{" "}
              covers the signs that need assessment first.
            </p>
            <p>
              Whichever system is selected, the preparation under it decides
              how well it performs. A sound, clean, dry substrate with its
              movement joints in the right places matters more than the name
              on the bucket&mdash;our guide to{" "}
              <Link href="/resources/preparing-walls-for-render-adelaide/">
                preparing walls for render
              </Link>{" "}
              sets out what has to be confirmed before the first coat.
            </p>
            <p>
              Internal walls follow the same logic with the weather taken
              out. The surface is seen at close range and has to meet joinery,
              floors and ceilings cleanly, so flatness and the junction
              details tend to drive the choice. The{" "}
              <Link href="/resources/internal-rendering-adelaide/">
                internal rendering guide
              </Link>{" "}
              covers what to confirm indoors.
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="adelaide-conditions">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={acrylicVsCementRenderGuide.image}
                alt={acrylicVsCementRenderGuide.imageAlt}
                width={acrylicVsCementRenderGuide.imageWidth}
                height={acrylicVsCementRenderGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(acrylicVsCementRenderGuide.image)}
              />
              <figcaption>{acrylicVsCementRenderGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Local context</span>
              <h2 id="adelaide-conditions">Why Adelaide conditions matter</h2>
              <p>
                Across the Adelaide Plains—through suburbs such as
                Salisbury, Elizabeth and much of the northern and western
                suburbs—reactive clay soils mean the ground moves seasonally
                as it wets and dries, and that movement transmits into
                footings and walls over time. A flexible acrylic system
                tolerates that kind of minor, ongoing movement better than a
                rigid cement render on its own, which is one reason acrylic
                topcoats are common even over a cement base coat in
                established Adelaide suburbs.
              </p>
              <p>
                Coastal exposure changes the calculation again. Homes near
                Semaphore, Glenelg, Henley Beach and Brighton sit in a
                higher salt-exposure environment, and the coating&rsquo;s
                role shifts toward protecting the substrate from moisture
                and chloride ingress as much as covering it. Adelaide&rsquo;s
                hot, dry summers matter too: a cement-based coat curing too
                fast in full sun and low humidity is a common cause of
                shrinkage cracking, so application timing and the
                manufacturer&rsquo;s curing guidance matter as much as the
                product choice itself.
              </p>
              <h3>Older masonry and salt damp</h3>
              <p>
                Many established Adelaide homes are solid brick or stone, and
                some show salt damp near the base of the wall. Where it is
                present, acrylic or cement is the wrong place to start:
                neither render fixes the moisture behind it, and coating over
                it usually makes the damage worse. Our guide to{" "}
                <Link href="/resources/salt-damp-adelaide/">
                  salt damp in Adelaide homes
                </Link>{" "}
                covers what has to be assessed before any render is
                considered.
              </p>
              <h3>Coastal elevations</h3>
              <p>
                Near the gulf the coating is the layer taking the salt and
                the wind, so the system&rsquo;s documented exposure limits,
                the colour and the washing routine matter more than the label
                on the base coat. The{" "}
                <Link href="/locations/coastal-adelaide/">
                  coastal Adelaide page
                </Link>{" "}
                explains how we plan render around those conditions.
              </p>
              <h3>Summer programmes</h3>
              <p>
                Heat affects both systems on the day of application.
                Cement-based coats need time and moisture to cure; acrylic
                coats dry, and hot wind shortens the time available to work
                the texture evenly. Each product&rsquo;s data sheet sets its
                temperature and weather limits, and a summer programme should
                be built around those limits rather than around the calendar.
              </p>
              <p className="article-source">
                Sources:{" "}
                <a href="https://research.csiro.au/infratech/wp-content/uploads/sites/38/2024/12/2979_FoundationMaintenanceandFootingPerformance_WCAG.pdf">
                  CSIRO,{" "}
                  <cite>Foundation Maintenance and Footing Performance</cite>
                </a>{" "}
                and{" "}
                <a href="https://www.dulux.com.au/specifier/products/acratex/overview/">
                  Dulux Acratex, High Performance Coating Solutions overview
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="upkeep">
          <div className="shell prose article-prose">
            <h2 id="upkeep">Upkeep, repair and recoating</h2>
            <p>
              Neither system is finished the day the scaffold comes down.
              What differs is where the maintenance sits and how a repair
              blends in.
            </p>

            <h3>Washing and routine care</h3>
            <p>
              Acrylic finishes and painted cement render both collect dust,
              salt and organic growth, and both are looked after by regular
              inspection and gentle washing to the manufacturer&rsquo;s
              documented method. The Rockcote maintenance guide ties
              maintenance cycles to colour choice, exposure, application
              quality and location, and notes that dark colours and coastal
              environments may need repainting more often. That holds
              whichever render sits underneath.
            </p>

            <h3>Patching and blending a repair</h3>
            <p>
              A rigid cement render that has cracked or come away is cut back
              and patched with a compatible repair render, then the texture
              and coating are made good over the top. An acrylic texture is
              patched by matching its grade and profile by hand. Either way, a
              patch in the middle of an elevation tends to show in low light,
              which is why sound repairs are normally taken out to a corner,
              an opening or a joint. Our{" "}
              <Link href="/resources/render-repair-adelaide/">
                render repair guide
              </Link>{" "}
              explains how to tell a patch from a partial or full re-render,
              and why the cause comes first.
            </p>

            <h3>Recoating down the track</h3>
            <p>
              Sooner or later the surface is recoated rather than re-rendered.
              What can go over the existing finish depends on what that
              finish is, how well it is still bonded and what the new coating
              system is documented for&mdash;an unknown older coating usually
              means test areas and preparation before a specification is
              settled. The guide to{" "}
              <Link href="/resources/repainting-render-adelaide/">
                repainting rendered walls
              </Link>{" "}
              works through that assessment.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://rockcote.com.au/wp-content/uploads/2020/09/ROCKCOTE_Maintenance_Guide_opt.pdf">
                Rockcote maintenance guide (PDF)
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
                <h3>Identify the substrate and its condition</h3>
                <p>
                  Confirm whether the wall is bare masonry, fibre cement,
                  Hebel or an existing coating, and whether that surface is
                  sound enough to render over.
                </p>
              </li>
              <li>
                <h3>Match the system to the exposure</h3>
                <p>
                  Check the manufacturer&rsquo;s technical data sheet for
                  the substrate and exposure combination—coastal salt air
                  and inland heat call for different system specifications.
                </p>
              </li>
              <li>
                <h3>Confirm the full system, not just the topcoat</h3>
                <p>
                  The base coat, any reinforcing and the topcoat need to be
                  a compatible, documented system rather than mismatched
                  products chosen on colour alone.
                </p>
              </li>
              <li>
                <h3>Get the scope and warranty terms in writing</h3>
                <p>
                  Confirm which applicator is carrying out the work, what
                  system warranty applies, and what upkeep keeps that
                  warranty valid.
                </p>
              </li>
            </ol>

            <TickList
              items={[
                "Substrate identified and its condition confirmed before a system is chosen",
                "Manufacturer technical data sheet for the specific base coat and topcoat combination",
                "Written confirmation the system suits the property's coastal or inland exposure",
                "Whether the coating is being installed by a manufacturer-trained applicator",
                "What warranty applies to the complete system, not just one product",
                "How the new render meets existing render, cladding or trim junctions",
              ]}
            />

            <aside className="article-note article-note--warning">
              <strong>Don&rsquo;t judge a render system by its colour swatch.</strong>
              <p>
                A colour or texture sample says nothing about whether the
                underlying system suits your wall. Confirm the full
                specification—including primer, base coat and any
                reinforcing mesh—against the manufacturer&rsquo;s technical
                data sheet before work starts, particularly on a wall that
                has cracked or moved before.
              </p>
            </aside>
            <p>
              Our{" "}
              <Link href="/project-planning/">project planning guide</Link>{" "}
              lists the site details, photographs and documents that are
              useful to have ready before a render system is quoted.
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="who-to-call">
          <div className="shell prose article-prose">
            <h2 id="who-to-call">Who should be involved</h2>
            <dl className="faq-list professional-list">
              <div className="faq-list__item">
                <dt>Render applicator</dt>
                <dd>
                  Applies the confirmed base coat and topcoat system to the
                  manufacturer&rsquo;s specification for the substrate and
                  exposure.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Manufacturer technical support</dt>
                <dd>
                  Confirms which base coat and topcoat combination suits
                  your substrate and exposure category, and what warranty
                  applies to the full system.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Structural engineer</dt>
                <dd>
                  Needed only where existing cracking suggests ongoing
                  structural movement beyond what a flexible coating is
                  designed to tolerate.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Elite Surface Group render team</dt>
                <dd>
                  Assesses the existing wall, recommends a system suited to
                  the substrate and Adelaide exposure, and coordinates
                  preparation through to the finished coat.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          id="faqs-and-sources"
          className="section"
          aria-labelledby="render-comparison-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="render-comparison-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="render-comparison-faqs">
              {faqs.map((faq) => (
                <div className="faq-list__item" key={faq.question}>
                  <dt>{faq.question}</dt>
                  <dd>{faq.answer}</dd>
                </div>
              ))}
            </dl>

            <h2 id="sources">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>Rockcote</dt>
                <dd>
                  <a href="https://rockcote.com.au/what-are-the-different-types-of-render-a-homeowners-guide/">
                    What Are The Different Types of Render? A Homeowner&rsquo;s
                    Guide
                  </a>
                  ,{" "}
                  <a href="https://rockcote.com.au/product/polymer-render-grey/">
                    Polymer Render Grey
                  </a>{" "}
                  and the{" "}
                  <a href="https://rockcote.com.au/wp-content/uploads/2020/09/ROCKCOTE_Maintenance_Guide_opt.pdf">
                    maintenance guide (PDF)
                  </a>
                </dd>
              </div>
              <div>
                <dt>Dulux Acratex</dt>
                <dd>
                  <a href="https://www.dulux.com.au/specifier/products/acratex-render/">
                    Acratex Render
                  </a>{" "}
                  and{" "}
                  <a href="https://www.dulux.com.au/specifier/products/acratex/overview/">
                    High Performance Coating Solutions overview
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
            </dl>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/render/">Adelaide rendering services</Link>
              <Link href="/resources/render-finishes-adelaide/">
                Render finishes and textures
              </Link>
              <Link href="/resources/preparing-walls-for-render-adelaide/">
                Preparing walls for render
              </Link>
              <Link href="/resources/render-repair-adelaide/">
                Render repair or re-render?
              </Link>
              <Link href="/resources/repainting-render-adelaide/">
                Repainting rendered walls
              </Link>
              <Link href="/projects/two-storey-exterior-render/">
                Two-storey exterior render project
              </Link>
              <Link href="/locations/adelaide/">Adelaide service area</Link>
              <Link href="/contact-us/#contact">
                Discuss your render project
              </Link>
            </nav>
          </div>
        </section>
      </article>

      <ContactSection
        defaultService="Render"
        intro="Tell us the wall's substrate, its condition and the property's exposure—coastal or inland—and we'll recommend a render system to confirm before you commit to one."
      />
      <CtaBand />
    </>
  );
}
