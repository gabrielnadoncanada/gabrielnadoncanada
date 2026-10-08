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
  const t = await getTranslations({ locale, namespace: "services.agentsIa.meta" });
  return pageMetadata({
    locale,
    pathname: "/agents-ia",
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
  });
}

export default async function AgentsIAPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services.agentsIa");
  return (
    <ServicePage
      {...serviceProps(t, {
        pathname: "/agents-ia",
        sujet: "ia",
        proofHref: href(locale, "/cas/synchronisation-prix-fournisseurs"),
        related: [
          href(locale, "/consultant-ia"),
          href(locale, "/traitement-documents-ia"),
          href(locale, "/automatisation-processus"),
          href(locale, "/diagnostic-ia"),
        ],
      })}
    />
  );
}
