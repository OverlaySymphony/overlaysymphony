# www

Overlay Symphony's marketing site. Astro, static output, **no client-side framework — nothing here ships JavaScript to the browser.** The editor is no longer part of this workspace; it's a React app in `external/editor`.

The repo root's CLAUDE.md already applies. These are the conventions this workspace adds on top; anything below overrides them.

@../../.claude/astro.md
@../../.claude/design-system.md

## Layout

- `src/pages/` — one file per route. Pages hold **content only**; anything visual belongs in the design system.
- `src/pages/_Layout.astro` — the breadcrumb root. Declares the nav used by every page. Not a route (leading underscore).
- `src/shared/design/` — the design system's `<design-root>`.
- `src/shared/breadcrumbs/` — breadcrumb types and matching.
- `src/shared/page/` — re-exports `Breadcrumb` for pages.

The site's type scale is **4 roles × 3 sizes**: `title` / `body` / `label` / `code`, each `large` / `medium` / `small`. Interactive text — buttons, nav links — is sized by `--os-control-*` rather than by a Typography role.

## Tokens come from `@overlaysymphony/design`

The foundations tier (all `--os-*` tokens and the base rules) lives in the shared `@overlaysymphony/design` package, not here — the `editor` app consumes the same tokens, and they must never fork. `RootLayout` imports `@overlaysymphony/design/foundations.css` once. This workspace holds only `elements/`, `patterns/`, and `layouts/`.

## Tiers

`elements/` (primitives that compose nothing), `patterns/` (components that compose elements), `layouts/` — foundations being the shared package above. The `editor` holds its own React design system for the same job on a denser surface; a concept both sides need (a node graph, a status list) is **not** shared — it's rebuilt in each, deliberately unalike, because the presentation and complexity diverge completely.

`elements/` primitives (`Container`) may be used by only one page today but stay here because they're generic. The `editor` keeps its own React copies of these primitives regardless, so "used across the site" isn't the bar; "composes nothing and could serve any page" is.

## Breadcrumbs drive the chrome

`src/middleware.ts` seeds `Astro.locals.breadcrumbs`; each `<Breadcrumb>` a page renders unshifts itself onto that array. `MarketingLayout` reads it to build the document title, the header nav, and the active-link state.

So a page declares _where it sits_, not what the header should look like:

```astro
<Breadcrumb href="/features" label="Features" />
```

The root breadcrumb's `navigation` array is the header nav. An entry with `cta: true` renders as the primary button rather than a link.

Ordering matters: a page renders its own `<Breadcrumb>` **before** the layout that unshifts the root ahead of it. That's why the root breadcrumb lives in `_Layout.astro` rather than in the page.

## Imports

Subpath imports, defined in `package.json`. There is no `@/` alias and no relative climbing out of a directory. The `*` matches across `/`, so the extra tier segment needs no map entry.

```
#design/patterns/Card.astro      → shared/design/patterns/Card/index.astro
#design/elements/Button          → shared/design/elements/Button/index.ts
#shared/page                     → shared/page/index.ts
```

Tokens are the exception — they come from the `@overlaysymphony/design` package, not a `#design` subpath.

## Checks

Let the fixers fix: `eslint . --fix` and `prettier --write src`. Never hand-sort imports or hand-format `.astro` — the tooling owns both, and guessing at them wastes a round trip.

`pnpm build` must be **warning-free**, not merely error-free.

To render the site: `pnpm build && pnpm exec astro preview --port 4321`, then screenshot it. Kill the server afterwards.

## Gotchas

- The nav's "Open Editor" points at `/editor`, which is now the `editor` app in `external/editor` — **not a route in this workspace.** How that path resolves across the deployed sites is unsettled; don't assume a local `/editor` page exists.
- `Typography` is text-only and renders a small subset of markdown (`*em*`, `**strong**`, `` `code` ``, `[link](url)`). Emphasis in page copy goes through that, not through markup.
- `Typography` sets `text-transform` on its `label` role. Don't pass a class that fights it — a parent's scoped rule and the child's have equal specificity, so the winner depends on bundle order. Pick a role that already does what you want.
