# studio

The OBS-runtime surfaces users load: the **dock** (`obs-dock.html`), the **overlay**/composition (`obs-composition.html`, the overlay that renders in the browser source), and the Twitch auth **popup** (`popup-twitch.html`). Vite, no SSG — every entry is a client-rendered app.

These are **web components**, not React — chosen because a runtime surface must stay as lightweight as possible (the overlay) and because these handle Twitch tokens and are kept off the editor's origin for that reason. The React editor lives in the sibling `editor` workspace and shares no code with this one.

The repo root's CLAUDE.md applies. This workspace adds:

@../../.claude/web-components.md
@../../.claude/design-system.md

## The dock is built here

The dock's UI is **owned in this workspace** — a tree of web components composed from a local design layer, not a thin host for a pre-styled module WC. (The popup and composition surfaces may still host a fully-styled WC from a module package; the dock does not.)

- `src/shared/design/` — the design layer's tiers (`elements/`, `patterns/`), reached through `#design/*`. Same tiers as `www`'s design system, built as web components. There is no `foundations/` tier here; the tokens come from the shared package.
- `src/obs-dock/` — the dock surface: the shell, its tabs, and the items within them.

`#shared/*` is mapped alongside `#design/*` and is deliberately empty for now — leave it.

Tokens come from `@overlaysymphony/design`, loaded **once** at the entry as a `*.global.css` and inherited into every shadow root (see `web-components.md` for why they can't be adopted directly). Never redefine an `--os-*` token here — the dock, `www`, and `editor` spend the same foundations.

## Tags

Prefix is `os`. Sharable primitives take one segment (`os-button`, `os-dot`). App components carry an `app` segment: the shell is `os-app-shell`, a tab is `os-app-<tab>` (`os-app-config`), and an item extends its tab (`os-app-config-provider`).

## Entries are root `.html` files

`vite.config.ts` globs every `*.html` in the workspace root into a Rollup input. To add a surface, add `name.html` pointing at its entry script — no routing to wire. Current entries: `obs-dock.html`, `obs-composition.html`, `popup-twitch.html`. `obs-composition` is an empty placeholder for now.

How these built files map to deployed URLs is unsettled — don't assume clean paths.

## Checks

`lint` runs typecheck (`tsc --noEmit`), eslint (`@overlaysymphony/tooling/eslint` — the non-React config), prettier, and knip. `build` is `vite build`; confirm every entry still emits. To render the dock: `pnpm dev`, then screenshot `obs-dock.html` at 300×720.

Knip needs two standing escapes, both consequences of how web components load — don't reshape code to satisfy it, and don't add more:

- `ignoreIssues: { "src/**": ["exports"] }` — components are consumed by importing them for the registration side effect, so their default exports read as unused.
- `ignoreDependencies: ["@overlaysymphony/design"]` — its only reference is the `@import` inside `obs-dock.global.css`.

The jsdom `adoptedStyleSheets` shim lives in `src/setupTests.ts`; a component reaching for another modern shadow-DOM API may need the same treatment there.
