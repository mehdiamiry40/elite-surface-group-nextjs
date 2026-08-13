export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: readonly NavItem[];
};

export const mainNav: readonly NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Cladding",
        href: "/cladding",
        description: "Architectural cladding installed for a clean, refined finish.",
      },
      {
        label: "Render",
        href: "/render",
        description: "Smooth and textured finishes for new and existing walls.",
      },
      {
        label: "Hebel",
        href: "/hebel",
        description: "Lightweight wall systems installed to the project specification.",
      },
      {
        label: "Walling",
        href: "/walling",
        description: "Internal and external walling for new builds and renovations.",
      },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Project planning", href: "/project-planning" },
  { label: "Service areas", href: "/locations" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact-us" },
];

export const footerNav = {
  quickLinks: [
    { label: "About Us", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Project planning", href: "/project-planning" },
    { label: "Service areas", href: "/locations" },
    { label: "Contact Us", href: "/contact-us" },
  ],
  services: [
    { label: "Cladding", href: "/cladding" },
    { label: "Render", href: "/render" },
    { label: "Hebel", href: "/hebel" },
    { label: "Walling", href: "/walling" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
} as const;

export const footerBlurb =
  "Carefully planned cladding, render, Hebel and walling for homes and commercial projects across Adelaide and South Australia.";
