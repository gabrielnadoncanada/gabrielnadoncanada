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
                <div className="footer-sub">Conseiller · Systèmes &amp; IA</div>
              </div>
            </div>
            <p className="footer-desc">
              Des systèmes web et des automatisations IA qui travaillent à la
              place des PME — du diagnostic à la croissance.
            </p>
          </div>

          <div>
            <div className="foot-label">Navigation</div>
            <nav className="footer-nav">
              <a href="#approche" className="cab-foot-link scp0 foot-nav-link">
                <span>Approche</span>
              </a>
              <a href="#mandats" className="cab-foot-link scp0 foot-nav-link">
                <span>Mandats</span>
              </a>
              <a href="#methode" className="cab-foot-link scp0 foot-nav-link">
                <span>Méthode</span>
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
                2 mandats disponibles · T3 2026
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
            © 2026 Gabriel Nadon · Tous droits réservés
          </span>
          <a href="#" className="cab-foot-link scp0 to-top">
            Haut de page <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
