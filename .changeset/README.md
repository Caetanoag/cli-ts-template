# Changesets

This folder is managed by [Changesets](https://github.com/changesets/changesets).

When you make a user-facing change, run:

```bash
npm run changeset
```

Commit the generated Markdown file with your change. On the next release PR,
Changesets will update the version and changelog, and the release workflow will
publish the package.

See the [Changesets documentation](https://github.com/changesets/changesets/blob/main/docs/common-questions.md)
for monorepo and prerelease workflows.
