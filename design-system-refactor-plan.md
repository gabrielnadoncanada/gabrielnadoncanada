# Plan de refactor contrôlé — gabrielnadon.com

> Phase 3 — plan uniquement. Aucune modification de code à ce stade.
> Réfs : `design-system-audit.md` (constats) · `design-system-target.md` (~44 tokens cibles).
> Principe : **corriger la source (tokens) avant les feuilles (pages)**, à valeur identique d'abord,
> fusions visibles ensuite, une passe = un groupe cohérent + un build vert.

---

## 0. Règles transverses (valables à chaque passe)

1. **Aucun changement de stack** : on reste en CSS classique dans `app/globals.css`.
2. **Substitution mécanique d'abord** : `rgb(...)` → `var(--token)` **à valeur identique** = zéro risque visuel. Les fusions (écart ≤ 3 RVB) sont marquées 🟡 et validées à l'œil.
3. **Vérification à chaque passe** : `pnpm build` doit rester vert ; comparer `out/` avant/après (`php -S 127.0.0.1:8124 -t out`) sur home + une page cas + diagnostic + merci.
4. **Grep d'usage avant toute suppression/renommage** de classe (elles sont référencées dans le JSX).
5. **Ne pas toucher** : `font-family` (contrainte `next/font`), `border-radius` (identité), les `!important` des media queries (responsive), les overlays `rgba()` d'ombres/header.
6. **Journalisation** : après chaque passe, remplir `design-system-refactor-log.md`.
7. **Un commit par passe** (message `refactor(ui): <passe>`), pour bisect facile en cas de régression.

---

## 1. Fichiers touchés (vue d'ensemble)

| Fichier | Passes concernées | Pourquoi |
|---|---|---|
| `app/globals.css` | 0 → 8 | Source unique du style : tokens + branchement + consolidation composants |
| `app/diagnostic/page.tsx` | 7 | Styles inline répétés (`marginTop:22px`, `maxWidth`, bloc « Lire le cas ») |
| `app/refonte-de-systeme/page.tsx` | 7 | Idem (quasi-copie de diagnostic) |
| `app/cas/synchronisation-prix-fournisseurs/page.tsx` | 7 | Styles inline (`marginTop:22px`, `maxWidth:20ch`, `paddingBottom`) |
| `app/merci/page.tsx` | 7 | Styles inline (`maxWidth:62ch`, bloc inline) |
| `components/ContactForm.tsx` | 7 (optionnel) | Honeypot inline (légitime — probablement laissé tel quel) |
| `components/MinimalFooter.tsx` | 7 (optionnel) | `style={{marginTop:0,borderTop:none,paddingTop:0}}` (override → classe) |

> `components/SiteHeader.tsx`, `Ticker.tsx`, `HomeFooter.tsx`, `TrackedLink.tsx`,
> `AttributionTracker.tsx`, `ConversionPing.tsx` : **pas de style à changer** (logique/markup only).

---

## 2. Détail des passes

### Passe 0 — Fondations : bloc `:root` (risque : nul)
- **Fichier** : `app/globals.css` (ajout en tête, après le `@media print`).
- **Action** : coller le bloc `:root` complet de `design-system-target.md` (~44 tokens). **Ne brancher aucune classe encore.**
- **Valeurs remplacées** : aucune (ajout pur).
- **Cible** : variables CSS définies, prêtes à l'emploi.
- **Risque de régression** : **nul** (aucune classe ne les consomme encore). Build doit rester identique au byte près côté rendu.
- **Vérif** : `pnpm build` vert.

### Passe 1 — Couleurs canoniques (risque : faible)
- **Fichier** : `app/globals.css`.
- **Action** : remplacer par `var(--token)`, **à valeur identique**, les 5 couleurs dominantes :
  - `rgb(155, 123, 56)` → `var(--color-gold)` (38×)
  - `rgb(23, 24, 27)` → `var(--color-ink)` (28×) *(attention : dans les `rgba(23,24,27,α)` d'ombres, NE PAS remplacer — l'alpha reste littéral)*
  - `rgb(221, 214, 200)` → `var(--color-border)` (27×)
  - `rgb(112, 108, 98)` → `var(--color-muted)` (15×)
  - `rgb(244, 241, 234)` → `var(--color-paper)` (11×) *(idem : garder les `rgba(244,241,234,α)` du header littéraux)*
- **Risque** : faible — substitution 1:1. Seul piège : les formes `rgba()` avec alpha à ne pas confondre. → remplacer uniquement les occurrences `rgb(...)` pleines.
- **Vérif** : diff visuel nul attendu ; build vert.

### Passe 2 — Couleurs secondaires + fusions (risque : faible-moyen 🟡)
- **Fichier** : `app/globals.css`.
- **À valeur identique** : `rgb(207,199,181)`→`--color-border-card`, `rgb(185,176,154)`→`--color-gold-faint`, `rgb(189,160,95)`→`--color-gold-on-dark`, `rgb(70,71,74)`→`--color-text-body`, `rgb(91,92,95)`→`--color-text-soft`, `rgb(251,250,246)`→`--color-card`, `rgb(155,176,122)`→`--color-live`, `rgb(146,60,32)`→`--color-danger`, `rgb(233,227,214)`→`--color-border-faint`, `rgb(44,45,49)`→`--color-ink-hover`, `rgb(172,169,160)`→`--color-on-dark-soft`, `rgb(207,202,187)`→`--color-on-dark-faint`.
- **Fusions 🟡 (changement visuel ≤ 3 RVB, à valider à l'œil)** :
  - `rgb(111,108,100)` → `--color-muted`
  - `rgb(250,247,240)` → `--color-card`
  - `rgb(60,61,64)` → `--color-text-body`
  - `rgb(165,163,155)`, `rgb(182,180,172)` → `--color-on-dark-soft`
  - `rgb(236,234,227)` → `--color-on-dark-faint`
  - `rgb(111,108,100)` (dropcap/`portrait-cap`) → `--color-muted`
- **Risque** : moyen sur les 🟡 uniquement → **inspection visuelle ciblée** des zones concernées (`.note`, `.principle`, footer, dropcap, table).
- **Sortie** : plus aucune couleur `rgb()` littérale dans le CSS (hors alpha d'ombres).

### Passe 3 — Typographie (risque : faible-moyen 🟡)
- **Fichier** : `app/globals.css`.
- **Action** :
  - Brancher `font-size` sur `--fs-*` ; **supprimer les demi-pixels** (`13.5→--fs-sm`, `14.5→--fs-base`, `10.5→--fs-2xs`, `11.5→--fs-xs`, `12.5→--fs-sm`, `9.5→--fs-2xs`, `15.5→--fs-md`). 🟡 (écart ≤ 1px)
  - Unifier les `clamp()` redondants (`clamp(32px,5vw,56px)`→`--fs-h1` ; `clamp(22px,2.8vw,33px)`→`--fs-h3`).
  - Brancher `line-height` → `--lh-*` et `letter-spacing` → `--ls-*` (fusions listées en target §2.4/2.5). 🟡
- **Risque** : moyen — les demi-pixels touchent les labels ; vérifier qu'aucun label ne « saute » de ligne. Garder les exceptions nommées (`--fs-stat`, `--fs-money`, dropcap, signature).
- **Vérif** : inspection des sections labels/eyebrows + hero + titres de section.

### Passe 4 — Espacement (risque : moyen 🟡)
- **Fichier** : `app/globals.css`.
- **Action** :
  - Introduire l'échelle `--space-*` + `--pad-section*` / `--maxw-page` / `--gap-hairline`.
  - Brancher les `max-width: 1240px` → `var(--maxw-page)` (10×, identique).
  - Brancher les `padding: 0 clamp(16px,4vw,40px)` → `--pad-section-x` (identique).
  - Arrondir les gaps/margins fixes vers l'échelle 🟡 : `gap:22→24`, `gap:34→36`, `.mt-36→--space-6`, `margin-top:88px` (scroll-margin — **laisser**, lié à l'ancre header).
- **Risque** : moyen — les arrondis de gap peuvent décaler légèrement des grilles. Faire **d'abord** les branchements identiques (max-width, pad-section-x), **ensuite** les arrondis 🟡 dans un sous-commit séparé.
- **Attention** : ne pas toucher aux `!important` responsive ni au `scroll-margin-top:88px`.

### Passe 5 — Boutons (risque : moyen)
- **Fichier** : `app/globals.css`.
- **Action** :
  - Extraire une base commune `.btn` (fond `--color-ink`, texte `--color-paper`, transition) ; faire de `.btn-block`/`.btn-sm` des variantes ne surchargeant que `font-size`/`padding`/`width`.
  - Intégrer le hover dans `.btn:hover` (`background:--color-ink-hover; transform:translateY(-1px)`) ; **conserver** les classes `.scp1`/`.scp2` dans le JSX tant qu'elles y sont référencées OU les remplacer par le hover natif (nécessite grep + édition JSX → à faire en passe 7).
- **Risque** : moyen — `.btn`/`.btn-block` diffèrent d'1px de padding : la fusion doit préserver le rendu de chaque bouton (CTA hero, form, header). Vérifier les 3 emplacements.
- **Dépendance** : la suppression réelle de `.scp1/.scp2` du JSX se fait en passe 7 (couplage CSS↔JSX).

### Passe 6 — Labels mono & cartes (risque : faible-moyen)
- **Fichier** : `app/globals.css`.
- **Action** :
  - Brancher les **~18 classes label mono** sur `--font-mono` + `--fs-2xs|--fs-xs` + `--ls-label|--ls-eyebrow` + `--color-muted|--color-gold`. Supprime les micro-écarts (10/10.5/11 ; 0.1/0.14/0.16). Pas de fusion de classes (on garde les noms sémantiques).
  - Cartes papier (`.contact-card`/`.case-shot`/`.money-box`) : `--color-border-card` + `--color-card` + paddings `clamp` nommés/tokenisés.
- **Risque** : faible-moyen — homogénéise les tailles de label ; vérifier qu'aucun eyebrow ne change d'aspect notablement (11→10 sur certains). Documenter tout écart voulu.

### Passe 7 — Styles inline JSX (risque : faible)
- **Fichiers** : `app/diagnostic`, `app/refonte-de-systeme`, `app/cas/...`, `app/merci`, `components/MinimalFooter`.
- **Action** :
  - Créer les classes utilitaires manquantes dans `globals.css` : `.mt-space-5` (marginTop 22→24 ou classe dédiée `.u-mt-22`), `.u-maxw-20ch`, `.u-maxw-62ch`, `.u-pb-section` (`clamp(40px,5vw,64px)`).
  - Remplacer les 26 `style={{…}}` par ces classes.
  - **Consolider le bloc « Lire le cas → »** (dupliqué diagnostic + refonte) : créer une classe `.link-serif` (≈ `.serif-muted` mais couleur `--color-ink`) et l'appliquer aux deux ; retirer le style inline. Absorbe aussi `.scp5`.
  - `MinimalFooter` : remplacer l'override inline par une classe modificatrice `.footer--flush`.
- **Honeypot** (`ContactForm`) : **laisser inline** (positionnement off-screen fonctionnel, non un token de design).
- **Risque** : faible et localisé (JSX). Build + rendu des 4 pages.

### Passe 8 — Nettoyage & documentation (risque : faible)
- **Fichier** : `app/globals.css` (+ JSX si renommage).
- **Action** :
  - Documenter/renommer les classes opaques : `.scp0-5` (commenter leur rôle), `.bb`/`.bt`/`.band`/`.pt-2`/`.icon-16`/`.icon-18` (commentaire d'usage).
  - Supprimer les résidus d'animation inertes (`transform: none; opacity: 1;` sur `.stat`/`.mandat`/`.step`/`.principle`/`.hero-*` — déjà sans déclencheur, cf. audit) **uniquement si** un grep confirme qu'aucun JS ne les anime.
  - Ajouter un en-tête de commentaire dans `globals.css` pointant vers `design-system-target.md`.
- **Risque** : faible ; le retrait des résidus d'animation doit être vérifié (grep `data-reveal`, `IntersectionObserver` dans components).

---

## 3. Ordre exact d'exécution

```
0. :root tokens            (aucun branchement)         → build
1. couleurs canoniques×5   (identique)                 → build + diff nul
2. couleurs secondaires    (identique) puis fusions 🟡 → build + inspection ciblée
3. typographie             (fs/lh/ls + demi-pixels 🟡) → build + inspection labels/titres
4. espacement              (identique) puis arrondis 🟡→ build + inspection grilles
5. boutons (CSS)                                        → build + 3 CTA
6. labels mono & cartes                                 → build + eyebrows/cartes
7. styles inline JSX + « Lire le cas » + scp*           → build + 4 pages
8. nettoyage/doc/résidus anim                           → build final + audit Phase 5
```

**Chaque passe = 1 commit.** Les sous-étapes 🟡 (fusions visibles) peuvent être un commit séparé
à l'intérieur de la passe pour isoler tout ajustement visuel.

---

## 4. Risques de régression — synthèse

| Passe | Risque | Mitigation |
|---|---|---|
| 0 | Nul | Ajout pur |
| 1 | Faible | Substitution 1:1 ; ne pas toucher les `rgba()` alpha |
| 2 | Faible-moyen 🟡 | Inspection `.note`/`.principle`/footer/table pour les fusions |
| 3 | Faible-moyen 🟡 | Vérifier labels (demi-px) + titres ; garder exceptions nommées |
| 4 | Moyen 🟡 | Identiques d'abord, arrondis gap dans un sous-commit ; ne pas toucher `!important`/`scroll-margin` |
| 5 | Moyen | Vérifier CTA hero/form/header (padding 1px) |
| 6 | Faible-moyen | Vérifier aspect des eyebrows homogénéisés |
| 7 | Faible | JSX localisé ; laisser le honeypot |
| 8 | Faible | Grep anim avant suppression des résidus |

---

## 5. Explicitement HORS scope

- ❌ Migration Tailwind / SCSS / CSS-in-JS.
- ❌ Nouvelle palette, nouvelles couleurs de marque, coins arrondis, ombres « fancy ».
- ❌ Nouveaux composants (Modal, Badge formel, EmptyState) — inexistants dans le produit.
- ❌ Changement de `font-family` / passage à `next/font`.
- ❌ Refonte de mise en page, changement de logique métier, changement des textes (sauf strict alignement UI).
- ❌ Renommage massif des classes sémantiques (`.hero-title`, `.mandat`…).
- ❌ Tokenisation des opacités d'ombres et du header sticky (restent en `rgba()` littéral).
- ❌ Suppression des `!important` responsive et du `scroll-margin-top:88px`.
- ❌ Modification du honeypot inline de `ContactForm`.

---

## 6. Critère de sortie global

À l'issue de la passe 8, relancer les comptages de l'audit (Phase 5) et viser :
couleurs `rgb()` littérales ≈ **0** (hors alpha) · font-size distincts **≤ ~13** · demi-pixels **0** ·
line-height distincts **≤ 6** · styles inline **≤ 5** · variantes de bouton **1 base + 3 modificateurs** ·
rendu visuel **inchangé à l'œil** sur les 4 pages. Résultats consignés dans `design-system-final-report.md`.
