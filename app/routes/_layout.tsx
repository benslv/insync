import { Link, Outlet, useMatches } from "@remix-run/react";

export default function GenerateIndex() {
	const matches = useMatches();
	const selectedRoute = matches[2].pathname;

	return (
		<div className="flex flex-col items-center justify-center w-full h-full gap-y-4">
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
			<div className="flex flex-col max-w-4xl p-6 border w-max rounded-xl border-neutral-600 gap-y-4">
				<div className="flex flex-col gap-y-2">
					<h1 className="text-5xl tracking-tighter">Generate</h1>

					<Outlet />
				</div>
			</div>
		</div>
	);
}
