"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

// Déclenché au chargement de /merci/ : envoie l'événement GA4 `generate_lead`,
// celui qu'on marque « événement clé » dans GA4 puis qu'on importe comme
// conversion dans Google Ads. Il porte la page d'entrée et le canal
// (organique, payant…) pour attribuer chaque lead au SEO dans GA4.
// Garde-fou sessionStorage pour ne pas compter deux fois le même lead sur un
// simple rafraîchissement de la page.
export function ConversionPing() {
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem("gn_lead_ping")) return;
      window.sessionStorage.setItem("gn_lead_ping", "1");
    } catch {
      /* si le stockage est bloqué, on envoie quand même l'événement */
    }
    track("generate_lead");
  }, []);
  return null;
}
