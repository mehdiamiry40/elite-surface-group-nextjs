import type { Metadata } from "next";
import Image from "next/image";
import Carousel from "@/components/Carousel";
import PageBanner from "@/components/PageBanner";
import { CtaBand, Testimonials, TickList } from "@/components/sections";
import { aboutPage, bannerImages } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: aboutPage.metaDescription,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title={aboutPage.bannerTitle}
        image={bannerImages["/about"]}
        crumbs={[{ label: "About" }]}
      />

      <section className="section" aria-labelledby="about-title">
        <div className="shell">
          <div className="section-head">
            <h2 id="about-title">{aboutPage.title}</h2>
            <p>{aboutPage.lead}</p>
          </div>

          <Carousel label="workshop image" perView={{ desktop: 3, tablet: 2, mobile: 1 }}>
            {aboutPage.gallery.map((item) => (
              <Image
                key={item.image}
                src={item.image}
                alt={item.alt}
                width={500}
                height={334}
                sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 380px"
                quality={78}
              />
            ))}
          </Carousel>

          <div className="prose" style={{ marginTop: 48 }}>
            {aboutPage.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>{aboutPage.prideLead}</p>
            <div className="grid grid--2">
              {aboutPage.pride.map((column) => (
                <TickList key={column[0]} items={column} />
              ))}
            </div>
            <p style={{ marginTop: 24 }}>{aboutPage.closing}</p>
          </div>
        </div>
      </section>

      <Testimonials />

      <CtaBand />
    </>
  );
}
