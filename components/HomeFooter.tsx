import { useLocale, useTranslations } from "next-intl";
import { quarterParts } from "@/components/Ticker";
import { FREE_LINKS, SERVICE_LINKS } from "@/components/FooterLinks";
import { href, otherLocale } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function HomeFooter() {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");
  const quarter = t("ticker.quarter", quarterParts());
  const other = otherLocale(locale);
  const nav = [
    { href: "#probleme", label: t("header.nav.situation") },
    { href: "#methode", label: t("header.nav.method") },
    { href: "#services", label: t("header.nav.services") },
    { href: href(locale, "/cas/synchronisation-prix-fournisseurs"), label: t("footer.cases") },
    { href: "#contact", label: t("header.nav.contact") },
  ];

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="cab-foot-grid footer-grid footer-grid--4">
          <div>
            <div className="footer-brand">
              <div className="mark-lg">
                <span className="mark-gn-lg">GN</span>
              </div>
              <div>
                <div className="footer-name">Gabriel Nadon</div>
                <div className="footer-sub">{t("footer.sub")}</div>
              </div>
            </div>
            <p className="footer-desc">{t("footer.desc")}</p>
            <div className="foot-label footer-contact-label">{t("footer.contact")}</div>
            <a
              href="mailto:bonjour@gabrielnadon.com"
              className="cab-foot-link scp5 footer-email"
            >
              bonjour<span>@</span>gabrielnadon.com
            </a>
            <div className="footer-avail">
              <span className="dot-live-sm"></span>
              <span className="txt-sm-gray">{t("footer.available", { quarter })}</span>
            </div>
            <div className="txt-sm-gray-mt">{t("footer.location")}</div>
            <div className="foot-label-social">{t("footer.social")}</div>
            <div className="social-row">
              <a
                href="https://www.linkedin.com/in/gabrielnadoncanada/"
                rel="me noopener"
                target="_blank"
                className="cab-foot-link scp5 link-quiet"
              >
                LinkedIn
              </a>
              <a
                href="https://www.facebook.com/gabriel.nadon.2025"
                rel="me noopener"
                target="_blank"
                className="cab-foot-link scp5 link-quiet"
              >
                Facebook
              </a>
            </div>
          </div>
          <div>
            <div className="foot-label">{t("footer.navigation")}</div>
            <nav className="footer-nav">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="cab-foot-link scp0 foot-nav-link">
                  {n.label}
                </a>
              ))}
            </nav>
          </div>
          <div>
            <div className="foot-label">{t("footer.services")}</div>
            <nav className="footer-nav">
              {SERVICE_LINKS.map((l) => (
                <a
                  key={l.pathname}
                  href={href(locale, l.pathname)}
                  className="cab-foot-link scp0 foot-nav-link"
                >
                  {t(`links.${l.label}`)}
                </a>
              ))}
            </nav>
          </div>
          <div>
            <div className="foot-label">{t("footer.free")}</div>
            <nav className="footer-nav">
              {FREE_LINKS.map((l) => (
                <a
                  key={l.pathname}
                  href={href(locale, l.pathname)}
                  className="cab-foot-link scp0 foot-nav-link"
                >
                  {t(`links.${l.label}`)}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="copyright">
            © {new Date().getFullYear()} Gabriel Nadon · {t("footer.rights")}
          </span>
          <a
            href={href(other, "/")}
            hrefLang={other}
            lang={other}
            className="cab-foot-link scp0 to-top"
          >
            {t("footer.language")}
          </a>
        </div>
      </div>
    </footer>
  );
}
