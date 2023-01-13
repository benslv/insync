import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import React from "react";
import Balancer from "react-wrap-balancer";
import { SpotifyWebApi } from "spotify-web-api-ts";
import type {
	PlaylistItem,
	Track,
} from "spotify-web-api-ts/esm/types/SpotifyObjects";

import { BackgroundCircles } from "~/components/BackgroundCircles";
import { getSession } from "~/sessions";

interface PlaylistItemWithTrack extends PlaylistItem {
	track: Track;
}

export async function loader({ request }: LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const redirectUri = new URL(request.url).origin;

	if (!session.has("access_token") || !session.has("playlist_id")) {
		throw redirect("/");
	}

	const spotify = new SpotifyWebApi({
		redirectUri,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
	});

	const accessToken = session.get("access_token");

	spotify.setAccessToken(accessToken);

	const playlistId = session.get("playlist_id");

	const playlist = await spotify.playlists.getPlaylist(playlistId);

	return json({ playlist });
}

export default function GeneratePage() {
	const { playlist } = useLoaderData<typeof loader>();

	const artists = playlist.tracks.items
		.filter(
			(item): item is PlaylistItemWithTrack => item.track.type === "track"
		)
		.map((item) => item.track.artists[0].name)
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
		<div className="h-full overflow-hidden">
			<div className="relative z-10 flex items-center justify-center w-full h-full px-4">
				<div className="relative z-10 flex flex-col items-center justify-center max-w-xl gap-y-8">
					<motion.h1
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						className="mb-2 text-3xl text-center sm:text-5xl"
					>
						<Balancer>
							Your playlist with {artists} + others
						</Balancer>
					</motion.h1>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="flex flex-col items-center px-8 py-8 space-y-4 border rounded-lg shadow-md bg-neutral-800 border-neutral-700"
					>
						<img
							src={playlistImageUrl}
							alt={`Playlist for ${username}`}
							className="shadow-md w-52 h-52 bg-neutral-400"
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
					</motion.div>
				</div>
			</div>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, duration: 2 }}
				className="relative z-0 top-2/3 sm:top-1/2"
			>
				<BackgroundCircles />
			</motion.div>
		</div>
	);
}
