"use client";

import { useState } from "react";

function track(name: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name);
  }
}

type Champ = {
  key: string;
  label: string;
  options: string[];
};

const CHAMPS: Champ[] = [
  {
    key: "secteur",
    label: "Votre secteur d’activité",
    options: [
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
    label: "Nombre d’employés",
    options: ["1 à 4", "5 à 19", "20 à 49", "50 à 99", "100 et plus"],
  },
  {
    key: "region",
    label: "Votre région",
    options: [
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
    label: "Vos données d’entreprise (clients, produits, commandes) vivent surtout…",
    options: [
      "Dans les courriels, le papier ou la mémoire des gens",
      "Dans des fichiers Excel",
      "Dans un ou des logiciels (caisse, CRM, comptabilité)",
      "Un mélange de tout ça",
    ],
  },
  {
    key: "heures",
    label:
      "Heures par semaine passées en tâches manuelles répétitives (saisie, recopiage, rapports), dans toute l’entreprise",
    options: [
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
    label: "L’IA générative (ChatGPT, Claude, Copilot…) dans votre entreprise, c’est…",
    options: [
      "Pas utilisée du tout",
      "Des essais individuels, sans cadre",
      "Un usage régulier pour certaines tâches",
      "Intégrée à au moins un processus d’affaires",
    ],
  },
  {
    key: "automatisation",
    label: "Avez-vous automatisé au moins un processus dans les 12 derniers mois ?",
    options: ["Oui", "Non", "En cours / en projet"],
  },
  {
    key: "obstacle",
    label: "Votre principal frein à l’automatisation ou à l’IA",
    options: [
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
    label: "Budget prévu pour l’automatisation ou l’IA dans les 12 prochains mois",
    options: [
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
    label: "La difficulté à recruter vous pousse-t-elle vers l’automatisation ?",
    options: ["Oui, fortement", "Un peu", "Non", "On ne recrute pas"],
  },
  {
    key: "loi25",
    label: "La Loi 25 (protection des renseignements personnels), chez vous…",
    options: [
      "On est conformes",
      "On connaît, mais on n’est pas conformes",
      "On en a entendu parler, sans plus",
      "Jamais entendu parler",
    ],
  },
];

export function BarometreForm() {
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
        `Il reste ${manquants.length} question(s) sans réponse — la première : « ${manquants[0].label} »`,
      );
      return;
    }
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    if (email && !/.+@.+\..+/.test(email)) {
      setError("Le courriel entré n’est pas valide (il est facultatif — vous pouvez le laisser vide).");
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
        <p className="form-done-title">Merci — votre réponse est enregistrée.</p>
        <p className="form-done-text">
          Les résultats compilés seront publiés sur cette page. Si vous avez
          laissé votre courriel, vous les recevrez en primeur, avec les chiffres
          par secteur.
        </p>
      </div>
    );
  }

  if (state === "failed") {
    return (
      <div className="form-done">
        <p className="form-done-title">Un pépin technique est survenu.</p>
        <p className="form-done-text">
          Votre réponse n’est pas partie. Réessayez dans quelques minutes, ou
          écrivez à{" "}
          <a href="mailto:bonjour@gabrielnadon.com">bonjour@gabrielnadon.com</a>.
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit}>
      {CHAMPS.map((c) => (
        <div className="form-field" key={c.key}>
          <label className="form-label" htmlFor={`bar-${c.key}`}>
            {c.label}
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
              Choisir…
            </option>
            {c.options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      ))}

      <div className="form-field">
        <label className="form-label" htmlFor="bar-commentaire">
          La tâche manuelle qui vous pèse le plus{" "}
          <span className="form-opt">(facultatif, en vos mots)</span>
        </label>
        <textarea
          className="form-input form-textarea"
          id="bar-commentaire"
          name="commentaire"
          placeholder="Ex. : retaper les prix des fournisseurs chaque semaine…"
        ></textarea>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="bar-email">
          Courriel{" "}
          <span className="form-opt">
            (facultatif — pour recevoir les résultats en primeur)
          </span>
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
        {submitting ? "Envoi en cours…" : "Envoyer mes réponses "}
        {submitting ? null : <span>→</span>}
      </button>
      <p className="form-note">
        2 minutes, 11 questions. Réponses anonymes — le courriel est facultatif
        et sert uniquement à vous envoyer les résultats.
      </p>
    </form>
  );
}
