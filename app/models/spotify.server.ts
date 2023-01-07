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

export async function createEmtpyPlaylist(userId: string, accessToken: string) {
	const url = `https://api.spotify.com/v1/users/${userId}/playlists`;

	const headers = new Headers({
		Accept: "application/json",
		"Content-Type": "application/json",
		Authorization: `Bearer ${accessToken}`,
	});

	const body = new URLSearchParams({
		name: "insync mixtape",
		description: "Stay in sync with the music you love!",
	});

	const data: SpotifyApi.CreatePlaylistResponse = await fetch(url, {
		method: "post",
		headers,
		body,
	}).then((res) => res.json());

	console.log(data);

	return data;
}

export async function addTracksToPlaylist() {}

export async function getUserProfile(accessToken: string) {
	const url = "https://api.spotify.com/v1/me";

	const headers = new Headers({
		Accept: "application/json",
		"Content-Type": "application/json",
		Authorization: `Bearer ${accessToken}`,
	});

	const data: SpotifyApi.UserProfileResponse = await fetch(url, {
		headers,
	}).then((res) => res.json());

	return data;
}
