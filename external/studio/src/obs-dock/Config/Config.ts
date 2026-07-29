import "#design/elements/Label"
import "#design/elements/Note"
import "#design/elements/Pill"
import "#design/elements/Button"
import "./Provider/index.ts"

import stylesheet from "./Config.css" with { type: "css" }

export default class Config extends HTMLElement {
  public static name = "os-app-config"

  private root: ShadowRoot

  constructor() {
    super()

    this.root = this.attachShadow({ mode: "open" })
    this.root.adoptedStyleSheets.push(stylesheet)

    this.build()
  }

  private build() {
    this.root.innerHTML = `
      <os-label>App modules · Runtime config<span slot="aside">2 / 4</span></os-label>

      <os-app-config-provider name="Twitch" status="connected">
        <div class="identity">
          <span class="avatar">YN</span>
          <span class="handle">@yourname</span>
          <span class="meta">1.2k followers</span>
        </div>
        <div class="pills">
          <os-pill>user:read</os-pill>
          <os-pill>chat:edit</os-pill>
          <os-pill>eventsub</os-pill>
        </div>
        <div class="actions">
          <os-button variant="text">Re-auth</os-button>
          <span class="spacer"></span>
          <os-button variant="text" tone="danger">Disconnect</os-button>
        </div>
      </os-app-config-provider>

      <os-app-config-provider name="OBS WebSocket" status="notset">
        <div class="endpoint">ws://127.0.0.1:4455</div>
        <div class="pills">
          <os-pill variant="muted">no password</os-pill>
          <os-pill variant="muted">obs-websocket ≥ 5.x</os-pill>
        </div>
        <div class="actions">
          <span class="spacer"></span>
          <os-button>Connect</os-button>
        </div>
      </os-app-config-provider>

      <os-note>Runtime config is stored locally in this browser source and is never uploaded.</os-note>
    `
  }
}

window.customElements.define(Config.name, Config)
