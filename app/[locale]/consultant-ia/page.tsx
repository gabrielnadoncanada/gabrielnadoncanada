import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServicePage } from "@/components/ServicePage";
import { href, otherLocale } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { serviceProps } from "@/lib/servicePage";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.consultantIa.meta" });
  return pageMetadata({
    locale,
    pathname: "/consultant-ia",
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
  });
}

export default async function ConsultantIAPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services.consultantIa");
  return (
    <ServicePage
      {...serviceProps(t, {
        pathname: "/consultant-ia",
        sujet: "ia",
        proofHref: href(locale, "/cas/synchronisation-prix-fournisseurs"),
        priceHref: href(locale, "/guides/combien-coute-automatisation-pme-quebec"),
        services: [
          href(locale, "/agents-ia"),
          href(locale, "/traitement-documents-ia"),
          href(locale, "/automatisation-processus"),
          href(locale, "/logiciel-sur-mesure"),
        ],
        related: [
          href(locale, "/diagnostic-ia"),
          href(locale, "/calculateur"),
          href(locale, "/guides/automatisation-pme-quebec"),
          // Lien vers l’autre langue (libellé dans la langue cible).
          href(otherLocale(locale), "/consultant-ia"),
        ],
      })}
    />
  );
}
