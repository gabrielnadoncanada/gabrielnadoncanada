import type { Metadata } from "next";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { TrackedLink } from "@/components/TrackedLink";
import { ContactForm } from "@/components/ContactForm";

const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";

// Landing dédiée au trafic payant (Google Ads / Meta). Volontairement non
// indexée : le message et les prix peuvent évoluer au rythme des campagnes
// sans interférer avec le référencement des pages organiques.
export const metadata: Metadata = {
  title: "Diagnostic de système gratuit — 20 minutes | Gabriel Nadon",
  description:
    "Vos journées partent en double saisie, en Excel et en système fragile ? En 20 minutes au téléphone, je vous dis quoi automatiser en premier, ce que ça coûte et ce que ça rapporte. PME du Québec.",
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    siteName: "Gabriel Nadon",
    title: "Diagnostic de système gratuit — 20 minutes",
    description:
      "En 20 minutes au téléphone : quoi automatiser en premier, ce que ça coûte, ce que ça rapporte. PME du Québec.",
    url: "https://gabrielnadon.com/diagnostic/",
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
};

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Diagnostic de système et d’automatisation",
  serviceType: "Diagnostic d’opérations, automatisation et refonte de systèmes",
  description:
    "Diagnostic gratuit de 20 minutes pour PME : identifier les tâches manuelles à automatiser en premier, l’effort requis et le rendement attendu.",
  provider: {
    "@type": "Person",
    name: "Gabriel Nadon",
    url: "https://gabrielnadon.com/",
  },
  areaServed: "Québec",
  url: "https://gabrielnadon.com/diagnostic/",
};

export default function DiagnosticPage() {
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
          {/* Pas de navigation : une landing payante n'offre qu'une sortie — le diagnostic. */}
          <SiteHeader brandHref="/diagnostic/" navItems={[]} ctaHref="#diagnostic" />

          {/* Hero : la douleur, puis la promesse */}
          <section className="case-hero">
            <div className="case-hero-grid">
              <div>
                <div className="eyebrow" data-rise="50">
                  Diagnostic gratuit · 20 minutes · PME du Québec
                </div>
                <h1
                  className="case-title u-mt-lg"
                  data-rise="120"
                >
                  Vos journées disparaissent dans des tâches qu’une machine
                  ferait <span className="italic">sans se tromper.</span>
                </h1>
                <p className="case-lead" data-rise="200">
                  Retaper les mêmes données d’un système à l’autre. Tenir la
                  « vraie » base dans trois fichiers Excel. Retenir son souffle
                  à chaque bogue du vieux logiciel. En 20 minutes au téléphone,
                  je vous dis quoi régler en premier, ce que ça coûte et ce que
                  ça rapporte — gratuit, sans obligation, que l’on travaille
                  ensemble ou non.
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
                    Ce qu’une seule tâche manuelle peut coûter
                  </div>
                  <div className="money-fig">
                    <span className="num">56 000 $</span>
                    <span className="cur">/ an</span>
                  </div>
                  <p className="money-sub">
                    récupérés par une épicerie du Québec en éliminant la mise à
                    jour manuelle de ses prix fournisseurs.
                  </p>
                  <p className="money-plus">
                    Combien la vôtre vous coûte-t-elle, sans paraître nulle
                    part ?
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Les signes */}
          <section
            className="section u-pb-64"
          >
            <div className="note-grid">
              <div>
                <div className="eyebrow u-mb-lg">
                  Vous vous reconnaissez ?
                </div>
                <h2 className="h2-left u-measure-title">
                  Ce n’est pas « normal ». C’est juste devenu invisible.
                </h2>
                <p className="case-prose u-mt-lg">
                  Chacune de ces situations coûte des heures payées chaque
                  semaine — et aucune n’apparaît dans vos états financiers. Le
                  diagnostic sert exactement à ça : les rendre visibles, puis
                  les chiffrer.
                </p>
              </div>
              <ul className="pain-list">
                <li className="pain-item">
                  <span className="pain-mark"></span>
                  <p className="pain-text">
                    Quelqu’un retape dans un système ce qu’un autre système
                    affiche déjà à l’écran.
                  </p>
                </li>
                <li className="pain-item">
                  <span className="pain-mark"></span>
                  <p className="pain-text">
                    La facturation, la paie ou les commandes prennent des jours
                    — et une erreur passe de temps en temps.
                  </p>
                </li>
                <li className="pain-item">
                  <span className="pain-mark"></span>
                  <p className="pain-text">
                    Une seule personne « comprend le système ». Quand elle est
                    absente, tout ralentit.
                  </p>
                </li>
                <li className="pain-item">
                  <span className="pain-mark"></span>
                  <p className="pain-text">
                    Vous avez déjà refusé un contrat ou un projet parce que
                    « le système ne peut pas suivre ».
                  </p>
                </li>
                <li className="pain-item">
                  <span className="pain-mark"></span>
                  <p className="pain-text">
                    Vous savez qu’il faudrait « regarder ça », mais personne n’a
                    le temps de s’arrêter pour le faire.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          {/* Comment ça se passe */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">Comment ça se passe</span>
              <span className="rule"></span>
            </div>
            <div className="case-steps">
              <div className="case-step">
                <div className="mandat-num">
                  <span>01</span>
                </div>
                <h3 className="mandat-title">
                  <span>20 minutes au téléphone — gratuit</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Vous me décrivez vos opérations et où ça coince. Je pose des
                    questions précises : combien d’heures, combien de personnes,
                    quel risque. Aucune préparation requise.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>02</span>
                </div>
                <h3 className="mandat-title">
                  <span>Vous repartez avec un plan honnête</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Quoi automatiser ou refondre en premier, l’effort réaliste,
                    et le rendement attendu. Si ça ne vaut pas la peine, je vous
                    le dis pendant l’appel — et on en reste là.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>03</span>
                </div>
                <h3 className="mandat-title">
                  <span>Si on avance : par petites tranches</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Jamais de « big bang ». Chaque tranche livrée est utilisée
                    et rentabilisée avant d’attaquer la suivante. Vous voyez la
                    valeur en semaines, pas en années.
                  </span>
                </p>
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
                    situation, chiffres à l’appui.
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
                            Un processus douloureux éliminé en 2 à 3 semaines :
                            double saisie, rapport manuel, synchronisation de
                            données. Portée fixe, prix fixe.
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
                            Le vieux logiciel remplacé morceau par morceau, en
                            tranches d’environ 6 000 $ — chacune livrée, utilisée
                            et rentabilisée avant la suivante. La plupart des
                            refontes complètes se situent entre 12 000 $ et
                            30 000 $.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Preuve */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">Sur le terrain</span>
              <div className="u-measure-prose">
                <span className="serif-muted">
                  Une épicerie du Québec a éliminé la mise à jour manuelle de
                  ses prix fournisseurs — 56 000 $ par année récupérés, sans
                  remplacer sa caisse, sans interruption.{" "}
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
                  <span>« On n’est pas une entreprise techno. »</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Parfait — c’est exactement pour vous. Vous parlez
                    opérations : commandes, factures, inventaire, paie. Je
                    traduis en système, sans jargon, et vous gardez le contrôle
                    des décisions.
                  </span>
                </p>
              </div>
              <div className="case-step">
                <div className="mandat-num">
                  <span>Q.</span>
                </div>
                <h3 className="mandat-title">
                  <span>« On a déjà quelqu’un en TI. »</span>
                </h3>
                <p className="mandat-text">
                  <span>
                    Très bien : il garde vos serveurs et vos postes en vie. Moi,
                    je m’occupe de ce qui n’est le mandat de personne — les
                    processus entre les systèmes, là où les heures se perdent.
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
                    que les tâches manuelles le mangent. Un sprint demande 2 à
                    3 heures de votre équipe au total — le reste, c’est moi.
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
                    ne me devez rien. Je ne prends que des mandats où le
                    rendement est démontrable — c’est aussi mon intérêt.
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
                  Décrivez-moi où votre équipe perd le plus de temps. Je vous
                  réponds sous 24 h avec de premières pistes — ou réservez
                  directement votre appel dans mon calendrier.
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
