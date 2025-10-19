import type { ActionFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { destroySession, getSession } from "../sessions";

export async function action({ request }: ActionFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));

	return redirect(`/`, {
		headers: {
			"Set-Cookie": await destroySession(session),
		},
	});
}
