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

A good comment records a constraint the code cannot show: a workaround, a non-obvious ordering requirement, a footgun in a dependency, why the surprising option was the right one.

## Naming

Name a thing for what it **could** be used for, not what it currently _is_ used for.

`CardGrid`, not `FeatureGrid`. `StatusList`, not `ModuleStatus`. If the name bakes in today's only caller, the next caller has to either rename it or misuse it. A label on the thing ("Step 01") is data; it does not belong in the type name.

## Modules and reuse

- **Combine things that serve the same semantic purpose.** If two of them differ only by which switches are flipped — one has an icon, one has a numbered label, one pins a footnote — they are one thing with optional arguments, not two. Look for this actively; near-duplicates are the default failure mode.
- **Extract for reuse potential, not observed reuse.** It belongs in the shared layer if it _would_ make sense elsewhere, even if only one caller uses it today.
- **Scope by actual reach.** Something used by exactly one consumer lives _inside_ that consumer, not in the shared layer. Shared means shared. This applies to helpers too: co-locate a helper with its only consumer, and promote it out when — and only when — a second consumer appears.

## Abstraction

Don't build an abstraction for a single caller. A named constant, a data array, a wrapper function, or a config object that exists once and is used once is indirection without payoff — write the thing directly and extract it when the second caller shows up.
