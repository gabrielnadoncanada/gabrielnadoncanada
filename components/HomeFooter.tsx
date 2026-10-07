import { currentQuarter } from "@/components/Ticker";

export function HomeFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="cab-foot-grid footer-grid">
          <div>
            <div className="footer-brand">
              <div className="mark-lg">
                <span className="mark-corner-tl-lg"></span>
                <span className="mark-corner-br-lg"></span>
                <span className="mark-gn-lg">GN</span>
              </div>
              <div>
                <div className="footer-name">Gabriel Nadon</div>
                <div className="footer-sub">
                  Systèmes opérationnels · PME
                </div>
              </div>
            </div>
            <p className="footer-desc">
              Je remplace les suivis manuels des PME — Excel, courriels,
              logiciels mal adaptés — par des systèmes qui centralisent
              l&apos;information et font une partie du travail.
            </p>
          </div>

          <div>
            <div className="foot-label">Navigation</div>
            <nav className="footer-nav">
              <a href="#probleme" className="cab-foot-link scp0 foot-nav-link">
                <span>La situation</span>
              </a>
              <a href="#methode" className="cab-foot-link scp0 foot-nav-link">
                <span>Méthode</span>
              </a>
              <a href="#services" className="cab-foot-link scp0 foot-nav-link">
                <span>Services</span>
              </a>
              <a
                href="/cas/synchronisation-prix-fournisseurs/"
                className="cab-foot-link scp0 foot-nav-link"
              >
                <span>Cas concrets</span>
              </a>
              <a href="#contact" className="cab-foot-link scp0 foot-nav-link">
                <span>Contact</span>
              </a>
            </nav>
            <div className="foot-label" style={{ marginTop: "24px" }}>
              Services
            </div>
            <nav className="footer-nav">
              <a href="/consultant-ia/" className="cab-foot-link scp0 foot-nav-link">
                <span>Consultant IA pour PME</span>
              </a>
              <a href="/agents-ia/" className="cab-foot-link scp0 foot-nav-link">
                <span>Agents IA</span>
              </a>
              <a href="/traitement-documents-ia/" className="cab-foot-link scp0 foot-nav-link">
                <span>Traitement de factures et documents</span>
              </a>
              <a href="/automatisation-processus/" className="cab-foot-link scp0 foot-nav-link">
                <span>Automatisation des processus</span>
              </a>
              <a href="/logiciel-sur-mesure/" className="cab-foot-link scp0 foot-nav-link">
                <span>Logiciel sur mesure</span>
              </a>
              <a href="/refonte-de-systeme/" className="cab-foot-link scp0 foot-nav-link">
                <span>Refonte de système</span>
              </a>
              <a href="/en/ai-consultant/" hrefLang="en" className="cab-foot-link scp0 foot-nav-link">
                <span>AI consultant (English)</span>
              </a>
            </nav>
            <div className="foot-label" style={{ marginTop: "24px" }}>
              Guides &amp; outils gratuits
            </div>
            <nav className="footer-nav">
              <a href="/calculateur/" className="cab-foot-link scp0 foot-nav-link">
                <span>Calculateur du travail manuel</span>
              </a>
              <a href="/diagnostic-ia/" className="cab-foot-link scp0 foot-nav-link">
                <span>Test « prête pour l’IA ? »</span>
              </a>
              <a
                href="/guides/automatisation-pme-quebec/"
                className="cab-foot-link scp0 foot-nav-link"
              >
                <span>Guide : automatiser sa PME</span>
              </a>
              <a
                href="/guides/comparatif-logiciels-epicerie-quebec/"
                className="cab-foot-link scp0 foot-nav-link"
              >
                <span>Comparatif logiciels d’épicerie</span>
              </a>
              <a href="/barometre/" className="cab-foot-link scp0 foot-nav-link">
                <span>Baromètre PME 2026</span>
              </a>
            </nav>
          </div>

          <div>
            <div className="foot-label">Contact</div>
            <a
              href="mailto:bonjour@gabrielnadon.com"
              className="cab-foot-link scp5 footer-email"
            >
              bonjour<span>@</span>gabrielnadon.com
            </a>
            <div className="footer-avail">
              <span className="dot-live-sm"></span>
              <span className="txt-sm-gray">
                2 mandats disponibles · {currentQuarter()}
              </span>
            </div>
            <div className="txt-sm-gray-mt">Montréal, Québec · à distance</div>
            <div className="foot-label-social">Réseaux</div>
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
        </div>

        <div className="footer-bottom">
          <span className="copyright">
            © {new Date().getFullYear()} Gabriel Nadon · Tous droits réservés
          </span>
          <a href="#" className="cab-foot-link scp0 to-top">
            Haut de page <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
