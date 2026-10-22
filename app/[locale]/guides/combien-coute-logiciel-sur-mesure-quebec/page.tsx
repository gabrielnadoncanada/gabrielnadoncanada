import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GuidePage } from "@/components/GuidePage";
import { href } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { PAGE_DATES } from "@/lib/entity";
import { pageMetadata } from "@/lib/seo";

const PATH = "/guides/combien-coute-logiciel-sur-mesure-quebec";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "articles.coutLogiciel.meta" });
  return pageMetadata({
    locale,
    pathname: PATH,
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
    ogType: "article",
  });
}

export default async function CoutLogicielPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tl = await getTranslations("common.links");
  const dates = PAGE_DATES[PATH];
  return (
    <GuidePage
      ns="articles.coutLogiciel"
      pathname={PATH}
      published={dates.published}
      modified={dates.modified}
      sujet="logiciel"
      links={{
        cas: href(locale, "/cas/synchronisation-prix-fournisseurs"),
        cai: "https://www.cai.gouv.qc.ca/protection-renseignements-personnels/information-entreprises-privees/incidents-confidentialite-mesures-securite-entreprises",
        essor: "https://www.investquebec.com/fr/financement/programmes-gouvernementaux/essor/appui-la-concretisation-de-projets-dinvestissement",
      }}
      related={[
        { href: href(locale, "/logiciel-sur-mesure"), label: tl("logiciel") },
        { href: href(locale, "/refonte-de-systeme"), label: tl("refonte") },
        { href: href(locale, "/guides/remplacer-base-access"), label: tl("guideAccess") },
        { href: href(locale, "/guides/combien-coute-automatisation-pme-quebec"), label: tl("guideCoutAuto") },
      ]}
    />
  );
}
