// Liens de service présents sur toutes les pages internes : c'est le maillage
// qui pousse les pages commerciales prioritaires (crawl + clic).
const SERVICES = [
  { href: "/consultant-ia/", label: "Consultant IA" },
  { href: "/agents-ia/", label: "Agents IA" },
  { href: "/traitement-documents-ia/", label: "Traitement de documents" },
  { href: "/automatisation-processus/", label: "Automatisation des processus" },
  { href: "/logiciel-sur-mesure/", label: "Logiciel sur mesure" },
  { href: "/refonte-de-systeme/", label: "Refonte de système" },
];

const GRATUIT = [
  { href: "/calculateur/", label: "Calculateur du travail manuel" },
  { href: "/diagnostic-ia/", label: "Test « prête pour l’IA ? »" },
  { href: "/guides/automatisation-pme-quebec/", label: "Guide automatisation PME" },
  { href: "/barometre/", label: "Baromètre 2026" },
];

export function MinimalFooter({ lang = "fr" }: { lang?: "fr" | "en" }) {
  const en = lang === "en";
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="cab-foot-grid footer-grid">
          <div>
            <a href="/" className="footer-brand footer-brand-link">
              <div className="mark-lg">
                <span className="mark-corner-tl-lg"></span>
                <span className="mark-corner-br-lg"></span>
                <span className="mark-gn-lg">GN</span>
              </div>
              <div>
                <div className="footer-name">Gabriel Nadon</div>
                <div className="footer-sub">Systèmes opérationnels · PME</div>
              </div>
            </a>
          </div>
          <div>
            <div className="foot-label">Services</div>
            <nav className="footer-nav">
              {SERVICES.map((s) => (
                <a key={s.href} href={s.href} className="cab-foot-link scp0 foot-nav-link">
                  {s.label}
                </a>
              ))}
              <a href="/en/ai-consultant/" hrefLang="en" className="cab-foot-link scp0 foot-nav-link">
                AI consultant (English)
              </a>
            </nav>
          </div>
          <div>
            <div className="foot-label">{en ? "Free tools (French)" : "Gratuit"}</div>
            <nav className="footer-nav">
              {GRATUIT.map((g) => (
                <a key={g.href} href={g.href} className="cab-foot-link scp0 foot-nav-link">
                  {g.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="copyright">
            © {new Date().getFullYear()} Gabriel Nadon ·{" "}
            {en ? "All rights reserved" : "Tous droits réservés"}
          </span>
          <a href="/" className="cab-foot-link scp0 to-top">
            {en ? "← Home (French)" : "← Retour à l’accueil"}
          </a>
        </div>
      </div>
    </footer>
  );
}
