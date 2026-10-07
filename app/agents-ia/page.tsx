import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";

const URL = "https://gabrielnadon.com/agents-ia/";
const TITLE = "Agents IA pour entreprise au Québec";
const DESC =
  "Agents IA pour PME du Québec : un assistant qui traite vos demandes et prépare soumissions et réponses, branché sur vos données, avec validation humaine.";

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
        alt: "Gabriel Nadon — agents IA pour entreprise",
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

export default function AgentsIAPage() {
  return (
    <ServicePage
      path="/agents-ia/"
      breadcrumb="Agents IA"
      service={{
        name: "Agents IA pour entreprise",
        type: "Conception et implantation d’agents d’intelligence artificielle",
        description:
          "Agents IA pour PME québécoises : réception et tri des demandes, préparation de soumissions, réponses aux questions répétitives à partir des documents de l’entreprise, suivi des dossiers — branchés sur les outils existants, avec validation humaine.",
      }}
      eyebrow="Agents IA · PME du Québec"
      title={
        <>
          Un agent IA qui fait une vraie tâche —{" "}
          <span className="italic">et qui demande avant d’agir.</span>
        </>
      }
      lead={
        <>
          Un agent IA, concrètement, c’est un assistant logiciel qui reçoit une
          demande, va chercher l’information dans vos systèmes, prépare
          l’action — une réponse, une soumission, une saisie — et vous la
          soumet. Pas un gadget de conversation : un employé virtuel affecté à
          une tâche précise, qui travaille avec vos données et sous vos règles.
        </>
      }
      box={{
        kicker: "Des agents qui rapportent dans une PME",
        items: [
          "Réception : lit chaque demande reçue par courriel, crée la fiche et prépare la réponse.",
          "Soumission : monte un premier jet à partir de vos prix, gabarits et projets passés.",
          "Service client : répond aux questions répétitives à partir de vos documents, et passe la main à un humain.",
          "Suivi : repère les dossiers en retard et prépare les relances.",
        ],
      }}
      pains={{
        eyebrow: "Pourquoi un agent, et pas juste ChatGPT",
        title: "ChatGPT aide une personne. Un agent enlève une tâche à l’entreprise.",
        intro:
          "Un abonnement ChatGPT rend chaque employé un peu plus rapide, à condition qu’il pense à s’en servir. Un agent est branché sur le processus lui-même : il démarre seul quand une demande arrive, et il connaît vos données.",
        items: [
          "Les mêmes questions de clients reviennent chaque jour, et quelqu’un répond chaque fois à la main.",
          "Les demandes arrivent par courriel, par formulaire, par téléphone — et se perdent entre les trois.",
          "Une soumission prend des heures alors que l’essentiel du contenu existe déjà quelque part.",
          "L’information d’un dossier est dispersée entre courriels, PDF et logiciels.",
          "Vous avez essayé un chatbot générique : il inventait des réponses.",
        ],
      }}
      approach={{
        eyebrow: "Ma façon de faire",
        quote:
          "Un bon agent a une seule tâche, accès aux bonnes données, et une limite claire de ce qu’il peut faire seul.",
        body: (
          <p>
            <span className="dropcap">L</span>es agents qui échouent sont ceux
            à qui on demande de « tout faire ». Je conçois des agents étroits :
            une tâche, des sources d’information définies, des règles écrites,
            et un point de validation humaine avant toute action qui engage
            l’entreprise — envoi, paiement, engagement auprès d’un client.
          </p>
        ),
        principles: [
          {
            title: "Il répond à partir de vos données",
            text: "L’agent cite vos documents, vos prix, vos dossiers. S’il ne trouve pas, il le dit et transfère — il n’invente pas.",
          },
          {
            title: "Il demande avant d’agir",
            text: "Brouillon, proposition, saisie en attente : la décision finale reste à une personne tant que la confiance n’est pas établie.",
          },
          {
            title: "Il laisse une trace",
            text: "Chaque action est journalisée : ce qu’il a lu, ce qu’il a proposé, qui a approuvé.",
          },
        ],
      }}
      steps={{
        eyebrow: "La démarche, en cinq étapes",
        items: [
          {
            title: "Choisir la tâche",
            text: "Une tâche fréquente, répétitive et coûteuse. On la chiffre avant d’écrire une seule ligne.",
          },
          {
            title: "Rassembler les sources",
            text: "Documents, gabarits, prix, historique : ce que l’agent doit connaître, et ce qu’il ne doit jamais voir.",
          },
          {
            title: "Prototype sur des cas réels",
            text: "On rejoue des demandes passées. Vous comparez ce que l’agent propose à ce que votre équipe a réellement fait.",
          },
          {
            title: "Mise en service supervisée",
            text: "L’agent prépare, votre équipe approuve. On mesure le temps gagné et les corrections nécessaires.",
          },
          {
            title: "Élargir prudemment",
            text: "Quand les propositions sont fiables, on lui confie plus d’autonomie — ou une deuxième tâche.",
          },
        ],
      }}
      proof={{
        label: "Sur le terrain",
        body: (
          <>
            <span className="serif-muted">
              Je fais rouler mes propres agents avant de vous en vendre : mon
              système de prospection cherche des entreprises, analyse leur site
              et rédige un premier courriel personnalisé — rien ne part sans ma
              validation. Côté clients, le système de prix fournisseurs d’une
              épicerie indépendante lit les listes de tous ses fournisseurs et
              prépare la mise à jour de la caisse, que l’équipe approuve : près
              de 56 000 $ par année de saisie éliminée.{" "}
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
          <span className="serif-muted">
            Premier agent : sprint à portée fixe dès 4 500 $, 2 à 3 semaines.
            S’ajoutent les frais d’utilisation du modèle d’IA, facturés à
            l’usage par le fournisseur — je les estime sur vos volumes réels
            avant de construire, pour qu’il n’y ait pas de surprise.
          </span>
        ),
      }}
      faq={{
        eyebrow: "Les questions qu’on me pose",
        items: [
          {
            q: "Quelle différence entre un agent IA et un chatbot ?",
            a: "Un chatbot converse. Un agent agit : il consulte vos systèmes, prépare une saisie, une réponse ou un document, et s’intègre au processus. Un chatbot de service client peut d’ailleurs être un agent, s’il répond à partir de vos documents et transfère au bon humain.",
          },
          {
            q: "Un agent IA peut-il se tromper ?",
            a: "Oui, comme un nouvel employé. C’est pour ça qu’il répond à partir de vos sources, qu’il signale quand il n’est pas sûr, et qu’une personne valide toute action qui engage l’entreprise.",
          },
          {
            q: "ChatGPT Entreprise ou Copilot ne suffisent-ils pas ?",
            a: "Pour aider chaque employé à écrire ou résumer, souvent oui. Pour qu’une tâche se fasse sans qu’on y pense — dès qu’un courriel arrive, par exemple — il faut relier l’IA à vos systèmes et à vos règles. C’est ce que fait un agent.",
          },
          {
            q: "Qu’advient-il de nos données ?",
            a: "On définit précisément ce que l’agent peut lire et écrire. Les renseignements personnels sont traités selon vos obligations (Loi 25) : fournisseurs choisis en conséquence, accès limités, aucune utilisation de vos données pour entraîner un modèle public.",
          },
          {
            q: "Combien de temps avant qu’un agent soit utile ?",
            a: "Un premier agent étroit se met en service supervisé en 2 à 3 semaines. La valeur apparaît dès qu’il prépare correctement la majorité des cas, même si votre équipe approuve encore chaque proposition.",
          },
        ],
      }}
      cta={{
        eyebrow: "Diagnostic gratuit",
        title: (
          <>
            Quelle tâche confieriez-vous{" "}
            <span className="italic">à un employé de plus ?</span>
          </>
        ),
        lead: "Décrivez-la. Je vous dis sous 24 h si un agent IA peut s’en charger, avec quelles données et pour quel effort — que l’on travaille ensemble ou non.",
        sujet: "Projet d’IA ou d’agent IA",
      }}
      related={{
        label: "Pour aller plus loin",
        links: [
          { href: "/consultant-ia/", label: "Consultant IA pour PME" },
          { href: "/traitement-documents-ia/", label: "Traitement de factures et documents" },
          { href: "/automatisation-processus/", label: "Automatisation des processus" },
          { href: "/diagnostic-ia/", label: "Test : prête pour l’IA ?" },
        ],
      }}
    />
  );
}
