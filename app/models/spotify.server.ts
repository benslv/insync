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

	return data;
}

export async function getUserProfile(
	accessToken: string
): Promise<SpotifyApi.UserProfileResponse> {
	const url = "https://api.spotify.com/v1/me";

	const headers = new Headers({
		Accept: "application/json",
		"Content-Type": "application/json",
		Authorization: `Bearer ${accessToken}`,
	});

	const data = await fetch(url, {
		headers,
	})
		.then((res) => {
			if (!res.ok) {
				switch (res.status) {
					case 401:
						throw new CustomError({
							status: 401,
							message: "Access token has expired.",
						});
				}
			}

			return res;
		})
		.then((res) => res.json());

	console.log("UserProfile >>>", data);

	return data;
}

export async function getFollowingArtistIds(accessToken: string) {
	const endpoint = "https://api.spotify.com/v1/me/following";

	const params = new URLSearchParams({
		type: "artist",
		limit: "50", // max limit = 50
	});

	const url = endpoint + "?" + params.toString();

	const data: SpotifyApi.UsersFollowedArtistsResponse = await fetch(url, {
		headers: new Headers({
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		}),
	}).then((res) => res.json());

	console.log("FollowedArtists >>>", data);

	return data.artists.items.map((item) => item.id);
}

export async function getTopTracks(id: string, accessToken: string) {
	const url = `https://api.spotify.com/v1/artists/${id}/top-tracks?market=GB`;

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

export class CustomError extends Error {
	status: number;

	constructor(data: { message: string; status: number }) {
		super(data.message);
		this.status = data.status;
	}
}
