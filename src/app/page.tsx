import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/Hero";
import ProjectGallery from "@/components/ProjectGallery";
import {
  CtaBand,
  SectionHead,
  ServiceCards,
  Testimonials,
  TickList,
} from "@/components/sections";
import {
  aboutTeaser,
  differentiators,
  expertise,
  featuredProjects,
  process,
  projects,
  whyChoose,
} from "@/content/site";
import { ReviewSchema } from "@/components/JsonLd";

export default function HomePage() {
  return (
    <>
      <ReviewSchema />
      <Hero />

      <ServiceCards />

      {/* Trusted specialists */}
      <section className="section" aria-labelledby="about-teaser-title">
        <div className="shell split">
          <div className="split__media">
            <Image
              src={aboutTeaser.image}
              alt={aboutTeaser.imageAlt}
              width={600}
              height={400}
              sizes="(max-width: 767px) 100vw, 560px"
              quality={78}
            />
          </div>
          <div className="split__body">
            <h2 id="about-teaser-title">
              <span className="accent">{aboutTeaser.eyebrow} </span>
              {aboutTeaser.title}
            </h2>
            {aboutTeaser.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link className="btn" href="/about">
              Learn more about us
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section section--tint" aria-labelledby="process-title">
        <div className="shell split split--flip">
          <div className="split__media">
            <Image
              src={process.image}
              alt={process.imageAlt}
              width={600}
              height={400}
              sizes="(max-width: 767px) 100vw, 560px"
              quality={78}
            />
          </div>
          <div className="split__body">
            <h2 id="process-title">
              <span className="accent">Our </span>
              Professional Process
            </h2>
            <p>{process.intro}</p>
            <ul className="steps">
              {process.steps.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section" aria-labelledby="why-title">
        <div className="shell split">
          <div className="split__media">
            <Image
              src={whyChoose.image}
              alt={whyChoose.imageAlt}
              width={600}
              height={400}
              sizes="(max-width: 767px) 100vw, 560px"
              quality={78}
            />
          </div>
          <div className="split__body">
            <h2 id="why-title">
              <span className="accent">{whyChoose.titleAccent} </span>
              {whyChoose.title}
            </h2>
            <p>{whyChoose.intro}</p>
            <div className="grid grid--2">
              {whyChoose.columns.map((column) => (
                <TickList key={column[0]} items={column} />
              ))}
            </div>
            <p>{whyChoose.closing}</p>
            <Link className="btn" href="/about">
              Learn more about us
            </Link>
          </div>
        </div>
      </section>

      {/* What sets us apart */}
      <section
        className="section section--tint"
        aria-labelledby="differentiators-title"
      >
        <div className="shell">
          <SectionHead
            titleAccent={differentiators.titleAccent}
            title={differentiators.title}
            id="differentiators-title"
          />
          <ul className="grid grid--3">
            {differentiators.items.map((item) => (
              <li className="feature" key={item.title}>
                <Image
                  src={item.icon}
                  alt=""
                  width={68}
                  height={68}
                  aria-hidden
                />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Expertise */}
      <section
        className="expertise"
        style={{ backgroundImage: `url(${expertise.background})` }}
        aria-labelledby="expertise-title"
      >
        <div className="shell">
          <div className="expertise__intro">
            <h2 id="expertise-title">
              <span className="accent">{expertise.titleAccent} </span>
              {expertise.title}
            </h2>
            <p>{expertise.intro}</p>
          </div>
          <ul className="grid grid--4">
            {expertise.items.map((item) => (
              <li key={item.title}>
                <div className="expertise__card">
                  <Image
                    src={item.icon}
                    alt=""
                    width={62}
                    height={62}
                    aria-hidden
                  />
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured projects */}
      <section className="section" aria-labelledby="featured-title">
        <div className="shell">
          <SectionHead
            eyebrow={featuredProjects.eyebrow}
            title={featuredProjects.title}
            intro={featuredProjects.intro}
            id="featured-title"
          />
          <ProjectGallery items={projects} />
          <p style={{ marginTop: 34, textAlign: "center" }}>
            <Link className="btn" href="/projects">
              View all projects
            </Link>
          </p>
        </div>
      </section>

      <Testimonials />

      <ContactSection />

      <CtaBand />
    </>
  );
}
