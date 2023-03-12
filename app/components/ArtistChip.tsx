import { motion, AnimatePresence } from "framer-motion";
import { Check } from "iconoir-react";

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
			className={`flex h-8 w-max items-center gap-x-2 rounded-full border bg-neutral-800 py-1 pl-1 pr-2 transition-colors hover:cursor-pointer hover:bg-neutral-700
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

export function ArtistChip2({
	image,
	text,
	onClick,
	selected,
}: ArtistChipProps) {
	return (
		<div
			onClick={onClick}
			className="flex select-none flex-col items-center gap-y-2">
			<div className="relative">
				<img
					src={image}
					alt={`${text} profile`}
					width={56}
					height={56}
					className="h-14 w-14 cursor-pointer rounded-full object-cover"></img>
				<AnimatePresence>
					{selected && (
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0 }}
							transition={{ duration: 0.1 }}
							className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white">
							<Check color="#1d1d1d" width={18} height={18} strokeWidth={2} />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<p className="text-center text-xs text-white">{text}</p>
		</div>
	);
}
