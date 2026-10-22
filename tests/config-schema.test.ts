import { describe, expect, it } from "vitest";
import { configSchema } from "../src/lib/config-schema";

describe("configSchema", () => {
	it("accepts and trims a complete configuration", () => {
		expect(configSchema.parse({ name: "  Ada  ", color: " blue " })).toEqual({
			name: "Ada",
			color: "blue",
		});
	});

	it("rejects blank values", () => {
		expect(configSchema.safeParse({ name: " ", color: "blue" }).success).toBe(false);
		expect(configSchema.safeParse({ name: "Ada", color: "" }).success).toBe(false);
	});
});
