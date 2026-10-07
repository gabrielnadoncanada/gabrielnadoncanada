import type { Metadata } from "next";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { TrackedLink } from "@/components/TrackedLink";

const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";
const URL =
  "https://gabrielnadon.com/guides/combien-coute-automatisation-pme-quebec/";

// Page réponse « combien ça coûte » — format optimisé pour la citation par
// les moteurs IA : réponse directe en tête, listes, FAQPage, date de mise à
// jour visible. Toutes les fourchettes tierces ont été vérifiées à la source
// le 2026-08-21 (IASolutionQC, Automathing, ChatGPT.ca, Shortkut) ; les prix
// « Gabriel Nadon » sont ceux publiés ailleurs sur le site.
export const metadata: Metadata = {
  title:
    "Combien coûte l’automatisation d’un processus dans une PME au Québec ? (prix 2026) | Gabriel Nadon",
  description:
    "Réponse directe : de 2 500 $ à 18 000 $ selon l’ampleur, d’après les prix publiés par les fournisseurs québécois — et mes propres prix affichés (sprint dès 4 500 $). Fourchettes détaillées, subventions applicables et règle de décision.",
  alternates: { canonical: URL },
  openGraph: {
    type: "article",
    siteName: "Gabriel Nadon",
    title:
      "Combien coûte l’automatisation d’un processus dans une PME au Québec ?",
    description:
      "De 2 500 $ à 18 000 $ selon l’ampleur — fourchettes vérifiées du marché québécois, subventions et règle de décision.",
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
    title: "Combien coûte l’automatisation dans une PME au Québec ?",
    description:
      "Fourchettes vérifiées du marché québécois, subventions et règle de décision.",
    images: ["https://gabrielnadon.com/og-image.png"],
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline:
        "Combien coûte l’automatisation d’un processus dans une PME au Québec ?",
      description:
        "Fourchettes de prix vérifiées du marché québécois de l’automatisation pour PME : premier processus, chantiers multi-processus, taux horaires et subventions applicables.",
      inLanguage: "fr-CA",
      dateModified: "2026-08-21",
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
          name: "Combien coûte l’automatisation d’un premier processus dans une PME au Québec ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Entre 2 500 $ et 10 000 $ selon la complexité, d’après les prix publiés par les fournisseurs québécois en 2026. Exemples vérifiés : un fournisseur de Québec affiche 2 500 à 5 000 $ pour un premier processus simple (2 à 4 semaines) ; une firme de Sherbrooke évoque environ 10 000 $ pour une automatisation ciblée ; mes propres sprints débutent à 4 500 $ (portée fixe, 2 à 3 semaines).",
          },
        },
        {
          "@type": "Question",
          name: "Combien coûte un chantier d’automatisation de plusieurs processus ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Les fourchettes publiées au Québec vont de 8 000 à 18 000 $ pour 3 à 5 processus (2 à 3 mois). Pour remplacer un système entier, mes refontes publiées se font par tranches d’environ 6 000 $, la plupart totalisant entre 12 000 et 30 000 $. Les plateformes intégrées sur mesure peuvent dépasser 100 000 $.",
          },
        },
        {
          "@type": "Question",
          name: "Quel est le taux horaire d’un consultant en automatisation ou en IA au Canada ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Les grilles publiées au Canada vont de 150 à 350 $ de l’heure pour la consultation en automatisation et en IA. À titre comparatif, le développement web se situe entre 60 et 120 $/h en pigiste et 120 à 250 $/h en agence, selon les guides de prix québécois publiés. La plupart des projets se vendent toutefois à forfait, pas à l’heure.",
          },
        },
        {
          "@type": "Question",
          name: "Des subventions peuvent-elles réduire le coût d’un projet d’automatisation au Québec ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui. En 2026 : ESSOR volet 1B d’Investissement Québec rembourse 50 % des honoraires d’un diagnostic numérique (max 20 000 $) et le volet 1C, 50 % de l’implantation (max 50 000 $) — pour les entreprises de 250 employés ou moins avec 2,5 M$ et plus de chiffre d’affaires ; le crédit d’impôt C3I couvre 15 à 25 % du matériel et des progiciels de gestion jusqu’à fin 2029 ; PME MTL offre jusqu’à 50 000 $ (80 % du projet) sur l’île de Montréal. Le PCAN fédéral est fermé depuis février 2024.",
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
          name: "Guide : automatiser ses processus (PME Québec)",
          item: "https://gabrielnadon.com/guides/automatisation-pme-quebec/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Combien coûte l’automatisation ?",
          item: URL,
        },
      ],
    },
  ],
};

const NAV = [
  { href: "/guides/automatisation-pme-quebec/", label: "Le guide complet" },
  { href: "/calculateur/", label: "Calculateur" },
  { href: "/#contact", label: "Contact" },
];

export default function CoutAutomatisationPage() {
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

          {/* Hero : la réponse directe, tout de suite */}
          <section className="case-hero">
            <div className="case-hero-grid">
              <div>
                <div className="eyebrow" data-rise="50">
                  Prix vérifiés · marché québécois · mis à jour le 21 août 2026
                </div>
                <h1 className="case-title u-mt-lg" data-rise="120">
                  Combien coûte l’automatisation d’un processus{" "}
                  <span className="italic">dans une PME au Québec ?</span>
                </h1>
                <p className="case-lead" data-rise="200">
                  Réponse courte : <strong>de 2 500 $ à 10 000 $ pour un
                  premier processus</strong>, de <strong>8 000 $ à
                  18 000 $ pour un chantier de 3 à 5 processus</strong>, et de
                  12 000 $ à 30 000 $ et plus pour refondre un système entier.
                  Ces fourchettes viennent des prix réellement publiés par les
                  fournisseurs québécois en 2026 — y compris les miens —, pas
                  d’un sondage anonyme. Le détail, les sources et la règle de
                  décision, ci-dessous.
                </p>
              </div>
              <div data-rise="280">
                <div className="money-box">
                  <div className="money-kicker">La seule règle qui compte</div>
                  <div className="money-fig">
                    <span className="num">&lt; 12</span>
                    <span className="cur">mois</span>
                  </div>
                  <p className="money-sub">
                    Un projet d’automatisation doit se rembourser en moins de
                    douze mois avec les heures qu’il élimine. Sinon, refusez-le
                    — peu importe qui le vend.
                  </p>
                  <p className="money-plus">
                    <a href="/calculateur/" className="link-serif">
                      Chiffrez votre corvée en 30 secondes →
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Les fourchettes */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">Les fourchettes, avec leurs sources</span>
              <span className="rule"></span>
            </div>
            <div className="case-steps">
              <div className="case-step">
                <div className="mandat-num">
                  <span>01</span>
                </div>
                <h3 className="mandat-title">
                  <span>Premier processus simple : 2 500 $ – 10 000 $</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Prix publiés vérifiés en août 2026 : un fournisseur de
                    Québec affiche 2 500–5 000 $ pour un premier processus (2 à
                    4 semaines, outils comme Make ou Zapier) ; une firme de
                    Sherbrooke évoque environ 10 000 $ pour une automatisation
                    ciblée. Mes sprints : dès 4 500 $, portée fixe, 2 à 3
                    semaines — une corvée éliminée, pas un abonnement.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>02</span>
                </div>
                <h3 className="mandat-title">
                  <span>Chantier de 3 à 5 processus : 8 000 $ – 18 000 $</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Fourchette publiée par le marché québécois pour 2 à 3 mois
                    de travail sur plusieurs processus connectés. C’est la zone
                    où les subventions commencent à compter : un diagnostic
                    ESSOR 1B peut couvrir la moitié des honoraires de la phase
                    d’analyse.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>03</span>
                </div>
                <h3 className="mandat-title">
                  <span>Refonte d’un système : 12 000 $ – 30 000 $ et plus</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Mes refontes publiées se font par tranches d’environ
                    6 000 $ — chacune livrée, utilisée et rentabilisée avant la
                    suivante — et la plupart totalisent entre 12 000 $ et
                    30 000 $. Les plateformes intégrées sur mesure du marché
                    dépassent parfois 100 000 $ : à ce niveau, exigez un
                    découpage en tranches, jamais un « big bang ».
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>04</span>
                </div>
                <h3 className="mandat-title">
                  <span>À l’heure : 150 $ – 350 $ (consultation)</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Les grilles horaires publiées au Canada pour la consultation
                    en automatisation et en IA vont de 150 à 350 $/h. Repère
                    croisé : le développement web québécois publié se situe à
                    60–120 $/h en pigiste et 120–250 $/h en agence. Méfiez-vous
                    du taux horaire sans portée définie — le forfait à
                    résultat protège les deux parties.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* Ce qui fait varier + subventions */}
          <section className="section u-pb-64">
            <div className="note-grid">
              <div>
                <div className="eyebrow u-mb-lg">Ce qui fait varier la facture</div>
                <h2 className="h2-left u-measure-title">
                  Trois facteurs — et deux rabais gouvernementaux.
                </h2>
              </div>
              <div className="case-prose">
                <p>
                  <strong>Le nombre de systèmes touchés</strong> (connecter deux
                  logiciels coûte moins cher qu’en connecter cinq),{" "}
                  <strong>la propreté des données</strong> (des PDF et du papier
                  à interpréter ajoutent une couche), et{" "}
                  <strong>l’exception humaine</strong> (plus il y a de « ça
                  dépend » dans le processus, plus le projet grossit). C’est
                  pourquoi tout devis sérieux commence par regarder vos
                  fichiers réels, pas par un prix au pied carré.
                </p>
                <p>
                  Côté aides : <strong>ESSOR volet 1B/1C</strong> (50 % du
                  diagnostic jusqu’à 20 000 $, 50 % de l’implantation jusqu’à
                  50 000 $ — entreprises de 250 employés ou moins, chiffre
                  d’affaires de 2,5 M$ et plus) et le <strong>crédit d’impôt
                  C3I</strong> (15 à 25 % sur matériel et progiciels de gestion,
                  jusqu’à fin 2029). Le détail des programmes actifs est dans{" "}
                  <a
                    href="/guides/automatisation-pme-quebec/"
                    className="link-serif"
                  >
                    le guide complet
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* Preuve */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">L’autre côté de l’équation</span>
              <div className="u-measure-prose">
                <span className="serif-muted">
                  Le coût du projet n’est que la moitié du calcul — l’autre
                  moitié, c’est ce que la corvée coûte déjà. Une épicerie du
                  Québec payait 56 000 $ par année pour une seule tâche
                  manuelle, sans le savoir.{" "}
                </span>
                <a
                  href="/cas/synchronisation-prix-fournisseurs/"
                  className="link-serif"
                >
                  Lire le cas complet →
                </a>
              </div>
            </div>
          </section>

          {/* Pont vers les pages de service (intention commerciale) */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">Les services, et leurs prix</span>
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
                <div className="contact-eyebrow">Votre chiffre à vous</div>
                <h2 className="contact-title">
                  Un prix, ça se confirme{" "}
                  <span className="italic">sur vos vrais fichiers.</span>
                </h2>
                <p className="contact-lead">
                  En 20 minutes au téléphone, on chiffre votre corvée, je vous
                  donne une fourchette honnête pour l’éliminer — et si le calcul
                  ne tient pas, je vous le dis et on n’en parle plus.
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
                      <span className="kv-label-block">D’abord un chiffre ?</span>
                      <span className="icon-16">Le calculateur gratuit</span>
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
