# Events

How module code is distributed between the dock and the overlays, and how an event becomes an automation run.

## Every module runs on both surfaces

Each module instance is loaded in the dock and in every Overlay whose Composition references it. It is the same module in both places, doing different work in each, and a module that has nothing to do on one of them simply idles there.

Where a module is _defined_ decides which of its instances owns the outside world. An **Ensemble** module is owned by its dock instance, which holds whatever connection, subscription, or credential it needs — so there is one socket, one rate-limit budget, and one copy of the token no matter how many Compositions reference it. A **Composition** module is owned by its Overlay instance and connects from there; declaring a module on a Composition is declaring that the Composition runs its own.

Only the owning surface runs the module's own code. The other side still holds an instance, but a **generic** one: same interface, no module-specific logic, forwarding every call over the direct channel to the owner. Everything on that interface is async, so the forwarding is transparent and nothing written against an instance has to know which kind it is holding. There is one instance type, not an owning one and a proxying one.

Whichever instance receives an event, the **dock is always what logs it and dispatches it**, so that every event passes one place that can record it and every automation run takes one path. An Overlay-owned module reports its events up the direct channel and receives them back down to run them — a Composition-owned data store sends its change up and the dock raises it like any other event, logged, replayable, and re-testable on the same terms as a Twitch message. The round-trip is deliberate: one path is worth more than the hop it saves.

The Overlay instance runs everything after the trigger: the overlay half of the trigger node, then the conditions and actions of each automation that uses it.

The dock is the stable host: it lives as long as OBS does, while an Overlay is destroyed on scene changes and by "shutdown when not visible".

## Nodes split across surfaces

A node is not a single function. A trigger node has three parts: a **subscription**, which wires the trigger to its module instance; a **matcher**, which decides whether an event that arrives matches this trigger's configuration; and an **overlay half**, which turns a matched event into the data downstream nodes consume. Everything after the trigger — conditions, actions — runs in the Overlay.

The subscription and the matcher both run on the surface that **owns** the module, next to the connection and the store they belong to. Everything else runs as close to where it is needed as possible: an automation whose Overlay is closed costs one discarded event rather than a full evaluation with nothing to act on.

A subscription is given the module instance and the trigger's own inputs, and returns the function that tears it down. It wires the trigger to whatever that module exposes — chat messages, redemptions — and puts the events it cares about to the matcher. Only a small part of a module instance is fixed by the system; the rest of its surface is the module's own, and its trigger nodes are written against it, `subscribeX` by convention. A module with nothing external to subscribe to still works this way: `@core`'s `interval` subscribes to an interval the module itself manages, so a generated event and a received one take the same path and neither needs a second mechanism.

The module raises those events through an `emit` the system hands to its owner runner. An event is an object carrying an `id` and whatever else that module wants to put on it; the `id` is what the log is keyed by, and the object is what the matcher is later given.

A matcher answers **pass** or **fail** — the event matched this trigger's configuration, or it did not. There is no third answer, because the subscription has already dropped everything that never could have matched. Twitch's chat-command trigger listens to every chat message, but only one starting with `!` is a candidate at all: an ordinary message is **skipped** by the subscription and never reaches the matcher, where a wrong command does reach it and fails. Skipping is silent — the subscription simply does not put the event through.

**Subscribing and matching are separate so that the matcher stays callable on its own.** A matcher folded into its subscription could only ever run on live traffic; kept apart, the same function can be re-run later against a stored event, which is what re-test is.

Because the matcher runs where the module is owned, it reads that surface's store freely — a Composition module's matcher has its Composition store. Nothing is shared upward to make that work, which is what the arrangement is protecting: matching never leaves the surface that owns the data it matches on.

## The module transport

A module's two instances talk to each other over the direct channel, and the messages they exchange are the **module's own**. The system fixes a few — registration, trigger dispatch, keyed state reads — and carries anything else a module defines between its halves, namespaced to the module instance so two modules never collide. The generic instance's forwarding rides this same transport, which is why a module never writes it.

This is what makes ownership by declaration scope work. A Composition-declared Twitch module holds its socket in the Overlay, matches there, and reports up to its dock instance in whatever shape it likes; the dock logs and dispatches without needing to know that shape in advance.

## Registration

An Overlay registers with the dock over the direct channel and forwards what the dock needs to act on its behalf: its module configuration and its trigger node configuration. Until it has registered, its triggers cannot fire.

A module manifest may declare configuration that studio renders as a form. A module may also define dock UI driven by editor configuration — a button the user defines in the editor, rendered in that module's section of the dock. Such a control is a manual trigger source: it emits an event like any other, so it is logged, replayable, and testable with no separate path.

## Event flow

1. A module instance receives an event via its own mechanisms, on whichever surface owns it, and emits it under an id it generates. The emission opens the log entry, and happens before any trigger sees the event.
2. The event goes to every trigger subscribed to that instance. A subscription that could not act on it skips it silently; every other one puts it to its matcher, which answers pass or fail.
3. Each pass and fail is recorded against that `eventId`, amending the entry the emission opened. A dock-owned module is already at the log; an Overlay-owned one reports up the direct channel.
4. For each match, a message goes down the direct channel: `{ eventId, automationId, nodeId, event, isReplay }`. A single event that matches several triggers produces several messages, each naming its own automation and node, and all carrying the same `eventId`. An event that originated in an Overlay comes back down the same way, rather than short-circuiting locally.
5. The Overlay passes the raw event to the Automation.
6. The automation passes the raw event to that trigger node's overlay half, which parses and enriches it.
7. Conditions run in turn, each adding its output to a set of data keyed by node id, so a later condition can reference an earlier one's values.
8. Actions run in parallel, each receiving the full accumulated data.

A rule automation is exactly one trigger, zero or more conditions, and one or more actions. Conditions run in the order they are declared, so the object order in a Composition config is a contract the editor has to preserve. Actions run in parallel.

Every value in that accumulated set is reached as `${<node>.<output>}` — always qualified by the node that produced it, with the trigger's own outputs under `trigger`. There is no unqualified form: a trigger output is `${trigger.chatter}`, never `${chatter}`.

Event ids are **generated by the module** and must be globally unique — most sources already carry one, and a module with nothing to borrow mints its own. Nothing coordinates them, so two surfaces minting at once must not be able to collide.

Logged events keep the source payload rather than the shape downstream nodes want, so a log entry stays faithful to what actually arrived. Because the entry is also what gets sent, replay is re-sending an entry.

## Logging, replay, and re-test

An entry exists for every event a module emitted, but not every entry is worth showing. The default view lists only entries carrying at least one **pass**, and does not enumerate that entry's fails beside it. An entry with nothing but fails is hidden and can be shown when wanted, typically filtered to a single trigger node. An entry marked neither way — every subscription skipped it — never appears at all, which is what keeps a busy chat from filling the log with a line per message per registered command trigger.

Two operations read the same log entry:

- **Replay** re-sends the recorded trigger down the direct channel. It reproduces what happened, for the case where an alert was missed.
- **Re-test** re-runs the matcher over the stored event against the _current_ configuration, so a past event can be run against a config edited since. It may match different Compositions, or none. The dock runs the matcher itself when it owns the module and asks the owning Overlay when it does not; the steps either side of that are the same, so re-test on a Composition module needs that Overlay open.

An event can also be forced through even though it never matched. Forcing sends the event down the direct channel, whether the matcher would have accepted it or not; issues this may cause are up to the user to handle.

Because the granularity is a filter over the entry's set of triggers, "replay this event" and "replay just this trigger" are the same operation with a different selection.

`isReplay` travels with every message regardless of which path produced it, so actions can be suppressed or run dry — replaying a shoutout should not send a second shoutout to Twitch.

## State access

Nodes read state through an async accessor, `module.getStore(key)`, which resolves locally when the store is owned by the surface asking and requests over the direct channel when it is not. Ensemble state is owned by the dock; Composition state is owned by that Composition.

Reads are **keyed**, so a module decides what it exposes rather than handing over a whole store to whatever asked; values are fetched on each use and never cached.

## Actions

Actions in a rule always run in parallel. Sequencing is what flow automations are for, and the automations that need it are complex enough to want the full graph, which is coming in a future iteration.

Anything that would otherwise need ordering belongs inside one action: `add-element` takes an optional action to run on the element it adds, so spawning and acting stay a single step.
