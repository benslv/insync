import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { SpotifyWebApi } from "@thomasngrlt/spotify-web-api-ts";
import type { PrivateUser } from "@thomasngrlt/spotify-web-api-ts/types/types/SpotifyObjects";
import { addSeconds } from "date-fns";
import { motion } from "framer-motion";
import { ProfileCircle } from "iconoir-react";
import Balancer from "react-wrap-balancer";

import { BackgroundCircles } from "~/components/BackgroundCircles";
import { OnboardingModal } from "~/components/OnboardingModal";
import { commitSession, getSession } from "~/sessions";
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

export default function Index() {
	const { userProfile, oAuthUrl } = useLoaderData<typeof loader>();
	return (
		<div className="h-screen overflow-hidden">
			<div className="relative z-10 flex h-full max-h-full">
				<div className="flex h-full w-full flex-col items-center justify-center gap-y-4 border-r border-white/20 px-8 text-center drop-shadow-xl sm:max-w-xl sm:items-start sm:text-left md:px-16">
					<div className="flex w-full flex-col items-center gap-y-4 sm:items-start">
						<h1 className="w-full text-5xl tracking-tighter">
							<Balancer>Stay in sync with the music you love</Balancer>
						</h1>
						<p className="w-full">
							<Balancer>
								insync creates playlists from your followed artists on Spotify.
								Connect your account for personalised music discovery.
							</Balancer>
						</p>
						{oAuthUrl ? (
							<a
								href={oAuthUrl}
								className="w-max rounded-full bg-green-500 px-4 py-2 text-sm font-bold uppercase text-neutral-900 transition-colors hover:bg-green-400">
								Connect to Spotify
							</a>
						) : (
							<div className="flex h-16 w-full gap-x-2">
								<Link
									to="./basic"
									className="flex h-full w-full items-center justify-center rounded-2xl border border-neutral-700 bg-neutral-900 transition duration-300 hover:border-neutral-500">
									<p className="text-xl">Basic</p>
								</Link>
								<Link
									to="./studio"
									className="group relative h-full w-full rounded-2xl bg-gradient-to-br from-white/10 via-white/75 to-white/10">
									<div className="absolute inset-0.5 flex items-center  justify-center overflow-hidden rounded-[14px] bg-gradient-to-br from-black via-[#222] to-black shadow-tile ring-white/20 transition-all duration-300 hover:ring-[2px]">
										<p className="text-2xl font-semibold tracking-tighter">
											Studio
										</p>
										<div className="absolute inset-0 h-full w-full bg-gradient-to-t from-green-500 to-transparent opacity-10 transition-all duration-300 group-hover:opacity-20"></div>
									</div>
								</Link>
							</div>
						)}

						<OnboardingModal />
					</div>

					{userProfile ? (
						<div className="flex w-full flex-col gap-y-2">
							<hr className="border-neutral-600" />
							<div className="flex flex-col items-center gap-x-2 sm:flex-row sm:justify-between">
								<div className="flex items-center gap-x-2">
									<ProfileImage userProfile={userProfile} />
									<p className="text-sm">
										Logged in as {userProfile.display_name}
									</p>
								</div>
								<Form method="post" action="/logout">
									<button
										type="submit"
										value="logout"
										className="text-sm underline">
										Logout
									</button>
								</Form>
							</div>
						</div>
					) : null}
				</div>
				<div className="relative hidden h-full w-full items-center overflow-hidden sm:flex sm:justify-end">
					<BackgroundCircles />
				</div>
			</div>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, duration: 2 }}
				className="relative z-0 flex blur-md sm:hidden">
				<BackgroundCircles />
			</motion.div>
		</div>
	);
}

export function ErrorBoundary() {
	return (
		<div className="flex h-full max-h-full">
			<div className="z-10 flex h-full w-full flex-col items-center justify-center gap-y-4 border-r border-white/20 px-8 text-center drop-shadow-xl sm:max-w-xl sm:items-start sm:text-left md:px-16">
				<div className="w-full">
					<h1 className="mb-2 text-3xl tracking-tighter sm:text-5xl">
						Whoops!
					</h1>
					<p className="mb-2">insync ran into an error.</p>
					<p>
						Click the button below to be taken back to the homepage, and we'll
						try again.
					</p>
				</div>
				<Form method="post" action="/logout">
					<button
						type="submit"
						className="w-max rounded-full bg-green-500 px-4 py-2 text-sm font-bold uppercase text-neutral-900 transition-colors hover:bg-green-400">
						Home
					</button>
				</Form>
			</div>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, duration: 2 }}
				className="relative z-0 flex blur-md sm:hidden">
				<BackgroundCircles />
			</motion.div>
		</div>
	);
}

function ProfileImage({ userProfile }: { userProfile: PrivateUser }) {
	if (userProfile.images && userProfile.images.length === 0) {
		return <ProfileCircle className="h-4 w-4" />;
	}

	return (
		<img
			src={userProfile.images![0].url}
			alt=""
			className="h-4 w-4 rounded-full border border-white"
			height={16}
			width={16}
		/>
	);
}
