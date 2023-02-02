import type { ActionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { InputHTMLAttributes } from "react";

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
				<NumberInput className="w-16 hide-spinner" min={1} max={100} />
			</div>
			<RangeGroup label="Tempo (BPM)" leftText="30" rightText="300">
				<RangeSlider
					name="energy"
					id="energy"
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
					max={1}
					step={0.01}
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
