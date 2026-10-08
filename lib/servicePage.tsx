import type { ReactNode } from "react";
import type { getTranslations } from "next-intl/server";
import type { ServicePageProps } from "@/components/ServicePage";
import type { SujetKey } from "@/components/ContactForm";
import type { Pathname } from "@/i18n/routing";

// Construit les props de <ServicePage> à partir d'un nœud de messages
// `services.<page>` (même structure de clés pour les cinq pages de service).
// Les href passés ici sont DÉJÀ localisés (href() de @/i18n/navigation).

type T = Awaited<ReturnType<typeof getTranslations>>;
type Item = { title: string; text: string };
type ServiceText = { kind: string; title: string; text: string };

export const dropcap = (c: ReactNode) => <span className="dropcap">{c}</span>;
export const muted = (c: ReactNode) => <span className="serif-muted">{c}</span>;
export const serifLink = (url: string) => (c: ReactNode) => (
  <a href={url} className="link-serif">
    {c}
  </a>
);

type Options = {
  pathname: Pathname;
  sujet: SujetKey;
  /** Lien « Lire le cas complet » de la preuve. */
  proofHref: string;
  /** Lien de la ligne prix (si le message contient <a>). */
  priceHref?: string;
  /** Href des liens « Pour aller plus loin », dans l'ordre de related.links. */
  related: string[];
  /** Href des cartes services.items (si la page a un bloc services). */
  services?: Array<string | undefined>;
  /** Remplace le corps par défaut de la section « approche ». */
  approachBody?: ReactNode;
};

export function serviceProps(t: T, o: Options): ServicePageProps {
  const labels = t.raw("related.links") as string[];
  return {
    pathname: o.pathname,
    breadcrumb: t("breadcrumb"),
    service: {
      name: t("service.name"),
      type: t("service.type"),
      description: t("service.description"),
    },
    eyebrow: t("eyebrow"),
    title: t("title"),
    lead: t("lead"),
    box: { kicker: t("box.kicker"), items: t.raw("box.items") as string[] },
    pains: {
      eyebrow: t("pains.eyebrow"),
      title: t("pains.title"),
      intro: t("pains.intro"),
      items: t.raw("pains.items") as string[],
    },
    approach: {
      eyebrow: t("approach.eyebrow"),
      quote: t("approach.quote"),
      body: o.approachBody ?? <p>{t.rich("approach.body", { dropcap })}</p>,
      principles: t.raw("approach.principles") as Item[],
    },
    steps: { eyebrow: t("steps.eyebrow"), items: t.raw("steps.items") as Item[] },
    services: o.services
      ? {
          title: t("services.title"),
          items: (t.raw("services.items") as ServiceText[]).map((s, i) => ({
            ...s,
            href: o.services?.[i],
          })),
        }
      : undefined,
    proof: {
      label: t("proof.label"),
      body: t.rich("proof.body", { muted, a: serifLink(o.proofHref) }),
    },
    price: {
      label: t("price.label"),
      body: t.rich("price.body", {
        muted,
        a: o.priceHref ? serifLink(o.priceHref) : (c) => c,
      }),
    },
    faq: {
      eyebrow: t("faq.eyebrow"),
      items: t.raw("faq.items") as Array<{ q: string; a: string }>,
    },
    cta: {
      eyebrow: t("cta.eyebrow"),
      title: t("cta.title"),
      lead: t("cta.lead"),
      sujet: o.sujet,
    },
    related: {
      label: t("related.label"),
      links: o.related.map((url, i) => ({ href: url, label: labels[i] })),
    },
  };
}
