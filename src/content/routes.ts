import { privacyPolicyUpdated } from "@/content/legal";
import { locationPages } from "@/content/locations";
import { projects } from "@/content/projects";
import { featuredResourceGuides, resourceGuides, type IsoDate } from "@/content/resources";
import { services, type Service } from "@/content/services";

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
  claddingFacadeRefresh: "2026-11-19",
  /**
   * 25 November content build: all four service pages and the Adelaide page
   * rewritten at length, three region pages added and the service-area hub
   * reorganised around them.
   */
  serviceAndRegionContentBuild: "2026-11-25",
  /**
   * 27 November multi-format build, first run: comparison tables, decision
   * guides, checklists, numbered workflows and glossaries added to the home,
   * about, contact, services hub, project planning and project pages.
   */
  multiFormatContentBuild: "2026-11-27",
} as const;

/** Service pages whose copy changed after the shared content release. */
const SERVICE_LAST_MODIFIED: Partial<Record<Service["slug"], IsoDate>> = {
  cladding: RELEASE_DATES.serviceAndRegionContentBuild,
  render: RELEASE_DATES.serviceAndRegionContentBuild,
  hebel: RELEASE_DATES.serviceAndRegionContentBuild,
  walling: RELEASE_DATES.serviceAndRegionContentBuild,
};

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
  RELEASE_DATES.multiFormatContentBuild,
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
  publicRoute("/about/", RELEASE_DATES.multiFormatContentBuild),
  publicRoute("/services/", RELEASE_DATES.multiFormatContentBuild),
  ...services.map((service) =>
    publicRoute(
      `/${service.slug}/`,
      SERVICE_LAST_MODIFIED[service.slug] ??
        RELEASE_DATES.verifiedContentRelease,
    ),
  ),
  publicRoute("/projects/", RELEASE_DATES.multiFormatContentBuild),
  ...projects.map((project) =>
    publicRoute(
      `/projects/${project.slug}/`,
      RELEASE_DATES.multiFormatContentBuild,
    ),
  ),
  publicRoute("/locations/", RELEASE_DATES.serviceAndRegionContentBuild),
  ...locationPages.map((location) =>
    publicRoute(
      `/locations/${location.slug}/`,
      // A page that lists every guide goes stale when a guide is published; a
      // region page with a hand-picked guide list only changes with its copy.
      location.guides
        ? RELEASE_DATES.serviceAndRegionContentBuild
        : latestIsoDate(
            RELEASE_DATES.serviceAndRegionContentBuild,
            resourceGuides.map((guide) => guide.modified),
          ),
    ),
  ),
  publicRoute("/project-planning/", RELEASE_DATES.multiFormatContentBuild),
  publicRoute("/resources/", RESOURCE_AGGREGATE_LAST_MODIFIED),
  ...resourceGuides.map((guide) =>
    publicRoute(`/resources/${guide.slug}/`, guide.modified),
  ),
  publicRoute("/contact-us/", RELEASE_DATES.multiFormatContentBuild),
  publicRoute("/privacy-policy/", privacyPolicyUpdated),
  publicRoute("/terms-of-service/", RELEASE_DATES.verifiedContentRelease),
] satisfies readonly PublicRouteRecord[];

export const publicPaths = publicRouteRecords.map((record) => record.path);
