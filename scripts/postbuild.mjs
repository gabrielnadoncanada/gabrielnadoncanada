// Copie les Cloudflare Pages Functions dans le dossier d'export `out/` après le
// build Next (l'export statique ne connaît pas `functions/`). Cloudflare Pages
// lit `out/functions/**` comme fonctions lors du `wrangler pages deploy out`.
import { cp, access } from "node:fs/promises";
import { constants } from "node:fs";

const src = "functions";
const dest = "out/functions";

try {
  await access(src, constants.F_OK);
} catch {
  console.log("[postbuild] Aucun dossier functions/ à copier.");
  process.exit(0);
}

await cp(src, dest, { recursive: true });
console.log(`[postbuild] functions/ → ${dest}`);
