import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { TrackedLink } from "@/components/TrackedLink";
import { ConversionPing } from "@/components/ConversionPing";
import { href } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: Locale }> };

const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";

// Page de confirmation post-formulaire. C'est ici que l'événement GA4
// `generate_lead` est déclenché — le point de conversion unique importé dans
// Google Ads / Meta. Jamais indexée, jamais dans le sitemap.
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "merci.meta" });
  return pageMetadata({
    locale,
    pathname: "/merci",
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
    ogDescription: t("ogDescription"),
    noindex: true,
    nofollow: true,
  });
}

const italic = (c: React.ReactNode) => <span className="italic">{c}</span>;

export default async function MerciPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("merci");

  return (
    <div id="dc-root">
      <div>
        <div className="page">
          <ConversionPing />

          <Ticker />
          <SiteHeader
            pathname="/merci"
            brandHref={href(locale, "/")}
            navItems={[]}
            ctaHref={CAL}
          />

          <section className="case-hero">
            <div className="case-hero-grid">
              <div>
                <div className="eyebrow" data-rise="50">
                  {t("hero.eyebrow")}
                </div>
                <h1 className="case-title u-mt-lg" data-rise="120">
                  {t.rich("hero.title", { italic })}
                </h1>
                <p className="case-lead" data-rise="200">
                  {t("hero.lead")}
                </p>
                {/* Même message dans l'autre langue, pour le prospect qui l'a choisie. */}
                <p className="form-note" lang={locale === "fr" ? "en" : "fr"}>
                  {t("hero.otherLang")}
                </p>
              </div>
              <div data-rise="280">
                <div className="cab-paper contact-card">
                  <div className="contact-list">
                    <div className="contact-row">
                      <span>
                        <span className="kv-label-block">{t("card.label")}</span>
                        <span className="icon-16">{t("card.text")}</span>
                      </span>
                    </div>
                    <TrackedLink
                      event="clic_audit"
                      href={CAL}
                      target="_blank"
                      rel="noopener"
                      className="btn-block"
                    >
                      {t("card.cta")} <span>→</span>
                    </TrackedLink>
                    <p className="form-note">{t("card.note")}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">{t("wait.label")}</span>
              <div className="u-measure-prose">
                <span className="serif-muted">{t("wait.text")} </span>
                <a
                  href={href(locale, "/cas/synchronisation-prix-fournisseurs")}
                  className="link-serif"
                >
                  {t("wait.cta")}
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
