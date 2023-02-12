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
	title: "insync - Stay in sync with the music you love",
	description:
		"insync automatically generates playlists with music from your favourite artists to help you rediscover the music you love!",
	viewport: "width=device-width,initial-scale=1",
	"og:type": "website",
	"og:url": "https://insync.vercel.app",
	"og:title": "insync - Stay in sync with the music you love",
	"og:description":
		"insync automatically generates playlists with music from your favourite artists to help you rediscover the music you love!",
	"og:image": "https://i.imgur.com/69dTjNg.png",

	"twitter:card": "summary_large_image",
	"twitter:url": "https://insync.vercel.app",
	"twitter:title": "insync - Stay in sync with the music you love",
	"twitter:description":
		"insync automatically generates playlists with music from your favourite artists to help you rediscover the music you love!",
	"twitter:image": "https://i.imgur.com/69dTjNg.png",
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
			<body className="h-full bg-neutral-900 text-white">
				<Outlet />
				<footer className="flex h-32 flex-col justify-between space-y-2 bg-[#0C0C0C] p-4 text-white sm:flex-row sm:space-y-0">
					<div className="flex h-full flex-col justify-between">
						<p>{`© ${new Date().getFullYear()} insync`}</p>
						<p>
							Crafted by{" "}
							<a
								href="https://twitter.com/bensilverman_"
								target="_blank"
								rel="noreferrer"
								className="text-green-500 transition-colors hover:text-green-400">
								Ben Silverman
							</a>{" "}
							&{" "}
							<a
								href="https://twitter.com/hieemeli"
								target="_blank"
								rel="noreferrer"
								className="text-green-500 transition-colors hover:text-green-400">
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
			<body className="flex h-full flex-col overflow-hidden bg-neutral-900 text-white">
				<div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-y-4 overflow-hidden">
					<h1 className="text-3xl sm:text-5xl">Oops!</h1>
					<p>Something went wrong.</p>
					<p>
						Error {caught.status}:{" "}
						<code className="rounded-lg bg-[#0C0C0C] px-2 py-1">
							{caught.statusText}
						</code>
					</p>
					<Link
						className="w-max rounded-full bg-green-500 px-4 py-2 text-sm font-bold uppercase text-neutral-900 transition-colors hover:bg-green-400"
						to="/">
						Back Home
					</Link>
				</div>
				<footer className="z-10 flex h-32 flex-col justify-between space-y-2  bg-[#0C0C0C] p-4 text-white sm:flex-row sm:space-y-0">
					<div className="flex h-full flex-col justify-between">
						<p>{`© ${new Date().getFullYear()} insync`}</p>
						<p>
							Crafted by{" "}
							<a
								href="https://twitter.com/bensilverman_"
								target="_blank"
								rel="noreferrer"
								className="text-green-500 transition-colors hover:text-green-400">
								Ben Silverman
							</a>{" "}
							&{" "}
							<a
								href="https://twitter.com/hieemeli"
								target="_blank"
								rel="noreferrer"
								className="text-green-500 transition-colors hover:text-green-400">
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
