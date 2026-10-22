import type { Pathname } from "@/i18n/routing";

// Listes de liens partagées par HomeFooter et MinimalFooter.
// label = clé dans messages/<locale>/common.json → links.
// Ordre = l'offre : Excel/Access et vieux logiciels d'abord, l'IA ensuite.
export const SERVICE_LINKS: Array<{ pathname: Pathname; label: string }> = [
  { pathname: "/logiciel-sur-mesure", label: "logiciel" },
  { pathname: "/refonte-de-systeme", label: "refonte" },
  { pathname: "/automatisation-processus", label: "automatisation" },
  { pathname: "/traitement-documents-ia", label: "documents" },
];

export const FREE_LINKS: Array<{ pathname: Pathname; label: string }> = [
  { pathname: "/guides/remplacer-excel-logiciel-gestion", label: "guideExcel" },
  { pathname: "/guides/combien-coute-logiciel-sur-mesure-quebec", label: "guideCoutLogiciel" },
  { pathname: "/guides/remplacer-base-access", label: "guideAccess" },
  { pathname: "/guides/reprendre-vieux-logiciel", label: "guideReprise" },
  { pathname: "/guides/maintenance-logiciel-sur-mesure", label: "guideMaintenance" },
  { pathname: "/guides/subventions-projet-logiciel-quebec", label: "guideSubventions" },
  { pathname: "/guides/comparatif-logiciels-epicerie-quebec", label: "comparatifEpicerie" },
];
