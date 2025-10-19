import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { destroySession, getSession } from "~/sessions";

export async function action({ request }: ActionFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));

	return redirect(`/`, {
		headers: {
			"Set-Cookie": await destroySession(session),
		},
	});
}
