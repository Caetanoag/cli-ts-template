import { cancel, intro, isCancel, outro, text } from "@clack/prompts";
import type { Command } from "commander";
import { type CommonOptions, commandWithCommonOptions } from "../lib/command";
import { clearConfig, readConfig, saveConfig, store } from "../lib/config";
import { type Config, configSchema } from "../lib/config-schema";
import { CliError } from "../lib/errors";
import { output } from "../lib/output";

type InitOptions = CommonOptions & {
	name?: string;
	color?: string;
	show?: boolean;
	reset?: boolean;
};

async function promptForConfig(initial: Partial<Config>): Promise<Config> {
	let name = initial.name;
	let color = initial.color;

	if (!name || !color) {
		if (!process.stdin.isTTY) {
			throw new CliError(
				"Configuration is incomplete. Pass --name and --color, or run in an interactive terminal.",
			);
		}

		intro("cli-ts-template setup");

		if (!name) {
			const answer = await text({
				message: "What is your name?",
				placeholder: "Ada Lovelace",
				validate: (value) => (value?.trim() ? undefined : "Name is required"),
			});

			if (isCancel(answer)) {
				cancel("Setup cancelled.");
				process.exit(1);
			}

			name = answer;
		}

		if (!color) {
			const answer = await text({
				message: "What is your favorite color?",
				placeholder: "blue",
				validate: (value) => (value?.trim() ? undefined : "Color is required"),
			});

			if (isCancel(answer)) {
				cancel("Setup cancelled.");
				process.exit(1);
			}

			color = answer;
		}
	}

	const parsed = configSchema.safeParse({ name, color });
	if (!parsed.success) {
		throw new CliError(parsed.error.issues[0]?.message ?? "Invalid configuration");
	}

	return parsed.data;
}

export function initCommand(): Command {
	return commandWithCommonOptions("init")
		.description("Create or update the local configuration")
		.option("--name <name>", "your name")
		.option("--color <color>", "your favorite color")
		.option("--show", "print the current configuration")
		.option("--reset", "delete the current configuration")
		.action(async (options: InitOptions) => {
			if (options.reset) {
				clearConfig();

				if (options.json) {
					output.json({ path: store.path, reset: true });
				} else {
					output.success(`Configuration removed from ${store.path}`);
				}
				return;
			}

			const current = readConfig();
			const initial: Partial<Config> = {
				name: options.name ?? current.name,
				color: options.color ?? current.color,
			};

			if (options.show) {
				const parsed = configSchema.safeParse(initial);

				if (!parsed.success) {
					throw new CliError("Configuration is incomplete. Run `cli-ts-template init` first.");
				}

				if (options.json) {
					output.json({ config: parsed.data, path: store.path });
				} else {
					output.log(`Name: ${parsed.data.name}`);
					output.log(`Color: ${parsed.data.color}`);
					output.debug(`Config file: ${store.path}`);
				}
				return;
			}

			const config = await promptForConfig(initial);
			saveConfig(config);

			if (options.json) {
				output.json({ config, path: store.path });
			} else {
				outro(`Configuration saved to ${store.path}`);
			}
		});
}
