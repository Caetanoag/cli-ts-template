import pc from "picocolors";

let verbose = false;

export function setVerbose(value: boolean): void {
	verbose = value;
}

export const output = {
	log(message = ""): void {
		console.log(message);
	},

	success(message: string): void {
		console.log(`${pc.green("✔")} ${message}`);
	},

	info(message: string): void {
		console.log(`${pc.cyan("ℹ")} ${message}`);
	},

	warn(message: string): void {
		console.warn(`${pc.yellow("⚠")} ${message}`);
	},

	error(message: string): void {
		console.error(`${pc.red("✖")} ${message}`);
	},

	debug(message: string): void {
		if (verbose) {
			console.error(pc.dim(`debug: ${message}`));
		}
	},

	json(value: unknown): void {
		console.log(JSON.stringify(value, null, 2));
	},
};
