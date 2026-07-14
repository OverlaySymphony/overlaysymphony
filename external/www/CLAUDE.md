# www

Overlay Symphony's public site: the marketing pages **and** the editor app, in one Astro project, static output. There is no client-side framework. The marketing pages ship no JavaScript at all; an app page may ship a small hand-written `<script>` for local interaction (selection, clipboard), and nothing more — reach for a framework only after a deliberate decision to add one.

The repo root's CLAUDE.md already applies. These are the conventions this workspace adds on top; anything below overrides them.

@../../.claude/astro.md
@../../.claude/design-system.md

## Layout

- `src/pages/` — one file per route. Pages hold **content only**; anything visual belongs in the design system.
- `src/pages/_Layout.astro` — the marketing breadcrumb root. Declares the nav used by every marketing page. Not a route (leading underscore).
- `src/pages/editor/_Layout.astro` — the same job for the editor: declares the root breadcrumb (no nav) and wraps `AppLayout`.
- `src/shared/design/` — the design system's `<design-root>`.
- `src/shared/breadcrumbs/` — breadcrumb types and matching.
- `src/shared/page/` — re-exports `Breadcrumb` for pages.

The site's type scale is **4 roles × 3 sizes**: `title` / `body` / `label` / `code`, each `large` / `medium` / `small`. Interactive text — buttons, nav links, app list rows, form controls — is sized by `--os-control-*` rather than by a Typography role.

## The patterns tier is split by audience

The design system's tiers are `foundations/`, `elements/`, **`marketing/` and `apps/`**, `layouts/`. The two audience directories sit where a single `patterns/` would, and both **are** the patterns tier — they just have names instead of one.

- `elements/` — primitives that compose nothing and are usable on **either** surface.
- `marketing/` — patterns for the editorial pages: wide, airy, one column of prose.
- `apps/` — patterns for the editor: dense, full-viewport, no page scroll.

Dependencies still flow downhill, and **`marketing/` and `apps/` never import each other.** A concept that lives on both sides gets a component in each — `NodeGraph` and `StatusList` exist twice, and are deliberately unalike, because the presentation and complexity diverge completely. The node-kind vocabulary (`NodeKind`, `NODE_LABELS`) is duplicated across the two for the same reason; unifying it is a decision for later, not an accident.

Only extract to `elements/` what genuinely serves both. `Container` currently sits there and is used only by marketing — that's intentional (it's a generic primitive an app settings page would want), but it's the one to keep an eye on.

## Breadcrumbs drive the chrome

`src/middleware.ts` seeds `Astro.locals.breadcrumbs`; each `<Breadcrumb>` a page renders unshifts itself onto that array. `MarketingLayout` reads it to build the document title, the header nav, and the active-link state; `AppLayout` reads it for the title only.

So a page declares _where it sits_, not what the header should look like:

```astro
<Breadcrumb href="/features" label="Features" />
```

The root breadcrumb's `navigation` array is the header nav. An entry with `cta: true` renders as the primary button rather than a link.

Ordering matters: a page renders its own `<Breadcrumb>` **before** the layout that unshifts the root ahead of it. That's why the root breadcrumb lives in a `_Layout.astro` rather than in the page.

`AppLayout`'s top bar shows a separate `path` — the app's own location inside itself (`Alerts / new-follower.automation`). That is app state, not a site route, and has nothing to do with the breadcrumb array.

## Imports

Subpath imports, defined in `package.json`. There is no `@/` alias and no relative climbing out of a directory. The `*` matches across `/`, so the extra tier segment needs no map entry.

```
#design/marketing/Card.astro     → shared/design/marketing/Card/index.astro
#design/apps/NodeGraph           → shared/design/apps/NodeGraph/index.ts
#design/foundations.css          → shared/design/foundations/index.css
#shared/page                     → shared/page/index.ts
```

## Foundations is split by concern

`foundations/index.css` holds **imports and nothing else** — the Google Fonts `@import` first (CSS demands imports precede rules, and this is the only file guaranteed to have none), then each concern.

Each concern is a directory of `vars.css` (the custom properties) and `base.css` (the unscoped rules that spend them): `colors/`, `typography/`, `layout/`, `motion/`, plus a bare `reset.css`. Add a token to the `vars.css` it belongs to; never to `index.css`.

## Checks

Let the fixers fix: `eslint . --fix` and `prettier --write src`. Never hand-sort imports or hand-format `.astro` — the tooling owns both, and guessing at them wastes a round trip.

`pnpm build` must be **warning-free**, not merely error-free.

To render the site: `pnpm build && pnpm exec astro preview --port 4321`, then screenshot it. Kill the server afterwards. Shoot `/editor` at **1440×900** — it's a fixed-viewport app, so a tall capture just adds dead space.

## Gotchas

- `Typography` is text-only and renders a small subset of markdown (`*em*`, `**strong**`, `` `code` ``, `[link](url)`). Emphasis in page copy goes through that, not through markup.
- `Typography` sets `text-transform` on its `label` role. Don't pass a class that fights it — a parent's scoped rule and the child's have equal specificity, so the winner depends on bundle order. Pick a role that already does what you want.
- The editor's inspector help text renders at `body-small`, which is **larger than the input it describes**. The mockup draws it smaller than the app's type scale currently goes. Left as-is on purpose, pending a decision about the scale.
