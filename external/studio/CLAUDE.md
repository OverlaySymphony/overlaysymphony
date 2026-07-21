# studio

The OBS-runtime surfaces users load: the **dock** (`obs-dock.html`), the **overlay**/composition (`obs-composition.html`, the overlay that renders in the browser source), and the Twitch auth **popup** (`popup-twitch.html`). Vite, no SSG — every entry is a client-rendered app.

These are **web components**, not React — chosen because a runtime surface must stay as lightweight as possible (the overlay) and because these handle Twitch tokens and are kept off the editor's origin for that reason. There is deliberately no React and no design-system layer in this workspace: each surface is a thin host for a web component that a module package (`@overlaysymphony/obs`, `@overlaysymphony/twitch`) supplies fully styled. The React editor lives in the sibling `editor` workspace and shares no code with this one.

The repo root's CLAUDE.md applies. This workspace adds nothing — no React, no design-system modules.

## Entries are root `.html` files

`vite.config.ts` globs every `*.html` in the workspace root into a Rollup input. To add a surface, add `name.html` pointing at its entry script — no routing to wire. Current entries: `obs-dock.html`, `obs-composition.html`, `popup-twitch.html`. Each pulls in the web component it hosts from a module package (`@overlaysymphony/obs/ui/*`, `@overlaysymphony/twitch/ui/*`); `obs-composition` is an empty placeholder for now.

How these built files map to deployed URLs is unsettled — don't assume clean paths.

## Checks

`lint` runs typecheck (`tsc --noEmit`), eslint (`@overlaysymphony/tooling/eslint` — the non-React config), prettier, and knip. `build` is `vite build`; confirm every entry still emits.
