import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";

const URL = "https://gabrielnadon.com/logiciel-sur-mesure/";
const TITLE = "Logiciel sur mesure pour PME au Québec";
const DESC =
  "Soumissions, bons de travail, feuilles de temps, inventaire, suivi de projets : quand Excel est devenu votre logiciel de gestion, je construis un vrai système interne, par tranches d’environ 6 000 $, relié à vos outils. PME du Québec.";

export const metadata: Metadata = {
  title: `${TITLE} : remplacer Excel | Gabriel Nadon`,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    siteName: "Gabriel Nadon",
    title: `${TITLE} — remplacer Excel par un vrai système`,
    description: DESC,
    url: URL,
    locale: "fr_CA",
    images: [
      {
        url: "https://gabrielnadon.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gabriel Nadon — logiciel sur mesure pour PME",
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

export default function LogicielSurMesurePage() {
  return (
    <ServicePage
      path="/logiciel-sur-mesure/"
      breadcrumb="Logiciel sur mesure"
      service={{
        name: "Développement de logiciel sur mesure pour PME",
        type: "Développement de logiciels et systèmes internes sur mesure",
        description:
          "Systèmes internes sur mesure pour PME québécoises — soumissions, bons de travail, feuilles de temps, inventaire, suivi de projets, portails clients — construits par tranches et reliés aux logiciels existants (comptabilité, ERP, Excel).",
      }}
      eyebrow="Logiciel sur mesure · PME du Québec"
      title={
        <>
          Quand Excel est devenu votre logiciel de gestion,{" "}
          <span className="italic">il est temps d’en avoir un vrai.</span>
        </>
      }
      lead={
        <>
          Votre entreprise a grandi plus vite que ses outils. Les soumissions
          vivent dans un fichier, les heures dans un autre, les projets dans
          les courriels — et aucun logiciel du marché ne colle à votre façon de
          travailler. Je construis le système interne qui manque, morceau par
          morceau, relié à ce que vous utilisez déjà.
        </>
      }
      box={{
        kicker: "Ce que les PME me demandent de construire",
        items: [
          "Soumissions et estimations à partir de vos prix et gabarits.",
          "Bons de travail, feuilles de temps et suivi de chantier ou de production.",
          "Inventaire, commandes fournisseurs et réceptions.",
          "Tableau de bord qui réunit enfin les chiffres de tous vos logiciels.",
        ],
      }}
      pains={{
        eyebrow: "Les signes",
        title: "Votre vrai logiciel de gestion, c’est un fichier que personne n’ose toucher.",
        intro:
          "Excel est un excellent outil pour commencer. Il devient un risque quand l’entreprise entière en dépend et qu’une seule personne sait comment il fonctionne.",
        items: [
          "Plusieurs versions du même fichier circulent, et personne ne sait laquelle est la bonne.",
          "Vous payez trois ou quatre abonnements qui couvrent chacun une partie du besoin.",
          "Les logiciels du marché vous obligent à changer une façon de faire qui fonctionne.",
          "Les chiffres pour décider arrivent en fin de mois — trop tard.",
          "Votre ancien logiciel maison n’est plus entretenu par personne.",
        ],
      }}
      approach={{
        eyebrow: "Acheter ou construire ?",
        quote:
          "Si un logiciel du marché fait 80 % du travail, achetez-le. Le sur mesure se justifie quand votre façon de travailler est votre avantage.",
        body: (
          <>
            <p>
              <span className="dropcap">J</span>e vous le dis franchement
              pendant le diagnostic : souvent, la bonne réponse est un logiciel
              existant, bien configuré. Le sur mesure devient rentable quand vous
              jonglez entre plusieurs outils qui ne se parlent pas, quand votre
              processus est particulier, ou quand le coût cumulé des licences dépasse
              celui d’un système fait pour vous.
            </p>
            <p>
              Votre système actuel est vieillissant ?{" "}
              <a href="/refonte-de-systeme/" className="link-serif">
                Voyez comment je le remplace sans arrêter vos opérations →
              </a>
            </p>
          </>
        ),
        principles: [
          {
            title: "Par tranches",
            text: "Chaque tranche est livrée, utilisée et rentabilisée avant la suivante. Pas de projet de dix-huit mois.",
          },
          {
            title: "Relié à l’existant",
            text: "Le système se branche sur votre comptabilité, votre ERP ou vos fichiers au lieu de tout remplacer d’un coup.",
          },
          {
            title: "Pensé pour l’IA",
            text: "Des données propres et centralisées : c’est la condition pour automatiser ensuite, avec ou sans IA.",
          },
        ],
      }}
      steps={{
        eyebrow: "La démarche, en cinq étapes",
        items: [
          {
            title: "Diagnostic",
            text: "On regarde comment l’information circule vraiment chez vous, et où elle se perd.",
          },
          {
            title: "Découpage en tranches",
            text: "Le système est découpé en morceaux utiles par eux-mêmes ; on commence par celui qui coûte le plus cher aujourd’hui.",
          },
          {
            title: "Première tranche",
            text: "Construite et mise en service en quelques semaines, sur vos vraies données, avec votre équipe.",
          },
          {
            title: "Migration des données",
            text: "Vos fichiers et historiques sont importés, vérifiés et rapprochés — les totaux doivent balancer.",
          },
          {
            title: "Tranche suivante",
            text: "Au rythme de vos opérations et de votre budget, jusqu’à ce que le système couvre ce qui compte.",
          },
        ],
      }}
      proof={{
        label: "Sur le terrain",
        body: (
          <>
            <span className="serif-muted">
              Plutôt que de remplacer la caisse d’une épicerie indépendante, j’ai
              construit à côté un système qui lit les listes de prix des
              fournisseurs, compare quelque 37 000 prix à chaque cycle et
              alimente la caisse existante : près de 56 000 $ par année de saisie
              éliminée, sans interruption des opérations.{" "}
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
              Par tranches d’environ 6 000 $ ; la plupart des systèmes
              totalisent entre 12 000 $ et 30 000 $. Le crédit d’impôt C3I et
              ESSOR peuvent couvrir une partie de l’investissement.{" "}
            </span>
            <a href="/guides/combien-coute-automatisation-pme-quebec/" className="link-serif">
              Prix du marché et subventions →
            </a>
          </>
        ),
      }}
      faq={{
        eyebrow: "Les questions qu’on me pose",
        items: [
          {
            q: "Combien coûte un logiciel sur mesure pour une PME ?",
            a: "Chez moi, par tranches d’environ 6 000 $, et la plupart des systèmes totalisent entre 12 000 $ et 30 000 $. Les plateformes intégrées plus larges peuvent dépasser 100 000 $ ; à ce niveau, exigez un découpage par étapes.",
          },
          {
            q: "Combien de temps avant d’avoir quelque chose d’utilisable ?",
            a: "La première tranche est en service en quelques semaines. C’est le principe : vous utilisez le système pendant qu’il grandit, au lieu d’attendre une livraison finale.",
          },
          {
            q: "Pourquoi pas un logiciel du marché ?",
            a: "C’est souvent la bonne réponse, et je vous le dirai. Le sur mesure se justifie quand aucun produit ne colle à votre processus, quand vous payez plusieurs abonnements partiels, ou quand votre façon de travailler est un avantage concurrentiel.",
          },
          {
            q: "Le système se connecte-t-il à notre comptabilité ?",
            a: "Oui, selon les accès offerts par votre logiciel : API, import de fichiers ou export structuré. On valide ce chemin dès le diagnostic.",
          },
          {
            q: "Qu’arrive-t-il après la livraison ?",
            a: "Le système vous est remis documenté, avec ses accès. Le soutien et les évolutions se conviennent ensemble — à la tranche ou selon une entente mensuelle.",
          },
        ],
      }}
      cta={{
        eyebrow: "Diagnostic gratuit",
        title: (
          <>
            Quel fichier Excel fait rouler{" "}
            <span className="italic">votre entreprise ?</span>
          </>
        ),
        lead: "Décrivez-le, ou ce qui coince dans vos outils actuels. Je vous réponds sous 24 h avec un premier découpage et une idée honnête de l’effort.",
        sujet: "Système opérationnel sur mesure",
      }}
      related={{
        label: "Pour aller plus loin",
        links: [
          { href: "/refonte-de-systeme/", label: "Refonte d’un système existant" },
          { href: "/automatisation-processus/", label: "Automatisation des processus" },
          { href: "/logiciel-gestion-epicerie/", label: "Logiciel de gestion pour épicerie" },
          { href: "/consultant-ia/", label: "Consultant IA pour PME" },
        ],
      }}
    />
  );
}
