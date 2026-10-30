/**
 * A few photographs were exported twice, under a banner filename and a
 * content filename. Comparing paths is not enough to tell them apart.
 */
const SAME_PHOTO: ReadonlyArray<readonly string[]> = [
  [
    "/images/v2/banner-cladding.webp",
    "/images/v2/service-cladding-installation.webp",
  ],
  [
    "/images/v2/banner-render.webp",
    "/images/v2/service-render-application.webp",
  ],
  [
    "/images/v2/banner-hebel.webp",
    "/images/v2/service-hebel-installation.webp",
  ],
  [
    "/images/v2/banner-walling.webp",
    "/images/v2/service-walling-installation.webp",
  ],
  [
    "/images/v2/banner-projects.webp",
    "/images/v2/project-dark-feature-cladding.webp",
  ],
  ["/images/v2/banner-legal.webp", "/images/v2/cta-render-action.webp"],
  [
    "/images/v2/banner-services.webp",
    "/images/v2/builders-plan-review.webp",
  ],
  [
    "/images/v2/banner-contact.webp",
    "/images/v2/homeowner-consultation.webp",
  ],
  [
    "/images/v2/banner-locations.webp",
    "/images/v2/home-adelaide-coverage.webp",
  ],
];

const groupOf = new Map<string, number>();
for (const [index, group] of SAME_PHOTO.entries()) {
  for (const path of group) {
    groupOf.set(path, index);
  }
}

export function samePhotograph(a: string, b: string): boolean {
  if (a === b) {
    return true;
  }
  const group = groupOf.get(a);
  return group !== undefined && group === groupOf.get(b);
}
