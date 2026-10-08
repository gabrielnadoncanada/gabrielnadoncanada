import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { TrackedLink } from "@/components/TrackedLink";
import { absUrl, href, SITE } from "@/i18n/navigation";
import type { Locale, Pathname } from "@/i18n/routing";
import { jsonLdLang, pageMetadata } from "@/lib/seo";

const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";
const PATH = "/guides/combien-coute-automatisation-pme-quebec";

// Page réponse « combien ça coûte » — format optimisé pour la citation par
// les moteurs IA : réponse directe en tête, listes, FAQPage, date de mise à
// jour visible. Toutes les fourchettes tierces ont été vérifiées à la source
// le 2026-08-21 (IASolutionQC, Automathing, ChatGPT.ca, Shortkut) ; les prix
// « Gabriel Nadon » sont ceux publiés ailleurs sur le site.

type Params = { params: Promise<{ locale: Locale }> };

type Faq = { q: string; a: string };
type Item = { title: string; text: string };

// Pont vers les pages de service (libellés : common.links.*).
const SERVICES: Array<{ key: string; pathname: Pathname }> = [
  { key: "automatisation", pathname: "/automatisation-processus" },
  { key: "documents", pathname: "/traitement-documents-ia" },
  { key: "agentsIa", pathname: "/agents-ia" },
  { key: "logiciel", pathname: "/logiciel-sur-mesure" },
  { key: "consultantIa", pathname: "/consultant-ia" },
];

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "guides.coutAutomatisation.meta",
  });
  return pageMetadata({
    locale,
    pathname: PATH,
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
    ogDescription: t("ogDescription"),
    ogType: "article",
  });
}

const strong = (chunks: React.ReactNode) => <strong>{chunks}</strong>;

export default async function CoutAutomatisationPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("guides.coutAutomatisation");
  const tl = await getTranslations("common.links");
  const tc = await getTranslations("common.service");

  const url = absUrl(locale, PATH);
  const home = absUrl(locale, "/");
  const author = { "@type": "Person", name: "Gabriel Nadon", url: home };

  const JSONLD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: t("jsonld.headline"),
        description: t("jsonld.description"),
        inLanguage: jsonLdLang(locale),
        dateModified: "2026-08-21",
        author,
        publisher: author,
        mainEntityOfPage: url,
        image: `${SITE}/og-image.png`,
      },
      {
        "@type": "FAQPage",
        mainEntity: (t.raw("jsonld.faq") as Faq[]).map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: tc("home"), item: home },
          {
            "@type": "ListItem",
            position: 2,
            name: t("jsonld.breadcrumbGuide"),
            item: absUrl(locale, "/guides/automatisation-pme-quebec"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: t("jsonld.breadcrumb"),
            item: url,
          },
        ],
      },
    ],
  };

  const NAV = [
    { href: href(locale, "/guides/automatisation-pme-quebec"), label: t("nav.guide") },
    { href: href(locale, "/calculateur"), label: t("nav.calculator") },
    { href: href(locale, "/", "contact"), label: t("nav.contact") },
  ];

  const ranges = t.raw("ranges.items") as Item[];

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
            pathname={PATH}
            brandHref={href(locale, "/")}
            navItems={NAV}
            ctaHref={href(locale, "/", "contact")}
          />

          {/* Hero : la réponse directe, tout de suite */}
          <section className="case-hero">
            <div className="case-hero-grid">
              <div>
                <div className="eyebrow" data-rise="50">
                  {t("hero.eyebrow")}
                </div>
                <h1 className="case-title u-mt-lg" data-rise="120">
                  {t("hero.title")}{" "}
                  <span className="italic">{t("hero.titleItalic")}</span>
                </h1>
                <p className="case-lead" data-rise="200">
                  {t.rich("hero.lead", { strong })}
                </p>
              </div>
              <div data-rise="280">
                <div className="money-box">
                  <div className="money-kicker">{t("hero.moneyKicker")}</div>
                  <div className="money-fig">
                    <span className="num">&lt; 12</span>
                    <span className="cur">{t("hero.moneyCur")}</span>
                  </div>
                  <p className="money-sub">{t("hero.moneySub")}</p>
                  <p className="money-plus">
                    <a href={href(locale, "/calculateur")} className="link-serif">
                      {t("hero.moneyLink")}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Les fourchettes */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">{t("ranges.eyebrow")}</span>
              <span className="rule"></span>
            </div>
            <div className="case-steps">
              {ranges.map((r, i) => (
                <div key={r.title} className="case-step">
                  <div className="mandat-num">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mandat-title">
                    <span>{r.title}</span>
                  </h3>
                  <p className="mandat-text">
                    <span>{r.text}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Ce qui fait varier + subventions */}
          <section className="section u-pb-64">
            <div className="note-grid">
              <div>
                <div className="eyebrow u-mb-lg">{t("factors.eyebrow")}</div>
                <h2 className="h2-left u-measure-title">{t("factors.title")}</h2>
              </div>
              <div className="case-prose">
                <p>{t.rich("factors.p1", { strong })}</p>
                <p>
                  {t.rich("factors.p2", {
                    strong,
                    guide: (c) => (
                      <a
                        href={href(locale, "/guides/automatisation-pme-quebec")}
                        className="link-serif"
                      >
                        {c}
                      </a>
                    ),
                  })}
                </p>
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
                  {t("proof.link")}
                </a>
              </div>
            </div>
          </section>

          {/* Pont vers les pages de service (intention commerciale) */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">{t("services.label")}</span>
              <div className="sectors-list">
                {SERVICES.map((s) => (
                  <a
                    key={s.key}
                    href={href(locale, s.pathname)}
                    className="serif-muted link-serif"
                  >
                    <span>{tl(s.key)}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="section">
            <div className="contact-grid">
              <div>
                <div className="contact-eyebrow">{t("cta.eyebrow")}</div>
                <h2 className="contact-title">
                  {t("cta.title")}{" "}
                  <span className="italic">{t("cta.titleItalic")}</span>
                </h2>
                <p className="contact-lead">{t("cta.lead")}</p>
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
                    {t("cta.book")} <span>→</span>
                  </TrackedLink>
                  <a
                    href={href(locale, "/calculateur")}
                    className="scp5 contact-link u-mt-sm"
                  >
                    <span>
                      <span className="kv-label-block">{t("cta.altLabel")}</span>
                      <span className="icon-16">{t("cta.altText")}</span>
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
