import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { TrackedLink } from "@/components/TrackedLink";
import { absUrl, href, SITE } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { jsonLdLang, pageMetadata } from "@/lib/seo";

const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";
const PATH = "/guides/comparatif-logiciels-epicerie-quebec";

// Comparatif des systèmes de caisse/gestion pour épicerie au Québec.
// Trou de marché vérifié (2026-08) : le seul comparatif qui ranke est français
// (NF525, non pertinente au QC) ; les acteurs québécois n'ont que des pages
// produit. Faits sourcés depuis les sites officiels des éditeurs — aucune
// affirmation non vérifiée ; les revendications marketing sont attribuées
// (« se présente comme »). Cette page ne recommande PAS un éditeur : elle
// équipe le lecteur pour choisir, puis montre ce qu'aucune caisse ne règle
// (la synchronisation des prix fournisseurs → le cas + l'offre).

type Params = { params: Promise<{ locale: Locale }> };

type Faq = { q: string; a: string };
type Item = { title: string; text: string };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "guides.comparatifEpicerie.meta",
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

export default async function ComparatifEpiceriePage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("guides.comparatifEpicerie");
  const tc = await getTranslations("common.service");

  const url = absUrl(locale, PATH);
  const home = absUrl(locale, "/");
  const author = { "@type": "Person", name: "Gabriel Nadon", url: home };
  const listItems = t.raw("jsonld.listItems") as string[];

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
        "@type": "ItemList",
        name: t("jsonld.listName"),
        numberOfItems: listItems.length,
        itemListElement: listItems.map((name, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name,
        })),
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
            name: t("jsonld.breadcrumbParent"),
            item: absUrl(locale, "/logiciel-gestion-epicerie"),
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
    { href: href(locale, "/logiciel-gestion-epicerie"), label: t("nav.grocery") },
    { href: href(locale, "/", "cas"), label: t("nav.cases") },
    { href: href(locale, "/", "contact"), label: t("nav.contact") },
  ];

  const systems = t.raw("systems.items") as Item[];
  const paragraphs = t.raw("choose.paragraphs") as string[];

  // Les trois ressources du « point aveugle » : numéro, clé de message, lien.
  const RESOURCES = [
    {
      num: "I.",
      key: "case",
      link: (
        <a
          href={href(locale, "/cas/synchronisation-prix-fournisseurs")}
          className="link-serif"
        >
          {t("blind.case.link")}
        </a>
      ),
    },
    {
      num: "II.",
      key: "methods",
      link: (
        <a
          href={href(locale, "/guides/mise-a-jour-prix-fournisseurs")}
          className="link-serif"
        >
          {t("blind.methods.link")}
        </a>
      ),
    },
    {
      num: "III.",
      key: "template",
      link: (
        <TrackedLink
          event="gabarit_download"
          href="/gabarits/comparaison-prix-fournisseurs.xlsx"
          className="link-serif"
        >
          {t("blind.template.link")}
        </TrackedLink>
      ),
    },
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
                  <p className="money-plus">{t("hero.moneyPlus")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Les fiches */}
          <section className="section-method">
            <div className="method-head">
              <span className="eyebrow">{t("systems.eyebrow")}</span>
              <span className="rule"></span>
            </div>
            <div className="case-steps">
              {systems.map((s, i) => (
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

          {/* Comment choisir */}
          <section className="section u-pb-64">
            <div className="note-grid">
              <div>
                <div className="eyebrow u-mb-lg">{t("choose.eyebrow")}</div>
                <h2 className="h2-left u-measure-title">{t("choose.title")}</h2>
              </div>
              <div className="case-prose">
                {paragraphs.map((_, i) => (
                  <p key={i}>{t.rich(`choose.paragraphs.${i}`, { strong })}</p>
                ))}
              </div>
            </div>
          </section>

          {/* Ce qu'aucun ne règle */}
          <section className="note">
            <div className="section">
              <div className="note-grid">
                <div>
                  <div className="note-eyebrow">{t("blind.eyebrow")}</div>
                  <p className="note-quote">{t("blind.quote")}</p>
                  <p className="note-body">{t("blind.body")}</p>
                </div>
                <div className="principles">
                  {RESOURCES.map((r) => (
                    <div key={r.key} className="principle">
                      <div className="principle-head">
                        <span className="principle-num">
                          <span>{r.num}</span>
                        </span>
                        <div>
                          <h3 className="principle-title">
                            <span>{t(`blind.${r.key}.title`)}</span>
                          </h3>
                          <p className="principle-text">
                            <span>
                              {t(`blind.${r.key}.text`)} {r.link}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                    href={href(locale, "/logiciel-gestion-epicerie")}
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
