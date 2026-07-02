import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f4f1ea'/%3E%3Ctext x='50' y='66' text-anchor='middle' font-family='Georgia,serif' font-size='54' fill='%2317181b'%3EGN%3C/text%3E%3C/svg%3E";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&family=Pinyon+Script&family=Spectral:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap";

export const metadata: Metadata = {
  metadataBase: new URL("https://gabrielnadon.com"),
  authors: [{ name: "Gabriel Nadon" }],
  icons: { icon: FAVICON },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export const viewport: Viewport = {
  themeColor: "#17181b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href={FONTS} />
      </head>
      <body>
        {children}
        {/* Google Analytics GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QJHNSFXNH0"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-QJHNSFXNH0');`}
        </Script>
      </body>
    </html>
  );
}
