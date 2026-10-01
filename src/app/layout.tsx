import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { CookieNotice } from "@/components/CookieNotice";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { siteConfig } from "@/lib/siteConfig";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "Rent Affordability Calculator | RentReadyCheck",
    template: "%s | RentReadyCheck",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    // Resolved per route, so each page canonicalises to its own URL.
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "./",
    siteName: siteConfig.name,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [siteConfig.ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <AdPlaceholder />
        </div>
        <Footer />
        <CookieNotice />
        <Analytics />
      </body>
    </html>
  );
}
