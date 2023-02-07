import type { ActionArgs } from "@remix-run/node";
import { defer, redirect } from "@remix-run/node";
import { Await, Form, useLoaderData } from "@remix-run/react";
import { SpotifyWebApi } from "@thomasngrlt/spotify-web-api-ts";
import type { Artist } from "@thomasngrlt/spotify-web-api-ts/types/types/SpotifyObjects";
import { Suspense, useState } from "react";
import { z } from "zod";

import { Label } from "~/components/Label";
import { NumberInput } from "~/components/NumberInput";
import { RangeSlider } from "~/components/Range";
import { TextInput } from "~/components/TextInput";
import { getAllFollowedArtists } from "~/models/api.server";
import { getSession } from "~/sessions";

const generateOptions = z.object({
	trackCount: z.number().min(1).max(100).catch(20),
	name: z.string().min(1).catch("Insync Studio Mixtape"),
	tempo: z.number().min(30).max(300).catch(100),
	popularity: z.number().min(0).max(100).catch(80),
	energy: z.number().min(0).max(1).catch(0.5),
});

const seedArtistSchema = z.array(z.string());

type GenerateOptions = z.infer<typeof generateOptions>;

export async function loader({ request }: ActionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const redirectUri = new URL(request.url).origin;

	if (!session.has("access_token")) {
		throw redirect("/");
	}

	const accessToken = session.get("access_token");

	const spotify = new SpotifyWebApi({
		accessToken,
		redirectUri,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
	});

	const followedArtistsPromise = getAllFollowedArtists(spotify);

	return defer({ followedArtistsPromise });
}

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

	const seedArtists = seedArtistSchema.parse(
		formData.getAll("selected_artist")
	);

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
	const { followedArtistsPromise } = useLoaderData<typeof loader>();
	const [selectedArtists, setSelectedArtists] = useState<string[]>([]);

	const handleChipClick = (id: string) => {
		if (selectedArtists.includes(id)) {
			return setSelectedArtists((prev) =>
				prev.filter((selectedId) => selectedId !== id)
			);
		}

		if (selectedArtists.length === 5) return;

		return setSelectedArtists((prev) => [...prev, id]);
	};

	const ArtistList = ({ artists }: { artists: Artist[] }) => (
		<>
			{artists.map(({ name, images, id }) => (
				<ArtistChip
					key={id}
					image={images![0].url ?? ""}
					text={name!}
					onClick={() => handleChipClick(id!)}
					selected={selectedArtists.includes(id!)}
				/>
			))}
		</>
	);

	return (
		<div className="flex space-x-4">
			<div className="flex flex-wrap justify-center max-w-sm gap-2 overflow-y-scroll w-sm min-w-sm h-96">
				<Suspense fallback={<p>Loading artists...</p>}>
					<Await
						resolve={followedArtistsPromise}
						errorElement={<p>Error loading artists...</p>}
					>
						{(artists) => <ArtistList artists={artists} />}
					</Await>
				</Suspense>
			</div>
			<Form
				method="post"
				className="flex flex-col items-center w-full gap-y-4"
			>
				{selectedArtists.map((id) => (
					<input
						key={id}
						type="hidden"
						name="selected_artist"
						value={id}
					/>
				))}
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
		</div>
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

type ArtistChipProps = {
	image: string;
	text: string;
	selected: boolean;
	onClick: () => void;
};

function ArtistChip({ image, text, onClick, selected }: ArtistChipProps) {
	return (
		<div
			onClick={onClick}
			className={`flex items-center py-1 pl-1 pr-2 transition-colors border-2 bg-neutral-800 hover:bg-neutral-700 rounded-full gap-x-2 hover:cursor-pointer w-max h-8
			${
				selected
					? "border-green-600 hover:border-green-500"
					: "border-neutral-600 hover:border-neutral-500"
			}
			`}
		>
			<img
				src={image}
				alt={`${text} icon`}
				width={20}
				height={20}
				className="rounded-full"
			/>
			<p
				className={`text-sm transition-colors  ${
					selected ? "text-white" : "text-neutral-400"
				}`}
			>
				{text}
			</p>
		</div>
	);
}
