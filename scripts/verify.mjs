// Boucle de vérification pré-déploiement — `pnpm verify` (roule sur `out/`).
// Attrape avant la mise en ligne tout ce qui casserait l'entonnoir payant :
// tracking GA4 absent, lien mort, formulaire sans backend, page de conversion
// indexée, accent corrompu, lien Calendly erroné, fonction d'envoi brisée.
// Sort avec un code non nul si un seul contrôle échoue → bloque le deploy.

import { readFile, readdir, access } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const OUT = "out";
const GA4_ID = "G-QJHNSFXNH0";
const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";
const SITE = "https://gabrielnadon.com";

const errors = [];
const notes = [];
let checks = 0;

function fail(msg) {
  errors.push(msg);
}
function check(cond, msg) {
  checks += 1;
  if (!cond) fail(msg);
}

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir, ext) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(p, ext)));
    else if (entry.name.endsWith(ext)) found.push(p);
  }
  return found;
}

if (!(await exists(OUT))) {
  console.error("✗ Le dossier out/ n'existe pas. Lancer `pnpm build` d'abord.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 1. Contrôles page par page (HTML exporté)
// ---------------------------------------------------------------------------
const htmlFiles = (await walk(OUT, ".html")).filter(
  (p) =>
    !p.includes(`${path.sep}functions${path.sep}`) &&
    // Fichier de vérification Google Search Console : contenu imposé par Google.
    !/googlecea32c85f7e1cf51\.html$/.test(p)
);
check(htmlFiles.length >= 5, `Trop peu de pages HTML exportées (${htmlFiles.length}).`);

const MOJIBAKE = /Ã©|Ã¨|Ã¢|Ã´|Ã»|â€™|â€œ|â€|Ã‰|�/;
const FORBIDDEN = [/TODO/, /FIXME/, /[Ll]orem ipsum/, /\{\{/];

const pages = [];
for (const file of htmlFiles) {
  const rel = path.relative(OUT, file).replaceAll(path.sep, "/");
  const html = await readFile(file, "utf8");
  const is404 = rel === "404.html" || rel === "404/index.html";
  const noindex = /<meta name="robots" content="noindex/.test(html);
  pages.push({ rel, html, is404, noindex });

  check(html.includes(GA4_ID), `${rel} : identifiant GA4 ${GA4_ID} absent.`);
  check(/<html[^>]*lang="fr"/.test(html), `${rel} : attribut lang="fr" absent.`);
  check(/<title>[^<]+<\/title>/.test(html), `${rel} : <title> vide ou absent.`);
  check(!MOJIBAKE.test(html), `${rel} : encodage corrompu détecté (accents cassés).`);
  for (const re of FORBIDDEN) {
    check(!re.test(html), `${rel} : contenu interdit détecté (${re}).`);
  }

  if (!is404) {
    check(
      /<meta name="description" content="[^"]+"/.test(html),
      `${rel} : meta description absente.`
    );
    check(
      /property="og:image" content="[^"]+"/.test(html),
      `${rel} : image OG absente.`
    );
  }
  if (!is404 && !noindex) {
    check(
      /<link rel="canonical" href="[^"]+"/.test(html),
      `${rel} : canonical absent sur une page indexable.`
    );
  }

  // Tout JSON-LD doit être du JSON valide.
  for (const m of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  )) {
    checks += 1;
    try {
      JSON.parse(m[1]);
    } catch {
      fail(`${rel} : bloc JSON-LD invalide.`);
    }
  }

  // Tout lien Calendly doit être LE bon lien.
  for (const m of html.matchAll(/href="(https?:\/\/[^"]*calendly\.com[^"]*)"/g)) {
    check(m[1] === CAL, `${rel} : lien Calendly inattendu (${m[1]}).`);
  }

  // Un formulaire exige le backend + le honeypot.
  if (html.includes('id="contact-form"')) {
    check(html.includes('name="website"'), `${rel} : honeypot absent du formulaire.`);
  }
}

// ---------------------------------------------------------------------------
// 2. Liens et ressources internes → un fichier doit exister
// ---------------------------------------------------------------------------
for (const { rel, html } of pages) {
  const targets = new Set();
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) targets.add(m[1]);
  for (const raw of targets) {
    const clean = raw.split(/[?#]/)[0];
    if (!clean || clean === "/") continue;
    if (clean.startsWith("/api/")) {
      check(
        await exists(path.join(OUT, "functions", clean.slice(1) + ".js")),
        `${rel} : ${clean} sans Pages Function correspondante dans out/functions/.`
      );
      continue;
    }
    const p = path.join(OUT, clean.replaceAll("/", path.sep));
    const ok =
      (await exists(p)) ||
      (await exists(path.join(p, "index.html"))) ||
      (await exists(p + ".html"));
    check(ok, `${rel} : lien interne mort → ${clean}`);
  }
}

// ---------------------------------------------------------------------------
// 3. Sitemap ↔ pages (indexables dedans, noindex dehors)
// ---------------------------------------------------------------------------
const sitemapPath = path.join(OUT, "sitemap.xml");
check(await exists(sitemapPath), "sitemap.xml absent de out/.");
if (await exists(sitemapPath)) {
  const sm = await readFile(sitemapPath, "utf8");
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const loc of locs) {
    check(loc.startsWith(SITE), `sitemap : URL hors domaine (${loc}).`);
    const rel = loc.replace(SITE, "").replace(/^\//, "");
    const p = rel === "" ? "index.html" : path.join(rel, "index.html");
    check(await exists(path.join(OUT, p)), `sitemap : page inexistante (${loc}).`);
  }
  for (const { rel, is404, noindex } of pages) {
    const url = `${SITE}/` + (rel === "index.html" ? "" : rel.replace(/index\.html$/, ""));
    if (is404) continue;
    if (noindex) {
      check(!locs.includes(url), `sitemap : page noindex listée (${url}).`);
    } else {
      check(locs.includes(url), `sitemap : page indexable manquante (${url}).`);
    }
  }
}

// ---------------------------------------------------------------------------
// 4. Entonnoir payant : /diagnostic/, /merci/, code client embarqué
// ---------------------------------------------------------------------------
const diag = pages.find((p) => p.rel === "diagnostic/index.html");
check(!!diag, "Landing /diagnostic/ absente du build.");
if (diag) {
  check(diag.noindex, "/diagnostic/ devrait être noindex (landing payante).");
  check(diag.html.includes("cf-tel"), "/diagnostic/ : champ téléphone absent.");
  check(diag.html.includes("56 000"), "/diagnostic/ : preuve chiffrée (56 000 $) absente.");
  check(diag.html.includes('id="diagnostic"'), "/diagnostic/ : ancre #diagnostic absente.");
}

const merci = pages.find((p) => p.rel === "merci/index.html");
check(!!merci, "Page de conversion /merci/ absente du build.");
if (merci) {
  check(merci.noindex, "/merci/ devrait être noindex.");
  check(merci.html.includes(CAL), "/merci/ : lien Calendly absent.");
}

// Le code client livré doit contenir la logique de tracking et d'attribution.
const jsDir = path.join(OUT, "_next");
if (await exists(jsDir)) {
  const jsFiles = await walk(jsDir, ".js");
  let bundle = "";
  for (const f of jsFiles) bundle += await readFile(f, "utf8");
  for (const needle of ["generate_lead", "gn_attribution", "form_sent", "form_submit", "/merci/", "/api/contact"]) {
    check(bundle.includes(needle), `Code client : « ${needle} » absent des bundles JS.`);
  }
} else {
  fail("out/_next/ absent — export incomplet.");
}

// ---------------------------------------------------------------------------
// 5. Pages Function copiée + tests unitaires de l'envoi
// ---------------------------------------------------------------------------
check(
  await exists(path.join(OUT, "functions", "api", "contact.js")),
  "out/functions/api/contact.js absent — le formulaire serait mort en prod (postbuild non exécuté ?)."
);

const { onRequestPost } = await import(
  new URL("../functions/api/contact.js", import.meta.url)
);

function fakeRequest(body) {
  return { request: { json: async () => body }, env: { RESEND_API_KEY: "clé-test" } };
}
function mockFetch(responses) {
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url, body: JSON.parse(init.body) });
    const ok = responses[calls.length - 1] !== false;
    return { ok, status: ok ? 200 : 500 };
  };
  return calls;
}

const LEAD = {
  sujet: "Automatisation IA",
  detail: "On retape les commandes à la main.",
  nom: "Test Vérification",
  email: "prospect@exemple.ca",
  tel: "418 555-0123",
  page: "/diagnostic/",
  attribution: { utm_source: "google", utm_campaign: "auto-qc", gclid: "abc123" },
  website: "",
};

{
  // Honeypot rempli → ok silencieux, aucun envoi.
  const calls = mockFetch([]);
  const r = await onRequestPost(fakeRequest({ ...LEAD, website: "spam" }));
  check(r.status === 200 && calls.length === 0, "Function : le honeypot déclenche un envoi.");
}
{
  // Courriel invalide → 400.
  mockFetch([]);
  const r = await onRequestPost(fakeRequest({ ...LEAD, email: "pas-un-courriel" }));
  check(r.status === 400, "Function : courriel invalide accepté.");
}
{
  // Lead valide → 200, deux envois (lead + auto-réponse), contenu complet.
  const calls = mockFetch([true, true]);
  const r = await onRequestPost(fakeRequest(LEAD));
  check(r.status === 200, "Function : lead valide refusé.");
  check(calls.length === 2, `Function : ${calls.length} envoi(s) au lieu de 2 (lead + auto-réponse).`);
  if (calls.length === 2) {
    const [lead, reply] = calls;
    check(lead.body.subject.includes("Nouveau lead"), "Function : sujet du courriel de lead inattendu.");
    check(lead.body.text.includes("418 555-0123"), "Function : téléphone absent du courriel de lead.");
    check(lead.body.text.includes("utm_campaign : auto-qc"), "Function : attribution absente du courriel de lead.");
    check(lead.body.text.includes("gclid"), "Function : gclid absent du courriel de lead.");
    check(lead.body.reply_to === LEAD.email, "Function : reply_to du lead incorrect.");
    check(reply.body.to[0] === LEAD.email, "Function : auto-réponse mal adressée.");
    check(reply.body.text.includes(CAL), "Function : lien Calendly absent de l'auto-réponse.");
  }
}
{
  // Resend en panne → 502 (le client bascule sur mailto:).
  mockFetch([false]);
  const r = await onRequestPost(fakeRequest(LEAD));
  check(r.status === 502, "Function : panne Resend non signalée (le fallback mailto ne s'activerait pas).");
}
notes.push("Tests unitaires de functions/api/contact.js : honeypot, validation, contenu, panne.");

// ---------------------------------------------------------------------------
// Bilan
// ---------------------------------------------------------------------------
console.log(`\n${checks} contrôles sur ${htmlFiles.length} pages.`);
for (const n of notes) console.log(`  · ${n}`);
if (errors.length) {
  console.error(`\n✗ ${errors.length} problème(s) — déploiement bloqué :\n`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log("\n✓ Tout est vert — prêt à déployer.");
