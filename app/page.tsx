import type { Metadata } from "next";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { HomeFooter } from "@/components/HomeFooter";
import { ContactForm } from "@/components/ContactForm";
import "./home.css";

export const metadata: Metadata = {
  title:
    "Gabriel Nadon — IA et automatisation pour PME au Québec",
  description:
    "Consultant IA et automatisation à Montréal : je remplace Excel, la double saisie et les outils dispersés des PME du Québec par un système qui travaille.",
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
  { name: "Consultant IA pour PME", url: `${SITE}/consultant-ia/` },
  { name: "Agents IA pour entreprise", url: `${SITE}/agents-ia/` },
  { name: "Traitement automatique de factures et documents", url: `${SITE}/traitement-documents-ia/` },
  { name: "Automatisation des processus d’affaires", url: `${SITE}/automatisation-processus/` },
  { name: "Logiciel sur mesure pour PME", url: `${SITE}/logiciel-sur-mesure/` },
  { name: "Refonte de systèmes existants", url: `${SITE}/refonte-de-systeme/` },
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
      jobTitle: "Consultant en IA et en systèmes opérationnels",
      email: "bonjour@gabrielnadon.com",
      description:
        "Gabriel Nadon, consultant IA et automatisation à Montréal, aide les PME québécoises aux opérations complexes à remplacer les suivis manuels, Excel, courriels et logiciels mal adaptés par des systèmes qui centralisent l'information et automatisent une partie du travail.",
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
        "Agents IA",
        "Traitement automatique de documents",
      ],
      knowsLanguage: ["fr-CA", "en-CA"],
      sameAs: SAME_AS,
      worksFor: { "@id": `${SITE}/#business` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#business`,
      name: "Gabriel Nadon — IA, automatisation et systèmes pour PME",
      url: `${SITE}/`,
      image: `${SITE}/og-image.png`,
      logo: `${SITE}/portrait.png`,
      description:
        "Consultation et implantation en IA pour les PME du Québec : agents IA, traitement automatique de factures et documents, automatisation des processus, logiciels sur mesure et refonte de systèmes vieillissants.",
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
      availableLanguage: ["fr-CA", "en-CA"],
      sameAs: SAME_AS,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Mandats",
        itemListElement: OFFRES.map(({ name, url }) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name, url, areaServed: "Québec" },
        })),
      },
    },
  ],
};

const OUTILS = [
  { href: "/calculateur/", kind: "Calculateur", title: "Combien vous coûte le travail manuel" },
  { href: "/diagnostic-ia/", kind: "Test en 10 questions", title: "Votre PME est-elle prête pour l’IA ?" },
  { href: "/guides/automatisation-pme-quebec/", kind: "Guide", title: "Automatiser sa PME au Québec" },
  { href: "/guides/comparatif-logiciels-epicerie-quebec/", kind: "Comparatif", title: "Logiciels d’épicerie au Québec" },
  { href: "/barometre/", kind: "Baromètre", title: "Baromètre PME 2026" },
];

const NAV = [
  { href: "#probleme", label: "La situation" },
  { href: "#methode", label: "Méthode" },
  { href: "#services", label: "Services" },
  { href: "#cas", label: "Cas concret" },
  { href: "#contact", label: "Contact" },
];

// Visuel du hero : une matinée type une fois le système en place. C'est une
// illustration (pas un client réel) — aucun nom de client ni de fournisseur.
const SOURCES = ["Excel", "Outlook", "QuickBooks", "Textos", "PDF"];
const QUEUE = [
  {
    title: "Listes de prix de 3 fournisseurs importées",
    meta: "1 284 prix comparés, 37 écarts signalés",
    done: true,
  },
  {
    title: "Facture n° 4821 lue et saisie",
    meta: "Rapprochée du bon de commande",
    done: true,
  },
  {
    title: "Livraison en retard détectée",
    meta: "Fournisseur relancé, chantier avisé",
    done: true,
  },
  {
    title: "Soumission préparée à partir du devis type",
    meta: "Attend votre accord avant l’envoi",
    done: false,
  },
];

const PAINS = [
  "Une partie de l’information vit dans Excel. Une autre, dans les courriels.",
  "Les employés s’écrivent par texto pour débloquer le travail.",
  "La comptabilité roule dans un logiciel, les projets dans un autre — et les deux ne se parlent pas.",
  "Quelqu’un doit constamment recoller les morceaux : chercher, retranscrire, relancer, vérifier.",
];

const STEPS = [
  {
    when: "Semaine 1",
    title: "Diagnostic opérationnel",
    text: "On regarde comment votre entreprise fonctionne réellement — et on trouve où le temps, l’information ou l’argent se perd.",
  },
  {
    when: "Ensuite",
    title: "Système opérationnel",
    text: "On centralise le processus le plus coûteux autour de votre façon de travailler. Pas l’inverse.",
  },
  {
    when: "Par la suite",
    title: "Automatisation intelligente",
    text: "Une fois les données et le processus fiables, le système commence à faire une partie du travail.",
  },
];

const CAPACITES = [
  { verb: "Réunir", rest: "l’information dispersée dans vos systèmes" },
  { verb: "Préparer", rest: "les documents à partir des données existantes" },
  { verb: "Détecter", rest: "un suivi ou une action qui manque" },
  { verb: "Relancer", rest: "la bonne personne au bon moment" },
  { verb: "Comparer", rest: "le prévu et le réel, et signaler les écarts" },
  { verb: "Chercher", rest: "dans tous les documents d’un projet" },
  { verb: "Transformer", rest: "courriels, PDF et messages en données utilisables" },
  { verb: "Proposer", rest: "la prochaine action, validée par un humain" },
];

const SERVICES = [
  {
    href: "/consultant-ia/",
    kind: "Pour démarrer",
    title: "Consultant IA pour PME",
    text: "Trouver les deux ou trois tâches où l’IA rapporte vraiment chez vous, puis les implanter.",
  },
  {
    href: "/traitement-documents-ia/",
    kind: "Documents",
    title: "Factures et documents traités par l’IA",
    text: "Factures, bons de commande, listes de prix : lus, vérifiés et saisis sans qu’on les retape.",
  },
  {
    href: "/agents-ia/",
    kind: "Agents",
    title: "Agents IA",
    text: "Un assistant qui traite les demandes, prépare soumissions et réponses, et demande avant d’agir.",
  },
  {
    href: "/automatisation-processus/",
    kind: "Processus",
    title: "Automatisation des processus",
    text: "La double saisie, les rapports et les relances qui se refont chaque semaine, confiés à la machine.",
  },
  {
    href: "/logiciel-sur-mesure/",
    kind: "Systèmes",
    title: "Logiciel sur mesure",
    text: "Quand Excel est devenu votre logiciel de gestion.",
  },
];

const OUTILS_EN_PLACE = ["ERP", "QuickBooks", "Procore", "Outlook", "Excel", "Fichiers et exports", "API"];
const SECTEURS = ["Construction", "Industriel", "Manufacturier", "Distribution et logistique", "Opérations terrain"];

const STATS = [
  { num: "12 h+", label: "récupérées chaque semaine, en moyenne" },
  { num: "20+", label: "PME accompagnées au Québec" },
  { num: "37 000", label: "prix comparés à chaque cycle, sans effort humain" },
  { num: "30 min", label: "pour une première analyse de vos opérations" },
];

function Arrow() {
  return (
    <svg className="hm-arrow" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M4 10h11M11 5l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Check() {
  return (
    <svg className="hm-check" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3.5 8.5l3 3 6-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div id="dc-root">
      <div className="page hm">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
        />

        <Ticker />
        <SiteHeader brandHref="#" navItems={NAV} ctaHref="#contact" />

        {/* 1 · HERO — la promesse + ce que « un système » veut dire, montré */}
        <section className="hm-hero">
          <div className="hm-wrap hm-hero-grid">
            <div className="hm-hero-copy">
              <p className="hm-kicker">
                IA, automatisation et systèmes sur mesure pour les PME du Québec
              </p>
              <h1 className="hm-h1">
                Vos opérations ne devraient pas vivre dans 12&nbsp;logiciels.
              </h1>
              <p className="hm-lead">
                Je transforme les suivis manuels, fichiers Excel, courriels et
                logiciels mal adaptés en un système opérationnel simple :
                l&apos;information au même endroit, une partie du travail qui se
                fait seule.
              </p>
              <div className="hm-cta">
                <a href="#contact" className="btn">
                  <span className="cta-full">Me montrer comment vous travaillez</span>
                  <span className="cta-short">Analyser mes opérations</span>
                  <Arrow />
                </a>
                <a href="#cas" className="btn-link">
                  Voir un cas concret
                </a>
              </div>
              <div className="hm-who">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/portrait.webp"
                  width={56}
                  height={56}
                  alt=""
                  className="hm-who-img"
                />
                <p>
                  <strong>Gabriel Nadon</strong>, conseiller indépendant à
                  Montréal. Vous parlez à celui qui construit, et vous avez une
                  réponse sous 24&nbsp;h.
                </p>
              </div>
            </div>

            <figure
              className="hm-sys"
              aria-label="Illustration : une matinée type une fois le système en place"
            >
              <div className="hm-sys-sources" aria-hidden="true">
                {SOURCES.map((s) => (
                  <span key={s} className="hm-src">
                    {s}
                  </span>
                ))}
              </div>
              <svg
                className="hm-sys-flow"
                viewBox="0 0 500 64"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M50 0 C50 38, 250 26, 250 64" pathLength={1} />
                <path d="M150 0 C150 38, 250 26, 250 64" pathLength={1} />
                <path d="M250 0 L250 64" pathLength={1} />
                <path d="M350 0 C350 38, 250 26, 250 64" pathLength={1} />
                <path d="M450 0 C450 38, 250 26, 250 64" pathLength={1} />
              </svg>
              <div className="hm-sys-panel">
                <div className="hm-sys-head">
                  <span className="hm-sys-title">
                    <span className="hm-live" aria-hidden="true"></span>
                    Votre système, ce matin
                  </span>
                  <span className="hm-sys-time">8 h 02</span>
                </div>
                <ul className="hm-queue">
                  {QUEUE.map((q, i) => (
                    <li
                      key={q.title}
                      className="hm-q"
                      style={{ ["--i" as string]: i }}
                    >
                      <span
                        className={q.done ? "hm-q-icon is-done" : "hm-q-icon is-wait"}
                        aria-hidden="true"
                      >
                        {q.done ? <Check /> : "!"}
                      </span>
                      <span className="hm-q-body">
                        <span className="hm-q-title">{q.title}</span>
                        <span className="hm-q-meta">{q.meta}</span>
                      </span>
                      <span className={q.done ? "hm-q-status is-done" : "hm-q-status is-wait"}>
                        {q.done ? "Fait" : "À valider"}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="hm-sys-foot">
                  <span>3 tâches faites sans ressaisie</span>
                  <span className="hm-sys-foot-wait">1 décision pour vous</span>
                </div>
              </div>
              <figcaption className="hm-sys-cap">
                Illustration : une matinée type, une fois le système en place.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 2 · PROBLÈME — faire reconnaître la situation */}
        <section className="hm-section" id="probleme">
          <div className="hm-wrap hm-split">
            <h2 className="hm-h2">
              Votre information est partout. Sauf au même endroit.
            </h2>
            <ul className="hm-pains">
              {PAINS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="hm-wrap">
            <p className="hm-cost">
              <span className="hm-cost-label">Ce que ça coûte</span>
              Des doubles saisies, de l&apos;information introuvable, des suivis
              oubliés, des erreurs, des décisions prises trop tard — et de
              l&apos;argent laissé sur la table.
            </p>
          </div>
        </section>

        {/* 3 · MÉTHODE — une vraie séquence */}
        <section className="hm-section hm-band" id="methode">
          <div className="hm-wrap">
            <div className="hm-head">
              <h2 className="hm-h2">Comment je travaille</h2>
              <p className="hm-sub">
                Trois étapes, dans cet ordre. On ne construit rien avant
                d&apos;avoir compris où le travail se perd.
              </p>
            </div>
            <ol className="hm-steps">
              {STEPS.map((s, i) => (
                <li key={s.title} className="hm-step">
                  <span className="hm-step-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="hm-step-when">{s.when}</span>
                  <h3 className="hm-h3">{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
            <p className="hm-note">
              Quand l&apos;intelligence artificielle accélère une étape, elle
              travaille sur des données structurées, avec des garde-fous et une
              validation humaine. C&apos;est un mécanisme, pas le produit.
            </p>
          </div>
        </section>

        {/* 4 · CAPACITÉS — ce que le système peut faire */}
        <section className="hm-section" id="exemples">
          <div className="hm-wrap">
            <div className="hm-head">
              <h2 className="hm-h2 hm-h2-wide">
                Un logiciel vous donne des écrans. Un système fait une partie du
                travail.
              </h2>
              <p className="hm-sub">
                Le système prépare, signale et relance. Vos gens gardent le
                contrôle et décident.
              </p>
            </div>
            <ul className="hm-caps">
              {CAPACITES.map((c) => (
                <li key={c.verb}>
                  <span className="hm-cap-verb">{c.verb}</span>
                  <span className="hm-cap-rest">{c.rest}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5 · SERVICES — hub vers les pages commerciales (une par intention) */}
        <section className="hm-section hm-band" id="services">
          <div className="hm-wrap">
            <div className="hm-head">
              <h2 className="hm-h2">
                Ce que je mets en place, selon où le travail se perd.
              </h2>
            </div>
            <ul className="hm-svcs">
              {SERVICES.map((s) => (
                <li key={s.href} className="hm-svc">
                  <span className="hm-svc-kind">{s.kind}</span>
                  <h3 className="hm-svc-title">
                    <a href={s.href}>{s.title}</a>
                  </h3>
                  <p className="hm-svc-text">
                    {s.text}
                    {s.href === "/logiciel-sur-mesure/" ? (
                      <>
                        {" "}Ou{" "}
                        <a
                          href="/refonte-de-systeme/"
                          className="link-inline hm-svc-inner"
                        >
                          quand le vieux système doit être remplacé
                        </a>
                        .
                      </>
                    ) : null}
                  </p>
                  <span className="hm-svc-go" aria-hidden="true">
                    <Arrow />
                  </span>
                </li>
              ))}
            </ul>
            <div className="hm-tools">
              <p>
                <strong>Vos outils restent en place.</strong> Le système
                remplace ce qui ne fonctionne plus et se connecte à ce qui
                fonctionne déjà, selon les accès disponibles.
              </p>
              <ul className="hm-pills">
                {OUTILS_EN_PLACE.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 6 · CAS CLIENT — la preuve, chiffrée */}
        <section className="hm-proof" id="cas">
          <div className="hm-wrap">
            <div className="hm-proof-top">
              <div>
                <p className="hm-proof-kicker">
                  Cas concret : épicerie indépendante, Québec
                </p>
                <h2 className="hm-proof-fig">
                  <span className="hm-proof-num">56&nbsp;000&nbsp;$</span>
                  <span className="hm-proof-txt">
                    par année, récupérés sur une seule tâche manuelle.
                  </span>
                </h2>
                <a
                  href="/cas/synchronisation-prix-fournisseurs/"
                  className="hm-btn-ghost"
                >
                  Lire le cas complet
                  <Arrow />
                </a>
              </div>
              <ol className="hm-proof-steps">
                <li>
                  <span className="hm-proof-step">Le problème</span>
                  <h3>Recopier des milliers de prix, chaque semaine</h3>
                  <p>
                    L&apos;équipe retapait à la main les prix de ses
                    fournisseurs dans sa caisse : l&apos;équivalent d&apos;un
                    poste à temps partiel, sans compter les erreurs de saisie
                    ni la marge perdue en commandant sans comparer.
                  </p>
                </li>
                <li>
                  <span className="hm-proof-step">Le système</span>
                  <h3>La machine recopie, l&apos;équipe approuve</h3>
                  <p>
                    Il importe les listes de tous les fournisseurs, compare les
                    prix produit par produit et prépare la mise à jour —
                    branché sur la caisse déjà en place, sans arrêter les
                    opérations.
                  </p>
                </li>
                <li>
                  <span className="hm-proof-step">Le résultat</span>
                  <h3>Le temps repris, la marge en prime</h3>
                  <p>
                    La saisie manuelle est éliminée et l&apos;entreprise achète
                    désormais au meilleur prix, à chaque commande.
                  </p>
                </li>
              </ol>
            </div>
            <dl className="hm-stats">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt>{s.num}</dt>
                  <dd>{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 7 · L'APPROCHE — la personne derrière */}
        <section className="hm-section" id="approche">
          <div className="hm-wrap hm-me">
            <div className="hm-me-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/portrait.webp"
                width={982}
                height={941}
                loading="lazy"
                alt="Portrait de Gabriel Nadon, conseiller"
              />
            </div>
            <div className="hm-me-copy">
              <h2 className="hm-quote">
                Je ne vends pas de la technologie. Je règle des problèmes
                d&apos;affaires.
              </h2>
              <p className="hm-me-body">
                Chaque mandat commence par vos opérations réelles — où le temps
                se perd, où l&apos;information circule mal, où l&apos;argent
                sort sans que personne ne le voie — et se termine par un
                système qui fait une partie du travail. Pas
                d&apos;intermédiaire, pas de jargon, pas de surprise.
              </p>
              <ul className="hm-principles">
                <li>
                  <Check />
                  <span>
                    <strong>Comprendre avant de construire.</strong> On
                    cartographie vos opérations et vos outils réels avant de
                    proposer quoi que ce soit.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <strong>Un seul interlocuteur.</strong> Vous parlez à celui
                    qui analyse vos opérations et qui construit le système.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <strong>Des livraisons visibles.</strong> Le système avance
                    par étapes : vous voyez chaque morceau fonctionner avant
                    d&apos;aller plus loin.
                  </span>
                </li>
              </ul>
              <p className="hm-sign">
                Gabriel Nadon
                <span>Conseiller, systèmes opérationnels</span>
              </p>
            </div>
          </div>
        </section>

        {/* 8 · POUR QUI + OUTILS GRATUITS (maillage visible vers la grappe) */}
        <section className="hm-section hm-band hm-section-tight">
          <div className="hm-wrap hm-split hm-for-row">
            <div>
              <h2 className="hm-h3">Pour qui</h2>
              <p className="hm-for">
                Les entreprises où les opérations sont devenues trop complexes
                pour Excel, les courriels et les outils séparés.
              </p>
            </div>
            <ul className="hm-pills hm-pills-lg">
              {SECTEURS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="hm-wrap">
            <h2 className="hm-h3 hm-free-head">Outils et guides gratuits</h2>
            <div className="hm-free">
              {OUTILS.map((o) => (
                <a key={o.href} href={o.href} className="hm-free-card">
                  <span className="hm-free-kind">{o.kind}</span>
                  <span className="hm-free-title">{o.title}</span>
                  <Arrow />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 9 · CTA FINAL */}
        <section className="hm-section hm-contact" id="contact">
          <div className="hm-wrap hm-contact-grid">
            <div>
              <h2 className="hm-h2">Montrez-moi comment vous travaillez.</h2>
              <p className="hm-lead">
                En 30 minutes, on regarde votre processus actuel et on
                identifie où un système pourrait réellement enlever du travail
                ou récupérer de la valeur — que l&apos;on travaille ensemble ou
                non.
              </p>
              <ul className="hm-contact-list">
                <li>
                  <Check /> Gratuit et sans engagement
                </li>
                <li>
                  <Check /> Réponse sous 24&nbsp;h
                </li>
                <li>
                  <Check /> Directement avec Gabriel, pas un vendeur
                </li>
              </ul>
            </div>
            <div className="contact-card hm-form">
              <ContactForm />
            </div>
          </div>
        </section>

        <HomeFooter />
      </div>
    </div>
  );
}
