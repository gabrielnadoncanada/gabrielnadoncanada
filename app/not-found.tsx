import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { SiteDocument, siteMetadata, siteViewport } from "@/components/SiteDocument";
import { SERVICE_LINKS } from "@/components/FooterLinks";
import { CLIENT_NAMESPACES, loadMessages } from "@/i18n/request";
import { href } from "@/i18n/navigation";
import "./fonts.css";
import "./globals.css";
import "./home.css";

// 404 de l'export statique (404.html) : servie pour toute URL inconnue, en
// français ou en anglais — le contenu principal est en français, avec une
// sortie claire vers le site anglais.
export const metadata: Metadata = {
  ...siteMetadata,
  title: "Page introuvable | Page not found — Gabriel Nadon",
  robots: { index: false, follow: true },
};
export const viewport = siteViewport;

export default async function NotFound() {
  const locale = "fr";
  setRequestLocale(locale);
  const all = await loadMessages(locale);
  const messages = Object.fromEntries(CLIENT_NAMESPACES.map((ns) => [ns, all[ns]]));
  const t = await getTranslations({ locale, namespace: "common" });
  const tEn = await getTranslations({ locale: "en", namespace: "common" });
  const nav = [
    { href: href(locale, "/", "services"), label: t("header.nav.services") },
    { href: href(locale, "/cas/synchronisation-prix-fournisseurs"), label: t("header.nav.case") },
    { href: href(locale, "/", "contact"), label: t("header.nav.contact") },
  ];

  return (
    <SiteDocument locale={locale} messages={messages}>
      <div id="dc-root">
        <div className="page hm">
          <Ticker />
          <SiteHeader pathname="/" navItems={nav} ctaHref={href(locale, "/", "contact")} />
          <section className="hm-hero">
            <div className="hm-wrap">
              <p className="hm-kicker">{t("notFound.kicker")}</p>
              <h1 className="hm-h1 svc-h1">{t("notFound.heading")}</h1>
              <p className="hm-lead">{t("notFound.lead")}</p>
              <div className="svc-related-links" style={{ marginTop: 32 }}>
                {SERVICE_LINKS.map((l) => (
                  <a key={l.pathname} href={href(locale, l.pathname)}>
                    {t(`links.${l.label}`)}
                  </a>
                ))}
                <a href={href(locale, "/")}>{t("notFound.home")}</a>
              </div>
              <p className="hm-lead" lang="en" style={{ marginTop: 48 }}>
                {tEn("notFound.heading")}{" "}
                <a className="link-inline" href={href("en", "/")} hrefLang="en">
                  {tEn("notFound.english")}
                </a>
              </p>
            </div>
          </section>
          <MinimalFooter />
        </div>
      </div>
    </SiteDocument>
  );
}
