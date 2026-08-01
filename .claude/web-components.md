# Web components

Shared across workspaces. A workspace's own CLAUDE.md states the concrete tag prefixes and component tree, and may override anything here — the override wins.

## The element

A web component is a class extending `HTMLElement` with a `static name` holding its tag. The constructor attaches an open shadow root and adopts its stylesheet; `connectedCallback` builds the template once. The main file default-exports the class and registers it at the bottom.

```ts
import "#design/elements/Baz"

import stylesheet from "./FooBar.css" with { type: "css" }

export default class FooBar extends HTMLElement {
  public static name = "os-foo-bar"

  private built = false
  private root: ShadowRoot

  constructor() {
    super()

    this.root = this.attachShadow({ mode: "open" })
    this.root.adoptedStyleSheets.push(stylesheet)
  }

  connectedCallback(): void {
    if (this.built) return
    this.built = true

    this.build()
  }

  private build(): void {
    this.root.innerHTML = `<os-baz></os-baz><slot></slot>`
  }
}

window.customElements.define(FooBar.name, FooBar)
```

Every component repeats that frame, so a workspace with more than a handful of them will want to lift it into a shared base class and have components pass their stylesheet up — where a workspace does that, its CLAUDE.md documents the base and this section describes what the base owns.

**Importing the modlet is what defines the tag** — registration is a side effect of the import, so most consumers write a bare `import "…/FooBar"` and then use the tag. The class is exported normally and importing it as a value is fine where something genuinely wants it — to instantiate, to read `static name`, to type a reference — it just isn't the common case. Because the common case is the side effect, dead-code analysis will see most components' exports as unused; tell it so once, in config, rather than bending the code around it.

## Build on connect

`build()` runs from `connectedCallback`, never from the constructor — attributes aren't set yet when the parser constructs the element, so a constructor-time template can't read its own inputs. Doing it the same way everywhere makes `this.getAttribute(…)` reliable in every component, so no component has to decide when it builds; the `built` flag keeps a reconnected element from rebuilding.

A component with no template of its own still needs the shadow root — it renders a bare `<slot></slot>` and exists to carry styling.

That `build()` runs after construction also means a field it assigns is not assigned in the constructor; declare it with a definite-assignment `!` rather than making it optional and null-checking it at every use.

## Variants are attributes

A visual variant is an attribute on the host (`variant`, `tone`, `status`), styled through `:host([variant="ghost"])`. Never a class, never a property — an attribute is what a consumer can write in the template that composes the component, and it keeps the whole variant surface in the component's own CSS.

Data a component renders arrives the same way, as attributes read in `build()`.

## Structure is components, not classed markup

A region inside a template that carries its own styling or its own data is **its own nested component**, not a `<div class="…">`. Prefer

```html
<foo-provider-identity handle="@name" meta="1.2k followers"></foo-provider-identity>
```

over a classed `div` whose rules live in the parent's stylesheet. The parent's CSS then only lays out its children instead of also styling their internals, and each piece owns its own shadow root, tag, and stylesheet.

The pull the other way — "it's only a couple of rules, inline it" — is how a parent's stylesheet ends up owning the whole subtree. A shared layout utility (a spacer, a stack) is the exception; anything with meaning gets a tag.

## Imports

Side-effect imports for every tag the template mentions come first, as their own group; the stylesheet import follows after a blank line. A tag whose module is never imported silently never upgrades, so the import list is the component's real dependency list — keep it complete even though nothing in the file references the names.

## Styles

Component styles are a sibling `<Modlet>.css`, imported `with { type: "css" }` — the build turns it into a `CSSStyleSheet` pushed onto `adoptedStyleSheets`. Style the element's own box through `:host`.

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

A component used by only one other component **nests inside it**, and its tag extends the parent's. A parent whose sub-components are only ever used inside its own template registers the family from its index, so one import brings the whole tree:

```ts
import "./Actions/index.ts"
import "./Identity/index.ts"

export { default } from "./Provider.ts"
```

Sibling modlets of the same kind may sit in a plain lowercase grouping directory (`tabs/`, `elements/`). A grouping directory has no index and is not itself a modlet — it's a shelf.

## Tests

A test imports the main file for its registration side effect, then drives the element through the DOM: create it by tag, append it to `document.body`, and assert against `shadowRoot`. Prefer that to importing the class and constructing it — going through the registry is what a consumer does, and it exercises the upgrade the component is built around. Assert behaviour rather than markup.

A jsdom-based runner has no `adoptedStyleSheets`; define it on `Document` and `ShadowRoot` in the test setup so constructors can push onto it.

## Tags

Every tag is prefixed, and the prefix says which layer the component belongs to.

- **Sharable design primitives** carry the design system's prefix and one segment: `os-button`, `os-pill`.
- **Application components** carry the **surface's** name as their prefix, and each level of nesting appends a segment: `dock-shell`, `dock-config`, `dock-config-provider`, `dock-config-provider-identity`.

So a tag reads as a path through the tree, and a component's own tag tells you where its file is. The workspace pins the prefixes and the concrete tree.

## Composition

Components compose other components inside their shadow DOM. Registration order is irrelevant: a tag used before its module loads upgrades the moment the module registers it, so a parent may reference a child it imports below itself.

## The design layer

A workspace that owns UI keeps it under the `#design/*` import map in the usual tiers (see `design-system.md`) — the same shape as an Astro or React design system, but in web components. Tokens come from the shared foundations package loaded at the entry, never through a `#design` subpath.
