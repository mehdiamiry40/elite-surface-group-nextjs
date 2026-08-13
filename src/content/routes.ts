import { locationPages } from "@/content/locations";
import { projects } from "@/content/projects";
import { resourceGuides, type IsoDate } from "@/content/resources";
import { services } from "@/content/services";

export type PublicRouteRecord = {
  path: string;
  /** Last substantial change to this route's primary content, in ISO format. */
  lastModified: IsoDate;
};

function publicRoute(path: string, lastModified: IsoDate): PublicRouteRecord {
  return { path, lastModified };
}

const RELEASE_DATES = {
  initialServiceHub: "2026-08-10",
  verifiedContentRelease: "2026-08-13",
} as const;

/**
 * Canonical public route inventory.
 *
 * The sitemap and contact-form source attribution both consume this list so a
 * newly published page cannot be indexable while being recorded as "unknown"
 * in enquiry logs and email notifications. Dates belong to individual route
 * content; do not replace them with build time or one site-wide release date.
 */
export const publicRouteRecords = [
  publicRoute("/", RELEASE_DATES.verifiedContentRelease),
  publicRoute("/about/", RELEASE_DATES.verifiedContentRelease),
  publicRoute("/services/", RELEASE_DATES.initialServiceHub),
  ...services.map((service) =>
    publicRoute(
      `/${service.slug}/`,
      RELEASE_DATES.verifiedContentRelease,
    ),
  ),
  publicRoute("/projects/", RELEASE_DATES.verifiedContentRelease),
  ...projects.map((project) =>
    publicRoute(
      `/projects/${project.slug}/`,
      RELEASE_DATES.verifiedContentRelease,
    ),
  ),
  publicRoute("/locations/", RELEASE_DATES.verifiedContentRelease),
  ...locationPages.map((location) =>
    publicRoute(
      `/locations/${location.slug}/`,
      RELEASE_DATES.verifiedContentRelease,
    ),
  ),
  publicRoute("/project-planning/", RELEASE_DATES.verifiedContentRelease),
  publicRoute("/resources/", RELEASE_DATES.verifiedContentRelease),
  ...resourceGuides.map((guide) =>
    publicRoute(`/resources/${guide.slug}/`, guide.modified),
  ),
  publicRoute("/contact-us/", RELEASE_DATES.verifiedContentRelease),
  publicRoute("/privacy-policy/", RELEASE_DATES.verifiedContentRelease),
  publicRoute("/terms-of-service/", RELEASE_DATES.verifiedContentRelease),
] satisfies readonly PublicRouteRecord[];

export const publicPaths = publicRouteRecords.map((record) => record.path);
