# Monorepo

Shared across workspaces. A workspace's own CLAUDE.md may override anything here — the override wins.

## Shape

pnpm workspaces, orchestrated by Nx. Workspace roots are grouped by **audience**, not by technology — who consumes the thing decides where it lives. The repo's own CLAUDE.md names the roots it uses; a typical split is published packages, things consumed by users, things consumed by the repo itself, and examples.

## Dependency versions live in the catalog

A dependency shared by more than one package is pinned once in `pnpm-workspace.yaml` under `catalog:`, and each package depends on it as `"typescript": "catalog:"`.

**Never pin a version in a package when the dependency is in the catalog** — and when adding a dependency that a second package already uses, move it into the catalog rather than duplicating the range.

Internal dependencies use `workspace:*`.

## Every package consumes the shared tooling

An internal tooling package exports the ESLint, Prettier, and TypeScript configs. A package extends them; it does not define its own. Changing a rule for the whole repo means changing it there, not in each package.

## Lint is a family of scripts

A package's `lint` script is an aggregator — `pnpm run "/^lint-.*/"` — so any script named `lint-*` is picked up and run in parallel for free. Add a new check by naming it that way; don't wire it into the aggregator by hand.

Every check must pass, `depcheck` included: an unused or undeclared dependency is a failure, not a warning.

## Packages export source, through subpaths

`exports` maps subpaths straight at TypeScript source:

```jsonc
"exports": {
  "./chat":      "./src/chat/index.ts",
  "./helpers/*": "./src/helpers/*/index.ts"
}
```

There is deliberately **no `"."` root export**. Consumers import the capability they want (`<package>/chat`), never the package as a whole — so a barrel of everything is never the answer.
