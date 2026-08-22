import type { Metadata } from "next";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { TrackedLink } from "@/components/TrackedLink";

const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";
const URL = "https://gabrielnadon.com/guides/mise-a-jour-prix-fournisseurs/";

// Article de longue traîne : « mise à jour des prix fournisseurs », « fichier
// de prix fournisseur », « catalogue fournisseur ». SERP quasi vide d'intention
// (vérifié 2026-08) — satellite du cas /cas/synchronisation-prix-fournisseurs/
// et de la page verticale /logiciel-gestion-epicerie/.
export const metadata: Metadata = {
  title:
    "Mise à jour des prix fournisseurs : les 4 méthodes comparées | Gabriel Nadon",
  description:
    "Saisie manuelle, import CSV, portail fournisseur ou synchronisation automatisée : les 4 façons de tenir vos prix fournisseurs à jour, leurs coûts réels et leurs pièges. Avec gabarit Excel gratuit de comparaison de prix.",
  alternates: { canonical: URL },
  openGraph: {
    type: "article",
    siteName: "Gabriel Nadon",
    title: "Mise à jour des prix fournisseurs : les 4 méthodes comparées",
    description:
      "Saisie manuelle, import CSV, portail fournisseur ou synchronisation automatisée — coûts réels et pièges de chaque méthode.",
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
    title: "Mise à jour des prix fournisseurs : les 4 méthodes comparées",
    description:
      "Coûts réels et pièges de chaque méthode, avec gabarit Excel gratuit.",
    images: ["https://gabrielnadon.com/og-image.png"],
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Mise à jour des prix fournisseurs : les 4 méthodes comparées",
      description:
        "Saisie manuelle, import CSV, portail fournisseur ou synchronisation automatisée : coûts réels, pièges et critères de choix pour un commerce ou une PME.",
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
          name: "Combien coûte la mise à jour manuelle des prix fournisseurs ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Calculez : heures par semaine × personnes × coût horaire chargé × 50 semaines. Dans un cas réel documenté, une épicerie indépendante du Québec y consacrait l’équivalent de près de 56 000 $ par année — l’équivalent d’un poste à temps partiel passé à retaper des listes de prix.",
          },
        },
        {
          "@type": "Question",
          name: "Qu’est-ce qu’un fichier de prix fournisseur ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La liste de prix qu’un fournisseur transmet à ses clients commerçants : codes de produits (souvent UPC/CUP), descriptions, formats de caisse, prix coûtants et parfois prix suggérés. Le format varie d’un fournisseur à l’autre — Excel, CSV, PDF, parfois papier — et c’est cette disparité qui rend la mise à jour pénible.",
          },
        },
        {
          "@type": "Question",
          name: "Peut-on automatiser les prix fournisseurs sans changer de caisse ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui, dans la plupart des cas : un système intermédiaire lit les fichiers de chaque fournisseur, normalise les codes de produits, compare les prix, puis alimente la caisse existante par son mécanisme d’import. Une épicerie du Québec l’a fait sans remplacer sa caisse et sans une seule journée d’interruption.",
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
          name: "Guides",
          item: "https://gabrielnadon.com/guides/mise-a-jour-prix-fournisseurs/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Mise à jour des prix fournisseurs : les 4 méthodes",
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

export default function PrixFournisseursPage() {
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
                  Guide pratique · Commerce &amp; PME
                </div>
                <h1 className="case-title u-mt-lg" data-rise="120">
                  Mise à jour des prix fournisseurs : les 4 méthodes,{" "}
                  <span className="italic">et ce qu’elles coûtent vraiment.</span>
                </h1>
                <p className="case-lead" data-rise="200">
                  Chaque commerce qui achète chez plusieurs fournisseurs vit le
                  même cycle : des listes de prix qui arrivent dans tous les
                  formats, une caisse ou un système à tenir à jour, et des
                  heures qui disparaissent entre les deux. Il n’existe que
                  quatre façons de faire ce travail. Voici chacune, avec son
                  coût réel et ses pièges — pour choisir en connaissance de
                  cause.
                </p>
              </div>
              <div data-rise="280">
                <div className="money-box">
                  <div className="money-kicker">
                    Le coût de la méthode nº 1, dans un cas réel
                  </div>
                  <div className="money-fig">
                    <span className="num">56 000 $</span>
                    <span className="cur">/ an</span>
                  </div>
                  <p className="money-sub">
                    C’est ce que la saisie manuelle des prix coûtait à une
                    épicerie indépendante du Québec — 37 000 prix à tenir à
                    jour, retapés semaine après semaine.
                  </p>
                  <p className="money-plus">
                    <a href="/cas/synchronisation-prix-fournisseurs/" className="link-serif">
                      Lire le cas complet →
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Les 4 méthodes */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">Les quatre méthodes</span>
              <span className="rule"></span>
            </div>
            <div className="case-steps">
              <div className="case-step">
                <div className="mandat-num">
                  <span>01</span>
                </div>
                <h3 className="mandat-title">
                  <span>La saisie manuelle</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Quelqu’un ouvre la liste du fournisseur et retape les prix
                    dans la caisse ou le système, ligne par ligne. Aucun coût
                    d’outil, mais le vrai prix est sur la paie : heures ×
                    personnes × coût horaire × 50 semaines, chaque année, plus
                    les erreurs de frappe qui finissent sur l’étiquette. C’est
                    la méthode par défaut de la plupart des commerces — parce
                    qu’elle ne paraît nulle part dans les états financiers.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>02</span>
                </div>
                <h3 className="mandat-title">
                  <span>L’import natif de la caisse (CSV/Excel)</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    La plupart des systèmes de caisse et de gestion offrent un
                    import de fichier. Quand le fournisseur envoie un fichier
                    propre et que les codes de produits correspondent, ça
                    fonctionne. Les pièges : chaque fournisseur a son format
                    (colonnes, formats de caisse, codes différents), les PDF ne
                    s’importent pas, et il faut encore préparer chaque fichier à
                    la main — on déplace la corvée, on ne l’élimine pas.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>03</span>
                </div>
                <h3 className="mandat-title">
                  <span>Le portail ou l’EDI du fournisseur</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Certains grands distributeurs offrent un portail, un
                    catalogue électronique ou un lien EDI qui pousse les prix
                    directement. Excellent quand il existe — mais il couvre un
                    seul fournisseur. Un commerce indépendant qui achète chez
                    huit fournisseurs se retrouve avec deux portails, trois
                    fichiers Excel et trois listes PDF : la comparaison de prix
                    entre fournisseurs, elle, reste à faire à la main.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>04</span>
                </div>
                <h3 className="mandat-title">
                  <span>La synchronisation automatisée multi-fournisseurs</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Un système intermédiaire lit les fichiers de tous les
                    fournisseurs — peu importe le format —, normalise les codes
                    de produits, compare les prix produit par produit, puis
                    alimente la caisse existante. L’équipe approuve en un écran
                    au lieu de retaper pendant des jours. C’est un projet sur
                    mesure (les formats de vos fournisseurs ne sont pas ceux du
                    voisin), mais il élimine la corvée au lieu de la déplacer —
                    et il révèle au passage chez qui chaque produit est le moins
                    cher.
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
                  La bonne méthode dépend d’un seul chiffre : ce que la corvée
                  vous coûte.
                </h2>
              </div>
              <div className="case-prose">
                <p>
                  Sous quelques heures par mois, la saisie manuelle ou l’import
                  natif suffisent — automatiser coûterait plus cher que la
                  corvée. À partir de plusieurs heures par semaine, chaque
                  méthode « gratuite » devient la plus chère des quatre : une
                  demi-journée hebdomadaire à 25 $/h dépasse 5 000 $ par année,
                  et le calcul empire avec le nombre de fournisseurs.
                </p>
                <p>
                  Commencez donc par chiffrer :{" "}
                  <a href="/calculateur/" className="link-serif">
                    le calculateur du coût du travail manuel
                  </a>{" "}
                  vous donne le montant en 30 secondes. Si le résultat dépasse le
                  coût d’un projet qui l’élimine, la méthode 04 se rembourse en
                  mois, pas en années — c’est exactement l’arithmétique du{" "}
                  <a
                    href="/cas/synchronisation-prix-fournisseurs/"
                    className="link-serif"
                  >
                    cas de l’épicerie
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* Gabarit */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">Gabarit Excel gratuit</span>
              <div className="u-measure-prose">
                <span className="serif-muted">
                  En attendant d’automatiser : un gabarit de comparaison de prix
                  fournisseurs. Collez les listes de jusqu’à trois fournisseurs,
                  le fichier aligne les produits, calcule l’écart et surligne le
                  meilleur prix.{" "}
                </span>
                <TrackedLink
                  event="gabarit_download"
                  href="/gabarits/comparaison-prix-fournisseurs.xlsx"
                  className="link-serif"
                >
                  Télécharger le gabarit (.xlsx, gratuit, sans courriel) →
                </TrackedLink>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="section">
            <div className="contact-grid">
              <div>
                <div className="contact-eyebrow">Votre situation précise</div>
                <h2 className="contact-title">
                  Combien de fournisseurs,{" "}
                  <span className="italic">combien d’heures ?</span>
                </h2>
                <p className="contact-lead">
                  En 20 minutes au téléphone, on chiffre votre mise à jour de
                  prix et je vous dis laquelle des quatre méthodes s’applique
                  chez vous — même si la réponse est « restez comme vous êtes ».
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
