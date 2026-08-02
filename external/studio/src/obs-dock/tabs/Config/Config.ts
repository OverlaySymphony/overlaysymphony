import "#design/elements/Button"
import "#design/elements/Label"
import "#design/elements/Note"
import "#design/elements/Pill"

import "./Provider/index.ts"

import Component from "#shared/Component"

import stylesheet from "./Config.css" with { type: "css" }

export default class Config extends Component {
  public static name = "dock-config"

  constructor() {
    super(stylesheet)
  }

  protected build(): void {
    this.root.innerHTML = `
      <os-label>
        App modules · Runtime config
        <span slot="aside">2 / 4</span>
      </os-label>

      <dock-config-provider label="Twitch" status="connected" tone="ok">
        <dock-config-provider-identity
          handle="@yourname"
          meta="1.2k followers"
        ></dock-config-provider-identity>

        <dock-config-provider-pills>
          <os-pill tone="ok">user:read</os-pill>
          <os-pill tone="ok">chat:edit</os-pill>
          <os-pill tone="ok">eventsub</os-pill>
        </dock-config-provider-pills>

        <dock-config-provider-actions>
          <os-button variant="text">Re-auth</os-button>
          <span class="spacer"></span>
          <os-button variant="text" tone="err">Disconnect</os-button>
        </dock-config-provider-actions>
      </dock-config-provider>

      <dock-config-provider label="OBS WebSocket" status="not set">
        <dock-config-provider-endpoint>ws://127.0.0.1:4455</dock-config-provider-endpoint>

        <dock-config-provider-pills>
          <os-pill>no password</os-pill>
          <os-pill>obs-websocket ≥ 5.x</os-pill>
        </dock-config-provider-pills>

        <dock-config-provider-actions>
          <span class="spacer"></span>
          <os-button variant="filled" tone="ok">Connect</os-button>
        </dock-config-provider-actions>
      </dock-config-provider>

      <span class="spacer"></span>

      <os-note>Runtime config is stored locally in this browser source and is never uploaded.</os-note>
    `
  }
}

window.customElements.define(Config.name, Config)
