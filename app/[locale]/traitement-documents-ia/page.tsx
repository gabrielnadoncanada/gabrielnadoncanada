import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServicePage } from "@/components/ServicePage";
import { href } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { serviceProps } from "@/lib/servicePage";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.documents.meta" });
  return pageMetadata({
    locale,
    pathname: "/traitement-documents-ia",
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
  });
}

export default async function DocumentsPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services.documents");
  return (
    <ServicePage
      {...serviceProps(t, {
        pathname: "/traitement-documents-ia",
        sujet: "documents",
        proofHref: href(locale, "/cas/synchronisation-prix-fournisseurs"),
        priceHref: href(locale, "/calculateur"),
        related: [
          href(locale, "/guides/mise-a-jour-prix-fournisseurs"),
          href(locale, "/agents-ia"),
          href(locale, "/automatisation-processus"),
          href(locale, "/consultant-ia"),
        ],
      })}
    />
  );
}
