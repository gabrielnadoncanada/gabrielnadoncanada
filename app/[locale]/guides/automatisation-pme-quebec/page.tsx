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
const PATH = "/guides/automatisation-pme-quebec";

// Guide pilier « automatisation des processus — PME québécoises ». Page mère
// du maillage : calculateur, diagnostic IA, cas, comparatif épicerie, guides.
// Faits sourcés (vérifiés 2026-08-21) : FCEI × Investissement Québec 2025
// (productivité = motivation nº 1, 81 % ; pénurie citée par 59 %) ; ISQ
// 2024-2025 (12,7 % des entreprises utilisent l'IA) ; programmes ESSOR
// (page officielle IQ — 1A 50 %/50 k$, 1B 50 %/20 k$, 1C 50 %/50 k$, ouverts
// jusqu'au 31 mars 2027, admissibilité 1B/1C : ≤ 250 employés et CA ≥ 2,5 M$),
// C3I (fiche officielle, actif jusqu'à fin 2029), PME MTL (max 50 k$ / 80 %),
// MFOR (généralement jusqu'à 50 % des dépenses admissibles). PCAN : fermé.

type Params = { params: Promise<{ locale: Locale }> };

type Faq = { q: string; a: string };
type Item = { title: string; text: string };
type NumItem = { num: string; title: string; text: string };

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
  const t = await getTranslations({ locale, namespace: "guides.automatisationPme.meta" });
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

export default async function GuideAutomatisationPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("guides.automatisationPme");
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
            name: t("jsonld.breadcrumb"),
            item: url,
          },
        ],
      },
    ],
  };

  const NAV = [
    { href: href(locale, "/", "approche"), label: t("nav.approach") },
    { href: href(locale, "/calculateur"), label: t("nav.calculator") },
    { href: href(locale, "/", "cas"), label: t("nav.cases") },
    { href: href(locale, "/", "contact"), label: t("nav.contact") },
  ];

  const step2 = t.raw("step2.items") as Item[];
  const tiers = t.raw("step3.tiers") as NumItem[];
  const aides = t.raw("step4.items") as NumItem[];

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

          {/* Hero */}
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
                  {t("hero.lead")}
                </p>
              </div>
              <div data-rise="280">
                <div className="money-box">
                  <div className="money-kicker">{t("hero.moneyKicker")}</div>
                  <div className="money-fig">
                    <span className="num">{t("hero.moneyNum")}</span>
                    <span className="cur">{t("hero.moneyCur")}</span>
                  </div>
                  <p className="money-sub">{t("hero.moneySub")}</p>
                  <p className="money-plus">
                    <a
                      href={href(locale, "/cas/synchronisation-prix-fournisseurs")}
                      className="link-serif"
                    >
                      {t("hero.moneyLink")}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Étape 1 : chiffrer */}
          <section className="section u-pb-64">
            <div className="note-grid">
              <div>
                <div className="eyebrow u-mb-lg">{t("step1.eyebrow")}</div>
                <h2 className="h2-left u-measure-title">{t("step1.title")}</h2>
              </div>
              <div className="case-prose">
                <p>{t.rich("step1.p1", { strong })}</p>
                <p>
                  {t.rich("step1.p2", {
                    calc: (c) => (
                      <a href={href(locale, "/calculateur")} className="link-serif">
                        {c}
                      </a>
                    ),
                    gabarit: (c) => (
                      <TrackedLink
                        event="gabarit_download"
                        href="/gabarits/matrice-priorisation-automatisations.xlsx"
                        className="link-serif"
                      >
                        {c}
                      </TrackedLink>
                    ),
                  })}
                </p>
              </div>
            </div>
          </section>

          {/* Étape 2 : les 6 processus */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">{t("step2.eyebrow")}</span>
              <span className="rule"></span>
            </div>
            <div className="case-steps">
              {step2.map((s, i) => (
                <div key={s.title} className="case-step">
                  <div className="mandat-num">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mandat-title">
                    <span>{s.title}</span>
                  </h3>
                  <p className="mandat-text">
                    <span>
                      {t.rich(`step2.items.${i}.text`, {
                        guide: (c) => (
                          <a
                            href={href(locale, "/guides/mise-a-jour-prix-fournisseurs")}
                            className="link-serif"
                          >
                            {c}
                          </a>
                        ),
                      })}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Étape 3 : combien ça coûte */}
          <section className="note">
            <div className="section">
              <div className="note-grid">
                <div>
                  <div className="note-eyebrow">{t("step3.eyebrow")}</div>
                  <p className="note-quote">{t("step3.quote")}</p>
                  <p className="note-body">
                    {t.rich("step3.body", {
                      cout: (c) => (
                        <a
                          href={href(
                            locale,
                            "/guides/combien-coute-automatisation-pme-quebec"
                          )}
                          className="link-serif"
                        >
                          {c}
                        </a>
                      ),
                    })}
                  </p>
                </div>
                <div className="principles">
                  {tiers.map((p) => (
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

          {/* Étape 4 : subventions */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">{t("step4.eyebrow")}</span>
              <span className="rule"></span>
            </div>
            <div className="case-steps">
              {aides.map((a) => (
                <div key={a.num} className="case-step">
                  <div className="mandat-num">
                    <span>{a.num}</span>
                  </div>
                  <h3 className="mandat-title">
                    <span>{a.title}</span>
                  </h3>
                  <p className="mandat-text">
                    <span>{a.text}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Pont diagnostic IA */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">{t("ai.label")}</span>
              <div className="u-measure-prose">
                <span className="serif-muted">{t("ai.text")} </span>
                <a href={href(locale, "/diagnostic-ia")} className="link-serif">
                  {t("ai.link")}
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
