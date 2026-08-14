import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import ProjectGallery from "@/components/ProjectGallery";
import { CtaBand } from "@/components/CtaBand";
import { SectionHead } from "@/components/sections";
import { BreadcrumbSchema, ProjectListSchema } from "@/components/JsonLd";
import { bannerImages, projectsPage } from "@/content/pages";
import {
  featuredProjects,
  projectCards,
  projects,
} from "@/content/projects";
import { ogCard, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Render & Cladding Case Studies",
  description: projectsPage.metaDescription,
  path: "/projects",
  image: ogCard("projects", "Render and cladding project case studies"),
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
              These image-backed residential case studies record the project
              type, visible finish and construction details shown in our render
              and cladding portfolio.
            </p>
            <p>
              We publish only the level of location and product detail available
              for each project. Exact addresses, systems and dates are omitted
              where they are not part of the public project record.
            </p>
            <p>
              Explore our <Link href="/render/">rendering services</Link> and{" "}
              <Link href="/cladding/">cladding and facade installation</Link>,
              check the <Link href="/locations/adelaide/">Adelaide service area</Link>,
              or use the <Link href="/project-planning/">project planning guide</Link>{" "}
              before requesting a quote.
            </p>
          </div>
          <ProjectGallery items={projectCards} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
