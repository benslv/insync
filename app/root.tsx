import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
	Link,
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useCatch,
} from "@remix-run/react";

import styles from "./tailwind.css";

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "insync",
	viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: styles }];
};

export default function App() {
	return (
		<html lang="en" className="h-full font-sans">
			<head>
				<Meta />
				<Links />
			</head>
			<body className="h-full text-white bg-neutral-900">
				<Outlet />
				<footer className="bg-[#0C0C0C] text-white p-4 h-32 flex flex-col sm:flex-row space-y-2 sm:space-y-0 justify-between">
					<div className="flex flex-col justify-between h-full">
						<p>{`© ${new Date().getFullYear()} insync`}</p>
						<p>
							Crafted by{" "}
							<a
								href="https://twitter.com/bensilverman_"
								target="_blank"
								rel="noreferrer"
								className="text-green-500 transition-colors hover:text-green-400"
							>
								Ben Silverman
							</a>{" "}
							&{" "}
							<a
								href="https://twitter.com/hieemeli"
								target="_blank"
								rel="noreferrer"
								className="text-green-500 transition-colors hover:text-green-400"
							>
								Eemeli Ruohomäki
							</a>
						</p>
					</div>
					<div className="flex space-x-2">
						<p>Data from</p>
						<img
							src="/images/Spotify_Logo_RGB_Green.png"
							alt="Spotify logo"
							className="h-6"
							height={24}
						/>
					</div>
				</footer>
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}

export function CatchBoundary() {
	const caught = useCatch();
	console.log(caught);

	return (
		<html lang="en" className="h-full font-sans">
			<head>
				<title>Oops!</title>
				<Meta />
				<Links />
			</head>
			<body className="flex flex-col h-full overflow-hidden text-white bg-neutral-900">
				<div className="flex flex-col items-center justify-center flex-1 w-full h-full overflow-hidden gap-y-4">
					<h1 className="text-3xl sm:text-5xl">Oops!</h1>
					<p>Something went wrong.</p>
					<p>
						Error {caught.status}:{" "}
						<code className="bg-[#0C0C0C] px-2 py-1 rounded-lg">
							{caught.statusText}
						</code>
					</p>
					<Link
						className="px-4 py-2 text-sm font-bold uppercase transition-colors bg-green-500 rounded-full hover:bg-green-400 text-neutral-900 w-max"
						to="/"
					>
						Back Home
					</Link>
				</div>
				<footer className="bg-[#0C0C0C] text-white z-10 p-4 h-32 flex  flex-col sm:flex-row space-y-2 sm:space-y-0 justify-between">
					<div className="flex flex-col justify-between h-full">
						<p>{`© ${new Date().getFullYear()} insync`}</p>
						<p>
							Crafted by{" "}
							<a
								href="https://twitter.com/bensilverman_"
								target="_blank"
								rel="noreferrer"
								className="text-green-500 transition-colors hover:text-green-400"
							>
								Ben Silverman
							</a>{" "}
							&{" "}
							<a
								href="https://twitter.com/hieemeli"
								target="_blank"
								rel="noreferrer"
								className="text-green-500 transition-colors hover:text-green-400"
							>
								Eemeli Ruohomäki
							</a>
						</p>
					</div>
					<div className="flex space-x-2">
						<p>Data from</p>
						<img
							src="/images/Spotify_Logo_RGB_Green.png"
							alt="Spotify logo"
							className="h-6"
							height={24}
						/>
					</div>
				</footer>
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
