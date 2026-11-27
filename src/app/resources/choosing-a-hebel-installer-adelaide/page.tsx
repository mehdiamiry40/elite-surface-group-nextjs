import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import {
  Checklist,
  DecisionGuide,
  Glossary,
} from "@/components/ContentBlocks";
import { CtaBand } from "@/components/CtaBand";
import {
  ArticleSchema,
  BreadcrumbSchema,
  FAQPageSchema,
} from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { TickList } from "@/components/sections";
import {
  glossary,
  installerQuestions,
  quoteChecklist,
} from "@/content/guides/choosing-a-hebel-installer-adelaide";
import { bannerImages } from "@/content/pages";
import { choosingHebelInstallerGuide } from "@/content/resources";
import type { ServiceFaq } from "@/content/services";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: choosingHebelInstallerGuide.metaTitle,
  description: choosingHebelInstallerGuide.metaDescription,
  path: `/resources/${choosingHebelInstallerGuide.slug}`,
  image: ogCard("hebel", choosingHebelInstallerGuide.metaTitle),
  openGraphType: "article",
  publishedTime: choosingHebelInstallerGuide.published,
  modifiedTime: choosingHebelInstallerGuide.modified,
});

/** Rendered in the visible FAQ list and emitted as FAQPage schema. */
const faqs: readonly ServiceFaq[] = [
  {
    question:
      "Do I need a specialist Hebel installer, or can any wall trade fix the panels?",
    answer:
      "The panels are installed as part of a documented system, so what matters is whether the installer works from the current design and installation guide for the system on your drawings and can explain how they will follow it. Ask which guide and which drawing revision the quote is based on, rather than relying on a general description of experience.",
  },
  {
    question: "Who chooses the Hebel system—the installer or the designer?",
    answer:
      "The project’s design team documents the wall configuration and its performance requirements, supported by current manufacturer information. The installer works to those documents and should raise a conflict with the builder or designer rather than redesign the wall on site.",
  },
  {
    question: "Should the same company install the panels and apply the render?",
    answer:
      "It can simplify the hand-over between the two scopes, but it is not a requirement. What matters is that the written scope names who accepts the panel surface, who applies each layer of the specified coating system and who details the joints, whichever businesses hold those roles.",
  },
  {
    question: "Is the manufacturer’s warranty the same as the installer’s?",
    answer:
      "No. CSR’s published warranty information describes conditional product cover for eligible products and systems. It is a manufacturer’s document with its own terms, not an installer’s warranty, a coating warranty or a building approval. Ask each party for the actual document that names the selected product and system, and for the installation, coating and maintenance conditions it sets.",
  },
  {
    question:
      "What should I have ready before asking for a Hebel installation quote?",
    answer:
      "The drawings that name the wall system, any engineering details that affect the wall, the finish specification, the site location and access conditions, and the expected programme. Tell the installer which of those documents are approved and which are still being coordinated.",
  },
];

export default function ChoosingHebelInstallerGuidePage() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Resources", href: "/resources" },
          {
            label: "Choosing a Hebel installer",
            href: `/resources/${choosingHebelInstallerGuide.slug}`,
          },
        ]}
      />
      <ArticleSchema guide={choosingHebelInstallerGuide} />
      <FAQPageSchema faqs={faqs} />

      <article>
        <PageBanner
          title={choosingHebelInstallerGuide.title}
          image={bannerImages[`/resources/${choosingHebelInstallerGuide.slug}`]}
          crumbs={[
            { label: "Resources", href: "/resources" },
            { label: "Choosing a Hebel installer" },
          ]}
        />

        <section
          className="section article-intro"
          aria-labelledby="guide-summary"
        >
          <div className="shell prose article-prose">
            <div className="article-meta">
              <span>{choosingHebelInstallerGuide.category}</span>
              <time dateTime={choosingHebelInstallerGuide.published}>
                Published {choosingHebelInstallerGuide.publishedDisplay}
              </time>
              {choosingHebelInstallerGuide.modifiedDisplay ? (
                <time dateTime={choosingHebelInstallerGuide.modified}>
                  Updated {choosingHebelInstallerGuide.modifiedDisplay}
                </time>
              ) : null}
              <span>{choosingHebelInstallerGuide.readingTime}</span>
              <span>
                Prepared by <Link href="/about/">Elite Surface Group</Link>
              </span>
            </div>
            <h2 id="guide-summary">The short answer</h2>
            <p className="article-lead">
              Choosing a Hebel installer is mostly a question of documents and
              scope. A Hebel wall performs as a documented system&mdash;panels,
              support, fixings, joints, flashings and a compatible
              coating&mdash;so the installer worth appointing is the one who can
              tell you which system your drawings specify, which installation
              guide they will work from, and exactly where their scope starts
              and stops. This guide sets out what to confirm before you appoint
              anyone, us included.
            </p>
            <aside className="article-note" aria-label="Important guidance">
              <strong>We install the wall; others design and certify it.</strong>
              <p>
                Elite Surface Group installs Hebel wall systems, render,
                cladding and walling within an agreed trade scope. We do not
                design wall systems, certify buildings or assess a wall
                remotely. System selection, engineering and approvals stay with
                the project&rsquo;s designer, engineer and building
                professional.
              </p>
            </aside>
            <nav className="article-toc" aria-label="On this page">
              <strong>On this page</strong>
              <ol>
                <li>
                  <a href="#system">Why the system comes first</a>
                </li>
                <li>
                  <a href="#specified-system">Confirm what is specified</a>
                </li>
                <li>
                  <a href="#documents">What the installer works from</a>
                </li>
                <li>
                  <a href="#site-questions">Framing, fixings and joints</a>
                </li>
                <li>
                  <a href="#finish-and-trades">Coating, supply and site</a>
                </li>
                <li>
                  <a href="#quote-and-warranty">Quotes and warranty paperwork</a>
                </li>
                <li>
                  <a href="#installer-questions">Questions for every installer</a>
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
            <h2 id="system">A Hebel wall is a system, not a product</h2>
            <p>
              Hebel&reg; is a registered trademark for autoclaved aerated
              concrete (AAC) products supplied in Australia by CSR Building
              Products. CSR publishes different systems for external walls,
              internal walls, floors, fences and other applications, each with
              its own design and installation information. There is no single
              &ldquo;Hebel wall&rdquo; that every panel and every detail belongs
              to.
            </p>
            <p>
              That has a practical consequence when you are choosing who
              installs it. Whatever a wall is documented to achieve belongs to
              the complete build-up, installed the way its guide describes, and
              not to the panel by itself. An installer who substitutes a fixing,
              closes over a joint or improvises around an opening has changed
              the system, even if the wall looks the same on the day it is
              finished.
            </p>
            <p>
              So the useful test is not how confidently a business describes
              itself. It is whether they ask for the documents before pricing,
              name the system in writing, and can explain what they will do when
              the drawings and the site disagree. If you are still deciding
              between wall types, our{" "}
              <Link href="/resources/hebel-vs-brick-veneer-adelaide/">
                Hebel vs brick veneer comparison
              </Link>{" "}
              explains how a panel-and-coating wall differs from masonry veneer
              before an installer is involved at all.
            </p>

            <h3>Terms used in this guide</h3>
            <Glossary terms={glossary} />
            <p className="article-source">
              Source:{" "}
              <a href="https://hebel.com.au/resources/technical-documents/">
                CSR Hebel technical documents
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="specified-system">
          <div className="shell prose article-prose">
            <h2 id="specified-system">
              Confirm which system the drawings actually specify
            </h2>
            <p>
              Before comparing installers, check what you are asking them to
              install. A plan note that says &ldquo;Hebel&rdquo; can point to
              very different applications, and a detail written for one should
              not be carried across to another because the material looks
              similar.
            </p>
            <dl className="faq-list professional-list">
              <div className="faq-list__item">
                <dt>External wall on a framed building</dt>
                <dd>
                  Panels fixed to a loadbearing steel or timber frame and
                  finished with a coating system. Ask which external wall system
                  and guide the drawings name, and what the panels are fixed to.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Wall on or near a boundary</dt>
                <dd>
                  Zero-boundary and dual zero-boundary configurations are
                  separately documented, and access to the outside face can be
                  limited from the start or disappear as neighbouring work
                  progresses. Our{" "}
                  <Link href="/resources/hebel-boundary-walls-adelaide/">
                    Hebel boundary-wall planning guide
                  </Link>{" "}
                  covers the terminology, approvals and access questions.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Intertenancy or party wall</dt>
                <dd>
                  A wall common to adjoining dwellings has its own documented
                  system and its own performance requirements set by the
                  project&rsquo;s designers. It is not an external wall detail
                  used indoors.
                </dd>
              </div>
              <div className="faq-list__item">
                <dt>Internal walls and other applications</dt>
                <dd>
                  Internal walls, floors and fences are published as separate
                  applications. Confirm which one applies before assuming an
                  external wall scope or price carries across.
                </dd>
              </div>
            </dl>
            <p>
              If the drawings say only &ldquo;Hebel&rdquo; or &ldquo;AAC
              panel&rdquo; with no system named, that is a question for the
              designer or builder before it is a question for an installer. An
              installer who prices an unnamed system is guessing, and so is
              anyone comparing that quote with another. Where the panel work
              sits inside a wider wall package, our{" "}
              <Link href="/walling/">internal and external walling</Link> page
              explains how framing, openings and finishes are coordinated around
              it.
            </p>
            <p className="article-source">
              Sources:{" "}
              <a href="https://hebel.com.au/residential/external-walls/">
                CSR Hebel external walls
              </a>
              ,{" "}
              <a href="https://hebel.com.au/residential/boundary-walls/">
                boundary-wall systems
              </a>{" "}
              and{" "}
              <a href="https://hebel.com.au/residential/party-walls/">
                party-wall systems
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="documents">
          <div className="shell split article-visual">
            <figure className="split__media article-figure">
              <Image
                src={choosingHebelInstallerGuide.image}
                alt={choosingHebelInstallerGuide.imageAlt}
                width={choosingHebelInstallerGuide.imageWidth}
                height={choosingHebelInstallerGuide.imageHeight}
                sizes="(max-width: 767px) 100vw, 560px"
                {...blurProps(choosingHebelInstallerGuide.image)}
              />
              <figcaption>{choosingHebelInstallerGuide.imageCaption}</figcaption>
            </figure>
            <div className="split__body">
              <span className="eyebrow">Documents first</span>
              <h2 id="documents">Ask what the installer will be working from</h2>
              <p>
                A reliable installer builds from the same information the
                designer, the builder and the building professional are relying
                on. Ask them to name it.
              </p>
              <p>
                The first document is the current design and installation guide
                for the specified system. CSR&rsquo;s PowerPanelXL guidance, for
                example, addresses project design, building setout, wind
                design, framing, openings, control joints, flashings, sealants
                and coatings&mdash;a fair picture of how much of the wall the
                guide governs. Guides are revised, so ask which version the
                quote is based on and confirm the applicable one through
                CSR&rsquo;s technical-document library.
              </p>
              <p>
                The second is the project&rsquo;s own set: the approved
                elevations and sections, the wall schedule, any engineering that
                affects the wall, and the details for openings and penetrations.
                Ask the installer to record the drawing revision they priced
                from, so a later design change prompts a recheck rather than an
                argument.
              </p>
              <p>
                Then ask the question that separates installers: what happens
                when the site does not match the documents? The answer to listen
                for is that work stops at that point and the conflict goes back
                to the builder, designer or engineer in writing. The answer to
                be wary of is that it gets sorted out on the scaffold.
              </p>
              <p className="article-source">
                Source:{" "}
                <a href="https://hebel.com.au/resources/technical-documents/">
                  CSR Hebel technical documents
                </a>
                , which lists the current design and installation guide for
                each system.
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="site-questions">
          <div className="shell prose article-prose">
            <h2 id="site-questions">
              Questions about framing, fixings, openings and joints
            </h2>
            <p>
              You do not need to know the answers to these. You need to hear
              that the installer takes them from the system guide and the
              drawings rather than from habit.
            </p>
            <TickList
              items={[
                "Who confirms the slab, frame and support are ready, and what happens if they are not?",
                "Which fixings and support components does the specified system call for, and who supplies them?",
                "How is the wall set out so panel joints, corners and openings land where the drawings show them?",
                "How are window and door openings, service penetrations and later fixings treated under the guide?",
                "Where are the control joints documented, and how are they kept open through to the finished coating?",
                "Which flashings and sealants sit inside the panel scope, and which belong to another trade?",
                "What records are kept: photographs, product details and any departure agreed in writing?",
              ]}
            />
            <p>
              Framing readiness deserves its own conversation. Panels follow
              what they are fixed to, so a frame that is out of line or
              incomplete becomes a wall that is out of line. Agree who checks
              the frame, when, and who rectifies it before a start date is
              fixed.
            </p>
            <p>
              Movement joints are the other detail to press on. A documented
              control joint has to survive every trade that follows, and a
              coating cannot hide or replace one. Ask how joint locations are
              marked on the wall and handed over to whoever applies the finish.
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="finish-and-trades"
        >
          <div className="shell prose article-prose">
            <h2 id="finish-and-trades">
              Settle who carries the coating, the supply and the site
            </h2>
            <h3>The coating is part of the wall</h3>
            <p>
              An external Hebel wall is not finished until its coating system is
              complete. CSR&rsquo;s coatings information refers to approved
              finishes and acrylic coating systems, and points to coating
              suppliers with their own system documents. So the conversation
              with an installer has to include the finish, even when another
              business applies it: who accepts the panel surface as ready, who
              applies each specified layer, and who details the joints, corners
              and openings.
            </p>
            <p>
              Our guide to{" "}
              <Link href="/resources/rendering-hebel-panels-adelaide/">
                rendering Hebel panels
              </Link>{" "}
              works through the coating specification and the split of
              responsibilities. If you would rather have one business across
              both scopes, our{" "}
              <Link href="/render/">rendering services</Link> page explains how
              we scope finishing work.
            </p>
            <h3>Supply, handling and access</h3>
            <p>
              Ask who supplies the panels, accessories, fixings and coating
              materials, who takes delivery, and where panels are stored and
              protected on site. Ask how they will be moved and lifted into
              place, what access or scaffold the price assumes, and who provides
              it. On a boundary or a tight allotment, ask which side of the wall
              stays reachable at each stage of the build.
            </p>
            <aside className="article-note article-note--warning">
              <strong>Cutting AAC is a dust-control question.</strong>
              <p>
                SafeWork SA identifies autoclaved aerated concrete as a
                crystalline-silica substance and regulates work that can create
                respirable dust through cutting, grinding, drilling or similar
                processing. Ask how panels will be cut and how dust will be
                controlled on your site. This guide is not a cutting method.
              </p>
            </aside>
            <p className="article-source">
              Sources:{" "}
              <a href="https://hebel.com.au/coatings/">
                CSR Hebel coatings and finishes
              </a>
              ,{" "}
              <a href="https://safework.sa.gov.au/industry/construction/silica">
                SafeWork SA respirable crystalline silica guidance
              </a>{" "}
              and{" "}
              <a href="https://hebel.com.au/resources/safety/">
                CSR Hebel safety information
              </a>
              .
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="quote-and-warranty">
          <div className="shell prose article-prose">
            <h2 id="quote-and-warranty">
              What a comparable quote states, and which warranty paperwork to
              ask for
            </h2>
            <p>
              Two quotes can describe the same wall while assigning very
              different work to the builder, the installer and the renderer. A
              quote you can compare states:
            </p>
            <TickList
              items={[
                "The product, application and documented system by name",
                "The drawing revision and installation-guide version it is based on",
                "Who supplies panels, accessories, fixings and coating materials",
                "Who confirms frame readiness, and what the price assumes about it",
                "Which openings, junctions, flashings, sealants and control joints are included",
                "Whether the coating system is included, and up to which layer",
                "Access, scaffold, lifting, cutting, waste and clean-up responsibilities",
                "Exclusions, and the information still needed before price or timing is final",
              ]}
            />
            <p>
              Our guide to{" "}
              <Link href="/resources/what-affects-cladding-render-quotes-adelaide/">
                what affects a cladding, render, Hebel or walling quote
              </Link>{" "}
              covers the conditions that move a quote in more detail. It does so
              in qualitative terms, because no two walls price the same.
            </p>
            <h3>Warranty and handover paperwork</h3>
            <p>
              CSR&rsquo;s published warranty information describes conditional
              product cover for eligible products and systems. It is a
              manufacturer&rsquo;s document with its own terms. It is not an
              installer&rsquo;s warranty, a coating warranty or a building
              approval, and a headline period does not prove that every
              trade&rsquo;s work carries the same cover.
            </p>
            <p>
              Ask each party for the actual document that names the selected
              product and system, and for the installation, coating and
              maintenance conditions it sets. We make no warranty promise in
              this guide. At handover, keep the final drawings, the system and
              coating specifications, the product records and each
              trade&rsquo;s contact details together.
            </p>
            <h3>Warning signs</h3>
            <TickList
              items={[
                "The system is described only as “Hebel”, with no product, application or guide named",
                "The quote makes no reference to an installation guide or a drawing revision",
                "Fixings, flashings or control joints are called “standard” without a source",
                "The coating or render is left unassigned, or assumed to be someone else’s",
                "Performance, warranty cover or approval is promised before the documents have been reviewed",
                "A claim of manufacturer authorisation or endorsement that cannot be confirmed with the manufacturer",
              ]}
            />
            <p className="article-source">
              Source:{" "}
              <a href="https://hebel.com.au/resources/warranty/">
                CSR Hebel warranty information
              </a>
              .
            </p>
          </div>
        </section>

        <section
          className="section section--tint"
          aria-labelledby="installer-questions"
        >
          <div className="shell prose article-prose">
            <h2 id="installer-questions">
              The questions to put to every installer
            </h2>
            <p>
              The sections above come down to a short list you can put to each
              installer in the same words. You do not need to judge the
              technical detail of the reply. Listen for whether it comes from
              the system guide and the drawings, and compare what each
              installer puts in writing.
            </p>
            <DecisionGuide {...installerQuestions} />
          </div>
        </section>

        <section className="section" aria-labelledby="next-steps">
          <div className="shell prose article-prose">
            <h2 id="next-steps">Sensible next steps</h2>
            <ol className="steps">
              <li>
                <h3>Find the system name on your drawings</h3>
                <p>
                  If the wall schedule or elevations do not name the product and
                  system, ask your designer or builder before requesting prices.
                </p>
              </li>
              <li>
                <h3>Gather what an installer needs</h3>
                <p>
                  Drawings, engineering that affects the wall, the finish
                  specification, the site location, access and programme. Our{" "}
                  <Link href="/project-planning/">project planning guide</Link>{" "}
                  lists the wider information that makes an early conversation
                  useful.
                </p>
              </li>
              <li>
                <h3>Ask each installer the same questions</h3>
                <p>
                  Use the questions above, then compare the answers and the
                  stated scope rather than only the total.
                </p>
              </li>
              <li>
                <h3>Assign the finish and the junctions in writing</h3>
                <p>
                  Before work starts, the scope should show who owns the
                  coating, the control joints, the flashings and each interface
                  with another trade.
                </p>
              </li>
            </ol>

            <h3>What to have ready before you ask for prices</h3>
            <p>
              An installer can only price what the documents describe. Having
              these together before the first conversation keeps every quote on
              the same footing.
            </p>
            <Checklist items={quoteChecklist} />
            <p>
              Our{" "}
              <Link href="/hebel/">Hebel installation in Adelaide</Link> page
              explains how we scope this work, and the{" "}
              <Link href="/locations/adelaide/">Adelaide service area</Link>{" "}
              page covers where we work.
            </p>
          </div>
        </section>

        <section
          id="faqs-and-sources"
          className="section section--tint"
          aria-labelledby="hebel-installer-faqs"
        >
          <div className="shell prose article-prose">
            <h2 id="hebel-installer-faqs">Common questions</h2>
            <dl className="faq-list" aria-labelledby="hebel-installer-faqs">
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
                <dt>CSR Hebel system information</dt>
                <dd>
                  <a href="https://hebel.com.au/residential/external-walls/">
                    External walls
                  </a>
                  ,{" "}
                  <a href="https://hebel.com.au/residential/boundary-walls/">
                    boundary walls
                  </a>
                  ,{" "}
                  <a href="https://hebel.com.au/residential/party-walls/">
                    party walls
                  </a>{" "}
                  and{" "}
                  <a href="https://hebel.com.au/resources/technical-documents/">
                    technical documents
                  </a>
                </dd>
              </div>
              <div>
                <dt>CSR Hebel installation, finish and cover</dt>
                <dd>
                  <a href="https://hebel.com.au/coatings/">Coatings</a>,{" "}
                  <a href="https://hebel.com.au/resources/safety/">safety</a>{" "}
                  and{" "}
                  <a href="https://hebel.com.au/resources/warranty/">
                    warranty information
                  </a>
                </dd>
              </div>
              <div>
                <dt>SafeWork SA</dt>
                <dd>
                  <a href="https://safework.sa.gov.au/industry/construction/silica">
                    Respirable crystalline silica in construction
                  </a>
                </dd>
              </div>
            </dl>
            <p className="article-source">
              Recheck the applicable system guide and project documents for
              every job; manufacturer documents are revised. Hebel&reg; is a
              registered trademark of the Xella group. CSR Building Products Ltd
              is the exclusive licensee of Xella in Australia. Elite Surface
              Group is not represented here as a CSR-authorised, accredited or
              endorsed installer.
            </p>

            <nav className="article-related" aria-label="Related website pages">
              <Link href="/hebel/">Hebel installation Adelaide</Link>
              <Link href="/resources/hebel-boundary-walls-adelaide/">
                Hebel boundary walls
              </Link>
              <Link href="/resources/rendering-hebel-panels-adelaide/">
                Rendering Hebel panels
              </Link>
              <Link href="/resources/hebel-vs-brick-veneer-adelaide/">
                Hebel vs brick veneer
              </Link>
              <Link href="/resources/what-affects-cladding-render-quotes-adelaide/">
                What affects a quote
              </Link>
              <Link href="/project-planning/">Plan your project enquiry</Link>
              <Link href="/contact-us/#contact">
                Discuss the available project details
              </Link>
            </nav>
          </div>
        </section>
      </article>

      <ContactSection
        defaultService="Hebel"
        intro="Appointing a Hebel installer in Adelaide? Tell us the suburb, the system named on the drawings, the proposed finish and which documents are available. If supporting files are needed, we’ll arrange how to review them."
      />
      <CtaBand />
    </>
  );
}
