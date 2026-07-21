# editor

The Overlay Symphony **editor**: a client-rendered React app for authoring compositions and automations. Vite, no SSG. It's the config surface — the OBS-runtime surfaces (dock, overlay, Twitch popup) live in the sibling `studio` workspace and share no code with this one, only the `@overlaysymphony/design` tokens.

The repo root's CLAUDE.md applies. This workspace adds:

@../../.claude/react.md
@../../.claude/design-system.md

## Entry

`index.html` at the workspace root is the Vite entry; its `<script>` loads `src/main.tsx`, which mounts the React tree into `#root`. (`vite.config.ts` still globs every root `*.html` into a Rollup input, so a second surface is only a new `name.html` away — but the editor is one app, not the multi-surface bundle the old `sdk` was.)

How the built file maps to a deployed URL (and whether the marketing site's `/editor` link resolves here) is unsettled — don't assume a clean `/editor` path.

## Design system — the app-audience half, in React

`src/shared/design/` mirrors www's design system, tier for tier (`elements/`, `patterns/`, `layouts/`), but in **React + CSS Modules**.

- **Tokens are shared, components are not.** Foundations comes from `@overlaysymphony/design` (imported once per entry). The primitives here (`Button`, `Eyebrow`, …) are React re-implementations of www's Astro ones — deliberately duplicated, because there's no framework-neutral form worth inventing for five small components. Only the tokens must never fork.
- **When a second React consumer appears**, these `patterns/` and `elements/` components promote out of the editor into a shared React package — not before. (The web-component surfaces in `studio` are **not** consumers, so they don't factor into that promotion.)
- **`Typography` duplicates www's markdown tokenizer** (`tokenizer.ts`), so app text gets the same `*em*` / `**strong**` / `` `code` `` / `[link](url)` subset. It's a copy of the Astro one for now — fine to duplicate until a reason to unify appears.

### Component shape

Each primitive is a React modlet per `react.md`: an `index.ts` barrel over a `Button.tsx` main file, with `Button.module.css` and — when there are enough types to earn a file — `Button.types.ts` beside it.

CSS Modules give the scoping Astro's `<style>` gave for free. A cross-component style hook (the old `:global(.node)`) does **not** work across modules — a class is only visible in its own file. When a parent must style a child slot, give the child a wrapper element the parent owns (see `NodeGraph`'s `.branch` around each forked `Node`).

Class composition goes through `classnames` (default import as `cx`) — `cx(styles.button, styles[variant], { [styles.square]: square })`.

## Imports

Subpath imports, mirroring the design-system convention. A component's public entry is its `index.ts` barrel, which re-exports the component and its types, so one specifier covers both:

```
#design/elements/Button      → src/shared/design/elements/Button/index.ts
#design/patterns/NodeGraph   → src/shared/design/patterns/NodeGraph/index.ts
```

Private sub-components (`NodeGraph/Node.tsx`, `AppLayout/TopBar.tsx`) and type files (`Button.types.ts`) are imported relatively within their own directory — nothing outside reaches past the `index`.

## Interactivity is real React

The editor holds actual `useState` — selecting a composition/automation/node drives state, and the inspector swaps to match the selected node's kind. Mock data lives in `src/data.ts`; there's no store or persistence yet — that's a later task.

## Checks

`lint` runs typecheck (`tsc --noEmit`, JSX via the `react-jsx` tsconfig override), eslint (React rules via `@overlaysymphony/tooling/eslint-react`), prettier, and knip. `build` is `vite build`; confirm the entry still emits.
