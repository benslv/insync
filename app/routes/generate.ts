import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
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

	console.log("accessToken >>>", accessToken);
	console.log("userId >>>", userId);

	const artistIds = await getFollowingArtistIds(accessToken);

	const artistTopTracks = await Promise.all(
		artistIds.map((id) => getTopTracks(id, accessToken))
	);

	const sortedTopTracks = artistTopTracks.map((artistTracks) =>
		artistTracks.sort((a, b) => b.popularity - a.popularity).slice(0, 1)
	);

	const playlist = await createEmtpyPlaylist(userId, accessToken);

	console.log("playlist >>>", playlist);

	return { topTracks: sortedTopTracks };
}
