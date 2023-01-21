import * as RadioGroup from "@radix-ui/react-radio-group";
import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { z } from "zod";

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
	session.set("playlist_id", playlistId);

	throw redirect("/playlist", {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
}

export default function BasicPage() {
	const errors = useActionData<typeof action>();
	const transition = useTransition();

	const isGenerating =
		transition.state === "submitting" &&
		transition.submission.formData.get("_intent") === "generate";

	const generateButtonText = isGenerating
		? "Generating..."
		: transition.state === "loading"
		? "Loading..."
		: "Generate";

	return (
		<Form method="post" className="flex flex-col w-max gap-y-4">
			<label className="flex flex-col w-full gap-y-2">
				<span className="text-sm text-neutral-400">Playlist Name:</span>
				<input
					type="text"
					name="playlist_title"
					id="playlist_title"
					autoComplete="off"
					placeholder="insync mixtape"
					className="px-4 py-2 transition-colors border rounded-full bg-neutral-800 border-neutral-500 focus:bg-neutral-600"
				/>
			</label>
			<PlaylistTypeGroup />
			<button
				type="submit"
				className="w-full px-4 py-2 text-sm font-bold uppercase transition-colors bg-green-500 rounded-full hover:bg-green-400 text-neutral-900 sm:w-max"
			>
				{generateButtonText}
			</button>
		</Form>
	);
}

function PlaylistTypeGroup() {
	const itemClassName =
		"relative px-4 py-1 rounded-full hover:bg-neutral-800 data-[state=checked]:bg-neutral-700 border border-neutral-900 transition-colors data-[state=checked]:border-neutral-500";

	return (
		<label
			htmlFor="selection"
			className="flex flex-col w-full text-sm text-neutral-400 gap-y-2"
		>
			Selection method:
			<RadioGroup.Root
				defaultValue="popular"
				loop={false}
				aria-label="Playlist type"
				orientation="horizontal"
				id="selection"
				name="selection"
				className="flex p-1 text-base text-white border rounded-full bg-neutral-900 border-neutral-700 gap-x-2 "
			>
				<RadioGroup.Item
					value="popular"
					id="r1"
					className={itemClassName}
				>
					<label htmlFor="r1" className="cursor-pointer">
						Popular
					</label>
				</RadioGroup.Item>
				<RadioGroup.Item
					value="latest"
					id="r2"
					className={itemClassName}
				>
					<label htmlFor="r2" className="cursor-pointer">
						Latest
					</label>
				</RadioGroup.Item>
				<RadioGroup.Item
					value="random"
					id="r3"
					className={itemClassName}
				>
					<label htmlFor="r3" className="cursor-pointer">
						Random
					</label>
				</RadioGroup.Item>
			</RadioGroup.Root>
		</label>
	);
}
