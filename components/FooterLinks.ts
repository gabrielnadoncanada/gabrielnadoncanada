import type { Pathname } from "@/i18n/routing";

// Listes de liens partagées par HomeFooter et MinimalFooter.
// label = clé dans messages/<locale>/common.json → links.
export const SERVICE_LINKS: Array<{ pathname: Pathname; label: string }> = [
  { pathname: "/consultant-ia", label: "consultantIa" },
  { pathname: "/agents-ia", label: "agentsIa" },
  { pathname: "/traitement-documents-ia", label: "documents" },
  { pathname: "/automatisation-processus", label: "automatisation" },
  { pathname: "/logiciel-sur-mesure", label: "logiciel" },
  { pathname: "/refonte-de-systeme", label: "refonte" },
];

export const FREE_LINKS: Array<{ pathname: Pathname; label: string }> = [
  { pathname: "/calculateur", label: "calculateur" },
  { pathname: "/diagnostic-ia", label: "quiz" },
  { pathname: "/guides/automatisation-pme-quebec", label: "guideAutomatisation" },
  { pathname: "/guides/comparatif-logiciels-epicerie-quebec", label: "comparatifEpicerie" },
  { pathname: "/barometre", label: "barometre" },
];
