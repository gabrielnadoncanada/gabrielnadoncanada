import type { Metadata } from "next";
import { ServicePage } from "@/components/ServicePage";

const URL = "https://gabrielnadon.com/en/ai-consultant/";
const TITLE = "AI Consultant for Small Businesses in Montreal & Quebec";
const DESC =
  "Independent AI consultant in Montreal: I find where AI actually removes work in your SMB — invoices, emails, quotes, follow-ups — and implement it in the tools you already use. Free 20-minute review.";

export const metadata: Metadata = {
  title: `${TITLE} | Gabriel Nadon`,
  description: DESC,
  alternates: {
    canonical: URL,
    languages: {
      "fr-CA": "https://gabrielnadon.com/consultant-ia/",
      "en-CA": URL,
      "x-default": "https://gabrielnadon.com/consultant-ia/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Gabriel Nadon",
    title: TITLE,
    description: DESC,
    url: URL,
    locale: "en_CA",
    images: [
      {
        url: "https://gabrielnadon.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gabriel Nadon — AI consultant for Quebec small businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["https://gabrielnadon.com/og-image.png"],
  },
};

export default function AIConsultantPage() {
  return (
    <ServicePage
      lang="en"
      path="/en/ai-consultant/"
      breadcrumb="AI consultant"
      service={{
        name: "AI consultant for small and mid-sized businesses",
        type: "AI consulting and implementation",
        description:
          "Process review for Quebec small and mid-sized businesses, selection of the tasks where AI pays off, and implementation in existing tools: document and invoice processing, AI agents, workflow automation and custom internal software.",
      }}
      eyebrow="AI consultant · Montreal & Quebec"
      title={
        <>
          AI that removes real work from your operations —{" "}
          <span className="italic">not another demo.</span>
        </>
      }
      lead={
        <>
          You know AI could help. What’s missing is knowing where, with which
          data, and who will set it up so it actually lasts. I’m an independent
          AI consultant based in Montreal: I look at how your business really
          runs, find the two or three tasks where AI pays off, and implement
          them — connected to the tools you already use, with a human in the
          loop.
        </>
      }
      box={{
        kicker: "Where AI pays off first in an SMB",
        items: [
          "Reading invoices, purchase orders and supplier price lists — and keying them in for you.",
          "Sorting incoming email requests and drafting the reply or the customer record.",
          "Building a first-draft quote or report from your own data.",
          "Finding information across a project’s documents in seconds.",
        ],
      }}
      pains={{
        eyebrow: "Sound familiar?",
        title: "Everyone talks about AI. In your operations, nothing has changed yet.",
        intro:
          "It’s not a lack of will. Between a ChatGPT subscription and a process that runs on its own, there is a missing step: connecting AI to your data and to the way you actually work.",
        items: [
          "A few employees use ChatGPT on their own, but day-to-day operations haven’t moved.",
          "Every vendor pitches their platform “with AI” without ever looking at how you work.",
          "Your data lives in Excel, inboxes and software that doesn’t talk to anything else.",
          "You’re wary of putting customer data into an AI tool because of Quebec’s Law 25.",
          "Nobody in-house has time to run one more project.",
        ],
      }}
      approach={{
        eyebrow: "How I work",
        quote:
          "AI isn’t the project. The project is the costly task — AI is one of the tools to remove it.",
        body: (
          <p>
            <span className="dropcap">I</span> start with your operations, not
            with technology: where time goes, what it costs, what data already
            exists. Only then do we pick the tool — sometimes an AI model,
            sometimes a plain automation, sometimes a small internal app. You
            deal directly with the person who analyses and builds: no account
            managers, no jargon. I work in English and French.
          </p>
        ),
        principles: [
          {
            title: "Priced before it’s built",
            text: "Every use case starts with simple math: hours per week × people × hourly rate. No number, no project.",
          },
          {
            title: "Your data stays governed",
            text: "Sensitive data doesn’t go into consumer AI tools without safeguards; hosting, access and settings follow your obligations.",
          },
          {
            title: "A human approves",
            text: "AI prepares, summarises and proposes. Decisions that commit the business stay with your people.",
          },
        ],
      }}
      steps={{
        eyebrow: "How it works, in five steps",
        items: [
          {
            title: "Free 20-minute review",
            text: "You tell me where your team loses the most time; I tell you whether AI is the right answer — or not.",
          },
          {
            title: "Map and prioritise",
            text: "We list the repetitive tasks, put a dollar figure on each, and pick the one with the best return for the least effort.",
          },
          {
            title: "Prototype on your real files",
            text: "No generic demo: the first test runs on your invoices, your emails, your exports. You see right away whether it holds up.",
          },
          {
            title: "Implement in your tools",
            text: "The system plugs into what you already use — Outlook, Excel, QuickBooks, your ERP — depending on available access.",
          },
          {
            title: "Measure, then next use case",
            text: "We compare time before and after. Once the first case pays off, we move to the next one at your pace.",
          },
        ],
      }}
      extra={
        <section className="section-tight">
          <div className="mandats-head">
            <h2 className="h2-left">What I implement.</h2>
            <span className="eyebrow">Services</span>
          </div>
          <div className="case-steps">
            <div className="case-step">
              <div className="mandat-code">
                <span>AI AGENTS</span>
              </div>
              <h3 className="mandat-title">
                <span>AI agents for business</span>
              </h3>
              <p className="mandat-text">
                An agent reads a request, checks your data and prepares the
                action — reply, quote, data entry — for approval.
              </p>
            </div>
            <div className="case-step">
              <div className="mandat-code">
                <span>DOCUMENTS</span>
              </div>
              <h3 className="mandat-title">
                <span>Invoice and document processing</span>
              </h3>
              <p className="mandat-text">
                Invoices, purchase orders, price lists: read, checked and keyed
                in automatically; exceptions go to a person.
              </p>
            </div>
            <div className="case-step">
              <div className="mandat-code">
                <span>AUTOMATION</span>
              </div>
              <h3 className="mandat-title">
                <span>Business process automation</span>
              </h3>
              <p className="mandat-text">
                The copy-paste between apps, weekly reports and follow-ups —
                done by the machine, with Make, n8n, Power Automate or code.
              </p>
            </div>
            <div className="case-step">
              <div className="mandat-code">
                <span>SYSTEMS</span>
              </div>
              <h3 className="mandat-title">
                <span>Custom internal software</span>
              </h3>
              <p className="mandat-text">
                When a spreadsheet has become your management system: a real
                internal tool, built in increments.
              </p>
            </div>
          </div>
        </section>
      }
      proof={{
        label: "Real results",
        body: (
          <>
            <span className="serif-muted">
              An independent grocery store in Quebec was re-typing its
              suppliers’ prices by hand — close to $56,000 a year in staff time.
              The system now reads every supplier’s price list, compares about
              37,000 prices each cycle and prepares the point-of-sale update,
              which the team approves. I also run my own AI agents: my
              prospecting system finds companies, analyses their website and
              drafts a personalised first email — nothing goes out without my
              approval.{" "}
            </span>
            <a href="/cas/synchronisation-prix-fournisseurs/" className="link-serif" hrefLang="fr">
              Full case study (in French) →
            </a>
          </>
        ),
      }}
      price={{
        label: "Pricing",
        body: (
          <span className="serif-muted">
            Review: 20 minutes, free. First implementation sprint: from
            CA$4,500, fixed scope, 2 to 3 weeks — one task removed, not a
            subscription. Quebec programs such as Investissement Québec’s ESSOR
            or PME MTL can reimburse part of the fees for eligible businesses.
          </span>
        ),
      }}
      faq={{
        eyebrow: "Questions I often get",
        items: [
          {
            q: "How much does an AI consultant cost in Quebec?",
            a: "Published Canadian rates for AI and automation consulting range from roughly $150 to $350 an hour, but most projects are sold at a fixed price. With me: a free 20-minute review, then fixed-scope sprints from CA$4,500.",
          },
          {
            q: "Do we need to replace our software to use AI?",
            a: "In most cases, no. AI connects to your current tools through their APIs, exports or email. We only replace what is genuinely in the way.",
          },
          {
            q: "Is our data safe under Law 25?",
            a: "We decide together which data the AI can see, where it is processed and who has access. Personal information doesn’t go into consumer tools without safeguards, and every access is documented.",
          },
          {
            q: "How is this different from an AI agency?",
            a: "You work directly with the person who analyses your operations and builds the system. No sales layer, no subcontracting, no imposed platform.",
          },
          {
            q: "Do you work in English?",
            a: "Yes. I work in English and French, from Montreal and remotely across Quebec.",
          },
        ],
      }}
      cta={{
        eyebrow: "Free review",
        title: (
          <>
            Twenty minutes to find where AI{" "}
            <span className="italic">would save your team time.</span>
          </>
        ),
        lead: "Describe the task that costs you the most hours. I’ll reply within 24 hours with an honest first take — whether or not we end up working together.",
        sujet: "Projet d’IA ou d’agent IA",
      }}
      related={{
        label: "More (in French)",
        links: [
          { href: "/consultant-ia/", label: "Version française" },
          { href: "/agents-ia/", label: "Agents IA" },
          { href: "/traitement-documents-ia/", label: "Traitement de documents" },
          { href: "/logiciel-sur-mesure/", label: "Logiciel sur mesure" },
        ],
      }}
    />
  );
}
