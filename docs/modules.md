# Modules

Every module has an `init` trigger, which fires once that module has finished initializing. It is not repeated below.

## Current Modules

### Core

Provides foundational logic for event routing, timing, and data manipulation.

Always available and never declared in a configuration. It is stateless, and has no `init` of its own.

#### Composition Init

The composition finished initializing.

- **Type**: trigger

#### Manual

The dock button was pressed.

- **Type**: trigger
- **Inputs**:
  - label: the text of the button

#### Delay

Waits before the following nodes run.

- **Type**: logic
- **Inputs**:
  - duration: how long to wait, in seconds

#### Interval

Runs every configured duration.

- **Type**: trigger
- **Inputs**:
  - duration: how long to wait, in seconds

#### Log

Writes an entry to the dock event log.

- **Type**: action
- **Inputs**:
  - source?: what the entry is attributed to, defaulting to the automation
  - message: the text of the entry
  - status: one of ok, info, warn, err

### Twitch

Integrates with Twitch to handle events and call actions.

- **Studio Config**:
  - authentication: the authenticated Twitch account

#### Chat Command

A chatter typed a `!<command>` in chat.

- **Type**: trigger
- **Inputs**:
  - command: the command name to look for
  - arguments?: the named arguments the command accepts
- **Outputs**:
  - chatter: the originating chatter
  - channel: the channel the command was used in
  - arguments: the parsed arguments, by name

#### Chat Message

A chatter sent a message in chat.

- **Type**: trigger
- **Outputs**:
  - chatter: the originating chatter
  - message: the chat message

#### Follow

A chatter followed the channel.

- **Type**: trigger
- **Outputs**:
  - chatter: the originating chatter

#### First Interaction

A chatter interacted with the channel for the first time, whether by chatting, redeeming, or otherwise.

- **Type**: trigger
- **Outputs**:
  - chatter: the originating chatter

#### Send Chat Message

Sends a message to Twitch chat.

- **Type**: action
- **Inputs**:
  - message: the message

#### Send Chat Shoutout

Executes a Twitch shoutout for the target broadcaster.

- **Type**: action
- **Inputs**:
  - broadcaster: the target broadcaster

#### Chatter Has Role

Checks whether the chatter holds any of the given roles.

- **Type**: logic
- **Inputs**:
  - chatter: the chatter to check
  - roles: any of streamer, editor, moderator, vip, subscriber

### Data Store

Manages a persistent, scoped state of text values.

Values are saved to a local database and can be directly viewed, modified, and exported in the debug and editor views.

- **Editor Config**:
  - duration: how long the data is maintained

#### Changed

A value changed, at the named key if provided.

- **Type**: trigger
- **Inputs**:
  - key?: the single key to watch, rather than the whole store
- **Outputs**:
  - key: the key that changed
  - value: the new value

#### Contains

Checks for the specified key, stopping the automation if it is not found.

- **Type**: logic
- **Inputs**:
  - key: the key to look for
- **Outputs**:
  - key: the key that was found
  - value: the stored value

#### Lookup

Looks up the specified key, continuing either way and using the fallback if it is not found.

- **Type**: logic
- **Inputs**:
  - key: the key to look for
  - fallback?: used when the key is missing
- **Outputs**:
  - key: the key that was found
  - value: the stored value, or the fallback

#### Set

Sets a value at the named key.

- **Type**: action
- **Inputs**:
  - key: the key to write
  - value: the value to store

### Elements

Facilitates interaction with elements displaying on the scene.

- **Config**:
  - manifest: the URL of the element manifest describing the available elements

#### Add Element

Adds one of the available elements, optionally running one of its actions.

- **Type**: action
- **Inputs**:
  - id?: only needed so a later automation can reference this element
  - element: which of the available elements to add
  - attributes?: the element's own attributes
  - action?: one of the element's actions to run on add
  - arguments?: the arguments for that action

#### Remove Element

Removes one of the existing elements.

- **Type**: action
- **Inputs**:
  - id: the element to remove

#### Run Action

Calls one of an existing element's own actions.

- **Type**: action
- **Inputs**:
  - id: the element to act on
  - action: which of the element's actions to call
  - arguments?: the arguments for that action

### Future Modules

### OBS

Provides access to read and modify OBS, via the built-in OBS browser API.

#### Show Source

Makes an OBS source visible.

- **Type**: action
- **Inputs**:
  - source: the source to show

#### Hide Source

Hides an OBS source.

- **Type**: action
- **Inputs**:
  - source: the source to hide

### Audio

Creates and manipulates audio in real time.

#### Text to Speech

Synthesizes speech from text with configurable voice/pitch.

- **Type**: action
- **Inputs**:
  - message: the message to speak
  - voice: the voice to use
  - pitch?: the pitch to speak at
  - rate?: the rate to speak at

### List

Maintains a dynamic queue/pool of entries with event hooks.

- **Editor Config**:
  - duration: how long the data is maintained
  - type: the type of the stored values
  - maxLength?: cap on entries
  - behaviour: fifo or random
  - replace: whether a selected entry returns to the pool

#### Opened

The list was opened.

- **Type**: trigger

#### Closed

The list was closed.

- **Type**: trigger

#### Filled

The list reached max capacity.

- **Type**: trigger

#### Entry Added

A list entry was added.

- **Type**: trigger
- **Outputs**:
  - value: the added entry

#### Entry Removed

A list entry was removed.

- **Type**: trigger
- **Outputs**:
  - value: the removed entry

#### Entry Updated

A list entry was updated.

- **Type**: trigger
- **Outputs**:
  - value: the updated entry

#### Entry Selected

An entry was chosen, per the list behaviour.

- **Type**: trigger
- **Outputs**:
  - value: the selected entry

#### Open

Opens the list.

- **Type**: action

#### Close

Closes the list.

- **Type**: action

#### Add Entry

Adds an entry to the list.

- **Type**: action
- **Inputs**:
  - value: the entry to add

#### Remove Entry

Removes an entry from the list.

- **Type**: action
- **Inputs**:
  - value: the entry, or its id
- **Outputs**:
  - value: the removed entry

#### Update Entry

Updates an entry in the list.

- **Type**: action
- **Inputs**:
  - value: the entry to update

#### Next

Selects the next entry, per the list behaviour.

- **Type**: action
- **Outputs**:
  - value: the selected entry

### Counter

Manages a persistent, scoped state of number values.

Values are saved to a local database and can be directly viewed, modified, and exported in the debug and editor views.

- **Editor Config**:
  - duration: how long the data is maintained

#### Changed

A value changed, at the named key if provided.

- **Type**: trigger
- **Inputs**:
  - key?: the single key to watch, rather than the whole store
  - direction?: the direction to watch
  - threshold?: the size of change required to trigger
- **Outputs**:
  - key: the key that changed
  - value: the new value
  - change: how much the value moved by

#### Contains

Checks for the specified key, stopping the automation if it is not found.

- **Type**: logic
- **Inputs**:
  - key: the key to look for
- **Outputs**:
  - key: the key that was found
  - value: the stored value

#### Lookup

Looks up the specified key, continuing either way and using the fallback if it is not found.

- **Type**: logic
- **Inputs**:
  - key: the key to look for
  - fallback?: used when the key is missing
- **Outputs**:
  - key: the key that was found
  - value: the stored value, or the fallback

#### Set

Sets a value at the named key.

- **Type**: action
- **Inputs**:
  - key: the key to write
  - value: the value to store

#### Adjust

Adds to the value at the named key, without reading it first.

- **Type**: action
- **Inputs**:
  - key: the key to adjust
  - amount: how much to add, negative to subtract
- **Outputs**:
  - value: the resulting value
