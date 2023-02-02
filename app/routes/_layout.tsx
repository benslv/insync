import { Link, Outlet, useMatches } from "@remix-run/react";
import { LongArrowUpLeft } from "iconoir-react";

export default function GenerateIndex() {
	const matches = useMatches();
	const selectedRoute = matches[2].pathname;

	return (
		<div className="flex flex-col items-center justify-between w-full h-full py-8">
			<div className="flex flex-col items-center gap-y-2">
				<p className="text-sm text-neutral-400">
					Choose generation method:
				</p>
				<div className="flex p-1 border rounded-lg w-max bg-neutral-900 border-neutral-600 gap-x-1">
					<Link
						to="./basic"
						className={`px-2 align-baseline py-1 rounded-md hover:bg-neutral-800 border transition-colors ${
							selectedRoute === "/basic"
								? "border-neutral-500 bg-neutral-700"
								: "border-neutral-900"
						}`}
					>
						Basic
					</Link>
					<Link
						to="./studio"
						className={`px-2 align-baseline py-1 rounded-md hover:bg-neutral-800 border transition-colors ${
							selectedRoute === "/studio"
								? "border-neutral-500 bg-neutral-700"
								: "border-neutral-900"
						}`}
					>
						Studio
					</Link>
				</div>
			</div>
			<div className="flex flex-col items-center p-6 mx-2 border w-fit rounded-xl border-neutral-600 gap-y-4">
				<h1 className="text-5xl tracking-tighter">Generate</h1>

				<Outlet />
			</div>
			<Link
				to="/"
				className="flex transition-all duration-150 text-neutral-500 h-max w-max hover:text-neutral-200"
			>
				<LongArrowUpLeft />
				Go back
			</Link>
		</div>
	);
}
