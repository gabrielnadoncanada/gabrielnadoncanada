import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { MinimalFooter } from "@/components/MinimalFooter";
import { ContactForm, type SujetKey } from "@/components/ContactForm";
import { TrackedLink } from "@/components/TrackedLink";
import { absUrl, href } from "@/i18n/navigation";
import type { Locale, Pathname } from "@/i18n/routing";
import { jsonLdLang } from "@/lib/seo";
import "@/app/home.css";

const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";
const SITE = "https://gabrielnadon.com";

type Table = { caption: string; head: string[]; rows: string[][] };
type Section = { h: string; p?: string[]; list?: string[]; table?: Table; after?: string[] };
type Source = { label: string; url: string };
type Faq = { q: string; a: string };

export type GuidePageProps = {
  /** Espace de noms des textes, ex. "articles.remplacerExcel". */
  ns: string;
  /** Chemin interne (clé de routing.pathnames). */
  pathname: Pathname;
  /** Dates ISO (AAAA-MM-JJ) : publication et dernière vérification des faits. */
  published: string;
  modified: string;
  /** Balises de lien utilisables dans les textes : <svc>…</svc> → URL. */
  links: Record<string, string>;
  sujet: SujetKey;
  /** Liens déjà localisés vers les pages sœurs (offre + guides). */
  related: Array<{ href: string; label: string }>;
};

// Gabarit des articles/guides « réponse d'abord », pensé pour être cité par
// les moteurs IA : un encadré « En bref » qui répond à la question du titre,
// des sections titrées par les vraies questions des acheteurs, des tableaux
// quand on compare, les sources primaires en bas, l'auteur et la date de
// mise à jour visibles. JSON-LD : Article (auteur = l'entité Person du site) +
// BreadcrumbList + FAQPage (seulement des questions affichées sur la page).
export function GuidePage(p: GuidePageProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations(p.ns);
  const tc = useTranslations("common");
  const url = absUrl(locale, p.pathname);
  const home = absUrl(locale, "/");

  const rich = Object.fromEntries([
    ["strong", (chunks: ReactNode) => <strong>{chunks}</strong>],
    ...Object.entries(p.links).map(([tag, h]) => [
      tag,
      (chunks: ReactNode) => (
        <a href={h} className="link-serif" {...(/^https?:/.test(h) ? { rel: "noopener" } : {})}>
          {chunks}
        </a>
      ),
    ]),
  ]);
  // Les textes passent par t.rich ; on relit la structure brute pour boucler.
  const sections = t.raw("sections") as Section[];
  const sources = t.raw("sources.items") as Source[];
  const faq = t.raw("faq.items") as Faq[];
  const fmt = (iso: string) =>
    new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(`${iso}T12:00:00`));

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: t("title"),
        description: t("meta.description"),
        inLanguage: jsonLdLang(locale),
        datePublished: p.published,
        dateModified: p.modified,
        author: { "@id": `${SITE}/#gabriel` },
        publisher: { "@id": `${SITE}/#business` },
        mainEntityOfPage: url,
        image: `${SITE}/og-image.png`,
        citation: sources.map((s) => s.url),
      },
      ...(faq.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: tc("service.home"), item: home },
          { "@type": "ListItem", position: 2, name: t("breadcrumb"), item: url },
        ],
      },
    ],
  };

  const nav = [
    { href: href(locale, "/logiciel-sur-mesure"), label: tc("links.logiciel") },
    { href: href(locale, "/refonte-de-systeme"), label: tc("links.refonte") },
    { href: "#contact", label: tc("header.nav.contact") },
  ];

  return (
    <div id="dc-root">
      <div className="page hm svc gd">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
        />

        <Ticker />
        <SiteHeader pathname={p.pathname} navItems={nav} ctaHref="#contact" />

        <main>
          <article>
            <header className="hm-hero gd-hero">
              <div className="hm-wrap gd-col">
                <p className="hm-kicker">{t("eyebrow")}</p>
                <h1 className="hm-h1 svc-h1">{t("title")}</h1>
                <p className="gd-byline">
                  {t.rich("byline", {
                    author: (chunks) => <a href={home}>{chunks}</a>,
                  })}{" "}
                  · <time dateTime={p.modified}>{`${t("updated")} ${fmt(p.modified)}`}</time>
                </p>
                <div className="gd-brief" role="note">
                  <p className="gd-brief-label">{t("summaryLabel")}</p>
                  <p>{t.rich("summary", rich)}</p>
                </div>
              </div>
            </header>

            {sections.map((s, i) => (
              <section key={s.h} className={i % 2 ? "hm-section hm-band" : "hm-section"}>
                <div className="hm-wrap gd-col gd-prose">
                  <h2 className="hm-h2">{s.h}</h2>
                  {(s.p ?? []).map((_, j) => (
                    <p key={j}>{t.rich(`sections.${i}.p.${j}`, rich)}</p>
                  ))}
                  {s.list ? (
                    <ul className="gd-list">
                      {s.list.map((_, j) => (
                        <li key={j}>{t.rich(`sections.${i}.list.${j}`, rich)}</li>
                      ))}
                    </ul>
                  ) : null}
                  {s.table ? (
                    <div className="gd-table-wrap">
                      <table className="gd-table">
                        <caption>{s.table.caption}</caption>
                        <thead>
                          <tr>
                            {s.table.head.map((h) => (
                              <th key={h} scope="col">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {s.table.rows.map((row) => (
                            <tr key={row[0]}>
                              {row.map((cell, k) =>
                                k === 0 ? (
                                  <th key={k} scope="row">
                                    {cell}
                                  </th>
                                ) : (
                                  <td key={k}>{cell}</td>
                                )
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                  {(s.after ?? []).map((_, j) => (
                    <p key={`a${j}`}>{t.rich(`sections.${i}.after.${j}`, rich)}</p>
                  ))}
                </div>
              </section>
            ))}

            {faq.length ? (
              <section className="hm-section" id="faq">
                <div className="hm-wrap hm-split">
                  <h2 className="hm-h2">{t("faq.eyebrow")}</h2>
                  <div className="svc-faq">
                    {faq.map((f, i) => (
                      <details key={f.q} open={i === 0}>
                        <summary>
                          <span>{f.q}</span>
                          <span className="svc-faq-icon" aria-hidden="true"></span>
                        </summary>
                        <p>{f.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </section>
            ) : null}

            <section className="hm-section-tight svc-related">
              <div className="hm-wrap gd-col">
                <h2 className="hm-h3">{t("sources.label")}</h2>
                <ol className="gd-sources">
                  {sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} rel="noopener">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ol>
                <p className="gd-note">{t("sources.note")}</p>
              </div>
            </section>
          </article>

          <section className="hm-section-tight svc-related">
            <div className="hm-wrap">
              <h2 className="hm-h3">{t("relatedLabel")}</h2>
              <div className="svc-related-links">
                {p.related.map((l) => (
                  <a key={l.href} href={l.href}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="hm-section hm-contact" id="contact">
            <div className="hm-wrap hm-contact-grid">
              <div>
                <p className="hm-kicker">{t("cta.eyebrow")}</p>
                <h2 className="hm-h2">{t("cta.title")}</h2>
                <p className="hm-lead">{t("cta.lead")}</p>
                <p className="svc-cal">
                  <TrackedLink event="clic_audit" href={CAL} target="_blank" rel="noopener">
                    {tc("service.calendly")}
                  </TrackedLink>
                </p>
              </div>
              <div className="contact-card hm-form">
                <ContactForm withPhone defaultSujet={p.sujet} />
              </div>
            </div>
          </section>
        </main>

        <MinimalFooter />
      </div>
    </div>
  );
}
