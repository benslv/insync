import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { destroySession, getSession } from "~/sessions";

export async function loader({ request }: ActionArgs) {
	return null;
}

export async function action({ request }: ActionArgs) {
	const session = await getSession(request.headers.get("Cookie"));

	return redirect(`/`, {
		headers: {
			"Set-Cookie": await destroySession(session),
		},
	});
}
