import { redirect } from "@remix-run/node";
import { getSession } from "~/sessions";
import { SpotifyError } from "~/utils/SpotifyError";
import {
	addTracksToPlaylist,
	createEmtpyPlaylist,
	getFollowingArtistIds,
	getTopTracks,
} from "./spotify.server";

export async function generatePlaylist(
	request: Request,
	selection: "popular" | "latest" | "random"
): Promise<{ ok: true; playlistId: string } | { ok: false; message: string }> {
	const session = await getSession(request.headers.get("Cookie"));

	if (!session.has("access_token")) {
		throw redirect("/");
	}

	const accessToken = session.get("access_token");
	const userId = session.get("user_id");

	try {
		const artistIds = await getFollowingArtistIds(accessToken);

		const artistTopTracks = await Promise.all(
			artistIds.map((id) => getTopTracks(id, accessToken))
		);

		const sortedTopTracks = artistTopTracks.map((artistTracks) =>
			artistTracks.sort((a, b) => b.popularity - a.popularity).slice(0, 1)
		);

		const topTrackUris = sortedTopTracks.map((track) => track[0].uri);

		const emtpyPlaylist = await createEmtpyPlaylist(userId, accessToken);

		const snapshotId = await addTracksToPlaylist(
			emtpyPlaylist.id,
			topTrackUris,
			accessToken
		);

		return { ok: true, playlistId: emtpyPlaylist.id };
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
