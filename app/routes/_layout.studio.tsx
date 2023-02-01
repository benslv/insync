import type { ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { Label } from "~/components/Label";
import { NumberInput } from "~/components/NumberInput";
import { RangeSlider } from "~/components/Range";
import { TextInput } from "~/components/TextInput";

export async function action({ request }: ActionArgs) {
	const formData = await request.formData();

	console.log(formData.get("name"));

	return null;
}

export default function StudioPage() {
	return (
		<Form method="post" className="flex flex-col gap-y-4">
			<div>
				<Label htmlFor="name">Name</Label>
				<TextInput
					id="name"
					name="name"
					placeholder="insync mixtape"
					className="w-full mt-1"
				/>
			</div>
			<div>
				<NumberInput />
			</div>
			<div>
				<Label>BPM</Label>
				<RangeSlider name="energy" id="energy" />
				<p className="text-xs italic text-neutral-400">
					How do you like your tempo?
				</p>
			</div>
			<div>
				<Label>Popularity</Label>
				<RangeSlider name="energy" id="energy" />
				<p className="text-xs italic text-neutral-400">
					Chart toppers or obscure discoveries?
				</p>
			</div>
			<div>
				<Label>Energy</Label>
				<RangeSlider name="energy" id="energy" />
				<p className="text-xs italic text-neutral-400">
					Chilling out or ramping up?
				</p>
			</div>
		</Form>
	);
}
