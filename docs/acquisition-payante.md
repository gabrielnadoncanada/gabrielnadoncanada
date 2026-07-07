# Système d'acquisition payante — gabrielnadon.com

Objectif : transformer un budget publicitaire en appels de diagnostic qualifiés,
**en autopilot jusqu'à l'appel**. La machine attire, capte, confirme et relance ;
Gabriel ne fait que *closer* au téléphone.

Résumé de la mécanique :

```
Ad (Google / Meta)
   → /diagnostic/  (landing dédiée, non indexée, 1 seule sortie)
   → formulaire (ou Calendly direct)
   → /api/contact  →  courriel de lead à Gabriel  +  auto-réponse au prospect
   → /merci/  (déclenche generate_lead = conversion GA4 → Google Ads/Meta)
   → Gabriel rappelle et close
```

Tout ce qui suit le clic sur l'annonce est déjà construit et vérifié
(`pnpm verify`). Ce qui reste, ce sont les 6 réglages de comptes publicitaires
ci-dessous — 90 minutes de configuration, une seule fois.

---

## 1. Ce qui est déjà en place (code livré)

| Pièce | Fichier | Rôle |
|---|---|---|
| Landing payante | `app/diagnostic/page.tsx` | Hero douleur → preuve 56 000 $ → méthode → **prix transparents** → objections → formulaire. `noindex` (les prix/messages bougent avec les campagnes sans polluer le SEO). Aucune nav : une seule sortie. |
| Page de conversion | `app/merci/page.tsx` | Point de conversion **unique**. Déclenche `generate_lead`. `noindex`. Relance Calendly + cas client. |
| Capture d'attribution | `components/AttributionTracker.tsx` | Stocke UTM + `gclid`/`fbclid`/`msclkid` + page d'entrée + référent en `localStorage`, survit à la navigation, priorise une visite payante sur une organique. |
| Ping de conversion | `components/ConversionPing.tsx` | Envoie `generate_lead` au chargement de `/merci/`, garde-fou anti-doublon (`sessionStorage`). |
| Formulaire enrichi | `components/ContactForm.tsx` | Champ téléphone (`withPhone`), envoie l'attribution au backend, redirige vers `/merci/` au succès. |
| Backend courriel | `functions/api/contact.js` | Courriel de lead **avec provenance + téléphone** à Gabriel + **auto-réponse immédiate** au prospect (lien Calendly). |
| Boucle de vérification | `scripts/verify.mjs` | 184 contrôles + tests unitaires du backend. Bloque le déploiement si un maillon casse. |

**La landing ne remplace pas le site.** Le trafic organique continue d'arriver
sur `/`, `/refonte-de-systeme/`, les cas. La landing `/diagnostic/` n'existe que
pour le trafic payant — d'où le `noindex`.

---

## 2. Les offres (les « bons tickets »)

Trois niveaux, affichés sur la landing pour filtrer avant même l'appel :

| Offre | Prix affiché | Rôle dans le funnel |
|---|---|---|
| **Diagnostic — 20 min** | Gratuit | L'aimant. C'est *ça* qu'on vend dans l'annonce. Zéro friction, zéro risque. |
| **Sprint d'automatisation** | dès 4 500 $ | Le *foot-in-the-door*. Portée fixe, prix fixe, 2–3 semaines. Élimine UNE douleur. C'est le premier « oui » facile après le diagnostic. |
| **Refonte de système** | tranches ~6 000 $ (total 12–30 k$) | Le gros ticket. Vendu *par tranches* pour désamorcer la peur du « big bang ». Chaque tranche se rentabilise avant la suivante. |

> ⚠️ Ces montants sont des **ordres de grandeur à valider par Gabriel**. Je ne
> les ai pas inventés à partir de rien, mais ils doivent refléter ta réalité de
> tarification. Ajuste-les dans `app/diagnostic/page.tsx` (section « Combien ça
> coûte ») avant de lancer les ads. Si tu préfères ne pas afficher de prix,
> supprime la section — mais l'afficher **filtre les curieux et cadre la valeur**.

Angle de vente unique (le fil rouge de toute la landing et des ads) :
**« Chaque tâche manuelle vous coûte des heures payées qui n'apparaissent nulle
part. En 20 minutes, je les rends visibles et je les chiffre. »**

---

## 3. Suivi de conversion — les 3 réglages GA4 / Ads (à faire une fois)

Le code envoie déjà l'événement `generate_lead`. Il faut le déclarer côté comptes :

1. **GA4** → Admin → *Événements* → marquer **`generate_lead`** comme
   « événement clé » (*key event*). (Propriété 543003574, `G-QJHNSFXNH0`.)
2. **Lier Google Ads à GA4** : GA4 → Admin → *Liens Google Ads* → lier le compte
   Ads. Puis dans Google Ads → *Objectifs → Conversions → Importer → depuis GA4* →
   importer `generate_lead`. C'est **cette** conversion qui pilote le Smart Bidding.
3. **Meta** (si campagne Meta) : le pixel n'est pas encore posé. Deux options :
   - simple : ajouter le Pixel Meta dans `app/layout.tsx` (comme GA4) et déclarer
     l'événement standard `Lead` dans `ConversionPing.tsx` (à côté du `gtag`) ;
   - propre : passer par l'API Conversions plus tard.
   Dis-moi si tu lances du Meta et je pose le pixel + l'événement `Lead`.

Événements GA4 déjà émis, utilisables comme micro-conversions / audiences :
`form_submit` (tentative), `form_sent` (succès API), `generate_lead` (conversion),
`clic_audit` (clic Calendly).

**Vérification :** GA4 → *Temps réel* → soumettre le formulaire de test →
`form_submit`, `form_sent` puis `generate_lead` doivent apparaître.

---

## 4. Google Search — la campagne prioritaire (intention chaude)

C'est **par ici qu'on commence.** Les gens qui cherchent ont déjà la douleur.

- **Type** : Search uniquement (désactiver le Réseau Display et les partenaires).
- **Zone** : Québec (province). Langue : français.
- **Budget de départ** : 30–50 $/jour. Enchères : *Maximiser les conversions*
  (bascule sur *tCPA* une fois ~15–20 conversions accumulées).
- **Page de destination** : `https://gabrielnadon.com/diagnostic/`
  **avec les UTM** (voir §6).

### Groupes d'annonces + mots-clés (en *expression exacte* et *[exact]*)

**G1 — Automatisation PME**
`"automatisation processus PME"`, `"automatiser tâches répétitives entreprise"`,
`"automatisation facturation"`, `[consultant automatisation québec]`,
`"réduire saisie manuelle"`

**G2 — Refonte / vieux système**
`"refonte système informatique PME"`, `"remplacer logiciel maison"`,
`"moderniser vieux logiciel entreprise"`, `[migration système sans perte données]`

**G3 — Sortir d'Excel**
`"remplacer excel par logiciel"`, `"logiciel gestion sur mesure PME"`,
`"trop de fichiers excel entreprise"`

**Mots-clés négatifs** (essentiels) : `emploi`, `gratuit` (le mot seul),
`formation`, `cours`, `stage`, `salaire`, `pdf`, `définition`, `wikipedia`,
`tutoriel`, `open source`, `télécharger`.

### Annonces (RSA — 3 par groupe, 15 titres / 4 descriptions)

Titres (piochez, Google combine) :
- Vos journées mangées par Excel ?
- Diagnostic gratuit — 20 minutes
- Automatisez ce qui vous ralentit
- Consultant systèmes · PME Québec
- Quoi automatiser en premier ?
- Sans « big bang », par étapes
- Ce que ça coûte, ce que ça rapporte
- Refonte sans arrêter vos opérations
- Un plan honnête en 20 minutes
- Zéro obligation, zéro suivi insistant

Descriptions :
- Retaper les mêmes données, tenir la « vraie » base dans Excel… On chiffre ce que ça coûte, gratuitement.
- 20 min au téléphone : quoi régler en premier, l'effort réel, le rendement. PME du Québec.
- Le vieux système remplacé morceau par morceau, sans perdre une donnée. Diagnostic gratuit.
- Une épicerie du Québec : 56 000 $/an récupérés sur une seule tâche. Et vous ?

**Extensions** (obligatoires) :
- Liens annexes : *Cas client (56 000 $)* → `/cas/synchronisation-prix-fournisseurs/`,
  *Refonte par étapes* → `/refonte-de-systeme/`, *Réserver 20 min* → Calendly.
- Accroches : « Gratuit, sans obligation », « PME du Québec », « Par étapes »,
  « Réponse sous 24 h ».
- Extrait de site : *Services* : Diagnostic, Automatisation, Refonte, Sur-mesure.

---

## 5. Meta (Facebook/Instagram) — phase 2, génération de demande

À lancer **après** que Google tourne. Ici la douleur est *latente* : on
l'interrompt, on ne la capte pas.

- **Objectif** : *Prospects* (Leads) optimisé sur l'événement `Lead` (voir §3).
- **Audience** : Québec, 30–60 ans, propriétaires de PME / dirigeants / intérêts
  « petites entreprises », « comptabilité », « gestion d'entreprise ». Large au
  départ, laisser l'algo apprendre.
- **Budget** : 20–30 $/jour, 3–4 créatifs en test.
- **Format** : image unique ou carrousel « avant/après » (le chaos Excel → le
  système propre). Vidéo courte de Gabriel qui parle (visage = confiance).
- **Angles créatifs** :
  1. *« Combien d'heures par semaine votre équipe passe-t-elle à retaper des
     données d'un écran à l'autre ? »* (question-miroir)
  2. *« Cette épicerie a récupéré 56 000 $/an en supprimant UNE tâche manuelle. »*
     (preuve chiffrée)
  3. *« Votre entreprise roule sur un système que plus personne n'ose toucher. »*
     (peur, reprise du hero refonte)
- **Destination** : `/diagnostic/` avec UTM Meta.

---

## 6. Balises UTM — à coller dans les URLs finales des annonces

Google Search (URL finale de la campagne) :
```
https://gabrielnadon.com/diagnostic/?utm_source=google&utm_medium=cpc&utm_campaign=search-automatisation&utm_term={keyword}&utm_content={creative}
```
(Google ajoute `gclid` tout seul — déjà capté par le tracker.)

Meta :
```
https://gabrielnadon.com/diagnostic/?utm_source=meta&utm_medium=paid_social&utm_campaign=leads-douleur&utm_content=carrousel-avant-apres
```

Ces UTM **remontent dans le courriel de lead** (section « Provenance ») → Gabriel
sait, avant même de rappeler, quelle annonce a produit le lead.

---

## 7. Le closing — ce que Gabriel fait (le seul travail manuel)

L'autopilot s'arrête à l'appel. Séquence :

1. **Lead reçu** → courriel `🟢 Nouveau lead` avec sujet, contexte, téléphone,
   provenance. Le prospect a *déjà* reçu l'auto-réponse avec le lien Calendly.
2. **Rappel sous 24 h** (idéalement < 1 h — le taux de closing s'effondre après).
   Si le prospect a réservé sur Calendly, l'appel est déjà cadré.
3. **Structure de l'appel de 20 min** :
   - 2 min — contexte : « Décrivez-moi une journée typique, où ça coince. »
   - 8 min — creuser : combien d'heures ? combien de personnes ? quel risque si
     ça lâche ? → **chiffrer la douleur en $** devant eux.
   - 5 min — le plan : « La première tranche à attaquer, c'est X. Voici l'effort,
     voici le rendement. »
   - 5 min — le pas suivant : proposer le **Sprint** (petit oui) ou cadrer la
     **première tranche de refonte**. Envoyer une offre écrite le jour même.
4. **Relance** (manuelle pour l'instant) : si pas de réponse à l'offre sous
   3 jours, un courriel court. *Amélioration future : automatiser cette relance.*

---

## 8. La boucle de vérification (attrape les erreurs avant la mise en ligne)

`node scripts/verify.mjs` (aussi dans `pnpm verify` et intégré à `pnpm deploy`
+ au workflow GitHub). Il **bloque le déploiement** si un seul maillon du funnel
est cassé. Ce qu'il vérifie sur le `out/` compilé :

- GA4 (`G-QJHNSFXNH0`) présent sur **chaque** page → pas de trou de tracking.
- `/diagnostic/` et `/merci/` bien `noindex`, avec téléphone, preuve 56 000 $, ancre.
- `generate_lead`, `gn_attribution`, `form_sent`, `/api/contact` bien présents
  dans les bundles JS livrés → la mécanique de conversion est réellement embarquée.
- Tous les liens internes pointent vers un fichier qui existe (aucun lien mort).
- Tout lien Calendly = **le bon** lien (une faute = des leads perdus).
- Formulaire = backend `/api/contact` présent + honeypot.
- Sitemap cohérent : pages indexables dedans, pages `noindex` **dehors**.
- Aucun accent corrompu (mojibake), aucun `TODO`/`Lorem`.
- JSON-LD valide sur chaque page.
- **Tests unitaires du backend** `contact.js` : honeypot silencieux, validation
  du courriel, **présence du téléphone + de l'attribution + du gclid** dans le
  courriel, envoi de l'auto-réponse au bon destinataire avec le lien Calendly,
  et code 502 en cas de panne Resend (→ le fallback `mailto:` s'active côté client).

Sortie verte = les 4 étapes (landing, capture, conversion, closing-amorce) sont
prouvées fonctionnelles. Sortie rouge = liste précise de ce qui casse, déploiement
avorté.

---

## 9. Ce qu'il reste à toi (checklist de lancement)

- [ ] Valider / ajuster les **prix** affichés sur `/diagnostic/`.
- [ ] GA4 : marquer `generate_lead` comme événement clé.
- [ ] Lier Google Ads ↔ GA4, importer `generate_lead` comme conversion.
- [ ] Créer la campagne Search (§4), coller l'URL `/diagnostic/` + UTM.
- [ ] (Optionnel) Me dire si tu lances du Meta → je pose le pixel + événement `Lead`.
- [ ] Déployer : `pnpm deploy` (build → postbuild → **verify** → wrangler).
- [ ] Test de bout en bout : cliquer une annonce (mode aperçu), soumettre le
      formulaire, confirmer le courriel de lead + l'auto-réponse + `generate_lead`
      dans GA4 Temps réel.

Une fois Google Ads en marche, le seul geste quotidien de Gabriel est de
**rappeler les leads**. Le reste tourne seul.
