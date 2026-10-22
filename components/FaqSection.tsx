import { useTranslations } from "next-intl";
import "@/app/home.css";

type Faq = { q: string; a: string };

// Affiche sur la page les mêmes questions que le FAQPage du JSON-LD : Google
// exige que le balisage reflète du contenu visible, et une réponse directe
// visible est précisément ce que les moteurs IA reprennent. Même rendu que la
// FAQ de ServicePage (.svc-faq).
export function FaqSection({ items }: { items: Faq[] }) {
  const t = useTranslations("common");
  if (!items.length) return null;
  return (
    <section className="hm hm-section hm-band" id="faq">
      <div className="hm-wrap hm-split">
        <h2 className="hm-h2">{t("faqTitle")}</h2>
        <div className="svc-faq">
          {items.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>
                <span>{f.q}</span>
                <span className="svc-faq-icon" aria-hidden="true"></span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
