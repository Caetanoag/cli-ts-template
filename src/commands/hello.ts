import type { Command } from "commander";
import { type CommonOptions, commandWithCommonOptions } from "../lib/command";
import { formatGreeting } from "../lib/greeting";
import { output } from "../lib/output";

type HelloOptions = CommonOptions & {
	shout?: boolean;
};

export function helloCommand(): Command {
	return commandWithCommonOptions("hello")
		.description("Print a friendly greeting")
		.argument("[name]", "who to greet", "world")
		.option("-s, --shout", "uppercase the greeting")
		.action((name: string, options: HelloOptions) => {
			const message = formatGreeting(name, Boolean(options.shout));

			if (options.json) {
				output.json({ message });
				return;
			}

			output.log(message);
		});
}
