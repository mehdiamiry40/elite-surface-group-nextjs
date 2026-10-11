import type { Metadata } from "next";
import Image from "next/image";
import Carousel from "@/components/Carousel";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import FeatureIcon from "@/components/FeatureIcon";
import { aboutPage, bannerImages } from "@/content/site";
import { projectCards } from "@/content/projects";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { blurProps } from "@/lib/lcp-blur";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: aboutPage.metaTitle,
  description: aboutPage.metaDescription,
  path: "/about",
  image: ogCard("about", "About Elite Surface Group, Adelaide"),
});

// A finished job beside the story; the banner already shows the team on site.
const aboutPhoto = projectCards[0];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ label: "About", href: "/about" }]} />
      <PageBanner
        title={aboutPage.bannerTitle}
        image={bannerImages["/about"]}
        crumbs={[{ label: "About" }]}
      />

      <section className="section concept-split" aria-labelledby="about-title">
        <div className="shell concept-split__grid">
          <div className="concept-split__copy">
            <h2 id="about-title" className="bar-title">
              {aboutPage.title}
            </h2>
            <p className="concept-subtitle">{aboutPage.lead}</p>
            <p>{aboutPage.identity}</p>
            {aboutPage.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="framed-media">
            <Image
              src={aboutPhoto.image}
              alt={aboutPhoto.alt}
              width={aboutPhoto.width}
              height={aboutPhoto.height}
              sizes="(max-width: 767px) 100vw, 45vw"
              {...blurProps(aboutPhoto.image)}
            />
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="about-expect">
        <div className="shell">
          <h2 id="about-expect" className="bar-title bar-title--center">
            {aboutPage.prideLead.replace(/:$/, "")}
          </h2>
          <ul className="concept-features concept-features--4">
            {aboutPage.pride.flat().map((point, index) => (
              <li key={point}>
                <FeatureIcon name={aboutPage.prideIcons[index]} />
                <p>{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="about-gallery">
        <div className="shell">
          <h2 id="about-gallery" className="bar-title">
            On site
          </h2>
          <Carousel label="workshop image" perView={{ desktop: 2, tablet: 2, mobile: 1 }}>
            {aboutPage.gallery.map((item) => (
              <Image
                key={item.image}
                src={item.image}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 620px"
                {...blurProps(item.image)}
              />
            ))}
          </Carousel>
          <p className="about-closing">{aboutPage.closing}</p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
