// Mesure de l'entonnoir organique : Google → page d'entrée → CTA → lead.
// Un seul endroit pour (1) déduire le canal d'acquisition à partir de
// l'attribution stockée, (2) envoyer les événements GA4 avec leur contexte,
// (3) propager la provenance jusqu'à Calendly (UTM lus dans la réservation).

import { getAttribution, type Attribution } from "@/components/AttributionTracker";

export type Channel =
  | "payant"
  | "organique"
  | "assistant_ia"
  | "social"
  | "campagne"
  | "referent"
  | "direct";

const SEARCH = /(^|\.)(google|bing|duckduckgo|yahoo|ecosia|qwant|brave|startpage)\./;
const AI = /(^|\.)(chatgpt\.com|openai\.com|perplexity\.ai|claude\.ai|copilot\.microsoft\.com|gemini\.google\.com)$/;
const SOCIAL = /(^|\.)(facebook|linkedin|instagram|t|x|twitter|youtube|reddit|lnkd)\.(com|co|in)$/;

function host(url: string) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return "";
  }
}

// Même logique que functions/api/contact.js (deriveChannel) — garder synchronisé.
export function deriveChannel(a: Attribution | null): Channel {
  if (!a) return "direct";
  if (a.gclid || a.msclkid || /cpc|ppc|paid/i.test(a.utm_medium || "")) return "payant";
  // Les assistants IA marquent leurs liens (ChatGPT : ?utm_source=chatgpt.com) :
  // à tester avant la règle « campagne », sinon ces leads y tombent.
  if (AI.test((a.utm_source || "").toLowerCase())) return "assistant_ia";
  if (a.utm_source || a.utm_medium || a.utm_campaign || a.fbclid) return "campagne";
  const h = host(a.referrer || "");
  if (!h || h.endsWith("gabrielnadon.com")) return "direct";
  if (AI.test(h)) return "assistant_ia";
  if (SEARCH.test(h)) return "organique";
  if (SOCIAL.test(h)) return "social";
  return "referent";
}

function context() {
  const a = getAttribution();
  return {
    page_path: window.location.pathname,
    landing_page: a?.landing || window.location.pathname,
    acquisition_channel: deriveChannel(a),
  };
}

export function track(name: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, { ...context(), ...params });
}

// Calendly conserve utm_* dans la réservation : la provenance d'un appel
// réservé sans passer par le formulaire reste ainsi attribuable.
export function withCalendlyUtm(href: string) {
  if (!/calendly\.com/.test(href)) return href;
  try {
    const c = context();
    const url = new URL(href);
    url.searchParams.set("utm_source", "gabrielnadon.com");
    url.searchParams.set("utm_medium", c.acquisition_channel);
    url.searchParams.set("utm_campaign", c.landing_page.slice(0, 80));
    url.searchParams.set("utm_content", c.page_path.slice(0, 80));
    return url.toString();
  } catch {
    return href;
  }
}
