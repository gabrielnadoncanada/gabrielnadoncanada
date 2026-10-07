"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { track, withCalendlyUtm } from "@/lib/analytics";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  children: ReactNode;
};

// Lien qui déclenche un événement GA4 au clic (page, page d'entrée, canal).
// Vers Calendly, la provenance est ajoutée au moment du clic seulement : le
// href rendu reste le lien canonique exigé par scripts/verify.mjs.
export function TrackedLink({ event, children, onClick, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(event, { link_url: rest.href || "" });
        if (rest.href) e.currentTarget.href = withCalendlyUtm(rest.href);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
