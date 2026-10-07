import type { Metadata } from "next";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";

export const metadata: Metadata = {
  title: "Page introuvable | Gabriel Nadon",
  robots: { index: false, follow: true },
};

const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/cas/synchronisation-prix-fournisseurs/", label: "Cas concret" },
  { href: "/#contact", label: "Contact" },
];

// 404 utile : au lieu d'un cul-de-sac en anglais, les pages qui servent.
export default function NotFound() {
  return (
    <div id="dc-root">
      <div>
        <div className="page">
          <div className="cab-grain" aria-hidden="true"></div>
          <Ticker />
          <SiteHeader brandHref="/" navItems={NAV} ctaHref="/#contact" />
          <section className="case-hero">
            <div>
              <div className="eyebrow">Erreur 404</div>
              <h1 className="case-title u-mt-lg">
                Cette page n’existe pas{" "}
                <span className="italic">— ou plus.</span>
              </h1>
              <p className="case-lead">
                Le lien est peut-être ancien. Voici ce que les visiteurs
                cherchent le plus souvent :
              </p>
            </div>
          </section>
          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">Services</span>
              <div className="sectors-list">
                <a href="/consultant-ia/" className="serif-muted link-serif">
                  <span>Consultant IA pour PME</span>
                </a>
                <a href="/automatisation-processus/" className="serif-muted link-serif">
                  <span>Automatisation des processus</span>
                </a>
                <a href="/traitement-documents-ia/" className="serif-muted link-serif">
                  <span>Traitement de factures et documents</span>
                </a>
                <a href="/logiciel-sur-mesure/" className="serif-muted link-serif">
                  <span>Logiciel sur mesure</span>
                </a>
                <a href="/" className="serif-muted link-serif">
                  <span>Accueil</span>
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
