"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

function track(name: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name);
  }
}

// Valeurs envoyées à functions/api/barometre.js : toujours les libellés
// français, quelle que soit la langue de la page (les réponses EN et FR se
// compilent ensemble). Le libellé affiché vient des messages
// (barometre.tool.fields.<clé>.options, même ordre, même longueur).
const CHAMPS: Array<{ key: string; valeurs: string[] }> = [
  {
    key: "secteur",
    valeurs: [
      "Commerce de détail / alimentation",
      "Construction",
      "Manufacturier",
      "Services professionnels",
      "Restauration / hôtellerie",
      "Transport / logistique",
      "Santé / services à la personne",
      "Autre",
    ],
  },
  {
    key: "employes",
    valeurs: ["1 à 4", "5 à 19", "20 à 49", "50 à 99", "100 et plus"],
  },
  {
    key: "region",
    valeurs: [
      "Montréal",
      "Montérégie",
      "Capitale-Nationale (Québec)",
      "Laurentides / Lanaudière",
      "Estrie / Centre-du-Québec",
      "Mauricie",
      "Outaouais",
      "Saguenay–Lac-Saint-Jean",
      "Autre région du Québec",
      "Hors Québec",
    ],
  },
  {
    key: "donnees",
    valeurs: [
      "Dans les courriels, le papier ou la mémoire des gens",
      "Dans des fichiers Excel",
      "Dans un ou des logiciels (caisse, CRM, comptabilité)",
      "Un mélange de tout ça",
    ],
  },
  {
    key: "heures",
    valeurs: [
      "Moins de 2 h",
      "2 à 5 h",
      "6 à 10 h",
      "11 à 20 h",
      "Plus de 20 h",
      "Aucune idée",
    ],
  },
  {
    key: "ia_usage",
    valeurs: [
      "Pas utilisée du tout",
      "Des essais individuels, sans cadre",
      "Un usage régulier pour certaines tâches",
      "Intégrée à au moins un processus d’affaires",
    ],
  },
  {
    key: "automatisation",
    valeurs: ["Oui", "Non", "En cours / en projet"],
  },
  {
    key: "obstacle",
    valeurs: [
      "Manque de temps pour s’en occuper",
      "Coût / budget",
      "On ne sait pas par où commencer",
      "Confidentialité et sécurité des données",
      "Pas convaincu du retour sur investissement",
      "Manque de compétences à l’interne",
    ],
  },
  {
    key: "budget",
    valeurs: [
      "0 $",
      "Moins de 5 000 $",
      "5 000 $ à 15 000 $",
      "15 000 $ à 50 000 $",
      "Plus de 50 000 $",
      "Pas encore décidé",
    ],
  },
  {
    key: "penurie",
    valeurs: ["Oui, fortement", "Un peu", "Non", "On ne recrute pas"],
  },
  {
    key: "loi25",
    valeurs: [
      "On est conformes",
      "On connaît, mais on n’est pas conformes",
      "On en a entendu parler, sans plus",
      "Jamais entendu parler",
    ],
  },
];

export function BarometreForm() {
  const t = useTranslations("barometre.tool");
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [state, setState] = useState<"form" | "sent" | "failed">("form");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const manquants = CHAMPS.filter((c) => !values[c.key]);
    if (manquants.length > 0) {
      setError(
        t("missing", {
          n: manquants.length,
          label: t(`fields.${manquants[0].key}.label`),
        }),
      );
      return;
    }
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    if (email && !/.+@.+\..+/.test(email)) {
      setError(t("invalidEmail"));
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const r = await fetch("/api/barometre", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          commentaire: (
            form.elements.namedItem("commentaire") as HTMLTextAreaElement
          ).value.trim(),
          email,
          website: (form.elements.namedItem("website") as HTMLInputElement).value,
        }),
      });
      if (!r.ok) throw new Error("send_failed");
      await r.json();
      track("barometre_sent");
      setState("sent");
    } catch {
      setState("failed");
      setSubmitting(false);
    }
  }

  if (state === "sent") {
    return (
      <div className="form-done">
        <p className="form-done-title">{t("sentTitle")}</p>
        <p className="form-done-text">{t("sentText")}</p>
      </div>
    );
  }

  if (state === "failed") {
    return (
      <div className="form-done">
        <p className="form-done-title">{t("failedTitle")}</p>
        <p className="form-done-text">
          {t.rich("failedText", {
            mail: (chunks) => <a href="mailto:bonjour@gabrielnadon.com">{chunks}</a>,
          })}
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit}>
      {CHAMPS.map((c) => {
        const libelles = t.raw(`fields.${c.key}.options`) as string[];
        return (
          <div className="form-field" key={c.key}>
            <label className="form-label" htmlFor={`bar-${c.key}`}>
              {t(`fields.${c.key}.label`)}
            </label>
            <select
              className="form-input"
              id={`bar-${c.key}`}
              value={values[c.key] ?? ""}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, [c.key]: e.target.value }))
              }
            >
              <option value="" disabled>
                {t("choose")}
              </option>
              {c.valeurs.map((v, i) => (
                <option key={v} value={v}>
                  {libelles[i] ?? v}
                </option>
              ))}
            </select>
          </div>
        );
      })}

      <div className="form-field">
        <label className="form-label" htmlFor="bar-commentaire">
          {t("commentaire")} <span className="form-opt">{t("commentaireOpt")}</span>
        </label>
        <textarea
          className="form-input form-textarea"
          id="bar-commentaire"
          name="commentaire"
          placeholder={t("placeholder")}
        ></textarea>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="bar-email">
          {t("email")} <span className="form-opt">{t("emailOpt")}</span>
        </label>
        <input
          className="form-input"
          id="bar-email"
          name="email"
          type="email"
          autoComplete="email"
        />
      </div>

      {/* Honeypot anti-pourriel (caché) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
        }}
      />

      {error ? <p className="form-error">{error}</p> : null}
      <button type="submit" className="btn-block" disabled={submitting}>
        {submitting ? t("sending") : `${t("submit")} `}
        {submitting ? null : <span>→</span>}
      </button>
      <p className="form-note">{t("note")}</p>
    </form>
  );
}
