// Cloudflare Pages Function — POST /api/contact
// Reçoit la soumission du formulaire conversationnel et l'envoie par courriel
// via Resend (domaine vérifié send.gabrielnadon.com). Secret : RESEND_API_KEY.

const DEST = "bonjour@gabrielnadon.com";
const FROM = "Formulaire du site <formulaire@send.gabrielnadon.com>";
const SUJETS = new Set([
  "Audit d’opérations",
  "Systèmes web sur mesure",
  "Automatisation IA",
  "Sites qui convertissent",
  "Autre sujet",
]);

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
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

  if (!nom || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  const text =
    `Sujet : ${sujet}\n` +
    (detail ? `Contexte : ${detail}\n` : "") +
    `Nom : ${nom}\nCourriel : ${email}\n\n(Formulaire conversationnel — gabrielnadon.com)`;

  const html =
    `<p><strong>Sujet :</strong> ${esc(sujet)}</p>` +
    (detail ? `<p><strong>Contexte :</strong> ${esc(detail)}</p>` : "") +
    `<p><strong>Nom :</strong> ${esc(nom)}<br><strong>Courriel :</strong> ${esc(email)}</p>` +
    `<p style="color:#888">Formulaire conversationnel — gabrielnadon.com</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [DEST],
      reply_to: email,
      subject: `🟢 Nouveau lead — ${sujet} (${email})`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
