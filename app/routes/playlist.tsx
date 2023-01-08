import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { getPlaylist } from "~/models/spotify.server";

import { getSession } from "~/sessions";

export async function loader({ request }: LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));

	if (!session.has("access_token") || !session.has("playlist_id")) {
		throw redirect("/");
	}

	const accessToken = session.get("access_token");
	const playlistId = session.get("playlist_id");

	const playlist = await getPlaylist(playlistId, accessToken);

	return { playlist };
}

export default function GeneratePage() {
	const { playlist } = useLoaderData<typeof loader>();

	const artists = playlist.tracks.items
		.map((item) => item.track?.artists[0].name)
		.filter((name): name is string => name !== undefined)
		.slice(0, 3)
		.map<React.ReactNode>((name) => (
			<span key={name} className="text-green-500">
				{name.toString()}
			</span>
		))
		.reduce((prev, curr) => [prev, ", ", curr]);

	return (
		<div className="flex items-center justify-center w-full h-full">
			<h1 className="mb-2 text-3xl sm:text-4xl">
				Your playlist with {artists} + others
			</h1>
		</div>
	);
}
