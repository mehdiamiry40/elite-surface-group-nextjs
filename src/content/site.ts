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
export { aboutTeaser, heroCopy, heroSlides, process } from "@/content/home";
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
} from "@/content/pages";
export {
  getLocation,
  locationPages,
  locationsHub,
  type LocationPage,
} from "@/content/locations";
export { projectPlanningPage } from "@/content/project-planning";
export {
  acrylicVsCementRenderGuide,
  asbestosCladdingReplacementGuide,
  claddingMaintenanceGuide,
  claddingMaterialComparisonGuide,
  claddingOrientationGuide,
  claddingOverBrickGuide,
  claddingVsRenderGuide,
  externalWallInsulationGuide,
  hebelBoundaryWallsGuide,
  hebelVsBrickVeneerGuide,
  loadBearingWallRemovalGuide,
  partitionWallsGuide,
  renderCrackingGuide,
  renderFinishesGuide,
  renderingHebelGuide,
  renderingPaintedBrickGuide,
  repaintingRenderGuide,
  resourceGuides,
  resourcesHub,
  saltDampGuide,
  secondStoreyAdditionGuide,
  soundproofingWallsGuide,
  steelVsTimberFramingGuide,
  type ResourceGuide,
} from "@/content/resources";
