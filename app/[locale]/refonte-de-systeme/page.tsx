import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { TrackedLink } from "@/components/TrackedLink";
import { absUrl, href } from "@/i18n/navigation";
import type { Locale, Pathname } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: Locale }> };

const PATHNAME = "/refonte-de-systeme" satisfies Pathname;
const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "refonte.systeme.meta" });
  const meta = pageMetadata({
    locale,
    pathname: PATHNAME,
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
    ogDescription: t("ogDescription"),
  });
  // La carte Twitter avait une description plus courte que l'OG : on la garde.
  return {
    ...meta,
    twitter: { ...meta.twitter, description: t("twitterDescription") },
  };
}

type Item = { title: string; text: string };

const ROMAN = ["I.", "II.", "III."];

const em = (chunks: React.ReactNode) => <span className="italic">{chunks}</span>;

export default async function RefontePage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("refonte.systeme");

  const NAV = [
    { href: href(locale, "/", "approche"), label: t("nav.approach") },
    { href: href(locale, "/", "methode"), label: t("nav.method") },
    { href: href(locale, "/", "cas"), label: t("nav.cases") },
    { href: href(locale, "/", "contact"), label: t("nav.contact") },
  ];
  // Formulaire de la home, sujet « refonte » présélectionné.
  const contactRefonte = `${href(locale, "/")}?sujet=refonte#contact`;

  const home = absUrl(locale, "/");
  const url = absUrl(locale, PATHNAME);
  const JSONLD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: t("jsonld.name"),
        serviceType: t("jsonld.serviceType"),
        description: t("jsonld.description"),
        provider: {
          "@type": "Person",
          name: "Gabriel Nadon",
          url: home,
        },
        areaServed: "Québec",
        url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: t("jsonld.home"),
            item: home,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t("jsonld.crumb"),
            item: url,
          },
        ],
      },
    ],
  };

  const risks = t.raw("risks.items") as string[];
  const pains = t.raw("pains.items") as string[];
  const principles = t.raw("why.principles") as Item[];
  const steps = t.raw("steps.items") as Item[];

  return (
    <div id="dc-root">
      <div>
        <div className="page">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
          />

          <Ticker />
          <SiteHeader
            pathname={PATHNAME}
            brandHref={href(locale, "/")}
            navItems={NAV}
            ctaHref={contactRefonte}
          />

          {/* Hero : la douleur d'abord */}
          <section className="case-hero">
            <div className="case-hero-grid">
              <div>
                <div className="eyebrow" data-rise="50">
                  {t("hero.eyebrow")}
                </div>
                <h1
                  className="case-title u-mt-lg"
                  data-rise="120"
                >
                  {t.rich("hero.title", { em })}
                </h1>
                <p className="case-lead" data-rise="200">
                  {t("hero.lead")}
                </p>
              </div>
              <div data-rise="280">
                <div className="money-box">
                  <div className="money-kicker">{t("risks.kicker")}</div>
                  <div className="u-mt-md">
                    {risks.map((r) => (
                      <div className="risk-item" key={r}>
                        <span className="rmark">→</span>
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Les signes qui font mal */}
          <section
            className="section u-pb-64"
          >
            <div className="note-grid">
              <div>
                <div className="eyebrow u-mb-lg">
                  {t("pains.eyebrow")}
                </div>
                <h2 className="h2-left u-measure-title">
                  {t("pains.title")}
                </h2>
                <p className="case-prose u-mt-lg">
                  {t("pains.text")}
                </p>
              </div>
              <ul className="pain-list">
                {pains.map((p) => (
                  <li className="pain-item" key={p}>
                    <span className="pain-mark"></span>
                    <p className="pain-text">{p}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Pourquoi les refontes échouent */}
          <section className="note">
            <div className="section">
              <div className="note-grid">
                <div>
                  <div className="note-eyebrow">{t("why.eyebrow")}</div>
                  <p className="note-quote">{t("why.quote")}</p>
                  <p className="note-body">{t("why.body")}</p>
                </div>
                <div className="principles">
                  {principles.map((p, i) => (
                    <div className="principle" key={p.title}>
                      <div className="principle-head">
                        <span className="principle-num">
                          <span>{ROMAN[i]}</span>
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

          {/* La démarche */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">{t("steps.eyebrow")}</span>
              <span className="rule"></span>
            </div>
            <div className="case-steps">
              {steps.map((s, i) => (
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

          {/* Preuve */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">{t("proof.label")}</span>
              <div className="u-measure-prose">
                <span className="serif-muted">{t("proof.case")} </span>
                <a
                  href={href(locale, "/cas/synchronisation-prix-fournisseurs")}
                  className="link-serif"
                >
                  {t("proof.caseLink")}
                </a>{" "}
                <span className="serif-muted">{t("proof.custom")} </span>
                <a href={href(locale, "/logiciel-sur-mesure")} className="link-serif">
                  {t("proof.customLink")}
                </a>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="section">
            <div className="contact-grid">
              <div>
                <div className="contact-eyebrow">{t("cta.eyebrow")}</div>
                <h2 className="contact-title">{t.rich("cta.title", { em })}</h2>
                <p className="contact-lead">{t("cta.lead")}</p>
              </div>
              <div className="cab-paper contact-card">
                <div className="contact-list">
                  <a href={contactRefonte} className="btn-block">
                    {t("cta.button")} <span>→</span>
                  </a>
                  <TrackedLink
                    event="clic_audit"
                    href={CAL}
                    target="_blank"
                    rel="noopener"
                    className="scp5 contact-link u-mt-sm"
                  >
                    <span>
                      <span className="kv-label-block">{t("cta.direct")}</span>
                      <span className="icon-16">{t("cta.calendly")}</span>
                    </span>
                    <span className="icon-18">→</span>
                  </TrackedLink>
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
