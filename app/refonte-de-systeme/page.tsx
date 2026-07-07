import type { Metadata } from "next";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { TrackedLink } from "@/components/TrackedLink";

export const metadata: Metadata = {
  title: "Refonte de système informatique pour PME au Québec | Gabriel Nadon",
  description:
    "Votre logiciel maison, votre vieux système ou vos fichiers Excel vous ralentissent ? Refonte par étapes, sans perte de données ni interruption d'opérations. Diagnostic gratuit de 20 minutes, au Québec.",
  alternates: { canonical: "https://gabrielnadon.com/refonte-de-systeme/" },
  openGraph: {
    type: "website",
    siteName: "Gabriel Nadon",
    title: "Refonte de système : moderniser sans arrêter vos opérations",
    description:
      "Refonte par étapes de logiciels maison, vieux systèmes et processus Excel : données migrées, zéro interruption. PME du Québec.",
    url: "https://gabrielnadon.com/refonte-de-systeme/",
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
    title: "Refonte de système : moderniser sans arrêter vos opérations",
    description:
      "Refonte par étapes de logiciels maison, vieux systèmes et processus Excel : données migrées, zéro interruption.",
    images: ["https://gabrielnadon.com/og-image.png"],
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Refonte de système informatique",
      serviceType: "Refonte et modernisation de systèmes",
      description:
        "Refonte par étapes de logiciels maison, systèmes vieillissants et processus Excel pour PME : cartographie, migration des données, bascule sans interruption d'opérations.",
      provider: {
        "@type": "Person",
        name: "Gabriel Nadon",
        url: "https://gabrielnadon.com/",
      },
      areaServed: "Québec",
      url: "https://gabrielnadon.com/refonte-de-systeme/",
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
          name: "Refonte de système",
          item: "https://gabrielnadon.com/refonte-de-systeme/",
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

export default function RefontePage() {
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
          <SiteHeader
            brandHref="/"
            navItems={NAV}
            ctaHref="/?sujet=refonte#contact"
          />

          {/* Hero : la douleur d'abord */}
          <section className="case-hero">
            <div className="case-hero-grid">
              <div>
                <div className="eyebrow" data-rise="50">
                  Refonte de système · PME du Québec
                </div>
                <h1
                  className="case-title u-mt-lg"
                  data-rise="120"
                >
                  Votre entreprise roule sur un système que{" "}
                  <span className="italic">plus personne n’ose toucher.</span>
                </h1>
                <p className="case-lead" data-rise="200">
                  Il a été programmé il y a quinze ans par quelqu’un qui est
                  parti depuis longtemps. Chaque bogue devient une prière. Chaque
                  nouveau besoin finit dans un Excel de plus, une double saisie
                  de plus. Vous avancez sur des œufs — et au fond, vous attendez
                  le jour où ça va lâcher. On remplace ce système morceau par
                  morceau, sans big bang, sans perdre une seule donnée, sans
                  arrêter vos opérations une seule journée.
                </p>
              </div>
              <div data-rise="280">
                <div className="money-box">
                  <div className="money-kicker">Le coût de ne rien faire</div>
                  <div className="u-mt-md">
                    <div className="risk-item">
                      <span className="rmark">→</span>
                      <span>
                        Un seul ordinateur qui meurt, et des années de données
                        parties avec lui.
                      </span>
                    </div>
                    <div className="risk-item">
                      <span className="rmark">→</span>
                      <span>
                        La personne qui « comprend le système » qui tombe
                        malade, ou prend sa retraite.
                      </span>
                    </div>
                    <div className="risk-item">
                      <span className="rmark">→</span>
                      <span>
                        Des contrats refusés parce que le système ne suit plus la
                        croissance.
                      </span>
                    </div>
                    <div className="risk-item">
                      <span className="rmark">→</span>
                      <span>
                        Des heures de double saisie, payées chaque semaine, sans
                        que ça paraisse nulle part.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Les signes qui font mal */}
          <section
            className="section u-pb-64"
          >
            <div className="note-grid">
              <div>
                <div className="eyebrow u-mb-lg">
                  Vous vous reconnaissez ?
                </div>
                <h2 className="h2-left u-measure-title">
                  Ce ne sont pas des inconvénients. Ce sont des risques.
                </h2>
                <p className="case-prose u-mt-lg">
                  Aucun n’est assez grave pour tout arrêter aujourd’hui. C’est
                  exactement le piège : on repousse, on contourne, on s’habitue —
                  jusqu’au jour où l’un d’eux se transforme en crise.
                </p>
              </div>
              <ul className="pain-list">
                <li className="pain-item">
                  <span className="pain-mark"></span>
                  <p className="pain-text">
                    Un bogue apparaît, et toute l’équipe retient son souffle en
                    espérant qu’il se règle tout seul.
                  </p>
                </li>
                <li className="pain-item">
                  <span className="pain-mark"></span>
                  <p className="pain-text">
                    Une seule personne sait comment le système fonctionne
                    vraiment. Quand elle est absente, tout ralentit.
                  </p>
                </li>
                <li className="pain-item">
                  <span className="pain-mark"></span>
                  <p className="pain-text">
                    Vous payez encore la licence d’un logiciel que le fournisseur
                    n’entretient plus depuis des années.
                  </p>
                </li>
                <li className="pain-item">
                  <span className="pain-mark"></span>
                  <p className="pain-text">
                    La « vraie » base de données, c’est trois fichiers Excel que
                    quelqu’un met à jour à la main, chaque semaine.
                  </p>
                </li>
                <li className="pain-item">
                  <span className="pain-mark"></span>
                  <p className="pain-text">
                    Vous avez déjà dit non à un projet parce que « le système ne
                    peut pas faire ça ».
                  </p>
                </li>
              </ul>
            </div>
          </section>

          {/* Pourquoi les refontes échouent */}
          <section className="note">
            <div className="section">
              <div className="note-grid">
                <div>
                  <div className="note-eyebrow">
                    Pourquoi tant de refontes échouent
                  </div>
                  <p className="note-quote">
                    Le « big bang » — tout remplacer d’un coup — est la première
                    cause d’échec.
                  </p>
                  <p className="note-body">
                    Dix-huit mois de développement, une bascule un vendredi soir,
                    et le lundi matin rien ne fonctionne comme avant. C’est le
                    scénario qui fait peur, avec raison. Notre démarche prend le
                    contre-pied : l’ancien système reste en service, et on le
                    remplace tranche par tranche, en commençant par ce qui vous
                    fait le plus mal.
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
                          <span>Jamais de big bang</span>
                        </h3>
                        <p className="principle-text">
                          <span>
                            Chaque tranche livrée est utilisée avant d’attaquer
                            la suivante. Vous voyez la valeur en semaines, pas en
                            années.
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
                          <span>Vos données d’abord</span>
                        </h3>
                        <p className="principle-text">
                          <span>
                            Migration testée et validée avec vos chiffres réels
                            avant toute bascule. Rien ne se perd en chemin.
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
                          <span>Réversible à chaque étape</span>
                        </h3>
                        <p className="principle-text">
                          <span>
                            Tant que la tranche n’est pas éprouvée, l’ancien
                            chemin reste disponible. On avance sans brûler les
                            ponts.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* La démarche */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">La démarche, en cinq étapes</span>
              <span className="rule"></span>
            </div>
            <div className="case-steps">
              <div className="case-step">
                <div className="mandat-num">
                  <span>01</span>
                </div>
                <h3 className="mandat-title">
                  <span>Cartographie de l’existant</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    On documente ce que fait vraiment votre système — y compris
                    les contournements Excel et les règles que seule une personne
                    connaît.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>02</span>
                </div>
                <h3 className="mandat-title">
                  <span>Priorisation par la douleur</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    On découpe la refonte en tranches et on commence par celle
                    qui vous coûte le plus d’heures ou de risques.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>03</span>
                </div>
                <h3 className="mandat-title">
                  <span>Refonte de la première tranche</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Le nouveau module est construit et branché à l’ancien
                    système, qui reste en service. Votre équipe valide sur du
                    réel.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>04</span>
                </div>
                <h3 className="mandat-title">
                  <span>Migration des données</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Vos historiques sont transférés, testés et rapprochés — les
                    totaux doivent balancer avant d’aller plus loin.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>05</span>
                </div>
                <h3 className="mandat-title">
                  <span>Bascule et tranche suivante</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Quand la tranche est éprouvée, l’ancien morceau est retiré.
                    On enchaîne sur la suivante, au rythme de vos opérations.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* Preuve */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">Sur le terrain</span>
              <div className="u-measure-prose">
                <span className="serif-muted">
                  Une épicerie du Québec a branché son vieux système de caisse à
                  un moteur moderne de synchronisation des prix — sans le
                  remplacer, sans interruption.{" "}
                </span>
                <a
                  href="/cas/synchronisation-prix-fournisseurs/"
                  className="link-serif"
                >
                  Lire le cas →
                </a>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="section">
            <div className="contact-grid">
              <div>
                <div className="contact-eyebrow">Premier pas</div>
                <h2 className="contact-title">
                  Vingt minutes pour cadrer{" "}
                  <span className="italic">votre refonte.</span>
                </h2>
                <p className="contact-lead">
                  Décrivez-moi votre système actuel et où il coince : vous
                  repartez avec un premier découpage en tranches et une idée
                  honnête de l’effort — que l’on travaille ensemble ou non.
                </p>
              </div>
              <div className="cab-paper contact-card">
                <div className="contact-list">
                  <a
                    href="/?sujet=refonte#contact"
                    className="btn-block"
                  >
                    Discuter de votre refonte <span>→</span>
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
