// Entité unique du site pour le JSON-LD : toutes les pages renvoient au même
// Person (#gabriel) et au même ProfessionalService (#business), déclarés une
// seule fois sur l'accueil. Les moteurs (Google, Bing, assistants IA) relient
// ainsi auteur, prestataire et éditeur à une seule identité cohérente.
export const PERSON_REF = { "@id": "https://gabrielnadon.com/#gabriel" } as const;
export const BUSINESS_REF = { "@id": "https://gabrielnadon.com/#business" } as const;

// Dates réelles des contenus (historique git : création de la page, puis
// dernière révision du contenu). Servent au JSON-LD (datePublished /
// dateModified) et à la <lastmod> du sitemap (scripts/postbuild.mjs).
// Clé = chemin interne (routing.pathnames). Mettre à jour à chaque révision.
export const PAGE_DATES: Record<string, { published: string; modified: string }> = {
  "/": { published: "2026-07-01", modified: "2026-10-22" },
  "/logiciel-sur-mesure": { published: "2026-10-06", modified: "2026-10-22" },
  "/refonte-de-systeme": { published: "2026-07-01", modified: "2026-10-22" },
  "/automatisation-processus": { published: "2026-10-06", modified: "2026-10-22" },
  "/traitement-documents-ia": { published: "2026-10-06", modified: "2026-10-06" },
  "/cas/synchronisation-prix-fournisseurs": { published: "2026-07-01", modified: "2026-10-22" },
  "/guides/automatisation-pme-quebec": { published: "2026-08-21", modified: "2026-10-22" },
  "/guides/combien-coute-automatisation-pme-quebec": { published: "2026-08-21", modified: "2026-10-22" },
  "/guides/combien-coute-logiciel-sur-mesure-quebec": { published: "2026-10-22", modified: "2026-10-22" },
  "/guides/remplacer-base-access": { published: "2026-10-22", modified: "2026-10-22" },
  "/guides/remplacer-excel-logiciel-gestion": { published: "2026-10-22", modified: "2026-10-22" },
  "/guides/reprendre-vieux-logiciel": { published: "2026-10-22", modified: "2026-10-22" },
  "/guides/maintenance-logiciel-sur-mesure": { published: "2026-10-22", modified: "2026-10-22" },
  "/guides/choisir-developpeur-logiciel": { published: "2026-10-22", modified: "2026-10-22" },
  "/guides/subventions-projet-logiciel-quebec": { published: "2026-10-22", modified: "2026-10-22" },
  "/guides/comparatif-logiciels-epicerie-quebec": { published: "2026-08-21", modified: "2026-10-22" },
};

/** datePublished + dateModified d'un Article, depuis PAGE_DATES. */
export function articleDates(pathname: string) {
  const d = PAGE_DATES[pathname];
  return d ? { datePublished: d.published, dateModified: d.modified } : {};
}
