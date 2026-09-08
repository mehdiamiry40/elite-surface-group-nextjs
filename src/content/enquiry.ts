/**
 * Fixed enquiry choices shared by the browser form and server validation.
 *
 * Keeping these values in one module prevents the form, email payload and API
 * allowlists from drifting apart. All fields remain optional so a visitor can
 * still send an early-stage enquiry without inventing project details.
 */
export const projectTypeOptions = [
  "New build",
  "Renovation or extension",
  "Existing property repair or upgrade",
  "Multi-unit development",
  "Commercial project",
  "Other / not sure",
] as const;

export const projectTimingOptions = [
  "Ready to request a quote",
  "Within 1–3 months",
  "Within 3–6 months",
  "More than 6 months",
  "Planning / not sure",
] as const;

/** Known service intent for pages whose subject is unambiguous. */
export const enquiryServiceByPath = {
  "/cladding/": "Cladding",
  "/render/": "Render",
  "/hebel/": "Hebel",
  "/walling/": "Walling",
  "/projects/two-storey-exterior-render/": "Render",
  "/projects/curved-rendered-wall-detail/": "Render",
  "/projects/dark-feature-cladding/": "Cladding",
  "/projects/rendered-window-reveal-detail/": "Render",
  "/projects/rendered-column-and-stone-junctions/": "Render",
  "/resources/render-cracking-adelaide/": "Render",
  "/resources/cladding-maintenance-coastal-adelaide/": "Cladding",
  "/resources/rendering-hebel-panels-adelaide/": "Hebel",
  "/resources/hebel-boundary-walls-adelaide/": "Hebel",
  "/resources/rendering-over-painted-brick-adelaide/": "Render",
  "/resources/fibre-cement-vs-weatherboard-cladding-adelaide/": "Cladding",
  "/resources/load-bearing-wall-removal-adelaide/": "Walling",
  "/resources/steel-frame-vs-timber-frame-walls-adelaide/": "Walling",
  "/resources/acrylic-render-vs-cement-render-adelaide/": "Render",
  "/resources/second-storey-addition-adelaide/": "Walling",
  "/resources/repainting-render-adelaide/": "Render",
} as const satisfies Readonly<Record<string, string>>;

export function defaultEnquiryService(pathname: string) {
  const pathOnly = pathname.split(/[?#]/, 1)[0] || "/";
  const canonicalPath =
    pathOnly === "/" ? pathOnly : `${pathOnly.replace(/\/+$/, "")}/`;

  return enquiryServiceByPath[
    canonicalPath as keyof typeof enquiryServiceByPath
  ];
}
