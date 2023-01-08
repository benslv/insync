import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";

import styles from "./tailwind.css";

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "New Remix App",
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
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
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
			</body>
		</html>
	);
}
