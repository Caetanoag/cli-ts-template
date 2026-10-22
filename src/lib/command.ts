import { Command } from "commander";
import { setVerbose } from "./output";

export type CommonOptions = {
	json?: boolean;
	verbose?: boolean;
};

/**
 * Creates a command with the flags every command in this CLI supports.
 * Keeping them local avoids surprising global-option parsing rules.
 */
export function commandWithCommonOptions(name: string): Command {
	return new Command(name)
		.option("--json", "print machine-readable JSON when supported")
		.option("-v, --verbose", "show debug output")
		.hook("preAction", (thisCommand) => {
			const options = thisCommand.opts<CommonOptions>();
			setVerbose(Boolean(options.verbose));
		});
}
