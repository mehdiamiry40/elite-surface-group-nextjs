import { locationPages } from "@/content/locations";
import { projects } from "@/content/projects";
import { resourceGuides } from "@/content/resources";
import { services } from "@/content/services";

/**
 * Canonical public route inventory.
 *
 * The sitemap and contact-form source attribution both consume this list so a
 * newly published page cannot be indexable while being recorded as "unknown"
 * in enquiry logs and email notifications.
 */
export const publicPaths = [
  "/",
  "/about/",
  "/services/",
  ...services.map((service) => `/${service.slug}/`),
  "/projects/",
  ...projects.map((project) => `/projects/${project.slug}/`),
  "/locations/",
  ...locationPages.map((location) => `/locations/${location.slug}/`),
  "/project-planning/",
  "/resources/",
  ...resourceGuides.map((guide) => `/resources/${guide.slug}/`),
  "/contact-us/",
  "/privacy-policy/",
  "/terms-of-service/",
] as const;
