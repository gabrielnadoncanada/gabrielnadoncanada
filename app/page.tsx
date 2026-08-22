import type { Metadata } from "next";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { HomeFooter } from "@/components/HomeFooter";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title:
    "Gabriel Nadon — Systèmes opérationnels & automatisation pour PME (Québec)",
  description:
    "J'aide les PME québécoises aux opérations complexes à remplacer Excel, les courriels et les logiciels mal adaptés par un système opérationnel qui centralise l'information et fait une partie du travail.",
  alternates: { canonical: "https://gabrielnadon.com/" },
  openGraph: {
    type: "website",
    siteName: "Gabriel Nadon",
    title: "Gabriel Nadon — Systèmes opérationnels pour PME",
    description:
      "Remplacer les suivis manuels, Excel et courriels par un système qui centralise l'information et fait une partie du travail. PME du Québec.",
    url: "https://gabrielnadon.com/",
    locale: "fr_CA",
    images: [
      {
        url: "https://gabrielnadon.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gabriel Nadon — Systèmes opérationnels pour PME",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Nadon — Systèmes opérationnels pour PME",
    description:
      "Remplacer les suivis manuels, Excel et courriels par un système qui fait une partie du travail. PME du Québec.",
    images: ["https://gabrielnadon.com/og-image.png"],
  },
};

const SITE = "https://gabrielnadon.com";

const SAME_AS = [
  "https://www.linkedin.com/in/gabrielnadoncanada/",
  "https://www.facebook.com/gabriel.nadon.2025",
];

const OFFRES = [
  "Diagnostic opérationnel",
  "Système opérationnel sur mesure",
  "Automatisation de processus",
  "Refonte de systèmes existants",
  "Site web professionnel",
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: "Gabriel Nadon — Systèmes opérationnels pour PME",
      inLanguage: "fr-CA",
      publisher: { "@id": `${SITE}/#gabriel` },
    },
    {
      "@type": "Person",
      "@id": `${SITE}/#gabriel`,
      name: "Gabriel Nadon",
      url: `${SITE}/`,
      image: `${SITE}/portrait.png`,
      jobTitle: "Conseiller en systèmes opérationnels",
      email: "bonjour@gabrielnadon.com",
      description:
        "Gabriel Nadon aide les PME québécoises aux opérations complexes à remplacer les suivis manuels, Excel, courriels et logiciels mal adaptés par des systèmes opérationnels qui centralisent l'information et automatisent une partie du travail.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Montréal",
        addressRegion: "QC",
        addressCountry: "CA",
      },
      areaServed: "Québec",
      knowsAbout: [
        "Systèmes opérationnels",
        "Automatisation des opérations",
        "Intégration de systèmes",
        "Logiciels sur mesure pour PME",
        "Automatisation de processus",
        "Intelligence artificielle",
      ],
      sameAs: SAME_AS,
      worksFor: { "@id": `${SITE}/#business` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#business`,
      name: "Gabriel Nadon — Systèmes opérationnels",
      url: `${SITE}/`,
      image: `${SITE}/og-image.png`,
      logo: `${SITE}/portrait.png`,
      description:
        "Systèmes opérationnels pour les PME du Québec aux opérations complexes : diagnostic opérationnel, centralisation des workflows, automatisation intelligente, intégration aux systèmes existants et refonte de systèmes vieillissants.",
      founder: { "@id": `${SITE}/#gabriel` },
      email: "bonjour@gabrielnadon.com",
      priceRange: "$$",
      areaServed: { "@type": "AdministrativeArea", name: "Québec" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Montréal",
        addressRegion: "QC",
        addressCountry: "CA",
      },
      availableLanguage: "fr-CA",
      sameAs: SAME_AS,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Mandats",
        itemListElement: OFFRES.map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name, areaServed: "Québec" },
        })),
      },
    },
  ],
};

const NAV = [
  { href: "#probleme", label: "La situation" },
  { href: "#methode", label: "Méthode" },
  { href: "#exemples", label: "Exemples" },
  { href: "#cas", label: "Cas concret" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
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
          <SiteHeader brandHref="#" navItems={NAV} ctaHref="#contact" />

          {/* 1 · HERO — le problème de fragmentation + la promesse opérationnelle */}
          <section className="hero">
            <div className="cab-hide-sm hero-ref">
              <span className="dot-gold"></span>RÉF. 2026
            </div>
            <div className="hero-grid">
              <div>
                <div className="hero-eyebrow" data-rise="50">
                  Systèmes opérationnels sur mesure · PME québécoises
                </div>
                <h1 className="hero-title" data-rise="120">
                  Vos opérations ne devraient pas vivre dans{" "}
                  <span className="italic">12 logiciels.</span>
                </h1>
                <p className="hero-lead" data-rise="200">
                  Je transforme les suivis manuels, fichiers Excel, courriels
                  et logiciels mal adaptés en un système opérationnel simple :
                  l&apos;information au même endroit, une partie du travail qui
                  se fait seule.
                </p>
                <div className="hero-cta" data-rise="280">
                  <a href="#contact" className="btn">
                    <span className="cta-full">
                      Me montrer comment vous travaillez
                    </span>
                    <span className="cta-short">Analyser mes opérations</span>{" "}
                    <span>→</span>
                  </a>
                  <a href="#cas" className="btn-link">
                    Voir un cas concret
                  </a>
                </div>
                <div className="hero-tags" data-rise="360">
                  <div className="inline-dot">
                    <span className="dot-gold-sm"></span>
                    <span className="hero-tag-txt">
                      <span>Basé au Québec</span>
                    </span>
                  </div>
                  <div className="inline-dot">
                    <span className="dot-gold-sm"></span>
                    <span className="hero-tag-txt">
                      <span>PME à opérations complexes</span>
                    </span>
                  </div>
                  <div className="inline-dot">
                    <span className="dot-gold-sm"></span>
                    <span className="hero-tag-txt">
                      <span>Réponse sous 24 h</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="cab-hero-portrait portrait" data-rise="320">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="portrait-img"
                  src="/portrait.webp"
                  width={982}
                  height={941}
                  fetchPriority="high"
                  alt="Portrait de Gabriel Nadon, conseiller"
                />
                <div className="portrait-fade" aria-hidden="true"></div>
                <div className="portrait-cap">
                  <span className="cap-line"></span>
                  <span className="cap-txt">Gabriel Nadon · Conseiller</span>
                </div>
              </div>
            </div>
          </section>

          {/* 2 · PROBLÈME — faire reconnaître la situation */}
          <section className="section" id="probleme">
            <div className="note-grid">
              <div>
                <div className="eyebrow u-mb-lg">§ 01 · La situation</div>
                <h2 className="h2-left">
                  Votre information est partout. Sauf au même endroit.
                </h2>
              </div>
              <div>
                <ul className="pain-list">
                  <li className="pain-item">
                    <span className="pain-mark" aria-hidden="true"></span>
                    <p className="pain-text">
                      Une partie de l&apos;information vit dans Excel. Une
                      autre, dans les courriels.
                    </p>
                  </li>
                  <li className="pain-item">
                    <span className="pain-mark" aria-hidden="true"></span>
                    <p className="pain-text">
                      Les employés s&apos;écrivent par texto pour débloquer le
                      travail.
                    </p>
                  </li>
                  <li className="pain-item">
                    <span className="pain-mark" aria-hidden="true"></span>
                    <p className="pain-text">
                      La comptabilité roule dans un logiciel, les projets dans
                      un autre — et les deux ne se parlent pas.
                    </p>
                  </li>
                  <li className="pain-item">
                    <span className="pain-mark" aria-hidden="true"></span>
                    <p className="pain-text">
                      Et quelqu&apos;un doit constamment recoller les morceaux :
                      chercher, retranscrire, relancer, vérifier, consolider.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">Ce que ça coûte</span>
              <div className="sectors-list">
                <span className="serif-muted">
                  <span>Doubles saisies</span>
                </span>
                <span className="serif-muted">
                  <span>Information introuvable</span>
                </span>
                <span className="serif-muted">
                  <span>Suivis oubliés</span>
                </span>
                <span className="serif-muted">
                  <span>Erreurs</span>
                </span>
                <span className="serif-muted">
                  <span>Décisions tardives</span>
                </span>
                <span className="serif-muted">
                  <span>Argent laissé sur la table</span>
                </span>
              </div>
            </div>
          </section>

          {/* 3 · COMMENT JE TRAVAILLE — trois étapes, pas une liste de services */}
          <section className="section-method" id="methode">
            <div className="method-head">
              <span className="eyebrow">§ 02 · Comment je travaille</span>
              <span className="rule"></span>
            </div>
            <div className="cab-method method-grid method-grid--three">
              <div className="cab-step-card step">
                <div className="cab-step-gap sec-head">
                  <span className="step-code">
                    <span>01</span>
                  </span>
                  <span className="step-week">
                    <span>semaine 1</span>
                  </span>
                </div>
                <h3 className="step-title">
                  <span>Diagnostic opérationnel</span>
                </h3>
                <p className="step-text">
                  <span>
                    On regarde comment votre entreprise fonctionne
                    réellement — et on trouve où le temps, l&apos;information
                    ou l&apos;argent se perd.
                  </span>
                </p>
              </div>
              <div className="cab-step-card step">
                <div className="cab-step-gap sec-head">
                  <span className="step-code">
                    <span>02</span>
                  </span>
                  <span className="step-week">
                    <span>ensuite</span>
                  </span>
                </div>
                <h3 className="step-title">
                  <span>Système opérationnel</span>
                </h3>
                <p className="step-text">
                  <span>
                    On centralise le workflow le plus coûteux autour de votre
                    façon de travailler. Pas l&apos;inverse.
                  </span>
                </p>
              </div>
              <div className="cab-step-card step">
                <div className="cab-step-gap sec-head">
                  <span className="step-code">
                    <span>03</span>
                  </span>
                  <span className="step-week">
                    <span>par la suite</span>
                  </span>
                </div>
                <h3 className="step-title">
                  <span>Automatisation intelligente</span>
                </h3>
                <p className="step-text">
                  <span>
                    Une fois les données et le processus fiables, le système
                    commence à faire une partie du travail.
                  </span>
                </p>
              </div>
            </div>
            <p className="case-lead u-mt-lg" style={{ maxWidth: "56ch" }}>
              Quand l&apos;intelligence artificielle accélère une étape, elle
              travaille sur des données structurées, avec des garde-fous et
              une validation humaine. C&apos;est un mécanisme — pas le
              produit.
            </p>
          </section>

          {/* 4 · EXEMPLES — ce que le système peut faire, concrètement */}
          <section className="section-tight" id="exemples">
            <div className="mandats-head">
              <h2 className="h2-left">
                Un logiciel vous donne des écrans. Un système fait une partie
                du travail.
              </h2>
              <span className="eyebrow">§ 03 · Ce que le système peut faire</span>
            </div>
            <ul className="pain-list pain-list--cols">
              <li className="pain-item">
                <span className="pain-mark" aria-hidden="true"></span>
                <p className="pain-text">
                  Réunir l&apos;information dispersée dans vos systèmes
                </p>
              </li>
              <li className="pain-item">
                <span className="pain-mark" aria-hidden="true"></span>
                <p className="pain-text">
                  Préparer les documents à partir des données existantes
                </p>
              </li>
              <li className="pain-item">
                <span className="pain-mark" aria-hidden="true"></span>
                <p className="pain-text">
                  Détecter un suivi ou une action qui manque
                </p>
              </li>
              <li className="pain-item">
                <span className="pain-mark" aria-hidden="true"></span>
                <p className="pain-text">
                  Relancer la bonne personne au bon moment
                </p>
              </li>
              <li className="pain-item">
                <span className="pain-mark" aria-hidden="true"></span>
                <p className="pain-text">
                  Comparer prévu et réel, signaler les écarts
                </p>
              </li>
              <li className="pain-item">
                <span className="pain-mark" aria-hidden="true"></span>
                <p className="pain-text">
                  Chercher dans les documents d&apos;un projet
                </p>
              </li>
              <li className="pain-item">
                <span className="pain-mark" aria-hidden="true"></span>
                <p className="pain-text">
                  Transformer courriels, PDF et messages en données structurées
                </p>
              </li>
              <li className="pain-item">
                <span className="pain-mark" aria-hidden="true"></span>
                <p className="pain-text">
                  Préparer la prochaine action, pour validation par un humain
                </p>
              </li>
            </ul>
            <p className="case-lead u-mt-lg">
              Le système prépare, signale et relance. Vos gens gardent le
              contrôle et décident.
            </p>
          </section>

          {/* 5 · INTÉGRATIONS — on ne demande pas de tout jeter */}
          <section className="bb">
            <div
              className="sectors"
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "14px",
              }}
            >
              <span className="sectors-label">
                Vos outils restent en place
              </span>
              <p className="case-lead" style={{ margin: 0 }}>
                Le système remplace ce qui ne fonctionne plus et se connecte à
                ce qui fonctionne déjà — selon les accès disponibles (API,
                exports, courriels).
              </p>
              <div className="sectors-list">
                <span className="serif-muted">
                  <span>ERP</span>
                </span>
                <span className="serif-muted">
                  <span>QuickBooks</span>
                </span>
                <span className="serif-muted">
                  <span>Procore</span>
                </span>
                <span className="serif-muted">
                  <span>Outlook</span>
                </span>
                <span className="serif-muted">
                  <span>Excel</span>
                </span>
                <span className="serif-muted">
                  <span>fichiers et exports</span>
                </span>
                <span className="serif-muted">
                  <span>API</span>
                </span>
              </div>
            </div>
          </section>

          {/* 6 · CAS CLIENT — problème → système → résultat */}
          <section className="section-tight" id="cas">
            <div className="mandats-head">
              <h2 className="h2-left">
                Près de 56 000 $ par année, récupérés sur une seule tâche
                manuelle.
              </h2>
              <span className="eyebrow">§ 04 · Cas concret</span>
            </div>
            <div className="case-steps">
              <div className="case-step">
                <div className="pt-2">
                  <div className="mandat-num">
                    <span>01</span>
                  </div>
                  <div className="mandat-code">
                    <span>PROBLÈME</span>
                  </div>
                </div>
                <h3 className="mandat-title">
                  <span>Recopier des milliers de prix, chaque semaine</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Une épicerie indépendante retapait à la main les prix de
                    ses fournisseurs dans sa caisse. L&apos;équivalent
                    d&apos;un poste à temps partiel — sans compter les erreurs
                    de saisie, ni la marge perdue en commandant sans comparer.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="pt-2">
                  <div className="mandat-num">
                    <span>02</span>
                  </div>
                  <div className="mandat-code">
                    <span>SYSTÈME</span>
                  </div>
                </div>
                <h3 className="mandat-title">
                  <span>La machine recopie, l&apos;équipe approuve</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Le système importe les listes de tous les fournisseurs,
                    compare les prix produit par produit et prépare la mise à
                    jour — branché sur la caisse déjà en place, sans la
                    remplacer et sans arrêter les opérations.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="pt-2">
                  <div className="mandat-num">
                    <span>03</span>
                  </div>
                  <div className="mandat-code">
                    <span>RÉSULTAT</span>
                  </div>
                </div>
                <h3 className="mandat-title">
                  <span>Le temps repris, la marge en prime</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    La saisie manuelle est éliminée et l&apos;entreprise achète
                    désormais au meilleur prix, à chaque commande. Les chiffres
                    complets sont dans le cas détaillé.
                  </span>
                </p>
              </div>
            </div>
            <p className="u-mt-lg">
              <a
                href="/cas/synchronisation-prix-fournisseurs/"
                className="link-serif"
              >
                Lire le cas complet →
              </a>
            </p>
          </section>

          <section className="band">
            <div className="wrap">
              <div className="cab-proof stats-grid">
                <div className="stat">
                  <div className="tick"></div>
                  <div className="stat-num">
                    <span className="tnum">12</span>
                    <span className="stat-unit">
                      <span>h+</span>
                    </span>
                  </div>
                  <div className="stat-label">
                    <span>récupérées chaque semaine, en moyenne</span>
                  </div>
                </div>
                <div className="stat">
                  <div className="tick"></div>
                  <div className="stat-num">
                    <span className="tnum">20</span>
                    <span className="stat-unit">
                      <span>+</span>
                    </span>
                  </div>
                  <div className="stat-label">
                    <span>PME accompagnées au Québec</span>
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
                    <span>comparés à chaque cycle, sans effort humain</span>
                  </div>
                </div>
                <div className="stat">
                  <div className="tick"></div>
                  <div className="stat-num">
                    <span className="tnum">30</span>
                    <span className="stat-unit">
                      <span>min</span>
                    </span>
                  </div>
                  <div className="stat-label">
                    <span>pour une première analyse de vos opérations</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 7 · LA NOTE DU CONSEILLER — le positioning, signé */}
          <section className="note" id="approche">
            <div className="section">
              <div className="note-grid">
                <div>
                  <div className="note-eyebrow">§ 05 · La note du conseiller</div>
                  <p className="note-quote">
                    Je ne vends pas de la technologie. Je règle des problèmes
                    d’affaires.
                  </p>
                  <p className="note-body">
                    <span className="dropcap">C</span>haque mandat commence par
                    vos opérations réelles — où le temps se perd, où
                    l&apos;information circule mal, où l&apos;argent sort sans
                    que personne ne le voie — et se termine par un système qui
                    fait une partie du travail. Vous parlez directement à
                    celui qui analyse et construit&nbsp;: pas
                    d&apos;intermédiaire, pas de jargon, pas de surprise.
                  </p>
                  <div className="mt-36">
                    <div className="signature">Gabriel Nadon</div>
                    <div className="sig-line"></div>
                    <div className="sig-role">
                      Conseiller · Systèmes opérationnels
                    </div>
                  </div>
                </div>
                <div className="principles">
                  <div className="principle">
                    <div className="principle-head">
                      <span className="principle-num">
                        <span>I.</span>
                      </span>
                      <div>
                        <h3 className="principle-title">
                          <span>Comprendre avant de construire</span>
                        </h3>
                        <p className="principle-text">
                          <span>
                            On cartographie vos opérations et vos outils réels
                            avant de proposer quoi que ce soit.
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
                          <span>Un seul interlocuteur</span>
                        </h3>
                        <p className="principle-text">
                          <span>
                            Vous parlez à celui qui analyse vos opérations et
                            qui construit le système.
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
                          <span>Des livraisons visibles</span>
                        </h3>
                        <p className="principle-text">
                          <span>
                            Le système avance par étapes&nbsp;: vous voyez
                            chaque morceau fonctionner avant d&apos;aller plus
                            loin.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 8 · POUR QUI */}
          <section className="bb">
            <div
              className="sectors"
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "14px",
              }}
            >
              <span className="sectors-label">Pour qui</span>
              <p className="case-lead" style={{ margin: 0 }}>
                Pour les entreprises où les opérations sont devenues trop
                complexes pour Excel, les courriels et les outils séparés.
              </p>
              <div className="sectors-list">
                <span className="serif-muted">
                  <span>Construction</span>
                </span>
                <span className="serif-muted">
                  <span>Industriel</span>
                </span>
                <span className="serif-muted">
                  <span>Manufacturier</span>
                </span>
                <span className="serif-muted">
                  <span>Distribution et logistique</span>
                </span>
                <span className="serif-muted">
                  <span>Opérations terrain</span>
                </span>
              </div>
            </div>
          </section>

          {/* Outils et guides gratuits — maillage visible vers la grappe de
              contenu (le footer seul ne suffit pas pour le crawl et le clic). */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">Outils &amp; guides gratuits</span>
              <div className="sectors-list">
                <a href="/calculateur/" className="serif-muted link-serif">
                  <span>Calculateur du travail manuel</span>
                </a>
                <a href="/diagnostic-ia/" className="serif-muted link-serif">
                  <span>Test « prête pour l&apos;IA ? »</span>
                </a>
                <a
                  href="/guides/automatisation-pme-quebec/"
                  className="serif-muted link-serif"
                >
                  <span>Guide : automatiser sa PME</span>
                </a>
                <a
                  href="/guides/comparatif-logiciels-epicerie-quebec/"
                  className="serif-muted link-serif"
                >
                  <span>Comparatif logiciels d&apos;épicerie</span>
                </a>
                <a href="/barometre/" className="serif-muted link-serif">
                  <span>Baromètre PME 2026</span>
                </a>
              </div>
            </div>
          </section>

          {/* 9 · CTA FINAL */}
          <section className="section" id="contact">
            <div className="contact-grid">
              <div>
                <div className="contact-eyebrow">§ 06 · Premier rendez-vous</div>
                <h2 className="contact-title">
                  Montrez-moi comment vous{" "}
                  <span className="italic">travaillez.</span>
                </h2>
                <p className="contact-lead">
                  En 30 minutes, on regarde votre processus actuel et on
                  identifie où un système pourrait réellement enlever du
                  travail ou récupérer de la valeur — que l&apos;on travaille
                  ensemble ou non.
                </p>
              </div>
              <div className="cab-paper contact-card">
                <ContactForm />
              </div>
            </div>
          </section>

          <HomeFooter />
        </div>
      </div>
    </div>
  );
}
