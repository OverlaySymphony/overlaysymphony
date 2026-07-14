# Design system convention

Shared across workspaces. A workspace's own CLAUDE.md states where its design system lives and may override anything here — the override wins.

## The directory is the module

The import map makes a directory path the import specifier:

```jsonc
// package.json
"imports": {
  "#design/*.css":   "./<design-root>/*/index.css",
  "#design/*.astro": "./<design-root>/*/index.astro",
  "#design/*":       "./<design-root>/*/index.ts"
}
```

So `#design/patterns/Card.astro` → `patterns/Card/index.astro`.

A directory therefore has exactly three possible entry points — `index.astro`, `index.ts`, `index.css` — and **every other file in it is private**. That privacy is what makes co-location safe: a sub-component or helper living inside a component's directory cannot become someone else's dependency by accident.

## Tiers

Ordered by what each layer knows about. Dependencies flow downhill only: foundations → elements → patterns → layouts → pages.

| Tier           | Contains                                                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `foundations/` | The token layer. Values, no components. The **only** place a raw hex, px, or font-family may appear. Plain CSS, so unbundled consumers can use it too. |
| `elements/`    | Styled primitives that compose nothing. They know about tokens and nothing else.                                                                       |
| `patterns/`    | Components that compose elements, or that own a layout.                                                                                                |
| `layouts/`     | Page shells and document chrome.                                                                                                                       |

The elements/patterns line is **simple vs. composed**, not small vs. big. It is intuition, not a hard rule — but when a component composes another, it's a pattern.

## Inside a component directory

- **`index.astro`** — the component. Also `export * from "./<name>"` so a consumer needing the component _and_ its types writes one import, not two.
- **`index.ts`** — values other code needs directly: types, constants, helpers. **Never** re-exports the `.astro` component; that goes through Astro's import rules. Omit the file entirely when there is nothing to export.
- **`<component-name>.ts`** — where those values live (`card.ts`, `node-graph.ts`). `index.ts` is a barrel over it.
- **Anything else** — sub-components and helpers used _only_ by this component. They live here precisely because nothing outside can reach them. Promote one out only when a second consumer actually appears.

## Typography

Text is styled by **visual role**, not by HTML element — the two are not inherently linked. The component takes the element (`as`) and the visual role (`role`, `size`) as independent props, so an `<h2>` can carry whatever role the design calls for.

Keep the role × size matrix small and derive it from the type styles the design actually uses; Material 3's fifteen combinations is usually far more than a site needs. Interactive text (buttons, nav links) is owned by its own component rather than becoming a role.

Typography is a **text-only** component: emphasis comes from a small markdown subset it parses, not from markup passed into its slot.

## Every design value is a token

A **design value** is one that belongs to the visual language — it recurs, and changing it should change the whole system at once. Colors, type (family, size, weight, tracking, leading), spacing, radii, motion, elevation. A raw hex, font-size, or font-family outside `foundations/` is a bug; grep for them before calling a change done.

A **component style value** is one that only ever means something inside its own component — a line-length cap, a minimum card height, the pixel geometry of an arrowhead, the dimensions of a brand lockup. These are local literals and belong in the component. Hoisting them into `foundations/` would produce tokens named after their only caller (`--os-measure-headline`), which is the naming rule violated in token form.

The test: **would a second component ever want this exact value, and would you want both to change together?** If yes, it's a token. If it's a one-off measurement that happens to be a number, leave it where it is.

An off-scale design value is a smell, not a licence for a literal — if a font size fits no role in the scale, either it should, or the scale is missing something.

Breakpoints are the exception the language forces: custom properties cannot appear in media conditions, so those values are repeated literally and listed in a comment at the top of `foundations/`.

## Pages hold content, not layout

Static content rendered once is written out directly. Don't build a data array in frontmatter and `.map()` over it just to produce a fixed list of components — write the components. Inline single-use data into the prop at the call site. Keep a named constant only when the value is genuinely reused.

## Responsiveness

Prefer **container queries** to media queries for anything whose layout depends on the space it is _given_ rather than on the size of the screen. A node graph or a card row has to fold inside a narrow column on a wide display just as readily as on a phone; a viewport breakpoint only catches the second case.

Reach for a media query when the thing genuinely responds to the _screen_ — the page gutter, the header collapsing its links.
