import type { Service } from "@/content/services";

export type Project = {
  slug: string;
  title: string;
  metaTitle: string;
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
    metaTitle: "Two-storey Render Project Adelaide",
    service: "render",
    summary: "Smooth white render across a completed two-storey facade.",
    suburb: "Adelaide metro",
    scope:
      "External render finish to a two-storey residential facade, including preparation and a consistent colour finish.",
    challenge:
      "Working across two storeys while keeping joints, reveals and weather exposure detailing clean and even.",
    outcome:
      "A smooth, uniform white render finish ready for handover with the surrounding landscaping in place.",
    image: "/images/v2/project-two-storey-exterior-render.webp",
    alt: "Completed two-storey Adelaide home with a smooth light render finish",
    width: 1600,
    height: 1067,
  },
  {
    slug: "curved-rendered-wall-detail",
    title: "Curved rendered wall detail",
    metaTitle: "Curved Render Detail Adelaide",
    service: "render",
    summary: "A continuous light render finish around a curved upper wall.",
    suburb: "Adelaide metro",
    scope:
      "Rendered finish around the curved upper wall and adjoining window returns shown.",
    challenge:
      "Following the radius while keeping the edge and surface visually even.",
    outcome:
      "A continuous light finish that holds a clean curve in direct sunlight.",
    image: "/images/v2/project-curved-render-detail.webp",
    alt: "Curved rendered upper wall with an even light finish",
    width: 1600,
    height: 1067,
  },
  {
    slug: "dark-feature-cladding",
    title: "Dark feature cladding",
    metaTitle: "Dark Feature Cladding Adelaide",
    service: "cladding",
    summary: "Dark feature panels set against a light rendered facade.",
    suburb: "Adelaide metro",
    scope:
      "Dark facade panels to the upper level and garage elevation shown.",
    challenge:
      "Coordinating panel lines with the windows, eaves and garage opening.",
    outcome:
      "A high-contrast facade with consistent dark panel lines.",
    image: "/images/v2/project-dark-feature-cladding.webp",
    alt: "Two-storey Adelaide home with charcoal feature cladding and light render",
    width: 1600,
    height: 1067,
  },
  {
    slug: "rendered-window-reveal-detail",
    title: "Rendered window reveal detail",
    metaTitle: "Rendered Window Reveal Detail Adelaide",
    service: "render",
    summary: "Clean render lines around a large glazed opening and parapet edge.",
    suburb: "Adelaide metro",
    scope:
      "External render around the glazed opening, including the return and upper parapet edge shown.",
    challenge:
      "Keeping the long horizontal edges and window return visually straight at close range.",
    outcome:
      "An even finish with crisp lines around the opening and parapet.",
    image: "/images/v2/project-rendered-window-reveal.webp",
    alt: "Crisp rendered reveal around a large aluminium-framed window",
    width: 1600,
    height: 1067,
  },
  {
    slug: "rendered-column-and-stone-junctions",
    title: "Rendered columns and stone junctions",
    metaTitle: "Rendered Column Detail Adelaide",
    service: "render",
    summary: "Rendered columns and ledges meeting an existing stone base.",
    suburb: "Adelaide metro",
    scope:
      "Render finish to the column faces, moulded bases and horizontal ledges shown during construction.",
    challenge:
      "Keeping repeated column edges consistent while resolving the junction above irregular stonework.",
    outcome:
      "Crisp rendered faces and ledges above the contrasting stone base.",
    image: "/images/v2/project-rendered-columns-stone.webp",
    alt: "Rendered exterior columns and ledges meeting a limestone base",
    width: 1600,
    height: 1067,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const featuredProjects = {
  eyebrow: "Selected Adelaide work",
  title: "Detail you can see. Scope you can understand.",
  intro:
    "A closer look at completed and in-progress render and cladding details across Adelaide residential work.",
} as const;

/** Kept reachable so historic social-share URLs do not become broken assets. */
export const legacyProjectSocialImages = [
  "/images/og/og-contemporary-exterior-cladding.jpg",
  "/images/og/og-curved-rendered-wall-detail.jpg",
  "/images/og/og-projects.jpg",
  "/images/og/og-rendered-boundary-wall.jpg",
  "/images/og/og-mixed-cladding-and-render-facade.jpg",
] as const;
