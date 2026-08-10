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
        description: "Architectural wall cladding, set out and detailed properly.",
      },
      {
        label: "Render",
        href: "/render",
        description: "Smooth and textured finishes for new and existing walls.",
      },
      {
        label: "Hebel",
        href: "/hebel",
        description: "Lightweight AAC wall systems installed to the tested details.",
      },
      {
        label: "Walling",
        href: "/walling",
        description: "Internal and external wall packages for builders.",
      },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Service areas", href: "/locations" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact-us" },
];

export const footerNav = {
  quickLinks: [
    { label: "About Us", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Service areas", href: "/locations" },
    { label: "Adelaide", href: "/locations/adelaide" },
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
  "Cladding, rendering, Hebel and walling for homes, renovations and commercial projects across Adelaide and South Australia.";
