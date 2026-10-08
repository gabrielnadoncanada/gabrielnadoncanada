import type { ReactNode } from "react";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { ContactForm } from "@/components/ContactForm";
import { TrackedLink } from "@/components/TrackedLink";
import "@/app/home.css";

const SITE = "https://gabrielnadon.com";
const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";

type Item = { title: string; text: string };
type Link = { href: string; label: string };
type ServiceItem = { kind: string; title: string; text: string; href?: string };

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
  services?: { title: string; items: ServiceItem[] };
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

// Gabarit des pages de service : intention de recherche → problème →
// solution → démarche → preuve → prix → objections → CTA. Le contenu vit dans
// chaque page ; ce composant garantit la même structure, le même maillage et
// les mêmes données structurées (Service + FAQPage + BreadcrumbList).
// Styles : système .hm-* de app/home.css, partagé avec l'accueil.
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
      <div className="page hm svc">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
        />

        <Ticker lang={p.lang} />
        <SiteHeader brandHref="/" navItems={en ? NAV_EN : NAV_FR} ctaHref="#contact" lang={p.lang} />

        {/* Hero : reprend les mots de la recherche, puis la promesse */}
        <section className="hm-hero">
          <div className="hm-wrap hm-hero-grid">
            <div className="hm-hero-copy">
              <p className="hm-kicker">{p.eyebrow}</p>
              <h1 className="hm-h1 svc-h1">{p.title}</h1>
              <p className="hm-lead">{p.lead}</p>
              <div className="hm-cta">
                <a href="#contact" className="btn">
                  {en ? "Describe your process" : "Décrire mon processus"}
                  <Arrow />
                </a>
                <a href="#preuve" className="btn-link">
                  {en ? "See a real case" : "Voir un cas réel"}
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
                  {en ? (
                    <>
                      <strong>Gabriel Nadon</strong>, independent consultant in
                      Montreal. You talk to the person who builds it.
                    </>
                  ) : (
                    <>
                      <strong>Gabriel Nadon</strong>, consultant indépendant à
                      Montréal. Vous parlez à celui qui construit.
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="hm-sys-panel svc-box">
              <div className="hm-sys-head">
                <span className="hm-sys-title">
                  <span className="hm-live" aria-hidden="true"></span>
                  {p.box.kicker}
                </span>
              </div>
              <ul className="svc-box-list">
                {p.box.items.map((item) => (
                  <li key={item}>
                    <span className="hm-q-icon is-done" aria-hidden="true">
                      <Check />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Problème : faire reconnaître la situation */}
        <section className="hm-section">
          <div className="hm-wrap hm-split">
            <div>
              <p className="hm-kicker">{p.pains.eyebrow}</p>
              <h2 className="hm-h2">{p.pains.title}</h2>
              {p.pains.intro ? <p className="hm-sub svc-intro">{p.pains.intro}</p> : null}
            </div>
            <ul className="hm-pains">
              {p.pains.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Solution : la posture, puis les principes */}
        <section className="svc-dark">
          <div className="hm-wrap hm-split">
            <div>
              <p className="svc-dark-kicker">{p.approach.eyebrow}</p>
              <h2 className="svc-dark-quote">{p.approach.quote}</h2>
              <div className="svc-dark-body">{p.approach.body}</div>
            </div>
            <ul className="svc-principles">
              {p.approach.principles.map((pr) => (
                <li key={pr.title}>
                  <Check />
                  <div>
                    <h3>{pr.title}</h3>
                    <p>{pr.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Démarche : une vraie séquence */}
        <section className="hm-section" id="how">
          <div className="hm-wrap hm-split">
            <h2 className="hm-h2">{p.steps.eyebrow}</h2>
            <ol className="svc-steps">
              {p.steps.items.map((s, i) => (
                <li key={s.title}>
                  <span className="hm-step-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="hm-h3">{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Services liés (hub vers les pages sœurs) */}
        {p.services ? (
          <section className="hm-section hm-band">
            <div className="hm-wrap">
              <div className="hm-head">
                <h2 className="hm-h2">{p.services.title}</h2>
              </div>
              <ul className="hm-svcs">
                {p.services.items.map((s) => (
                  <li key={s.title} className={s.href ? "hm-svc" : "hm-svc svc-static"}>
                    <span className="hm-svc-kind">{s.kind}</span>
                    <h3 className="hm-svc-title">
                      {s.href ? <a href={s.href}>{s.title}</a> : s.title}
                    </h3>
                    <p className="hm-svc-text">{s.text}</p>
                    {s.href ? (
                      <span className="hm-svc-go" aria-hidden="true">
                        <Arrow />
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {p.extra}

        {/* Preuve et prix : uniquement du vérifiable */}
        <section className="hm-section" id="preuve">
          <div className="hm-wrap svc-facts" id="proof">
            <div className="svc-fact svc-fact-proof">
              <h2 className="hm-h3">{p.proof.label}</h2>
              <div className="svc-fact-body">{p.proof.body}</div>
            </div>
            <div className="svc-fact">
              <h2 className="hm-h3">{p.price.label}</h2>
              <div className="svc-fact-body">{p.price.body}</div>
            </div>
          </div>
        </section>

        {/* Objections */}
        <section className="hm-section hm-band" id="faq">
          <div className="hm-wrap hm-split">
            <h2 className="hm-h2">{p.faq.eyebrow}</h2>
            <div className="svc-faq">
              {p.faq.items.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>
                    <span>{f.q}</span>
                    <span className="svc-faq-icon" aria-hidden="true"></span>
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Maillage vers les pages sœurs et les ressources */}
        <section className="hm-section-tight svc-related">
          <div className="hm-wrap">
            <h2 className="hm-h3">{p.related.label}</h2>
            <div className="svc-related-links">
              {p.related.links.map((l) => (
                <a key={l.href} href={l.href} hrefLang={l.href.startsWith("/en/") ? "en" : undefined}>
                  {l.label}
                  <Arrow />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Conversion sur la page même */}
        <section className="hm-section hm-contact" id="contact">
          <div className="hm-wrap hm-contact-grid">
            <div>
              <p className="hm-kicker">{p.cta.eyebrow}</p>
              <h2 className="hm-h2">{p.cta.title}</h2>
              <p className="hm-lead">{p.cta.lead}</p>
              <p className="svc-cal">
                <TrackedLink event="clic_audit" href={CAL} target="_blank" rel="noopener">
                  {en ? "Or book your 20 minutes now" : "Ou réservez vos 20 minutes maintenant"}
                </TrackedLink>
              </p>
            </div>
            <div className="contact-card hm-form">
              <ContactForm withPhone lang={p.lang} defaultSujet={p.cta.sujet} />
            </div>
          </div>
        </section>

        <MinimalFooter lang={p.lang} />
      </div>
    </div>
  );
}
