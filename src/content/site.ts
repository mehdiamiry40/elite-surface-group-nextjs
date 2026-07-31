/**
 * Convenience re-exports for server components and legacy imports.
 *
 * Client components should import from the narrow modules (`business`,
 * `navigation`, `services`, `home`, `pages`) so unused page copy stays out of
 * the browser bundle.
 */

export { business } from "@/content/business";
export {
  footerBlurb,
  footerNav,
  mainNav,
  type NavItem,
} from "@/content/navigation";
export {
  serviceNames,
  services,
  servicesIntro,
  type Service,
  type ServiceFaq,
} from "@/content/services";
export {
  aboutTeaser,
  differentiators,
  expertise,
  heroCopy,
  heroSlides,
  process,
  whyChoose,
} from "@/content/home";
export {
  featuredProjects,
  getProject,
  projects,
  type Project,
} from "@/content/projects";
export {
  aboutPage,
  bannerImages,
  contactPage,
  contactSection,
  ctaBand,
  projectsPage,
  servicesPage,
  testimonials,
  testimonialsSection,
} from "@/content/pages";
export {
  getLocation,
  locationPages,
  locationsHub,
  type LocationPage,
} from "@/content/locations";
