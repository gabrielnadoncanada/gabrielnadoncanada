import type { ReactNode } from "react";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { ContactForm } from "@/components/ContactForm";
import { TrackedLink } from "@/components/TrackedLink";

const SITE = "https://gabrielnadon.com";
const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";

type Item = { title: string; text: string };
type Link = { href: string; label: string };

export type ServicePageProps = {
  lang?: "fr" | "en";
  path: string;
  breadcrumb: string;
  service: { name: string; type: string; description: string };
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  box: { kicker: string; items: string[] };
  pains: { eyebrow: string; title: string; intro?: string; items: string[] };
  approach: { eyebrow: string; quote: string; body: ReactNode; principles: Item[] };
  steps: { eyebrow: string; items: Item[] };
  extra?: ReactNode;
  proof: { label: string; body: ReactNode };
  price: { label: string; body: ReactNode };
  faq: { eyebrow: string; items: Array<{ q: string; a: string }> };
  cta: { eyebrow: string; title: ReactNode; lead: string; sujet: string };
  related: { label: string; links: Link[] };
};

const NAV_FR = [
  { href: "/#methode", label: "Méthode" },
  { href: "/#services", label: "Services" },
  { href: "/cas/synchronisation-prix-fournisseurs/", label: "Cas concret" },
  { href: "#contact", label: "Contact" },
];

const NAV_EN = [
  { href: "#how", label: "How it works" },
  { href: "#proof", label: "Proof" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const ROMAN = ["I.", "II.", "III.", "IV."];

// Gabarit des pages de service : intention de recherche → problème →
// solution → preuve → prix → objections → CTA. Le contenu vit dans chaque
// page ; ce composant garantit la même structure, le même maillage et les
// mêmes données structurées (Service + FAQPage + BreadcrumbList).
export function ServicePage(p: ServicePageProps) {
  const en = p.lang === "en";
  const url = `${SITE}${p.path}`;
  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: p.service.name,
        serviceType: p.service.type,
        description: p.service.description,
        url,
        inLanguage: en ? "en-CA" : "fr-CA",
        provider: { "@id": `${SITE}/#gabriel` },
        areaServed: { "@type": "AdministrativeArea", name: "Québec" },
        availableLanguage: ["fr-CA", "en-CA"],
      },
      {
        "@type": "FAQPage",
        mainEntity: p.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: en ? "Home" : "Accueil", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: p.breadcrumb, item: url },
        ],
      },
    ],
  };

  return (
    <div id="dc-root" lang={en ? "en" : undefined}>
      <div>
        <div className="page">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
          />
          <div className="cab-grain" aria-hidden="true"></div>

          <Ticker lang={p.lang} />
          <SiteHeader brandHref="/" navItems={en ? NAV_EN : NAV_FR} ctaHref="#contact" lang={p.lang} />

          {/* Hero : reprend les mots de la recherche, puis la promesse */}
          <section className="case-hero">
            <div className="case-hero-grid">
              <div>
                <div className="eyebrow" data-rise="50">
                  {p.eyebrow}
                </div>
                <h1 className="case-title u-mt-lg" data-rise="120">
                  {p.title}
                </h1>
                <p className="case-lead" data-rise="200">
                  {p.lead}
                </p>
                <div className="hero-cta" data-rise="260">
                  <a href="#contact" className="btn">
                    {en ? "Describe your process" : "Décrire mon processus"} <span>→</span>
                  </a>
                  <a href="#preuve" className="btn-link">
                    {en ? "See a real case" : "Voir un cas réel"}
                  </a>
                </div>
              </div>
              <div data-rise="280">
                <div className="money-box">
                  <div className="money-kicker">{p.box.kicker}</div>
                  <div className="u-mt-md">
                    {p.box.items.map((item) => (
                      <div className="risk-item" key={item}>
                        <span className="rmark">→</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Problème : faire reconnaître la situation */}
          <section className="section u-pb-64">
            <div className="note-grid">
              <div>
                <div className="eyebrow u-mb-lg">{p.pains.eyebrow}</div>
                <h2 className="h2-left u-measure-title">{p.pains.title}</h2>
                {p.pains.intro ? <p className="case-prose u-mt-lg">{p.pains.intro}</p> : null}
              </div>
              <ul className="pain-list">
                {p.pains.items.map((item) => (
                  <li className="pain-item" key={item}>
                    <span className="pain-mark" aria-hidden="true"></span>
                    <p className="pain-text">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Solution : la posture, puis les principes */}
          <section className="note">
            <div className="section">
              <div className="note-grid">
                <div>
                  <div className="note-eyebrow">{p.approach.eyebrow}</div>
                  <h2 className="note-quote">{p.approach.quote}</h2>
                  <div className="note-body">{p.approach.body}</div>
                </div>
                <div className="principles">
                  {p.approach.principles.map((pr, i) => (
                    <div className="principle" key={pr.title}>
                      <div className="principle-head">
                        <span className="principle-num">
                          <span>{ROMAN[i]}</span>
                        </span>
                        <div>
                          <h3 className="principle-title">
                            <span>{pr.title}</span>
                          </h3>
                          <p className="principle-text">
                            <span>{pr.text}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Démarche */}
          <section className="section-method" id="how">
            <div className="method-head">
              <h2 className="eyebrow">{p.steps.eyebrow}</h2>
              <span className="rule"></span>
            </div>
            <div className="case-steps">
              {p.steps.items.map((s, i) => (
                <div className="case-step" key={s.title}>
                  <div className="mandat-num">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mandat-title">
                    <span>{s.title}</span>
                  </h3>
                  <p className="mandat-text">
                    <span>{s.text}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {p.extra}

          {/* Preuve : uniquement du vérifiable */}
          <section className="bb" id="preuve">
            <div className="sectors" id="proof">
              <span className="sectors-label">{p.proof.label}</span>
              <div className="u-measure-prose">{p.proof.body}</div>
            </div>
          </section>

          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">{p.price.label}</span>
              <div className="u-measure-prose">{p.price.body}</div>
            </div>
          </section>

          {/* Objections */}
          <section className="section-method" id="faq">
            <div className="method-head">
              <h2 className="eyebrow">{p.faq.eyebrow}</h2>
              <span className="rule"></span>
            </div>
            <div className="case-steps">
              {p.faq.items.map((f) => (
                <div className="case-step" key={f.q}>
                  <div className="mandat-num">
                    <span>Q.</span>
                  </div>
                  <h3 className="mandat-title">
                    <span>{f.q}</span>
                  </h3>
                  <p className="mandat-text">
                    <span>{f.a}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Maillage vers les pages sœurs et les ressources */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">{p.related.label}</span>
              <div className="sectors-list">
                {p.related.links.map((l) => (
                  <a key={l.href} href={l.href} className="serif-muted link-serif">
                    <span>{l.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Conversion sur la page même */}
          <section className="section" id="contact">
            <div className="contact-grid">
              <div>
                <div className="contact-eyebrow">{p.cta.eyebrow}</div>
                <h2 className="contact-title">{p.cta.title}</h2>
                <p className="contact-lead">{p.cta.lead}</p>
                <p className="form-note">
                  <TrackedLink event="clic_audit" href={CAL} target="_blank" rel="noopener">
                    {en ? "Book my 20 minutes now →" : "Réserver mes 20 minutes maintenant →"}
                  </TrackedLink>
                </p>
              </div>
              <div className="cab-paper contact-card">
                <ContactForm withPhone lang={p.lang} defaultSujet={p.cta.sujet} />
              </div>
            </div>
          </section>

          <MinimalFooter lang={p.lang} />
        </div>
      </div>
    </div>
  );
}
