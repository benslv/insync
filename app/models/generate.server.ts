import { redirect } from "@remix-run/node";
import { getSession } from "~/sessions";
import {
	getFollowingArtistIds,
	getTopTracks,
	createEmtpyPlaylist,
	addTracksToPlaylist,
} from "./spotify.server";

export async function generatePlaylist(request: Request) {
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

	const emtpyPlaylist = await createEmtpyPlaylist(userId, accessToken);

	const snapshotId = await addTracksToPlaylist(
		emtpyPlaylist.id,
		topTrackUris,
		accessToken
	);

	return emtpyPlaylist.id;
}
