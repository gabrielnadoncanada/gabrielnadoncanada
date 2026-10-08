import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Ticker } from "@/components/Ticker";
import { SiteHeader } from "@/components/SiteHeader";
import { HomeFooter } from "@/components/HomeFooter";
import { ContactForm } from "@/components/ContactForm";
import { absUrl, href } from "@/i18n/navigation";
import type { Locale, Pathname } from "@/i18n/routing";
import { jsonLdLang, pageMetadata } from "@/lib/seo";
import "@/app/home.css";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });
  return pageMetadata({
    locale,
    pathname: "/",
    title: t("title"),
    description: t("description"),
    ogTitle: t("ogTitle"),
    ogDescription: t("ogDescription"),
  });
}

const SITE = "https://gabrielnadon.com";

const SAME_AS = [
  "https://www.linkedin.com/in/gabrielnadoncanada/",
  "https://www.facebook.com/gabriel.nadon.2025",
];

// Clé de message (home.jsonld.offers / home.services.items) → page de service.
const OFFRES: Array<{ key: string; pathname: Pathname }> = [
  { key: "consultantIa", pathname: "/consultant-ia" },
  { key: "agentsIa", pathname: "/agents-ia" },
  { key: "documents", pathname: "/traitement-documents-ia" },
  { key: "automatisation", pathname: "/automatisation-processus" },
  { key: "logiciel", pathname: "/logiciel-sur-mesure" },
  { key: "refonte", pathname: "/refonte-de-systeme" },
];

// Ordre d'affichage des services sur la home (la refonte est un lien dans « logiciel »).
const SERVICES = ["consultantIa", "documents", "agentsIa", "automatisation", "logiciel"];

const OUTILS: Array<{ key: string; pathname: Pathname }> = [
  { key: "calculateur", pathname: "/calculateur" },
  { key: "quiz", pathname: "/diagnostic-ia" },
  { key: "guide", pathname: "/guides/automatisation-pme-quebec" },
  { key: "comparatif", pathname: "/guides/comparatif-logiciels-epicerie-quebec" },
  { key: "barometre", pathname: "/barometre" },
];

type QueueItem = { title: string; meta: string; done: boolean };
type Step = { when: string; title: string; text: string };
type Cap = { verb: string; rest: string };
type ProofStep = { label: string; title: string; text: string };
type Stat = { num: string; label: string };

function Arrow() {
  return (
    <svg className="hm-arrow" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M4 10h11M11 5l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Check() {
  return (
    <svg className="hm-check" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3.5 8.5l3 3 6-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const strong = (chunks: React.ReactNode) => <strong>{chunks}</strong>;

export default async function Home({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("common.header.nav");

  const nav = [
    { href: "#probleme", label: tc("situation") },
    { href: "#methode", label: tc("method") },
    { href: "#services", label: tc("services") },
    { href: "#cas", label: tc("case") },
    { href: "#contact", label: tc("contact") },
  ];

  const home = absUrl(locale, "/");
  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: home,
        name: t("jsonld.siteName"),
        inLanguage: jsonLdLang(locale),
        publisher: { "@id": `${SITE}/#gabriel` },
      },
      {
        "@type": "Person",
        "@id": `${SITE}/#gabriel`,
        name: "Gabriel Nadon",
        url: home,
        image: `${SITE}/portrait.png`,
        jobTitle: t("jsonld.jobTitle"),
        email: "bonjour@gabrielnadon.com",
        description: t("jsonld.personDescription"),
        address: {
          "@type": "PostalAddress",
          addressLocality: "Montréal",
          addressRegion: "QC",
          addressCountry: "CA",
        },
        areaServed: "Québec",
        knowsAbout: t.raw("jsonld.knowsAbout") as string[],
        knowsLanguage: ["fr-CA", "en-CA"],
        sameAs: SAME_AS,
        worksFor: { "@id": `${SITE}/#business` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE}/#business`,
        name: t("jsonld.businessName"),
        url: home,
        image: `${SITE}/og-image.png`,
        logo: `${SITE}/portrait.png`,
        description: t("jsonld.businessDescription"),
        founder: { "@id": `${SITE}/#gabriel` },
        email: "bonjour@gabrielnadon.com",
        priceRange: "$$",
        areaServed: { "@type": "AdministrativeArea", name: "Québec" },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Montréal",
          addressRegion: "QC",
          addressCountry: "CA",
        },
        availableLanguage: ["fr-CA", "en-CA"],
        sameAs: SAME_AS,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t("jsonld.catalog"),
          itemListElement: OFFRES.map(({ key, pathname }) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: t(`jsonld.offers.${key}`),
              url: absUrl(locale, pathname),
              areaServed: "Québec",
            },
          })),
        },
      },
    ],
  };

  const queue = t.raw("sys.queue") as QueueItem[];
  const steps = t.raw("method.steps") as Step[];
  const caps = t.raw("caps.items") as Cap[];
  const proofSteps = t.raw("proof.steps") as ProofStep[];
  const stats = t.raw("proof.stats") as Stat[];
  const svcPath = Object.fromEntries(OFFRES.map((o) => [o.key, o.pathname]));

  return (
    <div id="dc-root">
      <div className="page hm">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
        />

        <Ticker />
        <SiteHeader pathname="/" brandHref="#" navItems={nav} ctaHref="#contact" />

        {/* 1 · HERO — la promesse + ce que « un système » veut dire, montré */}
        <section className="hm-hero">
          <div className="hm-wrap hm-hero-grid">
            <div className="hm-hero-copy">
              <p className="hm-kicker">{t("hero.kicker")}</p>
              <h1 className="hm-h1">{t("hero.title")}</h1>
              <p className="hm-lead">{t("hero.lead")}</p>
              <div className="hm-cta">
                <a href="#contact" className="btn">
                  <span className="cta-full">{t("hero.cta")}</span>
                  <span className="cta-short">{t("hero.ctaShort")}</span>
                  <Arrow />
                </a>
                <a href="#cas" className="btn-link">
                  {t("hero.ctaCase")}
                </a>
              </div>
              <div className="hm-who">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/portrait.webp"
                  width={56}
                  height={56}
                  alt=""
                  className="hm-who-img"
                />
                <p>{t.rich("hero.who", { strong })}</p>
              </div>
            </div>

            {/* Illustration (pas un client réel) — aucun nom de client ni de fournisseur. */}
            <figure className="hm-sys" aria-label={t("sys.aria")}>
              <div className="hm-sys-sources" aria-hidden="true">
                {(t.raw("sys.sources") as string[]).map((s) => (
                  <span key={s} className="hm-src">
                    {s}
                  </span>
                ))}
              </div>
              <svg
                className="hm-sys-flow"
                viewBox="0 0 500 64"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M50 0 C50 38, 250 26, 250 64" pathLength={1} />
                <path d="M150 0 C150 38, 250 26, 250 64" pathLength={1} />
                <path d="M250 0 L250 64" pathLength={1} />
                <path d="M350 0 C350 38, 250 26, 250 64" pathLength={1} />
                <path d="M450 0 C450 38, 250 26, 250 64" pathLength={1} />
              </svg>
              <div className="hm-sys-panel">
                <div className="hm-sys-head">
                  <span className="hm-sys-title">
                    <span className="hm-live" aria-hidden="true"></span>
                    {t("sys.title")}
                  </span>
                  <span className="hm-sys-time">{t("sys.time")}</span>
                </div>
                <ul className="hm-queue">
                  {queue.map((q, i) => (
                    <li
                      key={q.title}
                      className="hm-q"
                      style={{ ["--i" as string]: i }}
                    >
                      <span
                        className={q.done ? "hm-q-icon is-done" : "hm-q-icon is-wait"}
                        aria-hidden="true"
                      >
                        {q.done ? <Check /> : "!"}
                      </span>
                      <span className="hm-q-body">
                        <span className="hm-q-title">{q.title}</span>
                        <span className="hm-q-meta">{q.meta}</span>
                      </span>
                      <span className={q.done ? "hm-q-status is-done" : "hm-q-status is-wait"}>
                        {q.done ? t("sys.done") : t("sys.wait")}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="hm-sys-foot">
                  <span>{t("sys.footDone")}</span>
                  <span className="hm-sys-foot-wait">{t("sys.footWait")}</span>
                </div>
              </div>
              <figcaption className="hm-sys-cap">{t("sys.caption")}</figcaption>
            </figure>
          </div>
        </section>

        {/* 2 · PROBLÈME — faire reconnaître la situation */}
        <section className="hm-section" id="probleme">
          <div className="hm-wrap hm-split">
            <h2 className="hm-h2">{t("pains.title")}</h2>
            <ul className="hm-pains">
              {(t.raw("pains.items") as string[]).map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="hm-wrap">
            <p className="hm-cost">
              <span className="hm-cost-label">{t("pains.costLabel")}</span>
              {t("pains.cost")}
            </p>
          </div>
        </section>

        {/* 3 · MÉTHODE — une vraie séquence */}
        <section className="hm-section hm-band" id="methode">
          <div className="hm-wrap">
            <div className="hm-head">
              <h2 className="hm-h2">{t("method.title")}</h2>
              <p className="hm-sub">{t("method.sub")}</p>
            </div>
            <ol className="hm-steps">
              {steps.map((s, i) => (
                <li key={s.title} className="hm-step">
                  <span className="hm-step-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="hm-step-when">{s.when}</span>
                  <h3 className="hm-h3">{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
            <p className="hm-note">{t("method.note")}</p>
          </div>
        </section>

        {/* 4 · CAPACITÉS — ce que le système peut faire */}
        <section className="hm-section" id="exemples">
          <div className="hm-wrap">
            <div className="hm-head">
              <h2 className="hm-h2 hm-h2-wide">{t("caps.title")}</h2>
              <p className="hm-sub">{t("caps.sub")}</p>
            </div>
            <ul className="hm-caps">
              {caps.map((c) => (
                <li key={c.verb}>
                  <span className="hm-cap-verb">{c.verb}</span>
                  <span className="hm-cap-rest">{c.rest}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5 · SERVICES — hub vers les pages commerciales (une par intention) */}
        <section className="hm-section hm-band" id="services">
          <div className="hm-wrap">
            <div className="hm-head">
              <h2 className="hm-h2">{t("services.title")}</h2>
            </div>
            <ul className="hm-svcs">
              {SERVICES.map((key) => (
                <li key={key} className="hm-svc">
                  <span className="hm-svc-kind">{t(`services.items.${key}.kind`)}</span>
                  <h3 className="hm-svc-title">
                    <a href={href(locale, svcPath[key])}>
                      {t(`services.items.${key}.title`)}
                    </a>
                  </h3>
                  <p className="hm-svc-text">
                    {t.rich(`services.items.${key}.text`, {
                      refonte: (chunks) => (
                        <a
                          href={href(locale, "/refonte-de-systeme")}
                          className="link-inline hm-svc-inner"
                        >
                          {chunks}
                        </a>
                      ),
                    })}
                  </p>
                  <span className="hm-svc-go" aria-hidden="true">
                    <Arrow />
                  </span>
                </li>
              ))}
            </ul>
            <div className="hm-tools">
              <p>{t.rich("services.toolsLead", { strong })}</p>
              <ul className="hm-pills">
                {(t.raw("services.tools") as string[]).map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 6 · CAS CLIENT — la preuve, chiffrée */}
        <section className="hm-proof" id="cas">
          <div className="hm-wrap">
            <div className="hm-proof-top">
              <div>
                <p className="hm-proof-kicker">{t("proof.kicker")}</p>
                <h2 className="hm-proof-fig">
                  <span className="hm-proof-num">{t("proof.num")}</span>
                  <span className="hm-proof-txt">{t("proof.txt")}</span>
                </h2>
                <a
                  href={href(locale, "/cas/synchronisation-prix-fournisseurs")}
                  className="hm-btn-ghost"
                >
                  {t("proof.cta")}
                  <Arrow />
                </a>
              </div>
              <ol className="hm-proof-steps">
                {proofSteps.map((s) => (
                  <li key={s.title}>
                    <span className="hm-proof-step">{s.label}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </li>
                ))}
              </ol>
            </div>
            <dl className="hm-stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.num}</dt>
                  <dd>{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 7 · L'APPROCHE — la personne derrière */}
        <section className="hm-section" id="approche">
          <div className="hm-wrap hm-me">
            <div className="hm-me-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/portrait.webp"
                width={982}
                height={941}
                loading="lazy"
                alt={t("me.photoAlt")}
              />
            </div>
            <div className="hm-me-copy">
              <h2 className="hm-quote">{t("me.quote")}</h2>
              <p className="hm-me-body">{t("me.body")}</p>
              <ul className="hm-principles">
                {(t.raw("me.principles") as string[]).map((_, i) => (
                  <li key={i}>
                    <Check />
                    <span>{t.rich(`me.principles.${i}`, { strong })}</span>
                  </li>
                ))}
              </ul>
              <p className="hm-sign">
                Gabriel Nadon
                <span>{t("me.role")}</span>
              </p>
            </div>
          </div>
        </section>

        {/* 8 · POUR QUI + OUTILS GRATUITS (maillage visible vers la grappe) */}
        <section className="hm-section hm-band hm-section-tight">
          <div className="hm-wrap hm-split hm-for-row">
            <div>
              <h2 className="hm-h3">{t("for.title")}</h2>
              <p className="hm-for">{t("for.text")}</p>
            </div>
            <ul className="hm-pills hm-pills-lg">
              {(t.raw("for.sectors") as string[]).map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="hm-wrap">
            <h2 className="hm-h3 hm-free-head">{t("free.title")}</h2>
            <div className="hm-free">
              {OUTILS.map((o) => (
                <a key={o.key} href={href(locale, o.pathname)} className="hm-free-card">
                  <span className="hm-free-kind">{t(`free.items.${o.key}.kind`)}</span>
                  <span className="hm-free-title">{t(`free.items.${o.key}.title`)}</span>
                  <Arrow />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 9 · CTA FINAL */}
        <section className="hm-section hm-contact" id="contact">
          <div className="hm-wrap hm-contact-grid">
            <div>
              <h2 className="hm-h2">{t("contact.title")}</h2>
              <p className="hm-lead">{t("contact.lead")}</p>
              <ul className="hm-contact-list">
                {(t.raw("contact.points") as string[]).map((p) => (
                  <li key={p}>
                    <Check /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="contact-card hm-form">
              <ContactForm />
            </div>
          </div>
        </section>

        <HomeFooter />
      </div>
    </div>
  );
}
