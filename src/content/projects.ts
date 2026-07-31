import type { Service } from "@/content/services";

export type Project = {
  slug: string;
  title: string;
  service: Service["slug"];
  summary: string;
  suburb: string;
  scope: string;
  challenge: string;
  outcome: string;
  image: string;
  alt: string;
  width: number;
  height: number;
};

export const projects: readonly Project[] = [
  {
    slug: "two-storey-exterior-render",
    title: "Two-storey exterior render",
    service: "render",
    summary: "Smooth white render across a completed two-storey facade.",
    suburb: "Adelaide metro",
    scope:
      "External render finish to a two-storey residential facade, including preparation and a consistent colour finish.",
    challenge:
      "Working across two storeys while keeping joints, reveals and weather exposure detailing clean and even.",
    outcome:
      "A smooth, uniform white render finish ready for handover with the surrounding landscaping in place.",
    image: "/images/img-6.webp",
    alt: "Rendered two-storey home with a smooth white exterior finish",
    width: 1600,
    height: 2133,
  },
  {
    slug: "curved-rendered-wall-detail",
    title: "Curved rendered wall detail",
    service: "render",
    summary: "Crisp render and paint finish around a curved wall detail.",
    suburb: "Adelaide metro",
    scope:
      "Render and paint finish to a curved architectural wall detail on a residential exterior.",
    challenge:
      "Maintaining an even thickness and clean line through a curved form without telegraphing substrate irregularities.",
    outcome:
      "A crisp painted render finish that reads cleanly along the curve in natural light.",
    image: "/images/img-5.webp",
    alt: "Curved rendered wall detail with a crisp painted finish",
    width: 1600,
    height: 2133,
  },
  {
    slug: "contemporary-exterior-cladding",
    title: "Contemporary exterior cladding",
    service: "cladding",
    summary: "Feature cladding installed on a contemporary residence.",
    suburb: "Adelaide metro",
    scope:
      "Feature cladding installation to a contemporary residential exterior elevation.",
    challenge:
      "Aligning cladding modules with openings and junctions so the facade reads as a deliberate design feature.",
    outcome:
      "A completed cladding elevation that supports the contemporary residence design.",
    image: "/images/img-4.webp",
    alt: "External cladding installation on a contemporary residence",
    width: 1600,
    height: 2133,
  },
  {
    slug: "rendered-boundary-wall",
    title: "Rendered boundary wall",
    service: "render",
    summary: "Completed render finish beside a landscaped driveway.",
    suburb: "Adelaide metro",
    scope:
      "Render finish to a boundary wall adjoining a landscaped residential driveway.",
    challenge:
      "Delivering a durable external finish beside landscaping and vehicle access without trapping moisture at the base detail.",
    outcome:
      "A completed render finish that presents cleanly beside the driveway and planting.",
    image: "/images/img-3.webp",
    alt: "Rendered boundary wall alongside a landscaped driveway",
    width: 1600,
    height: 2133,
  },
  {
    slug: "mixed-cladding-and-render-facade",
    title: "Mixed cladding and render facade",
    service: "cladding",
    summary: "A modern facade combining contrasting cladding and render.",
    suburb: "Adelaide metro",
    scope:
      "Combined cladding and render finishes on a modern residential facade.",
    challenge:
      "Coordinating two finish systems so transitions, flashings and colour contrast stay sharp.",
    outcome:
      "A mixed facade with clear contrast between cladding and render planes.",
    image: "/images/img-2.webp",
    alt: "Modern facade combining cladding and render finishes",
    width: 1600,
    height: 2133,
  },
  {
    slug: "dark-feature-cladding",
    title: "Dark feature cladding",
    service: "cladding",
    summary: "Dark feature cladding on a completed residential exterior.",
    suburb: "Adelaide metro",
    scope:
      "Dark feature cladding to a completed residential exterior elevation.",
    challenge:
      "Keeping board lines, fixings and junctions consistent on a high-contrast dark finish that shows alignment clearly.",
    outcome:
      "A finished dark cladding feature that anchors the residential exterior design.",
    image: "/images/img-1.webp",
    alt: "Completed residential exterior with dark feature cladding",
    width: 1280,
    height: 960,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const featuredProjects = {
  eyebrow: "Our Work",
  title: "Featured Projects",
  intro:
    "Browse completed cladding and render projects that show the standard of finish we aim for on Adelaide homes.",
} as const;
