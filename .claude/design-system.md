# Design system convention

Shared across workspaces. A workspace's own CLAUDE.md states where its design system lives and may override anything here — the override wins.

## Components are modlets

Each component is a modlet (see `modlets.md`), reached through the `#design/*` import map: `#design/<tier>/Card` → `<tier>/Card/index.*`, `#design/<tier>/Card.astro` → `<tier>/Card/index.astro`. How the index is laid out is the framework's concern — `astro.md` for Astro components, `react.md` for React ones.

The tokens layer (`foundations`) is plain CSS reached as `index.css`; it has no component.

## Tiers

Ordered by what each layer knows about. Dependencies flow downhill only: foundations → elements → patterns → layouts → pages.

| Tier           | Contains                                                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `foundations/` | The token layer. Values, no components. The **only** place a raw hex, px, or font-family may appear. Plain CSS, so unbundled consumers can use it too. |
| `elements/`    | Styled primitives that compose nothing. They know about tokens and nothing else.                                                                       |
| `patterns/`    | Components that compose elements, or that own a layout.                                                                                                |
| `layouts/`     | Page shells and document chrome.                                                                                                                       |

The elements/patterns line is **simple vs. composed**, not small vs. big. It is intuition, not a hard rule — but when a component composes another, it's a pattern.

## Component API

Applies at every tier — an element takes props the same way a pattern does.

**Data-drive a repeated thing with an exported item type.** `Card`, `Entry`, `Step`, `Metric`. Per-item fields take generic names — `title`, `subtitle`, `summary`, `content`, `note` — so the type survives being reused by a component that renders it differently. Anything shared across the items (a column label, a call to action) is lifted to a component-level prop rather than repeated on every item. Ordinals come from the index, not the data.

**One component, many looks via a `variant` prop** rather than near-duplicate components. The item type is a superset: fields only one variant renders are optional and simply unused by the others. That is the same rule as combining things that serve one semantic purpose (see `code-style.md`), applied to the visual layer.

A variant is applied as a **namespaced** class — the class list reads `cards cards-closed`, never `cards closed` — and is styled through that class alone (`.cards-open`), never as a compound with the base. Namespacing keeps a composed root legible when several components contribute classes to it, and makes a collision with another class in the file impossible.

**A namespaced variant selector is one class, so it does not outrank the base.** `.cards-closed .items` and `.cards .items` tie, and source order decides. That is usually what you want, but it means a base rule placed _after_ a variant rule silently wins — put breakpoint overrides last and confirm they actually apply. The compound form `.cards.closed` outranks `.cards` instead, which is how a media query can sit dead in a file for months.

**A component's internals are not its interface.** The root it hands back is; reaching past that to the elements inside couples the consumer to markup the component is free to rename. So when a consumer needs to vary something inside, the component should expose it — a prop, or a custom property, which inherits through any scoping boundary the framework imposes. Reaching in anyway is a legitimate last resort when nothing is exposed and adding a knob isn't worth it; just know you've taken on that coupling.

**A component proxies onto its root whatever it was given and did not consume.** Remaining attributes, classes, and the framework's own bookkeeping all land on the root element, so a consumer can address the thing it asked for. Swallowing them makes the component unaddressable from outside, and the failure is silent — the consumer writes a rule against the root and the rule simply matches nothing.

**Proxied classes come first, the component's own last** — the incoming `class` ahead of the component's base class — so the intentionally chosen names read before the generic ones in the DOM.

**Anything the component also sets is merged, never replaced.** `class` and `style` are the two that collide in practice: the component consumes the incoming value, then combines it with its own. Setting `style` straight onto the root after spreading the rest props silently drops whatever the consumer passed — and because the consumer's style is usually a custom property feeding a rule further down, what breaks is not the attribute but a colour or a size three files away, with nothing pointing back to the component that ate it.

That merge is also why a proxying component takes `style` as an **object only**, wherever the framework would also accept a string: a string cannot be merged into an object. Narrow it once in a shared alias rather than in each component, so the whole system agrees.

**A proxying component's props extend its root element's props.** Whatever the consumer may pass through is exactly what the element accepts, so the type should say so — and redeclaring a prop the element already declares is duplication that drifts. Where the root is another component, extend that component's props instead; the chain ends at an element either way.

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

A page is composition. Any distinct, self-contained section that could plausibly recur becomes a component **on first use** — not on second — so that pages stay a list of components and their data. The exception is a section genuinely exclusive to one page, which stays inline.

This is `code-style.md`'s reuse rules read against the page: a section that _could_ serve another page is extractable by that test alone, and a section rarely turns out to be one that could not. The one left inline is what quietly grows a second, slightly different copy.

Static content rendered once is written out directly. Don't build a data array in frontmatter and `.map()` over it just to produce a fixed list of components — write the components. Inline single-use data into the prop at the call site. Keep a named constant only when the value is genuinely reused.

## Responsiveness

Prefer **container queries** to media queries for anything whose layout depends on the space it is _given_ rather than on the size of the screen. A node graph or a card row has to fold inside a narrow column on a wide display just as readily as on a phone; a viewport breakpoint only catches the second case.

Reach for a media query when the thing genuinely responds to the _screen_ — the page gutter, the header collapsing its links.
