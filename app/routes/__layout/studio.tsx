import * as RadioGroup from "@radix-ui/react-radio-group";
import type { ActionArgs } from "@remix-run/node";
import { defer, json, redirect } from "@remix-run/node";
import {
	Await,
	Form,
	useLoaderData,
	useNavigation,
	useSearchParams,
	useSubmit,
} from "@remix-run/react";
import { SpotifyWebApi } from "@thomasngrlt/spotify-web-api-ts";
import { addSeconds } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useState } from "react";
import { z } from "zod";

import { ArtistChip, ArtistChip2 } from "~/components/ArtistChip";
import { Label } from "~/components/Label";
import { NumberInput } from "~/components/NumberInput";
import { RangeSlider } from "~/components/Range";
import { RangeGroup } from "~/components/RangeGroup";
import { Spinner } from "~/components/Spinner";
import { TextInput } from "~/components/TextInput";
import {
	getAllFollowedArtists,
	getTopArtists,
	timeRangeSchema,
} from "~/models/api.server";
import { commitSession, getSession } from "~/sessions";
import { tokenHasExpired } from "~/utils/tokenHasExpired";

const generateOptionsSchema = z.object({
	trackCount: z.coerce.number().min(1).max(100).catch(20),
	name: z.string().min(1).catch("Insync Studio Mixtape"),
	tempo: z.number().min(30).max(300).catch(100),
	popularity: z.number().min(0).max(100).catch(80),
	energy: z.number().min(0).max(1).catch(0.5),
});

const seedArtistSchema = z.array(z.string()).catch([]);

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

	const url = new URL(request.url);
	const includeTop = z
		.union([z.literal("true"), z.literal("false")])
		.catch("false")
		.parse(url.searchParams.get("includeTop"));

	const followedArtistsPromise = getAllFollowedArtists(spotify);

	if (includeTop === "false") {
		return defer(
			{
				artistDataPromise: followedArtistsPromise,
			},
			{
				headers: {
					"Cache-Control": "max-age=600",
					"Set-Cookie": await commitSession(session),
				},
			}
		);
	}

	const timeRange = timeRangeSchema.parse(url.searchParams.get("range"));
	const topArtistsPromise = getTopArtists(spotify, timeRange);

	const artistDataPromise = Promise.all([
		followedArtistsPromise,
		topArtistsPromise,
	]).then(([followed, top]) => {
		const ids = followed.map((artist) => artist.id);

		return [...followed, ...top.filter((artist) => !ids.includes(artist.id))];
	});

	return defer(
		{ artistDataPromise },
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

	const options = generateOptionsSchema.parse({
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
	const { artistDataPromise } = useLoaderData<typeof loader>();
	const [searchParams] = useSearchParams();
	const navigation = useNavigation();

	const [selectedArtists, setSelectedArtists] = useState<MiniArtist[]>([]);
	const [searchTerm, setSearchTerm] = useState("");

	const includeTop = searchParams.get("includeTop") === "true";
	const isGenerating =
		navigation.state === "submitting" && navigation.formMethod === "post";

	const generateButtonText = isGenerating ? "Generating..." : "Generate";

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
						<div className="flex flex-col gap-2 px-4 pt-4 pb-2">
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
								className="z-10 w-full"
							/>
							<div className="flex items-center">
								<Form
									method="get"
									className="z-10"
									replace
									preventScrollReset={true}>
									<input
										type="hidden"
										name="includeTop"
										value={String(!includeTop)}
									/>
									{!includeTop && (
										<input type="hidden" name="range" value="short" />
									)}
									<button
										type="submit"
										className={`whitespace-nowrap rounded-full border py-1 px-3 text-sm transition-colors hover:cursor-pointer ${
											includeTop
												? "border-green-600 bg-green-900 text-green-200 hover:border-green-500 hover:bg-green-800"
												: "border-neutral-600 bg-neutral-800 text-neutral-400 hover:border-neutral-500 hover:bg-neutral-700"
										}`}>
										Include top artists
									</button>
								</Form>
								<AnimatePresence initial={false}>
									{includeTop && (
										<motion.div
											className="-ml-4 overflow-x-scroll md:overflow-x-auto"
											initial={{ opacity: 0, x: -10 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -10 }}
											transition={{ bounce: false, duration: 0.15 }}>
											<TimeRangeFilter includesTop={includeTop} />
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</div>

						<div className="h-full max-h-[33vh] w-full overflow-y-scroll transition duration-300 sm:max-h-96">
							<Suspense
								fallback={
									<div className="flex h-full w-full items-center justify-center gap-x-4 p-4">
										<p>Loading artists...</p> <Spinner />
									</div>
								}>
								<Await
									resolve={artistDataPromise}
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

										const filteredArtists = artists
											.filter(({ name }) =>
												name.toLowerCase().includes(searchTerm.toLowerCase())
											)
											.sort((a, b) => b.popularity - a.popularity);

										return (
											<motion.div
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												className="grid grid-cols-4 gap-x-2 gap-y-4 p-4 pt-2 sm:grid-cols-5 ">
												{filteredArtists.map(({ name, images, id }) => (
													<ArtistChip2
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

function TimeRangeFilter({ includesTop }: { includesTop: boolean }) {
	const submit = useSubmit();

	const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
		submit(event.currentTarget, { replace: true, preventScrollReset: true });
	};

	const itemClassName =
		"rounded-full py-1 px-3 text-sm text-neutral-400 transition-colors hover:border-neutral-600 hover:bg-neutral-600 data-[state=checked]:border-neutral-600 data-[state=checked]:bg-neutral-700";

	return (
		<Form
			method="get"
			onChange={handleChange}
			className="z-0 overflow-x-scroll rounded-br-full rounded-tr-full border border-neutral-700 bg-neutral-800 pl-5 md:overflow-x-auto">
			<input type="hidden" name="includeTop" value={String(includesTop)} />
			<RadioGroup.Root
				defaultValue="medium"
				id="range"
				name="range"
				aria-label="Time range"
				orientation="horizontal"
				loop={false}
				className="flex justify-between gap-x-1">
				<RadioGroup.Item value="short" id="r1" className={itemClassName}>
					<label htmlFor="r1" className="cursor-pointer whitespace-nowrap">
						4 weeks
					</label>
				</RadioGroup.Item>
				<RadioGroup.Item value="medium" id="r2" className={itemClassName}>
					<label htmlFor="r2" className="cursor-pointer whitespace-nowrap">
						6 months
					</label>
				</RadioGroup.Item>
				<RadioGroup.Item value="long" id="r3" className={itemClassName}>
					<label htmlFor="r3" className="cursor-pointer whitespace-nowrap">
						All time
					</label>
				</RadioGroup.Item>
			</RadioGroup.Root>
		</Form>
	);
}
