import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { TrackedLink } from "@/components/TrackedLink";
import { absUrl, href } from "@/i18n/navigation";
import type { Locale, Pathname } from "@/i18n/routing";
import { jsonLdLang, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: Locale }> };

const PATHNAME = "/cas/synchronisation-prix-fournisseurs" satisfies Pathname;
const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cas.prixFournisseurs.meta" });
  const meta = pageMetadata({
    locale,
    pathname: PATHNAME,
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
    ogDescription: t("ogDescription"),
    ogType: "article",
  });
  // La carte Twitter avait une description plus courte que l'OG : on la garde.
  return {
    ...meta,
    twitter: { ...meta.twitter, description: t("twitterDescription") },
  };
}

type Stat = { num: string; unit: string; label: string };
type Item = { title: string; text: string };

const ROMAN = ["I.", "II.", "III."];

// Pont vers les pages de service (clé common.links → page).
const SECTORS: Array<{ key: string; pathname: Pathname }> = [
  { key: "documents", pathname: "/traitement-documents-ia" },
  { key: "automatisation", pathname: "/automatisation-processus" },
  { key: "logiciel", pathname: "/logiciel-sur-mesure" },
];

const em = (chunks: React.ReactNode) => <span className="italic">{chunks}</span>;
const strong = (chunks: React.ReactNode) => <strong>{chunks}</strong>;

export default async function CasPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cas.prixFournisseurs");
  const tl = await getTranslations("common.links");

  const NAV = [
    { href: href(locale, "/", "approche"), label: t("nav.approach") },
    { href: href(locale, "/", "methode"), label: t("nav.method") },
    { href: href(locale, "/", "cas"), label: t("nav.cases") },
    { href: href(locale, "/", "contact"), label: t("nav.contact") },
  ];

  const home = absUrl(locale, "/");
  const url = absUrl(locale, PATHNAME);
  const JSONLD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: t("jsonld.headline"),
        description: t("jsonld.description"),
        inLanguage: jsonLdLang(locale),
        author: {
          "@type": "Person",
          name: "Gabriel Nadon",
          url: home,
        },
        publisher: {
          "@type": "Person",
          name: "Gabriel Nadon",
          url: home,
        },
        mainEntityOfPage: url,
        image: "https://gabrielnadon.com/og-image.png",
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
            name: t("jsonld.cases"),
            item: absUrl(locale, "/", "cas"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: t("jsonld.crumb"),
            item: url,
          },
        ],
      },
    ],
  };

  const stats = t.raw("stats") as Stat[];
  const steps = t.raw("steps.items") as Item[];
  const principles = t.raw("note.principles") as Item[];
  const cur = t("money.cur");

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
            ctaHref={href(locale, "/", "contact")}
          />

          {/* Hero : l'argent d'abord */}
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
                  <div className="money-kicker">{t("money.kicker")}</div>
                  <div className="money-fig">
                    <span className="num">{t("money.num")}</span>
                    {cur ? <span className="cur">{cur}</span> : null}
                  </div>
                  <p className="money-sub">{t("money.sub")}</p>
                  <p className="money-plus">{t("money.plus")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Chiffres */}
          <section className="band">
            <div className="wrap">
              <div className="cab-proof stats-grid">
                {stats.map((s) => (
                  <div className="stat" key={s.label}>
                    <div className="tick"></div>
                    <div className="stat-num">
                      <span className="tnum">{s.num}</span>
                      <span className="stat-unit">
                        <span>{s.unit}</span>
                      </span>
                    </div>
                    <div className="stat-label">
                      <span>{s.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Le problème, en dollars */}
          <section
            className="section u-pb-64"
          >
            <div className="note-grid">
              <div>
                <div className="eyebrow u-mb-lg">
                  {t("problem.eyebrow")}
                </div>
                <h2 className="h2-left u-measure-title">
                  {t("problem.title")}
                </h2>
              </div>
              <div className="case-prose">
                <p>{t("problem.p1")}</p>
                <p>{t.rich("problem.p2", { strong })}</p>
              </div>
            </div>
          </section>

          {/* Ce qu'on a fait */}
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

          {/* Le point large */}
          <section className="note">
            <div className="section">
              <div className="note-grid">
                <div>
                  <div className="note-eyebrow">{t("note.eyebrow")}</div>
                  <p className="note-quote">{t("note.quote")}</p>
                  <p className="note-body">{t("note.body")}</p>
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

          {/* Pont vers les pages de service (intention commerciale) */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">{t("sectors.label")}</span>
              <div className="sectors-list">
                {SECTORS.map((s) => (
                  <a
                    key={s.key}
                    href={href(locale, s.pathname)}
                    className="serif-muted link-serif"
                  >
                    <span>{tl(s.key)}</span>
                  </a>
                ))}
                <a
                  href={href(locale, "/logiciel-gestion-epicerie")}
                  className="serif-muted link-serif"
                >
                  <span>{t("sectors.epicerie")}</span>
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
                  <a href={href(locale, "/", "contact")} className="btn-block">
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
