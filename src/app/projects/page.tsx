import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import ProjectGallery from "@/components/ProjectGallery";
import { CtaBand } from "@/components/CtaBand";
import { SectionHead } from "@/components/sections";
import { bannerImages, featuredProjects, projects, projectsPage } from "@/content/site";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cladding & Walling Projects Adelaide",
  description: projectsPage.metaDescription,
  path: "/projects",
  image: ogCard("projects", "Completed cladding and walling projects in Adelaide"),
});

export default function ProjectsPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ label: "Projects", href: "/projects" }]} />
      <PageBanner
        title={projectsPage.bannerTitle}
        image={bannerImages["/projects"]}
        crumbs={[{ label: "Projects" }]}
      />

      <section className="section" aria-labelledby="projects-title">
        <div className="shell">
          <SectionHead
            eyebrow={featuredProjects.eyebrow}
            title="Our Completed Work"
            intro={featuredProjects.intro}
            id="projects-title"
          />
          <ProjectGallery items={projects} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
