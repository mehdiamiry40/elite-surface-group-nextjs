import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import QuoteButton from "@/components/QuoteButton";
import { CtaBand } from "@/components/CtaBand";
import { ProjectLinks } from "@/components/sections";
import { BreadcrumbSchema, ProjectSchema } from "@/components/JsonLd";
import { bannerImages } from "@/content/pages";
import { getProject, projects } from "@/content/projects";
import { services } from "@/content/services";
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
    description: project.metaDescription,
    path: `/projects/${project.slug}`,
    image: ogCard(project.slug, `${project.title} case study`),
  });
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const service = services.find((item) => item.slug === project.service);

  if (!service) {
    notFound();
  }

  const relatedProjects = projects
    .filter(
      (candidate) =>
        candidate.service === project.service &&
        candidate.slug !== project.slug,
    )
    .slice(0, 3);

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

      <section
        className="section project-case"
        aria-labelledby="case-study-title"
      >
        <div className="shell">
          <header className="project-case__intro">
            <span className="eyebrow">{service.name} case study</span>
            <h2 id="case-study-title">Project overview</h2>
            <p>{project.summary}</p>
          </header>

          <div className="project-case__proof">
            <figure className="project-case__figure">
              <Image
                src={project.image}
                alt={project.alt}
                width={project.width}
                height={project.height}
                sizes="(max-width: 767px) 100vw, (max-width: 1200px) 65vw, 780px"
              />
              <figcaption>{project.imageCaption}</figcaption>
            </figure>

            <aside
              className="project-facts"
              aria-labelledby="project-facts-title"
            >
              <span className="eyebrow">At a glance</span>
              <h3 id="project-facts-title">Project details</h3>
              <dl>
                <div>
                  <dt>Project type</dt>
                  <dd>{project.projectType}</dd>
                </div>
                <div>
                  <dt>Service</dt>
                  <dd>
                    <Link href={`/${project.service}/`}>{service.name}</Link>
                  </dd>
                </div>
                <div>
                  <dt>Stage shown</dt>
                  <dd>{project.stage}</dd>
                </div>
              </dl>
              <h4>Visible features</h4>
              <ul>
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <QuoteButton className="btn project-facts__cta">
                Request a {service.name.toLowerCase()} quote
              </QuoteButton>
            </aside>
          </div>

          <div className="project-case__story">
            <article>
              <span aria-hidden="true">01</span>
              <h3>What the photograph records</h3>
              <p>{project.overview}</p>
            </article>
            <article>
              <span aria-hidden="true">02</span>
              <h3>Detail focus</h3>
              <p>{project.detailFocus}</p>
            </article>
            <article>
              <span aria-hidden="true">03</span>
              <h3>Visible result</h3>
              <p>{project.visibleResult}</p>
            </article>
          </div>

          <nav className="project-case__links" aria-label="Project links">
            <Link href={`/${project.service}/`}>
              Explore {service.name.toLowerCase()} services
            </Link>
            <Link href="/locations/adelaide/">Adelaide service area</Link>
            <Link href="/project-planning/">Plan a project enquiry</Link>
            {project.service === "render" ? (
              <Link href="/resources/render-cracking-adelaide/">
                Read the render-cracking guide
              </Link>
            ) : null}
            {project.service === "cladding" ? (
              <Link href="/resources/cladding-maintenance-coastal-adelaide/">
                Read the coastal cladding care guide
              </Link>
            ) : null}
            <Link href="/projects/">Back to all projects</Link>
            <Link href="/contact-us/#contact">Discuss a similar project</Link>
          </nav>
        </div>
      </section>

      <ProjectLinks
        items={relatedProjects}
        title={`More ${service.name.toLowerCase()} project details`}
        intro={`Compare the visible finishes and construction details recorded in other ${service.name.toLowerCase()} work from the project portfolio.`}
        id="related-project-details"
      />

      <CtaBand />
    </>
  );
}
