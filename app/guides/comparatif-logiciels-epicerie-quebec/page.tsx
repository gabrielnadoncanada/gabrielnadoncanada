import type { Metadata } from "next";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { TrackedLink } from "@/components/TrackedLink";

const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";
const URL =
  "https://gabrielnadon.com/guides/comparatif-logiciels-epicerie-quebec/";

// Comparatif des systèmes de caisse/gestion pour épicerie au Québec.
// Trou de marché vérifié (2026-08) : le seul comparatif qui ranke est français
// (NF525, non pertinente au QC) ; les acteurs québécois n'ont que des pages
// produit. Faits sourcés depuis les sites officiels des éditeurs — aucune
// affirmation non vérifiée ; les revendications marketing sont attribuées
// (« se présente comme »). Cette page ne recommande PAS un éditeur : elle
// équipe le lecteur pour choisir, puis montre ce qu'aucune caisse ne règle
// (la synchronisation des prix fournisseurs → le cas + l'offre).
export const metadata: Metadata = {
  title:
    "Logiciel d’épicerie au Québec : comparatif des systèmes de caisse et de gestion (2026) | Gabriel Nadon",
  description:
    "SIR Solutions, LOC Software, Panza, Logivision, Square : le comparatif québécois des systèmes pour épicerie et dépanneur indépendant — balances, inventaire, prix publiés quand ils existent, et ce qu’aucun d’eux ne règle : la mise à jour des prix fournisseurs.",
  alternates: { canonical: URL },
  openGraph: {
    type: "article",
    siteName: "Gabriel Nadon",
    title:
      "Logiciel d’épicerie au Québec : le comparatif des systèmes (2026)",
    description:
      "SIR, LOC, Panza, Logivision, Square — comparés pour l’épicerie indépendante québécoise, par quelqu’un qui a travaillé dans les systèmes d’une épicerie.",
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
    title: "Logiciel d’épicerie au Québec : le comparatif (2026)",
    description:
      "SIR, LOC, Panza, Logivision, Square — comparés pour l’épicerie indépendante québécoise.",
    images: ["https://gabrielnadon.com/og-image.png"],
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline:
        "Logiciel d’épicerie au Québec : le comparatif des systèmes de caisse et de gestion (2026)",
      description:
        "Comparatif des systèmes POS et de gestion pour épiceries et dépanneurs indépendants au Québec : SIR Solutions, LOC Software, Panza, ACCEO Logivision, Square — et la question que ce marché ne règle pas, la synchronisation des prix fournisseurs.",
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
      "@type": "ItemList",
      name: "Systèmes de caisse et de gestion pour épicerie indépendante au Québec",
      numberOfItems: 5,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "SIR Solutions (Montréal)" },
        { "@type": "ListItem", position: 2, name: "LOC Software — Store Management Suite (Laval)" },
        { "@type": "ListItem", position: 3, name: "Panza (Québec)" },
        { "@type": "ListItem", position: 4, name: "ACCEO Logivision — L-POS / L-BOSS (Montréal)" },
        { "@type": "ListItem", position: 5, name: "Square (généraliste)" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Quel est le meilleur logiciel de gestion pour une épicerie indépendante au Québec ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Il n’y a pas de « meilleur » universel : SIR Solutions, LOC Software, Panza et ACCEO Logivision sont tous des systèmes québécois sérieux, avec des forces différentes. Le bon choix dépend de trois questions : avez-vous besoin de balances de rayon intégrées, combien de caisses avez-vous, et quel budget mensuel est réaliste. Panza est le seul des quatre à publier ses prix (de 59 $ à 249 $/mois).",
          },
        },
        {
          "@type": "Question",
          name: "Combien coûte un logiciel d’épicerie au Québec ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La plupart des éditeurs québécois (SIR Solutions, LOC Software, ACCEO Logivision) ne publient pas leurs prix — il faut demander une soumission. Panza publie les siens : de 59 $/mois (1 caisse) à 249 $/mois (4 caisses avec vente en ligne). Square affiche 2,5 % par transaction en personne au Canada, avec un plan de base gratuit, mais ses limites en vente au poids le rendent difficile pour une épicerie complète.",
          },
        },
        {
          "@type": "Question",
          name: "Faut-il changer de caisse pour automatiser la mise à jour des prix fournisseurs ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Non — et c’est le point aveugle de ce marché : aucun des grands systèmes d’épicerie ne documente publiquement l’import automatique des listes de prix de vos fournisseurs. La solution éprouvée est un système intermédiaire qui lit les fichiers de tous les fournisseurs, compare les prix et alimente la caisse existante. Une épicerie du Québec l’a fait sans changer de caisse et a récupéré 56 000 $ par année.",
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
          name: "Comparatif des logiciels d’épicerie au Québec",
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

export default function ComparatifEpiceriePage() {
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
                  Comparatif indépendant · Québec · mis à jour août 2026
                </div>
                <h1 className="case-title u-mt-lg" data-rise="120">
                  Logiciel d’épicerie au Québec : le comparatif que{" "}
                  <span className="italic">les vendeurs n’écriront pas.</span>
                </h1>
                <p className="case-lead" data-rise="200">
                  Cherchez « logiciel gestion épicerie » et vous tomberez sur
                  des comparatifs français — certification NF525, centrales
                  d’achat européennes, rien qui s’applique à un commerce d’ici.
                  Voici les systèmes qui équipent réellement les épiceries et
                  dépanneurs indépendants du Québec, ce que chacun fait bien,
                  ce que leurs sites ne disent pas — et la corvée qu’aucun
                  d’entre eux ne règle. Je ne vends aucun de ces logiciels ;
                  j’ai travaillé dans les systèmes d’une épicerie indépendante,
                  du côté de ceux qui les utilisent.
                </p>
              </div>
              <div data-rise="280">
                <div className="money-box">
                  <div className="money-kicker">Ce que ce comparatif révèle</div>
                  <div className="money-fig">
                    <span className="num">0 / 5</span>
                    <span className="cur">systèmes</span>
                  </div>
                  <p className="money-sub">
                    documentent publiquement l’import automatique des listes de
                    prix de vos fournisseurs — la tâche qui a coûté 56 000 $/an
                    à une épicerie du Québec.
                  </p>
                  <p className="money-plus">
                    Le détail, fournisseur par fournisseur, ci-dessous.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Les fiches */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">Les systèmes, un par un</span>
              <span className="rule"></span>
            </div>
            <div className="case-steps">
              <div className="case-step">
                <div className="mandat-num">
                  <span>01</span>
                </div>
                <h3 className="mandat-title">
                  <span>SIR Solutions — Montréal</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Vétéran québécois (fondé en 1994) qui se présente comme « le
                    système PDV pour épicerie nº 1 au Canada ». Sa documentation
                    met de l’avant l’intégration des balances de rayon — prix,
                    ingrédients et valeurs nutritionnelles transférés d’un coup —
                    l’envoi simultané des prix à la caisse et aux balances, et
                    des suggestions de commandes basées sur les tendances du
                    magasin. Sert aussi pharmacies, stations-service et détail.
                    Prix non publiés : soumission obligatoire. Le choix
                    « établissement complet » : boucherie, prêt-à-manger,
                    balances partout.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>02</span>
                </div>
                <h3 className="mandat-title">
                  <span>LOC Software (Store Management Suite) — Laval</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Plus de 30 ans dans le POS d’alimentation, siège à Laval,
                    plus de 40 modules (caisse, back-office, entrepôt) et —
                    selon l’éditeur — plus de 30 000 systèmes installés. Mise à
                    jour des prix en mobilité avec impression d’étiquettes,
                    étiquettes électroniques de tablette, libre-service,
                    fidélité, e-commerce (partenariat Local Express annoncé en
                    janvier 2026). Prix non publiés. Nuance à vérifier en démo :
                    un avis public détaillé critique justement son module
                    achats/réception et sa documentation — posez vos questions
                    sur ce module-là.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>03</span>
                </div>
                <h3 className="mandat-title">
                  <span>Panza — Québec</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Le plus récent, « conçu par un épicier, pour un épicier »,
                    ciblé épiceries de quartier, dépanneurs, boucheries et
                    zéro-déchet. Inventaire temps réel, commandes fournisseurs
                    assistées, lecture des factures par reconnaissance visuelle
                    avec comparaison commandé/reçu, balances pour le vrac, vente
                    en ligne synchronisée. Surtout : le seul acteur québécois
                    qui publie ses prix — de 59 $/mois (1 caisse) à 249 $/mois
                    (4 caisses + vente en ligne), 2 mois d’essai. Pour un
                    commerce qui part de zéro ou en a assez des soumissions
                    opaques, c’est la référence de transparence du marché.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>04</span>
                </div>
                <h3 className="mandat-title">
                  <span>ACCEO Logivision (L-POS / L-BOSS) — Montréal</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Éditeur québécois établi (groupe Harris), présent dans les
                    supermarchés, dépanneurs, boucheries et magasins de
                    spiritueux. Force documentée : les « lots de prix »
                    programmés — des changements de prix permanents ou
                    promotionnels qui s’activent seuls à la date voulue — et
                    l’interface vers les logiciels comptables. Distribution par
                    revendeurs régionaux (Dijitec en Mauricie et au
                    Centre-du-Québec, Globe POS, STR PDV…) : vous achetez aussi
                    la proximité du technicien qui se déplace. Prix non publiés.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>05</span>
                </div>
                <h3 className="mandat-title">
                  <span>Square — le généraliste à connaître (et ses limites)</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Tentant pour un petit dépanneur : plan de base gratuit,
                    2,5 % par transaction en personne au Canada, installation en
                    une journée. Mais pour une vraie épicerie, ses limites
                    documentées pèsent : seules les balances de sa courte liste
                    de compatibilité fonctionnent, et les codes-barres à poids
                    intégré — imprimés par les balances de rayon sur la viande
                    et le prêt-à-manger — ne sont pas pris en charge. Correct
                    pour un comptoir sans pesée ; sous-dimensionné dès que la
                    balance entre en jeu.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* Comment choisir */}
          <section className="section u-pb-64">
            <div className="note-grid">
              <div>
                <div className="eyebrow u-mb-lg">Comment choisir</div>
                <h2 className="h2-left u-measure-title">
                  Trois questions décident, avant toute démo.
                </h2>
              </div>
              <div className="case-prose">
                <p>
                  <strong>1. Vendez-vous au poids ?</strong> Boucherie, vrac,
                  prêt-à-manger : il vous faut des balances intégrées et les
                  codes-barres à poids intégré. Ça élimine les généralistes et
                  ça met SIR, LOC et Logivision en tête de liste. Sans pesée, le
                  jeu s’ouvre — Panza, voire Square.
                </p>
                <p>
                  <strong>2. Qui vous dépannera un samedi ?</strong> Un système
                  de caisse tombe toujours en panne un jour de pointe. Le
                  revendeur régional qui se déplace (le modèle
                  Logivision/Dijitec) vaut parfois plus que la liste de
                  fonctionnalités.
                </p>
                <p>
                  <strong>3. Exigez le prix complet par écrit.</strong> Un seul
                  acteur québécois publie ses prix. Pour les autres, demandez le
                  coût sur 5 ans : licence, matériel, installation, formation,
                  frais mensuels, et le prix de chaque « module » qu’on
                  ajoutera plus tard. C’est là que les soumissions se
                  départagent.
                </p>
              </div>
            </div>
          </section>

          {/* Ce qu'aucun ne règle */}
          <section className="note">
            <div className="section">
              <div className="note-grid">
                <div>
                  <div className="note-eyebrow">Le point aveugle du marché</div>
                  <p className="note-quote">
                    Aucune de ces caisses ne met vos prix fournisseurs à jour
                    toute seule.
                  </p>
                  <p className="note-body">
                    Toutes gèrent les prix de vente. Mais les listes de prix qui
                    arrivent de vos huit fournisseurs — Excel, CSV, PDF, papier —
                    aucun de ces systèmes ne documente publiquement leur import
                    automatique. Résultat : quelqu’un les retape, chez presque
                    tous les indépendants. Une épicerie du Québec a chiffré
                    cette corvée : près de 56 000 $ par année. On l’a éliminée
                    avec un système intermédiaire branché sur sa caisse
                    existante — sans la remplacer.
                  </p>
                </div>
                <div className="principles">
                  <div className="principle">
                    <div className="principle-head">
                      <span className="principle-num">
                        <span>I.</span>
                      </span>
                      <div>
                        <h3 className="principle-title">
                          <span>Le cas, en détail</span>
                        </h3>
                        <p className="principle-text">
                          <span>
                            37 000 prix synchronisés, 56 000 $/an récupérés,
                            zéro journée d’interruption.{" "}
                            <a
                              href="/cas/synchronisation-prix-fournisseurs/"
                              className="link-serif"
                            >
                              Lire le cas →
                            </a>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="principle">
                    <div className="principle-head">
                      <span className="principle-num">
                        <span>II.</span>
                      </span>
                      <div>
                        <h3 className="principle-title">
                          <span>Les 4 méthodes de mise à jour</span>
                        </h3>
                        <p className="principle-text">
                          <span>
                            De la saisie manuelle à la synchronisation
                            automatisée : coûts réels et pièges.{" "}
                            <a
                              href="/guides/mise-a-jour-prix-fournisseurs/"
                              className="link-serif"
                            >
                              Lire le guide →
                            </a>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="principle">
                    <div className="principle-head">
                      <span className="principle-num">
                        <span>III.</span>
                      </span>
                      <div>
                        <h3 className="principle-title">
                          <span>Gabarit Excel gratuit</span>
                        </h3>
                        <p className="principle-text">
                          <span>
                            Comparez les prix de 3 fournisseurs, produit par
                            produit, en attendant d’automatiser.{" "}
                            <TrackedLink
                              event="gabarit_download"
                              href="/gabarits/comparaison-prix-fournisseurs.xlsx"
                              className="link-serif"
                            >
                              Télécharger (.xlsx) →
                            </TrackedLink>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="section">
            <div className="contact-grid">
              <div>
                <div className="contact-eyebrow">Un avis neutre</div>
                <h2 className="contact-title">
                  Avant de signer une soumission,{" "}
                  <span className="italic">parlons-en 20 minutes.</span>
                </h2>
                <p className="contact-lead">
                  Je ne vends aucun de ces systèmes — je n’ai rien à gagner à
                  vous orienter vers l’un ou l’autre. En 20 minutes, on regarde
                  votre commerce, vos fournisseurs et vos soumissions, et je
                  vous dis ce que je ferais à votre place. Gratuit.
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
                      <span className="kv-label-block">Garder votre caisse ?</span>
                      <span className="icon-16">
                        Automatiser sans rien remplacer
                      </span>
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
