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
    "/guides/combien-coute-logiciel-sur-mesure-quebec": {
      fr: "/guides/combien-coute-logiciel-sur-mesure-quebec",
      en: "/guides/custom-software-cost-quebec",
    },
    "/guides/remplacer-base-access": {
      fr: "/guides/remplacer-base-access",
      en: "/guides/replace-access-database",
    },
    "/guides/remplacer-excel-logiciel-gestion": {
      fr: "/guides/remplacer-excel-logiciel-gestion",
      en: "/guides/replace-excel-business-software",
    },
    "/guides/reprendre-vieux-logiciel": {
      fr: "/guides/reprendre-vieux-logiciel",
      en: "/guides/legacy-software-takeover",
    },
    "/guides/maintenance-logiciel-sur-mesure": {
      fr: "/guides/maintenance-logiciel-sur-mesure",
      en: "/guides/custom-software-maintenance",
    },
    "/guides/choisir-developpeur-logiciel": {
      fr: "/guides/choisir-developpeur-logiciel",
      en: "/guides/choosing-software-developer",
    },
    "/guides/subventions-projet-logiciel-quebec": {
      fr: "/guides/subventions-projet-logiciel-quebec",
      en: "/guides/software-project-grants-quebec",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathname = keyof typeof routing.pathnames;
