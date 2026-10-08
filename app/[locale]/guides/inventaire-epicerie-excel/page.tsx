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
const PATH: Pathname = "/guides/inventaire-epicerie-excel";

type Params = { params: Promise<{ locale: Locale }> };
type Faq = { q: string; a: string };
type Step = { title: string; text: string };

// Grappe épicerie — cible « inventaire épicerie excel », « gestion inventaire
// dépanneur ». Gabarit Excel réel en aimant, funnel vers la page verticale.
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guidesEpicerie.inventaire.meta" });
  const meta = pageMetadata({
    locale,
    pathname: PATH,
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
    ogDescription: t("ogDescription"),
    ogType: "article",
  });
  return {
    ...meta,
    twitter: { ...meta.twitter, title: t("twitterTitle"), description: t("twitterDescription") },
  };
}

const strong = (chunks: React.ReactNode) => <strong>{chunks}</strong>;

export default async function InventaireEpiceriePage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("guidesEpicerie.inventaire");
  const ts = await getTranslations("guidesEpicerie.shared");

  const url = absUrl(locale, PATH);
  const home = absUrl(locale, "/");
  const link = (pathname: Pathname) => (chunks: React.ReactNode) => (
    <a href={href(locale, pathname)} className="link-serif">
      {chunks}
    </a>
  );

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: t("jsonld.headline"),
        description: t("jsonld.description"),
        inLanguage: jsonLdLang(locale),
        author: { "@type": "Person", name: "Gabriel Nadon", url: home },
        publisher: { "@type": "Person", name: "Gabriel Nadon", url: home },
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
          { "@type": "ListItem", position: 1, name: ts("breadcrumb.home"), item: home },
          {
            "@type": "ListItem",
            position: 2,
            name: ts("breadcrumb.epicerie"),
            item: absUrl(locale, "/logiciel-gestion-epicerie"),
          },
          { "@type": "ListItem", position: 3, name: t("jsonld.breadcrumb"), item: url },
        ],
      },
    ],
  };

  const nav = [
    { href: href(locale, "/logiciel-gestion-epicerie"), label: ts("nav.epicerie") },
    { href: href(locale, "/", "cas"), label: ts("nav.cas") },
    { href: href(locale, "/", "contact"), label: ts("nav.contact") },
  ];

  const steps = t.raw("method.steps") as Step[];

  return (
    <div id="dc-root">
      <div>
        <div className="page">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
          />

          <Ticker />
          <SiteHeader
            pathname={PATH}
            brandHref={href(locale, "/")}
            navItems={nav}
            ctaHref={href(locale, "/", "contact")}
          />

          {/* Hero + gabarit */}
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
                <div data-rise="240">
                  <TrackedLink
                    event="gabarit_download"
                    href="/gabarits/inventaire-epicerie.xlsx"
                    className="btn-block"
                  >
                    {t("hero.download")} <span>→</span>
                  </TrackedLink>
                  <p className="form-note">{t("hero.downloadNote")}</p>
                </div>
              </div>
              <div data-rise="280">
                <div className="money-box">
                  <div className="money-kicker">{t("box.kicker")}</div>
                  <div className="money-fig">
                    <span className="num">{t("box.num")}</span>
                    <span className="cur">{t("box.cur")}</span>
                  </div>
                  <p className="money-sub">{t("box.sub")}</p>
                  <p className="money-plus">{t("box.plus")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* La méthode */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">{t("method.eyebrow")}</span>
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
                    <span>
                      {t.rich(`method.steps.${i}.text`, {
                        prix: link("/guides/mise-a-jour-prix-fournisseurs"),
                      })}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Les limites */}
          <section className="section u-pb-64">
            <div className="note-grid">
              <div>
                <div className="eyebrow u-mb-lg">{t("limits.eyebrow")}</div>
                <h2 className="h2-left u-measure-title">{t("limits.title")}</h2>
              </div>
              <div className="case-prose">
                <p>{t.rich("limits.p1", { strong })}</p>
                <p>
                  {t.rich("limits.p2", {
                    cas: link("/cas/synchronisation-prix-fournisseurs"),
                  })}
                </p>
              </div>
            </div>
          </section>

          {/* Maillage grappe */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">{t("more.label")}</span>
              <div className="u-measure-prose">
                <span className="serif-muted">{t("more.lead1")} </span>
                <a
                  href={href(locale, "/guides/comparatif-logiciels-epicerie-quebec")}
                  className="link-serif"
                >
                  {t("more.link1")}
                </a>{" "}
                <span className="serif-muted">{t("more.lead2")} </span>
                <a href={href(locale, "/calculateur")} className="link-serif">
                  {t("more.link2")}
                </a>
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
                    {ts("book")} <span>→</span>
                  </TrackedLink>
                  <a
                    href={href(locale, "/logiciel-gestion-epicerie")}
                    className="scp5 contact-link u-mt-sm"
                  >
                    <span>
                      <span className="kv-label-block">{ts("sectorLabel")}</span>
                      <span className="icon-16">{ts("sectorText")}</span>
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
