import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Site statique : export HTML/CSS pur, déployé sur Cloudflare Pages.
  output: "export",
  // URLs avec slash final : /cas/…/ et /refonte-de-systeme/ (identiques à l'ancien site).
  trailingSlash: true,
  // Le portrait est servi tel quel (WebP déjà optimisé) ; pas d'optimiseur d'images en export.
  images: { unoptimized: true },
};

export default withNextIntl(nextConfig);
