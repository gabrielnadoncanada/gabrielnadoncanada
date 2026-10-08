import type { Metadata } from "next";
import { routing, type Locale, type Pathname } from "@/i18n/routing";
import { absUrl, SITE } from "@/i18n/navigation";

const OG_IMAGE = `${SITE}/og-image.png`;

type PageMeta = {
  locale: Locale;
  pathname: Pathname;
  title: string;
  description: string;
  /** Titre/description OG et Twitter, si différents du <title>. */
  ogTitle?: string;
  ogDescription?: string;
  ogType?: "website" | "article";
  /** Pages hors index (landings payantes, merci). */
  noindex?: boolean;
  /** Ne pas suivre les liens (page de conversion). */
  nofollow?: boolean;
};

/**
 * Métadonnées d'une page : canonical, hreflang fr/en/x-default réciproques,
 * Open Graph et Twitter. À utiliser dans le generateMetadata de CHAQUE page.
 */
export function pageMetadata(m: PageMeta): Metadata {
  const url = absUrl(m.locale, m.pathname);
  const ogTitle = m.ogTitle ?? m.title;
  const ogDescription = m.ogDescription ?? m.description;
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l === "fr" ? "fr-CA" : "en-CA", absUrl(l, m.pathname)])
  );
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: { ...languages, "x-default": absUrl("fr", m.pathname) },
    },
    ...(m.noindex ? { robots: { index: false, follow: !m.nofollow } } : {}),
    openGraph: {
      type: m.ogType ?? "website",
      siteName: "Gabriel Nadon",
      title: ogTitle,
      description: ogDescription,
      url,
      locale: m.locale === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: m.locale === "fr" ? ["en_CA"] : ["fr_CA"],
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [OG_IMAGE],
    },
  };
}

/** Valeur inLanguage pour le JSON-LD. */
export function jsonLdLang(locale: Locale) {
  return locale === "fr" ? "fr-CA" : "en-CA";
}
