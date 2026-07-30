import type { Metadata } from "next";
import { PT_Sans, Roboto_Slab } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { QuoteDialogProvider } from "@/components/QuoteDialogProvider";
import { business } from "@/content/site";
import { absoluteUrl, DEFAULT_OG_IMAGE, pageMetadata } from "@/lib/seo";
import "./globals.css";

// Self-hosted at build time, so the site makes no request to Google's CDN and
// ships only the weights it actually uses.
const body = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-body",
});

const heading = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-heading",
});

const homeMeta = pageMetadata({
  description:
    "Adelaide specialists in cladding, render, Hebel and complete walling installations. Over 10 years of experience across South Australia.",
  path: "/",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.name} — Cladding, Render & Hebel Specialists in Adelaide`,
    template: `%s — ${business.name}`,
  },
  description: homeMeta.description,
  alternates: homeMeta.alternates,
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_AU",
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
  image: absoluteUrl("/images/esg-logo-1.webp"),
  logo: {
    "@type": "ImageObject",
    "@id": `${business.siteUrl}/#logo`,
    url: absoluteUrl("/images/esg-logo-1.webp"),
    caption: business.name,
    inLanguage: "en-AU",
    width: "123",
    height: "67",
  },
  areaServed: { "@type": "AdministrativeArea", name: business.area },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Adelaide",
    addressRegion: "SA",
    addressCountry: "AU",
  },
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
