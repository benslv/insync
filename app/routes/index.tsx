import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import Balancer from "react-wrap-balancer";

import { z } from "zod";
import { generatePlaylist } from "~/models/generate.server";
import { getUserProfile } from "~/models/spotify.server";
import { commitSession, destroySession, getSession } from "~/sessions";

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

export async function action({ request }: ActionArgs) {
	const formData = await request.formData();
	const intent = z.string().parse(formData.get("_intent"));

	const session = await getSession(request.headers.get("Cookie"));

	switch (intent) {
		case "logout": {
			throw redirect("/", {
				headers: {
					"Set-Cookie": await destroySession(session),
				},
			});
		}
		case "generate": {
			const playlistId = await generatePlaylist(request);

			session.set("playlist_id", playlistId);

			throw redirect("/playlist", {
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			});
		}
		default: {
			return { error: true, message: "Unhandled form intent: ", intent };
		}
	}
}

export default function Index() {
	const { userProfile, oAuthUrl } = useLoaderData<typeof loader>();

	return (
		<div className="flex h-full max-h-full">
			<div className="flex flex-col items-center justify-center w-full h-full mx-8 space-y-4 text-center sm:items-start sm:max-w-md sm:text-left md:mx-32">
				<div>
					<h1 className="mb-2 text-3xl sm:text-5xl">
						<Balancer>
							Stay in sync with the music you love
						</Balancer>
					</h1>
					<p>
						<Balancer>
							insync creates playlists from your followed artists
							on Spotify. Connect your account for personalised
							music discovery.
						</Balancer>
					</p>
				</div>

				{!oAuthUrl ? (
					<Form method="post">
						<button
							type="submit"
							name="_intent"
							value="generate"
							className="px-4 py-2 text-sm font-bold uppercase transition-colors bg-green-500 rounded-full hover:bg-green-400 text-neutral-900 w-max"
						>
							Generate
						</button>
					</Form>
				) : (
					<a
						href={oAuthUrl}
						className="px-4 py-2 text-sm font-bold uppercase transition-colors bg-green-500 rounded-full hover:bg-green-400 text-neutral-900 w-max"
					>
						Connect to Spotify
					</a>
				)}
				{userProfile ? (
					<>
						<div className="flex items-center justify-center space-x-2 sm:justify-start">
							<ProfileImage userProfile={userProfile} />
							<p className="text-sm">
								Logged in as {userProfile.id}
							</p>
						</div>
						<Form method="post">
							<button
								type="submit"
								name="_intent"
								value="logout"
								className="text-sm underline"
							>
								Logout
							</button>
						</Form>
					</>
				) : null}
			</div>
			<div className="relative hidden w-full h-full overflow-hidden sm:block">
				<BackgroundCircles />
			</div>
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
			<div className="flex items-center justify-center w-4 h-4 border border-white rounded-full">
				?
			</div>
		);
	}

	return (
		<img
			src={userProfile.images![0].url}
			alt=""
			className="w-4 h-4 border border-white rounded-full"
			height={16}
			width={16}
		/>
	);
}

function BackgroundCircles() {
	return (
		<div className="absolute top-1/2 -translate-y-1/2 left-1/4 flex items-center justify-center w-[1527px] border-2 border-green-500 rounded-full h-[1527px]">
			<div className="relative flex items-center justify-center w-[1221px] border-2 border-green-500 rounded-full h-[1221px]">
				<div className="relative flex items-center justify-center w-[917px] border-2 border-green-500 rounded-full h-[917px]">
					<div className="w-[611px] border-2 border-green-500 rounded-full h-[611px]"></div>
				</div>
			</div>
		</div>
	);
}
