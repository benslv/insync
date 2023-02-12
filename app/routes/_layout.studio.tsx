import type { ActionArgs } from "@remix-run/node";
import { defer, json, redirect } from "@remix-run/node";
import { Await, Form, useLoaderData } from "@remix-run/react";
import { SpotifyWebApi } from "@thomasngrlt/spotify-web-api-ts";
import type { Artist } from "@thomasngrlt/spotify-web-api-ts/types/types/SpotifyObjects";
import { Suspense, useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";

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

const seedArtistSchema = z.array(z.string()).catch([]);

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

	return defer(
		{ followedArtistsPromise },
		{
			headers: {
				"Cache-Control": "max-age=600",
			},
		}
	);
}

export async function action({ request }: ActionArgs) {
	const formData = await request.formData();
	const session = await getSession(request.headers.get("Cookie"));
	const redirectUri = new URL(request.url).origin;

	const options: GenerateOptions = generateOptions.parse({
		trackCount: formData.get("track_count"),
		name: formData.get("name"),
		tempo: formData.get("name"),
		popularity: formData.get("popularity"),
		energy: formData.get("energy"),
	});

	const seedArtists = seedArtistSchema
		.parse(formData.getAll("selected_artist"))
		.map((artist) => JSON.parse(artist) as MiniArtist);

	if (seedArtists.length === 0) {
		return json({
			ok: false,
			message: "You need to select at least one artist to generate a playlist!",
		});
	}

	const spotify = new SpotifyWebApi({
		redirectUri,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		accessToken: session.get("access_token"),
	});

	const userId = session.get("user_id");

	const recommendations = await spotify.browse.getRecommendations(
		{
			seed_artists: seedArtists.map((artist) => artist.id),
		},
		{
			limit: options.trackCount,
			target_popularity: options.popularity,
			target_tempo: options.tempo,
			target_energy: options.energy,
		}
	);

	const formatter = new Intl.ListFormat("en-GB", {
		style: "short",
		type: "conjunction",
	});
	const artistDesc = formatter.format(seedArtists.map((artist) => artist.name));

	const playlist = await spotify.playlists.createPlaylist(
		userId,
		options.name,
		{
			description: `A tailor-made mixtape for ${userId}, based off ${artistDesc}. Create your own at insync.vercel.app!`,
		}
	);

	const snapshotId = await spotify.playlists.addItemsToPlaylist(
		playlist.id,
		recommendations.tracks.map((track) => track.uri)
	);

	return redirect(`/playlist?id=${playlist.id}`);
}

type MiniArtist = {
	name: string;
	id: string;
};

export default function StudioPage() {
	const { followedArtistsPromise } = useLoaderData<typeof loader>();
	const [selectedArtists, setSelectedArtists] = useState<MiniArtist[]>([]);

	const handleChipClick = ({ name, id }: MiniArtist) => {
		const hasArtist = selectedArtists.find((artist) => artist.id === id);

		if (hasArtist) {
			return setSelectedArtists((prev) =>
				prev.filter((artist) => artist.id !== id)
			);
		}

		if (selectedArtists.length === 5) return;

		return setSelectedArtists((prev) => [...prev, { name, id }]);
	};

	const ArtistList = ({ artists }: { artists: Artist[] }) => (
		<>
			{artists.map(({ name, images, id }) => (
				<ArtistChip
					key={id}
					image={images![0].url ?? ""}
					text={name!}
					onClick={() => handleChipClick({ name, id })}
					selected={Boolean(selectedArtists.find((artist) => artist.id === id))}
				/>
			))}
		</>
	);

	return (
		<div className="flex space-x-4">
			<div className="w-sm min-w-sm flex h-96 max-w-sm flex-wrap justify-center gap-2 overflow-y-scroll rounded-xl border border-neutral-700 p-4 transition duration-300">
				<Suspense
					fallback={
						<div className="flex">
							<p>Loading artists...</p> <Spinner />
						</div>
					}>
					<Await
						resolve={followedArtistsPromise}
						errorElement={<p>Error loading artists...</p>}>
						{(artists) => <ArtistList artists={artists} />}
					</Await>
				</Suspense>
			</div>
			<Form method="post" className="flex w-full flex-col items-center gap-y-4">
				{selectedArtists.map((artist) => (
					<input
						key={artist.id}
						type="hidden"
						name="selected_artist"
						value={JSON.stringify(artist)}
					/>
				))}
				<div>
					<Label htmlFor="name">Playlist Name</Label>
					<TextInput
						id="name"
						name="name"
						placeholder="insync mixtape"
						className="mt-1 w-full"
					/>
				</div>
				<div className="flex items-center gap-x-4">
					<Label>How many tracks? (max. 100)</Label>
					<NumberInput
						className="hide-spinner w-16"
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
					rightText="Chart toppers">
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
					rightText="Ramping up">
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
					<span className="text-xs text-neutral-400">{rightText}</span>
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
			className={`flex h-8 w-max items-center gap-x-2 rounded-full border-2 bg-neutral-800 py-1 pl-1 pr-2 transition-colors hover:cursor-pointer hover:bg-neutral-700
			${
				selected
					? "border-green-600 hover:border-green-500"
					: "border-neutral-600 hover:border-neutral-500"
			}
			`}>
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
				}`}>
				{text}
			</p>
		</div>
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
			}}>
			<title>spinner-one-third</title>
			<path d="M16 0.75c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0c7.042 0.001 12.75 5.71 12.75 12.751 0 3.521-1.427 6.709-3.734 9.016v0c-0.226 0.226-0.365 0.538-0.365 0.883 0 0.69 0.56 1.25 1.25 1.25 0.346 0 0.659-0.14 0.885-0.367l0-0c2.759-2.76 4.465-6.572 4.465-10.782 0-8.423-6.828-15.251-15.25-15.251h-0z" />
		</motion.svg>
	);
}
