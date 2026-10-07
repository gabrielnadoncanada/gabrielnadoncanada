import type { Metadata } from "next";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { QuizIA } from "@/components/QuizIA";

const URL = "https://gabrielnadon.com/diagnostic-ia/";

// Auto-diagnostic interactif « votre PME est-elle prête pour l'IA ? ».
// Indexable — distinct de /diagnostic/ (landing payante noindex).
// Les statistiques citées : NETendances 2025 (Académie de la transformation
// numérique, U. Laval) et ISQ « Adoption et utilisation de l'IA dans les
// entreprises du Québec 2024-2025 ».
export const metadata: Metadata = {
  title:
    "Test : votre PME est-elle prête pour l’IA ? (10 questions) | Gabriel Nadon",
  description:
    "52 % des Québécois utilisent l’IA générative — mais à peine 12,7 % des entreprises. Où en est la vôtre ? 10 questions, résultat immédiat avec vos trois prochains gestes. Gratuit, sans courriel.",
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    siteName: "Gabriel Nadon",
    title: "Votre PME est-elle prête pour l’IA ? — Test en 10 questions",
    description:
      "52 % des Québécois utilisent l’IA générative, mais à peine 12,7 % des entreprises. 10 questions, résultat immédiat, gratuit.",
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
    title: "Votre PME est-elle prête pour l’IA ? — Test en 10 questions",
    description:
      "10 questions, résultat immédiat avec vos trois prochains gestes. Gratuit, sans courriel.",
    images: ["https://gabrielnadon.com/og-image.png"],
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Quiz",
      name: "Votre PME est-elle prête pour l’IA ?",
      description:
        "Auto-diagnostic en 10 questions : données, processus, équipe et budget. Résultat immédiat avec recommandations concrètes pour PME québécoises.",
      educationalLevel: "beginner",
      inLanguage: "fr-CA",
      url: URL,
      author: {
        "@type": "Person",
        name: "Gabriel Nadon",
        url: "https://gabrielnadon.com/",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Combien d’entreprises québécoises utilisent l’intelligence artificielle ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Selon l’Institut de la statistique du Québec (2024-2025), environ 12,7 % des entreprises québécoises utilisent l’intelligence artificielle — alors que 52 % des adultes québécois utilisent déjà l’IA générative à titre personnel (NETendances 2025). L’écart entre l’usage personnel et l’usage en entreprise est l’une des plus grandes occasions d’affaires actuelles pour les PME.",
          },
        },
        {
          "@type": "Question",
          name: "Qu’est-ce qu’une PME doit avoir en place avant d’adopter l’IA ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Trois fondations : des données accessibles (dans des logiciels ou des fichiers structurés, pas dans les courriels), des processus répétitifs connus et décrits, et une personne qui porte le dossier. Sans ces fondations, l’IA amplifie le désordre au lieu de le régler.",
          },
        },
        {
          "@type": "Question",
          name: "Faut-il un gros budget pour commencer avec l’IA en PME ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Non. Le bon premier projet est petit et se rembourse en moins de douze mois : une tâche répétitive chiffrée, puis éliminée. Un sprint d’automatisation ciblé débute autour de 4 500 $ — bien loin des projets « transformation numérique » à six chiffres.",
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
          name: "Test : votre PME est-elle prête pour l’IA ?",
          item: URL,
        },
      ],
    },
  ],
};

const NAV = [
  { href: "/#approche", label: "Approche" },
  { href: "/#methode", label: "Méthode" },
  { href: "/#cas", label: "Cas concrets" },
  { href: "/#contact", label: "Contact" },
];

export default function DiagnosticIAPage() {
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
          <SiteHeader brandHref="/" navItems={NAV} ctaHref="#test" />

          {/* Hero */}
          <section className="case-hero">
            <div className="case-hero-grid">
              <div>
                <div className="eyebrow" data-rise="50">
                  Auto-diagnostic · 10 questions · résultat immédiat
                </div>
                <h1 className="case-title u-mt-lg" data-rise="120">
                  Votre PME est-elle prête pour l’IA —{" "}
                  <span className="italic">ou juste curieuse ?</span>
                </h1>
                <p className="case-lead" data-rise="200">
                  52 % des Québécois utilisent déjà l’IA générative à titre
                  personnel. Du côté des entreprises : à peine 12,7 %. L’écart
                  n’est pas une question de technologie — c’est une question de
                  fondations : où vivent vos données, qui connaît vos processus,
                  qui porte le dossier. Dix questions pour situer votre
                  entreprise, avec vos trois prochains gestes selon le résultat.
                </p>
                <div data-rise="240">
                  <a href="#test" className="btn-block">
                    Faire le test <span>→</span>
                  </a>
                  <p className="form-note">
                    Gratuit, sans courriel — le résultat s’affiche sur cette
                    page.
                  </p>
                </div>
              </div>
              <div data-rise="280">
                <div className="money-box">
                  <div className="money-kicker">L’écart québécois, en chiffres</div>
                  <div className="money-fig">
                    <span className="num">52 %</span>
                    <span className="cur">vs 12,7 %</span>
                  </div>
                  <p className="money-sub">
                    52 % des adultes québécois utilisent l’IA générative
                    (NETendances 2025) ; 12,7 % des entreprises québécoises
                    l’utilisent (Institut de la statistique du Québec,
                    2024-2025).
                  </p>
                  <p className="money-plus">
                    Vos employés sont probablement déjà dans le premier groupe.
                    Votre entreprise, dans le deuxième.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Le test */}
          <section className="section-method" id="test">
            <div className="method-head">
              <span className="eyebrow">Le test — 10 questions</span>
              <span className="rule"></span>
            </div>
            <QuizIA />
          </section>

          {/* Pont vers le calculateur */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">L’étape d’après</span>
              <div className="u-measure-prose">
                <span className="serif-muted">
                  Peu importe votre score, la démarche commence au même endroit :
                  mettre un montant sur la tâche manuelle la plus lourde.{" "}
                </span>
                <a href="/calculateur/" className="link-serif">
                  Chiffrez-la en 30 secondes avec le calculateur →
                </a>
              </div>
            </div>
          </section>

          {/* Pont vers l'offre : ceux qui cherchent « IA pour PME » veulent
              souvent quelqu'un pour l'implanter, pas seulement un score. */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">Passer à l’implantation</span>
              <div className="u-measure-prose">
                <span className="serif-muted">
                  Vous préférez qu’on regarde ensemble où l’IA rapporterait chez
                  vous — factures, courriels, soumissions, suivis ?{" "}
                </span>
                <a href="/consultant-ia/" className="link-serif">
                  Consultant IA pour PME : la démarche et les prix →
                </a>{" "}
                <span className="serif-muted">Ou directement : </span>
                <a href="/agents-ia/" className="link-serif">
                  agents IA →
                </a>{" "}
                <a href="/traitement-documents-ia/" className="link-serif">
                  traitement de factures et documents →
                </a>
              </div>
            </div>
          </section>

          <MinimalFooter />
        </div>
      </div>
    </div>
  );
}
