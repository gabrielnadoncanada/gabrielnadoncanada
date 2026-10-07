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

export function MinimalFooter({ lang = "fr" }: { lang?: "fr" | "en" }) {
  const en = lang === "en";
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-bottom footer--flush">
          <span className="copyright">
            Services :{" "}
            {SERVICES.map((s, i) => (
              <span key={s.href}>
                {i > 0 ? " · " : null}
                <a href={s.href} className="cab-foot-link scp0">
                  {s.label}
                </a>
              </span>
            ))}
            {" · "}
            <a href="/en/ai-consultant/" className="cab-foot-link scp0" hrefLang="en">
              AI consultant (English)
            </a>
          </span>
        </div>
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
        <div className="footer-bottom footer--flush">
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
