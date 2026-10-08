import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { TrackedLink } from "@/components/TrackedLink";
import { ContactForm } from "@/components/ContactForm";
import { absUrl, href } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { jsonLdLang, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: Locale }> };

const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";

type Step = { title: string; text: string };
type Price = { num: string; title: string; text: string };
type Faq = { q: string; a: string };

// Landing dédiée au trafic payant (Google Ads / Meta). Volontairement non
// indexée : le message et les prix peuvent évoluer au rythme des campagnes
// sans interférer avec le référencement des pages organiques.
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "diagnostic.meta" });
  return pageMetadata({
    locale,
    pathname: "/diagnostic",
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
    ogDescription: t("ogDescription"),
    noindex: true,
  });
}

const italic = (c: React.ReactNode) => <span className="italic">{c}</span>;

export default async function DiagnosticPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("diagnostic");

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t("jsonld.name"),
    serviceType: t("jsonld.serviceType"),
    description: t("jsonld.description"),
    provider: {
      "@type": "Person",
      name: "Gabriel Nadon",
      url: absUrl(locale, "/"),
    },
    areaServed: t("jsonld.areaServed"),
    url: absUrl(locale, "/diagnostic"),
    inLanguage: jsonLdLang(locale),
  };

  const signs = t.raw("signs.items") as string[];
  const steps = t.raw("method.steps") as Step[];
  const prices = t.raw("prices.items") as Price[];
  const faq = t.raw("faq.items") as Faq[];

  return (
    <div id="dc-root">
      <div>
        <div className="page">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
          />

          <Ticker />
          {/* Pas de navigation : une landing payante n'offre qu'une sortie — le diagnostic. */}
          <SiteHeader
            pathname="/diagnostic"
            brandHref={href(locale, "/diagnostic")}
            navItems={[]}
            ctaHref="#diagnostic"
          />

          {/* Hero : la douleur, puis la promesse */}
          <section className="case-hero">
            <div className="case-hero-grid">
              <div>
                <div className="eyebrow" data-rise="50">
                  {t("hero.eyebrow")}
                </div>
                <h1 className="case-title u-mt-lg" data-rise="120">
                  {t.rich("hero.title", { italic })}
                </h1>
                <p className="case-lead" data-rise="200">
                  {t("hero.lead")}
                </p>
                <div data-rise="240">
                  <a href="#diagnostic" className="btn-block">
                    {t("hero.cta")} <span>→</span>
                  </a>
                  <p className="form-note">
                    {t.rich("hero.orCal", {
                      cal: (c) => (
                        <TrackedLink
                          event="clic_audit"
                          href={CAL}
                          target="_blank"
                          rel="noopener"
                        >
                          {c}
                        </TrackedLink>
                      ),
                    })}
                  </p>
                </div>
              </div>
              <div data-rise="280">
                <div className="money-box">
                  <div className="money-kicker">{t("money.kicker")}</div>
                  <div className="money-fig">
                    <span className="num">{t("money.num")}</span>
                    <span className="cur">{t("money.cur")}</span>
                  </div>
                  <p className="money-sub">{t("money.sub")}</p>
                  <p className="money-plus">{t("money.plus")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Les signes */}
          <section className="section u-pb-64">
            <div className="note-grid">
              <div>
                <div className="eyebrow u-mb-lg">{t("signs.eyebrow")}</div>
                <h2 className="h2-left u-measure-title">{t("signs.title")}</h2>
                <p className="case-prose u-mt-lg">{t("signs.prose")}</p>
              </div>
              <ul className="pain-list">
                {signs.map((s) => (
                  <li key={s} className="pain-item">
                    <span className="pain-mark"></span>
                    <p className="pain-text">{s}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Comment ça se passe */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">{t("method.eyebrow")}</span>
              <span className="rule"></span>
            </div>
            <div className="case-steps">
              {steps.map((s, i) => (
                <div key={s.title} className="case-step">
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

          {/* Prix transparents */}
          <section className="note">
            <div className="section">
              <div className="note-grid">
                <div>
                  <div className="note-eyebrow">{t("prices.eyebrow")}</div>
                  <p className="note-quote">{t("prices.quote")}</p>
                  <p className="note-body">{t("prices.body")}</p>
                </div>
                <div className="principles">
                  {prices.map((p) => (
                    <div key={p.title} className="principle">
                      <div className="principle-head">
                        <span className="principle-num">
                          <span>{p.num}</span>
                        </span>
                        <div>
                          <h3 className="principle-title">
                            <span>{p.title}</span>
                          </h3>
                          <p className="principle-text">
                            <span>{p.text}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Preuve */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">{t("proof.label")}</span>
              <div className="u-measure-prose">
                <span className="serif-muted">{t("proof.text")} </span>
                <a
                  href={href(locale, "/cas/synchronisation-prix-fournisseurs")}
                  className="link-serif"
                >
                  {t("proof.cta")}
                </a>
              </div>
            </div>
          </section>

          {/* Objections */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">{t("faq.eyebrow")}</span>
              <span className="rule"></span>
            </div>
            <div className="case-steps">
              {faq.map((f) => (
                <div key={f.q} className="case-step">
                  <div className="mandat-num">
                    <span>{t("faq.mark")}</span>
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

          {/* Formulaire */}
          <section className="section" id="diagnostic">
            <div className="contact-grid">
              <div>
                <div className="contact-eyebrow">{t("contact.eyebrow")}</div>
                <h2 className="contact-title">
                  {t.rich("contact.title", { italic })}
                </h2>
                <p className="contact-lead">{t("contact.lead")}</p>
                <p className="form-note">
                  <TrackedLink
                    event="clic_audit"
                    href={CAL}
                    target="_blank"
                    rel="noopener"
                  >
                    {t("contact.cal")}
                  </TrackedLink>
                </p>
              </div>
              <div className="cab-paper contact-card">
                <ContactForm withPhone defaultSujet="diagnostic" />
              </div>
            </div>
          </section>

          <MinimalFooter />
        </div>
      </div>
    </div>
  );
}
