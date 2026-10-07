// Trimestre courant, calculé au build (le site est rebâti à chaque déploiement).
export function currentQuarter() {
  const d = new Date();
  return `T${Math.floor(d.getMonth() / 3) + 1} ${d.getFullYear()}`;
}

export function Ticker({ lang = "fr" }: { lang?: "fr" | "en" }) {
  const q = currentQuarter();
  return (
    <div className="ticker">
      <div className="cab-ticker ticker-inner">
        <span className="inline-dot">
          <span className="dot-live"></span>
          {lang === "en"
            ? `Available · 2 projects · ${q.replace("T", "Q")}`
            : `Disponible · 2 mandats · ${q}`}
        </span>
        <span className="cab-hide-sm ticker-sub">
          {lang === "en" ? "Independent practice · Montreal " : "Cabinet indépendant · Montréal "}
        </span>
      </div>
    </div>
  );
}
