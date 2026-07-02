"use client";

import { useEffect, useRef, useState } from "react";

const EMAIL = "bonjour@gabrielnadon.com";
const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";

const SUJETS = [
  "Audit d’opérations",
  "Systèmes web sur mesure",
  "Automatisation IA",
  "Refonte d’un système existant",
  "Sites qui convertissent",
  "Autre sujet",
];

const PARAM_SUJETS: Record<string, string> = {
  refonte: "Refonte d’un système existant",
  audit: "Audit d’opérations",
  automatisation: "Automatisation IA",
  web: "Systèmes web sur mesure",
  site: "Sites qui convertissent",
};

function track(name: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name);
  }
}

type Data = {
  sujet: string;
  detail: string;
  nom: string;
  email: string;
  website: string;
};

function mailtoHref(d: Data) {
  const subject = `Demande — ${d.sujet} (${d.nom})`;
  const body =
    `Sujet : ${d.sujet}\n` +
    (d.detail ? `Contexte : ${d.detail}\n` : "") +
    `Nom : ${d.nom}\nCourriel : ${d.email}\n\n(Envoyé depuis gabrielnadon.com)`;
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

type DoneState =
  | { kind: "ok"; prenom: string; email: string }
  | { kind: "error"; href: string }
  | null;

export function ContactForm() {
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
    const d: Data = {
      sujet: (form.elements.namedItem("sujet") as HTMLSelectElement).value,
      detail: (form.elements.namedItem("detail") as HTMLTextAreaElement).value.trim(),
      nom: (form.elements.namedItem("nom") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
    };
    if (!d.nom || !/.+@.+\..+/.test(d.email)) {
      setError("Votre nom et un courriel valide sont requis.");
      (form.elements.namedItem(!d.nom ? "nom" : "email") as HTMLElement).focus();
      return;
    }
    setError(null);
    setSubmitting(true);
    track("form_submit");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
      });
      if (!r.ok) throw new Error("send_failed");
      await r.json();
      track("form_sent");
      setDone({ kind: "ok", prenom: d.nom.split(" ")[0], email: d.email });
    } catch {
      setDone({ kind: "error", href: mailtoHref(d) });
    }
  }

  if (done?.kind === "ok") {
    return (
      <div className="form-done">
        <p className="form-done-title">
          Merci {done.prenom} — votre demande est envoyée.
        </p>
        <p className="form-done-text">
          Je vous réponds sous 24 h à {done.email}. Si c’est urgent,{" "}
          <a href={CAL} target="_blank" rel="noopener">
            réservez 20 minutes directement
          </a>
          .
        </p>
      </div>
    );
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
          Votre besoin
        </label>
        <select
          ref={sujetRef}
          className="form-input"
          id="cf-sujet"
          name="sujet"
          defaultValue="Audit d’opérations"
        >
          {SUJETS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="cf-detail">
          En quelques mots, où perdez-vous le plus de temps ?{" "}
          <span className="form-opt">(facultatif)</span>
        </label>
        <textarea
          className="form-input form-textarea"
          id="cf-detail"
          name="detail"
          placeholder="Ex. : la facturation nous prend deux jours par semaine…"
        ></textarea>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label className="form-label" htmlFor="cf-nom">
            Nom
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
            Courriel
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
        className="scp2 btn-block"
        id="cf-submit"
        disabled={submitting}
      >
        {submitting ? "Envoi en cours…" : "Envoyer ma demande "}
        {submitting ? null : <span>→</span>}
      </button>
      <p className="form-note">
        Réponse sous 24 h. Ou{" "}
        <a
          href={CAL}
          target="_blank"
          rel="noopener"
          onClick={() => track("clic_audit")}
        >
          réservez 20 min directement
        </a>
        .
      </p>
    </form>
  );
}
