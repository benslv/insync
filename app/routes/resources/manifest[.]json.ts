import { json } from "react-router";

export const loader = () => {
	return json(
		{
			short_name: "insync",
			name: "insync",
			start_url: "/",
			display: "standalone",
			background_color: "#171717",
			theme_color: "#22C55E",
			icons: [],
		},
		{
			headers: {
				"Cache-Control": "public, max-age=600",
			},
		}
	);
};
