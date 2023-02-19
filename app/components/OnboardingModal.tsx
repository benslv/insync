import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Plus } from "iconoir-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Label } from "./Label";
import { NumberInput } from "./NumberInput";
import { RangeSlider } from "./Range";
import { RangeGroup } from "./RangeGroup";
import { TextInput } from "./TextInput";

export function OnboardingModal() {
	const [currentPage, setCurrentPage] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

	const nextPage = () =>
		setCurrentPage((page) => Math.min(numPages - 1, page + 1));
	const prevPage = () => setCurrentPage((page) => Math.max(0, page - 1));

	useEffect(() => {
		const shouldOpenModal = localStorage.getItem("first_time");

		if (shouldOpenModal === null) {
			setIsOpen(true);
		} else {
			setIsOpen(JSON.parse(shouldOpenModal));
		}
	}, []);

	const pages = [
		<StepOne key={0} />,
		<StepTwo key={1} />,
		<StepThree key={2} />,
		<StepFour key={4} />,
	];

	const numPages = pages.length;

	return (
		<Dialog.Root
			open={isOpen}
			onOpenChange={(open) => {
				setCurrentPage(0);
				setIsOpen(open);
			}}>
			<Dialog.Trigger asChild>
				<button className="text-sm italic text-green-400">
					How does it work?
				</button>
			</Dialog.Trigger>
			<AnimatePresence>
				{isOpen ? (
					<Dialog.Portal forceMount>
						<Dialog.Overlay
							className="fixed z-10 h-screen w-screen bg-black/50"
							asChild>
							<motion.div
								animate={{ opacity: 1 }}
								initial={{ opacity: 0 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.1 }}
							/>
						</Dialog.Overlay>
						<Dialog.Content
							asChild
							className="fixed top-1/2 left-1/2 z-10 h-max w-10/12 max-w-[640px] -translate-x-1/2 -translate-y-1/2 items-center rounded-xl border border-neutral-700 bg-neutral-800 px-2 py-6 focus:outline-none sm:h-[376px] sm:min-h-[376px] sm:p-6">
							<motion.div
								animate={{ opacity: 1 }}
								initial={{ opacity: 0 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.05 }}>
								<div className="relative flex h-full w-full items-center">
									<button
										type="button"
										onClick={prevPage}
										className={`rounded-xl p-2 transition-all hover:bg-neutral-600 focus-visible:bg-neutral-600 focus-visible:outline-none ${
											currentPage === 0
												? "cursor-default opacity-0"
												: "cursor-pointer opacity-100"
										}`}>
										<ArrowLeft />
									</button>
									<div className="flex h-full flex-grow flex-col items-center gap-y-8">
										<motion.div
											animate={{ opacity: 1 }}
											initial={{ opacity: 0 }}
											exit={{ opacity: 0 }}
											className="h-full w-full">
											{pages[currentPage]}
										</motion.div>
										<Pager pageCount={numPages} currentPage={currentPage} />
									</div>
									<button
										type="button"
										onClick={nextPage}
										className={`rounded-xl p-2 transition-all hover:bg-neutral-600 focus-visible:bg-neutral-600 focus-visible:outline-none ${
											currentPage === numPages - 1
												? "cursor-default opacity-0"
												: "cursor-pointer opacity-100"
										}`}>
										<ArrowRight />
									</button>
								</div>
							</motion.div>
						</Dialog.Content>
					</Dialog.Portal>
				) : null}
			</AnimatePresence>
		</Dialog.Root>
	);
}

function Pager({
	pageCount,
	currentPage,
}: {
	pageCount: number;
	currentPage: number;
}) {
	return (
		<div className="flex w-max gap-x-2">
			{Array(pageCount)
				.fill(undefined)
				.map((_, i) => (
					<div
						key={i}
						className={`h-1 w-6 rounded-full transition-colors ${
							currentPage === i ? "bg-neutral-500" : "bg-neutral-700"
						}`}
					/>
				))}
		</div>
	);
}

function StepOne() {
	return (
		<div className="relative flex h-full flex-grow flex-col items-center gap-y-4">
			<h1 className="text-center text-neutral-300">
				Connect your Spotify account with insync
			</h1>
			<div className="flex flex-grow flex-col items-center justify-center gap-y-4 gap-x-4 sm:flex-row sm:items-center sm:justify-between">
				<h2 className="text-5xl">insync</h2>
				<Plus height={90} width={90} strokeWidth={0.2} />
				<img
					src="/images/Spotify_Logo_RGB_Green.png"
					alt="Spotify logo"
					className="h-10"
					height={40}
				/>
			</div>
		</div>
	);
}

function StepTwo() {
	return (
		<div className="relative flex h-full flex-col items-center gap-y-12">
			<h1 className="text-center text-neutral-300">
				Select your preferred generation model
			</h1>
			<div className="flex flex-grow flex-col items-start justify-center gap-y-4 gap-x-4 sm:flex-row sm:items-start sm:justify-evenly">
				<div className="flex flex-col items-center gap-y-4">
					<h2 className="text-3xl">Basic</h2>
					<ul className="list-disc pl-4">
						<li>Simpler to use!</li>
						<li>Three playlist types: Popular, Latest and Random.</li>
					</ul>
				</div>
				<div className="h-0 w-28 self-center border border-neutral-700 sm:h-28 sm:w-0" />
				<div className="flex flex-col items-center gap-y-4">
					<h2 className="text-3xl font-bold">Studio</h2>
					<ul className="list-disc pl-4">
						<li>Select up to 5 artists you follow.</li>
						<li>Tweak parameters to fine-tune your playlist's vibe.</li>
						<li>Up to 150 tracks per playlist!</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

function StepThree() {
	return (
		<div className="relative flex h-full flex-col items-center gap-y-4">
			<h1 className="text-center text-neutral-300">
				Tweak parameters to your liking
			</h1>
			<div className="flex flex-grow flex-col items-center justify-center gap-y-4 gap-x-4 sm:flex-row sm:items-center sm:justify-evenly">
				<div className="flex flex-col items-center gap-y-4 rounded-xl border border-neutral-700 bg-neutral-900 p-4 shadow">
					<div className="w-full">
						<Label>Playlist Name</Label>
						<TextInput
							id="name"
							name="name"
							placeholder="insync mixtape"
							className="mt-1 w-full"
						/>
					</div>
					<div className="flex w-full items-center justify-between gap-x-4">
						<Label>How many tracks? (max. 100)</Label>
						<NumberInput
							className="hide-spinner w-12"
							name="track_count"
							min={1}
							max={100}
						/>
					</div>
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
				</div>
			</div>
		</div>
	);
}

function StepFour() {
	return (
		<div className="relative flex h-full flex-grow flex-col items-center gap-y-4">
			<h1 className="text-center text-xl text-neutral-300">All done!</h1>
			<div className="flex flex-grow flex-col items-center justify-center gap-y-2 text-center">
				<p>
					That's all there is to it! Click the button below to close this popup,
					then select which generator you want to start with.
				</p>
				<p>
					If this is your first time using insync, why not check out the Basic
					generator first?
				</p>
			</div>
			<Dialog.Close asChild>
				<button
					type="button"
					onClick={() => {
						localStorage.setItem("first_time", "false");
					}}
					className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold uppercase text-neutral-900 transition-colors hover:bg-green-400">
					Get Started
				</button>
			</Dialog.Close>
		</div>
	);
}