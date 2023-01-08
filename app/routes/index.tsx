import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";

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
			const [playlistId] = await Promise.all([
				generatePlaylist(request),
				delay(2000),
			]);

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
	const transition = useTransition();

	const isGenerating = transition.state === "submitting";

	const generateButtonText =
		transition.state === "submitting"
			? "Generating..."
			: transition.state === "loading"
			? "Loading..."
			: "Generate";

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
					<div className="flex items-center gap-x-2">
						<Form method="post">
							<button
								type="submit"
								name="_intent"
								value="generate"
								className="px-4 py-2 text-sm font-bold uppercase transition-colors bg-green-500 rounded-full hover:bg-green-400 text-neutral-900 w-max"
							>
								{generateButtonText}
							</button>
						</Form>
						{isGenerating ? (
							<motion.div
								initial={{ x: -50, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
							>
								<Spinner />
							</motion.div>
						) : null}
					</div>
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

function Spinner() {
	return (
		<motion.svg
			fill="#ffffff"
			width="32px"
			height="32px"
			viewBox="0 0 32 32"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			animate={{ rotate: 360 }}
			transition={{
				repeat: Infinity,
				bounce: 0,
				ease: "linear",
				duration: 0.75,
			}}
		>
			<title>spinner-one-third</title>
			<path d="M16 0.75c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0c7.042 0.001 12.75 5.71 12.75 12.751 0 3.521-1.427 6.709-3.734 9.016v0c-0.226 0.226-0.365 0.538-0.365 0.883 0 0.69 0.56 1.25 1.25 1.25 0.346 0 0.659-0.14 0.885-0.367l0-0c2.759-2.76 4.465-6.572 4.465-10.782 0-8.423-6.828-15.251-15.25-15.251h-0z" />
		</motion.svg>
	);
}

async function delay(ms: number) {
	return new Promise((resolve) =>
		setTimeout(() => {
			return resolve(0);
		}, ms)
	);
}
