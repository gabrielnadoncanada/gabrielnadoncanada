import { createNavigation } from "next-intl/navigation";
import { routing, type Locale, type Pathname } from "./routing";

const nav = createNavigation(routing);

export const SITE = "https://gabrielnadon.com";

/**
 * URL publique d'une page interne, avec slash final (trailingSlash: true).
 * Le site utilise des <a> simples (export statique, pas de navigation client) :
 * TOUJOURS passer par ce helper pour un lien interne, jamais un chemin en dur.
 *   href("en", "/consultant-ia")            → "/en/ai-consultant/"
 *   href("fr", "/", "contact")              → "/#contact"
 */
export function href(locale: Locale, pathname: Pathname, hash?: string): string {
  let p = nav.getPathname({ href: pathname, locale });
  if (!p.endsWith("/")) p += "/";
  return hash ? `${p}#${hash}` : p;
}

/** URL absolue (canonical, JSON-LD, OG). */
export function absUrl(locale: Locale, pathname: Pathname, hash?: string): string {
  return `${SITE}${href(locale, pathname, hash)}`;
}

/** L'autre langue, pour le sélecteur FR | EN. */
export function otherLocale(locale: Locale): Locale {
  return locale === "fr" ? "en" : "fr";
}
