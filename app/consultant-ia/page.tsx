import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";

const URL = "https://gabrielnadon.com/consultant-ia/";
const TITLE = "Consultant IA pour PME au Québec";
const DESC =
  "Consultant IA pour PME au Québec : je trouve où l’IA enlève du travail (factures, courriels, soumissions) et je l’implante dans vos outils.";

export const metadata: Metadata = {
  title: `${TITLE} | Gabriel Nadon`,
  description: DESC,
  alternates: {
    canonical: URL,
    languages: {
      "fr-CA": URL,
      "en-CA": "https://gabrielnadon.com/en/ai-consultant/",
      "x-default": URL,
    },
  },
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
        alt: "Gabriel Nadon — consultant IA pour PME au Québec",
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

export default function ConsultantIAPage() {
  return (
    <ServicePage
      path="/consultant-ia/"
      breadcrumb="Consultant IA"
      service={{
        name: "Consultant IA pour PME",
        type: "Consultation et implantation en intelligence artificielle",
        description:
          "Diagnostic des processus d’une PME québécoise, choix des tâches où l’intelligence artificielle rapporte, puis implantation dans les outils existants : traitement de documents, agents IA, automatisation et systèmes internes.",
      }}
      eyebrow="Consultant IA · PME du Québec"
      title={
        <>
          L’IA dans votre PME : moins de démos,{" "}
          <span className="italic">plus de travail enlevé.</span>
        </>
      }
      lead={
        <>
          Vous savez que l’intelligence artificielle peut aider. Ce qui manque,
          c’est de savoir où, avec quelles données, et qui va l’installer pour
          que ça tienne. Je suis consultant IA indépendant, basé à Montréal :
          je regarde comment votre entreprise travaille vraiment, je trouve les
          deux ou trois tâches où l’IA rapporte, puis je les implante —
          branchées sur vos outils actuels, avec une validation humaine.
        </>
      }
      box={{
        kicker: "Où l’IA rapporte d’abord dans une PME",
        items: [
          "Lire les factures, bons de commande et listes de prix — et les saisir à votre place.",
          "Trier les courriels de demandes et préparer la réponse ou la fiche client.",
          "Monter une soumission ou un rapport à partir de vos propres données.",
          "Retrouver l’information dans les documents d’un projet en quelques secondes.",
        ],
      }}
      pains={{
        eyebrow: "Vous vous reconnaissez ?",
        title: "Tout le monde parle d’IA. Chez vous, rien n’a encore changé.",
        intro:
          "Ce n’est pas un manque de volonté. C’est qu’entre un abonnement ChatGPT et un processus qui roule tout seul, il manque une étape : relier l’IA à vos données et à votre façon de travailler.",
        items: [
          "Quelques employés utilisent ChatGPT dans leur coin, mais les opérations, elles, n’ont pas bougé.",
          "Chaque fournisseur vous vend sa plateforme « avec IA » — sans jamais avoir regardé comment vous travaillez.",
          "Vos données vivent dans Excel, les courriels et un logiciel qui ne parle à personne.",
          "Vous hésitez à mettre des données clients dans un outil d’IA, à cause de la Loi 25.",
          "Personne à l’interne n’a le temps de piloter un projet de plus.",
        ],
      }}
      approach={{
        eyebrow: "Ma façon de faire",
        quote:
          "L’IA n’est pas le projet. Le projet, c’est la tâche qui coûte cher — l’IA est un des outils pour l’enlever.",
        body: (
          <p>
            <span className="dropcap">J</span>e commence par vos opérations,
            pas par la technologie : où le temps se perd, combien ça coûte, quelles
            données existent déjà. Ensuite seulement on choisit l’outil — parfois
            un modèle d’IA, parfois une simple automatisation, parfois un petit
            logiciel interne. Vous parlez à celui qui analyse et qui construit :
            pas d’intermédiaire, pas de jargon.
          </p>
        ),
        principles: [
          {
            title: "Chiffré avant d’être construit",
            text: "Chaque cas d’usage part d’un calcul simple : heures par semaine × personnes × taux horaire. Pas de chiffre, pas de projet.",
          },
          {
            title: "Vos données restent encadrées",
            text: "Les données sensibles ne vont pas dans un outil grand public sans encadrement ; on choisit hébergement, accès et réglages en fonction de vos obligations.",
          },
          {
            title: "Un humain valide",
            text: "L’IA prépare, résume, propose. Les décisions qui engagent l’entreprise restent à vos gens.",
          },
        ],
      }}
      steps={{
        eyebrow: "La démarche, en cinq étapes",
        items: [
          {
            title: "Diagnostic de 20 minutes",
            text: "Gratuit. Vous me décrivez où l’équipe perd le plus de temps ; je vous dis si l’IA est la bonne réponse — ou non.",
          },
          {
            title: "Cartographie et priorisation",
            text: "On liste les tâches répétitives, on les chiffre, et on retient celle qui rapporte le plus pour le moins d’effort.",
          },
          {
            title: "Prototype sur vos vrais fichiers",
            text: "Pas de démo générique : le premier essai roule sur vos factures, vos courriels, vos exports. On voit tout de suite si ça tient.",
          },
          {
            title: "Implantation dans vos outils",
            text: "Le système se branche sur ce que vous utilisez déjà — Outlook, Excel, QuickBooks, votre ERP — selon les accès disponibles.",
          },
          {
            title: "Mesure, puis cas suivant",
            text: "On compare le temps avant et après. Quand le premier cas est rentable, on passe au suivant, au rythme de vos opérations.",
          },
        ],
      }}
      services={{
        title: "Ce que j’implante, concrètement.",
        items: [
          {
            kind: "Agents IA",
            title: "Agents IA pour entreprise",
            text: "Un agent qui lit une demande, consulte vos données et prépare l’action — réponse, soumission, saisie — pour validation.",
            href: "/agents-ia/",
          },
          {
            kind: "Documents",
            title: "Traitement de factures et documents",
            text: "Factures, bons de commande, listes de prix : lus, vérifiés et saisis automatiquement, les exceptions envoyées à un humain.",
            href: "/traitement-documents-ia/",
          },
          {
            kind: "Automatisation",
            title: "Automatisation des processus",
            text: "Les copier-coller entre logiciels, rapports et relances qui se refont chaque semaine — faits par la machine.",
            href: "/automatisation-processus/",
          },
          {
            kind: "Systèmes",
            title: "Logiciel sur mesure",
            text: "Quand Excel est devenu votre logiciel de gestion : un vrai système interne, construit par tranches.",
            href: "/logiciel-sur-mesure/",
          },
        ],
      }}
      proof={{
        label: "Sur le terrain",
        body: (
          <>
            <span className="serif-muted">
              Une épicerie indépendante du Québec retapait à la main les prix de
              ses fournisseurs : près de 56 000 $ par année en temps de saisie.
              Le système lit maintenant les listes de tous ses fournisseurs,
              compare quelque 37 000 prix à chaque cycle et prépare la mise à
              jour de la caisse — que l’équipe approuve.{" "}
            </span>
            <a href="/cas/synchronisation-prix-fournisseurs/" className="link-serif">
              Lire le cas complet →
            </a>{" "}
            <span className="serif-muted">
              Et je fais rouler mes propres agents : mon système de prospection
              cherche des entreprises, analyse leur site et rédige un premier
              courriel personnalisé — rien ne part sans ma validation.
            </span>
          </>
        ),
      }}
      price={{
        label: "Prix",
        body: (
          <>
            <span className="serif-muted">
              Diagnostic : 20 minutes, gratuit. Premier sprint d’implantation :
              dès 4 500 $, portée fixe, 2 à 3 semaines — une tâche éliminée, pas
              un abonnement. Des programmes peuvent rembourser une partie des
              honoraires (ESSOR d’Investissement Québec, PME MTL) :{" "}
            </span>
            <a href="/guides/combien-coute-automatisation-pme-quebec/" className="link-serif">
              prix du marché et subventions détaillés →
            </a>
          </>
        ),
      }}
      faq={{
        eyebrow: "Les questions qu’on me pose",
        items: [
          {
            q: "Combien coûte un consultant IA au Québec ?",
            a: "Les grilles publiées au Canada vont d’environ 150 à 350 $ de l’heure pour la consultation en IA et en automatisation, mais la plupart des projets se vendent à forfait. Chez moi : diagnostic gratuit de 20 minutes, puis des sprints à portée fixe dès 4 500 $.",
          },
          {
            q: "Faut-il changer nos logiciels pour utiliser l’IA ?",
            a: "Non, dans la grande majorité des cas. L’IA se branche sur vos outils actuels par leurs API, leurs exports ou les courriels. On ne remplace que ce qui bloque vraiment.",
          },
          {
            q: "Nos données sont-elles en sécurité (Loi 25) ?",
            a: "On décide ensemble quelles données l’IA peut voir, où elles sont traitées et qui y a accès. Les renseignements personnels ne vont pas dans un outil grand public sans encadrement, et chaque accès est documenté.",
          },
          {
            q: "Quelle différence avec une agence IA ?",
            a: "Vous parlez directement à la personne qui analyse vos opérations et qui construit le système. Pas de vendeur, pas de sous-traitance, pas de plateforme imposée.",
          },
          {
            q: "Et si l’IA n’est pas la bonne solution chez nous ?",
            a: "Je vous le dis pendant le diagnostic. Souvent, une simple automatisation ou un meilleur fichier règle le problème pour moins cher — et c’est ce que je recommande alors.",
          },
          {
            q: "Travaillez-vous en anglais ?",
            a: "Oui. Je travaille en français et en anglais, depuis Montréal et à distance partout au Québec.",
          },
        ],
      }}
      cta={{
        eyebrow: "Diagnostic gratuit",
        title: (
          <>
            Vingt minutes pour savoir où l’IA{" "}
            <span className="italic">vous ferait gagner du temps.</span>
          </>
        ),
        lead: "Décrivez la tâche qui vous coûte le plus d’heures. Je vous réponds sous 24 h avec une première piste honnête — que l’on travaille ensemble ou non.",
        sujet: "Projet d’IA ou d’agent IA",
      }}
      related={{
        label: "Pour aller plus loin",
        links: [
          { href: "/diagnostic-ia/", label: "Test : votre PME est-elle prête pour l’IA ?" },
          { href: "/calculateur/", label: "Calculer le coût d’une tâche manuelle" },
          { href: "/guides/automatisation-pme-quebec/", label: "Guide : automatiser sa PME" },
          { href: "/en/ai-consultant/", label: "English: AI consultant in Quebec" },
        ],
      }}
    />
  );
}
