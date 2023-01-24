import { loader } from "~/routes/index";

describe("Index Loader", () => {
	it("returns a response", async () => {
		const response = await loader({
			request: new Request("http://insync.vercel.app"),
			context: {},
			params: {},
		});

		expect(response).toBeInstanceOf(Response);
	});
});
