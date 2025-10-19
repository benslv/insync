import {
	type RouteConfig,
	index,
	layout,
	route,
} from "@react-router/dev/routes";

export default [
	index("routes/_index.tsx"),
	layout("routes/_layout.tsx", [
		route("filter", "routes/filter.tsx"),
		route("playlist", "routes/playlist.tsx"),
		route("basic", "routes/_layout.basic.tsx"),
		route("studio", "routes/_layout.studio.tsx"),
	]),
	route("logout", "routes/logout.tsx"),
] satisfies RouteConfig;
