import type { Metadata } from "next";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { TrackedLink } from "@/components/TrackedLink";
import { Calculateur } from "@/components/Calculateur";

const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";
const URL = "https://gabrielnadon.com/calculateur/";

// Outil interactif — aimant à trafic et à leads. Indexable. Le calcul reprend
// exactement la logique du diagnostic (heures × personnes × taux × 50 sem.)
// et les prix publiés du site (sprint dès 4 500 $).
export const metadata: Metadata = {
  title:
    "Calculateur : combien vous coûte le travail manuel ? | Gabriel Nadon",
  description:
    "Prix retapés à la main, double saisie, rapports refaits chaque semaine : calculez en 30 secondes ce que vos tâches manuelles coûtent par année. Gratuit, avec gabarit Excel téléchargeable. PME du Québec.",
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    siteName: "Gabriel Nadon",
    title: "Combien vous coûte le travail manuel ? — Calculateur gratuit",
    description:
      "Calculez en 30 secondes ce que vos tâches manuelles coûtent par année. Une épicerie du Québec a découvert 56 000 $/an dans une seule tâche.",
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
    title: "Combien vous coûte le travail manuel ? — Calculateur gratuit",
    description:
      "Calculez en 30 secondes ce que vos tâches manuelles coûtent par année.",
    images: ["https://gabrielnadon.com/og-image.png"],
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Calculateur du coût du travail manuel",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      description:
        "Calcule le coût annuel d’une tâche manuelle répétitive (heures × personnes × coût horaire) pour une PME.",
      url: URL,
      inLanguage: "fr-CA",
      author: {
        "@type": "Person",
        name: "Gabriel Nadon",
        url: "https://gabrielnadon.com/",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Comment calculer le coût d’une tâche manuelle dans une PME ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Multipliez les heures passées par semaine par le nombre de personnes qui la font, par le coût horaire chargé (salaire + charges), puis par 50 semaines. Exemple : 8 h × 1 personne × 25 $/h × 50 semaines = 10 000 $ par année, pour une seule tâche.",
          },
        },
        {
          "@type": "Question",
          name: "Quel coût horaire utiliser dans le calcul ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Le coût « chargé » : le salaire horaire plus les charges sociales et avantages, soit environ 1,2 à 1,4 fois le salaire brut. Pour un employé à 20 $/h, comptez 24 à 28 $/h de coût réel.",
          },
        },
        {
          "@type": "Question",
          name: "À partir de quel montant l’automatisation vaut-elle la peine ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Règle simple : si la tâche coûte plus par année que le projet qui l’élimine, elle se rembourse en moins de douze mois. Un sprint d’automatisation débute à 4 500 $ ; une tâche à 10 000 $/an le rembourse en six mois environ. Sous ce seuil, mieux vaut souvent ne rien faire — et je le dis tel quel.",
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
          name: "Calculateur du coût du travail manuel",
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

export default function CalculateurPage() {
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
          <SiteHeader brandHref="/" navItems={NAV} ctaHref="#calculateur" />

          {/* Hero + outil */}
          <section className="case-hero" id="calculateur">
            <div className="case-hero-grid">
              <div>
                <div className="eyebrow" data-rise="50">
                  Outil gratuit · 30 secondes · aucun courriel requis
                </div>
                <h1 className="case-title u-mt-lg" data-rise="120">
                  Combien vous coûte le travail{" "}
                  <span className="italic">que personne n’a chiffré ?</span>
                </h1>
                <p className="case-lead" data-rise="200">
                  Les prix fournisseurs retapés à la main. La facturation qui
                  mange deux jours. Le rapport du lundi réassemblé depuis trois
                  fichiers. Aucune de ces heures ne paraît dans vos états
                  financiers — mais elles sont toutes sur la paie. Entrez trois
                  chiffres : le calculateur vous donne le montant annuel, et le
                  temps qu’il faudrait pour le récupérer.
                </p>
                <p className="case-prose u-mt-lg" data-rise="240">
                  C’est exactement ce calcul qui a révélé{" "}
                  <a href="/cas/synchronisation-prix-fournisseurs/" className="link-serif">
                    56 000 $ par année dans une seule tâche d’une épicerie du
                    Québec →
                  </a>
                </p>
              </div>
              <div data-rise="280">
                <Calculateur />
              </div>
            </div>
          </section>

          {/* Gabarit Excel */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">Version Excel gratuite</span>
              <div className="u-measure-prose">
                <span className="serif-muted">
                  Vous préférez le faire en équipe, tâche par tâche ? Le même
                  calcul, en gabarit Excel : listez jusqu’à 15 tâches manuelles,
                  les totaux et le classement se font tout seuls.{" "}
                </span>
                <TrackedLink
                  event="gabarit_download"
                  href="/gabarits/cout-travail-manuel.xlsx"
                  className="link-serif"
                >
                  Télécharger le gabarit (.xlsx, gratuit, sans courriel) →
                </TrackedLink>
              </div>
            </div>
          </section>

          {/* Comment lire le résultat */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">Comment lire votre résultat</span>
              <span className="rule"></span>
            </div>
            <div className="case-steps">
              <div className="case-step">
                <div className="mandat-num">
                  <span>01</span>
                </div>
                <h3 className="mandat-title">
                  <span>Sous 4 500 $ par année</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Automatiser ne vaut probablement pas la peine — le projet
                    coûterait plus cher que la corvée. Gardez le gabarit, refaites
                    le calcul quand le volume grossit.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>02</span>
                </div>
                <h3 className="mandat-title">
                  <span>Entre 4 500 $ et 15 000 $</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    La zone du sprint : une corvée éliminée en 2 à 3 semaines,
                    portée fixe, prix fixe (dès 4 500 $). Le projet se rembourse
                    à l’intérieur de la première année.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>03</span>
                </div>
                <h3 className="mandat-title">
                  <span>Au-dessus de 15 000 $</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Il y a probablement plusieurs tâches — ou un système entier —
                    à revoir. C’est le territoire de la refonte par tranches :
                    chaque tranche livrée et rentabilisée avant la suivante.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="section">
            <div className="contact-grid">
              <div>
                <div className="contact-eyebrow">La suite logique</div>
                <h2 className="contact-title">
                  Vous avez un chiffre.{" "}
                  <span className="italic">Vérifions-le ensemble.</span>
                </h2>
                <p className="contact-lead">
                  En 20 minutes au téléphone, on valide votre calcul, on regarde
                  ce qui se cache derrière la tâche, et je vous dis honnêtement
                  si ça vaut un projet — ou non. Gratuit, sans obligation.
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
                  <a href="/#contact" className="scp5 contact-link u-mt-sm">
                    <span>
                      <span className="kv-label-block">Ou par écrit</span>
                      <span className="icon-16">Décrire ma situation</span>
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
