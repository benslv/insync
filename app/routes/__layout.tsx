import { Link, Outlet, useMatches } from "@remix-run/react";
import { LongArrowUpLeft } from "iconoir-react";
import { OnboardingModal } from "~/components/OnboardingModal";

export default function GenerateIndex() {
	const matches = useMatches();
	const selectedRoute = matches[2].pathname;

	return (
		<div className="relative flex flex-col items-center w-full h-full min-h-screen py-8 justify-evenly gap-y-8">
			<div className="flex flex-col items-center gap-4">
				<div className="flex flex-col items-center gap-2">
					<p className="text-sm text-neutral-400">Choose generation method:</p>
					<div className="flex p-1 border rounded-lg w-max gap-x-1 border-neutral-600 bg-neutral-900">
						<Link
							to="./basic"
							className={`rounded-md border px-2 py-1 align-baseline transition-colors hover:bg-neutral-800 ${
								selectedRoute === "/basic"
									? "border-neutral-500 bg-neutral-700"
									: "border-neutral-900"
							}`}>
							Basic
						</Link>
						<Link
							to="./studio"
							className={`rounded-md border px-2 py-1 align-baseline transition-colors hover:bg-neutral-800 ${
								selectedRoute === "/studio"
									? "border-neutral-500 bg-neutral-700"
									: "border-neutral-900"
							}`}>
							Studio
						</Link>
					</div>
				</div>
				<OnboardingModal />
			</div>

			<Outlet />

			<Link
				to="/"
				className="flex transition-all duration-150 h-max w-max text-neutral-500 hover:text-neutral-200">
				<LongArrowUpLeft />
				Go back
			</Link>
		</div>
	);
}
