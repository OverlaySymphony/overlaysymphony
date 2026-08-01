import "#design/elements/Label"
import "#design/elements/List"
import "#design/elements/Note"

import "./Store/index.ts"

import Component from "#shared/Component"

import stylesheet from "./State.css" with { type: "css" }

export default class State extends Component {
  public static name = "dock-state"

  constructor() {
    super(stylesheet)
  }

  protected build(): void {
    this.root.innerHTML = `
      <os-label>
        State module · 5 keys
        <span slot="aside">session · user · forever</span>
      </os-label>

      <os-list>
        <dock-state-store key="shoutout.queue" scope="session">[3 users]</dock-state-store>
        <dock-state-store key="vote.gameNext" scope="session">{a:14, b:9}</dock-state-store>
        <dock-state-store key="user.lastSeen.cb" scope="forever">2d ago</dock-state-store>
        <dock-state-store key="stream.title" scope="session">OBS chill day</dock-state-store>
        <dock-state-store key="overlay.muted" scope="user">false</dock-state-store>
      </os-list>
    `
  }
}

window.customElements.define(State.name, State)
