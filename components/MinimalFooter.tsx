export function MinimalFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-bottom footer--flush">
          <span className="copyright">
            Gratuit :{" "}
            <a href="/calculateur/" className="cab-foot-link scp0">
              Calculateur du travail manuel
            </a>
            {" · "}
            <a href="/diagnostic-ia/" className="cab-foot-link scp0">
              Test « prête pour l’IA ? »
            </a>
            {" · "}
            <a
              href="/guides/automatisation-pme-quebec/"
              className="cab-foot-link scp0"
            >
              Guide automatisation PME
            </a>
            {" · "}
            <a href="/barometre/" className="cab-foot-link scp0">
              Baromètre 2026
            </a>
          </span>
        </div>
        <div
          className="footer-bottom footer--flush"
        >
          <span className="copyright">
            © 2026 Gabriel Nadon · Tous droits réservés
          </span>
          <a href="/" className="cab-foot-link scp0 to-top">
            ← Retour à l&apos;accueil
          </a>
        </div>
      </div>
    </footer>
  );
}
