# Audit du système de design — gabrielnadon.com

> Phase 1 — audit uniquement. Aucun fichier de code n'a été modifié.
> Date : 2026-07-07 · Portée : `app/**`, `components/**`, `app/globals.css`.

---

## 1. Système de style détecté

**CSS classique unique, sans préprocesseur ni framework.**

- Un seul fichier de styles : `app/globals.css` (1784 lignes, ~250 classes utilitaires/composant).
- **Aucun** Tailwind, SCSS/SASS, CSS Modules, styled-components, emotion, vanilla-extract, Bootstrap ni librairie UI externe (vérifié : `package.json` ne contient aucune de ces dépendances, aucun `tailwind.config` / `postcss.config`).
- **Aucune variable CSS** (`:root`, `var()`) : le fichier ne contient pas un seul token. Chaque couleur, taille et espacement est écrit **en dur**, souvent répété à l'identique des dizaines de fois.
- Convention de nommage mixte : classes composant sémantiques (`.hero-title`, `.mandat`, `.contact-card`) + classes utilitaires ad hoc (`.pt-2`, `.mt-36`, `.italic`, `.flex-center`, `.icon-16`, `.icon-18`) + classes de hover numérotées opaques (`.scp0` → `.scp5`).
- Styles inline JSX : **26 occurrences** réparties sur 6 fichiers, majoritairement des micro-ajustements d'espacement (`marginTop`, `maxWidth`) et un bloc typographique dupliqué.
- Polices chargées par `<link>` Google Fonts et référencées par nom dans le CSS : **Geist** (sans), **Geist Mono** (mono), **Spectral** (serif), **Pinyon Script** (signature). Contrainte projet : ne pas migrer vers `next/font`.

**Conclusion : le levier de normalisation est un système de tokens CSS (variables `:root`) — actuellement totalement absent.** Le design est volontairement « éditorial » (coins vifs, or + encre + papier), cohérent en intention mais dispersé en valeurs.

---

## 2. Résumé du problème global

Le site a une **direction visuelle forte et cohérente à l'œil** (palette or/encre/papier, serif Spectral pour les titres, mono pour les labels). Le problème n'est pas esthétique : c'est un problème de **duplication de valeurs magiques** et d'**absence de source de vérité**.

Trois symptômes dominants :

1. **Aucun token** : la même couleur `rgb(221, 214, 200)` (la bordure du site) est réécrite **27 fois**. `rgb(155, 123, 56)` (l'or) **38 fois**. Changer une couleur = un chercher-remplacer risqué sur tout le fichier.
2. **Micro-variations non intentionnelles** : plusieurs valeurs sont à 1–3 unités les unes des autres et ne se distinguent pas à l'œil — ce sont des quasi-doublons accidentels (ex. `rgb(112,108,98)` vs `rgb(111,108,100)`; `rgb(251,250,246)` vs `rgb(250,247,240)`).
3. **Échelle typographique fragmentée** : ~38 tailles de police distinctes, dont une dizaine en **demi-pixel** (`13.5px`, `14.5px`, `10.5px`, `11.5px`, `12.5px`, `9.5px`, `15.5px`) qui sont des ajustements one-case.

---

## 3. Nombre approximatif de variations trouvées

| Catégorie | Valeurs distinctes | Cible raisonnable | Verdict |
|---|---|---|---|
| Couleurs (rgb/rgba) | **38** | ~14 rôles | 🔴 fort |
| font-size (fixe px) | **21** | ~7 niveaux | 🔴 fort |
| font-size (clamp) | **17** | ~8 niveaux | 🟠 moyen |
| font-family | 4 | 4 | 🟢 OK |
| font-weight | 3 (300/400/500) | 3 | 🟢 OK |
| line-height | **16** | ~6 | 🟠 moyen |
| letter-spacing | **13** | ~6 | 🟠 moyen |
| gap (fixe) | **17** | ~7 échelle | 🟠 moyen |
| padding (fixe) | ~12 combinaisons | échelle | 🟠 moyen |
| margin-top/bottom (fixe) | **14** | échelle | 🟠 moyen |
| border-radius | 2 (`50%`, `1px`) | 2 | 🟢 OK (design à angles vifs, intentionnel) |
| box-shadow | 6 | ~3 | 🟠 moyen |
| max-width | 7 | 1 conteneur + breakpoints | 🟢 OK |
| styles inline JSX | 26 | ~5 | 🟠 moyen |

**Ordre de grandeur : ~150 valeurs magiques distinctes** là où ~50 tokens couvriraient tout le site sans perte visuelle.

---

## 4. Liste des divergences par catégorie

### 4.1 Couleurs (le pire foyer de divergence)

**Rôles réels identifiés (à tokeniser) :**

| Rôle | Valeur canonique | Occurrences |
|---|---|---|
| Accent / or | `rgb(155, 123, 56)` | 38 |
| Encre / foreground | `rgb(23, 24, 27)` | 28 |
| Bordure standard | `rgb(221, 214, 200)` | 27 |
| Label mono / muted | `rgb(112, 108, 98)` | 15 |
| Papier / background | `rgb(244, 241, 234)` | 11 |
| Corps de texte muted | `rgb(70, 71, 74)` | 7 |
| Corps de texte muted (2) | `rgb(91, 92, 95)` | 6 |
| Or clair (fils fins) | `rgb(185, 176, 154)` | 6 |
| Corps de texte muted (3) | `rgb(60, 61, 64)` | 4 |
| Carte fond clair | `rgb(251, 250, 246)` | 4 |
| Bordure carte | `rgb(207, 199, 181)` | 4 |
| Or sur fond sombre | `rgb(189, 160, 95)` | 4 |
| Vert « live » | `rgb(155, 176, 122)` | 2 |

**Quasi-doublons à fusionner (invisibles à l'œil) :**

- `rgb(112, 108, 98)` **≈** `rgb(111, 108, 100)` — écart d'1 unité, même rôle (label mono muted). → fusionner.
- `rgb(251, 250, 246)` **≈** `rgb(250, 247, 240)` — fonds de carte clairs, écart ≤3. → fusionner.
- **Trois gris de corps** quasi indiscernables : `rgb(60,61,64)`, `rgb(70,71,74)`, `rgb(91,92,95)` — tous du texte secondaire dans un intervalle de 20 unités. → réduire à **deux** (muted / muted-fort) maximum.
- **Deux ors** : `rgb(155,123,56)` (sur clair) et `rgb(189,160,95)` (sur sombre). Distinction **intentionnelle** (contraste sur fond noir) → à garder mais tokeniser (`--gold` / `--gold-on-dark`).

**Couleurs one-case (1 seule occurrence) — suspectes :**

`rgb(250, 247, 240)`, `rgb(236, 234, 227)`, `rgb(233, 227, 214)`, `rgb(226, 216, 194)`, `rgb(207, 202, 187)`, `rgb(182, 180, 172)`, `rgb(165, 163, 155)`, `rgb(150, 146, 137)`, `rgb(146, 60, 32)` (erreur formulaire — légitime, à tokeniser `--danger`), `rgb(111, 108, 100)`, `rgb(44, 45, 49)` (hover encre — légitime `--ink-hover`), `rgb(172, 169, 160)` (×2, muted sur sombre).

→ La plupart sont des gris muted sur fond sombre (`.note`, `.principle`, footer) qui pourraient se ramener à 2–3 tokens `--muted-on-dark-*`.

**Hardcodées dans le JSX (hors CSS) :** `rgb(23,24,27)`, `rgb(185,176,154)` (bloc « Lire le cas → » dupliqué dans `diagnostic` et `refonte`), `rgb(155,123,56)` via `.scp5`.

### 4.2 Typographie — font-size

**21 tailles fixes** dont une dizaine en demi-pixel (one-case, non intentionnel) :

- Doublons proches à fusionner : `13.5` / `14` / `14.5` (labels & petit corps) ; `10` / `10.5` / `11` (labels mono) ; `12` / `12.5` / `13`.
- **17 échelles `clamp()`** différentes pour les titres — beaucoup ne servent qu'une fois (`clamp(26px,3vw,34px)`, `clamp(20px,2.3vw,27px)`, `clamp(22px,2.8vw,33px)`, `clamp(17px,2vw,21px)`…). Plusieurs sont des variantes quasi identiques (`clamp(32px,5vw,58px)` vs `clamp(32px,5vw,56px)`).

**Hiérarchie réelle observée (à formaliser) :**
- Display/hero : `clamp(38px, 6.4vw, 72px)` (Spectral 400)
- Titre section H2 : `clamp(28px, 4vw, 44px)` / `clamp(32px, 5vw, 56px)` (Spectral 400)
- Titre carte : `20–22px` (Spectral 500)
- Corps large : `clamp(15px, 1.6vw, 18px)` (×3, cohérent ✅)
- Corps : `14–15px`
- Petit / label : `13–13.5px`
- Label mono (eyebrow) : `10–11px` uppercase + letter-spacing

### 4.3 line-height / letter-spacing

- **16 line-height** distincts : `1.5`, `1.55`, `1.6`, `1.62`, `1.68`, `1.7` cohabitent pour le même rôle « corps de texte ». → réduire à ~3 (serré titres / normal / lâche prose).
- **13 letter-spacing** : `0.08em`, `0.1em`, `0.12em`, `0.14em`, `0.16em` tous pour des labels mono uppercase. → réduire à 2–3 (`0.1em` label, `0.14em` eyebrow).

### 4.4 Espacement (padding / gap / margin)

- **Pas d'échelle** : les gaps fixes vont de `1px, 5, 7, 8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 24, 34px` — 17 valeurs sans logique 4/8.
- Marges one-case : `.mt-36` (36px), `margin-top: 88px`, `.pt-2`.
- Le **bon réflexe est déjà présent** pour l'espacement de section : usage cohérent et répété de `clamp(...)` pour paddings verticaux de section (`clamp(56px, 8vw, 104px)` etc.). C'est le seul endroit « systématisé ».
- **26 styles inline** dont **`marginTop: "22px"` répété 4 fois** dans 4 pages différentes → devrait être une classe.

### 4.5 Boutons

Quatre variantes visuelles qui partagent le **même style de base** (fond `rgb(23,24,27)`, texte `rgb(244,241,234)`, pas de radius, transition) mais avec padding & font-size divergents :

| Classe | font-size | padding | Rôle |
|---|---|---|---|
| `.btn` | 15px | 15px 26px | CTA principal |
| `.btn-block` | 15px | 16px 24px | CTA formulaire (pleine largeur) |
| `.btn-sm` | 13.5px | 10px 18px | CTA header |
| `.btn-link` | 15px | — | lien souligné (variante « ghost ») |

→ `.btn` et `.btn-block` ne diffèrent que d'`1px` de padding vertical/horizontal : quasi-doublon. Consolidables en un bouton + modificateurs (`--sm`, `--block`).

Les hovers sont éclatés dans des classes opaques `.scp1`, `.scp2` (identiques : `background: rgb(44,45,49); transform: translateY(-1px)`) → devraient être le `:hover` du bouton lui-même.

### 4.6 Inputs / formulaire

Section **cohérente et bien faite** (`.form-input`, `.form-textarea`, `select.form-input`, états `:hover`/`:focus-visible`/`::placeholder`). Peu de divergence interne. Seul point : couleurs et tailles hardcodées comme partout (`14.5px`, `rgb(207,199,181)`, `rgb(251,250,246)`) → à tokeniser mais pas à restructurer.

### 4.7 Cards

Plusieurs « cartes » avec le même langage (bordure fine + fond papier clair + padding clamp) mais valeurs légèrement différentes :

- `.contact-card` : `border rgb(207,199,181)` + `bg rgb(251,250,246)` + `padding clamp(24px,3vw,36px)`
- `.case-shot` : `border rgb(207,199,181)` + `bg rgb(251,250,246)` + `padding clamp(18px,2.2vw,26px)`
- `.money-box` : `border rgb(207,199,181)` + `bg rgb(251,250,246)` + `padding clamp(30px,4vw,48px)` + shadow
- `.stat` / `.step` / `.principle` : fond plein (`rgb(244,241,234)` ou `rgb(23,24,27)`), padding clamp

→ Même « carte papier » déclinée 3 fois avec padding différent : candidate à une convention commune `--card-*`.

### 4.8 Tables

Une seule table (`.case-shot-table`) — pas de divergence inter-table. Tailles internes en demi-pixel (`9.5px`, `12.5px`, `13px`) et 2 bordures différentes (`rgb(221,214,200)` header, `rgb(233,227,214)` lignes — la 2e est one-case).

### 4.9 Modals / Dialogs / Badges / Empty states

- **Aucune modal/dialog** dans le projet.
- **Badges** : `.case-shot-badge`, `.mandat-code`, les eyebrows mono jouent ce rôle (label mono uppercase or). Pas de composant badge formel mais un pattern récurrent très répété (mono 10–11px, letter-spacing, uppercase, or) → **candidat n°1 à une classe/token partagé** (voir §7).
- **Empty states** : aucun.

---

## 5. Valeurs les plus utilisées (candidates canoniques)

- **Couleur** : or `rgb(155,123,56)` (38), encre `rgb(23,24,27)` (28), bordure `rgb(221,214,200)` (27), muted `rgb(112,108,98)` (15), papier `rgb(244,241,234)` (11).
- **font-family** : `"Geist Mono", monospace` (30), `Spectral, serif` (26).
- **font-weight** : 500 (10), 400 (9).
- **line-height** : `1` (8, titres), `1.62` (4), `1.5` (4).
- **letter-spacing** : `0.1em` (10), `0.14em` (6), `-0.01em` (6).
- **border** : `1px solid rgb(221,214,200)` (top 12 + bottom 8 = 20 occurrences).
- **max-width conteneur** : `1240px` (10).
- **font-size** : `11px` (9), `15px` (8), `10px`/`10.5px` (7 chacun).

Ces valeurs sont les **cibles de tokenisation** naturelles — elles deviennent les variables `:root`.

---

## 6. Valeurs one-case ou suspectes

**Couleurs (1 seule occ.)** : `rgb(250,247,240)`, `rgb(236,234,227)`, `rgb(233,227,214)`, `rgb(226,216,194)`, `rgb(207,202,187)`, `rgb(182,180,172)`, `rgb(165,163,155)`, `rgb(150,146,137)`, `rgb(111,108,100)`, `rgb(146,60,32)`.

**font-size one-case** : `9px`, `9.5px`, `11.5px`, `12.5px`, `15.5px`, `21px`, `42px`, `56px` + ~10 `clamp()` uniques.

**line-height one-case** : `0.8`, `0.94`, `1.08`, `1.3`, `1.4`, `1.45`, `1.68`, `1.7`, `1.9`.

**Espacements one-case** : `.mt-36`, `margin-top: 88px`, `gap: 34px`, `gap: 5px`, `padding: 5px 11px 0px 0px` (dropcap).

**Classes utilisées une seule fois qui recréent un style existant** :
- Bloc inline « Lire le cas → » (2 pages) recrée quasiment `.serif-muted` (`clamp(16px,1.8vw,20px)` + Spectral) — seule la couleur diffère (`rgb(23,24,27)` vs `rgb(60,61,64)`). → doublon à consolider.
- `.txt-sm-gray` et `.txt-sm-gray-mt` : identiques à 1 propriété près (`margin-top`). → fusionner + modificateur.
- `.link-quiet` / `.foot-nav-link` / `.footer-email` : trois liens « discret » très proches.

**Classes opaques non documentées** : `.scp0`–`.scp5` (hovers), `.bb`, `.bt`, `.band`, `.pt-2`, `.mt-36`, `.icon-16`, `.icon-18` — nommage cryptique, à renommer/documenter.

---

## 7. Composants les plus incohérents

1. **Boutons** (`.btn` / `.btn-block` / `.btn-sm` + hovers `.scp1`/`.scp2`) — 4 variantes d'une même base, hovers dispersés. **Priorité haute.**
2. **Label mono / eyebrow / badge** — le même pattern (mono uppercase + letter-spacing + or/muted) est réimplémenté dans **~15 classes** : `.eyebrow`, `.hero-eyebrow`, `.note-eyebrow`, `.testi-eyebrow`, `.contact-eyebrow`, `.foot-label`, `.foot-label-social`, `.sectors-label`, `.form-label`, `.kv-label`, `.kv-label-block`, `.mandat-code`, `.step-code`, `.case-shot-badge`, `.sig-role`, `.cap-txt`, `.copyright`, `.to-top`. Chacune redéfinit `font-family/size/letter-spacing/text-transform/color` avec de micro-écarts (10 vs 10.5 vs 11px, 0.1 vs 0.14 vs 0.16em). **Foyer de divergence n°1 en volume.**
3. **Cartes papier** (`.contact-card` / `.case-shot` / `.money-box`) — même langage, 3 paddings différents.
4. **Liens discrets** (`.link-quiet` / `.foot-nav-link` / `.footer-email` / `.to-top`).

---

## 8. Pages les plus incohérentes

Le CSS étant centralisé, l'incohérence est surtout **dans `globals.css`**, pas entre pages. Mais côté JSX :

1. **`app/diagnostic/page.tsx`** et **`app/refonte-de-systeme/page.tsx`** — chacune ~8 styles inline, dont le bloc typographique dupliqué « Lire le cas → » et les `marginTop:"22px"` / `maxWidth:"20ch"` / `maxWidth:"62ch"` répétés. Ces deux pages sont des quasi-copies structurelles (mêmes sections, mêmes inline styles) → toute divergence entre elles est accidentelle.
2. **`app/cas/synchronisation-prix-fournisseurs/page.tsx`** — 5 styles inline (`marginTop:"22px"`, `maxWidth:"20ch"`, `paddingBottom: clamp(...)`).
3. **`app/merci/page.tsx`** — reprend le même bloc `maxWidth:"62ch"` + inline.

Les 4 pages partagent les mêmes 3–4 styles inline (`marginTop:"22px"`, `maxWidth:"20ch"`, `maxWidth:"62ch"`, `paddingBottom: clamp(40px,5vw,64px)`) → ce sont des conventions non nommées.

---

## 9. Sources probables de divergence

1. **Origine « HTML statique exporté »** : le CLAUDE.md indique que le CSS a été « repris byte-identique » d'un ancien `styles.css`, lui-même vraisemblablement **généré/exporté depuis un outil de design** (d'où les couleurs en `rgb()` entiers non ronds, les demi-pixels, les hovers `.scp0-5` numérotés automatiquement, les `transform: none` / `opacity: 1` résiduels d'animations). Ces artefacts d'export expliquent 80 % des quasi-doublons.
2. **Absence de couche de tokens** dès le départ → chaque nouvel élément recopie une valeur voisine « à l'œil » au lieu de référencer une variable.
3. **Duplication par copier-coller entre pages** (`diagnostic` ↔ `refonte` ↔ `cas`) → les styles inline se propagent.
4. **Micro-ajustements manuels** (demi-pixels, `marginTop:22px`) posés au fil de l'eau sans échelle de référence.

---

## 10. Risques si on refactor sans précaution

1. **Régression visuelle globale** : `globals.css` pilote 100 % du rendu. Une erreur sur `rgb(221,214,200)` (27 bordures) casse tout le maillage visuel. → tokeniser **à valeur identique** d'abord, ne fusionner les quasi-doublons qu'ensuite, vérifier au build.
2. **Fusion de couleurs trop agressive** : les deux ors (`155,123,56` / `189,160,95`) et les gris muted-sur-sombre sont des **choix de contraste réels** sur fonds noirs (`.note`, `.principle`). Les fusionner à l'aveugle dégraderait la lisibilité. → traiter comme tokens distincts, pas comme doublons.
3. **Coins vifs = choix de design** : `border-radius` quasi absent est **intentionnel** (identité éditoriale). Ne pas « adoucir ».
4. **Polices par nom** : ne pas toucher aux `font-family` (contrainte projet `next/font`).
5. **Classes utilitaires supprimées trop vite** (`.pt-2`, `.bb`, `.scp2`…) : elles sont référencées dans le JSX. Toute suppression exige un `grep` d'usage préalable.
6. **`!important` massif dans les media queries** : la responsivité repose sur des overrides `!important`. Un refactor de spacing doit préserver ces points de rupture.
7. **Build statique** : vérifier `pnpm build` vert + comparaison visuelle `out/` avant/après à chaque passe.

---

## 11. Recommandation de normalisation

**Principe directeur : introduire une couche de tokens `:root` et y brancher les classes existantes — sans changer le rendu, sans changer de stack, sans nouveau composant.**

Le problème est à **90 % de la duplication de valeurs**, pas de l'architecture. La bonne réponse est donc :

1. **Créer un bloc `:root` de ~40 variables CSS** dans `globals.css` (couleurs par rôle, échelle typo, échelle d'espacement, line-heights, letter-spacings, ombres). Rien d'autre — pas de design system abstrait, pas de 2xl/3xl inutiles.
2. **Remplacer les valeurs canoniques** (or, encre, bordure, papier, muted…) par `var(--…)` — remplacement mécanique **à valeur identique**, zéro changement visuel.
3. **Fusionner les quasi-doublons invisibles** (les deux `112/111,108,98/100` ; les deux fonds carte ; les 3 gris de corps → 2) en pointant vers le même token. Changement visuel négligeable (< 3 unités RVB), à valider à l'œil.
4. **Consolider les patterns répétés en conventions** :
   - un token/mixin conceptuel « label mono » (les ~18 eyebrows/labels) — via une classe utilitaire `.u-mono-label` + modificateurs de taille, ou au minimum des variables `--label-size` / `--label-tracking`.
   - un bouton de base + modificateurs (`.btn`, `.btn--sm`, `.btn--block`) avec `:hover` intégré (absorber `.scp1`/`.scp2`).
   - une convention « carte papier » (bordure + fond + padding-token).
5. **Rationaliser l'échelle typo** : mapper les 21 tailles fixes sur ~7 tokens (`--fs-caption`, `--fs-label`, `--fs-small`, `--fs-body`, `--fs-body-lg`, `--fs-card-title`, `--fs-h2`, `--fs-display`), en supprimant les demi-pixels one-case au profit du voisin le plus standard.
6. **Sortir les styles inline JSX répétés** (`marginTop:22px`, `maxWidth:20ch/62ch`, bloc « Lire le cas ») vers des classes CSS.

**Ce qui NE doit PAS être fait** : migration Tailwind/SCSS, nouvelle palette, ajout de coins arrondis, refonte des composants, création d'abstractions génériques, changement des textes, > ~45 tokens.

---

## 12. Ordre de correction proposé

Du plus structurant/sûr au plus localisé (respecte « corriger la source avant les feuilles ») :

1. **Passe 0 — Tokens (fondations)** : ajouter le bloc `:root` dans `globals.css` avec toutes les variables, **sans encore rien brancher**. Aucun risque visuel. Build vert.
2. **Passe 1 — Couleurs canoniques** : remplacer les 5 couleurs dominantes (or, encre, bordure, papier, muted) par `var(--…)` partout. ~120 remplacements mécaniques à valeur identique.
3. **Passe 2 — Couleurs secondaires + fusion des quasi-doublons** : brancher les gris de corps, fonds de carte, ors-sur-sombre, danger, live-green ; fusionner les doublons invisibles. Vérification visuelle.
4. **Passe 3 — Typographie** : brancher `font-size`/`line-height`/`letter-spacing` sur les tokens ; supprimer les demi-pixels one-case ; unifier les `clamp()` redondants.
5. **Passe 4 — Espacement** : introduire l'échelle `--space-*` ; brancher gaps/paddings/margins fixes ; supprimer `.mt-36`/`margin-top:88px` au profit de l'échelle.
6. **Passe 5 — Boutons** : consolider `.btn`/`.btn-block`/`.btn-sm` + intégrer les hovers `.scp*`.
7. **Passe 6 — Labels mono & cartes** : convention partagée pour les ~18 eyebrows/labels et les 3 cartes papier.
8. **Passe 7 — Styles inline JSX** : extraire les inline répétés vers des classes ; consolider le bloc « Lire le cas → ».
9. **Passe 8 — Nettoyage** : renommer/documenter les classes opaques (`.scp*`, `.bb`, `.bt`, `.pt-2`), supprimer les résidus d'animation morts (`transform: none; opacity: 1` déjà inertes).

> **Aucune modification de code ne sera faite avant validation de cet audit.**
> Prochaine étape sur accord : Phase 2 (définition du système cible minimal ~40 tokens) puis Phase 3 (plan de refactor détaillé).
