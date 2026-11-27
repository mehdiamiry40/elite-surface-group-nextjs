import type { Metadata } from "next";
import Link from "next/link";
import { Checklist, Glossary } from "@/components/ContentBlocks";
import PageBanner from "@/components/PageBanner";
import ProjectGallery from "@/components/ProjectGallery";
import { CtaBand } from "@/components/CtaBand";
import { SectionHead } from "@/components/sections";
import { BreadcrumbSchema, ProjectListSchema } from "@/components/JsonLd";
import { bannerImages, projectsPage } from "@/content/pages";
import {
  featuredProjects,
  projectBriefChecklist,
  projectCards,
  projectGlossary,
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

      <section
        className="section section--tint"
        aria-labelledby="projects-brief"
      >
        <div className="shell">
          <h2 id="projects-brief" className="section-title">
            How to brief a similar job
          </h2>
          <div className="prose">
            <p>
              If one of these case studies is close to what you have in mind,
              say so when you enquire. Five points turn “something like that”
              into a brief we can work from.
            </p>
            <Checklist items={projectBriefChecklist} />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="projects-glossary">
        <div className="shell">
          <h2 id="projects-glossary" className="section-title">
            Finish and junction terms in these case studies
          </h2>
          <div className="prose">
            <p>
              The case studies describe each photograph in trade terms. This is
              what those terms mean, and where each detail is shown.
            </p>
            <Glossary terms={projectGlossary} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
