import type { ActionArgs } from "@remix-run/node";
import { defer, json, redirect } from "@remix-run/node";
import { Await, Form, useLoaderData, useTransition } from "@remix-run/react";
import { SpotifyWebApi } from "@thomasngrlt/spotify-web-api-ts";
import { addSeconds } from "date-fns";
import { motion } from "framer-motion";
import { Suspense, useState } from "react";
import { z } from "zod";

import { ArtistChip } from "~/components/ArtistChip";
import { Label } from "~/components/Label";
import { NumberInput } from "~/components/NumberInput";
import { RangeSlider } from "~/components/Range";
import { RangeGroup } from "~/components/RangeGroup";
import { Spinner } from "~/components/Spinner";
import { TextInput } from "~/components/TextInput";
import { getAllFollowedArtists } from "~/models/api.server";
import { commitSession, getSession } from "~/sessions";
import { tokenHasExpired } from "~/utils/tokenHasExpired";

const generateOptions = z.object({
	trackCount: z.coerce.number().min(1).max(100).catch(20),
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

	const spotify = new SpotifyWebApi({
		redirectUri,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		accessToken: session.get("access_token"),
	});

	if (tokenHasExpired(session)) {
		const refreshToken = session.get("refresh_token");
		const { access_token, expires_in } = await spotify.getRefreshedAccessToken(
			refreshToken
		);

		session.set("access_token", access_token);
		spotify.setAccessToken(access_token);

		const expiryDate = addSeconds(new Date(), expires_in);
		session.set("expiry_date", expiryDate);
	}

	const followedArtistsPromise = getAllFollowedArtists(spotify).then(
		(artists) => artists.sort((a, b) => a.name.localeCompare(b.name))
	);

	return defer(
		{ followedArtistsPromise },
		{
			headers: {
				"Cache-Control": "max-age=600",
				"Set-Cookie": await commitSession(session),
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

	if (tokenHasExpired(session)) {
		const refreshToken = session.get("refresh_token");
		const { access_token, expires_in } = await spotify.getRefreshedAccessToken(
			refreshToken
		);

		session.set("access_token", access_token);
		spotify.setAccessToken(access_token);

		const expiryDate = addSeconds(new Date(), expires_in);
		session.set("expiry_date", expiryDate);
	}

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
			description: `A tailor-made mixtape for ${userId}, based off ${artistDesc}. Create your own at insync.rocks!`,
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
	const [searchTerm, setSearchTerm] = useState("");
	const transition = useTransition();

	const isGenerating = transition.state === "submitting";

	const generateButtonText = isGenerating
		? "Generating..."
		: transition.state === "loading"
		? "Loading..."
		: "Generate";

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

	return (
		<div className="flex h-full w-full flex-col items-center gap-y-8 px-4">
			<div className="flex h-max w-full max-w-4xl flex-col gap-y-8 gap-x-0 sm:flex-row sm:gap-y-0 sm:gap-x-4">
				<div className="flex w-full flex-col sm:w-1/2">
					<h2 className="mb-4 text-xl text-neutral-300 sm:hidden">
						Select artists
					</h2>
					<div className="h-full w-full rounded-xl border border-neutral-700">
						<div className="flex flex-col gap-2 px-4 pt-4">
							<div className="flex justify-between text-sm text-neutral-400">
								<p>Artists</p>
								<p
									className={`${
										selectedArtists.length == 5 ? "text-green-500" : ""
									}`}>
									{selectedArtists.length}
									<span className="text-neutral-400">/5</span>
								</p>
							</div>
							<TextInput
								placeholder="Search"
								value={searchTerm}
								onChange={(event) => setSearchTerm(event.target.value)}
								className="z-10 w-full rounded-full border-neutral-700"
							/>
						</div>
						<div className="h-full max-h-[33vh] w-full overflow-y-scroll transition duration-300 sm:max-h-96">
							<Suspense
								fallback={
									<div className="flex h-full w-full items-center justify-center gap-x-4 p-4">
										<p>Loading artists...</p> <Spinner />
									</div>
								}>
								<Await
									resolve={followedArtistsPromise}
									errorElement={
										<p className="p-4">Error loading artists...</p>
									}>
									{(artists) => {
										if (artists.length === 0) {
											return (
												<div className="flex  h-full w-full flex-col items-center justify-center">
													<p className="text-sm text-neutral-400">
														You need to be following at least one artist!
													</p>
												</div>
											);
										}

										const filteredArtists = artists.filter(({ name }) =>
											name.toLowerCase().includes(searchTerm.toLowerCase())
										);

										return (
											<motion.div
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												className="flex h-max flex-wrap items-start justify-center gap-2 p-4">
												{filteredArtists.map(({ name, images, id }) => (
													<ArtistChip
														key={id}
														image={images![images.length - 1].url ?? ""}
														text={name!}
														onClick={() => handleChipClick({ name, id })}
														selected={Boolean(
															selectedArtists.find((artist) => artist.id === id)
														)}
													/>
												))}
											</motion.div>
										);
									}}
								</Await>
							</Suspense>
						</div>
					</div>
				</div>
				<div className="h-max w-full sm:w-1/2">
					<h2 className="mb-4 text-xl text-neutral-300 sm:hidden">
						Generate playlist
					</h2>
					<Form
						method="post"
						className="flex flex-col items-center gap-y-4 rounded-xl border border-neutral-700 p-4 shadow">
						{selectedArtists.map((artist) => (
							<input
								key={artist.id}
								type="hidden"
								name="selected_artist"
								value={JSON.stringify(artist)}
							/>
						))}
						<div className="w-full">
							<Label htmlFor="name">Playlist Name</Label>
							<TextInput
								id="name"
								name="name"
								placeholder="insync mixtape"
								className="mt-1 w-full"
							/>
						</div>
						<div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2">
							<Label>How many tracks? (max. 100)</Label>
							<NumberInput
								className="hide-spinner w-12"
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
								className="w-full"
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
								className="w-full"
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
								className="w-full"
							/>
						</RangeGroup>
						<button
							type="submit"
							disabled={selectedArtists.length === 0 || isGenerating}
							className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold uppercase text-neutral-900 transition-all hover:bg-green-400 disabled:opacity-50">
							{generateButtonText}
						</button>
					</Form>
				</div>
			</div>
		</div>
	);
}
