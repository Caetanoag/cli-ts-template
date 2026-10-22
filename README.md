# cli-ts-template

A small, batteries-included TypeScript CLI starter for packages published on npm.

It is intentionally boring where it should be boring: ESM, strict TypeScript, a
predictable command structure, typed configuration, tests, linting, CI, release
automation and a publishing checklist. Replace the sample commands with your
idea and ship.

> This package is marked `"private": true` so it cannot be published by accident.
> See [Renaming the template](#renaming-the-template).

## What is included

- **TypeScript** with strict settings and ESM
- **Commander** for commands, arguments and flags
- **Clack** for interactive prompts
- **Conf** for per-user configuration with restricted permissions
- **Zod** for runtime validation
- **Picocolors** for terminal output
- **Vitest** for tests
- **Biome** for linting and formatting
- **tsup** for a single-file ESM build targeting Node 22+
- **Changesets** for versioning and changelogs
- **GitHub Actions** for CI and releases

## Requirements

- Node.js **22.18.0 or newer**
- npm, pnpm or Bun

## Quick start

```bash
npm install
npm run dev -- hello Ada --shout
# HELLO, ADA!

npm run dev -- init --name Ada --color blue
npm run dev -- init --show --json
```

Build and run the published artifact:

```bash
npm run build
node dist/main.js hello
```

Or link it globally:

```bash
npm link
cli-ts-template hello
```

## Commands

| Command                                        | Description                                      |
| ---------------------------------------------- | ------------------------------------------------ |
| `cli-ts-template hello [name]`                 | Print a greeting. Use `--shout` to uppercase it. |
| `cli-ts-template init`                         | Create or update the local configuration.        |
| `cli-ts-template init --name Ada --color blue` | Non-interactive configuration.                   |
| `cli-ts-template init --show`                  | Print the current configuration.                 |
| `cli-ts-template init --reset`                 | Delete the stored configuration.                 |
| `cli-ts-template --help`                       | Show help.                                       |
| `cli-ts-template --version`                    | Show the version.                                |

Every command supports:
- `--json` — machine-readable output, useful in scripts and CI
- `-v, --verbose` — extra diagnostic output
- `--help` — command-specific help

## Configuration

`init` stores values with [`conf`](https://github.com/sindresorhus/conf) in the
operating system's config directory. On Linux this is usually
`~/.config/cli-ts-template/config.json`; the exact path is printed after setup.
The file is restricted to the current user where the OS supports it.

Values can be overridden without touching the file:

```bash
CLI_NAME=Ada CLI_COLOR=blue cli-ts-template init --show
```

| Variable    | Description         |
| ----------- | ------------------- |
| `CLI_NAME`  | Your name           |
| `CLI_COLOR` | Your favorite color |

The `.env.example` file documents the variables. The template reads values from
the process environment; it does not load `.env` automatically. Use your shell,
Bun, or a tool such as `dotenv` if you want automatic loading.

## Project structure

| Path                       | Responsibility                                      |
| -------------------------- | --------------------------------------------------- |
| `src/main.ts`              | Executable entry point and top-level error handling |
| `src/cli.ts`               | Program factory and command registration            |
| `src/commands/hello.ts`    | Example command that is easy to copy                |
| `src/commands/init.ts`     | Interactive and non-interactive configuration       |
| `src/lib/command.ts`       | Shared command options and verbose handling         |
| `src/lib/config.ts`        | Persistent configuration store                      |
| `src/lib/config-schema.ts` | Runtime schema and inferred config type             |
| `src/lib/errors.ts`        | Errors with explicit exit codes                     |
| `src/lib/output.ts`        | Consistent terminal and JSON output                 |
| `src/lib/version.ts`       | Version read from `package.json`                    |
| `tests/`                   | Unit tests for pure logic and schemas               |
| `.changeset/`              | Release notes and versioning                        |
| `.github/workflows/`       | CI and release automation                           |

## Scripts

| Script                     | Description                        |
| -------------------------- | ---------------------------------- |
| `npm run dev`              | Run the CLI from source with `tsx` |
| `npm run build`            | Bundle `src/main.ts` into `dist/`  |
| `npm start`                | Run the built CLI                  |
| `npm run typecheck`        | Type-check without emitting files  |
| `npm test`                 | Run the test suite once            |
| `npm run test:watch`       | Run tests in watch mode            |
| `npm run lint`             | Check formatting and lint rules    |
| `npm run format`           | Apply formatting and safe fixes    |
| `npm run check`            | Lint, type-check and test          |
| `npm run changeset`        | Create a changeset                 |
| `npm run version-packages` | Apply changeset versions           |
| `npm run release`          | Publish packages with Changesets   |

## Renaming the template

1. Update `name`, `description`, `bin`, `author`, `repository`, `homepage` and
   `bugs` in `package.json`.
2. Remove `"private": true`.
3. Update the program name and description in `src/cli.ts`.
4. Update `CONFIG_PROJECT_NAME` and the environment variable names in
   `src/lib/config.ts`.
5. Update `.env.example` and this README.
6. Replace the copyright holder in `LICENSE`.
7. Set your npm scope or package name in the release workflow if needed.
8. Run `npm install` once to regenerate the lockfile, then commit it and switch
   CI to `npm ci`.

Search for `cli-ts-template`, `CLI_NAME` and `CLI_COLOR` to find the remaining
placeholders.

## Publishing

This template uses npm provenance and automated releases with GitHub Actions.
1. Create an npm automation token and add it as the `NPM_TOKEN` repository
   secret. Alternatively, configure npm trusted publishing for the repository.
2. Push to `main`. The release workflow opens a version PR when there are
   changesets.
3. Merge the version PR. The workflow publishes with provenance.

For a local dry run:

```bash
npm run check
npm run build
npm pack --dry-run
```

Publishing locally:

```bash
npm login
npm publish --access public
```

`prepublishOnly` runs the full check and build before npm receives the package.
Use `npm publish --provenance` only in a supported CI environment.

## Adding a command

1. Create `src/commands/my-command.ts`.
2. Start with `commandWithCommonOptions("my-command")`.
3. Add arguments and options with Commander.
4. Use `output` for terminal output and `output.json` for `--json` mode.
5. Throw `CliError` with a useful message for expected failures.
6. Register the command in `src/cli.ts`.
7. Add a test for the pure logic.

Keep command files thin: parsing and presentation belong in `commands/`, while
reusable logic belongs in `lib/`.

## License

[MIT](LICENSE)
