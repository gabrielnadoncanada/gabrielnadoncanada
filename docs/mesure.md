# Mesure du tunnel — de l'impression au contrat

Une seule question : **quel canal et quelle page amènent des mandats signés ?**
Aucune donnée sensible : pas de téléphone ni de courriel dans les rapports.

| Étape | Où la lire | Définition |
|---|---|---|
| Impressions / clics Google | Search Console (propriété `https://gabrielnadon.com/`) | Séparer la marque (« gabriel nadon ») du reste |
| Citations IA | Bing Webmaster Tools → AI Performance | Citations par Copilot et partenaires, par page et par requête |
| Visites et provenance | GA4 `G-QJHNSFXNH0` | Canal calculé par `deriveChannel` : organique, assistant_ia, payant, social, campagne, referent, direct |
| Clic vers Calendly | GA4 `clic_audit` | Lien Calendly enrichi d'UTM au clic (`withCalendlyUtm`) |
| Formulaire envoyé | GA4 `form_submit` puis `form_sent` ; `generate_lead` sur /merci/ | `form_subject` = besoin choisi, `company_size` = taille déclarée |
| Lead reçu | Courriel « 🟢 Nouveau lead [canal] [taille] — sujet » | Le canal et la taille sont dans le sujet : filtrables dans Gmail |
| Rendez-vous | Calendly (« Audit gratuit — 20 min ») | La réservation garde `utm_source/utm_medium/utm_campaign` |
| Lead qualifié | Décision de Gabriel après l'appel | Critères : PME 10-200 employés, une tâche ou un logiciel identifié, décideur présent, budget ≥ 4 500 $ |
| Contrat | Entente signée / dépôt reçu | Montant du premier mandat, canal d'origine reporté depuis le courriel de lead |

## Suivi mensuel (5 minutes)

Tenir un tableau hors dépôt (pas de données clients dans git) avec une ligne par lead :
`date, canal, page d'entrée, besoin, taille, qualifié (o/n), rendez-vous (o/n), contrat ($)`.
Le canal et la page d'entrée sont dans le courriel de lead ; rien d'autre à saisir.

## Point de départ (2026-10-22)

- Search Console, 90 jours : 16 clics, ~1 100 impressions ; 11 clics sur l'accueil
  (surtout de marque), 0 clic sur les pages de service (positions 21 à 51).
- Bing AI Performance, 3 mois : 3 citations, toutes le 15 oct. 2026, sur une seule
  page : `/guides/comparatif-logiciels-epicerie-quebec/`.
- Formulaire, 120 jours : 0 lead réel (7 soumissions = tests).
- Calendly, 120 jours : 4 réservations, toutes issues de la prospection sortante
  de l'été 2026 (aucune du site).
- Contrats attribuables au site : 0.

## À relire

- 2026-11-22 : Search Console (requêtes hors marque, pages guides), Bing AI Performance.
- Signe que ça marche : des impressions sur « access », « windev », « logiciel sur
  mesure prix », puis une première citation IA hors épicerie.
