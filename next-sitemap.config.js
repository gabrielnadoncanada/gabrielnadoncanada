/**
 * Génère out/sitemap.xml + out/robots.txt à partir des routes exportées.
 * Lancé au postbuild (voir package.json), APRÈS l'export Next dans out/.
 *
 * Contraintes imposées par scripts/verify.mjs :
 *  - sitemap plat (pas d'index) → generateIndexSitemap: false
 *  - URLs à slash final (comme next.config.mjs trailingSlash) → trailingSlash: true
 *  - les pages noindex (/diagnostic/, /merci/) et la 404 NE doivent PAS y figurer
 *
 * @type {import('next-sitemap').IConfig}
 */
module.exports = {
  siteUrl: "https://gabrielnadon.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: "out",
  trailingSlash: true,
  changefreq: "monthly",
  autoLastmod: true,
  // Landings payantes noindex + page d'erreur : hors sitemap.
  exclude: ["/diagnostic", "/diagnostic/", "/merci", "/merci/", "/404", "/404/"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/", disallow: ["/diagnostic/", "/merci/"] },
    ],
  },
};
