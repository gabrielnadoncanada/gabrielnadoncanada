import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";

const URL = "https://gabrielnadon.com/traitement-documents-ia/";
const TITLE = "Traitement automatique des factures et documents par IA — PME Québec";
const DESC =
  "Factures fournisseurs, bons de commande, listes de prix, bons de livraison : lus par l’IA, vérifiés et saisis dans votre logiciel comptable, ERP ou Excel. Les exceptions vont à un humain. PME du Québec.";

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
        alt: "Gabriel Nadon — traitement de factures et documents par IA",
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

export default function DocumentsPage() {
  return (
    <ServicePage
      path="/traitement-documents-ia/"
      breadcrumb="Traitement de documents par IA"
      service={{
        name: "Traitement automatique de factures et documents par IA",
        type: "Extraction et saisie automatisée de documents (OCR et IA)",
        description:
          "Lecture automatique des factures fournisseurs, bons de commande, bons de livraison et listes de prix par OCR et intelligence artificielle ; validation par règles ; saisie dans le logiciel comptable, l’ERP ou Excel ; exceptions transmises à un humain. Pour PME du Québec.",
      }}
      eyebrow="Factures et documents · PME du Québec"
      title={
        <>
          Vos factures et bons de commande se saisissent{" "}
          <span className="italic">encore à la main ?</span>
        </>
      }
      lead={
        <>
          Chaque document qui arrive en PDF, en photo ou dans un courriel finit
          par être relu et retapé par quelqu’un. L’IA sait maintenant lire ces
          documents de façon fiable : elle extrait les champs, les vérifie
          contre vos règles et les envoie dans votre logiciel. Votre équipe ne
          traite plus que les exceptions.
        </>
      }
      box={{
        kicker: "Les documents qu’on traite",
        items: [
          "Factures fournisseurs : numéro, date, montants, taxes, lignes de produits.",
          "Bons de commande et bons de livraison, rapprochés entre eux.",
          "Listes de prix fournisseurs, en PDF, Excel ou CSV, aux formats tous différents.",
          "Formulaires, feuilles de temps et documents de chantier.",
        ],
      }}
      pains={{
        eyebrow: "Les signes",
        title: "Quelqu’un chez vous est payé pour recopier ce qui est déjà écrit.",
        intro:
          "La saisie de documents ne figure sur aucun état financier. Elle se cache dans la paie, dans les retards de facturation et dans les erreurs qu’on découvre trop tard.",
        items: [
          "Les factures s’empilent en fin de mois, et la comptabilité court après.",
          "Chaque fournisseur envoie un format différent ; aucun outil standard ne les lit tous.",
          "Une erreur de saisie sur un prix ou une quantité coûte plus cher que la saisie elle-même.",
          "Les bons de livraison ne sont jamais rapprochés des commandes.",
          "Vous avez essayé un logiciel d’OCR : il lisait le texte, mais ne comprenait pas le document.",
        ],
      }}
      approach={{
        eyebrow: "Comment ça fonctionne",
        quote:
          "L’OCR lit les caractères. L’IA comprend le document. Les règles vérifient. L’humain tranche les exceptions.",
        body: (
          <p>
            <span className="dropcap">U</span>n document passe par quatre
            étapes : il est capté (courriel, dossier partagé, numérisation), lu
            et structuré par l’IA, vérifié par des règles propres à votre
            entreprise — fournisseur connu, totaux qui balancent, commande
            correspondante — puis saisi dans votre système. Ce qui ne passe pas
            les contrôles arrive dans une file de révision, avec la raison.
          </p>
        ),
        principles: [
          {
            title: "Testé sur vos vrais documents",
            text: "Avant tout engagement, on fait passer un échantillon de vos factures et on mesure ce qui sort correctement.",
          },
          {
            title: "Des contrôles, pas de la confiance aveugle",
            text: "Un total qui ne balance pas, un fournisseur inconnu, un prix anormal : le document est retenu et signalé.",
          },
          {
            title: "Branché sur votre logiciel",
            text: "QuickBooks, Acomba, Sage, votre ERP ou Excel — par import, API ou export, selon ce que le logiciel permet.",
          },
        ],
      }}
      steps={{
        eyebrow: "La démarche, en cinq étapes",
        items: [
          {
            title: "Inventaire des documents",
            text: "Quels documents, combien par mois, de combien de fournisseurs, et où ils doivent aboutir.",
          },
          {
            title: "Essai sur un échantillon",
            text: "Une cinquantaine de vrais documents passent dans le système. On voit précisément ce qui est fiable et ce qui ne l’est pas.",
          },
          {
            title: "Règles de validation",
            text: "On écrit avec vous les contrôles qui comptent : seuils, rapprochements, fournisseurs autorisés.",
          },
          {
            title: "Connexion au logiciel",
            text: "Les données validées sont saisies automatiquement ; les exceptions arrivent dans une file simple à traiter.",
          },
          {
            title: "Suivi des exceptions",
            text: "On regarde ce qui tombe en exception et on améliore les règles jusqu’à ce que la file devienne marginale.",
          },
        ],
      }}
      proof={{
        label: "Sur le terrain",
        body: (
          <>
            <span className="serif-muted">
              Une épicerie indépendante recevait les listes de prix de tous ses
              fournisseurs, chacune dans son format, et les retapait dans sa
              caisse : près de 56 000 $ par année. Le système lit maintenant ces
              listes, compare quelque 37 000 prix à chaque cycle et prépare la
              mise à jour — sans remplacer la caisse, et l’équipe approuve avant
              application.{" "}
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
              Essai sur échantillon compris dans le premier sprint : dès 4 500 $,
              portée fixe, 2 à 3 semaines pour un type de document. S’ajoutent
              les frais de traitement à l’usage, estimés sur vos volumes réels
              avant de construire.{" "}
            </span>
            <a href="/calculateur/" className="link-serif">
              Calculer ce que la saisie vous coûte →
            </a>
          </>
        ),
      }}
      faq={{
        eyebrow: "Les questions qu’on me pose",
        items: [
          {
            q: "Quelle différence entre l’OCR et le traitement par IA ?",
            a: "L’OCR transforme une image en texte. L’IA comprend ce texte : elle sait qu’un nombre est un total avant taxes, qu’une ligne est un produit, qu’un document est une note de crédit. C’est ce qui permet de lire des formats différents sans gabarit par fournisseur.",
          },
          {
            q: "Quel taux de précision peut-on attendre ?",
            a: "Ça dépend de vos documents : qualité des numérisations, variété des formats, écriture manuscrite. C’est pour ça qu’on commence par un essai sur vos vrais documents, et que des règles retiennent tout ce qui est douteux au lieu de le saisir.",
          },
          {
            q: "Fonctionne-t-il avec QuickBooks, Acomba ou Sage ?",
            a: "Oui, selon les accès que le logiciel offre : API, import de fichiers ou export structuré. On valide le chemin d’intégration pendant le diagnostic, avant tout engagement.",
          },
          {
            q: "Et les documents manuscrits ou mal numérisés ?",
            a: "Ils sont lus quand c’est possible, et envoyés en révision quand la lecture n’est pas assez sûre. L’objectif n’est pas zéro intervention humaine, c’est zéro saisie inutile.",
          },
          {
            q: "Nos documents contiennent des renseignements personnels. Est-ce un problème ?",
            a: "Non, si c’est encadré : on choisit des fournisseurs et des réglages compatibles avec vos obligations (Loi 25), on limite les accès et on ne conserve que ce qui est nécessaire.",
          },
        ],
      }}
      cta={{
        eyebrow: "Diagnostic gratuit",
        title: (
          <>
            Combien de documents votre équipe{" "}
            <span className="italic">retape-t-elle chaque mois ?</span>
          </>
        ),
        lead: "Dites-moi lesquels et à peu près combien. Je vous réponds sous 24 h avec ce qui est automatisable et une idée honnête de l’effort.",
        sujet: "Traitement de documents ou de factures",
      }}
      related={{
        label: "Pour aller plus loin",
        links: [
          { href: "/guides/mise-a-jour-prix-fournisseurs/", label: "Mise à jour des prix fournisseurs : 4 méthodes" },
          { href: "/agents-ia/", label: "Agents IA pour entreprise" },
          { href: "/automatisation-processus/", label: "Automatisation des processus" },
          { href: "/consultant-ia/", label: "Consultant IA pour PME" },
        ],
      }}
    />
  );
}
