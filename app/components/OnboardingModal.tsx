import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Plus, HelpCircle } from "iconoir-react";
import { useEffect, useState } from "react";

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

	/* useEffect(() => {
		const shouldOpenModal = localStorage.getItem("first_time");

		if (shouldOpenModal === null) {
			setIsOpen(true);
		} else {
			setIsOpen(JSON.parse(shouldOpenModal));
		}
	}, []); */

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
				<button className="flex items-center gap-2 text-sm transition duration-150 text-neutral-400 hover:text-neutral-200">
					<HelpCircle />
					How does it work?
				</button>
			</Dialog.Trigger>
			<AnimatePresence>
				{isOpen ? (
					<Dialog.Portal forceMount>
						<Dialog.Overlay
							className="fixed z-10 w-screen h-screen bg-black/50"
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
								<div className="flex items-center justify-between w-full h-full gap-4">
									<button
										type="button"
										onClick={prevPage}
										className={`h-max rounded-xl p-2 transition-all hover:bg-neutral-600 focus-visible:bg-neutral-600 focus-visible:outline-none ${
											currentPage === 0
												? "cursor-default opacity-0"
												: "cursor-pointer opacity-100"
										}`}>
										<ArrowLeft />
									</button>
									<div className="flex flex-col items-center flex-grow w-full h-full gap-y-8">
										<motion.div
											animate={{ opacity: 1 }}
											initial={{ opacity: 0 }}
											exit={{ opacity: 0 }}
											className="w-full h-full">
											{pages[currentPage]}
										</motion.div>
										<Pager pageCount={numPages} currentPage={currentPage} />
									</div>
									<button
										type="button"
										onClick={nextPage}
										className={`h-max rounded-xl p-2 transition-all hover:bg-neutral-600 focus-visible:bg-neutral-600 focus-visible:outline-none ${
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
		<div className="relative flex flex-col items-center flex-grow h-full gap-y-4">
			<h1 className="text-center text-neutral-300">
				Connect your Spotify account with insync
			</h1>
			<div className="flex flex-col items-center justify-center flex-grow gap-y-4 gap-x-4 sm:flex-row sm:items-center sm:justify-between">
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
		<div className="flex flex-col items-center w-full h-full gap-y-12">
			<h1 className="text-center text-neutral-300">
				Select your preferred generation model
			</h1>
			<div className="flex flex-col items-start justify-center flex-grow w-full gap-y-4 gap-x-4 sm:flex-row sm:items-start sm:justify-evenly">
				<div className="flex flex-col items-center w-full gap-y-4">
					<h2 className="text-3xl">Basic</h2>
					<div className="space-y-2 text-center text-neutral-300">
						<p>Simpler to use!</p>
						<p>Three playlist types: Popular, Latest and Random.</p>
					</div>
				</div>
				<div className="self-center h-0 border w-28 border-neutral-700 sm:h-full sm:w-0" />
				<div className="flex flex-col items-center w-full gap-y-4">
					<h2 className="text-3xl font-bold tracking-tighter">Studio</h2>
					<div className="space-y-2 text-center text-neutral-300">
						<p>Select up to 5 artists you follow.</p>
						<p>Tweak parameters to fine-tune your playlist's vibe.</p>
						<p>Up to 150 tracks per playlist!</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function StepThree() {
	return (
		<div className="relative flex flex-col items-center h-full gap-y-4">
			<h1 className="text-center text-neutral-300">
				Tweak parameters to your liking
			</h1>
			<div className="flex flex-col items-center justify-center w-full h-full gap-4">
				<div className="flex flex-col gap-4 p-4 w-max rounded-xl bg-neutral-700">
					<div className="relative w-32 h-2 overflow-hidden rounded-full bg-neutral-600">
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: "100%" }}
							exit={{ width: 0 }}
							transition={{
								repeat: Infinity,
								repeatType: "reverse",
								duration: 4,
							}}
							className="absolute inset-0 h-full bg-green-500 rounded-full"
						/>
					</div>
					<div className="relative w-32 h-2 overflow-hidden rounded-full bg-neutral-600">
						<motion.div
							initial={{ width: "25%" }}
							animate={{ width: "75%" }}
							transition={{
								repeat: Infinity,
								repeatType: "reverse",
								duration: 3,
							}}
							className="absolute inset-0 h-full bg-green-500 rounded-full"
						/>
					</div>
					<div className="relative w-32 h-2 overflow-hidden rounded-full bg-neutral-600">
						<motion.div
							initial={{ width: "90%" }}
							animate={{ width: "10%" }}
							transition={{
								repeat: Infinity,
								repeatType: "reverse",
								duration: 2,
							}}
							className="absolute inset-0 h-full bg-green-500 rounded-full"
						/>
					</div>
				</div>
				<div className="relative flex gap-4 p-4 rounded-full w-max bg-neutral-700">
					{/* three bars  */}
					<div className="w-12 h-4 rounded-full bg-neutral-600" />
					<div className="w-12 h-4 rounded-full bg-neutral-600" />
					<div className="w-12 h-4 rounded-full bg-neutral-600" />

					{/* moving highlight bar */}
					<motion.div className="absolute flex items-center transform inset-y-1 inset-x-2">
						<div className="w-16 h-6 rounded-full bg-white/5" />
					</motion.div>
				</div>
			</div>
		</div>
	);
}

function StepFour() {
	return (
		<div className="relative flex flex-col items-center flex-grow h-full gap-y-4">
			<h1 className="text-xl text-center text-neutral-300">All done!</h1>
			<div className="flex flex-col items-center justify-center flex-grow text-center gap-y-2">
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
					className="px-4 py-2 text-sm font-bold uppercase transition-colors bg-green-500 rounded-full text-neutral-900 hover:bg-green-400">
					Get Started
				</button>
			</Dialog.Close>
		</div>
	);
}
