# Rapport final — normalisation du système visuel · gabrielnadon.com

> Phase 5. Système : **CSS classique unique** (`app/globals.css`). Pas de Tailwind,
> SCSS, CSS-in-JS ni framework — donc aucune mention de ces stacks ci-après (non pertinent).
> Le site reste sur sa stack ; l'identité (or/encre/papier, angles vifs, polices par nom)
> est intacte. Le système existant a été **renforcé par une couche de tokens**, pas remplacé.

---

## 1. Ce qui a été nettoyé

### Couche de tokens créée (source de vérité)
Un bloc `:root` unique de **~42 tokens** pilote désormais tout le rendu. **441 références `var(--…)`** remplacent ~150 valeurs magiques éparpillées. Zéro référence indéfinie (aucun typo).

### Comparatif avant / après (mesuré)

| Métrique | Avant | Après | Réduction |
|---|---|---|---|
| Couleurs `rgb()` pleines littérales | 25 | **2** | −92 % |
| Couleurs littérales totales (rgb+rgba) | 38 | 8 | −79 % |
| font-size fixes distincts | 21 | **4** | −81 % |
| **Demi-pixels** (`13.5px`…) | 7 | **0** | −100 % |
| line-height littéraux | 16 | **3** | −81 % |
| letter-spacing littéraux | 13 | **1** | −92 % |
| font-family littérales | 4 | **0** | −100 % |
| Styles inline JSX | 26 | **1** | −96 % |
| Hovers bouton opaques (`scp` sur btn) | 4 | **0** | −100 % |

### Consolidations structurelles
- **Boutons** : `.btn` (base) + `.btn-block`/`.btn-sm`/`.btn-link` (modificateurs), avec `:hover` **possédé par le composant** (fin des classes opaques `.scp1/2/3`, supprimées).
- **Labels mono** (~18 classes eyebrow/label/badge) : tous branchés sur `--fs-2xs|xs`, `--ls-label|eyebrow`, `--color-muted|gold` → micro-écarts (10/10.5/11px ; 0.1/0.14/0.16em) **éliminés**.
- **Bloc « Lire le cas → »** dupliqué (2 pages) → classe unique `.link-serif`.
- **Cartes papier** : bordure/fond unifiés sur `--color-border-card` / `--color-card`.
- **Couleurs quasi-doublons invisibles fusionnées** : `111,108,100→muted`, `250,247,240→card`, `60,61,64→text-body`, `165/182…→on-dark-soft`, `236…→on-dark-faint`.

---

## 2. Ce qui reste incohérent (et pourquoi)

Chaque item restant est une **exception assumée et documentée**, pas un oubli :

| Reste | Où | Pourquoi conservé |
|---|---|---|
| `rgb(226,216,194)` | `.bigquote` | Teinte décorative one-case (guillemet géant). Tokeniser = +1 token pour 1 usage. |
| `rgb(150,146,137)` | `.form-opt` | Gris volontairement plus clair pour « (optionnel) ». Rôle distinct du muted. |
| 6 overlays `rgba()` | ombres, header sticky, séparateurs | Dérivés d'alpha (0.05→0.94), pas des rôles de couleur. Tokeniser alourdirait sans réduire de divergence. |
| font-size `16/20/21/22px` fixes | icônes, titres de carte | Convertir en `clamp` = passage fixe→fluide = **régression** de comportement. |
| Clamps éditoriaux one-case | `mandat-num`, `pain-text`, `money-plus`, `serif-muted`, `form-done-title` | Tailles distinctes voulues ; fusion = changement visuel. |
| line-height `0.8 / 0.94 / 1.9` | dropcap, money-fig, case-tech | Rythmes typographiques spécifiques (chevauchement, liste mono aérée). |
| letter-spacing `0.04em` | case-tech | Interlettrage serré voulu sur liste monospace. |
| gaps `5/10/14/15/18/20px` | espacements icône/texte | Off-scale fonctionnels ; les forcer = décalages ≥2px disproportionnés. |
| Honeypot inline | `ContactForm.tsx` | Positionnement off-screen anti-spam, hors-champ design. |
| Résidus d'animation inertes | `.hero-*`, `.stat`, `.mandat`… | `opacity:1/transform:none` d'un système de reveal JS retiré. Inoffensifs. |
| `.scp0/.scp4/.scp5` | liens/mandats | Hover utilitaire large, encore utilisé. Renommage = churn JSX massif à risque. |

---

## 3. Ce qui devrait être corrigé plus tard (dette optionnelle)

Aucun de ces points n'est bloquant ; à traiter seulement si l'occasion se présente :

1. **Renommer `.scp0/4/5`** en noms sémantiques (`.link-hover-ink`, `.row-hover-gold`, `.link-hover-gold`) — nécessite d'éditer ~23 `className` dans le JSX. Reporté (risque/gain).
2. **Retirer les résidus d'animation morts** (`transition/opacity:1/transform:none`) — cosmétique, ~10 règles. Vérifier une dernière fois l'absence de JS reveal avant.
3. **Tokeniser `16/20/21/22px`** si un jour on introduit une échelle de titres fixes (`--fs-title-sm/md`) — pour l'instant 4 valeurs distinctes acceptables.
4. **Consolider les paddings de carte** en 1–2 tokens `--card-pad-*` si une 4ᵉ carte apparaît.

---

## 4. Règles pour éviter que le système rediverge

1. **Toute valeur passe par un token.** Interdit d'écrire une couleur `rgb()`, une taille `px` ou un espacement en dur dans une classe — utiliser `var(--…)`. Si le token n'existe pas et que le besoin est réel, l'ajouter dans `:root` **avec un commentaire de rôle**.
2. **Pas de demi-pixel** (`13.5px`). Choisir le pas d'échelle le plus proche.
3. **Une couleur = un rôle.** Avant d'ajouter une couleur, vérifier qu'aucun token existant ne couvre le rôle (grep sur `--color-`). Deux couleurs à ≤ 3 RVB = un doublon → réutiliser l'existant.
4. **Pas de `style={{…}}` dans le JSX** pour du style réutilisable → créer une classe (`.u-*` pour un utilitaire, classe sémantique sinon). Exception unique tolérée : positionnement fonctionnel non-visuel (honeypot).
5. **Le hover appartient au composant**, pas à une classe opaque annexe.
6. **Ne pas convertir un `px` fixe en `clamp`** (ni l'inverse) sans intention explicite : c'est un changement de comportement responsive.
7. **Ne pas toucher** : `font-family` (contrainte `next/font`), `border-radius` quasi-nul (identité éditoriale à angles vifs), `!important` responsive, `scroll-margin-top`.

---

## 5. Conventions pour les nouveaux composants

**Couleurs** — piocher dans les rôles : fonds `--color-paper|card|ink` ; accent `--color-gold` (clair) / `--color-gold-on-dark` (sur ink) ; bordures `--color-border|border-card` ; texte `--color-ink` (fort) / `--color-text-body` / `--color-text-soft` / `--color-muted` (labels) ; sur fond sombre `--color-on-dark-soft|faint` ; états `--color-live|danger`.

**Typographie** — hiérarchie :
`--fs-display` (hero) › `--fs-h1` (titre page) › `--fs-h2` (section) › `--fs-h3` (citation) › `--fs-card-title` › `--fs-body`/`--fs-md` (corps) › `--fs-sm` › `--fs-base` › labels `--fs-xs`/`--fs-2xs`.
Familles : `--font-serif` (titres/citations), `--font-sans` (corps), `--font-mono` (labels/eyebrows uppercase), `--font-script` (signature).
Poids : `--fw-regular` (titres serif, corps), `--fw-medium` (titres de carte, marque), `--fw-light` (grande citation).
Interlignes : `--lh-tight` (display) / `--lh-heading` / `--lh-quote` / `--lh-body` / `--lh-relaxed` (prose).
Interlettrage : `--ls-tight-2|1` (titres serif) / `--ls-label` / `--ls-eyebrow` (labels mono).

**Espacement** — échelle `--space-1…8` (4/8/12/16/24/36/48). Layout : conteneur `--maxw-page`, padding de section `--pad-section` (vertical) / `--pad-section-x` (horizontal), grilles `--gap-grid`, filets `--gap-hairline`.

**Composants** — réutiliser : bouton `.btn` (+ `.btn-block/-sm/-link`), champ `.form-input` (+ `.form-textarea`, `select.form-input`), label mono via `--font-mono` + `--fs-2xs|xs` + `--ls-label|eyebrow`, carte papier via `--color-border-card` + `--color-card`. Ombres : `--shadow-card` / `--shadow-soft`. Rayons : `--radius-full` (pastilles) / `--radius-xs` (focus). **Ne pas** introduire de coin arrondi ailleurs.

---

## 6. Vérification

- **Build** : `pnpm build` **vert** après chacune des 8 passes et en final (export statique OK, 8 pages générées).
- **Cohérence tokens** : 441 `var()` référencés, **0 indéfini**. 3 tokens réservés documentés (`--color-on-dark`, `--space-1`, `--space-8`).
- **Rendu** : substitutions à valeur identique + fusions sub-perceptibles (≤ 3 RVB / ≤ 1px) → **apparence générale inchangée**, cohérence renforcée.
- **Contrôle visuel final recommandé** (non automatisable ici) :
  `pnpm build && php -S 127.0.0.1:8124 -t out` puis revue de `/`, `/diagnostic/`, `/refonte-de-systeme/`, `/cas/synchronisation-prix-fournisseurs/`, `/merci/` (desktop + < 760px pour les breakpoints).

---

## 7. Critères de succès — atteints

- ✅ Valeurs arbitraires en forte baisse (couleurs −92 %, font-size −81 %, inline −96 %).
- ✅ Pages similaires (diagnostic/refonte/cas/merci) partagent structure et classes.
- ✅ Le style est piloté par des tokens + composants partagés, plus par des valeurs recopiées.
- ✅ Couleurs, espacements, tailles suivent des échelles claires.
- ✅ Très peu de one-case values, toutes documentées.
- ✅ Le prochain développeur sait quoi utiliser (§5) sans deviner.
- ✅ Système actuel **renforcé, pas remplacé** — stack, identité et rendu préservés.
