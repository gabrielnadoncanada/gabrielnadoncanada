"use client";

import { useEffect, useRef, useState } from "react";
import { getAttribution, type Attribution } from "@/components/AttributionTracker";
import { track, withCalendlyUtm } from "@/lib/analytics";

const EMAIL = "bonjour@gabrielnadon.com";
const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";

// Valeurs = libellés acceptés par functions/api/contact.js (Set SUJETS) —
// modifier les deux ensemble. Le libellé anglais n'est qu'un affichage.
const SUJETS: Array<{ value: string; en: string }> = [
  { value: "Diagnostic de mes opérations", en: "Review of my operations" },
  { value: "Projet d’IA ou d’agent IA", en: "AI project or AI agent" },
  { value: "Automatiser un processus", en: "Automate a process" },
  { value: "Traitement de documents ou de factures", en: "Document or invoice processing" },
  { value: "Système opérationnel sur mesure", en: "Custom software / internal system" },
  { value: "Refonte d’un système existant", en: "Replace an existing system" },
  { value: "Site web", en: "Website" },
  { value: "Autre sujet", en: "Something else" },
];

const T = {
  fr: {
    besoin: "Votre besoin",
    detail: "En quelques mots, où perdez-vous le plus de temps ?",
    opt: "(facultatif)",
    placeholder: "Ex. : la facturation nous prend deux jours par semaine…",
    nom: "Nom",
    email: "Courriel",
    tel: "Téléphone",
    telOpt: "(facultatif — pour vous rappeler plus vite)",
    required: "Votre nom et un courriel valide sont requis.",
    sending: "Envoi en cours…",
    send: "Envoyer ma demande ",
    note: "Réponse sous 24 h. Ou",
    cal: "réservez 20 min directement",
  },
  en: {
    besoin: "What do you need?",
    detail: "In a few words, where does your team lose the most time?",
    opt: "(optional)",
    placeholder: "E.g. invoices are keyed in by hand two days a week…",
    nom: "Name",
    email: "Email",
    tel: "Phone",
    telOpt: "(optional)",
    required: "Your name and a valid email are required.",
    sending: "Sending…",
    send: "Send my request ",
    note: "Reply within 24 hours. Or",
    cal: "book 20 minutes directly",
  },
};

const PARAM_SUJETS: Record<string, string> = {
  refonte: "Refonte d’un système existant",
  audit: "Diagnostic de mes opérations",
  diagnostic: "Diagnostic de mes opérations",
  automatisation: "Automatiser un processus",
  ia: "Projet d’IA ou d’agent IA",
  agents: "Projet d’IA ou d’agent IA",
  documents: "Traitement de documents ou de factures",
  logiciel: "Système opérationnel sur mesure",
  web: "Système opérationnel sur mesure",
  site: "Site web",
};

type Data = {
  sujet: string;
  detail: string;
  nom: string;
  email: string;
  tel: string;
  website: string;
  page: string;
  attribution: Attribution | null;
};

function mailtoHref(d: Data) {
  const subject = `Demande — ${d.sujet} (${d.nom})`;
  const body =
    `Sujet : ${d.sujet}\n` +
    (d.detail ? `Contexte : ${d.detail}\n` : "") +
    `Nom : ${d.nom}\nCourriel : ${d.email}\n` +
    (d.tel ? `Téléphone : ${d.tel}\n` : "") +
    `\n(Envoyé depuis gabrielnadon.com)`;
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

type DoneState = { kind: "error"; href: string } | null;

export function ContactForm({
  withPhone = false,
  lang = "fr",
  defaultSujet = "Diagnostic de mes opérations",
}: {
  withPhone?: boolean;
  lang?: "fr" | "en";
  defaultSujet?: string;
}) {
  const t = T[lang];
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
    if (param && PARAM_SUJETS[param]) setSujet(PARAM_SUJETS[param]);

    const links = Array.from(document.querySelectorAll("[data-mandat]"));
    const handlers: Array<() => void> = [];
    links.forEach((link) => {
      const h = () => setSujet(link.getAttribute("data-mandat") || "");
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
      attribution: getAttribution(),
    };
    if (!d.nom || !/.+@.+\..+/.test(d.email)) {
      setError(t.required);
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
      window.location.assign("/merci/");
    } catch {
      setDone({ kind: "error", href: mailtoHref(d) });
    }
  }

  if (done?.kind === "error") {
    return (
      <div className="form-done">
        <p className="form-done-title">Un pépin technique est survenu.</p>
        <p className="form-done-text">
          Votre message n’est pas parti.{" "}
          <a href={done.href}>Envoyez-le par courriel</a> (déjà rédigé), ou{" "}
          <a href={CAL} target="_blank" rel="noopener">
            réservez 20 minutes
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form id="contact-form" noValidate onSubmit={onSubmit}>
      <div className="form-field">
        <label className="form-label" htmlFor="cf-sujet">
          {t.besoin}
        </label>
        <select
          ref={sujetRef}
          className="form-input"
          id="cf-sujet"
          name="sujet"
          defaultValue={defaultSujet}
        >
          {SUJETS.map((s) => (
            <option key={s.value} value={s.value}>
              {lang === "en" ? s.en : s.value}
            </option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="cf-detail">
          {t.detail} <span className="form-opt">{t.opt}</span>
        </label>
        <textarea
          className="form-input form-textarea"
          id="cf-detail"
          name="detail"
          placeholder={t.placeholder}
        ></textarea>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label className="form-label" htmlFor="cf-nom">
            {t.nom}
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
            {t.email}
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
            {t.tel} <span className="form-opt">{t.telOpt}</span>
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
        {submitting ? t.sending : t.send}
        {submitting ? null : <span>→</span>}
      </button>
      <p className="form-note">
        {t.note}{" "}
        <a
          href={CAL}
          target="_blank"
          rel="noopener"
          onClick={(e) => {
            track("clic_audit", { link_url: CAL });
            e.currentTarget.href = withCalendlyUtm(CAL);
          }}
        >
          {t.cal}
        </a>
        .
      </p>
    </form>
  );
}
