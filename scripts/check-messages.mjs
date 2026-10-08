// Vérifie que chaque espace de noms a exactement les mêmes clés en FR et en EN,
// que le JSON est valide, et qu'aucun message ne contient de caractère ICU
// non échappé problématique.
//   node scripts/check-messages.mjs            → tous les espaces de noms
//   node scripts/check-messages.mjs services   → un seul
import { readFile, readdir } from "node:fs/promises";

const only = process.argv[2];
const files = (await readdir("messages/fr")).filter((f) => f.endsWith(".json"));
let errors = 0;

function flatten(obj, prefix = "", out = {}) {
  if (Array.isArray(obj)) {
    out[prefix] = `array(${obj.length})`;
    obj.forEach((v, i) => flatten(v, `${prefix}.${i}`, out));
  } else if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) flatten(v, prefix ? `${prefix}.${k}` : k, out);
  } else {
    out[prefix] = obj;
  }
  return out;
}

for (const f of files) {
  const ns = f.replace(/\.json$/, "");
  if (only && ns !== only) continue;
  let fr, en;
  try {
    fr = flatten(JSON.parse(await readFile(`messages/fr/${f}`, "utf8")));
    en = flatten(JSON.parse(await readFile(`messages/en/${f}`, "utf8")));
  } catch (e) {
    console.error(`✗ ${ns} : JSON invalide — ${e.message}`);
    errors += 1;
    continue;
  }
  for (const k of Object.keys(fr)) {
    if (!(k in en)) { console.error(`✗ ${ns} : clé absente en EN → ${k}`); errors += 1; }
    else if (typeof fr[k] === "string" && fr[k].startsWith("array(") && fr[k] !== en[k]) {
      console.error(`✗ ${ns} : longueur de tableau différente → ${k} (${fr[k]} / ${en[k]})`); errors += 1;
    }
  }
  for (const k of Object.keys(en)) {
    if (!(k in fr)) { console.error(`✗ ${ns} : clé absente en FR → ${k}`); errors += 1; }
  }
  for (const [lang, flat] of [["fr", fr], ["en", en]]) {
    for (const [k, v] of Object.entries(flat)) {
      if (typeof v !== "string") continue;
      // « < » isolé (ex. « < 5 % ») casse t.rich ; accolades = arguments ICU.
      if (/<(?![a-zA-Z/])/.test(v)) { console.error(`✗ ${ns}.${lang} : « < » non balise → ${k}`); errors += 1; }
      if (lang === "en" && /[àâçéèêëîïôûùüÿœ]/i.test(v) && !/Québec|Montréal|Investissement|ESSOR|PME MTL/.test(v)) {
        console.warn(`? ${ns}.en : accent français à vérifier → ${k} : ${v.slice(0, 60)}`);
      }
    }
  }
}
if (errors) {
  console.error(`\n${errors} problème(s).`);
  process.exit(1);
}
console.log(`✓ Messages cohérents FR/EN${only ? ` (${only})` : ""}.`);
