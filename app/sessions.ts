import { createCookieSessionStorage } from "@remix-run/node";
import { z } from "zod";

const cookieSecret = z.string().parse(process.env.COOKIE_SECRET);

export const { getSession, commitSession, destroySession } =
	createCookieSessionStorage({
		cookie: {
			name: "__session",
			secrets: [cookieSecret],
		},
	});
