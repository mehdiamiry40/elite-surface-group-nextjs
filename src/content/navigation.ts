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
        description: "Architectural facades and durable external finishes.",
      },
      {
        label: "Render",
        href: "/render",
        description: "Clean, resilient finishes for new and existing walls.",
      },
      {
        label: "Hebel",
        href: "/hebel",
        description: "Lightweight wall systems installed with precision.",
      },
      {
        label: "Walling",
        href: "/walling",
        description: "Complete internal and external walling solutions.",
      },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Service areas", href: "/locations" },
  { label: "Contact", href: "/contact-us" },
];

// The desktop header follows a two-tier information hierarchy: commercial
// decision paths stay in the main row while quieter company links sit above.
// Mobile keeps the complete `mainNav` list in one place.
export const primaryNav: readonly NavItem[] = mainNav.slice(0, 2);
export const utilityNav: readonly NavItem[] = mainNav.slice(2);

export const footerNav = {
  quickLinks: [
    { label: "About Us", href: "/about" },
    { label: "Projects", href: "/projects" },
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
  "Cladding, render, Hebel and walling installation across Adelaide and South Australia for residential and commercial projects.";
