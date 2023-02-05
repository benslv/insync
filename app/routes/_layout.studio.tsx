import type { ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { SpotifyWebApi } from "@thomasngrlt/spotify-web-api-ts";
import { z } from "zod";

import { Label } from "~/components/Label";
import { NumberInput } from "~/components/NumberInput";
import { RangeSlider } from "~/components/Range";
import { TextInput } from "~/components/TextInput";
import { getSession } from "~/sessions";

const generateOptions = z.object({
	trackCount: z.number().min(1).max(100).catch(20),
	name: z.string().min(1).catch("Insync Studio Mixtape"),
	tempo: z.number().min(30).max(300).catch(100),
	popularity: z.number().min(0).max(100).catch(80),
	energy: z.number().min(0).max(1).catch(0.5),
});

type GenerateOptions = z.infer<typeof generateOptions>;

export async function action({ request }: ActionArgs) {
	const formData = await request.formData();
	const session = await getSession(request.headers.get("Cookie"));

	const options: GenerateOptions = generateOptions.parse({
		trackCount: formData.get("track_count"),
		name: formData.get("name"),
		tempo: formData.get("name"),
		popularity: formData.get("popularity"),
		energy: formData.get("energy"),
	});

	const seedArtists = [
		"4oLeXFyACqeem2VImYeBFe",
		"336vr2M3Va0FjyvB55lJEd",
		"1CcPlAmcnJjC4FnaPVzv2v",
		"3Nb8N20WChM0swo5qWTvm8",
		"2n7USVO8fO8FF8zq4kG2N1",
	];

	const redirectUri = new URL(request.url).origin;

	const spotify = new SpotifyWebApi({
		redirectUri,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		accessToken: session.get("access_token"),
	});

	const userId = session.get("user_id");

	const recommendations = await spotify.browse.getRecommendations(
		{
			seed_artists: seedArtists,
		},
		{
			limit: options.trackCount,
			target_popularity: options.popularity,
			target_tempo: options.tempo,
			target_energy: options.energy,
		}
	);

	console.log(recommendations.tracks.map((track) => track.name));

	const playlist = await spotify.playlists.createPlaylist(
		userId,
		options.name
	);

	const snapshotId = await spotify.playlists.addItemsToPlaylist(
		playlist.id,
		recommendations.tracks.map((track) => track.uri)
	);

	return null;
}

export default function StudioPage() {
	return (
		<Form
			method="post"
			className="flex flex-col items-center w-full gap-y-4"
		>
			<div>
				<Label htmlFor="name">Playlist Name</Label>
				<TextInput
					id="name"
					name="name"
					placeholder="insync mixtape"
					className="w-full mt-1"
				/>
			</div>
			<div className="flex items-center gap-x-4">
				<Label>How many tracks? (max. 100)</Label>
				<NumberInput
					className="w-16 hide-spinner"
					name="track_count"
					min={1}
					max={100}
				/>
			</div>
			<RangeGroup label="Tempo (BPM)" leftText="30" rightText="300">
				<RangeSlider
					name="tempo"
					id="tempo"
					min={30}
					max={300}
					className="w-[350px]"
				/>
			</RangeGroup>
			<RangeGroup
				label="Popularity"
				leftText="Obscure finds"
				rightText="Chart toppers"
			>
				<RangeSlider
					name="popularity"
					id="popularity"
					min={0}
					max={100}
					step={1}
					className="w-[350px]"
				/>
			</RangeGroup>
			<RangeGroup
				label="Energy"
				leftText="Chilling out"
				rightText="Ramping up"
			>
				<RangeSlider
					name="energy"
					id="energy"
					min={0}
					max={1}
					step={0.01}
					className="w-[350px]"
				/>
			</RangeGroup>
			<button type="submit">Create</button>
		</Form>
	);
}

type RangeGroupProps = {
	label: string;
	leftText: string;
	rightText: string;
	children: React.ReactNode;
};

function RangeGroup({ label, leftText, rightText, children }: RangeGroupProps) {
	return (
		<div>
			<Label>{label}</Label>
			<div>
				{children}
				<div className="flex justify-between">
					<span className="text-xs text-neutral-400">{leftText}</span>
					<span className="text-xs text-neutral-400">
						{rightText}
					</span>
				</div>
			</div>
		</div>
	);
}
