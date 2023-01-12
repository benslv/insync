import { z } from "zod";

export const SpotifyError = z.object({
	status: z.number(),
	message: z.string(),
});
