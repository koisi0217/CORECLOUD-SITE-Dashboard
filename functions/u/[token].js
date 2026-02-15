export async function onRequest({ params, env }) {
  const session = await env.SESSIONS.get(params.token);

  if (!session) {
    return Response.redirect("/login.html", 302);
  }

  return fetch("https://corecloud.tokyo/dashboard.html");
}
