import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { QuizIA } from "@/components/QuizIA";
import { absUrl, href } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { jsonLdLang, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: Locale }> };
type Faq = { q: string; a: string };

// Auto-diagnostic interactif « votre PME est-elle prête pour l'IA ? ».
// Indexable — distinct de /diagnostic/ (landing payante noindex).
// Les statistiques citées : NETendances 2025 (Académie de la transformation
// numérique, U. Laval) et ISQ « Adoption et utilisation de l'IA dans les
// entreprises du Québec 2024-2025 ».
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quiz.meta" });
  return pageMetadata({
    locale,
    pathname: "/diagnostic-ia",
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
    ogDescription: t("ogDescription"),
  });
}

const italic = (chunks: React.ReactNode) => <span className="italic">{chunks}</span>;

export default async function DiagnosticIAPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("quiz");
  const tc = await getTranslations("common");

  const url = absUrl(locale, "/diagnostic-ia");
  const JSONLD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Quiz",
        name: t("jsonld.name"),
        description: t("jsonld.description"),
        educationalLevel: "beginner",
        inLanguage: jsonLdLang(locale),
        url,
        author: {
          "@type": "Person",
          name: "Gabriel Nadon",
          url: absUrl(locale, "/"),
        },
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

  return (
    <div id="dc-root">
      <div>
        <div className="page">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
          />

          <Ticker />
          <SiteHeader pathname="/diagnostic-ia" navItems={NAV} ctaHref="#test" />

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
                  <a href="#test" className="btn-block">
                    {t("page.cta")} <span>→</span>
                  </a>
                  <p className="form-note">{t("page.ctaNote")}</p>
                </div>
              </div>
              <div data-rise="280">
                <div className="money-box">
                  <div className="money-kicker">{t("page.gap.kicker")}</div>
                  <div className="money-fig">
                    <span className="num">{t("page.gap.num")}</span>
                    <span className="cur">{t("page.gap.cur")}</span>
                  </div>
                  <p className="money-sub">{t("page.gap.sub")}</p>
                  <p className="money-plus">{t("page.gap.plus")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Le test */}
          <section className="section-method" id="test">
            <div className="method-head">
              <span className="eyebrow">{t("page.testEyebrow")}</span>
              <span className="rule"></span>
            </div>
            <QuizIA />
          </section>

          {/* Pont vers le calculateur */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">{t("page.next.label")}</span>
              <div className="u-measure-prose">
                <span className="serif-muted">{t("page.next.text")} </span>
                <a href={href(locale, "/calculateur")} className="link-serif">
                  {t("page.next.link")}
                </a>
              </div>
            </div>
          </section>

          {/* Pont vers l'offre : ceux qui cherchent « IA pour PME » veulent
              souvent quelqu'un pour l'implanter, pas seulement un score. */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">{t("page.impl.label")}</span>
              <div className="u-measure-prose">
                <span className="serif-muted">{t("page.impl.text")} </span>
                <a href={href(locale, "/consultant-ia")} className="link-serif">
                  {t("page.impl.consultant")}
                </a>{" "}
                <span className="serif-muted">{t("page.impl.or")} </span>
                <a href={href(locale, "/agents-ia")} className="link-serif">
                  {t("page.impl.agents")}
                </a>{" "}
                <a href={href(locale, "/traitement-documents-ia")} className="link-serif">
                  {t("page.impl.documents")}
                </a>
              </div>
            </div>
          </section>

          <MinimalFooter />
        </div>
      </div>
    </div>
  );
}
