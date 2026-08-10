# Overlay Symphony

A modular system for interactively coordinating live content. It is very highly configurable and easily extendable.

The primary use-case is Twitch streams, where it can consume platform events, viewer chat, and streamer actions, and react video, audio, and chat.

## Description

Though there will be shortcuts and templates for simple use cases, the core functionality, and the reason for its flexibility, is its visual configuration.

### Ensembles

The configuration is organized into Ensembles. Each Ensemble is built and runs in isolation from the others. A single Ensemble may have many Compositions. Compositions run independently with their own modules, but share module instances from the Ensemble too. A Composition is composed of one or more Automations.

### Running

Ensemble execution is fully event-driven, based on configured functionality from Modules. The system will run on the hosts computer, usually in OBS, and will therefore be able to respond to events nearly instantaneously and maximize event capacity. The primary interface, for runtime configuration and event logging, will run in a browser dock and orchestrate all other functionality. Each Composition runs in its own Overlay, a separate OBS browser source, receiving events from the primary interface.

### Modules

Functionality is added to the system by way of Modules. When a Module is added to an Ensemble, it makes its functionality available to that Ensemble and all Compositions. When a Module is added to a Compositions, it makes its functionality available only to that Composition.

Each Module is instanced, meaning that it can be added to the Ensemble multiple times, each with its own configuration. If a module provides "universal" functionality that doesn't depend on instancing configs, it is still pulled from an instance.

Modules can be imported from the official repository, external repositories from verified creators, as well as external unverified repositories (after strong safety warnings).
