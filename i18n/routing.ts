import { defineRouting } from "next-intl/routing";

// Français à la racine (URLs historiques indexées, inchangées), anglais sous
// /en/ avec des slugs traduits. Le site est exporté en statique (pas de
// middleware) : scripts/postbuild.mjs remonte out/fr/** à la racine et renomme
// out/en/<slug-fr>/ en out/en/<slug-en>/ d'après `pathnames` ci-dessous.
// Clé = chemin interne (= dossier sous app/[locale]/) ; valeur = URL publique.
export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/consultant-ia": { fr: "/consultant-ia", en: "/ai-consultant" },
    "/agents-ia": { fr: "/agents-ia", en: "/ai-agents" },
    "/traitement-documents-ia": {
      fr: "/traitement-documents-ia",
      en: "/ai-document-processing",
    },
    "/automatisation-processus": {
      fr: "/automatisation-processus",
      en: "/process-automation",
    },
    "/logiciel-sur-mesure": { fr: "/logiciel-sur-mesure", en: "/custom-software" },
    "/refonte-de-systeme": { fr: "/refonte-de-systeme", en: "/system-replacement" },
    "/cas/synchronisation-prix-fournisseurs": {
      fr: "/cas/synchronisation-prix-fournisseurs",
      en: "/case-studies/supplier-price-sync",
    },
    "/logiciel-gestion-epicerie": {
      fr: "/logiciel-gestion-epicerie",
      en: "/grocery-management-software",
    },
    "/calculateur": { fr: "/calculateur", en: "/calculator" },
    "/diagnostic-ia": { fr: "/diagnostic-ia", en: "/ai-readiness-test" },
    "/barometre": { fr: "/barometre", en: "/barometer" },
    "/diagnostic": { fr: "/diagnostic", en: "/assessment" },
    "/merci": { fr: "/merci", en: "/thank-you" },
    "/guides/automatisation-pme-quebec": {
      fr: "/guides/automatisation-pme-quebec",
      en: "/guides/sme-automation-quebec",
    },
    "/guides/combien-coute-automatisation-pme-quebec": {
      fr: "/guides/combien-coute-automatisation-pme-quebec",
      en: "/guides/automation-cost-quebec",
    },
    "/guides/comparatif-logiciels-epicerie-quebec": {
      fr: "/guides/comparatif-logiciels-epicerie-quebec",
      en: "/guides/grocery-software-comparison-quebec",
    },
    "/guides/inventaire-epicerie-excel": {
      fr: "/guides/inventaire-epicerie-excel",
      en: "/guides/grocery-inventory-excel",
    },
    "/guides/mise-a-jour-prix-fournisseurs": {
      fr: "/guides/mise-a-jour-prix-fournisseurs",
      en: "/guides/supplier-price-updates",
    },
    "/guides/calculer-marge-epicerie": {
      fr: "/guides/calculer-marge-epicerie",
      en: "/guides/grocery-margin",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathname = keyof typeof routing.pathnames;
