import { Link, Outlet, useMatches } from "@remix-run/react";
import { LongArrowUpLeft } from "iconoir-react";

export default function GenerateIndex() {
	const matches = useMatches();
	const selectedRoute = matches[2].pathname;

	return (
		<div className="flex h-full w-full flex-col items-center justify-between py-8">
			<div className="flex flex-col items-center gap-y-2">
				<p className="text-sm text-neutral-400">Choose generation method:</p>
				<div className="flex w-max gap-x-1 rounded-lg border border-neutral-600 bg-neutral-900 p-1">
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
			<div className="mx-2 flex w-fit flex-col items-center gap-y-4 rounded-xl border border-neutral-600 p-6">
				<h1 className="text-5xl tracking-tighter">Generate</h1>

				<Outlet />
			</div>
			<Link
				to="/"
				className="flex h-max w-max text-neutral-500 transition-all duration-150 hover:text-neutral-200">
				<LongArrowUpLeft />
				Go back
			</Link>
		</div>
	);
}
