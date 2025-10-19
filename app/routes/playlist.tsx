import { SpotifyWebApi } from "@thomasngrlt/spotify-web-api-ts";
import type {
	PlaylistItem,
	Track,
} from "@thomasngrlt/spotify-web-api-ts/types/types/SpotifyObjects";
import { addSeconds } from "date-fns";
import { motion } from "framer-motion";
import React from "react";
import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { BackgroundCircles } from "../components/BackgroundCircles";
import { getSession } from "../sessions";
import { tokenHasExpired } from "../utils/tokenHasExpired";
import type { Route } from "./+types/playlist";

interface PlaylistItemWithTrack extends PlaylistItem {
	track: Track;
}

export async function loader({ request }: LoaderFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const redirectUri = new URL(request.url).origin;
	const url = new URL(request.url);
	const playlistId = url.searchParams.get("id");

	if (!session.has("access_token") || !playlistId) {
		throw redirect("/");
	}

	const spotify = new SpotifyWebApi({
		redirectUri,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
	});

	if (tokenHasExpired(session)) {
		const refreshToken = session.get("refresh_token");
		const { access_token, expires_in } =
			await spotify.getRefreshedAccessToken(refreshToken);

		session.set("access_token", access_token);

		const expiryDate = addSeconds(new Date(), expires_in);
		session.set("expiry_date", expiryDate);
	}

	const accessToken = session.get("access_token");
	spotify.setAccessToken(accessToken);

	try {
		const playlist = await spotify.playlists.getPlaylist(playlistId);
		return { ok: true, playlist };
	} catch (err) {
		return redirect("/");
	}
}

export default function GeneratePage({ loaderData }: Route.ComponentProps) {
	const { playlist } = loaderData;

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
		<div className="h-screen overflow-hidden">
			<div className="relative z-10 flex h-full w-full items-center justify-center px-4">
				<div className="relative z-10 flex max-w-xl flex-col items-center justify-center gap-y-8">
					<motion.h1
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						className="mb-2 text-center text-3xl sm:text-5xl"
					>
						Your playlist with {artists} + others
					</motion.h1>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="flex flex-col items-center space-y-4 rounded-lg border border-neutral-700 bg-neutral-800 px-8 py-8 shadow-md"
					>
						<img
							src={playlistImageUrl}
							alt={`Playlist for ${username}`}
							className="h-52 w-52 bg-neutral-400 shadow-md"
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
							className="w-max rounded-full bg-green-500 px-4 py-2 text-sm font-bold uppercase text-neutral-900 transition-colors hover:bg-green-400"
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
				className="relative top-2/3 z-0 sm:top-1/2"
			>
				<BackgroundCircles />
			</motion.div>
		</div>
	);
}
