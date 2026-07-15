# Modlets

Shared across workspaces. A workspace's own CLAUDE.md may override anything here — the override wins.

Code is organized into **modlets**: a directory whose `index.*` file is its public surface. Only index files are imported from outside a modlet; every other file in it is private, reachable only by its siblings. In a package, the `imports` and `exports` maps in `package.json` encode this — subpaths point at the index and deeper paths don't resolve, so the boundary is enforced, not merely intended.

## Naming

A modlet is **named after its default export**. A component `FooBar` lives in a modlet `FooBar`.

A modlet with no single default export — a collection — takes a name formed by the same rules as its exports, even when no export bears it: a set of interface components might be `UserInterface`.

A **feature modlet** gathers different _kinds_ of thing around one purpose — a `weather` modlet exporting a client, an icon component, and a code-to-text helper — and is named in dashed-case.

The name obeys the same rule as every name (see `code-style.md`): short and semantic.

## Files

The **main file** is `<Modlet>.<ext>` (`FooBar.tsx`), re-exported by the index. Other files the modlet owns add a purpose segment: `FooBar.test.tsx`, `FooBar.module.css`. A secondary thing living inside the modlet uses its _own_ name in the same shape: `Baz.tsx`, `Baz.test.tsx`.

So the index is a thin barrel over a named main file — **except** where a framework forces the entry file to _be_ the implementation. Those concretions live in the framework's module (`astro.md`, `react.md`).
