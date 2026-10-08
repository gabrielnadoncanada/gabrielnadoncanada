import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { ContactForm, type SujetKey } from "@/components/ContactForm";
import { TrackedLink } from "@/components/TrackedLink";
import { absUrl, href } from "@/i18n/navigation";
import type { Locale, Pathname } from "@/i18n/routing";
import { jsonLdLang } from "@/lib/seo";
import "@/app/home.css";

const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";

type Item = { title: string; text: string };
type Link = { href: string; label: string };
type ServiceItem = { kind: string; title: string; text: string; href?: string };

export type ServicePageProps = {
  /** Chemin interne (clé de routing.pathnames), ex. "/consultant-ia". */
  pathname: Pathname;
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
  cta: { eyebrow: string; title: ReactNode; lead: string; sujet: SujetKey };
  /** Liens déjà localisés (href() de @/i18n/navigation). */
  related: { label: string; links: Link[] };
};

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
  const locale = useLocale() as Locale;
  const t = useTranslations("common");
  const url = absUrl(locale, p.pathname);
  // Un lien connexe vers l'autre langue est marqué hrefLang (exigé par verify).
  const linkLang = (h: string) => {
    const target = h.startsWith("/en/") ? "en" : "fr";
    return target === locale ? undefined : target;
  };
  const nav = [
    { href: href(locale, "/", "methode"), label: t("header.nav.method") },
    { href: href(locale, "/", "services"), label: t("header.nav.services") },
    { href: href(locale, "/cas/synchronisation-prix-fournisseurs"), label: t("header.nav.case") },
    { href: "#contact", label: t("header.nav.contact") },
  ];
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
        inLanguage: jsonLdLang(locale),
        provider: { "@id": "https://gabrielnadon.com/#gabriel" },
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
          { "@type": "ListItem", position: 1, name: t("service.home"), item: absUrl(locale, "/") },
          { "@type": "ListItem", position: 2, name: p.breadcrumb, item: url },
        ],
      },
    ],
  };

  return (
    <div id="dc-root">
      <div className="page hm svc">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
        />

        <Ticker />
        <SiteHeader pathname={p.pathname} navItems={nav} ctaHref="#contact" />

        {/* Hero : reprend les mots de la recherche, puis la promesse */}
        <section className="hm-hero">
          <div className="hm-wrap hm-hero-grid">
            <div className="hm-hero-copy">
              <p className="hm-kicker">{p.eyebrow}</p>
              <h1 className="hm-h1 svc-h1">{p.title}</h1>
              <p className="hm-lead">{p.lead}</p>
              <div className="hm-cta">
                <a href="#contact" className="btn">
                  {t("service.ctaPrimary")}
                  <Arrow />
                </a>
                <a href="#preuve" className="btn-link">
                  {t("service.ctaProof")}
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
                  {t.rich("service.who", {
                    strong: (chunks) => <strong>{chunks}</strong>,
                  })}
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
                <a key={l.href} href={l.href} hrefLang={linkLang(l.href)}>
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
                  {t("service.calendly")}
                </TrackedLink>
              </p>
            </div>
            <div className="contact-card hm-form">
              <ContactForm withPhone defaultSujet={p.cta.sujet} />
            </div>
          </div>
        </section>

        <MinimalFooter />
      </div>
    </div>
  );
}
