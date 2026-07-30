import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import ProjectGallery from "@/components/ProjectGallery";
import { CtaBand, SectionHead, Testimonials } from "@/components/sections";
import { bannerImages, featuredProjects, projects, projectsPage } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: projectsPage.metaDescription,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
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

      <Testimonials />

      <CtaBand />
    </>
  );
}
