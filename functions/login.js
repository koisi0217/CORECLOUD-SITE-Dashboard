export async function onRequest({ env }) {
  const url =
    "https://discord.com/api/oauth2/authorize" +
    "?client_id=" + env.DISCORD_CLIENT_ID +
    "&redirect_uri=https://dash.corecloud.tokyo/callback" +
    "&response_type=code" +
    "&scope=identify guilds";

  return Response.redirect(url, 302);
}
