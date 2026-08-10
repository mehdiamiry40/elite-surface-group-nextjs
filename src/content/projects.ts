import type { Service } from "@/content/services";

export type Project = {
  slug: string;
  title: string;
  /** Rendered as `metaTitle — Elite Surface Group`; keep under 40 characters. */
  metaTitle: string;
  metaDescription: string;
  service: Service["slug"];
  summary: string;
  suburb: string;
  scope: string;
  challenge: string;
  outcome: string;
  /** What actually decided the quality of this result. */
  detailsLead: string;
  details: readonly string[];
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
    metaDescription:
      "A two-storey Adelaide facade rendered to a single consistent white finish, with straight reveals and clean joints across both levels.",
    service: "render",
    summary:
      "A crisp white render finish that pulls a two-storey facade together as one surface.",
    suburb: "Adelaide metro",
    scope:
      "Prepare and render the full two-storey residential facade to a single consistent colour and texture across both levels.",
    challenge:
      "Two storeys means two working platforms and a horizontal join waiting to happen. Keeping the surface even, the reveals straight and the colour consistent across levels — and across elevations with very different sun exposure — was the whole test.",
    outcome:
      "A smooth, uniform exterior that reads as one continuous surface from the street, with no visible level change between the ground and upper floors.",
    detailsLead: "What decided the result:",
    details: [
      "Substrate assessed and prepared before any render was mixed",
      "Elevations sequenced so each face was finished in one continuous run",
      "Wet edges kept live between platforms to avoid a horizontal join line",
      "Reveals and external corners struck straight and checked in raking light",
    ],
    image: "/images/v2/project-two-storey-exterior-render.webp",
    alt: "Completed two-storey Adelaide home with a smooth white exterior render finish",
    width: 1600,
    height: 1067,
  },
  {
    slug: "curved-rendered-wall-detail",
    title: "Curved rendered wall detail",
    metaTitle: "Curved Render Detail Adelaide",
    metaDescription:
      "A continuous render finish carried around a curved upper wall in Adelaide, holding an even face and a true radius in direct sunlight.",
    service: "render",
    summary:
      "A smooth render finish carried cleanly around a curved upper wall and its window returns.",
    suburb: "Adelaide metro",
    scope:
      "Apply a continuous rendered finish to the curved upper wall and the adjoining window returns.",
    challenge:
      "Curves are unforgiving. A radius that wanders by a few millimetres is invisible on a drawing and obvious on a wall, and direct sun across a curved face exaggerates every high and low spot.",
    outcome:
      "A refined, continuous finish that holds the curve cleanly — including in the late-afternoon light that usually exposes this kind of detail.",
    detailsLead: "What decided the result:",
    details: [
      "Radius set out and checked repeatedly rather than followed by eye",
      "Material built up in controlled passes to keep the face even around the curve",
      "Window returns finished to the same line as the main curved face",
      "Surface checked in raking light before the finish was signed off",
    ],
    image: "/images/v2/project-curved-render-detail.webp",
    alt: "Curved rendered upper wall on an Adelaide home with an even light finish",
    width: 1600,
    height: 1067,
  },
  {
    slug: "dark-feature-cladding",
    title: "Dark feature cladding",
    metaTitle: "Dark Feature Cladding Adelaide",
    metaDescription:
      "Charcoal feature cladding installed across an Adelaide upper level and garage elevation, aligned to the windows, eaves and opening.",
    service: "cladding",
    summary:
      "Charcoal feature cladding set against light render for a high-contrast facade.",
    suburb: "Adelaide metro",
    scope:
      "Install dark facade panels across the upper level and the garage elevation, working to the documented facade design.",
    challenge:
      "Dark panels show every misalignment. The panel lines had to relate to the windows, the eaves and the garage opening at once, across two elevations that meet at a corner, so the facade reads as one composition rather than two runs that happened to meet.",
    outcome:
      "A strong, high-contrast facade with consistent panel lines that carry across both elevations and resolve cleanly at the corner.",
    detailsLead: "What decided the result:",
    details: [
      "Setting-out driven by the openings and eaves line, not by where each run finished",
      "Panel modules planned across both elevations before the first sheet was fixed",
      "Junctions with the rendered surfaces detailed to keep a crisp material change",
      "Flashings and corner details resolved as part of the set-out",
    ],
    image: "/images/v2/project-dark-feature-cladding.webp",
    alt: "Two-storey Adelaide home with charcoal feature cladding and light rendered walls",
    width: 1600,
    height: 1067,
  },
  {
    slug: "rendered-window-reveal-detail",
    title: "Rendered window reveal detail",
    metaTitle: "Rendered Window Reveal Adelaide",
    metaDescription:
      "Crisp render lines framing a large glazed opening and upper parapet on an Adelaide home, held straight across long horizontal runs.",
    service: "render",
    summary:
      "Crisp render lines framing a large glazed opening and the parapet above it.",
    suburb: "Adelaide metro",
    scope:
      "Render the exterior around the glazed opening, including the deep window return and the upper parapet edge.",
    challenge:
      "Long horizontal edges are viewed from directly below and from close range. Any deviation in the parapet line or the deep return reads immediately, and there is nothing on this elevation to distract the eye from it.",
    outcome:
      "An even surface with sharp, straight lines that define the window and parapet clearly and hold up at close range.",
    detailsLead: "What decided the result:",
    details: [
      "Parapet and reveal lines set out from established levels rather than the opening itself",
      "Deep return finished square to the face so the shadow line stays constant",
      "Arrises kept consistent along the full length of each horizontal run",
      "Finish checked from ground level and up close before completion",
    ],
    image: "/images/v2/project-rendered-window-reveal.webp",
    alt: "Crisp rendered reveal around a large aluminium-framed window on an Adelaide home",
    width: 1600,
    height: 1067,
  },
  {
    slug: "rendered-column-and-stone-junctions",
    title: "Rendered columns and stone junctions",
    metaTitle: "Rendered Column Detail Adelaide",
    metaDescription:
      "Rendered columns, moulded bases and ledges finished above a natural stone base on an Adelaide home, with repeated edges kept consistent.",
    service: "render",
    summary:
      "Crisp rendered columns and ledges finished above a natural stone base.",
    suburb: "Adelaide metro",
    scope:
      "Apply render to the column faces, moulded bases and horizontal ledges, working alongside the stonework during construction.",
    challenge:
      "Repeated elements invite comparison. Every column had to match its neighbours in width, edge and profile, and each one then had to resolve into a stone base whose top surface is, by nature, irregular.",
    outcome:
      "Consistent columns and ledges that read as a set, sitting neatly above the contrasting stone base with a clean junction all the way along.",
    detailsLead: "What decided the result:",
    details: [
      "Column widths and profiles checked against each other rather than individually",
      "Ledge lines carried through at a constant height across the elevation",
      "Junction above the irregular stonework detailed to keep a straight visual line",
      "Sequenced with the stonemasonry so neither trade compromised the other",
    ],
    image: "/images/v2/project-rendered-columns-stone.webp",
    alt: "Rendered exterior columns and ledges meeting a natural limestone base in Adelaide",
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
    "The scope, the site challenge and the finished detail behind our residential render and cladding work around Adelaide.",
} as const;

/** Kept reachable so historic social-share URLs do not become broken assets. */
export const legacyProjectSocialImages = [
  "/images/og/og-contemporary-exterior-cladding.jpg",
  "/images/og/og-curved-rendered-wall-detail.jpg",
  "/images/og/og-projects.jpg",
  "/images/og/og-rendered-boundary-wall.jpg",
  "/images/og/og-mixed-cladding-and-render-facade.jpg",
] as const;
