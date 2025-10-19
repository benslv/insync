import type { LoaderFunctionArgs } from "react-router";
import { Form, useSubmit } from "react-router";
import { z } from "zod";
import type { Route } from "./+types/filter";

const sourceSchema = z
	.union([z.literal("followed"), z.literal("top")])
	.catch("followed");

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);

	const source = sourceSchema.parse(url.searchParams.get("source"));

	return { source };
};

export default function Page({ loaderData }: Route.ComponentProps) {
	const { source } = loaderData;
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
