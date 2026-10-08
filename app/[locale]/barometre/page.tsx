import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { BarometreForm } from "@/components/BarometreForm";
import { absUrl, href } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { jsonLdLang, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: Locale }> };
type Step = { title: string; text: string };

// Baromètre IA & automatisation des PME du Québec — collecte de données
// originales (modèle « enquête annuelle » : la stat inédite est le format le
// plus cité par médias et moteurs IA). Réponses envoyées via /api/barometre.
// Stats de cadrage : NETendances 2025 (ATN/U. Laval) et ISQ 2024-2025.
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "barometre.meta" });
  return pageMetadata({
    locale,
    pathname: "/barometre",
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
    ogDescription: t("ogDescription"),
  });
}

const italic = (chunks: React.ReactNode) => <span className="italic">{chunks}</span>;

export default async function BarometrePage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("barometre");
  const tc = await getTranslations("common");

  const url = absUrl(locale, "/barometre");
  const JSONLD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: t("jsonld.name"),
        description: t("jsonld.description"),
        inLanguage: jsonLdLang(locale),
        url,
        author: {
          "@type": "Person",
          name: "Gabriel Nadon",
          url: absUrl(locale, "/"),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: tc("service.home"),
            item: absUrl(locale, "/"),
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

  const NAV = [
    { href: href(locale, "/", "methode"), label: tc("header.nav.method") },
    { href: href(locale, "/", "services"), label: tc("header.nav.services") },
    { href: href(locale, "/", "cas"), label: tc("header.nav.case") },
    { href: href(locale, "/", "contact"), label: tc("header.nav.contact") },
  ];

  const steps = t.raw("page.how.steps") as Step[];

  return (
    <div id="dc-root">
      <div>
        <div className="page">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
          />

          <Ticker />
          <SiteHeader pathname="/barometre" navItems={NAV} ctaHref="#participer" />

          {/* Hero */}
          <section className="case-hero">
            <div className="case-hero-grid">
              <div>
                <div className="eyebrow" data-rise="50">
                  {t("page.eyebrow")}
                </div>
                <h1 className="case-title u-mt-lg" data-rise="120">
                  {t.rich("page.title", { italic })}
                </h1>
                <p className="case-lead" data-rise="200">
                  {t("page.lead")}
                </p>
                <div data-rise="240">
                  <a href="#participer" className="btn-block">
                    {t("page.cta")} <span>→</span>
                  </a>
                  <p className="form-note">{t("page.ctaNote")}</p>
                </div>
              </div>
              <div data-rise="280">
                <div className="money-box">
                  <div className="money-kicker">{t("page.known.kicker")}</div>
                  <div className="money-fig">
                    <span className="num">{t("page.known.num")}</span>
                    <span className="cur">{t("page.known.cur")}</span>
                  </div>
                  <p className="money-sub">{t("page.known.sub")}</p>
                  <p className="money-plus">{t("page.known.plus")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pourquoi participer */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">{t("page.how.eyebrow")}</span>
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

          {/* Le sondage */}
          <section className="section" id="participer">
            <div className="contact-grid">
              <div>
                <div className="contact-eyebrow">{t("page.survey.eyebrow")}</div>
                <h2 className="contact-title">
                  {t.rich("page.survey.title", { italic })}
                </h2>
                <p className="contact-lead">{t("page.survey.lead")}</p>
              </div>
              <div className="cab-paper contact-card">
                <BarometreForm />
              </div>
            </div>
          </section>

          <MinimalFooter />
        </div>
      </div>
    </div>
  );
}
