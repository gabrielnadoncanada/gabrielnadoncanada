import { useTranslations } from "next-intl";

// Trimestre courant, calculé au build (le site est rebâti à chaque déploiement).
export function quarterParts() {
  const d = new Date();
  return { q: Math.floor(d.getMonth() / 3) + 1, year: d.getFullYear() };
}

export function Ticker() {
  const t = useTranslations("common.ticker");
  const quarter = t("quarter", quarterParts());
  return (
    <div className="ticker">
      <div className="cab-ticker ticker-inner">
        <span className="inline-dot">
          <span className="dot-live"></span>
          {t("available", { quarter })}
        </span>
        <span className="cab-hide-sm ticker-sub">{t("practice")}</span>
      </div>
    </div>
  );
}
