import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import { z } from "zod";

const sourceSchema = z
	.union([z.literal("followed"), z.literal("top")])
	.catch("followed");

export const loader = async ({ request }: LoaderArgs) => {
	const url = new URL(request.url);

	const source = sourceSchema.parse(url.searchParams.get("source"));

	return json({ source });
};

export default function Page() {
	const { source } = useLoaderData<typeof loader>();
	const submit = useSubmit();

	return (
		<>
			<Form method="get" onChange={(e) => submit(e.currentTarget)}>
				<fieldset>
					<label>
						<input
							type={"radio"}
							name="source"
							defaultChecked={source !== "top"}
							value="followed"
						/>{" "}
						Followed
					</label>
					<label>
						<input
							type={"radio"}
							name="source"
							defaultChecked={source === "top"}
							value="top"
						/>{" "}
						Top
					</label>
				</fieldset>
			</Form>
			<p>{source}</p>
		</>
	);
}
