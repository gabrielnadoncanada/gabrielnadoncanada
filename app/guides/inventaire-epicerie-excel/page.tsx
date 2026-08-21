import type { Metadata } from "next";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { TrackedLink } from "@/components/TrackedLink";

const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";
const URL = "https://gabrielnadon.com/guides/inventaire-epicerie-excel/";

// Grappe épicerie — cible « inventaire épicerie excel », « gestion inventaire
// dépanneur ». Gabarit Excel réel en aimant, funnel vers la page verticale.
export const metadata: Metadata = {
  title:
    "Inventaire d’épicerie dans Excel : gabarit gratuit, méthode — et ses limites | Gabriel Nadon",
  description:
    "Un gabarit Excel gratuit d’inventaire pour épicerie et dépanneur (300 produits, valeur du stock, marge, alertes de commande), la méthode du comptage cyclique — et les trois signes qu’Excel ne suffit plus.",
  alternates: { canonical: URL },
  openGraph: {
    type: "article",
    siteName: "Gabriel Nadon",
    title: "Inventaire d’épicerie dans Excel : gabarit gratuit et méthode",
    description:
      "Gabarit gratuit (300 produits, valeur du stock, marges, alertes), la méthode du comptage cyclique — et quand Excel ne suffit plus.",
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
    title: "Inventaire d’épicerie dans Excel : gabarit gratuit et méthode",
    description:
      "Gabarit gratuit, comptage cyclique — et les trois signes qu’Excel ne suffit plus.",
    images: ["https://gabrielnadon.com/og-image.png"],
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline:
        "Inventaire d’épicerie dans Excel : gabarit gratuit, méthode — et ses limites",
      description:
        "Comment tenir l’inventaire d’une épicerie ou d’un dépanneur dans Excel : structure du fichier, comptage cyclique, gabarit gratuit — et les signes qu’il est temps de brancher l’inventaire sur la caisse.",
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
          name: "Comment faire l’inventaire d’une épicerie dans Excel ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Un produit par ligne avec au minimum : code CUP, description, département, fournisseur principal, coût unitaire, prix de vente, quantité en stock et seuil de commande. Trois colonnes calculées font le travail : valeur du stock (coût × quantité), marge ((vente − coût) ÷ vente) et alerte de commande (stock ≤ seuil). Comptez par section, une par semaine (comptage cyclique), plutôt que tout le magasin d’un coup.",
          },
        },
        {
          "@type": "Question",
          name: "Qu’est-ce que le comptage cyclique en épicerie ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Au lieu de fermer pour compter tout le magasin une fois par année, on compte une section différente chaque semaine (laitier, boulangerie, congelé…) et on fait le tour complet en continu. Le stock reste fiable toute l’année, l’effort est réparti, et les écarts (pertes, vols, erreurs de réception) se détectent en semaines plutôt qu’en mois.",
          },
        },
        {
          "@type": "Question",
          name: "Quand Excel ne suffit-il plus pour l’inventaire d’un commerce ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Trois signes : plus d’une personne doit modifier le fichier (les versions divergent), les coûts fournisseurs changent plus vite que le fichier (la marge affichée devient fausse), et le fichier ne parle pas à la caisse (les ventes ne décrémentent rien — tout se recompte à la main). À ce stade, la solution n’est pas un plus gros fichier Excel : c’est de brancher l’inventaire sur la caisse existante.",
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
          name: "Inventaire d’épicerie dans Excel",
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

export default function InventaireEpiceriePage() {
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

          {/* Hero + gabarit */}
          <section className="case-hero">
            <div className="case-hero-grid">
              <div>
                <div className="eyebrow" data-rise="50">
                  Guide pratique · Épicerie &amp; dépanneur · gabarit inclus
                </div>
                <h1 className="case-title u-mt-lg" data-rise="120">
                  L’inventaire d’épicerie dans Excel : bien le faire —{" "}
                  <span className="italic">et savoir quand arrêter.</span>
                </h1>
                <p className="case-lead" data-rise="200">
                  La plupart des épiceries et dépanneurs indépendants tiennent
                  leur « vrai » inventaire dans un fichier Excel que personne
                  d’autre n’ose toucher. Ce n’est pas un défaut — c’est un
                  point de départ. Voici comment structurer ce fichier pour
                  qu’il travaille (valeur du stock, marges, alertes de
                  commande), la méthode de comptage qui le garde fiable, et les
                  trois signes qu’il est temps de passer à autre chose.
                </p>
                <div data-rise="240">
                  <TrackedLink
                    event="gabarit_download"
                    href="/gabarits/inventaire-epicerie.xlsx"
                    className="btn-block"
                  >
                    Télécharger le gabarit (.xlsx, gratuit) <span>→</span>
                  </TrackedLink>
                  <p className="form-note">
                    300 produits, sans courriel, sans inscription. Valeur du
                    stock, marge par produit et alertes « à commander »
                    calculées automatiquement.
                  </p>
                </div>
              </div>
              <div data-rise="280">
                <div className="money-box">
                  <div className="money-kicker">Ce que le gabarit calcule tout seul</div>
                  <div className="money-fig">
                    <span className="num">3</span>
                    <span className="cur">colonnes clés</span>
                  </div>
                  <p className="money-sub">
                    Valeur du stock au coût (coût × quantité), marge par
                    produit ((vente − coût) ÷ vente) et alerte de commande
                    quand le stock passe sous votre seuil — surlignée
                    automatiquement.
                  </p>
                  <p className="money-plus">
                    Un produit par ligne, un seul fichier maître. C’est la
                    règle.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* La méthode */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">La méthode, en trois habitudes</span>
              <span className="rule"></span>
            </div>
            <div className="case-steps">
              <div className="case-step">
                <div className="mandat-num">
                  <span>01</span>
                </div>
                <h3 className="mandat-title">
                  <span>Un produit par ligne, un fichier maître</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Code CUP, description, département, fournisseur principal,
                    coût, prix de vente, quantité, seuil de commande. Pas de
                    cellules fusionnées, pas d’onglet par mois, pas de copies
                    « inventaire-final-v2 » : un seul fichier, que le gabarit
                    structure d’avance.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>02</span>
                </div>
                <h3 className="mandat-title">
                  <span>Le comptage cyclique : une section par semaine</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Plutôt que le grand inventaire annuel qui mobilise tout le
                    monde, comptez une section différente chaque semaine —
                    laitier, boulangerie, congelé… Le tour complet se fait en
                    continu, le stock reste fiable toute l’année, et les écarts
                    (pertes, erreurs de réception) se voient en semaines, pas en
                    mois.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>03</span>
                </div>
                <h3 className="mandat-title">
                  <span>Le coût à jour, sinon la marge ment</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    La colonne « marge » ne vaut que ce que vaut la colonne
                    « coût ». Si les listes de prix fournisseurs ne sont pas
                    reportées dans le fichier, votre marge affichée est une
                    fiction. C’est le maillon faible de tout inventaire Excel —
                    et la raison pour laquelle la{" "}
                    <a
                      href="/guides/mise-a-jour-prix-fournisseurs/"
                      className="link-serif"
                    >
                      mise à jour des prix fournisseurs
                    </a>{" "}
                    est la première chose à automatiser, avant même
                    l’inventaire.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* Les limites */}
          <section className="section u-pb-64">
            <div className="note-grid">
              <div>
                <div className="eyebrow u-mb-lg">Les limites d’Excel</div>
                <h2 className="h2-left u-measure-title">
                  Trois signes qu’il est temps d’arrêter d’agrandir le fichier.
                </h2>
              </div>
              <div className="case-prose">
                <p>
                  <strong>Plus d’une personne doit y toucher.</strong> Dès que
                  le fichier se partage, les versions divergent et « le vrai
                  chiffre » redevient une question d’opinion.{" "}
                  <strong>Les coûts changent plus vite que le fichier.</strong>{" "}
                  Chaque liste de fournisseur non reportée fausse la marge de
                  dizaines de produits. <strong>Le fichier ne parle pas à la
                  caisse.</strong> Les ventes ne décrémentent rien : tout ce qui
                  sort du magasin devra être recompté à la main.
                </p>
                <p>
                  À ce stade, la réponse n’est pas un plus gros Excel — ni
                  nécessairement une nouvelle caisse. Un système intermédiaire
                  peut lire vos ventes et vos listes de fournisseurs et tenir
                  l’inventaire à jour dans ce que vous avez déjà. C’est
                  l’approche du{" "}
                  <a
                    href="/cas/synchronisation-prix-fournisseurs/"
                    className="link-serif"
                  >
                    cas de l’épicerie (56 000 $/an récupérés)
                  </a>
                  , appliquée aux stocks plutôt qu’aux prix.
                </p>
              </div>
            </div>
          </section>

          {/* Maillage grappe */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">Pour aller plus loin</span>
              <div className="u-measure-prose">
                <span className="serif-muted">
                  Vous magasinez plutôt un vrai système ?{" "}
                </span>
                <a
                  href="/guides/comparatif-logiciels-epicerie-quebec/"
                  className="link-serif"
                >
                  Le comparatif québécois des logiciels d’épicerie →
                </a>{" "}
                <span className="serif-muted">
                  Et pour savoir ce que la saisie manuelle vous coûte vraiment :{" "}
                </span>
                <a href="/calculateur/" className="link-serif">
                  le calculateur du travail manuel →
                </a>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="section">
            <div className="contact-grid">
              <div>
                <div className="contact-eyebrow">Votre commerce, vos chiffres</div>
                <h2 className="contact-title">
                  Excel déborde ?{" "}
                  <span className="italic">Voyons ça en 20 minutes.</span>
                </h2>
                <p className="contact-lead">
                  Décrivez-moi comment votre inventaire se tient aujourd’hui —
                  je vous dis quoi brancher en premier, ce que ça coûte et ce
                  que ça rapporte. Gratuit, sans obligation, et sans vous vendre
                  de nouvelle caisse.
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
