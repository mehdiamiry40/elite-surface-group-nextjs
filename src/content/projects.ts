import type {
  CalloutNote,
  ChecklistItem,
  GlossaryTerm,
} from "@/content/blocks";
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
  /**
   * What to settle before a similar job. Each point comes from a detail this
   * case study already records; none adds a fact about the project itself.
   */
  confirm: readonly string[];
  /** Terms this case study's own copy uses, in plain language. */
  terms?: readonly GlossaryTerm[];
  /** One short note on the finish or junction the photograph records. */
  note?: CalloutNote;
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
    confirm: [
      "Which wall planes and levels are included, and where the render stops",
      "The render finish and colour, agreed against a sample before it goes onto large wall planes",
      "How the edges of each opening are to be finished",
      "Where the render meets the roofline, the trims and the external stair",
      "How the upper-level walls will be reached",
    ],
    note: {
      title: "Large wall planes show everything",
      body: "Large uninterrupted surfaces make changes in texture and colour easy to see. On a job like this, agree the finish against a sample first. The [render finishes guide](/resources/render-finishes-adelaide/) explains how each texture reads on a wall.",
    },
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
    confirm: [
      "The line of the curve, and where it runs into the straight parapet",
      "That one finish is carried around the radius as a continuous surface",
      "How the render meets the glazed opening beside it",
      "How the surface will read in direct sunlight, which shows the transition clearly",
      "How the upper wall will be reached",
    ],
    terms: [
      {
        term: "Radius",
        definition:
          "The curve of a rounded wall edge. Here it is the main visual feature.",
      },
      {
        term: "Parapet",
        definition:
          "The upper part of a wall that continues above the roof edge. In this view the curve runs into a straight parapet line.",
      },
      {
        term: "Glazed opening",
        definition:
          "A window or glass wall. The rendered edge in this photograph sits beside one.",
      },
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
    confirm: [
      "Which areas are feature cladding and which keep the lighter wall finish",
      "How the panel joints are set out around the window",
      "How the cladding turns the outer corner and finishes under the eaves",
      "The cladding product, profile and colour",
      "What the wall behind the cladding is built from",
    ],
    terms: [
      {
        term: "Feature cladding",
        definition:
          "A smaller clad element set against another wall finish, such as the upper-level window surround and garage projection shown here.",
      },
      {
        term: "Panel joints",
        definition:
          "The visible lines between cladding panels. Here the horizontal and vertical joints form a grid around the window.",
      },
      {
        term: "Outer corner",
        definition:
          "Where two clad faces meet and project outwards. The dark finish continues around it in this view.",
      },
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
      "See a close view of a deep light-rendered window return and straight parapet edge beside dark-framed glazing, recorded on a finished residential exterior.",
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
    confirm: [
      "How deep the return is at the top and sides of the opening",
      "How straight and continuous the parapet edge has to read",
      "How the outside corner is formed",
      "How the render meets the dark glazing",
      "The finish, given that the detail is seen at close range",
    ],
    terms: [
      {
        term: "Return",
        definition:
          "The surface that turns in from the face of the wall to the window, also called a reveal. This one is deep and rendered.",
      },
      {
        term: "Parapet",
        definition:
          "The upper part of a wall that continues above the roof edge. Its long horizontal edge runs above the opening in this view.",
      },
      {
        term: "Outside corner",
        definition:
          "Where two wall faces meet and project outwards. The line of the corner is easy to read at close range.",
      },
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
      "View an in-progress residential exterior detail with textured rendered columns, moulded ledges and the junctions where render meets a stone-faced base.",
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
    confirm: [
      "How the render meets the stone-faced base, and which trade finishes that junction",
      "The profile of the moulded ledges and stepped bases, and how closely each repeat has to match",
      "The texture to be carried across the columns and ledges",
      "Which corners and profiles will be seen at close range",
      "What else is still under way on site, and the order the work runs in",
    ],
    note: {
      title: "This photograph shows work in progress",
      body: "The columns and ledges carry their textured finish while wider ground works are still under way. On a similar job, agree the order of work around the rendered elements, and how they are protected, before it starts.",
    },
    image: "/images/v2/project-rendered-columns-stone.webp",
    alt: "Textured rendered columns and ledges meeting a stone-faced base during exterior works",
    imageCaption:
      "In-progress exterior view of rendered columns and ledges above a stone-faced base.",
    width: 1600,
    height: 1067,
  },
];

/**
 * "How to brief a similar job" on the projects hub. It points at the planning
 * page for the full checklist rather than restating it.
 */
export const projectBriefChecklist: readonly ChecklistItem[] = [
  {
    label: "Name the case study closest to your job",
    detail:
      "Tell us which photographed finish or detail you have in mind, and what is different about your building.",
  },
  {
    label: "Describe the wall",
    detail:
      "What it is built from, roughly how large it is, and whether it has been coated or clad before.",
  },
  {
    label: "Point out the details that matter",
    detail:
      "Curves, returns, corners, panel joints, or a junction with another material.",
  },
  {
    label: "Say what is selected and what is still open",
    detail: "The system, finish or colour, if one has been chosen.",
  },
  {
    label: "Add the site basics",
    detail:
      "The suburb, the property type, your target dates and the site access. The [project planning page](/project-planning/) has the full checklist.",
  },
];

/**
 * Finish and junction terms the five case studies use. Each definition is
 * plain language plus the case study where the detail is photographed; no
 * entry describes work that is not already published above.
 */
export const projectGlossary: readonly GlossaryTerm[] = [
  {
    term: "Wall plane",
    definition:
      "One continuous flat face of a wall. Large uninterrupted planes make changes in texture and colour easy to see, as in the [two-storey exterior render](/projects/two-storey-exterior-render/) case study.",
  },
  {
    term: "Radius",
    definition:
      "The curve of a rounded wall edge. The [curved rendered wall](/projects/curved-rendered-wall-detail/) case study shows one finish carried around it.",
  },
  {
    term: "Parapet",
    definition:
      "The upper part of a wall that continues above the roof edge. Its long edge reads as a single line, which the [rendered window reveal](/projects/rendered-window-reveal-detail/) case study records.",
  },
  {
    term: "Return or reveal",
    definition:
      "The surface that turns in from the face of the wall to a window or door. The same case study shows a deep rendered return around dark glazing.",
  },
  {
    term: "Outside corner",
    definition:
      "Where two wall faces meet and project outwards. Both the line and the surface finish show at close range.",
  },
  {
    term: "Feature cladding",
    definition:
      "A smaller clad element set against another wall finish. The [dark feature cladding](/projects/dark-feature-cladding/) case study shows it around an upper window and a garage projection.",
  },
  {
    term: "Panel joints",
    definition:
      "The visible lines between cladding panels. In the same case study, horizontal and vertical joints form a grid around the window.",
  },
  {
    term: "Junction",
    definition:
      "Where one material or finish meets another. The [rendered columns and stone junctions](/projects/rendered-column-and-stone-junctions/) case study shows render meeting a stone-faced base.",
  },
  {
    term: "Textured finish",
    definition:
      "A render finish with a visible surface texture rather than a smooth trowelled face. The columns in that case study carry one.",
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
