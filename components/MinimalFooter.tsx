// Pied de page des pages internes : marque, services et outils gratuits
// (maillage interne vers les pages commerciales prioritaires).
import { useLocale, useTranslations } from "next-intl";
import { FREE_LINKS, SERVICE_LINKS } from "@/components/FooterLinks";
import { href } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function MinimalFooter() {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="cab-foot-grid footer-grid">
          <div>
            <a href={href(locale, "/")} className="footer-brand footer-brand-link">
              <div className="mark-lg">
                <span className="mark-gn-lg">GN</span>
              </div>
              <div>
                <div className="footer-name">Gabriel Nadon</div>
                <div className="footer-sub">{t("footer.sub")}</div>
              </div>
            </a>
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
            <div className="foot-label">{t("footer.freeShort")}</div>
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
          <a href={href(locale, "/")} className="cab-foot-link scp0 to-top">
            <span aria-hidden="true">←</span> {t("footer.home")}
          </a>
        </div>
      </div>
    </footer>
  );
}
