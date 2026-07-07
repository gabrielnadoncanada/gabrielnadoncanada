import type { Metadata } from "next";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { HomeFooter } from "@/components/HomeFooter";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title:
    "Gabriel Nadon — Conseiller en Systèmes & IA | Audit, automatisation IA, systèmes web (Québec)",
  description:
    "Gabriel Nadon, conseiller en systèmes et intelligence artificielle au Québec. J'accompagne les PME : audit d'opérations, automatisation IA et systèmes web sur mesure, du diagnostic à la croissance.",
  alternates: { canonical: "https://gabrielnadon.com/" },
  openGraph: {
    type: "website",
    siteName: "Gabriel Nadon",
    title: "Gabriel Nadon — Conseiller en Systèmes & IA",
    description:
      "Audit d'opérations, automatisation IA et systèmes web sur mesure pour les PME du Québec. Du diagnostic à la croissance.",
    url: "https://gabrielnadon.com/",
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
    title: "Gabriel Nadon — Conseiller en Systèmes & IA",
    description:
      "Audit d'opérations, automatisation IA et systèmes web sur mesure pour les PME du Québec.",
    images: ["https://gabrielnadon.com/og-image.png"],
  },
};

const SITE = "https://gabrielnadon.com";

const SAME_AS = [
  "https://www.linkedin.com/in/gabrielnadoncanada/",
  "https://www.facebook.com/gabriel.nadon.2025",
];

const MANDATS = [
  "Audit d’opérations",
  "Systèmes web sur mesure",
  "Automatisation IA",
  "Sites qui convertissent",
  "Refonte de système informatique",
];

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: "Gabriel Nadon — Conseiller, Systèmes & IA",
      inLanguage: "fr-CA",
      publisher: { "@id": `${SITE}/#gabriel` },
    },
    {
      "@type": "Person",
      "@id": `${SITE}/#gabriel`,
      name: "Gabriel Nadon",
      url: `${SITE}/`,
      image: `${SITE}/portrait.png`,
      jobTitle: "Conseiller en Systèmes & IA",
      email: "bonjour@gabrielnadon.com",
      description:
        "Gabriel Nadon, conseiller en systèmes et intelligence artificielle au Québec. J'accompagne les PME : audit d'opérations, automatisation IA et systèmes web sur mesure, du diagnostic à la croissance.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Montréal",
        addressRegion: "QC",
        addressCountry: "CA",
      },
      areaServed: "Québec",
      knowsAbout: [
        "Intelligence artificielle",
        "Automatisation IA",
        "Systèmes web sur mesure",
        "Audit d'opérations",
        "Conseil stratégique",
        "Transformation numérique des PME",
      ],
      sameAs: SAME_AS,
      worksFor: { "@id": `${SITE}/#business` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#business`,
      name: "Gabriel Nadon — Systèmes & IA",
      url: `${SITE}/`,
      image: `${SITE}/og-image.png`,
      logo: `${SITE}/portrait.png`,
      description:
        "Conseil en systèmes et intelligence artificielle pour les PME du Québec : audit d'opérations, automatisation IA, systèmes web sur mesure et refonte de systèmes existants.",
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
        itemListElement: MANDATS.map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name, areaServed: "Québec" },
        })),
      },
    },
  ],
};

const NAV = [
  { href: "#approche", label: "Approche" },
  { href: "#mandats", label: "Mandats" },
  { href: "#methode", label: "Méthode" },
  { href: "#cas", label: "Cas concrets" },
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

          <section className="hero">
            <div className="cab-hide-sm hero-ref">
              <span className="dot-gold"></span>RÉF. 2026
            </div>
            <div className="hero-grid">
              <div>
                <div className="hero-eyebrow" data-rise="50">
                  Systèmes &amp; automatisation IA — Québec
                </div>
                <h1 className="hero-title" data-rise="120">
                  Des systèmes qui <span className="italic">travaillent</span>{" "}
                  pour votre entreprise.
                </h1>
                <p className="hero-lead" data-rise="200">
                  J’accompagne les PME dans l’audit, l’automatisation IA et les
                  systèmes web — qu’il faille les concevoir de zéro ou refondre
                  ceux qui vous ralentissent. Un seul interlocuteur, du
                  diagnostic à la mise en œuvre.
                </p>
                <div className="hero-cta" data-rise="280">
                  <a href="#contact" className="btn">
                    Prendre rendez-vous <span>→</span>
                  </a>
                  <a href="#mandats" className="btn-link">
                    Voir les mandats
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
                      <span>Disponible à distance</span>
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
                    <span className="tnum">4</span>
                    <span className="stat-unit">
                      <span>leviers</span>
                    </span>
                  </div>
                  <div className="stat-label">
                    <span>audit · systèmes · IA · web</span>
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
                    <span>pour cadrer votre premier mandat</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-tight" id="mandats">
            <div className="mandats-head">
              <h2 className="h2-left">
                Cinq mandats, un seul objectif : votre rendement.
              </h2>
              <span className="eyebrow">§ 01 · Les mandats</span>
            </div>
            <div>
              <a
                href="#contact"
                data-mandat="Audit d’opérations"
                aria-label="Audit d’opérations — discuter de ce mandat"
                className="cab-mandat scp4 mandat"
              >
                <div className="pt-2">
                  <div className="mandat-num">
                    <span>01</span>
                  </div>
                  <div className="mandat-code">
                    <span>M-01</span>
                  </div>
                </div>
                <h3 className="mandat-title">
                  <span>Audit d’opérations</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Vous savez exactement où vous perdez du temps et de
                    l’argent, et par quoi commencer.
                  </span>
                </p>
                <div>
                  <div className="kv-label">Livrable</div>
                  <div className="kv-value">
                    <span>Diagnostic + plan priorisé</span>
                  </div>
                </div>
                <span className="cab-mandat-arrow arrow-cell">↗</span>
              </a>

              <a
                href="#contact"
                data-mandat="Systèmes web sur mesure"
                aria-label="Systèmes web sur mesure — discuter de ce mandat"
                className="cab-mandat scp4 mandat"
              >
                <div className="pt-2">
                  <div className="mandat-num">
                    <span>02</span>
                  </div>
                  <div className="mandat-code">
                    <span>M-02</span>
                  </div>
                </div>
                <h3 className="mandat-title">
                  <span>Systèmes web sur mesure</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Vos données, vos clients et vos flux de travail réunis dans
                    un seul système fiable.
                  </span>
                </p>
                <div>
                  <div className="kv-label">Livrable</div>
                  <div className="kv-value">
                    <span>Plateforme interne</span>
                  </div>
                </div>
                <span className="cab-mandat-arrow arrow-cell">↗</span>
              </a>

              <a
                href="#contact"
                data-mandat="Automatisation IA"
                aria-label="Automatisation IA — discuter de ce mandat"
                className="cab-mandat scp4 mandat"
              >
                <div className="pt-2">
                  <div className="mandat-num">
                    <span>03</span>
                  </div>
                  <div className="mandat-code">
                    <span>M-03</span>
                  </div>
                </div>
                <h3 className="mandat-title">
                  <span>Automatisation IA</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Les tâches répétitives disparaissent de l’agenda de votre
                    équipe, sans erreur.
                  </span>
                </p>
                <div>
                  <div className="kv-label">Livrable</div>
                  <div className="kv-value">
                    <span>Workflows IA intégrés</span>
                  </div>
                </div>
                <span className="cab-mandat-arrow arrow-cell">↗</span>
              </a>

              <a
                href="#contact"
                data-mandat="Sites qui convertissent"
                aria-label="Sites qui convertissent — discuter de ce mandat"
                className="cab-mandat scp4 mandat"
              >
                <div className="pt-2">
                  <div className="mandat-num">
                    <span>04</span>
                  </div>
                  <div className="mandat-code">
                    <span>M-04</span>
                  </div>
                </div>
                <h3 className="mandat-title">
                  <span>Sites qui convertissent</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Une présence soignée qui transforme les visiteurs en clients
                    et représente votre marque.
                  </span>
                </p>
                <div>
                  <div className="kv-label">Livrable</div>
                  <div className="kv-value">
                    <span>Site performant</span>
                  </div>
                </div>
                <span className="cab-mandat-arrow arrow-cell">↗</span>
              </a>

              <a
                href="/refonte-de-systeme/"
                aria-label="Refonte de systèmes existants — voir la démarche"
                className="cab-mandat scp4 mandat"
              >
                <div className="pt-2">
                  <div className="mandat-num">
                    <span>05</span>
                  </div>
                  <div className="mandat-code">
                    <span>M-05</span>
                  </div>
                </div>
                <h3 className="mandat-title">
                  <span>Refonte de systèmes existants</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Votre logiciel maison ou vos fichiers Excel vous
                    ralentissent. On refond l’existant par étapes, sans perdre
                    vos données ni arrêter vos opérations.
                  </span>
                </p>
                <div>
                  <div className="kv-label">Livrable</div>
                  <div className="kv-value">
                    <span>Système modernisé, migration incluse</span>
                  </div>
                </div>
                <span className="cab-mandat-arrow arrow-cell">↗</span>
              </a>
            </div>
            <div className="bt"></div>
          </section>

          <section className="section-method" id="methode">
            <div className="method-head">
              <span className="eyebrow">§ 02 · La méthode</span>
              <span className="rule"></span>
            </div>
            <div className="cab-method method-grid">
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
                  <span>Audit</span>
                </h3>
                <p className="step-text">
                  <span>
                    On cartographie vos opérations et on cible les occasions à
                    plus fort impact.
                  </span>
                </p>
              </div>
              <div className="cab-step-card step">
                <div className="cab-step-gap sec-head">
                  <span className="step-code">
                    <span>02</span>
                  </span>
                  <span className="step-week">
                    <span>semaine 2</span>
                  </span>
                </div>
                <h3 className="step-title">
                  <span>Plan</span>
                </h3>
                <p className="step-text">
                  <span>
                    Une feuille de route claire, priorisée selon le rendement.
                  </span>
                </p>
              </div>
              <div className="cab-step-card step">
                <div className="cab-step-gap sec-head">
                  <span className="step-code">
                    <span>03</span>
                  </span>
                  <span className="step-week">
                    <span>semaines 3+</span>
                  </span>
                </div>
                <h3 className="step-title">
                  <span>Build</span>
                </h3>
                <p className="step-text">
                  <span>
                    On construit les systèmes par étapes, avec des livraisons
                    que vous voyez avancer.
                  </span>
                </p>
              </div>
              <div className="cab-step-card step">
                <div className="cab-step-gap sec-head">
                  <span className="step-code">
                    <span>04</span>
                  </span>
                  <span className="step-week">
                    <span>en continu</span>
                  </span>
                </div>
                <h3 className="step-title">
                  <span>Optimisation</span>
                </h3>
                <p className="step-text">
                  <span>
                    On mesure, on ajuste et on fait croître ce qui fonctionne.
                  </span>
                </p>
              </div>
            </div>
          </section>

          <section className="note" id="approche">
            <div className="section">
              <div className="note-grid">
                <div>
                  <div className="note-eyebrow">§ 03 · La note du conseiller</div>
                  <p className="note-quote">
                    Je ne vends pas de la technologie. Je règle des problèmes
                    d’affaires.
                  </p>
                  <p className="note-body">
                    <span className="dropcap">C</span>haque mandat commence par
                    vos chiffres — vos heures perdues, vos coûts, vos goulots —
                    et se termine par un système qui travaille à votre place.
                    Vous parlez directement à celui qui conçoit et
                    construit&nbsp;: pas d’intermédiaire, pas de jargon, pas de
                    surprise.
                  </p>
                  <div className="mt-36">
                    <div className="signature">Gabriel Nadon</div>
                    <div className="sig-line"></div>
                    <div className="sig-role">Conseiller, Systèmes &amp; IA</div>
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
                          <span>Vos chiffres d’abord</span>
                        </h3>
                        <p className="principle-text">
                          <span>
                            Chaque décision part de vos données&nbsp;: heures,
                            coûts, goulots.
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
                            Vous parlez à celui qui conçoit et construit. Aucun
                            intermédiaire.
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
                            Vous voyez le système avancer, étape par étape, sans
                            surprise.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bb">
            <div className="section">
              <div className="cab-testi testi">
                <div className="testi-meta">
                  <div className="testi-eyebrow">§ 04 · Ce qu&apos;on en dit</div>
                  <div className="testi-name">Marie-Claude Bélanger</div>
                  <div className="testi-line"></div>
                  <div className="testi-role">
                    Directrice générale
                    <br />
                    PME de services · Montréal
                  </div>
                </div>
                <div className="testi-quote-wrap">
                  <span className="bigquote">“</span>
                  <blockquote className="testi-quote">
                    Gabriel a transformé une montagne de tâches manuelles en un
                    système qui tourne tout seul. On a récupéré une dizaine
                    d’heures par semaine, sans rien changer à nos habitudes.
                  </blockquote>
                </div>
              </div>
            </div>
          </section>

          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">Secteurs servis</span>
              <div className="sectors-list">
                <span className="serif-muted">
                  <span>Commerce de détail</span>
                </span>
                <span className="serif-muted">
                  <span>Services professionnels</span>
                </span>
                <span className="serif-muted">
                  <span>Manufacturiers</span>
                </span>
                <span className="serif-muted">
                  <span>Cliniques</span>
                </span>
                <span className="serif-muted">
                  <span>Agences</span>
                </span>
              </div>
            </div>
          </section>

          <section className="section-tight" id="cas">
            <div className="mandats-head">
              <h2 className="h2-left">
                Des systèmes en production, pas des promesses.
              </h2>
              <span className="eyebrow">§ 05 · Cas concrets</span>
            </div>
            <div>
              <a
                href="/cas/synchronisation-prix-fournisseurs/"
                className="cab-mandat scp4 case-line"
                aria-label="Lire le cas : synchronisation des prix fournisseurs d'une épicerie"
              >
                <div className="pt-2">
                  <div className="mandat-num">
                    <span>01</span>
                  </div>
                  <div className="mandat-code">
                    <span>CAS-01</span>
                  </div>
                </div>
                <h3 className="mandat-title">
                  <span>
                    Près de 56 000 $ par année récupérés sur une tâche manuelle
                  </span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Une épicerie retapait à la main les prix de ses
                    fournisseurs, chaque semaine — l&apos;équivalent d&apos;un
                    poste à temps partiel. On a automatisé la comparaison et la
                    mise à jour vers sa caisse : le temps repris, et de la marge
                    en prime sur chaque achat au meilleur prix.
                  </span>
                </p>
                <div>
                  <div className="kv-label">Résultat</div>
                  <div className="kv-value">
                    <span>≈ 56 000 $ / an · Épicerie, Québec</span>
                  </div>
                </div>
                <span className="cab-mandat-arrow arrow-cell">↗</span>
              </a>
            </div>
          </section>

          <section className="section" id="contact">
            <div className="contact-grid">
              <div>
                <div className="contact-eyebrow">§ 06 · Premier rendez-vous</div>
                <h2 className="contact-title">
                  Réservons <span className="italic">vingt minutes.</span>
                </h2>
                <p className="contact-lead">
                  On cadre vos opérations, on cible vos plus grosses pertes de
                  temps et vous repartez avec un plan d’action concret — que
                  l’on travaille ensemble ou non.
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
