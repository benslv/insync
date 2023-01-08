import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import Balancer from "react-wrap-balancer";

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

	const {
		id: playlistId,
		name: playlistName,
		owner: { display_name: username },
		images,
	} = playlist;

	const playlistUrl = `https://open.spotify.com/playlist/${playlistId}`;

	const playlistImageUrl =
		images?.[1]?.url || images?.[0].url || "/images/cover.png";

	return (
		<div className="flex items-center justify-center w-full h-full px-4">
			<div className="flex flex-col items-center justify-center max-w-xl gap-y-8">
				<h1 className="mb-2 text-3xl text-center sm:text-5xl">
					<Balancer>Your playlist with {artists} + others</Balancer>
				</h1>
				<div className="flex flex-col items-center px-8 py-8 space-y-4 border rounded-lg bg-neutral-800 border-neutral-700">
					<img
						src={playlistImageUrl}
						alt={`Playlist for ${username}`}
						className="rounded-md w-52 h-52 bg-neutral-400"
						height={208}
						width={208}
					/>
					<div className="text-center">
						<h2 className="text-2xl">
							{playlistName || "insync mixtape"}
						</h2>
						<p className="text-sm text-neutral-300">
							For {username || "you"}
						</p>
					</div>
					<a
						href={playlistUrl}
						target="_blank"
						rel="noreferrer"
						className="px-4 py-2 text-sm font-bold uppercase transition-colors bg-green-500 rounded-full hover:bg-green-400 text-neutral-900 w-max"
					>
						Open
					</a>
				</div>
			</div>
		</div>
	);
}
