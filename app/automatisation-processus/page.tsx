import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";

const URL = "https://gabrielnadon.com/automatisation-processus/";
const TITLE = "Automatisation des processus d’affaires pour PME au Québec";
const DESC =
  "Double saisie, copier-coller entre logiciels, rapports refaits chaque semaine : j’automatise vos processus avec Make, n8n, Power Automate ou du code — et de l’IA là où elle aide. Sprint dès 4 500 $. PME du Québec.";

export const metadata: Metadata = {
  title: `${TITLE} | Gabriel Nadon`,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    siteName: "Gabriel Nadon",
    title: TITLE,
    description: DESC,
    url: URL,
    locale: "fr_CA",
    images: [
      {
        url: "https://gabrielnadon.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gabriel Nadon — automatisation des processus pour PME",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["https://gabrielnadon.com/og-image.png"],
  },
};

export default function AutomatisationPage() {
  return (
    <ServicePage
      path="/automatisation-processus/"
      breadcrumb="Automatisation des processus"
      service={{
        name: "Automatisation des processus d’affaires",
        type: "Automatisation de processus et de flux de travail",
        description:
          "Automatisation des tâches répétitives des PME québécoises — double saisie, transferts entre logiciels, rapports, relances — avec Make, n8n, Power Automate, Zapier ou du code, et de l’intelligence artificielle lorsque du texte ou des documents sont en jeu.",
      }}
      eyebrow="Automatisation des processus · PME du Québec"
      title={
        <>
          Les tâches que votre équipe refait chaque semaine{" "}
          <span className="italic">peuvent se faire seules.</span>
        </>
      }
      lead={
        <>
          Recopier une commande d’un courriel vers le logiciel. Rebâtir le même
          rapport chaque lundi. Relancer les mêmes clients à la main. Pris un à
          un, ce sont des petits irritants ; additionnés, c’est souvent un poste
          à temps partiel. J’automatise ces processus de bout en bout, branchés
          sur vos outils actuels — et j’ajoute de l’IA seulement là où il faut
          lire ou écrire du texte.
        </>
      }
      box={{
        kicker: "Ce qu’on automatise le plus souvent",
        items: [
          "La double saisie entre le courriel, Excel et le logiciel comptable.",
          "Les rapports hebdomadaires montés à la main à partir de trois exports.",
          "Les relances : soumissions sans réponse, factures en retard, documents manquants.",
          "Le transfert d’une demande client vers le bon dossier et la bonne personne.",
        ],
      }}
      pains={{
        eyebrow: "Les signes",
        title: "Si quelqu’un « fait le pont » entre deux logiciels, c’est automatisable.",
        intro:
          "Le symptôme le plus fiable : une personne dont une partie du travail consiste à déplacer de l’information d’un endroit à un autre. C’est du temps payé qui ne crée rien.",
        items: [
          "Les mêmes données sont tapées deux fois, dans deux systèmes différents.",
          "Un fichier Excel sert de base de données, et une seule personne sait le tenir à jour.",
          "Les rapports arrivent en retard parce qu’il faut les reconstruire chaque fois.",
          "Des suivis tombent entre deux chaises quand quelqu’un est en vacances.",
          "Vous payez déjà Microsoft 365, Zapier ou un ERP sans en exploiter les automatisations.",
        ],
      }}
      approach={{
        eyebrow: "Ma façon de faire",
        quote:
          "On n’automatise pas un processus confus. On le simplifie, on le chiffre, puis on le confie à la machine.",
        body: (
          <p>
            <span className="dropcap">L</span>’outil vient en dernier. Make,
            n8n, Power Automate, Zapier ou quelques lignes de code : on choisit
            selon vos logiciels, vos volumes et le coût d’abonnement à long
            terme — pas selon mes préférences. Quand une étape demande de
            comprendre un courriel ou un PDF, un modèle d’IA s’en charge, avec
            des règles de contrôle et une validation humaine.
          </p>
        ),
        principles: [
          {
            title: "Le calcul d’abord",
            text: "Heures par semaine × personnes × taux horaire × 50 semaines : si le chiffre ne justifie pas l’automatisation, je vous le dis.",
          },
          {
            title: "Surveillé, pas oublié",
            text: "Chaque automatisation signale ses propres erreurs. Si un fournisseur change son format, vous le savez le jour même.",
          },
          {
            title: "Documenté pour vous",
            text: "Vous savez ce qui roule, où, et comment l’arrêter. Pas de boîte noire qui dépend d’une seule personne.",
          },
        ],
      }}
      steps={{
        eyebrow: "La démarche, en cinq étapes",
        items: [
          {
            title: "Chiffrer la corvée",
            text: "On mesure ce que le processus coûte réellement aujourd’hui — en heures, en erreurs et en délais.",
          },
          {
            title: "Cartographier le processus",
            text: "Qui fait quoi, dans quel outil, avec quelles exceptions. C’est souvent là qu’on simplifie déjà la moitié du travail.",
          },
          {
            title: "Construire",
            text: "Les connexions entre vos outils, les règles de contrôle et, au besoin, l’étape d’IA qui lit ou rédige.",
          },
          {
            title: "Rouler en parallèle",
            text: "L’automatisation tourne à côté de la méthode actuelle quelques jours. On compare, on corrige, on gagne la confiance de l’équipe.",
          },
          {
            title: "Mettre en service",
            text: "L’ancienne méthode est retirée, la surveillance est en place, et on regarde le processus suivant.",
          },
        ],
      }}
      proof={{
        label: "Sur le terrain",
        body: (
          <>
            <span className="serif-muted">
              La mise à jour des prix fournisseurs d’une épicerie indépendante
              prenait l’équivalent d’un poste à temps partiel — près de
              56 000 $ par année. Automatisée de bout en bout et branchée sur la
              caisse existante, elle se fait maintenant sans saisie manuelle —
              l’équipe ne fait qu’approuver — et l’entreprise achète au meilleur
              prix à chaque commande.{" "}
            </span>
            <a href="/cas/synchronisation-prix-fournisseurs/" className="link-serif">
              Lire le cas complet →
            </a>
          </>
        ),
      }}
      price={{
        label: "Prix",
        body: (
          <>
            <span className="serif-muted">
              Sprint d’automatisation : dès 4 500 $, portée fixe, 2 à 3 semaines.
              Au Québec, les prix publiés vont d’environ 2 500 $ à 10 000 $ pour
              un premier processus.{" "}
            </span>
            <a href="/guides/combien-coute-automatisation-pme-quebec/" className="link-serif">
              Fourchettes et subventions détaillées →
            </a>
          </>
        ),
      }}
      faq={{
        eyebrow: "Les questions qu’on me pose",
        items: [
          {
            q: "Make, n8n, Power Automate ou Zapier : lequel choisir ?",
            a: "Si toute l’entreprise est sur Microsoft 365, Power Automate est souvent le choix naturel. Make et Zapier sont rapides à mettre en place pour relier des applications web. n8n peut être hébergé chez vous, utile quand le contrôle des données compte. Je recommande selon vos outils et vos volumes.",
          },
          {
            q: "Par quel processus commencer ?",
            a: "Par celui qui combine trois choses : il revient chaque semaine, il suit toujours les mêmes étapes et il coûte le plus d’heures. Le calculateur gratuit du site vous donne un premier chiffre en 30 secondes.",
          },
          {
            q: "Qu’arrive-t-il si une automatisation brise ?",
            a: "Elle vous avertit. Chaque flux a ses alertes et une procédure de reprise. Les changements de format chez un fournisseur ou un logiciel sont la cause la plus fréquente — et la plus simple à corriger.",
          },
          {
            q: "Faut-il un employé technique à l’interne ?",
            a: "Non. Votre équipe connaît le processus ; je m’occupe de la technique. Un sprint demande en général quelques heures de votre temps, surtout au début, pour valider les règles.",
          },
          {
            q: "Où l’IA intervient-elle dans une automatisation ?",
            a: "Là où il faut comprendre du texte : lire une commande reçue par courriel, extraire les champs d’une facture, classer une demande, rédiger un brouillon de réponse. Le reste est de l’automatisation classique, plus fiable et moins coûteuse.",
          },
        ],
      }}
      cta={{
        eyebrow: "Diagnostic gratuit",
        title: (
          <>
            Quelle tâche votre équipe{" "}
            <span className="italic">refait-elle chaque semaine ?</span>
          </>
        ),
        lead: "Décrivez-la en deux lignes. Je vous réponds sous 24 h avec ce qu’on peut automatiser, et à quel prix — que l’on travaille ensemble ou non.",
        sujet: "Automatiser un processus",
      }}
      related={{
        label: "Pour aller plus loin",
        links: [
          { href: "/calculateur/", label: "Calculateur du coût du travail manuel" },
          { href: "/guides/automatisation-pme-quebec/", label: "Guide : automatiser sa PME" },
          { href: "/traitement-documents-ia/", label: "Traitement de factures et documents" },
          { href: "/consultant-ia/", label: "Consultant IA pour PME" },
        ],
      }}
    />
  );
}
