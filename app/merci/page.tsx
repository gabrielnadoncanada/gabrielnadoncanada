import type { Metadata } from "next";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { TrackedLink } from "@/components/TrackedLink";
import { ConversionPing } from "@/components/ConversionPing";

const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";

// Page de confirmation post-formulaire. C'est ici que l'événement GA4
// `generate_lead` est déclenché — le point de conversion unique importé dans
// Google Ads / Meta. Jamais indexée, jamais dans le sitemap.
export const metadata: Metadata = {
  title: "Demande reçue | Gabriel Nadon",
  description:
    "Votre demande est bien reçue. Réponse sous 24 h — ou réservez directement vos 20 minutes de diagnostic.",
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Gabriel Nadon",
    title: "Demande reçue",
    description: "Votre demande est bien reçue. Réponse sous 24 h.",
    url: "https://gabrielnadon.com/merci/",
    locale: "fr_CA",
    images: [
      {
        url: "https://gabrielnadon.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gabriel Nadon — Conseiller, Systèmes & IA",
      },
    ],
  },
};

export default function MerciPage() {
  return (
    <div id="dc-root">
      <div>
        <div className="page">
          <ConversionPing />
          <div className="cab-grain" aria-hidden="true"></div>

          <Ticker />
          <SiteHeader brandHref="/" navItems={[]} ctaHref={CAL} />

          <section className="case-hero">
            <div className="case-hero-grid">
              <div>
                <div className="eyebrow" data-rise="50">
                  Demande reçue
                </div>
                <h1
                  className="case-title"
                  data-rise="120"
                  style={{ marginTop: "22px" }}
                >
                  C’est noté. Je vous réponds{" "}
                  <span className="italic">sous 24 heures.</span>
                </h1>
                <p className="case-lead" data-rise="200">
                  Une confirmation vient de partir dans votre boîte courriel
                  (vérifiez vos indésirables au besoin). Je lis chaque demande
                  moi-même et je reviens vers vous avec de premières pistes —
                  pas un courriel automatique de plus.
                </p>
              </div>
              <div data-rise="280">
                <div className="cab-paper contact-card">
                  <div className="contact-list">
                    <div className="contact-row">
                      <span>
                        <span className="kv-label-block">
                          Envie d’aller plus vite ?
                        </span>
                        <span className="icon-16">
                          Choisissez votre plage de 20 minutes tout de suite
                        </span>
                      </span>
                    </div>
                    <TrackedLink
                      event="clic_audit"
                      href={CAL}
                      target="_blank"
                      rel="noopener"
                      className="scp2 btn-block"
                    >
                      Réserver mes 20 minutes <span>→</span>
                    </TrackedLink>
                    <p className="form-note">
                      Gratuit, sans obligation. Vous repartez avec les gestes à
                      poser en premier — que l’on travaille ensemble ou non.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bb">
            <div className="sectors">
              <span className="sectors-label">En attendant</span>
              <div style={{ maxWidth: "62ch" }}>
                <span className="serif-muted">
                  Voyez comment une épicerie du Québec a récupéré 56 000 $ par
                  année en éliminant une seule tâche manuelle.{" "}
                </span>
                <a
                  href="/cas/synchronisation-prix-fournisseurs/"
                  className="scp5"
                  style={{
                    fontSize: "clamp(16px, 1.8vw, 20px)",
                    fontFamily: "Spectral, serif",
                    color: "rgb(23, 24, 27)",
                    textDecoration: "underline 1px rgb(185, 176, 154)",
                    textUnderlineOffset: "5px",
                  }}
                >
                  Lire le cas →
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
