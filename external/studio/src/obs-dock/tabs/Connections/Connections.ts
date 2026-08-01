import "#design/elements/Label"
import "#design/elements/List"
import "#design/elements/Note"

import "./Connection/index.ts"

import Component from "#shared/Component"

import stylesheet from "./Connections.css" with { type: "css" }

export default class Connections extends Component {
  public static name = "dock-connections"

  constructor() {
    super(stylesheet)
  }

  protected build(): void {
    this.root.innerHTML = `
      <os-label>Connections · 3 of 4 up</os-label>

      <os-list>
        <dock-connections-connection
          label="Twitch · EventSub"
          endpoint="wss://eventsub.wss.twitch.tv"
          status="ok"
          ping="38ms"
        ></dock-connections-connection>

        <dock-connections-connection
          label="Twitch · Chat"
          endpoint="irc.chat.twitch.tv:443"
          status="warn"
          ping="22ms"
        ></dock-connections-connection>

        <dock-connections-connection
          label="OBS · WebSocket"
          endpoint="ws://127.0.0.1:4455"
          status="err"
        ></dock-connections-connection>

        <dock-connections-connection
          label="Audio · ElevenLabs"
          endpoint="api.elevenlabs.io"
          status="ok"
          ping="184ms"
        ></dock-connections-connection>
      </os-list>
    `
  }
}

window.customElements.define(Connections.name, Connections)
