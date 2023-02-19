import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Plus } from "iconoir-react";
import { useState } from "react";

export function OnboardingModal() {
	const [currentPage, setCurrentPage] = useState(0);

	const nextPage = () => setCurrentPage((page) => page + 1);
	const prevPage = () => setCurrentPage((page) => page - 1);

	const numPages = 3;

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<button>How does it work?</button>
			</Dialog.Trigger>
			<Dialog.Portal forceMount>
				<Dialog.Overlay className="fixed z-10 h-screen w-screen bg-black/50" />
				<Dialog.Content className="fixed top-1/2 left-1/2 z-10 h-max w-10/12 max-w-[640px] -translate-x-1/2 -translate-y-1/2 items-center rounded-xl border border-neutral-700 bg-neutral-800 p-6 focus:outline-none sm:h-[376px] sm:min-h-[376px]">
					<div className="relative flex h-full w-full items-center">
						<button
							type="button"
							onClick={prevPage}
							className={`rounded-xl p-2 transition-colors hover:bg-neutral-600 focus-visible:bg-neutral-600 focus-visible:outline-none ${
								currentPage === 0 ? "invisible" : "visible"
							}`}>
							<ArrowLeft />
						</button>
						<div className="flex h-full flex-grow flex-col items-center gap-y-8">
							<StepOne />
							<Pager pageCount={numPages} currentPage={currentPage} />
						</div>
						<button
							type="button"
							onClick={nextPage}
							className={`rounded-xl p-2 transition-colors hover:bg-neutral-600 focus-visible:bg-neutral-600 focus-visible:outline-none ${
								currentPage === numPages - 1 ? "invisible" : "visible"
							}`}>
							<ArrowRight />
						</button>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
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
		<div className="relative flex flex-grow flex-col items-center gap-y-4">
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
		<div className="relative flex h-full flex-col items-center gap-y-4">
			<h1 className="text-center text-neutral-300">
				Selection your preferred generation model
			</h1>
			<div className="flex flex-grow flex-col items-center justify-center gap-y-4 gap-x-4 sm:flex-row sm:items-center sm:justify-evenly">
				<div className="flex flex-col items-center gap-y-4">
					<h2 className="text-3xl">Basic</h2>
					<ul className="list-disc">
						<li>Item 1</li>
						<li>Item 2</li>
						<li>Item 3</li>
					</ul>
				</div>
				<div className="h-0 w-28 border border-neutral-700 sm:h-28 sm:w-0" />
				<div className="flex flex-col items-center gap-y-4">
					<h2 className="text-3xl font-bold">Studio</h2>
					<ul className="list-disc">
						<li>Item 1</li>
						<li>Item 2</li>
						<li>Item 3</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
