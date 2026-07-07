"use client";

import { useEffect } from "react";

const KEY = "gn_attribution";
const CLICK_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "msclkid",
];

export type Attribution = Record<string, string>;

export function getAttribution(): Attribution | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

function hasClickData(a: Attribution | null) {
  return !!a && CLICK_PARAMS.some((p) => p in a);
}

// Capture la provenance du visiteur (UTM, gclid, page d'entrée, référent) et la
// conserve jusqu'à la soumission du formulaire, où elle part dans le courriel
// de lead. Une visite publicitaire (paramètres présents) remplace une
// provenance organique déjà stockée, jamais l'inverse.
export function AttributionTracker() {
  useEffect(() => {
    try {
      const qs = new URLSearchParams(window.location.search);
      const attr: Attribution = {};
      CLICK_PARAMS.forEach((p) => {
        const v = qs.get(p);
        if (v) attr[p] = v.slice(0, 200);
      });

      const stored = getAttribution();
      const incoming = Object.keys(attr).length > 0;
      if (stored && (hasClickData(stored) || !incoming)) return;

      attr.landing = window.location.pathname;
      if (document.referrer) attr.referrer = document.referrer.slice(0, 300);
      attr.premier_contact = new Date().toISOString().slice(0, 10);
      window.localStorage.setItem(KEY, JSON.stringify(attr));
    } catch {
      /* stockage indisponible : la page vit sans attribution */
    }
  }, []);
  return null;
}
