import { redirect } from "@remix-run/node";
import { SpotifyWebApi } from "spotify-web-api-ts";
import type { Track } from "spotify-web-api-ts/types/types/SpotifyObjects";

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
		console.log("Getting first chunk of artist IDs");

		const artistIdChunks = [
			await spotify.follow.getFollowedArtists({
				limit: 50,
			}),
		];

		console.log("Starting pagination of artist fetching");

		let after = artistIdChunks[0].cursors.after;
		let i = 0;
		if (artistIdChunks[0].total ?? 0 > artistIdChunks[0].limit) {
			while (after !== null) {
				console.log(`Fetching artist page ${++i}`);
				const artistIdChunk = await spotify.follow.getFollowedArtists({
					limit: 50,
					after,
				});

				artistIdChunks.push(artistIdChunk);

				after = artistIdChunk.cursors.after;
			}
		}

		const allArtistIds = artistIdChunks.flatMap((chunk) => chunk.items);

		const artistTopTracks: Track[][] = [];

		console.log("Starting chunked top-track search");
		i = 0;
		for (const partition of chunk(allArtistIds, 10)) {
			console.log(`Fetching track chunk ${++i}`);
			const topTrackChunk = await Promise.all(
				partition.map((artist) => {
					console.log(`Fetching top tracks for ${artist.name}`);

					return spotify.artists
						.getArtistTopTracks(artist.id, "GB")
						.catch(() => {
							console.log(`Hit rate limit for ${artist.name}`);
							return [];
						});
				})
			);

			console.log(topTrackChunk);

			artistTopTracks.push(
				...topTrackChunk.filter(
					(arr): arr is Track[] => arr.length !== 0
				)
			);
		}

		console.log("Finished loading top tracks...");

		const sortedTopTracks = artistTopTracks.map((artistTracks) =>
			artistTracks.sort((a, b) => b.popularity - a.popularity).slice(0, 1)
		);

		const topTrackUris = sortedTopTracks.map((track) => track[0].uri);
		console.log("topTrackUrls", topTrackUris.length);

		console.log("Creating playlist...");

		const playlist = await spotify.playlists.createPlaylist(
			userId,
			"insync mixtape"
		);

		console.log("Adding tracks to playlist...");
		for (const part of chunk(topTrackUris, 50)) {
			await spotify.playlists.addItemsToPlaylist(playlist.id, part);
		}

		return { ok: true, playlistId: playlist.id };
	} catch (error: unknown) {
		console.error(error);

		return {
			ok: false,
			message: "An error occurred. Please try again in a minute.",
		};
	}
}
