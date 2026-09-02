import { business } from "@/content/business";

export type LocationPage = {
  slug: string;
  name: string;
  hubTitle: string;
  hubSummary: string;
  bannerTitle: string;
  metaTitle: string;
  metaDescription: string;
  intro: readonly string[];
  servicesLead: string;
  proof: readonly string[];
};

export const locationsHub = {
  bannerTitle: "Where We Work",
  metaTitle: "Adelaide & SA Service Areas",
  metaDescription:
    "Based in Salisbury East, we serve metropolitan Adelaide and assess suitable cladding, render, Hebel and walling projects elsewhere in South Australia.",
  introTitle: "Metropolitan Adelaide is our primary service area.",
  intro:
    "Based in Salisbury East, we primarily serve metropolitan Adelaide. Project availability depends on the location, scope, programme and site access, so tell us the suburb or postcode and what plans are available and we’ll confirm coverage before quoting.",
  outsideAreaTitle: "Planning work outside metropolitan Adelaide?",
  outsideAreaBody:
    "We assess projects elsewhere in South Australia individually. Tell us the suburb or postcode, scope, programme and site-access details, and note which plans are available. We’ll confirm whether the location is workable before quoting.",
} as const;

export const locationPages: readonly LocationPage[] = [
  {
    slug: "adelaide",
    name: "Adelaide",
    hubTitle: "Cladding, render, Hebel and walling across Adelaide",
    hubSummary:
      "Review our metropolitan Adelaide coverage, installation services, planning guidance and photographed project work.",
    bannerTitle: "Cladding, Render, Hebel & Walling in Adelaide",
    metaTitle: "Cladding & Rendering Adelaide",
    metaDescription:
      "Salisbury East-based cladding, render, Hebel and walling installation across Adelaide, with clear quotes and practical project coordination.",
    intro: [
      `Based in ${business.address.suburb}, ${business.name} delivers cladding, render, Hebel and walling for homes, renovations, multi-unit developments and commercial builds across metropolitan Adelaide and wider South Australia.`,
      "Whether you need one feature elevation or a coordinated facade and walling package, we quote from the plans and site information, then install to the agreed specification. Explore our project case studies or tell us about the work for an obligation-free quote.",
    ],
    servicesLead:
      "Our Adelaide work includes architectural cladding, internal and external render, Hebel systems for new construction, and coordinated walling packages for builders and developers.",
    proof: [
      "Residential render and cladding services available across metropolitan Adelaide",
      "Practical coordination with builders, developers and owner-builders",
      "Clear quotes covering the work, materials and programme assumptions",
    ],
  },
];

export function getLocation(slug: string) {
  return locationPages.find((location) => location.slug === slug);
}
