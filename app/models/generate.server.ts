import { redirect } from "@remix-run/node";
import { SpotifyWebApi } from "spotify-web-api-ts";

import { getSession } from "~/sessions";
import { SpotifyError } from "~/utils/SpotifyError";

export async function generatePlaylist(
	request: Request,
	selection: "popular" | "latest" | "random"
): Promise<{ ok: true; playlistId: string } | { ok: false; message: string }> {
	const session = await getSession(request.headers.get("Cookie"));
	const redirectUri = new URL(request.url).origin;

	if (!session.has("access_token")) {
		throw redirect("/");
	}

	const spotify = new SpotifyWebApi({
		redirectUri,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
	});

	const accessToken = session.get("access_token");
	const userId = session.get("user_id");

	spotify.setAccessToken(accessToken);

	try {
		const artistIds = await spotify.follow.getFollowedArtists();

		const artistTopTracks = await Promise.all(
			artistIds.items.map((artist) =>
				spotify.artists.getArtistTopTracks(artist.id, "GB")
			)
		);

		const sortedTopTracks = artistTopTracks.map((artistTracks) =>
			artistTracks.sort((a, b) => b.popularity - a.popularity).slice(0, 1)
		);

		const topTrackUris = sortedTopTracks.map((track) => track[0].uri);

		const playlist = await spotify.playlists.createPlaylist(
			userId,
			"insync mixtape"
		);

		const snapshotId = await spotify.playlists.addItemsToPlaylist(
			playlist.id,
			topTrackUris
		);

		return { ok: true, playlistId: playlist.id };
	} catch (err: unknown) {
		const error = SpotifyError.parse(err);

		switch (error.status) {
			case 429: {
				return {
					ok: false,
					message:
						"You're making requests too quickly! Try again in a few seconds.",
				};
			}
			default: {
				return {
					ok: false,
					message: "An error occurred. Please try again.",
				};
			}
		}
	}
}
