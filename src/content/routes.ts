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
 * in enquiry logs and email notifications.
 *
 * Dates are editorial, not automatic: each one records when that route's
 * visible content last changed. Never derive them from build time or file
 * mtimes — a rebuild is not a content change, and a `lastmod` that moves
 * without the copy moving is a signal search engines learn to ignore. Several
 * routes sharing a date is expected and correct when their content genuinely
 * landed in the same release; what matters is that the date moves only when the
 * page does. `routes.test.ts` guards the shape of this list, but only a human
 * can decide that a given edit was substantial, so update the date in the same
 * change as the copy.
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
