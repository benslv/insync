import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";

import type { loader as generateLoader } from "./generate";

import { commitSession, getSession } from "~/sessions";
import { getUserProfile } from "~/models/spotify.server";

export async function loader({ request }: LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const redirectUri = new URL(request.url).origin;

	if (session.has("access_token")) {
		const accessToken = session.get("access_token");

		const userProfile = await getUserProfile(accessToken);

		return json({ userProfile, oAuthUrl: null }, 200);
	}

	const url = new URL(request.url);
	const code = url.searchParams.get("code");

	if (!code) {
		const oAuthEndpoint = "https://accounts.spotify.com/authorize";

		const params = new URLSearchParams({
			client_id: process.env.CLIENT_ID || "",
			response_type: "code",
			redirect_uri: redirectUri,
			scope: "user-follow-read playlist-modify-public",
		});

		const oAuthUrl = oAuthEndpoint + "?" + params.toString();

		return json({ userProfile: null, oAuthUrl }, 200);
	}

	const auth = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);

	const data = await fetch("https://accounts.spotify.com/api/token", {
		method: "post",
		headers: new Headers({
			Authorization: `Basic ${auth}`,
			"Content-Type": "application/x-www-form-urlencoded",
		}),
		body: new URLSearchParams({
			grant_type: "authorization_code",
			code,
			redirect_uri: redirectUri,
		}),
	}).then((res) => res.json());

	const accessToken = data.access_token;

	const userProfile = await getUserProfile(accessToken);
	const userId = userProfile.id;

	session.set("access_token", accessToken);
	session.set("user_id", userId);

	throw redirect("/", {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
}

export default function Index() {
	const { userProfile, oAuthUrl } = useLoaderData<typeof loader>();
	const artistFetcher = useFetcher<typeof generateLoader>();

	return (
		<div className="flex flex-col justify-center h-full max-w-md mx-12 space-y-4">
			<div>
				<h1 className="text-5xl mb-4">
					Stay in sync with the music you love
				</h1>
				<p>
					insync creates playlists from your followed artists on
					Spotify. Connect your account for personalised music
					discovery.
				</p>
			</div>

			{!oAuthUrl ? (
				<artistFetcher.Form method="get" action="/generate">
					<button className="bg-green-500 hover:bg-green-400 transition-colors px-4 py-2 rounded-full uppercase text-neutral-800 font-bold text-sm tracking-wide w-max">
						Generate
					</button>
				</artistFetcher.Form>
			) : (
				<a
					href={oAuthUrl}
					className="bg-green-500 hover:bg-green-400 transition-colors px-4 py-2 rounded-full uppercase text-neutral-800 font-bold text-sm tracking-wide w-max"
				>
					Connect to Spotify
				</a>
			)}
			{userProfile ? (
				<div className="flex space-x-2 items-center">
					<ProfileImage userProfile={userProfile} />
					<p className="text-sm">Logged in as {userProfile.id}</p>
				</div>
			) : null}
			{artistFetcher.data ? (
				<p>
					{JSON.stringify(
						artistFetcher.data.topTracks.map((track) => ({
							name: track[0].name,
							id: track[0].id,
							popularity: track[0].popularity,
						}))
					)}
				</p>
			) : null}
		</div>
	);
}

function ProfileImage({
	userProfile,
}: {
	userProfile: SpotifyApi.UserProfileResponse;
}) {
	if (userProfile.images && userProfile.images.length === 0) {
		return (
			<div className="w-4 h-4 flex items-center justify-center rounded-full  border-white border">
				?
			</div>
		);
	}

	return (
		<img
			src={userProfile.images![0].url}
			alt=""
			className="w-4 h-4  rounded-full  border-white border"
			height={16}
			width={16}
		/>
	);
}
