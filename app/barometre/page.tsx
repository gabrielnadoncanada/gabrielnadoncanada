import type { Metadata } from "next";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { BarometreForm } from "@/components/BarometreForm";

const URL = "https://gabrielnadon.com/barometre/";

// Baromètre IA & automatisation des PME du Québec — collecte de données
// originales (modèle « enquête annuelle » : la stat inédite est le format le
// plus cité par médias et moteurs IA). Réponses envoyées via /api/barometre.
// Stats de cadrage : NETendances 2025 (ATN/U. Laval) et ISQ 2024-2025.
export const metadata: Metadata = {
  title:
    "Baromètre IA & automatisation des PME du Québec — édition 2026 | Gabriel Nadon",
  description:
    "Où en sont vraiment les PME québécoises avec l’IA et l’automatisation ? Participez au baromètre 2026 : 11 questions, 2 minutes, réponses anonymes. Recevez les résultats compilés par secteur en primeur.",
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    siteName: "Gabriel Nadon",
    title: "Baromètre IA & automatisation des PME du Québec — édition 2026",
    description:
      "11 questions, 2 minutes. Où en sont vraiment les PME québécoises avec l’IA ? Participez et recevez les résultats par secteur.",
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
    title: "Baromètre IA & automatisation des PME du Québec — 2026",
    description:
      "11 questions, 2 minutes, anonyme. Recevez les résultats compilés par secteur.",
    images: ["https://gabrielnadon.com/og-image.png"],
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Baromètre IA & automatisation des PME du Québec — édition 2026",
      description:
        "Enquête annuelle sur l’adoption de l’IA et de l’automatisation dans les PME québécoises : usage réel, heures perdues en tâches manuelles, freins et budgets.",
      inLanguage: "fr-CA",
      url: URL,
      author: {
        "@type": "Person",
        name: "Gabriel Nadon",
        url: "https://gabrielnadon.com/",
      },
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
          name: "Baromètre IA & automatisation des PME du Québec",
          item: URL,
        },
      ],
    },
  ],
};

const NAV = [
  { href: "/#approche", label: "Approche" },
  { href: "/#mandats", label: "Mandats" },
  { href: "/#cas", label: "Cas concrets" },
  { href: "/#contact", label: "Contact" },
];

export default function BarometrePage() {
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
          <SiteHeader brandHref="/" navItems={NAV} ctaHref="#participer" />

          {/* Hero */}
          <section className="case-hero">
            <div className="case-hero-grid">
              <div>
                <div className="eyebrow" data-rise="50">
                  Enquête annuelle · édition 2026 · 2 minutes
                </div>
                <h1 className="case-title u-mt-lg" data-rise="120">
                  Où en sont <span className="italic">vraiment</span> les PME du
                  Québec avec l’IA ?
                </h1>
                <p className="case-lead" data-rise="200">
                  Les grandes enquêtes mesurent l’adoption. Personne ne mesure le
                  terrain : combien d’heures par semaine partent encore en
                  saisie manuelle, qui utilise l’IA en cachette de son patron,
                  et ce qui bloque réellement les projets. Ce baromètre pose ces
                  questions-là, à des dirigeants de PME comme vous. Les
                  résultats compilés — par secteur et par taille — seront
                  publiés ici, gratuitement.
                </p>
                <div data-rise="240">
                  <a href="#participer" className="btn-block">
                    Participer — 11 questions <span>→</span>
                  </a>
                  <p className="form-note">
                    Anonyme. Le courriel est facultatif et sert uniquement à
                    vous envoyer les résultats en primeur.
                  </p>
                </div>
              </div>
              <div data-rise="280">
                <div className="money-box">
                  <div className="money-kicker">Ce qu’on sait déjà — et le trou</div>
                  <div className="money-fig">
                    <span className="num">12,7 %</span>
                    <span className="cur">seulement</span>
                  </div>
                  <p className="money-sub">
                    des entreprises québécoises utilisent l’IA (Institut de la
                    statistique du Québec, 2024-2025), alors que 52 % des
                    adultes québécois l’utilisent à titre personnel (NETendances
                    2025).
                  </p>
                  <p className="money-plus">
                    Pourquoi l’écart ? C’est exactement ce que ce baromètre
                    mesure.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pourquoi participer */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">Comment ça fonctionne</span>
              <span className="rule"></span>
            </div>
            <div className="case-steps">
              <div className="case-step">
                <div className="mandat-num">
                  <span>01</span>
                </div>
                <h3 className="mandat-title">
                  <span>Vous répondez — 2 minutes</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Onze questions à choix de réponses : vos données, vos heures
                    manuelles, votre usage de l’IA, vos freins, votre budget.
                    Aucune bonne ou mauvaise réponse.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>02</span>
                </div>
                <h3 className="mandat-title">
                  <span>Je compile — anonymement</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Les réponses sont agrégées par secteur et par taille
                    d’entreprise. Aucune réponse individuelle n’est publiée ni
                    partagée — jamais.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>03</span>
                </div>
                <h3 className="mandat-title">
                  <span>Tout le monde reçoit les résultats</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Les chiffres compilés sont publiés sur cette page et envoyés
                    en primeur aux participants qui ont laissé leur courriel —
                    avec le détail par secteur, pour vous comparer à vos pairs.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* Le sondage */}
          <section className="section" id="participer">
            <div className="contact-grid">
              <div>
                <div className="contact-eyebrow">Le baromètre — édition 2026</div>
                <h2 className="contact-title">
                  Onze questions.{" "}
                  <span className="italic">Vos pairs veulent vos réponses.</span>
                </h2>
                <p className="contact-lead">
                  Chaque réponse rend le portrait plus fidèle — surtout si votre
                  entreprise n’a encore « rien fait » avec l’IA : c’est
                  précisément la réalité que les enquêtes officielles peinent à
                  capter.
                </p>
              </div>
              <div className="cab-paper contact-card">
                <BarometreForm />
              </div>
            </div>
          </section>

          <MinimalFooter />
        </div>
      </div>
    </div>
  );
}
