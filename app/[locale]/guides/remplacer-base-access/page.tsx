import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GuidePage } from "@/components/GuidePage";
import { href } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { PAGE_DATES } from "@/lib/entity";
import { pageMetadata } from "@/lib/seo";

const PATH = "/guides/remplacer-base-access";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "articles.remplacerAccess.meta" });
  return pageMetadata({
    locale,
    pathname: PATH,
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
    ogType: "article",
  });
}

export default async function RemplacerAccessPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tl = await getTranslations("common.links");
  const dates = PAGE_DATES[PATH];
  return (
    <GuidePage
      ns="articles.remplacerAccess"
      pathname={PATH}
      published={dates.published}
      modified={dates.modified}
      sujet="logiciel"
      links={{
        msft: `https://learn.microsoft.com/${locale === "fr" ? "fr-fr" : "en-us"}/lifecycle/end-of-support/end-of-support-2025`,
        specs: "https://support.microsoft.com/access/access-specifications",
        ssma: `https://learn.microsoft.com/${locale === "fr" ? "fr-fr" : "en-us"}/sql/ssma/access/sql-server-migration-assistant-for-access-accesstosql`,
        v2021: `https://learn.microsoft.com/${locale === "fr" ? "fr-fr" : "en-us"}/lifecycle/products/access-2021`,
        v2024: `https://learn.microsoft.com/${locale === "fr" ? "fr-fr" : "en-us"}/lifecycle/products/access-2024`,
        dataverse: `https://support.microsoft.com/${locale === "fr" ? "fr-fr" : "en-us"}/access/get-started-migrate-access-data-to-dataverse`,
        cai: "https://www.cai.gouv.qc.ca/protection-renseignements-personnels/information-entreprises-privees/incidents-confidentialite-mesures-securite-entreprises",
        cout: href(locale, "/guides/combien-coute-logiciel-sur-mesure-quebec"),
      }}
      related={[
        { href: href(locale, "/logiciel-sur-mesure"), label: tl("logiciel") },
        { href: href(locale, "/refonte-de-systeme"), label: tl("refonte") },
        { href: href(locale, "/guides/reprendre-vieux-logiciel"), label: tl("guideReprise") },
        { href: href(locale, "/guides/combien-coute-logiciel-sur-mesure-quebec"), label: tl("guideCoutLogiciel") },
      ]}
    />
  );
}
