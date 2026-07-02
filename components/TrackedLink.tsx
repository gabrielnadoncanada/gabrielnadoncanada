"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  children: ReactNode;
};

// Lien qui déclenche un événement GA4 au clic (remplace onclick="gtag(...)").
export function TrackedLink({ event, children, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={() => {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", event);
        }
      }}
    >
      {children}
    </a>
  );
}
