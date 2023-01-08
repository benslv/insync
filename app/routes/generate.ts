import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
	addTracksToPlaylist,
	createEmtpyPlaylist,
	getFollowingArtistIds,
	getTopTracks,
} from "~/models/spotify.server";

import { getSession } from "~/sessions";

export async function loader({ request }: LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));

	if (!session.has("access_token")) {
		throw redirect("/");
	}

	const accessToken = session.get("access_token");
	const userId = session.get("user_id");

	const artistIds = await getFollowingArtistIds(accessToken);

	const artistTopTracks = await Promise.all(
		artistIds.map((id) => getTopTracks(id, accessToken))
	);

	const sortedTopTracks = artistTopTracks.map((artistTracks) =>
		artistTracks.sort((a, b) => b.popularity - a.popularity).slice(0, 1)
	);

	const topTrackUris = sortedTopTracks.map((track) => track[0].uri);

	const playlist = await createEmtpyPlaylist(userId, accessToken);

	const snapshotId = await addTracksToPlaylist(
		playlist.id,
		topTrackUris,
		accessToken
	);

	return { topTracks: sortedTopTracks };
}
