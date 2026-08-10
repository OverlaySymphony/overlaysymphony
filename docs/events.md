# Events

How module code is distributed between the dock and the overlays, and how an event becomes an automation run.

## Every module runs on both surfaces

Each module instance is loaded in the dock and in every Overlay whose Composition references it. It is the same module in both places, doing different work in each, and a module that has nothing to do on one of them simply idles there.

The dock instance owns the outside world. It holds whatever connection, subscription, or credential the module needs, receives events, and decides which of them match a trigger. Because only the dock instance connects, there is one socket, one rate-limit budget, and one copy of the token no matter how many Compositions reference the module. A module with no trigger nodes still loads here and does nothing.

The Overlay instance runs everything after the trigger: the overlay half of the trigger node, then the conditions and actions of each automation that uses it. A module with no action nodes still loads here and does nothing.

Where a module is _defined_, on the Ensemble or on a Composition, says what it is available to and where its state is owned, not where its code runs. A Composition declaring a module is stating a capability requirement.

The two instances can talk to each other over the direct channel, which is how something that happens inside an Overlay still becomes a trigger. A Composition-owned data store sends its change up to its own dock instance, which raises it as an event like any other — so it is logged, replayable, and re-testable on the same terms as a Twitch message.

The dock is the stable host: it lives as long as OBS does, while an Overlay is destroyed on scene changes and by "shutdown when not visible".

## Nodes split across surfaces

A node is not a single function. A trigger node has a **dock half**, which decides whether an incoming event matches its configuration, and an **overlay half**, which turns the event into the data downstream nodes consume. Everything after the trigger — conditions, actions — runs in the Overlay.

Triggers always originate in the dock, so that every event passes one place that can log it. Everything else runs as close to where it is needed as possible: an automation whose Overlay is closed costs one discarded event rather than a full evaluation with nothing to act on.

The dock half runs **without access to the Composition store**. Sharing that store upward is both awkward and a security risk, so matching may only use the event and the trigger's own configuration.

## Registration

An Overlay registers with the dock over the direct channel and forwards what the dock needs to act on its behalf: its module configuration and its trigger node configuration. Until it has registered, its triggers cannot fire.

A module manifest may declare configuration that studio renders as a form. A module may also define dock UI driven by editor configuration — a button the user defines in the editor, rendered in that module's section of the dock. Such a control is a manual trigger source: it emits an event like any other, so it is logged, replayable, and testable with no separate path.

## Event flow

1. A module receives an event in the dock, via its own mechanisms.
2. Every registered trigger's dock half decides whether the event matches its configuration.
3. The dock records one log entry for the event: the raw payload, unmodified, plus the set of triggers it matched.
4. For each match, a message goes down the direct channel: `{ eventId, automationId, nodeId, event, isReplay }`. A single event that matches several triggers produces several messages, each naming its own automation and node, and all carrying the same `eventId`.
5. The Overlay passes the raw event to the Automation.
6. The automation passes the raw event to that trigger node's overlay half, which parses and enriches it.
7. Conditions run in turn, each adding its output to a set of data keyed by node id, so a later condition can reference an earlier one's values.
8. Actions run in parallel, each receiving the full accumulated data.

Logged events keep the source payload rather than the shape downstream nodes want, so a log entry stays faithful to what actually arrived. Because the entry is also what gets sent, replay is re-sending an entry.

## Logging, replay, and re-test

Events that matched nothing are still recorded. They are hidden in the UI by default and can be shown when wanted, typically filtered to a single trigger node — otherwise a busy chat produces an entry per message per registered command trigger.

Two operations read the same log entry:

- **Replay** re-sends the recorded trigger down the direct channel. It reproduces what happened, for the case where an alert was missed.
- **Re-test** re-enters at the dock half and matches the stored event against the _current_ configuration, so a past event can be run against a config edited since. It may match different Compositions, or none.

An event can also be forced through even though it never matched. Forcing sends the event down the direct channel, whether the dock-half would have accepted it or not; issues this may cause are up to the user to handle.

Because the granularity is a filter over the entry's set of triggers, "replay this event" and "replay just this trigger" are the same operation with a different selection.

`isReplay` travels with every message regardless of which path produced it, so actions can be suppressed or run dry — replaying a shoutout should not send a second shoutout to Twitch.

## State access

Nodes read state through an async accessor, `module.getStore(key)`, which resolves locally when the store is owned by the surface asking and requests over the direct channel when it is not. Ensemble state is owned by the dock; Composition state is owned by that Composition.

Reads are **keyed**, so a module decides what it exposes rather than handing over a whole store to whatever asked; values are fetched on each use and never cached.

## Actions

Actions in a rule always run in parallel. Sequencing is what flow automations are for, and the automations that need it are complex enough to want the full graph, which is coming in a future iteration.

Anything that would otherwise need ordering belongs inside one action: `add-element` takes an optional action to run on the element it adds, so spawning and acting stay a single step.
