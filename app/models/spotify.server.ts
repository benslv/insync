import type { Session } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import wretch from "wretch";
import { commitSession, destroySession, getSession } from "~/sessions";

const api = wretch("https://api.spotify.com/v1").errorType("json");
// .resolve((res) => res.json());

export async function requestAccessToken(
	code: string,
	redirectUri: string
): Promise<{
	access_token: string;
	token_type: "Bearer";
	scope: string;
	expires_in: number;
	refresh_token: string;
}> {
	const url = "https://accounts.spotify.com/api/token";

	const auth = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);

	const headers = new Headers({
		Authorization: `Basic ${auth}`,
		"Content-Type": "application/x-www-form-urlencoded",
	});

	const body = new URLSearchParams({
		grant_type: "authorization_code",
		code,
		redirect_uri: redirectUri,
	});

	const data = await fetch(url, { method: "post", headers, body }).then(
		(res) => res.json()
	);

	console.log("data >>> ", data);

	return data;
}

export async function getUserProfile(session: Session) {
	const url = "/me";

	const accessToken = session.get("access_token");

	return api
		.auth(`Bearer ${accessToken}`)
		.get(url)
		.unauthorized(() => console.log("Unauthorized request"))
		.json<SpotifyApi.UserProfileResponse>();
}

export async function getFollowingArtistIds(session: Session) {
	const endpoint = "/me/following";
	const accessToken = session.get("access_token");

	console.log("accessToken >>> ", accessToken);

	const params = new URLSearchParams({
		type: "artist",
		limit: "50", // max limit = 50
	});

	const url = endpoint + "?" + params.toString();

	const data = await api
		.auth(`Bearer ${accessToken}`)
		.get(url)
		.unauthorized(async () => {
			return redirect("/", {
				headers: {
					"Set-Cookie": await destroySession(session),
				},
			});
		})
		.json<SpotifyApi.UsersFollowedArtistsResponse>();

	console.log("FollowedArtists >>>", data);

	return data.artists.items.map((item) => item.id);
}

export async function getTopTracks(id: string, accessToken: string) {
	const url = `/artists/${id}/top-tracks?market=GB`;

	const headers = new Headers({
		Accept: "application/json",
		"Content-Type": "application/json",
		Authorization: `Bearer ${accessToken}`,
	});

	const data: SpotifyApi.ArtistsTopTracksResponse = await fetch(url, {
		headers,
	}).then((res) => res.json());

	const tracks = data.tracks;

	console.log("Tracks >>>", data.tracks);

	return tracks;

	return api.auth();
}

export async function createEmtpyPlaylist(
	userId: string,
	accessToken: string
): Promise<SpotifyApi.CreatePlaylistResponse> {
	const url = `https://api.spotify.com/v1/users/${userId}/playlists`;

	const headers = new Headers({
		"Content-Type": "application/json",
		Authorization: `Bearer ${accessToken}`,
	});

	const body = JSON.stringify({
		name: "insync mixtape",
		description:
			"Stay in sync with the music you love! Made with insync.vercel.app ✨",
	});

	const data = await fetch(url, {
		method: "post",
		headers,
		body,
	}).then((res) => res.json());

	console.log("Playlist >>>", data);

	return data;
}

export async function addTracksToPlaylist(
	playlistId: string,
	trackUris: string[],
	accessToken: string
): Promise<SpotifyApi.AddTracksToPlaylistResponse> {
	const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

	const headers = new Headers({
		"Content-Type": "application/json",
		Authorization: `Bearer ${accessToken}`,
	});

	const body = JSON.stringify({
		uris: trackUris,
	});

	const data = await fetch(url, {
		method: "post",
		headers,
		body,
	}).then((res) => res.json());

	console.log("SnapshotID >>>", data);

	return data;
}

export async function getPlaylist(
	playlistId: string,
	accessToken: string
): Promise<SpotifyApi.PlaylistObjectFull> {
	const url = `https://api.spotify.com/v1/playlists/${playlistId}`;

	const headers = new Headers({
		"Content-Type": "application/json",
		Authorization: `Bearer ${accessToken}`,
	});

	const data = await fetch(url, { headers }).then((res) => res.json());

	console.log("Playlist >>>", data);

	return data;
}
