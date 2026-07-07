import type { Metadata } from "next";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { TrackedLink } from "@/components/TrackedLink";

export const metadata: Metadata = {
  title:
    "Cas : 56 000 $ par année récupérés en éliminant la mise à jour manuelle des prix | Gabriel Nadon",
  description:
    "Une tâche manuelle coûtait à une PME québécoise l'équivalent d'un poste à temps partiel — près de 56 000 $ par année. Voici le système qui l'a éliminée, et la marge regagnée en achetant au meilleur prix.",
  alternates: {
    canonical: "https://gabrielnadon.com/cas/synchronisation-prix-fournisseurs/",
  },
  openGraph: {
    type: "article",
    siteName: "Gabriel Nadon",
    title: "56 000 $ par année, cachés dans une tâche manuelle",
    description:
      "Le coût réel d'un processus manuel dans une PME — et comment on l'a récupéré, avec de la marge en prime.",
    url: "https://gabrielnadon.com/cas/synchronisation-prix-fournisseurs/",
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
    title: "56 000 $ par année, cachés dans une tâche manuelle",
    description:
      "Le coût réel d'un processus manuel dans une PME — et comment on l'a récupéré.",
    images: ["https://gabrielnadon.com/og-image.png"],
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "56 000 $ par année, cachés dans une tâche manuelle",
      description:
        "Étude de cas : le coût réel d'un processus manuel dans une PME québécoise, et le système qui l'a éliminé tout en regagnant de la marge.",
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
      mainEntityOfPage:
        "https://gabrielnadon.com/cas/synchronisation-prix-fournisseurs/",
      image: "https://gabrielnadon.com/og-image.png",
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
          name: "Cas concrets",
          item: "https://gabrielnadon.com/#cas",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "56 000 $ récupérés sur une tâche manuelle",
          item: "https://gabrielnadon.com/cas/synchronisation-prix-fournisseurs/",
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

export default function CasPage() {
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

          {/* Hero : l'argent d'abord */}
          <section className="case-hero">
            <div className="case-hero-grid">
              <div>
                <div className="eyebrow" data-rise="50">
                  Cas concret · Le vrai coût d&apos;un processus manuel
                </div>
                <h1
                  className="case-title u-mt-lg"
                  data-rise="120"
                >
                  Près de 56 000 $ par année, cachés dans une tâche que{" "}
                  <span className="italic">personne n&apos;avait chiffrée.</span>
                </h1>
                <p className="case-lead" data-rise="200">
                  Chaque semaine, une équipe recopiait à la main les prix de ses
                  fournisseurs dans son système de caisse. Le geste semblait
                  anodin. Additionné sur l&apos;année, c&apos;était
                  l&apos;équivalent d&apos;un salaire à temps partiel — dépensé à
                  retaper des chiffres. Nous avons bâti le système qui le fait à
                  leur place. Et comme il compare tous les fournisseurs à chaque
                  commande, l&apos;entreprise achète désormais au meilleur prix :
                  de la marge regagnée, en plus du temps.
                </p>
              </div>
              <div data-rise="280">
                <div className="money-box">
                  <div className="money-kicker">Temps repris, chaque année</div>
                  <div className="money-fig">
                    <span className="num">56 000</span>
                    <span className="cur">$</span>
                  </div>
                  <p className="money-sub">
                    L&apos;équivalent d&apos;un poste à temps partiel, rendu à
                    l&apos;équipe pour un travail qui fait grandir
                    l&apos;entreprise.
                  </p>
                  <p className="money-plus">
                    + la marge regagnée sur chaque produit acheté au meilleur
                    prix.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Chiffres */}
          <section className="band">
            <div className="wrap">
              <div className="cab-proof stats-grid">
                <div className="stat">
                  <div className="tick"></div>
                  <div className="stat-num">
                    <span className="tnum">56</span>
                    <span className="stat-unit">
                      <span>k $ / an</span>
                    </span>
                  </div>
                  <div className="stat-label">
                    <span>de temps de saisie récupéré, chaque année</span>
                  </div>
                </div>
                <div className="stat">
                  <div className="tick"></div>
                  <div className="stat-num">
                    <span className="tnum">100</span>
                    <span className="stat-unit">
                      <span>%</span>
                    </span>
                  </div>
                  <div className="stat-label">
                    <span>de la mise à jour manuelle des prix, éliminée</span>
                  </div>
                </div>
                <div className="stat">
                  <div className="tick"></div>
                  <div className="stat-num">
                    <span className="tnum">37 k</span>
                    <span className="stat-unit">
                      <span>prix</span>
                    </span>
                  </div>
                  <div className="stat-label">
                    <span>vérifiés et comparés à chaque cycle, sans effort</span>
                  </div>
                </div>
                <div className="stat">
                  <div className="tick"></div>
                  <div className="stat-num">
                    <span className="tnum">+</span>
                    <span className="stat-unit">
                      <span>marge</span>
                    </span>
                  </div>
                  <div className="stat-label">
                    <span>sur chaque achat, en payant toujours le moins cher</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Le problème, en dollars */}
          <section
            className="section u-pb-64"
          >
            <div className="note-grid">
              <div>
                <div className="eyebrow u-mb-lg">
                  Une dépense que personne ne voyait
                </div>
                <h2 className="h2-left u-measure-title">
                  La tâche n&apos;était pas sur les livres. Elle était sur la
                  paie.
                </h2>
              </div>
              <div className="case-prose">
                <p>
                  Personne n&apos;avait jamais additionné les heures. On
                  acceptait la mise à jour des prix comme une corvée normale, un
                  mal nécessaire du métier. Mais chaque liste de fournisseur —
                  des dizaines de milliers de lignes — se retapait à la main,
                  semaine après semaine.
                </p>
                <p>
                  Mis bout à bout, ce travail invisible coûtait près de{" "}
                  <strong>56 000 $ par année</strong> en temps. Sans compter les
                  erreurs de saisie, et sans compter l&apos;argent laissé sur la
                  table chaque fois qu&apos;un produit était commandé chez le
                  fournisseur le plus cher, faute de pouvoir comparer.
                </p>
              </div>
            </div>
          </section>

          {/* Ce qu'on a fait */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">Comment on l&apos;a récupéré</span>
              <span className="rule"></span>
            </div>
            <div className="case-steps">
              <div className="case-step">
                <div className="mandat-num">
                  <span>01</span>
                </div>
                <h3 className="mandat-title">
                  <span>On a chiffré l&apos;invisible</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    La première étape a été de mettre un montant sur la corvée.
                    Une fois la perte devenue un chiffre, la décision s&apos;est
                    prise toute seule.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>02</span>
                </div>
                <h3 className="mandat-title">
                  <span>La machine recopie, plus l&apos;équipe</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Le système importe les listes de tous les fournisseurs,
                    compare les prix produit par produit et prépare la mise à
                    jour. L&apos;équipe n&apos;a plus qu&apos;à approuver — en un
                    écran, pas en trois jours.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>03</span>
                </div>
                <h3 className="mandat-title">
                  <span>Branché sur la caisse existante</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Le tout se connecte au système de caisse déjà en place, sans
                    le remplacer et sans interrompre les opérations. La bascule
                    s&apos;est faite sans que le commerce s&apos;arrête une seule
                    journée.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* Le point large */}
          <section className="note">
            <div className="section">
              <div className="note-grid">
                <div>
                  <div className="note-eyebrow">
                    Ce n&apos;est pas une histoire d&apos;épicerie
                  </div>
                  <p className="note-quote">
                    Chaque PME a une tâche à 56 000 $. Presque personne ne
                    l&apos;a chiffrée.
                  </p>
                  <p className="note-body">
                    Une corvée hebdomadaire que tout le monde accepte parce
                    qu&apos;« on a toujours fait comme ça ». Elle ne paraît
                    nulle part dans les états financiers, mais elle est bien là,
                    chaque semaine, sur la paie de quelqu&apos;un. La retrouver
                    et la chiffrer, c&apos;est déjà la moitié du travail.
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
                          <span>La double saisie</span>
                        </h3>
                        <p className="principle-text">
                          <span>
                            Des données recopiées d&apos;un logiciel à
                            l&apos;autre parce que les deux ne se parlent pas.
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
                          <span>Les rapports du lundi</span>
                        </h3>
                        <p className="principle-text">
                          <span>
                            Un fichier réassemblé à la main chaque semaine, à
                            partir de trois sources différentes.
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
                          <span>Le suivi éparpillé</span>
                        </h3>
                        <p className="principle-text">
                          <span>
                            Des clients, des soumissions ou des stocks gérés dans
                            des Excel qui vivent leur vie.
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
                <div className="contact-eyebrow">Faisons le calcul</div>
                <h2 className="contact-title">
                  Quelle est{" "}
                  <span className="italic">votre tâche à 56 000 $ ?</span>
                </h2>
                <p className="contact-lead">
                  En vingt minutes, on cible le processus manuel qui vous coûte
                  le plus cher et on met un chiffre dessus. Vous repartez avec ce
                  montant en main — que l&apos;on travaille ensemble ou non.
                </p>
              </div>
              <div className="cab-paper contact-card">
                <div className="contact-list">
                  <a href="/#contact" className="btn-block">
                    Trouver ma tâche à 56 000 $ <span>→</span>
                  </a>
                  <TrackedLink
                    event="clic_audit"
                    href="https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min"
                    target="_blank"
                    rel="noopener"
                    className="scp5 contact-link u-mt-sm"
                  >
                    <span>
                      <span className="kv-label-block">Ou directement</span>
                      <span className="icon-16">Réserver 20 min (Calendly)</span>
                    </span>
                    <span className="icon-18">→</span>
                  </TrackedLink>
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
