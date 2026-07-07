import type { Metadata } from "next";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { TrackedLink } from "@/components/TrackedLink";
import { ContactForm } from "@/components/ContactForm";

const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";
const URL = "https://gabrielnadon.com/logiciel-gestion-epicerie/";

// Page verticale « épicerie / dépanneur indépendant » — le persona le plus proche
// du cas prouvé (56 000 $/an). Double rôle : cible SEO (mots-clés « logiciel
// gestion épicerie », « gestion prix fournisseurs », « inventaire dépanneur »)
// ET landing du trafic payant. Contrairement à /diagnostic/, elle est INDEXABLE
// (canonical + présente dans sitemap.xml). Le formulaire réutilise le funnel
// complet : ContactForm → /api/contact → /merci/ (generate_lead).
export const metadata: Metadata = {
  title:
    "Logiciel de gestion pour épicerie et dépanneur — sans jeter votre caisse | Gabriel Nadon",
  description:
    "Épicerie ou dépanneur indépendant au Québec ? Prix fournisseurs retapés à la main, inventaire dans Excel, marges qui fondent. On automatise votre caisse existante — une épicerie a récupéré 56 000 $/an. Diagnostic gratuit de 20 minutes.",
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    siteName: "Gabriel Nadon",
    title: "Logiciel de gestion pour épicerie et dépanneur — sans jeter votre caisse",
    description:
      "Prix fournisseurs, inventaire, marges : on automatise votre caisse existante au lieu de la remplacer. Une épicerie du Québec a récupéré 56 000 $/an.",
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
    title: "Logiciel de gestion pour épicerie et dépanneur — Québec",
    description:
      "On automatise votre caisse existante au lieu de la remplacer. Une épicerie a récupéré 56 000 $/an.",
    images: ["https://gabrielnadon.com/og-image.png"],
  },
};

const JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Logiciel de gestion et automatisation pour épicerie et dépanneur",
      serviceType:
        "Automatisation des prix fournisseurs, de l’inventaire et de la caisse pour commerce d’alimentation indépendant",
      description:
        "Systèmes sur mesure pour épiceries et dépanneurs indépendants du Québec : synchronisation des prix fournisseurs, gestion d’inventaire et connexion à la caisse existante, sans la remplacer.",
      provider: {
        "@type": "Person",
        name: "Gabriel Nadon",
        url: "https://gabrielnadon.com/",
      },
      areaServed: "Québec",
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Épicerie et dépanneur indépendant",
      },
      url: URL,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Faut-il remplacer notre caisse pour automatiser les prix fournisseurs ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Non. Le système se branche sur la caisse déjà en place et l’alimente automatiquement. Une épicerie du Québec l’a fait sans remplacer sa caisse et sans interrompre ses opérations une seule journée.",
          },
        },
        {
          "@type": "Question",
          name: "Est-ce que ça vaut la peine pour un seul commerce ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La mise à jour manuelle des prix d’une seule épicerie a coûté près de 56 000 $ par année en temps de saisie. Le diagnostic gratuit de 20 minutes chiffre exactement ce que ça vous coûte, à vous.",
          },
        },
        {
          "@type": "Question",
          name: "On n’est pas une entreprise techno — est-ce pour nous ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui. Vous parlez commandes, prix, inventaire et marges ; je traduis ça en système, sans jargon, et vous gardez le contrôle des décisions.",
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
  { href: "#diagnostic", label: "Diagnostic" },
];

export default function EpiceriePage() {
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
          <SiteHeader brandHref="/" navItems={NAV} ctaHref="#diagnostic" />

          {/* Hero : le métier nommé, puis la preuve */}
          <section className="case-hero">
            <div className="case-hero-grid">
              <div>
                <div className="eyebrow" data-rise="50">
                  Épicerie &amp; dépanneur indépendant · Québec
                </div>
                <h1 className="case-title u-mt-lg" data-rise="120">
                  Votre épicerie roule sur Excel et sur une caisse qui{" "}
                  <span className="italic">ne parle à personne.</span>
                </h1>
                <p className="case-lead" data-rise="200">
                  Retaper les prix de chaque fournisseur à la main. Deviner
                  l’inventaire réel. Regarder la marge fondre parce qu’on ne peut
                  pas comparer les prix assez vite. Vous n’avez pas besoin d’un
                  nouveau logiciel d’épicerie — vous avez besoin que ce que vous
                  avez déjà arrête de vous coûter des heures. En 20 minutes au
                  téléphone, je vous dis quoi régler en premier, ce que ça coûte
                  et ce que ça rapporte.
                </p>
                <div data-rise="240">
                  <a href="#diagnostic" className="btn-block">
                    Obtenir mon diagnostic gratuit <span>→</span>
                  </a>
                  <p className="form-note">
                    Ou{" "}
                    <TrackedLink
                      event="clic_audit"
                      href={CAL}
                      target="_blank"
                      rel="noopener"
                    >
                      réservez directement vos 20 minutes
                    </TrackedLink>
                    .
                  </p>
                </div>
              </div>
              <div data-rise="280">
                <div className="money-box">
                  <div className="money-kicker">
                    Ce qu’une seule tâche manuelle a coûté
                  </div>
                  <div className="money-fig">
                    <span className="num">56 000 $</span>
                    <span className="cur">/ an</span>
                  </div>
                  <p className="money-sub">
                    récupérés par une épicerie du Québec en éliminant la mise à
                    jour manuelle de ses prix fournisseurs — sans remplacer sa
                    caisse.
                  </p>
                  <p className="money-plus">
                    Combien la vôtre vous coûte-t-elle, sans paraître nulle part ?
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Les signes */}
          <section className="section u-pb-64">
            <div className="note-grid">
              <div>
                <div className="eyebrow u-mb-lg">Vous vous reconnaissez ?</div>
                <h2 className="h2-left u-measure-title">
                  Ce n’est pas « normal » pour un commerce d’alimentation. C’est
                  juste devenu invisible.
                </h2>
                <p className="case-prose u-mt-lg">
                  Chacune de ces situations coûte des heures payées chaque
                  semaine — et aucune n’apparaît sur vos états financiers. Le
                  diagnostic sert exactement à ça : les rendre visibles, puis les
                  chiffrer.
                </p>
              </div>
              <ul className="pain-list">
                <li className="pain-item">
                  <span className="pain-mark"></span>
                  <p className="pain-text">
                    Quelqu’un retape à la main les listes de prix des
                    fournisseurs dans la caisse, semaine après semaine.
                  </p>
                </li>
                <li className="pain-item">
                  <span className="pain-mark"></span>
                  <p className="pain-text">
                    L’inventaire « vrai » vit dans un ou deux fichiers Excel que
                    personne d’autre n’ose toucher.
                  </p>
                </li>
                <li className="pain-item">
                  <span className="pain-mark"></span>
                  <p className="pain-text">
                    Vous commandez parfois chez le fournisseur le plus cher,
                    faute de pouvoir comparer les prix à temps.
                  </p>
                </li>
                <li className="pain-item">
                  <span className="pain-mark"></span>
                  <p className="pain-text">
                    Une seule personne « comprend le système ». Quand elle est
                    absente, la mise à jour des prix attend.
                  </p>
                </li>
                <li className="pain-item">
                  <span className="pain-mark"></span>
                  <p className="pain-text">
                    Vous savez qu’il faudrait « regarder ça », mais personne n’a
                    le temps de s’arrêter derrière le comptoir.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          {/* Preuve → le cas complet (le « comment » détaillé vit dans le cas) */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">Preuve sur le terrain</span>
              <div className="u-measure-prose">
                <span className="serif-muted">
                  Ce n’est pas une théorie. Une épicerie du Québec a éliminé la
                  mise à jour manuelle de ses prix fournisseurs et récupéré
                  56 000 $ par année — sans remplacer sa caisse, sans une seule
                  journée d’interruption. Le système, les chiffres et la méthode,
                  en détail, dans le cas complet.{" "}
                </span>
                <a
                  href="/cas/synchronisation-prix-fournisseurs/"
                  className="link-serif"
                >
                  Lire le cas complet →
                </a>
              </div>
            </div>
          </section>

          {/* Prix transparents */}
          <section className="note">
            <div className="section">
              <div className="note-grid">
                <div>
                  <div className="note-eyebrow">Combien ça coûte</div>
                  <p className="note-quote">
                    Des prix clairs, avant même le premier appel.
                  </p>
                  <p className="note-body">
                    Vous n’avez pas de temps à perdre en soumissions floues, moi
                    non plus. Voici les ordres de grandeur réels — le diagnostic
                    sert précisément à confirmer lequel s’applique à votre
                    commerce, chiffres à l’appui.
                  </p>
                </div>
                <div className="principles">
                  <div className="principle">
                    <div className="principle-head">
                      <span className="principle-num">
                        <span>0 $</span>
                      </span>
                      <div>
                        <h3 className="principle-title">
                          <span>Diagnostic — 20 minutes</span>
                        </h3>
                        <p className="principle-text">
                          <span>
                            L’appel, les pistes et l’ordre de priorité. Gratuit,
                            sans obligation, sans suivi insistant.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="principle">
                    <div className="principle-head">
                      <span className="principle-num">
                        <span>dès 4 500 $</span>
                      </span>
                      <div>
                        <h3 className="principle-title">
                          <span>Sprint d’automatisation</span>
                        </h3>
                        <p className="principle-text">
                          <span>
                            Une corvée éliminée en 2 à 3 semaines : synchronisation
                            des prix fournisseurs, mise à jour de la caisse,
                            rapport d’inventaire. Portée fixe, prix fixe.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="principle">
                    <div className="principle-head">
                      <span className="principle-num">
                        <span>par tranches</span>
                      </span>
                      <div>
                        <h3 className="principle-title">
                          <span>Refonte de système</span>
                        </h3>
                        <p className="principle-text">
                          <span>
                            Le vieux système remplacé morceau par morceau, en
                            tranches d’environ 6 000 $ — chacune livrée, utilisée
                            et rentabilisée avant la suivante. La plupart des
                            refontes se situent entre 12 000 $ et 30 000 $.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Objections */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">Les questions qu’on me pose</span>
              <span className="rule"></span>
            </div>
            <div className="case-steps">
              <div className="case-step">
                <div className="mandat-num">
                  <span>Q.</span>
                </div>
                <h3 className="mandat-title">
                  <span>« Faut-il remplacer notre caisse ? »</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Non. Le système se branche sur la caisse déjà en place et
                    l’alimente automatiquement. On garde ce qui fonctionne, on
                    supprime la saisie.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>Q.</span>
                </div>
                <h3 className="mandat-title">
                  <span>« On n’est pas une entreprise techno. »</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Parfait — c’est exactement pour vous. Vous parlez commandes,
                    prix, inventaire et marges. Je traduis en système, sans
                    jargon, et vous gardez le contrôle des décisions.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>Q.</span>
                </div>
                <h3 className="mandat-title">
                  <span>« On n’a pas le temps pour un projet. »</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    C’est le symptôme, pas une objection : le temps manque parce
                    que la saisie le mange. Un sprint demande 2 à 3 heures de
                    votre équipe au total — le reste, c’est moi.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>Q.</span>
                </div>
                <h3 className="mandat-title">
                  <span>« Et si ça ne vaut pas la peine chez nous ? »</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Alors je vous le dis pendant l’appel, en 20 minutes, et vous
                    ne me devez rien. Je ne prends que des mandats où le rendement
                    est démontrable.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* Formulaire */}
          <section className="section" id="diagnostic">
            <div className="contact-grid">
              <div>
                <div className="contact-eyebrow">Diagnostic gratuit</div>
                <h2 className="contact-title">
                  Vingt minutes. Un plan.{" "}
                  <span className="italic">Zéro engagement.</span>
                </h2>
                <p className="contact-lead">
                  Décrivez-moi où votre commerce perd le plus de temps — prix,
                  inventaire, commandes. Je vous réponds sous 24 h avec de
                  premières pistes — ou réservez directement votre appel dans mon
                  calendrier.
                </p>
                <p className="form-note">
                  <TrackedLink
                    event="clic_audit"
                    href={CAL}
                    target="_blank"
                    rel="noopener"
                  >
                    Réserver mes 20 minutes maintenant →
                  </TrackedLink>
                </p>
              </div>
              <div className="cab-paper contact-card">
                <ContactForm withPhone />
              </div>
            </div>
          </section>

          <MinimalFooter />
        </div>
      </div>
    </div>
  );
}
