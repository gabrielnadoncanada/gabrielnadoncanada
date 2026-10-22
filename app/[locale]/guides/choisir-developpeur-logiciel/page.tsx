import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GuidePage } from "@/components/GuidePage";
import { href } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { PAGE_DATES } from "@/lib/entity";
import { pageMetadata } from "@/lib/seo";

const PATH = "/guides/choisir-developpeur-logiciel";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "articles.choisirDeveloppeur.meta" });
  return pageMetadata({
    locale,
    pathname: PATH,
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
    ogType: "article",
  });
}

export default async function ChoisirDeveloppeurPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tl = await getTranslations("common.links");
  const dates = PAGE_DATES[PATH];
  return (
    <GuidePage
      ns="articles.choisirDeveloppeur"
      pathname={PATH}
      published={dates.published}
      modified={dates.modified}
      sujet="logiciel"
      links={{
        wit: "https://witify.io/blogue/combien-coute-le-developpement-dun-logiciel-sur-mesure-au-quebec",
        lda: `https://laws-lois.justice.gc.ca/${locale === "fr" ? "fra/lois" : "eng/acts"}/C-42/page-3.html`,
        cai: "https://www.cai.gouv.qc.ca/protection-renseignements-personnels/information-entreprises-privees/incidents-confidentialite-mesures-securite-entreprises",
        maintenance: href(locale, "/guides/maintenance-logiciel-sur-mesure"),
      }}
      related={[
        { href: href(locale, "/logiciel-sur-mesure"), label: tl("logiciel") },
        { href: href(locale, "/guides/combien-coute-logiciel-sur-mesure-quebec"), label: tl("guideCoutLogiciel") },
        { href: href(locale, "/guides/maintenance-logiciel-sur-mesure"), label: tl("guideMaintenance") },
        { href: href(locale, "/guides/subventions-projet-logiciel-quebec"), label: tl("guideSubventions") },
      ]}
    />
  );
}
