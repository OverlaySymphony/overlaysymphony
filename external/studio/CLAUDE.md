# studio

The OBS-runtime surfaces users load: the **dock** (`obs-dock.html`), the **overlay**/composition (`obs-composition.html`, the overlay that renders in the browser source), and the Twitch auth **popup** (`popup-twitch.html`). Vite, no SSG — every entry is a client-rendered app.

These are **web components**, not React — chosen because a runtime surface must stay as lightweight as possible (the overlay) and because these handle Twitch tokens and are kept off the editor's origin for that reason. The React editor lives in the sibling `editor` workspace and shares no code with this one.

The repo root's CLAUDE.md applies. This workspace adds:

@../../.claude/web-components.md
@../../.claude/design-system.md

## The dock is built here

The dock's UI is **owned in this workspace** — a tree of web components composed from a local design layer, not a thin host for a pre-styled module WC. (The popup and composition surfaces may still host a fully-styled WC from a module package; the dock does not.)

- `src/shared/Component/` — the base class every component extends, reached as `#shared/Component`.
- `src/shared/design/` — the design layer, reached through `#design/*`. Same tiers as `www`'s design system, built as web components; only `elements/` exists so far. There is no `foundations/` tier here — the tokens come from the shared package.
- `src/obs-dock/` — the dock surface. `Shell/` is the frame; `tabs/` holds one modlet per tab, and a tab owns the components inside it.

The shell's version string reads `package.json` through a JSON import attribute — don't hardcode it.

## Components extend `Component`

This overrides the element frame in `web-components.md`: nothing here attaches its own shadow root. `#shared/Component` owns the whole frame — it attaches the open root, adopts the stylesheet passed to `super()`, guards `connectedCallback` against reconnection, and calls `build()`. A component supplies only what differs:

```ts
import Component from "#shared/Component"

import stylesheet from "./FooBar.css" with { type: "css" }

export default class FooBar extends Component {
  public static name = "dock-foo-bar"

  constructor() {
    super(stylesheet)
  }

  protected build(): void {
    this.root.innerHTML = `<slot></slot>`
  }
}

window.customElements.define(FooBar.name, FooBar)
```

The base's default `build()` already renders a bare `<slot></slot>`, so **a component that only adds styling declares no methods beyond the constructor** — that's the whole file. Override `build()` only when there's a template. `this.root` is `protected`; the stylesheet argument is optional, though in practice every component has one.

The `Component` import sits between the tag side-effect imports and the stylesheet.

Tokens come from `@overlaysymphony/design`, loaded **once** at the entry as a `*.global.css` and inherited into every shadow root (see `web-components.md` for why they can't be adopted directly). Never redefine an `--os-*` token here — the dock, `www`, and `editor` spend the same foundations.

## Tones

A component that carries meaning through colour takes a `tone` attribute, and the vocabulary is fixed at four: **`ok`, `info`, `warn`, `err`**. No component invents its own names, and none re-implements the colour table.

**Absence of a tone is a designed state, not a missing value.** A component with no `tone` renders as _unset_ — neutral grey, still visible, never a silent fall-back to one of the four. Style that state on the bare `:host` and switch the toned treatment on attribute presence (`:host([tone])`), so the two are written as the deliberate pair they are.

The mapping lives once, in `src/shared/design/tones/index.css`, reached as `#design/tones.css` — a plain CSS file in the design layer, the same shape `design-system.md` gives the tokens tier. It resolves the attribute to local properties (`--tone`, `--tone-hover`, `--tone-active`, `--tone-wash`, `--tone-border`) which the component then spends. A component adopts it alongside its own sheet:

```ts
import tones from "#design/tones.css" with { type: "css" }
import Component from "#shared/Component"

import stylesheet from "./FooBar.css" with { type: "css" }

constructor() {
  super(tones, stylesheet)
}
```

`tones` joins `Component` in the bare-specifier group, ahead of the relative stylesheet — that's what `import/order` enforces, not a choice.

`Component`'s constructor is variadic — it adopts every sheet passed, in order. Because the mapping's rules set the properties _on_ the host, a nested toned component resolves its own tone rather than inheriting its parent's.

The tokens behind it (`--os-tone-*`) come from `@overlaysymphony/design`, which also carries a separate `--os-node-*` axis for automation taxonomy. Never spend a raw hue (`--os-color-teal`) in a component.

### Tone and variant are independent

Where a component has both, `tone` says **which colour** and `variant` says **how much of it** — they compose, and neither implies the other. `os-button` is the worked example, taking `filled` / `outline` / `text` against the four tones:

|                     | no tone                           | toned                        |
| ------------------- | --------------------------------- | ---------------------------- |
| `outline` (default) | neutral bordered button           | border and label in the tone |
| `filled`            | neutral solid button              | solid tone, inverse label    |
| `text`              | muted label, no border or padding | label in the tone            |

**`outline` is the default** because most buttons are secondary — a bare `<os-button>` is the neutral bordered one, and a primary action opts in with `variant="filled" tone="ok"`. Don't collapse the axes by giving a variant its own colour: that's how `tone="danger"` happened.

## Tags

Design primitives are `os-*` — one segment, no more (`os-button`, `os-dot`, `os-pill`).

Dock components are `dock-*`, and the tag is the path: `dock-shell`, `dock-<tab>` (`dock-config`), then a segment per level below it (`dock-config-provider`, `dock-config-provider-identity`). A second surface takes its own prefix rather than extending `dock-`.

The prefix is the surface's directory minus the `obs-` platform segment, so `src/obs-composition/` is `composition-*` (`composition-alert`, `composition-alert-actions`) exactly as `src/obs-dock/` is `dock-*`.

## Entries are root `.html` files

`vite.config.ts` globs every `*.html` in the workspace root into a Rollup input. To add a surface, add `name.html` pointing at its entry script — no routing to wire. Current entries: `obs-dock.html`, `obs-composition.html`, `popup-twitch.html`. `obs-composition` is an empty placeholder for now.

How these built files map to deployed URLs is unsettled — don't assume clean paths.

## Checks

`lint` runs typecheck (`tsc --noEmit`), eslint (`@overlaysymphony/tooling/eslint` — the non-React config, with `no-non-null-assertion` turned off here), prettier, and knip. `build` is `vite build`; confirm every entry still emits. To render the dock: `pnpm dev`, then screenshot `obs-dock.html` at 300×720.

Knip needs two standing escapes, both consequences of how web components load — don't reshape code to satisfy it, and don't add more:

- `ignoreIssues: { "src/**": ["exports"] }` — components are consumed by importing them for the registration side effect, so their default exports read as unused.
- `ignoreDependencies: ["@overlaysymphony/design"]` — its only reference is the `@import` inside `obs-dock.global.css`.

The jsdom `adoptedStyleSheets` shim lives in `src/setupTests.ts`; a component reaching for another modern shadow-DOM API may need the same treatment there.
