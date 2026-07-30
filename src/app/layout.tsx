import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://elitesurfacegroup.com.au"),
  title: {
    default: "Elite Surface Group",
    template: "%s - Elite Surface Group",
  },
  description:
    "Adelaide specialists in cladding, render, Hebel and complete walling installations.",
  icons: {
    icon: [
      {
        url: "/mirror/wp-content/uploads/2026/01/cropped-esg-logo-1-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/mirror/wp-content/uploads/2026/01/cropped-esg-logo-1-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple:
      "/mirror/wp-content/uploads/2026/01/cropped-esg-logo-1-180x180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
