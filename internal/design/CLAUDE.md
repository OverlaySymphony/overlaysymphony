# @overlaysymphony/design

The design system's shared floor: the token and foundations layer, as framework-agnostic CSS. This is the one part of the design system that **must never fork** — a colour ramp or type scale that drifts between the marketing site and the apps is a real bug, where a duplicated button is not.

## What lives here

Only `foundations/` — custom properties and the unscoped base rules that spend them. Split by concern, `index.css` importing the rest and holding no rules of its own:

```
foundations/
  index.css              imports only — tokens.css, then the reset and base rules
  tokens.css             imports only (fonts first — CSS demands @import precede rules)
  reset.css
  colors/{vars,base}.css
  typography/{vars,base}.css
  layout/{vars,base}.css
  motion/vars.css
```

Add a token to the `vars.css` of the concern it belongs to; never to `index.css` or `tokens.css`.

### Colour has three layers

`colors/vars.css` holds the raw hues (`--os-color-teal`, `--os-color-red`, …), then two **semantic** sets aliasing them. The sets are different axes that happen to share hues, and conflating them is the mistake to avoid:

| Set           | Means               | Values                         |
| ------------- | ------------------- | ------------------------------ |
| `--os-tone-*` | Severity            | `ok` `info` `warn` `err`       |
| `--os-node-*` | Automation taxonomy | `trigger` `condition` `action` |

So `--os-tone-ok` and `--os-node-trigger` are both teal today and must still be spelled apart — a change to what "trigger" looks like should never silently restyle every success state.

**A component spends a semantic token, never a raw hue.** `--os-color-teal` in a component is a bug in the same way a hex is; reach for it only when defining a new alias here. The hue ramps carry `-hover`, `-active`, `-wash`, and `-border`; `--os-tone-*` mirrors all four, `--os-node-*` only `-wash` and `-border`, since nothing interactive is keyed to node kind.

There is deliberately no "none" or "unset" tone. A component with no tone spends `--os-color-line-strong` for a fill or `--os-color-text-faint` for text — both already exist and already say what they mean.

`tokens.css` is the **values half** — the font face and every `vars.css`, and nothing that paints. `index.css` is that plus the reset and the `base.css` rules, which do paint: a page background, a body font, scrollbars, `::selection`. The font stays with the tokens because `--os-font-body` is worthless without Geist actually loaded.

## What does NOT live here — yet

The **primitives** (`Button`, `Eyebrow`, …) do not. They're framework-specific: `www` renders them in Astro, the `editor` in React, so today they're duplicated per consumer rather than shared. That's deliberate — a component is cheap to keep in two dialects, and there's no framework-neutral form worth inventing for five small components. When a second **React** consumer appears, the React primitives promote out of `editor` into their own shared package — not into this one, which stays CSS-only. (The `studio` surfaces — the OBS dock, overlay, and Twitch popup — are web components, not React, so they are **not** that consumer. `studio` builds its own WC primitives against these foundations; that's a separate design layer, not a fork of the tokens.)

## Consumed through exports, as source

Ships source CSS, no build, like every package here. Consumers import the declared subpath:

```
@overlaysymphony/design/foundations.css      values + reset + base rules
@overlaysymphony/design/tokens.css           values only
```

**`foundations.css` is the default** — take it whenever the surface owns its whole page. `www` imports it once in `RootLayout`; the `editor` imports it once at its Vite entry.

**`tokens.css` is for a surface that must not have a page imposed on it.** The case that forced it: `studio`'s overlay renders in an OBS browser source composited over live video, so `colors/base.css` setting an opaque `html` background would black out the stream — and the overlay's other content follows unrelated designs that a body font and reset would trample. Such a surface takes the values and paints its own chrome. Reaching for this to dodge one unwanted rule is the wrong call; fix the rule instead.

Never reach past these two subpaths into the tree.
