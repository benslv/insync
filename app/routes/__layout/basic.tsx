import * as RadioGroup from "@radix-ui/react-radio-group";
import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Label } from "~/components/Label";
import { TextInput } from "~/components/TextInput";

import { generatePlaylist } from "~/models/generate.server";
import { commitSession, getSession } from "~/sessions";

export async function action({ request }: ActionArgs) {
	const formData = await request.formData();

	const selection = z
		.union([z.literal("popular"), z.literal("latest"), z.literal("random")])
		.catch("popular")
		.parse(formData.get("selection"));

	const playlistTitle = z
		.string()
		.trim()
		.min(1)
		.catch("insync mixtape")
		.parse(formData.get("playlist_title"));

	console.log("selection >>>", selection);
	console.log("playlistTitle >>> ", playlistTitle);

	const generateResult = await generatePlaylist(request, {
		selection,
		title: playlistTitle,
	});

	if (!generateResult.ok) {
		const message = generateResult.message;

		return json({ error: true, message });
	}

	const session = await getSession(request.headers.get("Cookie"));

	const playlistId = generateResult.playlistId;

	throw redirect(`/playlist?id=${playlistId}`, {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
}

export default function BasicPage() {
	const errors = useActionData<typeof action>();
	const transition = useTransition();

	const isGenerating = transition.state === "submitting";

	const generateButtonText = isGenerating
		? "Generating..."
		: transition.state === "loading"
		? "Loading..."
		: "Generate";

	return (
		<div className="mx-4 flex max-w-lg flex-col gap-y-4 rounded-xl border border-neutral-700 p-6">
			<p>
				Create playlists based on the top songs from artists you follow on
				Spotify!
			</p>
			<details className="rounded-lg border border-neutral-700 bg-neutral-800 p-2 text-sm">
				<summary className="cursor-pointer">
					What are the selection methods?
				</summary>
				<p className="text-neutral-400">
					Pick a selection method to change how your playlist is generated.
				</p>
				<ul className="mt-2 flex flex-col gap-y-2">
					<li>
						🔥 <b>Popular</b> - Use the most popular song from each artist.
					</li>
					<li>
						🕒 <b>Latest</b> - Create a playlist of the latest releases!
					</li>
					<li>
						🎲 <b>Random</b> - Pot luck! Pick a random song from each artist.
						Maybe you'll discover some old favourites?
					</li>
				</ul>
			</details>
			<Form
				method="post"
				className="flex w-full flex-col items-center gap-y-4 self-center sm:w-max">
				<Label htmlFor="playlist_title" className="self-start">
					Playlist Name:
				</Label>
				<TextInput
					name="playlist_title"
					id="playlist_title"
					autoComplete="off"
					placeholder="insync mixtape"
					className="w-full"
				/>
				<PlaylistTypeGroup />
				<div className="flex items-center gap-x-2">
					<button
						type="submit"
						disabled={isGenerating}
						className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold uppercase text-neutral-900 transition-colors hover:bg-green-400">
						{generateButtonText}
					</button>
					{isGenerating ? (
						<motion.div
							initial={{ x: -50, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}>
							<Spinner />
						</motion.div>
					) : null}
				</div>
			</Form>
			{errors ? (
				<motion.p
					initial={{
						opacity: 0,
						y: -50,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
					className="rounded-lg border border-red-300 bg-red-300/25 px-3 py-1">
					{errors.message}
				</motion.p>
			) : null}
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

function PlaylistTypeGroup() {
	const itemClassName =
		"relative px-4 py-1 rounded-xl sm:rounded-full hover:bg-neutral-800 data-[state=checked]:bg-neutral-700 border border-neutral-900 transition-colors data-[state=checked]:border-neutral-500";

	return (
		<>
			<Label htmlFor="selection" className="self-start">
				Selection method:
			</Label>
			<RadioGroup.Root
				defaultValue="popular"
				loop={false}
				aria-label="Playlist type"
				orientation="horizontal"
				id="selection"
				name="selection"
				className="flex w-full flex-col gap-y-1 rounded-2xl border border-neutral-700 bg-neutral-900 p-1 text-base text-white sm:flex-row sm:gap-y-0 sm:gap-x-2 sm:rounded-full ">
				<RadioGroup.Item value="popular" id="r1" className={itemClassName}>
					<label htmlFor="r1" className="cursor-pointer">
						Popular
					</label>
				</RadioGroup.Item>
				<RadioGroup.Item value="latest" id="r2" className={itemClassName}>
					<label htmlFor="r2" className="cursor-pointer">
						Latest
					</label>
				</RadioGroup.Item>
				<RadioGroup.Item value="random" id="r3" className={itemClassName}>
					<label htmlFor="r3" className="cursor-pointer">
						Random
					</label>
				</RadioGroup.Item>
			</RadioGroup.Root>
		</>
	);
}
