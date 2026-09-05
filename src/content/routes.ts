import { privacyPolicyUpdated } from "@/content/legal";
import { locationPages } from "@/content/locations";
import { projects } from "@/content/projects";
import { featuredResourceGuides, resourceGuides, type IsoDate } from "@/content/resources";
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
  serviceAreaHubRefresh: "2026-09-02",
  homeGuideCuration: "2026-09-05",
} as const;

/** Keep an aggregate page current when any content it renders becomes newer. */
function latestIsoDate(
  baseline: IsoDate,
  dates: readonly IsoDate[],
): IsoDate {
  return dates.reduce(
    (latest, candidate) => (candidate > latest ? candidate : latest),
    baseline,
  );
}

const HOME_LAST_MODIFIED = latestIsoDate(
  RELEASE_DATES.homeGuideCuration,
  featuredResourceGuides.map((guide) => guide.modified),
);

const RESOURCE_AGGREGATE_LAST_MODIFIED = latestIsoDate(
  RELEASE_DATES.verifiedContentRelease,
  resourceGuides.map((guide) => guide.modified),
);

/**
 * Canonical public route inventory.
 *
 * The sitemap and contact-form source attribution both consume this list so a
 * newly published page cannot be indexable while being recorded as "unknown"
 * in enquiry logs and email notifications.
 *
 * Base dates are editorial, not build timestamps: each one records when that
 * route's visible content last changed. Aggregate pages that render the full
 * resource inventory derive their date from those editorial guide dates, so a
 * published guide cannot leave an index page stale. Never derive dates from
 * build time or file mtimes — a rebuild is not a content change, and a
 * `lastmod` that moves without the copy moving is a signal search engines learn
 * to ignore. Several routes sharing a date is expected and correct when their
 * content genuinely landed in the same release.
 */
export const publicRouteRecords = [
  publicRoute("/", HOME_LAST_MODIFIED),
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
  publicRoute("/locations/", RELEASE_DATES.serviceAreaHubRefresh),
  ...locationPages.map((location) =>
    publicRoute(
      `/locations/${location.slug}/`,
      RESOURCE_AGGREGATE_LAST_MODIFIED,
    ),
  ),
  publicRoute("/project-planning/", RELEASE_DATES.verifiedContentRelease),
  publicRoute("/blog/", "2026-08-24"),
  publicRoute("/resources/", RESOURCE_AGGREGATE_LAST_MODIFIED),
  ...resourceGuides.map((guide) =>
    publicRoute(`/resources/${guide.slug}/`, guide.modified),
  ),
  publicRoute("/contact-us/", RELEASE_DATES.verifiedContentRelease),
  publicRoute("/privacy-policy/", privacyPolicyUpdated),
  publicRoute("/terms-of-service/", RELEASE_DATES.verifiedContentRelease),
] satisfies readonly PublicRouteRecord[];

export const publicPaths = publicRouteRecords.map((record) => record.path);
