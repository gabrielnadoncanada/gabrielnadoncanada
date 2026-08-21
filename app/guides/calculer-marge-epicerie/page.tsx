import type { Metadata } from "next";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { TrackedLink } from "@/components/TrackedLink";

const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";
const URL = "https://gabrielnadon.com/guides/calculer-marge-epicerie/";

// Grappe épicerie — cible « calculer marge épicerie », « marge dépanneur ».
// Uniquement des formules et des exemples arithmétiques vérifiables — AUCUN
// « benchmark d'industrie » inventé : la page renvoie le lecteur à ses
// propres chiffres, c'est le message.
export const metadata: Metadata = {
  title:
    "Calculer sa marge en épicerie : formules, pièges et méthode | Gabriel Nadon",
  description:
    "Marge ou majoration ? Marge brute, marge en dollars, marge pondérée par département : les formules exactes, les trois pièges qui faussent le calcul (coûts périmés, freinte, formats), et comment regagner de la marge sur les achats.",
  alternates: { canonical: URL },
  openGraph: {
    type: "article",
    siteName: "Gabriel Nadon",
    title: "Calculer sa marge en épicerie : formules, pièges et méthode",
    description:
      "Marge ou majoration ? Les formules exactes, les pièges qui faussent le calcul, et comment regagner de la marge sur les achats.",
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
    title: "Calculer sa marge en épicerie : formules et pièges",
    description:
      "Marge ou majoration ? Les formules exactes et les pièges qui faussent le calcul.",
    images: ["https://gabrielnadon.com/og-image.png"],
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Calculer sa marge en épicerie : formules, pièges et méthode",
      description:
        "Les formules exactes de la marge en commerce d’alimentation (marge brute, marge en dollars, marge pondérée), la différence marge/majoration, et les pièges qui faussent le calcul.",
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
          name: "Comment calculer la marge d’un produit en épicerie ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Marge brute (%) = (prix de vente − coût) ÷ prix de vente × 100. Exemple : un produit acheté 4,25 $ et vendu 5,49 $ donne (5,49 − 4,25) ÷ 5,49 = 22,6 % de marge. À ne pas confondre avec la majoration, qui divise par le coût : le même produit a une majoration de 29,2 %. Confondre les deux fait vendre trop bas.",
          },
        },
        {
          "@type": "Question",
          name: "Quelle est la différence entre marge et majoration (markup) ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La marge se calcule sur le prix de vente ((vente − coût) ÷ vente) ; la majoration se calcule sur le coût ((vente − coût) ÷ coût). Une majoration de 50 % ne donne que 33 % de marge : un produit acheté 2 $ majoré de 50 % se vend 3 $, et (3 − 2) ÷ 3 = 33,3 %. Pour viser une marge précise, la formule est : prix de vente = coût ÷ (1 − marge visée). Exemple : pour 25 % de marge sur un coût de 3 $ → 3 ÷ 0,75 = 4 $.",
          },
        },
        {
          "@type": "Question",
          name: "Pourquoi la marge affichée dans mon système est-elle fausse ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Trois causes dominent : des coûts périmés (les listes de prix des fournisseurs ne sont pas reportées dans le système, donc la marge se calcule sur un coût qui n’existe plus), la freinte ignorée (pertes, casse, vol et péremption réduisent la marge réelle sans toucher la marge théorique), et des formats mélangés (comparer le coût à la caisse au prix à l’unité). Le premier réflexe est de fiabiliser les coûts — c’est exactement la mise à jour des prix fournisseurs.",
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
          name: "Logiciel de gestion pour épicerie et dépanneur",
          item: "https://gabrielnadon.com/logiciel-gestion-epicerie/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Calculer sa marge en épicerie",
          item: URL,
        },
      ],
    },
  ],
};

const NAV = [
  { href: "/logiciel-gestion-epicerie/", label: "Épicerie" },
  { href: "/#cas", label: "Cas concrets" },
  { href: "/#contact", label: "Contact" },
];

export default function MargeEpiceriePage() {
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
                  Guide pratique · Épicerie &amp; dépanneur
                </div>
                <h1 className="case-title u-mt-lg" data-rise="120">
                  Calculer sa marge en épicerie — sans se{" "}
                  <span className="italic">mentir à soi-même.</span>
                </h1>
                <p className="case-lead" data-rise="200">
                  La marge est le chiffre le plus important d’un commerce
                  d’alimentation — et l’un des plus souvent mal calculés.
                  Confondre marge et majoration fait vendre trop bas ; des
                  coûts périmés font croire à une marge qui n’existe plus. Ce
                  guide donne les formules exactes, les trois pièges classiques,
                  et la seule vraie façon de regagner de la marge sans monter
                  les prix : mieux acheter. Vous ne trouverez pas ici de
                  « marge moyenne de l’industrie » : le seul chiffre qui compte
                  est le vôtre, calculé sur des coûts à jour.
                </p>
              </div>
              <div data-rise="280">
                <div className="money-box">
                  <div className="money-kicker">La formule qui évite de vendre trop bas</div>
                  <div className="money-fig">
                    <span className="num">coût ÷ (1 − marge)</span>
                  </div>
                  <p className="money-sub">
                    Pour viser 25 % de marge sur un produit qui coûte 3,00 $ :
                    3,00 ÷ 0,75 = 4,00 $. Majorer le coût de 25 % (3,75 $)
                    n’aurait donné que 20 % de marge.
                  </p>
                  <p className="money-plus">
                    Marge et majoration, ce n’est pas pareil — le détail
                    ci-dessous.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Les formules */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">Les formules, avec exemples</span>
              <span className="rule"></span>
            </div>
            <div className="case-steps">
              <div className="case-step">
                <div className="mandat-num">
                  <span>01</span>
                </div>
                <h3 className="mandat-title">
                  <span>Marge brute (%)</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    (Prix de vente − coût) ÷ prix de vente × 100. Un produit
                    acheté 4,25 $ et vendu 5,49 $ : (5,49 − 4,25) ÷ 5,49 =
                    22,6 %. C’est le pourcentage de chaque dollar de vente qui
                    reste pour payer le loyer, la paie — et vous.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>02</span>
                </div>
                <h3 className="mandat-title">
                  <span>Majoration (markup) — l’autre calcul</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    (Prix de vente − coût) ÷ coût × 100. Le même produit :
                    (5,49 − 4,25) ÷ 4,25 = 29,2 %. La majoration est toujours
                    plus grosse que la marge — c’est pour ça qu’on se pense
                    « à 30 % » alors qu’on est à 22 %. Pour viser une marge
                    précise : prix = coût ÷ (1 − marge visée).
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>03</span>
                </div>
                <h3 className="mandat-title">
                  <span>Marge en dollars — celle qui paie le loyer</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Marge % × prix × volume vendu. Un produit à 40 % de marge
                    qui se vend deux fois par semaine rapporte moins qu’un
                    produit à 20 % qui part vingt fois. Classez vos produits
                    par marge en dollars par semaine, pas par pourcentage — le
                    palmarès change complètement.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>04</span>
                </div>
                <h3 className="mandat-title">
                  <span>Marge pondérée par département</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    (Ventes totales du département − coût des produits vendus)
                    ÷ ventes totales. C’est la seule marge comparable d’une
                    période à l’autre : elle absorbe le panier réel — les
                    produits d’appel à faible marge comme les produits payants.
                    Calculez-la par département, chaque mois, sur des coûts à
                    jour.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* Les pièges */}
          <section className="section u-pb-64">
            <div className="note-grid">
              <div>
                <div className="eyebrow u-mb-lg">Les trois pièges</div>
                <h2 className="h2-left u-measure-title">
                  Une marge calculée sur un coût périmé n’est pas une marge.
                  C’est un souvenir.
                </h2>
              </div>
              <div className="case-prose">
                <p>
                  <strong>Les coûts périmés.</strong> Chaque liste de prix
                  fournisseur non reportée dans la caisse fausse la marge de
                  dizaines de produits d’un coup — dans le mauvais sens, puisque
                  les coûts montent plus souvent qu’ils ne baissent. C’est le
                  piège nº 1, et il se règle :{" "}
                  <a
                    href="/guides/mise-a-jour-prix-fournisseurs/"
                    className="link-serif"
                  >
                    les 4 méthodes de mise à jour des prix fournisseurs
                  </a>
                  . <strong>La freinte ignorée.</strong> Casse, vol, péremption :
                  la marge réelle est toujours sous la marge théorique — suivez
                  l’écart entre les deux plutôt que de l’ignorer.{" "}
                  <strong>Les formats mélangés.</strong> Un coût à la caisse de
                  12 comparé à un prix à l’unité : l’erreur classique qui fait
                  « vendre à perte » sans le savoir. Toujours ramener coût et
                  prix au même format.
                </p>
                <p>
                  Et le levier oublié : la marge se gagne aussi{" "}
                  <strong>à l’achat</strong>. Commander chaque produit chez le
                  fournisseur le moins cher — parce qu’on peut enfin comparer —
                  a redonné de la marge sur chaque commande à{" "}
                  <a
                    href="/cas/synchronisation-prix-fournisseurs/"
                    className="link-serif"
                  >
                    l’épicerie du cas
                  </a>
                  , en plus des 56 000 $ de temps récupérés.
                </p>
              </div>
            </div>
          </section>

          {/* Gabarits */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">Les gabarits qui vont avec</span>
              <div className="u-measure-prose">
                <span className="serif-muted">
                  La marge par produit se calcule toute seule dans le{" "}
                </span>
                <TrackedLink
                  event="gabarit_download"
                  href="/gabarits/inventaire-epicerie.xlsx"
                  className="link-serif"
                >
                  gabarit d’inventaire (.xlsx gratuit) →
                </TrackedLink>{" "}
                <span className="serif-muted">
                  et le meilleur prix d’achat se repère avec le{" "}
                </span>
                <TrackedLink
                  event="gabarit_download"
                  href="/gabarits/comparaison-prix-fournisseurs.xlsx"
                  className="link-serif"
                >
                  gabarit de comparaison de prix fournisseurs →
                </TrackedLink>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="section">
            <div className="contact-grid">
              <div>
                <div className="contact-eyebrow">Vos vrais chiffres</div>
                <h2 className="contact-title">
                  Votre marge réelle,{" "}
                  <span className="italic">sur des coûts à jour.</span>
                </h2>
                <p className="contact-lead">
                  En 20 minutes, on regarde comment vos coûts entrent dans
                  votre caisse et ce que ça fausse dans vos marges — et je vous
                  dis quoi fiabiliser en premier. Gratuit, sans obligation.
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
                  <a
                    href="/logiciel-gestion-epicerie/"
                    className="scp5 contact-link u-mt-sm"
                  >
                    <span>
                      <span className="kv-label-block">Épicerie ou dépanneur ?</span>
                      <span className="icon-16">La page dédiée à votre commerce</span>
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
