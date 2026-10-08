"use client";

import { useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getAttribution } from "@/components/AttributionTracker";
import { href } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const EMAIL = "bonjour@gabrielnadon.com";
const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";
const SEMAINES = 50; // semaines travaillées par année (2 semaines de vacances)
const SPRINT = 4500; // prix plancher publié du sprint d'automatisation

// Heures par défaut de chaque tâche type (libellés : calculateur.tool.presets).
const PRESET_HEURES = [8, 6, 5, 4];
const AUTRE = PRESET_HEURES.length; // index de « Autre tâche répétitive »

// Libellés envoyés au serveur dans le résumé (`detail`) : toujours en français,
// quelle que soit la langue de la page — seul l'affichage est traduit.
const TACHES_FR = [
  "Prix fournisseurs retapés à la main",
  "Facturation / soumissions",
  "Double saisie entre deux systèmes",
  "Rapports refaits chaque semaine",
  "Autre tâche répétitive",
];

function track(name: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name);
  }
}

const fmtFr = new Intl.NumberFormat("fr-CA", { maximumFractionDigits: 0 });

export function Calculateur() {
  const t = useTranslations("calculateur.tool");
  const locale = useLocale() as Locale;
  const fmt = useMemo(
    () =>
      new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-CA", {
        maximumFractionDigits: 0,
      }),
    [locale],
  );
  const money = (n: number) => t("money", { amount: fmt.format(n) });
  const presets = t.raw("presets") as string[];

  const [tache, setTache] = useState(0);
  const [heures, setHeures] = useState(8);
  const [personnes, setPersonnes] = useState(1);
  const [taux, setTaux] = useState(25);
  const [computed, setComputed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);
  const tracked = useRef(false);

  const tacheLabel = tache < presets.length ? presets[tache] : t("other");

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

  // Résumé envoyé au serveur : format historique, en français, inchangé.
  function resume() {
    return (
      `[Calculateur du coût du travail manuel]\n` +
      `Tâche : ${TACHES_FR[tache]}\n` +
      `${heures} h/sem × ${personnes} personne(s) × ${taux} $/h × ${SEMAINES} sem` +
      ` = ${fmtFr.format(annuel)} $/an (${fmtFr.format(cinqAns)} $ sur 5 ans)`
    );
  }

  // Même résumé dans la langue de la page (courriel prérédigé du visiteur).
  function resumeLocal() {
    return (
      `${t("mail.header")}\n` +
      `${t("mail.tache", { tache: tacheLabel })}\n` +
      t("mail.calc", {
        heures,
        personnes,
        taux,
        semaines: SEMAINES,
        annuel: money(annuel),
        total: money(cinqAns),
      })
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const nom = (form.elements.namedItem("nom") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const website = (form.elements.namedItem("website") as HTMLInputElement).value;
    if (!nom || !/.+@.+\..+/.test(email)) {
      setError(t("required"));
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
      window.location.assign(href(locale, "/merci"));
    } catch {
      const subject = t("mail.subject", { tache: tacheLabel, nom });
      const body =
        `${resumeLocal()}\n\n${t("mail.nom", { nom })}\n` +
        `${t("mail.email", { email })}\n\n${t("mail.from")}`;
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
          {t("tache")}
        </label>
        <select
          className="form-input"
          id="calc-tache"
          value={tache}
          onChange={(e) => {
            const i = Number(e.target.value);
            setTache(i);
            if (i < PRESET_HEURES.length) setHeures(PRESET_HEURES[i]);
          }}
        >
          {presets.map((label, i) => (
            <option key={label} value={i}>
              {label}
            </option>
          ))}
          <option value={AUTRE}>{t("other")}</option>
        </select>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label className="form-label" htmlFor="calc-heures">
            {t("heures")}
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
            {t("personnes")}
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
          {t("taux")} <span className="form-opt">{t("tauxOpt")}</span>
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
        {t("calculer")} <span>→</span>
      </button>

      {computed ? (
        <div aria-live="polite">
          <div className="money-box u-mt-lg">
            <div className="money-kicker">{t("kicker")}</div>
            <div className="money-fig">
              <span className="num">{money(annuel)}</span>
              <span className="cur">{t("perYear")}</span>
            </div>
            <p className="money-sub">
              {t("sub", {
                heures,
                personnes,
                taux,
                semaines: SEMAINES,
                total: money(cinqAns),
              })}
            </p>
            {annuel >= SPRINT ? (
              <p className="money-plus">
                {t("payback", { sprint: money(SPRINT), weeks: paybackSemaines })}
              </p>
            ) : (
              <p className="money-plus">{t("below", { sprint: money(SPRINT) })}</p>
            )}
          </div>

          {failed ? (
            <div className="form-done">
              <p className="form-done-title">{t("failedTitle")}</p>
              <p className="form-done-text">
                {t.rich("failedText", {
                  mail: (chunks) => <a href={failed}>{chunks}</a>,
                  cal: (chunks) => (
                    <a href={CAL} target="_blank" rel="noopener">
                      {chunks}
                    </a>
                  ),
                })}
              </p>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="u-mt-lg">
              <p className="form-label">{t("intro")}</p>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label" htmlFor="calc-nom">
                    {t("nom")}
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
                    {t("email")}
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
                {submitting ? t("sending") : `${t("submit")} `}
                {submitting ? null : <span>→</span>}
              </button>
              <p className="form-note">
                {t.rich("note", {
                  cal: (chunks) => (
                    <a
                      href={CAL}
                      target="_blank"
                      rel="noopener"
                      onClick={() => track("clic_audit")}
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </p>
            </form>
          )}
        </div>
      ) : null}
    </div>
  );
}
