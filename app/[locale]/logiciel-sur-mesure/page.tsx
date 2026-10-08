import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServicePage } from "@/components/ServicePage";
import { href } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { dropcap, serifLink, serviceProps } from "@/lib/servicePage";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.logiciel.meta" });
  return pageMetadata({
    locale,
    pathname: "/logiciel-sur-mesure",
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
  });
}

export default async function LogicielSurMesurePage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services.logiciel");
  return (
    <ServicePage
      {...serviceProps(t, {
        pathname: "/logiciel-sur-mesure",
        sujet: "logiciel",
        proofHref: href(locale, "/cas/synchronisation-prix-fournisseurs"),
        priceHref: href(locale, "/guides/combien-coute-automatisation-pme-quebec"),
        approachBody: (
          <>
            <p>{t.rich("approach.body", { dropcap })}</p>
            <p>
              {t.rich("approach.refonte", {
                a: serifLink(href(locale, "/refonte-de-systeme")),
              })}
            </p>
          </>
        ),
        related: [
          href(locale, "/refonte-de-systeme"),
          href(locale, "/automatisation-processus"),
          href(locale, "/logiciel-gestion-epicerie"),
          href(locale, "/consultant-ia"),
        ],
      })}
    />
  );
}
