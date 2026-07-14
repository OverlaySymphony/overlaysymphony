# www

The marketing site for Overlay Symphony. Astro, static output, no client-side framework — nothing here ships JavaScript to the browser.

The repo root's CLAUDE.md already applies. These are the conventions this workspace adds on top; anything below overrides them.

@../../.claude/astro.md
@../../.claude/design-system.md

## Layout

- `src/pages/` — one file per route. Pages hold **content only**; anything visual belongs in the design system.
- `src/pages/_Layout.astro` — the site's breadcrumb root. Declares the nav used by every page. Not a route (leading underscore).
- `src/shared/design/` — the design system's `<design-root>`. Its tiers are `foundations/`, `elements/`, `patterns/`, `layouts/`.
- `src/shared/breadcrumbs/` — breadcrumb types and matching.
- `src/shared/page/` — re-exports `Breadcrumb` for pages.

The site's type scale is **4 roles × 3 sizes**: `title` / `body` / `label` / `code`, each `large` / `medium` / `small`. Interactive text (buttons, nav links) is sized by its own component rather than by a Typography role.

## Breadcrumbs drive the chrome

`src/middleware.ts` seeds `Astro.locals.breadcrumbs`; each `<Breadcrumb>` a page renders unshifts itself onto that array. `StandardLayout` reads it to build the document title, the header nav, and the active-link state.

So a page declares _where it sits_, not what the header should look like:

```astro
<Breadcrumb href="/features" label="Features" />
```

The root breadcrumb's `navigation` array is the header nav. An entry with `cta: true` renders as the primary button rather than a link.

## Imports

Subpath imports, defined in `package.json`. There is no `@/` alias and no relative climbing out of a directory.

```
#design/patterns/Card.astro      → shared/design/patterns/Card/index.astro
#design/patterns/Card            → shared/design/patterns/Card/index.ts
#design/foundations.css          → shared/design/foundations/index.css
#shared/page                     → shared/page/index.ts
```

## Checks

Let the fixers fix: `eslint . --fix` and `prettier --write src`. Never hand-sort imports or hand-format `.astro` — the tooling owns both, and guessing at them wastes a round trip.

`pnpm build` must be **warning-free**, not merely error-free.

To render the site: `pnpm build && pnpm exec astro preview --port 4321`, then screenshot it. Kill the server afterwards.

## Gotchas

- The nav's "Open Editor" points at `/editor`, which **does not exist yet**.
- `Typography` is text-only and renders a small subset of markdown (`*em*`, `**strong**`, `` `code` ``, `[link](url)`). Emphasis in page copy goes through that, not through markup.
