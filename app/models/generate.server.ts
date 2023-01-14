import { redirect } from "@remix-run/node";
import { SpotifyWebApi } from "spotify-web-api-ts";

import { getSession } from "~/sessions";
import { chunk } from "~/utils/chunk";

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
		const artistIds = await spotify.follow.getFollowedArtists({
			limit: 25,
		});

		const allArtistIds = artistIds.items;

		const allArtistTopTracks = await Promise.all(
			allArtistIds.map((artist) =>
				spotify.artists.getArtistTopTracks(artist.id, "GB")
			)
		);

		let after = artistIds.cursors.after;
		let nextArtistIds;
		let nextArtistTopTracks;
		let i = 0;

		if (artistIds.total ?? 0 > artistIds.limit) {
			while (after !== null) {
				console.log(`Running paginated request ${++i}`);
				console.log("Getting followed artists from", after);

				nextArtistIds = await spotify.follow.getFollowedArtists({
					limit: 25,
					after: after,
				});

				console.log("Getting top tracks for artists from", after);
				nextArtistTopTracks = await Promise.all(
					nextArtistIds.items.map((artist) =>
						spotify.artists.getArtistTopTracks(artist.id, "GB")
					)
				);

				allArtistTopTracks.push(...nextArtistTopTracks);
				console.log("allTopTracks length:", allArtistTopTracks.length);

				after = nextArtistIds.cursors.after;
				console.log("after", after);

				await new Promise<void>((resolve) =>
					setTimeout(() => resolve(), 2000)
				);
			}
		}

		console.log("Finished loading top tracks...");

		const sortedTopTracks = allArtistTopTracks.map((artistTracks) =>
			artistTracks.sort((a, b) => b.popularity - a.popularity).slice(0, 1)
		);

		const topTrackUris = sortedTopTracks.map((track) => track[0].uri);
		console.log("topTrackUrls", topTrackUris.length);

		const playlist = await spotify.playlists.createPlaylist(
			userId,
			"insync mixtape"
		);

		for (const part of chunk(topTrackUris, 50)) {
			await spotify.playlists.addItemsToPlaylist(playlist.id, part);
		}

		return { ok: true, playlistId: playlist.id };
	} catch (error: unknown) {
		console.log("THERE WAS AN ERROR BUT WE CAUGHT IT");

		console.error(error);
		console.log(error.status);

		switch (error.status) {
			case "429": {
				return {
					ok: false,
					message:
						"You're making requests too quickly! Try again in a few seconds.",
				};
			}
			default: {
				console.log("Returning the default error message");

				return {
					ok: false,
					message: "An error occurred. Please try again.",
				};
			}
		}
	}
}
