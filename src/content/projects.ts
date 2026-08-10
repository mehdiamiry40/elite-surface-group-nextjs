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
    summary: "A crisp white render finish that unifies this two-storey facade.",
    suburb: "Adelaide metro",
    scope:
      "Prepare and render the two-storey residential facade, creating a consistent colour and finish across both levels.",
    challenge:
      "Maintaining clean joints, straight reveals and an even surface across two storeys and multiple areas of weather exposure.",
    outcome:
      "A smooth, uniform exterior that gives the completed home a bright and cohesive finish.",
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
    summary: "A smooth render finish carried cleanly around a curved upper wall.",
    suburb: "Adelaide metro",
    scope:
      "Apply a continuous rendered finish to the curved upper wall and adjoining window returns.",
    challenge:
      "Following the radius accurately while keeping the edge and face visually even in changing light.",
    outcome:
      "A refined, continuous finish that preserves the clean curve—even in direct sunlight.",
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
    summary: "Charcoal feature cladding creates contrast against a light rendered facade.",
    suburb: "Adelaide metro",
    scope:
      "Install dark facade panels across the upper level and garage elevation shown.",
    challenge:
      "Aligning panel lines with the windows, eaves and garage opening for a balanced elevation.",
    outcome:
      "A strong, high-contrast facade with consistent panel lines across both elevations.",
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
    summary: "Crisp render lines frame a large glazed opening and upper parapet.",
    suburb: "Adelaide metro",
    scope:
      "Render the exterior around the glazed opening, including the return and upper parapet edge.",
    challenge:
      "Keeping long horizontal edges and the deep window return straight and consistent at close range.",
    outcome:
      "An even surface with sharp lines that clearly define the window and parapet.",
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
    summary: "Crisp rendered columns and ledges finished above a natural stone base.",
    suburb: "Adelaide metro",
    scope:
      "Apply render to the column faces, moulded bases and horizontal ledges shown during construction.",
    challenge:
      "Keeping repeated column edges consistent while resolving a clean junction above irregular stonework.",
    outcome:
      "Clean, consistent columns and ledges that sit neatly above the contrasting stone base.",
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
  eyebrow: "Selected work across Adelaide",
  title: "The details make the finish.",
  intro:
    "Explore the scope, site challenges and finished details behind our residential render and cladding work.",
} as const;

/** Kept reachable so historic social-share URLs do not become broken assets. */
export const legacyProjectSocialImages = [
  "/images/og/og-contemporary-exterior-cladding.jpg",
  "/images/og/og-curved-rendered-wall-detail.jpg",
  "/images/og/og-projects.jpg",
  "/images/og/og-rendered-boundary-wall.jpg",
  "/images/og/og-mixed-cladding-and-render-facade.jpg",
] as const;
