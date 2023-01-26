/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{ts,tsx,jsx,js}"],
	theme: {
		fontFamily: {
			sans: ["Inter", "sans"],
		},
		extend: {
			boxShadow: {
				tile: "0px 5px 5px 0px rgba(255, 255, 255, 0.25) inset",
			},
		},
	},
	plugins: [],
};
