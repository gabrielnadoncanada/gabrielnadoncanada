// Postbuild de l'export statique (après `next build`, sur out/) :
//  1. Langues : l'export produit out/fr/** et out/en/** (segment [locale]).
//     - out/fr/** remonte à la racine : les URLs françaises historiques
//       (indexées) ne changent pas → /consultant-ia/, /cas/…/
//     - out/en/<slug-fr>/ est renommé out/en/<slug-en>/ d'après
//       i18n/routing.ts (pathnames) → /en/ai-consultant/
//  2. sitemap.xml (avec hreflang fr-CA / en-CA / x-default) + robots.txt.
//     Exclut les pages noindex (landing payante, merci) et la 404.
//  3. Copie functions/ → out/functions/ (Cloudflare Pages Functions).
import { cp, access, readdir, rename, rm, mkdir, readFile, writeFile, stat } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { routing } from "../i18n/routing.ts";

const OUT = "out";
const SITE = "https://gabrielnadon.com";

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

// Déplace le contenu de src dans dest (fusion récursive), puis supprime src.
async function mergeMove(src, dest) {
  await mkdir(dest, { recursive: true });
  for (const entry of await readdir(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory() && (await exists(to))) {
      await mergeMove(from, to);
    } else {
      if (await exists(to)) await rm(to, { recursive: true, force: true });
      await rename(from, to);
    }
  }
  await rm(src, { recursive: true, force: true });
}

// ---------------------------------------------------------------------------
// 1. Langues
// ---------------------------------------------------------------------------
if (!(await exists(path.join(OUT, "fr")))) {
  console.error("[postbuild] out/fr/ absent : l'export par langue a-t-il eu lieu ?");
  process.exit(1);
}
await mergeMove(path.join(OUT, "fr"), OUT);
console.log("[postbuild] out/fr/** → out/");

// Slugs anglais : renommer du plus profond au moins profond.
const entries = Object.entries(routing.pathnames)
  .filter(([internal, v]) => internal !== "/" && typeof v === "object")
  .map(([internal, v]) => ({ internal, en: v.en }))
  .filter(({ internal, en }) => internal !== en)
  .sort((a, b) => b.internal.split("/").length - a.internal.split("/").length);

for (const { internal, en } of entries) {
  const from = path.join(OUT, "en", internal);
  const to = path.join(OUT, "en", en);
  if (!(await exists(from))) {
    console.error(`[postbuild] page anglaise manquante : out/en${internal}/`);
    process.exit(1);
  }
  await mkdir(path.dirname(to), { recursive: true });
  // Ne déplacer que les fichiers de CETTE page (pas les sous-pages déjà traitées).
  await mkdir(to, { recursive: true });
  for (const f of await readdir(from, { withFileTypes: true })) {
    if (f.isFile()) await rename(path.join(from, f.name), path.join(to, f.name));
  }
}
// Nettoyer les dossiers anglais devenus vides (ex. out/en/cas/).
async function pruneEmpty(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.isDirectory()) await pruneEmpty(path.join(dir, e.name));
  }
  if ((await readdir(dir)).length === 0) await rm(dir, { recursive: true });
}
await pruneEmpty(path.join(OUT, "en"));
console.log(`[postbuild] ${entries.length} slugs anglais renommés`);

// ---------------------------------------------------------------------------
// 2. sitemap.xml + robots.txt
// ---------------------------------------------------------------------------
const publicPath = (locale, internal) => {
  const v = routing.pathnames[internal];
  const p = typeof v === "string" ? v : v[locale];
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${prefix}${p === "/" ? "" : p}/`;
};

const today = new Date().toISOString().slice(0, 10);
const urls = [];
for (const internal of Object.keys(routing.pathnames)) {
  // Une page noindex l'est dans les deux langues : on lit la version FR.
  const frFile = path.join(OUT, publicPath("fr", internal), "index.html");
  if (!(await exists(frFile))) continue;
  const html = await readFile(frFile, "utf8");
  if (/<meta name="robots" content="noindex/.test(html)) continue;
  const alts = routing.locales.map((l) => ({
    hreflang: l === "fr" ? "fr-CA" : "en-CA",
    href: SITE + publicPath(l, internal),
  }));
  alts.push({ hreflang: "x-default", href: SITE + publicPath("fr", internal) });
  for (const l of routing.locales) {
    urls.push({ loc: SITE + publicPath(l, internal), alts });
  }
}

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
  urls
    .map(
      (u) =>
        `<url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq>` +
        u.alts
          .map((a) => `<xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`)
          .join("") +
        `</url>`
    )
    .join("\n") +
  `\n</urlset>\n`;
await writeFile(path.join(OUT, "sitemap.xml"), sitemap);

const noindexPaths = [];
for (const internal of ["/diagnostic", "/merci"]) {
  for (const l of routing.locales) noindexPaths.push(publicPath(l, internal));
}
const robots =
  `User-agent: *\nAllow: /\n` +
  noindexPaths.map((p) => `Disallow: ${p}`).join("\n") +
  `\n\nHost: ${SITE}\n\nSitemap: ${SITE}/sitemap.xml\n`;
await writeFile(path.join(OUT, "robots.txt"), robots);
console.log(`[postbuild] sitemap.xml (${urls.length} URLs) + robots.txt`);

// ---------------------------------------------------------------------------
// 3. Cloudflare Pages Functions
// ---------------------------------------------------------------------------
if (await exists("functions")) {
  await cp("functions", path.join(OUT, "functions"), { recursive: true });
  console.log("[postbuild] functions/ → out/functions");
}

// Garde-fou : la racine doit exister.
const rootIndex = await stat(path.join(OUT, "index.html")).catch(() => null);
if (!rootIndex) {
  console.error("[postbuild] out/index.html absent après le déplacement.");
  process.exit(1);
}
