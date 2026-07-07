// Cloudflare Pages Function — POST /api/contact
// Reçoit la soumission du formulaire et l'envoie par courriel via Resend
// (domaine vérifié send.gabrielnadon.com). Secret : RESEND_API_KEY.
// 1) Courriel de lead à Gabriel (avec provenance publicitaire + téléphone).
// 2) Auto-réponse au prospect avec le lien Calendly (soft-fail : ne bloque
//    jamais la confirmation si cet envoi échoue).

const DEST = "bonjour@gabrielnadon.com";
const FROM = "Formulaire du site <formulaire@send.gabrielnadon.com>";
const FROM_REPLY = "Gabriel Nadon <formulaire@send.gabrielnadon.com>";
const CAL = "https://calendly.com/bonjour-gabrielnadon/audit-gratuit-20-min";
const SUJETS = new Set([
  "Audit d’opérations",
  "Systèmes web sur mesure",
  "Automatisation IA",
  "Refonte d’un système existant",
  "Sites qui convertissent",
  "Autre sujet",
]);
// Clés d'attribution acceptées telles quelles depuis le client.
const ATTR_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "msclkid",
  "landing",
  "referrer",
  "premier_contact",
];

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function cleanAttribution(raw) {
  if (!raw || typeof raw !== "object") return null;
  const out = {};
  for (const k of ATTR_KEYS) {
    if (typeof raw[k] === "string" && raw[k]) out[k] = raw[k].slice(0, 300);
  }
  return Object.keys(out).length ? out : null;
}

async function sendResend(env, payload) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot : un humain ne remplit jamais ce champ.
  if (data.website) return Response.json({ ok: true });

  const sujet = SUJETS.has(data.sujet) ? data.sujet : "Autre sujet";
  const nom = String(data.nom || "").trim().slice(0, 120);
  const email = String(data.email || "").trim().slice(0, 200);
  const detail = String(data.detail || "").trim().slice(0, 2000);
  const tel = String(data.tel || "").trim().slice(0, 40);
  const page = String(data.page || "").trim().slice(0, 200);
  const attribution = cleanAttribution(data.attribution);

  if (!nom || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  const attrLines = attribution
    ? Object.entries(attribution).map(([k, v]) => `${k} : ${v}`)
    : [];

  const text =
    `Sujet : ${sujet}\n` +
    (detail ? `Contexte : ${detail}\n` : "") +
    `Nom : ${nom}\nCourriel : ${email}\n` +
    (tel ? `Téléphone : ${tel}\n` : "") +
    (page ? `Page : ${page}\n` : "") +
    (attrLines.length ? `\n— Provenance —\n${attrLines.join("\n")}\n` : "") +
    `\n(Formulaire — gabrielnadon.com)`;

  const html =
    `<p><strong>Sujet :</strong> ${esc(sujet)}</p>` +
    (detail ? `<p><strong>Contexte :</strong> ${esc(detail)}</p>` : "") +
    `<p><strong>Nom :</strong> ${esc(nom)}<br><strong>Courriel :</strong> ${esc(email)}` +
    (tel ? `<br><strong>Téléphone :</strong> ${esc(tel)}` : "") +
    (page ? `<br><strong>Page :</strong> ${esc(page)}` : "") +
    `</p>` +
    (attrLines.length
      ? `<p style="color:#555;font-size:13px"><strong>Provenance</strong><br>${attrLines
          .map((l) => esc(l))
          .join("<br>")}</p>`
      : "") +
    `<p style="color:#888">Formulaire — gabrielnadon.com</p>`;

  const res = await sendResend(env, {
    from: FROM,
    to: [DEST],
    reply_to: email,
    subject: `🟢 Nouveau lead — ${sujet} (${email})`,
    text,
    html,
  });

  if (!res.ok) {
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  // Auto-réponse au prospect : confirme la réception et pousse vers Calendly
  // pendant que l'intérêt est chaud. Toute erreur ici est ignorée.
  const prenom = nom.split(" ")[0];
  try {
    await sendResend(env, {
      from: FROM_REPLY,
      to: [email],
      reply_to: DEST,
      subject: "Bien reçu — je vous réponds sous 24 h",
      text:
        `Bonjour ${prenom},\n\n` +
        `Votre demande (« ${sujet} ») est bien reçue. Je la lis moi-même et je vous réponds d'ici 24 h.\n\n` +
        `Si vous voulez aller plus vite : réservez directement vos 20 minutes de diagnostic (gratuit, sans obligation) :\n${CAL}\n\n` +
        `Vous repartez de l'appel avec les gestes à poser en premier et une idée honnête de l'effort — que l'on travaille ensemble ou non.\n\n` +
        `Gabriel Nadon\nConseiller · Systèmes & IA — gabrielnadon.com\nbonjour@gabrielnadon.com`,
      html:
        `<p>Bonjour ${esc(prenom)},</p>` +
        `<p>Votre demande (« ${esc(sujet)} ») est bien reçue. Je la lis moi-même et je vous réponds d'ici 24&nbsp;h.</p>` +
        `<p>Si vous voulez aller plus vite&nbsp;: <a href="${CAL}">réservez directement vos 20&nbsp;minutes de diagnostic</a> (gratuit, sans obligation).</p>` +
        `<p>Vous repartez de l'appel avec les gestes à poser en premier et une idée honnête de l'effort — que l'on travaille ensemble ou non.</p>` +
        `<p>Gabriel Nadon<br>Conseiller · Systèmes &amp; IA — <a href="https://gabrielnadon.com/">gabrielnadon.com</a><br>bonjour@gabrielnadon.com</p>`,
    });
  } catch {
    /* l'auto-réponse ne doit jamais faire échouer la soumission */
  }

  return Response.json({ ok: true });
}
