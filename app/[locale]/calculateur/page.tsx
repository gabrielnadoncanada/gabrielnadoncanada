import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { TrackedLink } from "@/components/TrackedLink";
import { Calculateur } from "@/components/Calculateur";
import { absUrl, href } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { jsonLdLang, pageMetadata } from "@/lib/seo";

const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";

type Params = { params: Promise<{ locale: Locale }> };
type Faq = { q: string; a: string };
type Step = { title: string; text: string };

// Outil interactif — aimant à trafic et à leads. Indexable. Le calcul reprend
// exactement la logique du diagnostic (heures × personnes × taux × 50 sem.)
// et les prix publiés du site (sprint dès 4 500 $).
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "calculateur.meta" });
  return pageMetadata({
    locale,
    pathname: "/calculateur",
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
    ogDescription: t("ogDescription"),
  });
}

const italic = (chunks: React.ReactNode) => <span className="italic">{chunks}</span>;

export default async function CalculateurPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("calculateur");
  const tc = await getTranslations("common");

  const url = absUrl(locale, "/calculateur");
  const JSONLD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: t("jsonld.appName"),
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
        description: t("jsonld.appDescription"),
        url,
        inLanguage: jsonLdLang(locale),
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
            name: t("jsonld.appName"),
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

  const steps = t.raw("page.read.steps") as Step[];

  return (
    <div id="dc-root">
      <div>
        <div className="page">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
          />

          <Ticker />
          <SiteHeader pathname="/calculateur" navItems={NAV} ctaHref="#calculateur" />

          {/* Hero + outil */}
          <section className="case-hero" id="calculateur">
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
                <p className="case-prose u-mt-lg" data-rise="240">
                  {t.rich("page.proof", {
                    a: (chunks) => (
                      <a
                        href={href(locale, "/cas/synchronisation-prix-fournisseurs")}
                        className="link-serif"
                      >
                        {chunks}
                      </a>
                    ),
                  })}
                </p>
              </div>
              <div data-rise="280">
                <Calculateur />
              </div>
            </div>
          </section>

          {/* Gabarit Excel */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">{t("page.excel.label")}</span>
              <div className="u-measure-prose">
                <span className="serif-muted">{t("page.excel.text")} </span>
                <TrackedLink
                  event="gabarit_download"
                  href="/gabarits/cout-travail-manuel.xlsx"
                  className="link-serif"
                >
                  {t("page.excel.link")}
                </TrackedLink>
              </div>
            </div>
          </section>

          {/* Comment lire le résultat */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">{t("page.read.eyebrow")}</span>
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

          {/* CTA */}
          <section className="section">
            <div className="contact-grid">
              <div>
                <div className="contact-eyebrow">{t("page.cta.eyebrow")}</div>
                <h2 className="contact-title">
                  {t.rich("page.cta.title", { italic })}
                </h2>
                <p className="contact-lead">{t("page.cta.lead")}</p>
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
                    {t("page.cta.book")} <span>→</span>
                  </TrackedLink>
                  <a
                    href={href(locale, "/", "contact")}
                    className="scp5 contact-link u-mt-sm"
                  >
                    <span>
                      <span className="kv-label-block">{t("page.cta.writeLabel")}</span>
                      <span className="icon-16">{t("page.cta.write")}</span>
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
