import * as RadioGroup from "@radix-ui/react-radio-group";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
	Form,
	useActionData,
	useLoaderData,
	useTransition,
} from "@remix-run/react";
import { addSeconds } from "date-fns";
import { LayoutGroup, motion } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { SpotifyWebApi } from "spotify-web-api-ts";
import type { PrivateUser } from "spotify-web-api-ts/types/types/SpotifyObjects";
import { z } from "zod";

import { BackgroundCircles } from "~/components/BackgroundCircles";
import { generatePlaylist } from "~/models/generate.server";
import { commitSession, destroySession, getSession } from "~/sessions";
import { tokenHasExpired } from "~/utils/tokenHasExpired";

export async function loader({ request }: LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const redirectUri = new URL(request.url).origin;

	const spotify = new SpotifyWebApi({
		redirectUri,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
	});

	if (session.has("access_token")) {
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

		const userProfile = await spotify.users.getMe();

		session.set("user_id", userProfile.id);

		return json(
			{ userProfile, oAuthUrl: null },
			{
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			}
		);
	}

	const url = new URL(request.url);
	const code = url.searchParams.get("code");

	if (!code) {
		const oAuthUrl = spotify.getRefreshableAuthorizationUrl({
			scope: ["user-follow-read", "playlist-modify-public"],
		});

		return json({ userProfile: null, oAuthUrl });
	}

	const { access_token, expires_in, refresh_token } =
		await spotify.getRefreshableUserTokens(code);

	spotify.setAccessToken(access_token);

	const expiryDate = addSeconds(new Date(), expires_in);
	const userProfile = await spotify.users.getMe();

	session.set("access_token", access_token);
	session.set("refresh_token", refresh_token);
	session.set("expiry_date", expiryDate.toISOString());
	session.set("user_id", userProfile.id);

	throw redirect("/", {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
}

export async function action({ request }: ActionArgs) {
	const formData = await request.formData();
	const intent = z.string().parse(formData.get("_intent"));
	const selection = z
		.union([z.literal("popular"), z.literal("latest"), z.literal("random")])
		.catch("popular")
		.parse(formData.get("selection"));

	const playlistTitle = z
		.string()
		.catch("insync mixtape")
		.parse(formData.get("playlist_title"));

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
			const generateResult = await generatePlaylist(request, {
				selection,
				title: playlistTitle,
			});

			if (!generateResult.ok) {
				const message = generateResult.message;

				return json({ error: true, message });
			}

			const playlistId = generateResult.playlistId;

			session.set("playlist_id", playlistId);

			throw redirect("/playlist", {
				headers: {
					"Set-Cookie": await commitSession(session),
				},
			});
		}
		default: {
			return json({
				error: true,
				message: `Unhandled form intent: ${intent}`,
			});
		}
	}
}

export default function Index() {
	const { userProfile, oAuthUrl } = useLoaderData<typeof loader>();
	const errors = useActionData<typeof action>();
	const transition = useTransition();

	const isGenerating =
		transition.state === "submitting" &&
		transition.submission.formData.get("_intent") === "generate";

	const generateButtonText = isGenerating
		? "Generating..."
		: transition.state === "loading"
		? "Loading..."
		: "Generate";

	return (
		<div className="flex h-full max-h-full">
			<div className="flex flex-col items-center justify-center w-full h-full px-8 space-y-4 text-center border-r drop-shadow-xl border-white/20 sm:items-start sm:max-w-xl sm:text-left md:px-16">
				<div className="w-full">
					<h1 className="mb-2 text-3xl tracking-tighter sm:text-5xl">
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
				<LayoutGroup>
					{!oAuthUrl ? (
						<>
							<Form
								method="post"
								className="flex flex-col gap-y-4"
							>
								<div className="flex flex-col gap-y-2">
									<label
										htmlFor="playlist_title"
										className="text-sm text-neutral-400"
									>
										Name:
									</label>
									<input
										name="playlist_title"
										type="text"
										placeholder="insync mixtape"
										className="px-4 py-2 transition-colors rounded-full bg-neutral-800 focus:bg-neutral-600"
									/>
								</div>
								<PlaylistTypeGroup />
								<div className="flex items-center gap-x-2">
									<button
										disabled={isGenerating}
										type="submit"
										name="_intent"
										value="generate"
										className="w-full px-4 py-2 text-sm font-bold uppercase transition-colors bg-green-500 rounded-full hover:bg-green-400 text-neutral-900 sm:w-max"
									>
										{generateButtonText}
									</button>
									{isGenerating ? (
										<motion.div
											initial={{ x: -50, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
										>
											<Spinner />
										</motion.div>
									) : null}
								</div>
							</Form>
							{isGenerating ? (
								<motion.p
									initial={{
										opacity: 0,
										y: -30,
										height: 0,
										margin: 0,
									}}
									animate={{
										opacity: 1,
										y: 0,
										height: "auto",
										marginTop: 16,
									}}
									transition={{ delay: 5 }}
									layout="position"
									className="text-sm text-neutral-400"
								>
									Hold tight! We're fetching a lot of data...
								</motion.p>
							) : null}
							{errors ? (
								<motion.p
									initial={{ opacity: 0, y: -50 }}
									animate={{
										opacity: 1,
										y: 0,
									}}
									className="px-3 py-1 border border-red-300 rounded-xl bg-red-300/25"
								>
									{errors.message}
								</motion.p>
							) : null}
						</>
					) : (
						<a
							href={oAuthUrl}
							className="px-4 py-2 text-sm font-bold uppercase transition-colors bg-green-500 rounded-full hover:bg-green-400 text-neutral-900 w-max"
						>
							Connect to Spotify
						</a>
					)}
					{userProfile ? (
						<motion.div layout="position">
							<div className="flex items-center justify-center space-x-2 sm:justify-start">
								<ProfileImage userProfile={userProfile} />
								<p className="text-sm">
									Logged in as {userProfile.id}
								</p>
							</div>
							<Form method="post" action="/logout">
								<button
									type="submit"
									name="_intent"
									value="logout"
									className="text-sm underline"
								>
									Logout
								</button>
							</Form>
						</motion.div>
					) : null}
				</LayoutGroup>
			</div>
			<div className="relative items-center hidden w-full h-full overflow-hidden sm:flex sm:justify-end">
				<BackgroundCircles />
			</div>
		</div>
	);
}

export function ErrorBoundary() {
	return (
		<div className="flex h-full max-h-full">
			<div className="flex flex-col items-center justify-center w-full h-full px-8 space-y-4 text-center border-r drop-shadow-xl border-white/20 sm:items-start sm:max-w-xl sm:text-left md:px-16">
				<div className="w-full">
					<h1 className="mb-2 text-3xl tracking-tighter sm:text-5xl">
						Whoops!
					</h1>
					<p className="mb-2">insync ran into an error.</p>
					<p>
						Click the button below to be taken back to the homepage,
						and we'll try again.
					</p>
				</div>
				<Form method="post" action="/logout">
					<button
						type="submit"
						className="px-4 py-2 text-sm font-bold uppercase transition-colors bg-green-500 rounded-full hover:bg-green-400 text-neutral-900 w-max"
					>
						Home
					</button>
				</Form>
			</div>
			<div className="relative items-center hidden w-full h-full overflow-hidden sm:flex sm:justify-end">
				<BackgroundCircles />
			</div>
		</div>
	);
}

function ProfileImage({ userProfile }: { userProfile: PrivateUser }) {
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

function PlaylistTypeGroup() {
	const itemClassName =
		"relative px-4 py-1 rounded-full hover:bg-neutral-800 data-[state=checked]:bg-neutral-700 border border-neutral-900 transition-colors data-[state=checked]:border-neutral-500";

	return (
		<div className="flex flex-col gap-y-2">
			<label htmlFor="selection" className="text-sm text-neutral-400">
				Selection method:
			</label>
			<RadioGroup.Root
				defaultValue="popular"
				loop={false}
				aria-label="Playlist type"
				orientation="horizontal"
				id="selection"
				name="selection"
				className="flex p-1 border rounded-full border-neutral-700 gap-x-2 "
			>
				<RadioGroup.Item
					value="popular"
					id="r1"
					className={itemClassName}
				>
					<label htmlFor="r1" className="cursor-pointer">
						Popular
					</label>
				</RadioGroup.Item>
				<RadioGroup.Item
					value="latest"
					id="r2"
					className={itemClassName}
				>
					<label htmlFor="r2" className="cursor-pointer">
						Latest
					</label>
				</RadioGroup.Item>
				<RadioGroup.Item
					value="random"
					id="r3"
					className={itemClassName}
				>
					<label htmlFor="r3" className="cursor-pointer">
						Random
					</label>
				</RadioGroup.Item>
			</RadioGroup.Root>
		</div>
	);
}
