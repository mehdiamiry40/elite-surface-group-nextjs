import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import ProjectGallery from "@/components/ProjectGallery";
import { CtaBand } from "@/components/CtaBand";
import { SectionHead } from "@/components/sections";
import { bannerImages, featuredProjects, projects, projectsPage } from "@/content/site";
import { BreadcrumbSchema, ProjectListSchema } from "@/components/JsonLd";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Render & Cladding Projects Adelaide",
  description: projectsPage.metaDescription,
  path: "/projects",
  image: ogCard("projects", "Render and cladding project details across Adelaide"),
});

export default function ProjectsPage() {
  return (
    <>
      <BreadcrumbSchema trail={[{ label: "Projects", href: "/projects" }]} />
      <ProjectListSchema projects={projects} />
      <PageBanner
        title={projectsPage.bannerTitle}
        image={bannerImages["/projects"]}
        crumbs={[{ label: "Projects" }]}
      />

      <section className="section" aria-labelledby="projects-title">
        <div className="shell">
          <SectionHead
            eyebrow={featuredProjects.eyebrow}
            title="A closer look at our work"
            intro={featuredProjects.intro}
            id="projects-title"
          />
          <div className="prose projects-context">
            <p>
              These residential case studies show the installation scope, site
              detail and result behind completed render and cladding work across
              Adelaide.
            </p>
            <p>
              Explore our <Link href="/render/">rendering services</Link> and{" "}
              <Link href="/cladding/">cladding and facade installation</Link>,
              check the <Link href="/locations/adelaide/">Adelaide service area</Link>,
              or use the <Link href="/project-planning/">project planning guide</Link>{" "}
              before requesting a quote.
            </p>
          </div>
          <ProjectGallery items={projects} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
