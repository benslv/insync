import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { SpotifyWebApi } from "@thomasngrlt/spotify-web-api-ts";

import { getSession } from "~/sessions";

export async function loader({ request }: LoaderArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const redirectUri = new URL(request.url).origin;

	if (!session.has("access_token")) {
		throw redirect("/");
	}

	const spotify = new SpotifyWebApi({
		redirectUri,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
	});

	const accessToken = session.get("access_token");

	spotify.setAccessToken(accessToken);

	// const me = await spotify.personalization.getMyTopArtists();

	const res = await fetch("https://api.spotify.com/v1/me/top/artists", {
		headers: new Headers({
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		}),
	});

	if (!res.ok) {
		console.error(res);
	} else {
		const data = await res.json();

		console.log(data);
	}

	return null;
}

export default function StudioPage() {
	// const { topArtists } = useLoaderData<typeof loader>();

	// console.log(topArtists);

	return <h1>Studio</h1>;
}
