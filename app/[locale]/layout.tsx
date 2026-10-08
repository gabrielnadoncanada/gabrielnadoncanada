import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { SiteDocument, siteMetadata, siteViewport } from "@/components/SiteDocument";
import { routing } from "@/i18n/routing";
import { CLIENT_NAMESPACES, loadMessages } from "@/i18n/request";
import "../fonts.css";
import "../globals.css";

export const metadata = siteMetadata;
export const viewport = siteViewport;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  // Seuls les messages lus côté client partent dans le HTML.
  const all = await loadMessages(locale);
  const clientMessages = Object.fromEntries(
    CLIENT_NAMESPACES.map((ns) => [ns, all[ns]])
  );

  return (
    <SiteDocument locale={locale} messages={clientMessages}>
      {children}
    </SiteDocument>
  );
}
