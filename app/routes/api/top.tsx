import type { LoaderArgs } from "@remix-run/node";
import { defer } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { SpotifyWebApi } from "@thomasngrlt/spotify-web-api-ts";
import { z } from "zod";

import { getAllFollowedArtists, getTopArtists } from "~/models/api.server";
import { destroySession, getSession } from "~/sessions";
import { tokenHasExpired } from "~/utils/tokenHasExpired";

const timeRangeSchema = z
	.union([z.literal("short"), z.literal("medium"), z.literal("long")])
	.catch("medium");

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

	const url = new URL(request.url);
	const includeTop = z
		.union([z.literal("true"), z.literal("false")])
		.catch("false")
		.parse(url.searchParams.get("includeTop"));

	const followedArtistsPromise = getAllFollowedArtists(spotify).catch(() => []);

	if (includeTop === "false") {
		return defer(
			{
				artistData: followedArtistsPromise,
			},
			{
				headers: {
					"Cache-Control": "max-age=600",
				},
			}
		);
	}

	const timeRange = timeRangeSchema.parse(url.searchParams.get("range"));
	const topArtistsPromise = getTopArtists(spotify, timeRange);

	const artistDataPromise = Promise.all([
		followedArtistsPromise,
		topArtistsPromise,
	]).then(([followed, top]) => {
		const ids = followed.map((artist) => artist.id);

		return [...followed, ...top.filter((artist) => !ids.includes(artist.id))];
	});

	return defer(
		{ artistDataPromise },
		{
			headers: {
				"Cache-Control": "max-age=600",
			},
		}
	);
}
