export async function getUserProfile(
	accessToken: string
): Promise<SpotifyApi.UserProfileResponse> {
	const url = "https://api.spotify.com/v1/me";

	const headers = new Headers({
		Accept: "application/json",
		"Content-Type": "application/json",
		Authorization: `Bearer ${accessToken}`,
	});

	return fetch(url, {
		headers,
	}).then((res) => res.json());
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
		description: "Stay in sync with the music you love!",
	});

	return fetch(url, {
		method: "post",
		headers,
		body,
	}).then((res) => res.json());
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

	return data;
}
