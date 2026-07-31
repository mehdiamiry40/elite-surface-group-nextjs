import type { Metadata } from "next";
import { Source_Sans_3, Zilla_Slab } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { QuoteDialogProvider } from "@/components/QuoteDialogProvider";
import { business } from "@/content/business";
import { absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";
import "./globals.css";

// Self-hosted at build time, so the site makes no request to Google's CDN and
// ships only the weights it actually uses. Source Sans 3 + Zilla Slab keep a
// workmanlike Adelaide trade feel without default system/Roboto stacks.
const body = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

const heading = Zilla_Slab({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-heading",
});

const HOME_DESCRIPTION =
  "Elite Surface Group installs cladding, render, Hebel and walling across Adelaide and South Australia. Free quotes for homes, renovations and commercial builds.";

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.name} | Adelaide Cladding & Render`,
    template: `%s — ${business.name}`,
  },
  description: HOME_DESCRIPTION,
  // Robots are set per-page via pageMetadata() so the App Router's automatic
  // 404 noindex is not duplicated by a root-layout index,follow directive.
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_AU",
    title: `${business.name} | Adelaide Cladding & Render`,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 1280,
        height: 960,
        alt: `${business.name} — walling and surface finishes in Adelaide`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} | Adelaide Cladding & Render`,
    description: HOME_DESCRIPTION,
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
  icons: {
    icon: [
      { url: "/images/cropped-esg-logo-1-32x32.webp", sizes: "32x32" },
      { url: "/images/cropped-esg-logo-1-192x192.webp", sizes: "192x192" },
    ],
    apple: "/images/cropped-esg-logo-1-180x180.webp",
  },
};

const organisationSchema = {
  "@context": "https://schema.org",
  "@type": ["HomeAndConstructionBusiness", "Organization"],
  "@id": `${business.siteUrl}/#organization`,
  name: business.name,
  url: business.siteUrl,
  telephone: business.phone,
  email: business.email,
  description: HOME_DESCRIPTION,
  image: absoluteUrl("/images/cropped-esg-logo-1-192x192.webp"),
  logo: {
    "@type": "ImageObject",
    "@id": `${business.siteUrl}/#logo`,
    url: absoluteUrl("/images/cropped-esg-logo-1-192x192.webp"),
    caption: business.name,
    inLanguage: "en-AU",
    width: "192",
    height: "192",
  },
  knowsAbout: [
    "Cladding installation",
    "Rendering",
    "Hebel wall systems",
    "Walling",
    "Adelaide construction finishes",
  ],
  areaServed: [
    { "@type": "City", name: "Adelaide" },
    { "@type": "AdministrativeArea", name: "South Australia" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Adelaide",
    addressRegion: "SA",
    addressCountry: "AU",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: business.phone,
      email: business.email,
      contactType: "customer service",
      areaServed: "AU",
      availableLanguage: ["English"],
    },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "09:00",
    closes: "17:00",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${business.siteUrl}/#website`,
  url: `${business.siteUrl}/`,
  name: business.name,
  description: HOME_DESCRIPTION,
  publisher: { "@id": `${business.siteUrl}/#organization` },
  inLanguage: "en-AU",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${body.variable} ${heading.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // Static, developer-authored object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <QuoteDialogProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </QuoteDialogProvider>
      </body>
    </html>
  );
}
