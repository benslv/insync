import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { SpotifyWebApi } from "@thomasngrlt/spotify-web-api-ts";
import { depage } from "~/models/api.server";

import { destroySession, getSession } from "~/sessions";
import { tokenHasExpired } from "~/utils/tokenHasExpired";

export async function loader({ request }: LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const redirectUri = new URL(request.url).origin;

	if (!session.has("access_token") || !session.has("user_id")) {
		throw redirect("/", {
			headers: { "Set-Cookie": await destroySession(session) },
		});
	}

	if (tokenHasExpired(session)) {
		return json({ ok: false, data: "Access Token has expired." });
	}

	const accessToken = session.get("access_token");

	const spotify = new SpotifyWebApi({
		redirectUri,
		accessToken,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
	});

	const topArtists = await depage(
		spotify.personalization.getMyTopArtists.bind(spotify),
		{
			limit: 50,
			time_range: "short_term",
		}
	);

	return json({ ok: true, data: topArtists });
}
