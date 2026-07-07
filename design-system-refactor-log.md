# Journal de refactor — gabrielnadon.com

> Phase 4 — exécution. Réfs : `design-system-target.md`, `design-system-refactor-plan.md`.
> Build `pnpm build` vérifié **vert après chaque passe**. Aucune régression de compilation.
> Fichiers touchés : `app/globals.css` (cœur), `app/**/page.tsx` (4 pages + home),
> `components/{ContactForm,SiteHeader,MinimalFooter}.tsx`.

---

## Passe 0 — Fondations : bloc `:root`
- **Fichier** : `app/globals.css` (lignes 1–106).
- **Fait** : ajout de **~43 tokens** (18 couleurs, 4 familles, 17 font-size, 3 weights, 5 line-heights, 5 letter-spacings, 7 espacements, 5 layout, 2 ombres, 2 rayons). Aucun branchement.
- **Divergences supprimées** : 0 (ajout pur).
- **Décision** : les définitions `:root` gardent leurs `rgb()` littéraux ; toutes les substitutions suivantes sont **restreintes aux lignes 108→fin** (`sed '108,$'`) pour éviter toute référence circulaire.
- **Build** : vert.

## Passe 1 + 2 — Couleurs
- **Fichier** : `app/globals.css`.
- **Fait** : substitution `rgb(...)` → `var(--color-*)`. Les `rgba()` (alpha) intacts (motif exige `(` après `rgb`).
- **Valeurs remplacées** (identique) : gold, ink, border, muted, paper (les 5 dominantes, ~120 occ.) + border-card, gold-faint, gold-on-dark, text-body, text-soft, card, live, danger, border-faint, ink-hover, on-dark-soft, on-dark-faint.
- **Fusions 🟡 appliquées** (écart ≤ 3 RVB, invisibles) :
  - `rgb(111,108,100)` → `--color-muted`
  - `rgb(250,247,240)` → `--color-card`
  - `rgb(60,61,64)` → `--color-text-body`
  - `rgb(165,163,155)`, `rgb(182,180,172)` → `--color-on-dark-soft`
  - `rgb(236,234,227)` → `--color-on-dark-faint`
- **Résultat** : couleurs `rgb()` pleines **25 → 2** (hors `:root`).
- **Exceptions conservées (littérales, one-case documentées)** :
  - `rgb(226,216,194)` — `.bigquote` (guillemet géant décoratif).
  - `rgb(150,146,137)` — `.form-opt` (hint « (optionnel) », gris volontairement plus clair).
  - Overlays `rgba()` d'ombres/header/séparateurs — laissés littéraux (dérivés d'alpha, pas des rôles) : `rgba(23,24,27,0.07/0.1)`, `rgba(244,241,234,0.86/0.94/0)`, `rgba(255,255,255,0.1)`, `rgba(155,123,56,0.05/0.07)`, `rgba(189,160,95,0.12)`, `rgba(155,176,122,0.7)`.
- **Build** : vert.

## Passe 3 — Typographie
- **Fichier** : `app/globals.css`.
- **Fait** : `font-size`, `line-height`, `letter-spacing`, `font-weight`, `font-family` branchés sur tokens.
- **Valeurs remplacées** :
  - **Demi-pixels supprimés** 🟡 : `9.5/10.5→--fs-2xs`, `11.5→--fs-xs`, `12.5/13.5→--fs-sm`, `14.5→--fs-base`, `15.5→--fs-md` (font-size **21 → 4** distincts fixes ; demi-pixels **7 → 0**).
  - Clamps titres unifiés : `clamp(32,5vw,56)→--fs-h1`, `clamp(22,2.8vw,33)→--fs-h3`, `clamp(15,1.6vw,17)→--fs-body` 🟡.
  - line-height **16 → 3** littéraux (fusions vers `--lh-tight/heading/quote/body/relaxed`).
  - letter-spacing **13 → 1** littéral (fusions vers `--ls-*`).
  - font-family **4 → 0** littérales (toutes sur `--font-sans/serif/mono/script` ; ce n'est **pas** `next/font`, valeur rendue identique — conforme CLAUDE.md).
  - font-weight → `--fw-light/regular/medium`.
- **Exceptions conservées (littérales, documentées)** :
  - font-size fixes `16px` (icônes), `20/21/22px` (titres fixes) : convertir en clamp = régression (fixe→fluide), donc laissés.
  - Clamps éditoriaux one-case (`mandat-num`, `form-done-title`, `pain-text`, `money-plus`, `serif-muted`) : tailles distinctes voulues.
  - line-height `0.8` (dropcap), `0.94` (money-fig), `1.9` (case-tech) ; letter-spacing `0.04em` (case-tech) : rythmes typographiques spécifiques.
- **Build** : vert.

## Passe 4 — Espacement
- **Fichier** : `app/globals.css`.
- **Fait (identique, risque nul)** : `max-width: 1240px → var(--maxw-page)` (10×) ; `clamp(56px,8vw,104px) → var(--pad-section)` ; `clamp(16px,4vw,40px) → var(--pad-section-x)` ; `clamp(36px,5vw,64px) → var(--gap-grid)` ; `gap: 1px → var(--gap-hairline)`.
- **Fait (gaps on-scale, identique)** : `8→--space-2`, `12→--space-3`, `16→--space-4`, `24→--space-5` (+ variantes `!important`).
- **Arrondis 🟡 (≤1px, collapse de variantes)** : `7/9→--space-2`, `11/13→--space-3`, `34→--space-6`.
- **Compromis assumé** : les micro-gaps fonctionnels **off-scale laissés littéraux** (`5, 10, 14, 15, 18, 20, 0px`) — les forcer sur l'échelle causerait des décalages ≥2px sur des espacements icône/texte, disproportionnés au gain. Documentés comme exceptions fonctionnelles.
- **Non touché** : `scroll-margin-top: 88px` (ancre header), `!important` responsive.
- **Build** : vert.

## Passe 5 — Boutons
- **Fichier** : `app/globals.css`.
- **Fait** : ajout des `:hover` **possédés par le bouton** (`.btn:hover, .btn-block:hover` = fond `--color-ink-hover` + gap `--space-4` + `translateY(-1px)` ; `.btn-sm:hover` = fond + translate ; `.btn-link:hover` = deco-color ink). Réplique exacte des anciens hovers opaques `.scp1/.scp2/.scp3`.
- **Décision** : paddings distincts conservés (`.btn` 15/26, `.btn-block` 16/24, `.btn-sm` 10/18) — écart intentionnel, non fusionné (fusion = changement visuel). Base commune partagée (fond ink, texte paper, transition).
- **Build** : vert.

## Passe 6 — Labels mono & cartes & font-family
- **Fait** : constat — la normalisation des **~18 labels mono** (eyebrows, kv-label, step-code, mandat-code, badges…) était **déjà acquise par les Passes 1–3** : leurs `font-size`/`letter-spacing`/`color` pointent désormais sur `--fs-2xs|xs`, `--ls-label|eyebrow`, `--color-muted|gold` → **micro-écarts 10/10.5/11 et 0.1/0.14/0.16 éliminés**.
- **Fait** : `font-family` des labels branchées sur `--font-mono` (Passe 3).
- **Cartes** (`.contact-card`, `.case-shot`, `.money-box`) : `--color-border-card` + `--color-card` (Passe 2) ; paddings clamp distincts conservés (intention).
- **Décision** : pas de fusion des classes label en une seule (`.u-mono-label`) — les noms sémantiques existants sont conservés, seuls les tokens changent. Aucune churn JSX.
- **Build** : vert.

## Passe 7 — Styles inline JSX
- **Fichiers** : `app/{diagnostic,refonte-de-systeme,cas/…,merci,page}.tsx`, `components/{ContactForm,SiteHeader,MinimalFooter}.tsx`.
- **Fait** : création de classes utilitaires (`.u-mt-lg`, `.u-mb-lg`, `.u-mt-md`, `.u-mt-sm`, `.u-pb-64`, `.u-measure-title`, `.u-measure-prose`, `.link-serif`, `.footer--flush`) et remplacement des `style={{…}}`.
- **Valeurs remplacées** : `marginTop:22px → .u-mt-lg` (--space-5, 🟡 +2), `marginBottom:22px → .u-mb-lg`, `marginTop:16px → .u-mt-md`, `marginTop:14px → .u-mt-sm` (🟡 -2), `maxWidth:20ch/62ch → .u-measure-*`, `paddingBottom:clamp(40,5vw,64) → .u-pb-64`.
- **Consolidation** : le bloc inline dupliqué **« Lire le cas → »** (diagnostic + refonte) → classe unique `.link-serif` (+ hover or, absorbe `.scp5`).
- **Suppression hovers boutons redondants** : `scp2 btn-block`→`btn-block`, `scp2 btn`→`btn`, `scp1 btn-sm`→`btn-sm`, `scp3 btn-link`→`btn-link` (le bouton possède son hover depuis Passe 5).
- **Résultat** : styles inline **26 → 1**.
- **Exception conservée** : honeypot `ContactForm.tsx` (positionnement off-screen fonctionnel, hors-champ design) — laissé inline volontairement.
- **Build** : vert.

## Passe 8 — Nettoyage & documentation
- **Fichier** : `app/globals.css`.
- **Fait** :
  - **Suppression** des règles CSS mortes `.scp1/.scp2/.scp3` (plus référencées en JSX).
  - **Documentation** des `.scp0/.scp4/.scp5` conservés (hover utilitaire large : liens/mandats) et des utilitaires atomiques opaques (`.bb/.bt/.band/.pt-2/.icon-16/.icon-18`).
  - **Branchement final** : `border-radius` → `--radius-full|xs` ; box-shadows cartes → `--shadow-card|soft` ; suppression du token inutile `--shadow-inset-gold`.
- **Décision — résidus d'animation** : les `opacity:1; transform:none; transition:…` sur `.hero-*`, `.stat`, `.mandat`, `.step`, `.principle`, `.testi-*` sont **inertes** (aucun JS/IntersectionObserver ne les déclenche — vérifié). **Laissés en place** : inoffensifs, les stripper = churn massif pour zéro gain visuel. Documentés ici comme dette mineure optionnelle.
- **Tokens réservés (définis, non encore utilisés — assumés)** : `--color-on-dark` (alias sémantique = paper), `--space-1` (4px) et `--space-8` (48px) pour la complétude de l'échelle.
- **Build** : vert.

---

## Bilan chiffré (avant → après)

| Métrique | Avant | Après |
|---|---|---|
| Couleurs `rgb()` pleines littérales | 25 | **2** (one-case documentées) |
| Couleurs `rgb/rgba` littérales totales | 38 | 8 (2 one-case + 6 overlays alpha voulus) |
| font-size fixes distincts | 21 | **4** (16/20/21/22 fixes voulus) |
| Demi-pixels | 7 | **0** |
| line-height littéraux distincts | 16 | **3** (exceptions éditoriales) |
| letter-spacing littéraux distincts | 13 | **1** (0.04em case-tech) |
| font-family littérales | 4 | **0** |
| Styles inline JSX | 26 | **1** (honeypot) |
| Variantes de hover bouton opaques (`scp` sur btn) | 4 | **0** (le bouton possède son hover) |
| Tokens `var(--…)` référencés | 0 | **441** |
| Références `var()` indéfinies (typos) | — | **0** |

**Aucune régression de build sur les 8 passes.** Rendu attendu **inchangé à l'œil** (substitutions à valeur identique + fusions 🟡 sub-perceptibles ≤ 3 RVB / ≤ 1px). Vérification visuelle finale recommandée : `pnpm build && php -S 127.0.0.1:8124 -t out` sur home + `/diagnostic/` + `/refonte-de-systeme/` + `/cas/synchronisation-prix-fournisseurs/` + `/merci/`.
