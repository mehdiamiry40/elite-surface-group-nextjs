export type ResourceGuide = {
  slug:
    | "render-cracking-adelaide"
    | "cladding-maintenance-coastal-adelaide";
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
  published: string;
  modified: string;
  publishedDisplay: string;
  readingTime: string;
};

export const resourcesHub = {
  bannerTitle: "Practical Surface & Walling Guides",
  metaTitle: "Adelaide Render & Cladding Resources",
  metaDescription:
    "Practical Adelaide guides about render, cladding and wall systems, including what to check before seeking assessment, repair advice or a quote.",
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
];

export const renderCrackingGuide = resourceGuides[0];
export const claddingMaintenanceGuide = resourceGuides[1];
