"use client";

import { useMemo, useRef, useState } from "react";
import { getAttribution } from "@/components/AttributionTracker";

const EMAIL = "bonjour@gabrielnadon.com";
const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";
const SEMAINES = 50; // semaines travaillées par année (2 semaines de vacances)
const SPRINT = 4500; // prix plancher publié du sprint d'automatisation

const PRESETS = [
  { label: "Prix fournisseurs retapés à la main", h: 8 },
  { label: "Facturation / soumissions", h: 6 },
  { label: "Double saisie entre deux systèmes", h: 5 },
  { label: "Rapports refaits chaque semaine", h: 4 },
];

function track(name: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name);
  }
}

const fmt = new Intl.NumberFormat("fr-CA", { maximumFractionDigits: 0 });

export function Calculateur() {
  const [tache, setTache] = useState(PRESETS[0].label);
  const [heures, setHeures] = useState(8);
  const [personnes, setPersonnes] = useState(1);
  const [taux, setTaux] = useState(25);
  const [computed, setComputed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);
  const tracked = useRef(false);

  const annuel = useMemo(
    () => Math.round(heures * personnes * taux * SEMAINES),
    [heures, personnes, taux],
  );
  const cinqAns = annuel * 5;
  const paybackSemaines =
    annuel > 0 ? Math.max(1, Math.ceil((SPRINT / annuel) * 52)) : 0;

  function calculer() {
    setComputed(true);
    if (!tracked.current) {
      tracked.current = true;
      track("calc_result");
    }
  }

  function resume() {
    return (
      `[Calculateur du coût du travail manuel]\n` +
      `Tâche : ${tache}\n` +
      `${heures} h/sem × ${personnes} personne(s) × ${taux} $/h × ${SEMAINES} sem` +
      ` = ${fmt.format(annuel)} $/an (${fmt.format(cinqAns)} $ sur 5 ans)`
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const nom = (form.elements.namedItem("nom") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const website = (form.elements.namedItem("website") as HTMLInputElement).value;
    if (!nom || !/.+@.+\..+/.test(email)) {
      setError("Votre nom et un courriel valide sont requis.");
      return;
    }
    setError(null);
    setSubmitting(true);
    track("form_submit");
    const d = {
      sujet: "Audit d’opérations",
      detail: resume(),
      nom,
      email,
      tel: "",
      website,
      page: window.location.pathname,
      attribution: getAttribution(),
    };
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
      });
      if (!r.ok) throw new Error("send_failed");
      await r.json();
      track("form_sent");
      window.location.assign("/merci/");
    } catch {
      const subject = `Mon calcul — ${tache} (${nom})`;
      const body = `${resume()}\n\nNom : ${nom}\nCourriel : ${email}\n\n(Envoyé depuis gabrielnadon.com/calculateur/)`;
      setFailed(
        `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="cab-paper contact-card">
      <div className="form-field">
        <label className="form-label" htmlFor="calc-tache">
          La tâche manuelle
        </label>
        <select
          className="form-input"
          id="calc-tache"
          value={tache}
          onChange={(e) => {
            const p = PRESETS.find((x) => x.label === e.target.value);
            setTache(e.target.value);
            if (p) setHeures(p.h);
          }}
        >
          {PRESETS.map((p) => (
            <option key={p.label}>{p.label}</option>
          ))}
          <option>Autre tâche répétitive</option>
        </select>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label className="form-label" htmlFor="calc-heures">
            Heures par semaine
          </label>
          <input
            className="form-input"
            id="calc-heures"
            type="number"
            min={0}
            max={80}
            step={0.5}
            value={heures}
            onChange={(e) => setHeures(Number(e.target.value) || 0)}
          />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="calc-personnes">
            Personnes qui la font
          </label>
          <input
            className="form-input"
            id="calc-personnes"
            type="number"
            min={1}
            max={50}
            value={personnes}
            onChange={(e) => setPersonnes(Number(e.target.value) || 1)}
          />
        </div>
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="calc-taux">
          Coût horaire chargé <span className="form-opt">(salaire + charges, $/h)</span>
        </label>
        <input
          className="form-input"
          id="calc-taux"
          type="number"
          min={15}
          max={200}
          value={taux}
          onChange={(e) => setTaux(Number(e.target.value) || 0)}
        />
      </div>
      <button type="button" className="btn-block" onClick={calculer}>
        Calculer ce que ça me coûte <span>→</span>
      </button>

      {computed ? (
        <div aria-live="polite">
          <div className="money-box u-mt-lg">
            <div className="money-kicker">Ce que cette tâche vous coûte</div>
            <div className="money-fig">
              <span className="num">{fmt.format(annuel)} $</span>
              <span className="cur">/ an</span>
            </div>
            <p className="money-sub">
              {heures} h/sem × {personnes} personne{personnes > 1 ? "s" : ""} ×{" "}
              {taux} $/h × {SEMAINES} semaines. Sur 5 ans :{" "}
              {fmt.format(cinqAns)} $ — sans compter les erreurs de saisie.
            </p>
            {annuel >= SPRINT ? (
              <p className="money-plus">
                Un sprint d’automatisation à {fmt.format(SPRINT)} $ se
                rembourserait en ± {paybackSemaines} semaine
                {paybackSemaines > 1 ? "s" : ""}.
              </p>
            ) : (
              <p className="money-plus">
                Sous {fmt.format(SPRINT)} $/an, un sprint ne se justifie
                probablement pas — je vous le dirais tel quel au téléphone.
              </p>
            )}
          </div>

          {failed ? (
            <div className="form-done">
              <p className="form-done-title">Un pépin technique est survenu.</p>
              <p className="form-done-text">
                Votre calcul n’est pas parti.{" "}
                <a href={failed}>Envoyez-le par courriel</a> (déjà rédigé), ou{" "}
                <a href={CAL} target="_blank" rel="noopener">
                  réservez 20 minutes
                </a>
                .
              </p>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="u-mt-lg">
              <p className="form-label">
                Recevez ce calcul détaillé + 2-3 pistes concrètes pour cette
                tâche, par courriel. Réponse humaine sous 24 h.
              </p>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label" htmlFor="calc-nom">
                    Nom
                  </label>
                  <input
                    className="form-input"
                    id="calc-nom"
                    name="nom"
                    type="text"
                    autoComplete="name"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="calc-email">
                    Courriel
                  </label>
                  <input
                    className="form-input"
                    id="calc-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                  />
                </div>
              </div>
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
                {submitting ? "Envoi en cours…" : "Recevoir mon calcul et mes pistes "}
                {submitting ? null : <span>→</span>}
              </button>
              <p className="form-note">
                Ou{" "}
                <a
                  href={CAL}
                  target="_blank"
                  rel="noopener"
                  onClick={() => track("clic_audit")}
                >
                  réservez directement 20 minutes
                </a>{" "}
                pour le passer en revue ensemble.
              </p>
            </form>
          )}
        </div>
      ) : null}
    </div>
  );
}
