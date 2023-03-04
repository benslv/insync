import type { SpotifyWebApi } from "@thomasngrlt/spotify-web-api-ts/types";
import type {
	Artist,
	Paging,
} from "@thomasngrlt/spotify-web-api-ts/types/types/SpotifyObjects";

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

export async function depage<TReturn, TOptions>(
	fn: (options: TOptions) => Promise<Paging<TReturn>>,
	options: Parameters<typeof fn>[0]
) {
	const chunks = [await fn(options)];

	let next = chunks[0].next;
	let offset = chunks[0].items.length;

	if (chunks[0].total ?? 0 > chunks[0].limit) {
		while (next !== null) {
			const nextChunk = await fn({ ...options, limit: 50, offset });

			chunks.push(nextChunk);
			next = nextChunk.next;
		}
	}

	return chunks.flatMap((chunk) => chunk.items);
}
