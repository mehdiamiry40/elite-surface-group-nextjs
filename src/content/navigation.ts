export type NavItem = {
  label: string;
  href: string;
  children?: readonly NavItem[];
};

export const mainNav: readonly NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Cladding", href: "/cladding" },
      { label: "Render", href: "/render" },
      { label: "Hebel", href: "/hebel" },
      { label: "Walling", href: "/walling" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Service areas", href: "/locations" },
  { label: "Contact Us", href: "/contact-us" },
];

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
