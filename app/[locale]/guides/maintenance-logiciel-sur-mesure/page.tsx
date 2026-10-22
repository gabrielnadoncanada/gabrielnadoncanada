import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GuidePage } from "@/components/GuidePage";
import { href } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { PAGE_DATES } from "@/lib/entity";
import { pageMetadata } from "@/lib/seo";

const PATH = "/guides/maintenance-logiciel-sur-mesure";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "articles.maintenanceLogiciel.meta" });
  return pageMetadata({
    locale,
    pathname: PATH,
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
    ogType: "article",
  });
}

export default async function MaintenanceLogicielPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tl = await getTranslations("common.links");
  const dates = PAGE_DATES[PATH];
  return (
    <GuidePage
      ns="articles.maintenanceLogiciel"
      pathname={PATH}
      published={dates.published}
      modified={dates.modified}
      sujet="refonte"
      links={{
        wit: "https://witify.io/blogue/combien-coute-le-developpement-dun-logiciel-sur-mesure-au-quebec",
        msft: `https://learn.microsoft.com/${locale === "fr" ? "fr-fr" : "en-us"}/lifecycle/end-of-support/end-of-support-2025`,
        lda: `https://laws-lois.justice.gc.ca/${locale === "fr" ? "fra/lois" : "eng/acts"}/C-42/page-3.html`,
        cai: "https://www.cai.gouv.qc.ca/protection-renseignements-personnels/information-entreprises-privees/incidents-confidentialite-mesures-securite-entreprises",
        reprise: href(locale, "/guides/reprendre-vieux-logiciel"),
      }}
      related={[
        { href: href(locale, "/refonte-de-systeme"), label: tl("refonte") },
        { href: href(locale, "/guides/reprendre-vieux-logiciel"), label: tl("guideReprise") },
        { href: href(locale, "/guides/choisir-developpeur-logiciel"), label: tl("guideChoisir") },
        { href: href(locale, "/guides/combien-coute-logiciel-sur-mesure-quebec"), label: tl("guideCoutLogiciel") },
      ]}
    />
  );
}
