# @overlaysymphony/design

The design system's shared floor: the token and foundations layer, as framework-agnostic CSS. This is the one part of the design system that **must never fork** — a colour ramp or type scale that drifts between the marketing site and the apps is a real bug, where a duplicated button is not.

## What lives here

Only `foundations/` — custom properties and the unscoped base rules that spend them. Split by concern, `index.css` importing the rest and holding no rules of its own:

```
foundations/
  index.css              imports only (fonts first — CSS demands @import precede rules)
  reset.css
  colors/{vars,base}.css
  typography/{vars,base}.css
  layout/{vars,base}.css
  motion/vars.css
```

Add a token to the `vars.css` of the concern it belongs to; never to `index.css`.

## What does NOT live here — yet

The **primitives** (`Button`, `Eyebrow`, …) do not. They're framework-specific: `www` renders them in Astro, the `editor` in React, so today they're duplicated per consumer rather than shared. That's deliberate — a component is cheap to keep in two dialects, and there's no framework-neutral form worth inventing for five small components. When a second **React** consumer appears, the React primitives promote out of `editor` into their own shared package — not into this one, which stays CSS-only. (The `studio` surfaces — the OBS dock, overlay, and Twitch popup — are web components, not React, so they are **not** that consumer.)

## Consumed through exports, as source

Ships source CSS, no build, like every package here. Consumers import the declared subpath:

```
@overlaysymphony/design/foundations.css
```

`www` imports it once in `RootLayout`; the `editor` imports it once at its Vite entry. Never reach past `./foundations.css` into the tree.
