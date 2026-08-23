export type IsoDate = `${number}-${number}-${number}`;

export type ResourceGuide = {
  slug:
    | "render-cracking-adelaide"
    | "cladding-maintenance-coastal-adelaide"
    | "rendering-hebel-panels-adelaide"
    | "rendering-over-painted-brick-adelaide"
    | "hebel-boundary-walls-adelaide"
    | "fibre-cement-vs-weatherboard-cladding-adelaide"
    | "load-bearing-wall-removal-adelaide";
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
      "An Elite Surface Group feature-cladding project, shown as an installation example—not as evidence of a particular coastal exposure category.",
    imageWidth: 1600,
    imageHeight: 1067,
    published: "2026-08-13",
    modified: "2026-08-13",
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
      "Illustrative wall-system image—not a record of a particular Elite Surface Group project or a substitute for the selected system documents.",
    imageWidth: 1600,
    imageHeight: 1067,
    published: "2026-08-13",
    modified: "2026-08-13",
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
    modified: "2026-08-13",
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
      "An Elite Surface Group cladding installation, shown as a general example—not a photograph of fibre cement weatherboard, timber weatherboard or a particular bushfire or coastal exposure category.",
    imageWidth: 1600,
    imageHeight: 1067,
    published: "2026-08-22",
    modified: "2026-08-22",
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
      "An Elite Surface Group walling installation, shown as a general example—not a photograph of a load-bearing wall removal, temporary propping system or a particular Adelaide property.",
    imageWidth: 1600,
    imageHeight: 1067,
    published: "2026-08-23",
    modified: "2026-08-23",
    publishedDisplay: "23 August 2026",
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
