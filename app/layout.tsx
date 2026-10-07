import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { AttributionTracker } from "@/components/AttributionTracker";
import "./fonts.css";
import "./globals.css";

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f4f1ea'/%3E%3Ctext x='50' y='66' text-anchor='middle' font-family='Georgia,serif' font-size='54' fill='%2317181b'%3EGN%3C/text%3E%3C/svg%3E";

// Polices visibles dès le premier écran (titres, marque, texte courant) :
// préchargées pour que le premier rendu n'attende pas la découverte du CSS.
const PRELOAD_FONTS = [
  "/fonts/spectral-400-latin.woff2",
  "/fonts/spectral-500-latin.woff2",
  "/fonts/geist-latin.woff2",
];

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
        {PRELOAD_FONTS.map((href) => (
          <link
            key={href}
            rel="preload"
            href={href}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body>
        {children}
        {/* Provenance (UTM, gclid…) conservée jusqu'au courriel de lead */}
        <AttributionTracker />
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
        {/* Chat Tawk.to (même property que les pages d'audit). Chargé à la
            première interaction (ou après 12 s) : son iframe causait tout le
            décalage de mise en page (CLS 0,17) et 240 Ko de JS au chargement. */}
        <Script id="tawk-chat" strategy="afterInteractive">
          {`var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
  var done = false, evts = ["pointerdown", "keydown", "touchstart", "scroll"];
  function load() {
    if (done) return;
    done = true;
    evts.forEach(function (e) { window.removeEventListener(e, load); });
    var s1 = document.createElement("script"),
      s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/6a4c1da04d65411d4822df56/1jssl7ei5";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);
  }
  evts.forEach(function (e) { window.addEventListener(e, load, { once: true, passive: true }); });
  setTimeout(load, 12000);
})();`}
        </Script>
      </body>
    </html>
  );
}
