import type { SpotifyWebApi } from "@thomasngrlt/spotify-web-api-ts/types";
import type { Artist } from "@thomasngrlt/spotify-web-api-ts/types/types/SpotifyObjects";

export async function getAllFollowedArtists(
	spotify: SpotifyWebApi
): Promise<Artist[]> {
	const artistChunks = [
		await spotify.follow.getFollowedArtists({
			limit: 50,
		}),
	];

	let after = artistChunks[0].cursors.after;

	if (artistChunks[0].total ?? 0 > artistChunks[0].limit) {
		while (after !== null) {
			const artistChunk = await spotify.follow.getFollowedArtists({
				limit: 50,
				after,
			});

			artistChunks.push(artistChunk);
			after = artistChunk.cursors.after;
		}
	}

	const allArtists = artistChunks.flatMap((chunk) => chunk.items);

	return allArtists;
}
