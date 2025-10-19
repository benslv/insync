import { Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import "./app.css";

export const meta = () => {
	return [
		{ charset: "utf-8" },
		{ title: "insync - Stay in sync with the music you love" },
		{
			name: "description",
			content:
				"insync automatically generates playlists with music from your favourite artists to help you rediscover the music you love!",
		},
		{ name: "viewport", content: "width=device-width,initial-scale=1" },
		{ property: "og:type", content: "website" },
		{ property: "og:url", content: "https://insync.vercel.app" },
		{
			property: "og:title",
			content: "insync - Stay in sync with the music you love",
		},
		{
			property: "og:description",
			content:
				"insync automatically generates playlists with music from your favourite artists to help you rediscover the music you love!",
		},
		{ property: "og:image", content: "https://i.imgur.com/69dTjNg.png" },

		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:url", content: "https://insync.vercel.app" },
		{
			name: "twitter:title",
			content: "insync - Stay in sync with the music you love",
		},
		{
			name: "twitter:description",
			content:
				"insync automatically generates playlists with music from your favourite artists to help you rediscover the music you love!",
		},
		{ name: "twitter:image", content: "https://i.imgur.com/69dTjNg.png" },
	];
};

export default function App() {
	return (
		<html lang="en" className="h-full font-sans">
			<head>
				<Meta />
			</head>
			<body className="flex h-max flex-col bg-neutral-900 text-white">
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
			</body>
		</html>
	);
}

// export function CatchBoundary() {
// 	const caught = useCatch();
// 	console.log(caught);

// 	return (
// 		<html lang="en" className="h-full font-sans">
// 			<head>
// 				<title>Oops!</title>
// 				<Meta />
// 				<Links />
// 			</head>
// 			<body className="flex h-full flex-col overflow-hidden bg-neutral-900 text-white">
// 				<div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-y-4 overflow-hidden">
// 					<h1 className="text-3xl sm:text-5xl">Oops!</h1>
// 					<p>Something went wrong.</p>
// 					<p>
// 						Error {caught.status}:{" "}
// 						<code className="rounded-lg bg-[#0C0C0C] px-2 py-1">
// 							{caught.statusText}
// 						</code>
// 					</p>
// 					<Link
// 						className="w-max rounded-full bg-green-500 px-4 py-2 text-sm font-bold uppercase text-neutral-900 transition-colors hover:bg-green-400"
// 						to="/">
// 						Back Home
// 					</Link>
// 				</div>
// 				<footer className="z-10 flex h-32 flex-col justify-between space-y-2  bg-[#0C0C0C] p-4 text-white sm:flex-row sm:space-y-0">
// 					<div className="flex h-full flex-col justify-between">
// 						<p>{`© ${new Date().getFullYear()} insync`}</p>
// 						<p>
// 							Crafted by{" "}
// 							<a
// 								href="https://twitter.com/bensilverman_"
// 								target="_blank"
// 								rel="noreferrer"
// 								className="text-green-500 transition-colors hover:text-green-400">
// 								Ben Silverman
// 							</a>{" "}
// 							&{" "}
// 							<a
// 								href="https://twitter.com/hieemeli"
// 								target="_blank"
// 								rel="noreferrer"
// 								className="text-green-500 transition-colors hover:text-green-400">
// 								Eemeli Ruohomäki
// 							</a>
// 						</p>
// 					</div>
// 					<div className="flex space-x-2">
// 						<p>Data from</p>
// 						<img
// 							src="/images/Spotify_Logo_RGB_Green.png"
// 							alt="Spotify logo"
// 							className="h-6"
// 							height={24}
// 						/>
// 					</div>
// 				</footer>
// 				<Scripts />
// 			</body>
// 		</html>
// 	);
// }
