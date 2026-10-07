// Cloudflare Pages middleware : www.gabrielnadon.com servait le site en 200
// (contenu dupliqué). Redirection 301 vers le domaine canonique.
export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname === "www.gabrielnadon.com") {
    url.hostname = "gabrielnadon.com";
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
