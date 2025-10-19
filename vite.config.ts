import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";

// const { createRoutesFromFolders } = require("@remix-run/v1-route-convention");

// /** @type {import('@remix-run/dev').AppConfig} */
// module.exports = {
// 	routes(defineRoutes) {
// 		return createRoutesFromFolders(defineRoutes);
// 	},
// };

installGlobals();

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [
		remix({
			ignoredRouteFiles: ["**/*.css"],
		}),
	],
});
