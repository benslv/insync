import { Label } from "./Label";

type RangeGroupProps = {
	label: string;
	leftText: string;
	rightText: string;
	children: React.ReactNode;
};

export function RangeGroup({
	label,
	leftText,
	rightText,
	children,
}: RangeGroupProps) {
	return (
		<div className="w-full">
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
