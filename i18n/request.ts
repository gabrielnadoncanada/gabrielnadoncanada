import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

// Un fichier de messages par espace de noms et par langue :
// messages/<locale>/<namespace>.json. Ajouter un espace de noms = l'inscrire ici.
export const NAMESPACES = [
  "common",
  "form",
  "home",
  "services",
  "cas",
  "refonte",
  "epicerie",
  "guides",
  "guidesEpicerie",
  "calculateur",
  "quiz",
  "barometre",
  "diagnostic",
  "merci",
] as const;

// Espaces de noms lus par des composants client (« use client ») : seuls ceux-ci
// sont envoyés au navigateur via NextIntlClientProvider.
export const CLIENT_NAMESPACES = [
  "common",
  "form",
  "calculateur",
  "quiz",
  "barometre",
] as const;

export async function loadMessages(locale: string) {
  const entries = await Promise.all(
    NAMESPACES.map(async (ns) => [
      ns,
      (await import(`../messages/${locale}/${ns}.json`)).default,
    ])
  );
  return Object.fromEntries(entries);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  return { locale, messages: await loadMessages(locale) };
});
