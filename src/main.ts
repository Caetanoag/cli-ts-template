#!/usr/bin/env node
import { runCli } from "./cli";
import { CliError } from "./lib/errors";
import { output } from "./lib/output";

try {
	await runCli();
} catch (error) {
	if (error instanceof CliError) {
		if (error.message) {
			output.error(error.message);
		}
		process.exitCode = error.exitCode;
	} else {
		output.error(error instanceof Error ? error.message : String(error));
		if (process.env.DEBUG && error instanceof Error) {
			console.error(error.stack);
		}
		process.exitCode = 1;
	}
}
