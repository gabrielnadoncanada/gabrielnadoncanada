"use client";

import { useEffect } from "react";

type NavItem = { href: string; label: string };

type Props = {
  brandHref: string;
  navItems: NavItem[];
  ctaHref: string;
  lang?: "fr" | "en";
};

export function SiteHeader({ brandHref, navItems, ctaHref, lang = "fr" }: Props) {
  const en = lang === "en";
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
            href={brandHref}
            aria-label="Gabriel Nadon — Systèmes opérationnels pour PME"
            className="cab-brand brand"
          >
            <span className="mark">
              <span className="mark-corner-tl" aria-hidden="true"></span>
              <span className="mark-corner-br" aria-hidden="true"></span>
              <span className="mark-gn">GN</span>
            </span>
            <span className="cab-brandname brand-text">
              <span className="brand-name">Gabriel Nadon</span>
              <span className="brand-sub">{en ? "AI & operations systems" : "Systèmes opérationnels"}</span>
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
          <a href={ctaHref} className="btn-sm">
            <span className="btn-cta-full">{en ? "Review my operations" : "Analyser mes opérations"}</span>
            <span className="btn-cta-short">{en ? "Let’s talk" : "Parlons-en"}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
