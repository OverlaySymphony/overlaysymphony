# Web components

Shared across workspaces. A workspace's own CLAUDE.md states the concrete tag prefix and component tree, and may override anything here — the override wins.

## The element

A web component is a class extending `HTMLElement` with a `static name` holding its tag. The constructor attaches an open shadow root, adopts its stylesheet, and builds the template. The main file default-exports the class and registers it at the bottom.

```ts
import "#design/elements/Baz"

import stylesheet from "./FooBar.css" with { type: "css" }

export default class FooBar extends HTMLElement {
  public static name = "os-foo-bar"

  private root: ShadowRoot

  constructor() {
    super()

    this.root = this.attachShadow({ mode: "open" })
    this.root.adoptedStyleSheets.push(stylesheet)

    this.build()
  }

  private build() {
    this.root.innerHTML = `<os-baz></os-baz><slot></slot>`
  }
}

window.customElements.define(FooBar.name, FooBar)
```

**Importing the modlet is what defines the tag** — registration is a side effect of the import, so most consumers write a bare `import "…/FooBar"` and then use the tag. The class is exported normally and importing it as a value is fine where something genuinely wants it — to instantiate, to read `static name`, to type a reference — it just isn't the common case. Because the common case is the side effect, dead-code analysis will see most components' exports as unused; tell it so once, in config, rather than bending the code around it.

Light-DOM content passes through with `<slot>`. Keep only the state a method later reads: a component that builds once and never touches its root again takes the shadow root as a local and skips `build()` entirely.

## When to build

A component whose template is fixed builds in the constructor. **A component whose template reads its own attributes must build in `connectedCallback`** — attributes aren't set yet when the parser calls the constructor — and guards against reconnection:

```ts
connectedCallback(): void {
  if (this.built) return
  this.built = true

  this.build()
}
```

## Variants are attributes

A visual variant is an attribute on the host (`variant`, `tone`, `status`), styled through `:host([variant="ghost"])`. Never a class, never a property — an attribute is what a consumer can write in the template that composes the component, and it keeps the whole variant surface in the component's own CSS.

## Imports

Side-effect imports for every tag the template mentions come first, as their own group; the stylesheet import follows after a blank line. A tag whose module is never imported silently never upgrades, so the import list is the component's real dependency list — keep it complete even though nothing in the file references the names.

## Styles

Component styles are a sibling `<Modlet>.css`, imported `with { type: "css" }` — the build turns it into a `CSSStyleSheet` that the constructor pushes onto `adoptedStyleSheets`. Style the element's own box through `:host`.

Design **tokens are not adopted into a shadow root** — they are loaded once at the document level and inherit across the boundary. Custom properties and `font-family` inherit into shadow DOM, and `@font-face` is global wherever declared; so a component's CSS just spends the tokens. A shadow root does **not** inherit the document reset, so a component that sizes its own box — width or height alongside padding or a border — sets `box-sizing` itself. Most don't need to.

Two things the shadow boundary makes routine: `:host` styles the element's own box, and `slot { display: contents }` lets slotted children participate in the host's flex or grid layout instead of being wrapped in a box the consumer can't see.

The document-level sheet that carries the tokens is a `*.global.css` — the suffix the CSS-to-stylesheet build step skips, so it stays a normal document stylesheet (with its `@import` of the foundations package intact) rather than a constructable one. A constructable sheet drops `@import`, so foundations can only arrive this way.

## Modlet layout

A component is an ordinary modlet (see `modlets.md`) — no framework exception applies. The index is the usual thin barrel over a named main file; what makes it work for web components is that importing the barrel still runs the main file, and running the main file is what registers the tag.

- **`index.ts`** — `export { default } from "./<Modlet>.ts"`.
- **`<Modlet>.ts`** — the class and its `static name`, default-exported, registering itself at the bottom.
- **`<Modlet>.css`** — its styles.
- **`<Modlet>.test.ts`** — its tests.
- **Anything else** — private sub-components and helpers, each named for itself.

A component that only one other component uses nests inside it, and its tag extends the parent's.

## Tests

A test imports the main file for its registration side effect, then drives the element through the DOM: create it by tag, append it to `document.body`, and assert against `shadowRoot`. Prefer that to importing the class and constructing it — going through the registry is what a consumer does, and it exercises the upgrade the component is built around. Assert behaviour rather than markup.

A jsdom-based runner has no `adoptedStyleSheets`; define it on `Document` and `ShadowRoot` in the test setup so constructors can push onto it.

## Tags

A tag carries the project prefix. **Sharable design primitives** are `<prefix>-<name>` (`os-button`). **Application components** carry an `app` segment, and a component defined inside another extends its parent's tag (`os-app-config` → `os-app-config-provider`). The workspace pins the prefix and the concrete tree.

## Composition

Components compose other components inside their shadow DOM. Registration order is irrelevant: a tag used before its module loads upgrades the moment the module registers it, so a parent may reference a child it imports below itself.

## The design layer

A workspace that owns UI keeps it under the `#design/*` import map in the usual tiers (see `design-system.md`) — the same shape as an Astro or React design system, but in web components. Tokens come from the shared foundations package loaded at the entry, never through a `#design` subpath.
