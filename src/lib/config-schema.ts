import { z } from "zod";

export const configSchema = z.object({
	name: z.string().trim().min(1, "Name is required"),
	color: z.string().trim().min(1, "Color is required"),
});

export type Config = z.infer<typeof configSchema>;
