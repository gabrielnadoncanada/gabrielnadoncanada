import type { Metadata } from "next";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { TrackedLink } from "@/components/TrackedLink";

const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";
const URL = "https://gabrielnadon.com/guides/automatisation-pme-quebec/";

// Guide pilier « automatisation des processus — PME québécoises ». Page mère
// du maillage : calculateur, diagnostic IA, cas, comparatif épicerie, guides.
// Faits sourcés (vérifiés 2026-08-21) : FCEI × Investissement Québec 2025
// (productivité = motivation nº 1, 81 % ; pénurie citée par 59 %) ; ISQ
// 2024-2025 (12,7 % des entreprises utilisent l'IA) ; programmes ESSOR
// (page officielle IQ — 1A 50 %/50 k$, 1B 50 %/20 k$, 1C 50 %/50 k$, ouverts
// jusqu'au 31 mars 2027, admissibilité 1B/1C : ≤ 250 employés et CA ≥ 2,5 M$),
// C3I (fiche officielle, actif jusqu'à fin 2029), PME MTL (max 50 k$ / 80 %),
// MFOR (généralement jusqu'à 50 % des dépenses admissibles). PCAN : fermé.
export const metadata: Metadata = {
  title:
    "Automatiser ses processus : le guide pour PME québécoises (2026) | Gabriel Nadon",
  description:
    "Quoi automatiser en premier, dans quel ordre, à quel prix, avec quelles subventions (ESSOR, C3I, PME MTL) : le guide complet pour PME du Québec, appuyé sur un cas réel à 56 000 $/an. Avec calculateur et gabarit de priorisation gratuits.",
  alternates: { canonical: URL },
  openGraph: {
    type: "article",
    siteName: "Gabriel Nadon",
    title: "Automatiser ses processus : le guide pour PME québécoises (2026)",
    description:
      "Quoi automatiser en premier, à quel prix, avec quelles subventions — appuyé sur un cas réel à 56 000 $/an.",
    url: URL,
    locale: "fr_CA",
    images: [
      {
        url: "https://gabrielnadon.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gabriel Nadon — Conseiller, Systèmes & IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automatiser ses processus : le guide PME Québec (2026)",
    description:
      "Quoi automatiser en premier, à quel prix, avec quelles subventions.",
    images: ["https://gabrielnadon.com/og-image.png"],
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline:
        "Automatiser ses processus : le guide pour PME québécoises (2026)",
      description:
        "Guide complet : quels processus automatiser en premier, dans quel ordre, à quel coût, et avec quelles aides gouvernementales québécoises (ESSOR, C3I, PME MTL, MFOR).",
      inLanguage: "fr-CA",
      author: {
        "@type": "Person",
        name: "Gabriel Nadon",
        url: "https://gabrielnadon.com/",
      },
      publisher: {
        "@type": "Person",
        name: "Gabriel Nadon",
        url: "https://gabrielnadon.com/",
      },
      mainEntityOfPage: URL,
      image: "https://gabrielnadon.com/og-image.png",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Quels processus une PME devrait-elle automatiser en premier ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ceux qui combinent trois traits : répétitifs (chaque semaine ou plus), fondés sur des règles claires (pas de jugement complexe), et coûteux en heures. En pratique : la mise à jour de prix et de catalogues, la facturation et les soumissions, la double saisie entre deux systèmes, les rapports hebdomadaires, les relances clients et le traitement de documents (PDF vers données). Commencez par UN seul processus — le plus coûteux — et chiffrez-le avant de commencer.",
          },
        },
        {
          "@type": "Question",
          name: "Quelles subventions existent au Québec pour automatiser en 2026 ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Les principales aides actives : ESSOR volet 1 d’Investissement Québec (ouvert jusqu’au 31 mars 2027) — 50 % des honoraires jusqu’à 20 000 $ pour un diagnostic numérique (1B) et jusqu’à 50 000 $ pour l’implantation du plan (1C), réservé aux entreprises de 250 employés ou moins avec un chiffre d’affaires d’au moins 2,5 M$ ; le crédit d’impôt C3I (15 à 25 % sur le matériel et les progiciels de gestion, jusqu’à fin 2029) ; le fonds innovation et productivité de PME MTL (jusqu’à 50 000 $, 80 % du projet, île de Montréal) ; et les subventions de formation de Services Québec (MFOR). Le PCAN fédéral est fermé aux nouvelles demandes depuis février 2024.",
          },
        },
        {
          "@type": "Question",
          name: "Combien coûte l’automatisation d’un processus dans une PME ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Au Québec, les fourchettes publiées par les fournisseurs vont d’environ 2 500 à 5 000 $ pour un premier processus simple, et de 8 000 à 18 000 $ pour un chantier de 3 à 5 processus. Mes propres prix publiés : sprint d’automatisation dès 4 500 $ (une corvée éliminée en 2-3 semaines), refonte de système par tranches d’environ 6 000 $, la plupart des refontes entre 12 000 et 30 000 $. La règle de décision : le projet doit se rembourser en moins de douze mois.",
          },
        },
        {
          "@type": "Question",
          name: "L’automatisation est-elle rentable pour une petite entreprise ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui, quand on choisit le bon processus : dans un cas documenté, une épicerie indépendante du Québec a récupéré près de 56 000 $ par année en éliminant la seule mise à jour manuelle de ses prix fournisseurs. Le test est simple : (heures par semaine × personnes × coût horaire × 50 semaines) — si ce montant dépasse le coût du projet, l’automatisation se rembourse en moins d’un an.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: "https://gabrielnadon.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Automatiser ses processus : le guide PME Québec",
          item: URL,
        },
      ],
    },
  ],
};

const NAV = [
  { href: "/#approche", label: "Approche" },
  { href: "/calculateur/", label: "Calculateur" },
  { href: "/#cas", label: "Cas concrets" },
  { href: "/#contact", label: "Contact" },
];

export default function GuideAutomatisationPage() {
  return (
    <div id="dc-root">
      <div>
        <div className="page">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
          />

          <div className="cab-grain" aria-hidden="true"></div>

          <Ticker />
          <SiteHeader brandHref="/" navItems={NAV} ctaHref="/#contact" />

          {/* Hero */}
          <section className="case-hero">
            <div className="case-hero-grid">
              <div>
                <div className="eyebrow" data-rise="50">
                  Guide complet · PME du Québec · mis à jour août 2026
                </div>
                <h1 className="case-title u-mt-lg" data-rise="120">
                  Automatiser ses processus : par où commencer{" "}
                  <span className="italic">quand on est une PME d’ici.</span>
                </h1>
                <p className="case-lead" data-rise="200">
                  Selon l’enquête FCEI × Investissement Québec (2025), la
                  productivité est devenue la première motivation
                  d’automatisation des PME québécoises — citée par 81 % des
                  répondants — et la difficulté à recruter en pousse 59 % de
                  plus. Le problème n’est plus « pourquoi », c’est « par quoi
                  commencer, à quel prix, sans se tromper ». Ce guide répond
                  dans cet ordre : quoi, dans quel ordre, combien, avec quelles
                  aides — appuyé sur un cas réel, pas sur des promesses.
                </p>
              </div>
              <div data-rise="280">
                <div className="money-box">
                  <div className="money-kicker">Le résultat d’UN processus bien choisi</div>
                  <div className="money-fig">
                    <span className="num">56 000 $</span>
                    <span className="cur">/ an</span>
                  </div>
                  <p className="money-sub">
                    récupérés par une épicerie indépendante du Québec en
                    éliminant une seule tâche manuelle : la mise à jour des prix
                    fournisseurs.
                  </p>
                  <p className="money-plus">
                    <a
                      href="/cas/synchronisation-prix-fournisseurs/"
                      className="link-serif"
                    >
                      Le cas complet, chiffres à l’appui →
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Étape 1 : chiffrer */}
          <section className="section u-pb-64">
            <div className="note-grid">
              <div>
                <div className="eyebrow u-mb-lg">Étape 1 — Chiffrer avant tout</div>
                <h2 className="h2-left u-measure-title">
                  Pas de chiffre, pas de projet.
                </h2>
              </div>
              <div className="case-prose">
                <p>
                  La plupart des projets d’automatisation échouent avant de
                  commencer : on choisit le processus le plus excitant au lieu
                  du plus coûteux. La formule qui remet tout en ordre tient en
                  une ligne : <strong>heures par semaine × personnes × coût
                  horaire chargé × 50 semaines</strong>. Appliquez-la à chaque
                  corvée récurrente. Les résultats surprennent toujours — la
                  tâche « anodine » de 8 heures par semaine à 25 $/h coûte
                  10 000 $ par année.
                </p>
                <p>
                  Deux outils gratuits pour le faire proprement :{" "}
                  <a href="/calculateur/" className="link-serif">
                    le calculateur en ligne
                  </a>{" "}
                  (30 secondes, une tâche) et{" "}
                  <TrackedLink
                    event="gabarit_download"
                    href="/gabarits/matrice-priorisation-automatisations.xlsx"
                    className="link-serif"
                  >
                    le gabarit Excel de priorisation
                  </TrackedLink>{" "}
                  (jusqu’à 15 tâches, classement automatique par rendement et
                  simplicité).
                </p>
              </div>
            </div>
          </section>

          {/* Étape 2 : les 6 processus */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">
                Étape 2 — Les six processus au meilleur rendement
              </span>
              <span className="rule"></span>
            </div>
            <div className="case-steps">
              <div className="case-step">
                <div className="mandat-num">
                  <span>01</span>
                </div>
                <h3 className="mandat-title">
                  <span>Prix et catalogues fournisseurs</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Des listes qui arrivent dans tous les formats et qu’on
                    retape dans la caisse ou l’ERP. Le champion du rendement
                    dans le commerce — c’est le processus du cas à 56 000 $.{" "}
                    <a
                      href="/guides/mise-a-jour-prix-fournisseurs/"
                      className="link-serif"
                    >
                      Les 4 méthodes comparées →
                    </a>
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>02</span>
                </div>
                <h3 className="mandat-title">
                  <span>Facturation et soumissions</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Refaire dans le logiciel comptable ce que le bon de travail
                    dit déjà, assembler chaque soumission à la main. Règles
                    claires, volume élevé : un candidat d’école pour
                    l’automatisation.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>03</span>
                </div>
                <h3 className="mandat-title">
                  <span>La double saisie entre deux systèmes</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Caisse → comptabilité, CRM → facturation, boutique en ligne
                    → inventaire. Chaque recopie est une erreur qui attend son
                    tour. Se règle par connexion directe ou par un pont
                    automatisé entre les deux.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>04</span>
                </div>
                <h3 className="mandat-title">
                  <span>Les rapports du lundi</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Le fichier réassemblé chaque semaine à partir de trois
                    sources. Une fois automatisé, il arrive tout seul, à
                    l’heure, sans erreur de copier-coller — et l’équipe reprend
                    sa demi-journée.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>05</span>
                </div>
                <h3 className="mandat-title">
                  <span>Relances et suivis clients</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Confirmations, rappels de rendez-vous, suivis de
                    soumissions, comptes en souffrance : des messages à
                    déclencheur évident qui partent en retard ou pas du tout
                    quand tout est manuel.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>06</span>
                </div>
                <h3 className="mandat-title">
                  <span>Documents entrants (PDF, photos, papier)</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Factures de fournisseurs, bons de livraison, formulaires :
                    l’IA actuelle lit ces documents et en extrait les données de
                    façon fiable — c’est le chantier que l’IA générative a
                    réellement débloqué pour les PME depuis deux ans.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* Étape 3 : combien ça coûte */}
          <section className="note">
            <div className="section">
              <div className="note-grid">
                <div>
                  <div className="note-eyebrow">Étape 3 — Combien ça coûte</div>
                  <p className="note-quote">
                    La règle : remboursé en moins de douze mois, ou pas de
                    projet.
                  </p>
                  <p className="note-body">
                    Les fourchettes du marché québécois et mes propres prix,
                    sans détour — le détail complet, avec sources, est dans la
                    page{" "}
                    <a
                      href="/guides/combien-coute-automatisation-pme-quebec/"
                      className="link-serif"
                    >
                      « Combien coûte l’automatisation ? »
                    </a>
                  </p>
                </div>
                <div className="principles">
                  <div className="principle">
                    <div className="principle-head">
                      <span className="principle-num">
                        <span>0 $</span>
                      </span>
                      <div>
                        <h3 className="principle-title">
                          <span>Diagnostic — 20 minutes</span>
                        </h3>
                        <p className="principle-text">
                          <span>
                            L’appel, les pistes, l’ordre de priorité. Gratuit,
                            sans obligation.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="principle">
                    <div className="principle-head">
                      <span className="principle-num">
                        <span>dès 4 500 $</span>
                      </span>
                      <div>
                        <h3 className="principle-title">
                          <span>Sprint — un processus éliminé</span>
                        </h3>
                        <p className="principle-text">
                          <span>
                            2 à 3 semaines, portée fixe, prix fixe. Le marché
                            québécois publie des fourchettes comparables
                            (2 500–5 000 $ pour un premier processus).
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="principle">
                    <div className="principle-head">
                      <span className="principle-num">
                        <span>12–30 k$</span>
                      </span>
                      <div>
                        <h3 className="principle-title">
                          <span>Refonte — par tranches de ~6 000 $</span>
                        </h3>
                        <p className="principle-text">
                          <span>
                            Le vieux système remplacé morceau par morceau,
                            chaque tranche livrée et rentabilisée avant la
                            suivante. Jamais de « big bang ».
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Étape 4 : subventions */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">
                Étape 4 — Les aides actives (vérifiées en août 2026)
              </span>
              <span className="rule"></span>
            </div>
            <div className="case-steps">
              <div className="case-step">
                <div className="mandat-num">
                  <span>1B</span>
                </div>
                <h3 className="mandat-title">
                  <span>ESSOR volet 1B — diagnostic numérique</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Investissement Québec rembourse 50 % des honoraires d’un
                    diagnostic numérique ou d’un plan (incluant l’intégration de
                    l’IA), jusqu’à 20 000 $. Admissibilité : 250 employés ou
                    moins ET chiffre d’affaires d’au moins 2,5 M$. Ouvert
                    jusqu’au 31 mars 2027.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>1C</span>
                </div>
                <h3 className="mandat-title">
                  <span>ESSOR volet 1C — implantation du plan</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    La suite du 1B : 50 % des dépenses d’implantation du plan
                    numérique, jusqu’à 50 000 $ (le plan doit dater de moins de
                    24 mois). Le volet 1A finance aussi 50 % d’une étude de
                    faisabilité, jusqu’à 50 000 $.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>C3I</span>
                </div>
                <h3 className="mandat-title">
                  <span>Crédit d’impôt investissement et innovation</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    15 à 25 % (selon la région) sur le matériel de fabrication,
                    le matériel informatique et les progiciels de gestion. En
                    vigueur pour les frais engagés avant le 1ᵉʳ janvier 2030.
                    C’est le successeur du défunt crédit « intégration des TI ».
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>MTL</span>
                </div>
                <h3 className="mandat-title">
                  <span>PME MTL + formation (Services Québec)</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Sur l’île de Montréal : fonds innovation et productivité de
                    PME MTL, subvention jusqu’à 50 000 $ couvrant jusqu’à 80 %
                    d’un projet d’automatisation. Partout au Québec : les
                    mesures de formation de Services Québec (MFOR) remboursent
                    généralement jusqu’à 50 % des dépenses de formation liées
                    aux nouveaux outils. Attention aux pages périmées ailleurs :
                    le PCAN fédéral est fermé depuis février 2024, et « PME en
                    action » ne prend plus de demandes.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* Pont diagnostic IA */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">Et l’IA là-dedans ?</span>
              <div className="u-measure-prose">
                <span className="serif-muted">
                  Seulement 12,7 % des entreprises québécoises utilisent l’IA
                  (ISQ, 2024-2025) — pas par manque d’outils, mais par manque de
                  fondations : données accessibles, processus décrits, dossier
                  porté par quelqu’un. Situez votre entreprise en 10 questions.{" "}
                </span>
                <a href="/diagnostic-ia/" className="link-serif">
                  Faire le test « prête pour l’IA ? » →
                </a>
              </div>
            </div>
          </section>

          {/* Pont vers les pages de service (intention commerciale) */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">Faire implanter</span>
              <div className="sectors-list">
                <a href="/automatisation-processus/" className="serif-muted link-serif">
                  <span>Automatisation des processus</span>
                </a>
                <a href="/traitement-documents-ia/" className="serif-muted link-serif">
                  <span>Traitement de factures et documents</span>
                </a>
                <a href="/agents-ia/" className="serif-muted link-serif">
                  <span>Agents IA</span>
                </a>
                <a href="/logiciel-sur-mesure/" className="serif-muted link-serif">
                  <span>Logiciel sur mesure</span>
                </a>
                <a href="/consultant-ia/" className="serif-muted link-serif">
                  <span>Consultant IA pour PME</span>
                </a>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="section">
            <div className="contact-grid">
              <div>
                <div className="contact-eyebrow">Diagnostic gratuit</div>
                <h2 className="contact-title">
                  Vingt minutes pour trouver{" "}
                  <span className="italic">votre premier processus.</span>
                </h2>
                <p className="contact-lead">
                  Vous me décrivez vos opérations, je vous dis quoi automatiser
                  en premier, l’effort réaliste et le rendement attendu — et si
                  rien ne vaut la peine, je vous le dis aussi. Gratuit, sans
                  obligation.
                </p>
              </div>
              <div className="cab-paper contact-card">
                <div className="contact-list">
                  <TrackedLink
                    event="clic_audit"
                    href={CAL}
                    target="_blank"
                    rel="noopener"
                    className="btn-block"
                  >
                    Réserver mes 20 minutes <span>→</span>
                  </TrackedLink>
                  <a href="/calculateur/" className="scp5 contact-link u-mt-sm">
                    <span>
                      <span className="kv-label-block">Pas prêt à appeler ?</span>
                      <span className="icon-16">Chiffrez d’abord votre corvée</span>
                    </span>
                    <span className="icon-18">→</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <MinimalFooter />
        </div>
      </div>
    </div>
  );
}
