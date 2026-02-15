export async function onRequest({ env }) {
  const params = new URLSearchParams({
    client_id: env.DISCORD_CLIENT_ID,
    redirect_uri: env.REDIRECT_URI,
    response_type: "code",
    scope: "identify guilds"
  });
  return Response.redirect(
    "https://discord.com/oauth2/authorize?" + params,
    302
  );
}
