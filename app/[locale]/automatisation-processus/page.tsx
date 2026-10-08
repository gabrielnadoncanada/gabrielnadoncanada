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
  const t = await getTranslations({ locale, namespace: "services.automatisation.meta" });
  return pageMetadata({
    locale,
    pathname: "/automatisation-processus",
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
  });
}

export default async function AutomatisationPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services.automatisation");
  return (
    <ServicePage
      {...serviceProps(t, {
        pathname: "/automatisation-processus",
        sujet: "automatisation",
        proofHref: href(locale, "/cas/synchronisation-prix-fournisseurs"),
        priceHref: href(locale, "/guides/combien-coute-automatisation-pme-quebec"),
        related: [
          href(locale, "/calculateur"),
          href(locale, "/guides/automatisation-pme-quebec"),
          href(locale, "/traitement-documents-ia"),
          href(locale, "/consultant-ia"),
        ],
      })}
    />
  );
}
