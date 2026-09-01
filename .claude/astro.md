# Astro

Shared across workspaces. A workspace's own CLAUDE.md may override anything here — the override wins.

## Frontmatter is TypeScript, not TSX

JSX inside the `---` fence does not parse. A local function that returns markup will fail to build the moment the component is actually imported.

Anything requiring recursion over a tree must therefore be a **self-rendering component** — a component that imports itself and recurses through the template rather than through a function.

## Slot content arrives as rendered HTML

`Astro.slots.render()` returns an HTML string with entities already escaped. Emitting those strings back as text escapes them a **second** time, so `don't` renders as `don&#39;t`. Pass them through `set:html` instead.

The corollary: a component that processes its slot content as text is a **text-only** component. Markup passed into it will be escaped, not rendered.

## Scoped styles have equal specificity

A parent's scoped rule and a child component's scoped rule are both `.class[data-attr]` — identical specificity — so when both set the same property, source order decides.

Where one component **imports** the other, that order is fixed: the child's styles are emitted first and the importing component's after, so the importer wins. That is what lets a component adjust the root of something it composes. Between two components with no import relationship there is nothing to fix the order, and the winner can change when the graph does.

**So don't override a property the child already sets** unless you are the one importing it. Passing a class to a child's root to add _orthogonal_ properties is always fine — a parent giving `Container` its `display: flex`, when `Container` only sets width and padding.

When the parent needs a property the child already owns — spacing a `Typography` that sets `margin: 0`, say — wrap the child in a `div` and style the wrapper. Do the same whenever you're unsure: the wrapper always works.

Elements created at _render_ time (rather than appearing statically in the template) don't receive the scope attribute at all, so they need `:global()` to be styled.

**A component's scope reaches a child as an ordinary prop**, so spreading rest props onto the root — the general rule in `design-system.md` — is what carries it there. A component that swallows them instead drops the caller's scope, and every rule the caller writes against that root stops matching. Nothing reports it; the styles are simply absent.

The same delivery sets how far a caller can reach. The root carries both scopes, so a flat selector matches it. Everything _inside_ the child carries only the child's scope, so a flat selector cannot.

Nesting can. Astro scopes the outermost compound of a nested block and leaves the inner ones bare, so `.head { & .lede { … } }` compiles to `.head[cid] .lede` — the ancestor stays scoped, which bounds the reach to that subtree, while `.lede` matches whatever sits inside it regardless of which component rendered it. That is a tool rather than a loophole: it is the only way to set a property the child hasn't exposed. What it costs is a dependency on a class name the child is free to rename, so prefer a prop or a custom property wherever the child offers one (see `design-system.md`).

## Verify by rendering

Astro's type checking and build cover a narrow slice of what can be wrong. Escaped entities, an overflowing layout, a rule that lost a specificity race — all of these build cleanly and are visibly broken. Render the page and look at it.

## Components are modlets, index-first

An Astro component is a modlet (see `modlets.md`), but Astro forces the rule's exception: an Astro component can't be re-exported through a `.ts` barrel, so the **index is the component** — not a barrel over a `Component.astro` — and values files keep their lowercase `<name>.ts` form rather than `<Modlet>.<purpose>.ts`:

- **`index.astro`** — the component. It `export * from "./<name>"` so one import brings the component and its types.
- **`index.ts`** — barrels the types/values from `<name>.ts`; omit it when there's nothing to export.
- **`<name>.ts`** — the types, constants, helpers (`card.ts`).
- **Anything else** — private sub-components and helpers.
