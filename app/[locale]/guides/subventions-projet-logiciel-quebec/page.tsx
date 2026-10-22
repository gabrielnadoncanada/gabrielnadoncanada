import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GuidePage } from "@/components/GuidePage";
import { href } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { PAGE_DATES } from "@/lib/entity";
import { pageMetadata } from "@/lib/seo";

const PATH = "/guides/subventions-projet-logiciel-quebec";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "articles.subventionsLogiciel.meta" });
  return pageMetadata({
    locale,
    pathname: PATH,
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
    ogType: "article",
  });
}

export default async function SubventionsLogicielPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tl = await getTranslations("common.links");
  const dates = PAGE_DATES[PATH];
  return (
    <GuidePage
      ns="articles.subventionsLogiciel"
      pathname={PATH}
      published={dates.published}
      modified={dates.modified}
      sujet="logiciel"
      links={{
        iq: "https://www.investquebec.com/fr/financement/programmes-gouvernementaux/essor/appui-la-concretisation-de-projets-dinvestissement",
      }}
      related={[
        { href: href(locale, "/guides/combien-coute-logiciel-sur-mesure-quebec"), label: tl("guideCoutLogiciel") },
        { href: href(locale, "/logiciel-sur-mesure"), label: tl("logiciel") },
        { href: href(locale, "/guides/automatisation-pme-quebec"), label: tl("guideAutomatisation") },
        { href: href(locale, "/guides/choisir-developpeur-logiciel"), label: tl("guideChoisir") },
      ]}
    />
  );
}
