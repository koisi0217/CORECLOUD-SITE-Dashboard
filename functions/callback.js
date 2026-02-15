export async function onRequest({ request, env }) {
  const code = new URL(request.url).searchParams.get("code");

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.DISCORD_CLIENT_ID,
      client_secret: env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: env.REDIRECT_URI
    })
  });

  const token = await tokenRes.json();
  const headers = { Authorization: `Bearer ${token.access_token}` };

  const user = await fetch("https://discord.com/api/users/@me", { headers }).then(r=>r.json());
  const guilds = await fetch("https://discord.com/api/users/@me/guilds", { headers }).then(r=>r.json());

  const sessionId = crypto.randomUUID();
  await env.SESSIONS.put(sessionId, JSON.stringify({ user, guilds }), { expirationTtl: 3600 });

  return Response.redirect(`/u/${sessionId}`, 302);
}
