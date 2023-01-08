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
		const userId = session.get("user_id");
		return json({ userId, oAuthUrl: null }, 200);
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

		return json({ userId: null, oAuthUrl }, 200);
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
	const { userId, oAuthUrl } = useLoaderData<typeof loader>();
	const artistFetcher = useFetcher<typeof generateLoader>();

	return (
		<div>
			<h1>Hello, world!</h1>
			<p>{userId ? `Logged in as ${userId}` : "Logged out"}</p>
			{!oAuthUrl ? (
				<artistFetcher.Form method="get" action="/generate">
					<button>Generate</button>
				</artistFetcher.Form>
			) : (
				<a href={oAuthUrl}>Login</a>
			)}
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
