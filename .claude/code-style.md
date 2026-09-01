# Code style

Shared across workspaces. A workspace's own CLAUDE.md may override anything here — the override wins.

## Markdown

Never hard-wrap prose. A paragraph is **one line**, however long; the editor wraps it. Manually inserted newlines produce diffs where a one-word edit reflows a whole paragraph, burying the real change in noise.

This applies to every markdown file — docs, READMEs, CLAUDE.md, convention modules. Line breaks inside a paragraph are meaningless to the renderer and expensive to the git history.

Code blocks, tables, and list items keep their own lines; a list item's continuation text does not.

## Comments

Comments explain what is **unclear or unusual**. Nothing else.

- No property/field comments — unless the other properties on that object already have them. Match the file; don't start a convention.
- No comments explaining syntax or language behaviour.
- No comments restating what the code plainly says.
- No comments addressed to the reviewer ("this is correct because…", "changed to…"). That's PR conversation, not code.

A comment on a function describes its **purpose** — never its mechanism or its justification. Those, where they earn a comment at all, go inline beside the line they explain: that is where they stay findable, and where they stop being true the moment the line changes rather than quietly outliving it. A doc comment that explains the implementation also buries the one thing the reader opened it for, which is whether this is the function they want.

A good comment records a constraint the code cannot show: a workaround, a non-obvious ordering requirement, a footgun in a dependency, why the surprising option was the right one.

## Naming

Name a thing for what it **could** be used for, not what it currently _is_ used for.

`CardGrid`, not `FeatureGrid`. `StatusList`, not `ModuleStatus`. If the name bakes in today's only caller, the next caller has to either rename it or misuse it. A label on the thing ("Step 01") is data; it does not belong in the type name.

**Never a single letter for something that has a real name.** `entry`, `meter`, `finding`, `index` — not `e`, `m`, `f`, `i`. The exceptions are letters that _are_ the thing rather than an abbreviation of it: `x`/`y` for coordinates, and `a`/`b` in a sort comparator, where the convention is strong enough to read as its own idiom. A short callback body is not a licence; that is exactly where the reader has least context to reconstruct what the letter stood for.

Names are **short and semantic, not descriptive**: one word, occasionally two, rarely three, almost never more. Necessary prefixes don't spend that budget — React's `use*` on a hook, say. Reach for a second word only when one is genuinely ambiguous, a third only when two still are. The name says what the thing _is_ and how it _can_ be used, in the fewest words that carry it.

## Order within a file

**Don't bury the lede.** What the file is _for_ goes at the top; the machinery it leans on goes at the bottom. A React component file opens with the component and ends with its formatters. A types file opens with the types other modules import and ends with the local aliases that exist only to spell those out. Where a file has more than one primary export, all of them sit above all of the helpers.

Types come before everything else, and the same ordering applies among them.

A file is opened to find out what it does, and that answer belongs where attention is highest — not below a screen of supporting parts. Helpers are usually legible from their name and their call site, so they are rarely what the reader came for; on the occasion they are, collecting them at the end is what makes them easy to find.

This is **deliberately the inverse of define-before-use**, which has become a common default and is the wrong trade: it spends the most valuable position in the file on the least important code. Hoisting means the language does not ask for it — a function declaration or a type alias may be referenced above its definition. The exception is a `const`-bound value used at the file's top level, which must still appear before that use; it rarely comes up, because a helper is normally called from inside another function rather than during module evaluation.

Don't reorder a file into define-before-use, and don't treat an existing file that follows this rule as needing a fix.

## Modules and reuse

- **Combine things that serve the same semantic purpose.** If two of them differ only by which switches are flipped — one has an icon, one has a numbered label, one pins a footnote — they are one thing with optional arguments, not two. Look for this actively; near-duplicates are the default failure mode.
- **Extract for reuse potential, not observed reuse.** It belongs in the shared layer if it _would_ make sense elsewhere, even if only one caller uses it today.
- **Scope by possible reach.** Something that _can only_ be used by exactly one consumer lives inside that consumer, not in the shared layer. Shared means shared. The test is what the thing could serve, not what it happens to serve today — so this never contests the rule above it: usable elsewhere means extract now, usable nowhere else means keep it where it is. This applies to helpers too.

## Abstraction

Don't build an abstraction for a single caller. A named constant, a data array, a wrapper function, or a config object that exists once and is used once is indirection without payoff — write the thing directly and extract it when the second caller shows up.
