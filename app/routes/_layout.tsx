import { Link, Outlet, useMatches } from "@remix-run/react";

export default function GenerateIndex() {
	const matches = useMatches();
	const selectedRoute = matches[2].pathname;

	return (
		<div className="flex items-center justify-center w-full h-full">
			<div className="flex flex-col w-full max-w-4xl p-6 border rounded-xl border-neutral-600 gap-y-4">
				<div className="flex flex-col gap-y-2">
					<h1 className="text-5xl tracking-tighter">Generate</h1>
					<p>Select one of our generators below.</p>
					<p className="text-xs cursor-pointer text-neutral-400">
						What's the difference? TODO: Add a tooltip element here
					</p>
					<div className="flex p-1 border rounded-full w-max bg-neutral-900 border-neutral-700 gap-x-2">
						<Link
							to="./simple"
							className={`relative px-4 py-1 rounded-full hover:bg-neutral-800 border transition-colors ${
								selectedRoute === "/simple"
									? "border-neutral-500 bg-neutral-700"
									: "border-neutral-900"
							}`}
						>
							Simple
						</Link>
						<Link
							to="./studio"
							className={`relative px-4 py-1 rounded-full hover:bg-neutral-800 border transition-colors ${
								selectedRoute === "/studio"
									? "border-neutral-500 bg-neutral-700"
									: "border-neutral-900"
							}`}
						>
							Studio
						</Link>
					</div>
				</div>
				<Outlet />
			</div>
		</div>
	);
}
