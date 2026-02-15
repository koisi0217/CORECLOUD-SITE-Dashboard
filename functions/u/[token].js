export async function onRequest({ request, env, params }) {
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(/session=([^;]+)/);

  if (!match) {
    return Response.redirect("/login.html", 302);
  }

  const token = match[1];
  const exists = await env.SESSIONS.get(token);

  if (!exists) {
    return Response.redirect("/login.html", 302);
  }

  return await fetch(new URL("/dashboard.html", request.url));
}
