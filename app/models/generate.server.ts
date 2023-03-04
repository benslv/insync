import { redirect } from "@remix-run/node";
import { SpotifyWebApi } from "@thomasngrlt/spotify-web-api-ts";
import type { Track } from "@thomasngrlt/spotify-web-api-ts/types/types/SpotifyObjects";
import { differenceInDays, parse } from "date-fns";

import { getSession } from "~/sessions";
import { chunk } from "~/utils/chunk";

type GenerateOptions = {
	selection: "popular" | "latest" | "random";
	title: string;
};

export async function generatePlaylist(
	request: Request,
	{ selection, title }: GenerateOptions
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

		if (allArtistIds.length === 0) {
			return {
				ok: false,
				message: "You need to follow at least 1 artist.",
			};
		}

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

			console.log(topTrackChunk[0].length);

			artistTopTracks.push(
				...topTrackChunk.filter((arr): arr is Track[] => arr.length !== 0)
			);
		}

		console.log("Finished loading top tracks...");

		let selectedTopTracks;

		switch (selection) {
			case "popular": {
				selectedTopTracks = artistTopTracks.map((artistTracks) =>
					artistTracks.sort(sortByMostPopular)
				);
				break;
			}
			case "latest": {
				selectedTopTracks = artistTopTracks.map((artistTracks) =>
					artistTracks.sort(sortByLatest)
				);
				break;
			}
			default: {
				selectedTopTracks = artistTopTracks;
			}
		}

		const trackUris = selectedTopTracks.map((track) =>
			selection === "random" ? pickRandomValue(track).uri : track[0].uri
		);
		console.log("trackUrls", trackUris.length);

		console.log("Creating playlist with title", title);

		const playlist = await spotify.playlists.createPlaylist(userId, title, {
			description: `A mix of ${selection} tracks from my followed artists! Generated with insync.rocks`,
		});

		console.log("Adding tracks to playlist...");
		for (const part of chunk(trackUris, 50)) {
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

function sortByMostPopular(a: Track, b: Track) {
	return b.popularity - a.popularity;
}

function sortByLatest(a: Track, b: Track) {
	const aDate = parseDate(a.album.release_date, a.album.release_date_precision);
	const bDate = parseDate(b.album.release_date, b.album.release_date_precision);

	return differenceInDays(bDate, aDate);
}

function parseDate(dateString: string, precision: "year" | "month" | "day") {
	switch (precision) {
		case "year": {
			return parse(dateString, "yyyy", new Date());
		}
		case "month": {
			return parse(dateString, "yyyy-MM", new Date());
		}
		case "day": {
			return parse(dateString, "yyyy-MM-dd", new Date());
		}
	}
}

function pickRandomValue<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}
