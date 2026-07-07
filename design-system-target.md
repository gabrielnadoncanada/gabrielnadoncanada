# Système cible minimal — gabrielnadon.com

> Phase 2 — définition du système cible. Aucune modification de code.
> Dérivé directement des valeurs réelles de `design-system-audit.md`.
> Objectif : **~44 tokens** couvrant tout le site, branchés sur les classes existantes.
> Règle : on garde la stack (CSS classique), l'identité (or/encre/papier, angles vifs),
> les polices par nom. On ne crée **rien** qui ne réduise une divergence réelle observée.

Tous les tokens vivent dans un **unique bloc `:root`** en tête de `app/globals.css`.

---

## 1. Couleurs (18 tokens)

Choisies **par rôle**, valeur = la plus fréquente de l'audit. Les quasi-doublons
invisibles sont fusionnés vers la valeur canonique (écart RVB ≤ 3, imperceptible).

```css
:root {
  /* Fonds */
  --color-paper:        rgb(244, 241, 234);  /* bg site (11×) */
  --color-card:         rgb(251, 250, 246);  /* fond carte claire (4×) — absorbe rgb(250,247,240) */
  --color-ink:          rgb(23, 24, 27);     /* foreground + fond boutons/sombre (28×) */
  --color-ink-hover:    rgb(44, 45, 49);     /* hover bouton (2×) */

  /* Accent or */
  --color-gold:         rgb(155, 123, 56);   /* accent principal (38×) */
  --color-gold-on-dark: rgb(189, 160, 95);   /* accent sur fond ink — contraste (4×) */
  --color-gold-faint:   rgb(185, 176, 154);  /* fils fins, soulignés, flèches (6×) */

  /* Bordures */
  --color-border:       rgb(221, 214, 200);  /* bordure standard (27×) */
  --color-border-card:  rgb(207, 199, 181);  /* bordure carte/input (4×) */
  --color-border-faint: rgb(233, 227, 214);  /* lignes de table internes (1×) */

  /* Texte */
  --color-muted:        rgb(112, 108, 98);   /* labels mono muted (15×) — absorbe rgb(111,108,100) */
  --color-text-body:    rgb(70, 71, 74);     /* corps secondaire foncé (7×) — absorbe rgb(60,61,64) */
  --color-text-soft:    rgb(91, 92, 95);     /* corps secondaire clair (6×) */

  /* Texte sur fond sombre (note/principle/footer/ticker) */
  --color-on-dark:      rgb(244, 241, 234);  /* = paper : titres/quote sur ink */
  --color-on-dark-soft: rgb(172, 169, 160);  /* muted sur ink (2×) — absorbe 165,163,155 / 182,180,172 */
  --color-on-dark-faint:rgb(207, 202, 187);  /* body sur ink (1×) — absorbe 236,234,227 */

  /* États */
  --color-live:         rgb(155, 176, 122);  /* point « disponible » (2×) */
  --color-danger:       rgb(146, 60, 32);    /* erreur formulaire (1×) */
}
```

**Fusions actées** (changement visuel < 3 unités RVB, à valider à l'œil au build) :
`111,108,100 → --color-muted` · `250,247,240 → --color-card` · `60,61,64 → --color-text-body` ·
`165,163,155` & `182,180,172 → --color-on-dark-soft` · `236,234,227 → --color-on-dark-faint`.

**Conservés distincts (choix de contraste, PAS des doublons)** : les deux ors, `--color-text-body`
vs `--color-text-soft` (deux niveaux de gris réellement utilisés côte à côte).

**Non tokenisés (opacités ponctuelles, restent en `rgba()` littéral)** : les overlays
`rgba(23,24,27,0.05/0.07/0.1/0.16/0.24)` des ombres, `rgba(244,241,234,0.86/0.94)` du header
sticky, `rgba(255,255,255,0.1)` des séparateurs `.principles`. Ce sont des dérivés d'alpha,
pas des rôles → les inclure alourdirait sans réduire de divergence.

---

## 2. Typographie

### 2.1 Familles (4 tokens — inchangées, juste nommées)

```css
  --font-sans:  Geist, Inter, system-ui, -apple-system, sans-serif;
  --font-serif: Spectral, serif;
  --font-mono:  "Geist Mono", monospace;
  --font-script:"Pinyon Script", cursive;
```

### 2.2 Échelle font-size (13 tokens)

Les **21 tailles fixes** de l'audit sont ramenées à 7 pas ; les **demi-pixels one-case**
disparaissent au profit du voisin standard. Les titres fluides gardent `clamp()`.

| Token | Valeur | Remplace (audit) | Usage |
|---|---|---|---|
| `--fs-2xs`   | `10px` | 9, 9.5, 10, 10.5 | micro-labels mono (brand-sub, foot, badges) |
| `--fs-xs`    | `11px` | 11, 11.5 | eyebrows, sectors-label, copyright |
| `--fs-sm`    | `13px` | 12, 12.5, 13, 13.5 | petit texte, step-text, stat-label |
| `--fs-base`  | `14px` | 14, 14.5 | corps, liens footer, form-input |
| `--fs-md`    | `15px` | 15, 15.5 | corps standard, boutons, mandat-text |
| `--fs-lg`    | `18px` | 18 | testi-name, footer-email, icon-18 |
| `--fs-body`  | `clamp(15px, 1.6vw, 18px)` | ×3 déjà cohérent + case-prose | leads / prose |
| `--fs-card-title` | `clamp(20px, 2.3vw, 27px)` | 20, 22, mandat-title | titres de carte (Spectral 500) |
| `--fs-h3`    | `clamp(22px, 3vw, 34px)` | testi-quote, note-quote clamp(22,2.8,33) | citations |
| `--fs-h2`    | `clamp(28px, 4vw, 44px)` | h2-left | titres de section |
| `--fs-h1`    | `clamp(32px, 5vw, 58px)` | case-title, contact-title clamp(32,5,56) | titres de page |
| `--fs-display`| `clamp(38px, 6.4vw, 72px)` | hero-title | hero |

**Exceptions documentées (one-case légitimes, gardées nommées)** — chiffres « éditoriaux »
dont la taille EST le propos, non normalisables :
| `--fs-stat`  | `clamp(40px, 5vw, 58px)` | stat-num |
| `--fs-money` | `clamp(56px, 9vw, 92px)` | money-fig |
| `--fs-quote-mark` | `clamp(70px, 9vw, 120px)` | guillemet géant `.bigquote` |
| `--fs-dropcap` | `56px` | lettrine `.dropcap` |
| `--fs-signature` | `42px` | signature Pinyon |

> `16px` (icon-16), `21px` (footer-name) → mappés respectivement sur `--fs-lg` proche
> ou gardés inline si l'écart compte. À trancher en Phase 3 fichier par fichier.

### 2.3 font-weight (3 tokens — inchangés)

```css
  --fw-light: 300;   /* note-quote uniquement */
  --fw-regular: 400; /* titres serif, corps */
  --fw-medium: 500;  /* titres de carte, marque */
```

### 2.4 line-height (5 tokens)

Les **16 valeurs** → 5 pas.

```css
  --lh-tight:   1;     /* titres display/stat/mandat-num (8×) */
  --lh-heading: 1.1;   /* absorbe 1.04, 1.08 */
  --lh-quote:   1.4;   /* absorbe 1.36, 1.45 (citations) */
  --lh-body:    1.6;   /* absorbe 1.5, 1.55, 1.6, 1.62 (corps) */
  --lh-relaxed: 1.7;   /* absorbe 1.68, 1.7, 1.9 (prose longue) */
```
Exceptions gardées inline : `0.8` (dropcap), `0.94` (money-fig) — chevauchements typographiques voulus.

### 2.5 letter-spacing (5 tokens)

Les **13 valeurs** → 5 pas.

```css
  --ls-tight-2: -0.02em;  /* gros titres serif (absorbe -0.03, -0.015) */
  --ls-tight-1: -0.01em;  /* titres moyens */
  --ls-normal:  0;
  --ls-label:   0.1em;    /* labels mono (absorbe 0.06, 0.08, 0.12) */
  --ls-eyebrow: 0.14em;   /* eyebrows (absorbe 0.16) */
```

---

## 3. Espacement (7 tokens — échelle 4/8)

Les **17 gaps fixes** + marges/paddings sans logique → une échelle. Chaque valeur brute
est arrondie au pas le plus proche.

```css
  --space-1:  4px;   /* absorbe 5 */
  --space-2:  8px;   /* absorbe 7, 9 */
  --space-3:  12px;  /* absorbe 11, 13, 14 */
  --space-4:  16px;  /* absorbe 15, 18 */
  --space-5:  24px;  /* absorbe 22, 26 */
  --space-6:  36px;  /* absorbe 34 (mt-36) */
  --space-8:  48px;
```

**Espacement de section (déjà systématisé en `clamp` — on nomme les 4 récurrents)** :
```css
  --pad-section:   clamp(56px, 8vw, 104px);            /* padding vertical section */
  --pad-section-x: clamp(16px, 4vw, 40px);             /* padding horizontal (répété ~15×) */
  --gap-grid:      clamp(36px, 5vw, 64px);             /* grilles hero/contact/note */
  --gap-hairline:  1px;                                /* grilles à filet (stats/method) */
  --maxw-page:     1240px;                             /* conteneur (10×) */
```

> Les `clamp()` de padding de section très variés (`clamp(24px,3vw,34px)`, `clamp(40px,5vw,64px)`…)
> ne sont **pas** tous tokenisés : ils sont contextuels et cohérents. On nomme seulement les
> 4–5 vraiment récurrents. Ne pas sur-tokeniser l'espacement fluide.

---

## 4. Ombres & rayons (5 tokens)

```css
  --shadow-card:  rgba(23,24,27,0.05) 0 1px 2px, rgba(23,24,27,0.24) 0 24px 44px -18px; /* .cab-paper */
  --shadow-soft:  rgba(23,24,27,0.05) 0 1px 2px, rgba(23,24,27,0.16) 0 24px 44px -20px; /* .money-box */
  --shadow-inset-gold: rgb(155,123,56) 0 2px 0 inset;  /* hover step-card */
  --radius-full:  50%;   /* points/pastilles */
  --radius-xs:    1px;   /* focus outline */
```
> `border-radius` reste quasi nul : **choix d'identité éditoriale, non un défaut.** Aucun token « rounded » ajouté.

---

## 5. Composants — conventions cibles (aucun nouveau composant)

On **corrige les classes existantes**, on ne crée pas d'abstraction. Trois consolidations :

### 5.1 Bouton — une base + modificateurs
Fusionner `.btn` / `.btn-block` / `.btn-sm` autour d'une base commune (fond `--color-ink`,
texte `--color-paper`, `--fw`? non, hérité ; transition). Différences réduites à des modificateurs :
| Classe cible | font-size | padding |
|---|---|---|
| `.btn` (base) | `--fs-md` | `15px 26px` |
| `.btn--block` | `--fs-md` | `16px 24px` + `width:100%`/`justify-content:center` |
| `.btn--sm` | `--fs-sm` | `10px 18px` |
| `.btn--link` | `--fs-md` | ghost souligné |

Les hovers `.scp1`/`.scp2` (identiques : `background:--color-ink-hover; transform:translateY(-1px)`)
sont absorbés dans `.btn:hover`. `.scp*` restants documentés ou renommés.

### 5.2 Label mono — token partagé (foyer n°1 en volume)
Les **~18 eyebrows/labels** (`.eyebrow`, `.hero-eyebrow`, `.note-eyebrow`, `.foot-label`,
`.form-label`, `.kv-label`, `.step-code`, `.mandat-code`, `.case-shot-badge`, `.copyright`…)
partagent : `font-family:--font-mono; text-transform:uppercase; letter-spacing:--ls-label|--ls-eyebrow;
font-size:--fs-2xs|--fs-xs; color:--color-muted|--color-gold`.
Cible : **brancher chacune sur les tokens** (color/size/tracking) sans forcément fusionner en une
seule classe — on supprime ainsi les micro-écarts (10 vs 10.5 vs 11px, 0.1 vs 0.14 vs 0.16em) tout
en gardant les noms sémantiques existants. Une classe utilitaire optionnelle `.u-mono-label` peut
factoriser le socle si le JSX s'y prête, mais ce n'est **pas** obligatoire.

### 5.3 Carte papier — padding tokenisé
`.contact-card`, `.case-shot`, `.money-box` : même `border:--color-border-card` + `background:--color-card`.
On garde 3 paddings mais **branchés sur `clamp` nommés** au lieu de valeurs libres, pour que
l'écart soit intentionnel et lisible.

### 5.4 Inputs / Table
Déjà cohérents en interne → **branchement tokens uniquement**, aucune restructuration.

---

## 6. Ce que le système cible NE contient délibérément PAS

- ❌ Pas de tokens `2xl`/`3xl`/`4xl` spéculatifs — seulement les pas réellement utilisés.
- ❌ Pas de palette numérique façon Tailwind (`gray-50…900`) — rôles uniquement.
- ❌ Pas de nouveau composant (Modal, Badge formel, EmptyState) — aucun besoin dans le produit.
- ❌ Pas de rayon arrondi, pas de nouvelle ombre « fancy ».
- ❌ Pas de renommage massif des classes sémantiques existantes.

**Total : ~18 couleurs + 4 familles + 13 font-size + 3 weight + 5 lh + 5 ls + 12 spacing/layout + 5 ombres/rayons ≈ 44 tokens** pour remplacer ~150 valeurs magiques.
