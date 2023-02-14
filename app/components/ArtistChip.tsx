type ArtistChipProps = {
	image: string;
	text: string;
	selected: boolean;
	onClick: () => void;
};

export function ArtistChip({
	image,
	text,
	onClick,
	selected,
}: ArtistChipProps) {
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
