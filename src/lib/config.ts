import { chmodSync, rmSync } from "node:fs";
import Conf from "conf";
import type { Config } from "./config-schema";
import { VERSION } from "./version";

export const CONFIG_PROJECT_NAME = "cli-ts-template";

export const store = new Conf<Partial<Config>>({
	projectName: CONFIG_PROJECT_NAME,
	projectVersion: VERSION,
	projectSuffix: "",
});

export function readConfig(): Partial<Config> {
	return {
		name: process.env.CLI_NAME || store.get("name"),
		color: process.env.CLI_COLOR || store.get("color"),
	};
}

export function saveConfig(config: Config): void {
	store.set(config);

	try {
		chmodSync(store.path, 0o600);
	} catch {
		// Some filesystems do not support POSIX permissions.
	}
}

export function clearConfig(): void {
	store.clear();

	try {
		rmSync(store.path, { force: true });
	} catch {
		// The file may already be gone or be locked by another process.
	}
}
