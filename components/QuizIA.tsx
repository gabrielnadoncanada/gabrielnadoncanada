"use client";

import { useState } from "react";

const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";

function track(name: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name);
  }
}

// 10 questions, réponses notées 0 / 1 / 2. Score max : 20.
const QUESTIONS: { q: string; options: [string, string, string] }[] = [
  {
    q: "Vos données clients, produits ou commandes vivent surtout…",
    options: [
      "Dans des courriels, du papier ou la mémoire de quelqu’un",
      "Dans des fichiers Excel que chacun tient à sa façon",
      "Dans un ou des logiciels (caisse, CRM, comptabilité)",
    ],
  },
  {
    q: "Combien de fois la même information est-elle retapée d’un système à l’autre ?",
    options: [
      "Tout le temps — c’est le quotidien",
      "Pour quelques processus seulement",
      "Presque jamais, nos systèmes se parlent",
    ],
  },
  {
    q: "Si la personne « qui comprend le système » partait demain…",
    options: [
      "On serait sérieusement dans le trouble",
      "On s’en sortirait, mais au ralenti",
      "Tout est documenté, quelqu’un d’autre prendrait le relais",
    ],
  },
  {
    q: "Vos processus répétitifs (facturation, commandes, rapports) sont…",
    options: [
      "Dans la tête des gens, différents selon qui les fait",
      "Connus, mais jamais écrits noir sur blanc",
      "Écrits quelque part, au moins pour les principaux",
    ],
  },
  {
    q: "Quelqu’un dans l’équipe utilise-t-il déjà ChatGPT, Claude ou un autre outil d’IA au travail ?",
    options: [
      "Non, et il y a de la méfiance",
      "Oui, en cachette ou chacun pour soi",
      "Oui, ouvertement, on s’échange des trucs",
    ],
  },
  {
    q: "Savez-vous combien d’heures par semaine partent en tâches manuelles répétitives ?",
    options: [
      "Aucune idée, on n’a jamais compté",
      "Une intuition, mais pas de chiffre",
      "Oui, on l’a déjà mesuré au moins une fois",
    ],
  },
  {
    q: "Vos fichiers importants (listes de prix, soumissions, contrats) arrivent-ils dans des formats utilisables ?",
    options: [
      "Non — PDF, photos, papier qu’il faut retaper",
      "Un mélange : certains propres, d’autres à ressaisir",
      "Oui, surtout de l’Excel/CSV ou des données de logiciel",
    ],
  },
  {
    q: "Quand une erreur de saisie se glisse (prix, quantité, adresse), on s’en aperçoit…",
    options: [
      "Quand un client ou un fournisseur nous le dit",
      "Lors d’une vérification, parfois des semaines après",
      "Vite — il y a une validation quelque part",
    ],
  },
  {
    q: "Qui déciderait d’un projet d’automatisation ou d’IA chez vous ?",
    options: [
      "Personne — ce n’est le dossier de personne",
      "La direction, mais ce n’est pas une priorité claire",
      "C’est identifié : quelqu’un porte le dossier",
    ],
  },
  {
    q: "Votre budget pour régler une corvée qui coûte 10 000 $ par année serait…",
    options: [
      "Zéro — pas de budget pour ça cette année",
      "Quelques milliers de dollars si le retour est démontré",
      "Le montant qu’il faut, si ça se rembourse en moins d’un an",
    ],
  },
];

type Tier = {
  min: number;
  titre: string;
  verdict: string;
  gestes: string[];
};

const TIERS: Tier[] = [
  {
    min: 14,
    titre: "Prête pour l’IA — et probablement déjà en retard",
    verdict:
      "Vos données existent, vos processus sont connus et quelqu’un peut porter le dossier. À ce stade, chaque mois d’attente est une corvée payée pour rien : le travail n’est pas de « se préparer », mais de choisir la première tâche à éliminer et de la chiffrer.",
    gestes: [
      "Choisissez UNE tâche répétitive et chiffrez-la avec le calculateur (heures × personnes × coût horaire).",
      "Commencez par la donnée la plus propre que vous avez déjà (caisse, comptabilité) — pas par le projet le plus excitant.",
      "Exigez d’un premier projet qu’il se rembourse en moins de douze mois, sinon refusez-le.",
    ],
  },
  {
    min: 7,
    titre: "Presque prête — un ménage ciblé d’abord",
    verdict:
      "Le potentiel est réel, mais l’IA amplifierait autant le désordre que l’ordre : des données éparpillées ou des processus qui changent selon la personne donneront des automatisations fragiles. La bonne nouvelle : le ménage nécessaire est ciblé, pas total.",
    gestes: [
      "Écrivez noir sur blanc UN processus répétitif, tel qu’il se fait vraiment (pas tel qu’il devrait se faire).",
      "Rapatriez la donnée de ce processus dans UN seul endroit — un seul fichier maître ou le logiciel existant.",
      "Ensuite seulement, automatisez ce processus-là. Un seul. Le reste suivra sur le même modèle.",
    ],
  },
  {
    min: 0,
    titre: "Pas encore — et c’est correct",
    verdict:
      "Brancher de l’IA sur des opérations qui vivent dans les courriels et la mémoire des gens, c’est mettre un moteur neuf dans une voiture sans roues. Rien de grave : les fondations se posent en semaines, pas en années, et chaque étape rapporte par elle-même — avec ou sans IA ensuite.",
    gestes: [
      "Sortez les informations critiques de la tête des gens : une liste de prix, une liste de clients, une procédure — dans un fichier partagé.",
      "Comptez une seule chose : les heures par semaine passées à retaper de l’information. Ce chiffre décidera de la suite.",
      "Ne signez rien de « clé en main IA » pour l’instant — au diagnostic, on établit l’ordre des fondations, gratuitement.",
    ],
  },
];

export function QuizIA() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null),
  );
  const [result, setResult] = useState<Tier | null>(null);
  const [error, setError] = useState<string | null>(null);

  const score = answers.reduce<number>((s, a) => s + (a ?? 0), 0);

  function voirResultat() {
    const missing = answers.findIndex((a) => a === null);
    if (missing !== -1) {
      setError(`Il reste ${answers.filter((a) => a === null).length} question(s) sans réponse.`);
      document.getElementById(`quiz-q${missing}`)?.scrollIntoView({ block: "center" });
      return;
    }
    setError(null);
    const tier = TIERS.find((t) => score >= t.min) ?? TIERS[TIERS.length - 1];
    setResult(tier);
    track("quiz_result");
  }

  return (
    <div>
      <div className="case-steps">
        {QUESTIONS.map((item, qi) => (
          <fieldset
            key={item.q}
            id={`quiz-q${qi}`}
            className="case-step"
            style={{ border: 0, margin: 0, padding: 0, minWidth: 0 }}
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
            Voir mon résultat <span>→</span>
          </button>
          <p className="form-note">
            Résultat immédiat, sur cette page. Aucun courriel requis.
          </p>
        </div>
      ) : (
        <div className="u-mt-lg" aria-live="polite">
          <div className="money-box">
            <div className="money-kicker">Votre résultat — {score} / 20</div>
            <div className="money-fig">
              <span className="num" style={{ fontSize: "var(--fs-card-title)" }}>
                {result.titre}
              </span>
            </div>
            <p className="money-sub">{result.verdict}</p>
          </div>
          <div className="u-mt-lg">
            <p className="form-label">Vos trois prochains gestes :</p>
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
              Valider ce résultat en 20 min (gratuit) <span>→</span>
            </a>
            <p className="form-note">
              On passe vos réponses en revue au téléphone et vous repartez avec
              un ordre de priorité — que l’on travaille ensemble ou non. Ou{" "}
              <a href="/calculateur/">chiffrez d’abord votre tâche la plus lourde</a>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
