import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import ConversionAnalytics from "@/components/ConversionAnalytics";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { QuoteDialogProvider } from "@/components/QuoteDialogProvider";
import { business } from "@/content/business";
import { services } from "@/content/services";
import { absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";
import "./globals.css";

// Self-hosted at build time, so the site makes no request to Google's CDN.
// A single variable family keeps the hierarchy calm and human while avoiding
// duplicate font downloads for a heading face that was visually overridden.
const sans = Figtree({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-sans",
});

const HOME_DESCRIPTION =
  "Cladding, render, Hebel and walling for homes and commercial projects across Adelaide and South Australia. Request an obligation-free quote.";

const sameAs = Object.values(business.social).filter(Boolean);

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
        width: 1200,
        height: 630,
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
  legalName: business.legalName,
  taxID: business.abn,
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
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: `${business.name} services`,
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": `${absoluteUrl(`/${service.slug}`)}#service`,
        name: `${service.name} — ${business.name}`,
        url: absoluteUrl(`/${service.slug}`),
      },
    })),
  },
  areaServed: business.serviceAreas,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.suburb,
    addressRegion: business.address.region,
    postalCode: business.address.postcode,
    addressCountry: business.address.country,
  },
  hasMap: business.address.mapUrl,
  ...(sameAs.length ? { sameAs } : {}),
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: business.phone,
      email: business.email,
      contactType: "customer service",
      areaServed: business.serviceAreas,
      availableLanguage: ["English"],
    },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: business.hours.days,
    opens: business.hours.opens,
    closes: business.hours.closes,
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
    <html lang="en-AU" className={sans.variable}>
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
          <ConversionAnalytics />
        </QuoteDialogProvider>
      </body>
    </html>
  );
}
