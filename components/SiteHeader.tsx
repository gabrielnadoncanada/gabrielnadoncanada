"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { href, otherLocale } from "@/i18n/navigation";
import type { Locale, Pathname } from "@/i18n/routing";

type NavItem = { href: string; label: string };

type Props = {
  /** Chemin interne de la page courante : sert au lien vers l'autre langue. */
  pathname: Pathname;
  /** Liens déjà localisés (passer par href() de @/i18n/navigation). */
  navItems: NavItem[];
  ctaHref: string;
  /** Lien de la marque ; par défaut l'accueil de la langue courante. */
  brandHref?: string;
};

export function SiteHeader({ pathname, navItems, ctaHref, brandHref }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common.header");
  const other = otherLocale(locale);

  // Header rétractable au défilement (ajoute .is-scrolled après 8px).
  useEffect(() => {
    const header = document.querySelector(".cab-header");
    if (!header) return;
    const onScroll = () =>
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="cab-header header-bar">
      <div className="cab-headinner header-inner">
        <div className="flex-center">
          <a
            href={brandHref ?? href(locale, "/")}
            aria-label={t("brandLabel")}
            className="cab-brand brand"
          >
            <span className="mark">
              <span className="mark-gn">GN</span>
            </span>
            <span className="cab-brandname brand-text">
              <span className="brand-name">Gabriel Nadon</span>
              <span className="brand-sub">{t("brandSub")}</span>
            </span>
          </a>
        </div>
        <nav className="nav-group">
          <span className="cab-navlinks nav-group">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="cab-navlink scp0 link-quiet"
              >
                <span>{item.label}</span>
              </a>
            ))}
          </span>
          <a
            href={href(other, pathname)}
            hrefLang={other}
            lang={other}
            className="lang-switch"
            aria-label={t("switchAria")}
          >
            {other.toUpperCase()}
          </a>
          <a href={ctaHref} className="btn-sm">
            <span className="btn-cta-full">{t("cta")}</span>
            <span className="btn-cta-short">{t("ctaShort")}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
