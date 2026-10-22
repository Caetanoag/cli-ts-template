import { describe, expect, it } from "vitest";
import { formatGreeting } from "../src/lib/greeting";

describe("formatGreeting", () => {
	it("greets the provided name", () => {
		expect(formatGreeting("Ada")).toBe("Hello, Ada!");
	});

	it("falls back to world for blank names", () => {
		expect(formatGreeting("  ")).toBe("Hello, world!");
	});

	it("uppercases the greeting when shout is enabled", () => {
		expect(formatGreeting("Ada", true)).toBe("HELLO, ADA!");
	});
});
