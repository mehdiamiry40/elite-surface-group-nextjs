export type IsoDate = `${number}-${number}-${number}`;

export type ResourceGuide = {
  slug:
    | "render-cracking-adelaide"
    | "cladding-maintenance-coastal-adelaide"
    | "rendering-hebel-panels-adelaide"
    | "rendering-over-painted-brick-adelaide"
    | "hebel-boundary-walls-adelaide"
    | "fibre-cement-vs-weatherboard-cladding-adelaide"
    | "load-bearing-wall-removal-adelaide"
    | "steel-frame-vs-timber-frame-walls-adelaide"
    | "acrylic-render-vs-cement-render-adelaide"
    | "second-storey-addition-adelaide"
    | "repainting-render-adelaide"
    | "salt-damp-adelaide"
    | "hebel-vs-brick-veneer-adelaide"
    | "cladding-over-brick-adelaide";
  serviceSlug: "cladding" | "render" | "hebel" | "walling";
  category: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  imageWidth: number;
  imageHeight: number;
  published: IsoDate;
  modified: IsoDate;
  publishedDisplay: string;
  readingTime: string;
};

export const resourcesHub = {
  bannerTitle: "Practical Surface & Walling Guides",
  metaTitle: "Adelaide Render, Cladding & Hebel Guides",
  metaDescription:
    "Practical Adelaide guides about render, cladding and Hebel wall systems, including what to check before seeking assessment, repair advice or a quote.",
  lead: "Clear information helps you ask better questions about a wall system and its care. These guides explain what to document, which product information to follow and when another professional may need to assess the building.",
} as const;

export const resourceGuides: readonly ResourceGuide[] = [
  {
    slug: "render-cracking-adelaide",
    serviceSlug: "render",
    category: "Render care",
    title:
      "What Causes Render Cracking in Adelaide—and What Should You Do Next?",
    metaTitle: "What Causes Render Cracking in Adelaide?",
    metaDescription:
      "Understand common causes of render cracking in Adelaide, signs that need prompt assessment and what to document before requesting repair advice.",
    summary:
      "Learn why rendered walls can crack, which changes deserve prompt assessment and why the cause should be understood before a cosmetic repair begins.",
    image: "/images/v2/resource-render-cracking-adelaide.webp",
    imageAlt:
      "Illustrative close view of a crack extending from a window corner across a rendered exterior wall",
    imageCaption:
      "AI-generated illustration only—not a photograph of an Elite Surface Group project or an actual property. A crack’s appearance can provide context, but cannot identify the cause by itself.",
    imageWidth: 1536,
    imageHeight: 1024,
    published: "2026-08-13",
    modified: "2026-08-13",
    publishedDisplay: "13 August 2026",
    readingTime: "8 minute read",
  },
  {
    slug: "cladding-maintenance-coastal-adelaide",
    serviceSlug: "cladding",
    category: "Cladding care",
    title: "How to Maintain Exterior Cladding in Coastal Adelaide",
    metaTitle: "Coastal Cladding Maintenance Adelaide",
    metaDescription:
      "How to check coastal cladding near Adelaide, find product-specific cleaning guidance and recognise signs that need professional assessment.",
    summary:
      "Use the exact product and exposure—not a generic schedule—to plan cleaning, ground-level checks and professional assessment for exterior cladding.",
    image: "/images/v2/project-dark-feature-cladding.webp",
    imageAlt:
      "Two-storey residence with dark panel cladding around an upper window and garage projection",
    imageCaption:
      "Illustrative cladding image. The image does not establish a particular product, project location or coastal exposure category.",
    imageWidth: 1600,
    imageHeight: 1067,
    published: "2026-08-13",
    modified: "2026-09-05",
    publishedDisplay: "13 August 2026",
    readingTime: "10 minute read",
  },
  {
    slug: "rendering-hebel-panels-adelaide",
    serviceSlug: "hebel",
    category: "Hebel & render",
    title:
      "Can Hebel Be Rendered? What to Confirm Before an Adelaide Project",
    metaTitle: "Can Hebel Be Rendered? Adelaide Guide",
    metaDescription:
      "Learn how Hebel panels, control joints, compatible coating systems and trade scopes fit together before installation and rendering begin in Adelaide.",
    summary:
      "Understand why the exact Hebel system, movement details, coating specification and trade responsibilities need to be coordinated before work begins.",
    image: "/images/v2/service-hebel-installation.webp",
    imageAlt:
      "Installer checking the vertical alignment of AAC wall panels beside steel framing",
    imageCaption:
      "Illustrative wall-system image. The image does not establish a particular project or replace the selected system documents.",
    imageWidth: 1600,
    imageHeight: 1067,
    published: "2026-08-13",
    modified: "2026-09-05",
    publishedDisplay: "13 August 2026",
    readingTime: "9 minute read",
  },
  {
    slug: "rendering-over-painted-brick-adelaide",
    serviceSlug: "render",
    category: "Render preparation",
    title:
      "Can You Render Over Painted Brick? What Adelaide Homeowners Should Confirm",
    metaTitle: "Can You Render Over Painted Brick? Adelaide",
    metaDescription:
      "Understand when painted brick may be suitable for render, what must be assessed first and which safety and planning checks matter for Adelaide projects.",
    summary:
      "Learn why the paint, masonry, moisture history and selected coating system must be assessed before an existing brick exterior is rendered.",
    image: "/images/v2/resource-rendering-painted-brick.webp",
    imageAlt:
      "Illustrative inspection of a worn area on a white-painted brick exterior",
    imageCaption:
      "AI-generated illustration only—not a photograph of an Elite Surface Group project or an actual property. Surface appearance alone cannot confirm coating adhesion, masonry condition or a suitable render specification.",
    imageWidth: 1536,
    imageHeight: 1024,
    published: "2026-08-13",
    modified: "2026-08-13",
    publishedDisplay: "13 August 2026",
    readingTime: "9 minute read",
  },
  {
    slug: "hebel-boundary-walls-adelaide",
    serviceSlug: "hebel",
    category: "Hebel project planning",
    title:
      "Hebel Boundary Walls in Adelaide: What to Confirm Before Installation",
    metaTitle: "Hebel Boundary Walls Adelaide Guide",
    metaDescription:
      "Understand which Hebel boundary-wall system is documented and what Adelaide builders should confirm about design, approvals, access, sequencing and scope.",
    summary:
      "Learn how wall terminology, approved documents, access, sequencing and trade responsibilities shape a useful Hebel boundary-wall installation enquiry.",
    image: "/images/v2/resource-hebel-boundary-walls-adelaide.webp",
    imageAlt:
      "AI-generated illustration of a construction professional reviewing drawings beside a full-height pale panel wall between two framed buildings",
    imageCaption:
      "AI-generated planning illustration only—not a photograph of an Elite Surface Group project, an approved Hebel detail or evidence that the pictured configuration suits a particular site.",
    imageWidth: 1536,
    imageHeight: 1024,
    published: "2026-08-13",
    modified: "2026-08-31",
    publishedDisplay: "13 August 2026",
    readingTime: "10 minute read",
  },
  {
    slug: "fibre-cement-vs-weatherboard-cladding-adelaide",
    serviceSlug: "cladding",
    category: "Cladding selection",
    title:
      "Fibre Cement or Timber Weatherboard? What Adelaide Homes Should Confirm First",
    metaTitle: "Fibre Cement vs Weatherboard Cladding SA",
    metaDescription:
      "Compare fibre cement and weatherboard cladding for Adelaide homes, covering bushfire zoning, coastal exposure and upkeep to confirm before you choose.",
    summary:
      "See how bushfire-prone zoning, coastal salt exposure and repaint cycles separate fibre cement from timber weatherboard cladding before a system is chosen.",
    image: "/images/v2/service-cladding-installation.webp",
    imageAlt:
      "Installer aligning charcoal vertical cladding on a residential exterior wall",
    imageCaption:
      "Illustrative cladding image. The image does not establish a fibre cement or timber weatherboard specification, bushfire rating or coastal exposure category.",
    imageWidth: 1600,
    imageHeight: 1067,
    published: "2026-08-22",
    modified: "2026-09-05",
    publishedDisplay: "22 August 2026",
    readingTime: "9 minute read",
  },
  {
    slug: "load-bearing-wall-removal-adelaide",
    serviceSlug: "walling",
    category: "Renovation walling",
    title:
      "Removing a Load-Bearing Wall in Adelaide: What to Confirm Before Work Begins",
    metaTitle: "Load-Bearing Wall Removal Adelaide Guide",
    metaDescription:
      "Planning a load-bearing wall removal in Adelaide? See what engineering, consent and reframing steps to confirm before an opening or renovation begins.",
    summary:
      "Removing or opening up an internal wall changes how loads travel through a house. See what engineering assessment, approvals and reframing sequencing an Adelaide renovation should confirm first.",
    image: "/images/v2/service-walling-installation.webp",
    imageAlt:
      "Installer checking internal steel wall framing with a laser level",
    imageCaption:
      "Illustrative wall-framing image. The image does not establish a structural design, temporary propping arrangement or suitability for a particular site.",
    imageWidth: 1600,
    imageHeight: 1067,
    published: "2026-08-23",
    modified: "2026-09-05",
    publishedDisplay: "23 August 2026",
    readingTime: "9 minute read",
  },
  {
    slug: "steel-frame-vs-timber-frame-walls-adelaide",
    serviceSlug: "walling",
    category: "Wall framing",
    title:
      "Steel Frame or Timber Frame Walls? What Adelaide Projects Should Confirm First",
    metaTitle: "Steel Frame vs Timber Frame Walls Adelaide",
    metaDescription:
      "Compare steel and timber wall framing for Adelaide projects, including compliance pathways, termite scope, coastal exposure and footing design.",
    summary:
      "Compare the compliance pathways, termite scope, coastal exposure, footing design and bushfire requirements that shape a documented steel or timber wall-framing choice.",
    image: "/images/v2/service-walling-installation.webp",
    imageAlt:
      "Installer checking internal steel wall framing with a laser level",
    imageCaption:
      "Illustrative wall-framing image. The image does not establish a structural design, temporary propping arrangement or suitability for a particular site.",
    imageWidth: 1600,
    imageHeight: 1067,
    published: "2026-08-21",
    modified: "2026-09-05",
    publishedDisplay: "21 August 2026",
    readingTime: "9 minute read",
  },
  {
    slug: "acrylic-render-vs-cement-render-adelaide",
    serviceSlug: "render",
    category: "Render selection",
    title: "Acrylic Render vs Cement Render: What Should Adelaide Homes Choose?",
    metaTitle: "Acrylic Render vs Cement Render in Adelaide",
    metaDescription:
      "Weighing acrylic render against cement render for an Adelaide home? Compare flexibility, substrate fit and coastal durability before you choose a system.",
    summary:
      "Acrylic and cement render behave differently under Adelaide's clay soils, coastal salt air and dry summers—see what actually separates the two before you commit to a system.",
    image: "/images/v2/service-render-application.webp",
    imageAlt: "Tradesperson applying an even render finish to an exterior wall",
    imageCaption:
      "Illustrative rendering image. The image does not establish a particular acrylic or cement render system, substrate or specification.",
    imageWidth: 1600,
    imageHeight: 1067,
    published: "2026-08-24",
    modified: "2026-09-05",
    publishedDisplay: "24 August 2026",
    readingTime: "9 minute read",
  },
  {
    slug: "second-storey-addition-adelaide",
    serviceSlug: "walling",
    category: "Second-storey additions",
    title:
      "Adding a Second Storey in Adelaide: What Your Existing Walls Need to Confirm First",
    metaTitle: "Second Storey Addition Adelaide Guide",
    metaDescription:
      "Planning a second storey addition in Adelaide? See what your existing walls, footings and approvals should confirm before framing begins.",
    summary:
      "A second storey changes the load travelling through every wall and footing below it—see what an Adelaide home should have assessed before an upper-level addition begins.",
    image: "/images/v2/service-walling-installation.webp",
    imageAlt:
      "Installer checking internal steel wall framing with a laser level",
    imageCaption:
      "Illustrative wall-framing image. The image does not establish a structural design, temporary propping arrangement or suitability for a particular site.",
    imageWidth: 1600,
    imageHeight: 1067,
    published: "2026-09-07",
    modified: "2026-09-07",
    publishedDisplay: "7 September 2026",
    readingTime: "10 minute read",
  },
  {
    slug: "repainting-render-adelaide",
    serviceSlug: "render",
    category: "Render maintenance",
    title:
      "Repainting Rendered Walls in Adelaide: What to Check Before the First Coat",
    metaTitle: "Repainting Render in Adelaide",
    metaDescription:
      "Repainting render on an Adelaide home? See how to assess the existing surface, deal with cracks and choose a coating that survives local exposure.",
    summary:
      "A rendered wall that looks tired is not always ready for paint. See what the existing surface, its cracks and its exposure need to confirm before a recoat is specified.",
    image: "/images/v2/project-two-storey-exterior-render.webp",
    imageAlt:
      "Two-storey residence with a consistent light render finish across the exterior walls",
    imageCaption:
      "Elite Surface Group project photograph. The image records a finished render surface and does not establish a particular coating system, age or recoating interval.",
    imageWidth: 1600,
    imageHeight: 1067,
    published: "2026-09-08",
    modified: "2026-09-08",
    publishedDisplay: "8 September 2026",
    readingTime: "9 minute read",
  },
  {
    slug: "salt-damp-adelaide",
    serviceSlug: "render",
    category: "Render and moisture",
    title:
      "Salt Damp in Adelaide Homes: Why Render Alone Will Not Fix It",
    metaTitle: "Salt Damp in Adelaide: Can Render Fix It?",
    metaDescription:
      "Seeing salt damp on an Adelaide wall? Learn why rendering over it usually makes things worse and what has to be assessed before any repair.",
    summary:
      "White powdery deposits and crumbling mortar near the base of a wall point to a moisture source, not a finish problem. See what an older Adelaide home needs assessed before render is considered.",
    image: "/images/v2/resource-rendering-painted-brick.webp",
    imageAlt:
      "Illustrative inspection of a worn area on a white-painted brick exterior",
    imageCaption:
      "AI-generated illustration only—not a photograph of an Elite Surface Group project or an actual property. Surface appearance alone cannot confirm a moisture source, a salt damp diagnosis or the condition of the masonry behind a coating.",
    imageWidth: 1536,
    imageHeight: 1024,
    published: "2026-09-09",
    modified: "2026-09-09",
    publishedDisplay: "9 September 2026",
    readingTime: "9 minute read",
  },
  {
    slug: "hebel-vs-brick-veneer-adelaide",
    serviceSlug: "hebel",
    category: "Hebel selection",
    title:
      "Hebel or Brick Veneer? What Adelaide Homes Should Compare First",
    metaTitle: "Hebel vs Brick Veneer for Adelaide Homes",
    metaDescription:
      "Choosing between Hebel and brick veneer for an Adelaide build? Compare how each wall is built, insulated, finished and approved before you commit.",
    summary:
      "Hebel panels and brick veneer can finish to a similar look from very different walls. See what separates them on an Adelaide site—frame, cavity, weight, coating and who carries the finish.",
    image: "/images/v2/service-hebel-installation.webp",
    imageAlt:
      "Installer checking the vertical alignment of AAC wall panels beside steel framing",
    imageCaption:
      "Illustrative wall-system image. The image does not establish a particular Hebel system, panel thickness, framing arrangement or suitability for a given site.",
    imageWidth: 1600,
    imageHeight: 1067,
    published: "2026-09-11",
    modified: "2026-09-11",
    publishedDisplay: "11 September 2026",
    readingTime: "10 minute read",
  },
  {
    slug: "cladding-over-brick-adelaide",
    serviceSlug: "cladding",
    category: "Cladding over masonry",
    title:
      "Cladding Over Brick in Adelaide: What the Existing Wall Decides",
    metaTitle: "Cladding Over Brick in Adelaide",
    metaDescription:
      "Planning cladding over brick on an Adelaide home? See what the wall behind it, its cavity, flashings and approvals need to confirm before boards go up.",
    summary:
      "Fixing a lightweight system to a brick wall that already sheds water is a different job to cladding a new frame. See what the substrate, its moisture history and every junction settle first.",
    image: "/images/v2/project-dark-feature-cladding.webp",
    imageAlt:
      "Two-storey residence with dark panel cladding around an upper window and garage projection",
    imageCaption:
      "Elite Surface Group project photograph. The image records a finished cladding installation and does not establish a particular substrate, batten arrangement or fixing method.",
    imageWidth: 1600,
    imageHeight: 1067,
    published: "2026-09-12",
    modified: "2026-09-12",
    publishedDisplay: "12 September 2026",
    readingTime: "9 minute read",
  },
];

function guideBySlug(slug: ResourceGuide["slug"]): ResourceGuide {
  const guide = resourceGuides.find((item) => item.slug === slug);
  if (!guide) {
    throw new Error(`Missing resource guide: ${slug}`);
  }
  return guide;
}

export const renderCrackingGuide = guideBySlug("render-cracking-adelaide");
export const claddingMaintenanceGuide = guideBySlug(
  "cladding-maintenance-coastal-adelaide",
);
export const renderingHebelGuide = guideBySlug(
  "rendering-hebel-panels-adelaide",
);
export const renderingPaintedBrickGuide = guideBySlug(
  "rendering-over-painted-brick-adelaide",
);
export const hebelBoundaryWallsGuide = guideBySlug(
  "hebel-boundary-walls-adelaide",
);
export const claddingMaterialComparisonGuide = guideBySlug(
  "fibre-cement-vs-weatherboard-cladding-adelaide",
);
export const loadBearingWallRemovalGuide = guideBySlug(
  "load-bearing-wall-removal-adelaide",
);
export const steelVsTimberFramingGuide = guideBySlug(
  "steel-frame-vs-timber-frame-walls-adelaide",
);
export const acrylicVsCementRenderGuide = guideBySlug(
  "acrylic-render-vs-cement-render-adelaide",
);
export const secondStoreyAdditionGuide = guideBySlug(
  "second-storey-addition-adelaide",
);
export const repaintingRenderGuide = guideBySlug("repainting-render-adelaide");
export const saltDampGuide = guideBySlug("salt-damp-adelaide");
export const hebelVsBrickVeneerGuide = guideBySlug(
  "hebel-vs-brick-veneer-adelaide",
);
export const claddingOverBrickGuide = guideBySlug(
  "cladding-over-brick-adelaide",
);

/** A short selection for Home; the Resources hub retains every guide. */
export const featuredResourceGuides = [
  renderCrackingGuide,
  claddingMaterialComparisonGuide,
  hebelBoundaryWallsGuide,
] as const;
