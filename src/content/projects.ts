import type { Service } from "@/content/services";

export type Project = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  service: Service["slug"];
  projectType: string;
  stage: "Finished exterior" | "Finished detail" | "Work in progress";
  summary: string;
  overview: string;
  detailFocus: string;
  visibleResult: string;
  features: readonly string[];
  image: string;
  alt: string;
  imageCaption: string;
  width: number;
  height: number;
};

export type ProjectCard = Pick<
  Project,
  | "slug"
  | "title"
  | "service"
  | "stage"
  | "summary"
  | "image"
  | "alt"
  | "width"
  | "height"
>;

export const projects: readonly Project[] = [
  {
    slug: "two-storey-exterior-render",
    title: "Two-storey exterior render",
    metaTitle: "Two-storey Exterior Render Case Study",
    metaDescription:
      "View a two-storey residential exterior with a consistent light render finish across large wall planes, openings and adjoining levels.",
    service: "render",
    projectType: "Two-storey residential exterior",
    stage: "Finished exterior",
    summary:
      "A light render finish brings the visible wall planes and openings of this two-storey residence into one consistent exterior.",
    overview:
      "The finished courtyard-side view records the lower covered area, upper-level openings and the tall wall plane beside the boundary.",
    detailFocus:
      "Large uninterrupted surfaces make changes in texture and colour easy to see. The photographed finish remains visually consistent across both levels and around the rectangular openings.",
    visibleResult:
      "The light rendered walls form a restrained backdrop to the dark roofline, openings and external stair visible in the completed view.",
    features: [
      "Light exterior render finish",
      "Two-storey wall planes",
      "Clean rectangular openings",
      "Contrast with dark roofline and trims",
    ],
    image: "/images/v2/project-two-storey-exterior-render.webp",
    alt: "Two-storey residence with a consistent light render finish across the exterior walls",
    imageCaption:
      "Finished courtyard-side view showing light render across the two-storey exterior.",
    width: 1600,
    height: 1067,
  },
  {
    slug: "curved-rendered-wall-detail",
    title: "Curved rendered wall detail",
    metaTitle: "Curved Render Wall Case Study",
    metaDescription:
      "See a close view of a curved upper wall with a continuous light render finish carried around the radius beside a glazed opening.",
    service: "render",
    projectType: "Residential exterior detail",
    stage: "Finished detail",
    summary:
      "A continuous light render finish follows the curved edge of an upper wall beside a large glazed opening.",
    overview:
      "This close view records the finished curved wall edge, the adjoining straight parapet and part of the neighbouring glazing.",
    detailFocus:
      "The radius is the main visual feature. Direct sunlight across the face makes the transition from the curved edge to the straight upper line clearly visible.",
    visibleResult:
      "The photographed finish follows the curve as one continuous surface before meeting the straight parapet and glazed opening.",
    features: [
      "Curved rendered upper wall",
      "Continuous light finish",
      "Transition from radius to straight parapet",
      "Junction beside a glazed opening",
    ],
    image: "/images/v2/project-curved-render-detail.webp",
    alt: "Curved rendered upper wall with an even light finish",
    imageCaption:
      "Close view of the light rendered finish following the curved upper-wall edge.",
    width: 1600,
    height: 1067,
  },
  {
    slug: "dark-feature-cladding",
    title: "Dark feature cladding",
    metaTitle: "Dark Feature Cladding Case Study",
    metaDescription:
      "View dark panel cladding arranged around an upper-level window and garage projection on a two-storey residential facade.",
    service: "cladding",
    projectType: "Two-storey residential facade",
    stage: "Finished exterior",
    summary:
      "Dark panel cladding defines the upper-level window and garage projection against the light exterior walls.",
    overview:
      "The front view records dark feature panels around the tall upper-level window and across the projecting wall above the garage.",
    detailFocus:
      "Horizontal and vertical panel joints form a visible grid around the window, while the dark finish continues at the outer corner and under the eaves.",
    visibleResult:
      "The finished facade uses a strong dark-and-light contrast to distinguish the upper feature areas from the surrounding walls and roof forms.",
    features: [
      "Dark panel cladding",
      "Grid aligned around the upper window",
      "Clad garage projection",
      "Contrast with light exterior walls",
    ],
    image: "/images/v2/project-dark-feature-cladding.webp",
    alt: "Two-storey residence with dark panel cladding around the upper window and garage projection",
    imageCaption:
      "Front elevation showing dark panel cladding around the upper window and garage projection.",
    width: 1600,
    height: 1067,
  },
  {
    slug: "rendered-window-reveal-detail",
    title: "Rendered window reveal detail",
    metaTitle: "Rendered Window Reveal Case Study",
    metaDescription:
      "See a close view of a deep light-rendered window return and straight parapet edge beside dark-framed glazing.",
    service: "render",
    projectType: "Residential exterior detail",
    stage: "Finished detail",
    summary:
      "A deep light-rendered return frames a large glazed opening beneath a long, straight parapet edge.",
    overview:
      "The upward-looking photograph records the top and side returns of the glazed opening together with the parapet face above it.",
    detailFocus:
      "The long horizontal edge, deep return and outside corner are all visible at close range, where the line and surface finish can be read clearly.",
    visibleResult:
      "The light rendered surround creates a simple, defined frame around the dark glazing and a continuous line along the parapet.",
    features: [
      "Deep rendered window return",
      "Long horizontal parapet edge",
      "Defined outside corner",
      "Light finish beside dark glazing",
    ],
    image: "/images/v2/project-rendered-window-reveal.webp",
    alt: "Deep light-rendered reveal around a large dark-framed glazed opening",
    imageCaption:
      "Close view of the rendered window return and parapet edge beside dark glazing.",
    width: 1600,
    height: 1067,
  },
  {
    slug: "rendered-column-and-stone-junctions",
    title: "Rendered columns and stone junctions",
    metaTitle: "Rendered Column Detail Case Study",
    metaDescription:
      "View an in-progress exterior detail with textured rendered columns, moulded ledges and a stone-faced base.",
    service: "render",
    projectType: "Residential exterior detail",
    stage: "Work in progress",
    summary:
      "An in-progress view of textured rendered columns and moulded ledges meeting a contrasting stone-faced base.",
    overview:
      "The photograph records a repeating series of columns, stepped bases and a long horizontal ledge while wider ground works remain underway.",
    detailFocus:
      "The repeated corners and moulded profiles are shown beside the irregular stone-faced base, making the change between the two exterior finishes easy to inspect.",
    visibleResult:
      "At the photographed stage, the columns and ledges carry a consistent light textured finish while the surrounding site is still in progress.",
    features: [
      "Textured rendered columns",
      "Repeated moulded bases",
      "Long rendered ledge",
      "Junction above a stone-faced base",
    ],
    image: "/images/v2/project-rendered-columns-stone.webp",
    alt: "Textured rendered columns and ledges meeting a stone-faced base during exterior works",
    imageCaption:
      "In-progress exterior view of rendered columns and ledges above a stone-faced base.",
    width: 1600,
    height: 1067,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

/** Narrow data passed through the server-to-client boundary for gallery cards. */
export const projectCards: readonly ProjectCard[] = projects.map(
  ({
    slug,
    title,
    service,
    stage,
    summary,
    image,
    alt,
    width,
    height,
  }) => ({ slug, title, service, stage, summary, image, alt, width, height }),
);

export const featuredProjects = {
  eyebrow: "Selected project work",
  title: "The details make the finish.",
  intro:
    "Explore the project type, visible finish and construction details recorded in our residential render and cladding portfolio.",
} as const;

/** Kept reachable so historic social-share URLs do not become broken assets. */
export const legacyProjectSocialImages = [
  "/images/og/og-contemporary-exterior-cladding.jpg",
  "/images/og/og-curved-rendered-wall-detail.jpg",
  "/images/og/og-projects.jpg",
  "/images/og/og-rendered-boundary-wall.jpg",
  "/images/og/og-mixed-cladding-and-render-facade.jpg",
] as const;
