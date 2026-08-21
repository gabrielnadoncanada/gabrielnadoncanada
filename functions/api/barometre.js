// Cloudflare Pages Function — POST /api/barometre
// Reçoit une réponse au sondage du Baromètre IA & automatisation des PME du
// Québec et l'envoie par courriel via Resend (même mécanique que /api/contact).
// Secret : RESEND_API_KEY (déjà posé sur le projet Pages).

const DEST = "bonjour@gabrielnadon.com";
const FROM = "Baromètre PME <formulaire@send.gabrielnadon.com>";

// Champs acceptés : libellé lisible → clé du payload. Tout le reste est ignoré.
const CHAMPS = [
  ["Secteur", "secteur"],
  ["Employés", "employes"],
  ["Région", "region"],
  ["Où vivent les données", "donnees"],
  ["Heures manuelles/sem", "heures"],
  ["Usage IA générative", "ia_usage"],
  ["Qui l’utilise", "ia_qui"],
  ["Automatisation 12 derniers mois", "automatisation"],
  ["Principal obstacle", "obstacle"],
  ["Budget 12 prochains mois", "budget"],
  ["Pénurie de main-d’œuvre → automatisation", "penurie"],
  ["Loi 25", "loi25"],
  ["Commentaire", "commentaire"],
];

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

  const lignes = [];
  for (const [label, key] of CHAMPS) {
    const v = String(data[key] || "").trim().slice(0, 500);
    if (v) lignes.push([label, v]);
  }
  // Une réponse vide n'est pas une réponse.
  if (lignes.length < 3) {
    return Response.json({ ok: false, error: "empty" }, { status: 400 });
  }

  const email = String(data.email || "").trim().slice(0, 200);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (email) lignes.push(["Courriel (veut les résultats)", email]);

  const secteur = String(data.secteur || "?").slice(0, 80);
  const text =
    lignes.map(([l, v]) => `${l} : ${v}`).join("\n") +
    `\n\n(Baromètre — gabrielnadon.com/barometre/)`;
  const html =
    lignes
      .map(([l, v]) => `<p><strong>${esc(l)} :</strong> ${esc(v)}</p>`)
      .join("") +
    `<p style="color:#888">Baromètre — gabrielnadon.com/barometre/</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [DEST],
      ...(email ? { reply_to: email } : {}),
      subject: `📊 Baromètre — nouvelle réponse (${secteur})`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
