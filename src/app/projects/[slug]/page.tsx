import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import { CtaBand } from "@/components/CtaBand";
import { BreadcrumbSchema, ProjectSchema } from "@/components/JsonLd";
import { bannerImages } from "@/content/pages";
import { getProject, projects } from "@/content/projects";
import { ogCard, pageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return {};
  }

  return pageMetadata({
    title: project.metaTitle,
    description: `${project.summary} ${project.suburb} case study by Elite Surface Group.`,
    path: `/projects/${project.slug}`,
    image: ogCard(project.slug, `${project.title} — ${project.suburb}`),
  });
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <BreadcrumbSchema
        trail={[
          { label: "Projects", href: "/projects" },
          { label: project.title, href: `/projects/${project.slug}` },
        ]}
      />
      <ProjectSchema project={project} />
      <PageBanner
        title={project.title}
        image={bannerImages["/projects"]}
        crumbs={[
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
      />

      <section className="section" aria-labelledby="case-study-title">
        <div className="shell split">
          <div className="split__media">
            <Image
              src={project.image}
              alt={project.alt}
              width={project.width}
              height={project.height}
              sizes="(max-width: 767px) 100vw, 560px"
              priority
              fetchPriority="high"
            />
          </div>
          <div className="split__body prose">
            <h2 id="case-study-title">{project.title}</h2>
            <p>{project.summary}</p>
            <p>
              <strong>Area:</strong> {project.suburb}
              <br />
              <strong>Service:</strong>{" "}
              <Link href={`/${project.service}/`}>{project.service}</Link>
            </p>
            <h3>Scope</h3>
            <p>{project.scope}</p>
            <h3>Challenge</h3>
            <p>{project.challenge}</p>
            <h3>Outcome</h3>
            <p>{project.outcome}</p>
            <p>
              <Link href="/projects/">Back to all projects</Link>
              {" · "}
              <Link href="/contact-us/#contact">Request a similar quote</Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
