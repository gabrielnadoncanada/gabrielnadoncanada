"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { href } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";

function track(name: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name);
  }
}

// 10 questions (quiz.tool.questions), réponses notées 0 / 1 / 2. Score max : 20.
type Question = { q: string; options: [string, string, string] };

type Tier = {
  titre: string;
  verdict: string;
  gestes: string[];
};

// Seuil de score de chaque palier, dans l'ordre de quiz.tool.tiers.
const TIER_MIN = [14, 7, 0];

export function QuizIA() {
  const t = useTranslations("quiz.tool");
  const locale = useLocale() as Locale;
  const questions = t.raw("questions") as Question[];
  const tiers = t.raw("tiers") as Tier[];

  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null),
  );
  const [resultIndex, setResultIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const score = answers.reduce<number>((s, a) => s + (a ?? 0), 0);
  const result = resultIndex === null ? null : tiers[resultIndex];

  function voirResultat() {
    const missing = answers.findIndex((a) => a === null);
    if (missing !== -1) {
      setError(t("missing", { n: answers.filter((a) => a === null).length }));
      document.getElementById(`quiz-q${missing}`)?.scrollIntoView({ block: "center" });
      return;
    }
    setError(null);
    const i = TIER_MIN.findIndex((min) => score >= min);
    setResultIndex(i === -1 ? TIER_MIN.length - 1 : i);
    track("quiz_result");
  }

  return (
    <div>
      <div className="case-steps">
        {questions.map((item, qi) => (
          <fieldset
            key={item.q}
            id={`quiz-q${qi}`}
            className="case-step"
          >
            <div className="mandat-num">
              <span>{String(qi + 1).padStart(2, "0")}</span>
            </div>
            <legend className="mandat-title" style={{ padding: 0 }}>
              <span>{item.q}</span>
            </legend>
            <div className="u-mt-sm">
              {item.options.map((opt, oi) => (
                <label
                  key={opt}
                  className="mandat-text"
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                    cursor: "pointer",
                    marginTop: "8px",
                  }}
                >
                  <input
                    type="radio"
                    name={`q${qi}`}
                    checked={answers[qi] === oi}
                    onChange={() =>
                      setAnswers((prev) => {
                        const next = [...prev];
                        next[qi] = oi;
                        return next;
                      })
                    }
                    style={{ marginTop: "4px", accentColor: "var(--color-gold)" }}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      {error ? <p className="form-error u-mt-lg">{error}</p> : null}

      {result === null ? (
        <div className="u-mt-lg">
          <button type="button" className="btn-block" onClick={voirResultat}>
            {t("submit")} <span>→</span>
          </button>
          <p className="form-note">{t("submitNote")}</p>
        </div>
      ) : (
        <div className="u-mt-lg" aria-live="polite">
          <div className="money-box">
            <div className="money-kicker">{t("result", { score })}</div>
            <div className="money-fig">
              <span className="num" style={{ fontSize: "var(--fs-card-title)" }}>
                {result.titre}
              </span>
            </div>
            <p className="money-sub">{result.verdict}</p>
          </div>
          <div className="u-mt-lg">
            <p className="form-label">{t("gestesLabel")}</p>
            <ol className="case-prose" style={{ paddingLeft: "20px" }}>
              {result.gestes.map((g) => (
                <li key={g} style={{ marginTop: "8px" }}>
                  {g}
                </li>
              ))}
            </ol>
          </div>
          <div className="u-mt-lg">
            <a
              href={CAL}
              target="_blank"
              rel="noopener"
              className="btn-block"
              onClick={() => track("clic_audit")}
            >
              {t("cta")} <span>→</span>
            </a>
            <p className="form-note">
              {t.rich("ctaNote", {
                a: (chunks) => <a href={href(locale, "/calculateur")}>{chunks}</a>,
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
