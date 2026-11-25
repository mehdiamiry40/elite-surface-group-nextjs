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
import { quoteDriversGuide } from "@/content/resources";
import type { ServiceFaq } from "@/content/services";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: quoteDriversGuide.metaTitle,
  description: quoteDriversGuide.metaDescription,
  path: `/resources/${quoteDriversGuide.slug}`,
  image: ogCard("services", quoteDriversGuide.metaTitle),
  openGraphType: "article",
  publishedTime: quoteDriversGuide.published,
  modifiedTime: quoteDriversGuide.modified,
});

/** Rendered below and emitted as FAQPage schema, so the two cannot drift. */
const faqs: readonly ServiceFaq[] = [
  {
    question: "Why doesn’t this site publish prices or rates?",
    answer:
      "Because a rate without the wall behind it is a guess. Substrate condition, access, the specified system, the number of junctions and the site’s exposure all change the work involved, and they differ on every project. A quote prepared from the actual details is more useful than a published figure that fits none of them.",
  },
  {
    question: "Can I get a quote from photos alone?",
    answer:
      "Photos are a useful start, particularly for an existing building, and they often show enough to identify the open questions. Whether they are enough for a firm quote depends on the system and the complexity of the work. Drawings, measurements or a site review may still be needed before the scope can be confirmed.",
  },
  {
    question: "Am I committed to anything by asking for a quote?",
    answer:
      "No. Our quotes are obligation-free. Tell us about the project and what information is available, and we will review the details before preparing one.",
  },
  {
    question: "Why are two quotes for the same wall so far apart?",
    answer:
      "Usually because they describe different jobs. One may allow for preparation, access equipment, flashings or a final coating that the other leaves to someone else, or the two may be based on different products. Line up the system, the scope boundaries and the assumptions before comparing the totals.",
  },
  {
    question: "What happens if something unexpected is found once work starts?",
    answer:
      "That depends on what was agreed. A quote for an existing building is based on what can be seen or reasonably assumed, so ask before work starts how a discovery will be reported, how any extra work will be priced and who approves it before it proceeds. Having that in writing protects both sides.",
  },
];

export default function QuoteDriversGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "What affects a quote",
            href: `/resources/${quoteDriversGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={quoteDriversGuide} />
      <FAQPageSchema faqs={faqs} />

      <article>
        <PageBanner
          title={quoteDriversGuide.title}
          image={bannerImages[`/resources/${quoteDriversGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "What affects a quote" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{quoteDriversGuide.category}</span>
              <time dateTime={quoteDriversGuide.published}>
                Published {quoteDriversGuide.publishedDisplay}
              </time>
              <span>{quoteDriversGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              There is no price list on this site, and that is deliberate. A
              cladding, render, Hebel or walling quote is built from the wall in
              question: what it is made of, how much of it there is, how it is
              reached, which system is specified and how many junctions that
              system has to be worked around. Two walls of the same size can be
              very different jobs. This guide sets out what moves a quote, and
              which scope questions to settle so the figure you receive
              describes the work you actually want.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>
                No rates, ranges or ballpark figures appear in this guide.
              </strong>
              <p>
                A number published without the wall behind it would be a guess,
                and a guess does not help anyone plan a project. Elite Surface
                Group prepares obligation-free quotes from the project details.
                This guide describes what those details are and why they
                matter; it is not a quote, an offer or a list of standard
                inclusions.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#what-a-quote-needs">What a quote starts from</a>
                </li>
                <li>
                  <a href="#drivers">What moves a quote</a>
                </li>
                <li>
                  <a href="#by-service">Service by service</a>
                </li>
                <li>
                  <a href="#scope">Inside or outside the scope</a>
                </li>
                <li>
                  <a href="#comparing">Comparing quotes fairly</a>
                </li>
                <li>
                  <a href="#unknowns">Variations and unknowns</a>
                </li>
                <li>
                  <a href="#next-steps">Sensible next steps</a>
                </li>
                <li>
                  <a href="#faqs-and-sources">Questions and further reading</a>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="what-a-quote-needs"
        >
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={quoteDriversGuide.image}
                alt={quoteDriversGuide.imageAlt}
                width={quoteDriversGuide.imageWidth}
                height={quoteDriversGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(quoteDriversGuide.image)}
              />
              <figcaption>{quoteDriversGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Before the number</span>
              <h2 id="what-a-quote-needs">
                What a quote usually needs to start from
              </h2>
              <p>
                Every quote starts from the same five things, whatever the
                service: where the project is, how much wall is involved, what
                that wall is built from, which system or finish is wanted, and
                when the work needs to happen. The more of those that are known,
                the fewer assumptions the quote has to carry.
              </p>
              <p>
                Location comes first because it decides whether we can take the
                work on. We are based in Salisbury East and metropolitan
                Adelaide is our primary service area; projects elsewhere in
                South Australia are assessed individually, so tell us the suburb
                or postcode and we will confirm coverage before quoting. The{" "}
                <Link href="/locations/">service areas page</Link> explains how
                that works.
              </p>
              <p>
                Size and shape come from drawings, elevations or measurements.
                What the wall is built from, and what condition it is in,
                usually comes from photographs and a description on an existing
                building, or from the specification on a new one. You do not
                need all of it to start a conversation. Our{" "}
                <Link href="/project-planning/">project planning guide</Link>{" "}
                lists what is useful to gather and what we review before
                quoting, so this guide does not repeat that checklist.
              </p>
              <p>
                What matters here is the principle: anything a quote does not
                know, it has to assume. An assumption that turns out to be wrong
                is where a price moves after work has started, so a slower,
                better-informed quote is usually the more reliable one.
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="drivers">
          <div className="shell prose article-prose">
            <h2 id="drivers">What actually moves a quote</h2>
            <p>
              None of the factors below has a fixed weight. On one job access
              decides most of the scope; on the next it is the condition of the
              wall. They are set out so you can see which ones apply to your
              project.
            </p>

            <h3>Scope and area</h3>
            <p>
              How much wall is being covered is the obvious starting point, but
              the shape of the work matters as much as the total. One long,
              uninterrupted elevation is a different job from the same area
              split across several small returns, an upper-level feature and a
              garage front. Setting up, reaching the work and finishing every
              edge do not shrink in step with the area, which is why a small or
              fragmented job is not simply a scaled-down version of a large one.
            </p>

            <h3>Substrate condition and preparation</h3>
            <p>
              The finish is the visible part; the preparation is often most of
              the work. A new, sound substrate built for the system specified
              needs far less done to it than an existing wall with old coatings,
              cracks, hollow-sounding render or uneven surfaces. Our guide to{" "}
              <Link href="/resources/preparing-walls-for-render-adelaide/">
                preparing walls for render
              </Link>{" "}
              sets out what has to be right first, and the{" "}
              <Link href="/resources/render-repair-adelaide/">
                render repair guide
              </Link>{" "}
              explains how a patch, a partial re-render and a full strip-back
              differ. Each is a different amount of labour before any new finish
              goes on.
            </p>

            <h3>The system and finish specified</h3>
            <p>
              Products and systems are not interchangeable line items. A facade
              system is more than the visible panels or boards: it usually
              includes the framing or battens, fixings, flashings and junction
              details set out in the manufacturer&rsquo;s installation guide,
              and those differ between systems. Our{" "}
              <Link href="/resources/fibre-cement-cladding-adelaide/">
                fibre cement cladding guide
              </Link>{" "}
              shows how much sits behind the board. Render works the same way.
              Preparation, the number of coats and the flatness the chosen grade
              demands usually move a quote more than the texture product does,
              as the{" "}
              <Link href="/resources/render-finishes-adelaide/">
                render finishes guide
              </Link>{" "}
              explains. Where a system has not been chosen yet, say so; the
              quote can then state what it has assumed.
            </p>

            <h3>Access, height and site constraints</h3>
            <p>
              Work reached from the ground is simpler than work on an upper
              storey, a parapet or a wall above a roof. Most exterior work on a
              two-storey building happens at height, and work at height is a
              regulated safety matter in South Australia, so scaffold or other
              access equipment becomes part of the job: who provides it, where
              it can stand and how long it stays. Narrow side boundaries,
              sloping blocks, established gardens, neighbouring properties and
              limited room for deliveries all change how the work is set up.
            </p>

            <h3>Junctions and detail density</h3>
            <p>
              A plain wall is mostly area. A wall full of windows, doors,
              corners, parapets, meter boxes and penetrations is mostly edges,
              and edges are where the time goes. Every opening needs its
              flashings, beads, trims or returns formed and aligned, and every
              change of material needs a designed junction. Two elevations of
              equal size can differ widely for this reason alone, which is why
              drawings or photographs that show the openings are more useful
              than a single area figure.
            </p>

            <h3>Exposure</h3>
            <p>
              Site exposure changes the specification before it changes the
              quote. Many systems are suitable for coastal or wind-exposed sites
              when the product, fixings and detailing are specified for those
              conditions, and those requirements come from the
              manufacturer&rsquo;s documents for the system rather than from the
              postcode. A site in a designated bushfire-prone area may need a
              Bushfire Attack Level assessment, arranged through the designer or
              a bushfire consultant, before the cladding and the rest of the
              external wall can be finalised. A different specification is a
              different job to price.
            </p>

            <h3>New build, existing building or occupied property</h3>
            <p>
              On a new build the substrate is usually new, access is open and a
              builder is coordinating the trades. An existing building adds what
              is already there: old finishes to work over or remove, services
              fixed to the wall, paving and gardens to protect. Replacing a
              facade adds removal, disposal and whatever is found behind the old
              material, which the{" "}
              <Link href="/resources/facade-recladding-adelaide/">
                facade recladding guide
              </Link>{" "}
              covers. An occupied home or an operating business adds protection,
              staging and a tidy site at the end of each day to the scope.
            </p>

            <h3>Programme, staging and other trades</h3>
            <p>
              A job completed in one continuous visit is simpler than one split
              into stages around other trades. If the wall is not ready when the
              start date arrives, or the work has to stop while windows, roofing
              or services are finished, return visits become part of the scope.
              Tell us what the programme depends on, and ask how the quote
              treats delays that are outside either party&rsquo;s control.
            </p>

            <h3>Who supplies the materials</h3>
            <p>
              Materials can be supplied by the installer, the builder or the
              owner. Each arrangement is workable, but each changes what the
              quote contains and who is responsible for quantities, delivery,
              storage on site and any shortfall. A quote should say which
              arrangement it is based on.
            </p>
            <p className="article-source">
              Source:{" "}
              <a href="https://safework.sa.gov.au/industry/construction/working-at-heights">
                SafeWork SA, working at heights
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="by-service">
          <div className="shell prose article-prose">
            <h2 id="by-service">The questions that move each type of work</h2>
            <p>
              The same drivers apply across our four services, but each has its
              own short list of questions that tend to decide the scope.
            </p>

            <h3>Cladding and facade installation</h3>
            <p>
              Which system and profile is specified, and what does it fix to: a
              new frame, or an existing wall that needs battens and a cavity? Is
              old cladding being removed first, and by whom? Who supplies and
              installs the membrane, flashings and trims? How exposed is the
              site, how high is the work and how many openings and corners does
              each elevation have? Our{" "}
              <Link href="/cladding/">cladding and facade installation</Link>{" "}
              page explains how we approach those details.
            </p>

            <h3>Render</h3>
            <p>
              What is the wall built from, and what is on it now? How much
              preparation or repair is needed before a finish can go on? Which
              system is specified, from base coat to final coating, and in which
              finish grade? Is the work internal, external or both, and who
              applies any paint or topcoat that follows? Our{" "}
              <Link href="/render/">rendering services</Link> page covers how
              that scope is put together.
            </p>

            <h3>Hebel</h3>
            <p>
              Which documented Hebel system do the drawings show, and are the
              engineering and installation details available? Who supplies the
              panels and accessories? How many openings, penetrations and
              control joints are there, how do panels reach the work area, and
              which trade applies the coating system afterwards? The{" "}
              <Link href="/hebel/">Hebel installation</Link> page and our guide
              to{" "}
              <Link href="/resources/choosing-a-hebel-installer-adelaide/">
                choosing a Hebel installer
              </Link>{" "}
              set out what to confirm.
            </p>

            <h3>Walling</h3>
            <p>
              Is the work internal, external or both, and which wall system is
              on the drawings? How many openings are there, and how are services
              being coordinated through the walls? Is walling being quoted by
              itself, or as a package with render or cladding so one team
              carries the junctions between them? Our{" "}
              <Link href="/walling/">walling services</Link> page explains how
              that work is planned.
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="scope">
          <div className="shell prose article-prose">
            <h2 id="scope">Inside or outside the scope: the questions to ask</h2>
            <p>
              A quote is a description of work with a number attached, and the
              description matters more. Most disagreements about price turn out
              to be disagreements about who was doing what. These questions have
              no universal answer, so they are worth asking of every quote,
              including ours:
            </p>
            <TickList
              items={[
                "Who supplies the materials, and are they named by product and system?",
                "Who prepares the substrate, and what condition does the quote assume it will be in?",
                "Who provides scaffold or other access equipment, and for how long?",
                "Who installs the membranes, battens, flashings, beads and sealant at each junction?",
                "Who removes and disposes of existing material, and who deals with what is found behind it?",
                "Who applies the final coating or paint, and who is responsible for each layer?",
                "Who makes good to adjoining finishes such as window frames, paving, floors or paintwork?",
                "Who protects the surrounding property, and who cleans up and removes waste?",
                "Who arranges any approval, engineering or certification the work needs?",
              ]}
            />
            <p>
              This is a list of questions, not a list of what any quote
              includes. The answers depend on the project and on what is agreed.
              Our <Link href="/project-planning/">project planning guide</Link>{" "}
              sets out what our own written quotes explain, including the agreed
              scope, material responsibilities, key assumptions and known
              exclusions.
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="comparing">
          <div className="shell prose article-prose">
            <h2 id="comparing">Comparing two quotes fairly</h2>
            <p>
              Two quotes can only be compared when they describe the same job.
              Before looking at the totals, check three things.
            </p>

            <h3>The same system</h3>
            <p>
              Both quotes should name the product or system they are based on. A
              quote for one cladding or render system is not comparable with a
              quote for another, even when the finished wall would look similar
              from the street.
            </p>

            <h3>The same scope boundaries</h3>
            <p>
              Run both quotes through the questions above. If one allows for
              preparation, access equipment, flashings or a final coating and
              the other leaves them to someone else, the lower figure is not
              cheaper. It describes a smaller job, and the remainder still has
              to be paid for somewhere.
            </p>

            <h3>The same assumptions</h3>
            <p>
              Each quote assumes something about the condition of the wall, the
              access available and the programme. Where those assumptions
              differ, ask both parties to quote on the same basis, or ask what
              would change if the assumption proved wrong.
            </p>
            <p>
              The lowest number is sometimes the right choice. It is the right
              choice when it describes the same system, the same scope and the
              same assumptions as the others, and not otherwise.
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="unknowns">
          <div className="shell prose article-prose">
            <h2 id="unknowns">Variations and what old finishes can hide</h2>
            <p>
              A quote for an existing building is based on what can be seen or
              reasonably assumed. Behind old cladding there may be a frame, a
              membrane or an earlier repair in a different condition from the
              one expected. Behind paint or render there may be hollow areas,
              damp or patches that only show once preparation starts. Old fibro
              sheeting has to be identified before anyone disturbs it; our guide
              to{" "}
              <Link href="/resources/asbestos-cladding-replacement-adelaide/">
                replacing asbestos cladding
              </Link>{" "}
              explains why that comes first.
            </p>
            <p>
              None of that can be priced accurately in advance, so the useful
              step is to agree how it will be handled. Settle these in writing
              before work starts:
            </p>
            <TickList
              items={[
                "What the quote assumes about the parts of the wall that cannot be seen",
                "How a discovery will be reported, and whether work pauses while it is assessed",
                "How additional work will be priced, and who approves it before it proceeds",
                "What happens to the programme if another professional needs to assess the building",
              ]}
            />
            <p>
              Changes you ask for part-way through are variations too. A
              different finish, another elevation or a revised colour after
              materials are ordered each change the scope, and the same written
              process should apply.
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="next-steps">
          <div className="shell prose article-prose">
            <h2 id="next-steps">Sensible next steps</h2>
            <ol className="steps">
              <li>
                <h3>Describe the outcome, not only the product</h3>
                <p>
                  Say what you want the wall to do and look like, and name a
                  product or system if one has been chosen. Where it has not,
                  the quote should state what it assumed.
                </p>
              </li>
              <li>
                <h3>Gather what describes the wall</h3>
                <p>
                  Drawings or measurements, current photographs and a note of
                  what the wall is built from cover most first conversations.
                  The project planning guide lists the rest.
                </p>
              </li>
              <li>
                <h3>Decide what you want in the scope</h3>
                <p>
                  Work out whether you want one trade to carry preparation,
                  access, junctions and the final coating, or whether others are
                  already doing parts of it.
                </p>
              </li>
              <li>
                <h3>Ask every quoter the same questions</h3>
                <p>
                  Give each party the same information and the same scope
                  questions, so the answers can be laid side by side.
                </p>
              </li>
              <li>
                <h3>Get assumptions and exclusions in writing</h3>
                <p>
                  A clear quote says what it includes, what it assumes and what
                  it leaves out. Read those lines before the total.
                </p>
              </li>
            </ol>
            <p>
              When you are ready,{" "}
              <Link href="/contact-us/#contact">tell us about the project</Link>{" "}
              and what plans or photos are available. Quotes are
              obligation-free.
            </p>
          </div>
        </section>

        <section
          id="faqs-and-sources"
          className="section"
          aria-labelledby="quote-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="quote-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="quote-faqs">
              {faqs.map((faq) => (
                <div key={faq.question} className="faq-list__item">
                  <dt>{faq.question}</dt>
                  <dd>{faq.answer}</dd>
                </div>
              ))}
            </dl>

            <h2 id="further-reading">Sources and further reading</h2>
            <dl className="source-list">
              <div>
                <dt>SafeWork SA</dt>
                <dd>
                  <a href="https://safework.sa.gov.au/industry/construction/working-at-heights">
                    Working at heights
                  </a>
                </dd>
              </div>
              <div>
                <dt>Planning an enquiry</dt>
                <dd>
                  <Link href="/project-planning/">Project planning guide</Link>{" "}
                  and <Link href="/locations/">service areas</Link>
                </dd>
              </div>
              <div>
                <dt>Service pages</dt>
                <dd>
                  <Link href="/cladding/">Cladding and facade installation</Link>
                  , <Link href="/render/">rendering services</Link>,{" "}
                  <Link href="/hebel/">Hebel installation</Link> and{" "}
                  <Link href="/walling/">walling services</Link>
                </dd>
              </div>
              <div>
                <dt>Related guides</dt>
                <dd>
                  <Link href="/resources/preparing-walls-for-render-adelaide/">
                    Preparing walls for render
                  </Link>
                  ,{" "}
                  <Link href="/resources/render-repair-adelaide/">
                    render repair
                  </Link>
                  ,{" "}
                  <Link href="/resources/render-finishes-adelaide/">
                    render finishes
                  </Link>
                  ,{" "}
                  <Link href="/resources/facade-recladding-adelaide/">
                    facade recladding
                  </Link>
                  ,{" "}
                  <Link href="/resources/fibre-cement-cladding-adelaide/">
                    fibre cement cladding
                  </Link>{" "}
                  and{" "}
                  <Link href="/resources/choosing-a-hebel-installer-adelaide/">
                    choosing a Hebel installer
                  </Link>
                </dd>
              </div>
            </dl>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/cladding/">Cladding and facade installation</Link>
              <Link href="/render/">Adelaide rendering services</Link>
              <Link href="/hebel/">Hebel installation</Link>
              <Link href="/walling/">Walling services</Link>
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
        intro="Ready for a quote? Tell us the suburb, the service you need, what the wall is built from and what plans or photos are available. If supporting files are needed, we’ll arrange how to review them before preparing an obligation-free quote."
      />
      <CtaBand />
    </>
  );
}
