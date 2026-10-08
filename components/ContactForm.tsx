"use client";

import { useEffect, useRef, useState } from "react";
import { getAttribution, type Attribution } from "@/components/AttributionTracker";
import { useLocale, useTranslations } from "next-intl";
import { track, withCalendlyUtm } from "@/lib/analytics";
import { href } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const EMAIL = "bonjour@gabrielnadon.com";
const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";

// Valeurs envoyées = libellés acceptés par functions/api/contact.js (Set SUJETS),
// en français quelle que soit la langue de la page — modifier les deux ensemble.
// Le libellé affiché vient des messages (form.sujets.<clé>).
export const SUJETS = {
  diagnostic: "Diagnostic de mes opérations",
  ia: "Projet d’IA ou d’agent IA",
  automatisation: "Automatiser un processus",
  documents: "Traitement de documents ou de factures",
  logiciel: "Système opérationnel sur mesure",
  refonte: "Refonte d’un système existant",
  web: "Site web",
  autre: "Autre sujet",
} as const;
export type SujetKey = keyof typeof SUJETS;

// ?sujet=… dans l'URL → clé de sujet.
const PARAM_SUJETS: Record<string, SujetKey> = {
  refonte: "refonte",
  audit: "diagnostic",
  diagnostic: "diagnostic",
  automatisation: "automatisation",
  ia: "ia",
  agents: "ia",
  documents: "documents",
  logiciel: "logiciel",
  web: "logiciel",
  site: "web",
};

type Data = {
  sujet: string;
  detail: string;
  nom: string;
  email: string;
  tel: string;
  website: string;
  page: string;
  lang: Locale;
  attribution: Attribution | null;
};

type FormT = (key: string, values?: Record<string, string>) => string;

function mailtoHref(d: Data, t: FormT) {
  const subject = t("mailSubject", { sujet: d.sujet, nom: d.nom });
  const body =
    `${t("mailSujet")} : ${d.sujet}\n` +
    (d.detail ? `${t("mailContexte")} : ${d.detail}\n` : "") +
    `${t("mailNom")} : ${d.nom}\n${t("mailCourriel")} : ${d.email}\n` +
    (d.tel ? `${t("mailTel")} : ${d.tel}\n` : "") +
    `\n${t("mailFrom")}`;
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

type DoneState = { kind: "error"; href: string } | null;

export function ContactForm({
  withPhone = false,
  defaultSujet = "diagnostic",
}: {
  withPhone?: boolean;
  defaultSujet?: SujetKey;
}) {
  const t = useTranslations("form");
  const locale = useLocale() as Locale;
  const sujetRef = useRef<HTMLSelectElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<DoneState>(null);

  // Présélection du sujet : ?sujet=refonte, ou clic sur un mandat de la page.
  useEffect(() => {
    const sel = sujetRef.current;
    if (!sel) return;
    const setSujet = (v: string) => {
      for (let i = 0; i < sel.options.length; i += 1) {
        if (sel.options[i].value === v) {
          sel.selectedIndex = i;
          return;
        }
      }
    };
    const param = new URLSearchParams(window.location.search).get("sujet");
    if (param && PARAM_SUJETS[param]) setSujet(SUJETS[PARAM_SUJETS[param]]);

    const links = Array.from(document.querySelectorAll("[data-mandat]"));
    const handlers: Array<() => void> = [];
    links.forEach((link) => {
      // data-mandat = clé de sujet (« refonte ») ou libellé déjà envoyé.
      const h = () => {
        const v = link.getAttribute("data-mandat") || "";
        setSujet(v in SUJETS ? SUJETS[v as SujetKey] : v);
      };
      link.addEventListener("click", h);
      handlers.push(() => link.removeEventListener("click", h));
    });
    return () => handlers.forEach((off) => off());
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const telField = form.elements.namedItem("tel") as HTMLInputElement | null;
    const d: Data = {
      sujet: (form.elements.namedItem("sujet") as HTMLSelectElement).value,
      detail: (form.elements.namedItem("detail") as HTMLTextAreaElement).value.trim(),
      nom: (form.elements.namedItem("nom") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      tel: telField ? telField.value.trim() : "",
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
      page: window.location.pathname,
      lang: locale,
      attribution: getAttribution(),
    };
    if (!d.nom || !/.+@.+\..+/.test(d.email)) {
      setError(t("required"));
      (form.elements.namedItem(!d.nom ? "nom" : "email") as HTMLElement).focus();
      return;
    }
    setError(null);
    setSubmitting(true);
    track("form_submit", { form_subject: d.sujet });
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
      });
      if (!r.ok) throw new Error("send_failed");
      await r.json();
      track("form_sent", { form_subject: d.sujet });
      // Point de conversion unique : /merci/ déclenche `generate_lead` (GA4),
      // l'événement importé comme conversion dans Google Ads / Meta.
      window.location.assign(href(locale, "/merci"));
    } catch {
      setDone({ kind: "error", href: mailtoHref(d, t as unknown as FormT) });
    }
  }

  if (done?.kind === "error") {
    return (
      <div className="form-done">
        <p className="form-done-title">{t("errorTitle")}</p>
        <p className="form-done-text">
          {t.rich("errorText", {
            mail: (chunks) => <a href={done.href}>{chunks}</a>,
            cal: (chunks) => (
              <a href={CAL} target="_blank" rel="noopener">
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>
    );
  }

  return (
    <form id="contact-form" noValidate onSubmit={onSubmit}>
      <div className="form-field">
        <label className="form-label" htmlFor="cf-sujet">
          {t("besoin")}
        </label>
        <select
          ref={sujetRef}
          className="form-input"
          id="cf-sujet"
          name="sujet"
          defaultValue={SUJETS[defaultSujet]}
        >
          {(Object.keys(SUJETS) as SujetKey[]).map((k) => (
            <option key={k} value={SUJETS[k]}>
              {t(`sujets.${k}`)}
            </option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="cf-detail">
          {t("detail")} <span className="form-opt">{t("opt")}</span>
        </label>
        <textarea
          className="form-input form-textarea"
          id="cf-detail"
          name="detail"
          placeholder={t("placeholder")}
        ></textarea>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label className="form-label" htmlFor="cf-nom">
            {t("nom")}
          </label>
          <input
            className="form-input"
            id="cf-nom"
            name="nom"
            type="text"
            autoComplete="name"
          />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="cf-email">
            {t("email")}
          </label>
          <input
            className="form-input"
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
          />
        </div>
      </div>
      {withPhone ? (
        <div className="form-field">
          <label className="form-label" htmlFor="cf-tel">
            {t("tel")} <span className="form-opt">{t("telOpt")}</span>
          </label>
          <input
            className="form-input"
            id="cf-tel"
            name="tel"
            type="tel"
            autoComplete="tel"
            placeholder="418 555-0123"
          />
        </div>
      ) : null}
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
      {error ? (
        <p className="form-error" id="cf-error">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        className="btn-block"
        id="cf-submit"
        disabled={submitting}
      >
        {submitting ? t("sending") : `${t("send")} `}
        {submitting ? null : <span>→</span>}
      </button>
      <p className="form-note">
        {t("note")}{" "}
        <a
          href={CAL}
          target="_blank"
          rel="noopener"
          onClick={(e) => {
            track("clic_audit", { link_url: CAL });
            e.currentTarget.href = withCalendlyUtm(CAL);
          }}
        >
          {t("cal")}
        </a>
        .
      </p>
    </form>
  );
}
