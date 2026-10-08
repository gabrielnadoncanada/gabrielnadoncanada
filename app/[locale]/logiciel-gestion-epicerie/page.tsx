import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { TrackedLink } from "@/components/TrackedLink";
import { ContactForm } from "@/components/ContactForm";
import { absUrl, href } from "@/i18n/navigation";
import type { Locale, Pathname } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";
const PATHNAME = "/logiciel-gestion-epicerie" satisfies Pathname;

type Params = { params: Promise<{ locale: Locale }> };

// Page verticale « épicerie / dépanneur indépendant » — le persona le plus proche
// du cas prouvé (56 000 $/an). Double rôle : cible SEO (mots-clés « logiciel
// gestion épicerie », « gestion prix fournisseurs », « inventaire dépanneur »)
// ET landing du trafic payant. Contrairement à /diagnostic/, elle est INDEXABLE
// (canonical + présente dans sitemap.xml). Le formulaire réutilise le funnel
// complet : ContactForm → /api/contact → /merci/ (generate_lead).
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "epicerie.logiciel.meta" });
  const meta = pageMetadata({
    locale,
    pathname: PATHNAME,
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
    ogDescription: t("ogDescription"),
  });
  // La carte Twitter avait un titre et une description plus courts que l'OG.
  return {
    ...meta,
    twitter: {
      ...meta.twitter,
      title: t("twitterTitle"),
      description: t("twitterDescription"),
    },
  };
}

type Faq = { q: string; a: string };
type Tier = { price: string; title: string; text: string };

const em = (chunks: React.ReactNode) => <span className="italic">{chunks}</span>;

export default async function EpiceriePage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("epicerie.logiciel");

  const NAV = [
    { href: href(locale, "/", "approche"), label: t("nav.approach") },
    { href: href(locale, "/", "methode"), label: t("nav.method") },
    { href: href(locale, "/", "cas"), label: t("nav.cases") },
    { href: "#diagnostic", label: t("nav.diagnostic") },
  ];

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
        audience: {
          "@type": "BusinessAudience",
          audienceType: t("jsonld.audience"),
        },
        url,
      },
      {
        "@type": "FAQPage",
        mainEntity: (t.raw("jsonld.faq") as Faq[]).map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
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

  const pains = t.raw("pains.items") as string[];
  const tiers = t.raw("pricing.tiers") as Tier[];
  const faq = t.raw("faq.items") as Faq[];

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
            ctaHref="#diagnostic"
          />

          {/* Hero : le métier nommé, puis la preuve */}
          <section className="case-hero">
            <div className="case-hero-grid">
              <div>
                <div className="eyebrow" data-rise="50">
                  {t("hero.eyebrow")}
                </div>
                <h1 className="case-title u-mt-lg" data-rise="120">
                  {t.rich("hero.title", { em })}
                </h1>
                <p className="case-lead" data-rise="200">
                  {t("hero.lead")}
                </p>
                <div data-rise="240">
                  <a href="#diagnostic" className="btn-block">
                    {t("hero.button")} <span>→</span>
                  </a>
                  <p className="form-note">
                    {t.rich("hero.book", {
                      cal: (chunks) => (
                        <TrackedLink
                          event="clic_audit"
                          href={CAL}
                          target="_blank"
                          rel="noopener"
                        >
                          {chunks}
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
                <div className="eyebrow u-mb-lg">{t("pains.eyebrow")}</div>
                <h2 className="h2-left u-measure-title">{t("pains.title")}</h2>
                <p className="case-prose u-mt-lg">{t("pains.text")}</p>
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

          {/* Preuve → le cas complet (le « comment » détaillé vit dans le cas) */}
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

          {/* Prix transparents */}
          <section className="note">
            <div className="section">
              <div className="note-grid">
                <div>
                  <div className="note-eyebrow">{t("pricing.eyebrow")}</div>
                  <p className="note-quote">{t("pricing.quote")}</p>
                  <p className="note-body">{t("pricing.body")}</p>
                </div>
                <div className="principles">
                  {tiers.map((tier) => (
                    <div className="principle" key={tier.title}>
                      <div className="principle-head">
                        <span className="principle-num">
                          <span>{tier.price}</span>
                        </span>
                        <div>
                          <h3 className="principle-title">
                            <span>{tier.title}</span>
                          </h3>
                          <p className="principle-text">
                            <span>{tier.text}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Maillage : comparatif + guide prix fournisseurs */}
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">{t("links.label")}</span>
              <div className="u-measure-prose">
                <span className="serif-muted">{t("links.comparatif")} </span>
                <a
                  href={href(locale, "/guides/comparatif-logiciels-epicerie-quebec")}
                  className="link-serif"
                >
                  {t("links.comparatifLink")}
                </a>{" "}
                <span className="serif-muted">{t("links.prix")} </span>
                <a
                  href={href(locale, "/guides/mise-a-jour-prix-fournisseurs")}
                  className="link-serif"
                >
                  {t("links.prixLink")}
                </a>{" "}
                <span className="serif-muted">{t("links.also")} </span>
                <a
                  href={href(locale, "/guides/inventaire-epicerie-excel")}
                  className="link-serif"
                >
                  {t("links.inventaireLink")}
                </a>{" "}
                <a
                  href={href(locale, "/guides/calculer-marge-epicerie")}
                  className="link-serif"
                >
                  {t("links.margeLink")}
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
                <div className="case-step" key={f.q}>
                  <div className="mandat-num">
                    <span>Q.</span>
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
                <div className="contact-eyebrow">{t("form.eyebrow")}</div>
                <h2 className="contact-title">{t.rich("form.title", { em })}</h2>
                <p className="contact-lead">{t("form.lead")}</p>
                <p className="form-note">
                  <TrackedLink
                    event="clic_audit"
                    href={CAL}
                    target="_blank"
                    rel="noopener"
                  >
                    {t("form.book")}
                  </TrackedLink>
                </p>
              </div>
              <div className="cab-paper contact-card">
                <ContactForm withPhone />
              </div>
            </div>
          </section>

          <MinimalFooter />
        </div>
      </div>
    </div>
  );
}
