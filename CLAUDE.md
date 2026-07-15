# Overlay Symphony

An event-driven framework for orchestrating stream overlays, bots, and services. The published modules are consumed by streamers' own overlays, which run inside an OBS browser source — so a module's runtime is someone else's browser, not a server we control.

Repo-wide conventions:

@.claude/monorepo.md
@.claude/code-style.md
@.claude/modlets.md

Anything narrower belongs to a workspace, not here. Each workspace has its own CLAUDE.md and imports the modules it needs (`.claude/astro.md`, `.claude/design-system.md`, …). This file loads everywhere; theirs load only where they apply. Keep it that way — a rule learned in one workspace stays in that workspace until a second one needs it.

## Workspace roots

Grouped by audience, per `monorepo.md`:

| Root        | Contains                                                                                     |
| ----------- | -------------------------------------------------------------------------------------------- |
| `modules/`  | The published packages (`@overlaysymphony/*`). Versioned and released independently.         |
| `external/` | Consumed by users — `www` (the site), `editor` (the React config app), `studio` (the OBS dock, overlay, and Twitch popup). |
| `internal/` | Consumed by the repo — `tooling` (the shared ESLint/Prettier/TypeScript configs), `scripts`. |
| `examples/` | Demonstrations. Not published.                                                               |

`@overlaysymphony/tooling` is the shared tooling package: a repo-wide lint or compiler rule changes there, never in an individual package.

## Still early

Under active development, but published releases are used live on the maintainer's own stream, so `main` is not a scratchpad. Semver is followed on a best-effort basis; timelines are not guaranteed.
