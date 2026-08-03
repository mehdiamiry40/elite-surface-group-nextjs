export type LocationPage = {
  slug: string;
  name: string;
  bannerTitle: string;
  metaTitle: string;
  metaDescription: string;
  intro: readonly string[];
  servicesLead: string;
  proof: readonly string[];
};

export const locationsHub = {
  bannerTitle: "Service Areas Across Adelaide",
  metaTitle: "Adelaide Service Areas",
  metaDescription:
    "Elite Surface Group provides cladding, render, Hebel and walling services across Adelaide and South Australia.",
  intro:
    "We work across Adelaide and broader South Australia. The pages below are for areas where we regularly deliver walling and surface-finish work — each links to real services and project examples rather than thin location stubs.",
} as const;

export const locationPages: readonly LocationPage[] = [
  {
    slug: "adelaide",
    name: "Adelaide",
    bannerTitle: "Cladding, Render & Walling in Adelaide",
    metaTitle: "Cladding & Rendering Adelaide",
    metaDescription:
      "Adelaide cladding, render, Hebel and walling installation by Elite Surface Group — local team, clear quotes and project-ready finishes.",
    intro: [
      "Elite Surface Group is based around Adelaide and delivers cladding, rendering, Hebel and walling work for homes, renovations and commercial builds across the metro area and wider South Australia.",
      "Whether you need a full facade package or a focused render or cladding elevation, we quote from the project brief and install to the agreed specification. Browse our Adelaide metro project examples, then request an obligation-free quote.",
    ],
    servicesLead:
      "Common Adelaide enquiries we handle include weather-exposed cladding, exterior and interior render, Hebel wall systems for new builds, and coordinated walling packages for builders.",
    proof: [
      "Completed render and cladding projects across Adelaide metro homes",
      "Coordination with local builders and owner-builders",
      "Quotes that state scope, materials and programme assumptions clearly",
    ],
  },
];

export function getLocation(slug: string) {
  return locationPages.find((location) => location.slug === slug);
}
