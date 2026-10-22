import { Command } from "commander";
import { helloCommand } from "./commands/hello";
import { initCommand } from "./commands/init";
import { VERSION } from "./lib/version";

export function createProgram(): Command {
	const program = new Command();

	program
		.name("cli-ts-template")
		.description("A batteries-included TypeScript CLI starter")
		.version(VERSION)
		.showSuggestionAfterError()
		.showHelpAfterError();

	program.addCommand(helloCommand());
	program.addCommand(initCommand());

	return program;
}

export async function runCli(argv: string[] = process.argv): Promise<void> {
	const program = createProgram();

	if (argv.length <= 2) {
		program.outputHelp();
		return;
	}

	await program.parseAsync(argv);
}
