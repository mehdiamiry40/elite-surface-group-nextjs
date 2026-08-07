import type { Metadata } from "next";
import Image from "next/image";
import Carousel from "@/components/Carousel";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { TickList } from "@/components/sections";
import { aboutPage, bannerImages } from "@/content/site";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: aboutPage.metaTitle,
  description: aboutPage.metaDescription,
  path: "/about",
  image: ogCard("about", "About Elite Surface Group, Adelaide"),
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ label: "About", href: "/about" }]} />
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
            <p>{aboutPage.identity}</p>
          </div>

          <Carousel label="workshop image" perView={{ desktop: 2, tablet: 2, mobile: 1 }}>
            {aboutPage.gallery.map((item) => (
              <Image
                key={item.image}
                src={item.image}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 620px"
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

      <CtaBand />
    </>
  );
}
