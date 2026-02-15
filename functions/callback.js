export async function onRequest({ request, env }) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      client_id: env.DISCORD_CLIENT_ID,
      client_secret: env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: "https://dash.corecloud.tokyo/callback"
    })
  });

  const token = await tokenRes.json();

  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: "Bearer " + token.access_token
    }
  });

  const user = await userRes.json();

  const session = crypto.randomUUID();
  await env.SESSIONS.put(session, JSON.stringify(user));

  return new Response(null, {
    status: 302,
    headers: {
      "Set-Cookie": `session=${session}; Path=/; HttpOnly`,
      "Location": "/u/" + session
    }
  });
}
